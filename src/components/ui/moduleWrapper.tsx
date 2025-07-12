// ================================================
// ✅ Component: ModuleWrapper
// File: components/ui/ModuleWrapper.tsx
// Description: Reusable module container with collapsible header and settings icon
// ================================================

import React, { FC, useState, ReactNode } from "react";
import { IconButton, Typography } from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SettingsIcon from "@mui/icons-material/Settings";
import ModuleSettingsDialog  from "./ModuleSettingsDialog";
import {
  ModuleContainer,
  ModuleHeader,
  ModuleInnerContent,
} from "./styled/moduleWrapper";
import { ModuleWrapperProps } from "./types/moduleWrapper";
import { ImportExportOutlined } from "@mui/icons-material";

const ModuleWrapper: FC<ModuleWrapperProps> = ({
  settings,
  children,
  onSettingsUpdate,
}) => {
  const [expanded, setExpanded] = useState(true);
  const { title, showTitle = true } = settings;
  const [openSettings, setOpenSettings] = useState(false);

  return (
    <ModuleContainer>
      {showTitle && (
        <ModuleHeader>
          <Typography variant="h6">{title}</Typography>
          <div>
            <IconButton
              color="inherit"
              onClick={() => setExpanded(!expanded)}
              size="small"
            >
              {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
            <IconButton
              color="inherit"
              onClick={() => setOpenSettings(true)}
              size="small"
            >
              <SettingsIcon />
            </IconButton>
            <ModuleSettingsDialog
              open={openSettings}
              settings={settings}
              onClose={() => setOpenSettings(false)}
              onSave={(updatedSettings) => {
                onSettingsUpdate?.(updatedSettings); // <-- Pass to parent
                setOpenSettings(false);
              }}
            />
          </div>
        </ModuleHeader>
      )}
      {expanded && <ModuleInnerContent>{children}</ModuleInnerContent>}
    </ModuleContainer>
  );
};

export default ModuleWrapper;
