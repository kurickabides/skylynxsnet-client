// ================================================
// ✅ Component: MenuItem
// File: components/layout/MenuItem.tsx
// Description: Represents a single menu item in the drawer
// ================================================

import React, { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Icon, ListItemIcon, Tooltip } from "@mui/material";
import DefaultIcon from "@mui/icons-material/AccountBox";
import { MenuItemProps } from "./types";
import {
  StyledListItem,
  StyledListItemText,
  MenuSelected,
} from "../../theme/appStyles";

const MenuItem: FC<MenuItemProps> = ({
  path,
  title,
  icon,
  tooltip,
  open,
  enabled = true,
}): React.ReactElement => {
  const navigate = useNavigate();
  const location = useLocation();
  const isSelected = location.pathname === path;

  const listItemContent = (
    <StyledListItem
      button
      selected={isSelected}
      onClick={() => navigate(path || "/")}
      disabled={!enabled}
    >
      <ListItemIcon>
        <MenuSelected className={isSelected ? "selected" : ""} size="small">
          <Icon component={icon || DefaultIcon} />
        </MenuSelected>
      </ListItemIcon>

      {/* ✅ Conditional: if open show title, else show empty string */}
      <StyledListItemText primary={open ? title : ""} />
    </StyledListItem>
  );

  return (
    <Tooltip title={!open ? tooltip || title : ""} placement="right">
      {listItemContent}
    </Tooltip>
  );
};

export default MenuItem;
