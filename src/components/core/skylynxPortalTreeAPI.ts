// ================================================
// ✅ API: skylynxPortalTreeAPI
// Description: Fetches Skylynx Portal Template Tree + Target Types
// Author: NimbusCore.OpenAI
// Architect: Chad Martin
// Company: CryoRio
// Filename: skylynxPortalTreeAPI.ts
// ================================================

import { SkylynxKey_APIKEY, SkylynxServer_URL } from "../../helpers/constants";
import { SkylynxPortalTree, TemplateType } from "./types";

/**
 * ✅ Fetches full template tree for a given portal (default or active)
 * @param token Bearer auth token
 * @returns SkylynxPortalTree
 */
export const fetchSkylynxPortalTree = async (
): Promise<SkylynxPortalTree> => {
  const res = await fetch(`${SkylynxServer_URL}/nimbus/templates/portals`, {
    method: "GET",
    headers: {
      "skyx-api-key": SkylynxKey_APIKEY,
    },
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || "Failed to load Skylynx portal template tree.");
  }

  return res.json();
};

/**
 * ✅ Fetches all supported ProtosTargetTypes from DB
 * @param token Bearer auth token
 * @returns List of ProtosTargetType
 */
export const fetchProtosTargetTypes = async (
): Promise<TemplateType[]> => {
  const res = await fetch(`${SkylynxServer_URL}/nimbus/templates/types`, {
    method: "GET",
    headers: {
      "skyx-api-key": SkylynxKey_APIKEY,
    },
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || "Failed to load ProtosTargetTypes.");
  }

  return res.json();
};
