import React from 'react';
import type { CertificateData } from '../types/certificate';
import type { VerifiableCert } from '../utils/certRegistry';
import { CheckCircle2, Building2, Calendar, Award, User, BookOpen, HeartHandshake, AlertTriangle, XCircle } from 'lucide-react';

interface VerificationViewProps {
  certId: string;
  data: CertificateData;
  certData: VerifiableCert | CertificateData | null;
  isValid: boolean;
  onBackToApp?: () => void;
}

export const VerificationView: React.FC<VerificationViewProps> = ({ certId, data, certData, isValid }) => {
  const activeCert = certData || data;

  // If invalid or not found
  if (!isValid || !certData) {
    return (
      <div className="min-h-screen w-full bg-slate-100 flex flex-col items-center justify-center p-3 sm:p-6 font-sans text-slate-800 relative overflow-y-auto select-none">
        {/* Background decorative headers */}
        <div className="absolute top-0 left-0 w-full h-80 bg-gradient-to-b from-rose-700 via-rose-600 to-slate-100 -z-0" />
        <div className="absolute top-28 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-rose-400/20 rounded-full blur-3xl -z-0 pointer-events-none" />

        {/* Main Invalid Verification Card */}
        <div className="w-full max-w-md bg-white border border-rose-200 rounded-3xl p-5 sm:p-8 shadow-2xl relative z-10 space-y-5 my-auto">
          
          {/* Top Header */}
          <div className="flex flex-col items-center text-center border-b border-slate-100 pb-5">
            <div className="w-16 h-16 rounded-full bg-rose-100 border-2 border-rose-300 flex items-center justify-center mb-3 text-rose-600 shadow-xs">
              <AlertTriangle className="w-9 h-9" />
            </div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight">ChittorTech Verification System</h1>
            <p className="text-xs font-semibold text-slate-500 mt-0.5">Official Student Credential Verification Portal</p>

            {/* Invalid Status Pill */}
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-50 border border-rose-300 text-rose-700 text-xs font-black tracking-wide shadow-2xs">
              <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>INVALID URL / CERTIFICATE NOT FOUND</span>
            </div>
          </div>

          {/* Error Details Message */}
          <div className="bg-rose-50/70 p-5 rounded-2xl border border-rose-200 text-center space-y-2.5">
            <p className="text-[11px] font-black uppercase tracking-wider text-rose-700">Attempted Certificate ID:</p>
            <span className="inline-block text-sm font-mono font-black text-rose-900 bg-white px-3 py-1 rounded border border-rose-300 shadow-2xs">
              {certId || 'UNKNOWN'}
            </span>
            <p className="text-xs font-bold text-slate-800 pt-1 leading-relaxed">
              This Certificate ID is invalid or has not been generated yet.
            </p>
            <p className="text-[11px] text-slate-500 leading-normal">
              Please verify the Certificate ID URL or contact ChittorTech administration for verification support.
            </p>
          </div>

          {/* Corporate Badge (iStart Approved Startup) */}
          <div className="flex items-center justify-center gap-3 pt-1">
            <div className="flex items-center gap-2 border border-slate-300 rounded-xl px-4 py-1.5 bg-slate-50">
              <img src="/istart.png" alt="iStart" className="h-6 object-contain" onError={(e) => ((e.target as HTMLElement).style.display = 'none')} />
              <span className="text-[10px] font-black text-slate-700 uppercase tracking-wider">iStart Approved Startup</span>
            </div>
          </div>

          {/* Support Banner */}
          <div className="bg-slate-900 text-white rounded-2xl p-4 text-center shadow-md flex flex-col items-center gap-1">
            <span className="font-bold text-xs text-slate-200">ChittorTech Official Credential Security Portal</span>
            <span className="text-[10px] text-slate-400">Rajasthan Government Approved Startup</span>
          </div>

        </div>
      </div>
    );
  }

  // If valid
  return (
    <div className="min-h-screen w-full bg-slate-100 flex flex-col items-center justify-center p-3 sm:p-6 font-sans text-slate-800 relative overflow-y-auto select-none">
      {/* Background decorative headers */}
      <div className="absolute top-0 left-0 w-full h-80 bg-gradient-to-b from-blue-700 via-blue-600 to-slate-100 -z-0" />
      <div className="absolute top-28 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-400/20 rounded-full blur-3xl -z-0 pointer-events-none" />

      {/* Main Verification Card */}
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-5 sm:p-8 shadow-2xl relative z-10 space-y-5 my-auto">
        
        {/* Top Branding Header */}
        <div className="flex flex-col items-center text-center border-b border-slate-100 pb-5">
          <img
            src={data.logoUrl || '/chittortech_logo.png'}
            alt="ChittorTech Logo"
            className="h-16 object-contain mb-2 select-none"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/chittortech_logo.png';
            }}
          />
          <h1 className="text-xl font-black text-slate-900 tracking-tight">ChittorTech Verification System</h1>
          <p className="text-xs font-semibold text-slate-500 mt-0.5">Official Student Credential Verification Portal</p>

          {/* Verified Status Pill */}
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-700 text-xs font-black tracking-wide shadow-2xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>✓ OFFICIAL CERTIFICATE VERIFIED</span>
          </div>
        </div>

        {/* Certificate Details Card */}
        <div className="space-y-3 bg-slate-50/90 p-4.5 rounded-2xl border border-slate-200/80 shadow-2xs">
          
          <div className="flex items-center justify-between gap-3 pb-2.5 border-b border-slate-200/60">
            <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5 uppercase tracking-wider shrink-0">
              <Award className="w-4 h-4 text-amber-500 shrink-0" /> Certificate ID
            </span>
            <span className="text-sm font-mono font-black text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200 text-right ml-auto">
              {activeCert.certificateId}
            </span>
          </div>

          <div className="flex items-center justify-between gap-3 pb-2.5 border-b border-slate-200/60">
            <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5 uppercase tracking-wider shrink-0">
              <User className="w-4 h-4 text-blue-600 shrink-0" /> Candidate Name
            </span>
            <span className="text-base font-black text-slate-900 text-right ml-auto break-words">{activeCert.candidateName}</span>
          </div>

          <div className="flex items-center justify-between gap-3 pb-2.5 border-b border-slate-200/60">
            <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5 uppercase tracking-wider shrink-0">
              <BookOpen className="w-4 h-4 text-indigo-600 shrink-0" /> Program / Course
            </span>
            <span className="text-xs font-extrabold text-slate-800 text-right ml-auto break-words max-w-[200px]">{activeCert.courseTitle}</span>
          </div>

          <div className="flex items-center justify-between gap-3 pb-2.5 border-b border-slate-200/60">
            <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5 uppercase tracking-wider shrink-0">
              <Calendar className="w-4 h-4 text-emerald-600 shrink-0" /> Issue Date
            </span>
            <span className="text-xs font-extrabold text-slate-800 text-right ml-auto">{activeCert.issueDate}</span>
          </div>

          <div className="flex items-center justify-between gap-3 pt-1">
            <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5 uppercase tracking-wider shrink-0">
              <Building2 className="w-4 h-4 text-slate-600 shrink-0" /> Issued By
            </span>
            <span className="text-xs font-black text-blue-700 text-right ml-auto">{activeCert.companyName}</span>
          </div>

        </div>

        {/* Corporate Badge (iStart Approved Startup) */}
        <div className="flex items-center justify-center gap-3 pt-1">
          <div className="flex items-center gap-2 border border-emerald-300 rounded-xl px-4 py-1.5 bg-emerald-50/80">
            <img src="/istart.png" alt="iStart" className="h-6 object-contain" onError={(e) => ((e.target as HTMLElement).style.display = 'none')} />
            <span className="text-[10px] font-black text-emerald-900 uppercase tracking-wider">iStart Recognized Startup</span>
          </div>
        </div>

        {/* Thank You Footer Message Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl p-4.5 text-center shadow-md flex flex-col items-center gap-1">
          <div className="flex items-center gap-1.5 font-black text-lg tracking-wide">
            <HeartHandshake className="w-5 h-5 text-amber-300" />
            <span>Thank You!</span>
          </div>
          <p className="text-xs text-blue-100 font-medium leading-relaxed">
            Thank you for verifying this official certificate issued by <strong className="text-white font-bold">ChittorTech</strong>.
          </p>
        </div>

      </div>
    </div>
  );
};
