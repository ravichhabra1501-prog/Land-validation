import * as XLSX from 'xlsx';
import { ExtractedLandRecord, AuthUser } from '../types';
import { getStateLandFormat } from '../data/stateLandFormats';

export interface AuditExportOptions {
  officer?: AuthUser | null;
  stateFilter?: string;
  formatFilter?: string;
  statusFilter?: string;
  searchQuery?: string;
}

/**
 * Transforms ExtractedLandRecord items into structured audit rows
 */
export function formatRecordsForAudit(records: ExtractedLandRecord[]) {
  return records.map((record, index) => {
    const format = getStateLandFormat(record.state.value, record.documentType);
    const uploadDateStr = record.uploadedAt
      ? new Date(record.uploadedAt).toLocaleString('en-IN', {
          dateStyle: 'medium',
          timeStyle: 'short',
        })
      : 'Archival Record';

    const coSharersStr = record.coSharers && record.coSharers.length > 0
      ? record.coSharers.map(c => `${c.name} (${c.shareFraction || c.relation || 'Co-sharer'})`).join(', ')
      : 'None (Sole Proprietor)';

    const hasLien = record.encumbranceStatus.value !== 'CLEAR';

    return {
      'S.No': index + 1,
      'Document Ref Number': record.documentNumber,
      'State': record.state.value,
      'Statutory Format Title': format.formatTitle,
      'Statutory Form Code': format.formCode,
      'Governing Revenue Act': format.statutoryAct,
      'Official Revenue Portal': `${format.portalName} (${format.portalUrl})`,
      'District': record.district.value,
      'Tehsil / Taluk': record.tehsil.value,
      'Village / Mauza': record.village.value,
      'Census / LGD Village Code': record.censusVillageCode?.value || 'N/A',
      'Parcel / Khasra / Survey No': record.khasraNumber.value,
      'Khata / Khewat / Account No': record.khataNumber.value,
      'Primary Landholder Name': record.primaryOwnerName.value,
      'Parentage / Spouse': record.parentageOrSpouse?.value || 'N/A',
      'Co-Sharers & Shares': coSharersStr,
      'Total Owners Count': record.totalOwnersCount || (record.coSharers ? record.coSharers.length + 1 : 1),
      'Declared Land Area': record.totalAreaDeclared.value,
      'Declared Measurement Unit': record.declaredUnit.value,
      'Normalized Area (Sq. Meters)': record.normalizedAreaSqMeters || 'N/A',
      'Land Classification': record.landClassification?.value || 'Agricultural / Jirayat',
      'Irrigation Source': record.irrigationSource?.value || 'Rainfed / Wells',
      'Annual Land Revenue Assessment (₹)': record.annualLandRevenue?.value ?? 0,
      'Encumbrance / Lien Status': record.encumbranceStatus.value.replace(/_/g, ' '),
      'Bank Hypothecation / Encumbrance Remarks': record.bankLienDetails || (hasLien ? 'Active Lien / Charge Noted' : 'Clear / Freehold'),
      'AI OCR Extraction Confidence (%)': `${record.overallConfidence}%`,
      'Verification & Sanction Status': record.status === 'VERIFIED_AND_SANCTIONED' ? 'Verified & Sanctioned' : record.status.replace(/_/g, ' '),
      'Document Indic Script': record.script,
      'Primary Language': record.primaryLanguage,
      'Source File Name': record.sourceFileName,
      'Ingestion Timestamp': uploadDateStr,
      'Audit Cleared': record.status === 'VERIFIED_AND_SANCTIONED' ? 'YES' : 'PENDING_REVIEW',
    };
  });
}

/**
 * Exports currently filtered land records as an Excel Workbook (.xlsx)
 * with both detailed ledger and statistical audit summary sheets.
 */
