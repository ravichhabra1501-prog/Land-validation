import { ExtractedLandRecord } from '../types';

export const ADDITIONAL_LAND_RECORDS: ExtractedLandRecord[] = [
  // 1. Tamil Nadu - Patta / Chitta (Pollachi, Coimbatore)
  {
    id: 'REC-TN-PATTA-4109',
    documentNumber: 'TN-CBE-POL-2024-PAT-4109',
    documentType: 'PATTA_CHITTA',
    primaryLanguage: 'tamil',
    script: 'Tamil (தமிழ்)',
    sourceFileName: 'Pollachi_Survey409_PattaChitta_2024.pdf',
    sourceImageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=1200',
    uploadedAt: '2026-08-30T10:15:00Z',
    uploadedBy: 'Revenue Inspector K. Ramanathan (Pollachi Circle)',
    status: 'VERIFIED_AND_SANCTIONED',
    overallConfidence: 94.6,

    state: { value: 'Tamil Nadu', rawText: 'தமிழ்நாடு அரசு', confidence: 99 },
    district: { value: 'Coimbatore', rawText: 'கோயம்புத்தூர்', confidence: 98 },
    tehsil: { value: 'Pollachi', rawText: 'பொள்ளாச்சி', confidence: 97 },
    village: { value: 'Anaimalai', rawText: 'ஆனைமலை', confidence: 98 },
    censusVillageCode: { value: '644312', rawText: '644312', confidence: 96 },

    khasraNumber: {
      value: '409/2A',
      rawText: 'புல எண்: 409/2A',
      confidence: 96,
      isHandwritten: false,
      boundingBox: { x: 38, y: 16, width: 24, height: 6 }
    },
    khataNumber: {
      value: '1842',
      rawText: 'பட்டா எண்: 1842',
      confidence: 97,
      isHandwritten: false,
      boundingBox: { x: 68, y: 16, width: 20, height: 6 }
    },
    subDivisionNumber: { value: '2A', rawText: 'உட்பிரிவு 2A', confidence: 95 },

    primaryOwnerName: {
      value: 'S. Marimuthu Gounder',
      rawText: 'எஸ். மாரிமுத்து கவுண்டர்',
      confidence: 96,
      isHandwritten: false,
      boundingBox: { x: 14, y: 32, width: 36, height: 7 }
    },
    parentageOrSpouse: {
      value: 'Subbiah Gounder (Father)',
      rawText: 'சுப்பையா கவுண்டர் (தகப்பனார்)',
      confidence: 94
    },
    totalOwnersCount: 2,
    coSharers: [
      {
        id: 'CS-TN-01',
        name: 'S. Marimuthu Gounder',
        relation: 'Self / Karta',
        shareFraction: '1/2',
        shareAreaSqMeters: 10750,
        panOrAadhaarRef: 'XXXX-XXXX-9142'
      },
      {
        id: 'CS-TN-02',
        name: 'M. Senthilkumar',
        relation: 'Son',
        shareFraction: '1/2',
        shareAreaSqMeters: 10750,
        panOrAadhaarRef: 'XXXX-XXXX-6631'
      }
    ],

    landClassification: {
      value: 'Thottam / Nanjai (Irrigated Coconut Grove)',
      rawText: 'தோட்டம் / நஞ்சை தென்னை',
      confidence: 94
    },
    irrigationSource: {
      value: 'PAP Canal & Borewell with Drip System',
      rawText: 'பரம்பிக்குளம் ஆழியாறு பாசனம் மற்றும் ஆழ்துளை கிணறு',
      confidence: 92
    },
    totalAreaDeclared: {
      value: 2.15,
      rawText: '2 ஹெக்டேர் 15 ஏர்ஸ் (2.15)',
      confidence: 98,
      boundingBox: { x: 14, y: 48, width: 28, height: 6 }
    },
    declaredUnit: { value: 'HECTARE', confidence: 99 },
    normalizedAreaSqMeters: 21500,

    annualLandRevenue: { value: 64.50, rawText: 'ரூ. 64.50', confidence: 95 },
    encumbranceStatus: {
      value: 'CLEAR',
      rawText: 'வில்லங்க சான்று - வில்லங்கம் ஏதுமில்லை',
      confidence: 96
    },

    mutations: [
      {
        mutationNumber: 'TN-MUT-2023-5120',
        dateOfOrder: '2023-04-18',
        sanctioningOfficer: 'Zonal Deputy Tahsildar, Pollachi',
        mutationType: 'PARTITION',
        transferor: 'Joint Ancestral Khata',
        transferee: 'S. Marimuthu Gounder & M. Senthilkumar',
        status: 'SANCTIONED',
        remarks: 'Family arrangement partitioned vide Registered Partition Deed No. 1240/2023 SRO Pollachi'
      }
    ],

    boundaries: {
      north: 'Survey 408 (K. Palanisamy coconut thottam)',
      south: 'Village Cart Track & Irrigation Distributary',
      east: 'Survey 409/2B (Velusamy Gounder)',
      west: 'Survey 409/1 (S. Murugesan)'
    },

    cadastralPolygon: [
      [76.9850, 10.5820],
      [76.9880, 10.5822],
      [76.9878, 10.5795],
      [76.9848, 10.5793]
    ],

    preprocessingMetrics: {
      deskewAngleDegrees: -0.42,
      contrastScore: 92.4,
      dpiEstimated: 300,
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
        message: 'Co-sharer shares (21,500 sq.m) equal declared parcel area (21,500 sq.m).'
      },
      {
        ruleId: 'VR-02-CDB',
        ruleName: 'DILRMP Central Registry Match Verified',
        category: 'CROSS_DB',
        passed: true,
        severity: 'INFO',
        message: 'Verified against e-Services TN Nilam Master Database. Status: CLEAN.'
      }
    ],

    reviewHistory: [
      {
        timestamp: '2026-08-30T10:18:00Z',
        officerName: 'AI OCR Pipeline v3.8',
        role: 'VERIFICATION_SPECIALIST',
        action: 'Ingested & Normalized via Tamil OCR Model'
      },
      {
        timestamp: '2026-08-31T14:20:00Z',
        officerName: 'Tahsildar R. Muthukrishnan',
        role: 'REVENUE_OFFICER',
        action: 'Verified and Sanctioned without Discrepancies'
      }
    ]
  },

  // 2. Andhra Pradesh - ROR 1B & Adangal (Tenali, Guntur)
  {
    id: 'REC-AP-ADANGAL-7712',
    documentNumber: 'AP-GNT-TEN-2024-ADG-7712',
    documentType: 'PATTA_CHITTA',
    primaryLanguage: 'telugu',
    script: 'Telugu (తెలుగు)',
    sourceFileName: 'Tenali_Sy118_Meebhoomi_Adangal.pdf',
    sourceImageUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=1200',
    uploadedAt: '2026-08-29T11:40:00Z',
    uploadedBy: 'Village Revenue Officer B. Subbarao (Angalakuduru)',
    status: 'VERIFIED_AND_SANCTIONED',
    overallConfidence: 92.1,

    state: { value: 'Andhra Pradesh', rawText: 'ఆంధ్రప్రదేశ్ ప్రభుత్వం', confidence: 99 },
    district: { value: 'Guntur', rawText: 'గుంటూరు జిల్లా', confidence: 98 },
    tehsil: { value: 'Tenali', rawText: 'తెనాలి మండలం', confidence: 97 },
    village: { value: 'Angalakuduru', rawText: 'అంగలకుదురు', confidence: 96 },
    censusVillageCode: { value: '589812', rawText: '589812', confidence: 95 },

    khasraNumber: {
      value: '118/3B',
      rawText: 'సర్వే నెం: 118/3B',
      confidence: 94,
      isHandwritten: false,
      boundingBox: { x: 40, y: 15, width: 22, height: 6 }
    },
    khataNumber: {
      value: '409',
      rawText: 'ఖాతా నెంబర్: 409',
      confidence: 96,
      isHandwritten: false,
      boundingBox: { x: 68, y: 15, width: 18, height: 6 }
    },
    subDivisionNumber: { value: '3B', rawText: 'సబ్ డివిజన్: 3B', confidence: 92 },

    primaryOwnerName: {
      value: 'Koteswara Rao Chennupati',
      rawText: 'చెన్నుపాటి కోటేశ్వరరావు',
      confidence: 95,
      isHandwritten: false,
      boundingBox: { x: 12, y: 34, width: 38, height: 7 }
    },
    parentageOrSpouse: {
      value: 'Venkateswarlu Chennupati (Father)',
      rawText: 'వెంకటేశ్వర్లు (తండ్రి)',
      confidence: 93
    },
    totalOwnersCount: 2,
    coSharers: [
      {
        id: 'CS-AP-01',
        name: 'Koteswara Rao Chennupati',
        relation: 'Self / Pattadar',
        shareFraction: '1/2',
        shareAreaSqMeters: 9100,
        panOrAadhaarRef: 'XXXX-XXXX-1902'
      },
      {
        id: 'CS-AP-02',
        name: 'Lakshmi Chennupati',
        relation: 'Spouse',
        shareFraction: '1/2',
        shareAreaSqMeters: 9100,
        panOrAadhaarRef: 'XXXX-XXXX-8821'
      }
    ],

    landClassification: {
      value: 'Wetland (Magani / Krishna Delta Double Cropped Paddy)',
      rawText: 'మాగాణి (కృష్ణా డెల్టా రెండవ పంట)',
      confidence: 91
    },
    irrigationSource: {
      value: 'Krishna Western Delta Main Canal (Prakasam Barrage)',
      rawText: 'కృష్ణా పశ్చిమ డెల్టా ప్రధాన కాలువ',
      confidence: 90
    },
    totalAreaDeclared: {
      value: 1.82,
      rawText: '1.82 హెక్టార్లు (18,200 చ.మీ)',
      confidence: 97,
      boundingBox: { x: 12, y: 50, width: 26, height: 6 }
    },
    declaredUnit: { value: 'HECTARE', confidence: 99 },
    normalizedAreaSqMeters: 18200,

    annualLandRevenue: { value: 54.60, rawText: 'రూ. 54.60', confidence: 93 },
    encumbranceStatus: {
      value: 'CLEAR',
      rawText: 'స్పష్టమైన శీర్షిక / ఎటువంటి తాకట్టు లేదు',
      confidence: 94
    },

    mutations: [
      {
        mutationNumber: 'AP-MUT-2022-9912',
        dateOfOrder: '2022-09-14',
        sanctioningOfficer: 'Tahsildar, Tenali',
        mutationType: 'SALE_DEED',
        transferor: 'G. V. R. Prasad',
        transferee: 'Koteswara Rao Chennupati',
        status: 'SANCTIONED',
        remarks: 'Registered Sale Deed No. 4412/2022 SRO Tenali'
      }
    ],

    boundaries: {
      north: 'Survey 117 (K. Sambasiva Rao field)',
      south: 'Panchayat Link Canal Channel',
      east: 'Survey 118/3C (V. Nageswara Rao)',
      west: 'Survey 118/3A (P. Srinivasa Rao)'
    },

    cadastralPolygon: [
      [80.6410, 16.2410],
      [80.6440, 16.2412],
      [80.6438, 16.2385],
      [80.6408, 16.2383]
    ],

    preprocessingMetrics: {
      deskewAngleDegrees: 0.12,
      contrastScore: 89.1,
      dpiEstimated: 300,
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
        message: 'Co-sharer shares (18,200 sq.m) equal declared parcel area (18,200 sq.m).'
      },
      {
        ruleId: 'VR-02-CDB',
        ruleName: 'DILRMP Central Registry Match Verified',
        category: 'CROSS_DB',
        passed: true,
        severity: 'INFO',
        message: 'Verified against Meebhoomi AP Central Registry. Status: CLEAN.'
      }
    ],

    reviewHistory: [
      {
        timestamp: '2026-08-29T11:42:00Z',
        officerName: 'AI OCR Pipeline v3.8',
        role: 'VERIFICATION_SPECIALIST',
        action: 'Meebhoomi ROR Extraction Completed'
      }
    ]
  },

  // 3. West Bengal - Banglarbhumi Porcha / Khatian (Singur, Hooghly)
  {
    id: 'REC-WB-ROR-2041',
    documentNumber: 'WB-HGY-SGR-2024-KHT-2041',
    documentType: 'KHASRA_KHATAUNI',
    primaryLanguage: 'bengali',
    script: 'Bengali (বাংলা)',
    sourceFileName: 'Singur_Gopalnagar_Dag624_Porcha.pdf',
    sourceImageUrl: 'https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&q=80&w=1200',
    uploadedAt: '2026-09-01T08:30:00Z',
    uploadedBy: 'Revenue Inspector A. K. Banerjee (Singur Block)',
    status: 'NEEDS_REVIEW',
    overallConfidence: 79.4,

    state: { value: 'West Bengal', rawText: 'পশ্চিমবঙ্গ সরকার', confidence: 98 },
    district: { value: 'Hooghly', rawText: 'হুগলী জেলা', confidence: 97 },
    tehsil: { value: 'Singur', rawText: 'সিঙ্গুর ব্লক', confidence: 96 },
    village: { value: 'Gopalnagar', rawText: 'গোপালনগর (মৌজা নং ৪৪)', confidence: 97 },
    censusVillageCode: { value: '324810', rawText: '৩২৪৮১০', confidence: 94 },

    khasraNumber: {
      value: '624',
      rawText: 'দাগ নং: ৬২৪',
      confidence: 88,
      isHandwritten: false,
      boundingBox: { x: 36, y: 18, width: 20, height: 6 }
    },
    khataNumber: {
      value: '1104',
      rawText: 'খতিয়ান নং: ১১০৪',
      confidence: 91,
      isHandwritten: false,
      boundingBox: { x: 65, y: 18, width: 22, height: 6 }
    },
    subDivisionNumber: { value: '0', rawText: 'বাতা দাগ নাই', confidence: 88 },

    primaryOwnerName: {
      value: 'Bimalendu Mukherjee',
      rawText: 'বিমলেন্দু মুখার্জী',
      confidence: 91,
      isHandwritten: false,
      boundingBox: { x: 12, y: 36, width: 34, height: 7 }
    },
    parentageOrSpouse: {
      value: 'Late Debashis Mukherjee (Father)',
      rawText: 'পিতা - মৃত দেবাশীষ মুখার্জী',
      confidence: 89
    },
    totalOwnersCount: 2,
    coSharers: [
      {
        id: 'CS-WB-01',
        name: 'Bimalendu Mukherjee',
        relation: 'Self / Rayat',
        shareFraction: '1/2',
        shareAreaSqMeters: 4750,
        panOrAadhaarRef: 'XXXX-XXXX-4509'
      },
      {
        id: 'CS-WB-02',
        name: 'Subhendu Mukherjee',
        relation: 'Brother',
        shareFraction: '1/2',
        shareAreaSqMeters: 4750,
        panOrAadhaarRef: 'XXXX-XXXX-7119'
      }
    ],

    landClassification: {
      value: 'Sali (Aman & Boro Double Cropped Agricultural Land)',
      rawText: 'শালী (আমণ ও বোরো দ্বি-ফসলী জমি)',
      confidence: 86
    },
    irrigationSource: {
      value: 'DVC Canal & Shallow Tubewell',
      rawText: 'ডিভিসি সেচ খাল ও অগভীর নলকূপ',
      confidence: 76,
      isHandwritten: true,
      isFlagged: true,
      flagReason: 'Handwritten water cess remark faded in margins'
    },
    totalAreaDeclared: {
      value: 0.95,
      rawText: '০.৯৫ হেক্টর (৯৫ শতক)',
      confidence: 92,
      boundingBox: { x: 12, y: 52, width: 24, height: 6 }
    },
    declaredUnit: { value: 'HECTARE', confidence: 99 },
    normalizedAreaSqMeters: 9500,

    annualLandRevenue: { value: 28.50, rawText: 'খাজনা রু. ২৮.৫০', confidence: 90 },
    encumbranceStatus: {
      value: 'MORTGAGED',
      rawText: 'ইউনাইটেড ব্যাংক সিঙ্গুর শাখা কিষাণ ক্রেডিট দায়',
      confidence: 74,
      isHandwritten: true,
      isFlagged: true,
      flagReason: 'Handwritten mortgage note registered by PNB/UBI Singur Branch for INR 1,80,000'
    },
    bankLienDetails: 'Punjab National Bank (Erstwhile United Bank of India), Singur Branch KCC loan hypothecation of INR 1,80,000',

    mutations: [
      {
        mutationNumber: 'WB-MUT-2023-4109',
        dateOfOrder: '2023-08-11',
        sanctioningOfficer: 'Revenue Officer, Singur BL&LRO Office',
        mutationType: 'INHERITANCE',
        transferor: 'Late Debashis Mukherjee',
        transferee: 'Bimalendu & Subhendu Mukherjee',
        status: 'SANCTIONED',
        remarks: 'Waris recording sanctioned under Section 50 of WBLR Act 1955'
      }
    ],

    boundaries: {
      north: 'Dag 623 (Nirmal K. Ghosh Aman field)',
      south: 'Gopalnagar Gram Panchayat Concrete Road',
      east: 'Dag 625 (Shyamal Sen)',
      west: 'DVC Sub-branch irrigation drainage ditch'
    },

    cadastralPolygon: [
      [88.2250, 22.8120],
      [88.2275, 22.8122],
      [88.2273, 22.8105],
      [88.2248, 22.8103]
    ],

    preprocessingMetrics: {
      deskewAngleDegrees: -1.95,
      contrastScore: 78.4,
      dpiEstimated: 240,
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
        message: 'Co-sharer shares (9,500 sq.m) equal declared parcel area (9,500 sq.m).'
      },
      {
        ruleId: 'VR-04-FLAG',
        ruleName: 'Bank Encumbrance Verification Required',
        category: 'LEGAL',
        passed: false,
        severity: 'WARNING',
        message: 'Active Bank Lien recorded in pencil; officer confirmation required.'
      }
    ],

    reviewHistory: [
      {
        timestamp: '2026-09-01T08:35:00Z',
        officerName: 'AI OCR Pipeline v3.8',
        role: 'VERIFICATION_SPECIALIST',
        action: 'Flagged for Bank Lien Verification & Kaithi/Bengali numeral check'
      }
    ]
  },

  // 4. Kerala - E-Rekha Thandaper Register (Chittur, Palakkad)
  {
    id: 'REC-KL-THANDAPER-318',
    documentNumber: 'KL-PKD-CHT-2024-TDP-318',
    documentType: 'PATTA_CHITTA',
    primaryLanguage: 'english',
    script: 'Malayalam (മലയാളം)',
    sourceFileName: 'Kozhinjampara_Sy245_Thandaper_Extract.pdf',
    sourceImageUrl: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=1200',
    uploadedAt: '2026-08-31T09:20:00Z',
    uploadedBy: 'Village Officer K. V. Suresh (Kozhinjampara)',
    status: 'VERIFIED_AND_SANCTIONED',
    overallConfidence: 95.2,

    state: { value: 'Kerala', rawText: 'കേരള സർക്കാർ', confidence: 99 },
    district: { value: 'Palakkad', rawText: 'പാലക്കാട്', confidence: 98 },
    tehsil: { value: 'Chittur', rawText: 'ചിറ്റൂർ താലൂക്ക്', confidence: 97 },
    village: { value: 'Kozhinjampara', rawText: 'കൊഴിഞ്ഞാമ്പാറ', confidence: 98 },
    censusVillageCode: { value: '627601', rawText: '627601', confidence: 96 },

    khasraNumber: {
      value: '245/7',
      rawText: 'റീ-സർവേ നമ്പർ: 245/7',
      confidence: 96,
      isHandwritten: false,
      boundingBox: { x: 40, y: 16, width: 22, height: 6 }
    },
    khataNumber: {
      value: '512',
      rawText: 'താണ്ഡപ്പേര് നമ്പർ: 512',
      confidence: 97,
      isHandwritten: false,
      boundingBox: { x: 68, y: 16, width: 20, height: 6 }
    },
    subDivisionNumber: { value: '7', rawText: 'സബ് ഡിവിഷൻ: 7', confidence: 94 },

    primaryOwnerName: {
      value: 'K. Radhakrishnan Nair',
      rawText: 'കെ. രാധാകൃഷ്ണൻ നായർ',
      confidence: 96,
      isHandwritten: false,
      boundingBox: { x: 14, y: 34, width: 36, height: 7 }
    },
    parentageOrSpouse: {
      value: 'Kunjiraman Nair (Father)',
      rawText: 'കുഞ്ഞിരാമൻ നായർ (പിതാവ്)',
      confidence: 95
    },
    totalOwnersCount: 2,
    coSharers: [
      {
        id: 'CS-KL-01',
        name: 'K. Radhakrishnan Nair',
        relation: 'Self',
        shareFraction: '1/2',
        shareAreaSqMeters: 6000,
        panOrAadhaarRef: 'XXXX-XXXX-3891'
      },
      {
        id: 'CS-KL-02',
        name: 'Valsala Kumari',
        relation: 'Spouse',
        shareFraction: '1/2',
        shareAreaSqMeters: 6000,
        panOrAadhaarRef: 'XXXX-XXXX-9902'
      }
    ],

    landClassification: {
      value: 'Purayidom & Spice Garden (Garden Land)',
      rawText: 'പുരയിടം / തെങ്ങ്, കവുങ്ങ് തോട്ടം',
      confidence: 95
    },
    irrigationSource: {
      value: 'Borewell & Periyar-Vaigai feeder basin',
      rawText: 'കുഴൽക്കിണർ നനവ്',
      confidence: 91
    },
    totalAreaDeclared: {
      value: 1.20,
      rawText: '1 ഹെക്ടർ 20 ആർ (1.20)',
      confidence: 98,
      boundingBox: { x: 14, y: 50, width: 26, height: 6 }
    },
    declaredUnit: { value: 'HECTARE', confidence: 99 },
    normalizedAreaSqMeters: 12000,

    annualLandRevenue: { value: 36.00, rawText: 'ഭൂനികുതി രൂ. 36.00', confidence: 96 },
    encumbranceStatus: {
      value: 'CLEAR',
      rawText: 'ബാധ്യത രഹിതം (Encumbrance Free)',
      confidence: 97
    },

    mutations: [
      {
        mutationNumber: 'KL-PKV-2023-1190',
        dateOfOrder: '2023-06-25',
        sanctioningOfficer: 'Tahsildar Chittur',
        mutationType: 'SALE_DEED',
        transferor: 'P. Narayanan Namboothiri',
        transferee: 'K. Radhakrishnan Nair',
        status: 'SANCTIONED',
        remarks: 'Pokkuvaravu order issued vide Regd Deed 1890/2023 SRO Chittur'
      }
    ],

    boundaries: {
      north: 'Re-survey 245/6 (N. Madhavan garden land)',
      south: 'Village Panchayat Tar Road',
      east: 'Re-survey 245/8 (G. Menon)',
      west: 'Re-survey 244 (Canal bund)'
    },

    cadastralPolygon: [
      [76.7820, 10.7410],
      [76.7845, 10.7412],
      [76.7843, 10.7390],
      [76.7818, 10.7388]
    ],

    preprocessingMetrics: {
      deskewAngleDegrees: -0.18,
      contrastScore: 94.0,
      dpiEstimated: 300,
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
        message: 'Co-sharer shares (12,000 sq.m) equal declared parcel area (12,000 sq.m).'
      },
      {
        ruleId: 'VR-02-CDB',
        ruleName: 'DILRMP Central Registry Match Verified',
        category: 'CROSS_DB',
        passed: true,
        severity: 'INFO',
        message: 'Verified against Kerala e-Rekha Digital Land Database. Status: CLEAN.'
      }
    ],

    reviewHistory: [
      {
        timestamp: '2026-08-31T09:25:00Z',
        officerName: 'AI OCR Pipeline v3.8',
        role: 'VERIFICATION_SPECIALIST',
        action: 'Ingested and validated via Malayalam OCR'
      }
    ]
  },

  // 5. Odisha - Bhulekh Odisha Khatian / RoR (Athagarh, Cuttack)
  {
    id: 'REC-OD-ROR-8840',
    documentNumber: 'OD-CTC-ATH-2024-ROR-8840',
    documentType: 'KHASRA_KHATAUNI',
    primaryLanguage: 'hindi',
    script: 'Odia (ଓଡ଼ିଆ)',
    sourceFileName: 'Athagarh_Plot1042_Bhulekh_ROR.pdf',
    sourceImageUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=1200',
    uploadedAt: '2026-09-02T14:10:00Z',
    uploadedBy: 'Revenue Inspector P. K. Rout (Athagarh Tehsil)',
    status: 'NEEDS_REVIEW',
    overallConfidence: 81.8,

    state: { value: 'Odisha', rawText: 'ଓଡ଼ିଶା ସରକାର', confidence: 99 },
    district: { value: 'Cuttack', rawText: 'କଟକ ଜିଲ୍ଲା', confidence: 98 },
    tehsil: { value: 'Athagarh', rawText: 'ଆଠଗଡ଼ ତହସିଲ', confidence: 97 },
    village: { value: 'Khuntuni', rawText: 'ଖୁଣ୍ଟୁଣୀ', confidence: 96 },
    censusVillageCode: { value: '402190', rawText: '୪୦୨୧୯୦', confidence: 93 },

    khasraNumber: {
      value: '1042/1890',
      rawText: 'ପ୍ଲଟ୍ ନଂ: ୧୦୪୨/୧୮୯୦',
      confidence: 89,
      isHandwritten: false,
      boundingBox: { x: 38, y: 17, width: 24, height: 6 }
    },
    khataNumber: {
      value: '215/64',
      rawText: 'ଖାତା ନଂ: ୨୧୫/୬୪',
      confidence: 92,
      isHandwritten: false,
      boundingBox: { x: 67, y: 17, width: 20, height: 6 }
    },
    subDivisionNumber: { value: '1890', rawText: 'ଉପ-ବିଭାଜନ ୧୮୯୦', confidence: 87 },

    primaryOwnerName: {
      value: 'Pratap Chandra Mohanty',
      rawText: 'ପ୍ରତାପ ଚନ୍ଦ୍ର ମହାନ୍ତି',
      confidence: 93,
      isHandwritten: false,
      boundingBox: { x: 12, y: 35, width: 36, height: 7 }
    },
    parentageOrSpouse: {
      value: 'Madhusudan Mohanty (Father)',
      rawText: 'ପିତା: ମଧୁସୂଦନ ମହାନ୍ତି',
      confidence: 91
    },
    totalOwnersCount: 2,
    coSharers: [
      {
        id: 'CS-OD-01',
        name: 'Pratap Chandra Mohanty',
        relation: 'Self',
        shareFraction: '1/2',
        shareAreaSqMeters: 8250,
        panOrAadhaarRef: 'XXXX-XXXX-5521'
      },
      {
        id: 'CS-OD-02',
        name: 'Pramod Kumar Mohanty',
        relation: 'Brother',
        shareFraction: '1/2',
        shareAreaSqMeters: 8250,
        panOrAadhaarRef: 'XXXX-XXXX-1994'
      }
    ],

    landClassification: {
      value: 'Sarada Do-Fasali (Irrigated Paddy Land)',
      rawText: 'ଶାରଦ ଦୋ-ଫସଲୀ କିସମ',
      confidence: 88
    },
    irrigationSource: {
      value: 'Mahanadi High Level Canal Canal Reach II',
      rawText: 'ମହାନଦୀ କେନାଲ ଜଳସେଚନ',
      confidence: 85
    },
    totalAreaDeclared: {
      value: 1.65,
      rawText: '୧.୬୫ ହେକ୍ଟର (୪.୦୭ ଏକର)',
      confidence: 94,
      boundingBox: { x: 12, y: 52, width: 26, height: 6 }
    },
    declaredUnit: { value: 'HECTARE', confidence: 99 },
    normalizedAreaSqMeters: 16500,

    annualLandRevenue: { value: 49.50, rawText: 'ଖଜଣା ଓ ସେସ୍ ଟ. ୪୯.୫୦', confidence: 91 },
    encumbranceStatus: {
      value: 'CLEAR',
      rawText: 'ଋଣମୁକ୍ତ ପ୍ରମାଣପତ୍ର',
      confidence: 84
    },

    mutations: [
      {
        mutationNumber: 'OD-MUT-2023-7412',
        dateOfOrder: '2023-10-05',
        sanctioningOfficer: 'Additional Tehsildar, Athagarh',
        mutationType: 'INHERITANCE',
        transferor: 'Late Madhusudan Mohanty',
        transferee: 'Pratap & Pramod Mohanty',
        status: 'SANCTIONED',
        remarks: 'Legal heir mutation passed under Odisha Land Reforms Act'
      }
    ],

    boundaries: {
      north: 'Plot 1041 (Sridhar Jena paddy parcel)',
      south: 'Village drainage channel (Nala)',
      east: 'Plot 1042/1891 (Rabindra Sahoo)',
      west: 'Plot 1040 (Gramya jungle sima)'
    },

    cadastralPolygon: [
      [85.7410, 20.5120],
      [85.7438, 20.5122],
      [85.7435, 20.5098],
      [85.7408, 20.5095]
    ],

    preprocessingMetrics: {
      deskewAngleDegrees: -1.45,
      contrastScore: 82.5,
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
        message: 'Co-sharer shares (16,500 sq.m) equal declared parcel area (16,500 sq.m).'
      },
      {
        ruleId: 'VR-02-CDB',
        ruleName: 'DILRMP Central Registry Match Verified',
        category: 'CROSS_DB',
        passed: true,
        severity: 'INFO',
        message: 'Verified against Bhulekh Odisha Settlement Database. Status: CLEAN.'
      }
    ],

    reviewHistory: [
      {
        timestamp: '2026-09-02T14:15:00Z',
        officerName: 'AI OCR Pipeline v3.8',
        role: 'VERIFICATION_SPECIALIST',
        action: 'Odia Script Ingestion Completed'
      }
    ]
  },

  // 6. Haryana - Jamabandi Nakal (Nilokheri, Karnal)
  {
    id: 'REC-HR-JAM-5519',
    documentNumber: 'HR-KAR-NIL-2024-JAM-5519',
    documentType: 'JAMABANDI',
    primaryLanguage: 'hindi',
    script: 'Devanagari (हिन्दी)',
    sourceFileName: 'Karnal_Taraori_Murabba45_Jamabandi.pdf',
    sourceImageUrl: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=1200',
    uploadedAt: '2026-08-27T16:05:00Z',
    uploadedBy: 'Kanungo R. S. Dahiya (Taraori Sub-Tehsil)',
    status: 'VERIFIED_AND_SANCTIONED',
    overallConfidence: 96.7,

    state: { value: 'Haryana', rawText: 'हरियाणा सरकार', confidence: 99 },
    district: { value: 'Karnal', rawText: 'करनाल', confidence: 99 },
    tehsil: { value: 'Nilokheri', rawText: 'नीलोखेड़ी', confidence: 98 },
    village: { value: 'Taraori', rawText: 'तरावड़ी (हसब रसद खेवट)', confidence: 98 },
    censusVillageCode: { value: '182410', rawText: '182410', confidence: 97 },

    khasraNumber: {
      value: '45//18/1',
      rawText: 'मुरब्बा 45 // किला 18/1',
      confidence: 97,
      isHandwritten: false,
      boundingBox: { x: 39, y: 16, width: 23, height: 6 }
    },
    khataNumber: {
      value: '78/142',
      rawText: 'खेवट/खतौनी: 78/142',
      confidence: 98,
      isHandwritten: false,
      boundingBox: { x: 67, y: 16, width: 21, height: 6 }
    },
    subDivisionNumber: { value: '18/1', rawText: 'किला मिन 18/1', confidence: 95 },

    primaryOwnerName: {
      value: 'Chaudhary Harphool Singh',
      rawText: 'चौधरी हरफूल सिंह',
      confidence: 98,
      isHandwritten: false,
      boundingBox: { x: 12, y: 34, width: 38, height: 7 }
    },
    parentageOrSpouse: {
      value: 'Deep Chand (Father)',
      rawText: 'पिसर दीप चंद',
      confidence: 97
    },
    totalOwnersCount: 2,
    coSharers: [
      {
        id: 'CS-HR-01',
        name: 'Chaudhary Harphool Singh',
        relation: 'Self / Hissedar',
        shareFraction: '1/2',
        shareAreaSqMeters: 16250,
        panOrAadhaarRef: 'XXXX-XXXX-7714'
      },
      {
        id: 'CS-HR-02',
        name: 'Devender Singh',
        relation: 'Son',
        shareFraction: '1/2',
        shareAreaSqMeters: 16250,
        panOrAadhaarRef: 'XXXX-XXXX-2098'
      }
    ],

    landClassification: {
      value: 'Chahi (Electric Tubewell Irrigated Basmati Paddy Belt)',
      rawText: 'चाहि (बिजली ट्यूबवेल सिंचित बासमती क्षेत्र)',
      confidence: 96
    },
    irrigationSource: {
      value: 'Deep Tubewell with Underground Pipeline',
      rawText: 'गहरा ट्यूबवेल भूमिगत पाइपलाइन',
      confidence: 95
    },
    totalAreaDeclared: {
      value: 3.25,
      rawText: '3.25 हेक्टर (32,500 वर्ग मीटर / 40 कनाल)',
      confidence: 98,
      boundingBox: { x: 12, y: 50, width: 28, height: 6 }
    },
    declaredUnit: { value: 'HECTARE', confidence: 99 },
    normalizedAreaSqMeters: 32500,

    annualLandRevenue: { value: 97.50, rawText: 'मामला रू. 97.50', confidence: 97 },
    encumbranceStatus: {
      value: 'CLEAR',
      rawText: 'गैर रहन / साफ मुल्कियत (Unencumbered)',
      confidence: 98
    },

    mutations: [
      {
        mutationNumber: 'HR-INT-2022-8910',
        dateOfOrder: '2022-12-20',
        sanctioningOfficer: 'Tehsildar Nilokheri',
        mutationType: 'INHERITANCE',
        transferor: 'Late Deep Chand',
        transferee: 'Harphool Singh & Devender Singh',
        status: 'SANCTIONED',
        remarks: 'Intiqal Wirsat approved in public jalsa vide order #8910'
      }
    ],

    boundaries: {
      north: 'Killa 45//13 (Sukhbir Singh tubewell)',
      south: 'Village Phirni & Watercourse (Khala)',
      east: 'Killa 45//18/2 (Mahender Singh)',
      west: 'Killa 45//17 (Dharampal)'
    },

    cadastralPolygon: [
      [76.9620, 29.8140],
      [76.9660, 29.8143],
      [76.9658, 29.8105],
      [76.9618, 29.8102]
    ],

    preprocessingMetrics: {
      deskewAngleDegrees: -0.10,
      contrastScore: 96.0,
      dpiEstimated: 300,
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
        message: 'Co-sharer shares (32,500 sq.m) equal declared parcel area (32,500 sq.m).'
      },
      {
        ruleId: 'VR-02-CDB',
        ruleName: 'DILRMP Central Registry Match Verified',
        category: 'CROSS_DB',
        passed: true,
        severity: 'INFO',
        message: 'Verified against Jamabandi Haryana Land Registry. Status: CLEAN.'
      }
    ],

    reviewHistory: [
      {
        timestamp: '2026-08-27T16:10:00Z',
        officerName: 'AI OCR Pipeline v3.8',
        role: 'VERIFICATION_SPECIALIST',
        action: 'Ingestion & Hindi OCR Verification Complete'
      },
      {
        timestamp: '2026-08-28T11:00:00Z',
        officerName: 'Tehsildar Nilokheri',
        role: 'REVENUE_OFFICER',
        action: 'Sanctioned - Clean Revenue Title'
      }
    ]
  },

  // 7. Telangana - Dharani Portal Pahani (Shamshabad, Rangareddy)
  {
    id: 'REC-TS-PAHANI-9014',
    documentNumber: 'TS-RRD-SHM-2024-DHN-9014',
    documentType: 'PATTA_CHITTA',
    primaryLanguage: 'telugu',
    script: 'Telugu (తెలుగు)',
    sourceFileName: 'Shamshabad_Sy74_Dharani_Pahani.pdf',
    sourceImageUrl: 'https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&q=80&w=1200',
    uploadedAt: '2026-09-03T15:45:00Z',
    uploadedBy: 'Mandal Revenue Officer G. Ravinder (Shamshabad)',
    status: 'NEEDS_REVIEW',
    overallConfidence: 73.2,

    state: { value: 'Telangana', rawText: 'తెలంగాణ ప్రభుత్వం', confidence: 99 },
    district: { value: 'Rangareddy', rawText: 'రంగారెడ్డి జిల్లా', confidence: 98 },
    tehsil: { value: 'Shamshabad', rawText: 'శంషాబాద్ మండలం', confidence: 97 },
    village: { value: 'Pedda Golconda', rawText: 'పెద్ద గోల్కొండ', confidence: 97 },
    censusVillageCode: { value: '574102', rawText: '574102', confidence: 95 },

    khasraNumber: {
      value: '74/A/1',
      rawText: 'సర్వే నెం: 74/A/1',
      confidence: 88,
      isHandwritten: false,
      boundingBox: { x: 38, y: 17, width: 22, height: 6 }
    },
    khataNumber: {
      value: 'T281900412',
      rawText: 'ధరణి పట్టాదారు పాస్ బుక్: T281900412',
      confidence: 94,
      isHandwritten: false,
      boundingBox: { x: 65, y: 17, width: 26, height: 6 }
    },
    subDivisionNumber: { value: 'A/1', rawText: 'సబ్ డివిజన్ A/1', confidence: 89 },

    primaryOwnerName: {
      value: 'G. Srinivas Reddy',
      rawText: 'జి. శ్రీనివాస్ రెడ్డి',
      confidence: 92,
      isHandwritten: false,
      boundingBox: { x: 12, y: 35, width: 36, height: 7 }
    },
    parentageOrSpouse: {
      value: 'Venkat Reddy (Father)',
      rawText: 'వెంకట్ రెడ్డి (తండ్రి)',
      confidence: 90
    },
    totalOwnersCount: 1,
    coSharers: [
      {
        id: 'CS-TS-01',
        name: 'G. Srinivas Reddy',
        relation: 'Sole Pattadar',
        shareFraction: '1/1',
        shareAreaSqMeters: 20500,
        panOrAadhaarRef: 'XXXX-XXXX-4819'
      }
    ],

    landClassification: {
      value: 'Dry Agricultural (Kushki / Commercial Peri-Urban)',
      rawText: 'మెట్ట భూమి (ఖుష్కి / పెరి-అర్బన్)',
      confidence: 87
    },
    irrigationSource: {
      value: 'Rainfed with Seasonal Farm Pond',
      rawText: 'వర్షాధారం',
      confidence: 85
    },
    totalAreaDeclared: {
      value: 2.05,
      rawText: '2.05 హెక్టార్లు (5.06 ఎకరాలు)',
      confidence: 95,
      boundingBox: { x: 12, y: 52, width: 26, height: 6 }
    },
    declaredUnit: { value: 'HECTARE', confidence: 99 },
    normalizedAreaSqMeters: 20500,

    annualLandRevenue: { value: 61.50, rawText: 'రూ. 61.50', confidence: 91 },
    encumbranceStatus: {
      value: 'GOVT_ACQUISITION',
      rawText: 'హెచ్ఎండిఏ ఔటర్ రింగ్ రోడ్ బఫర్ జోన్ ప్రిలిమినరీ నోటిఫికేషన్',
      confidence: 72,
      isHandwritten: true,
      isFlagged: true,
      flagReason: 'Preliminary Section 11 notice under RFCTLARR Act 2013 for ORR service road buffer zone expansion'
    },
    bankLienDetails: 'Hyderabad Metropolitan Development Authority (HMDA) Land Acquisition preliminary inquiry ref LA/ORR/2024/091',

    mutations: [
      {
        mutationNumber: 'TS-DHN-2021-3310',
        dateOfOrder: '2021-05-19',
        sanctioningOfficer: 'MRO Shamshabad',
        mutationType: 'SALE_DEED',
        transferor: 'K. Yadagiri Rao',
        transferee: 'G. Srinivas Reddy',
        status: 'SANCTIONED',
        remarks: 'Dharani portal instant registration and e-mutation'
      }
    ],

    boundaries: {
      north: 'Survey 73 (Private commercial warehouse plot)',
      south: 'HMDA Outer Ring Road Service Lane boundary',
      east: 'Survey 74/A/2 (M. Ramachandraiah)',
      west: 'Survey 75 (Government poramboke land)'
    },

    cadastralPolygon: [
      [78.3810, 17.2150],
      [78.3845, 17.2152],
      [78.3842, 17.2125],
      [78.3808, 17.2123]
    ],

    preprocessingMetrics: {
      deskewAngleDegrees: -2.35,
      contrastScore: 74.2,
      dpiEstimated: 200,
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
        message: 'Sole Pattadar share (20,500 sq.m) equals declared parcel area (20,500 sq.m).'
      },
      {
        ruleId: 'VR-02-CDB',
        ruleName: 'Government Land Acquisition Notification',
        category: 'CROSS_DB',
        passed: false,
        severity: 'WARNING',
        message: 'Preliminary Section 11 notice for infrastructure acquisition corridor.'
      }
    ],

    reviewHistory: [
      {
        timestamp: '2026-09-03T15:50:00Z',
        officerName: 'AI OCR Pipeline v3.8',
        role: 'VERIFICATION_SPECIALIST',
        action: 'Ingested & Flagged for Government Acquisition Buffer Review'
      }
    ]
  },

  // 8. Bihar - Bihar Bhumi Survey Khatian (Kanti, Muzaffarpur)
  {
    id: 'REC-BR-KHATIAN-6201',
    documentNumber: 'BR-MUZ-KNT-2024-KHT-6201',
    documentType: 'KHASRA_KHATAUNI',
    primaryLanguage: 'hindi',
    script: 'Devanagari (हिन्दी)',
    sourceFileName: 'Muzaffarpur_Marwan_Khasra892_Khatian.pdf',
    sourceImageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=1200',
    uploadedAt: '2026-09-04T09:40:00Z',
    uploadedBy: 'Revenue Karmachari R. P. Thakur (Kanti Circle)',
    status: 'NEEDS_REVIEW',
    overallConfidence: 77.8,

    state: { value: 'Bihar', rawText: 'बिहार सरकार', confidence: 99 },
    district: { value: 'Muzaffarpur', rawText: 'मुजफ्फरपुर', confidence: 98 },
    tehsil: { value: 'Kanti', rawText: 'कांटी अंचल', confidence: 97 },
    village: { value: 'Marwan', rawText: 'मरवन (थाना नं. ४१२)', confidence: 96 },
    censusVillageCode: { value: '228914', rawText: '२२८९१४', confidence: 94 },

    khasraNumber: {
      value: '892',
      rawText: 'खेसरा / प्लॉट नं: ८९२',
      confidence: 87,
      isHandwritten: false,
      boundingBox: { x: 38, y: 16, width: 22, height: 6 }
    },
    khataNumber: {
      value: '143',
      rawText: 'खाता संख्या: १४३',
      confidence: 90,
      isHandwritten: false,
      boundingBox: { x: 66, y: 16, width: 20, height: 6 }
    },
    subDivisionNumber: { value: '0', rawText: 'हिस्सा शून्य', confidence: 85 },

    primaryOwnerName: {
      value: 'Ramashray Prasad Singh',
      rawText: 'रामाश्रय प्रसाद सिंह',
      confidence: 91,
      isHandwritten: false,
      boundingBox: { x: 12, y: 34, width: 36, height: 7 }
    },
    parentageOrSpouse: {
      value: 'Mahendra Singh (Father)',
      rawText: 'पिता: महेंद्र सिंह',
      confidence: 89
    },
    totalOwnersCount: 2,
    coSharers: [
      {
        id: 'CS-BR-01',
        name: 'Ramashray Prasad Singh',
        relation: 'Self / Karta',
        shareFraction: '1/2',
        shareAreaSqMeters: 5750,
        panOrAadhaarRef: 'XXXX-XXXX-6102'
      },
      {
        id: 'CS-BR-02',
        name: 'Vidyanand Singh',
        relation: 'Brother',
        shareFraction: '1/2',
        shareAreaSqMeters: 5750,
        panOrAadhaarRef: 'XXXX-XXXX-8921'
      }
    ],

    landClassification: {
      value: 'Bhit Awval (Shahi Litchi & Maize Belt)',
      rawText: 'भीठ अव्वल (शाही लीची व मक्का बागान)',
      confidence: 86
    },
    irrigationSource: {
      value: 'Private Borewell with Diesel Pump',
      rawText: 'निजी बोरिंग व पंपसेट',
      confidence: 74,
      isHandwritten: true,
      isFlagged: true,
      flagReason: 'Kaithi cursive script annotation in irrigation column'
    },
    totalAreaDeclared: {
      value: 1.15,
      rawText: '१.१५ हेक्टर (३ बीघा १० कट्ठा)',
      confidence: 92,
      boundingBox: { x: 12, y: 50, width: 26, height: 6 }
    },
    declaredUnit: { value: 'HECTARE', confidence: 99 },
    normalizedAreaSqMeters: 11500,

    annualLandRevenue: { value: 34.50, rawText: 'लगान रू. ३४.५०', confidence: 88 },
    encumbranceStatus: {
      value: 'CLEAR',
      rawText: 'दाखिल-खारिज पंजी अनुसार बेदाग',
      confidence: 89
    },

    mutations: [
      {
        mutationNumber: 'BR-DK-2022-5401',
        dateOfOrder: '2022-07-30',
        sanctioningOfficer: 'Circle Officer, Kanti',
        mutationType: 'INHERITANCE',
        transferor: 'Late Mahendra Singh',
        transferee: 'Ramashray Prasad & Vidyanand Singh',
        status: 'SANCTIONED',
        remarks: 'Wirasat Dakhil Kharij approved under Bihar Land Mutation Act 2011'
      }
    ],

    boundaries: {
      north: 'Khasra 891 (Nawal Kishore Singh litchi orchard)',
      south: 'Village Link PWD Road to Muzaffarpur',
      east: 'Khasra 893 (Dineshwar Prasad)',
      west: 'Village Pokhar (Public Pond)'
    },

    cadastralPolygon: [
      [85.2810, 26.1540],
      [85.2838, 26.1542],
      [85.2835, 26.1520],
      [85.2808, 26.1518]
    ],

    preprocessingMetrics: {
      deskewAngleDegrees: -2.85,
      contrastScore: 76.5,
      dpiEstimated: 240,
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
        message: 'Co-sharer shares (11,500 sq.m) equal declared parcel area (11,500 sq.m).'
      },
      {
        ruleId: 'VR-02-CDB',
        ruleName: 'DILRMP Central Registry Check',
        category: 'CROSS_DB',
        passed: true,
        severity: 'INFO',
        message: 'Verified against Bihar Bhumi digital registry. Status: CLEAN.'
      }
    ],

    reviewHistory: [
      {
        timestamp: '2026-09-04T09:45:00Z',
        officerName: 'AI OCR Pipeline v3.8',
        role: 'VERIFICATION_SPECIALIST',
        action: 'Ingested; Kaithi script notes flagged for officer review'
      }
    ]
  },

  // 9. Assam - Dharitree Chitha / Periodic Patta (Sonapur, Kamrup Metro)
  {
    id: 'REC-AS-CHITHA-1142',
    documentNumber: 'AS-KAM-SON-2024-CHT-1142',
    documentType: 'KHASRA_KHATAUNI',
    primaryLanguage: 'bengali',
    script: 'Assamese (অসমীয়া)',
    sourceFileName: 'Sonapur_Dag318_Dharitree_Chitha.pdf',
    sourceImageUrl: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=1200',
    uploadedAt: '2026-08-30T14:15:00Z',
    uploadedBy: 'Mandal D. C. Kalita (Sonapur Revenue Circle)',
    status: 'VERIFIED_AND_SANCTIONED',
    overallConfidence: 93.4,

    state: { value: 'Assam', rawText: 'অসম চৰকাৰ', confidence: 99 },
    district: { value: 'Kamrup Metropolitan', rawText: 'কামৰূপ মহানগৰ', confidence: 98 },
    tehsil: { value: 'Sonapur', rawText: 'সোণাপুৰ ৰাজহ চক্ৰ', confidence: 97 },
    village: { value: 'Khetri', rawText: 'ক্ষেত্ৰী (মৌজা ডিমৰীয়া)', confidence: 97 },
    censusVillageCode: { value: '302418', rawText: '৩০২৪১৮', confidence: 95 },

    khasraNumber: {
      value: '318',
      rawText: 'দাগ নং: ৩১৮',
      confidence: 95,
      isHandwritten: false,
      boundingBox: { x: 38, y: 16, width: 22, height: 6 }
    },
    khataNumber: {
      value: 'KP-82',
      rawText: 'খেৰাজ ম্যাদী পাট্টা নং: ৮২',
      confidence: 96,
      isHandwritten: false,
      boundingBox: { x: 67, y: 16, width: 23, height: 6 }
    },
    subDivisionNumber: { value: '0', rawText: 'হিস্যা নাই', confidence: 92 },

    primaryOwnerName: {
      value: 'Hemanta Kumar Baruah',
      rawText: 'হেমন্ত কুমাৰ বৰুৱা',
      confidence: 95,
      isHandwritten: false,
      boundingBox: { x: 12, y: 34, width: 36, height: 7 }
    },
    parentageOrSpouse: {
      value: 'Golap Baruah (Father)',
      rawText: 'পিতা: গোলাপ বৰুৱা',
      confidence: 94
    },
    totalOwnersCount: 2,
    coSharers: [
      {
        id: 'CS-AS-01',
        name: 'Hemanta Kumar Baruah',
        relation: 'Self / Pattadar',
        shareFraction: '1/2',
        shareAreaSqMeters: 7500,
        panOrAadhaarRef: 'XXXX-XXXX-9031'
      },
      {
        id: 'CS-AS-02',
        name: 'Monojit Baruah',
        relation: 'Brother',
        shareFraction: '1/2',
        shareAreaSqMeters: 7500,
        panOrAadhaarRef: 'XXXX-XXXX-1142'
      }
    ],

    landClassification: {
      value: 'Bari & Tea Smallholding (চাহ বাগিচা ও বাৰী)',
      rawText: 'বাৰী ও চাহ ক্ষুদ্ৰ খেতি',
      confidence: 93
    },
    irrigationSource: {
      value: 'Digaru River Basin Gravity Flow & Spring Brook',
      rawText: 'প্ৰাকৃতিক জান ও নিজৰাৰ পানী',
      confidence: 90
    },
    totalAreaDeclared: {
      value: 1.50,
      rawText: '১.৫০ হেক্টৰ (১১ বিঘা ১ কঠা)',
      confidence: 97,
      boundingBox: { x: 12, y: 50, width: 26, height: 6 }
    },
    declaredUnit: { value: 'HECTARE', confidence: 99 },
    normalizedAreaSqMeters: 15000,

    annualLandRevenue: { value: 45.00, rawText: 'খাজনা টকা ৪৫.০০', confidence: 94 },
    encumbranceStatus: {
      value: 'CLEAR',
      rawText: 'দায়মুক্ত পাট্টা',
      confidence: 95
    },

    mutations: [
      {
        mutationNumber: 'AS-MUT-2023-1890',
        dateOfOrder: '2023-03-29',
        sanctioningOfficer: 'Circle Officer Sonapur',
        mutationType: 'INHERITANCE',
        transferor: 'Late Golap Baruah',
        transferee: 'Hemanta & Monojit Baruah',
        status: 'SANCTIONED',
        remarks: 'Order passed under Section 53 of Assam Land and Revenue Regulation 1886'
      }
    ],

    boundaries: {
      north: 'Dag 317 (K. C. Das organic pineapple farm)',
      south: 'Village road leading to NH 27 bypass',
      east: 'Dag 319 (Pulin Medhi)',
      west: 'Digaru River embankment reserve'
    },

    cadastralPolygon: [
      [91.9820, 26.1150],
      [91.9850, 26.1152],
      [91.9848, 26.1128],
      [91.9818, 26.1125]
    ],

    preprocessingMetrics: {
      deskewAngleDegrees: -0.35,
      contrastScore: 91.2,
      dpiEstimated: 300,
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
        message: 'Co-sharer shares (15,000 sq.m) equal declared parcel area (15,000 sq.m).'
      },
      {
        ruleId: 'VR-02-CDB',
        ruleName: 'DILRMP Central Registry Match Verified',
        category: 'CROSS_DB',
        passed: true,
        severity: 'INFO',
        message: 'Verified against Dharitree Assam Integrated Land Records. Status: CLEAN.'
      }
    ],

    reviewHistory: [
      {
        timestamp: '2026-08-30T14:20:00Z',
        officerName: 'AI OCR Pipeline v3.8',
        role: 'VERIFICATION_SPECIALIST',
        action: 'Assamese OCR Ingested and Validated'
      }
    ]
  },

  // 10. Uttarakhand - Devbhoomi Khatauni (Kashipur, Udham Singh Nagar)
  {
    id: 'REC-UK-KHATAUNI-4029',
    documentNumber: 'UK-USN-KSH-2024-KHT-4029',
    documentType: 'KHASRA_KHATAUNI',
    primaryLanguage: 'hindi',
    script: 'Devanagari (हिन्दी)',
    sourceFileName: 'Kashipur_Kundeshwari_Khasra241_Khatauni.pdf',
    sourceImageUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=1200',
    uploadedAt: '2026-08-29T17:15:00Z',
    uploadedBy: 'Lekhpal Vikram Rawat (Kundeshwari Sector)',
    status: 'VERIFIED_AND_SANCTIONED',
    overallConfidence: 96.1,

    state: { value: 'Uttarakhand', rawText: 'उत्तराखंड शासन', confidence: 99 },
    district: { value: 'Udham Singh Nagar', rawText: 'ऊधम सिंह नगर', confidence: 98 },
    tehsil: { value: 'Kashipur', rawText: 'काशीपुर', confidence: 98 },
    village: { value: 'Kundeshwari', rawText: 'कुंडेश्वरी', confidence: 97 },
    censusVillageCode: { value: '054112', rawText: '054112', confidence: 96 },

    khasraNumber: {
      value: '241/2',
      rawText: 'खसरा संख्या: 241/2',
      confidence: 97,
      isHandwritten: false,
      boundingBox: { x: 39, y: 16, width: 23, height: 6 }
    },
    khataNumber: {
      value: '00088',
      rawText: 'खतौनी खाता संख्या: 00088',
      confidence: 98,
      isHandwritten: false,
      boundingBox: { x: 67, y: 16, width: 22, height: 6 }
    },
    subDivisionNumber: { value: '2', rawText: 'बटा खसरा 2', confidence: 95 },

    primaryOwnerName: {
      value: 'Gurmukh Singh Gill',
      rawText: 'गुरमुख सिंह गिल',
      confidence: 97,
      isHandwritten: false,
      boundingBox: { x: 12, y: 34, width: 36, height: 7 }
    },
    parentageOrSpouse: {
      value: 'Sardar Joginder Singh (Father)',
      rawText: 'पिता सरदार जोगिंदर सिंह',
      confidence: 96
    },
    totalOwnersCount: 2,
    coSharers: [
      {
        id: 'CS-UK-01',
        name: 'Gurmukh Singh Gill',
        relation: 'Self / Bhumidhar',
        shareFraction: '1/2',
        shareAreaSqMeters: 14000,
        panOrAadhaarRef: 'XXXX-XXXX-4412'
      },
      {
        id: 'CS-UK-02',
        name: 'Harpreet Kaur Gill',
        relation: 'Spouse',
        shareFraction: '1/2',
        shareAreaSqMeters: 14000,
        panOrAadhaarRef: 'XXXX-XXXX-9931'
      }
    ],

    landClassification: {
      value: 'Tarai Irrigated (Sugarcane & Wheat / A-Class Loam)',
      rawText: 'तराई सिंचित (गन्ना व गेहूं / दोमट)',
      confidence: 95
    },
    irrigationSource: {
      value: 'Tubewell & Tumaria Dam Feeder Canal',
      rawText: 'राजकीय नलकूप एवं तुमरिया डैम नहर',
      confidence: 94
    },
    totalAreaDeclared: {
      value: 2.80,
      rawText: '2.80 हेक्टर (28,000 वर्ग मीटर)',
      confidence: 98,
      boundingBox: { x: 12, y: 50, width: 28, height: 6 }
    },
    declaredUnit: { value: 'HECTARE', confidence: 99 },
    normalizedAreaSqMeters: 28000,

    annualLandRevenue: { value: 84.00, rawText: 'मालगुजारी रू. 84.00', confidence: 96 },
    encumbranceStatus: {
      value: 'CLEAR',
      rawText: 'भारमुक्त / कोई बंधक दर्ज नहीं',
      confidence: 97
    },

    mutations: [
      {
        mutationNumber: 'UK-KHT-2022-3104',
        dateOfOrder: '2022-10-18',
        sanctioningOfficer: 'Naib Tehsildar Kashipur',
        mutationType: 'SALE_DEED',
        transferor: 'Balwant Singh Sandhu',
        transferee: 'Gurmukh Singh Gill',
        status: 'SANCTIONED',
        remarks: 'Bhumidhari transfer order under UPZALR Act as adapted in Uttarakhand'
      }
    ],

    boundaries: {
      north: 'Khasra 240 (Charanjit Singh sugarcane farm)',
      south: 'Kundeshwari to Ramnagar State Highway road',
      east: 'Khasra 241/3 (Pratap Singh)',
      west: 'Irrigation masonry gul channel'
    },

    cadastralPolygon: [
      [78.9410, 29.2140],
      [78.9445, 29.2143],
      [78.9442, 29.2110],
      [78.9408, 29.2108]
    ],

    preprocessingMetrics: {
      deskewAngleDegrees: -0.22,
      contrastScore: 95.5,
      dpiEstimated: 300,
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
        message: 'Co-sharer shares (28,000 sq.m) equal declared parcel area (28,000 sq.m).'
      },
      {
        ruleId: 'VR-02-CDB',
        ruleName: 'DILRMP Central Registry Match Verified',
        category: 'CROSS_DB',
        passed: true,
        severity: 'INFO',
        message: 'Verified against Devbhoomi Uttarakhand Registry. Status: CLEAN.'
      }
    ],

    reviewHistory: [
      {
        timestamp: '2026-08-29T17:20:00Z',
        officerName: 'AI OCR Pipeline v3.8',
        role: 'VERIFICATION_SPECIALIST',
        action: 'Ingested and passed automated audit'
      }
    ]
  },

  // 11. Jharkhand - Jharbhoomi Khatiyan (Ormanjhi, Ranchi)
  {
    id: 'REC-JH-KHATIYAN-5178',
    documentNumber: 'JH-RNC-ORM-2024-KHT-5178',
    documentType: 'KHASRA_KHATAUNI',
    primaryLanguage: 'hindi',
    script: 'Devanagari (हिन्दी)',
    sourceFileName: 'Ranchi_Ormanjhi_Khasra476_Khatiyan.pdf',
    sourceImageUrl: 'https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&q=80&w=1200',
    uploadedAt: '2026-09-02T16:30:00Z',
    uploadedBy: 'Circle Officer S. K. Tirkey (Ormanjhi Block)',
    status: 'PARTIALLY_VERIFIED',
    overallConfidence: 84.3,

    state: { value: 'Jharkhand', rawText: 'झारखंड सरकार', confidence: 99 },
    district: { value: 'Ranchi', rawText: 'रांची', confidence: 98 },
    tehsil: { value: 'Ormanjhi', rawText: 'ओरमांझी अंचल', confidence: 97 },
    village: { value: 'Irba', rawText: 'इरबा (मौजा नं. ५४)', confidence: 96 },
    censusVillageCode: { value: '374109', rawText: '३७४१०९', confidence: 93 },

    khasraNumber: {
      value: '476',
      rawText: 'प्लॉट / खसरा: ४७६',
      confidence: 89,
      isHandwritten: false,
      boundingBox: { x: 38, y: 16, width: 22, height: 6 }
    },
    khataNumber: {
      value: '00054',
      rawText: 'खाता संख्या: ५४ (रैयती)',
      confidence: 93,
      isHandwritten: false,
      boundingBox: { x: 66, y: 16, width: 22, height: 6 }
    },
    subDivisionNumber: { value: '0', rawText: 'शून्य', confidence: 88 },

    primaryOwnerName: {
      value: 'Somra Munda',
      rawText: 'सोमरा मुंडा',
      confidence: 94,
      isHandwritten: false,
      boundingBox: { x: 12, y: 34, width: 34, height: 7 }
    },
    parentageOrSpouse: {
      value: 'Budhwa Munda (Father)',
      rawText: 'पिता: बुधवा मुंडा',
      confidence: 92
    },
    totalOwnersCount: 2,
    coSharers: [
      {
        id: 'CS-JH-01',
        name: 'Somra Munda',
        relation: 'Self / Raiyat',
        shareFraction: '1/2',
        shareAreaSqMeters: 6750,
        panOrAadhaarRef: 'XXXX-XXXX-7119'
      },
      {
        id: 'CS-JH-02',
        name: 'Mangra Munda',
        relation: 'Brother',
        shareFraction: '1/2',
        shareAreaSqMeters: 6750,
        panOrAadhaarRef: 'XXXX-XXXX-8824'
      }
    ],

    landClassification: {
      value: 'Don II (Terraced Wet Rice Cultivation)',
      rawText: 'दोन दोयम (सीढ़ीदार धान खेत)',
      confidence: 89
    },
    irrigationSource: {
      value: 'Natural Spring Stream & Check Dam',
      rawText: 'जोड़िया एवं चेकडैम',
      confidence: 85
    },
    totalAreaDeclared: {
      value: 1.35,
      rawText: '१.३५ हेक्टर (३.३४ एकड़)',
      confidence: 95,
      boundingBox: { x: 12, y: 50, width: 26, height: 6 }
    },
    declaredUnit: { value: 'HECTARE', confidence: 99 },
    normalizedAreaSqMeters: 13500,

    annualLandRevenue: { value: 40.50, rawText: 'लगान रू. ४०.५०', confidence: 91 },
    encumbranceStatus: {
      value: 'CLEAR',
      rawText: 'सीएनटी एक्ट धारा ४६ संरक्षित रैयती भूमि',
      confidence: 90
    },

    mutations: [
      {
        mutationNumber: 'JH-DK-2023-8812',
        dateOfOrder: '2023-11-19',
        sanctioningOfficer: 'Circle Officer Ormanjhi',
        mutationType: 'INHERITANCE',
        transferor: 'Late Budhwa Munda',
        transferee: 'Somra & Mangra Munda',
        status: 'SANCTIONED',
        remarks: 'Wirasat sanction under Chota Nagpur Tenancy (CNT) Act Section 46 guidelines'
      }
    ],

    boundaries: {
      north: 'Khasra 475 (Etwa Oraon Don field)',
      south: 'Village boundary nala connecting Subarnarekha river',
      east: 'Khasra 477 (Shyam Lal Mahto)',
      west: 'Gram Rakshit jungle pasture'
    },

    cadastralPolygon: [
      [85.4410, 23.4820],
      [85.4440, 23.4822],
      [85.4438, 23.4795],
      [85.4408, 23.4792]
    ],

    preprocessingMetrics: {
      deskewAngleDegrees: -1.75,
      contrastScore: 83.0,
      dpiEstimated: 240,
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
        message: 'Co-sharer shares (13,500 sq.m) equal declared parcel area (13,500 sq.m).'
      },
      {
        ruleId: 'VR-02-CDB',
        ruleName: 'DILRMP Central Registry Match Verified',
        category: 'CROSS_DB',
        passed: true,
        severity: 'INFO',
        message: 'Verified against Jharbhoomi Land Records Portal. Status: CLEAN.'
      }
    ],

    reviewHistory: [
      {
        timestamp: '2026-09-02T16:35:00Z',
        officerName: 'AI OCR Pipeline v3.8',
        role: 'VERIFICATION_SPECIALIST',
        action: 'Ingested & CNT Act verification queued'
      }
    ]
  },

  // 12. Chhattisgarh - Bhuiyan Portal Khasra B-1 (Patan, Durg)
  {
    id: 'REC-CH-KHASRA-3391',
    documentNumber: 'CG-DRG-PAT-2024-BHU-3391',
    documentType: 'KHASRA_KHATAUNI',
    primaryLanguage: 'hindi',
    script: 'Devanagari (हिन्दी)',
    sourceFileName: 'Durg_Jamgaon_Khasra158_Bhuiyan.pdf',
    sourceImageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=1200',
    uploadedAt: '2026-08-31T15:10:00Z',
    uploadedBy: 'Patwari H. R. Dewangan (Jamgaon Halka 14)',
    status: 'VERIFIED_AND_SANCTIONED',
    overallConfidence: 94.8,

    state: { value: 'Chhattisgarh', rawText: 'छत्तीसगढ़ शासन', confidence: 99 },
    district: { value: 'Durg', rawText: 'दुर्ग', confidence: 98 },
    tehsil: { value: 'Patan', rawText: 'पाटन', confidence: 97 },
    village: { value: 'Jamgaon', rawText: 'जामगांव (एम)', confidence: 97 },
    censusVillageCode: { value: '441019', rawText: '४४१०१९', confidence: 95 },

    khasraNumber: {
      value: '158/4',
      rawText: 'खसरा नं: १५८/४',
      confidence: 96,
      isHandwritten: false,
      boundingBox: { x: 38, y: 16, width: 22, height: 6 }
    },
    khataNumber: {
      value: '76',
      rawText: 'खतौनी खाता क्रमांक: ७६',
      confidence: 97,
      isHandwritten: false,
      boundingBox: { x: 67, y: 16, width: 21, height: 6 }
    },
    subDivisionNumber: { value: '4', rawText: 'बटा ४', confidence: 94 },

    primaryOwnerName: {
      value: 'Nandkumar Sahu',
      rawText: 'नंदकुमार साहू',
      confidence: 96,
      isHandwritten: false,
      boundingBox: { x: 12, y: 34, width: 36, height: 7 }
    },
    parentageOrSpouse: {
      value: 'Chhannulal Sahu (Father)',
      rawText: 'पिता: छन्नूलाल साहू',
      confidence: 95
    },
    totalOwnersCount: 2,
    coSharers: [
      {
        id: 'CS-CG-01',
        name: 'Nandkumar Sahu',
        relation: 'Self / Bhumiswami',
        shareFraction: '1/2',
        shareAreaSqMeters: 8750,
        panOrAadhaarRef: 'XXXX-XXXX-9182'
      },
      {
        id: 'CS-CG-02',
        name: 'Kamal Sahu',
        relation: 'Brother',
        shareFraction: '1/2',
        shareAreaSqMeters: 8750,
        panOrAadhaarRef: 'XXXX-XXXX-3341'
      }
    ],

    landClassification: {
      value: 'Matasi / Doyam (Paddy Field with Tube Well Irrigation)',
      rawText: 'मटासी दोयम (नलकूप सिंचित धान)',
      confidence: 94
    },
    irrigationSource: {
      value: 'Solar Irrigation Pump / PM Kusum Scheme',
      rawText: 'सौर कृषि पंप व नहर',
      confidence: 93
    },
    totalAreaDeclared: {
      value: 1.75,
      rawText: '१.७५ हेक्टर (४.३२ एकड़)',
      confidence: 98,
      boundingBox: { x: 12, y: 50, width: 26, height: 6 }
    },
    declaredUnit: { value: 'HECTARE', confidence: 99 },
    normalizedAreaSqMeters: 17500,

    annualLandRevenue: { value: 52.50, rawText: 'भू-राजस्व रू. ५२.५०', confidence: 95 },
    encumbranceStatus: {
      value: 'CLEAR',
      rawText: 'भूमिभार मुक्त / कोई बंधक नहीं',
      confidence: 96
    },

    mutations: [
      {
        mutationNumber: 'CG-NAM-2023-4120',
        dateOfOrder: '2023-05-14',
        sanctioningOfficer: 'Tehsildar Patan',
        mutationType: 'PARTITION',
        transferor: 'Chhannulal Sahu Joint Khata',
        transferee: 'Nandkumar & Kamal Sahu',
        status: 'SANCTIONED',
        remarks: 'Haq-tyag / Fard batwara sanctioned under CG Land Revenue Code 1959'
      }
    ],

    boundaries: {
      north: 'Khasra 158/3 (Kishan Lal Verma field)',
      south: 'Village Kharanja path to school',
      east: 'Khasra 159 (Punit Ram Nishad)',
      west: 'Khasra 157 (Irrigation canal feeder)'
    },

    cadastralPolygon: [
      [81.4820, 21.1410],
      [81.4850, 21.1412],
      [81.4848, 21.1388],
      [81.4818, 21.1385]
    ],

    preprocessingMetrics: {
      deskewAngleDegrees: -0.15,
      contrastScore: 93.5,
      dpiEstimated: 300,
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
        message: 'Co-sharer shares (17,500 sq.m) equal declared parcel area (17,500 sq.m).'
      },
      {
        ruleId: 'VR-02-CDB',
        ruleName: 'DILRMP Central Registry Match Verified',
        category: 'CROSS_DB',
        passed: true,
        severity: 'INFO',
        message: 'Verified against Bhuiyan CG Portal. Status: CLEAN.'
      }
    ],

    reviewHistory: [
      {
        timestamp: '2026-08-31T15:15:00Z',
        officerName: 'AI OCR Pipeline v3.8',
        role: 'VERIFICATION_SPECIALIST',
        action: 'Ingestion & Hindi OCR Verification Complete'
      }
    ]
  },

  // 13. Maharashtra - Saat-Baara Grape Orchard (Niphad, Nashik)
  {
    id: 'REC-MH-712-9934',
    documentNumber: 'MH-NSK-NPH-2024-712-9934',
    documentType: '7_12_EXTRACT',
    primaryLanguage: 'marathi',
    script: 'Devanagari (मराठी)',
    sourceFileName: 'Niphad_Pimpalgaon_Gat284_SaatBaara.pdf',
    sourceImageUrl: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=1200',
    uploadedAt: '2026-09-03T11:20:00Z',
    uploadedBy: 'Talathi S. M. Kute (Pimpalgaon Baswant Saza)',
    status: 'NEEDS_REVIEW',
    overallConfidence: 82.5,

    state: { value: 'Maharashtra', rawText: 'महाराष्ट्र शासन', confidence: 99 },
    district: { value: 'Nashik', rawText: 'नाशिक', confidence: 98 },
    tehsil: { value: 'Niphad', rawText: 'निफाड', confidence: 97 },
    village: { value: 'Pimpalgaon Baswant', rawText: 'पिंपळगाव बसवंत', confidence: 98 },
    censusVillageCode: { value: '551204', rawText: '५५१२०४', confidence: 96 },

    khasraNumber: {
      value: '284/1B',
      rawText: 'गट क्र. २८४/१ब',
      confidence: 92,
      isHandwritten: false,
      boundingBox: { x: 41, y: 17, width: 23, height: 6 }
    },
    khataNumber: {
      value: '412',
      rawText: 'खाते क्र. ४१२',
      confidence: 94,
      isHandwritten: false,
      boundingBox: { x: 69, y: 17, width: 19, height: 6 }
    },
    subDivisionNumber: { value: '1B', rawText: 'पोट हिस्सा १ब', confidence: 90 },

    primaryOwnerName: {
      value: 'Dnyaneshwar Bhausaheb Patil',
      rawText: 'ज्ञानेश्वर भाऊसाहेब पाटील',
      confidence: 93,
      isHandwritten: false,
      boundingBox: { x: 12, y: 35, width: 38, height: 7 }
    },
    parentageOrSpouse: {
      value: 'Bhausaheb R. Patil (Father)',
      rawText: 'भाऊसाहेब रा. पाटील (वडील)',
      confidence: 91
    },
    totalOwnersCount: 2,
    coSharers: [
      {
        id: 'CS-MH-01',
        name: 'Dnyaneshwar Bhausaheb Patil',
        relation: 'Self / Karta',
        shareFraction: '1/2',
        shareAreaSqMeters: 9750,
        panOrAadhaarRef: 'XXXX-XXXX-2190'
      },
      {
        id: 'CS-MH-02',
        name: 'Sopan Bhausaheb Patil',
        relation: 'Brother',
        shareFraction: '1/2',
        shareAreaSqMeters: 9750,
        panOrAadhaarRef: 'XXXX-XXXX-6610'
      }
    ],

    landClassification: {
      value: 'Bagayat Class I (Export Quality Grape Vineyard / द्राक्ष बाग)',
      rawText: 'बागायत वर्ग १ (द्राक्ष बाग)',
      confidence: 91
    },
    irrigationSource: {
      value: 'Borewell & Farm Pond (शेततळे) with Automated Drip System',
      rawText: 'शेततळे व ठिबक सिंचन',
      confidence: 88
    },
    totalAreaDeclared: {
      value: 1.95,
      rawText: '१ हेक्टर ९५ आर (१.९५)',
      confidence: 95,
      boundingBox: { x: 12, y: 51, width: 28, height: 6 }
    },
    declaredUnit: { value: 'HECTARE', confidence: 99 },
    normalizedAreaSqMeters: 19500,

    annualLandRevenue: { value: 58.50, rawText: 'रु. ५८.५०', confidence: 92 },
    encumbranceStatus: {
      value: 'MORTGAGED',
      rawText: 'नाशिक जिल्हा मध्यवर्ती सहकारी बँक बोजा नोंद ₹४,५०,०००',
      confidence: 78,
      isHandwritten: true,
      isFlagged: true,
      flagReason: 'NDCC Bank cold chain storage loan hypothecation of INR 4,50,000 recorded in other rights column'
    },
    bankLienDetails: 'Nashik District Central Co-op Bank Ltd, Pimpalgaon Branch cold storage loan ref NDCC/PMP/2023/118 for INR 4,50,000',

    mutations: [
      {
        mutationNumber: 'MR-2023-9118',
        dateOfOrder: '2023-04-12',
        sanctioningOfficer: 'Circle Officer Pimpalgaon',
        mutationType: 'INHERITANCE',
        transferor: 'Late Bhausaheb R. Patil',
        transferee: 'Dnyaneshwar & Sopan Patil',
        status: 'SANCTIONED',
        remarks: 'Waras nod approved following legal heir notice publication'
      },
      {
        mutationNumber: 'MR-2023-9941',
        dateOfOrder: '2023-09-08',
        sanctioningOfficer: 'Talathi Pimpalgaon',
        mutationType: 'MORTGAGE',
        transferor: 'Dnyaneshwar Bhausaheb Patil',
        transferee: 'Nashik District Central Co-op Bank Ltd',
        status: 'SANCTIONED',
        remarks: 'Bhoja nod recorded for agricultural warehouse infrastructure'
      }
    ],

    boundaries: {
      north: 'Gat No. 283 (R. K. More pomegranate orchard)',
      south: 'Pimpalgaon-Vani Tar Road boundary',
      east: 'Gat No. 284/1C (Sunil Patil)',
      west: 'Gat No. 284/1A (Pramod Shinde)'
    },

    cadastralPolygon: [
      [73.9850, 20.1710],
      [73.9880, 20.1713],
      [73.9878, 20.1685],
      [73.9848, 20.1682]
    ],

    preprocessingMetrics: {
      deskewAngleDegrees: -1.20,
      contrastScore: 81.5,
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
        message: 'Co-sharer shares (19,500 sq.m) equal declared parcel area (19,500 sq.m).'
      },
      {
        ruleId: 'VR-02-CDB',
        ruleName: 'DILRMP Central Registry Match Verified',
        category: 'CROSS_DB',
        passed: true,
        severity: 'INFO',
        message: 'Verified against MahaBhulekh Satbara digital registry. Status: CLEAN.'
      },
      {
        ruleId: 'VR-04-FLAG',
        ruleName: 'Bank Encumbrance Verification Required',
        category: 'LEGAL',
        passed: false,
        severity: 'WARNING',
        message: 'Active NDCC Bank cold chain storage loan charge of ₹4,50,000 registered.'
      }
    ],

    reviewHistory: [
      {
        timestamp: '2026-09-03T11:25:00Z',
        officerName: 'AI OCR Pipeline v3.8',
        role: 'VERIFICATION_SPECIALIST',
        action: 'Ingested & Flagged for NDCC Bank Mortgage NOC confirmation'
      }
    ]
  }
];
