// ================================================
// ✅ Slice: edPDFSlice
// Description: Redux slice for PDF markup and settings
// Author: NimbusCore.OpenAI
// Architect: Chad Martin
// Company: CryoRio
// Filename: /modules/edPDFModule/edPDFSlice.ts
// ================================================

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../appStore/store";
import { EDPDFModuleSettings, EDPDFModuleState } from "./types";
import { ModuleRegistry } from "../../appStore/moduleStateRegistry";
import { getCurrentNamespace } from "../../services/utils/resolvePortalNamespace";
import { selectModuleState } from "../../appStore/moduleStateSelector";
import EDPDFView from "../../components/pdf/pdfViewer";

const initialState: EDPDFModuleState = {
  settings: {
    title: "Engineering Drawing",
    showTitle: true,
    pdfPath: "/content/sample.pdf",
    defaultZoomLevel: 1.25,
    enableZoom: true,
    enablePan: true,
    enablePageNav: true,
    enableFormAnnotations: true,
    showToolbar: true,
    markupColor: "#FF0000",
  },
};

const edPDFSlice = createSlice({
  name: "edpdfmodule",
  initialState,
  reducers: {
    updateSettings: (
      state,
      action: PayloadAction<Partial<EDPDFModuleSettings>>
    ) => {
      state.settings = { ...state.settings, ...action.payload };
    },
  },
});

// ✅ Register with module registry (not store.ts directly)
ModuleRegistry.register({
  namespace: getCurrentNamespace(),
  reducer: edPDFSlice.reducer,
  RouteRegistryEntry: {
    name: "edpdfmodule",
    component: EDPDFView,
    description: "Engineering PDF Markup Module",
  },
});

export const { updateSettings } = edPDFSlice.actions;

// ✅ Correct selector using module state utilities
export const selectPdfSettings = (state: RootState): EDPDFModuleSettings => {
  const mod = selectModuleState<EDPDFModuleState>(state, "edpdfmodule");
  return mod?.settings ?? initialState.settings;
};

export default edPDFSlice.reducer;
