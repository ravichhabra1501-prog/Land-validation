export type DocumentType = 
  | '7_12_EXTRACT' // Maharashtra / Gujarat Saat-Baara
  | 'KHASRA_KHATAUNI' // UP / MP / Bihar
  | 'JAMABANDI' // Punjab / Haryana / HP Nakal
  | 'BHOOMI_RTC' // Karnataka Record of Rights, Tenancy and Crop Inspection
  | 'PATTA_CHITTA' // Tamil Nadu / Andhra Pradesh
  | 'MUTATION_REGISTER' // Dakhil-Kharij register
  | 'CADASTRAL_MAP'; // Aks Shajra / Village cadastral sheet

export type IndicLanguage = 
  | 'hindi'
  | 'marathi'
  | 'punjabi'
  | 'gujarati'
  | 'bengali'
  | 'telugu'
  | 'kannada'
  | 'tamil'
  | 'urdu'
  | 'english';

export type VerificationStatus = 
  | 'PENDING_EXTRACTION'
  | 'PROCESSING'
  | 'NEEDS_REVIEW'
  | 'PARTIALLY_VERIFIED'
  | 'VERIFIED_AND_SANCTIONED'
  | 'REJECTED';

export type UserRole = 
  | 'REVENUE_OFFICER' // Tehsildar / Sub-Divisional Magistrate
  | 'VERIFICATION_SPECIALIST' // Patwari / Lekhpal / Surveyor
  | 'SETTLEMENT_OFFICER' // Settlement Commissioner
  | 'CITIZEN_VIEWER'; // Public inquiry portal

export interface FieldItem<T = string> {
  value: T;
  rawText?: string;
  confidence: number; // 0 to 100
  isHandwritten?: boolean;
  boundingBox?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  isFlagged?: boolean;
  flagReason?: string;
  verifiedBy?: string;
  verifiedAt?: string;
  originalExtractedValue?: T;
}

export interface CoSharer {
  id: string;
  name: string;
  relation: string; // e.g., "S/o Ram Singh"
  shareFraction: string; // e.g., "1/3", "25%"
  shareAreaSqMeters: number;
  panOrAadhaarRef?: string;
}

export interface MutationEntry {
  mutationNumber: string;
  dateOfOrder: string;
  sanctioningOfficer: string;
  mutationType: 'SALE_DEED' | 'INHERITANCE' | 'PARTITION' | 'GIFT' | 'MORTGAGE';
  transferor: string;
  transferee: string;
  status: 'SANCTIONED' | 'DISPUTED' | 'PENDING';
  remarks?: string;
}

export interface CadastralBoundary {
  north: string;
  south: string;
  east: string;
  west: string;
}

export interface ValidationRuleResult {
  ruleId: string;
  ruleName: string;
  category: 'ARITHMETIC' | 'FORMAT' | 'CROSS_DB' | 'DUPLICATE' | 'LEGAL';
  passed: boolean;
  severity: 'CRITICAL' | 'WARNING' | 'INFO';
  message: string;
  details?: string;
}

export interface ExtractedLandRecord {
  id: string;
  documentNumber: string; // e.g. "MH-PUN-HAV-2024-712-882"
  documentType: DocumentType;
  primaryLanguage: IndicLanguage;
  script: string;
  sourceFileName: string;
  sourceImageUrl: string;
  uploadedAt: string;
  uploadedBy: string;
  status: VerificationStatus;
  overallConfidence: number; // 0 to 100

  // Administrative hierarchy
  state: FieldItem<string>;
  district: FieldItem<string>;
  tehsil: FieldItem<string>; // Taluka / Sub-district
  village: FieldItem<string>; // Mauza / Gram Panchayat
  censusVillageCode?: FieldItem<string>;

  // Cadastral Identifiers
  khasraNumber: FieldItem<string>; // Survey No / Dag No / Gat No
  khataNumber: FieldItem<string>; // Khatauni No / Ledger Folio
  subDivisionNumber?: FieldItem<string>; // Hissa No

  // Ownership Details
  primaryOwnerName: FieldItem<string>;
  parentageOrSpouse: FieldItem<string>;
  coSharers: CoSharer[];
  totalOwnersCount: number;

  // Land Attributes & Area
  landClassification: FieldItem<string>; // e.g., "Jirayat / Agricultural (Bagayat)", "Nahri (Canal-irrigated)", "Abadi"
  irrigationSource?: FieldItem<string>;
  totalAreaDeclared: FieldItem<number>; // In standard unit (hectares or acres)
  declaredUnit: FieldItem<'HECTARE' | 'ACRE' | 'BIGHA' | 'GUNTHA' | 'SQ_METERS'>;
  normalizedAreaSqMeters: number;

  // Financial & Legal
  annualLandRevenue: FieldItem<number>; // Lagaan / Assessment fee in INR
  encumbranceStatus: FieldItem<'CLEAR' | 'MORTGAGED' | 'COURT_STAY' | 'GOVT_ACQUISITION'>;
  bankLienDetails?: string;

  // Mutation and Boundaries
  mutations: MutationEntry[];
  boundaries?: CadastralBoundary;
  cadastralPolygon?: [number, number][]; // coordinates for GIS view

  // Pre-processing and Diagnostics
  preprocessingMetrics: {
    deskewAngleDegrees: number;
    contrastScore: number;
    dpiEstimated: number;
    binarizationMethod: 'Otsu' | 'Sauvola' | 'AdaptiveGaussian';
    noiseReductionApplied: boolean;
  };