export function exportLandRecordsToExcel(
  records: ExtractedLandRecord[],
  options?: AuditExportOptions
): string {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const fileName = `DILRMP_Land_Records_Audit_${timestamp}.xlsx`;

  // 1. Create a new workbook
  const workbook = XLSX.utils.book_new();

  // 2. Prepare Detailed Ledger Data
  const ledgerData = formatRecordsForAudit(records);
  const ledgerWorksheet = XLSX.utils.json_to_sheet(ledgerData);

  // Set column widths for comfortable Excel viewing
  ledgerWorksheet['!cols'] = [
    { wch: 6 },  // S.No
    { wch: 26 }, // Document Ref Number
    { wch: 18 }, // State
    { wch: 28 }, // Statutory Format Title
    { wch: 22 }, // Statutory Form Code
    { wch: 34 }, // Governing Revenue Act
    { wch: 36 }, // Official Revenue Portal
    { wch: 16 }, // District
    { wch: 16 }, // Tehsil
    { wch: 18 }, // Village
    { wch: 16 }, // Census / LGD Code
    { wch: 18 }, // Khasra
    { wch: 16 }, // Khata
    { wch: 24 }, // Primary Owner
    { wch: 20 }, // Parentage
    { wch: 30 }, // Co-Owners
    { wch: 16 }, // Declared Area
    { wch: 14 }, // Unit
    { wch: 18 }, // Normalized Area
    { wch: 22 }, // Classification
    { wch: 18 }, // Irrigation
    { wch: 18 }, // Soil
    { wch: 18 }, // Land Revenue
    { wch: 22 }, // Encumbrance Status
    { wch: 32 }, // Remarks
    { wch: 18 }, // Confidence
    { wch: 24 }, // Status
    { wch: 14 }, // Script
    { wch: 14 }, // Language
    { wch: 28 }, // Source File Name
    { wch: 22 }, // Ingestion Timestamp
    { wch: 16 }, // Audit Cleared
  ];

  XLSX.utils.book_append_sheet(workbook, ledgerWorksheet, 'Land Records Ledger');

  // 3. Prepare Audit Metadata & Summary Sheet
  const totalCount = records.length;
  const sanctionedCount = records.filter(r => r.status === 'VERIFIED_AND_SANCTIONED').length;
  const pendingReviewCount = records.filter(r => r.status === 'NEEDS_REVIEW').length;
  const avgConfidence = totalCount > 0
    ? (records.reduce((acc, r) => acc + r.overallConfidence, 0) / totalCount).toFixed(1)
    : '0.0';

  const totalAreaSqM = records.reduce((acc, r) => acc + (r.normalizedAreaSqMeters || 0), 0);
  const encumberedCount = records.filter(r => r.encumbranceStatus.value !== 'CLEAR').length;
  const statesInAudit = Array.from(new Set(records.map(r => r.state.value))).sort().join(', ');

  const summaryData = [
    { 'Audit Parameter': 'National Land Modernization Program', 'Audit Value / Metric': 'DILRMP Statutory Cadastral Audit Report' },
    { 'Audit Parameter': 'Report Generation Timestamp', 'Audit Value / Metric': new Date().toLocaleString('en-IN') },
    { 'Audit Parameter': 'Exporting Revenue Officer', 'Audit Value / Metric': options?.officer?.name || 'Authorized Revenue Officer' },
    { 'Audit Parameter': 'Officer Role & Jurisdiction', 'Audit Value / Metric': options?.officer?.role || 'REVENUE_OFFICER' },
    { 'Audit Parameter': 'Terminal ID', 'Audit Value / Metric': options?.officer?.terminalId || 'REV-TER-01' },
    { 'Audit Parameter': 'Total Filtered Land Records', 'Audit Value / Metric': totalCount },
    { 'Audit Parameter': 'Verified & Sanctioned Parcels', 'Audit Value / Metric': `${sanctionedCount} (${totalCount ? Math.round((sanctionedCount/totalCount)*100) : 0}%)` },
    { 'Audit Parameter': 'Parcels Flagged for HITL Review', 'Audit Value / Metric': `${pendingReviewCount} (${totalCount ? Math.round((pendingReviewCount/totalCount)*100) : 0}%)` },
    { 'Audit Parameter': 'Mean AI OCR / HWR Extraction Confidence', 'Audit Value / Metric': `${avgConfidence}%` },
    { 'Audit Parameter': 'Cumulative Land Parcel Area (Sq. Meters)', 'Audit Value / Metric': `${totalAreaSqM.toLocaleString('en-IN')} m²` },
    { 'Audit Parameter': 'Active Encumbrances / Bank Liens Noted', 'Audit Value / Metric': `${encumberedCount} parcels` },
    { 'Audit Parameter': 'States & UTs Covered in Dataset', 'Audit Value / Metric': statesInAudit || 'None' },
    { 'Audit Parameter': 'Applied State Filter', 'Audit Value / Metric': options?.stateFilter || 'All States' },
    { 'Audit Parameter': 'Applied Land Format Filter', 'Audit Value / Metric': options?.formatFilter || 'All Formats' },
    { 'Audit Parameter': 'Applied Verification Status Filter', 'Audit Value / Metric': options?.statusFilter || 'All Statuses' },
    { 'Audit Parameter': 'Active Search Keyword', 'Audit Value / Metric': options?.searchQuery || 'None (Full Ledger)' },
  ];

  const summaryWorksheet = XLSX.utils.json_to_sheet(summaryData);
  summaryWorksheet['!cols'] = [
    { wch: 40 }, // Parameter
    { wch: 65 }, // Value
  ];

  XLSX.utils.book_append_sheet(workbook, summaryWorksheet, 'Audit Summary & Metadata');

  // 4. Trigger download in browser
  XLSX.writeFile(workbook, fileName);

  return fileName;
}

/**
 * Exports currently filtered land records as standard CSV with UTF-8 BOM
 * ensuring all multilingual Indic characters (Devanagari, Bengali, Tamil, etc.)
 * open properly in Microsoft Excel and external audit software.
 */
export function exportLandRecordsToCSV(
  records: ExtractedLandRecord[]
): string {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const fileName = `DILRMP_Land_Records_Audit_${timestamp}.csv`;

  const ledgerData = formatRecordsForAudit(records);
  const worksheet = XLSX.utils.json_to_sheet(ledgerData);
  const csvContent = XLSX.utils.sheet_to_csv(worksheet);

  // Prepend UTF-8 BOM so Excel opens Indic characters with proper encoding
  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  return fileName;
}
