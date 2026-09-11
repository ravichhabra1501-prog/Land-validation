import { ExtractedLandRecord, StateDigitizationProgress } from '../types';
import { ADDITIONAL_LAND_RECORDS } from './additionalSampleRecords';

export const INITIAL_LAND_RECORDS: ExtractedLandRecord[] = [
  {
    id: 'REC-MH-712-8821',
    documentNumber: 'MH-PUN-HAV-2024-712-882',
    documentType: '7_12_EXTRACT',
    primaryLanguage: 'marathi',
    script: 'Devanagari (मराठी)',
    sourceFileName: 'Wagholi_Gat142_SaatBaara_Scan1984.pdf',
    sourceImageUrl: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=1200',
    uploadedAt: '2026-08-28T14:32:00Z',
    uploadedBy: 'Inspector S. K. Kulkarni (Haveli Tehsil)',
    status: 'NEEDS_REVIEW',
    overallConfidence: 78.4,

    state: { value: 'Maharashtra', rawText: 'महाराष्ट्र शासन', confidence: 99 },
    district: { value: 'Pune', rawText: 'पुणे', confidence: 97 },
    tehsil: { value: 'Haveli', rawText: 'हवेली', confidence: 96 },
    village: { value: 'Wagholi', rawText: 'वाघोली', confidence: 98 },
    censusVillageCode: { value: '556102', rawText: '५५६१०२', confidence: 94 },

    khasraNumber: { 
      value: '142/1', 
      rawText: 'गट क्र. १४२/१', 
      confidence: 91,
      isHandwritten: false,
      boundingBox: { x: 42, y: 18, width: 22, height: 6 }
    },
    khataNumber: { 
      value: '882', 
      rawText: 'खाते क्र. ८८२', 
      confidence: 95,
      isHandwritten: false,
      boundingBox: { x: 70, y: 18, width: 18, height: 6 }
    },
    subDivisionNumber: { value: '1', rawText: 'पोट हिस्सा १', confidence: 89 },

    primaryOwnerName: { 
      value: 'Tukaram Eknath Patil', 
      rawText: 'तुकाराम एकनाथ पाटील', 
      confidence: 94,
      isHandwritten: false,
      boundingBox: { x: 12, y: 36, width: 38, height: 7 }
    },
    parentageOrSpouse: { 
      value: 'Eknath Vitthal Patil', 
      rawText: 'एकनाथ विठ्ठल पाटील (वडील)', 
      confidence: 92 
    },
    totalOwnersCount: 2,
    coSharers: [
      {
        id: 'CS-01',
        name: 'Tukaram Eknath Patil',
        relation: 'Self / Karta',
        shareFraction: '1/2',
        shareAreaSqMeters: 7100,
        panOrAadhaarRef: 'XXXX-XXXX-8912'
      },
      {
        id: 'CS-02',
        name: 'Santosh Tukaram Patil',
        relation: 'Son',
        shareFraction: '1/2',
        shareAreaSqMeters: 7100,
        panOrAadhaarRef: 'XXXX-XXXX-3401'
      }
    ],

    landClassification: { 
      value: 'Jirayat Class II (Rainfed Agricultural)', 
      rawText: 'जिरायत वर्ग २', 
      confidence: 88 
    },
    irrigationSource: { 
      value: 'Borewell & Canal tributary', 
      rawText: 'विहीर व उपसा सिंचन', 
      confidence: 68,
      isHandwritten: true,
      isFlagged: true,
      flagReason: 'Handwritten ink bleed in irrigation remarks; low OCR confidence (68%)'
    },
    totalAreaDeclared: { 
      value: 1.42, 
      rawText: '१ हेक्टर ४२ आर (१.४२)', 
      confidence: 93,
      boundingBox: { x: 12, y: 52, width: 28, height: 7 }
    },
    declaredUnit: { value: 'HECTARE', confidence: 99 },
    normalizedAreaSqMeters: 14200,

    annualLandRevenue: { value: 48.50, rawText: 'रु. ४८.५०', confidence: 90 },
    encumbranceStatus: { 
      value: 'MORTGAGED', 
      rawText: 'बँक ऑफ महाराष्ट्र शाखा वाघोली बोजा नोंद', 
      confidence: 72,
      isHandwritten: true,
      isFlagged: true,
      flagReason: 'Bank mortgage annotation written by hand in pencil (needs officer confirmation)'
    },
    bankLienDetails: 'Bank of Maharashtra, Wagholi Branch - Crop loan hypothecation of INR 2,50,000/- dated 12/03/2019',

    mutations: [
      {
        mutationNumber: 'MR-2022-8419',
        dateOfOrder: '2022-11-14',
        sanctioningOfficer: 'Circle Officer, Wagholi',
        mutationType: 'INHERITANCE',
        transferor: 'Late Eknath Vitthal Patil',
        transferee: 'Tukaram Eknath Patil & Santosh Patil',
        status: 'SANCTIONED',
        remarks: 'Waras/Heirship entry sanctioned vide circle order #8419'
      },
      {
        mutationNumber: 'MR-2024-1021',
        dateOfOrder: '2024-03-02',
        sanctioningOfficer: 'Tehsildar Haveli',
        mutationType: 'MORTGAGE',
        transferor: 'Tukaram Eknath Patil',
        transferee: 'Bank of Maharashtra',
        status: 'SANCTIONED',
        remarks: 'Bhoja nod recorded for agricultural modernization scheme'
      }
    ],

    boundaries: {
      north: 'Gat No. 141 (Agricultural field of D. B. Jadhav)',
      south: 'Village Nala and DP Road boundary',
      east: 'Gat No. 143 (Babanrao Shinde)',
      west: 'Gat No. 142/2 (Co-divided holding)'
    },

    cadastralPolygon: [
      [73.9812, 18.5791],
      [73.9845, 18.5794],
      [73.9841, 18.5768],
      [73.9808, 18.5765]
    ],

    preprocessingMetrics: {
      deskewAngleDegrees: -1.84,
      contrastScore: 84.2,
      dpiEstimated: 300,
      binarizationMethod: 'Sauvola',
      noiseReductionApplied: true
    },

    validationResults: [
      {
        ruleId: 'VR-01-ARITH',
        ruleName: 'Area Summation Consistency',
        category: 'ARITHMETIC',
        passed: true,
        severity: 'INFO',
        message: 'Sum of co-sharer areas (7,100 + 7,100 = 14,200 sq.m) perfectly matches declared 1.42 Hectares.'
      },
      {
        ruleId: 'VR-02-CDB',
        ruleName: 'DILRMP Central Registry Cross-Check',
        category: 'CROSS_DB',
        passed: true,
        severity: 'INFO',
        message: 'Matches Master Land Settlement Record for Wagholi Gat 142/1.'
      },
      {
        ruleId: 'VR-03-DUP',
        ruleName: 'Cadastral Duplicate Detection',
        category: 'DUPLICATE',
        passed: true,
        severity: 'INFO',
        message: 'No duplicate entry found in current digitization pipeline.'
      },
      {
        ruleId: 'VR-04-FLAG',
        ruleName: 'Low-Confidence Handwritten Field',
        category: 'FORMAT',
        passed: false,
        severity: 'WARNING',
        message: 'Irrigation Remarks (68%) and Mortgage Status (72%) require mandatory Revenue Officer verification.',
        details: 'Handwritten annotations in right margin require human confirmation before sync to LRMS.'
      }
    ],

    reviewHistory: [
      {
        timestamp: '2026-08-28T14:32:00Z',
        officerName: 'AI OCR Pipeline v3.8',
        role: 'VERIFICATION_SPECIALIST',
        action: 'Ingested & Extracted',
        notes: 'Pre-processed via OpenCV Sauvola filter; OCR extraction completed with 2 low-confidence flags.'
      }
    ]
  },
  {
    id: 'REC-UP-KHASRA-5120',
    documentNumber: 'UP-VAR-PIN-2024-KHASRA-512',
    documentType: 'KHASRA_KHATAUNI',
    primaryLanguage: 'hindi',
    script: 'Devanagari (हिन्दी)',
    sourceFileName: 'Babatpur_Khasra512_KhatauniExtract.pdf',
    sourceImageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=1200',
    uploadedAt: '2026-08-30T10:15:00Z',
    uploadedBy: 'Lekhpal Rajeshwar Yadav (Pindra Tehsil)',
    status: 'VERIFIED_AND_SANCTIONED',
    overallConfidence: 96.8,

    state: { value: 'Uttar Pradesh', rawText: 'उत्तर प्रदेश शासन', confidence: 99 },
    district: { value: 'Varanasi', rawText: 'वाराणसी', confidence: 99 },
    tehsil: { value: 'Pindra', rawText: 'पिण्डरा', confidence: 98 },
    village: { value: 'Babatpur', rawText: 'बाबतपुर', confidence: 99 },
    censusVillageCode: { value: '208941', rawText: '२०८९४१', confidence: 97 },

    khasraNumber: { 
      value: '512', 
      rawText: 'खसरा सं. ५१२', 
      confidence: 98,
      isHandwritten: false,
      boundingBox: { x: 38, y: 22, width: 18, height: 6 }
    },
    khataNumber: { 
      value: '00142', 
      rawText: 'खाता संख्या ००१४२', 
      confidence: 97,
      isHandwritten: false,
      boundingBox: { x: 62, y: 22, width: 22, height: 6 }
    },

    primaryOwnerName: { 
      value: 'Dharmendra Nath Tiwari', 
      rawText: 'धर्मेन्द्र नाथ तिवारी', 
      confidence: 98,
      isHandwritten: false,
      boundingBox: { x: 15, y: 38, width: 42, height: 6 }
    },
    parentageOrSpouse: { 
      value: 'Late Kedarnath Tiwari', 
      rawText: 'स्व. केदारनाथ तिवारी', 
      confidence: 96 
    },
    totalOwnersCount: 2,
    coSharers: [
      {
        id: 'CS-UP-1',
        name: 'Dharmendra Nath Tiwari',
        relation: 'S/o Kedarnath Tiwari',
        shareFraction: '1/2',
        shareAreaSqMeters: 12650,
        panOrAadhaarRef: 'XXXX-XXXX-9901'
      },
      {
        id: 'CS-UP-2',
        name: 'Virendra Nath Tiwari',
        relation: 'S/o Kedarnath Tiwari',
        shareFraction: '1/2',
        shareAreaSqMeters: 12650,
        panOrAadhaarRef: 'XXXX-XXXX-9902'
      }
    ],

    landClassification: { 
      value: 'Sankramaniya Bhumidhar (Transferable Rights)', 
      rawText: 'संक्रमणीय भूमिधर (दो फसली सिंचित)', 
      confidence: 97 
    },
    irrigationSource: { 
      value: 'Rajbaha / State Tube Well No. 14', 
      rawText: 'राजबहा व राजकीय नलकूप सं. १४', 
      confidence: 94 
    },
    totalAreaDeclared: { 
      value: 2.53, 
      rawText: '२.५३०० हेक्टेयर', 
      confidence: 98,
      boundingBox: { x: 15, y: 55, width: 25, height: 6 }
    },
    declaredUnit: { value: 'HECTARE', confidence: 99 },
    normalizedAreaSqMeters: 25300,

    annualLandRevenue: { value: 72.00, rawText: '७२.०० रु.', confidence: 96 },
    encumbranceStatus: { value: 'CLEAR', rawText: 'निर्दोष / भारमुक्त', confidence: 95 },

    mutations: [
      {
        mutationNumber: 'DK-2023-7721',
        dateOfOrder: '2023-08-19',
        sanctioningOfficer: 'Naib Tehsildar Pindra',
        mutationType: 'INHERITANCE',
        transferor: 'Kedarnath Tiwari',
        transferee: 'Dharmendra & Virendra Nath Tiwari',
        status: 'SANCTIONED',
        remarks: 'Order under Section 34/35 UP Revenue Code 2006.'
      }
    ],

    boundaries: {
      north: 'Khasra No. 511 (Gram Sabha Pokhari / Water Body)',
      south: 'Chak Road 8m wide',
      east: 'Khasra No. 513 (Om Prakash Pandey)',
      west: 'Khasra No. 509 (Surya Prakash Tiwari)'
    },

    cadastralPolygon: [
      [82.8591, 25.4412],
      [82.8632, 25.4418],
      [82.8628, 25.4385],
      [82.8585, 25.4381]
    ],

    preprocessingMetrics: {
      deskewAngleDegrees: 0.12,
      contrastScore: 92.5,
      dpiEstimated: 350,
      binarizationMethod: 'Otsu',
      noiseReductionApplied: true
    },

    validationResults: [
      {
        ruleId: 'VR-01-ARITH',
        ruleName: 'Area Summation Consistency',
        category: 'ARITHMETIC',
        passed: true,
        severity: 'INFO',
        message: 'Sum of co-sharers (12,650 + 12,650 = 25,300 sq.m) exactly matches declared 2.53 Ha.'
      },
      {
        ruleId: 'VR-02-CDB',
        ruleName: 'DILRMP Central Registry Cross-Check',
        category: 'CROSS_DB',
        passed: true,
        severity: 'INFO',
        message: 'Matches central Bhulekh UP master registry for Khasra 512, Babatpur.'
      },
      {
        ruleId: 'VR-03-DUP',
        ruleName: 'Cadastral Duplicate Detection',
        category: 'DUPLICATE',
        passed: true,
        severity: 'INFO',
        message: 'No duplicate records found.'
      },
      {
        ruleId: 'VR-05-LEGAL',
        ruleName: 'Revenue Code Section 34 Compliance',
        category: 'LEGAL',
        passed: true,
        severity: 'INFO',
        message: 'Mutation duly entered in R-6 register and authenticated.'
      }
    ],

    reviewHistory: [
      {
        timestamp: '2026-08-30T10:15:00Z',
        officerName: 'AI OCR Pipeline v3.8',
        role: 'VERIFICATION_SPECIALIST',
        action: 'Ingested & Extracted'
      },
      {
        timestamp: '2026-08-31T11:40:00Z',
        officerName: 'SDM Alok Srivastava',
        role: 'REVENUE_OFFICER',
        action: 'Sanctioned & Digitized',
        notes: 'Digitally signed with DSC token #GOI-UP-VAR-9942'
      }
    ]
  },
  {
    id: 'REC-PB-JAM-3412',
    documentNumber: 'PB-LDH-JAG-2024-JAM-3412',
    documentType: 'JAMABANDI',
    primaryLanguage: 'punjabi',
    script: 'Gurmukhi (ਪੰਜਾਬੀ)',
    sourceFileName: 'Raikot_Jamabandi_1998_2003_Nakal.pdf',
    sourceImageUrl: 'https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&q=80&w=1200',
    uploadedAt: '2026-08-31T16:20:00Z',
    uploadedBy: 'Kanungo Harinder Gill (Jagraon Tehsil)',
    status: 'NEEDS_REVIEW',
    overallConfidence: 74.2,

    state: { value: 'Punjab', rawText: 'ਸਰਕਾਰ ਪੰਜਾਬ', confidence: 98 },
    district: { value: 'Ludhiana', rawText: 'ਲੁਧਿਆਣਾ', confidence: 97 },
    tehsil: { value: 'Jagraon', rawText: 'ਜਗਰਾਉਂ', confidence: 96 },
    village: { value: 'Raikot', rawText: 'ਰਾਏਕੋਟ (ਹੱਦਬਸਤ ਨੰ. ੧੨੪)', confidence: 95 },
    censusVillageCode: { value: '032114', rawText: '੦੩੨੧੧੪', confidence: 91 },

    khasraNumber: { 
      value: '34//12/2', 
      rawText: 'ਮੁਸਤੀਲ ਨੰ. ੩੪ ਕਿੱਲਾ ਨੰ. ੧੨/੨', 
      confidence: 86,
      isHandwritten: true,
      boundingBox: { x: 35, y: 24, width: 24, height: 6 }
    },
    khataNumber: { 
      value: '104/218', 
      rawText: 'ਖੇਵਟ ਨੰ. ੧੦੪ ਖਤੌਨੀ ਨੰ. ੨੧੮', 
      confidence: 92,
      isHandwritten: false,
      boundingBox: { x: 65, y: 24, width: 20, height: 6 }
    },

    primaryOwnerName: { 
      value: 'Gurpreet Singh', 
      rawText: 'ਗੁਰਪ੍ਰੀਤ ਸਿੰਘ', 
      confidence: 92,
      isHandwritten: false,
      boundingBox: { x: 12, y: 40, width: 34, height: 6 }
    },
    parentageOrSpouse: { 
      value: 'Baldev Singh s/o Joginder Singh', 
      rawText: 'ਪੁੱਤਰ ਬਲਦੇਵ ਸਿੰਘ ਪੁੱਤਰ ਜੋਗਿੰਦਰ ਸਿੰਘ', 
      confidence: 89 
    },
    totalOwnersCount: 2,
    coSharers: [
      {
        id: 'CS-PB-1',
        name: 'Gurpreet Singh',
        relation: 'S/o Baldev Singh',
        shareFraction: '1/2',
        shareAreaSqMeters: 8093.5,
        panOrAadhaarRef: 'XXXX-XXXX-1122'
      },
      {
        id: 'CS-PB-2',
        name: 'Balwinder Kaur',
        relation: 'W/o Gurpreet Singh',
        shareFraction: '1/2',
        shareAreaSqMeters: 8093.5,
        panOrAadhaarRef: 'XXXX-XXXX-1123'
      }
    ],

    landClassification: { 
      value: 'Nehri / Chahi (Canal & Tubewell Irrigated)', 
      rawText: 'ਨਹਿਰੀ / ਚਾਹੀ ਖੇਤੀਬਾੜੀ', 
      confidence: 87 
    },
    irrigationSource: { 
      value: 'Sirhind Canal feeder minor', 
      rawText: 'ਸਰਹਿੰਦ ਨਹਿਰ ਖਾਲ਼ਾ', 
      confidence: 85 
    },
    totalAreaDeclared: { 
      value: 4.0, 
      rawText: '੪ ਏਕੜ (੩੨ ਕਨਾਲ - ੦ ਮਰਲਾ)', 
      confidence: 79,
      isHandwritten: true,
      boundingBox: { x: 12, y: 58, width: 28, height: 7 }
    },
    declaredUnit: { value: 'ACRE', confidence: 98 },
    normalizedAreaSqMeters: 16187,

    annualLandRevenue: { value: 64.00, rawText: '੬੪ ਰੁਪਏ ਮਾਮਲਾ', confidence: 88 },
    encumbranceStatus: { 
      value: 'COURT_STAY', 
      rawText: 'ਅਦਾਲਤੀ ਰੋਕ / ਸਿਵਲ ਮੁਕੱਦਮਾ ਨੰ. ੪੧/੨੦੨੩', 
      confidence: 64,
      isHandwritten: true,
      isFlagged: true,
      flagReason: 'Handwritten red-ink marginal note indicates stay order by Civil Court Jagraon'
    },
    bankLienDetails: 'Civil Suit No. 41/2023 pending before Senior Sub-Judge Jagraon regarding partition dispute',

    mutations: [
      {
        mutationNumber: 'JAM-2023-441',
        dateOfOrder: '2023-05-12',
        sanctioningOfficer: 'Tehsildar Jagraon',
        mutationType: 'PARTITION',
        transferor: 'Joint Family Khata 104',
        transferee: 'Gurpreet Singh & Balwinder Kaur',
        status: 'DISPUTED',
        remarks: 'Challenged in appeal before Additional Deputy Commissioner (D)'
      }
    ],

    boundaries: {
      north: 'Khasra 34//11 (Sohan Singh)',
      south: 'Village Link Phirni Road 12 Karams wide',
      east: 'Water Course (Khala / Nala)',
      west: 'Khasra 34//12/1 (Tejinder Singh)'
    },

    cadastralPolygon: [
      [75.4811, 30.6512],
      [75.4848, 30.6515],
      [75.4842, 30.6481],
      [75.4805, 30.6478]
    ],

    preprocessingMetrics: {
      deskewAngleDegrees: -3.45,
      contrastScore: 71.0,
      dpiEstimated: 240,
      binarizationMethod: 'AdaptiveGaussian',
      noiseReductionApplied: true
    },

    validationResults: [
      {
        ruleId: 'VR-01-ARITH',
        ruleName: 'Area Summation Consistency',
        category: 'ARITHMETIC',
        passed: true,
        severity: 'INFO',
        message: 'Co-sharer shares match declared 4 Acres.'
      },
      {
        ruleId: 'VR-02-CDB',
        ruleName: 'DILRMP Central Registry Cross-Check',
        category: 'CROSS_DB',
        passed: false,
        severity: 'CRITICAL',
        message: 'Status mismatch: Central database flags pending partition dispute (Civil Suit 41/2023).',
        details: 'Record cannot be auto-sanctioned without verifying stay status from Court Case Monitoring System.'
      },
      {
        ruleId: 'VR-04-FLAG',
        ruleName: 'Degraded Marginal Note Detection',
        category: 'FORMAT',
        passed: false,
        severity: 'WARNING',
        message: 'Red ink annotation on right margin has low optical confidence (64%).'
      }
    ],

    reviewHistory: [
      {
        timestamp: '2026-08-31T16:20:00Z',
        officerName: 'AI OCR Pipeline v3.8',
        role: 'VERIFICATION_SPECIALIST',
        action: 'Ingested & Flagged for Legal Check'
      }
    ]
  },
  {
    id: 'REC-KA-RTC-8930',
    documentNumber: 'KA-MYS-NAN-2024-RTC-893',
    documentType: 'BHOOMI_RTC',
    primaryLanguage: 'kannada',
    script: 'Kannada (ಕನ್ನಡ)',
    sourceFileName: 'Hullahalli_Survey89_RTC_Form16.pdf',
    sourceImageUrl: 'https://images.unsplash.com/photo-1544717302-de2939b7ef71?auto=format&fit=crop&q=80&w=1200',
    uploadedAt: '2026-09-01T08:45:00Z',
    uploadedBy: 'Village Accountant Ramesh Gowda (Nanjangud)',
    status: 'VERIFIED_AND_SANCTIONED',
    overallConfidence: 95.1,

    state: { value: 'Karnataka', rawText: 'ಕರ್ನಾಟಕ ಸರ್ಕಾರ', confidence: 99 },
    district: { value: 'Mysuru', rawText: 'ಮೈಸೂರು', confidence: 98 },
    tehsil: { value: 'Nanjangud', rawText: 'ನಂಜನಗೂಡು', confidence: 98 },
    village: { value: 'Hullahalli', rawText: 'ಹುಲ್ಲಹಳ್ಳಿ', confidence: 97 },
    censusVillageCode: { value: '618902', rawText: '೬೧೮೯೦೨', confidence: 96 },

    khasraNumber: { 
      value: '89/3', 
      rawText: 'ಸರ್ವೆ ನಂ. ೮೯/೩', 
      confidence: 97,
      isHandwritten: false,
      boundingBox: { x: 30, y: 20, width: 20, height: 6 }
    },
    khataNumber: { 
      value: 'KH-402', 
      rawText: 'ಖಾತಾ ನಂ. ೪೦೨', 
      confidence: 96,
      isHandwritten: false,
      boundingBox: { x: 60, y: 20, width: 22, height: 6 }
    },

    primaryOwnerName: { 
      value: 'Basavaraju M.', 
      rawText: 'ಬಸವರಾಜು ಎಂ.', 
      confidence: 96,
      isHandwritten: false,
      boundingBox: { x: 15, y: 36, width: 36, height: 6 }
    },
    parentageOrSpouse: { 
      value: 'Late Marigowda', 
      rawText: 'ತಂದೆ ಮಾರಿಗೌಡ', 
      confidence: 94 
    },
    totalOwnersCount: 2,
    coSharers: [
      {
        id: 'CS-KA-1',
        name: 'Basavaraju M.',
        relation: 'S/o Marigowda',
        shareFraction: '1/2',
        shareAreaSqMeters: 6070,
        panOrAadhaarRef: 'XXXX-XXXX-6612'
      },
      {
        id: 'CS-KA-2',
        name: 'Chennamma B.',
        relation: 'Wife',
        shareFraction: '1/2',
        shareAreaSqMeters: 6070,
        panOrAadhaarRef: 'XXXX-XXXX-6613'
      }
    ],

    landClassification: { 
      value: 'Wetland (Tari - Canal Irrigated Paddy)', 
      rawText: 'ತರಿ ಜಮೀನು (ಕಬಿನಿ ಅಚ್ಚುಕಟ್ಟು)', 
      confidence: 95 
    },
    irrigationSource: { 
      value: 'Kabini Right Bank Canal', 
      rawText: 'ಕಬಿನಿ ಬಲದಂಡೆ ನಾಲೆ', 
      confidence: 94 
    },
    totalAreaDeclared: { 
      value: 3.0, 
      rawText: '೩ ಎಕರೆ ೦ ಗುಂಟೆ (3-00)', 
      confidence: 97,
      boundingBox: { x: 15, y: 52, width: 24, height: 6 }
    },
    declaredUnit: { value: 'ACRE', confidence: 99 },
    normalizedAreaSqMeters: 12140,

    annualLandRevenue: { value: 52.00, rawText: 'ಕಂದಾಯ ರೂ. ೫೨.೦೦', confidence: 94 },
    encumbranceStatus: { value: 'CLEAR', rawText: 'ನಿರ್ಭಂದಗಳಿಲ್ಲ (Clear)', confidence: 96 },

    mutations: [
      {
        mutationNumber: 'BHOOMI-2024-9182',
        dateOfOrder: '2024-01-18',
        sanctioningOfficer: 'Tahsildar Nanjangud',
        mutationType: 'SALE_DEED',
        transferor: 'Shivalingappa',
        transferee: 'Basavaraju M.',
        status: 'SANCTIONED',
        remarks: 'Registered Deed #4412/2023 Sub-Registrar Nanjangud'
      }
    ],

    boundaries: {
      north: 'Survey No. 89/1 (Forest department boundary)',
      south: 'Village cart track',
      east: 'Survey No. 90 (Nanjundaiah)',
      west: 'Survey No. 89/2 (Puttaswamy)'
    },

    cadastralPolygon: [
      [76.6781, 12.1192],
      [76.6818, 12.1195],
      [76.6812, 12.1162],
      [76.6775, 12.1158]
    ],

    preprocessingMetrics: {
      deskewAngleDegrees: 0.05,
      contrastScore: 94.0,
      dpiEstimated: 300,
      binarizationMethod: 'Otsu',
      noiseReductionApplied: false
    },

    validationResults: [
      {
        ruleId: 'VR-01-ARITH',
        ruleName: 'Area Summation Consistency',
        category: 'ARITHMETIC',
        passed: true,
        severity: 'INFO',
        message: '3.00 Acres matches sub-parcel dimensions.'
      },
      {
        ruleId: 'VR-02-CDB',
        ruleName: 'DILRMP Central Registry Cross-Check',
        category: 'CROSS_DB',
        passed: true,
        severity: 'INFO',
        message: 'Matches Karnataka Bhoomi 3.0 electronic schema.'
      },
      {
        ruleId: 'VR-03-DUP',
        ruleName: 'Cadastral Duplicate Detection',
        category: 'DUPLICATE',
        passed: true,
        severity: 'INFO',
        message: 'Unique verified record.'
      }
    ],

    reviewHistory: [
      {
        timestamp: '2026-09-01T08:45:00Z',
        officerName: 'AI OCR Pipeline v3.8',
        role: 'VERIFICATION_SPECIALIST',
        action: 'Ingested & Extracted'
      },
      {
        timestamp: '2026-09-01T14:10:00Z',
        officerName: 'Tehsildar K. M. Siddaraju',
        role: 'REVENUE_OFFICER',
        action: 'Sanctioned & Synchronized',
        notes: 'Verified against Bhoomi database and sanctioned digitally'
      }
    ]
  },
  {
    id: 'REC-RJ-JAM-9102',
    documentNumber: 'RJ-JAI-CHO-2024-JAM-3121',
    documentType: 'JAMABANDI',
    primaryLanguage: 'hindi',
    script: 'Devanagari (Hindi/Marwari)',
    sourceFileName: 'Morija_Chomu_Khasra312_JamabandiNakal.pdf',
    sourceImageUrl: 'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&q=80&w=1200',
    uploadedAt: '2026-09-01T11:20:00Z',
    uploadedBy: 'Patwari Mahendra Singh Rathore (Halka Morija)',
    status: 'VERIFIED_AND_SANCTIONED',
    overallConfidence: 96.4,

    state: { value: 'Rajasthan', rawText: 'राजस्थान सरकार - राजस्व मंडल', confidence: 99 },
    district: { value: 'Jaipur', rawText: 'जयपुर', confidence: 98 },
    tehsil: { value: 'Chomu', rawText: 'चौमूं', confidence: 98 },
    village: { value: 'Morija', rawText: 'मोरीजा', confidence: 97 },
    censusVillageCode: { value: '079421', rawText: '०७९४२१', confidence: 96 },

    khasraNumber: { 
      value: '312/1', 
      rawText: 'खसरा नं. ३१२/१', 
      confidence: 98,
      isHandwritten: false,
      boundingBox: { x: 28, y: 22, width: 22, height: 6 }
    },
    khataNumber: { 
      value: '00214', 
      rawText: 'खाता संख्या २१४', 
      confidence: 97,
      isHandwritten: false,
      boundingBox: { x: 58, y: 22, width: 20, height: 6 }
    },

    primaryOwnerName: { 
      value: 'Sawai Singh Rathore', 
      rawText: 'सवाई सिंह राठौड़', 
      confidence: 97,
      isHandwritten: false,
      boundingBox: { x: 18, y: 38, width: 34, height: 6 }
    },
    parentageOrSpouse: { 
      value: 'Late Bhawani Singh Rathore', 
      rawText: 'आत्मज स्व. भवानी सिंह', 
      confidence: 95 
    },
    totalOwnersCount: 2,
    coSharers: [
      {
        id: 'CS-RJ-1',
        name: 'Sawai Singh Rathore',
        relation: 'S/o Bhawani Singh',
        shareFraction: '1/2',
        shareAreaSqMeters: 16250,
        panOrAadhaarRef: 'XXXX-XXXX-9102'
      },
      {
        id: 'CS-RJ-2',
        name: 'Gajendra Singh Rathore',
        relation: 'Brother',
        shareFraction: '1/2',
        shareAreaSqMeters: 16250,
        panOrAadhaarRef: 'XXXX-XXXX-9103'
      }
    ],

    landClassification: { 
      value: 'Chahi Barani (Canal & Deep Tubewell Fed)', 
      rawText: 'चाही बारानी दोयम (द्विफसली)', 
      confidence: 96 
    },
    irrigationSource: { 
      value: 'Morija Minor Canal & Solar Tubewell', 
      rawText: 'मोरीजा माइनर नहर व नलकूप', 
      confidence: 95 
    },
    totalAreaDeclared: { 
      value: 3.25, 
      rawText: '३.२५०० हैक्टेयर (12 बीघा 18 बिस्वा)', 
      confidence: 97,
      boundingBox: { x: 18, y: 54, width: 26, height: 6 }
    },
    declaredUnit: { value: 'HECTARE', confidence: 99 },
    normalizedAreaSqMeters: 32500,

    annualLandRevenue: { value: 78.50, rawText: 'लगान मुबलिग ७८.५० रुपये', confidence: 93 },
    encumbranceStatus: { value: 'CLEAR', rawText: 'शुद्ध रहन मुक्त (Clear Title)', confidence: 97 },

    mutations: [
      {
        mutationNumber: 'NAMANTARAN-2023-8812',
        dateOfOrder: '2023-11-04',
        sanctioningOfficer: 'Tehsildar Chomu',
        mutationType: 'INHERITANCE',
        transferor: 'Late Bhawani Singh Rathore (Father)',
        transferee: 'Sawai Singh & Gajendra Singh (Joint)',
        status: 'SANCTIONED',
        remarks: 'Sanctioned under Section 135 Rajasthan Land Revenue Act 1956'
      }
    ],

    boundaries: {
      north: 'Khasra 313 (Gochar Pasture Reserve)',
      south: 'Village Pakka Link Road to NH-52',
      east: 'Khasra 312/2 (Gajendra Singh)',
      west: 'Khasra 311 (Ram Swaroop Sharma)'
    },

    cadastralPolygon: [
      [75.7268, 27.1662],
      [75.7302, 27.1664],
      [75.7300, 27.1628],
      [75.7266, 27.1626]
    ],

    preprocessingMetrics: {
      deskewAngleDegrees: 0.12,
      contrastScore: 92.5,
      dpiEstimated: 300,
      binarizationMethod: 'Otsu',
      noiseReductionApplied: false
    },

    validationResults: [
      {
        ruleId: 'VR-01-ARITH',
        ruleName: 'Area Summation Consistency',
        category: 'ARITHMETIC',
        passed: true,
        severity: 'INFO',
        message: 'Bigha to Hectare conversion matches precisely (12-18 Bigha = 3.2500 Ha).'
      },
      {
        ruleId: 'VR-02-CDB',
        ruleName: 'DILRMP Central Registry Cross-Check',
        category: 'CROSS_DB',
        passed: true,
        severity: 'INFO',
        message: 'Synchronized with Apna Khata Rajasthan Portal (District Jaipur).'
      }
    ],

    reviewHistory: [
      {
        timestamp: '2026-09-01T11:20:00Z',
        officerName: 'AI OCR Pipeline v3.8',
        role: 'VERIFICATION_SPECIALIST',
        action: 'Extracted & Parsed'
      },
      {
        timestamp: '2026-09-01T16:05:00Z',
        officerName: 'Tehsildar Surendra Pal',
        role: 'REVENUE_OFFICER',
        action: 'Sanctioned',
        notes: 'Apna Khata digital record verified against RoR master database'
      }
    ]
  },
  {
    id: 'REC-GJ-712-4421',
    documentNumber: 'GJ-AHM-SAN-2024-712-214',
    documentType: '7_12_EXTRACT',
    primaryLanguage: 'gujarati',
    script: 'Gujarati (ગુજરાતી)',
    sourceFileName: 'Shela_Sanand_Survey214_AnyRoR_SaatBaara.pdf',
    sourceImageUrl: 'https://images.unsplash.com/photo-1544717302-de2939b7ef71?auto=format&fit=crop&q=80&w=1200',
    uploadedAt: '2026-09-01T14:30:00Z',
    uploadedBy: 'Talati-cum-Mantri Arvind Patel (Shela Seva Sadan)',
    status: 'PARTIALLY_VERIFIED',
    overallConfidence: 89.2,

    state: { value: 'Gujarat', rawText: 'ગુજરાત સરકાર - મહેસૂલ વિભાગ', confidence: 98 },
    district: { value: 'Ahmedabad', rawText: 'અમદાવાદ', confidence: 97 },
    tehsil: { value: 'Sanand', rawText: 'સાણંદ', confidence: 97 },
    village: { value: 'Shela', rawText: 'શેલા', confidence: 96 },
    censusVillageCode: { value: '511209', rawText: '૫૧૧૨૦૯', confidence: 95 },

    khasraNumber: { 
      value: '214', 
      rawText: 'બ્લોક / સર્વે નં. ૨૧૪', 
      confidence: 96,
      isHandwritten: false,
      boundingBox: { x: 32, y: 22, width: 22, height: 6 }
    },
    khataNumber: { 
      value: '00518', 
      rawText: 'ખાતા નં. ૫૧૮', 
      confidence: 95,
      isHandwritten: false,
      boundingBox: { x: 62, y: 22, width: 20, height: 6 }
    },

    primaryOwnerName: { 
      value: 'Patel Bhikhabhai Somabhai', 
      rawText: 'પટેલ ભીખાભાઈ સોમાભાઈ', 
      confidence: 95,
      isHandwritten: false,
      boundingBox: { x: 18, y: 38, width: 36, height: 6 }
    },
    parentageOrSpouse: { 
      value: 'Late Somabhai N. Patel', 
      rawText: 'પિતા સોમાભાઈ પટેલ', 
      confidence: 93 
    },
    totalOwnersCount: 2,
    coSharers: [
      {
        id: 'CS-GJ-1',
        name: 'Patel Bhikhabhai Somabhai',
        relation: 'Self',
        shareFraction: '60%',
        shareAreaSqMeters: 10920,
        panOrAadhaarRef: 'XXXX-XXXX-4421'
      },
      {
        id: 'CS-GJ-2',
        name: 'Patel Jayeshkumar Bhikhabhai',
        relation: 'Son',
        shareFraction: '40%',
        shareAreaSqMeters: 7280,
        panOrAadhaarRef: 'XXXX-XXXX-4422'
      }
    ],

    landClassification: { 
      value: 'Bagayat Irrigated (Narmada Sub-canal)', 
      rawText: 'બાગાયત / પિયત (નર્મદા કેનાલ કમાન્ડ)', 
      confidence: 94 
    },
    irrigationSource: { 
      value: 'Narmada Main Branch Minor-3', 
      rawText: 'નર્મદા નહેર શાખા', 
      confidence: 93 
    },
    totalAreaDeclared: { 
      value: 1.82, 
      rawText: '૧-૮૨-૦૦ હે.આરે.ચો.મી. (1.82 Hectares)', 
      confidence: 96,
      boundingBox: { x: 18, y: 54, width: 26, height: 6 }
    },
    declaredUnit: { value: 'HECTARE', confidence: 98 },
    normalizedAreaSqMeters: 18200,

    annualLandRevenue: { value: 46.20, rawText: 'આકાર રૂ. ૪૬.૨૦', confidence: 91 },
    encumbranceStatus: { 
      value: 'CLEAR', 
      rawText: 'બોજો મુક્ત (No Active Liens)', 
      confidence: 94 
    },

    mutations: [
      {
        mutationNumber: 'HAKK-PATRAK-2022-4192',
        dateOfOrder: '2022-08-19',
        sanctioningOfficer: 'Mamlatdar Sanand',
        mutationType: 'SALE_DEED',
        transferor: 'Dalsukhbhai Tribhovandas',
        transferee: 'Patel Bhikhabhai Somabhai & Son',
        status: 'SANCTIONED',
        remarks: 'Registered Sale Deed No. 6112/2022 at Sub-Registrar Sanand'
      }
    ],

    boundaries: {
      north: 'Survey 215 (Patel Jayeshkumar)',
      south: 'Survey 216 (Shela Gam Talav)',
      east: 'Narmada Minor Canal Sub-distributary',
      west: 'Survey 213 (Manilal Kanjibhai Vankar)'
    },

    cadastralPolygon: [
      [72.4575, 23.0000],
      [72.4608, 23.0002],
      [72.4605, 22.9970],
      [72.4572, 22.9968]
    ],

    preprocessingMetrics: {
      deskewAngleDegrees: -1.15,
      contrastScore: 88.0,
      dpiEstimated: 260,
      binarizationMethod: 'AdaptiveGaussian',
      noiseReductionApplied: true
    },

    validationResults: [
      {
        ruleId: 'VR-01-ARITH',
        ruleName: 'Area Summation Consistency',
        category: 'ARITHMETIC',
        passed: true,
        severity: 'INFO',
        message: 'Co-sharer split (60% + 40%) perfectly matches 1.8200 Hectares (18,200 sq.m).'
      },
      {
        ruleId: 'VR-02-CDB',
        ruleName: 'DILRMP Central Registry Cross-Check',
        category: 'CROSS_DB',
        passed: true,
        severity: 'INFO',
        message: 'Matches AnyRoR Gujarat Central e-Dhara repository.'
      }
    ],

    reviewHistory: [
      {
        timestamp: '2026-09-01T14:30:00Z',
        officerName: 'AI OCR Pipeline v3.8',
        role: 'VERIFICATION_SPECIALIST',
        action: 'Ingested & Verified via AnyRoR'
      }
    ]
  },
  {
    id: 'REC-MP-KHASRA-618',
    documentNumber: 'MP-SEH-BIL-2024-KH-1842',
    documentType: 'KHASRA_KHATAUNI',
    primaryLanguage: 'hindi',
    script: 'Devanagari (Hindi)',
    sourceFileName: 'Bilkisganj_Khasra184_B1_Khatauni_MPBhulekh.pdf',
    sourceImageUrl: 'https://images.unsplash.com/photo-1544717302-de2939b7ef71?auto=format&fit=crop&q=80&w=1200',
    uploadedAt: '2026-09-02T09:15:00Z',
    uploadedBy: 'Patwari Rajesh Saxena (Halka Bilkisganj)',
    status: 'NEEDS_REVIEW',
    overallConfidence: 84.8,

    state: { value: 'Madhya Pradesh', rawText: 'मध्य प्रदेश शासन - राजस्व विभाग', confidence: 99 },
    district: { value: 'Sehore', rawText: 'सीहोर', confidence: 98 },
    tehsil: { value: 'Sehore', rawText: 'सीहोर', confidence: 98 },
    village: { value: 'Bilkisganj', rawText: 'बिलकिसगंज', confidence: 96 },
    censusVillageCode: { value: '483120', rawText: '४८३१२०', confidence: 95 },

    khasraNumber: { 
      value: '184/2', 
      rawText: 'खसरा नं. १८४/२', 
      confidence: 94,
      isHandwritten: true,
      boundingBox: { x: 30, y: 22, width: 22, height: 6 }
    },
    khataNumber: { 
      value: '00329', 
      rawText: 'खाता क्रमांक ३२९', 
      confidence: 93,
      isHandwritten: false,
      boundingBox: { x: 60, y: 22, width: 20, height: 6 }
    },

    primaryOwnerName: { 
      value: 'Shivnarayan Patidar', 
      rawText: 'शिवनारायण पाटीदार', 
      confidence: 94,
      isHandwritten: true,
      boundingBox: { x: 18, y: 38, width: 34, height: 6 }
    },
    parentageOrSpouse: { 
      value: 'Late Babulal Patidar', 
      rawText: 'पिता स्व. बाबूलाल', 
      confidence: 91 
    },
    totalOwnersCount: 2,
    coSharers: [
      {
        id: 'CS-MP-1',
        name: 'Shivnarayan Patidar',
        relation: 'Self',
        shareFraction: '1/2',
        shareAreaSqMeters: 12000,
        panOrAadhaarRef: 'XXXX-XXXX-6181'
      },
      {
        id: 'CS-MP-2',
        name: 'Kailash Patidar',
        relation: 'Brother',
        shareFraction: '1/2',
        shareAreaSqMeters: 12000,
        panOrAadhaarRef: 'XXXX-XXXX-6182'
      }
    ],

    landClassification: { 
      value: 'Kali Gehri Mitti (Deep Black Soil - Soybean/Wheat)', 
      rawText: 'काली गहरी मिट्टी (द्विफसली असिंचित/सिंचित)', 
      confidence: 92 
    },
    irrigationSource: { 
      value: 'Tubewell & Farm Pond (Khet Talab)', 
      rawText: 'नलकूप व खेत तालाब', 
      confidence: 90 
    },
    totalAreaDeclared: { 
      value: 2.40, 
      rawText: '२.४० हेक्टर (2.40 Hectares)', 
      confidence: 94,
      boundingBox: { x: 18, y: 54, width: 26, height: 6 }
    },
    declaredUnit: { value: 'HECTARE', confidence: 98 },
    normalizedAreaSqMeters: 24000,

    annualLandRevenue: { value: 58.00, rawText: 'भू-राजस्व रू. ५८.००', confidence: 89 },
    encumbranceStatus: { 
      value: 'MORTGAGED', 
      rawText: 'बैंक बंधक / किसान क्रेडिट कार्ड ₹3,50,000 SBI Sehore', 
      confidence: 76,
      isHandwritten: true,
      isFlagged: true,
      flagReason: 'Kisan Credit Card hypothecation charge registered by State Bank of India'
    },
    bankLienDetails: 'SBI Agricultural Branch Sehore KCC hypothecation loan account #3088192314 for ₹3,50,000 registered on 2023-03-15',

    mutations: [
      {
        mutationNumber: 'MP-NAM-2023-1102',
        dateOfOrder: '2023-07-22',
        sanctioningOfficer: 'Naib Tehsildar Bilkisganj',
        mutationType: 'PARTITION',
        transferor: 'Joint Khata 145',
        transferee: 'Shivnarayan & Kailash Patidar',
        status: 'SANCTIONED',
        remarks: 'Order passed under MP Land Revenue Code 1959 Section 178'
      }
    ],

    boundaries: {
      north: 'Khasra 185 (Shaskiya Charan Bhumi)',
      south: 'Village Link PWD Road Bilkisganj-Bhopal',
      east: 'Khasra 184/1 (Kailash Patidar)',
      west: 'Khasra 183 (Jagdish Prasad Verma)'
    },

    cadastralPolygon: [
      [77.2030, 23.1135],
      [77.2062, 23.1137],
      [77.2060, 23.1105],
      [77.2028, 23.1103]
    ],

    preprocessingMetrics: {
      deskewAngleDegrees: -2.10,
      contrastScore: 78.5,
      dpiEstimated: 240,
      binarizationMethod: 'AdaptiveGaussian',
      noiseReductionApplied: true
    },

    validationResults: [
      {
        ruleId: 'VR-01-ARITH',
        ruleName: 'Area Summation Consistency',
        category: 'ARITHMETIC',
        passed: true,
        severity: 'INFO',
        message: 'Shares sum to exactly 2.4000 Hectares (24,000 sq.m).'
      },
      {
        ruleId: 'VR-02-CDB',
        ruleName: 'DILRMP Central Registry Cross-Check',
        category: 'CROSS_DB',
        passed: true,
        severity: 'INFO',
        message: 'Matches MP Bhulekh portal record.'
      },
      {
        ruleId: 'VR-04-FLAG',
        ruleName: 'Bank Encumbrance Verification',
        category: 'LEGAL',
        passed: false,
        severity: 'WARNING',
        message: 'Active Kisan Credit Card lien note requires Bank NOC before sanctioning transfer.'
      }
    ],

    reviewHistory: [
      {
        timestamp: '2026-09-02T09:15:00Z',
        officerName: 'AI OCR Pipeline v3.8',
        role: 'VERIFICATION_SPECIALIST',
        action: 'Ingested & Flagged for Bank Lien Verification'
      }
    ]
  },
  ...ADDITIONAL_LAND_RECORDS
];

