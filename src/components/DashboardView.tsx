import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, 
  FileCheck, 
  AlertTriangle, 
  TrendingUp, 
  Layers, 
  CheckCircle, 
  Clock, 
  Search, 
  Filter, 
  ArrowUpRight, 
  FileText, 
  Sparkles,
  RefreshCw,
  ExternalLink,
  ChevronRight,
  Printer,
  Download,
  CheckSquare,
  Square,
  MinusSquare,
  CheckCircle2,
  XCircle,
  X,
  ShieldCheck,
  Check,
  RotateCcw
} from 'lucide-react';
import { ExtractedLandRecord, StateDigitizationProgress, AuthUser, VerificationStatus, RecordModificationEntry } from '../types';
import { STATE_DIGITIZATION_DATA } from '../data/sampleRecords';
import { ArchivalPdfReportModal } from './ArchivalPdfReportModal';
import { ValidationTrendSparkline, MicroSparkline } from './ValidationTrendSparkline';

interface DashboardViewProps {
  records: ExtractedLandRecord[];
  onSelectRecord: (record: ExtractedLandRecord) => void;
  onNavigateToIngestion: () => void;
  onNavigateToVerification: () => void;
  onUpdateRecords?: (updatedRecords: ExtractedLandRecord[]) => void;
  currentUser?: AuthUser | null;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  records,
  onSelectRecord,
  onNavigateToIngestion,
  onNavigateToVerification,
  onUpdateRecords,
  currentUser
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStateFilter, setSelectedStateFilter] = useState<string>('ALL');
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [selectedRecordIds, setSelectedRecordIds] = useState<string[]>([]);
  const [confirmModalStatus, setConfirmModalStatus] = useState<VerificationStatus | null>(null);
  const [officerRemark, setOfficerRemark] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const totalRecords = records.length;
  const verifiedCount = records.filter(r => r.status === 'VERIFIED_AND_SANCTIONED').length;
  const needsReviewCount = records.filter(r => r.status === 'NEEDS_REVIEW').length;
  const avgConfidence = records.length > 0
    ? (records.reduce((acc, r) => acc + r.overallConfidence, 0) / records.length).toFixed(1)
    : '0.0';

  const filteredRecords = records.filter(record => {
    const matchesSearch = 
      record.khasraNumber.value.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.village.value.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.primaryOwnerName.value.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.documentNumber.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesState = selectedStateFilter === 'ALL' || record.state.value === selectedStateFilter;
    return matchesSearch && matchesState;
  });

  const isAllSelected = filteredRecords.length > 0 && filteredRecords.every(r => selectedRecordIds.includes(r.id));
  const isPartiallySelected = selectedRecordIds.length > 0 && !isAllSelected;

  const toggleSelectAll = () => {
    if (isAllSelected) {
      // Unselect filtered records
      const filteredIds = new Set(filteredRecords.map(r => r.id));
      setSelectedRecordIds(prev => prev.filter(id => !filteredIds.has(id)));
    } else {
      // Select all filtered records
      const combined = new Set([...selectedRecordIds, ...filteredRecords.map(r => r.id)]);
      setSelectedRecordIds(Array.from(combined));
    }
  };

  const toggleRecordSelection = (recordId: string) => {
    setSelectedRecordIds(prev => 
      prev.includes(recordId) ? prev.filter(id => id !== recordId) : [...prev, recordId]
    );
  };

  const clearSelection = () => {
    setSelectedRecordIds([]);
  };

  const handleOpenConfirmModal = (status: VerificationStatus) => {
    setConfirmModalStatus(status);
    setOfficerRemark('');
  };

  const handleApplyBulkStatus = (newStatus: VerificationStatus, customRemark?: string) => {
    if (selectedRecordIds.length === 0) return;

    const nowIso = new Date().toISOString();
    const officerName = currentUser ? currentUser.name : 'Authorized Revenue Officer';
    const userRole = currentUser ? currentUser.role : 'REVENUE_OFFICER';
    const terminalId = currentUser?.terminalId || 'HQ-REV-STATION-01';

    const statusLabel = newStatus.replace(/_/g, ' ');
    const note = customRemark?.trim() || officerRemark.trim() || `Simultaneous batch validation update to ${statusLabel}`;

    const updatedRecords = records.map(record => {
      if (!selectedRecordIds.includes(record.id)) return record;

      const changeType = newStatus === 'VERIFIED_AND_SANCTIONED' ? 'SANCTION_APPROVAL' : 'STATUS_CHANGE';

      const newModEntry: RecordModificationEntry = {
        id: `mod-bulk-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        timestamp: nowIso,
        userId: currentUser?.id || 'officer-current',
        userName: officerName,
        userRole,
        changeType,
        fieldKey: 'status',
        fieldLabel: 'Verification Status',
        previousValue: record.status,
        newValue: newStatus,
        reason: note,
        notes: `Simultaneous batch action executed across ${selectedRecordIds.length} parcels under DILRMP protocol.`,
        digitalSignatureRef: `DSC-0x${Math.abs(Date.now() * 37).toString(16).toUpperCase()}`,
        sourceTerminal: terminalId
      };

      return {
        ...record,
        status: newStatus,
        reviewHistory: [
          ...(record.reviewHistory || []),
          {
            timestamp: nowIso,
            officerName,
            role: userRole,
            action: `BULK_STATUS_${newStatus}`,
            notes: note
          }
        ],
        modificationHistory: [
          ...(record.modificationHistory || []),
          newModEntry
        ]
      };
    });

    if (onUpdateRecords) {
      onUpdateRecords(updatedRecords);
    }

    const readableStatus = newStatus === 'VERIFIED_AND_SANCTIONED' 
      ? 'Sanctioned & Verified' 
      : newStatus === 'NEEDS_REVIEW'
      ? 'Pending Review'
      : newStatus.replace(/_/g, ' ');

    setToastMessage(`Simultaneously updated ${selectedRecordIds.length} land records to '${readableStatus}' with statutory audit log.`);
    setTimeout(() => {
      setToastMessage(prev => (prev ? null : prev));
    }, 4500);

    setConfirmModalStatus(null);
    setOfficerRemark('');
    setSelectedRecordIds([]);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner with Quick Action in Natural Tones */}
      <motion.div 
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-gradient-to-r from-[#43432F] via-[#5A5A40] to-[#363625] text-[#FAF8F5] rounded-2xl p-6 sm:p-8 border border-[#707052]/40 shadow-sm relative overflow-hidden"
      >
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none flex items-center justify-end pr-8">
          <Layers className="w-96 h-96 text-[#EBE7DF]" />
        </div>

        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF9EA]/15 text-[#FFF9EA] text-xs font-semibold border border-[#FFF9EA]/25 backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#E5C37A] animate-gentle-pulse" />
            <span>National Land Records Modernization Mission (DILRMP)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#FFF9EA] natural-serif">
            Intelligent Land Record Digitization &amp; Validation Pipeline
          </h2>
          <p className="text-[#EBE7DF] text-sm sm:text-base leading-relaxed">
            Automating the conversion of legacy handwritten registers, Saat-Baara extracts, Khasra-Khatauni rolls, and cadastral maps across Indian states into verified, georeferenced electronic registries.
          </p>

          <div className="pt-3 flex flex-wrap items-center gap-3">
            <motion.button
              id="btn-quick-upload-doc"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onNavigateToIngestion}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-natural-olive hover:bg-natural-olive-dark text-[#FFF9EA] text-sm font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>Upload Scanned Document</span>
            </motion.button>
            <motion.button
              id="btn-quick-verify-queue"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onNavigateToVerification}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#363625]/90 hover:bg-[#2E2E1F] text-[#EBE7DF] text-sm font-medium border border-[#5A5A40] transition-colors cursor-pointer"
            >
              <CheckCircle className="w-4 h-4 text-[#E5C37A]" />
              <span>Inspect Review Backlog ({needsReviewCount} Pending)</span>
            </motion.button>
            <motion.button
              id="btn-export-archival-report-banner"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsReportModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#82B37A] hover:bg-[#6FA366] text-[#1E301B] text-sm font-bold shadow-xs transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Export Archival PDF Report</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* KPI Metric Cards with Staggered Motion */}
      <motion.div 
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: { staggerChildren: 0.08 }
          }
        }}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {/* Card 1: Total Digitized */}
        <motion.div 
          variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
          whileHover={{ y: -3, transition: { duration: 0.2 } }}
          className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#DCD7CE] shadow-2xs hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#5A5A40] uppercase tracking-wider natural-serif">Active Batch Records</span>
            <div className="p-2 rounded-xl bg-[#EBE7DF] text-[#5A5A40]">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold text-[#33332A] natural-serif">{totalRecords}</span>
            <span className="text-xs font-semibold text-[#3D5A40] bg-[#EAF2EB] px-2 py-0.5 rounded-full border border-[#BCD4C0]">
              100% Ingested
            </span>
          </div>
          <p className="mt-1 text-xs text-[#6B6B58]">Across 13 State Revenue systems</p>
        </motion.div>

        {/* Card 2: Average OCR/HWR Confidence */}
        <motion.div 
          variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
          whileHover={{ y: -3, transition: { duration: 0.2 } }}
          className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#DCD7CE] shadow-2xs hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#5A5A40] uppercase tracking-wider natural-serif">OCR/HWR Accuracy</span>
            <div className="p-2 rounded-xl bg-[#FFF9EA] text-[#8B4513] border border-[#DCD7CE]">
              <Sparkles className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold text-[#33332A] natural-serif">{avgConfidence}%</span>
            <span className="text-xs font-semibold text-[#8B4513] bg-[#FFF9EA] px-2 py-0.5 rounded-full border border-[#DCD7CE]">
              Gemini Indic Engine
            </span>
          </div>
          <p className="mt-1 text-xs text-[#6B6B58]">Multilingual Indic HWR Core</p>
        </motion.div>

        {/* Card 3: Sanctioned Records */}
        <motion.div 
          variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
          whileHover={{ y: -3, transition: { duration: 0.2 } }}
          className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#DCD7CE] shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#5A5A40] uppercase tracking-wider natural-serif">Sanctioned &amp; Synced</span>
              <div className="p-2 rounded-xl bg-[#EAF2EB] text-[#3D5A40] border border-[#BCD4C0]">
                <FileCheck className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-bold text-[#33332A] natural-serif">{verifiedCount}</span>
              <span className="text-xs font-semibold text-[#5A5A40] bg-[#EBE7DF] px-2 py-0.5 rounded-full">
                {totalRecords > 0 ? Math.round((verifiedCount / totalRecords) * 100) : 0}% Pass Rate
              </span>
            </div>
            <p className="mt-1 text-xs text-[#6B6B58]">Digital signature &amp; DSC authenticated</p>
          </div>
          <div className="mt-2.5 pt-2 border-t border-[#DCD7CE]/60">
            <div className="flex items-center justify-between text-[10px] text-[#6B6B58] mb-1">
              <span>365-Day Velocity</span>
              <span className="text-[#3D5A40] font-bold">+18.4% YoY</span>
            </div>
            <MicroSparkline color="#3D5A40" dataKey="sanctioned" height={28} />
          </div>
        </motion.div>

        {/* Card 4: Human Verification Backlog */}
        <motion.div 
          variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
          whileHover={{ y: -3, transition: { duration: 0.2 } }}
          className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#DCD7CE] shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#5A5A40] uppercase tracking-wider natural-serif">Pending Review (HITL)</span>
              <div className="p-2 rounded-xl bg-[#FDF0ED] text-[#8B0000] border border-[#F2C2BA]">
                <AlertTriangle className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-bold text-[#8B0000] natural-serif">{needsReviewCount}</span>
              <span className="text-xs font-semibold text-[#8B0000] bg-[#FDF0ED] px-2 py-0.5 rounded-full border border-[#F2C2BA]">
                Action Required
              </span>
            </div>
            <p className="mt-1 text-xs text-[#6B6B58]">Handwritten ink bleeds or court flags</p>
          </div>
          <div className="mt-2.5 pt-2 border-t border-[#DCD7CE]/60">
            <div className="flex items-center justify-between text-[10px] text-[#6B6B58] mb-1">
              <span>365-Day Flag Backlog</span>
              <span className="text-[#8B4513] font-semibold">Controlled (7.2%)</span>
            </div>
            <MicroSparkline color="#8B4513" dataKey="needsReview" height={28} />
          </div>
        </motion.div>
      </motion.div>

      {/* 365-Day Land Record Validation Trend Sparkline Chart */}
      <ValidationTrendSparkline 
        records={records} 
        onOpenReportModal={() => setIsReportModalOpen(true)} 
      />

      {/* Main Content Grid: Ingested Records Queue + State-wise Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Ingestion & Verification Queue */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-[#FAF8F5] rounded-xl border border-[#DCD7CE] p-5 shadow-2xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#DCD7CE]">
              <div>
                <h3 className="text-base font-bold text-[#33332A] natural-serif">Land Record Ingestion Queue</h3>
                <p className="text-xs text-[#6B6B58]">Real-time status of digitized parcels, OCR confidence, and validation outcome</p>
              </div>

              {/* Search & State Filter & Export Action */}
              <div className="flex items-center gap-2 flex-wrap">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-[#6B6B58] absolute left-2.5 top-2.5" />
                  <input
                    id="input-search-records"
                    type="text"
                    placeholder="Search Khasra, Owner, Village..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8 pr-3 py-1.5 text-xs rounded-lg border border-[#DCD7CE] bg-[#F5F3EE] text-[#33332A] focus:bg-[#FAF8F5] focus:outline-hidden focus:ring-1 focus:ring-[#5A5A40] w-44 sm:w-52"
                  />
                </div>
                <select
                  aria-label="Filter records by state"
                  value={selectedStateFilter}
                  onChange={(e) => setSelectedStateFilter(e.target.value)}
                  className="text-xs rounded-lg border border-[#DCD7CE] bg-[#F5F3EE] px-2 py-1.5 text-[#33332A] cursor-pointer"
                >
                  <option value="ALL">All States ({records.length})</option>
                  {Array.from(new Set(records.map((r) => r.state.value))).sort().map((st) => (
                    <option key={st} value={st}>
                      {st} ({records.filter((r) => r.state.value === st).length})
                    </option>
                  ))}
                </select>

                <button
                  id="btn-export-validation-summary-pdf"
                  onClick={() => setIsReportModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#EBE7DF] hover:bg-[#DCD7CE] text-[#33332A] border border-[#C4BDAF] transition-colors cursor-pointer shadow-2xs whitespace-nowrap"
                  title="Export land record validation summary report as printable archival PDF"
                >
                  <Printer className="w-3.5 h-3.5 text-[#5A5A40]" />
                  <span>Export Archival PDF</span>
                </button>
              </div>
            </div>

            {/* Queue Batch Selection & Count Sub-bar */}
            <div className="flex items-center justify-between py-2 px-3 bg-[#EBE7DF]/70 rounded-lg text-xs mt-3 border border-[#DCD7CE]">
              <div className="flex items-center gap-2.5">
                <label className="inline-flex items-center gap-2 cursor-pointer select-none font-medium text-[#33332A]">
                  <input
                    type="checkbox"
                    id="checkbox-select-all-records"
                    checked={isAllSelected}
                    ref={(el) => {
                      if (el) el.indeterminate = isPartiallySelected;
                    }}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 rounded text-[#5A5A40] accent-[#5A5A40] cursor-pointer"
                  />
                  <span>
                    {selectedRecordIds.length > 0 ? (
                      <span className="font-bold text-[#5A5A40]">
                        {selectedRecordIds.length} of {filteredRecords.length} selected
                      </span>
                    ) : (
                      <span>Select all records in view ({filteredRecords.length})</span>
                    )}
                  </span>
                </label>

                {selectedRecordIds.length > 0 && (
                  <button
                    onClick={clearSelection}
                    className="text-[11px] text-[#8B4513] hover:underline cursor-pointer font-medium ml-1"
                  >
                    Deselect all
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2 text-[11px] text-[#6B6B58]">
                <span>{needsReviewCount} pending review</span>
                <span>•</span>
                <span>{verifiedCount} sanctioned</span>
              </div>
            </div>

            {/* List of records */}
            <div className="divide-y divide-[#DCD7CE]/60 mt-2">
              {filteredRecords.length === 0 ? (
                <div className="text-center py-10 text-[#6B6B58] text-xs">
                  No land records found matching the current search parameters.
                </div>
              ) : (
                filteredRecords.map((record) => {
                  const isVerified = record.status === 'VERIFIED_AND_SANCTIONED';
                  const needsReview = record.status === 'NEEDS_REVIEW';
                  const isSelected = selectedRecordIds.includes(record.id);

                  return (
                    <div
                      key={record.id}
                      onClick={() => onSelectRecord(record)}
                      className={`py-3.5 px-2 rounded-lg transition-all cursor-pointer flex items-center justify-between gap-3 group ${
                        isSelected 
                          ? 'bg-[#FFF9EA] ring-1 ring-[#C4BDAF] shadow-2xs' 
                          : 'hover:bg-[#EBE7DF]/60'
                      }`}
                    >
                      <div className="flex items-start gap-2.5 min-w-0">
                        {/* Checkbox for Bulk Selection */}
                        <div 
                          className="pt-1.5 pr-0.5 cursor-pointer text-[#5A5A40] shrink-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleRecordSelection(record.id);
                          }}
                          title={isSelected ? 'Deselect record' : 'Select record for bulk action'}
                        >
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => {}} // handled by click container
                            className="w-4 h-4 rounded text-[#5A5A40] accent-[#5A5A40] cursor-pointer"
                            aria-label={`Select land record ${record.khasraNumber.value}`}
                          />
                        </div>

                        <div className={`p-2 rounded-lg shrink-0 mt-0.5 ${
                          isVerified 
                            ? 'bg-[#EAF2EB] text-[#3D5A40] border border-[#BCD4C0]' 
                            : 'bg-[#FFF9EA] text-[#8B4513] border border-[#DCD7CE]'
                        }`}>
                          <FileText className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm font-bold text-[#33332A] group-hover:text-[#8B4513] transition-colors natural-serif">
                              {record.khasraNumber.value} • {record.village.value}
                            </span>
                            <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-[#EBE7DF] text-[#4A3728]">
                              {record.state.value}
                            </span>
                            <span className="text-[11px] text-[#6B6B58] font-mono">
                              {record.documentNumber}
                            </span>
                          </div>

                          <div className="flex items-center gap-3 text-xs text-[#5A5A40] mt-1 flex-wrap">
                            <span className="font-medium text-[#33332A]">
                              <span className="natural-serif font-semibold text-[#5A5A40]">Owner:</span> {record.primaryOwnerName.value}
                            </span>
                            <span>•</span>
                            <span><span className="natural-serif font-semibold text-[#5A5A40]">Area:</span> {record.totalAreaDeclared.value} {record.declaredUnit.value.toLowerCase()}</span>
                            <span>•</span>
                            <span><span className="natural-serif font-semibold text-[#5A5A40]">Script:</span> {record.script}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <div className="text-right hidden sm:block">
                          <div className="text-xs font-bold text-[#33332A] flex items-center justify-end gap-1">
                            <span>{record.overallConfidence}%</span>
                            <span className="text-[10px] text-[#6B6B58] font-normal natural-serif">conf.</span>
                          </div>
                          <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full mt-0.5 ${
                            isVerified 
                              ? 'bg-[#EAF2EB] text-[#3D5A40] border border-[#BCD4C0]' 
                              : 'bg-[#FFF9EA] text-[#8B4513] border border-[#DCD7CE]'
                          }`}>
                            {isVerified ? 'Sanctioned' : 'Needs Review'}
                          </span>
                        </div>

                        <ChevronRight className="w-4 h-4 text-[#6B6B58] group-hover:text-[#8B4513] group-hover:translate-x-0.5 transition-all" />
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* DILRMP Modernization Workflow Architecture in Natural Tones */}
          <div className="bg-[#43432F] text-[#FAF8F5] rounded-xl p-5 border border-[#52523C]">
            <h4 className="text-sm font-bold text-[#FFF9EA] mb-3 flex items-center gap-2 natural-serif">
              <Layers className="w-4 h-4 text-[#E5C37A]" />
              10-Stage Modernization Workflow Architecture
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
              <div className="bg-[#363625]/90 p-2.5 rounded-lg border border-[#52523C]">
                <span className="block font-bold text-[#E5C37A] mb-0.5 natural-serif">01. Ingestion</span>
                <span className="text-[#D7D2C5] text-[11px]">Scanned PDF/Img Upload</span>
              </div>
              <div className="bg-[#363625]/90 p-2.5 rounded-lg border border-[#52523C]">
                <span className="block font-bold text-[#E5C37A] mb-0.5 natural-serif">02. OpenCV CV</span>
                <span className="text-[#D7D2C5] text-[11px]">Deskew &amp; Sauvola Filter</span>
              </div>
              <div className="bg-[#363625]/90 p-2.5 rounded-lg border border-[#52523C]">
                <span className="block font-bold text-[#E5C37A] mb-0.5 natural-serif">03. Indic OCR</span>
                <span className="text-[#D7D2C5] text-[11px]">Gemini 3.8 Flash Engine</span>
              </div>
              <div className="bg-[#363625]/90 p-2.5 rounded-lg border border-[#52523C]">
                <span className="block font-bold text-[#E5C37A] mb-0.5 natural-serif">04. Validation</span>
                <span className="text-[#D7D2C5] text-[11px]">Sum &amp; Master Cross-DB</span>
              </div>
              <div className="bg-[#363625]/90 p-2.5 rounded-lg border border-[#52523C]">
                <span className="block font-bold text-[#A6CCA0] mb-0.5 natural-serif">05. LRMS Sync</span>
                <span className="text-[#D7D2C5] text-[11px]">DILRMP XML &amp; GIS Map</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right 1 Col: State-wise Progress Leaderboard */}
        <div className="space-y-4">
          <div className="bg-[#FAF8F5] rounded-xl border border-[#DCD7CE] p-5 shadow-2xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-[#33332A] natural-serif">National Digitization Progress</h3>
                <p className="text-xs text-[#6B6B58]">State-wise verified coverage</p>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-[#EBE7DF] text-[#4A3728] border border-[#DCD7CE] natural-serif">
                DILRMP 2026
              </span>
            </div>

            <div className="space-y-3.5">
              {STATE_DIGITIZATION_DATA.map((state) => (
                <div key={state.stateName} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#33332A] natural-serif">{state.stateName}</span>
                    <span className="font-bold text-[#33332A]">{state.verifiedPercentage}%</span>
                  </div>
                  
                  {/* Progress bar with Natural Tones and smooth entrance animation */}
                  <div className="w-full bg-[#EBE7DF] h-2 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${state.verifiedPercentage}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className={`h-full rounded-full ${
                        state.verifiedPercentage >= 95 
                          ? 'bg-[#3D5A40]' 
                          : state.verifiedPercentage >= 90 
                          ? 'bg-[#5A5A40]' 
                          : 'bg-[#8B4513]'
                      }`}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-[#6B6B58]">
                    <span>{state.digitizedVillages.toLocaleString()} / {state.totalVillages.toLocaleString()} villages</span>
                    <span><span className="natural-serif font-medium">Avg OCR:</span> {state.averageOcrConfidence}%</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 pt-4 border-t border-[#DCD7CE] flex items-center justify-between text-xs">
              <span className="text-[#6B6B58] natural-serif font-medium">Cadastral Maps Georeferenced:</span>
              <span className="font-bold text-[#3D5A40]">286,220 (91.8%)</span>
            </div>
          </div>

          {/* Quick Guidance Box */}
          <div className="bg-[#FFF9EA] border border-[#DCD7CE] rounded-xl p-4 text-xs text-[#4A3728] space-y-2 shadow-2xs">
            <div className="font-bold flex items-center gap-1.5 text-[#33332A] natural-serif">
              <Sparkles className="w-3.5 h-3.5 text-[#8B4513]" />
              <span>Multi-Script HWR Ready</span>
            </div>
            <p className="text-[#4A3728] leading-relaxed">
              The AI model dynamically recognizes Modi script, old Kaithi land records, Perso-Arabic Urdu patta entries, and standard modern Devanagari/Gurmukhi.
            </p>
          </div>
        </div>
      </div>

      {/* Floating Bulk Action Toolbar with Spring Animation */}
      <AnimatePresence>
        {selectedRecordIds.length > 0 && (
          <motion.div 
            id="bulk-action-toolbar"
            initial={{ y: 80, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 80, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[96%] max-w-4xl bg-[#363625] text-[#FAF8F5] p-3 sm:p-4 rounded-2xl shadow-2xl border border-[#5A5A40] flex flex-wrap items-center justify-between gap-3"
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#5A5A40] text-[#FFF9EA] font-mono text-xs font-bold border border-[#707052] shadow-2xs">
                <CheckSquare className="w-3.5 h-3.5 text-[#A6CCA0]" />
                <span>{selectedRecordIds.length} Selected</span>
              </div>

              <div className="text-xs text-[#D7D2C5] hidden md:inline">
                Simultaneous validation update
              </div>

              <button
                id="btn-bulk-clear-selection"
                onClick={clearSelection}
                className="text-xs text-[#D7D2C5] hover:text-[#FFF9EA] underline cursor-pointer transition-colors"
              >
                Clear
              </button>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {/* Sanction & Verify All */}
              <motion.button
                id="btn-bulk-sanction"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleOpenConfirmModal('VERIFIED_AND_SANCTIONED')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#82B37A] hover:bg-[#6FA366] text-[#1E301B] font-bold text-xs shadow-xs transition-colors cursor-pointer"
                title="Bulk sanction & verify selected records"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Sanction All</span>
              </motion.button>

              {/* Flag for Review */}
              <motion.button
                id="btn-bulk-needs-review"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleOpenConfirmModal('NEEDS_REVIEW')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FFF9EA] hover:bg-[#F5ECD2] text-[#8B4513] font-bold text-xs border border-[#DCD7CE] shadow-xs transition-colors cursor-pointer"
                title="Flag selected records for revenue officer review"
              >
                <AlertTriangle className="w-4 h-4 text-[#8B4513]" />
                <span>Flag Review</span>
              </motion.button>

              {/* Partially Verify */}
              <motion.button
                id="btn-bulk-partially-verified"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleOpenConfirmModal('PARTIALLY_VERIFIED')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#5A5A40] hover:bg-[#4E4E37] text-[#FAF8F5] font-semibold text-xs border border-[#707052] transition-colors cursor-pointer"
                title="Mark selected records as partially verified"
              >
                <Clock className="w-4 h-4 text-[#E5C37A]" />
                <span className="hidden sm:inline">Partial</span>
              </motion.button>

              {/* Reject */}
              <motion.button
                id="btn-bulk-reject"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleOpenConfirmModal('REJECTED')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FDF0ED] hover:bg-[#FADBD5] text-[#8B0000] font-bold text-xs border border-[#F2C2BA] transition-colors cursor-pointer"
                title="Reject or invalidate selected records"
              >
                <XCircle className="w-4 h-4" />
                <span>Reject</span>
              </motion.button>

              {/* Export Selected PDF */}
              <motion.button
                id="btn-bulk-export-pdf"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setIsReportModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#43432F] hover:bg-[#2E2E1F] text-[#FFF9EA] font-semibold text-xs border border-[#52523C] transition-colors cursor-pointer"
                title="Export validation summary PDF for selected records"
              >
                <Printer className="w-3.5 h-3.5 text-[#E5C37A]" />
                <span className="hidden lg:inline">PDF Report</span>
              </motion.button>

              <button
                onClick={clearSelection}
                className="p-1.5 text-[#D7D2C5] hover:text-white rounded-lg hover:bg-[#43432F] transition-colors cursor-pointer ml-1"
                title="Close toolbar"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Statutory Bulk Update Confirmation Modal */}
      <AnimatePresence>
        {confirmModalStatus && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2C2C20]/70 backdrop-blur-xs"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="bg-[#FAF8F5] border border-[#DCD7CE] rounded-2xl max-w-lg w-full p-6 shadow-2xl text-[#33332A] space-y-4"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <div className={`p-2 rounded-xl ${
                    confirmModalStatus === 'VERIFIED_AND_SANCTIONED'
                      ? 'bg-[#EAF2EB] text-[#3D5A40] border border-[#BCD4C0]'
                      : confirmModalStatus === 'NEEDS_REVIEW'
                      ? 'bg-[#FFF9EA] text-[#8B4513] border border-[#DCD7CE]'
                      : confirmModalStatus === 'REJECTED'
                      ? 'bg-[#FDF0ED] text-[#8B0000] border border-[#F2C2BA]'
                      : 'bg-[#EBE7DF] text-[#4A3728] border border-[#DCD7CE]'
                  }`}>
                    {confirmModalStatus === 'VERIFIED_AND_SANCTIONED' && <CheckCircle2 className="w-5 h-5" />}
                    {confirmModalStatus === 'NEEDS_REVIEW' && <AlertTriangle className="w-5 h-5" />}
                    {confirmModalStatus === 'REJECTED' && <XCircle className="w-5 h-5" />}
                    {confirmModalStatus === 'PARTIALLY_VERIFIED' && <Clock className="w-5 h-5" />}
                  </div>
                  <div>
                    <h3 className="text-base font-bold natural-serif text-[#33332A]">
                      Confirm Bulk Status Update
                    </h3>
                    <p className="text-xs text-[#6B6B58]">
                      DILRMP Statutory Revenue Action
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setConfirmModalStatus(null)}
                  className="p-1 rounded-lg text-[#6B6B58] hover:bg-[#EBE7DF] transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="bg-[#F5F3EE] p-3.5 rounded-xl border border-[#DCD7CE] text-xs space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[#6B6B58] natural-serif">Target Status:</span>
                  <span className={`font-bold px-2 py-0.5 rounded-full ${
                    confirmModalStatus === 'VERIFIED_AND_SANCTIONED'
                      ? 'bg-[#EAF2EB] text-[#3D5A40] border border-[#BCD4C0]'
                      : confirmModalStatus === 'NEEDS_REVIEW'
                      ? 'bg-[#FFF9EA] text-[#8B4513] border border-[#DCD7CE]'
                      : confirmModalStatus === 'REJECTED'
                      ? 'bg-[#FDF0ED] text-[#8B0000] border border-[#F2C2BA]'
                      : 'bg-[#EBE7DF] text-[#4A3728]'
                  }`}>
                    {confirmModalStatus === 'VERIFIED_AND_SANCTIONED'
                      ? 'Verified & Sanctioned'
                      : confirmModalStatus.replace(/_/g, ' ')}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#6B6B58] natural-serif">Selected Parcels:</span>
                  <span className="font-bold text-[#33332A]">{selectedRecordIds.length} land records</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#6B6B58] natural-serif">Authorized Officer:</span>
                  <span className="font-medium text-[#33332A]">{currentUser?.name || 'Revenue Officer'}</span>
                </div>
              </div>

              {/* Affected Records Preview */}
              <div className="space-y-1.5">
                <span className="text-xs font-semibold text-[#5A5A40] natural-serif">Selected Records Preview:</span>
                <div className="max-h-28 overflow-y-auto space-y-1 pr-1">
                  {records
                    .filter(r => selectedRecordIds.includes(r.id))
                    .map(r => (
                      <div key={r.id} className="text-[11px] bg-[#FAF8F5] p-2 rounded-lg border border-[#DCD7CE] flex items-center justify-between">
                        <span className="font-bold text-[#33332A]">{r.khasraNumber.value} • {r.village.value}</span>
                        <span className="text-[#6B6B58]">{r.primaryOwnerName.value} ({r.state.value})</span>
                      </div>
                    ))}
                </div>
              </div>

              {/* Officer Remarks / Reason */}
              <div className="space-y-1.5">
                <label htmlFor="input-officer-remark" className="block text-xs font-semibold text-[#5A5A40] natural-serif">
                  Revenue Order / Verification Remarks (Optional):
                </label>
                <input
                  id="input-officer-remark"
                  type="text"
                  value={officerRemark}
                  onChange={(e) => setOfficerRemark(e.target.value)}
                  placeholder="e.g., Sanctioned under SDM Order 2026/09/A-11 after field survey verification"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#DCD7CE] bg-[#FAF8F5] text-[#33332A] focus:outline-hidden focus:ring-1 focus:ring-[#5A5A40]"
                />
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-[#DCD7CE]">
                <button
                  type="button"
                  onClick={() => setConfirmModalStatus(null)}
                  className="px-4 py-2 text-xs font-semibold rounded-xl text-[#5A5A40] hover:bg-[#EBE7DF] transition-colors cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  id="btn-confirm-bulk-status-apply"
                  onClick={() => handleApplyBulkStatus(confirmModalStatus)}
                  className={`px-4 py-2 text-xs font-bold rounded-xl shadow-sm transition-colors cursor-pointer text-white ${
                    confirmModalStatus === 'VERIFIED_AND_SANCTIONED'
                      ? 'bg-[#3D5A40] hover:bg-[#2F4732]'
                      : confirmModalStatus === 'NEEDS_REVIEW'
                      ? 'bg-[#8B4513] hover:bg-[#70380F]'
                      : confirmModalStatus === 'REJECTED'
                      ? 'bg-[#A82828] hover:bg-[#8B1E1E]'
                      : 'bg-[#5A5A40] hover:bg-[#43432F]'
                  }`}
                >
                  Confirm Update ({selectedRecordIds.length})
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Statutory Toast Notification with Animation */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            id="toast-bulk-action"
            initial={{ opacity: 0, y: -20, x: 20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: -20, x: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="fixed top-20 right-6 z-50 bg-[#363625] text-[#FAF8F5] border border-[#5A5A40] px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 text-xs max-w-md"
          >
            <CheckCircle2 className="w-4 h-4 text-[#82B37A] shrink-0" />
            <span className="font-medium text-[#FFF9EA]">{toastMessage}</span>
            <button 
              onClick={() => setToastMessage(null)} 
              className="text-[#D7D2C5] hover:text-white p-1 ml-auto cursor-pointer"
              title="Dismiss notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Archival PDF Report Export Modal */}
      <ArchivalPdfReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        records={records}
        currentUser={currentUser}
        selectedRecordIds={selectedRecordIds}
      />
    </div>
  );
};
