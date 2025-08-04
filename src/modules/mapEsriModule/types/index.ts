// ================================================
// ✅ Module Types: ESRIMapModule
// Description: Props and settings interface for Esri map module
// Author: NimbusCore.OpenAI
// Architect: Chad Martin
// Company: CryoRio
// Filename: /modules/ESRIMapModule/types.ts
// ================================================

import { SkylynxModuleSettings } from "../../../components/ui/types/uiWrappers";
import { BasemapType } from "../../../components/esri/types";

export interface ESRIMapModuleSettings extends SkylynxModuleSettings {
  center: [number, number]; // [longitude, latitude]
  zoom: number;
  basemap: BasemapType;
  height?: number;
}

export interface ESRIMapModuleProps {
  settings: ESRIMapModuleSettings;
  onSettingsUpdate: (settings: ESRIMapModuleSettings) => void;
  children?: React.ReactNode;
}
