// ================================================
// ✅ Component: GalleryListView
// Description: Reusable image gallery component with label/description click support
// Author: NimbusCore.OpenAI
// Architect: Chad Martin
// Company: CryoRio
// Filename: /modules/galleryListView/GalleryListView.tsx
// ================================================

import React from "react";
import { useAppSelector, useAppDispatch } from "../../hooks/reduxHooks";
import { selectGalleryItems, setGalleryItems } from "./galleryListSlice";
import { GalleryListViewProps } from "./types";
import {
  GalleryContainer,
  GalleryCard,
  GalleryCardContent,
  GalleryImage,
  GalleryLabel,
  GalleryDescription,
} from "./styled";

const GalleryListView: React.FC<GalleryListViewProps> = ({
  items,
  onItemClick,
  layoutVariant = "grid",
  showDescription = true,
}) => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(setGalleryItems(items));
  }, [items]);

  const galleryItems = useAppSelector(selectGalleryItems);

  return (
    <GalleryContainer>
      {galleryItems.map((item) => (
        <GalleryCard
          key={item.id}
          onClick={() => onItemClick(item.id)}
          title={`${item.description || ""}`}
        >
          <GalleryLabel>{item.label}</GalleryLabel>
          <GalleryImage
            src={`backgrounds/${item.splashImage}`}
            alt={item.label}
          />
          <GalleryCardContent>
            {showDescription && item.description && (
              <GalleryDescription>{item.description}</GalleryDescription>
            )}
          </GalleryCardContent>
        </GalleryCard>
      ))}
    </GalleryContainer>
  );
};

export default GalleryListView;
