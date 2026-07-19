import React from 'react';
import type { CertificateData } from '../../types/certificate';
import { Award, Building2, PenTool, ShieldCheck, Upload, Check, QrCode, ExternalLink } from 'lucide-react';

interface BrandingFormProps {
  data: CertificateData;
  onChange: <K extends keyof CertificateData>(field: K, value: CertificateData[K]) => void;
}

export const BrandingForm: React.FC<BrandingFormProps> = ({ data, onChange }) => {
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, field: 'logoUrl' | 'signatureUrl' | 'sealUrl') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          onChange(field, reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-5 space-y-6 overflow-y-auto">
      
      {/* Company & Header Branding */}
      <div className="space-y-4">
        <div className="border-b border-slate-800 pb-2">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Building2 className="w-4 h-4 text-amber-400" />
            Company Identity & Logo
          </h3>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
            Company Name
          </label>
          <input
            type="text"
            value={data.companyName}
            onChange={(e) => onChange('companyName', e.target.value)}
            placeholder="ChittorTech"
            className="w-full px-3 py-2.5 rounded-lg glass-input text-sm font-bold"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Corporate Identity No. (CIN)
            </label>
            <input
              type="text"
              value={data.cin}
              onChange={(e) => onChange('cin', e.target.value)}
              placeholder="Leave blank if no CIN"
              className="w-full px-3 py-2 rounded-lg glass-input text-xs font-mono"
            />
          </div>

          <div className="flex flex-col justify-end space-y-1.5">
            <label className="flex items-center gap-2 p-1.5 rounded-lg bg-slate-800/60 border border-slate-700 cursor-pointer hover:bg-slate-800 transition select-none">
              <input
                type="checkbox"
                checked={data.showIstartBadge !== false}
                onChange={(e) => onChange('showIstartBadge', e.target.checked)}
                className="w-4 h-4 rounded text-emerald-600 focus:ring-0"
              />
              <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>iStart Approved Startup</span>
              </span>
            </label>

            <label className="flex items-center gap-2 p-1.5 rounded-lg bg-slate-800/60 border border-slate-700 cursor-pointer hover:bg-slate-800 transition select-none">
              <input
                type="checkbox"
                checked={data.showIsoBadge}
                onChange={(e) => onChange('showIsoBadge', e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 focus:ring-0"
              />
              <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>ISO 9001:2015 Badge</span>
              </span>
            </label>
          </div>
        </div>

        {/* Logo Selection / Upload */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Brand Logo (`/chittortech_logo.png`)
          </label>
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-lg bg-white/10 border border-slate-700 flex items-center justify-center p-1.5 shrink-0 overflow-hidden">
              <img src={data.logoUrl || '/chittortech_logo.png'} alt="Preview" className="max-h-full max-w-full object-contain" />
            </div>
            <div className="flex-1 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => onChange('logoUrl', '/chittortech_logo.png')}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition border flex items-center gap-1.5 ${
                  data.logoUrl === '/chittortech_logo.png' || !data.logoUrl
                    ? 'bg-blue-600 border-blue-500 text-white'
                    : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <Check className="w-3.5 h-3.5" />
                ChittorTech Logo
              </button>
              <label className="px-3 py-1.5 rounded-md text-xs font-semibold bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 transition cursor-pointer flex items-center gap-1.5">
                <Upload className="w-3.5 h-3.5" />
                Upload Custom Logo
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, 'logoUrl')}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Signature & Verification Section */}
      <div className="space-y-4 pt-2">
        <div className="border-b border-slate-800 pb-2">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <PenTool className="w-4 h-4 text-indigo-400" />
            Signatory & Verification Stamp
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Signatory Name
            </label>
            <input
              type="text"
              value={data.signatoryName}
              onChange={(e) => onChange('signatoryName', e.target.value)}
              placeholder="Anjali Prusty"
              className="w-full px-3 py-2 rounded-lg glass-input text-sm font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Designation & Subtitle
            </label>
            <textarea
              rows={2}
              value={data.signatoryTitle}
              onChange={(e) => onChange('signatoryTitle', e.target.value)}
              placeholder={`Director & CEO\nChittorTech`}
              className="w-full px-3 py-1.5 rounded-lg glass-input text-xs font-medium leading-tight resize-none"
            />
          </div>
        </div>

        {/* Signature Style Picker */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Signature Font or Image Upload
          </label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'handwriting-1', label: 'Script Style 1 (Alex Brush)', font: 'font-signature-1' },
              { id: 'handwriting-2', label: 'Script Style 2 (Great Vibes)', font: 'font-signature-2' },
              { id: 'handwriting-3', label: 'Script Style 3 (Dancing)', font: 'font-signature-3' },
            ].map((style) => (
              <button
                key={style.id}
                type="button"
                onClick={() => onChange('signatureStyle', style.id as any)}
                className={`p-2.5 rounded-lg border text-left transition flex flex-col justify-between ${
                  data.signatureStyle === style.id
                    ? 'bg-indigo-900/40 border-indigo-500 text-white shadow-md'
                    : 'bg-slate-800/50 border-slate-700/80 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <span className="text-[10px] text-slate-400 font-sans">{style.label}</span>
                <span className={`text-2xl mt-1 text-amber-300 ${style.font}`}>
                  {data.signatoryName || 'Signature'}
                </span>
              </button>
            ))}

            <label
              className={`p-2.5 rounded-lg border text-left transition cursor-pointer flex flex-col justify-between ${
                data.signatureStyle === 'upload'
                  ? 'bg-indigo-900/40 border-indigo-500 text-white shadow-md'
                  : 'bg-slate-800/50 border-slate-700/80 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <span className="text-[10px] text-slate-400 font-sans flex items-center gap-1">
                <Upload className="w-3 h-3" /> Image Upload
              </span>
              <span className="text-xs font-semibold mt-2 text-slate-200">
                {data.signatureStyle === 'upload' && data.signatureUrl ? 'Image Selected ✓' : 'Upload PNG Stamp'}
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  handleFileUpload(e, 'signatureUrl');
                  onChange('signatureStyle', 'upload');
                }}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Official Seal / Stamp Choice */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Official Seal & Stamp Badge
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'dynamic', label: 'Dynamic ChittorTech Seal' },
              { id: 'upload', label: 'Custom Stamp Image' },
              { id: 'none', label: 'No Stamp' },
            ].map((seal) => (
              <button
                key={seal.id}
                type="button"
                onClick={() => onChange('sealType', seal.id as any)}
                className={`py-2 px-2.5 rounded-lg border text-xs font-bold transition text-center ${
                  data.sealType === seal.id
                    ? 'bg-blue-600 border-blue-500 text-white shadow-sm'
                    : 'bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-800'
                }`}
              >
                {seal.label}
              </button>
            ))}
          </div>

          {data.sealType === 'upload' && (
            <div className="mt-2.5">
              <label className="flex items-center justify-center gap-2 p-3 rounded-lg border border-dashed border-slate-600 hover:border-blue-400 cursor-pointer bg-slate-800/30 text-xs font-semibold text-slate-300 transition">
                <Upload className="w-4 h-4 text-blue-400" />
                <span>Choose Stamp Image (PNG with transparent background recommended)</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, 'sealUrl')}
                  className="hidden"
                />
              </label>
            </div>
          )}
        </div>

      </div>

      {/* QR Code Verification & Badge Settings */}
      <div className="space-y-4 pt-2">
        <div className="border-b border-slate-800 pb-2">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <QrCode className="w-4 h-4 text-emerald-400" />
            QR Verification & Security Badge
          </h3>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center justify-between">
            <span>Verification Link / QR Target URL</span>
            <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
          </label>
          <input
            type="text"
            value={data.qrCodeUrl}
            onChange={(e) => onChange('qrCodeUrl', e.target.value)}
            placeholder="https://verify.chittortech.com/cert/CT2026001"
            className="w-full px-3 py-2.5 rounded-lg glass-input text-xs font-mono text-emerald-300"
          />
          <p className="text-[11px] text-slate-500 mt-1">
            Scanning the QR code on the certificate will redirect to this URL.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-1">
          <label className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-800/60 border border-slate-700 cursor-pointer hover:bg-slate-800 transition select-none">
            <input
              type="checkbox"
              checked={data.showQrCode !== false}
              onChange={(e) => onChange('showQrCode', e.target.checked)}
              className="w-4 h-4 rounded text-emerald-600 focus:ring-0"
            />
            <span className="text-xs font-bold text-slate-200">Show QR Code</span>
          </label>

          <label className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-800/60 border border-slate-700 cursor-pointer hover:bg-slate-800 transition select-none">
            <input
              type="checkbox"
              checked={data.showVerifiedBadge !== false}
              onChange={(e) => onChange('showVerifiedBadge', e.target.checked)}
              className="w-4 h-4 rounded text-blue-600 focus:ring-0"
            />
            <span className="text-xs font-bold text-slate-200">"Verified by ChittorTech" Badge</span>
          </label>
        </div>
      </div>

    </div>
  );
};
