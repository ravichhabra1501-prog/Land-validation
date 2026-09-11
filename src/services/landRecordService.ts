import { ExtractedLandRecord, ValidationRuleResult, FieldItem } from '../types';
import { findMasterRecord, DILRMP_MASTER_DATABASE } from '../data/dilrmpDatabase';

export function runAutomatedValidationRules(
  record: ExtractedLandRecord, 
  allRecords: ExtractedLandRecord[],
  selectedRuleIds?: string[]
): ValidationRuleResult[] {
  const results: ValidationRuleResult[] = [];

  // Rule 1: Area Summation Consistency
  const declaredAreaSqM = record.normalizedAreaSqMeters;
  const coSharersSumSqM = record.coSharers?.reduce((sum, cs) => sum + (cs.shareAreaSqMeters || 0), 0) || 0;
  
  if (record.coSharers && record.coSharers.length > 0) {
    const diff = Math.abs(declaredAreaSqM - coSharersSumSqM);
    const tolerance = 5; // 5 sq meters tolerance for floating point rounding
    if (diff <= tolerance) {
      results.push({
        ruleId: 'VR-01-ARITH',
        ruleName: 'Area Summation Consistency',
        category: 'ARITHMETIC',
        passed: true,
        severity: 'INFO',
        message: `Co-sharer shares (${coSharersSumSqM.toLocaleString()} sq.m) equal declared parcel area (${declaredAreaSqM.toLocaleString()} sq.m).`
      });
    } else {
      results.push({
        ruleId: 'VR-01-ARITH',
        ruleName: 'Area Summation Inconsistency',
        category: 'ARITHMETIC',
        passed: false,
        severity: 'CRITICAL',
        message: `Area mismatch: Sum of co-sharers (${coSharersSumSqM.toLocaleString()} sq.m) differs from declared area (${declaredAreaSqM.toLocaleString()} sq.m) by ${diff.toFixed(1)} sq.m.`,
        details: 'Check if fractional shares (e.g. 1/3, 1/4) or hissa measurements were truncated during manual entry.'
      });
    }
  }

  // Rule 2: DILRMP Central Master Database Cross-Check
  const masterMatch = findMasterRecord(
    record.khasraNumber.value,
    record.village.value,
    record.state.value
  );

  if (masterMatch) {
    if (masterMatch.status === 'LITIGATION') {
      results.push({
        ruleId: 'VR-02-CDB',
        ruleName: 'Master Registry Court Litigation Flag',
        category: 'CROSS_DB',
        passed: false,
        severity: 'CRITICAL',
        message: `High risk: Master record indicates active litigation on Khasra ${record.khasraNumber.value} in ${record.village.value}.`,
        details: 'Civil court injunction recorded in state e-Courts integration. Require legal NOC before sanction.'
      });
    } else if (masterMatch.status === 'ACQUISITION_PENDING') {
      results.push({
        ruleId: 'VR-02-CDB',
        ruleName: 'Government Land Acquisition Notification',
        category: 'CROSS_DB',
        passed: false,
        severity: 'WARNING',
        message: `Master record indicates preliminary Section 11 notice for infrastructure corridor acquisition.`,
        details: 'Verify with Land Acquisition Officer before sanctioning ownership transfer.'
      });
    } else {
      results.push({
        ruleId: 'VR-02-CDB',
        ruleName: 'DILRMP Central Registry Match Verified',
        category: 'CROSS_DB',
        passed: true,
        severity: 'INFO',
        message: `Verified against Settlement Master Record (${masterMatch.district}, ${masterMatch.tehsil}). Status: ${masterMatch.status}.`
      });
    }
  } else {
    results.push({
      ruleId: 'VR-02-CDB',
      ruleName: 'DILRMP Central Registry Check',
      category: 'CROSS_DB',
      passed: true,
      severity: 'INFO',
      message: 'New or unmapped village parcel; marked for initial cadastral consolidation.'
    });
  }

  // Rule 3: Duplicate Detection in Ingestion Queue
  const duplicates = allRecords.filter(r => 
    r.id !== record.id &&
    r.khasraNumber.value.trim().toLowerCase() === record.khasraNumber.value.trim().toLowerCase() &&
    r.village.value.trim().toLowerCase() === record.village.value.trim().toLowerCase() &&
    r.tehsil.value.trim().toLowerCase() === record.tehsil.value.trim().toLowerCase()
  );

  if (duplicates.length > 0) {
    results.push({
      ruleId: 'VR-03-DUP',
      ruleName: 'Potential Duplicate Land Record',
      category: 'DUPLICATE',
      passed: false,
      severity: 'WARNING',
      message: `Duplicate detected: Another record (${duplicates[0].documentNumber}) exists for Khasra ${record.khasraNumber.value} in ${record.village.value}.`,
      details: 'Check if this is an updated mutation extract or an accidental duplicate upload.'
    });
  } else {
    results.push({
      ruleId: 'VR-03-DUP',
      ruleName: 'Cadastral Duplicate Check',
      category: 'DUPLICATE',
      passed: true,
      severity: 'INFO',
      message: 'Zero duplicate entries found in state repository.'
    });
  }

  // Rule 4: Confidence Threshold Check (<70% flagged)
  const lowConfidenceFields: string[] = [];
  if (record.khasraNumber.confidence < 75) lowConfidenceFields.push(`Khasra Number (${record.khasraNumber.confidence}%)`);
  if (record.khataNumber.confidence < 75) lowConfidenceFields.push(`Khata Number (${record.khataNumber.confidence}%)`);
  if (record.primaryOwnerName.confidence < 75) lowConfidenceFields.push(`Primary Owner (${record.primaryOwnerName.confidence}%)`);
  if (record.totalAreaDeclared.confidence < 75) lowConfidenceFields.push(`Declared Area (${record.totalAreaDeclared.confidence}%)`);

  if (lowConfidenceFields.length > 0) {
    results.push({
      ruleId: 'VR-04-FLAG',
      ruleName: 'Low OCR/HWR Confidence Score',
      category: 'FORMAT',
      passed: false,
      severity: 'WARNING',
      message: `Critical fields below 75% confidence threshold: ${lowConfidenceFields.join(', ')}.`,
      details: 'Mandatory human verification required before record can be marked as Sanctioned.'
    });
  }

  // Rule 5: Encumbrance or Mortgage Warning
  if (record.encumbranceStatus.value === 'MORTGAGED') {
    results.push({
      ruleId: 'VR-05-LEGAL',
      ruleName: 'Active Bank Lien / Mortgage Noted',
      category: 'LEGAL',
      passed: true,
      severity: 'INFO',
      message: `Registered bank hypothecation detected: ${record.bankLienDetails || 'Details recorded in margin'}.`
    });
  } else if (record.encumbranceStatus.value === 'COURT_STAY') {
    results.push({
      ruleId: 'VR-05-LEGAL',
      ruleName: 'Judicial Restraint / Stay Order',
      category: 'LEGAL',
      passed: false,
      severity: 'CRITICAL',
      message: 'Court stay registered against parcel. Mutation freeze in effect.'
    });
  }

  if (selectedRuleIds && selectedRuleIds.length > 0) {
    const newlyEvaluated = results.filter(r => selectedRuleIds.includes(r.ruleId));
    const retainedExisting = (record.validationResults || []).filter(r => !selectedRuleIds.includes(r.ruleId));
    return [...retainedExisting, ...newlyEvaluated];
  }

  return results;
}

