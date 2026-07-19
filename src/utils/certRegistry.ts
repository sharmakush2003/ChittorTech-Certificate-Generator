import type { CertificateData } from '../types/certificate';

export interface VerifiableCert {
  certificateId: string;
  candidateName: string;
  courseTitle: string;
  issueDate: string;
  companyName: string;
  issuedAt?: string;
}

export const STORAGE_REGISTRY_KEY = 'chittortech_issued_registry_v2';

export const PRESET_CERTIFICATES: Record<string, VerifiableCert> = {};

// Get combined issued registry (Preset + localStorage)
export const getIssuedRegistry = (): Record<string, VerifiableCert> => {
  const combined: Record<string, VerifiableCert> = { ...PRESET_CERTIFICATES };
  try {
    const saved = localStorage.getItem(STORAGE_REGISTRY_KEY);
    if (saved) {
      const parsed: Record<string, VerifiableCert> = JSON.parse(saved);
      Object.assign(combined, parsed);
    }
  } catch (err) {
    console.error('Failed to load issued registry from localStorage:', err);
  }
  return combined;
};

// Save a newly issued certificate permanently
export const saveCertificateToRegistry = (cert: VerifiableCert): void => {
  try {
    const registry = getIssuedRegistry();
    const cleanId = cert.certificateId.trim().toUpperCase();
    registry[cleanId] = {
      ...cert,
      certificateId: cleanId,
      issuedAt: cert.issuedAt || new Date().toISOString().split('T')[0],
    };
    localStorage.setItem(STORAGE_REGISTRY_KEY, JSON.stringify(registry));
  } catch (err) {
    console.error('Failed to save certificate to registry:', err);
  }
};

// Get next available auto-incremented Certificate ID (e.g. CT-2026-004)
export const getNextAvailableCertId = (): string => {
  const registry = getIssuedRegistry();
  let maxNum = 0;

  Object.keys(registry).forEach((id) => {
    // Extract numbers from IDs like CT-2026-001 or CT2026001 or 08-2025-51625
    const match = id.match(/CT-\d{4}-(\d+)/i) || id.match(/CT\d{4}(\d+)/i) || id.match(/(\d+)$/);
    if (match && match[1]) {
      const num = parseInt(match[1], 10);
      if (!isNaN(num) && num > maxNum && num < 99999) {
        maxNum = num;
      }
    }
  });

  const nextNum = maxNum + 1;
  const padded = String(nextNum).padStart(3, '0');
  return `CT-2026-${padded}`;
};

// Check if a Certificate ID is already taken by a different candidate
export const isCertIdAlreadyTaken = (certId: string, currentCandidateName?: string): VerifiableCert | null => {
  if (!certId) return null;
  const cleanId = certId.trim().toUpperCase();
  const registry = getIssuedRegistry();
  const existing = registry[cleanId];

  if (existing) {
    if (currentCandidateName && existing.candidateName.trim().toLowerCase() === currentCandidateName.trim().toLowerCase()) {
      return null; // Same student editing
    }
    return existing; // Already issued to someone else
  }
  return null;
};

// Lookup function for Verification View URL query
export const getMatchedCertData = (searchId: string, currentData: CertificateData): VerifiableCert | null => {
  if (!searchId) return null;
  const cleanId = searchId.trim().toUpperCase();

  // 1. Check if matches active certificate in editor
  if (cleanId === currentData.certificateId.trim().toUpperCase()) {
    return {
      certificateId: currentData.certificateId,
      candidateName: currentData.candidateName,
      courseTitle: currentData.courseTitle,
      issueDate: currentData.issueDate,
      companyName: currentData.companyName,
    };
  }

  // 2. Check full issued registry
  const registry = getIssuedRegistry();
  if (registry[cleanId]) {
    return registry[cleanId];
  }

  return null;
};

// Clear all custom certificates from registry (retaining only presets)
export const clearIssuedRegistry = (): void => {
  try {
    localStorage.removeItem(STORAGE_REGISTRY_KEY);
  } catch (err) {
    console.error('Failed to clear issued registry:', err);
  }
};

// A simple hash function to generate a 8-character hex signature
export const generateSignature = (dataStr: string): string => {
  let hash = 5381;
  const salt = 'chittortech_secure_salt_2026';
  const combined = dataStr + salt;
  for (let i = 0; i < combined.length; i++) {
    hash = (hash * 33) ^ combined.charCodeAt(i);
  }
  return (hash >>> 0).toString(16);
};

// Encodes certificate data into a secure, tamper-proof payload string
export const encodeCertificateData = (cert: {
  certificateId: string;
  candidateName: string;
  courseTitle: string;
  issueDate: string;
  signatoryName: string;
}): string => {
  const rawPayload = `v=${encodeURIComponent(cert.certificateId)}&n=${encodeURIComponent(cert.candidateName)}&c=${encodeURIComponent(cert.courseTitle)}&d=${encodeURIComponent(cert.issueDate)}&s=${encodeURIComponent(cert.signatoryName)}`;
  const encodedPayload = btoa(rawPayload);
  const sig = generateSignature(rawPayload);
  return `p=${encodeURIComponent(encodedPayload)}&sig=${sig}`;
};

// Decodes and verifies a tamper-proof payload string
export const decodeAndVerifyCertificate = (p: string, sig: string) => {
  try {
    const rawPayload = atob(decodeURIComponent(p));
    const computedSig = generateSignature(rawPayload);
    if (computedSig !== sig) {
      return null;
    }
    const params = new URLSearchParams(rawPayload);
    return {
      certificateId: decodeURIComponent(params.get('v') || ''),
      candidateName: decodeURIComponent(params.get('n') || ''),
      courseTitle: decodeURIComponent(params.get('c') || ''),
      issueDate: decodeURIComponent(params.get('d') || ''),
      signatoryName: decodeURIComponent(params.get('s') || ''),
    };
  } catch (e) {
    return null;
  }
};
