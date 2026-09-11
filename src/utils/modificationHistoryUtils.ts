import { ExtractedLandRecord, RecordModificationEntry, ModificationChangeType, UserRole } from '../types';

/**
 * Ensures a land record has a full, chronological modification history.
 * If the record does not yet have explicit modificationHistory, synthesizes
 * a verified audit trail from uploadedAt, uploadedBy, reviewHistory, and flags.
 */
export function getRecordModificationHistory(record: ExtractedLandRecord): RecordModificationEntry[] {
  if (record.modificationHistory && record.modificationHistory.length > 0) {
    return [...record.modificationHistory].sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  }

  // Synthesize initial realistic audit log from record metadata and reviewHistory
  const generated: RecordModificationEntry[] = [];

  // 1. Initial Ingestion entry
  generated.push({
    id: `INIT-${record.id}`,
    timestamp: record.uploadedAt || new Date(Date.now() - 86400000 * 3).toISOString(),
    userId: 'SYS-OCR-AI38',
    userName: record.uploadedBy || 'AI OCR Pipeline v3.8',
    userRole: 'SYSTEM',
    changeType: 'INITIAL_INGESTION',
    fieldLabel: 'Document Parchment Ingestion',
    previousValue: 'Raw Physical Scanned Image / PDF',
    newValue: `Digitized into ${record.documentType.replace(/_/g, ' ')} (${record.script})`,
    reason: 'Initial Scanning & ML Indic-OCR Extraction',
    notes: `Preprocessed via OpenCV (${record.preprocessingMetrics.binarizationMethod} filter, deskew ${record.preprocessingMetrics.deskewAngleDegrees}°). Overall confidence: ${record.overallConfidence}%.`,
    sourceTerminal: 'DILRMP Scanning Node #04'
  });

  // 2. Add any items from reviewHistory
  if (record.reviewHistory && record.reviewHistory.length > 0) {
    record.reviewHistory.forEach((rev, idx) => {
      let cType: ModificationChangeType = 'ADMINISTRATIVE_NOTE';
      if (rev.action.toLowerCase().includes('sanction')) {
        cType = 'SANCTION_APPROVAL';
      } else if (rev.action.toLowerCase().includes('ingest')) {
        // already covered or supplementary
        cType = 'INITIAL_INGESTION';
      } else if (rev.action.toLowerCase().includes('flag') || rev.action.toLowerCase().includes('check')) {
        cType = 'STATUS_CHANGE';
      }

      generated.push({
        id: `REV-${record.id}-${idx}`,
        timestamp: rev.timestamp,
        userId: rev.role === 'REVENUE_OFFICER' ? 'OFF-SDM-201' : 'SPEC-PAT-108',
        userName: rev.officerName,
        userRole: rev.role,
        changeType: cType,
        fieldLabel: rev.action,
        previousValue: cType === 'SANCTION_APPROVAL' ? 'NEEDS_REVIEW' : undefined,
        newValue: cType === 'SANCTION_APPROVAL' ? 'VERIFIED_AND_SANCTIONED' : undefined,
        reason: rev.action,
        notes: rev.notes || `Official action recorded: ${rev.action}`,
        digitalSignatureRef: cType === 'SANCTION_APPROVAL' ? 'DSC-GOI-DILRMP-2026-X77A' : undefined,
        sourceTerminal: 'Revenue Court Official Portal'
      });
    });
  }

  // 3. If the record had flagged fields or verified by, add audit trail entries for them
  if (record.irrigationSource?.isFlagged) {
    generated.push({
      id: `FLAG-IRR-${record.id}`,
      timestamp: new Date(new Date(record.uploadedAt).getTime() + 1000 * 60 * 15).toISOString(),
      userId: 'SYS-AUDIT-ENGINE',
      userName: 'Automated DILRMP Validation Engine',
      userRole: 'SYSTEM',
      changeType: 'FIELD_CORRECTION',
      fieldKey: 'irrigationSource',
      fieldLabel: 'Irrigation Remarks Flagged',
      previousValue: record.irrigationSource.rawText,
      newValue: record.irrigationSource.value,
      reason: record.irrigationSource.flagReason || 'Low OCR optical confidence (68%) in margin',
      notes: 'Automated rule engine routed field to HITL Verification Queue for revenue officer confirmation.',
      sourceTerminal: 'Validation Engine Server'
    });
  }

  if (record.encumbranceStatus?.isFlagged) {
    generated.push({
      id: `FLAG-ENC-${record.id}`,
      timestamp: new Date(new Date(record.uploadedAt).getTime() + 1000 * 60 * 20).toISOString(),
      userId: 'SYS-AUDIT-ENGINE',
      userName: 'Automated DILRMP Validation Engine',
      userRole: 'SYSTEM',
      changeType: 'ENCUMBRANCE_UPDATE',
      fieldKey: 'encumbranceStatus',
      fieldLabel: 'Encumbrance / Mortgage Annotation',
      previousValue: record.encumbranceStatus.rawText,
      newValue: record.encumbranceStatus.value,
      reason: record.encumbranceStatus.flagReason || 'Pencil handwritten annotation in right margin',
      notes: 'Requires patwari verification against Sub-Registrar Office (SRO) mortgage records.',
      sourceTerminal: 'Validation Engine Server'
    });
  }

  // Sort descending by timestamp
  return generated.sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
}

