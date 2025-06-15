// ================================================
// ✅ Component: Layout
// File: components/layout/Layout.tsx
// Description: Base app layout with Header, Sidebar, and Footer
// ================================================

import React, { FC, ReactNode, useReducer } from "react";
import { CssBaseline } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from "./header";
import Navigation from "./navigation";
import Footer from "./footer";
import { authActions } from "../../components/auth/authSlice";
import { useAppDispatch } from "../../hooks/reduxHooks";
import {
  LayoutRoot,
  LayoutContent,
  LayoutContentShift,
  LayoutToolbarOffset,
  FooterContainer,
} from "./styled/layout";
import { LayoutProps } from "./types";

const Layout: FC<LayoutProps> = ({
  toggleTheme,
  useDefaultTheme,
  children,
}) => {
  const [drawerOpen, toggleDrawer] = useReducer((state) => !state, true);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const connectLoginHandler = async () => {
    try {
      navigate("/auth");
    } catch (ex) {
      console.error("Error navigating to auth:", ex);
    }
  };

  const connectSignUpHandler = async () => {
    try {
      navigate("/auth");
    } catch (ex) {
      console.error("Error navigating to auth:", ex);
    }
  };

  const logoutHandler = () => {
    dispatch(authActions.logout());
    navigate("/");
  };

  // 🔍 Debug drawer open state
  console.log("Layout drawerOpen:", drawerOpen);

  return (
    <LayoutRoot>
      <CssBaseline />
      <Header
        open={drawerOpen}
        handleMenuOpen={toggleDrawer}
        handleSignIn={connectLoginHandler}
        handleSignUp={connectSignUpHandler}
        handleDisconnect={logoutHandler}
        toggleTheme={toggleTheme}
        useDefaultTheme={useDefaultTheme}
      />
      <Navigation open={drawerOpen} handleMenuClose={toggleDrawer} />
      {drawerOpen ? (
        <LayoutContentShift>
          <LayoutToolbarOffset />
          {children}
        </LayoutContentShift>
      ) : (
        <LayoutContent>
          <LayoutToolbarOffset />
          {children}
        </LayoutContent>
      )}
      <FooterContainer>
        <Footer />
      </FooterContainer>
    </LayoutRoot>
  );
};

export default Layout;
  