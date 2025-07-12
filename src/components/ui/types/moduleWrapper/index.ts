import React, { ReactNode } from "react";

export interface SkylynxModuleSettings {
  title: string;
  showTitle?: boolean; // default: true
}

export interface ModuleWrapperProps {
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