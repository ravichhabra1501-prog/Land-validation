import React, { useState, useMemo } from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw, 
  FileText, 
  Sliders, 
  Layers, 
  AlertCircle,
  Database,
  Scale,
  Check,
  X,
  CheckSquare,
  Square,
  ListChecks,
  Play,
  Download,
  Search,
  Filter,
  ArrowRight,
  ExternalLink,
  ShieldAlert,
  Info,
  Clock,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { ExtractedLandRecord, ValidationRuleResult, RecordModificationEntry } from '../types';
import { runAutomatedValidationRules } from '../services/landRecordService';
import { getRecordModificationHistory } from '../utils/modificationHistoryUtils';

interface ValidationRulesViewProps {
  records: ExtractedLandRecord[];
  onUpdateAllRecords: (updatedRecords: ExtractedLandRecord[]) => void;
  onSelectRecord: (record: ExtractedLandRecord) => void;
}

interface BatchProgressState {
  currentRecordIndex: number;
  totalRecords: number;
  currentRecordName: string;
  currentRuleStep: string;
  percentage: number;
}

interface BatchSummaryReport {
  timestamp: string;
  processedCount: number;
  totalChecks: number;
  passedChecks: number;
  criticalCount: number;
  warningCount: number;
  flaggedRecordIds: string[];
  cleanRecordIds: string[];
  rulesExecuted: string[];
}

