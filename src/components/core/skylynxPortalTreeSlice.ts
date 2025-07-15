// ================================================
// ✅ Slice: skylynxPortalTreeSlice
// Description: Stores the SkylynxPortalTree metadata structure
// Author: NimbusCore.OpenAI
// Architect: Chad Martin
// Company: CryoRio
// Filename: skylynxPortalTreeSlice.ts
// ================================================

import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { SkylynxPortalTree, SkylynxPortalTreeState } from "./types";
import { fetchSkylynxPortalTree } from "./skylynxPortalTreeAPI";

const initialState: SkylynxPortalTreeState = {
  tree: undefined,
  loading: false,
  error: undefined,
};

// ✅ AsyncThunk with no token required
export const loadSkylynxPortalTree = createAsyncThunk<SkylynxPortalTree>(
  "skylynxPortalTree/load",
  async (_, thunkAPI) => {
    try {
      return await fetchSkylynxPortalTree(); // API key only
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to load portal tree"
      );
    }
  }
);

const skylynxPortalTreeSlice = createSlice({
  name: "skylynxPortalTree",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadSkylynxPortalTree.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(
        loadSkylynxPortalTree.fulfilled,
        (state, action: PayloadAction<SkylynxPortalTree>) => {
          state.tree = action.payload;
          state.loading = false;
        }
      )
      .addCase(loadSkylynxPortalTree.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
  },
});

export default skylynxPortalTreeSlice.reducer;
