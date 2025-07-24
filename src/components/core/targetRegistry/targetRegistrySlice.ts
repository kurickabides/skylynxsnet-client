// ================================================
// ✅ Slice: targetRegistrySlice
// Description: Redux slice to manage resolved target metadata
// Author: NimbusCore.OpenAI
// Architect: Chad Martin
// Company: CryoRio
// Filename: components/core/targetRegistry/targetRegistrySlice.ts
// ================================================

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTargetMeta } from "./targetApi";
import {
  ITargetRegistryEntry,
  TargetRegistryState,
  RegistryStatus,
} from "../types";

// ✅ Initial state
const initialState: TargetRegistryState = {
  targets: {},
  lastResolvedAt: "",
  status: RegistryStatus.Ok,
};

// ✅ Thunk: loadTargetMeta
export const loadTargetMeta = createAsyncThunk<
  {
    targetID: string;
    targetType: string;
    data: Record<string, any>;
  },
  {
    targetID: string;
    targetType: string;
  }
>("targetRegistry/loadTargetMeta", async ({ targetID, targetType }) => {
  const data = await fetchTargetMeta(targetType, targetID);

  return {
    targetID,
    targetType,
    data,
  };
});

// ✅ Slice definition
export const targetRegistrySlice = createSlice({
  name: "targetRegistry",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadTargetMeta.pending, (state) => {
        state.status = RegistryStatus.Loading;
      })
      .addCase(loadTargetMeta.fulfilled, (state, action) => {
        const { targetID, targetType, data } = action.payload;
        const key = `${targetType}_${targetID}`;

        state.targets[key] = { data };
        state.lastResolvedAt = new Date().toISOString();
        state.status = RegistryStatus.Ok;
      })
      .addCase(loadTargetMeta.rejected, (state, action) => {
        state.status = RegistryStatus.Error;
        console.error("Target load failed:", action.error.message);
      });
  },
});

export default targetRegistrySlice.reducer;
