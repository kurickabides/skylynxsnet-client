// ================================================
// ✅ Types: GalleryListView Module Types
// File: modules/galleryListView/types/index.ts
// Description: Type definitions for generic image-based gallery module
// ================================================

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

export interface GalleryListViewProps {
  items: GalleryItem[]; // List of cards to display
  onItemClick: (id: string) => void; // Called when an image or card is clicked
  layoutVariant?: "grid" | "carousel"; // Optional visual style override
  showDescription?: boolean; // Whether to show caption below
}

