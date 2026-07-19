import React, { useState } from 'react';
import type { CertificateData, ColorTheme } from '../../types/certificate';
import { PreviewControls } from './PreviewControls';
import { CertificateTemplate } from './CertificateTemplate';

interface PreviewContainerProps {
  data: CertificateData;
  theme: ColorTheme;
  fontClass: string;
  onReset: () => void;
}

export const PreviewContainer: React.FC<PreviewContainerProps> = ({
  data,
  theme,
  fontClass,
  onReset,
}) => {
  const [zoom, setZoom] = useState<number>(85); // Default 85% zoom for optimal viewport fit

  return (
    <div className="flex flex-col h-full bg-slate-950 text-slate-100 overflow-hidden relative">
      
      {/* Top Action / Zoom Bar */}
      <PreviewControls
        certificateId={data.certificateId}
        zoom={zoom}
        setZoom={setZoom}
        onReset={onReset}
        targetElementId="certificate-node"
      />

      {/* Main Interactive Canvas Area */}
      <div className="flex-1 overflow-auto flex items-center justify-center p-8 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px]">
        <div
          className="transition-transform duration-200 ease-out flex items-center justify-center origin-center"
          style={{
            transform: `scale(${zoom / 100})`,
          }}
        >
          <CertificateTemplate
            id="certificate-node"
            data={data}
            theme={theme}
            fontClass={fontClass}
          />
        </div>
      </div>

      {/* Bottom Hint */}
      <div className="absolute bottom-4 right-6 pointer-events-none text-xs text-slate-500 font-medium bg-slate-900/80 backdrop-blur px-3 py-1.5 rounded-full border border-slate-800">
        Certificate Dimensions: <span className="font-mono text-slate-300">1123 × 794 px (Landscape A4)</span>
      </div>

    </div>
  );
};
