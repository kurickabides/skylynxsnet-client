// src/App.tsx

import React, { FC, ReactElement, useReducer, useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "./hooks/reduxHooks";
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
  Theme,
} from "@mui/material/styles";
import { Helmet } from "react-helmet";
import { selectUI } from "./components/ui/uiSlice";
import { authActions, selectAuth } from "./components/auth/authSlice";
import Toast from "./components/ui/toast";
import Layout from "./components/ui/layout";
import { Loadroutes } from "./config/loadroutes";
import { createDarkTheme, createLightTheme } from "./theme/appTheme";
import { Web3ReactProvider } from "@web3-react/core";
import RouteItem from "./config/RouteItem";
import { ToastItem } from "./components/ui/types";
import { APP_TITLE } from "./helpers/constants";
import { ethers } from "ethers";

const AppContext = React.createContext(null);

// Web3 setup
function getLibrary(provider: any): ethers.providers.Web3Provider {
  const library = new ethers.providers.Web3Provider(provider);
  library.detectNetwork();
  library.pollingInterval = 12000;
  return library;
}

const DefaultComponent: FC = (): ReactElement => (
  <div>{`No Component Defined.`}</div>
);

function App() {
  const [useDefaultTheme, toggle] = useReducer((theme) => !theme, true);
  const uiState = useAppSelector(selectUI);
  const authState = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();

  const logoutTimer = useRef<NodeJS.Timeout | null>(null);

  const theme: Theme = responsiveFontSizes(
    useDefaultTheme ? createLightTheme("default") : createDarkTheme("default")
  );

  const routes: RouteItem[] = Loadroutes();

  const createTimer = (remainingTime: number) => {
    logoutTimer.current = setTimeout(
      () => dispatch(authActions.logout()),
      remainingTime
    );
  };

  useEffect(() => {
    if (authState.isLoggedIn) {
      createTimer(authState.remainingTime);
    }
    if (!authState.isLoggedIn && logoutTimer.current !== null) {
      clearTimeout(logoutTimer.current);
    }
  }, [uiState, authState, dispatch]);

  const toastMessageState: ToastItem = {
    status: uiState.notification.status,
    message: uiState.notification.message,
  };

  return (
    <AppContext.Provider value={null}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <BrowserRouter>
          <Helmet>
            <title>{APP_TITLE}</title>
          </Helmet>
          <ThemeProvider theme={theme}>
            {uiState.notification?.status !== "idle" && (
              <Toast toastMessage={toastMessageState} />
            )}
            <Layout toggleTheme={toggle} useDefaultTheme={useDefaultTheme}>
              <Routes>
                {routes.map((route: RouteItem) =>
                  route.subRoutes ? (
                    route.subRoutes.map((item: RouteItem) =>
                      item.path ? (
                        <Route
                          key={item.key as string}
                          path={item.path}
                          element={
                            item.component ? (
                              <item.component />
                            ) : (
                              <DefaultComponent />
                            )
                          }
                        />
                      ) : null
                    )
                  ) : route.path ? (
                    <Route
                      key={route.key as string}
                      path={route.path}
                      element={
                        route.component ? (
                          <route.component />
                        ) : (
                          <DefaultComponent />
                        )
                      }
                    />
                  ) : null
                )}
              </Routes>
            </Layout>
          </ThemeProvider>
        </BrowserRouter>
      </Web3ReactProvider>
    </AppContext.Provider>
  );
}

export default App;
