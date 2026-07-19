import React from 'react';
import type { CertificateData } from '../../types/certificate';
import { Award, Building2, PenTool, QrCode, ExternalLink } from 'lucide-react';

interface BrandingFormProps {
  data: CertificateData;
  onChange: <K extends keyof CertificateData>(field: K, value: CertificateData[K]) => void;
}

export const BrandingForm: React.FC<BrandingFormProps> = ({ data, onChange }) => {
  return (
    <div className="p-5 space-y-6 overflow-y-auto">
      
      {/* Company & Header Branding */}
      <div className="space-y-4">
        <div className="border-b border-slate-800 pb-2">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Building2 className="w-4 h-4 text-amber-400" />
            Company Identity & Branding
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
              Company Name
            </label>
            <div className="px-3 py-2.5 rounded-lg bg-slate-800/50 border border-slate-700 text-sm font-bold text-slate-200 select-none">
              ChittorTech
            </div>
          </div>

          <div className="flex flex-col justify-end">
            <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 select-none text-emerald-400">
              <Award className="w-4 h-4 shrink-0" />
              <span className="text-xs font-bold">iStart Recognized Startup (Active)</span>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Official Brand Logo
          </label>
          <div className="flex items-center gap-3 bg-slate-800/30 p-2.5 rounded-lg border border-slate-800/80">
            <div className="w-12 h-12 rounded-lg bg-white/10 border border-slate-700 flex items-center justify-center p-1.5 shrink-0 overflow-hidden">
              <img src="/chittortech_logo.png" alt="ChittorTech Logo" className="max-h-full max-w-full object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-slate-200">chittortech_logo.png</span>
              <span className="text-[10px] text-slate-500">Locked to default branding</span>
            </div>
          </div>
        </div>
      </div>

      {/* Signature & Verification Section */}
      <div className="space-y-4 pt-2">
        <div className="border-b border-slate-800 pb-2">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <PenTool className="w-4 h-4 text-indigo-400" />
            Signatory Selection & Style
          </h3>
        </div>

        {/* Signatory Selector */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Select Active Signatory
          </label>
          <div className="grid grid-cols-2 gap-3">
            {[
              { name: 'Kush Sharma', role: 'Founder, ChittorTech' },
              { name: 'Lav Sharma', role: 'Co-Founder, ChittorTech' },
            ].map((sig) => {
              const isSelected = data.signatoryName === sig.name || (sig.name === 'Kush Sharma' && !data.signatoryName);
              return (
                <button
                  key={sig.name}
                  type="button"
                  onClick={() => onChange('signatoryName', sig.name)}
                  className={`p-3.5 rounded-xl border text-left transition flex flex-col justify-between ${
                    isSelected
                      ? 'bg-blue-600/20 border-blue-500 text-white shadow-md'
                      : 'bg-slate-800/50 border-slate-700/80 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <span className="text-xs font-bold">{sig.name}</span>
                  <span className="text-[10px] text-slate-400 mt-1">{sig.role}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Signature Style Picker */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Signature Font Style (Applies to selected signatory)
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'handwriting-1', label: 'Style 1 (Alex)', font: 'font-signature-1' },
              { id: 'handwriting-2', label: 'Style 2 (Vibes)', font: 'font-signature-2' },
              { id: 'handwriting-3', label: 'Style 3 (Dancing)', font: 'font-signature-3' },
            ].map((style) => (
              <button
                key={style.id}
                type="button"
                onClick={() => onChange('signatureStyle', style.id as any)}
                className={`p-3 rounded-lg border text-left transition flex flex-col justify-between ${
                  data.signatureStyle === style.id || (style.id === 'handwriting-1' && !data.signatureStyle)
                    ? 'bg-indigo-900/40 border-indigo-500 text-white shadow-md'
                    : 'bg-slate-800/50 border-slate-700/80 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <span className="text-[10px] text-slate-400 font-sans">{style.label}</span>
                <span className={`text-xl mt-2 text-amber-300 ${style.font} leading-none`}>
                  {data.signatoryName || 'Kush Sharma'}
                </span>
              </button>
            ))}
          </div>
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
            placeholder="https://verify.chittortech.com/cert/CT-2026-001"
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
