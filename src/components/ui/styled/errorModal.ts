// ================================================
// ✅ Styles: Error Modal Styles
// File: components/ui/styled/errorModal.ts
// ================================================
import { styled } from "@mui/material/styles";
import {
  ERRORWIN_TOP,
  ERRORWIN_LEFT,
  ERRORWIN_WIDTH,
} from "../../../helpers/constants";

export const Backdrop = styled("div")(({ theme }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: theme.palette.grey[900],
  opacity: 0.5,
  zIndex: 999,
}));

export const ErrorPopup = styled("div")(({ theme }) => ({
  position: "fixed",
  top: ERRORWIN_TOP,
  left: `calc(50% - ${ERRORWIN_LEFT})`,
  width: ERRORWIN_WIDTH,
  background: theme.palette.info.light,
  padding: theme.spacing(3),
  zIndex: 1000,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[5],
}));

export const ErrorActions = styled("div")(({ theme }) => ({
  marginTop: theme.spacing(2),
  display: "flex",
  justifyContent: "flex-end",
}));
