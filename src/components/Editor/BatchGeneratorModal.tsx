import React, { useState } from 'react';
import type { CertificateData } from '../../types/certificate';
import { Users, Upload, Play, CheckCircle2 } from 'lucide-react';

interface BatchGeneratorModalProps {
  currentData: CertificateData;
  onApplyStudent: (item: { candidateName: string; courseTitle: string; duration: string; certificateId: string }) => void;
}

export const BatchGeneratorModal: React.FC<BatchGeneratorModalProps> = ({
  currentData,
  onApplyStudent,
}) => {
  const [csvText, setCsvText] = useState<string>(
    `Name, CertificateID, CourseTitle, Duration\nKhushi Tailor, CT2026001, Web Development Internship, Duration: 2 Months ( 1st May - 1st July 2025 )\nRahul Sharma, CT2026002, Full Stack AI Engineering, Duration: 3 Months ( 1st June - 1st Sept 2025 )\nAnanya Verma, CT2026003, Cloud & DevOps Mastery, Duration: 2 Months ( 15th May - 15th July 2025 )`
  );

  const [parsedItems, setParsedItems] = useState<Array<{
    name: string;
    id: string;
    course: string;
    duration: string;
  }>>([]);

  const handleParse = () => {
    const lines = csvText.trim().split('\n').filter(Boolean);
    if (lines.length <= 1) {
      alert('Please enter at least one data row after the header.');
      return;
    }

    const rows = lines.slice(1).map((line) => {
      const parts = line.split(',').map((p) => p.trim());
      return {
        name: parts[0] || 'Unknown Student',
        id: parts[1] || `CT2026${Math.floor(100 + Math.random() * 900)}`,
        course: parts[2] || currentData.courseTitle,
        duration: parts[3] || currentData.duration,
      };
    });

    setParsedItems(rows);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (typeof event.target?.result === 'string') {
          setCsvText(event.target.result);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="p-5 space-y-6 overflow-y-auto">
      <div className="border-b border-slate-800 pb-3">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Users className="w-4 h-4 text-amber-400" />
          Batch Certificate Generator (CSV / Bulk Mode)
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Paste comma-separated data or upload a CSV file to rapidly generate certificates for dozens of students.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              CSV Data (Header: Name, CertificateID, CourseTitle, Duration)
            </label>
            <label className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-blue-400 text-xs font-semibold cursor-pointer border border-slate-700 flex items-center gap-1.5 transition">
              <Upload className="w-3.5 h-3.5" />
              <span>Upload CSV File</span>
              <input type="file" accept=".csv,.txt" onChange={handleFileUpload} className="hidden" />
            </label>
          </div>
          <textarea
            rows={5}
            value={csvText}
            onChange={(e) => setCsvText(e.target.value)}
            className="w-full p-3 rounded-lg glass-input text-xs font-mono leading-relaxed"
            placeholder="Paste your student data here..."
          />
        </div>

        <button
          type="button"
          onClick={handleParse}
          className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-lg shadow-md transition flex items-center justify-center gap-2"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          Parse & Preview List
        </button>

        {parsedItems.length > 0 && (
          <div className="space-y-3 pt-3 border-t border-slate-800">
            <h4 className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>Parsed {parsedItems.length} Students (Click any to load into live preview):</span>
            </h4>

            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {parsedItems.map((item, idx) => {
                const isLoaded = currentData.candidateName === item.name && currentData.certificateId === item.id;
                return (
                  <div
                    key={idx}
                    onClick={() => onApplyStudent({
                      candidateName: item.name,
                      courseTitle: item.course,
                      duration: item.duration,
                      certificateId: item.id,
                    })}
                    className={`p-3 rounded-lg border flex items-center justify-between transition cursor-pointer ${
                      isLoaded
                        ? 'bg-emerald-900/40 border-emerald-500 shadow-sm'
                        : 'bg-slate-800/50 hover:bg-slate-800 border-slate-700/80'
                    }`}
                  >
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-white flex items-center gap-2">
                        <span>{item.name}</span>
                        {isLoaded && <span className="text-[10px] bg-emerald-500 text-black px-1.5 py-0.2 font-black rounded uppercase">Loaded</span>}
                      </span>
                      <span className="text-xs text-slate-400">
                        {item.course} • <span className="font-mono text-slate-300">{item.id}</span>
                      </span>
                    </div>

                    <button
                      type="button"
                      className="px-2.5 py-1 text-xs font-semibold rounded bg-slate-700/80 hover:bg-blue-600 text-slate-200 hover:text-white transition"
                    >
                      Load into Preview
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
