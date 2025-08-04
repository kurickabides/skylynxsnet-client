// ================================================
// ✅ Component: PdfToolbar
// Description: Toolbar for zoom and page navigation controls
// Author: NimbusCore.OpenAI
// Architect: Chad Martin
// Company: CryoRio
// Filename: components/pdf/PdfToolbar.tsx
// ================================================

import React from "react";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import {
  ToolbarPdfViewer,
  ButtonGroupPdfViewer,
  PageInfoPdfViewer,
} from "./styled";
import { PdfToolbarProps } from "./types";

const PdfToolbar: React.FC<PdfToolbarProps> = ({
  currentPage,
  numPages,
  zoomLevel,
  onPageChange,
  onZoomChange,
}) => {
  const handleZoomIn = () => {
    onZoomChange(Math.min(zoomLevel + 0.25, 3));
  };

  const handleZoomOut = () => {
    onZoomChange(Math.max(zoomLevel - 0.25, 0.5));
  };

  const handlePrevPage = () => {
    onPageChange(Math.max(currentPage - 1, 1));
  };

  const handleNextPage = () => {
    onPageChange(Math.min(currentPage + 1, numPages));
  };

  return (
    <ToolbarPdfViewer>
      <ButtonGroupPdfViewer>
        <IconButton onClick={handleZoomOut} title="Zoom Out">
          <ZoomOutIcon />
        </IconButton>
        <IconButton onClick={handleZoomIn} title="Zoom In">
          <ZoomInIcon />
        </IconButton>
      </ButtonGroupPdfViewer>

      <PageInfoPdfViewer>
        <IconButton onClick={handlePrevPage} disabled={currentPage <= 1}>
          <NavigateBeforeIcon />
        </IconButton>
        <Typography variant="body2">
          Page {currentPage} / {numPages}
        </Typography>
        <IconButton onClick={handleNextPage} disabled={currentPage >= numPages}>
          <NavigateNextIcon />
        </IconButton>
      </PageInfoPdfViewer>
    </ToolbarPdfViewer>
  );
};

export default PdfToolbar;