  // Validation Audit
  validationResults: ValidationRuleResult[];
  reviewHistory: {
    timestamp: string;
    officerName: string;
    role: UserRole;
    action: string;
    notes?: string;
  }[];
  modificationHistory?: RecordModificationEntry[];
  changeLog?: ChangeLogEntry[];
}

export interface ChangeLogEntry {
  id: string;
  timestamp: string; // ISO 8601 string e.g. "2026-09-02T10:25:00Z"
  officerName: string; // Name of the officer or system who performed the change
  role: UserRole | 'SYSTEM' | 'AI_OCR_ENGINE' | string;
  action: string; // e.g. 'FIELD_CORRECTION', 'SANCTION_APPROVAL', 'STATUS_CHANGE', 'INITIAL_INGESTION', 'ADMINISTRATIVE_NOTE'
  fieldKey?: string; // e.g. "khasraNumber", "primaryOwnerName", "totalAreaDeclared"
  fieldLabel?: string; // Human readable field label e.g. "Khasra / Gat Number"
  oldValue?: string; // Prior value before modification
  newValue?: string; // New value after modification
  reason?: string; // Reason or verification discrepancy justification
  remarks?: string; // Extended officer notes or legal reference
  digitalSignature?: string; // DSC electronic token or attestation hash
  sourceTerminal?: string; // Device or terminal workstation ID
}

export type ModificationChangeType = 
  | 'FIELD_CORRECTION'
  | 'SANCTION_APPROVAL'
  | 'STATUS_CHANGE'
  | 'MUTATION_RECORDED'
  | 'INITIAL_INGESTION'
  | 'BOUNDARY_RECTIFICATION'
  | 'ENCUMBRANCE_UPDATE'
  | 'ADMINISTRATIVE_NOTE';

export interface RecordModificationEntry {
  id: string;
  timestamp: string; // ISO string e.g. "2026-09-02T10:25:00Z"
  userId: string;
  userName: string;
  userRole: UserRole | 'SYSTEM' | 'AI_OCR_ENGINE';
  changeType: ModificationChangeType;
  fieldKey?: string;
  fieldLabel?: string;
  previousValue?: string;
  newValue?: string;
  reason?: string;
  notes?: string;
  digitalSignatureRef?: string;
  sourceTerminal?: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  designation: string;
  jurisdiction: string;
  terminalId: string;
  loginTimestamp: string;
  avatarInitials: string;
  badgeNumber?: string;
  digitalTokenId?: string;
  assignedVillage?: string;
  assignedKhasra?: string;
}

export interface StateDigitizationProgress {
  stateName: string;
  totalVillages: number;
  digitizedVillages: number;
  totalRecords: number;
  digitizedRecords: number;
  verifiedPercentage: number;
  cadastralMapsDigitized: number;
  totalCadastralMaps: number;
  averageOcrConfidence: number;
}

export interface ValidationTrendDataPoint {
  date: string; // e.g. "2025-09-12"
  displayDate: string; // e.g. "Sep 12, '25"
  monthKey: string; // e.g. "Sep '25"
  sanctioned: number;
  needsReview: number;
  rejected: number;
  totalProcessed: number;
  passRate: number; // percentage, e.g. 91.5
  cumulativeSanctioned: number;
}

export type CitizenFeedbackCategory = 
  | 'BOUNDARY_DISCREPANCY' // Boundary Demarcation & Medhbandi
  | 'AREA_VARIANCE' // Area Discrepancy between Ground & RoR Record
  | 'CO_SHARER_DISPUTE' // Hissa division / co-sharer boundary clarification
  | 'DRONE_SURVEY_INQUIRY' // SVAMITVA / Drone Orthophoto Ground-Truthing
  | 'MUTATION_INQUIRY' // Mutation / Title Transfer Delay
  | 'GENERAL_FEEDBACK'; // General Portal Feedback / Suggestion

export type ConsultationMode = 
  | 'IN_PERSON_TEHSIL' // In-person at Tehsil Cadastral GIS Center
  | 'FIELD_DEMARCATION' // On-site Field Demarcation by GIS Surveyor
  | 'VIRTUAL_MEETING'; // Virtual Video Consultation (NIC Video Meet)

export type AppointmentStatus = 
  | 'SCHEDULED'
  | 'CONFIRMED'
  | 'SURVEY_DISPATCHED'
  | 'RESOLVED'
  | 'CANCELLED';

export interface CitizenAppointment {
  id: string; // e.g. "GIS-APT-2026-8801"
  citizenName: string;
  citizenPhone: string;
  citizenAadhaarOrId?: string;
  citizenEmail?: string;
  village: string;
  khasraNumber: string;
  khataNumber?: string;
  category: CitizenFeedbackCategory;
  feedbackText: string;
  consultationMode: ConsultationMode;
  preferredDate: string; // e.g. "2026-09-22"
  preferredTimeSlot: string; // e.g. "11:00 AM - 11:45 AM"
  assignedOfficerName: string; // e.g. "Dr. Priya Nair"
  assignedOfficerDesignation: string; // e.g. "Settlement & Cadastral GIS Officer"
  status: AppointmentStatus;
  createdAt: string;
  officerRemarks?: string;
  venueOrMeetingLink?: string;
  rescheduledCount?: number;
}

