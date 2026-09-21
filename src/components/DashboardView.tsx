import React, { useState, useMemo } from 'react';
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
  RotateCcw,
  Table,
  LayoutGrid,
  Landmark,
  ChevronLeft,
  ChevronsLeft,
  ChevronsRight,
  Eye,
  SlidersHorizontal,
  Maximize2,
  Minimize2,
  ArrowUpDown,
  FileSpreadsheet,
  ChevronDown
} from 'lucide-react';
import { ExtractedLandRecord, StateDigitizationProgress, AuthUser, VerificationStatus, RecordModificationEntry, IndicLanguage } from '../types';
import { STATE_DIGITIZATION_DATA } from '../data/sampleRecords';
import { getStateLandFormat, STATE_LAND_FORMATS } from '../data/stateLandFormats';
import { exportLandRecordsToExcel, exportLandRecordsToCSV } from '../utils/excelExport';
import { ArchivalPdfReportModal } from './ArchivalPdfReportModal';
import { ValidationTrendSparkline, MicroSparkline } from './ValidationTrendSparkline';
import { StateFormatsDirectoryModal } from './StateFormatsDirectoryModal';
import { LandRecordLedgerTable } from './LandRecordLedgerTable';
import { LandRecordCardGrid } from './LandRecordCardGrid';
import { getTranslations } from '../utils/translations';

