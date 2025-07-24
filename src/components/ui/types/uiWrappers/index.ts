import React, { ReactNode } from "react";
import { SkylynxBaseWrapperProps } from "../../../core/types";
import { IPortal } from "../../../../entities/portal";
export interface SkylynxModuleSettings {
  title: string;
  showTitle?: boolean; // default: true
}


export interface ModuleFrameProps {
  settings: SkylynxModuleSettings;
  children: ReactNode;
  onSettingsUpdate?: (newSettings: SkylynxModuleSettings) => void;
}

export interface ModuleSettingsDialogProps {
  open: boolean;
  settings: SkylynxModuleSettings;
  onSave: (updated: SkylynxModuleSettings) => void;
  onClose: () => void;
}

export interface ModuleWrapperProps extends SkylynxBaseWrapperProps {
  themeKey?: string;
}

export interface LayoutWrapperProps extends SkylynxBaseWrapperProps {
  themeKey?: string;
}

export interface PortalWrapperProps extends SkylynxBaseWrapperProps {
  themeKey?: string; // Optional override for theming
}

export interface PageWrapperProps extends SkylynxBaseWrapperProps {
  themeKey?: string; // Optional override for theming
}

export interface DyFormWrapperProps extends SkylynxBaseWrapperProps {
  themeKey?: string; // Optional override for theming
}