// ================================================
// ✅ Component: AppBootstrap
// Description: Loads portal tree + config before app renders
// Author: NimbusCore.OpenAI
// Architect: Chad Martin
// Company: CryoRio
// Filename: AppBootstrap.tsx
// ================================================

import React, { useEffect, useState, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "./hooks/reduxHooks";
import { loadSkylynxPortalTree } from "./components/core/skylynxPortalTreeSlice";
import { loadProtosTargetTypes } from "./components/core/protosTargetTypeSlice";
import SplashScreen from "./components/ui/splashScreen";
import { hydrateRenderTree } from "./services/utils/hydrateRenderTree";

interface Props {
  children: React.ReactNode;
}

const AppBootstrap: React.FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch();

  const portalTree = useAppSelector((state) => state.skylynxPortalTree.tree);
  const targetTypes = useAppSelector((state) => state.protosTargetType.types);
  const targets = useAppSelector((state) => state.targetRegistry.targets);
  const portalTreeLoaded = !!portalTree && Object.keys(portalTree).length > 0;
  const targetTypesLoaded = targetTypes.length > 0;
  const ready = portalTreeLoaded && targetTypesLoaded;


  const [timeoutReached, setTimeoutReached] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    console.log("🌱 AppBootstrap initializing...");
    dispatch(loadSkylynxPortalTree());
    dispatch(loadProtosTargetTypes());

  }, [dispatch]);

  useEffect(() => {
    console.log("✅ portalTreeLoaded:", portalTreeLoaded);
    console.log("✅ targetTypesLoaded:", targetTypesLoaded);
  }, [portalTreeLoaded, targetTypesLoaded]);

  useEffect(() => {
    const timer = setTimeout(() => setTimeoutReached(true), 10000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (ready && !hydrated) {
      (async () => {
        try {
          console.log("🚀 Hydrating portal tree...");
          const hydratedTree = await hydrateRenderTree(portalTree);
          console.log("✅ Hydrated tree:", hydratedTree);
          // Optionally dispatch to Redux if needed later:
          //dispatch(setHydratedPortalTree(hydratedTree));
          setHydrated(true);
        } catch (err) {
          console.error("❌ Hydration failed:", err);
        }
      })();
    }
  }, [ready, hydrated, portalTree]);

  if (!ready || !hydrated) {
    if (timeoutReached) {
      return <div>❌ Failed to load portal. Please refresh or check logs.</div>;
    }
    return <SplashScreen />;
  }

  return <>{children}</>;
};

export default AppBootstrap;
