# Skylynx Network
> Client Website for Skylynx Network.
> The website will
> This client app will also have a mobile version.

## ✅ What is the Skylynx Network
Skylynx Network is the foundation platform powering all Portals within the Skylynx Cloud Ecosystem. It handles:
- 🧾 Centralized payment processing
- 👥 User authentication and registration
- 🔗 API service connections
- 💵 Monetization and licensing of services across tenant Portals

Each client Portal communicates with the Skylynx Core services.

---

## ✅ Client Application Design

### 📁 Folder Structure
- `/components`: Shared UI components (buttons, wrappers, theme-based styles)
- `/modules`: Functional UI modules (GalleryView, ProfileManager, DashboardWidgets)
- `/theme`: Global styles and themes
- `/pages`: Route-based page components (Home, About, Auth, Dashboard)
- `/factories`: ViewModel, module, and layout builders for runtime rendering

### 📐 Component Patterns
- Reusable components belong in `/components` only if shared globally
- Pages and Module logic (state, API, settings) must be scoped to `/modules` or `/pages`
- Each module uses `ModuleWrapper.tsx` for standardized behavior:
  - Expand/Collapse
  - Settings Dialog
  - Title Handling

### 🧠 Module Strategy
We are transitioning all major UI features (e.g., Home, AboutUs, UserProfile, Auth) into **Modular Components**, structured for reuse across Portals.

Each module will:
- Use `ModuleWrapper`
- Receive `settings` prop implementing `SkylynxModuleSettings`
- Expose configuration through a dynamic settings dialog

> ❗ Only components without state or API (like Buttons, Labels, Containers) remain in the `/components` library.

### 🔧 Settings Dialog
All modules support a `SkylynxModuleSettings` config interface (title, showTitle, layoutVariant, etc.). These are editable via a dynamic dialog using `ModuleSettingsDialog`.

---

## ✅ Portal Builder Design
Below outlines the hierarchy and flow of how a Portal is constructed within the Skylynx System.

```mermaid
flowchart TD
  A[🌐 Portal] --> B[🎨 Theme]
  B --> C[📐 Layout]
  C --> D[📄 Page]
  D --> E[📐 Page Layout]
  E --> F[📦 Module Container]
```

Each layer is driven by Protos metadata. Templates link to SPs for rendering and configuration.

---

## ✅ Client Runtime Factory Architecture

The Skylynx Client uses a modular factory system to render portals dynamically based on metadata from the backend.

### 🔝 1. PortalFactory (Top-Level Builder)
| Role | Description |
|------|-------------|
| `PortalFactory` | Entry point for full portal rendering — layout, pages, modules |
| Builds | `PageFactory`, `ModuleFactory`, `ViewModelContentBuilderFactory` |

### 🧱 2. PageFactory
| Role | Description |
|------|-------------|
| `PageFactory` | Builds layout shell using `PortalPageModel` and `PortalLayoutModel` |
| Populates | Layout regions with module containers |

### 📦 3. ModuleFactory (Per Region Slot)
| Role | Description |
|------|-------------|
| `ModuleFactory` | Injects modules like `UserProfileManager`, `GalleryListView` into containers |
| Wraps | Each module in a `ModuleWrapper` with metadata and settings |

### 🏗️ 4. ViewModelContentBuilderFactory
| Role | Description |
|------|-------------|
| `ViewModelContentBuilderFactory` | Orchestrates rendering of layout- or form-based module content |
| Supports | Sections, Widgets, DyForms, Charts, Tabs, etc. |

### 🧩 5. DyFormFactory (Form Renderer)
| Role | Description |
|------|-------------|
| `DyFormFactory` | Converts `DyFormViewModel.sections` into actual forms using `DynamicFormRenderer` |
| Handles | Layouts, nested sections, validation, conditional visibility |

