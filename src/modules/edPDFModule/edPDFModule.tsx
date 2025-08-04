// ================================================
// ✅ Component: EDPDFModule
// Description: Engineering Design Markup Module (PDF version)
// Author: NimbusCore.OpenAI
// Architect: Chad Martin
// Company: CryoRio
// Filename: /modules/EDPDFModule/EDPDFModule.tsx
// ================================================

import React, { useRef, useState } from "react";
import { Stage, Layer, Rect, Text } from "react-konva";
import ModuleFrame from "../../components/ui/module/moduleFrame";
import PdfViewer from "../../components/pdf/pdfViewer";
import PdfToolbar from "../../components/pdf/pdfToolbar";
import { PDFWrapper } from "./styled";
import ContainerMixins from "../../theme/themeMixins";
import { EDPDFModuleProps } from "./types";
import MarkupLayer from "../../components/pdf/markupLayer"; // ✅ Fixed missing .tsx extension

const EDPDFModule: React.FC<EDPDFModuleProps> = ({
  settings,
  onSettingsUpdate,
  children,
}) => {
  const stageRef = useRef<any>(null);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const { pdfCanvas, markupBox, markupText } = ContainerMixins;

  const zoomLevel = settings.defaultZoomLevel ?? 1;
  const scaledWidth = pdfCanvas.width * zoomLevel;
  const scaledHeight = pdfCanvas.height * zoomLevel;

  const pdfUrl = settings.pdfPath ?? "/content/sample.pdf";

  const handleLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  return (
    <ModuleFrame settings={settings} onSettingsUpdate={onSettingsUpdate}>
      {settings.showToolbar && (
        <PdfToolbar
          currentPage={currentPage}
          numPages={numPages ?? 1}
          zoomLevel={zoomLevel}
          onZoomChange={() => {}}
          onPageChange={setCurrentPage}
        />
      )}

      <PDFWrapper style={{ width: "100%" }}>
        <PdfViewer
          fileUrl={pdfUrl}
          zoomLevel={zoomLevel}
          maxHeight={settings.maxHeight || 600}
          currentPage={currentPage}
          onLoadSuccess={handleLoadSuccess}
        />

        <MarkupLayer
          zoom={zoomLevel}
          stageRef={stageRef}
          height={scaledHeight}
        >
        </MarkupLayer>
      </PDFWrapper>

      {children}
    </ModuleFrame>
  );
};

export default EDPDFModule;
