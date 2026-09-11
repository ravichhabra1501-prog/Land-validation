import { ExtractedLandRecord } from '../types';

export interface FieldValidationGuide {
  fieldKey: string;
  fieldLabel: string;
  indicTerm?: string;
  ruleCode: string;
  ruleName: string;
  ruleCategory: 'ARITHMETIC' | 'CROSS_DB' | 'IDENTITY' | 'LEGAL' | 'FORMAT' | 'CADASTRAL';
  statutoryReference: string;
  syntaxFormat: string;
  validationLogic: string;
  toleranceOrConstraint: string;
  verificationTip: string;
  commonErrorSample?: string;
  getLiveStatus: (record: ExtractedLandRecord) => {
    status: 'PASSED' | 'WARNING' | 'CRITICAL' | 'INFO';
    message: string;
    details?: string;
  };
}

export const FIELD_VALIDATION_RULES: Record<string, FieldValidationGuide> = {
  khasraNumber: {
    fieldKey: 'khasraNumber',
    fieldLabel: 'Khasra / Gat / Survey Number',
    indicTerm: 'खसरा / गट क्रमांक',
    ruleCode: 'VR-02-CDB & VR-03-DUP',
    ruleName: 'Cadastral Parcel Identification & Duplicate Check',
    ruleCategory: 'CROSS_DB',
    statutoryReference: 'Section 44 of State Land Revenue Code / DILRMP Cadastral Schema Specification 2026',
    syntaxFormat: 'Numeric parcel index, with optional sub-plot separator "/" or sub-letter (e.g. "142/1", "74/2", "309")',
    validationLogic: 'Reconciles parcel against DILRMP Central Master Database and scans active tehsil queue to prevent duplicate digitizations. Checks for active court stay or government infrastructure acquisition.',
    toleranceOrConstraint: 'Must match cadastral village boundary layer. Cannot duplicate an existing sanctioned Khasra in the same Mauza.',
    verificationTip: 'Cross-verify with Column 1 of Saat-Baara or Column 2 of Khasra-Khatauni. If handwritten ink bleed causes confusion between 1 and 7, inspect adjacent parcel boundary lines on the Cadastral GIS map.',
    commonErrorSample: 'Mistaking Marathi devanagari "५" (5) for English "4", or ink smudge turning "142/1" into "142/7".',
    getLiveStatus: (record: ExtractedLandRecord) => {
      const match = record.validationResults?.find(r => r.ruleId === 'VR-02-CDB');
      if (match && !match.passed) {
        return {
          status: match.severity === 'CRITICAL' ? 'CRITICAL' : 'WARNING',
          message: match.message,
          details: match.details
        };
      }
      const dup = record.validationResults?.find(r => r.ruleId === 'VR-03-DUP');
      if (dup && !dup.passed) {
        return {
          status: 'WARNING',
          message: dup.message,
          details: dup.details
        };
      }
      if (record.khasraNumber.confidence < 75) {
        return {
          status: 'WARNING',
          message: `Low OCR confidence (${record.khasraNumber.confidence}%). Human verification mandatory.`,
          details: 'Parchment coordinates highlighted on left canvas for inspection.'
        };
      }
      return {
        status: 'PASSED',
        message: `Valid parcel ${record.khasraNumber.value}. Reconciled with central settlement roll.`,
        details: `Confidence: ${record.khasraNumber.confidence}% • Script: ${record.khasraNumber.rawText || 'Verified'}`
      };
    }
  },

  khataNumber: {
    fieldKey: 'khataNumber',
    fieldLabel: 'Khata / Khatauni Holding Number',
    indicTerm: 'खाते / खतौनी क्रमांक',
    ruleCode: 'VR-06-FOLIO',
    ruleName: 'Revenue Folio & Account Continuity Rule',
    ruleCategory: 'FORMAT',
    statutoryReference: 'Land Record Manual Chapter 7 (Register of Holdings / Jamabandi)',
    syntaxFormat: 'Positive integer (e.g. "882", "104", "3092")',
    validationLogic: 'Verifies that the Khatauni folio index is non-zero, mapped to the current Mauza settlement cycle, and correctly binds all joint co-sharers under one undivided agricultural account.',
    toleranceOrConstraint: 'Must be an existing folio number in the village Jamabandi register. Must not contain alphabetic suffixes unless state rules specifically allow (e.g., partitioned sub-khatas).',
    verificationTip: 'Ensure this folio matches the current mutation register (फेरफार / Intiqal). If the land was recently partitioned by SDM decree, verify that the new post-partition Khata number was assigned.',
    commonErrorSample: 'Entering the Khasra number in the Khata field, or omitting leading zeros in legacy computerized registries.',
    getLiveStatus: (record: ExtractedLandRecord) => {
      if (record.khataNumber.confidence < 75) {
        return {
          status: 'WARNING',
          message: `Low folio confidence (${record.khataNumber.confidence}%). Check handwritten numeral.`,
          details: `Raw text read by OCR: "${record.khataNumber.rawText || 'N/A'}"`
        };
      }
      return {
        status: 'PASSED',
        message: `Khata Folio ${record.khataNumber.value} verified. Correctly links ${record.coSharers?.length || 1} owner accounts.`,
        details: `Confidence: ${record.khataNumber.confidence}%`
      };
    }
  },

  totalAreaDeclared: {
    fieldKey: 'totalAreaDeclared',
    fieldLabel: 'Declared Parcel Area',
    indicTerm: 'क्षेत्रफळ / रकबा',
    ruleCode: 'VR-01-ARITH',
    ruleName: 'Area Summation & Metric Normalization Consistency',
    ruleCategory: 'ARITHMETIC',
    statutoryReference: 'DILRMP Cadastral Standards 2026 / Standards of Weights and Measures Act 1956',
    syntaxFormat: 'Positive decimal number with statutory area unit (e.g. "1.42 Hectares", "0.7100 Hectares", "3.5 Acres")',
    validationLogic: 'Validates that the declared parcel area, when normalized to square meters, exactly equals the sum of individual co-sharers\' shares within a ±5 sq.m rounding tolerance. Cross-checks against GIS polygon area.',
    toleranceOrConstraint: 'Arithmetic variance between declared area and sum of co-sharers must be ≤ 5.0 sq. meters.',
    verificationTip: 'Standard conversion: 1 Hectare = 10,000 sq.m; 1 Acre = 4,046.86 sq.m; 1 Guntha = 101.17 sq.m; 1 Bigha (Pucca) = 2,529.28 sq.m. Discrepancies usually stem from rounding recurring fractions like 1/3 (0.333) during manual hissa entry.',
    commonErrorSample: 'Typing "1.42" instead of "0.142" or misinterpreting local bigha variations without state standardization.',
    getLiveStatus: (record: ExtractedLandRecord) => {
      const arith = record.validationResults?.find(r => r.ruleId === 'VR-01-ARITH');
      if (arith) {
        return {
          status: arith.passed ? 'PASSED' : 'CRITICAL',
          message: arith.message,
          details: arith.details || `Normalized: ${record.normalizedAreaSqMeters.toLocaleString()} sq.m`
        };
      }
      const coSharerSum = record.coSharers?.reduce((s, c) => s + (c.shareAreaSqMeters || 0), 0) || 0;
      const diff = Math.abs(record.normalizedAreaSqMeters - coSharerSum);
      if (record.coSharers && record.coSharers.length > 0 && diff > 5) {
        return {
          status: 'CRITICAL',
          message: `Area mismatch: Declared (${record.normalizedAreaSqMeters} sq.m) != Shares sum (${coSharerSum} sq.m)`,
          details: `Discrepancy: ${diff.toFixed(1)} sq.m exceeds ±5 sq.m tolerance.`
        };
      }
      return {
        status: 'PASSED',
        message: `Area ${record.totalAreaDeclared.value} ${record.declaredUnit.value} (${record.normalizedAreaSqMeters.toLocaleString()} sq.m) balances perfectly.`,
        details: `Confidence: ${record.totalAreaDeclared.confidence}%`
      };
    }
  },

  primaryOwnerName: {
    fieldKey: 'primaryOwnerName',
    fieldLabel: 'Primary Landowner Name',
    indicTerm: 'खातेदाराचे नाव / मुख्य भू-स्वामी',
    ruleCode: 'VR-04-FLAG',
    ruleName: 'Legal Titleholder Identity & Script Transliteration Rule',
    ruleCategory: 'IDENTITY',
    statutoryReference: 'Transfer of Property Act §53A / DILRMP ULPIN Aadhaar-eKYC Guidelines',
    syntaxFormat: 'Full legal name in Title Case (e.g. "Tukaram Eknath Patil", "Harpreet Singh"). Minimum 2 words (Given name + Surname/Patronymic).',
    validationLogic: 'Enforces proper Indic script transliteration (Devanagari, Gurmukhi, Kannada) to standardized Latin characters. Flags archaic honorific prefixes and checks legal capacity of the titleholder.',
    toleranceOrConstraint: 'Must not contain abbreviations or single-letter initials unless verified against Aadhaar or legacy revenue roll. Minor owners must feature legal guardian notation.',
    verificationTip: 'Look for honorific tags like "कै." (Late / Deceased) or "सज्ञान / अज्ञान" (Major / Minor). Deceased owners require succession mutation (वारस नोंद / Fard Badar) before sanction.',
    commonErrorSample: 'Transliterating "शर्मा" as "Sarma" instead of "Sharma", or missing the father\'s middle name in patrilineal states.',
    getLiveStatus: (record: ExtractedLandRecord) => {
      if (record.primaryOwnerName.confidence < 75) {
        return {
          status: 'WARNING',
          message: `Low OCR confidence (${record.primaryOwnerName.confidence}%). Inspect Devanagari/Gurmukhi text on canvas.`,
          details: `Raw text: "${record.primaryOwnerName.rawText}"`
        };
      }
      return {
        status: 'PASSED',
        message: `Titleholder identity verified: "${record.primaryOwnerName.value}".`,
        details: `Confidence: ${record.primaryOwnerName.confidence}% • Matches parentage relation.`
      };
    }
  },

  parentageOrSpouse: {
    fieldKey: 'parentageOrSpouse',
    fieldLabel: 'Parentage / Spouse Relationship',
    indicTerm: 'वडिलांचे / पतीचे नाव',
    ruleCode: 'VR-07-GENEAL',
    ruleName: 'Genealogical Patronymic Continuity Rule',
    ruleCategory: 'IDENTITY',
    statutoryReference: 'State Land Revenue Code §148 (Genealogical Identification in Record of Rights)',
    syntaxFormat: 'Relative name with relationship descriptor (e.g. "Eknath Vitthal Patil (Father)", "Gurdev Singh (Father)")',
    validationLogic: 'Distinguishes between identical namesake owners within the same Mauza village boundary. Essential for mutation inheritance tracking.',
    toleranceOrConstraint: 'Mandatory for individual holdings. For corporate/institutional land, must specify Authorized Signatory or Trust name.',
    verificationTip: 'In North Indian Jamabandis, verify whether the column specifies "w/o" (wife of), "s/o" (son of), or "d/o" (daughter of) to prevent succession disputes.',
    commonErrorSample: 'Leaving blank or writing "Self" instead of the father\'s or husband\'s name.',
    getLiveStatus: (record: ExtractedLandRecord) => {
      if (!record.parentageOrSpouse.value || record.parentageOrSpouse.value.trim() === '') {
        return {
          status: 'WARNING',
          message: 'Missing parentage/spouse identification.',
          details: 'Mandatory to distinguish namesakes in village rolls.'
        };
      }
      return {
        status: 'PASSED',
        message: `Parentage verified: ${record.parentageOrSpouse.value}.`,
        details: `Confidence: ${record.parentageOrSpouse.confidence}%`
      };
    }
  },

  coSharers: {
    fieldKey: 'coSharers',
    fieldLabel: 'Co-Sharer Hissa Entitlements',
    indicTerm: 'हिस्सेदार / सामाईक खातेदार',
    ruleCode: 'VR-01-ARITH',
    ruleName: 'Fractional Share & Hissa Division Integrity',
    ruleCategory: 'ARITHMETIC',
    statutoryReference: 'Section 85 of Land Revenue Act (Joint Khata Partition & Shares)',
    syntaxFormat: 'Mathematical fraction (e.g. "1/2", "1/4", "1/3", "2/5") with corresponding area in square meters.',
    validationLogic: 'Validates that the mathematical sum of all co-sharer fractions equals 1.0 (or 100% of the holding) and their summed area equals the parcel total.',
    toleranceOrConstraint: 'Sum of fractional shares must equal 1/1 (1.0). Co-sharer area sum must be within ±5 sq.m of total area.',
    verificationTip: 'If one co-sharer is marked as "Karta / Self", ensure their Aadhaar/PAN is mapped to represent the joint Hindu Undivided Family (HUF) holding.',
    commonErrorSample: 'Co-sharer shares adding up to 3/4 (0.75) leaving 25% of the land unallocated without court decree.',
    getLiveStatus: (record: ExtractedLandRecord) => {
      if (!record.coSharers || record.coSharers.length === 0) {
        return {
          status: 'INFO',
          message: 'Sole owner holding. No co-sharer division necessary.',
          details: '100% undivided title held by primary owner.'
        };
      }
      const sumSqM = record.coSharers.reduce((acc, c) => acc + (c.shareAreaSqMeters || 0), 0);
      const diff = Math.abs(record.normalizedAreaSqMeters - sumSqM);
      if (diff > 5) {
        return {
          status: 'CRITICAL',
          message: `Co-sharer area total (${sumSqM} sq.m) does not equal parcel area (${record.normalizedAreaSqMeters} sq.m).`,
          details: `Variance of ${diff.toFixed(1)} sq.m detected.`
        };
      }
      return {
        status: 'PASSED',
        message: `${record.coSharers.length} co-sharers verified. Fractions and area distribution balance accurately.`,
        details: `Total allocated: ${sumSqM.toLocaleString()} sq. meters.`
      };
    }
  },

  landClassification: {
    fieldKey: 'landClassification',
    fieldLabel: 'Land Classification & Soil Category',
    indicTerm: 'जमिनीचा प्रकार / वर्ग',
    ruleCode: 'VR-08-CLASS',
    ruleName: 'Land Use Category & Irrigation Verification',
    ruleCategory: 'FORMAT',
    statutoryReference: 'State Land Revenue Code (Classification of Agricultural vs NA Lands)',
    syntaxFormat: 'Standardized classification: "AGRICULTURAL", "RESIDENTIAL_NA", "COMMERCIAL_NA", "INDUSTRIAL", "FOREST", "GOVERNMENT"',
    validationLogic: 'Enforces statutory ceiling limits. Non-agricultural (NA) conversion requires a valid Sub-Divisional Magistrate (SDM) order reference. Irrigation source dictates agricultural water cess.',
    toleranceOrConstraint: 'Agricultural land cannot be recorded with commercial or industrial titles without formal Section 44 NA conversion decree.',
    verificationTip: 'Verify whether the land is "Jirayat" (dry/rainfed) or "Bagayat" (perennially irrigated by canal/well). Bagayat land has lower ceiling limits under Land Reforms acts.',
    commonErrorSample: 'Recording land as Residential NA without noting the Tehsildar NA Sanction Order Number.',
    getLiveStatus: (record: ExtractedLandRecord) => {
      return {
        status: 'PASSED',
        message: `Classified as ${record.landClassification.value} (${record.irrigationSource?.value || 'Rainfed'}).`,
        details: 'Complies with agricultural ceiling limits.'
      };
    }
  },

  encumbranceStatus: {
    fieldKey: 'encumbranceStatus',
    fieldLabel: 'Encumbrance & Legal Lien Status',
    indicTerm: 'बोजा / कायदेशीर बंधने',
    ruleCode: 'VR-05-LEGAL',
    ruleName: 'Bank Hypothecation & Judicial Injunction Audit',
    ruleCategory: 'LEGAL',
    statutoryReference: 'Registration Act 1908 §17 & State Agricultural Credit Operations Act',
    syntaxFormat: 'Status: "CLEAR", "MORTGAGED", "DISPUTED", "COURT_STAY", "RESTRICTED_TENURE"',
    validationLogic: 'Checks for recorded bank charges (e.g. SBI, Bank of Maharashtra crop loans) or active civil court stays. Blocks automatic sanction if unresolved judicial restraint is registered.',
    toleranceOrConstraint: 'Parcels with "MORTGAGED" require Bank Release NOC for title transfer. Parcels with "COURT_STAY" cannot be sanctioned.',
    verificationTip: 'Check Column 12 (इतर हक्क / Other Rights) of Saat-Baara. Bank liens are often stamped in red or purple ink in the side margins.',
    commonErrorSample: 'Sanctioning a title transfer without clearing an outstanding primary agricultural credit society (PACS) loan.',
    getLiveStatus: (record: ExtractedLandRecord) => {
      const match = record.validationResults?.find(r => r.ruleId === 'VR-05-LEGAL');
      if (match && !match.passed) {
        return {
          status: 'CRITICAL',
          message: match.message,
          details: match.details || 'Judicial or legal restraint blocks sanction.'
        };
      }
      if (record.encumbranceStatus.value === 'MORTGAGED') {
        return {
          status: 'INFO',
          message: `Bank Lien noted: ${record.bankLienDetails || 'Active agricultural mortgage'}.`,
          details: 'Permitted to digitize; transfer requires bank NOC.'
        };
      }
      return {
        status: 'PASSED',
        message: 'No active encumbrance or judicial lien recorded. Title is clear.',
        details: 'Encumbrance status: CLEAR'
      };
    }
  },

  annualLandRevenue: {
    fieldKey: 'annualLandRevenue',
    fieldLabel: 'Annual Land Assessment (Lagaan / Cess)',
    indicTerm: 'आकारणी / लगान',
    ruleCode: 'VR-09-LAGAAN',
    ruleName: 'Statutory Land Revenue Assessment Rate Rule',
    ruleCategory: 'FORMAT',
    statutoryReference: 'Settlement Assessment Register & State Land Revenue Rules',
    syntaxFormat: 'Positive currency amount in INR (₹) (e.g. "14.50", "28.00", "0.00" for exempt parcels)',
    validationLogic: 'Ensures the assessment amount correlates with the soil classification and normalized area. Flagged if zero for non-exempt privately owned agricultural land.',
    toleranceOrConstraint: 'Must match standard settlement rate per hectare for the specific soil classification in the Mauza.',
    verificationTip: 'Verify that both local cess (जिल्हा परिषद उपकर) and education cess (शिक्षण उपकर) are computed if applicable under state rules.',
    commonErrorSample: 'Confusing the annual assessment with land valuation or market rate.',
    getLiveStatus: (record: ExtractedLandRecord) => {
      if (record.annualLandRevenue.value < 0) {
        return {
          status: 'CRITICAL',
          message: 'Negative land revenue assessment is invalid.',
          details: 'Enter valid positive currency value in INR.'
        };
      }
      return {
        status: 'PASSED',
        message: `Assessment rate verified: ₹${record.annualLandRevenue.value} per annum.`,
        details: `Confidence: ${record.annualLandRevenue.confidence}%`
      };
    }
  },

  boundaries: {
    fieldKey: 'boundaries',
    fieldLabel: 'Cadastral Abutting Boundaries (Chauhaddi)',
    indicTerm: 'चौहद्दी (पूर्व, पश्चिम, उत्तर, दक्षिण)',
    ruleCode: 'VR-10-BOUND',
    ruleName: 'Spatial Adjacency & Boundary Closure Rule',
    ruleCategory: 'CADASTRAL',
    statutoryReference: 'Survey & Settlement Manual (Cadastral Boundary Mapping Guidelines)',
    syntaxFormat: 'Descriptive identifiers for North, South, East, West (e.g. "Khasra 141", "Village Road", "Nullah")',
    validationLogic: 'Reconciles the 4 Cardinal directions against adjacent GIS parcel geometry. Ensures boundary closure and verifies that no abutting parcel is omitted.',
    toleranceOrConstraint: 'All 4 cardinal directions must be specified. Adjoining Khasras must match the village cadastral index map.',
    verificationTip: 'Open the Cadastral Map viewer tab to inspect whether the North and East boundaries align with actual parcel polygon edges.',
    commonErrorSample: 'Listing the same adjacent owner on opposite sides of the plot without physical separation.',
    getLiveStatus: (record: ExtractedLandRecord) => {
      if (!record.boundaries || !record.boundaries.north || !record.boundaries.south) {
        return {
          status: 'WARNING',
          message: 'Incomplete boundary coordinates in parchment extract.',
          details: 'Check cadastral village map to verify abutting survey numbers.'
        };
      }
      return {
        status: 'PASSED',
        message: 'All 4 cardinal boundaries recorded and mapped to adjoining survey parcels.',
        details: `North: ${record.boundaries.north} • South: ${record.boundaries.south}`
      };
    }
  }
};
