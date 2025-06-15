// ================================================
// ✅ Styles: P5Sketch
// Description: Local styling for canvas/sketch wrapper
// ================================================

import { styled } from "@mui/material/styles";
import { Sketch_HEIGHT } from "../../../helpers/constants";

export const SketchRoot = styled("div")(({ theme }) => ({
  flex: 1,
  display: "flex",
  justifyContent: "center",
  background: theme.palette.background.paper,
  minHeight: Sketch_HEIGHT,
}));

export const SketchFooter = styled("div")(({ theme }) => ({
  textTransform: "uppercase",
}));
