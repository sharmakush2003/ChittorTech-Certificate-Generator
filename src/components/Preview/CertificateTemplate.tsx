import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import type { CertificateData, ColorTheme } from '../../types/certificate';

interface CertificateTemplateProps {
  data: CertificateData;
  theme: ColorTheme;
  fontClass: string;
  id?: string;
}

export const CertificateTemplate: React.FC<CertificateTemplateProps> = ({
  data,
  theme,
  fontClass,
  id = 'certificate-node',
}) => {
  return (
    <div
      id={id}
      className={`relative w-[1123px] h-[794px] bg-white text-gray-900 shadow-2xl flex overflow-hidden border border-gray-200 select-none ${fontClass}`}
      style={{
        boxSizing: 'border-box',
      }}
    >
      {/* Decorative radial glow */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03] flex items-center justify-center"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, ${theme.primaryColor} 0%, transparent 70%)`
        }}
      />

      {/* Left Vertical Accent Banner */}
      <div
        className="w-[105px] h-full relative flex items-center justify-center shrink-0 z-10 shadow-md"
        style={{ background: theme.sidebarBg }}
      >
        <div className="absolute top-0 left-0 w-full h-3 bg-black/20" />
        <div className="absolute bottom-0 left-0 w-full h-3 bg-black/20" />
        <span
          className="text-white text-4xl font-extrabold tracking-[0.35em] uppercase transform -rotate-90 whitespace-nowrap drop-shadow-md"
          style={{ color: theme.sidebarText }}
        >
          C E R T I F I C A T E
        </span>
      </div>

      {/* Right Side / Main Certificate Area */}
      <div className="flex-1 flex flex-col justify-between p-12 pl-14 relative z-10 overflow-hidden">
        
        {/* Central Background Watermark Logo exactly as requested (`watermark ke tarah center me`) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 select-none">
          <img
            src={data.logoUrl || '/chittortech_logo.png'}
            alt="Watermark"
            className="w-[420px] h-[420px] object-contain opacity-[0.06] filter grayscale mix-blend-multiply"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/chittortech_logo.png';
            }}
          />
        </div>

        {/* Top Header Section */}
        <div className="grid grid-cols-3 items-center border-b border-gray-100 pb-4 w-full">
          {/* Left Column: ISO Badge & Corporate Identity Number (if enabled) */}
          <div className="flex items-center gap-4 justify-start">
            {data.showIsoBadge && (
              <div className="flex items-center border-2 border-amber-500 rounded px-3 py-1 bg-amber-50/60 shadow-xs scale-90 origin-left">
                <div className="mr-2 text-amber-600 font-black text-lg flex items-center justify-center w-6 h-6 rounded-full bg-amber-100 border border-amber-300">
                  ✓
                </div>
                <div className="flex flex-col leading-tight">
                  <div className="flex items-center gap-1 font-black text-gray-900 text-xs tracking-tight">
                    <span>ISO</span>
                    <span className="text-[10px] font-semibold px-1 py-0.2 bg-amber-500 text-white rounded">9001:2015</span>
                  </div>
                  <span className="text-[9px] font-bold tracking-widest text-gray-700 uppercase">CERTIFIED</span>
                </div>
              </div>
            )}
            {data.cin && (
              <div className="flex flex-col">
                <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">CIN :</span>
                <span className="text-xs font-bold text-gray-800 tracking-wide font-mono">{data.cin}</span>
              </div>
            )}
          </div>

          {/* Center Column: Company Brand & Logo (Seamlessly integrated with mix-blend-multiply so it doesn't look pasted) */}
          <div className="flex flex-col items-center justify-center text-center">
            <img
              src={data.logoUrl || '/chittortech_logo.png'}
              alt="ChittorTech Logo"
              className="h-24 object-contain mb-1 mix-blend-multiply select-none"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/chittortech_logo.png';
              }}
            />
            <span className="text-xs font-black tracking-widest uppercase text-gray-600 leading-none">
              OFFICIAL CERTIFICATION
            </span>
          </div>

          {/* Right Column: Certificate No Header Badge */}
          <div className="flex items-center justify-end">
            {data.certificateId && (
              <div className="flex items-center gap-2 bg-gradient-to-r from-slate-50 to-blue-50/80 border-2 border-blue-200/80 px-4 py-2 rounded-xl shadow-xs">
                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Cert No :</span>
                <span className="text-sm font-black font-mono tracking-widest" style={{ color: theme.primaryColor }}>
                  {data.certificateId}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Core Certificate Content */}
        <div className="flex flex-col items-center text-center my-auto py-4">
          <p className="text-2xl font-medium text-gray-600 font-serif italic tracking-wide">
            This is to certify that
          </p>

          <h1
            className="text-5xl font-black tracking-tight my-4 pb-1 border-b-2 px-12 border-opacity-30 drop-shadow-xs"
            style={{ 
              color: theme.primaryColor,
              borderColor: theme.primaryColor
            }}
          >
            {data.candidateName || 'Candidate Name'}
          </h1>

          <h2 className="text-3xl font-extrabold text-gray-900 mt-2 tracking-tight">
            {data.courseTitle || 'Course / Internship Title'}
          </h2>

          <div className="mt-3 py-1 px-5 rounded-full bg-gray-100/80 border border-gray-200 inline-block">
            <p className="text-base font-bold text-gray-800 tracking-wide">
              {data.duration || 'Duration Details'}
            </p>
          </div>

          <p className="mt-7 text-gray-700 text-base leading-relaxed text-justify max-w-3xl px-6 font-normal">
            {data.description}
          </p>
        </div>

        {/* Footer Section: Verified By on LEFT corner, Stamp & QR Code in Center, Compact iStart Badge on RIGHT corner */}
        <div className="flex items-end justify-between pt-4 border-t border-gray-100 w-full mt-auto">
          
          {/* Left Footer: Signatory & Verified By */}
          <div className="flex flex-col items-start text-left pb-0.5">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-0.5">
              Verified By :
            </span>
            
            <div className="h-12 flex items-end justify-start my-0.5">
              {data.signatureStyle === 'upload' && data.signatureUrl ? (
                <img src={data.signatureUrl} alt="Signature" className="max-h-12 object-contain" />
              ) : (
                <span 
                  className={`text-4xl pr-4 leading-none ${
                    data.signatureStyle === 'handwriting-2' ? 'font-signature-2' :
                    data.signatureStyle === 'handwriting-3' ? 'font-signature-3' :
                    'font-signature-1'
                  }`}
                  style={{ color: theme.primaryColor }}
                >
                  {data.signatoryName || 'Signature'}
                </span>
              )}
            </div>

            <div className="w-52 h-[1.5px] bg-gray-400 my-1" />
            
            <span className="text-sm font-extrabold text-gray-900 leading-tight">
              {data.signatoryTitle.split('\n')[0] || 'Director & CEO'}
            </span>
            <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mt-0.5">
              {data.signatoryTitle.split('\n')[1] || data.companyName}
            </span>
          </div>

          {/* Center Footer: QR Code & Verification Badge + Optional Seal */}
          <div className="flex items-center gap-3.5 justify-center pb-0.5">
            {/* QR Code & Verified by ChittorTech Badge */}
            {data.showQrCode !== false && (
              <div className="flex items-center gap-2.5 bg-gradient-to-r from-slate-50 to-emerald-50/60 p-2 rounded-xl border border-emerald-200/90 shadow-2xs">
                <div className="p-1 bg-white rounded-lg border border-gray-200 flex items-center justify-center shrink-0 shadow-2xs">
                  <QRCodeSVG
                    value={data.qrCodeUrl || `https://verify.chittortech.com/cert/${data.certificateId}`}
                    size={52}
                    level="H"
                    includeMargin={false}
                  />
                </div>
                
                {data.showVerifiedBadge !== false && (
                  <div className="flex flex-col text-left leading-tight pr-1">
                    <div className="flex items-center gap-1 text-[10px] font-black text-emerald-700 tracking-tight">
                      <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-emerald-600 text-white text-[8px] font-bold">✓</span>
                      <span>Verified by</span>
                    </div>
                    <span className="text-xs font-black text-gray-900 tracking-wide uppercase mt-0.5">
                      ChittorTech
                    </span>
                    {data.issueDate && (
                      <span className="text-[9px] font-bold text-gray-600 tracking-tight mt-1 border-t border-emerald-200/80 pt-0.5">
                        Date: <span className="font-semibold text-gray-900">{data.issueDate}</span>
                      </span>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Official Stamp / Seal (if enabled) */}
            {data.sealType !== 'none' && (
              <div className="flex justify-center items-center">
                {data.sealType === 'dynamic' ? (
                  <div 
                    className="w-22 h-22 rounded-full border-[3px] border-double flex flex-col items-center justify-center text-center p-1 transform -rotate-12 select-none shadow-xs relative bg-white/50"
                    style={{ borderColor: theme.sealColor, color: theme.sealColor }}
                  >
                    <div className="absolute inset-1 rounded-full border border-dashed opacity-40 pointer-events-none" style={{ borderColor: theme.sealColor }} />
                    <span className="text-[7.5px] font-black tracking-tighter uppercase leading-none px-1">
                      {data.companyName.substring(0, 24)}
                    </span>
                    <span className="text-[8px] my-0.5">★ ★ ★</span>
                    <div className="px-1 py-0.2 rounded border bg-white/80" style={{ borderColor: theme.sealColor }}>
                      <span className="text-[8.5px] font-black tracking-widest uppercase">VERIFIED</span>
                    </div>
                    <span className="text-[6px] font-bold uppercase tracking-widest opacity-85 mt-0.5">
                      OFFICIAL SEAL
                    </span>
                  </div>
                ) : data.sealType === 'upload' && data.sealUrl ? (
                  <img src={data.sealUrl} alt="Seal" className="w-18 h-18 object-contain transform -rotate-6" />
                ) : null}
              </div>
            )}
          </div>

          {/* Right Footer: Compact iStart Rajasthan Government Approved Startup Badge */}
          <div className="flex items-end pb-0.5">
            {(data.showIstartBadge !== false) && (
              <div className="flex items-center gap-2.5 border border-emerald-400/70 rounded-lg px-3 py-1.5 bg-gradient-to-r from-emerald-50/80 to-teal-50/80 shadow-2xs">
                <img
                  src="/istart.png"
                  alt="iStart Rajasthan"
                  className="h-10 object-contain drop-shadow-2xs shrink-0"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
                <div className="flex flex-col text-left border-l border-emerald-300/80 pl-2.5 py-0.5 leading-tight">
                  <span className="text-[9px] font-extrabold text-emerald-800 uppercase tracking-wider">
                    Rajasthan Government
                  </span>
                  <span className="text-[11px] font-black text-gray-900 tracking-tight uppercase mt-0.5">
                    Approved Startup
                  </span>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
