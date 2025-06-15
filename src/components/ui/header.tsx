// ================================================
// ✅ Component: Header
// File: components/layout/Header.tsx
// Description: AppBar for default (non-metamask) auth layouts
// ================================================

import React, { FC, ReactElement } from "react";
import clsx from "clsx";
import {
  CssBaseline,
  Typography,
  Tooltip,
  IconButton,
  Icon,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness3Icon from "@mui/icons-material/Brightness3";
import UserIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/LockOutlined";
import LogoutIN from "@mui/icons-material/LockOpenOutlined";
import { useNavigate } from "react-router-dom";

import {
  HeaderAppBar,
  HeaderAppBarShift,
  FlexRowBetween,
  HeaderTitle,
  MenuButton,
} from "../../theme/appStyles";
import { APP_TITLE } from "../../helpers/constants";
import { useAppSelector } from "../../hooks/reduxHooks";
import { selectAuth } from "../auth/authSlice";
import { HeaderProps } from "./types";

const Header: FC<HeaderProps> = ({
  open,
  handleMenuOpen,
  handleSignUp,
  handleSignIn,
  handleDisconnect,
  toggleTheme,
  useDefaultTheme,
}): ReactElement => {
  const navigate = useNavigate();
  const authState = useAppSelector(selectAuth);
  const isLoggedIn = authState.isLoggedIn;

  const ThemeToggleIcon = useDefaultTheme ? (
    <Brightness3Icon />
  ) : (
    <Brightness7Icon />
  );

  return (
    <>
      <CssBaseline />
      {open ? (
        <HeaderAppBarShift position="fixed" elevation={0}>
          <ToolbarContent />
        </HeaderAppBarShift>
      ) : (
        <HeaderAppBar position="fixed" elevation={0}>
          <ToolbarContent />
        </HeaderAppBar>
      )}
    </>
  );

  function ToolbarContent() {
    return (
      <FlexRowBetween>
        <HeaderTitle>
          <MenuButton
            color="inherit"
            aria-label="open menu"
            onClick={handleMenuOpen}
            edge="start"
            sx={{ display: open ? "none" : "inline-flex" }}
          >
            <MenuIcon />
          </MenuButton>
          <Typography variant="h6" noWrap>
            {APP_TITLE}
          </Typography>
        </HeaderTitle>

        <IconButton onClick={toggleTheme} color="inherit">
          <Tooltip
            title={
              useDefaultTheme ? "Switch to dark mode" : "Switch to light mode"
            }
            placement="bottom"
          >
            {ThemeToggleIcon}
          </Tooltip>
        </IconButton>

        {!isLoggedIn && (
          <IconButton size="small" onClick={handleSignIn} color="inherit">
            <LogoutIN />
          </IconButton>
        )}

        {isLoggedIn && (
          <>
            <IconButton size="small" onClick={handleDisconnect} color="inherit">
              <LogoutIcon />
            </IconButton>
            <IconButton size="small" color="inherit">
              <UserIcon />
            </IconButton>
          </>
        )}
      </FlexRowBetween>
    );
  }
};

export default Header;
