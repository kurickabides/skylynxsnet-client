import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../hooks/reduxHooks";
import { selectAuth } from "../components/auth/authSlice";
import { Helmet } from "react-helmet";
import { FlexRowBetween } from "../theme/appStyles";
import PageTitle from "../components/ui/pageTitle";
import { APP_TITLE, PAGE_TITLE_DASHBOARD } from "../helpers/constants";
import GalleryListView from "../modules/galleryListView/galleryListView ";
import { fetchUserPortals } from "../modules/galleryListView/galleryListApi";
import {
  setGalleryItems,
  selectGalleryItems,
} from "../modules/galleryListView/galleryListSlice";

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const authState = useAppSelector(selectAuth);
  const galleryItems = useAppSelector(selectGalleryItems);

  useEffect(() => {
    const loadPortals = async () => {
      if (!authState?.token) return;

      try {
        const portals = await fetchUserPortals({
          userID:authState.user.id,
          token: authState.token,
        });

        // 🔁 Map portal shape to GalleryItem[]
        const galleryItems = portals.map((p: any) => ({
          id: p.PortalID,
          label: p.PortalName,
          description: `Status: [${p.Status}] ${p.Description}`, // 📝 append status in description
          splashImage: p.SplashImage,
        }));

        dispatch(setGalleryItems(galleryItems));
      } catch (err: any) {
        console.error("❌ Failed to load user portals:", err.message);
      }
    };

    loadPortals();
  }, [authState.user?.id, authState.token]);

  const handlePortalClick = (portalId: string) => {
    console.log("📦 Clicked Portal:", portalId);
  };

  return (
    <>
      <Helmet>
        <title>
          {PAGE_TITLE_DASHBOARD} | {APP_TITLE}
        </title>
      </Helmet>

      <FlexRowBetween>
        <PageTitle title={PAGE_TITLE_DASHBOARD} />
      </FlexRowBetween>

      <GalleryListView items={galleryItems} onItemClick={handlePortalClick} />
    </>
  );
};

export default Dashboard;