// Convert units
export function normalizeAreaToSqMeters(value: number, unit: 'HECTARE' | 'ACRE' | 'BIGHA' | 'GUNTHA' | 'SQ_METERS'): number {
  switch (unit) {
    case 'HECTARE':
      return value * 10000;
    case 'ACRE':
      return value * 4046.86;
    case 'GUNTHA':
      return value * 101.17;
    case 'BIGHA':
      return value * 2529.28; // Standard pucca bigha
    case 'SQ_METERS':
    default:
      return value;
  }
}

// Export record as DILRMP Compliant XML
export function generateDilrmpXml(record: ExtractedLandRecord): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<DILRMP_LandRecord xmlns="http://dilrmp.gov.in/schema/v3" version="3.8">
  <Header>
    <DocumentId>${record.id}</DocumentId>
    <ReferenceNumber>${record.documentNumber}</ReferenceNumber>
    <GeneratedTimestamp>${new Date().toISOString()}</GeneratedTimestamp>
    <DigitizationAgency>DILRMP AI Validation Engine</DigitizationAgency>
  </Header>
  <AdministrativeHierarchy>
    <State code="${record.state.value}">${record.state.value}</State>
    <District code="${record.district.value}">${record.district.value}</District>
    <Tehsil code="${record.tehsil.value}">${record.tehsil.value}</Tehsil>
    <Village code="${record.censusVillageCode?.value || 'N/A'}">${record.village.value}</Village>
  </AdministrativeHierarchy>
  <CadastralDetails>
    <KhasraNumber>${record.khasraNumber.value}</KhasraNumber>
    <KhataNumber>${record.khataNumber.value}</KhataNumber>
    <SubDivision>${record.subDivisionNumber?.value || '0'}</SubDivision>
    <Area unit="${record.declaredUnit.value}" declared="${record.totalAreaDeclared.value}">
      <NormalizedSqMeters>${record.normalizedAreaSqMeters}</NormalizedSqMeters>
    </Area>
    <LandClassification>${record.landClassification.value}</LandClassification>
  </CadastralDetails>
  <OwnershipLedger>
    <PrimaryOwner>${record.primaryOwnerName.value}</PrimaryOwner>
    <ParentageOrSpouse>${record.parentageOrSpouse.value}</ParentageOrSpouse>
    <CoSharers count="${record.coSharers?.length || 0}">
      ${record.coSharers?.map(cs => `
      <Sharer>
        <Name>${cs.name}</Name>
        <Relation>${cs.relation}</Relation>
        <ShareFraction>${cs.shareFraction}</ShareFraction>
        <AreaSqMeters>${cs.shareAreaSqMeters}</AreaSqMeters>
      </Sharer>`).join('')}
    </CoSharers>
  </OwnershipLedger>
  <FinancialAndLegal>
    <AnnualRevenue currency="INR">${record.annualLandRevenue.value}</AnnualRevenue>
    <EncumbranceStatus>${record.encumbranceStatus.value}</EncumbranceStatus>
    <LienDetails>${record.bankLienDetails || 'NONE'}</LienDetails>
  </FinancialAndLegal>
  <AuditTrail>
    <Status>${record.status}</Status>
    <ConfidenceScore>${record.overallConfidence}%</ConfidenceScore>
    <ReviewedBy>${record.reviewHistory?.[record.reviewHistory.length - 1]?.officerName || 'Automated Pipeline'}</ReviewedBy>
  </AuditTrail>
</DILRMP_LandRecord>`;
}
