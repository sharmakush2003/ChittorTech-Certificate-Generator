import React from 'react';
import { User, FileText, Award, Users, Database } from 'lucide-react';

export type EditorTabId = 'basic' | 'body' | 'branding' | 'theme' | 'batch' | 'registry';

interface EditorTabsProps {
  activeTab: EditorTabId;
  setActiveTab: (tab: EditorTabId) => void;
}

export const EditorTabs: React.FC<EditorTabsProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'basic' as EditorTabId, label: 'Details', icon: User },
    { id: 'body' as EditorTabId, label: 'Content', icon: FileText },
    { id: 'branding' as EditorTabId, label: 'Branding & Sign', icon: Award },
    { id: 'batch' as EditorTabId, label: 'Batch Mode', icon: Users },
    { id: 'registry' as EditorTabId, label: 'Issued Registry', icon: Database, badge: 'DB' },
  ];

  return (
    <div className="flex items-center gap-1 p-1 bg-slate-900 border-b border-slate-800 overflow-x-auto select-none shrink-0">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-3.5 py-2.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              isActive
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
            <span>{tab.label}</span>
            {tab.badge && (
              <span className="text-[9px] font-black px-1.5 py-0.2 bg-amber-500/20 text-amber-300 rounded border border-amber-500/30 ml-0.5">
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
