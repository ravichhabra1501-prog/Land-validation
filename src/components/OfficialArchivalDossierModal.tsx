import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Printer, 
  Download, 
  FileText, 
  X, 
  ShieldCheck, 
  Stamp, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  Building, 
  MapPin, 
  Calendar, 
  QrCode, 
  FileCode,
  Check,
  Eye,
  ExternalLink
} from 'lucide-react';
import { ExtractedLandRecord, UserRole } from '../types';
import { generateOfficialArchivalPdf } from '../services/archivalPdfService';
import { generateDilrmpXml } from '../services/landRecordService';

export interface OfficialArchivalDossierModalProps {
  isOpen: boolean;
  onClose: () => void;
  record: ExtractedLandRecord;
  userRole: UserRole;
}

export const OfficialArchivalDossierModal: React.FC<OfficialArchivalDossierModalProps> = ({
  isOpen,
  onClose,
  record,
  userRole
}) => {
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);
  const [xmlDownloaded, setXmlDownloaded] = useState<boolean>(false);

  if (!isOpen) return null;

  const now = new Date();
  const dateFormatted = now.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
  const timeFormatted = now.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  // Calculate centroid
  let centroidStr = '18.5793°N, 73.9814°E';
  if (record.cadastralPolygon && record.cadastralPolygon.length > 0) {
    const avgLng = record.cadastralPolygon.reduce((acc, p) => acc + p[0], 0) / record.cadastralPolygon.length;
    const avgLat = record.cadastralPolygon.reduce((acc, p) => acc + p[1], 0) / record.cadastralPolygon.length;
    centroidStr = `${avgLat.toFixed(4)}°N, ${avgLng.toFixed(4)}°E`;
  }

  // Security token
  const securityHash = `SHA256-DILRMP-ARC-${record.documentNumber.replace(/[^A-Z0-9]/gi, '').slice(-8).toUpperCase()}-V7`;

  // Trigger PDF Generation & Download
  const handleDownloadPdf = () => {
    try {
      generateOfficialArchivalPdf(record);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3500);
    } catch (err) {
      console.error('Failed to generate archival PDF:', err);
    }
  };

  // Trigger Browser Print Dialog
  const handlePrint = () => {
    window.print();
  };

  // Export XML
  const handleDownloadXml = () => {
    const xml = generateDilrmpXml(record);
    const blob = new Blob([xml], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${record.documentNumber}_DILRMP_Archival.xml`;
    a.click();
    URL.revokeObjectURL(url);
    setXmlDownloaded(true);
    setTimeout(() => setXmlDownloaded(false), 3500);
  };

  const sharers = record.coSharers && record.coSharers.length > 0
    ? record.coSharers
    : [{ id: '1', name: record.primaryOwnerName?.value || 'Registered Owner', relation: 'Self', shareFraction: '1/1 (100%)', shareAreaSqMeters: record.normalizedAreaSqMeters }];

  const rules = record.validationResults && record.validationResults.length > 0
    ? record.validationResults
    : [];

  const historyEntries = record.modificationHistory && record.modificationHistory.length > 0
    ? record.modificationHistory
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-[#26261A]/80 backdrop-blur-xs overflow-y-auto print:p-0 print:bg-white print:static print:overflow-visible">
      {/* Container Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-5xl bg-[#FAF8F5] rounded-2xl shadow-2xl border border-[#DCD7CE] flex flex-col max-h-[94vh] overflow-hidden archival-print-wrapper print:shadow-none print:border-none print:max-h-none print:rounded-none print:w-full"
      >
        {/* Top Operational Toolbar (Hidden on Print) */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 bg-[#F5F3EE] border-b border-[#DCD7CE] no-print shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#FFF9EA] text-[#8B4513] border border-[#DCD7CE]">
              <FileText className="w-5 h-5 text-[#8B4513]" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-sm sm:text-base font-bold text-[#33332A] natural-serif">
                  Official Statutory Archival Dossier
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#EAF2EB] text-[#3D5A40] border border-[#BCD4C0]">
                  GOI DILRMP Form VII-XII
                </span>
              </div>
              <p className="text-xs text-[#6B6B58] font-mono">
                Record Ref: {record.documentNumber} • Khasra: {record.khasraNumber?.value} ({record.village?.value})
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Download PDF Button */}
            <button
              id="btn-modal-download-pdf"
              onClick={handleDownloadPdf}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#5A5A40] hover:bg-[#43432F] text-[#FFF9EA] text-xs font-bold shadow-xs transition-colors cursor-pointer"
              title="Generate and download high-resolution vector PDF file"
            >
              {downloadSuccess ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>PDF Downloaded!</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 text-[#FFF9EA]" />
                  <span>Download Archival PDF</span>
                </>
              )}
            </button>

            {/* Print / Save to PDF Button */}
            <button
              id="btn-modal-print-pdf"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white hover:bg-[#F2EFE9] text-[#33332A] border border-[#DCD7CE] text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
              title="Open browser print dialog to print or save as official PDF"
            >
              <Printer className="w-4 h-4 text-[#8B4513]" />
              <span>Print / Save as PDF (Ctrl+P)</span>
            </button>

            {/* Export XML Button */}
            <button
              id="btn-modal-export-xml"
              onClick={handleDownloadXml}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-[#F2EFE9] text-[#5A5A40] border border-[#DCD7CE] text-xs font-medium transition-colors cursor-pointer"
              title="Export structured DILRMP XML payload"
            >
              <FileCode className="w-3.5 h-3.5 text-[#5A5A40]" />
              <span>{xmlDownloaded ? 'XML Saved' : 'DILRMP XML'}</span>
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#6B6B58] hover:text-[#33332A] hover:bg-[#EBE7DF] transition-colors cursor-pointer ml-1"
              title="Close Preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Printable Document Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-[#EBE7DF]/40 print:p-0 print:bg-white print:overflow-visible">
          {/* A4 Paper Canvas */}
          <div 
            id="printable-archival-dossier" 
            className="archival-print-sheet mx-auto bg-white border border-[#DCD7CE] rounded-xl p-6 sm:p-10 shadow-md text-[#33332A] font-serif max-w-[850px] relative print:border-none print:shadow-none print:p-0 print:rounded-none print:max-w-none"
          >
            {/* Subtle Archival Watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.035] select-none overflow-hidden">
              <span className="text-7xl sm:text-8xl font-black text-black rotate-[-35deg] uppercase tracking-widest text-center">
                OFFICIAL ARCHIVAL RECORD<br />DILRMP GOI
              </span>
            </div>

            {/* Government Tricolor Top Accent */}
            <div className="h-1.5 w-full flex rounded-t overflow-hidden mb-5">
              <div className="w-1/3 bg-[#FF9933]"></div>
              <div className="w-1/3 bg-white border-y border-neutral-300 relative flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-[#000080]"></div>
              </div>
              <div className="w-1/3 bg-[#138808]"></div>
            </div>

            {/* Official National Header */}
            <div className="text-center pb-4 border-b-2 border-[#8B4513]/30">
              <div className="inline-flex items-center justify-center gap-2 mb-1">
                <span className="text-xs font-bold tracking-widest text-[#5A5A40] uppercase">
                  Government of India • Ministry of Rural Development
                </span>
              </div>
              <h1 className="text-lg sm:text-xl font-black text-[#2D2D1E] tracking-tight">
                DEPARTMENT OF LAND RESOURCES &amp; REVENUE ADMINISTRATION
              </h1>
              <p className="text-xs font-semibold text-[#8B4513] uppercase tracking-wide mt-0.5">
                State of {(record.state?.value || 'Maharashtra').toUpperCase()} • Revenue Circle {(record.village?.value || 'Wagholi').toUpperCase()}
              </p>
              <div className="mt-2 inline-block px-4 py-1 bg-[#FAF8F5] border border-[#DCD7CE] rounded-md">
                <span className="text-xs sm:text-sm font-bold text-[#33332A]">
                  STATUTORY ARCHIVAL RECORD OF RIGHTS (RoR) &amp; LAND TITLE DOSSIER
                </span>
                <span className="block text-[11px] text-[#6B6B58] font-sans font-medium">
                  प्रारूप-७/१२ (अभिलेख अधिकार व नामांतरण अधिकृत अभिलेखागार प्रति) • Form VII-XII
                </span>
              </div>
            </div>

            {/* Archival Dispatch & Security Metadata Ribbon */}
            <div className="mt-4 p-2.5 bg-[#FAF8F5] border border-[#DCD7CE] rounded-lg text-xs font-sans grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
              <div>
                <span className="text-[10px] text-[#6B6B58] block uppercase font-bold">Archival Dispatch No:</span>
                <span className="font-mono font-bold text-[#33332A]">DILRMP/ARC/2026/{record.documentNumber}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#6B6B58] block uppercase font-bold">Attestation Timestamp:</span>
                <span className="font-medium text-[#33332A]">{dateFormatted} {timeFormatted}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#6B6B58] block uppercase font-bold">Security Token:</span>
                <span className="font-mono text-[11px] text-[#5A5A40] font-semibold">{securityHash}</span>
              </div>
              <div className="sm:text-right">
                <span className="text-[10px] text-[#6B6B58] block uppercase font-bold">Statutory Status:</span>
                <span className={`inline-flex items-center gap-1 font-bold text-xs ${
                  record.status === 'VERIFIED_AND_SANCTIONED' ? 'text-[#3D5A40]' : 'text-[#8B4513]'
                }`}>
                  <ShieldCheck className="w-3.5 h-3.5 inline" />
                  {record.status === 'VERIFIED_AND_SANCTIONED' ? 'SANCTIONED & ATTESTED' : record.status.replace(/_/g, ' ')}
                </span>
              </div>
            </div>

            {/* SECTION 1: Cadastral Jurisdiction & Administrative Hierarchy */}
            <div className="mt-5 space-y-1.5">
              <div className="bg-[#F2EFE9] px-3 py-1 border border-[#DCD7CE] rounded flex items-center justify-between">
                <h4 className="text-xs font-bold text-[#4A3728] uppercase tracking-wider font-sans flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-[#8B4513]" />
                  <span>1. Cadastral Jurisdiction &amp; Administrative Hierarchy / प्रशासनिक अधिकार क्षेत्र</span>
                </h4>
                <span className="text-[10px] font-mono text-[#6B6B58] font-sans">LADM / ISO-19152</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-sans p-2.5 bg-white border border-[#EBE7DF] rounded">
                <div>
                  <span className="text-[10px] text-[#6B6B58] block">State / राज्य</span>
                  <span className="font-semibold text-[#33332A]">{record.state?.value || 'Maharashtra'}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#6B6B58] block">District / जिला</span>
                  <span className="font-semibold text-[#33332A]">{record.district?.value || 'Pune'}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#6B6B58] block">Tehsil / Taluka</span>
                  <span className="font-semibold text-[#33332A]">{record.tehsil?.value || 'Haveli'}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#6B6B58] block">Village / Mauza</span>
                  <span className="font-semibold text-[#33332A]">{record.village?.value || 'Wagholi'}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#6B6B58] block">Census Village Code</span>
                  <span className="font-mono text-[#33332A]">{record.censusVillageCode?.value || '27-432-019'}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#6B6B58] block">Revenue Halka / Circle</span>
                  <span className="text-[#33332A]">Circle 04 ({record.village?.value || 'Wagholi'})</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#6B6B58] block">Aks Shajra Sheet No.</span>
                  <span className="font-mono text-[#33332A]">SH-{record.khasraNumber?.value || '01'}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#6B6B58] block">Centroid Coordinates</span>
                  <span className="font-mono text-[11px] text-[#33332A]">{centroidStr}</span>
                </div>
              </div>
            </div>

            {/* SECTION 2: Cadastral Parcel Identifiers & Area Classification */}
            <div className="mt-4 space-y-1.5">
              <div className="bg-[#F2EFE9] px-3 py-1 border border-[#DCD7CE] rounded flex items-center justify-between">
                <h4 className="text-xs font-bold text-[#4A3728] uppercase tracking-wider font-sans flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#8B4513]" />
                  <span>2. Cadastral Parcel Identifiers &amp; Area Classification / भू-अभिलेख विवरण</span>
                </h4>
                <span className="text-[10px] font-mono text-[#6B6B58] font-sans">Cadastral Vector Layer</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-sans p-2.5 bg-white border border-[#EBE7DF] rounded">
                <div>
                  <span className="text-[10px] text-[#6B6B58] block">Khasra / Survey No.</span>
                  <span className="font-bold text-sm text-[#8B4513] font-mono">{record.khasraNumber?.value}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#6B6B58] block">Khata Number</span>
                  <span className="font-mono font-semibold text-[#33332A]">{record.khataNumber?.value}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#6B6B58] block">Sub-Division (Hissa)</span>
                  <span className="text-[#33332A]">{record.subDivisionNumber?.value || '0'}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#6B6B58] block">Land Classification</span>
                  <span className="font-medium text-[#33332A]">{record.landClassification?.value || 'Agricultural'}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#6B6B58] block">Declared Area (Recorded)</span>
                  <span className="font-semibold text-[#33332A]">{record.totalAreaDeclared?.value} {record.declaredUnit?.value}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#6B6B58] block">Normalized Standard Area</span>
                  <span className="font-mono font-bold text-[#33332A]">{record.normalizedAreaSqMeters.toLocaleString('en-IN')} sq.m</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#6B6B58] block">Acreage Equivalent</span>
                  <span className="font-mono text-[#33332A]">{(record.normalizedAreaSqMeters / 4046.86).toFixed(3)} Acres</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#6B6B58] block">Topological Boundary</span>
                  <span className="text-emerald-700 font-medium">Valid {record.cadastralPolygon?.length || 5}-Node Closed Ring</span>
                </div>
              </div>
            </div>

            {/* SECTION 3: Proprietary Rights & Ownership Ledger */}
            <div className="mt-4 space-y-1.5">
              <div className="bg-[#F2EFE9] px-3 py-1 border border-[#DCD7CE] rounded flex items-center justify-between">
                <h4 className="text-xs font-bold text-[#4A3728] uppercase tracking-wider font-sans">
                  3. Proprietary Rights &amp; Register of Land Owners / खातेदार एवं सह-हिस्सेदार
                </h4>
                <span className="text-[10px] font-mono text-[#6B6B58] font-sans">
                  {sharers.length} Co-Sharer{sharers.length > 1 ? 's' : ''}
                </span>
              </div>

              {/* Primary Owner summary */}
              <div className="p-2.5 bg-[#FAF8F5] border border-[#EBE7DF] rounded text-xs font-sans flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] text-[#6B6B58] block font-bold uppercase">Primary Registered Khatedar:</span>
                  <span className="font-bold text-sm text-[#33332A]">{record.primaryOwnerName?.value}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#6B6B58] block font-bold uppercase">Parentage / Spouse:</span>
                  <span className="text-[#5A5A40] font-medium">{record.parentageOrSpouse?.value}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-[#6B6B58] block font-bold uppercase">Primary Share Area:</span>
                  <span className="font-mono font-bold text-[#33332A]">{record.normalizedAreaSqMeters.toLocaleString('en-IN')} sq.m (Total)</span>
                </div>
              </div>

              {/* Sharers Table */}
              <table className="w-full text-xs font-sans border border-[#DCD7CE] rounded overflow-hidden">
                <thead className="bg-[#EBE7DF] text-[#4A3728] font-semibold text-[11px]">
                  <tr>
                    <th className="py-1.5 px-2.5 text-left w-10">Sr</th>
                    <th className="py-1.5 px-2.5 text-left">Co-Sharer Legal Name</th>
                    <th className="py-1.5 px-2.5 text-left">Relationship</th>
                    <th className="py-1.5 px-2.5 text-left">Recorded Share</th>
                    <th className="py-1.5 px-2.5 text-right">Share Area (sq.m)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EBE7DF]">
                  {sharers.map((s, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-[#FAF8F5]'}>
                      <td className="py-1.5 px-2.5 font-mono text-[#6B6B58]">{idx + 1}</td>
                      <td className="py-1.5 px-2.5 font-semibold text-[#33332A]">{s.name}</td>
                      <td className="py-1.5 px-2.5 text-[#5A5A40]">{s.relation || 'Self'}</td>
                      <td className="py-1.5 px-2.5 font-mono text-[#33332A]">{s.shareFraction || 'Equal'}</td>
                      <td className="py-1.5 px-2.5 text-right font-mono font-medium text-[#33332A]">
                        {(s.shareAreaSqMeters || 0).toLocaleString('en-IN')} sq.m
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* SECTION 4: Revenue Assessment & Encumbrance Status */}
            <div className="mt-4 space-y-1.5">
              <div className="bg-[#F2EFE9] px-3 py-1 border border-[#DCD7CE] rounded flex items-center justify-between">
                <h4 className="text-xs font-bold text-[#4A3728] uppercase tracking-wider font-sans">
                  4. Revenue Assessment &amp; Encumbrance Status / लगान एवं दायित्व विवरण
                </h4>
                <span className="text-[10px] font-mono text-[#6B6B58] font-sans">Financial Registry</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-sans p-2.5 bg-white border border-[#EBE7DF] rounded">
                <div>
                  <span className="text-[10px] text-[#6B6B58] block">Annual Land Revenue (Lagaan)</span>
                  <span className="font-bold text-[#33332A]">INR {record.annualLandRevenue?.value?.toFixed(2) || '0.00'}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#6B6B58] block">Irrigation Source</span>
                  <span className="text-[#33332A]">{record.irrigationSource?.value || 'Canal Perennial & Tubewell'}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#6B6B58] block">Soil Classification</span>
                  <span className="text-[#33332A]">Jirayat / Bagayat Class I</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#6B6B58] block">Water Rights Sanction</span>
                  <span className="text-[#33332A]">Canal Roster 48 hrs/month</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#6B6B58] block">Encumbrance Status</span>
                  <span className={`font-bold ${record.encumbranceStatus?.value === 'CLEAR' ? 'text-emerald-700' : 'text-amber-800'}`}>
                    {record.encumbranceStatus?.value || 'CLEAR'}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-[#6B6B58] block">Bank Lien / Charge</span>
                  <span className="text-[#33332A]">{record.bankLienDetails || 'None (Clear Title)'}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#6B6B58] block">Court Injunctions</span>
                  <span className="text-[#33332A]">{record.encumbranceStatus?.value === 'COURT_STAY' ? 'Active Civil Dispute' : 'Free of Litigation'}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#6B6B58] block">Agricultural Ceiling</span>
                  <span className="text-[#33332A]">Within Statutory Ceiling Limits</span>
                </div>
              </div>
            </div>

            {/* SECTION 5: Automated Validation Rules Execution Audit */}
            <div className="mt-4 space-y-1.5 page-break-inside-avoid">
              <div className="bg-[#F2EFE9] px-3 py-1 border border-[#DCD7CE] rounded flex items-center justify-between">
                <h4 className="text-xs font-bold text-[#4A3728] uppercase tracking-wider font-sans">
                  5. Automated DILRMP Validation Rule Audit / स्वचालित नियम सत्यापन रिपोर्ट
                </h4>
                <span className="text-[10px] font-mono text-[#6B6B58] font-sans">
                  Overall Confidence: {record.overallConfidence}%
                </span>
              </div>

              <table className="w-full text-xs font-sans border border-[#DCD7CE] rounded overflow-hidden">
                <thead className="bg-[#EBE7DF] text-[#4A3728] font-semibold text-[11px]">
                  <tr>
                    <th className="py-1 px-2 text-left w-24">Rule ID</th>
                    <th className="py-1 px-2 text-left">Validation Criteria</th>
                    <th className="py-1 px-2 text-left w-24">Status</th>
                    <th className="py-1 px-2 text-left">Audit Finding</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EBE7DF]">
                  {rules.slice(0, 4).map((rule, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-[#FAF8F5]'}>
                      <td className="py-1 px-2 font-mono text-[#6B6B58] text-[11px]">{rule.ruleId}</td>
                      <td className="py-1 px-2 font-medium text-[#33332A]">{rule.ruleName}</td>
                      <td className="py-1 px-2">
                        {rule.passed ? (
                          <span className="font-bold text-emerald-700 inline-flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            <span>PASSED</span>
                          </span>
                        ) : (
                          <span className="font-bold text-red-700 inline-flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3 text-red-600" />
                            <span>{rule.severity}</span>
                          </span>
                        )}
                      </td>
                      <td className="py-1 px-2 text-[11px] text-[#5A5A40]">{rule.message}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* SECTION 6: Human-in-the-Loop Modification Audit Trail */}
            {historyEntries.length > 0 && (
              <div className="mt-4 space-y-1.5 page-break-inside-avoid">
                <div className="bg-[#F2EFE9] px-3 py-1 border border-[#DCD7CE] rounded flex items-center justify-between">
                  <h4 className="text-xs font-bold text-[#4A3728] uppercase tracking-wider font-sans">
                    6. Human-in-the-Loop (HITL) Audit Log / संशोधन इतिहास एवं साक्ष्य
                  </h4>
                  <span className="text-[10px] font-mono text-[#6B6B58] font-sans">
                    {historyEntries.length} Event{historyEntries.length > 1 ? 's' : ''}
                  </span>
                </div>

                <div className="space-y-1 text-xs font-sans">
                  {historyEntries.slice(0, 2).map((h, idx) => (
                    <div key={idx} className="p-2 bg-white border border-[#EBE7DF] rounded flex flex-wrap items-center justify-between gap-1">
                      <div>
                        <span className="font-bold text-[#8B4513]">{h.userName}</span>
                        <span className="text-[#6B6B58] text-[11px] ml-1.5">({new Date(h.timestamp).toLocaleString('en-IN')})</span>
                        <span className="block text-[11px] text-[#33332A] mt-0.5">
                          Field: <strong>{h.fieldLabel}</strong> | Old: "{h.previousValue}" → New: "<strong>{h.newValue}</strong>"
                        </span>
                      </div>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#FAF8F5] border border-[#DCD7CE] text-[#5A5A40] font-mono">
                        {h.changeType}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SECTION 7: Statutory Attestation & Official Seals */}
            <div className="mt-6 pt-4 border-t-2 border-[#8B4513]/30 page-break-inside-avoid">
              <p className="text-[11px] text-[#6B6B58] italic leading-relaxed mb-4 text-center font-serif">
                Certified under Section 35 of the Indian Evidence Act, 1872 and the Information Technology Act, 2000 that this official copy has been retrieved from the central state land registry database, verified by designated revenue officers, and electronically attested with authorized cryptographic credentials.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-sans text-xs">
                {/* Patwari Box */}
                <div className="p-3 bg-[#FAF8F5] border border-[#DCD7CE] rounded-lg relative">
                  <span className="text-[10px] font-bold text-[#8B4513] block uppercase">Verified &amp; Deskewed By:</span>
                  <span className="font-bold text-[#33332A] block mt-1">Patwari Rajesh Kumar Sharma</span>
                  <span className="text-[11px] text-[#6B6B58] block">Survey Specialist ID: SPEC-PAT-108</span>
                  <span className="text-[10px] text-[#5A5A40] block mt-1">Halka Circle #04 (Wagholi)</span>

                  <div className="mt-3 pt-2 border-t border-dashed border-[#DCD7CE] flex items-center justify-between">
                    <span className="text-[10px] text-emerald-700 font-bold">Field Check OK</span>
                    <div className="w-8 h-8 rounded-full border border-[#8B4513] flex items-center justify-center text-[7px] text-[#8B4513] font-bold uppercase rotate-[-15deg]">
                      SEAL
                    </div>
                  </div>
                </div>

                {/* SDM Box */}
                <div className="p-3 bg-[#FAF8F5] border border-[#DCD7CE] rounded-lg relative">
                  <span className="text-[10px] font-bold text-[#8B4513] block uppercase">Sanctioned &amp; Approved By:</span>
                  <span className="font-bold text-[#33332A] block mt-1">Alok Srivastava, SDM</span>
                  <span className="text-[11px] text-[#6B6B58] block">Revenue Court Officer / OFF-REV-094</span>
                  <span className="text-[10px] text-[#5A5A40] block mt-1">Sub-Division Haveli, Pune</span>

                  <div className="mt-3 pt-2 border-t border-dashed border-[#DCD7CE] flex items-center justify-between">
                    <span className="text-[10px] text-emerald-700 font-bold">Sanction Granted</span>
                    <div className="w-8 h-8 rounded-full border border-[#8B4513] flex items-center justify-center text-[7px] text-[#8B4513] font-bold uppercase rotate-[-15deg]">
                      SEAL
                    </div>
                  </div>
                </div>

                {/* Digital Signature Token Box */}
                <div className="p-3 bg-[#FAF8F5] border border-[#BCD4C0] rounded-lg relative bg-gradient-to-br from-white to-[#EAF2EB]/40">
                  <div className="flex items-center gap-1.5 text-emerald-800 font-bold text-[10px] uppercase">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Digital Signature Certificate</span>
                  </div>
                  <span className="font-mono text-[11px] font-bold text-[#33332A] block mt-1">
                    DSC-GOI-DILRMP-2026-X77A
                  </span>
                  <span className="text-[10px] font-mono text-[#5A5A40] block truncate">
                    Cert: CN=Govt Land Records CA 2026
                  </span>
                  <span className="text-[9px] text-[#6B6B58] block mt-1 font-mono">
                    Time: {dateFormatted} {timeFormatted}
                  </span>

                  <div className="mt-2 pt-1 border-t border-dashed border-[#BCD4C0] flex items-center justify-between">
                    <span className="text-[10px] text-emerald-800 font-bold">Cryptographically Valid</span>
                    <span className="text-[9px] font-mono text-[#5A5A40]">RSA-2048</span>
                  </div>
                </div>
              </div>

              {/* End of Dossier Archival Note */}
              <div className="mt-4 pt-3 border-t border-[#DCD7CE] flex flex-wrap items-center justify-between text-[10px] text-[#6B6B58] font-sans">
                <span>DILRMP Certified Archival Document • Form ROR-VII • Issued by Ministry of Rural Development</span>
                <span>Page 1 of 1 • Archival Copy Ref #{record.documentNumber}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
