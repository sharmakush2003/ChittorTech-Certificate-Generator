import React from 'react';
import type { ColorTheme } from '../../types/certificate';
import { COLOR_THEMES, FONT_OPTIONS } from '../../data/defaultData';
import { Palette, Type, Check } from 'lucide-react';

interface ThemeSelectorProps {
  currentTheme: ColorTheme;
  onThemeSelect: (theme: ColorTheme) => void;
  currentFontClass: string;
  onFontSelect: (fontClass: string) => void;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  currentTheme,
  onThemeSelect,
  currentFontClass,
  onFontSelect,
}) => {
  return (
    <div className="p-5 space-y-6 overflow-y-auto">
      
      {/* Color Palette Presets */}
      <div className="space-y-4">
        <div className="border-b border-slate-800 pb-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Palette className="w-4 h-4 text-pink-400" />
            Color Theme & Vertical Banner
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Instantly switch the color scheme, accent borders, and vertical sidebar gradients.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {COLOR_THEMES.map((theme) => {
            const isSelected = currentTheme.id === theme.id;
            return (
              <div
                key={theme.id}
                onClick={() => onThemeSelect(theme)}
                className={`p-3.5 rounded-xl border transition cursor-pointer flex flex-col justify-between gap-3 ${
                  isSelected
                    ? 'bg-slate-800 border-blue-500 shadow-lg shadow-blue-500/20 ring-1 ring-blue-500'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white tracking-wide">
                    {theme.name}
                  </span>
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white">
                      <Check className="w-3 h-3" />
                    </div>
                  )}
                </div>

                {/* Swatches preview */}
                <div className="flex items-center gap-2">
                  <div
                    className="w-10 h-6 rounded border border-white/20 shadow-xs"
                    style={{ background: theme.sidebarBg }}
                    title="Sidebar Gradient"
                  />
                  <div
                    className="w-6 h-6 rounded-full border border-white/20 shadow-xs"
                    style={{ backgroundColor: theme.primaryColor }}
                    title="Primary Color"
                  />
                  <div
                    className="w-6 h-6 rounded-full border border-white/20 shadow-xs"
                    style={{ backgroundColor: theme.badgeBorder }}
                    title="Badge Border"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Font Family Selector */}
      <div className="space-y-4 pt-2 border-t border-slate-800">
        <div className="border-b border-slate-800 pb-2">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Type className="w-4 h-4 text-amber-400" />
            Typography & Font Styling
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {FONT_OPTIONS.map((font) => {
            const isSelected = currentFontClass === font.className;
            return (
              <button
                key={font.id}
                type="button"
                onClick={() => onFontSelect(font.className)}
                className={`p-3 rounded-lg border text-left transition flex items-center justify-between ${font.className} ${
                  isSelected
                    ? 'bg-blue-900/40 border-blue-500 text-white shadow-md'
                    : 'bg-slate-800/40 border-slate-700/80 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div>
                  <span className="block text-xs font-semibold text-slate-400 font-sans">
                    {font.name.split(' (')[0]}
                  </span>
                  <span className="text-sm font-bold text-white tracking-wide mt-0.5 block">
                    Khushi Tailor
                  </span>
                </div>
                {isSelected && <Check className="w-4 h-4 text-blue-400" />}
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
};
