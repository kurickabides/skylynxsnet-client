// ================================================
// ✅ Registry: ModuleStateRegistry
// Description: Manages dynamic registration of Redux reducers per module
// Author: NimbusCore.OpenAI
// Architect: Chad Martin
// Company: CryoRio
// Filename: moduleStateRegistry.ts
// ================================================

import { Reducer, combineReducers } from "@reduxjs/toolkit";

class ModuleStateRegistry {
  private reducers: Record<string, Reducer> = {};

  /**
   * Registers a module reducer under a unique key.
   */
  register(key: string, reducer: Reducer): void {
    if (!this.reducers[key]) {
      this.reducers[key] = reducer;
      console.info(`🧩 Registered reducer: ${key}`);
    } else {
      console.warn(`⚠️ Reducer for key "${key}" already registered.`);
    }
  }

  /**
   * Returns the combined reducer for all registered modules.
   */
  getCombinedReducer(): Reducer {
    return combineReducers({ ...this.reducers });
  }

  /**
   * Optional: Unregisters a reducer (for hot reload or teardown).
   */
  unregister(key: string): void {
    if (this.reducers[key]) {
      delete this.reducers[key];
      console.info(`🧯 Unregistered reducer: ${key}`);
    }
  }

  /**
   * Optional: Clears all registered reducers (e.g., for test environments).
   */
  clear(): void {
    this.reducers = {};
    console.info("🧹 Cleared all registered module reducers.");
  }

  /**
   * Checks if a reducer key is already registered.
   */
  isRegistered(key: string): boolean {
    return !!this.reducers[key];
  }
}

// ✅ Export a singleton instance
export const moduleRegistry = new ModuleStateRegistry();