export const STATE_DIGITIZATION_DATA: StateDigitizationProgress[] = [
  {
    stateName: 'Uttar Pradesh',
    totalVillages: 106774,
    digitizedVillages: 99420,
    totalRecords: 48200000,
    digitizedRecords: 46100000,
    verifiedPercentage: 95.6,
    cadastralMapsDigitized: 98120,
    totalCadastralMaps: 106774,
    averageOcrConfidence: 94.2
  },
  {
    stateName: 'Maharashtra',
    totalVillages: 44000,
    digitizedVillages: 41800,
    totalRecords: 26500000,
    digitizedRecords: 24700000,
    verifiedPercentage: 93.2,
    cadastralMapsDigitized: 40100,
    totalCadastralMaps: 44000,
    averageOcrConfidence: 91.8
  },
  {
    stateName: 'Madhya Pradesh',
    totalVillages: 55000,
    digitizedVillages: 52100,
    totalRecords: 19800000,
    digitizedRecords: 18900000,
    verifiedPercentage: 95.4,
    cadastralMapsDigitized: 51200,
    totalCadastralMaps: 55000,
    averageOcrConfidence: 93.5
  },
  {
    stateName: 'Karnataka',
    totalVillages: 29400,
    digitizedVillages: 28900,
    totalRecords: 21400000,
    digitizedRecords: 20900000,
    verifiedPercentage: 97.6,
    cadastralMapsDigitized: 28700,
    totalCadastralMaps: 29400,
    averageOcrConfidence: 96.1
  },
  {
    stateName: 'Punjab',
    totalVillages: 12581,
    digitizedVillages: 11950,
    totalRecords: 14200000,
    digitizedRecords: 12800000,
    verifiedPercentage: 90.1,
    cadastralMapsDigitized: 11200,
    totalCadastralMaps: 12581,
    averageOcrConfidence: 89.4
  },
  {
    stateName: 'Rajasthan',
    totalVillages: 45000,
    digitizedVillages: 39800,
    totalRecords: 17500000,
    digitizedRecords: 15200000,
    verifiedPercentage: 86.8,
    cadastralMapsDigitized: 38200,
    totalCadastralMaps: 45000,
    averageOcrConfidence: 88.7
  },
  {
    stateName: 'Gujarat',
    totalVillages: 18600,
    digitizedVillages: 18100,
    totalRecords: 12800000,
    digitizedRecords: 12400000,
    verifiedPercentage: 96.8,
    cadastralMapsDigitized: 17900,
    totalCadastralMaps: 18600,
    averageOcrConfidence: 95.0
  }
];

export const SAMPLE_LAND_RECORDS = INITIAL_LAND_RECORDS;
