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
  Box,
} from "@mui/material";
import {
  SkylynxModuleSettings,
  ModuleSettingsDialogProps,
} from "./types/moduleWrapper/index";

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
    // ⛔ Skip internal / uneditable fields
    if (key === "id") return null;

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

    if (typeof value === "string") {
      if (key === "layoutVariant") {
        return (
          <FormControl key={key} component="fieldset" margin="normal">
            <FormLabel component="legend">Layout</FormLabel>
            <RadioGroup
              value={value}
              onChange={(e) => handleChange(key, e.target.value)}
              row
            >
              <FormControlLabel value="grid" control={<Radio />} label="Grid" />
              <FormControlLabel value="list" control={<Radio />} label="List" />
            </RadioGroup>
          </FormControl>
        );
      }

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
    }

    return null;
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