### 🎨 ThemeFactory (Theme Resolver)
| Role | Description |
|------|-------------|
| `ThemeFactory` | Resolves themes/styles per Portal, Layout, or Module based on metadata |
| Injects | Styled container wrappers (PortalShell, LayoutShell, ModuleShell) |
| Enables | Dynamic theming, white labeling, and UX separation by tenant |

---

## ✅ Registry Pattern Overview

Skylynx uses registries to dynamically resolve modules and routes at runtime.

### 📚 ModuleRegistry
- Stores key → component mappings for all dynamic modules.
- Loaded at startup or lazy-registered via API.
- Used in `ModuleFactory`:
```ts
const Component = ModuleRegistry.get("UserProfileManager");
```

### 🧭 RouteRegistry
- Maintains dynamic route → element mappings.
- Populated by `TreeFactory` when processing PageNodes:
```ts
RouteRegistry.register("/dashboard", <PageWrapper>{...}</PageWrapper>);
```
- Used at app root to inject all dynamic routes into `<Routes>` component.

---

## ✅ Route Handling and Injection

### RouteWrapper Component (Selected Strategy)
Each PageNode is rendered into a `<Route>` component during tree traversal. Instead of storing routes globally, we embed them directly in the JSX return value from `TreeFactory`.

### 📦 `RouteWrapper`
Wraps the `PageWrapper` and ties it to the expected `routePath`.

```tsx
<Route path={page.routePath} element={<PageWrapper>{...}</PageWrapper>} />
```

### Embedded in Factory
```tsx
return (
  <RouteWrapper path={node.template.routePath}>
    <PageWrapper>{...layoutContent}</PageWrapper>
  </RouteWrapper>
);
```

> ❗This supports **code splitting**, **context-aware rendering**, and **page transitions**.

---

## ✅ Smart UI Containers
Each major node type in the tree has a matching smart UI container:

| Container         | Description |
|------------------|-------------|
| `PortalWrapper`   | Theme-aware shell around entire portal rendering |
| `PageWrapper`     | Handles route-bound page metadata, title, etc. |
| `LayoutWrapper`   | Wraps layout regions (main/sidebar/footer), handles spacing |
| `ModuleWrapper`   | Adds settings dialog, collapsible title, and runtime module control |

These containers:
- Take in `settings` and `children`
- Wrap children with behavioral or presentational logic
- Support per-tenant styles via `ThemeFactory`

---

## ✅ Portal Runtime Configuration Models

| Model                 | Description                                                     |
| --------------------- | --------------------------------------------------------------- |
| `PortalPageModel`     | Defines route, layout, and visibility for a page.               |
| `PortalLayoutModel`   | Lists regions (e.g., `main`, `footer`) for positioning modules. |
| `PortalModuleModel`   | Metadata about available modules.                               |
| `PortalPageModuleMap` | Mapping of module to page + region + order.                     |
| `PortalPageViewModel` | Combines page, layout, modules, navigation for rendering.       |

---

## ✅ Factory Execution Flow: Route & Module Registry Integration

```mermaid
sequenceDiagram
  participant TreeFactory
  participant RouteRegistry
  participant PageFactory
  participant LayoutFactory
  participant ModuleFactory
  participant ModuleRegistry
  participant ViewModelFactory

  TreeFactory->>RouteRegistry: register(page.routePath, <PageWrapper>)
  TreeFactory->>PageFactory: build(PageNode)
  PageFactory->>LayoutFactory: build(LayoutNode)
  LayoutFactory->>ModuleFactory: build(ModuleNode)
  ModuleFactory->>ModuleRegistry: resolve("UserProfileManager")
  ModuleRegistry-->>ModuleFactory: LoadedComponent

  ModuleFactory->>ViewModelFactory: resolve content (e.g., DyForm)
  ViewModelFactory-->>ModuleFactory: JSX.Element

  ModuleFactory-->>LayoutFactory: JSX.Element (ModuleWrapper)
  LayoutFactory-->>PageFactory: JSX.Element (LayoutWrapper)
  PageFactory-->>TreeFactory: JSX.Element (PageWrapper)
```

