// ================================================
// ✅ Styled: PDFWrapper
// Description: Styled wrapper for PDF and canvas overlay
// Author: NimbusCore.OpenAI
// Architect: Chad Martin
// Company: CryoRio
// Filename: /modules/EDPDFModule/styled/pdfWrapper.ts
// ================================================

import styled from "@emotion/styled";

export const PDFWrapper = styled("div")({
  position: "relative",
  display: "inline-block",
  width: "fit-content",
  height: "fit-content",
});

export const OverlayCanvas = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  pointer-events: none;
`;