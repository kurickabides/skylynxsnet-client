// ================================================
// ✅ Component: EDPDFModule
// Description: Engineering Design Markup Module (PDF version)
// Author: NimbusCore.OpenAI
// Architect: Chad Martin
// Company: CryoRio
// Filename: /modules/EDPDFModule/EDPDFModule.tsx
// ================================================

import React, { useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Stage, Layer, Rect, Text } from "react-konva";
import ModuleFrame from "../../components/ui/module/moduleFrame";
import { PDFWrapper, OverlayCanvas } from "./styled";
import ContainerMixins from "../../theme/themeMixins";
import { EDPDFModuleProps } from "./types";

// Use local worker (previously broken due to CORS when CDN used)
pdfjs.GlobalWorkerOptions.workerSrc = "/workers/pdf.worker.min.js";

const EDPDFModule: React.FC<EDPDFModuleProps> = ({
  settings,
  onSettingsUpdate,
  children,
}) => {
  const stageRef = useRef<any>(null);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const { pdfCanvas, markupBox, markupText } = ContainerMixins;

  // Use settings or fallback zoom
  const zoom = settings.defaultZoomLevel ?? 1.0;
  const scaledWidth = pdfCanvas.width * zoom;
  const scaledHeight = pdfCanvas.height * zoom;

  const pdfUrl = settings.pdfPath ?? "http://localhost:3000/content/sample.pdf";

  return (
    <ModuleFrame settings={settings} onSettingsUpdate={onSettingsUpdate}>
      <PDFWrapper style={{ width: scaledWidth, height: scaledHeight }}>
        <Document
          file={pdfUrl}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        >
          <Page
            pageNumber={currentPage}
            width={scaledWidth}
            renderAnnotationLayer={false}
            renderTextLayer={false}
          />
        </Document>

        {/* Markup Canvas Overlay */}
        <OverlayCanvas style={{ width: scaledWidth, height: scaledHeight }}>
          <Stage
            ref={stageRef}
            width={scaledWidth}
            height={scaledHeight}
            scaleX={zoom}
            scaleY={zoom}
          >
            <Layer>
              <Rect
                x={markupBox.x}
                y={markupBox.y}
                width={markupBox.width}
                height={markupBox.height}
                fill={markupBox.fill}
              />
              <Text
                x={markupBox.x + 10}
                y={markupBox.y + 10}
                text="Sample Markup"
                fontSize={markupText.fontSize}
                fill={markupText.color}
              />
            </Layer>
          </Stage>
        </OverlayCanvas>

        {children}
      </PDFWrapper>
    </ModuleFrame>
  );
};

export default EDPDFModule;