interface DashboardViewProps {
  records: ExtractedLandRecord[];
  onSelectRecord: (record: ExtractedLandRecord) => void;
  onNavigateToIngestion: () => void;
  onNavigateToVerification: () => void;
  onUpdateRecords?: (updatedRecords: ExtractedLandRecord[]) => void;
  currentUser?: AuthUser | null;
  selectedLanguage?: IndicLanguage;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  records,
  onSelectRecord,
  onNavigateToIngestion,
  onNavigateToVerification,
  onUpdateRecords,
  currentUser,
  selectedLanguage
}) => {
  const currentLang: IndicLanguage = selectedLanguage || 'english';
  const t = getTranslations(currentLang);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStateFilter, setSelectedStateFilter] = useState<string>('ALL');
  const [selectedFormatFilter, setSelectedFormatFilter] = useState<string>('ALL');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'RECENT' | 'CONF_DESC' | 'CONF_ASC' | 'AREA_DESC' | 'KHASRA'>('RECENT');
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(15);
  const [isFullWidthLedger, setIsFullWidthLedger] = useState<boolean>(false);
  const [isFormatsDirectoryOpen, setIsFormatsDirectoryOpen] = useState<boolean>(false);
  const [isExcelMenuOpen, setIsExcelMenuOpen] = useState<boolean>(false);

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

  // Extract available unique state formats for filter dropdown
  const availableFormats = useMemo(() => {
    const set = new Set<string>();
    records.forEach(r => {
      const fmt = getStateLandFormat(r.state.value, r.documentType);
      set.add(fmt.formatShort);
    });
    return Array.from(set).sort();
  }, [records]);

  // Master filtered and sorted records
  const filteredRecords = useMemo(() => {
    let result = records.filter(record => {
      const format = getStateLandFormat(record.state.value, record.documentType);
      const query = searchQuery.toLowerCase().trim();

      const matchesSearch = !query ||
        record.khasraNumber.value.toLowerCase().includes(query) ||
        record.khataNumber.value.toLowerCase().includes(query) ||
        record.village.value.toLowerCase().includes(query) ||
        record.tehsil.value.toLowerCase().includes(query) ||
        record.district.value.toLowerCase().includes(query) ||
        record.state.value.toLowerCase().includes(query) ||
        record.primaryOwnerName.value.toLowerCase().includes(query) ||
        record.documentNumber.toLowerCase().includes(query) ||
        format.formatTitle.toLowerCase().includes(query) ||
        format.formatShort.toLowerCase().includes(query) ||
        format.formCode.toLowerCase().includes(query) ||
        format.portalName.toLowerCase().includes(query);

      const matchesState = selectedStateFilter === 'ALL' || record.state.value.toLowerCase() === selectedStateFilter.toLowerCase();

      const matchesFormat = selectedFormatFilter === 'ALL' || 
        format.formatShort.toLowerCase() === selectedFormatFilter.toLowerCase() ||
        format.state.toLowerCase() === selectedFormatFilter.toLowerCase();

      const matchesStatus = selectedStatusFilter === 'ALL' || record.status === selectedStatusFilter;

      return matchesSearch && matchesState && matchesFormat && matchesStatus;
    });

    // Sorting
    result = [...result].sort((a, b) => {
      if (sortBy === 'CONF_DESC') return b.overallConfidence - a.overallConfidence;
      if (sortBy === 'CONF_ASC') return a.overallConfidence - b.overallConfidence;
      if (sortBy === 'AREA_DESC') {
        const aArea = a.normalizedAreaSqMeters || a.totalAreaDeclared.value;
        const bArea = b.normalizedAreaSqMeters || b.totalAreaDeclared.value;
        return bArea - aArea;
      }
      if (sortBy === 'KHASRA') {
        return a.khasraNumber.value.localeCompare(b.khasraNumber.value, undefined, { numeric: true });
      }
      // Default: RECENT
      return new Date(b.uploadedAt || 0).getTime() - new Date(a.uploadedAt || 0).getTime();
    });

    return result;
  }, [records, searchQuery, selectedStateFilter, selectedFormatFilter, selectedStatusFilter, sortBy]);

  // Pagination calculation
  const totalFilteredCount = filteredRecords.length;
  const effectivePerPage = itemsPerPage === -1 ? totalFilteredCount || 1 : itemsPerPage;
  const totalPages = Math.max(1, Math.ceil(totalFilteredCount / effectivePerPage));
  const safePage = Math.min(Math.max(1, currentPage), totalPages);

  const paginatedRecords = useMemo(() => {
    if (itemsPerPage === -1) return filteredRecords;
    const start = (safePage - 1) * effectivePerPage;
    return filteredRecords.slice(start, start + effectivePerPage);
  }, [filteredRecords, safePage, effectivePerPage, itemsPerPage]);

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

  const handleExport = (format: 'xlsx' | 'csv') => {
    setIsExcelMenuOpen(false);
    const recordsToExport = selectedRecordIds.length > 0
      ? filteredRecords.filter(r => selectedRecordIds.includes(r.id))
      : filteredRecords;

    if (recordsToExport.length === 0) {
      setToastMessage('No land records found to export under current filters.');
      setTimeout(() => setToastMessage(null), 3500);
      return;
    }

    try {
      if (format === 'xlsx') {
        const filename = exportLandRecordsToExcel(recordsToExport, {
          officer: currentUser,
          stateFilter: selectedStateFilter,
          formatFilter: selectedFormatFilter,
          statusFilter: selectedStatusFilter,
          searchQuery: searchQuery,
        });
        setToastMessage(`Downloaded ${recordsToExport.length} land records as Excel audit workbook (${filename})`);
      } else {
        const filename = exportLandRecordsToCSV(recordsToExport);
        setToastMessage(`Downloaded ${recordsToExport.length} land records as CSV (${filename})`);
      }
    } catch (err) {
      console.error('Audit export error:', err);
      setToastMessage('Failed to generate export file. Please try again.');
    }
    setTimeout(() => setToastMessage(null), 4500);
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
      <div className={`grid grid-cols-1 ${isFullWidthLedger ? 'lg:grid-cols-1' : 'lg:grid-cols-3'} gap-6`}>
        {/* Left Cols: Ingestion & Verification Queue */}
        <div className={`${isFullWidthLedger ? 'lg:col-span-1' : 'lg:col-span-2'} space-y-4`}>
          <div className="bg-[#FAF8F5] rounded-xl border border-[#DCD7CE] p-4 sm:p-5 shadow-2xs">
            <div className="flex flex-col gap-3 pb-4 border-b border-[#DCD7CE]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-[#33332A] natural-serif">Land Record Ingestion Queue</h3>
                    <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-[#EBE7DF] text-[#4A3728] border border-[#DCD7CE]">
                      {filteredRecords.length} of {records.length} Parcels
                    </span>
                  </div>
                  <p className="text-xs text-[#6B6B58] mt-0.5">
                    Multi-state registry with statutory formats, OCR confidence, area metrics, and HITL verification
                  </p>
                </div>

                {/* View Mode & Action Controls */}
                <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
                  {/* Table vs Cards Toggle */}
                  <div className="inline-flex rounded-lg border border-[#DCD7CE] bg-[#F5F3EE] p-0.5">
                    <button
                      onClick={() => setViewMode('table')}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                        viewMode === 'table'
                          ? 'bg-[#FAF8F5] text-[#33332A] shadow-2xs font-bold'
                          : 'text-[#6B6B58] hover:text-[#33332A]'
                      }`}
                      title="Ledger Table View"
                    >
                      <Table className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Ledger Table</span>
                    </button>
                    <button
                      onClick={() => setViewMode('cards')}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                        viewMode === 'cards'
                          ? 'bg-[#FAF8F5] text-[#33332A] shadow-2xs font-bold'
                          : 'text-[#6B6B58] hover:text-[#33332A]'
                      }`}
                      title="Card Grid View"
                    >
                      <LayoutGrid className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Cards</span>
                    </button>
                  </div>

                  {/* Full Width Toggle */}
                  <button
                    onClick={() => setIsFullWidthLedger(!isFullWidthLedger)}
                    className="p-1.5 rounded-lg border border-[#DCD7CE] bg-[#F5F3EE] hover:bg-[#EBE7DF] text-[#5A5A40] transition-colors cursor-pointer hidden md:flex items-center gap-1 text-xs font-medium"
                    title={isFullWidthLedger ? 'Exit Full-Width View' : 'Maximize Ledger to Full-Width'}
                  >
                    {isFullWidthLedger ? (
                      <>
                        <Minimize2 className="w-3.5 h-3.5" />
                        <span className="text-[11px]">Split</span>
                      </>
                    ) : (
                      <>
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span className="text-[11px]">Expand</span>
                      </>
                    )}
                  </button>

                  {/* State Formats Guide Directory Button */}
                  <button
                    id="btn-open-state-formats-directory"
                    onClick={() => setIsFormatsDirectoryOpen(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#FAF8F5] hover:bg-[#EBE7DF] text-[#8B4513] border border-[#DCD7CE] transition-colors cursor-pointer shadow-2xs"
                    title="Explore state-wise land record formats, portal links, and statutory revenue acts"
                  >
                    <Landmark className="w-3.5 h-3.5 text-[#8B4513]" />
                    <span className="font-bold">State Formats Guide</span>
                  </button>

                  {/* Export to Excel (.xlsx / .csv) Dropdown */}
                  <div className="relative">
                    <button
                      id="btn-export-to-excel"
                      onClick={() => setIsExcelMenuOpen(!isExcelMenuOpen)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#EAF2EB] hover:bg-[#D8E6DA] text-[#2F4732] border border-[#BCD4C0] transition-colors cursor-pointer shadow-2xs whitespace-nowrap"
                      title="Export currently filtered land records to Excel (.xlsx) or CSV for offline statutory auditing"
                    >
                      <FileSpreadsheet className="w-3.5 h-3.5 text-[#3D5A40]" />
                      <span className="font-bold">
                        Export to Excel{' '}
                        <span className="opacity-80 font-normal">
                          {selectedRecordIds.length > 0
                            ? `(${selectedRecordIds.length} selected)`
                            : `(${filteredRecords.length})`}
                        </span>
                      </span>
                      <ChevronDown className="w-3 h-3 text-[#3D5A40] transition-transform duration-200" style={{ transform: isExcelMenuOpen ? 'rotate(180deg)' : 'none' }} />
                    </button>

                    <AnimatePresence>
                      {isExcelMenuOpen && (
                        <>
                          {/* Transparent click-away backdrop */}
                          <div 
                            className="fixed inset-0 z-40" 
                            onClick={() => setIsExcelMenuOpen(false)} 
                          />
                          <motion.div
                            id="menu-export-excel-dropdown"
                            initial={{ opacity: 0, y: 6, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 4, scale: 0.97 }}
                            transition={{ duration: 0.15 }}
                            className="absolute right-0 mt-1.5 w-72 bg-[#FAF8F5] rounded-xl border border-[#DCD7CE] shadow-2xl p-1.5 z-50 text-xs"
                          >
                            <div className="px-3 py-2 border-b border-[#DCD7CE]/60 text-[11px] text-[#6B6B58] bg-[#F5F3EE]/70 rounded-t-lg">
                              <span className="font-bold text-[#33332A] natural-serif block text-xs">
                                Offline Cadastral Audit Export
                              </span>
                              <span className="text-[11px] text-[#5A5A40]">
                                {selectedRecordIds.length > 0
                                  ? `Exporting ${selectedRecordIds.length} selected record(s)`
                                  : `Exporting ${filteredRecords.length} filtered record(s)`}
                              </span>
                            </div>

                            <div className="py-1 space-y-1">
                              <button
                                id="btn-download-xlsx"
                                onClick={() => handleExport('xlsx')}
                                className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-[#EAF2EB] text-[#33332A] flex items-center justify-between group transition-colors cursor-pointer"
                              >
                                <div className="flex items-center gap-2.5">
                                  <div className="w-7 h-7 rounded-md bg-[#EAF2EB] border border-[#BCD4C0] flex items-center justify-center text-[#3D5A40] group-hover:bg-[#3D5A40] group-hover:text-white transition-colors">
                                    <FileSpreadsheet className="w-4 h-4" />
                                  </div>
                                  <div>
                                    <p className="font-bold text-[#2F4732]">Excel Workbook (.xlsx)</p>
                                    <p className="text-[10px] text-[#6B6B58]">Multi-sheet: Audit Ledger + Summary</p>
                                  </div>
                                </div>
                                <Download className="w-3.5 h-3.5 text-[#6B6B58] group-hover:text-[#3D5A40]" />
                              </button>

                              <button
                                id="btn-download-csv"
                                onClick={() => handleExport('csv')}
                                className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-[#FFF9EA] text-[#33332A] flex items-center justify-between group transition-colors cursor-pointer"
                              >
                                <div className="flex items-center gap-2.5">
                                  <div className="w-7 h-7 rounded-md bg-[#FFF9EA] border border-[#DCD7CE] flex items-center justify-center text-[#8B4513] group-hover:bg-[#8B4513] group-hover:text-white transition-colors">
                                    <FileText className="w-4 h-4" />
                                  </div>
                                  <div>
                                    <p className="font-bold text-[#4A3728]">CSV Audit Table (.csv)</p>
                                    <p className="text-[10px] text-[#6B6B58]">UTF-8 with BOM (Indic scripts safe)</p>
                                  </div>
                                </div>
                                <Download className="w-3.5 h-3.5 text-[#6B6B58] group-hover:text-[#8B4513]" />
                              </button>
                            </div>

                            <div className="px-3 py-1.5 border-t border-[#DCD7CE]/60 text-[10px] text-[#8B4513] bg-[#FFF9EA]/50 rounded-b-lg flex items-center gap-1.5">
                              <ShieldCheck className="w-3 h-3 text-[#8B4513] shrink-0" />
                              <span>Includes DILRMP metadata and audit chain</span>
                            </div>
                          </motion.div>
                        </>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Export Archival PDF */}
                  <button
                    id="btn-export-validation-summary-pdf"
                    onClick={() => setIsReportModalOpen(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#EBE7DF] hover:bg-[#DCD7CE] text-[#33332A] border border-[#C4BDAF] transition-colors cursor-pointer shadow-2xs whitespace-nowrap"
                    title="Export land record validation summary report as printable archival PDF"
                  >
                    <Printer className="w-3.5 h-3.5 text-[#5A5A40]" />
                    <span className="hidden sm:inline">Export Archival PDF</span>
                  </button>
                </div>
              </div>

              {/* Comprehensive Search & Filter Row */}
              <div className="flex items-center gap-2 flex-wrap pt-1">
                {/* Keyword Search */}
                <div className="relative flex-1 min-w-[180px]">
                  <Search className="w-3.5 h-3.5 text-[#6B6B58] absolute left-2.5 top-2.5" />
                  <input
                    id="input-search-records"
                    type="text"
                    placeholder="Search by Khasra, Khata, Village, Owner, State, or Format..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full pl-8 pr-6 py-1.5 text-xs rounded-lg border border-[#DCD7CE] bg-[#F5F3EE] text-[#33332A] focus:bg-[#FAF8F5] focus:outline-hidden focus:ring-1 focus:ring-[#5A5A40]"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-2 text-[#6B6B58] hover:text-[#33332A] text-xs cursor-pointer font-bold"
                    >
                      ×
                    </button>
                  )}
                </div>

                {/* State Filter */}
                <select
                  aria-label="Filter records by state"
                  value={selectedStateFilter}
                  onChange={(e) => {
                    setSelectedStateFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="text-xs rounded-lg border border-[#DCD7CE] bg-[#F5F3EE] px-2.5 py-1.5 text-[#33332A] cursor-pointer font-medium"
                >
                  <option value="ALL">All States ({records.length})</option>
                  {Array.from(new Set(records.map((r) => r.state.value))).sort().map((st) => (
                    <option key={st} value={st}>
                      {st} ({records.filter((r) => r.state.value === st).length})
                    </option>
                  ))}
                </select>

                {/* State Land Format Filter */}
                <select
                  aria-label="Filter records by statutory land format"
                  value={selectedFormatFilter}
                  onChange={(e) => {
                    setSelectedFormatFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="text-xs rounded-lg border border-[#DCD7CE] bg-[#F5F3EE] px-2.5 py-1.5 text-[#33332A] cursor-pointer font-medium"
                >
                  <option value="ALL">All Formats ({availableFormats.length})</option>
                  {availableFormats.map((fmt) => (
                    <option key={fmt} value={fmt}>
                      {fmt}
                    </option>
                  ))}
                </select>

                {/* Verification Status Filter */}
                <select
                  aria-label="Filter records by verification status"
                  value={selectedStatusFilter}
                  onChange={(e) => {
                    setSelectedStatusFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="text-xs rounded-lg border border-[#DCD7CE] bg-[#F5F3EE] px-2.5 py-1.5 text-[#33332A] cursor-pointer font-medium"
                >
                  <option value="ALL">All Statuses</option>
                  <option value="NEEDS_REVIEW">Needs Review ({needsReviewCount})</option>
                  <option value="VERIFIED_AND_SANCTIONED">Sanctioned ({verifiedCount})</option>
                </select>

                {/* Sort dropdown */}
                <select
                  aria-label="Sort records"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="text-xs rounded-lg border border-[#DCD7CE] bg-[#F5F3EE] px-2.5 py-1.5 text-[#33332A] cursor-pointer font-medium"
                >
                  <option value="RECENT">Sort: Recently Ingested</option>
                  <option value="CONF_DESC">Sort: Highest Confidence</option>
                  <option value="CONF_ASC">Sort: Lowest Confidence</option>
                  <option value="AREA_DESC">Sort: Largest Area</option>
                  <option value="KHASRA">Sort: Khasra / Survey No.</option>
                </select>

                {/* Reset Filters button if active */}
                {(selectedStateFilter !== 'ALL' || selectedFormatFilter !== 'ALL' || selectedStatusFilter !== 'ALL' || searchQuery) && (
                  <button
                    onClick={() => {
                      setSelectedStateFilter('ALL');
                      setSelectedFormatFilter('ALL');
                      setSelectedStatusFilter('ALL');
                      setSearchQuery('');
                      setCurrentPage(1);
                    }}
                    className="inline-flex items-center gap-1 text-[11px] text-[#8B4513] hover:underline cursor-pointer font-semibold px-1 py-1"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset</span>
                  </button>
                )}
              </div>
            </div>

            {/* Queue Batch Selection & Status Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between py-2 px-3 bg-[#EBE7DF]/70 rounded-lg text-xs mt-3 border border-[#DCD7CE] gap-2">
              <div className="flex items-center gap-2.5 flex-wrap">
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
                      <span>Select all in view ({filteredRecords.length})</span>
                    )}
                  </span>
                </label>

                {selectedRecordIds.length > 0 && (
                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      onClick={clearSelection}
                      className="text-[11px] text-[#8B4513] hover:underline cursor-pointer font-medium"
                    >
                      Clear
                    </button>
                    <span className="text-[#C4BDAF]">|</span>
                    <button
                      onClick={() => handleOpenConfirmModal('VERIFIED_AND_SANCTIONED')}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold bg-[#3D5A40] text-white hover:bg-[#2F4732] transition-colors cursor-pointer shadow-2xs"
                    >
                      <ShieldCheck className="w-3 h-3" />
                      <span>Sanction Selected ({selectedRecordIds.length})</span>
                    </button>
                    <button
                      onClick={() => handleOpenConfirmModal('NEEDS_REVIEW')}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold bg-[#8B4513] text-white hover:bg-[#70380F] transition-colors cursor-pointer shadow-2xs"
                    >
                      <AlertTriangle className="w-3 h-3" />
                      <span>Flag Review ({selectedRecordIds.length})</span>
                    </button>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 text-[11px] text-[#6B6B58] self-end sm:self-auto">
                <span>{needsReviewCount} pending review</span>
                <span>•</span>
                <span>{verifiedCount} sanctioned</span>
              </div>
            </div>

            {/* List / Table of records */}
            <div className="mt-3">
              {viewMode === 'table' ? (
                <LandRecordLedgerTable
                  records={paginatedRecords}
                  selectedRecordIds={selectedRecordIds}
                  onToggleSelectRecord={toggleRecordSelection}
                  onSelectRecord={onSelectRecord}
                  onOpenDirectoryModal={() => setIsFormatsDirectoryOpen(true)}
                />
              ) : (
                <LandRecordCardGrid
                  records={paginatedRecords}
                  selectedRecordIds={selectedRecordIds}
                  onToggleSelectRecord={toggleRecordSelection}
                  onSelectRecord={onSelectRecord}
                  onOpenDirectoryModal={() => setIsFormatsDirectoryOpen(true)}
                />
              )}
            </div>

            {/* Pagination Controls */}
            {totalFilteredCount > 0 && (
              <div className="mt-4 pt-3 border-t border-[#DCD7CE] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#5A5A40]">
                <div className="flex items-center gap-2 flex-wrap">
                  <span>
                    Showing <strong className="text-[#33332A]">{itemsPerPage === -1 ? 1 : ((safePage - 1) * itemsPerPage) + 1}</strong> to{' '}
                    <strong className="text-[#33332A]">{itemsPerPage === -1 ? totalFilteredCount : Math.min(safePage * itemsPerPage, totalFilteredCount)}</strong> of{' '}
                    <strong className="text-[#33332A]">{totalFilteredCount}</strong> records
                    {totalFilteredCount !== records.length && (
                      <span className="text-[#6B6B58] ml-1"> (filtered from {records.length})</span>
                    )}
                  </span>
                  <span className="text-[#C4BDAF]">|</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#6B6B58]">Per page:</span>
                    <select
                      aria-label="Records per page"
                      value={itemsPerPage}
                      onChange={(e) => {
                        setItemsPerPage(Number(e.target.value));
                        setCurrentPage(1);
                      }}
                      className="text-xs rounded border border-[#DCD7CE] bg-[#F5F3EE] px-1.5 py-0.5 text-[#33332A] cursor-pointer font-medium"
                    >
                      <option value={10}>10</option>
                      <option value={15}>15</option>
                      <option value={25}>25</option>
                      <option value={50}>50</option>
                      <option value={-1}>All ({totalFilteredCount})</option>
                    </select>
                  </div>
                </div>

                {itemsPerPage !== -1 && totalPages > 1 && (
                  <div className="flex items-center gap-1 self-end sm:self-auto">
                    <button
                      onClick={() => setCurrentPage(1)}
                      disabled={safePage === 1}
                      className="p-1 rounded border border-[#DCD7CE] bg-[#F5F3EE] hover:bg-[#EBE7DF] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer text-[#33332A]"
                      title="First Page"
                    >
                      <ChevronsLeft className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={safePage === 1}
                      className="p-1 rounded border border-[#DCD7CE] bg-[#F5F3EE] hover:bg-[#EBE7DF] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer text-[#33332A]"
                      title="Previous Page"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center gap-1 px-1">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, idx) => {
                        let pageNum = idx + 1;
                        if (totalPages > 5 && safePage > 3) {
                          pageNum = safePage - 3 + idx;
                          if (pageNum + (4 - idx) > totalPages) {
                            pageNum = totalPages - 4 + idx;
                          }
                        }
                        if (pageNum <= 0 || pageNum > totalPages) return null;
                        const isActive = pageNum === safePage;
                        return (
                          <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`w-6 h-6 rounded text-xs font-semibold flex items-center justify-center transition-colors cursor-pointer ${
                              isActive
                                ? 'bg-[#5A5A40] text-[#FAF8F5]'
                                : 'border border-[#DCD7CE] bg-[#F5F3EE] hover:bg-[#EBE7DF] text-[#33332A]'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                    </div>

                    <button
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={safePage === totalPages}
                      className="p-1 rounded border border-[#DCD7CE] bg-[#F5F3EE] hover:bg-[#EBE7DF] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer text-[#33332A]"
                      title="Next Page"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setCurrentPage(totalPages)}
                      disabled={safePage === totalPages}
                      className="p-1 rounded border border-[#DCD7CE] bg-[#F5F3EE] hover:bg-[#EBE7DF] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer text-[#33332A]"
                      title="Last Page"
                    >
                      <ChevronsRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            )}
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

      {/* State Land Record Formats Directory Modal */}
      <StateFormatsDirectoryModal
        isOpen={isFormatsDirectoryOpen}
        onClose={() => setIsFormatsDirectoryOpen(false)}
        records={records}
        onSelectStateFilter={(stateName) => {
          setSelectedStateFilter(stateName);
          setCurrentPage(1);
        }}
      />
    </div>
  );
};
