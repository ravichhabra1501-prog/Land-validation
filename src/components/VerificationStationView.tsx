import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  ZoomIn, 
  ZoomOut, 
  RotateCw, 
  Maximize2, 
  Edit3, 
  Save, 
  X, 
  FileCheck, 
  ShieldCheck, 
  Layers, 
  Sparkles, 
  ArrowLeft, 
  ArrowRight,
  Download,
  AlertCircle,
  Eye,
  Info,
  Check,
  Building,
  User,
  MapPin,
  Stamp,
  History,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { ExtractedLandRecord, UserRole, RecordModificationEntry, ChangeLogEntry } from '../types';
import { runAutomatedValidationRules, generateDilrmpXml } from '../services/landRecordService';
import { ModificationHistoryModal } from './ModificationHistoryModal';
import { getRecordModificationHistory } from '../utils/modificationHistoryUtils';
import { getRecordChangeLog } from '../utils/changeLogUtils';
import { RecordChangeLogTimeline } from './RecordChangeLogTimeline';
import { ValidationRuleTooltip, InputGuidanceBanner } from './ValidationRuleTooltip';
import { 
  PreviousValueIndicator, 
  ModifiedFieldsSummaryBanner, 
  ActiveEditPreviousValueBanner,
  FIELD_LABELS
} from './PreviousValueIndicator';

interface VerificationStationViewProps {
  records: ExtractedLandRecord[];
  selectedRecord: ExtractedLandRecord;
  onSelectRecord: (record: ExtractedLandRecord) => void;
  onUpdateRecord: (updatedRecord: ExtractedLandRecord) => void;
  userRole: UserRole;
  onOpenCadastralMap: () => void;
}

