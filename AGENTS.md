# Repository Guidelines

## Project Structure & Module Organization

This repository contains a Vite React/TypeScript client application. Application source lives in `src/`, with feature UI in `src/components/`, higher-level feature modules in `src/modules/`, route pages in `src/pages/`, Redux/app state in `src/appStore/`, shared services in `src/services/`, configuration in `src/config/`, and theme files in `src/theme/`. Static assets are in `public/`; source-only artwork is also present in `src/images/` and `resources/`. Build output is generated into `dist/`.

## Build, Test, and Development Commands

- `npm run dev`: starts the Vite development server on the configured port.
- `npm run build`: creates a production build with Vite.
- `npm run preview`: serves the production build locally for inspection.

There is currently no `npm test`, `npm run lint`, or `npm run typecheck` script. If adding those workflows, wire them into `package.json` and document the expected command here.

## Coding Style & Naming Conventions

Use TypeScript and React function components. Keep strict typing in mind: `tsconfig.json` enables `strict`, so prefer explicit interfaces, typed Redux state, and `unknown` over broad `any` where practical. Use 2-space indentation, double quotes for imports/strings in TypeScript, and semicolons to match the existing codebase.

Name React components with `PascalCase` and utilities/hooks with `camelCase`, for example `UserProfileDetails.tsx`, `hydrateRenderTree.ts`, and `usePlaidLink.ts`. Avoid spaces in filenames; keep paths portable across Windows, Linux, and CI.

## Testing Guidelines

Existing tests use `.spec.ts` naming, such as `src/components/auth/authSlice.spec.ts` and `src/components/counter/counterSlice.spec.ts`. Place tests next to the code they cover and focus on reducers, services, and business logic before UI snapshots. Add or restore a test runner script before relying on tests in CI.

## Commit & Pull Request Guidelines

Recent history uses short, imperative summaries such as `Update branch` and `Updated settings interfaces`. Keep commits focused and describe the changed behavior or module, for example `Update PDF module save flow`.

Pull requests should include a brief summary, test/build results, linked issues when available, and screenshots or recordings for visible UI changes. Call out configuration, environment, or asset changes explicitly.

## Security & Configuration Tips

Do not commit local secrets. `.env` and `.env.local` are ignored and should remain machine-specific. When adding runtime configuration, document required variable names and keep defaults safe for local development.
# AGENTS.md

# SkyLynx Development Guide

Welcome to the SkyLynx project.

Before making ANY code changes, understand that SkyLynx is **not** a traditional CRUD application. It is a metadata-driven, template-based enterprise platform designed around reusable architectural patterns.

---

# Project Philosophy

SkyLynx is built around these principles:

1. Template First
2. Metadata First
3. Stored Procedure First
4. Reuse Before Duplication
5. Configuration over Hardcoding
6. Composition over Inheritance

Always look for reusable solutions before introducing new code.

---

# Architecture

SkyLynx is organized into several major subsystems.

```
Portal
    │
    ▼
Theme
    │
    ▼
Layout
    │
    ▼
Page
    │
    ▼
Module
    │
    ▼
ViewModel
    │
    ▼
DyForm
```

Everything is metadata driven.

Avoid hardcoded pages or forms whenever possible.

---

# Core Patterns

Always recognize and preserve these patterns.

## Prototype Pattern

Protos templates are reusable prototypes.

Never duplicate templates.

Use

- ProtosTemplate
- ProtosTemplateVersion
- ProtosTemplateLineage

to evolve templates.

---

## Repository Pattern

Database access belongs inside repositories.

Controllers should never execute SQL.

Factories should never execute SQL.

Repositories call Stored Procedures.

---

## Factory Pattern

Factories assemble objects.

Factories never contain business rules.

Factories combine:

- metadata
- resolver results
- templates
- view models

into runtime objects.

---

## Builder Pattern

ViewModels are built incrementally.

Example

Template Tree

↓

Metadata

↓

Resolver Data

↓

Sections

↓

Fields

↓

Complete ViewModel

---

## Composite Pattern

