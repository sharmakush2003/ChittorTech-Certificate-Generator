import React, { useState } from 'react';
import { toPng, toJpeg } from 'html-to-image';
import jsPDF from 'jspdf';
import confetti from 'canvas-confetti';
import { Download, FileText, ZoomIn, ZoomOut, RotateCcw, Sparkles, Check, Mail } from 'lucide-react';
import type { CertificateData } from '../../types/certificate';
import { encodeCertificateData } from '../../utils/certRegistry';

interface PreviewControlsProps {
  data: CertificateData;
  zoom: number;
  setZoom: (zoom: number) => void;
  onReset: () => void;
  targetElementId?: string;
}

export const PreviewControls: React.FC<PreviewControlsProps> = ({
  data,
  zoom,
  setZoom,
  onReset,
  targetElementId = 'certificate-node',
}) => {
  const [isDownloadingPng, setIsDownloadingPng] = useState(false);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState<'png' | 'pdf' | null>(null);

  const getDownloadFilename = (ext: 'png' | 'pdf') => {
    const sanitizedName = (data.candidateName || '')
      .trim()
      .replace(/\s+/g, '_')
      .replace(/[^a-zA-Z0-9_-]/g, '');
    const baseName = sanitizedName 
      ? `${sanitizedName}_ChittorTech_Certificate` 
      : 'ChittorTech_Certificate';
    return `${baseName}.${ext}`;
  };

  const triggerCelebration = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#0066cc', '#0d9488', '#f59e0b', '#3b82f6'],
    });
  };

  const handleDownloadPng = async () => {
    const node = document.getElementById(targetElementId);
    if (!node) return;

    try {
      setIsDownloadingPng(true);
      
      // Temporarily remove transform for capturing exact 1123x794 resolution at 3x pixel ratio
      const originalTransform = node.style.transform;
      node.style.transform = 'none';
      
      const parentNode = node.parentElement;
      const originalParentTransform = parentNode ? parentNode.style.transform : '';
      if (parentNode) {
        parentNode.style.transform = 'none';
      }

      const dataUrl = await toPng(node, {
        quality: 1.0,
        pixelRatio: 3, // 3369 x 2382 ultra-high resolution
        cacheBust: true,
      });

      node.style.transform = originalTransform;
      if (parentNode) {
        parentNode.style.transform = originalParentTransform;
      }

      const link = document.createElement('a');
      link.download = getDownloadFilename('png');
      link.href = dataUrl;
      link.click();

      setDownloadSuccess('png');
      triggerCelebration();
      setTimeout(() => setDownloadSuccess(null), 3000);
    } catch (err) {
      console.error('Failed to generate PNG:', err);
      alert('Could not export image. Please try again.');
    } finally {
      setIsDownloadingPng(false);
    }
  };

  const handleDownloadPdf = async () => {
    const node = document.getElementById(targetElementId);
    if (!node) return;

    try {
      setIsDownloadingPdf(true);
      
      const originalTransform = node.style.transform;
      node.style.transform = 'none';
      
      const parentNode = node.parentElement;
      const originalParentTransform = parentNode ? parentNode.style.transform : '';
      if (parentNode) {
        parentNode.style.transform = 'none';
      }

      const dataUrl = await toJpeg(node, {
        quality: 0.95,
        pixelRatio: 3,
        cacheBust: true,
      });

      node.style.transform = originalTransform;
      if (parentNode) {
        parentNode.style.transform = originalParentTransform;
      }

      // A4 Landscape is 297mm x 210mm
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4',
      });

      pdf.addImage(dataUrl, 'JPEG', 0, 0, 297, 210, undefined, 'FAST');
      pdf.save(getDownloadFilename('pdf'));

      setDownloadSuccess('pdf');
      triggerCelebration();
      setTimeout(() => setDownloadSuccess(null), 3000);
    } catch (err) {
      console.error('Failed to generate PDF:', err);
      alert('Could not export PDF. Please try again.');
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  const handleEmailNow = () => {
    const getSignatoryRole = (name: string) => {
      return name === 'Lav Sharma' ? 'Co-Founder' : 'Founder';
    };

    const secureQuery = encodeCertificateData({
      certificateId: data.certificateId,
      candidateName: data.candidateName,
      courseTitle: data.courseTitle,
      issueDate: data.issueDate,
      signatoryName: data.signatoryName || 'Kush Sharma',
    });

    const origin = window.location.origin.includes('localhost') ? 'https://chittor-tech-certificate-generator-eight.vercel.app' : window.location.origin;
    const verificationUrl = `${origin}/?v=${data.certificateId}&${secureQuery}`;

    const emailSubject = `Congratulations on completing your Internship with ChittorTech! | Certificate & Verification Details`;

    const emailBody = `Dear ${data.candidateName},

Greetings from ChittorTech!

We are delighted to congratulate you on the successful completion of your ${data.courseTitle} with us at ChittorTech.

Throughout your internship, you demonstrated exceptional technical curiosity, dedication, and a strong willingness to learn and innovate. Your valuable contributions to our projects, along with your professional approach to problem-solving, have been greatly appreciated by our entire team.

Attached to this email, please find your Official Internship Completion Certificate in two formats for your convenience:
1. High-Definition PDF (${data.certificateId}.pdf) - Recommended for print, official reference, and academic submissions.
2. High-Quality PNG Image (${data.certificateId}.png) - Ideal for proudly sharing your achievement on LinkedIn and other professional platforms.

🌐 Secure Online Verification
To ensure the authenticity of your credentials, your certificate is equipped with our secure verification system:
* QR Code Verification: Anyone can scan the QR Code printed on your certificate using a smartphone camera to instantly verify its validity.
* Direct Verification URL: You can also share your certificate's direct verification link: 
  ${verificationUrl}
  This will open your official verification record on our portal, certifying your name, course title, and completion date.

We are proud of your growth during this internship and are confident that the knowledge and practical experience you have gained will serve as a strong foundation for your future career. 

Should you require any future references, recommendation letters, or career guidance, please feel free to reach out to us. We would be happy to support you in your professional journey.

Once again, congratulations on reaching this important milestone, ${data.candidateName}! We wish you continued success and all the very best in your future endeavors.

Warm Regards,

${data.signatoryName || 'Kush Sharma'}
${getSignatoryRole(data.signatoryName || 'Kush Sharma')}
ChittorTech
🌐 www.chittortech.online`;

    const to = data.candidateEmail || '';
    const gmailUrl = `https://mail.google.com/mail/u/chittortech@gmail.com/?view=cm&fs=1&to=${encodeURIComponent(to)}&su=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    
    window.open(gmailUrl, '_blank');
  };

  return (
    <div className="w-full bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-6 py-3 flex flex-wrap items-center justify-between gap-4 select-none shadow-lg z-20">
      
      {/* Zoom and Reset Controls */}
      <div className="flex items-center gap-3 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
        <button
          onClick={() => setZoom(Math.max(40, zoom - 10))}
          className="p-1 text-slate-300 hover:text-white hover:bg-slate-700 rounded transition"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <span className="text-xs font-semibold text-slate-300 min-w-[3.5rem] text-center">
          {zoom}%
        </span>
        <button
          onClick={() => setZoom(Math.min(120, zoom + 10))}
          className="p-1 text-slate-300 hover:text-white hover:bg-slate-700 rounded transition"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <div className="h-4 w-px bg-slate-700 mx-1" />
        <button
          onClick={onReset}
          className="flex items-center gap-1.5 px-2 py-1 text-xs font-medium text-slate-400 hover:text-amber-400 hover:bg-slate-700/50 rounded transition"
          title="Reset to Sample Defaults"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Title & Live Status */}
      <div className="hidden md:flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          Live Preview Sync <Sparkles className="w-3 h-3 text-amber-400" />
        </span>
      </div>

      {/* Export Buttons */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleEmailNow}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-bold text-sm rounded-lg shadow-lg shadow-teal-600/20 transition transform active:scale-95 border border-teal-400/30"
          title="Compose Verification Email in Gmail (via chittortech@gmail.com)"
        >
          <Mail className="w-4 h-4" />
          <span>Email Now</span>
        </button>

        <button
          onClick={handleDownloadPng}
          disabled={isDownloadingPng || isDownloadingPdf}
          className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm rounded-lg border border-slate-600/80 shadow-md transition transform active:scale-95 disabled:opacity-50"
        >
          {downloadSuccess === 'png' ? (
            <>
              <Check className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400">PNG Saved!</span>
            </>
          ) : (
            <>
              <Download className="w-4 h-4 text-blue-400 animate-bounce" />
              <span>{isDownloadingPng ? 'Generating PNG...' : 'Download PNG'}</span>
            </>
          )}
        </button>

        <button
          onClick={handleDownloadPdf}
          disabled={isDownloadingPng || isDownloadingPdf}
          className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm rounded-lg shadow-lg shadow-blue-600/30 transition transform active:scale-95 disabled:opacity-50 border border-blue-400/30"
        >
          {downloadSuccess === 'pdf' ? (
            <>
              <Check className="w-4 h-4 text-emerald-300" />
              <span className="text-emerald-100">PDF Ready!</span>
            </>
          ) : (
            <>
              <FileText className="w-4 h-4" />
              <span>{isDownloadingPdf ? 'Rendering PDF...' : 'Download PDF (HD)'}</span>
            </>
          )}
        </button>
      </div>

    </div>
  );
};