---

## ✅ Example Flow: GalleryListView on Dashboard

1. Portal config includes `GalleryListView` in `main` region.
2. PageFactory builds layout → inserts ModuleFactory calls into each region.
3. ModuleFactory loads `GalleryListView` via registry.
4. Wrapped with `ModuleWrapper`, passing props from `PortalPageModuleMap`.
5. Component renders.
6. Admin clicks settings → `ModuleSettingsDialog` shown.
7. Settings saved and module re-renders.

---

## ✅ What’s Next
- Scaffold top-level factories: `PortalFactory`, `PageFactory`, `ModuleFactory`
- Implement `ViewModelContentBuilderFactory` → integrate DyForm modules
- Build shared `DyFormFactory`, `FieldRenderer`, `useDynamicFormState`
- Add Theme-aware shells: `PortalWrapper`, `LayoutWrapper`, `PageWrapper`
- Enable RouteWrapper usage during TreeFactory traversal

---

## ✅ Summary
The Skylynx Client enables **portal-specific customization**, **metadata-driven rendering**, and **runtime modularity**. By combining factory-based composition with template metadata, we achieve:

- High extensibility
- Configurable layout + UX per tenant
- Route-aware tree rendering
- Thematic styling via `ThemeFactory`
- Reuse across platforms (desktop/web/mobile)


``` mermaid
flowchart TD
  subgraph ModuleRegistry
    MR1[gallerylist name]
    MR2[GalleryListView component]
    MR3[galleryListSlice.reducer reducer]
  end

  subgraph Redux
    RS[galleryListSlice.ts]
    RS -->|registers reducer| MR3
  end

  subgraph UI Layer
    GLV[GalleryListView.tsx]
    GLC[GalleryListContainer.tsx]
  end

  MR2 --> GLV
  MR3 --> GLC

  GLC -->|renders| GLV
  GLC -->|dispatch + selector| RS
  MR1 -->|via register| ModuleRegistry
```

``` mermaid
flowchart TD
    A[Boot Host Portal APIKey] --> B[Load SkylynxPortalTree'host']
    B --> C[Render Modules e.g. GalleryListView]

    C --> D[Gallery triggers Load PortalB]
    D --> E[loadSkylynxPortalTree PortalB]
    E --> F[Hydrate + Render PortalB tree]
```

```mermaid
sequenceDiagram
  participant TreeFactory
  participant RouteRegistry
  participant PortalWrapperFactory
  participant ThemeFactory
  participant LayoutFactory
  participant PageFactory
  participant ModuleFactory
  participant ModuleRegistry
  participant ViewModelFactory

  %% ✅ Hydration Phase - triggered after Portal tree loaded
  TreeFactory->>RouteRegistry: register RoutePath with PageWrapper
  TreeFactory->>PortalWrapperFactory: build PortalNode
  PortalWrapperFactory->>ThemeFactory: build ThemeNode
  ThemeFactory->>LayoutFactory: build LayoutNode

  %% 🧠 Layout may exist without Pages
  alt Layout has Pages
    LayoutFactory->>PageFactory: build PageNode
    PageFactory->>ModuleFactory: build ModuleNode
  else No Pages
    LayoutFactory->>ModuleFactory: build ModuleNode
  end

  %% 🧠 Module must resolve component and data
  ModuleFactory->>ModuleRegistry: resolve UserProfileManager
  ModuleRegistry-->>ModuleFactory: return LoadedComponent

  ModuleFactory->>ViewModelFactory: resolve DyForm ViewModel
  ViewModelFactory-->>ModuleFactory: return JSX element

  %% ✅ Rendering stack (reversed)
  ModuleFactory-->>LayoutFactory: return ModuleWrapper
  LayoutFactory-->>ThemeFactory: return LayoutWrapper
  ThemeFactory-->>PortalWrapperFactory: return ThemeWrapper
  PortalWrapperFactory-->>TreeFactory: return PortalWrapper

```
# WebSite Loading Proces

