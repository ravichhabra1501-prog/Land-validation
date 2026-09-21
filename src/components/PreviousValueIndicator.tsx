import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  RotateCcw, 
  History, 
  ArrowRight, 
  User, 
  Clock, 
  Check, 
  X, 
  FileEdit, 
  AlertCircle,
  HelpCircle,
  Info
} from 'lucide-react';
import { ExtractedLandRecord, RecordModificationEntry, ChangeLogEntry } from '../types';
import { getRecordModificationHistory, formatAuditTimestamp } from '../utils/modificationHistoryUtils';
import { getRecordChangeLog } from '../utils/changeLogUtils';

export interface FieldModificationInfo {
  isModified: boolean;
  fieldKey: string;
  fieldLabel: string;
  previousValue: string;
  currentValue: string;
  originalOcrValue?: string;
  officerName: string;
  officerRole: string;
  timestamp?: string;
  formattedTimestamp: string;
  relativeTime: string;
  reason: string;
  remarks?: string;
  changeType: string;
}

/**
 * Known human-readable labels for fields in a land record
 */
export const FIELD_LABELS: Record<string, string> = {
  khasraNumber: 'Khasra / Survey Number',
  khataNumber: 'Khata / Khatauni Number',
  subDivisionNumber: 'Sub-division Number',
  primaryOwnerName: 'Primary Landowner Name',
  parentageOrSpouse: 'Parentage / Spouse Relationship',
  totalAreaDeclared: 'Total Declared Area',
  landClassification: 'Land Classification',
  irrigationSource: 'Irrigation Remarks',
  encumbranceStatus: 'Encumbrance / Mortgage Status',
  annualLandRevenue: 'Annual Land Revenue (Lagaan)',
  boundaries: 'Cadastral Boundaries'
};

/**
 * Checks whether a given field has been modified during the manual verification process
 * and retrieves its previous value and audit trail context.
 */
export function getFieldModificationInfo(
  record: ExtractedLandRecord,
  fieldKey: string
): FieldModificationInfo | null {
  if (!record) return null;

  const fieldObj = (record as any)[fieldKey];
  let directPrev: string | undefined = undefined;
  let directCurrent: string | undefined = undefined;
  let origOcrVal: string | undefined = undefined;

  if (fieldObj && typeof fieldObj === 'object') {
    if (fieldObj.previousValue !== undefined && fieldObj.previousValue !== null) {
      directPrev = String(fieldObj.previousValue);
      directCurrent = String(fieldObj.value);
    }
    if (fieldObj.originalExtractedValue !== undefined && fieldObj.originalExtractedValue !== null) {
      origOcrVal = String(fieldObj.originalExtractedValue);
      if (!directPrev && String(fieldObj.originalExtractedValue) !== String(fieldObj.value)) {
        directPrev = String(fieldObj.originalExtractedValue);
        directCurrent = String(fieldObj.value);
      }
    }
  }

  // Inspect chronological changeLog and modificationHistory
  const modHistory = getRecordModificationHistory(record);
  const changeLog = getRecordChangeLog(record);

  // Look for modification history entry matching this field
  const modEntry = modHistory.find(
    (m) =>
      m.fieldKey === fieldKey &&
      (m.changeType === 'FIELD_CORRECTION' || m.changeType === 'ENCUMBRANCE_UPDATE') &&
      m.previousValue &&
      m.previousValue !== m.newValue
  );

  // Look for change log entry matching this field
  const clEntry = changeLog.find(
    (c) =>
      c.fieldKey === fieldKey &&
      (c.action === 'FIELD_CORRECTION' || c.action === 'ENCUMBRANCE_UPDATE') &&
      c.oldValue &&
      c.oldValue !== c.newValue
  );

  if (!directPrev && !modEntry && !clEntry) {
    return null;
  }

  const prevVal = directPrev || modEntry?.previousValue || clEntry?.oldValue || '';
  const currVal =
    directCurrent ||
    (fieldObj?.value !== undefined ? String(fieldObj.value) : undefined) ||
    modEntry?.newValue ||
    clEntry?.newValue ||
    '';

  // If previous and current values are blank or identical, it's not currently modified
  if (!prevVal || prevVal === currVal) {
    return null;
  }

  const timestamp = modEntry?.timestamp || clEntry?.timestamp || record.uploadedAt || new Date().toISOString();
  const timeInfo = formatAuditTimestamp(timestamp);

  const officerName = modEntry?.userName || clEntry?.officerName || 'Verification Specialist';
  const officerRole = modEntry?.userRole || clEntry?.role || 'VERIFICATION_SPECIALIST';
  const reason = modEntry?.reason || clEntry?.reason || 'Manual Verification Rectification';
  const remarks = modEntry?.notes || clEntry?.remarks;
  const fieldLabel = modEntry?.fieldLabel || clEntry?.fieldLabel || FIELD_LABELS[fieldKey] || fieldKey;

  return {
    isModified: true,
    fieldKey,
    fieldLabel,
    previousValue: prevVal,
    currentValue: currVal,
    originalOcrValue: origOcrVal,
    officerName,
    officerRole,
    timestamp,
    formattedTimestamp: timeInfo.formatted,
    relativeTime: timeInfo.relative,
    reason,
    remarks,
    changeType: modEntry?.changeType || clEntry?.action || 'FIELD_CORRECTION'
  };
}

