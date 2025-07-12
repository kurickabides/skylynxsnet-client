// ================================================
// ✅ API: galleryListApi
// Description: API utilities for loading Gallery items (e.g. portals)
// Author: NimbusCore.OpenAI
// Architect: Chad Martin
// Company: CryoRio
// Filename: /modules/galleryListView/galleryListApi.ts
// ================================================

import { GalleryItem } from "./types";
import { SkylynxKey_APIKEY, SkylynxServer_URL } from "../../helpers/constants";
export const fetchUserPortals = async ({
  userID,
  token,
}: {
  userID: string;
  token: string;
}): Promise<GalleryItem[]> => {
  const res = await fetch(`${SkylynxServer_URL}/portals/byuser`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // ✅ Include token
      "skyx-api-key": SkylynxKey_APIKEY,
    },

    body: JSON.stringify({ userID }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error?.error || "Failed to fetch user portals");
  }

  return res.json().then((data) => data.portals);
};