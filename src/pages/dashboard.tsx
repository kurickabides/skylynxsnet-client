// ================================================
// ✅ Page: Dashboard
// Description: Displays user's portals as a gallery using GalleryListContainer
// Author: NimbusCore.OpenAI
// Architect: Chad Martin
// Company: CryoRio
// Filename: pages/Dashboard.tsx
// ================================================

import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../hooks/reduxHooks";
import { selectAuth } from "../components/auth/authSlice";
import { Helmet } from "react-helmet";
import { APP_TITLE, PAGE_TITLE_DASHBOARD } from "../helpers/constants";

import GalleryListContainer from "../modules/galleryListView/GalleryListContainer";
import {
  GalleryItem,
  GalleryModuleSettings,
} from "../modules/galleryListView/types";
import { fetchUserPortals } from "../modules/galleryListView/galleryListApi";
import { IPortal } from "../entities/portal";
import EDPDFModule  from "../modules/edPDFModule/edPDFModule";
import { EDPDFModuleSettings } from "../modules/edPDFModule/types";

import {
  setGalleryItems,
  selectGalleryItems,
} from "../modules/galleryListView/galleryListSlice";

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const authState = useAppSelector(selectAuth);
  const galleryItems = useAppSelector(selectGalleryItems);
  //const [pdfSettings = useAppSelector(selectGalleryItems);

const pdfSetting: EDPDFModuleSettings = {
  title: "Engineering Markup Preview",
  showTitle: true,

  layoutVariant: "pdf", // or "canvas" if rendering w/o PDF

  // 📄 PDF Content & Toolbar
  pdfPath: "/content/sample.pdf",
  showToolbar: true,
  enablePhotoOverlay: true,
  enableFormAnnotations: true,

  // 🔍 Zoom & Pan
  enableZoom: true,
  enablePan: true,
  defaultZoomLevel: 1.25,
  persistViewport: true,

  // 📐 Engineering Scale
  drawingScale: "1:500",
  enableDynamicScale: true,
  showScaleIndicator: true,
  showRulerOverlay: true,

  // 🧰 Markup Tools
  defaultTool: "drawRect",
  markupColor: "#FF0000",
  highlightOnHover: true,
  snapToGrid: false,

  // 📄 Page Navigation
  enablePageNav: true,

  // 💾 Persistence
  autoSaveInterval: 60, // seconds
  markupDataSourceID: "DATASET-MARKUP-001",
};



  // ✅ Dashboard controls the settings
  const [settings, setSettings] = useState<GalleryModuleSettings>({
    title: "My Portals",
    showTitle: true,
    showDescription: true,
    layoutVariant: "grid",
  });



  useEffect(() => {
    const loadPortals = async () => {
      if (!authState?.token) return;

      try {
        const userId: string = authState.user.profile.userID;
        const portals: IPortal[] = await fetchUserPortals({
          userID: userId,
          token: authState.token,
        });

        const mapped: GalleryItem[] = portals.map((p: IPortal) => ({
          id: p.PortalID,
          label: p.PortalName,
          description: `Status: [${p.Status}] ${p.Description ?? ""}`,
          splashImage: p.SplashImage ?? "default.png",
        }));

        dispatch(setGalleryItems(mapped));
      } catch (err: any) {
        console.error("❌ Failed to load user portals:", err.message);
      }
    };

    loadPortals();
  }, [authState.user, authState.token, dispatch]);

  const handlePortalClick = (portalId: string) => {
    console.log("📦 Clicked Portal:", portalId);
  };

  const handleSettingsUpdate = (updated: GalleryModuleSettings) => {
    setSettings(updated);
  };

   const handlePdfSettingsUpdate = (updated: EDPDFModuleSettings) => {
     //setSettings(updated);
   };

  return (
    <>
      <Helmet>
        <title>{`${PAGE_TITLE_DASHBOARD} | ${APP_TITLE}`}</title>
      </Helmet>

      <GalleryListContainer
        settings={settings}
        onSettingsUpdate={handleSettingsUpdate}
        items={galleryItems}
        onItemClick={handlePortalClick}
      />
      <EDPDFModule
        settings={pdfSetting}
        onSettingsUpdate={handlePdfSettingsUpdate}
      ></EDPDFModule>
    </>
  );
};

export default Dashboard;