export const VerificationStationView: React.FC<VerificationStationViewProps> = ({
  records,
  selectedRecord,
  onSelectRecord,
  onUpdateRecord,
  userRole,
  onOpenCadastralMap
}) => {
  // Document Viewer State
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [documentFilter, setDocumentFilter] = useState<'normal' | 'high_contrast' | 'inverted' | 'binarized'>('normal');
  const [activeBoundingBox, setActiveBoundingBox] = useState<{ x: number; y: number; width: number; height: number } | null>(null);

  // Field Editing State
  const [editingFieldKey, setEditingFieldKey] = useState<string | null>(null);
  const [fieldEditValue, setFieldEditValue] = useState<string>('');
  const [correctionReason, setCorrectionReason] = useState<string>('CHARACTER_ERROR');
  const [sanctionSuccessMessage, setSanctionSuccessMessage] = useState<string | null>(null);

  // Modification History Modal State
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState<boolean>(false);

  // Active Station Tab in Right Pane: 'FIELDS' or 'CHANGELOG'
  const [stationTab, setStationTab] = useState<'FIELDS' | 'CHANGELOG'>('FIELDS');
  const [isTimelineSectionExpanded, setIsTimelineSectionExpanded] = useState<boolean>(true);

  const isRevenueOfficer = userRole === 'REVENUE_OFFICER' || userRole === 'SETTLEMENT_OFFICER';
  const currentIndex = records.findIndex(r => r.id === selectedRecord.id);

  // Compute live modification history list
  const modificationHistoryList = useMemo(() => {
    return getRecordModificationHistory(selectedRecord);
  }, [selectedRecord]);
  const latestModification = modificationHistoryList[0];

  // Compute live changeLog timeline list
  const changeLogList = useMemo(() => {
    return getRecordChangeLog(selectedRecord);
  }, [selectedRecord]);
  const latestChangeLog = changeLogList[0];

  // Navigate between records in the queue
  const handlePrevRecord = () => {
    if (currentIndex > 0) {
      onSelectRecord(records[currentIndex - 1]);
      setActiveBoundingBox(null);
    }
  };

  const handleNextRecord = () => {
    if (currentIndex < records.length - 1) {
      onSelectRecord(records[currentIndex + 1]);
      setActiveBoundingBox(null);
    }
  };

  // Start field edit
  const handleStartEdit = (key: string, initialValue: string, boundingBox?: any) => {
    setEditingFieldKey(key);
    setFieldEditValue(initialValue);
    if (boundingBox) {
      setActiveBoundingBox(boundingBox);
    }
  };

  // Append new manual modification entry from modal
  const handleAddModification = (entry: RecordModificationEntry) => {
    const prevHistory = getRecordModificationHistory(selectedRecord);
    const prevChangeLog = getRecordChangeLog(selectedRecord);
    const changeLogItem: ChangeLogEntry = {
      id: entry.id,
      timestamp: entry.timestamp,
      officerName: entry.userName,
      role: entry.userRole,
      action: entry.changeType,
      fieldKey: entry.fieldKey,
      fieldLabel: entry.fieldLabel,
      oldValue: entry.previousValue,
      newValue: entry.newValue,
      reason: entry.reason,
      remarks: entry.notes,
      digitalSignature: entry.digitalSignatureRef,
      sourceTerminal: entry.sourceTerminal
    };

    const updated: ExtractedLandRecord = {
      ...selectedRecord,
      modificationHistory: [entry, ...prevHistory],
      changeLog: [changeLogItem, ...prevChangeLog]
    };
    onUpdateRecord(updated);
  };

  // Save field correction and update Modification History
  const handleSaveEdit = (fieldKey: string, fieldLabel: string) => {
    const updated = { ...selectedRecord };

    // Record original value for audit entry
    let origVal = '';

    if (fieldKey === 'khasraNumber') {
      origVal = updated.khasraNumber.value;
      updated.khasraNumber = { 
        ...updated.khasraNumber, 
        value: fieldEditValue, 
        confidence: 99, 
        isFlagged: false,
        previousValue: origVal,
        originalExtractedValue: updated.khasraNumber.originalExtractedValue ?? origVal
      };
    } else if (fieldKey === 'khataNumber') {
      origVal = updated.khataNumber.value;
      updated.khataNumber = { 
        ...updated.khataNumber, 
        value: fieldEditValue, 
        confidence: 99, 
        isFlagged: false,
        previousValue: origVal,
        originalExtractedValue: updated.khataNumber.originalExtractedValue ?? origVal
      };
    } else if (fieldKey === 'primaryOwnerName') {
      origVal = updated.primaryOwnerName.value;
      updated.primaryOwnerName = { 
        ...updated.primaryOwnerName, 
        value: fieldEditValue, 
        confidence: 99, 
        isFlagged: false,
        previousValue: origVal,
        originalExtractedValue: updated.primaryOwnerName.originalExtractedValue ?? origVal
      };
    } else if (fieldKey === 'totalAreaDeclared') {
      origVal = String(updated.totalAreaDeclared.value);
      const numVal = parseFloat(fieldEditValue) || updated.totalAreaDeclared.value;
      updated.totalAreaDeclared = { 
        ...updated.totalAreaDeclared, 
        value: numVal, 
        confidence: 99, 
        isFlagged: false,
        previousValue: origVal,
        originalExtractedValue: updated.totalAreaDeclared.originalExtractedValue ?? origVal
      };
      updated.normalizedAreaSqMeters = numVal * 10000;
    } else if (fieldKey === 'irrigationSource') {
      origVal = updated.irrigationSource?.value || '';
      updated.irrigationSource = { 
        value: fieldEditValue, 
        confidence: 99, 
        isFlagged: false,
        previousValue: origVal,
        originalExtractedValue: updated.irrigationSource?.originalExtractedValue ?? origVal
      };
    } else if (fieldKey === 'encumbranceStatus') {
      origVal = updated.encumbranceStatus.value;
      updated.encumbranceStatus = { 
        ...updated.encumbranceStatus, 
        value: fieldEditValue as any, 
        confidence: 99, 
        isFlagged: false,
        previousValue: origVal,
        originalExtractedValue: updated.encumbranceStatus.originalExtractedValue ?? origVal
      };
    } else if (fieldKey === 'parentageOrSpouse') {
      origVal = updated.parentageOrSpouse.value;
      updated.parentageOrSpouse = { 
        ...updated.parentageOrSpouse, 
        value: fieldEditValue, 
        confidence: 99, 
        isFlagged: false,
        previousValue: origVal,
        originalExtractedValue: updated.parentageOrSpouse.originalExtractedValue ?? origVal
      };
    } else if (fieldKey === 'annualLandRevenue') {
      origVal = String(updated.annualLandRevenue.value);
      const numVal = parseFloat(fieldEditValue) || 0;
      updated.annualLandRevenue = { 
        ...updated.annualLandRevenue, 
        value: numVal, 
        confidence: 99, 
        isFlagged: false,
        previousValue: origVal,
        originalExtractedValue: updated.annualLandRevenue.originalExtractedValue ?? origVal
      };
    } else if (fieldKey === 'landClassification') {
      origVal = updated.landClassification.value;
      updated.landClassification = { 
        ...updated.landClassification, 
        value: fieldEditValue, 
        confidence: 99, 
        isFlagged: false,
        previousValue: origVal,
        originalExtractedValue: updated.landClassification.originalExtractedValue ?? origVal
      };
    }

    // Append to timestamped modification history & changeLog
    if (origVal !== fieldEditValue) {
      const prevHistory = getRecordModificationHistory(selectedRecord);
      const prevChangeLog = getRecordChangeLog(selectedRecord);
      const reasonLabel = correctionReason === 'CHARACTER_ERROR'
        ? 'Character / Ink Glitch Correction'
        : correctionReason === 'LANGUAGE_TRANSLITERATION'
        ? 'Script Transliteration Discrepancy'
        : correctionReason === 'NUMERIC_CONFUSION'
        ? 'Numeric Confusion Correction'
        : 'Human-in-the-Loop Field Rectification';

      const changeId = `MOD-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
      const nowIso = new Date().toISOString();
      const officerDisplayName = isRevenueOfficer ? 'SDM / Revenue Officer' : 'Patwari / Verification Specialist';

      const newModEntry: RecordModificationEntry = {
        id: changeId,
        timestamp: nowIso,
        userId: isRevenueOfficer ? 'OFF-REV-094' : 'SPEC-PAT-108',
        userName: officerDisplayName,
        userRole: userRole,
        changeType: fieldKey === 'encumbranceStatus' ? 'ENCUMBRANCE_UPDATE' : 'FIELD_CORRECTION',
        fieldKey,
        fieldLabel,
        previousValue: origVal || '(Empty)',
        newValue: fieldEditValue,
        reason: reasonLabel,
        notes: `Field "${fieldLabel}" updated during verification station review. Original value: "${origVal || 'none'}" → New value: "${fieldEditValue}".`,
        sourceTerminal: 'Verification Workstation Node #01'
      };

      const newChangeLogEntry: ChangeLogEntry = {
        id: `CL-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        timestamp: nowIso,
        officerName: isRevenueOfficer ? 'SDM Alok Srivastava' : 'Patwari Rajesh Kumar Sharma',
        role: userRole,
        action: fieldKey === 'encumbranceStatus' ? 'ENCUMBRANCE_UPDATE' : 'FIELD_CORRECTION',
        fieldKey,
        fieldLabel,
        oldValue: origVal || '(Empty)',
        newValue: fieldEditValue,
        reason: reasonLabel,
        remarks: `Field "${fieldLabel}" updated during verification station review. Original value: "${origVal || 'none'}" → New value: "${fieldEditValue}".`,
        sourceTerminal: 'Verification Workstation Node #01'
      };

      updated.modificationHistory = [newModEntry, ...prevHistory];
      updated.changeLog = [newChangeLogEntry, ...prevChangeLog];
    }

    // Re-run validation rules
    updated.validationResults = runAutomatedValidationRules(updated, records);
    onUpdateRecord(updated);
    setEditingFieldKey(null);
  };

  // Revert a field to its previous verified value
  const handleRevertField = (fieldKey: string, previousValue: string) => {
    const updated = { ...selectedRecord };
    let currentVal = '';

    if (fieldKey === 'khasraNumber') {
      currentVal = updated.khasraNumber.value;
      updated.khasraNumber = { 
        ...updated.khasraNumber, 
        value: previousValue, 
        previousValue: currentVal, 
        confidence: 99 
      };
    } else if (fieldKey === 'khataNumber') {
      currentVal = updated.khataNumber.value;
      updated.khataNumber = { 
        ...updated.khataNumber, 
        value: previousValue, 
        previousValue: currentVal, 
        confidence: 99 
      };
    } else if (fieldKey === 'primaryOwnerName') {
      currentVal = updated.primaryOwnerName.value;
      updated.primaryOwnerName = { 
        ...updated.primaryOwnerName, 
        value: previousValue, 
        previousValue: currentVal, 
        confidence: 99 
      };
    } else if (fieldKey === 'totalAreaDeclared') {
      currentVal = String(updated.totalAreaDeclared.value);
      const numVal = parseFloat(previousValue) || updated.totalAreaDeclared.value;
      updated.totalAreaDeclared = { 
        ...updated.totalAreaDeclared, 
        value: numVal, 
        previousValue: currentVal, 
        confidence: 99 
      };
      updated.normalizedAreaSqMeters = numVal * 10000;
    } else if (fieldKey === 'irrigationSource') {
      currentVal = updated.irrigationSource?.value || '';
      updated.irrigationSource = { 
        value: previousValue, 
        previousValue: currentVal, 
        confidence: 99, 
        isFlagged: false 
      };
    } else if (fieldKey === 'encumbranceStatus') {
      currentVal = updated.encumbranceStatus.value;
      updated.encumbranceStatus = { 
        ...updated.encumbranceStatus, 
        value: previousValue as any, 
        previousValue: currentVal, 
        confidence: 99 
      };
    } else if (fieldKey === 'parentageOrSpouse') {
      currentVal = updated.parentageOrSpouse.value;
      updated.parentageOrSpouse = { 
        ...updated.parentageOrSpouse, 
        value: previousValue, 
        previousValue: currentVal, 
        confidence: 99 
      };
    } else if (fieldKey === 'annualLandRevenue') {
      currentVal = String(updated.annualLandRevenue.value);
      const numVal = parseFloat(previousValue) || 0;
      updated.annualLandRevenue = { 
        ...updated.annualLandRevenue, 
        value: numVal, 
        previousValue: currentVal, 
        confidence: 99 
      };
    } else if (fieldKey === 'landClassification') {
      currentVal = updated.landClassification.value;
      updated.landClassification = { 
        ...updated.landClassification, 
        value: previousValue, 
        previousValue: currentVal, 
        confidence: 99 
      };
    }

    const prevHistory = getRecordModificationHistory(selectedRecord);
    const prevChangeLog = getRecordChangeLog(selectedRecord);
    const nowIso = new Date().toISOString();
    const officerDisplayName = isRevenueOfficer ? 'SDM / Revenue Officer' : 'Patwari / Verification Specialist';
    const fieldLabel = FIELD_LABELS[fieldKey] || fieldKey;

    const revertModEntry: RecordModificationEntry = {
      id: `MOD-REV-${Date.now()}`,
      timestamp: nowIso,
      userId: isRevenueOfficer ? 'OFF-REV-094' : 'SPEC-PAT-108',
      userName: officerDisplayName,
      userRole: userRole,
      changeType: 'FIELD_CORRECTION',
      fieldKey,
      fieldLabel,
      previousValue: currentVal,
      newValue: previousValue,
      reason: 'Reverted to previous verified value',
      notes: `Restored field "${fieldLabel}" back to previous value "${previousValue}".`,
      sourceTerminal: 'Verification Workstation Node #01'
    };

    const revertChangeLogEntry: ChangeLogEntry = {
      id: `CL-REV-${Date.now()}`,
      timestamp: nowIso,
      officerName: isRevenueOfficer ? 'SDM Alok Srivastava' : 'Patwari Rajesh Kumar Sharma',
      role: userRole,
      action: 'FIELD_CORRECTION',
      fieldKey,
      fieldLabel,
      oldValue: currentVal,
      newValue: previousValue,
      reason: 'Reverted to previous verified value',
      remarks: `Restored field "${fieldLabel}" back to previous value "${previousValue}".`,
      sourceTerminal: 'Verification Workstation Node #01'
    };

    updated.modificationHistory = [revertModEntry, ...prevHistory];
    updated.changeLog = [revertChangeLogEntry, ...prevChangeLog];
    updated.validationResults = runAutomatedValidationRules(updated, records);
    onUpdateRecord(updated);
  };

  // One-click sanction
  const handleSanctionAndSign = () => {
    const prevHistory = getRecordModificationHistory(selectedRecord);
    const prevChangeLog = getRecordChangeLog(selectedRecord);
    const sanctionTimestamp = new Date().toISOString();
    const officerDisplayName = isRevenueOfficer ? 'SDM Alok Srivastava' : 'Revenue Official (Tehsildar)';

    const sanctionModEntry: RecordModificationEntry = {
      id: `MOD-SANCT-${Date.now()}`,
      timestamp: sanctionTimestamp,
      userId: isRevenueOfficer ? 'OFF-REV-094' : 'OFF-REV-042',
      userName: officerDisplayName,
      userRole: userRole,
      changeType: 'SANCTION_APPROVAL',
      fieldLabel: 'Record Sanction & Digital Attestation',
      previousValue: selectedRecord.status,
      newValue: 'VERIFIED_AND_SANCTIONED',
      reason: 'Official Statutory Sanction & Revenue Seal',
      notes: 'DSC Electronic Verification Token #GOI-DILRMP-2026 appended. Record sanctioned for LRMS synchronization.',
      digitalSignatureRef: 'DSC-GOI-DILRMP-2026-X77A',
      sourceTerminal: 'Revenue Court Official Portal'
    };

    const sanctionChangeLogEntry: ChangeLogEntry = {
      id: `CL-SANCT-${Date.now()}`,
      timestamp: sanctionTimestamp,
      officerName: officerDisplayName,
      role: userRole,
      action: 'SANCTION_APPROVAL',
      fieldLabel: 'Record Sanction & Digital Attestation',
      oldValue: selectedRecord.status,
      newValue: 'VERIFIED_AND_SANCTIONED',
      reason: 'Official Statutory Sanction & Revenue Seal',
      remarks: 'DSC Electronic Verification Token #GOI-DILRMP-2026 appended. Record sanctioned for LRMS synchronization.',
      digitalSignature: 'DSC-GOI-DILRMP-2026-X77A',
      sourceTerminal: 'Revenue Court Official Portal'
    };

    const updated: ExtractedLandRecord = {
      ...selectedRecord,
      status: 'VERIFIED_AND_SANCTIONED',
      overallConfidence: Math.max(selectedRecord.overallConfidence, 96.5),
      reviewHistory: [
        ...selectedRecord.reviewHistory,
        {
          timestamp: sanctionTimestamp,
          officerName: officerDisplayName,
          role: userRole,
          action: 'Sanctioned & Digitally Signed',
          notes: 'DSC Electronic Verification Token #GOI-DILRMP-2026 appended.'
        }
      ],
      modificationHistory: [sanctionModEntry, ...prevHistory],
      changeLog: [sanctionChangeLogEntry, ...prevChangeLog]
    };

    // Clear flags on validation
    updated.validationResults = updated.validationResults.map(rule => 
      rule.severity === 'WARNING' && rule.category === 'FORMAT'
        ? { ...rule, passed: true, severity: 'INFO', message: 'Verified and approved by Revenue Officer.' }
        : rule
    );

    onUpdateRecord(updated);
    setSanctionSuccessMessage(`Record ${updated.documentNumber} successfully sanctioned and synced to Central DILRMP.`);
    setTimeout(() => setSanctionSuccessMessage(null), 4000);
  };

  // Export XML
  const handleDownloadXml = () => {
    const xml = generateDilrmpXml(selectedRecord);
    const blob = new Blob([xml], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedRecord.documentNumber}_DILRMP.xml`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Helper for confidence color
  const getConfidenceBadge = (confidence: number) => {
    if (confidence >= 88) {
      return (
        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#EAF2EB] text-[#3D5A40] border border-[#BCD4C0]">
          {confidence}% High
        </span>
      );
    }
    if (confidence >= 75) {
      return (
        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#FFF9EA] text-[#8B4513] border border-[#DCD7CE]">
          {confidence}% Fair
        </span>
      );
    }
    return (
      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#FDF0ED] text-[#8B0000] border border-[#F2C2BA] flex items-center gap-1">
        <AlertTriangle className="w-3 h-3" />
        {confidence}% Review
      </span>
    );
  };

  return (
    <div className="space-y-4">
      {/* Top Header & Record Navigation */}
      <div className="bg-[#FAF8F5] rounded-xl border border-[#DCD7CE] p-4 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-[#FFF9EA] text-[#8B4513] border border-[#DCD7CE]">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-base sm:text-lg font-bold text-[#33332A] natural-serif">
                Human-in-the-Loop (HITL) Verification Station
              </h2>
              <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                selectedRecord.status === 'VERIFIED_AND_SANCTIONED'
                  ? 'bg-[#EAF2EB] text-[#3D5A40] border border-[#BCD4C0]'
                  : 'bg-[#FFF9EA] text-[#8B4513] border border-[#DCD7CE]'
              }`}>
                {selectedRecord.status.replace(/_/g, ' ')}
              </span>
            </div>
            <p className="text-xs text-[#6B6B58] font-mono mt-0.5">
              Ref: {selectedRecord.documentNumber} • Source: {selectedRecord.sourceFileName}
            </p>
          </div>
        </div>

        {/* Record Carousel Controls */}
        <div className="flex items-center gap-2">
          <div className="text-xs text-[#6B6B58] mr-2">
            Record <span className="font-bold text-[#33332A]">{currentIndex + 1}</span> of <span className="font-bold text-[#33332A]">{records.length}</span>
          </div>

          <button
            id="btn-prev-record"
            disabled={currentIndex === 0}
            onClick={handlePrevRecord}
            className="p-2 rounded-lg border border-[#DCD7CE] bg-[#F5F3EE] hover:bg-[#EBE7DF] text-[#33332A] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            title="Previous Record"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <button
            id="btn-next-record"
            disabled={currentIndex === records.length - 1}
            onClick={handleNextRecord}
            className="p-2 rounded-lg border border-[#DCD7CE] bg-[#F5F3EE] hover:bg-[#EBE7DF] text-[#33332A] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            title="Next Record"
          >
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            id="btn-modification-history-top"
            onClick={() => setIsHistoryModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#DCD7CE] bg-[#F5F3EE] hover:bg-[#EBE7DF] text-xs font-semibold text-[#33332A] transition-colors cursor-pointer shadow-2xs"
            title="View timestamped modification history log and audit trail"
          >
            <History className="w-3.5 h-3.5 text-[#8B4513]" />
            <span>Modification History</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-[#EBE7DF] text-[#5A5A40] border border-[#DCD7CE]">
              {modificationHistoryList.length}
            </span>
          </button>

          <button
            id="btn-export-xml"
            onClick={handleDownloadXml}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#DCD7CE] bg-[#F5F3EE] hover:bg-[#EBE7DF] text-xs font-semibold text-[#33332A] transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-[#5A5A40]" />
            <span>Export DILRMP XML</span>
          </button>
        </div>
      </div>

      {/* Sanction Success Alert */}
      <AnimatePresence>
        {sanctionSuccessMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-3.5 bg-[#EAF2EB] border border-[#BCD4C0] rounded-xl flex items-center justify-between text-xs text-[#2A402D]"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#3D5A40]" />
              <span className="font-medium">{sanctionSuccessMessage}</span>
            </div>
            <button onClick={() => setSanctionSuccessMessage(null)} className="text-[#3D5A40] hover:text-[#2A402D] cursor-pointer">
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Split-Screen Workspace: Scanned Document Viewer (Left) + Structured Fields (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* LEFT PANE (5 Cols): Scanned Document Canvas */}
        <div className="lg:col-span-5 space-y-3">
          <div className="bg-[#FAF8F5] rounded-xl border border-[#DCD7CE] p-4 shadow-2xs space-y-3">
            {/* Viewer Toolbar */}
            <div className="flex items-center justify-between border-b border-[#DCD7CE] pb-2.5">
              <div className="flex items-center gap-1">
                <span className="text-xs font-bold text-[#33332A] natural-serif">Source Parchment</span>
                <span className="text-[10px] text-[#6B6B58] font-mono">({selectedRecord.script})</span>
              </div>

              <div className="flex items-center gap-1 text-xs">
                {/* Zoom out */}
                <button
                  onClick={() => setZoomLevel(prev => Math.max(prev - 15, 60))}
                  className="p-1 rounded hover:bg-[#EBE7DF] text-[#5A5A40] cursor-pointer"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="text-[11px] font-mono w-10 text-center text-[#33332A]">{zoomLevel}%</span>
                {/* Zoom in */}
                <button
                  onClick={() => setZoomLevel(prev => Math.min(prev + 15, 200))}
                  className="p-1 rounded hover:bg-[#EBE7DF] text-[#5A5A40] cursor-pointer"
                  title="Zoom In"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                {/* Rotate */}
                <button
                  onClick={() => setRotationAngle(prev => (prev + 90) % 360)}
                  className="p-1 rounded hover:bg-[#EBE7DF] text-[#5A5A40] ml-1 cursor-pointer"
                  title="Rotate 90°"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                </button>
                {/* Reset */}
                <button
                  onClick={() => { setZoomLevel(100); setRotationAngle(0); setActiveBoundingBox(null); }}
                  className="text-[10px] text-[#5A5A40] hover:text-[#33332A] ml-1 px-1.5 py-0.5 rounded bg-[#EBE7DF] cursor-pointer"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Document Filter Modes */}
            <div className="flex items-center gap-1.5 text-[11px]">
              <span className="text-[#6B6B58]">Filter:</span>
              {(['normal', 'high_contrast', 'inverted', 'binarized'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setDocumentFilter(mode)}
                  className={`px-2 py-0.5 rounded capitalize transition-colors cursor-pointer ${
                    documentFilter === mode 
                      ? 'bg-[#5A5A40] text-[#FFF9EA] font-semibold' 
                      : 'bg-[#EBE7DF] text-[#4A3728] hover:bg-[#DCD7CE]'
                  }`}
                >
                  {mode.replace('_', ' ')}
                </button>
              ))}
            </div>

            {/* Document Canvas Container */}
            <div className="relative rounded-xl border border-[#DCD7CE] bg-[#363628] overflow-hidden min-h-[460px] max-h-[580px] flex items-center justify-center p-3">
              <div 
                className="relative transition-transform duration-200 max-w-full"
                style={{
                  transform: `scale(${zoomLevel / 100}) rotate(${rotationAngle}deg)`,
                  filter: documentFilter === 'high_contrast' 
                    ? 'contrast(180%) brightness(90%)' 
                    : documentFilter === 'inverted' 
                    ? 'invert(100%)' 
                    : documentFilter === 'binarized'
                    ? 'grayscale(100%) contrast(250%)'
                    : 'none'
                }}
              >
                <img
                  src={selectedRecord.sourceImageUrl}
                  alt="Scanned land record"
                  referrerPolicy="no-referrer"
                  className="rounded shadow-md max-h-[500px] w-auto object-contain pointer-events-none"
                />

                {/* Dynamic Bounding Box Overlay for Selected Field */}
                {activeBoundingBox && (
                  <div
                    className="absolute border-2 border-[#E5C37A] bg-[#E5C37A]/25 rounded shadow-xs animate-pulse pointer-events-none"
                    style={{
                      left: `${activeBoundingBox.x}%`,
                      top: `${activeBoundingBox.y}%`,
                      width: `${activeBoundingBox.width}%`,
                      height: `${activeBoundingBox.height}%`,
                    }}
                  >
                    <span className="absolute -top-4 left-0 bg-[#8B4513] text-[#FFF9EA] font-bold text-[9px] px-1 rounded shadow-xs">
                      ACTIVE FIELD
                    </span>
                  </div>
                )}
              </div>

              {/* Instructions badge */}
              <div className="absolute bottom-2 left-2 bg-[#26261A]/85 backdrop-blur-xs text-[10px] text-[#EBE7DF] px-2 py-1 rounded border border-[#52523C]">
                Click any field on right to highlight coordinates on document
              </div>
            </div>

            {/* Preprocessing Diagnostic Summary */}
            <div className="p-2.5 rounded-lg bg-[#F5F3EE] border border-[#DCD7CE] text-[11px] text-[#5A5A40] flex items-center justify-between">
              <span><span className="natural-serif font-medium">OpenCV Deskew:</span> {selectedRecord.preprocessingMetrics.deskewAngleDegrees}°</span>
              <span><span className="natural-serif font-medium">DPI:</span> {selectedRecord.preprocessingMetrics.dpiEstimated}</span>
              <span><span className="natural-serif font-medium">Filter:</span> {selectedRecord.preprocessingMetrics.binarizationMethod}</span>
            </div>
          </div>
        </div>

        {/* RIGHT PANE (7 Cols): Structured Fields & Verification Form */}
        <div className="lg:col-span-7 space-y-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedRecord.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="bg-[#FAF8F5] rounded-xl border border-[#DCD7CE] p-5 shadow-2xs space-y-4"
            >
              {/* Header with View Tabs & Sanction Button */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 border-b border-[#DCD7CE]">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-sm font-bold text-[#33332A] natural-serif">
                    {stationTab === 'FIELDS' ? 'Extracted Structured Record' : 'Record ChangeLog & Revision Timeline'}
                  </h3>
                  
                  {/* Tab Switcher: Fields vs ChangeLog */}
                  <div className="flex items-center rounded-lg bg-[#EBE7DF] p-0.5 border border-[#DCD7CE]">
                    <button
                      id="tab-btn-fields"
                      type="button"
                      onClick={() => setStationTab('FIELDS')}
                      className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
                        stationTab === 'FIELDS'
                          ? 'bg-[#FAF8F5] text-[#33332A] shadow-2xs'
                          : 'text-[#6B6B58] hover:text-[#33332A]'
                      }`}
                    >
                      <FileCheck className="w-3.5 h-3.5 text-[#5A5A40]" />
                      <span>Data Fields</span>
                    </button>
                    <button
                      id="tab-btn-changelog"
                      type="button"
                      onClick={() => setStationTab('CHANGELOG')}
                      className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
                        stationTab === 'CHANGELOG'
                          ? 'bg-[#FAF8F5] text-[#33332A] shadow-2xs'
                          : 'text-[#6B6B58] hover:text-[#33332A]'
                      }`}
                    >
                      <History className="w-3.5 h-3.5 text-[#8B4513]" />
                      <span>ChangeLog</span>
                      <span className="px-1.5 py-0.2 rounded-full text-[10px] font-extrabold bg-[#EBE7DF] text-[#8B4513] border border-[#DCD7CE]">
                        {changeLogList.length}
                      </span>
                    </button>
                  </div>
                </div>
                <p className="text-xs text-[#6B6B58] mt-0.5">
                  {stationTab === 'FIELDS' 
                    ? 'Standardized Land Administration Data Dictionary & HITL OCR Verification'
                    : 'Auditable chronological ledger of field corrections, encumbrance notes, and sanctions'}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  id="btn-view-history-pane"
                  onClick={() => setIsHistoryModalOpen(true)}
                  className="px-3 py-1.5 rounded-lg border border-[#DCD7CE] bg-[#FAF8F5] hover:bg-[#EBE7DF] text-xs font-semibold text-[#4A3728] transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                  title="Open formal modification history modal"
                >
                  <History className="w-3.5 h-3.5 text-[#8B4513]" />
                  <span>Audit Modal</span>
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-[#EBE7DF] text-[#5A5A40]">
                    {modificationHistoryList.length}
                  </span>
                </button>

                <button
                  id="btn-open-cadastral-map"
                  onClick={onOpenCadastralMap}
                  className="px-3 py-1.5 rounded-lg bg-[#EBE7DF] hover:bg-[#DCD7CE] text-xs font-semibold text-[#4A3728] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#8B4513]" />
                  <span>Cadastral Map</span>
                </button>

                {/* Primary Sanction Button */}
                <button
                  id="btn-sanction-record"
                  onClick={handleSanctionAndSign}
                  className="px-4 py-1.5 rounded-lg bg-natural-olive hover:bg-natural-olive-dark text-[#FFF9EA] text-xs font-bold shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Stamp className="w-4 h-4 text-[#FFF9EA]" />
                  <span>Sanction &amp; Sign</span>
                </button>
              </div>
            </div>

            {/* Quick Audit Bar Strip */}
            <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 rounded-lg bg-[#F5F3EE] border border-[#DCD7CE] text-xs">
              <div className="flex items-center gap-2">
                <History className="w-3.5 h-3.5 text-[#5A5A40]" />
                <span className="text-[#33332A] font-semibold">
                  ChangeLog: <span className="font-bold text-[#8B4513]">{changeLogList.length} historical events</span>
                </span>
                {latestChangeLog && (
                  <span className="hidden sm:inline text-[#6B6B58] font-mono text-[11px]">
                    &bull; Last edit by {latestChangeLog.officerName}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {stationTab === 'FIELDS' ? (
                  <button
                    id="btn-switch-to-timeline-tab"
                    type="button"
                    onClick={() => setStationTab('CHANGELOG')}
                    className="text-xs font-bold text-[#8B4513] hover:text-[#5A2D0C] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>View ChangeLog Timeline</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                ) : (
                  <button
                    id="btn-switch-to-fields-tab"
                    type="button"
                    onClick={() => setStationTab('FIELDS')}
                    className="text-xs font-bold text-[#5A5A40] hover:text-[#33332A] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <ArrowLeft className="w-3 h-3" />
                    <span>Back to Data Fields</span>
                  </button>
                )}
              </div>
            </div>

            {stationTab === 'CHANGELOG' ? (
              <div className="pt-1">
                <RecordChangeLogTimeline
                  record={selectedRecord}
                  userRole={userRole}
                  onUpdateRecord={onUpdateRecord}
                  onSelectFieldToEdit={(fKey) => {
                    setStationTab('FIELDS');
                    handleStartEdit(fKey, '');
                  }}
                />
              </div>
            ) : (
              <>

            {/* Modified Fields Summary Banner (Surfaces when manual corrections exist) */}
            <ModifiedFieldsSummaryBanner 
              record={selectedRecord} 
              onFocusField={(fKey) => {
                const val = (selectedRecord as any)[fKey]?.value ?? '';
                const bb = (selectedRecord as any)[fKey]?.boundingBox;
                handleStartEdit(fKey, String(val), bb);
              }} 
            />

            {/* Section 1: Administrative Hierarchy */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-[#5A5A40] uppercase tracking-wider flex items-center gap-1 natural-serif">
                <Building className="w-3 h-3" />
                Administrative Hierarchy
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3 rounded-lg bg-[#F5F3EE] border border-[#DCD7CE] text-xs">
                <div>
                  <span className="text-[#6B6B58] block text-[10px] natural-serif font-semibold">State</span>
                  <span className="font-bold text-[#33332A]">{selectedRecord.state.value}</span>
                </div>
                <div>
                  <span className="text-[#6B6B58] block text-[10px] natural-serif font-semibold">District</span>
                  <span className="font-bold text-[#33332A]">{selectedRecord.district.value}</span>
                </div>
                <div>
                  <span className="text-[#6B6B58] block text-[10px] natural-serif font-semibold">Tehsil / Taluka</span>
                  <span className="font-bold text-[#33332A]">{selectedRecord.tehsil.value}</span>
                </div>
                <div>
                  <span className="text-[#6B6B58] block text-[10px] natural-serif font-semibold">Village (Mauza)</span>
                  <span className="font-bold text-[#33332A]">{selectedRecord.village.value}</span>
                </div>
              </div>
            </div>

            {/* Section 2: Core Cadastral Identifiers (Editable) */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-[#5A5A40] uppercase tracking-wider flex items-center gap-1 natural-serif">
                <Layers className="w-3 h-3" />
                Cadastral Identifiers &amp; Area
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Khasra / Survey Number */}
                <div 
                  onClick={() => selectedRecord.khasraNumber.boundingBox && setActiveBoundingBox(selectedRecord.khasraNumber.boundingBox)}
                  className="p-3 rounded-lg border border-[#DCD7CE] bg-[#FAF8F5] hover:border-[#8B4513] transition-all cursor-pointer relative shadow-2xs"
                >
                  <div className="flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[#5A5A40] font-medium natural-serif">Khasra / Gat No.</span>
                      <ValidationRuleTooltip fieldKey="khasraNumber" record={selectedRecord} showBadge align="left" />
                      <PreviousValueIndicator 
                        fieldKey="khasraNumber" 
                        record={selectedRecord} 
                        size="xs"
                        onRevert={(pVal) => handleRevertField('khasraNumber', pVal)} 
                      />
                    </div>
                    {getConfidenceBadge(selectedRecord.khasraNumber.confidence)}
                  </div>

                  {editingFieldKey === 'khasraNumber' ? (
                    <div className="mt-1 space-y-1.5" onClick={(e) => e.stopPropagation()}>
                      <ActiveEditPreviousValueBanner 
                        fieldKey="khasraNumber" 
                        record={selectedRecord} 
                        onRestore={(val) => setFieldEditValue(val)} 
                      />
                      <div className="flex items-center gap-1">
                        <input
                          id="input-edit-khasra-number"
                          type="text"
                          value={fieldEditValue}
                          onChange={(e) => setFieldEditValue(e.target.value)}
                          placeholder="e.g. 142/1"
                          className="text-xs font-bold border border-[#DCD7CE] rounded px-1.5 py-1 w-full bg-[#FAF8F5] text-[#33332A] focus:outline-hidden focus:ring-1 focus:ring-[#8B4513]"
                          autoFocus
                        />
                        <ValidationRuleTooltip fieldKey="khasraNumber" record={selectedRecord} size="sm" align="right" />
                        <button 
                          id="btn-save-khasra"
                          onClick={() => handleSaveEdit('khasraNumber', 'Khasra Number')} 
                          className="p-1.5 bg-[#EAF2EB] hover:bg-[#BCD4C0] text-[#3D5A40] rounded cursor-pointer transition-colors"
                          title="Save Khasra Number"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => setEditingFieldKey(null)} 
                          className="p-1.5 bg-[#FAF8F5] hover:bg-[#EBE7DF] text-[#6B6B58] rounded cursor-pointer transition-colors"
                          title="Cancel"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <InputGuidanceBanner fieldKey="khasraNumber" currentValue={fieldEditValue} record={selectedRecord} />
                    </div>
                  ) : (
                    <div className="mt-1 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="text-base font-bold text-[#33332A] natural-serif">{selectedRecord.khasraNumber.value}</span>
                      </div>
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleStartEdit('khasraNumber', selectedRecord.khasraNumber.value, selectedRecord.khasraNumber.boundingBox); }}
                        className="p-1 text-[#6B6B58] hover:text-[#8B4513] cursor-pointer"
                        title="Edit Khasra Number"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                  <span className="text-[10px] text-[#6B6B58] block mt-0.5"><span className="natural-serif font-medium">Raw:</span> {selectedRecord.khasraNumber.rawText || 'N/A'}</span>
                </div>

                {/* Khata / Khatauni Number */}
                <div 
                  onClick={() => selectedRecord.khataNumber.boundingBox && setActiveBoundingBox(selectedRecord.khataNumber.boundingBox)}
                  className="p-3 rounded-lg border border-[#DCD7CE] bg-[#FAF8F5] hover:border-[#8B4513] transition-all cursor-pointer shadow-2xs"
                >
                  <div className="flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[#5A5A40] font-medium natural-serif">Khata / Khatauni</span>
                      <ValidationRuleTooltip fieldKey="khataNumber" record={selectedRecord} showBadge align="center" />
                      <PreviousValueIndicator 
                        fieldKey="khataNumber" 
                        record={selectedRecord} 
                        size="xs"
                        onRevert={(pVal) => handleRevertField('khataNumber', pVal)} 
                      />
                    </div>
                    {getConfidenceBadge(selectedRecord.khataNumber.confidence)}
                  </div>

                  {editingFieldKey === 'khataNumber' ? (
                    <div className="mt-1 space-y-1.5" onClick={(e) => e.stopPropagation()}>
                      <ActiveEditPreviousValueBanner 
                        fieldKey="khataNumber" 
                        record={selectedRecord} 
                        onRestore={(val) => setFieldEditValue(val)} 
                      />
                      <div className="flex items-center gap-1">
                        <input
                          id="input-edit-khata-number"
                          type="text"
                          value={fieldEditValue}
                          onChange={(e) => setFieldEditValue(e.target.value)}
                          placeholder="e.g. 882"
                          className="text-xs font-bold border border-[#DCD7CE] rounded px-1.5 py-1 w-full bg-[#FAF8F5] text-[#33332A] focus:outline-hidden focus:ring-1 focus:ring-[#8B4513]"
                          autoFocus
                        />
                        <ValidationRuleTooltip fieldKey="khataNumber" record={selectedRecord} size="sm" align="right" />
                        <button 
                          id="btn-save-khata"
                          onClick={() => handleSaveEdit('khataNumber', 'Khata Number')} 
                          className="p-1.5 bg-[#EAF2EB] hover:bg-[#BCD4C0] text-[#3D5A40] rounded cursor-pointer transition-colors"
                          title="Save Khata Number"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => setEditingFieldKey(null)} 
                          className="p-1.5 bg-[#FAF8F5] hover:bg-[#EBE7DF] text-[#6B6B58] rounded cursor-pointer transition-colors"
                          title="Cancel"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <InputGuidanceBanner fieldKey="khataNumber" currentValue={fieldEditValue} record={selectedRecord} />
                    </div>
                  ) : (
                    <div className="mt-1 flex items-center justify-between">
                      <span className="text-base font-bold text-[#33332A] natural-serif">{selectedRecord.khataNumber.value}</span>
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleStartEdit('khataNumber', selectedRecord.khataNumber.value, selectedRecord.khataNumber.boundingBox); }}
                        className="p-1 text-[#6B6B58] hover:text-[#8B4513] cursor-pointer"
                        title="Edit Khata Number"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                  <span className="text-[10px] text-[#6B6B58] block mt-0.5"><span className="natural-serif font-medium">Sub-division:</span> {selectedRecord.subDivisionNumber?.value || '0'}</span>
                </div>

                {/* Total Area Declared */}
                <div 
                  onClick={() => selectedRecord.totalAreaDeclared.boundingBox && setActiveBoundingBox(selectedRecord.totalAreaDeclared.boundingBox)}
                  className="p-3 rounded-lg border border-[#DCD7CE] bg-[#FAF8F5] hover:border-[#8B4513] transition-all cursor-pointer shadow-2xs"
                >
                  <div className="flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[#5A5A40] font-medium natural-serif">Declared Area</span>
                      <ValidationRuleTooltip fieldKey="totalAreaDeclared" record={selectedRecord} showBadge align="right" />
                      <PreviousValueIndicator 
                        fieldKey="totalAreaDeclared" 
                        record={selectedRecord} 
                        size="xs"
                        onRevert={(pVal) => handleRevertField('totalAreaDeclared', pVal)} 
                      />
                    </div>
                    {getConfidenceBadge(selectedRecord.totalAreaDeclared.confidence)}
                  </div>

                  {editingFieldKey === 'totalAreaDeclared' ? (
                    <div className="mt-1 space-y-1.5" onClick={(e) => e.stopPropagation()}>
                      <ActiveEditPreviousValueBanner 
                        fieldKey="totalAreaDeclared" 
                        record={selectedRecord} 
                        onRestore={(val) => setFieldEditValue(val)} 
                      />
                      <div className="flex items-center gap-1">
                        <input
                          id="input-edit-total-area"
                          type="text"
                          value={fieldEditValue}
                          onChange={(e) => setFieldEditValue(e.target.value)}
                          placeholder="e.g. 1.42"
                          className="text-xs font-bold border border-[#DCD7CE] rounded px-1.5 py-1 w-full bg-[#FAF8F5] text-[#33332A] focus:outline-hidden focus:ring-1 focus:ring-[#8B4513]"
                          autoFocus
                        />
                        <ValidationRuleTooltip fieldKey="totalAreaDeclared" record={selectedRecord} size="sm" align="right" />
                        <button 
                          id="btn-save-total-area"
                          onClick={() => handleSaveEdit('totalAreaDeclared', 'Total Area')} 
                          className="p-1.5 bg-[#EAF2EB] hover:bg-[#BCD4C0] text-[#3D5A40] rounded cursor-pointer transition-colors"
                          title="Save Area"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => setEditingFieldKey(null)} 
                          className="p-1.5 bg-[#FAF8F5] hover:bg-[#EBE7DF] text-[#6B6B58] rounded cursor-pointer transition-colors"
                          title="Cancel"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <InputGuidanceBanner fieldKey="totalAreaDeclared" currentValue={fieldEditValue} record={selectedRecord} />
                    </div>
                  ) : (
                    <div className="mt-1 flex items-center justify-between">
                      <span className="text-base font-bold text-[#33332A] natural-serif">
                        {selectedRecord.totalAreaDeclared.value} {selectedRecord.declaredUnit.value.toLowerCase()}
                      </span>
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleStartEdit('totalAreaDeclared', String(selectedRecord.totalAreaDeclared.value), selectedRecord.totalAreaDeclared.boundingBox); }}
                        className="p-1 text-[#6B6B58] hover:text-[#8B4513] cursor-pointer"
                        title="Edit Declared Area"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                  <span className="text-[10px] text-[#6B6B58] block mt-0.5">
                    = {selectedRecord.normalizedAreaSqMeters.toLocaleString()} sq. meters
                  </span>
                </div>
              </div>
            </div>

            {/* Section 3: Ownership Details & Co-Sharers */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-[#5A5A40] uppercase tracking-wider flex items-center gap-1 natural-serif">
                  <User className="w-3 h-3" />
                  Ownership &amp; Co-Sharers ({selectedRecord.coSharers?.length || 1})
                </span>
                <ValidationRuleTooltip fieldKey="coSharers" record={selectedRecord} showBadge align="right" />
              </div>

              <div 
                onClick={() => selectedRecord.primaryOwnerName.boundingBox && setActiveBoundingBox(selectedRecord.primaryOwnerName.boundingBox)}
                className="p-3 rounded-lg border border-[#DCD7CE] bg-[#F5F3EE] hover:border-[#8B4513] transition-all cursor-pointer shadow-2xs"
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[#5A5A40] font-medium natural-serif">Primary Landowner (खातेदार)</span>
                    <ValidationRuleTooltip fieldKey="primaryOwnerName" record={selectedRecord} showBadge align="left" />
                    <PreviousValueIndicator 
                      fieldKey="primaryOwnerName" 
                      record={selectedRecord} 
                      size="xs"
                      onRevert={(pVal) => handleRevertField('primaryOwnerName', pVal)} 
                    />
                  </div>
                  {getConfidenceBadge(selectedRecord.primaryOwnerName.confidence)}
                </div>

                {editingFieldKey === 'primaryOwnerName' ? (
                  <div className="mt-2 space-y-2" onClick={(e) => e.stopPropagation()}>
                    <ActiveEditPreviousValueBanner 
                      fieldKey="primaryOwnerName" 
                      record={selectedRecord} 
                      onRestore={(val) => setFieldEditValue(val)} 
                    />
                    <div className="flex items-center gap-1.5">
                      <input
                        id="input-edit-primary-owner"
                        type="text"
                        value={fieldEditValue}
                        onChange={(e) => setFieldEditValue(e.target.value)}
                        placeholder="e.g. Tukaram Eknath Patil"
                        className="text-xs font-bold border border-[#DCD7CE] rounded px-2 py-1 w-full bg-[#FAF8F5] text-[#33332A] focus:outline-hidden focus:ring-1 focus:ring-[#8B4513]"
                        autoFocus
                      />
                      <ValidationRuleTooltip fieldKey="primaryOwnerName" record={selectedRecord} size="sm" align="right" />
                    </div>
                    <InputGuidanceBanner fieldKey="primaryOwnerName" currentValue={fieldEditValue} record={selectedRecord} />
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <select
                        value={correctionReason}
                        onChange={(e) => setCorrectionReason(e.target.value)}
                        className="text-[11px] border border-[#DCD7CE] rounded p-1 bg-[#FAF8F5] text-[#33332A]"
                      >
                        <option value="CHARACTER_ERROR">Correction Reason: Character / Ink Glitch</option>
                        <option value="LANGUAGE_TRANSLITERATION">Script Transliteration Discrepancy</option>
                        <option value="NUMERIC_CONFUSION">Numeric Confusion</option>
                      </select>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => setEditingFieldKey(null)}
                          className="px-2 py-1 bg-[#FAF8F5] hover:bg-[#EBE7DF] text-[#6B6B58] text-xs font-semibold rounded cursor-pointer transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          id="btn-save-primary-owner"
                          onClick={() => handleSaveEdit('primaryOwnerName', 'Primary Owner Name')}
                          className="px-2.5 py-1 bg-natural-olive hover:bg-natural-olive-dark text-[#FFF9EA] text-xs font-semibold rounded cursor-pointer shadow-xs transition-colors"
                        >
                          Save Correction
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="mt-1 flex items-center justify-between">
                    <div>
                      <span className="text-sm font-bold text-[#33332A] block natural-serif">{selectedRecord.primaryOwnerName.value}</span>
                      <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                        <span className="text-xs text-[#6B6B58] font-medium">{selectedRecord.parentageOrSpouse.value}</span>
                        <ValidationRuleTooltip fieldKey="parentageOrSpouse" record={selectedRecord} align="left" size="sm" />
                        <PreviousValueIndicator 
                          fieldKey="parentageOrSpouse" 
                          record={selectedRecord} 
                          size="xs"
                          onRevert={(pVal) => handleRevertField('parentageOrSpouse', pVal)} 
                        />
                        <button
                          onClick={(e) => { e.stopPropagation(); handleStartEdit('parentageOrSpouse', selectedRecord.parentageOrSpouse.value); }}
                          className="p-0.5 text-[#6B6B58] hover:text-[#8B4513] cursor-pointer"
                          title="Edit Parentage / Spouse"
                        >
                          <Edit3 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleStartEdit('primaryOwnerName', selectedRecord.primaryOwnerName.value, selectedRecord.primaryOwnerName.boundingBox); }}
                      className="p-1 text-[#6B6B58] hover:text-[#8B4513] cursor-pointer"
                      title="Edit Primary Owner Name"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                {/* Parentage Inline Edit Mode */}
                {editingFieldKey === 'parentageOrSpouse' && (
                  <div className="mt-2.5 p-2.5 bg-[#FAF8F5] border border-[#DCD7CE] rounded-lg space-y-2" onClick={(e) => e.stopPropagation()}>
                    <ActiveEditPreviousValueBanner 
                      fieldKey="parentageOrSpouse" 
                      record={selectedRecord} 
                      onRestore={(val) => setFieldEditValue(val)} 
                    />
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-[#5A5A40] uppercase tracking-wider natural-serif">
                        Edit Parentage / Spouse Relationship:
                      </span>
                      <ValidationRuleTooltip fieldKey="parentageOrSpouse" record={selectedRecord} size="sm" align="right" />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <input
                        id="input-edit-parentage"
                        type="text"
                        value={fieldEditValue}
                        onChange={(e) => setFieldEditValue(e.target.value)}
                        placeholder="e.g. Eknath Vitthal Patil (Father)"
                        className="text-xs font-bold border border-[#DCD7CE] rounded px-2 py-1 w-full bg-[#FAF8F5] text-[#33332A] focus:outline-hidden focus:ring-1 focus:ring-[#8B4513]"
                        autoFocus
                      />
                      <button 
                        id="btn-save-parentage"
                        onClick={() => handleSaveEdit('parentageOrSpouse', 'Parentage / Spouse')} 
                        className="p-1.5 bg-[#EAF2EB] hover:bg-[#BCD4C0] text-[#3D5A40] rounded cursor-pointer transition-colors"
                        title="Save Parentage"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => setEditingFieldKey(null)} 
                        className="p-1.5 bg-[#FAF8F5] hover:bg-[#EBE7DF] text-[#6B6B58] rounded cursor-pointer transition-colors"
                        title="Cancel"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <InputGuidanceBanner fieldKey="parentageOrSpouse" currentValue={fieldEditValue} record={selectedRecord} />
                  </div>
                )}
              </div>

              {/* Co-sharers List */}
              {selectedRecord.coSharers && selectedRecord.coSharers.length > 0 && (
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-[#5A5A40] font-medium natural-serif">Co-Sharer Entitlements (Hissa Division):</span>
                    <span className="text-[10px] text-[#6B6B58]">Tolerance: &plusmn;5 sq.m</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedRecord.coSharers.map((cs) => (
                      <div key={cs.id} className="p-2.5 rounded-lg border border-[#DCD7CE] bg-[#FAF8F5] text-xs flex items-center justify-between">
                        <div>
                          <span className="font-semibold text-[#33332A] block">{cs.name}</span>
                          <span className="text-[10px] text-[#6B6B58]">{cs.relation}</span>
                        </div>
                        <div className="text-right">
                          <span className="font-bold text-[#33332A] block">{cs.shareFraction}</span>
                          <span className="text-[10px] text-[#6B6B58] font-mono">{cs.shareAreaSqMeters.toLocaleString()} sq.m</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Section 4: Land Classification & Encumbrances */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {/* Land Classification Card */}
              <div className="p-3 rounded-lg border border-[#DCD7CE] bg-[#FAF8F5]">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] text-[#5A5A40] uppercase font-bold natural-serif">Land Classification</span>
                    <ValidationRuleTooltip fieldKey="landClassification" record={selectedRecord} showBadge align="left" />
                    <PreviousValueIndicator 
                      fieldKey="landClassification" 
                      record={selectedRecord} 
                      size="xs"
                      onRevert={(pVal) => handleRevertField('landClassification', pVal)} 
                    />
                  </div>
                  {getConfidenceBadge(selectedRecord.landClassification.confidence)}
                </div>

                {editingFieldKey === 'landClassification' ? (
                  <div className="mt-1 space-y-1.5" onClick={(e) => e.stopPropagation()}>
                    <ActiveEditPreviousValueBanner 
                      fieldKey="landClassification" 
                      record={selectedRecord} 
                      onRestore={(val) => setFieldEditValue(val)} 
                    />
                    <div className="flex items-center gap-1">
                      <select
                        id="input-edit-land-classification"
                        value={fieldEditValue}
                        onChange={(e) => setFieldEditValue(e.target.value)}
                        className="text-xs font-bold border border-[#DCD7CE] rounded px-1.5 py-1 w-full bg-[#FAF8F5] text-[#33332A] focus:outline-hidden focus:ring-1 focus:ring-[#8B4513]"
                        autoFocus
                      >
                        <option value="AGRICULTURAL">AGRICULTURAL</option>
                        <option value="RESIDENTIAL_NA">RESIDENTIAL_NA</option>
                        <option value="COMMERCIAL_NA">COMMERCIAL_NA</option>
                        <option value="INDUSTRIAL">INDUSTRIAL</option>
                        <option value="FOREST">FOREST</option>
                        <option value="GOVERNMENT">GOVERNMENT</option>
                      </select>
                      <ValidationRuleTooltip fieldKey="landClassification" record={selectedRecord} size="sm" align="right" />
                      <button 
                        id="btn-save-classification"
                        onClick={() => handleSaveEdit('landClassification', 'Land Classification')} 
                        className="p-1.5 bg-[#EAF2EB] hover:bg-[#BCD4C0] text-[#3D5A40] rounded cursor-pointer transition-colors"
                        title="Save Classification"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => setEditingFieldKey(null)} 
                        className="p-1.5 bg-[#FAF8F5] hover:bg-[#EBE7DF] text-[#6B6B58] rounded cursor-pointer transition-colors"
                        title="Cancel"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <InputGuidanceBanner fieldKey="landClassification" currentValue={fieldEditValue} record={selectedRecord} />
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#33332A] block">{selectedRecord.landClassification.value}</span>
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleStartEdit('landClassification', selectedRecord.landClassification.value); }}
                      className="p-1 text-[#6B6B58] hover:text-[#8B4513] cursor-pointer"
                      title="Edit Land Classification"
                    >
                      <Edit3 className="w-3 h-3" />
                    </button>
                  </div>
                )}
                <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                  <span className="text-[11px] text-[#6B6B58]"><span className="natural-serif font-medium">Irrigation:</span> {selectedRecord.irrigationSource?.value || 'Rainfed'}</span>
                  <PreviousValueIndicator 
                    fieldKey="irrigationSource" 
                    record={selectedRecord} 
                    size="xs"
                    onRevert={(pVal) => handleRevertField('irrigationSource', pVal)} 
                  />
                </div>
              </div>

              {/* Encumbrance & Revenue Card */}
              <div className="p-3 rounded-lg border border-[#DCD7CE] bg-[#FAF8F5]">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] text-[#5A5A40] uppercase font-bold natural-serif">Encumbrance &amp; Revenue</span>
                    <ValidationRuleTooltip fieldKey="encumbranceStatus" record={selectedRecord} showBadge align="right" />
                    <PreviousValueIndicator 
                      fieldKey="encumbranceStatus" 
                      record={selectedRecord} 
                      size="xs"
                      onRevert={(pVal) => handleRevertField('encumbranceStatus', pVal)} 
                    />
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] text-[#6B6B58] natural-serif font-medium">Lagaan:</span>
                    <ValidationRuleTooltip fieldKey="annualLandRevenue" record={selectedRecord} align="right" />
                    <PreviousValueIndicator 
                      fieldKey="annualLandRevenue" 
                      record={selectedRecord} 
                      size="xs"
                      onRevert={(pVal) => handleRevertField('annualLandRevenue', pVal)} 
                    />
                  </div>
                </div>

                {/* Encumbrance Editing */}
                {editingFieldKey === 'encumbranceStatus' ? (
                  <div className="mt-1 space-y-1.5 mb-2" onClick={(e) => e.stopPropagation()}>
                    <ActiveEditPreviousValueBanner 
                      fieldKey="encumbranceStatus" 
                      record={selectedRecord} 
                      onRestore={(val) => setFieldEditValue(val)} 
                    />
                    <div className="flex items-center gap-1">
                      <select
                        id="input-edit-encumbrance-status"
                        value={fieldEditValue}
                        onChange={(e) => setFieldEditValue(e.target.value)}
                        className="text-xs font-bold border border-[#DCD7CE] rounded px-1.5 py-1 w-full bg-[#FAF8F5] text-[#33332A] focus:outline-hidden focus:ring-1 focus:ring-[#8B4513]"
                        autoFocus
                      >
                        <option value="CLEAR">CLEAR</option>
                        <option value="MORTGAGED">MORTGAGED</option>
                        <option value="DISPUTED">DISPUTED</option>
                        <option value="COURT_STAY">COURT_STAY</option>
                        <option value="RESTRICTED_TENURE">RESTRICTED_TENURE</option>
                      </select>
                      <ValidationRuleTooltip fieldKey="encumbranceStatus" record={selectedRecord} size="sm" align="right" />
                      <button 
                        id="btn-save-encumbrance"
                        onClick={() => handleSaveEdit('encumbranceStatus', 'Encumbrance Status')} 
                        className="p-1.5 bg-[#EAF2EB] hover:bg-[#BCD4C0] text-[#3D5A40] rounded cursor-pointer transition-colors"
                        title="Save Encumbrance"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => setEditingFieldKey(null)} 
                        className="p-1.5 bg-[#FAF8F5] hover:bg-[#EBE7DF] text-[#6B6B58] rounded cursor-pointer transition-colors"
                        title="Cancel"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <InputGuidanceBanner fieldKey="encumbranceStatus" currentValue={fieldEditValue} record={selectedRecord} />
                  </div>
                ) : editingFieldKey === 'annualLandRevenue' ? (
                  <div className="mt-1 space-y-1.5 mb-2" onClick={(e) => e.stopPropagation()}>
                    <ActiveEditPreviousValueBanner 
                      fieldKey="annualLandRevenue" 
                      record={selectedRecord} 
                      onRestore={(val) => setFieldEditValue(val)} 
                    />
                    <div className="flex items-center gap-1">
                      <input
                        id="input-edit-annual-revenue"
                        type="number"
                        step="0.5"
                        value={fieldEditValue}
                        onChange={(e) => setFieldEditValue(e.target.value)}
                        placeholder="e.g. 14.50"
                        className="text-xs font-bold border border-[#DCD7CE] rounded px-1.5 py-1 w-full bg-[#FAF8F5] text-[#33332A] focus:outline-hidden focus:ring-1 focus:ring-[#8B4513]"
                        autoFocus
                      />
                      <ValidationRuleTooltip fieldKey="annualLandRevenue" record={selectedRecord} size="sm" align="right" />
                      <button 
                        id="btn-save-revenue"
                        onClick={() => handleSaveEdit('annualLandRevenue', 'Annual Land Revenue')} 
                        className="p-1.5 bg-[#EAF2EB] hover:bg-[#BCD4C0] text-[#3D5A40] rounded cursor-pointer transition-colors"
                        title="Save Revenue"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => setEditingFieldKey(null)} 
                        className="p-1.5 bg-[#FAF8F5] hover:bg-[#EBE7DF] text-[#6B6B58] rounded cursor-pointer transition-colors"
                        title="Cancel"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <InputGuidanceBanner fieldKey="annualLandRevenue" currentValue={fieldEditValue} record={selectedRecord} />
                  </div>
                ) : (
                  <div className="flex items-center justify-between gap-1.5">
                    <div className="flex items-center gap-1.5">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                        selectedRecord.encumbranceStatus.value === 'CLEAR'
                          ? 'bg-[#EAF2EB] text-[#3D5A40] border border-[#BCD4C0]'
                          : 'bg-[#FFF9EA] text-[#8B4513] border border-[#DCD7CE]'
                      }`}>
                        {selectedRecord.encumbranceStatus.value}
                      </span>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleStartEdit('encumbranceStatus', selectedRecord.encumbranceStatus.value); }}
                        className="p-0.5 text-[#6B6B58] hover:text-[#8B4513] cursor-pointer"
                        title="Edit Encumbrance"
                      >
                        <Edit3 className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-semibold text-[#33332A]">
                        <span className="natural-serif font-medium">Lagaan:</span> ₹{selectedRecord.annualLandRevenue.value}
                      </span>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleStartEdit('annualLandRevenue', String(selectedRecord.annualLandRevenue.value)); }}
                        className="p-0.5 text-[#6B6B58] hover:text-[#8B4513] cursor-pointer"
                        title="Edit Lagaan"
                      >
                        <Edit3 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                )}

                {selectedRecord.bankLienDetails && (
                  <span className="text-[10px] text-[#4A3728] bg-[#FFF9EA] p-1 rounded border border-[#DCD7CE] block mt-1">
                    {selectedRecord.bankLienDetails}
                  </span>
                )}
              </div>
            </div>

            {/* Section 5: Cadastral Boundaries */}
            {selectedRecord.boundaries && (
              <div className="p-3 rounded-lg bg-[#F5F3EE] border border-[#DCD7CE] text-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-[#5A5A40] uppercase tracking-wider block natural-serif">
                    Cadastral Abutting Boundaries (चौहद्दी)
                  </span>
                  <ValidationRuleTooltip fieldKey="boundaries" record={selectedRecord} showBadge align="right" />
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div><span className="font-semibold text-[#33332A] natural-serif">North:</span> {selectedRecord.boundaries.north}</div>
                  <div><span className="font-semibold text-[#33332A] natural-serif">South:</span> {selectedRecord.boundaries.south}</div>
                  <div><span className="font-semibold text-[#33332A] natural-serif">East:</span> {selectedRecord.boundaries.east}</div>
                  <div><span className="font-semibold text-[#33332A] natural-serif">West:</span> {selectedRecord.boundaries.west}</div>
                </div>
              </div>
            )}

            {/* Section 6: Automated Rule Audit Results */}
            <div className="space-y-2 pt-1">
              <span className="text-[11px] font-bold text-[#5A5A40] uppercase tracking-wider flex items-center gap-1 natural-serif">
                <ShieldCheck className="w-3 h-3" />
                Validation Rule Check Outcomes ({selectedRecord.validationResults?.length || 0})
              </span>

              <div className="space-y-1.5">
                {selectedRecord.validationResults?.map((rule) => {
                  const isPassed = rule.passed;
                  return (
                    <div
                      key={rule.ruleId}
                      className={`p-2.5 rounded-lg border text-xs flex items-start gap-2.5 ${
                        isPassed 
                          ? 'bg-[#EAF2EB] border-[#BCD4C0] text-[#2A402D]'
                          : rule.severity === 'CRITICAL'
                          ? 'bg-[#FDF0ED] border-[#F2C2BA] text-[#8B0000]'
                          : 'bg-[#FFF9EA] border-[#DCD7CE] text-[#4A3728]'
                      }`}
                    >
                      {isPassed ? (
                        <CheckCircle2 className="w-4 h-4 text-[#3D5A40] shrink-0 mt-0.5" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-[#8B0000] shrink-0 mt-0.5" />
                      )}
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold">{rule.ruleName}</span>
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-white/60 font-mono">
                            {rule.ruleId}
                          </span>
                        </div>
                        <p className="text-[11px] mt-0.5 opacity-90">{rule.message}</p>
                        {rule.details && (
                          <p className="text-[10px] text-[#6B6B58] mt-0.5 italic">{rule.details}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Section 7: ChangeLog & Prior Edits Timeline */}
            <div className="space-y-3 pt-3 border-t border-[#DCD7CE]">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-[#5A5A40] uppercase tracking-wider flex items-center gap-1.5 natural-serif">
                  <History className="w-3.5 h-3.5 text-[#8B4513]" />
                  Land Record ChangeLog &amp; Prior Edits ({changeLogList.length})
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setStationTab('CHANGELOG')}
                    className="text-xs font-bold text-[#8B4513] hover:text-[#5A2D0C] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Full Tab View</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsTimelineSectionExpanded(!isTimelineSectionExpanded)}
                    className="p-1 rounded hover:bg-[#EBE7DF] text-[#6B6B58] hover:text-[#33332A] cursor-pointer"
                    title={isTimelineSectionExpanded ? 'Collapse ChangeLog' : 'Expand ChangeLog'}
                  >
                    {isTimelineSectionExpanded ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {isTimelineSectionExpanded && (
                <div className="bg-[#F5F3EE] rounded-lg border border-[#DCD7CE] p-3">
                  <RecordChangeLogTimeline
                    record={selectedRecord}
                    userRole={userRole}
                    onUpdateRecord={onUpdateRecord}
                    onSelectFieldToEdit={(fKey) => {
                      handleStartEdit(fKey, '');
                    }}
                    isInline={true}
                  />
                </div>
              )}
            </div>
            </>
            )}
          </motion.div>
        </AnimatePresence>
        </div>
      </div>

      {/* Modification History Modal */}
      <ModificationHistoryModal
        isOpen={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
        record={selectedRecord}
        userRole={userRole}
        onAddModification={handleAddModification}
      />
    </div>
  );
};
