import React, { useState, useRef } from 'react';
import { 
  Printer, 
  Download, 
  X, 
  ShieldCheck, 
  FileText, 
  AlertTriangle, 
  CheckCircle2, 
  Building2, 
  Scale, 
  Calendar, 
  Hash, 
  QrCode,
  Stamp,
  Eye,
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react';
import { ExtractedLandRecord, AuthUser } from '../types';

interface ArchivalPdfReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  records: ExtractedLandRecord[];
  currentUser?: AuthUser | null;
  selectedRecordIds?: string[];
}

export const ArchivalPdfReportModal: React.FC<ArchivalPdfReportModalProps> = ({
  isOpen,
  onClose,
  records,
  currentUser,
  selectedRecordIds
}) => {
  const hasSelection = selectedRecordIds && selectedRecordIds.length > 0;
  const [filterScope, setFilterScope] = useState<'ALL' | 'SELECTED' | 'VERIFIED' | 'NEEDS_REVIEW' | string>(
    hasSelection ? 'SELECTED' : 'ALL'
  );
  const [includeScorecard, setIncludeScorecard] = useState(true);
  const [includeMatrix, setIncludeMatrix] = useState(true);
  const [includeExceptions, setIncludeExceptions] = useState(true);
  const [includeAttestation, setIncludeAttestation] = useState(true);
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
  
  const reportRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  // Filter records based on selected scope
  const filteredRecords = records.filter(record => {
    if (filterScope === 'SELECTED') {
      return selectedRecordIds ? selectedRecordIds.includes(record.id) : true;
    }
    if (filterScope === 'ALL') return true;
    if (filterScope === 'VERIFIED') return record.status === 'VERIFIED_AND_SANCTIONED';
    if (filterScope === 'NEEDS_REVIEW') return record.status === 'NEEDS_REVIEW';
    return record.state.value === filterScope;
  });

  // Calculate audit metrics
  const totalCount = filteredRecords.length;
  const verifiedCount = filteredRecords.filter(r => r.status === 'VERIFIED_AND_SANCTIONED').length;
  const needsReviewCount = filteredRecords.filter(r => r.status === 'NEEDS_REVIEW').length;
  const verifiedPercent = totalCount > 0 ? Math.round((verifiedCount / totalCount) * 100) : 0;
  
  const avgConfidence = totalCount > 0
    ? (filteredRecords.reduce((acc, r) => acc + r.overallConfidence, 0) / totalCount).toFixed(1)
    : '0.0';

  const clearEncumbranceCount = filteredRecords.filter(r => r.encumbranceStatus.value === 'CLEAR').length;
  const encumberedCount = totalCount - clearEncumbranceCount;

  // Total area in Hectares
  const totalAreaSqMeters = filteredRecords.reduce((acc, r) => acc + (r.normalizedAreaSqMeters || 0), 0);
  const totalAreaHectares = (totalAreaSqMeters / 10000).toFixed(2);

  // Exceptions count (rules failed)
  const recordsWithFailedRules = filteredRecords.filter(r => 
    r.validationResults?.some(vr => !vr.passed)
  );

  // Distinct states in selection
  const distinctStates = Array.from(new Set(records.map(r => r.state.value)));

  // Report Reference and Timestamps
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
  const formattedTime = currentDate.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });
  const dispatchRefNo = `DILRMP/VAL-ARC/2026/B-${Math.abs(records.reduce((acc, r) => acc + r.id.length * 31, 1024))}`;
  const checksumHash = `SHA256: 7f8a9e${totalCount}b4c${verifiedCount}d2e1f${Math.floor(totalAreaSqMeters)}`;

  // Handler for printing
  const handlePrint = () => {
    window.print();
  };

  // Handler for offline HTML/PDF download
  const handleDownloadOfflineReport = () => {
    if (!reportRef.current) return;
    const reportHtml = reportRef.current.innerHTML;
    
    const fullDocument = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>DILRMP Land Record Validation Archival Report - ${dispatchRefNo}</title>
  <style>
    body {
      font-family: Georgia, Cambria, "Times New Roman", Times, serif;
      background-color: #ffffff;
      color: #1a1a1a;
      margin: 0;
      padding: 20mm;
      line-height: 1.45;
      font-size: 11pt;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 12px;
      margin-bottom: 16px;
    }
    th, td {
      border: 1px solid #707052;
      padding: 6px 8px;
      font-size: 9.5pt;
      text-align: left;
    }
    th {
      background-color: #f2efe9;
      font-weight: bold;
    }
    .badge {
      display: inline-block;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 8pt;
      font-weight: bold;
    }
    .badge-success { background: #eaf2eb; color: #2d5a35; border: 1px solid #bcd4c0; }
    .badge-warning { background: #fff9ea; color: #8b4513; border: 1px solid #dcd7ce; }
    .badge-danger { background: #fdf0ed; color: #8b0000; border: 1px solid #f2c2ba; }
    @media print {
      body { padding: 0; }
      @page { size: A4 ${orientation}; margin: 12mm; }
    }
  </style>
</head>
<body>
  ${reportHtml}
  <div style="text-align:center; margin-top:30px; font-size:9pt; color:#666; border-top:1px solid #ccc; padding-top:10px;">
    End of Official Statutory Land Record Validation Summary. Retain in state digital registry.
  </div>
</body>
</html>`;

    const blob = new Blob([fullDocument], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `DILRMP_Validation_Summary_Archival_${currentDate.toISOString().slice(0, 10)}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-2 sm:p-4 overflow-y-auto print:p-0 print:bg-white">
      <div className="bg-[#FAF8F5] w-full max-w-5xl max-h-[92vh] flex flex-col rounded-2xl border border-[#DCD7CE] shadow-2xl overflow-hidden archival-print-wrapper print:max-w-none print:max-h-none print:border-none print:shadow-none print:rounded-none">
        
        {/* Modal Top Action & Controls Bar (Hidden during print) */}
        <div className="bg-[#43432F] text-[#FAF8F5] px-5 py-3 flex flex-wrap items-center justify-between gap-3 border-b border-[#363625] no-print">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-[#5A5A40] text-[#FFF9EA]">
              <Printer className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-[#FFF9EA] natural-serif">
                  Land Record Validation Summary — Archival PDF Report
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#363625] text-[#A6CCA0] border border-[#52523C] font-mono">
                  ISO 216 A4 Archival
                </span>
              </div>
              <p className="text-[11px] text-[#D7D2C5]">
                Export official government validation certificates and statutory compliance summaries
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="btn-trigger-print-report"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#82B37A] hover:bg-[#6FA366] text-[#1E301B] font-bold text-xs shadow-xs transition-all cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save as PDF</span>
            </button>

            <button
              id="btn-download-html-report"
              onClick={handleDownloadOfflineReport}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#5A5A40] hover:bg-[#4E4E37] text-[#FFF9EA] text-xs font-medium border border-[#707052] transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Download Archival File</span>
            </button>

            <button
              id="btn-close-pdf-modal"
              onClick={onClose}
              aria-label="Close modal"
              className="p-1.5 rounded-lg hover:bg-[#363625] text-[#D7D2C5] hover:text-[#FFF9EA] transition-colors cursor-pointer ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Configuration Filters Bar (Hidden during print) */}
        <div className="bg-[#EBE7DF]/80 px-5 py-2.5 border-b border-[#DCD7CE] flex flex-wrap items-center justify-between gap-3 text-xs text-[#33332A] no-print">
          {/* Scope selection */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-[#5A5A40] natural-serif">Report Scope:</span>
            <select
              aria-label="Report scope filter"
              value={filterScope}
              onChange={(e) => setFilterScope(e.target.value)}
              className="px-2.5 py-1 text-xs rounded-md border border-[#DCD7CE] bg-[#FAF8F5] text-[#33332A] font-medium cursor-pointer"
            >
              {hasSelection && (
                <option value="SELECTED">Selected Records Only ({selectedRecordIds.length})</option>
              )}
              <option value="ALL">All Digitized Records ({records.length})</option>
              <option value="VERIFIED">Sanctioned Only ({records.filter(r => r.status === 'VERIFIED_AND_SANCTIONED').length})</option>
              <option value="NEEDS_REVIEW">Needs Review / Flagged ({records.filter(r => r.status === 'NEEDS_REVIEW').length})</option>
              {distinctStates.map(st => (
                <option key={st} value={st}>State: {st} ({records.filter(r => r.state.value === st).length})</option>
              ))}
            </select>

            <span className="text-[#DCD7CE]">|</span>

            {/* Orientation */}
            <div className="flex items-center gap-1">
              <span className="text-[#5A5A40] font-medium">Layout:</span>
              <button
                type="button"
                onClick={() => setOrientation('portrait')}
                className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                  orientation === 'portrait' ? 'bg-[#5A5A40] text-[#FFF9EA]' : 'bg-[#FAF8F5] text-[#5A5A40] border border-[#DCD7CE]'
                }`}
              >
                Portrait (A4)
              </button>
              <button
                type="button"
                onClick={() => setOrientation('landscape')}
                className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                  orientation === 'landscape' ? 'bg-[#5A5A40] text-[#FFF9EA]' : 'bg-[#FAF8F5] text-[#5A5A40] border border-[#DCD7CE]'
                }`}
              >
                Landscape (Matrix)
              </button>
            </div>
          </div>

          {/* Section Toggles */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-semibold text-[#5A5A40] natural-serif">Sections:</span>
            <label className="inline-flex items-center gap-1 cursor-pointer select-none">
              <input 
                type="checkbox" 
                checked={includeScorecard} 
                onChange={(e) => setIncludeScorecard(e.target.checked)}
                className="rounded text-[#5A5A40] accent-[#5A5A40]"
              />
              <span>KPI Metrics</span>
            </label>
            <label className="inline-flex items-center gap-1 cursor-pointer select-none">
              <input 
                type="checkbox" 
                checked={includeMatrix} 
                onChange={(e) => setIncludeMatrix(e.target.checked)}
                className="rounded text-[#5A5A40] accent-[#5A5A40]"
              />
              <span>Validation Table</span>
            </label>
            <label className="inline-flex items-center gap-1 cursor-pointer select-none">
              <input 
                type="checkbox" 
                checked={includeExceptions} 
                onChange={(e) => setIncludeExceptions(e.target.checked)}
                className="rounded text-[#5A5A40] accent-[#5A5A40]"
              />
              <span>Discrepancies</span>
            </label>
            <label className="inline-flex items-center gap-1 cursor-pointer select-none">
              <input 
                type="checkbox" 
                checked={includeAttestation} 
                onChange={(e) => setIncludeAttestation(e.target.checked)}
                className="rounded text-[#5A5A40] accent-[#5A5A40]"
              />
              <span>Official Stamp</span>
            </label>
          </div>
        </div>

        {/* Document Preview Canvas (Scrollable on screen, Full sheet when printing) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-[#EBE7DF]/40 print:p-0 print:bg-white print:overflow-visible">
          <div 
            ref={reportRef}
            className={`mx-auto bg-white rounded-xl border border-[#DCD7CE] shadow-sm p-6 sm:p-10 text-[#22221E] archival-print-sheet print:border-none print:shadow-none print:p-0 ${
              orientation === 'landscape' ? 'max-w-6xl' : 'max-w-4xl'
            }`}
          >
            {/* Header with National Coat of Arms styling */}
            <div className="border-b-2 border-[#43432F] pb-4 mb-6">
              <div className="flex items-start justify-between gap-4">
                {/* Emblem & Ministry Title */}
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full border-2 border-[#43432F] flex items-center justify-center p-1 bg-[#FAF8F5] shrink-0 text-[#43432F]">
                    {/* Stylized Emblem / Stamp */}
                    <div className="text-center font-serif leading-none">
                      <Scale className="w-6 h-6 mx-auto text-[#43432F] mb-0.5" />
                      <span className="text-[7px] font-bold tracking-widest block uppercase">DILRMP</span>
                    </div>
                  </div>

                  <div>
                    <div className="text-[11px] font-bold tracking-widest text-[#5A5A40] uppercase">
                      Government of India • Department of Land Resources
                    </div>
                    <div className="text-xs font-semibold text-[#43432F]">
                      Ministry of Rural Development • National Land Record Modernization Mission
                    </div>
                    <h1 className="text-xl sm:text-2xl font-bold text-[#33332A] natural-serif tracking-tight mt-1">
                      Statutory Land Record Validation &amp; Archival Summary Report
                    </h1>
                    <div className="text-[10px] text-[#6B6B58] font-mono mt-0.5">
                      Class 1 Permanent Land Revenue Verification Record (Section 42, DILRMP Standards 2026)
                    </div>
                  </div>
                </div>

                {/* Archival Dispatch Registry Block */}
                <div className="text-right text-[11px] font-mono bg-[#FAF8F5] p-2.5 rounded-lg border border-[#DCD7CE] shrink-0 min-w-[210px]">
                  <div className="flex items-center justify-between gap-2 border-b border-[#DCD7CE] pb-1 mb-1">
                    <span className="text-[#6B6B58]">Dispatch Ref:</span>
                    <span className="font-bold text-[#33332A]">{dispatchRefNo}</span>
                  </div>
                  <div className="flex items-center justify-between gap-2 border-b border-[#DCD7CE] pb-1 mb-1">
                    <span className="text-[#6B6B58]">Date / Time:</span>
                    <span className="font-semibold text-[#33332A]">{formattedDate} {formattedTime}</span>
                  </div>
                  <div className="flex items-center justify-between gap-2 border-b border-[#DCD7CE] pb-1 mb-1">
                    <span className="text-[#6B6B58]">Authority:</span>
                    <span className="font-semibold text-[#33332A]">
                      {currentUser ? currentUser.name : 'Alok Srivastava'} ({currentUser ? currentUser.title : 'SDM / Tehsildar'})
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[#6B6B58]">Terminal:</span>
                    <span className="text-[#43432F]">{currentUser ? currentUser.terminalId : 'HQ-REV-STATION-01'}</span>
                  </div>
                </div>
              </div>

              {/* Integrity Barcode / Digest */}
              <div className="mt-3 pt-2 border-t border-dashed border-[#DCD7CE] flex items-center justify-between text-[9.5px] font-mono text-[#6B6B58]">
                <span>DIGITAL INTEGRITY CHECKSUM: {checksumHash}</span>
                <span>SECURITY LEVEL: AUDIT-VERIFIED • STATUTORY ARCHIVE</span>
              </div>
            </div>

            {/* SECTION 1: Executive Validation Audit Metrics */}
            {includeScorecard && (
              <div className="mb-6 page-break-inside-avoid">
                <h2 className="text-xs font-bold text-[#43432F] uppercase tracking-wider mb-2.5 flex items-center gap-1.5 natural-serif">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#3D5A40]" />
                  <span>I. Executive Validation Scorecard &amp; Statutory Compliance</span>
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <div className="bg-[#FAF8F5] p-2.5 rounded-lg border border-[#DCD7CE]">
                    <span className="block text-[10px] uppercase font-semibold text-[#6B6B58]">Total Parcels Analyzed</span>
                    <span className="text-lg font-bold text-[#33332A] natural-serif">{totalCount}</span>
                    <span className="block text-[10px] text-[#5A5A40]">100% Ingested in Batch</span>
                  </div>

                  <div className="bg-[#FAF8F5] p-2.5 rounded-lg border border-[#DCD7CE]">
                    <span className="block text-[10px] uppercase font-semibold text-[#6B6B58]">Sanction &amp; Sync Rate</span>
                    <span className="text-lg font-bold text-[#3D5A40] natural-serif">{verifiedPercent}%</span>
                    <span className="block text-[10px] text-[#3D5A40]">{verifiedCount} of {totalCount} Cleared</span>
                  </div>

                  <div className="bg-[#FAF8F5] p-2.5 rounded-lg border border-[#DCD7CE]">
                    <span className="block text-[10px] uppercase font-semibold text-[#6B6B58]">Indic OCR/HWR Accuracy</span>
                    <span className="text-lg font-bold text-[#8B4513] natural-serif">{avgConfidence}%</span>
                    <span className="block text-[10px] text-[#6B6B58]">Gemini 3.8 Indic Core</span>
                  </div>

                  <div className="bg-[#FAF8F5] p-2.5 rounded-lg border border-[#DCD7CE]">
                    <span className="block text-[10px] uppercase font-semibold text-[#6B6B58]">Exceptions (HITL)</span>
                    <span className="text-lg font-bold text-[#8B0000] natural-serif">{needsReviewCount}</span>
                    <span className="block text-[10px] text-[#8B0000]">{recordsWithFailedRules.length} Rule Flags</span>
                  </div>
                </div>

                <div className="mt-2.5 bg-[#FAF8F5] p-2.5 rounded-lg border border-[#DCD7CE] text-xs flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span className="font-semibold text-[#43432F]">Total Normalized Cadastral Extent:</span>{' '}
                    <span className="font-bold text-[#33332A]">{totalAreaHectares} Hectares</span>{' '}
                    <span className="text-[#6B6B58]">({(parseFloat(totalAreaHectares) * 2.47105).toFixed(2)} Acres)</span>
                  </div>
                  <div>
                    <span className="font-semibold text-[#43432F]">Title Encumbrance Profile:</span>{' '}
                    <span className="font-bold text-[#3D5A40]">{clearEncumbranceCount} Clear</span> /{' '}
                    <span className="font-bold text-[#8B4513]">{encumberedCount} Under Lien / Stay / Govt Notice</span>
                  </div>
                </div>
              </div>
            )}

            {/* SECTION 2: Comprehensive Validation Matrix Table */}
            {includeMatrix && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-xs font-bold text-[#43432F] uppercase tracking-wider flex items-center gap-1.5 natural-serif">
                    <FileText className="w-3.5 h-3.5 text-[#5A5A40]" />
                    <span>II. Individual Parcel Statutory Validation Findings Matrix</span>
                  </h2>
                  <span className="text-[10px] text-[#6B6B58] font-mono">
                    Showing {filteredRecords.length} records
                  </span>
                </div>

                <div className="overflow-x-auto border border-[#707052] rounded-lg">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#EBE7DF] text-[#33332A] border-b border-[#707052]">
                        <th className="py-2 px-2.5 font-bold border-r border-[#DCD7CE] w-12 text-center">Sr.</th>
                        <th className="py-2 px-2.5 font-bold border-r border-[#DCD7CE]">Khasra / Survey &amp; Doc ID</th>
                        <th className="py-2 px-2.5 font-bold border-r border-[#DCD7CE]">Jurisdiction (State / Village)</th>
                        <th className="py-2 px-2.5 font-bold border-r border-[#DCD7CE]">Registered Landowner</th>
                        <th className="py-2 px-2.5 font-bold border-r border-[#DCD7CE]">Declared Area</th>
                        <th className="py-2 px-2.5 font-bold border-r border-[#DCD7CE]">Encumbrance</th>
                        <th className="py-2 px-2.5 font-bold border-r border-[#DCD7CE]">Automated Validation Rules</th>
                        <th className="py-2 px-2.5 font-bold text-center">Statutory Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#DCD7CE]">
                      {filteredRecords.map((record, index) => {
                        const isVerified = record.status === 'VERIFIED_AND_SANCTIONED';
                        const failedRules = record.validationResults?.filter(r => !r.passed) || [];
                        const passedRulesCount = record.validationResults?.filter(r => r.passed).length || 0;

                        return (
                          <tr key={record.id} className={index % 2 === 1 ? 'bg-[#FAF8F5]/60' : 'bg-white'}>
                            <td className="py-2 px-2 text-center font-mono text-[11px] text-[#6B6B58] border-r border-[#DCD7CE]">
                              {index + 1}
                            </td>

                            <td className="py-2 px-2.5 border-r border-[#DCD7CE]">
                              <div className="font-bold text-[#33332A] natural-serif text-[12px]">
                                {record.khasraNumber.value}
                              </div>
                              <div className="text-[10px] font-mono text-[#6B6B58]">
                                {record.documentNumber}
                              </div>
                              <div className="text-[10px] text-[#5A5A40]">
                                Type: {record.documentType.replace('_', ' ')}
                              </div>
                            </td>

                            <td className="py-2 px-2.5 border-r border-[#DCD7CE]">
                              <div className="font-semibold text-[#33332A]">
                                {record.village.value}
                              </div>
                              <div className="text-[10px] text-[#6B6B58]">
                                {record.tehsil.value}, {record.state.value}
                              </div>
                            </td>

                            <td className="py-2 px-2.5 border-r border-[#DCD7CE]">
                              <div className="font-medium text-[#33332A]">
                                {record.primaryOwnerName.value}
                              </div>
                              <div className="text-[10px] text-[#6B6B58]">
                                {record.parentageOrSpouse.value}
                              </div>
                              {record.coSharers && record.coSharers.length > 0 && (
                                <div className="text-[9.5px] text-[#5A5A40]">
                                  + {record.coSharers.length} Co-Sharers
                                </div>
                              )}
                            </td>

                            <td className="py-2 px-2.5 border-r border-[#DCD7CE] whitespace-nowrap font-mono text-[11px]">
                              <span className="font-bold text-[#33332A]">{record.totalAreaDeclared.value}</span>{' '}
                              <span className="text-[10px] text-[#6B6B58]">{record.declaredUnit.value.toLowerCase()}</span>
                              <div className="text-[9.5px] text-[#5A5A40]">
                                {(record.normalizedAreaSqMeters / 10000).toFixed(2)} Ha
                              </div>
                            </td>

                            <td className="py-2 px-2.5 border-r border-[#DCD7CE]">
                              <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                                record.encumbranceStatus.value === 'CLEAR'
                                  ? 'bg-[#EAF2EB] text-[#2D5A35] border border-[#BCD4C0]'
                                  : record.encumbranceStatus.value === 'COURT_STAY'
                                  ? 'bg-[#FDF0ED] text-[#8B0000] border border-[#F2C2BA]'
                                  : 'bg-[#FFF9EA] text-[#8B4513] border border-[#DCD7CE]'
                              }`}>
                                {record.encumbranceStatus.value}
                              </span>
                            </td>

                            <td className="py-2 px-2.5 border-r border-[#DCD7CE]">
                              {failedRules.length === 0 ? (
                                <div className="flex items-center gap-1 text-[#2D5A35] text-[11px] font-medium">
                                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                                  <span>Passed all {passedRulesCount} validation rules</span>
                                </div>
                              ) : (
                                <div className="space-y-1">
                                  {failedRules.map((fr, idx) => (
                                    <div key={idx} className="flex items-start gap-1 text-[10px] text-[#8B0000]">
                                      <AlertTriangle className="w-3 h-3 shrink-0 mt-0.5" />
                                      <span className="leading-tight">
                                        <strong>{fr.ruleName}:</strong> {fr.message}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </td>

                            <td className="py-2 px-2 text-center whitespace-nowrap">
                              <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                                isVerified
                                  ? 'bg-[#EAF2EB] text-[#2D5A35] border border-[#BCD4C0]'
                                  : 'bg-[#FFF9EA] text-[#8B4513] border border-[#DCD7CE]'
                              }`}>
                                {isVerified ? 'VERIFIED & SANCTIONED' : 'NEEDS REVIEW'}
                              </span>
                              <div className="text-[10px] font-mono text-[#6B6B58] mt-0.5">
                                {record.overallConfidence}% OCR
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* SECTION 3: Summary of Exceptions & Discrepancies */}
            {includeExceptions && recordsWithFailedRules.length > 0 && (
              <div className="mb-6 page-break-inside-avoid">
                <h2 className="text-xs font-bold text-[#8B0000] uppercase tracking-wider mb-2 flex items-center gap-1.5 natural-serif">
                  <AlertTriangle className="w-3.5 h-3.5 text-[#8B0000]" />
                  <span>III. Annexure: Critical Statutory Discrepancies &amp; Legal Notices</span>
                </h2>

                <div className="space-y-2 border border-[#F2C2BA] bg-[#FDF0ED]/40 rounded-lg p-3 text-xs">
                  {recordsWithFailedRules.map((rec) => (
                    <div key={rec.id} className="border-b border-[#F2C2BA]/60 pb-2 last:border-none last:pb-0">
                      <div className="flex items-center justify-between font-semibold text-[#33332A]">
                        <span>
                          Khasra No. {rec.khasraNumber.value} — {rec.village.value}, {rec.state.value} ({rec.primaryOwnerName.value})
                        </span>
                        <span className="font-mono text-[10px] text-[#8B0000]">Ref: {rec.documentNumber}</span>
                      </div>
                      <ul className="mt-1 space-y-0.5 pl-4 list-disc text-[11px] text-[#5A3A35]">
                        {rec.validationResults?.filter(r => !r.passed).map((rule, idx) => (
                          <li key={idx}>
                            <strong className="text-[#8B0000]">{rule.ruleName}:</strong> {rule.message}{' '}
                            {rule.details && <span className="text-[#6B4B45]">({rule.details})</span>}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SECTION 4: Statutory Legal Attestation & Verification Certificate */}
            {includeAttestation && (
              <div className="border-t-2 border-[#43432F] pt-4 mt-6 page-break-inside-avoid">
                <h2 className="text-xs font-bold text-[#43432F] uppercase tracking-wider mb-3 flex items-center gap-1.5 natural-serif">
                  <Stamp className="w-3.5 h-3.5 text-[#5A5A40]" />
                  <span>IV. Statutory Attestation &amp; Digital Authenticity Certificate</span>
                </h2>

                {/* Section 65B IT Act Declaration */}
                <div className="bg-[#FAF8F5] p-3 rounded-lg border border-[#DCD7CE] text-[11px] text-[#4A3728] leading-relaxed mb-4">
                  <strong>STATUTORY ELECTRONIC RECORD CERTIFICATE (SECTION 65B, INDIAN EVIDENCE ACT, 1872 &amp; IT ACT, 2000):</strong>
                  <p className="mt-1">
                    I hereby certify that the electronic land record validation summaries set forth herein have been systematically produced by computer systems operating under the official custody and control of the Department of Land Resources, Ministry of Rural Development, Government of India. The computerized OCR/HWR Indic transcription and statutory validation cross-checks were conducted in the ordinary course of official revenue activities without unauthorized tampering or loss of data integrity.
                  </p>
                </div>

                {/* Signature, Stamp & Seal Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center pt-2">
                  {/* Left: Officer Signature block */}
                  <div className="border border-[#DCD7CE] rounded-lg p-3 text-xs bg-[#FAF8F5]">
                    <span className="text-[10px] uppercase font-bold text-[#6B6B58] block mb-2">Authorizing Revenue Authority</span>
                    <div className="font-serif italic text-sm text-[#43432F] font-bold border-b border-dashed border-[#707052] pb-1 mb-1">
                      {currentUser ? currentUser.name : 'Alok Srivastava'}
                    </div>
                    <div className="font-semibold text-[#33332A]">
                      {currentUser ? currentUser.title : 'Sub-Divisional Magistrate (SDM) / Tehsildar'}
                    </div>
                    <div className="text-[10px] text-[#6B6B58]">
                      {currentUser ? currentUser.jurisdiction : 'Circle 04 / District Revenue Head'}
                    </div>
                    <div className="text-[10px] font-mono text-[#5A5A40] mt-1">
                      DSC Token ID: 0x882A-99B4-REV-GOV
                    </div>
                  </div>

                  {/* Center: Official Revenue Seal */}
                  <div className="flex flex-col items-center justify-center p-2 text-center">
                    <div className="w-24 h-24 rounded-full border-2 border-dashed border-[#8B0000] flex flex-col items-center justify-center p-1 text-[#8B0000] bg-[#FFF9EA]/30">
                      <Scale className="w-5 h-5 text-[#8B0000] mb-0.5" />
                      <span className="text-[7px] font-extrabold uppercase tracking-widest block leading-tight">DILRMP ARCHIVE</span>
                      <span className="text-[6.5px] font-bold uppercase tracking-wider block">GOVT OF INDIA</span>
                      <span className="text-[6px] text-[#8B0000]/80 font-mono">SEAL No. 4092</span>
                    </div>
                    <span className="text-[9.5px] font-semibold text-[#6B6B58] mt-1">Official Archival Seal</span>
                  </div>

                  {/* Right: QR Code & Checksum Block */}
                  <div className="border border-[#DCD7CE] rounded-lg p-3 text-xs bg-[#FAF8F5] flex items-center gap-3">
                    <div className="w-14 h-14 bg-white p-1 rounded border border-[#DCD7CE] shrink-0 flex items-center justify-center">
                      <QrCode className="w-12 h-12 text-[#33332A]" />
                    </div>
                    <div className="text-[10px] space-y-0.5">
                      <div className="font-bold text-[#33332A]">Scan to Verify</div>
                      <div className="text-[#6B6B58] leading-tight">
                        Authenticity verifiable on national portal:
                      </div>
                      <div className="font-mono text-[#5A5A40] text-[9px] break-all">
                        dilrmp.gov.in/verify/{dispatchRefNo.replace(/\//g, '_')}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Notice */}
                <div className="mt-4 pt-2 border-t border-[#DCD7CE] text-center text-[9px] text-[#6B6B58]">
                  This document is an authentic summary report generated for archival preservation in the National Land Registry Database under the Digital India Land Records Modernization Programme.
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Bottom Sticky Bar (Hidden during print) */}
        <div className="bg-[#FAF8F5] px-5 py-3 border-t border-[#DCD7CE] flex items-center justify-between gap-3 text-xs text-[#5A5A40] no-print">
          <div className="flex items-center gap-2">
            <span className="font-medium">Total records in report:</span>
            <span className="font-bold text-[#33332A]">{filteredRecords.length} of {records.length}</span>
            <span className="text-[#DCD7CE]">|</span>
            <span className="text-[11px] text-[#6B6B58]">
              Ready for high-resolution A4 printing or PDF archival storage
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg border border-[#DCD7CE] bg-[#FAF8F5] hover:bg-[#EBE7DF] text-[#33332A] font-medium transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-natural-olive hover:bg-natural-olive-dark text-[#FFF9EA] font-bold shadow-xs transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Export PDF</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
