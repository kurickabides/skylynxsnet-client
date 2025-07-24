// ================================================
// ✅ Service: TargetRegistry
// Description: Resolves and caches target metadata from Redux store
// Author: NimbusCore.OpenAI
// Architect: Chad Martin
// Company: CryoRio
// Filename: components/core/targetRegistry/targetRegistry.ts
// ================================================

import { store } from "../../../appStore/store";
import { loadTargetMeta } from "./targetRegistrySlice";
import { RootState } from "../../../appStore/store";
import { ITargetRegistryEntry } from "../types";

export class TargetRegistry {
  /**
   * Resolves a target entry from the registry or fetches and stores it.
   * @param targetType - The type of the target (e.g., "Page", "Theme", etc.)
   * @param targetID - The unique identifier for the target
   * @returns An ITargetRegistryEntry with raw data from the API
   */
  static async resolve(
    targetType: string,
    targetID: string
  ): Promise<ITargetRegistryEntry> {
    const key = `${targetType}_${targetID}`;
    const state: RootState = store.getState();
    const cachedEntry = state.targetRegistry.targets[key];

    if (cachedEntry) {
      return cachedEntry; // ✅ Already resolved
    }

    const result = await store.dispatch(
      loadTargetMeta({ targetType, targetID })
    );

    if (loadTargetMeta.fulfilled.match(result)) {
      const { data } = result.payload;
      return { data };
    }

    throw new Error(
      `❌ Failed to resolve TargetMeta for: ${targetType}/${targetID}`
    );
  }
}
