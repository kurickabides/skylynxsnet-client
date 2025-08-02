// ================================================
// ✅ Types: EDPDFModule
// Description: Type definitions for Engineering Design PDF Markup Module
// Author: NimbusCore.OpenAI
// Architect: Chad Martin
// Company: CryoRio
// Filename: /modules/EDPDFModule/types.ts
// ================================================

import { SkylynxModuleSettings } from "../../../components/ui/types/uiWrappers";

// ✅ Module Settings Interface
export interface EDPDFModuleSettings extends SkylynxModuleSettings {
  pdfPath?: string;
  showToolbar?: boolean;
  drawingScale?: string; // "1:500", "1in=40ft", etc.
  enableDynamicScale?: boolean;
  layoutVariant?: "canvas" | "pdf";
  defaultZoomLevel?: number;
  enableZoom?: boolean;
  enablePan?: boolean;
  enablePageNav?: boolean;

  defaultTool?: "select" | "drawRect" | "text" | "photo";
  markupColor?: string;

  enablePhotoOverlay?: boolean;
  enableFormAnnotations?: boolean;
  markupDataSourceID?: string;

  snapToGrid?: boolean;
  showRulerOverlay?: boolean;
  showScaleIndicator?: boolean;
  highlightOnHover?: boolean;

  autoSaveInterval?: number;
  persistViewport?: boolean;
}


// ✅ Shape Types for Annotation
export type EDPDFShapeType = "rect" | "text" | "arrow";

// ✅ Base Shape Interface
export interface EDPDFShape {
  id: string;
  type: EDPDFShapeType;
  x: number;
  y: number;
  width?: number;
  height?: number;
  text?: string;
  fontSize?: number;
  fill?: string;
  stroke?: string;
  page: number;
}

// ✅ OCR Result Structure
export interface EDPDFOCRResult {
  page: number;
  box: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  text: string;
}

// ✅ Props for Toolbar Events
export interface MarkupToolbarCallbacks {
  onAddShape: (shape: EDPDFShape) => void;
  onClearShapes?: () => void;
  onUndo?: () => void;
  onRedo?: () => void;
  onOCRRegionSelect?: () => void;
}

export interface EDPDFModuleProps {
  settings: EDPDFModuleSettings;
  onSettingsUpdate: (settings: EDPDFModuleSettings) => void;
  children?: React.ReactNode;
}