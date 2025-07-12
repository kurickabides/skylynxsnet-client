// ================================================
// ✅ Slice: galleryListSlice
// Description: Redux slice for gallery list view state
// Author: NimbusCore.OpenAI
// Architect: Chad Martin
// Company: CryoRio
// Filename: /modules/galleryListView/galleryListSlice.ts
// ================================================

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../appStore/store";
import { GalleryItem } from "./types";

interface GalleryState {
  items: GalleryItem[];
}

const initialState: GalleryState = {
  items: [],
};

const galleryListSlice = createSlice({
  name: "galleryList",
  initialState,
  reducers: {
    setGalleryItems: (state, action: PayloadAction<GalleryItem[]>) => {
      state.items = action.payload;
    },
    clearGalleryItems: (state) => {
      state.items = [];
    },
  },
});

export const { setGalleryItems, clearGalleryItems } = galleryListSlice.actions;

export const selectGalleryItems = (state: RootState) => state.gallerylist.items;

export default galleryListSlice.reducer;
