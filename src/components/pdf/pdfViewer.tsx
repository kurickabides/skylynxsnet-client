// ================================================
// ✅ Component: PdfViewer
// Description: Displays PDF document with scroll and scaling
// Author: NimbusCore.OpenAI
// Architect: Chad Martin
// Company: CryoRio
// Filename: components/pdf/PdfViewer.tsx
// ================================================

import React from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { PdfViewerProps } from "./types";
import {
  ContainerPdfViewer,
  ScrollWrapperPdfViewer,
  PageWrapperPdfViewer,
} from "./styled";

pdfjs.GlobalWorkerOptions.workerSrc = "/workers/pdf.worker.min.js";

const PdfViewer: React.FC<PdfViewerProps> = ({
  fileUrl,
  zoomLevel = 1,
  maxHeight = 800,
  currentPage,
  onLoadSuccess,
}) => {
  return (
    <ContainerPdfViewer>
      <ScrollWrapperPdfViewer style={{ maxHeight }}>
        <Document file={fileUrl} onLoadSuccess={onLoadSuccess}>
          <PageWrapperPdfViewer>
            <Page pageNumber={currentPage} scale={zoomLevel} />
          </PageWrapperPdfViewer>
        </Document>
      </ScrollWrapperPdfViewer>
    </ContainerPdfViewer>
  );
};

export default PdfViewer;
