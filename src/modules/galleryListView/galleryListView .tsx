// ================================================
// ✅ Component: GalleryListView
// Description: Reusable image gallery component with layout toggle (grid/list)
// Author: NimbusCore.OpenAI
// Architect: Chad Martin
// Company: CryoRio
// Filename: /modules/galleryListView/GalleryListView.tsx
// ================================================

import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks/reduxHooks";
import { selectModuleState } from "../../appStore/moduleStateSelector";
import { setGalleryItems } from "./galleryListSlice";
import { GalleryListViewProps, GalleryState } from "./types";
import ModuleFrame from "../../components/ui/module/moduleFrame";
import ImageGridView from "../../components/ui/lists/ImageGridView";
import ItemListView from "../../components/ui/lists/ItemListView";
import ItemTableView from "../../components/ui/lists/ItemTableView";
;

const GalleryListView: React.FC<GalleryListViewProps> = ({
  items,
  itemsPerPage = 6,
  onItemClick,
  settings,
  children,
}) => {
  const dispatch = useAppDispatch();
  const [currentSettings, setCurrentSettings] =
    useState<typeof settings>(settings);

  React.useEffect(() => {
    dispatch(setGalleryItems(items));
  }, [items]);

  const galleryItems = useAppSelector(
    (state) =>
      selectModuleState<GalleryState>(state, "gallerylist")?.items ?? []
  );

  return (
    <ModuleFrame
      settings={currentSettings}
      onSettingsUpdate={(updated) => setCurrentSettings(updated)}
    >
      {currentSettings.layoutVariant === "table" ? (
        <ItemTableView
          items={galleryItems}
          onItemClick={onItemClick}
          settings={currentSettings}
        />
      ) : currentSettings.layoutVariant === "list" ? (
        <ItemListView
          items={galleryItems}
          onItemClick={onItemClick}
          settings={currentSettings}
        />
      ) : (
        <ImageGridView
          items={galleryItems}
          onItemClick={onItemClick}
          settings={currentSettings}
        />
      )}
    </ModuleFrame>
  );
};

export default GalleryListView;
