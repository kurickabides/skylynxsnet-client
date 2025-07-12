  // ================================================
  // ✅ App Store: Redux Configuration
  // Description: Sets up global store with encrypted auth preload
  // ================================================

  import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
  import counterReducer from "../components/counter/counterSlice";
  import authReducer from "../components/auth/authSlice";
  import galleryReducer from "../modules/galleryListView/galleryListSlice";
  import uiReducer from "../components/ui/uiSlice";
  import bankAccountReducer from "../components/userAccounts/bankAccountSlice";
  // import xmlReducer from "../components/stellar/xlmSlice";
  // import etherumReducer from "../components/etherum/ethersSlice";

  // 🔐 Load encrypted auth state
  import { loadAuthState } from "../helpers/persistAuth";

  const preloadedAuthState = loadAuthState();

  export const store = configureStore({
    reducer: {
      counter: counterReducer,
      auth: authReducer,
      ui: uiReducer,
      userBankAccounts: bankAccountReducer,
      gallerylist: galleryReducer,
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
