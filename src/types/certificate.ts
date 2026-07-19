export const CERTIFICATE_TYPE_VERSION = '2.3';

export interface CertificateData {
  candidateName: string;
  courseTitle: string;
  duration: string;
  description: string;
  companyName: string;
  cin: string;
  certificateId: string;
  issueDate: string;
  signatoryName: string;
  signatoryTitle: string;
  showIsoBadge: boolean;
  showIstartBadge?: boolean;
  showQrCode?: boolean;
  showVerifiedBadge?: boolean;
  qrCodeUrl: string;
  logoUrl: string;
  signatureUrl?: string;
  signatureStyle: 'handwriting-1' | 'handwriting-2' | 'handwriting-3' | 'upload';
  sealType: 'dynamic' | 'upload' | 'none';
  sealUrl?: string;
}

export interface ColorTheme {
  id: string;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  sidebarBg: string;
  sidebarText: string;
  badgeBorder: string;
  headerText: string;
  sealColor: string;
}

export interface FontOption {
  id: string;
  name: string;
  fontFamily: string;
  className: string;
}

export interface BatchItem {
  id: string;
  candidateName: string;
  courseTitle: string;
  duration: string;
  certificateId: string;
  issueDate?: string;
  status: 'pending' | 'generating' | 'completed' | 'error';
}
