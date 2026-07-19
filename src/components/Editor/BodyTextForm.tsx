import React from 'react';
import type { CertificateData } from '../../types/certificate';
import { PRESET_DESCRIPTIONS } from '../../data/defaultData';
import { FileText, Sparkles, CheckCircle2 } from 'lucide-react';

interface BodyTextFormProps {
  data: CertificateData;
  onChange: <K extends keyof CertificateData>(field: K, value: CertificateData[K]) => void;
}

export const BodyTextForm: React.FC<BodyTextFormProps> = ({ data, onChange }) => {
  return (
    <div className="p-5 space-y-5 overflow-y-auto">
      <div className="border-b border-slate-800 pb-3">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <FileText className="w-4 h-4 text-emerald-400" />
          Body Paragraph & Verification Text
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Customize the exact wording praising the candidate's achievements and performance.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>Certificate Description Text</span>
            <span className="text-[11px] text-slate-400 font-normal">
              {data.description.length} chars
            </span>
          </label>
          <textarea
            rows={6}
            value={data.description}
            onChange={(e) => onChange('description', e.target.value)}
            placeholder="Enter full verification paragraph describing what the student achieved..."
            className="w-full p-3 rounded-lg glass-input text-sm leading-relaxed font-normal resize-y"
          />
        </div>

        {/* Presets */}
        <div className="pt-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Quick Presets & Templates (Click to Apply)</span>
          </div>

          <div className="grid grid-cols-1 gap-2.5">
            {PRESET_DESCRIPTIONS.map((preset, idx) => {
              const isCurrent = data.description === preset.text;
              return (
                <div
                  key={idx}
                  onClick={() => onChange('description', preset.text)}
                  className={`p-3 rounded-lg border text-left transition cursor-pointer flex flex-col gap-1 ${
                    isCurrent
                      ? 'bg-blue-900/40 border-blue-500/80 shadow-md shadow-blue-500/10'
                      : 'bg-slate-800/40 hover:bg-slate-800 border-slate-700/80 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-200">
                      {preset.label}
                    </span>
                    {isCurrent && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                    {preset.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