Recursive trees are preferred.

Portal

Layout

Page

Section

Field

should all support nested structures.

---

## Strategy Pattern

Resolvers determine runtime behavior.

Supported resolver types include

- sp
- table
- sql
- json
- function
- pivot
- template
- dbFn

Do not hardcode resolver logic.

---

## Bridge Pattern

Templates are independent from runtime objects.

Use Template Links to connect

Templates

↓

Portals

↓

Modules

↓

Pages

↓

Forms

---

## Flyweight Pattern

Reuse metadata whenever possible.

Examples

Domains

Languages

States

Component Types

Field Types

Never duplicate lookup values.

---

## Interpreter Pattern

Rules and Expressions are metadata.

Never hardcode validation logic when metadata can describe it.

---

## Registry Pattern

Use registries to resolve runtime components.

Examples

ModuleRegistry

RouteRegistry

ComponentRegistry

---

# Database Standards

Database interaction is Stored Procedure First.

Repositories execute Stored Procedures.

Avoid inline SQL.

Avoid business logic inside controllers.

Always prefer

Create<Entity>

Update<Entity>

Delete<Entity>

Get<Entity>

Load<Entity>

---

# SQL Standards

Every Stored Procedure requires this header.

```sql
-- ================================================
-- ✅ Stored Procedure:
-- Description:
-- Author: NimbusCore.OpenAI
-- Architect: Chad Martin
-- Company: CryoRio
-- Last Updated:
-- ================================================
```

Always use

SET NOCOUNT ON;

Generate IDs using

NEWID()

Return IDs using OUTPUT parameters.

---

# Schema Organization

Avoid dbo whenever possible.

Use schemas.

Examples

AspNet

DyForm

Protos

Portal

Security

Settings

Reporting

Cross-schema joins should have architectural justification.

---

# Naming

Prefer descriptive names.

Good

LoadSkylynxPortalVMTree

CreateDyForm

ProtosTemplateVersion

Bad

LoadStuff

Helper

Manager2

Data1

---

# Controllers

Controllers should

Validate request

Call service

Return response

Nothing more.

---

# Services

Services contain business workflows.

Services coordinate repositories.

Services do not know SQL.

---

# Repositories

Repositories own all database communication.

Repositories execute Stored Procedures.

Repositories return typed models.

---

# Mapping

Always map database results into domain models.

Never expose raw recordsets.

Use dedicated mapper classes.

---

# ViewModels

Clients receive ViewModels.

Database models are never returned directly.

ViewModels should be clean and UI focused.

---

# Client Architecture

Client renders metadata.

Avoid hardcoded UI.

Factories should construct

Portal

↓

Pages

↓

Modules

↓

DyForms

---

# Module Design

Modules should be independent.

Modules receive

settings

context

ViewModel

Modules should not directly query SQL.

---

# Dynamic Forms

DyForm is metadata.

Fields

Sections

Rules

Domains

Resolvers

Expressions

are all metadata driven.

Avoid custom forms whenever metadata can describe them.

---

# Performance

Cache metadata aggressively.

Avoid repeated template loading.

Prefer immutable metadata.

---

# Security

Never trust client input.

Use Stored Procedures.

Validate permissions.

Protect resolver execution.

Do not expose internal SQL names unless required.

---

# Documentation

When introducing a new architectural concept

Update Design.md

Include

Purpose

Pattern

Relationships

Mermaid Diagram

Future Considerations

---

# Preferred Response Style

When proposing architecture

Use

• Markdown

• Tables

• Mermaid diagrams

• Pattern names

• Advantages

• Tradeoffs

---

# Design Review

Before implementing a feature ask

Can this be metadata?

Can this be templated?

Can this be reused?

Does this fit an existing pattern?

Does this belong in a Stored Procedure?

Is this portal specific or reusable?

---

# Long-Term Vision

SkyLynx is intended to become a reusable enterprise application platform capable of generating portals, pages, modules, workflows, forms, APIs, and business applications entirely from metadata.

Every change should move the architecture closer to that vision.