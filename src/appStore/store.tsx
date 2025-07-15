import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { moduleRegistry } from "./moduleStateRegistry";
import authReducer from "../components/auth/authSlice";
import uiReducer from "../components/ui/uiSlice";
import skylynxPortalTreeReducer from "../components/core/skylynxPortalTreeSlice";
import protosTargetTypeReducer from "../components/core/protosTargetTypeSlice";

import { loadAuthState } from "../helpers/persistAuth";

const preloadedAuthState = loadAuthState();

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    skylynxPortalTree: skylynxPortalTreeReducer,
    protosTargetType: protosTargetTypeReducer,
    moduleRegistry: moduleRegistry.getCombinedReducer(),
  },
  preloadedState: preloadedAuthState ? { auth: preloadedAuthState } : undefined,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
