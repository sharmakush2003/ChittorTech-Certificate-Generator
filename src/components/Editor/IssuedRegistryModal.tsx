import React, { useState } from 'react';
import { getIssuedRegistry, type VerifiableCert } from '../../utils/certRegistry';
import { Database, Search, ExternalLink, Download, UserCheck, RefreshCw, CheckCircle2 } from 'lucide-react';

interface IssuedRegistryModalProps {
  onApplyStudent: (item: { candidateName: string; courseTitle: string; duration: string; certificateId: string }) => void;
}

export const IssuedRegistryModal: React.FC<IssuedRegistryModalProps> = ({ onApplyStudent }) => {
  const [registry, setRegistry] = useState<Record<string, VerifiableCert>>(() => getIssuedRegistry());
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const refreshRegistry = () => {
    setRegistry(getIssuedRegistry());
  };

  const certList = Object.values(registry);

  const filteredCerts = certList.filter((cert) => {
    const q = searchQuery.toLowerCase().trim();
    return (
      cert.certificateId.toLowerCase().includes(q) ||
      cert.candidateName.toLowerCase().includes(q) ||
      cert.courseTitle.toLowerCase().includes(q)
    );
  });

  const handleExportCSV = () => {
    const headers = 'CertificateID,CandidateName,CourseTitle,IssueDate,CompanyName,IssuedAt\n';
    const rows = certList
      .map(
        (c) =>
          `"${c.certificateId}","${c.candidateName}","${c.courseTitle}","${c.issueDate}","${c.companyName}","${c.issuedAt || ''}"`
      )
      .join('\n');
    const csvContent = 'data:text/csv;charset=utf-8,' + encodeURIComponent(headers + rows);
    const link = document.createElement('a');
    link.setAttribute('href', csvContent);
    link.setAttribute('download', `chittortech_issued_certificates_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyLink = (certId: string) => {
    const link = `${window.location.origin}/?verify=${certId}`;
    navigator.clipboard.writeText(link);
    setCopiedId(certId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="p-5 space-y-5 overflow-y-auto">
      {/* Header */}
      <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Database className="w-4 h-4 text-emerald-400" />
            Issued Certificates Database Registry
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Permanently saved certificates issued by ChittorTech. Unique Certificate IDs can never be duplicated.
          </p>
        </div>
        <button
          type="button"
          onClick={handleExportCSV}
          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg shadow-sm transition flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          <Download className="w-3.5 h-3.5" />
          Export CSV
        </button>
      </div>

      {/* Search Bar & Refresh */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by student name, course, or Certificate ID..."
            className="w-full pl-9 pr-3 py-2 rounded-lg glass-input text-xs font-medium"
          />
        </div>
        <button
          type="button"
          onClick={refreshRegistry}
          className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
          title="Refresh Registry"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Certificate Table List */}
      <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
        {filteredCerts.length === 0 ? (
          <div className="text-center py-8 text-slate-500 text-xs">
            No issued certificates found matching your search.
          </div>
        ) : (
          filteredCerts.map((cert) => (
            <div
              key={cert.certificateId}
              className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
            >
              <div className="flex flex-col space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-black text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/30">
                    {cert.certificateId}
                  </span>
                  <span className="text-sm font-bold text-white">{cert.candidateName}</span>
                </div>
                <span className="text-xs text-slate-400">
                  {cert.courseTitle} • <span className="text-slate-300">Issued: {cert.issueDate}</span>
                </span>
              </div>

              <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={() => handleCopyLink(cert.certificateId)}
                  className="px-2.5 py-1 text-[11px] font-semibold rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition flex items-center gap-1 border border-slate-700 cursor-pointer"
                >
                  {copiedId === cert.certificateId ? (
                    <>
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Copied
                    </>
                  ) : (
                    <>
                      <ExternalLink className="w-3 h-3 text-emerald-400" /> Test QR Link
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() =>
                    onApplyStudent({
                      candidateName: cert.candidateName,
                      courseTitle: cert.courseTitle,
                      duration: `Issued: ${cert.issueDate}`,
                      certificateId: cert.certificateId,
                    })
                  }
                  className="px-2.5 py-1 text-[11px] font-bold rounded bg-blue-600 hover:bg-blue-500 text-white transition flex items-center gap-1 shadow-xs cursor-pointer"
                >
                  <UserCheck className="w-3 h-3" /> Load Preview
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
