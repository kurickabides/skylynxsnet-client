// ================================================
// ✅ Component: ModuleSettingsDialog
// Description: Dynamically renders form for any module settings interface
// Author: NimbusCore.OpenAI
// Architect: Chad Martin
// Company: CryoRio
// Filename: components/ui/module/ModuleSettingsDialog.tsx
// ================================================

import React, { FC, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControlLabel,
  Switch,
  RadioGroup,
  FormLabel,
  Radio,
  FormControl,
  MenuItem,
  Select,
  Box,
} from "@mui/material";
import {
  SkylynxModuleSettings,
  ModuleSettingsDialogProps,
} from "../types/moduleWrapper/index";

const enumFields: Record<string, string[]> = {
  layoutVariant: ["grid", "list", "table"],
  viewMode: ["compact", "expanded", "minimal"],
  // Add additional known enums here as needed
};

const isEnumField = (key: string, value: any): boolean =>
  typeof value === "string" && enumFields[key] !== undefined;

const ModuleSettingsDialog: FC<ModuleSettingsDialogProps> = ({
  open,
  settings,
  onSave,
  onClose,
}) => {
  const [localSettings, setLocalSettings] =
    useState<SkylynxModuleSettings>(settings);

  const handleChange = (field: string, value: any) => {
    setLocalSettings((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => onSave(localSettings);

  const renderField = (key: string, value: any) => {
    if (key === "id") return null;

    // ✅ Hardcoded fields first
    if (key === "title") {
      return (
        <TextField
          key={key}
          label="Title"
          value={value}
          onChange={(e) => handleChange(key, e.target.value)}
          fullWidth
          margin="normal"
        />
      );
    }

    if (key === "showTitle") {
      return (
        <FormControlLabel
          key={key}
          control={
            <Switch
              checked={!!value}
              onChange={(e) => handleChange(key, e.target.checked)}
            />
          }
          label="Show Title"
        />
      );
    }

    // ✅ Boolean
    if (typeof value === "boolean") {
      return (
        <FormControlLabel
          key={key}
          control={
            <Switch
              checked={value}
              onChange={(e) => handleChange(key, e.target.checked)}
            />
          }
          label={key.replace(/([A-Z])/g, " $1")}
        />
      );
    }

    // ✅ Enum string → RadioGroup
    if (isEnumField(key, value)) {
      return (
        <FormControl key={key} component="fieldset" margin="normal">
          <FormLabel>{key.replace(/([A-Z])/g, " $1")}</FormLabel>
          <RadioGroup
            value={value}
            onChange={(e) => handleChange(key, e.target.value)}
            row
          >
            {enumFields[key].map((option) => (
              <FormControlLabel
                key={option}
                value={option}
                control={<Radio />}
                label={option}
              />
            ))}
          </RadioGroup>
        </FormControl>
      );
    }

    // ✅ Dropdown if array
    if (Array.isArray(value)) {
      return (
        <FormControl key={key} fullWidth margin="normal">
          <FormLabel>{key.replace(/([A-Z])/g, " $1")}</FormLabel>
          <Select
            value={value[0]}
            onChange={(e) => handleChange(key, e.target.value)}
          >
            {value.map((opt: string) => (
              <MenuItem key={opt} value={opt}>
                {opt}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      );
    }

    // ✅ Fallback: string input
    return (
      <TextField
        key={key}
        label={key.replace(/([A-Z])/g, " $1")}
        value={value}
        onChange={(e) => handleChange(key, e.target.value)}
        fullWidth
        margin="normal"
      />
    );
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Module Settings</DialogTitle>
      <DialogContent dividers>
        {Object.entries(localSettings).map(([key, value]) => (
          <Box key={key} sx={{ mb: 2 }}>
            {renderField(key, value)}
          </Box>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModuleSettingsDialog;
