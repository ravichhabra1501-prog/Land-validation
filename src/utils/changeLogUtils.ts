/**
 * Utility functions for managing the ChangeLog array of Land Records.
 * Provides timeline normalization, synthesized historical audit trails,
 * and formatting utilities for revenue verification.
 */

import { ExtractedLandRecord, ChangeLogEntry, UserRole } from '../types';
import { getRecordModificationHistory } from './modificationHistoryUtils';

/**
 * Returns the complete chronological changeLog for a land record (newest first).
 * If the record already has explicit changeLog entries, it returns those.
 * Otherwise, it transparently synthesizes changeLog entries from existing modification history,
 * reviewHistory, flagged OCR fields, and document ingestion records.
 */
export function getRecordChangeLog(record: ExtractedLandRecord): ChangeLogEntry[] {
  if (record.changeLog && record.changeLog.length > 0) {
    return [...record.changeLog].sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  }

  // Fallback / synthesis: Convert modificationHistory or construct initial timeline
  const modHistory = getRecordModificationHistory(record);
  if (modHistory && modHistory.length > 0) {
    return modHistory.map((mod): ChangeLogEntry => ({
      id: mod.id,
      timestamp: mod.timestamp,
      officerName: mod.userName,
      role: mod.userRole,
      action: mod.changeType,
      fieldKey: mod.fieldKey,
      fieldLabel: mod.fieldLabel,
      oldValue: mod.previousValue,
      newValue: mod.newValue,
      reason: mod.reason,
      remarks: mod.notes,
      digitalSignature: mod.digitalSignatureRef,
      sourceTerminal: mod.sourceTerminal
    }));
  }

  // Baseline fallback: Ingestion entry
  return [
    {
      id: `CL-INIT-${record.id}`,
      timestamp: record.uploadedAt || new Date().toISOString(),
      officerName: record.uploadedBy || 'AI OCR Pipeline v3.8',
      role: 'SYSTEM',
      action: 'INITIAL_INGESTION',
      fieldLabel: 'Land Record Parchment Ingested',
      oldValue: 'Physical Land Record Paper',
      newValue: `Digitized into ${record.documentType.replace(/_/g, ' ')} (${record.script})`,
      reason: 'Physical document digitization & Indic OCR extraction',
      remarks: `Preprocessed via OpenCV (${record.preprocessingMetrics?.binarizationMethod || 'Otsu'} filter). Baseline confidence: ${record.overallConfidence}%.`,
      sourceTerminal: 'DILRMP Ingestion Terminal #01'
    }
  ];
}

/**
 * Helper to prepend a new changeLog entry to a record.
 */
export function appendChangeLogEntry(
  record: ExtractedLandRecord, 
  newEntry: ChangeLogEntry
): ExtractedLandRecord {
  const currentLogs = getRecordChangeLog(record);
  return {
    ...record,
    changeLog: [newEntry, ...currentLogs]
  };
}

/**
 * Formats an ISO timestamp for display in the changeLog timeline.
 */
export function formatChangeLogDate(isoString: string): { formatted: string; relative: string } {
  try {
    const d = new Date(isoString);
    if (isNaN(d.getTime())) {
      return { formatted: isoString, relative: '' };
    }

    const formatted = d.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    const now = new Date('2026-09-16T15:00:00Z').getTime(); // anchored to current context
    const diffMs = now - d.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    let relative = '';
    if (diffHours < 1) {
      relative = 'Just now';
    } else if (diffHours < 24) {
      relative = `${diffHours} hr${diffHours > 1 ? 's' : ''} ago`;
    } else if (diffDays === 1) {
      relative = 'Yesterday';
    } else if (diffDays < 30) {
      relative = `${diffDays} days ago`;
    } else {
      relative = `${Math.floor(diffDays / 30)} mo ago`;
    }

    return { formatted, relative };
  } catch {
    return { formatted: isoString, relative: '' };
  }
}

/**
 * Visual metadata and badge styling for changeLog actions.
 */
export function getActionMeta(action: string): {
  label: string;
  badgeClass: string;
  dotColor: string;
  category: 'EDIT' | 'SANCTION' | 'SYSTEM' | 'MUTATION' | 'ENCUMBRANCE' | 'NOTE';
} {
  const norm = action.toUpperCase();

  if (norm.includes('SANCTION') || norm.includes('SIGN')) {
    return {
      label: 'Sanction & Attestation',
      badgeClass: 'bg-[#EAF2EB] text-[#2A5235] border-[#BCD4C0]',
      dotColor: 'bg-[#3D5A40] border-[#BCD4C0]',
      category: 'SANCTION'
    };
  }

  if (norm.includes('CORRECTION') || norm.includes('FIELD') || norm.includes('EDIT')) {
    return {
      label: 'Field Value Correction',
      badgeClass: 'bg-[#EBF3FC] text-[#1E4E8C] border-[#B8D5FA]',
      dotColor: 'bg-[#1E4E8C] border-[#B8D5FA]',
      category: 'EDIT'
    };
  }

  if (norm.includes('ENCUMBRANCE') || norm.includes('LIEN') || norm.includes('MORTGAGE')) {
    return {
      label: 'Encumbrance / Lien Update',
      badgeClass: 'bg-[#FDF0ED] text-[#8B0000] border-[#F2C2BA]',
      dotColor: 'bg-[#8B0000] border-[#F2C2BA]',
      category: 'ENCUMBRANCE'
    };
  }

  if (norm.includes('BOUNDARY') || norm.includes('RECTIFICATION') || norm.includes('AREA')) {
    return {
      label: 'Boundary / Area Rectification',
      badgeClass: 'bg-[#F2EDFB] text-[#552A8C] border-[#D6C5F3]',
      dotColor: 'bg-[#552A8C] border-[#D6C5F3]',
      category: 'EDIT'
    };
  }

  if (norm.includes('MUTATION')) {
    return {
      label: 'Mutation Recorded',
      badgeClass: 'bg-[#EBF7F6] text-[#1A6B68] border-[#BCE4E2]',
      dotColor: 'bg-[#1A6B68] border-[#BCE4E2]',
      category: 'MUTATION'
    };
  }

  if (norm.includes('INGEST') || norm.includes('OCR') || norm.includes('INIT')) {
    return {
      label: 'Document Ingestion / OCR',
      badgeClass: 'bg-[#F5F3EE] text-[#5A5A40] border-[#DCD7CE]',
      dotColor: 'bg-[#5A5A40] border-[#DCD7CE]',
      category: 'SYSTEM'
    };
  }

  return {
    label: 'Administrative Action',
    badgeClass: 'bg-[#FAF8F5] text-[#4A3728] border-[#DCD7CE]',
    dotColor: 'bg-[#8B4513] border-[#E8D4B0]',
    category: 'NOTE'
  };
}