/**
 * Format ISO timestamp into readable absolute date & time.
 * Example: "02 Sep 2026, 14:32:10 IST"
 */
export function formatAuditTimestamp(isoString: string): { formatted: string; relative: string } {
  try {
    const d = new Date(isoString);
    if (isNaN(d.getTime())) {
      return { formatted: isoString, relative: '' };
    }

    const day = String(d.getDate()).padStart(2, '0');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[d.getMonth()];
    const year = d.getFullYear();
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const seconds = String(d.getSeconds()).padStart(2, '0');

    const formatted = `${day} ${month} ${year}, ${hours}:${minutes}:${seconds} IST`;

    // Relative calculation
    const now = Date.now();
    const diffMs = now - d.getTime();
    let relative = '';
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHours = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffSec < 45) {
      relative = 'Just now';
    } else if (diffMin < 60) {
      relative = `${diffMin}m ago`;
    } else if (diffHours < 24) {
      relative = `${diffHours}h ago`;
    } else if (diffDays < 30) {
      relative = `${diffDays}d ago`;
    } else {
      relative = `${Math.floor(diffDays / 30)}mo ago`;
    }

    return { formatted, relative };
  } catch {
    return { formatted: isoString, relative: '' };
  }
}

/**
 * Returns badge styling and human-readable label for a modification change type.
 */
export function getChangeTypeMeta(type: ModificationChangeType): {
  label: string;
  badgeClass: string;
  iconName: string;
} {
  switch (type) {
    case 'FIELD_CORRECTION':
      return {
        label: 'Field Correction',
        badgeClass: 'bg-[#EBF3FC] text-[#1E4E8C] border-[#B8D5FA]',
        iconName: 'Edit3'
      };
    case 'SANCTION_APPROVAL':
      return {
        label: 'Sanction & Signed',
        badgeClass: 'bg-[#EAF2EB] text-[#2A5235] border-[#BCD4C0]',
        iconName: 'Stamp'
      };
    case 'STATUS_CHANGE':
      return {
        label: 'Status Transition',
        badgeClass: 'bg-[#FFF9EA] text-[#8B4513] border-[#E8D4B0]',
        iconName: 'AlertCircle'
      };
    case 'INITIAL_INGESTION':
      return {
        label: 'Initial Extraction',
        badgeClass: 'bg-[#F5F3EE] text-[#5A5A40] border-[#DCD7CE]',
        iconName: 'FileText'
      };
    case 'BOUNDARY_RECTIFICATION':
      return {
        label: 'Boundary Rectification',
        badgeClass: 'bg-[#F2EDFB] text-[#552A8C] border-[#D6C5F3]',
        iconName: 'Ruler'
      };
    case 'ENCUMBRANCE_UPDATE':
      return {
        label: 'Encumbrance / Lien',
        badgeClass: 'bg-[#FDF0ED] text-[#8B0000] border-[#F2C2BA]',
        iconName: 'ShieldAlert'
      };
    case 'MUTATION_RECORDED':
      return {
        label: 'Mutation Entry',
        badgeClass: 'bg-[#EBF7F6] text-[#1A6B68] border-[#BCE4E2]',
        iconName: 'GitCommit'
      };
    case 'ADMINISTRATIVE_NOTE':
    default:
      return {
        label: 'Administrative Note',
        badgeClass: 'bg-[#F5F3EE] text-[#4A3728] border-[#DCD7CE]',
        iconName: 'FileCheck'
      };
  }
}

/**
 * Format user role nicely with official designation.
 */
export function formatUserRole(role: UserRole | 'SYSTEM' | 'AI_OCR_ENGINE'): string {
  switch (role) {
    case 'REVENUE_OFFICER':
      return 'Revenue Officer (Tehsildar / SDM)';
    case 'VERIFICATION_SPECIALIST':
      return 'Verification Specialist (Patwari / Lekhpal)';
    case 'SETTLEMENT_OFFICER':
      return 'Settlement Officer';
    case 'CITIZEN_VIEWER':
      return 'Citizen Inquirer';
    case 'SYSTEM':
    case 'AI_OCR_ENGINE':
      return 'System Automated Engine';
    default:
      return String(role).replace(/_/g, ' ');
  }
}
