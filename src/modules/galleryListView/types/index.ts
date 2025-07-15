// ================================================
// ✅ Types: GalleryListView Module Types
// File: modules/galleryListView/types/index.ts
// Description: Type definitions for generic image-based gallery module
// ================================================
import { SkylynxModuleSettings } from "../../../components/ui/types/moduleWrapper";

export interface GalleryItem {
  id: string; // Unique ID for selection
  label: string; // Display name for image or module
  description?: string; // Optional description for caption/overlay
  splashImage: string; // Public image filename or URL path
  createdDate?: string;
  lastUpdated?: string;
}

export interface PortalGalleryItem extends GalleryItem {
  status?: string; // ✅ Status shown on hover
}
export interface GalleryModuleSettings extends SkylynxModuleSettings {
  showDescription?: boolean;
  layoutVariant?: "grid" | "table" | "list";
}
export interface GalleryListViewProps {
  items: GalleryItem[]; // List of cards to display
  itemsPerPage?: number;
  onItemClick: (id: string) => void; // Called when an image or card is clicked
  settings: GalleryModuleSettings;
}

export type GalleryState = { items: GalleryItem[] };