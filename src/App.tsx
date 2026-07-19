import React, { useState, useEffect } from 'react';
import type { CertificateData, ColorTheme } from './types/certificate';
import { DEFAULT_CERTIFICATE_DATA, COLOR_THEMES, FONT_OPTIONS } from './data/defaultData';
import { EditorContainer } from './components/Editor/EditorContainer';
import { PreviewContainer } from './components/Preview/PreviewContainer';
import { VerificationView } from './components/VerificationView';
import { getMatchedCertData } from './utils/certRegistry';
import { Monitor } from 'lucide-react';

export const App: React.FC = () => {
  const STORAGE_KEY = 'chittortech_cert_cache_v2';
  const THEME_STORAGE_KEY = 'chittortech_theme_cache_v2';

  // Check if URL has ?verify=... or ?id=... or ?v=... parameter
  const searchParams = new URLSearchParams(window.location.search);
  const verifyIdParam = searchParams.get('verify') || searchParams.get('id') || searchParams.get('v');
  const [isVerifying, setIsVerifying] = useState<boolean>(!!verifyIdParam);

  const [data, setData] = useState<CertificateData>(() => {
    let initialData = DEFAULT_CERTIFICATE_DATA;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        initialData = { ...DEFAULT_CERTIFICATE_DATA, ...parsed };
      }
    } catch (err) {
      console.error('Failed to load cached certificate data:', err);
    }

    // Sanitize cached signatoryName and certificateId if they are outdated
    if (initialData.signatoryName !== 'Kush Sharma' && initialData.signatoryName !== 'Lav Sharma') {
      initialData.signatoryName = 'Kush Sharma';
      initialData.signatoryTitle = 'Founder\nChittorTech';
    }
    if (initialData.certificateId === 'CT2026001') {
      initialData.certificateId = 'CT-2026-001';
    }

    // Dynamically adjust the QR Code domain to point to the current live origin (Vercel or localhost)
    const liveOrigin = window.location.origin;
    if (initialData.qrCodeUrl) {
      if (initialData.qrCodeUrl.includes('?verify=')) {
        const certId = initialData.qrCodeUrl.split('?verify=')[1];
        initialData.qrCodeUrl = `${liveOrigin}/?verify=${certId}`;
      } else if (initialData.qrCodeUrl.includes('?id=')) {
        const certId = initialData.qrCodeUrl.split('?id=')[1];
        initialData.qrCodeUrl = `${liveOrigin}/?id=${certId}`;
      } else {
        initialData.qrCodeUrl = `${liveOrigin}/?verify=${initialData.certificateId}`;
      }
    } else {
      initialData.qrCodeUrl = `${liveOrigin}/?verify=${initialData.certificateId}`;
    }

    return initialData;
  });

  // Dynamic student lookup based on Certificate ID in URL query
  const matchedCertData = (() => {
    if (!verifyIdParam) return null;
    
    // Check if the URL contains self-verifying parameters (name, course, date)
    const nameParam = searchParams.get('name') || searchParams.get('n');
    const courseParam = searchParams.get('course') || searchParams.get('c');
    if (nameParam && courseParam) {
      return {
        certificateId: verifyIdParam,
        candidateName: nameParam,
        courseTitle: courseParam,
        issueDate: searchParams.get('date') || searchParams.get('d') || '16-07-2026',
        companyName: 'ChittorTech',
        issuedAt: new Date().toISOString().split('T')[0]
      };
    }
    
    // Otherwise fallback to local device registry
    return getMatchedCertData(verifyIdParam, data);
  })();
  
  const isCertValid = verifyIdParam ? !!matchedCertData : true;

  const [theme, setTheme] = useState<ColorTheme>(() => {
    try {
      const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme) {
        return JSON.parse(savedTheme);
      }
    } catch (err) {
      console.error('Failed to load cached theme:', err);
    }
    return COLOR_THEMES[0];
  });

  const [fontClass, setFontClass] = useState<string>(FONT_OPTIONS[0].className);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (err) {
      console.error('Failed to save certificate data to cache:', err);
    }
  }, [data]);

  useEffect(() => {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(theme));
    } catch (err) {
      console.error('Failed to save theme to cache:', err);
    }
  }, [theme]);

  const handleDataChange = <K extends keyof CertificateData>(field: K, value: CertificateData[K]) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all fields and clear saved cache?')) {
      try {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(THEME_STORAGE_KEY);
      } catch (err) {
        console.error('Failed to clear cache:', err);
      }
      setData(DEFAULT_CERTIFICATE_DATA);
      setTheme(COLOR_THEMES[0]);
      setFontClass(FONT_OPTIONS[0].className);
    }
  };

  const handleApplyBatchStudent = (student: {
    candidateName: string;
    courseTitle: string;
    duration: string;
    certificateId: string;
  }) => {
    const defaultUrl = `${window.location.origin}/?verify=${student.certificateId}`;
    setData((prev) => ({
      ...prev,
      candidateName: student.candidateName,
      courseTitle: student.courseTitle,
      duration: student.duration,
      certificateId: student.certificateId,
      qrCodeUrl: defaultUrl,
    }));
  };

  if (isVerifying) {
    return (
      <VerificationView
        certId={verifyIdParam || data.certificateId}
        data={data}
        certData={matchedCertData}
        isValid={isCertValid}
        onBackToApp={() => {
          window.history.pushState({}, '', window.location.pathname);
          setIsVerifying(false);
        }}
      />
    );
  }

  return (
    <div className="h-screen w-screen bg-slate-950 font-sans text-white overflow-hidden">
      {/* Mobile Blocker View - Only visible on screens < lg (1024px) */}
      <div className="lg:hidden flex flex-col items-center justify-center min-h-screen w-full bg-slate-950 px-6 py-12 text-center select-none relative overflow-hidden">
        {/* Abstract glowing backgrounds for premium feel */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 translate-y-1/2 w-64 h-64 bg-indigo-600/10 rounded-full blur-[80px] pointer-events-none" />

        <div className="max-w-md w-full glass-panel p-8 rounded-2xl border border-slate-800/80 shadow-2xl relative z-10 flex flex-col items-center">
          {/* Logo or Brand */}
          <div className="flex items-center gap-2 mb-8">
            <img src="/chittortech_logo.png" alt="ChittorTech Logo" className="h-8 object-contain" />
            <span className="text-sm font-bold tracking-widest text-slate-400 uppercase font-outfit">ChittorTech</span>
          </div>

          {/* Animated Desktop Icon */}
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl animate-pulse" />
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center border border-blue-400/30 shadow-lg relative">
              <Monitor className="w-8 h-8 text-white" />
            </div>
          </div>

          <h2 className="text-xl font-bold text-slate-100 mb-3 tracking-tight font-outfit">
            Desktop Experience Required
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed mb-6">
            The ChittorTech Certificate Generator is optimized for larger screens to support high-fidelity previewing, real-time template editing, and HD PDF/PNG exports.
          </p>

          <div className="w-full bg-slate-900/60 rounded-xl p-4 border border-slate-800/80 text-xs text-slate-400 flex flex-col gap-2.5 text-left">
            <div className="flex items-start gap-2">
              <span className="text-blue-400 mt-0.5">💡</span>
              <span>Please open this application on a desktop or laptop computer.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-blue-400 mt-0.5">💡</span>
              <span>Alternatively, enable the <strong>"Desktop Site"</strong> option in your mobile browser settings.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Desktop App View - Only visible on screens >= lg */}
      <div className="hidden lg:flex flex-row h-full w-full overflow-hidden">
        {/* Left Sidebar Panel (Editor Controls) - 40% on Desktop */}
        <div className="w-[440px] xl:w-[480px] h-full shrink-0 border-r border-slate-800">
          <EditorContainer
            data={data}
            onChange={handleDataChange}
            onApplyBatchStudent={handleApplyBatchStudent}
          />
        </div>

        {/* Right Main Panel (Live Certificate Preview & Export) - 60% on Desktop */}
        <div className="flex-1 h-full overflow-hidden">
          <PreviewContainer
            data={data}
            theme={theme}
            fontClass={fontClass}
            onReset={handleReset}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
