import type { CertificateData, ColorTheme, FontOption } from '../types/certificate';

export const DEFAULT_CERTIFICATE_DATA: CertificateData = {
  candidateName: 'Khushi Tailor',
  courseTitle: 'Web Development Internship',
  duration: 'Duration: 2 Months ( 1st May 2025 - 1st July 2025 )',
  description: 'During the internship period, He/She has demonstrated exceptional dedication, enthusiasm and a strong willingness to learn. They actively engaged in various projects and tasks assigned to them, exhibiting remarkable skills and a high level of professionalism.',
  companyName: 'ChittorTech',
  cin: '',
  certificateId: 'CT2026001',
  issueDate: '16-07-2026',
  signatoryName: 'Anjali Prusty',
  signatoryTitle: 'Director & CEO\nChittorTech',
  showIsoBadge: false,
  showIstartBadge: true,
  showQrCode: true,
  showVerifiedBadge: true,
  qrCodeUrl: 'https://chittortech-certificate.vercel.app/?verify=CT2026001',
  logoUrl: '/chittortech_logo.png',
  signatureStyle: 'handwriting-1',
  sealType: 'none',
};

export const COLOR_THEMES: ColorTheme[] = [
  {
    id: 'chittortech-blue',
    name: 'ChittorTech Classic Blue',
    primaryColor: '#0066cc',
    secondaryColor: '#0f172a',
    sidebarBg: 'linear-gradient(180deg, #0056b3 0%, #0077e6 50%, #004494 100%)',
    sidebarText: '#ffffff',
    badgeBorder: '#f59e0b',
    headerText: '#1e293b',
    sealColor: '#0066cc',
  },
  {
    id: 'emerald-teal',
    name: 'Emerald Teal',
    primaryColor: '#0d9488',
    secondaryColor: '#134e4a',
    sidebarBg: 'linear-gradient(180deg, #0f766e 0%, #14b8a6 50%, #115e59 100%)',
    sidebarText: '#ffffff',
    badgeBorder: '#eab308',
    headerText: '#0f172a',
    sealColor: '#0d9488',
  },
  {
    id: 'deep-navy',
    name: 'Deep Navy & Gold',
    primaryColor: '#1e3a8a',
    secondaryColor: '#0f172a',
    sidebarBg: 'linear-gradient(180deg, #1e3a8a 0%, #1d4ed8 50%, #172554 100%)',
    sidebarText: '#fbbf24',
    badgeBorder: '#d97706',
    headerText: '#1e293b',
    sealColor: '#1e3a8a',
  },
  {
    id: 'royal-purple',
    name: 'Royal Purple',
    primaryColor: '#7c3aed',
    secondaryColor: '#3b0764',
    sidebarBg: 'linear-gradient(180deg, #6d28d9 0%, #8b5cf6 50%, #4c1d95 100%)',
    sidebarText: '#ffffff',
    badgeBorder: '#f59e0b',
    headerText: '#1e293b',
    sealColor: '#7c3aed',
  },
  {
    id: 'crimson-red',
    name: 'Crimson Executive',
    primaryColor: '#dc2626',
    secondaryColor: '#450a0a',
    sidebarBg: 'linear-gradient(180deg, #b91c1c 0%, #ef4444 50%, #7f1d1d 100%)',
    sidebarText: '#ffffff',
    badgeBorder: '#fbbf24',
    headerText: '#1e293b',
    sealColor: '#dc2626',
  },
  {
    id: 'dark-gold',
    name: 'Prestige Gold & Carbon',
    primaryColor: '#d97706',
    secondaryColor: '#18181b',
    sidebarBg: 'linear-gradient(180deg, #27272a 0%, #3f3f46 50%, #18181b 100%)',
    sidebarText: '#f59e0b',
    badgeBorder: '#f59e0b',
    headerText: '#27272a',
    sealColor: '#d97706',
  },
];

export const FONT_OPTIONS: FontOption[] = [
  { id: 'inter', name: 'Modern Sans (Inter)', fontFamily: "'Inter', sans-serif", className: 'font-inter' },
  { id: 'outfit', name: 'Geometric (Outfit)', fontFamily: "'Outfit', sans-serif", className: 'font-outfit' },
  { id: 'playfair', name: 'Classic Serif (Playfair)', fontFamily: "'Playfair Display', serif", className: 'font-playfair' },
  { id: 'montserrat', name: 'Executive (Montserrat)', fontFamily: "'Montserrat', sans-serif", className: 'font-montserrat' },
];

export const PRESET_DESCRIPTIONS = [
  {
    label: 'Internship Completion (Default)',
    text: 'During the internship period, He/She has demonstrated exceptional dedication, enthusiasm and a strong willingness to learn. They actively engaged in various projects and tasks assigned to them, exhibiting remarkable skills and a high level of professionalism.'
  },
  {
    label: 'Course Excellence Certificate',
    text: 'For successfully completing the comprehensive training program with distinction. The candidate demonstrated profound technical acumen, problem-solving mastery, and exceptional commitment to best industry practices throughout the tenure.'
  },
  {
    label: 'Employee / Contributor Recognition',
    text: 'In recognition of outstanding contributions, relentless dedication, and remarkable technical achievements. Their commitment to excellence has significantly enhanced organizational benchmarks and inspired peers throughout the quarter.'
  },
  {
    label: 'Hackathon / Project Participation',
    text: 'For active participation and commendable technical execution during the ChittorTech Innovation Challenge. The candidate displayed great teamwork, analytical prowess, and rapid prototyping capabilities.'
  }
];