/**
 * Returns all fields in the record that have been manually modified
 */
export function getAllModifiedFields(record: ExtractedLandRecord): FieldModificationInfo[] {
  if (!record) return [];

  const candidateKeys = [
    'khasraNumber',
    'khataNumber',
    'subDivisionNumber',
    'primaryOwnerName',
    'parentageOrSpouse',
    'totalAreaDeclared',
    'landClassification',
    'irrigationSource',
    'encumbranceStatus',
    'annualLandRevenue'
  ];

  // Also collect any field keys that appear in changeLog or modificationHistory
  const modHistory = getRecordModificationHistory(record);
  const changeLog = getRecordChangeLog(record);

  modHistory.forEach((m) => {
    if (m.fieldKey && !candidateKeys.includes(m.fieldKey)) {
      candidateKeys.push(m.fieldKey);
    }
  });

  changeLog.forEach((c) => {
    if (c.fieldKey && !candidateKeys.includes(c.fieldKey)) {
      candidateKeys.push(c.fieldKey);
    }
  });

  const modifiedList: FieldModificationInfo[] = [];
  candidateKeys.forEach((key) => {
    const info = getFieldModificationInfo(record, key);
    if (info) {
      modifiedList.push(info);
    }
  });

  return modifiedList;
}

interface PreviousValueIndicatorProps {
  fieldKey: string;
  record: ExtractedLandRecord;
  currentValue?: string | number;
  onRevert?: (previousValue: string) => void;
  className?: string;
  size?: 'xs' | 'sm' | 'md';
  align?: 'left' | 'right' | 'center';
}

/**
 * Component that displays a 'Previous Value' indicator next to a field that was manually modified.
 * Clicking or hovering over the indicator provides a side-by-side comparison popup
 * showing the prior value, the updated value, who changed it, the reason, and a quick revert option.
 */
