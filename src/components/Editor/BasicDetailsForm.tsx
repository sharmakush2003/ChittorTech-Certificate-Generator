import React, { useState } from 'react';
import type { CertificateData } from '../../types/certificate';
import { User, Mail, BookOpen, Clock, Calendar, Hash, Sparkles, ShieldCheck, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { isCertIdAlreadyTaken, getNextAvailableCertId, saveCertificateToRegistry } from '../../utils/certRegistry';

interface BasicDetailsFormProps {
  data: CertificateData;
  onChange: <K extends keyof CertificateData>(field: K, value: CertificateData[K]) => void;
}

export const BasicDetailsForm: React.FC<BasicDetailsFormProps> = ({ data, onChange }) => {
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string>('');

  const takenBy = isCertIdAlreadyTaken(data.certificateId, data.candidateName);

  const handleCertificateIdChange = (newId: string) => {
    onChange('certificateId', newId);
    if (!data.qrCodeUrl || data.qrCodeUrl.includes('verify.chittortech.com') || data.qrCodeUrl.includes('?verify=')) {
      const liveOrigin = window.location.origin.includes('localhost') ? window.location.origin : window.location.origin;
      onChange('qrCodeUrl', `${liveOrigin}/?verify=${newId}`);
    }
  };

  const handleAutoIncrement = () => {
    const nextId = getNextAvailableCertId();
    handleCertificateIdChange(nextId);
  };

  const handleSaveAndIssue = () => {
    if (!data.candidateName.trim()) {
      alert('Please enter a candidate name before issuing.');
      return;
    }

    saveCertificateToRegistry({
      certificateId: data.certificateId,
      candidateName: data.candidateName,
      courseTitle: data.courseTitle,
      issueDate: data.issueDate,
      companyName: data.companyName,
    });

    const nextId = getNextAvailableCertId();
    setSaveSuccessMsg(`Certificate ${data.certificateId} saved! Set next ID: ${nextId}`);
    
    // Auto-advance to next ID for next student
    setTimeout(() => {
      handleCertificateIdChange(nextId);
      setSaveSuccessMsg('');
    }, 1800);
  };

  return (
    <div className="p-5 space-y-5 overflow-y-auto">
      <div className="border-b border-slate-800 pb-3">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <User className="w-4 h-4 text-blue-400" />
          Candidate & Program Information
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          These primary fields appear prominently on the core certificate body.
        </p>
      </div>

      <div className="space-y-4">
        {/* Candidate Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center justify-between">
            <span>Candidate Name</span>
            <span className="text-[10px] text-blue-400 font-normal">Displayed in Large Title</span>
          </label>
          <div className="relative">
            <User className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={data.candidateName}
              onChange={(e) => onChange('candidateName', e.target.value)}
              placeholder="e.g. Khushi Tailor"
              className="w-full pl-9 pr-3 py-2.5 rounded-lg glass-input text-sm font-medium"
            />
          </div>
        </div>

        {/* Candidate Email */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center justify-between">
            <span>Candidate Email Address (Optional)</span>
            <span className="text-[10px] text-emerald-400 font-normal">For prefilling Gmail compose</span>
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
            <input
              type="email"
              value={data.candidateEmail || ''}
              onChange={(e) => onChange('candidateEmail', e.target.value)}
              placeholder="e.g. candidate@example.com"
              className="w-full pl-9 pr-3 py-2.5 rounded-lg glass-input text-sm font-medium"
            />
          </div>
        </div>

        {/* Certificate Number / ID with Auto-Increment & Warning */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center justify-between">
            <span>Certificate Number / ID</span>
            <button
              type="button"
              onClick={handleAutoIncrement}
              className="text-[10px] text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 bg-amber-400/10 border border-amber-400/30 px-2 py-0.5 rounded transition cursor-pointer"
            >
              <Sparkles className="w-3 h-3" /> Get Next Free ID
            </button>
          </label>
          <div className="relative">
            <Hash className="absolute left-3 top-3 w-4 h-4 text-amber-400" />
            <input
              type="text"
              value={data.certificateId}
              onChange={(e) => handleCertificateIdChange(e.target.value)}
              placeholder="CT-2026-001"
              className={`w-full pl-9 pr-3 py-2.5 rounded-lg glass-input text-sm font-mono font-bold ${
                takenBy ? 'text-rose-400 border-rose-500/60 bg-rose-950/20' : 'text-amber-300'
              }`}
            />
          </div>

          {/* Status Indicator */}
          {takenBy ? (
            <div className="mt-1.5 p-2 rounded-lg bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs flex items-center justify-between gap-2">
              <span className="flex items-center gap-1.5 font-medium">
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>Occupied by <strong>{takenBy.candidateName}</strong></span>
              </span>
              <button
                type="button"
                onClick={handleAutoIncrement}
                className="text-[10px] bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 border border-rose-400/40 px-2 py-0.5 rounded font-bold transition cursor-pointer shrink-0"
              >
                Use Free ID ({getNextAvailableCertId()})
              </button>
            </div>
          ) : (
            <div className="mt-1.5 px-2.5 py-1 rounded-lg bg-emerald-950/30 border border-emerald-500/30 text-emerald-400 text-[11px] font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>ID <strong>{data.certificateId}</strong> is Available (Unassigned)</span>
            </div>
          )}

          {/* Issue & Save Button */}
          <div className="mt-2.5 flex items-center gap-2">
            <button
              type="button"
              onClick={handleSaveAndIssue}
              className="w-full py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs rounded-lg shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              Issue & Lock ID to Registry
            </button>
          </div>

          {saveSuccessMsg && (
            <div className="mt-2 p-2 rounded bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 text-xs font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{saveSuccessMsg}</span>
            </div>
          )}
        </div>

        {/* Course / Internship Title */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
            Course or Internship Title
          </label>
          <div className="relative">
            <BookOpen className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={data.courseTitle}
              onChange={(e) => onChange('courseTitle', e.target.value)}
              placeholder="e.g. Web Development Internship"
              className="w-full pl-9 pr-3 py-2.5 rounded-lg glass-input text-sm font-medium"
            />
          </div>
        </div>

        {/* Duration / Date Range */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
            Duration & Date Badge
          </label>
          <div className="relative">
            <Clock className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={data.duration}
              onChange={(e) => onChange('duration', e.target.value)}
              placeholder="e.g. Duration: 2 Months ( 1st May 2025 - 1st July 2025 )"
              className="w-full pl-9 pr-3 py-2.5 rounded-lg glass-input text-sm font-medium"
            />
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Displayed inside the highlighted rounded capsule badge below the title.
          </p>
        </div>

        {/* Issue Date */}
        <div className="pt-2">
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
            Issue Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={data.issueDate}
              onChange={(e) => onChange('issueDate', e.target.value)}
              placeholder="16-07-2026"
              className="w-full pl-9 pr-3 py-2.5 rounded-lg glass-input text-sm font-medium"
            />
          </div>
        </div>

      </div>
    </div>
  );
};