export const ValidationRulesView: React.FC<ValidationRulesViewProps> = ({
  records,
  onUpdateAllRecords,
  onSelectRecord
}) => {
  // Batch Mode States
  const [isBatchMode, setIsBatchMode] = useState<boolean>(false);
  const [selectedRecordIds, setSelectedRecordIds] = useState<string[]>([]);
  const [selectedRuleIds, setSelectedRuleIds] = useState<string[]>([
    'VR-01-ARITH',
    'VR-02-CDB',
    'VR-03-DUP',
    'VR-04-FLAG',
    'VR-05-LEGAL'
  ]);
  const [isRulesDropdownOpen, setIsRulesDropdownOpen] = useState<boolean>(false);

  // Execution States
  const [isBatchExecuting, setIsBatchExecuting] = useState<boolean>(false);
  const [batchProgress, setBatchProgress] = useState<BatchProgressState | null>(null);
  const [batchSummary, setBatchSummary] = useState<BatchSummaryReport | null>(null);
  const [singleValidatingId, setSingleValidatingId] = useState<string | null>(null);

  // Filter & Search States
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'FLAGGED' | 'CRITICAL' | 'CLEAN' | 'SELECTED'>('ALL');
  const [expandedRecordIds, setExpandedRecordIds] = useState<string[]>([]);

  const rulesCatalog = [
    {
      id: 'VR-01-ARITH',
      name: 'Area Summation Consistency Engine',
      shortName: 'Area Summation',
      category: 'ARITHMETIC',
      description: 'Verifies that total declared parcel area strictly matches the arithmetic sum of all co-sharers fractional shares (Hissa division) and sub-plots.',
      tolerance: '5 sq. meters tolerance for rounding'
    },
    {
      id: 'VR-02-CDB',
      name: 'DILRMP Central Master Database Cross-Check',
      shortName: 'Central Master DB',
      category: 'CROSS_DB',
      description: 'Cross-checks village master settlement records to detect active civil court stays, infrastructure corridor notices, or ownership name shifts.',
      target: 'National LRMS / Bhulekh Registry'
    },
    {
      id: 'VR-03-DUP',
      name: 'Cadastral Duplicate & Conflict Detector',
      shortName: 'Duplicate Detector',
      category: 'DUPLICATE',
      description: 'Prevents double-digitization of identical survey numbers within the same revenue village and detects overlapping subdivision claims.',
      scope: 'Village & Tehsil level index'
    },
    {
      id: 'VR-04-FLAG',
      name: 'Indic Script OCR Confidence Threshold',
      shortName: 'OCR Confidence',
      category: 'FORMAT',
      description: 'Automatically flags any critical field (Khasra, Khata, Owner Name, Declared Area) scoring below 75% confidence for mandatory Human-in-the-Loop review.',
      threshold: '75% minimum auto-pass score'
    },
    {
      id: 'VR-05-LEGAL',
      name: 'Encumbrance & Section 34 Mutation Compliance',
      shortName: 'Encumbrance & Court Stays',
      category: 'LEGAL',
      description: 'Audits bank hypothecation notes, revenue court sanction entries, and mutation succession chains under the State Land Revenue Code.',
      standard: 'Revenue Code Section 34/35'
    }
  ];

  // Global summary statistics across active queue
  const allValidationResults = records.flatMap(r => r.validationResults || []);
  const totalChecks = allValidationResults.length;
  const passedChecks = allValidationResults.filter(c => c.passed).length;
  const criticalFlags = allValidationResults.filter(c => !c.passed && c.severity === 'CRITICAL').length;
  const warningFlags = allValidationResults.filter(c => !c.passed && c.severity === 'WARNING').length;

  // Filtered records based on search and status
  const filteredRecords = useMemo(() => {
    return records.filter(record => {
      // Status filter
      const failed = record.validationResults?.filter(r => !r.passed) || [];
      const hasCritical = failed.some(r => r.severity === 'CRITICAL');
      const isClean = failed.length === 0;
      const isSelected = selectedRecordIds.includes(record.id);

      if (statusFilter === 'FLAGGED' && failed.length === 0) return false;
      if (statusFilter === 'CRITICAL' && !hasCritical) return false;
      if (statusFilter === 'CLEAN' && !isClean) return false;
      if (statusFilter === 'SELECTED' && !isSelected) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const khasra = record.khasraNumber.value.toLowerCase();
        const village = record.village.value.toLowerCase();
        const district = record.district.value.toLowerCase();
        const docNum = record.documentNumber.toLowerCase();
        const owner = record.primaryOwnerName.value.toLowerCase();
        return khasra.includes(q) || village.includes(q) || district.includes(q) || docNum.includes(q) || owner.includes(q);
      }

      return true;
    });
  }, [records, statusFilter, searchQuery, selectedRecordIds]);

  // Selection handlers
  const handleToggleRecordSelection = (recordId: string) => {
    setSelectedRecordIds(prev => 
      prev.includes(recordId) 
        ? prev.filter(id => id !== recordId) 
        : [...prev, recordId]
    );
  };

  const handleSelectAll = () => {
    setSelectedRecordIds(filteredRecords.map(r => r.id));
  };

  const handleDeselectAll = () => {
    setSelectedRecordIds([]);
  };

  const handleSelectFlaggedOnly = () => {
    const flaggedIds = records
      .filter(r => (r.validationResults?.filter(res => !res.passed).length || 0) > 0)
      .map(r => r.id);
    setSelectedRecordIds(flaggedIds);
  };

  const handleSelectCleanOnly = () => {
    const cleanIds = records
      .filter(r => (r.validationResults?.filter(res => !res.passed).length || 0) === 0)
      .map(r => r.id);
    setSelectedRecordIds(cleanIds);
  };

  const handleToggleRuleSelection = (ruleId: string) => {
    setSelectedRuleIds(prev => 
      prev.includes(ruleId) 
        ? prev.filter(id => id !== ruleId) 
        : [...prev, ruleId]
    );
  };

  const handleToggleExpandRecord = (recordId: string) => {
    setExpandedRecordIds(prev => 
      prev.includes(recordId) ? prev.filter(id => id !== recordId) : [...prev, recordId]
    );
  };

  // Trigger batch validation execution
  const handleExecuteBatchValidation = async () => {
    if (selectedRecordIds.length === 0 || selectedRuleIds.length === 0) return;

    setIsBatchExecuting(true);
    setBatchSummary(null);

    const targetRecords = records.filter(r => selectedRecordIds.includes(r.id));
    const ruleSteps = [
      'Evaluating mathematical area summation & hissa shares...',
      'Cross-referencing DILRMP Central Master Database & e-Courts...',
      'Scanning cadastral boundaries for duplicates and overlaps...',
      'Auditing Indic script optical OCR confidence thresholds...',
      'Validating Section 34 encumbrances and judicial stays...'
    ];

    // Step through each selected record to show progress
    const updatedRecordsMap = new Map<string, ExtractedLandRecord>();
    const flaggedRecordIds: string[] = [];
    const cleanRecordIds: string[] = [];
    let batchTotalChecks = 0;
    let batchPassedChecks = 0;
    let batchCritical = 0;
    let batchWarnings = 0;

    for (let i = 0; i < targetRecords.length; i++) {
      const record = targetRecords[i];
      const recordLabel = `Khasra ${record.khasraNumber.value} (${record.village.value})`;

      // Simulate sequential step updates for visual feedback
      setBatchProgress({
        currentRecordIndex: i + 1,
        totalRecords: targetRecords.length,
        currentRecordName: recordLabel,
        currentRuleStep: ruleSteps[i % ruleSteps.length],
        percentage: Math.round(((i) / targetRecords.length) * 100)
      });

      // Brief delay to allow UI to render step progress
      await new Promise(resolve => setTimeout(resolve, 260));

      // Run automated rules with selected rule filter
      const newValidationResults = runAutomatedValidationRules(record, records, selectedRuleIds);
      
      const failed = newValidationResults.filter(r => !r.passed);
      const critical = failed.filter(r => r.severity === 'CRITICAL');
      const warnings = failed.filter(r => r.severity === 'WARNING');

      batchTotalChecks += newValidationResults.length;
      batchPassedChecks += newValidationResults.filter(r => r.passed).length;
      batchCritical += critical.length;
      batchWarnings += warnings.length;

      if (failed.length > 0) {
        flaggedRecordIds.push(record.id);
      } else {
        cleanRecordIds.push(record.id);
      }

      // Append audit trail entry to modification history
      const prevHistory = getRecordModificationHistory(record);
      const ruleNamesEvaluated = rulesCatalog
        .filter(r => selectedRuleIds.includes(r.id))
        .map(r => r.shortName)
        .join(', ');

      const batchAuditEntry: RecordModificationEntry = {
        id: `MOD-BATCH-${Date.now()}-${i}`,
        timestamp: new Date().toISOString(),
        userId: 'SYS-BATCH-VAL-01',
        userName: 'Automated DILRMP Validation Engine',
        userRole: 'SYSTEM',
        changeType: failed.length > 0 ? 'STATUS_CHANGE' : 'ADMINISTRATIVE_NOTE',
        fieldLabel: 'Batch Automated Rule Evaluation',
        previousValue: `${record.validationResults?.filter(r => r.passed).length || 0}/${record.validationResults?.length || 0} passed`,
        newValue: `${newValidationResults.filter(r => r.passed).length}/${newValidationResults.length} passed (${failed.length} flagged)`,
        reason: 'Simultaneous Batch Rule Evaluation',
        notes: `Batch evaluation executed for ${selectedRuleIds.length} rule specifications (${ruleNamesEvaluated}). Result: ${failed.length === 0 ? 'All checks satisfied without flag.' : `${failed.length} validation anomaly(ies) flagged.`}`,
        sourceTerminal: 'DILRMP Batch Validation Cluster'
      };

      const updatedRecord: ExtractedLandRecord = {
        ...record,
        validationResults: newValidationResults,
        modificationHistory: [batchAuditEntry, ...prevHistory]
      };

      updatedRecordsMap.set(record.id, updatedRecord);
    }

    // Finalize progress
    setBatchProgress({
      currentRecordIndex: targetRecords.length,
      totalRecords: targetRecords.length,
      currentRecordName: 'Finalizing database batch update...',
      currentRuleStep: 'Consolidating audit reports and cross-index cache...',
      percentage: 100
    });

    await new Promise(resolve => setTimeout(resolve, 300));

    // Update parent state with all records updated
    const finalRecords = records.map(r => updatedRecordsMap.get(r.id) || r);
    onUpdateAllRecords(finalRecords);

    // Set summary report
    setBatchSummary({
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      processedCount: targetRecords.length,
      totalChecks: batchTotalChecks,
      passedChecks: batchPassedChecks,
      criticalCount: batchCritical,
      warningCount: batchWarnings,
      flaggedRecordIds,
      cleanRecordIds,
      rulesExecuted: selectedRuleIds
    });

    setIsBatchExecuting(false);
    setBatchProgress(null);
  };

  // Single record re-validation
  const handleValidateSingleRecord = (record: ExtractedLandRecord) => {
    setSingleValidatingId(record.id);
    setTimeout(() => {
      const newResults = runAutomatedValidationRules(record, records, selectedRuleIds);
      const prevHistory = getRecordModificationHistory(record);
      const failed = newResults.filter(r => !r.passed);

      const auditEntry: RecordModificationEntry = {
        id: `MOD-SINGLE-VAL-${Date.now()}`,
        timestamp: new Date().toISOString(),
        userId: 'SYS-VAL-ENGINE',
        userName: 'Automated DILRMP Validation Engine',
        userRole: 'SYSTEM',
        changeType: failed.length > 0 ? 'STATUS_CHANGE' : 'ADMINISTRATIVE_NOTE',
        fieldLabel: 'Single Record Rule Re-evaluation',
        newValue: `${newResults.filter(r => r.passed).length}/${newResults.length} passed`,
        reason: 'Manual Trigger from Rules Station',
        notes: `Immediate re-validation evaluated across active queue.`,
        sourceTerminal: 'Revenue Rules Console'
      };

      const updated: ExtractedLandRecord = {
        ...record,
        validationResults: newResults,
        modificationHistory: [auditEntry, ...prevHistory]
      };

      const allUpdated = records.map(r => r.id === record.id ? updated : r);
      onUpdateAllRecords(allUpdated);
      setSingleValidatingId(null);
    }, 400);
  };

  // Re-evaluate entire active batch (existing default)
  const handleRunAllBatchValidation = () => {
    setIsBatchExecuting(true);
    setTimeout(() => {
      const updated = records.map(record => ({
        ...record,
        validationResults: runAutomatedValidationRules(record, records, selectedRuleIds)
      }));
      onUpdateAllRecords(updated);
      setIsBatchExecuting(false);
    }, 600);
  };

  // Export Batch Validation Report as JSON
  const handleExportBatchReport = () => {
    const recordsToExport = selectedRecordIds.length > 0 
      ? records.filter(r => selectedRecordIds.includes(r.id))
      : records;

    const reportData = {
      reportType: 'DILRMP_BATCH_VALIDATION_AUDIT',
      generatedAt: new Date().toISOString(),
      standardsCompliance: 'ISO 19152 LADM / Digital India Land Records Modernization Programme',
      rulesEnforced: rulesCatalog.filter(r => selectedRuleIds.includes(r.id)),
      totalRecordsAnalyzed: recordsToExport.length,
      overallStats: {
        totalRuleEvaluations: recordsToExport.flatMap(r => r.validationResults || []).length,
        totalPassed: recordsToExport.flatMap(r => r.validationResults || []).filter(c => c.passed).length,
        totalFlagged: recordsToExport.flatMap(r => r.validationResults || []).filter(c => !c.passed).length
      },
      records: recordsToExport.map(r => ({
        id: r.id,
        documentNumber: r.documentNumber,
        khasraNumber: r.khasraNumber.value,
        village: r.village.value,
        tehsil: r.tehsil.value,
        district: r.district.value,
        status: r.status,
        overallConfidence: r.overallConfidence,
        validationResults: r.validationResults
      }))
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `DILRMP_Batch_Validation_Report_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-[#FAF8F5] rounded-xl border border-[#DCD7CE] p-6 shadow-2xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-[#FFF9EA] text-[#8B4513] border border-[#DCD7CE] shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl font-bold text-[#33332A] natural-serif">Automated Land Record Validation Engine</h2>
                <span className={`px-2 py-0.5 rounded text-[11px] font-bold border transition-colors ${
                  isBatchMode 
                    ? 'bg-[#FFF9EA] text-[#8B4513] border-[#DCD7CE]' 
                    : 'bg-[#F5F3EE] text-[#5A5A40] border-[#DCD7CE]'
                }`}>
                  {isBatchMode ? 'Batch Processing Mode: ACTIVE' : 'Standard Mode'}
                </span>
              </div>
              <p className="text-xs text-[#6B6B58] mt-0.5">
                Multi-record batch evaluation, mathematical area reconciliation, cross-registry checks, and cadastral conflict scanning
              </p>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Batch Mode Toggle */}
            <button
              id="btn-toggle-batch-mode"
              onClick={() => {
                const nextMode = !isBatchMode;
                setIsBatchMode(nextMode);
                if (nextMode && selectedRecordIds.length === 0) {
                  // Pre-select all by default for quick one-click batching
                  setSelectedRecordIds(records.map(r => r.id));
                }
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold shadow-2xs transition-all flex items-center gap-2 cursor-pointer border ${
                isBatchMode
                  ? 'bg-[#5A5A40] text-[#FFF9EA] border-[#43432F] ring-2 ring-[#DCD7CE]'
                  : 'bg-[#FAF8F5] text-[#4A3728] border-[#DCD7CE] hover:bg-[#EBE7DF]'
              }`}
              title="Toggle multi-record batch selection and bulk rule processing"
            >
              <ListChecks className="w-4 h-4 text-[#8B4513]" />
              <span>{isBatchMode ? 'Exit Batch Mode' : 'Batch Processing Mode'}</span>
              {isBatchMode && (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-[#FAF8F5] text-[#33332A]">
                  {selectedRecordIds.length}
                </span>
              )}
            </button>

            {/* Standard quick re-evaluate button */}
            {!isBatchMode && (
              <button
                id="btn-run-batch-validation"
                disabled={isBatchExecuting}
                onClick={handleRunAllBatchValidation}
                className="px-4 py-2 rounded-xl bg-[#5A5A40] hover:bg-[#4A4A35] text-[#FFF9EA] text-xs font-semibold shadow-2xs transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isBatchExecuting ? 'animate-spin' : ''}`} />
                <span>{isBatchExecuting ? 'Evaluating Rules...' : 'Re-evaluate Active Batch'}</span>
              </button>
            )}

            {/* Export JSON button */}
            <button
              id="btn-export-validation-report"
              onClick={handleExportBatchReport}
              className="px-3 py-2 rounded-xl border border-[#DCD7CE] bg-[#FAF8F5] hover:bg-[#EBE7DF] text-xs font-semibold text-[#4A3728] transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
              title="Export validation findings as DILRMP JSON"
            >
              <Download className="w-3.5 h-3.5 text-[#5A5A40]" />
              <span className="hidden sm:inline">Export Audit Report</span>
            </button>
          </div>
        </div>
      </div>

      {/* STICKY / DEDICATED BATCH PROCESSING CONTROL PANEL (When Batch Mode is Active) */}
      {isBatchMode && (
        <div className="bg-[#FAF8F5] rounded-xl border-2 border-[#8B4513] p-4 sm:p-5 shadow-md space-y-4 animate-fadeIn">
          {/* Top Row: Selection Status and Quick Selectors */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[#DCD7CE] pb-3">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="p-1.5 rounded-md bg-[#FFF9EA] text-[#8B4513] border border-[#DCD7CE]">
                <CheckSquare className="w-4 h-4" />
              </span>
              <div>
                <span className="text-xs font-bold text-[#33332A] natural-serif">
                  Batch Selection: <strong className="text-[#8B4513] font-mono text-sm">{selectedRecordIds.length}</strong> of {records.length} records selected
                </span>
                <span className="text-[11px] text-[#6B6B58] block">
                  Select records below to evaluate validation rules simultaneously
                </span>
              </div>
            </div>

            {/* Selection Presets */}
            <div className="flex items-center gap-1.5 flex-wrap text-xs">
              <button
                id="btn-batch-select-all"
                onClick={handleSelectAll}
                className="px-2.5 py-1 rounded-lg border border-[#DCD7CE] bg-[#F5F3EE] hover:bg-[#EBE7DF] text-[11px] font-semibold text-[#4A3728] transition-colors cursor-pointer"
              >
                Select All ({records.length})
              </button>
              <button
                id="btn-batch-select-flagged"
                onClick={handleSelectFlaggedOnly}
                className="px-2.5 py-1 rounded-lg border border-[#F2C2BA] bg-[#FDF0ED] hover:bg-[#FADBD5] text-[11px] font-semibold text-[#8B0000] transition-colors cursor-pointer"
              >
                Select Flagged Only
              </button>
              <button
                id="btn-batch-select-clean"
                onClick={handleSelectCleanOnly}
                className="px-2.5 py-1 rounded-lg border border-[#BCD4C0] bg-[#EAF2EB] hover:bg-[#D5E8D8] text-[11px] font-semibold text-[#3D5A40] transition-colors cursor-pointer"
              >
                Select Clean Only
              </button>
              <button
                id="btn-batch-deselect-all"
                onClick={handleDeselectAll}
                className="px-2.5 py-1 rounded-lg border border-[#DCD7CE] bg-[#FAF8F5] hover:bg-[#EBE7DF] text-[11px] font-semibold text-[#6B6B58] transition-colors cursor-pointer"
              >
                Clear Selection
              </button>
            </div>
          </div>

          {/* Middle Row: Rule Specifications Configuration & Primary Execution Button */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Rule Selector / Configuration */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-[#5A5A40] uppercase tracking-wider flex items-center gap-1 natural-serif">
                  <Sliders className="w-3.5 h-3.5" />
                  Target Rules to Execute in Batch ({selectedRuleIds.length} of {rulesCatalog.length} active):
                </span>
                <button
                  id="btn-toggle-rules-dropdown"
                  type="button"
                  onClick={() => setIsRulesDropdownOpen(!isRulesDropdownOpen)}
                  className="text-[11px] text-[#8B4513] hover:underline font-semibold flex items-center gap-0.5 cursor-pointer"
                >
                  <span>{isRulesDropdownOpen ? 'Hide Rule Checklist' : 'Configure Rules'}</span>
                  {isRulesDropdownOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                </button>
              </div>

              {/* Rule Pills Preview */}
              <div className="flex items-center gap-1.5 flex-wrap">
                {rulesCatalog.map(rule => {
                  const isChecked = selectedRuleIds.includes(rule.id);
                  return (
                    <button
                      key={rule.id}
                      id={`btn-rule-pill-${rule.id.toLowerCase()}`}
                      type="button"
                      onClick={() => handleToggleRuleSelection(rule.id)}
                      className={`px-2 py-0.5 rounded text-[11px] font-semibold border transition-all cursor-pointer flex items-center gap-1 ${
                        isChecked
                          ? 'bg-[#5A5A40] text-[#FFF9EA] border-[#43432F]'
                          : 'bg-[#F5F3EE] text-[#A3A390] border-[#DCD7CE] line-through'
                      }`}
                    >
                      {isChecked ? <Check className="w-3 h-3 text-[#BCD4C0]" /> : <X className="w-3 h-3 text-[#A3A390]" />}
                      <span>{rule.shortName}</span>
                    </button>
                  );
                })}
              </div>

              {/* Collapsible Full Rule Checkboxes */}
              {isRulesDropdownOpen && (
                <div className="p-3 bg-[#F5F3EE] rounded-lg border border-[#DCD7CE] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-xs mt-2 animate-fadeIn">
                  {rulesCatalog.map(rule => (
                    <label 
                      key={rule.id}
                      className="flex items-start gap-2 p-2 rounded bg-[#FAF8F5] border border-[#DCD7CE] hover:border-[#8B4513] cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedRuleIds.includes(rule.id)}
                        onChange={() => handleToggleRuleSelection(rule.id)}
                        className="mt-0.5 rounded border-[#DCD7CE] text-[#5A5A40] focus:ring-0 cursor-pointer"
                      />
                      <div className="space-y-0.5">
                        <span className="font-bold text-[#33332A] text-[11px] block">{rule.shortName}</span>
                        <span className="text-[10px] text-[#6B6B58] block leading-tight">{rule.name}</span>
                      </div>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Execution Trigger Block */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                id="btn-execute-batch-validation"
                disabled={isBatchExecuting || selectedRecordIds.length === 0 || selectedRuleIds.length === 0}
                onClick={handleExecuteBatchValidation}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#8B4513] hover:bg-[#6D340E] text-[#FFF9EA] text-xs font-bold shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isBatchExecuting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-[#FFF9EA]" />
                    <span>Processing Batch...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current text-[#FFF9EA]" />
                    <span>Validate {selectedRecordIds.length} Selected Records</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* BATCH PROGRESS MODAL / OVERLAY (During Execution) */}
      {isBatchExecuting && batchProgress && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-2xs animate-fadeIn">
          <div className="bg-[#FAF8F5] rounded-2xl border border-[#DCD7CE] p-6 max-w-lg w-full shadow-2xl space-y-4 animate-scaleUp">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-[#FFF9EA] text-[#8B4513] border border-[#DCD7CE] animate-pulse">
                <RefreshCw className="w-6 h-6 animate-spin text-[#8B4513]" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#33332A] natural-serif">
                  Batch Validation Engine in Progress
                </h3>
                <p className="text-xs text-[#6B6B58]">
                  Evaluating {batchProgress.totalRecords} selected records simultaneously
                </p>
              </div>
            </div>

            {/* Progress Percentage Bar */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-[#33332A]">Record {batchProgress.currentRecordIndex} of {batchProgress.totalRecords}</span>
                <span className="font-mono text-[#8B4513]">{batchProgress.percentage}%</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-[#EBE7DF] overflow-hidden">
                <div 
                  className="h-full bg-[#8B4513] transition-all duration-300 rounded-full"
                  style={{ width: `${batchProgress.percentage}%` }}
                />
              </div>
            </div>

            {/* Step Detail Card */}
            <div className="p-3 rounded-xl bg-[#F5F3EE] border border-[#DCD7CE] space-y-1 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-[#33332A]">
                <Clock className="w-3.5 h-3.5 text-[#5A5A40]" />
                <span>Active Target: {batchProgress.currentRecordName}</span>
              </div>
              <p className="text-[11px] text-[#5A5A40] italic pl-5">
                &bull; {batchProgress.currentRuleStep}
              </p>
            </div>

            <div className="flex items-center justify-between text-[11px] text-[#6B6B58] pt-1">
              <span>ISO 19152 Cadastral Consistency Verification</span>
              <span className="font-mono">Cluster Node #01</span>
            </div>
          </div>
        </div>
      )}

      {/* POST-BATCH COMPLETION SUMMARY REPORT BANNER */}
      {batchSummary && !isBatchExecuting && (
        <div className="bg-[#FAF8F5] rounded-xl border border-[#BCD4C0] p-4 sm:p-5 shadow-xs space-y-3 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#DCD7CE] pb-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-[#EAF2EB] text-[#3D5A40] border border-[#BCD4C0]">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#2A402D] natural-serif">
                  Batch Validation Completed Successfully
                </h4>
                <span className="text-[11px] text-[#5A5A40]">
                  Evaluated at {batchSummary.timestamp} &bull; {batchSummary.processedCount} records processed &bull; {batchSummary.totalChecks} checks run
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                id="btn-filter-batch-flagged"
                onClick={() => setStatusFilter('FLAGGED')}
                className="px-2.5 py-1 rounded-lg border border-[#DCD7CE] bg-[#F5F3EE] hover:bg-[#EBE7DF] text-xs font-semibold text-[#4A3728] transition-colors cursor-pointer"
              >
                View Flagged ({batchSummary.flaggedRecordIds.length})
              </button>
              <button
                id="btn-export-batch-results"
                onClick={handleExportBatchReport}
                className="px-2.5 py-1 rounded-lg border border-[#DCD7CE] bg-[#F5F3EE] hover:bg-[#EBE7DF] text-xs font-semibold text-[#4A3728] transition-colors cursor-pointer flex items-center gap-1"
              >
                <Download className="w-3 h-3 text-[#5A5A40]" />
                <span>Export Results</span>
              </button>
              <button
                id="btn-dismiss-batch-summary"
                onClick={() => setBatchSummary(null)}
                className="p-1 rounded-lg text-[#6B6B58] hover:text-[#33332A] hover:bg-[#EBE7DF] cursor-pointer"
                title="Dismiss report banner"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <div className="p-2.5 rounded-lg bg-[#F5F3EE] border border-[#DCD7CE]">
              <span className="text-[10px] uppercase font-bold text-[#6B6B58] block">Records Processed</span>
              <span className="text-base font-bold text-[#33332A] natural-serif">{batchSummary.processedCount}</span>
              <span className="text-[10px] text-[#5A5A40] block">Simultaneous execution</span>
            </div>

            <div className="p-2.5 rounded-lg bg-[#F5F3EE] border border-[#DCD7CE]">
              <span className="text-[10px] uppercase font-bold text-[#3D5A40] block">Fully Clean Records</span>
              <span className="text-base font-bold text-[#3D5A40] natural-serif">{batchSummary.cleanRecordIds.length}</span>
              <span className="text-[10px] text-[#3D5A40] block">Zero rule violations</span>
            </div>

            <div className="p-2.5 rounded-lg bg-[#F5F3EE] border border-[#DCD7CE]">
              <span className="text-[10px] uppercase font-bold text-[#8B0000] block">Critical Legal Flags</span>
              <span className="text-base font-bold text-[#8B0000] natural-serif">{batchSummary.criticalCount}</span>
              <span className="text-[10px] text-[#8B0000] block">Court stay / Area mismatch</span>
            </div>

            <div className="p-2.5 rounded-lg bg-[#F5F3EE] border border-[#DCD7CE]">
              <span className="text-[10px] uppercase font-bold text-[#8B4513] block">Review Warnings</span>
              <span className="text-base font-bold text-[#8B4513] natural-serif">{batchSummary.warningCount}</span>
              <span className="text-[10px] text-[#8B4513] block">OCR threshold / Duplicates</span>
            </div>
          </div>
        </div>
      )}

      {/* Global Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#DCD7CE] shadow-2xs">
          <span className="text-[11px] font-semibold text-[#5A5A40] uppercase">Total Rule Checks</span>
          <div className="text-2xl font-bold text-[#33332A] natural-serif mt-1">{totalChecks}</div>
          <span className="text-[11px] text-[#6B6B58]">Across active queue</span>
        </div>

        <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#DCD7CE] shadow-2xs">
          <span className="text-[11px] font-semibold text-[#3D5A40] uppercase">Passed Checks</span>
          <div className="text-2xl font-bold text-[#3D5A40] natural-serif mt-1">{passedChecks}</div>
          <span className="text-[11px] text-[#3D5A40]">
            {totalChecks > 0 ? Math.round((passedChecks / totalChecks) * 100) : 0}% compliance rate
          </span>
        </div>

        <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#DCD7CE] shadow-2xs">
          <span className="text-[11px] font-semibold text-[#8B0000] uppercase">Critical Legal Flags</span>
          <div className="text-2xl font-bold text-[#8B0000] natural-serif mt-1">{criticalFlags}</div>
          <span className="text-[11px] text-[#8B0000]">Litigation &amp; area mismatch</span>
        </div>

        <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#DCD7CE] shadow-2xs">
          <span className="text-[11px] font-semibold text-[#8B4513] uppercase">Review Warnings</span>
          <div className="text-2xl font-bold text-[#8B4513] natural-serif mt-1">{warningFlags}</div>
          <span className="text-[11px] text-[#8B4513]">Low OCR / HWR confidence</span>
        </div>
      </div>

      {/* Rules Catalog Specifications Strip */}
      <div className="bg-[#FAF8F5] rounded-xl border border-[#DCD7CE] p-5 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-[#33332A] natural-serif">Configured Rule Specifications</h3>
            <p className="text-xs text-[#6B6B58]">DILRMP statutory rules applied during automated batch and single evaluations</p>
          </div>
          <span className="text-[11px] font-mono text-[#5A5A40] bg-[#F5F3EE] px-2 py-0.5 rounded border border-[#DCD7CE]">
            {rulesCatalog.length} Active Engines
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {rulesCatalog.map((rule) => (
            <div key={rule.id} className="p-4 rounded-xl border border-[#DCD7CE] bg-[#F5F3EE] text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#33332A]">{rule.shortName}</span>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-[#FFF9EA] text-[#8B4513] border border-[#DCD7CE]">
                  {rule.id}
                </span>
              </div>
              <p className="text-[#5A5A40] text-[11px] leading-relaxed line-clamp-2">{rule.description}</p>
              <div className="text-[10px] text-[#6B6B58] pt-1 border-t border-[#DCD7CE] flex items-center justify-between">
                <span>Category: {rule.category}</span>
                <span className="font-medium text-[#4A3728] truncate max-w-[150px]">
                  {rule.tolerance || rule.target || rule.scope || rule.threshold || rule.standard}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Record Violations & Per-Record Audit List */}
      <div className="bg-[#FAF8F5] rounded-xl border border-[#DCD7CE] p-5 shadow-2xs space-y-4">
        {/* Header & Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-[#DCD7CE]">
          <div>
            <h3 className="text-sm font-bold text-[#33332A] natural-serif">
              {isBatchMode ? 'Batch Record Selection & Audit Table' : 'Per-Record Validation Audit Log'}
            </h3>
            <p className="text-xs text-[#6B6B58]">
              {isBatchMode 
                ? `Check records to include in the simultaneous batch (${selectedRecordIds.length} currently selected)` 
                : 'Click any record to inspect in Verification Station, or toggle Batch Processing Mode above'}
            </p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {/* Search Input */}
            <div className="relative min-w-[180px]">
              <input
                id="input-rules-search"
                type="text"
                placeholder="Search Khasra, village..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-7 pr-3 py-1.5 rounded-lg border border-[#DCD7CE] bg-[#F5F3EE] text-xs text-[#33332A] placeholder:text-[#A3A390] focus:outline-hidden focus:border-[#5A5A40]"
              />
              <Search className="w-3.5 h-3.5 text-[#6B6B58] absolute left-2 top-2" />
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1 bg-[#F5F3EE] p-1 rounded-lg border border-[#DCD7CE] text-[11px]">
              <Filter className="w-3 h-3 text-[#6B6B58] ml-1" />
              {[
                { id: 'ALL', label: 'All' },
                { id: 'FLAGGED', label: 'Flagged' },
                { id: 'CRITICAL', label: 'Critical' },
                { id: 'CLEAN', label: 'Clean' },
                ...(isBatchMode ? [{ id: 'SELECTED', label: `Selected (${selectedRecordIds.length})` }] : [])
              ].map((tab) => (
                <button
                  key={tab.id}
                  id={`btn-filter-status-${tab.id.toLowerCase()}`}
                  onClick={() => setStatusFilter(tab.id as any)}
                  className={`px-2 py-0.5 rounded font-semibold transition-colors cursor-pointer ${
                    statusFilter === tab.id
                      ? 'bg-[#5A5A40] text-[#FFF9EA]'
                      : 'text-[#4A3728] hover:text-[#33332A]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Record Cards List */}
        <div className="space-y-3">
          {filteredRecords.length === 0 ? (
            <div className="p-8 text-center text-[#6B6B58] space-y-2">
              <AlertCircle className="w-6 h-6 text-[#A3A390] mx-auto opacity-60" />
              <p className="text-xs font-semibold text-[#33332A]">No records match the current filter or search criteria.</p>
              <button
                onClick={() => { setSearchQuery(''); setStatusFilter('ALL'); }}
                className="text-xs font-semibold text-[#5A5A40] hover:underline cursor-pointer"
              >
                Reset filters
              </button>
            </div>
          ) : (
            filteredRecords.map((record) => {
              const failedRules = record.validationResults?.filter(r => !r.passed) || [];
              const hasCritical = failedRules.some(r => r.severity === 'CRITICAL');
              const isSelected = selectedRecordIds.includes(record.id);
              const isExpanded = expandedRecordIds.includes(record.id);
              const isSingleValidating = singleValidatingId === record.id;

              return (
                <div
                  key={record.id}
                  className={`p-4 rounded-xl border transition-all space-y-2.5 shadow-2xs ${
                    isSelected && isBatchMode
                      ? 'bg-[#FFF9EA] border-[#8B4513] ring-1 ring-[#8B4513]'
                      : 'bg-[#FAF8F5] border-[#DCD7CE] hover:border-[#8B4513] hover:bg-[#F5F3EE]'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                    {/* Left: Checkbox (in batch mode) & Record Identification */}
                    <div className="flex items-center gap-3">
                      {isBatchMode && (
                        <div 
                          className="cursor-pointer shrink-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleRecordSelection(record.id);
                          }}
                        >
                          <input
                            type="checkbox"
                            id={`checkbox-record-${record.id}`}
                            checked={isSelected}
                            onChange={() => handleToggleRecordSelection(record.id)}
                            className="w-4 h-4 rounded border-[#DCD7CE] text-[#8B4513] focus:ring-0 cursor-pointer accent-[#8B4513]"
                          />
                        </div>
                      )}

                      <div 
                        className="cursor-pointer"
                        onClick={() => {
                          if (isBatchMode) {
                            handleToggleRecordSelection(record.id);
                          } else {
                            onSelectRecord(record);
                          }
                        }}
                      >
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-[#33332A] text-xs natural-serif">
                            Khasra #{record.khasraNumber.value} ({record.village.value}, {record.district.value})
                          </span>
                          <span className="text-[11px] text-[#6B6B58] font-mono">{record.documentNumber}</span>
                          <span className="text-[11px] text-[#5A5A40]">
                            &bull; Owner: <strong>{record.primaryOwnerName.value}</strong>
                          </span>
                        </div>
                        <span className="text-[11px] text-[#6B6B58] block mt-0.5">
                          Declared Area: {record.totalAreaDeclared.value} {record.declaredUnit.value} ({record.normalizedAreaSqMeters.toLocaleString()} sq.m) &bull; Confidence: {record.overallConfidence}%
                        </span>
                      </div>
                    </div>

                    {/* Right: Status Pill & Actions */}
                    <div className="flex items-center gap-2 self-end sm:self-center flex-wrap">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                        failedRules.length === 0 
                          ? 'bg-[#EAF2EB] text-[#3D5A40] border-[#BCD4C0]' 
                          : hasCritical 
                          ? 'bg-[#FDF0ED] text-[#8B0000] border-[#F2C2BA]' 
                          : 'bg-[#FFF9EA] text-[#8B4513] border-[#DCD7CE]'
                      }`}>
                        {failedRules.length === 0 ? 'All Rules Satisfied' : `${failedRules.length} Rule Anomaly(ies)`}
                      </span>

                      {/* Single Record Re-Evaluate Button */}
                      <button
                        id={`btn-validate-single-${record.id}`}
                        disabled={isSingleValidating || isBatchExecuting}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleValidateSingleRecord(record);
                        }}
                        className="px-2.5 py-1 rounded-lg border border-[#DCD7CE] bg-[#FAF8F5] hover:bg-[#EBE7DF] text-[11px] font-semibold text-[#4A3728] transition-colors flex items-center gap-1 cursor-pointer disabled:opacity-50"
                        title="Re-run validation rules on this record only"
                      >
                        <RefreshCw className={`w-3 h-3 text-[#5A5A40] ${isSingleValidating ? 'animate-spin' : ''}`} />
                        <span className="hidden sm:inline">Verify</span>
                      </button>

                      {/* Inspect in Verification Station */}
                      <button
                        id={`btn-inspect-record-${record.id}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectRecord(record);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-[#5A5A40] hover:bg-[#43432F] text-[#FFF9EA] text-[11px] font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                        title="Open in Human-in-the-Loop Verification Station"
                      >
                        <span>Inspect</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>

                      {/* Expand / Collapse Details */}
                      <button
                        id={`btn-toggle-expand-${record.id}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleExpandRecord(record.id);
                        }}
                        className="p-1 text-[#6B6B58] hover:text-[#33332A] rounded cursor-pointer"
                        title={isExpanded ? 'Collapse rule details' : 'Expand rule details'}
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Per-Record Rule Checklist Details */}
                  <div className={`space-y-1.5 pt-1 ${!isExpanded && failedRules.length === 0 ? 'hidden' : 'block'}`}>
                    {record.validationResults?.map((res) => (
                      <div
                        key={res.ruleId}
                        className={`p-2 rounded-lg text-xs flex items-center justify-between border ${
                          res.passed 
                            ? 'bg-[#EAF2EB]/60 text-[#2A402D] border-[#BCD4C0]' 
                            : res.severity === 'CRITICAL' 
                            ? 'bg-[#FDF0ED] text-[#8B0000] border-[#F2C2BA]' 
                            : 'bg-[#FFF9EA] text-[#4A3728] border-[#DCD7CE]'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {res.passed ? (
                            <Check className="w-3.5 h-3.5 text-[#3D5A40] shrink-0" />
                          ) : (
                            <AlertTriangle className="w-3.5 h-3.5 text-[#8B0000] shrink-0" />
                          )}
                          <span className="font-semibold">{res.ruleName}</span>
                          <span className="text-[10px] opacity-75 font-mono">({res.ruleId})</span>
                        </div>
                        <span className="text-[11px] opacity-90 truncate max-w-md ml-2">{res.message}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