```mermaid
graph TD
  A[Load Metadata PortalTree] --> B[Hydrate Render Tree]
  B --> C[Init Registries]
  C --> D[ThemeRegistry]
  C --> E[ModuleRegistry]
  C --> F[RouteRegistry]
  B --> G[TreeFactory Traversal]
  G --> H[JSX Render]
```
#  SAFe Agile Scaling 
```mermaid
graph TD
  A[Portfolio Level] -->|Epics & Funding| B[Large Solution Level]
  A -->|Strategic Themes| C[Program Level]
  B -->|Capabilities| C
  C -->|Features| D[Team Level]
  D -->|User Stories| E[Agile Teams]

  subgraph Portfolio Level
    A1[Lean Portfolio Mgmt]
    A2[Enterprise Architect]
    A3[Epic Owners]
    A1 --> A2
    A2 --> A3
    A3 --> A
  end

  subgraph Large Solution Level Optional
    B1[Solution Train Engineer]
    B2[Solution Architect]
    B3[Solution Mgmt]
    B1 --> B2
    B2 --> B3
    B3 --> B
  end

  subgraph Program Level
    C1[Release Train Engineer RTE]
    C2[System Architect]
    C3[Product Manager]
    C4[Program Backlog]
    C1 --> C2
    C2 --> C3
    C3 --> C4
    C4 --> C
  end

  subgraph Team Level
    D1[Scrum Master]
    D2[Product Owner]
    D3[Dev Team]
    D4[Team Backlog]
    D1 --> D2
    D2 --> D3
    D3 --> D4
    D4 --> D
  end

  subgraph Agile Teams
    E1[Scrum / Kanban / XP]
    E --> E1
  end
```

## CAPTCHA VALIDATION FLOW (Best Practice)

```mermaid
sequenceDiagram
    participant Browser
    participant reCAPTCHA/hCaptcha Server
    participant Skylynx API

    Browser->>reCAPTCHA/hCaptcha Server: Get challenge token
    Browser->>Skylynx API: Submit form + captcha token
    Skylynx API->>reCAPTCHA/hCaptcha Server: Verify token via secret key
    reCAPTCHA/hCaptcha Server-->>Skylynx API: Valid/Invalid
    Skylynx API-->>Browser: Accept or Reject

```
## Portal Module and User Settings Flow Diagram

```mermaid

flowchart TD
  subgraph Global
    GPS(GlobalPortalSettings)
    GMS(GlobalModuleSettings)
  end

  GPS -->|used during| CreatePortal
  GMS -->|used during| AddModuleToPortal

  CreatePortal --> PS(PortalSettings)
  AddModuleToPortal --> MS(ModuleSettings)

  PS --> PortalRuntime
  MS --> ModuleRuntime

  US(UserSettings) --> ModuleRuntime


```

## Summary: Updated Schema Layer Diagram

```mermaid
erDiagram

  SystemValueTypes {
    string ValueType PK
    string Description
    boolean IsStructured
  }

  SettingKeys {
    UUID SettingKeyID PK
    string KeyName
    string Label
    string ValueType FK
    UUID DomainID
  }

  PortalSettings {
    UUID PortalID FK
    UUID SettingKeyID FK
    string Value
  }

  ModuleSettings {
    UUID PortalModuleID FK
    UUID SettingKeyID FK
    UUID RoleID FK
    string Value
  }

  GlobalModuleSettings {
    UUID PortalModuleID FK
    UUID SettingKeyID FK
    UUID RoleID FK
    string Value
  }

  GlobalPortalSettings {
    UUID SettingKeyID FK
    string Value
  }

  SettingKeys ||--|| SystemValueTypes : uses
  PortalSettings ||--|| SettingKeys : has
  ModuleSettings ||--|| SettingKeys : has
  GlobalModuleSettings ||--|| SettingKeys : has
  GlobalPortalSettings ||--|| SettingKeys : has

  ```
