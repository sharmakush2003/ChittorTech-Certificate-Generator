import React, { useState, useEffect } from 'react';
import type { CertificateData, ColorTheme } from './types/certificate';
import { DEFAULT_CERTIFICATE_DATA, COLOR_THEMES, FONT_OPTIONS } from './data/defaultData';
import { EditorContainer } from './components/Editor/EditorContainer';
import { PreviewContainer } from './components/Preview/PreviewContainer';
import { VerificationView } from './components/VerificationView';
import { getMatchedCertData } from './utils/certRegistry';

export const App: React.FC = () => {
  const STORAGE_KEY = 'chittortech_cert_cache_v2';
  const THEME_STORAGE_KEY = 'chittortech_theme_cache_v2';

  // Check if URL has ?verify=... or ?id=... parameter
  const searchParams = new URLSearchParams(window.location.search);
  const verifyIdParam = searchParams.get('verify') || searchParams.get('id');
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
  const matchedCertData = verifyIdParam ? getMatchedCertData(verifyIdParam, data) : null;
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
    <div className="flex flex-col lg:flex-row h-screen w-screen overflow-hidden bg-slate-950 font-sans">
      
      {/* Left Sidebar Panel (Editor Controls) - 40% on Desktop */}
      <div className="w-full lg:w-[440px] xl:w-[480px] h-1/2 lg:h-full shrink-0 border-b lg:border-b-0 lg:border-r border-slate-800">
        <EditorContainer
          data={data}
          onChange={handleDataChange}
          currentTheme={theme}
          onThemeSelect={setTheme}
          currentFontClass={fontClass}
          onFontSelect={setFontClass}
          onApplyBatchStudent={handleApplyBatchStudent}
        />
      </div>

      {/* Right Main Panel (Live Certificate Preview & Export) - 60% on Desktop */}
      <div className="flex-1 h-1/2 lg:h-full overflow-hidden">
        <PreviewContainer
          data={data}
          theme={theme}
          fontClass={fontClass}
          onReset={handleReset}
        />
      </div>

    </div>
  );
};

export default App;
