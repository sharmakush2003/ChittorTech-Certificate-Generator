import React, { useState } from 'react';
import type { CertificateData, ColorTheme } from '../../types/certificate';
import { EditorTabs } from './EditorTabs';
import type { EditorTabId } from './EditorTabs';
import { BasicDetailsForm } from './BasicDetailsForm';
import { BodyTextForm } from './BodyTextForm';
import { BrandingForm } from './BrandingForm';
import { ThemeSelector } from './ThemeSelector';
import { BatchGeneratorModal } from './BatchGeneratorModal';
import { IssuedRegistryModal } from './IssuedRegistryModal';

interface EditorContainerProps {
  data: CertificateData;
  onChange: <K extends keyof CertificateData>(field: K, value: CertificateData[K]) => void;
  currentTheme: ColorTheme;
  onThemeSelect: (theme: ColorTheme) => void;
  currentFontClass: string;
  onFontSelect: (fontClass: string) => void;
  onApplyBatchStudent: (item: { candidateName: string; courseTitle: string; duration: string; certificateId: string }) => void;
}

export const EditorContainer: React.FC<EditorContainerProps> = ({
  data,
  onChange,
  currentTheme,
  onThemeSelect,
  currentFontClass,
  onFontSelect,
  onApplyBatchStudent,
}) => {
  const [activeTab, setActiveTab] = useState<EditorTabId>('basic');

  return (
    <div className="flex flex-col h-full bg-slate-900 border-r border-slate-800 text-white select-none overflow-hidden">
      
      {/* Top Header inside editor */}
      <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5">
          <img src="/chittortech_logo.png" alt="Logo" className="w-8 h-8 object-contain" />
          <div className="flex flex-col">
            <span className="text-sm font-black tracking-tight uppercase text-white leading-none">
              ChittorTech
            </span>
            <span className="text-[10px] font-semibold text-slate-400 tracking-wider">
              CERTIFICATE GENERATOR
            </span>
          </div>
        </div>
        <div className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-black uppercase tracking-wider">
          v2.12 CACHE PERSISTENT
        </div>
      </div>

      {/* Navigation Tabs */}
      <EditorTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Tab Content Area */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'basic' && (
          <BasicDetailsForm data={data} onChange={onChange} />
        )}
        {activeTab === 'body' && (
          <BodyTextForm data={data} onChange={onChange} />
        )}
        {activeTab === 'branding' && (
          <BrandingForm data={data} onChange={onChange} />
        )}
        {activeTab === 'theme' && (
          <ThemeSelector
            currentTheme={currentTheme}
            onThemeSelect={onThemeSelect}
            currentFontClass={currentFontClass}
            onFontSelect={onFontSelect}
          />
        )}
        {activeTab === 'batch' && (
          <BatchGeneratorModal currentData={data} onApplyStudent={onApplyBatchStudent} />
        )}
        {activeTab === 'registry' && (
          <IssuedRegistryModal onApplyStudent={onApplyBatchStudent} />
        )}
      </div>

      {/* Footer Info inside Editor */}
      <div className="p-3 bg-slate-950 border-t border-slate-800 text-[11px] text-slate-500 flex items-center justify-between shrink-0">
        <span>Inspired by OctaNet & ChittorTech</span>
        <span className="text-slate-400 font-semibold">Live Auto-Save</span>
      </div>

    </div>
  );
};