export const PreviousValueIndicator: React.FC<PreviousValueIndicatorProps> = ({
  fieldKey,
  record,
  currentValue,
  onRevert,
  className = '',
  size = 'sm',
  align = 'right'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showRevertConfirm, setShowRevertConfirm] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  const info = getFieldModificationInfo(record, fieldKey);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setShowRevertConfirm(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  if (!info) {
    return null;
  }

  const roleBadgeColor = info.officerRole.includes('REVENUE')
    ? 'bg-[#EAF2EB] text-[#3D5A40] border-[#BCD4C0]'
    : 'bg-[#FFF9EA] text-[#8B4513] border-[#DCD7CE]';

  const roleDisplayName = info.officerRole === 'REVENUE_OFFICER'
    ? 'Revenue Officer (SDM)'
    : info.officerRole === 'SETTLEMENT_OFFICER'
    ? 'Settlement Officer'
    : 'Patwari / Verification Specialist';

  return (
    <div className={`relative inline-flex items-center ${className}`} ref={popoverRef}>
      {/* Indicator Pill / Badge */}
      <button
        id={`prev-val-badge-${fieldKey}`}
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className={`group inline-flex items-center gap-1 px-1.5 py-0.5 rounded font-sans font-semibold transition-all cursor-pointer border shadow-2xs ${
          size === 'xs'
            ? 'text-[10px] py-0.2'
            : size === 'md'
            ? 'text-xs px-2 py-1'
            : 'text-[11px]'
        } bg-[#FFF4E5] hover:bg-[#FFE8CC] text-[#9A4C00] border-[#F5D5B2] active:scale-95`}
        title={`Field modified during verification. Previous value: "${info.previousValue}". Click to compare.`}
      >
        <RotateCcw className="w-3 h-3 text-[#B45309] shrink-0 group-hover:rotate-[-45deg] transition-transform" />
        <span className="font-bold text-[#7A3E00] uppercase tracking-wide text-[9px]">Prev:</span>
        <span className="line-through font-mono text-[#8C4A00] opacity-90 max-w-[110px] truncate">
          {info.previousValue}
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#D97706] animate-pulse shrink-0" />
      </button>

      {/* Comparison Popover Card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 4 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            className={`absolute z-50 top-full mt-1.5 w-80 sm:w-92 bg-[#FAF8F5] rounded-xl border border-[#DCD7CE] shadow-xl p-3.5 text-xs text-[#33332A] ${
              align === 'left'
                ? 'left-0'
                : align === 'center'
                ? 'left-1/2 -translate-x-1/2'
                : 'right-0'
            }`}
          >
            {/* Popover Header */}
            <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-[#DCD7CE]">
              <div className="flex items-center gap-1.5">
                <div className="p-1 rounded bg-[#FFF4E5] text-[#B45309] border border-[#F5D5B2]">
                  <FileEdit className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="font-bold text-[#33332A] natural-serif text-xs">
                    Field Verification Diff
                  </h4>
                  <span className="text-[10px] text-[#6B6B58] block">
                    {info.fieldLabel}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1 text-[#6B6B58] hover:text-[#33332A] hover:bg-[#EBE7DF] rounded cursor-pointer"
                title="Close"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Side-by-Side Value Comparison */}
            <div className="space-y-1.5 mb-3">
              <span className="text-[10px] font-bold text-[#5A5A40] uppercase tracking-wider block natural-serif">
                Comparison (Before vs After)
              </span>

              <div className="grid grid-cols-2 gap-2">
                {/* Previous Value Card */}
                <div className="p-2 rounded-lg bg-[#FDF0ED] border border-[#F2C2BA]">
                  <span className="text-[10px] font-semibold text-[#8B0000] block uppercase tracking-tight flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8B0000]" />
                    Previous Value
                  </span>
                  <div className="mt-1 font-mono font-bold text-xs text-[#8B0000] break-words line-through bg-white/60 p-1.5 rounded border border-[#F2C2BA]/60">
                    {info.previousValue}
                  </div>
                  <span className="text-[9px] text-[#A25547] block mt-1">
                    Original OCR reading
                  </span>
                </div>

                {/* Current Value Card */}
                <div className="p-2 rounded-lg bg-[#EAF2EB] border border-[#BCD4C0]">
                  <span className="text-[10px] font-semibold text-[#3D5A40] block uppercase tracking-tight flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3D5A40]" />
                    Current (Sanctioned)
                  </span>
                  <div className="mt-1 font-mono font-bold text-xs text-[#3D5A40] break-words bg-white/60 p-1.5 rounded border border-[#BCD4C0]/60">
                    {currentValue !== undefined ? String(currentValue) : info.currentValue}
                  </div>
                  <span className="text-[9px] text-[#4F6F52] block mt-1">
                    Manual HITL Verified
                  </span>
                </div>
              </div>
            </div>

            {/* Verification Metadata Box */}
            <div className="p-2.5 rounded-lg bg-[#F5F3EE] border border-[#DCD7CE] space-y-2 text-[11px] mb-3">
              <div className="flex items-center justify-between">
                <span className="text-[#6B6B58] flex items-center gap-1">
                  <User className="w-3 h-3 text-[#5A5A40]" />
                  Verified By:
                </span>
                <span className="font-semibold text-[#33332A]">{info.officerName}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[#6B6B58] flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#5A5A40]" />
                  Timestamp:
                </span>
                <span className="font-mono text-[10px] text-[#33332A]">
                  {info.relativeTime} ({info.formattedTimestamp.split(',')[0]})
                </span>
              </div>

              <div className="flex items-start justify-between gap-2 pt-1 border-t border-[#DCD7CE]/60">
                <span className="text-[#6B6B58] shrink-0">Reason:</span>
                <span className="font-medium text-[#8B4513] text-right">
                  {info.reason}
                </span>
              </div>

              {info.remarks && (
                <div className="pt-1 border-t border-[#DCD7CE]/60 text-[10px] text-[#5A5A40] italic">
                  "{info.remarks}"
                </div>
              )}
            </div>

            {/* Revert / Restore Action */}
            {onRevert && (
              <div>
                {!showRevertConfirm ? (
                  <button
                    type="button"
                    onClick={() => setShowRevertConfirm(true)}
                    className="w-full py-1.5 px-2.5 rounded-lg bg-[#FAF8F5] hover:bg-[#EBE7DF] border border-[#DCD7CE] text-[#5A5A40] hover:text-[#33332A] font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-[#8B4513]" />
                    <span>Revert to Previous Value ({info.previousValue})</span>
                  </button>
                ) : (
                  <div className="p-2 rounded-lg bg-[#FFF9EA] border border-[#DCD7CE] space-y-1.5">
                    <div className="text-[11px] text-[#8B4513] font-semibold flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 text-[#B45309]" />
                      <span>Confirm revert to "{info.previousValue}"?</span>
                    </div>
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        type="button"
                        onClick={() => setShowRevertConfirm(false)}
                        className="px-2 py-1 text-[11px] text-[#6B6B58] hover:bg-[#EBE7DF] rounded cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        id={`btn-confirm-revert-${fieldKey}`}
                        type="button"
                        onClick={() => {
                          onRevert(info.previousValue);
                          setShowRevertConfirm(false);
                          setIsOpen(false);
                        }}
                        className="px-2.5 py-1 text-[11px] font-bold bg-[#B45309] hover:bg-[#92400E] text-[#FFF9EA] rounded cursor-pointer shadow-xs transition-colors flex items-center gap-1"
                      >
                        <Check className="w-3 h-3" />
                        <span>Yes, Revert</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface ModifiedFieldsSummaryBannerProps {
  record: ExtractedLandRecord;
  onFocusField?: (fieldKey: string) => void;
  className?: string;
}

/**
 * Summary banner rendered at the top of Verification Station if fields have been modified
 */
export const ModifiedFieldsSummaryBanner: React.FC<ModifiedFieldsSummaryBannerProps> = ({
  record,
  onFocusField,
  className = ''
}) => {
  const modifiedFields = getAllModifiedFields(record);

  if (modifiedFields.length === 0) {
    return null;
  }

  return (
    <div
      id="banner-modified-fields-summary"
      className={`p-2.5 rounded-lg bg-[#FFF4E5] border border-[#F5D5B2] flex flex-wrap items-center justify-between gap-2 text-xs shadow-2xs ${className}`}
    >
      <div className="flex items-center gap-2 flex-wrap">
        <span className="flex items-center gap-1.5 font-bold text-[#9A4C00] natural-serif">
          <History className="w-4 h-4 text-[#B45309]" />
          <span>Manual Modifications ({modifiedFields.length}):</span>
        </span>
        <div className="flex items-center gap-1.5 flex-wrap">
          {modifiedFields.map((field) => (
            <button
              key={field.fieldKey}
              type="button"
              onClick={() => onFocusField?.(field.fieldKey)}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#FAF8F5] hover:bg-[#FFE8CC] text-[#7A3E00] border border-[#F5D5B2] font-semibold text-[11px] cursor-pointer transition-colors shadow-2xs"
              title={`Click to focus ${field.fieldLabel}. Prev: "${field.previousValue}" → Now: "${field.currentValue}"`}
            >
              <span className="text-[#33332A]">{field.fieldLabel}:</span>
              <span className="line-through font-mono text-[#8C4A00] opacity-80">{field.previousValue}</span>
              <ArrowRight className="w-2.5 h-2.5 text-[#B45309]" />
              <span className="font-mono font-bold text-[#3D5A40]">{field.currentValue}</span>
            </button>
          ))}
        </div>
      </div>
      <span className="text-[11px] text-[#8C4A00] font-medium hidden md:inline">
        Hover or click 'Prev' pills below to compare
      </span>
    </div>
  );
};

interface ActiveEditPreviousValueBannerProps {
  fieldKey: string;
  record: ExtractedLandRecord;
  onRestore?: (value: string) => void;
}

/**
 * Helper banner rendered inside the active edit container of a field
 * reminding the officer what the previous value or raw OCR text was.
 */
export const ActiveEditPreviousValueBanner: React.FC<ActiveEditPreviousValueBannerProps> = ({
  fieldKey,
  record,
  onRestore
}) => {
  const info = getFieldModificationInfo(record, fieldKey);
  const rawText = (record as any)[fieldKey]?.rawText;

  if (!info && !rawText) return null;

  return (
    <div className="flex items-center justify-between text-[11px] px-2.5 py-1.5 bg-[#FFF4E5] border border-[#F5D5B2] rounded-md text-[#9A4C00] shadow-2xs">
      <div className="flex items-center gap-1.5 flex-wrap">
        <RotateCcw className="w-3 h-3 text-[#B45309] shrink-0" />
        {info ? (
          <span>
            Previous manual value:{' '}
            <strong className="line-through font-mono text-[#8C4A00]">{info.previousValue}</strong>
            <span className="text-[10px] text-[#B45309] ml-1">
              (by {info.officerName})
            </span>
          </span>
        ) : (
          <span>
            Original OCR raw text:{' '}
            <strong className="font-mono text-[#8C4A00]">{rawText}</strong>
          </span>
        )}
      </div>

      {info && onRestore && (
        <button
          type="button"
          onClick={() => onRestore(info.previousValue)}
          className="text-[10px] font-bold text-[#B45309] hover:text-[#7A3E00] hover:underline cursor-pointer ml-2 shrink-0 flex items-center gap-0.5"
        >
          <RotateCcw className="w-2.5 h-2.5" />
          <span>Restore Previous</span>
        </button>
      )}
    </div>
  );
};
