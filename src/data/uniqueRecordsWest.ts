import { ExtractedLandRecord } from '../types';

export const UNIQUE_RECORDS_WEST: ExtractedLandRecord[] = [
  {
    "id": "REC-MH-PUN-017",
    "documentNumber": "MH-PUN-HAV-2024-712-142",
    "documentType": "7_12_EXTRACT",
    "primaryLanguage": "marathi",
    "script": "Devanagari (मराठी)",
    "sourceFileName": "MH_Pune_Haveli_Wagholi_142.pdf",
    "sourceImageUrl": "https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?auto=format&fit=crop&q=80&w=1200",
    "uploadedAt": "2026-07-04T08:23:00.000Z",
    "uploadedBy": "Talathi S. K. Kulkarni (Wagholi Saza)",
    "status": "NEEDS_REVIEW",
    "overallConfidence": 78.8,
    "state": {
      "value": "Maharashtra",
      "rawText": "महाराष्ट्र शासन - महसूल व वन विभाग",
      "confidence": 99
    },
    "district": {
      "value": "Pune",
      "rawText": "पुणे",
      "confidence": 98
    },
    "tehsil": {
      "value": "Haveli",
      "rawText": "हवेली",
      "confidence": 97
    },
    "village": {
      "value": "Wagholi",
      "rawText": "वाघोली",
      "confidence": 98
    },
    "censusVillageCode": {
      "value": "221841",
      "rawText": "५५६१०२",
      "confidence": 95
    },
    "khasraNumber": {
      "value": "142/1",
      "rawText": "गट क्र. १४२/१",
      "confidence": 91,
      "isHandwritten": false,
      "boundingBox": {
        "x": 42,
        "y": 18,
        "width": 22,
        "height": 6
      }
    },
    "khataNumber": {
      "value": "882",
      "rawText": "खाते क्र. ८८२",
      "confidence": 95,
      "isHandwritten": false,
      "boundingBox": {
        "x": 70,
        "y": 18,
        "width": 18,
        "height": 6
      }
    },
    "subDivisionNumber": {
      "value": "1",
      "rawText": "पोट हिस्सा १",
      "confidence": 90
    },
    "primaryOwnerName": {
      "value": "Tukaram Eknath Patil",
      "rawText": "तुकाराम एकनाथ पाटील",
      "confidence": 94,
      "isHandwritten": false,
      "boundingBox": {
        "x": 12,
        "y": 36,
        "width": 38,
        "height": 7
      }
    },
    "parentageOrSpouse": {
      "value": "Eknath Vitthal Patil",
      "rawText": "एकनाथ विठ्ठल पाटील (वडील)",
      "confidence": 92
    },
    "totalOwnersCount": 2,
    "coSharers": [
      {
        "id": "CS-MA-009",
        "name": "Tukaram Eknath Patil",
        "relation": "Self / Karta",
        "shareFraction": "1/2",
        "shareAreaSqMeters": 9350,
        "panOrAadhaarRef": "XXXX-XXXX-3853"
      },
      {
        "id": "CS-MA-010",
        "name": "Pandurang Eknath Patil",
        "relation": "Brother / Co-Khatedar",
        "shareFraction": "1/2",
        "shareAreaSqMeters": 9350,
        "panOrAadhaarRef": "XXXX-XXXX-4170"
      }
    ],
    "landClassification": {
      "value": "Jirayat / Agricultural (Bagayat)",
      "rawText": "जिरायत / बागायत शेतजमीन",
      "confidence": 93
    },
    "irrigationSource": {
      "value": "Well & Mula-Mutha Lift Irrigation",
      "rawText": "विहीर व उपसा सिंचन",
      "confidence": 89
    },
    "totalAreaDeclared": {
      "value": 1.87,
      "rawText": "१ हेक्टर ८५ आर (१.८५ हे.)",
      "confidence": 82,
      "isHandwritten": true,
      "boundingBox": {
        "x": 12,
        "y": 56,
        "width": 32,
        "height": 7
      }
    },
    "declaredUnit": {
      "value": "HECTARE",
      "confidence": 99
    },
    "normalizedAreaSqMeters": 18700,
    "annualLandRevenue": {
      "value": 188.85,
      "rawText": "₹188.85",
      "confidence": 97
    },
    "encumbranceStatus": {
      "value": "MORTGAGED",
      "rawText": "बँक ऑफ महाराष्ट्र बोपोडी शाखा बोजा नोंद ₹3,50,000",
      "confidence": 76,
      "isHandwritten": true,
      "isFlagged": true,
      "flagReason": "KCC crop loan hypothecation entry on 7/12 other rights (इतर हक्क)"
    },
    "bankLienDetails": "Bank of Maharashtra Bopodi Branch hypothecation charge registered under MLRC Section 148 for ₹3,50,000 on 2023-06-12",
    "mutations": [
      {
        "mutationNumber": "MR-2024-5185",
        "dateOfOrder": "2024-06-03",
        "sanctioningOfficer": "Circle Officer Wagholi",
        "mutationType": "MORTGAGE",
        "transferor": "Joint Khatedar 882",
        "transferee": "Bank of Maharashtra",
        "status": "SANCTIONED",
        "remarks": "Ferfar entry 4102 certified"
      }
    ],
    "boundaries": {
      "north": "Gat 141 (Grampanchayat cremation ground)",
      "south": "Pune-Nagar Highway feeder road",
      "east": "Gat 142/2 (Kashinath Patil)",
      "west": "Wagholi nallah"
    },
    "cadastralPolygon": [
      [
        73.98,
        18.58
      ],
      [
        73.984,
        18.5805
      ],
      [
        73.9835,
        18.577
      ],
      [
        73.9795,
        18.5768
      ]
    ],
    "preprocessingMetrics": {
      "deskewAngleDegrees": -1.52,
      "contrastScore": 73.5,
      "dpiEstimated": 312,
      "binarizationMethod": "Sauvola",
      "noiseReductionApplied": true
    },
    "validationResults": [
      {
        "ruleId": "VR-01-ARITH",
        "ruleName": "Area Summation Consistency",
        "category": "ARITHMETIC",
        "passed": true,
        "severity": "INFO",
        "message": "Equal co-khatedar shares match 1.85 Hectares (18,500 sq.m)."
      },
      {
        "ruleId": "VR-04-FLAG",
        "ruleName": "Bank Encumbrance Verification",
        "category": "LEGAL",
        "passed": false,
        "severity": "WARNING",
        "message": "Active bank mortgage requires Bank NOC before transaction sanction."
      }
    ],
    "reviewHistory": [
      {
        "timestamp": "2026-07-04T12:23:00.000Z",
        "officerName": "AI OCR Pipeline v3.8",
        "role": "VERIFICATION_SPECIALIST",
        "action": "Ingested & Flagged for Bank Lien"
      }
    ]
  },
  {
    "id": "REC-MH-NAS-018",
    "documentNumber": "MH-NAS-NIP-2024-712-389",
    "documentType": "7_12_EXTRACT",
    "primaryLanguage": "marathi",
    "script": "Devanagari (मराठी)",
    "sourceFileName": "MH_Nashik_Niphad_Pimpalgaon_389.pdf",
    "sourceImageUrl": "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=1200",
    "uploadedAt": "2026-07-05T20:46:00.000Z",
    "uploadedBy": "Talathi M. V. Jadhav (Pimpalgaon Saza)",
    "status": "VERIFIED_AND_SANCTIONED",
    "overallConfidence": 96.8,
    "state": {
      "value": "Maharashtra",
      "rawText": "महाराष्ट्र शासन",
      "confidence": 99
    },
    "district": {
      "value": "Nashik",
      "rawText": "नाशिक",
      "confidence": 98
    },
    "tehsil": {
      "value": "Niphad",
      "rawText": "निफाड",
      "confidence": 98
    },
    "village": {
      "value": "Pimpalgaon Baswant",
      "rawText": "पिंपळगाव बसवंत",
      "confidence": 97
    },
    "censusVillageCode": {
      "value": "222580",
      "rawText": "५५०८१२",
      "confidence": 96
    },
    "khasraNumber": {
      "value": "389/2",
      "rawText": "गट क्र. ३८९/२",
      "confidence": 97,
      "isHandwritten": false,
      "boundingBox": {
        "x": 38,
        "y": 16,
        "width": 22,
        "height": 6
      }
    },
    "khataNumber": {
      "value": "419",
      "rawText": "खाते क्र. ४१९",
      "confidence": 98,
      "isHandwritten": false,
      "boundingBox": {
        "x": 68,
        "y": 16,
        "width": 18,
        "height": 6
      }
    },
    "primaryOwnerName": {
      "value": "Bhausaheb Damodar Shinde",
      "rawText": "भाऊसाहेब दामोदर शिंदे",
      "confidence": 98,
      "isHandwritten": false,
      "boundingBox": {
        "x": 14,
        "y": 32,
        "width": 36,
        "height": 7
      }
    },
    "parentageOrSpouse": {
      "value": "Damodar Ramchandra Shinde",
      "rawText": "दामोदर रामचंद्र शिंदे (वडील)",
      "confidence": 96
    },
    "totalOwnersCount": 1,
    "coSharers": [],
    "landClassification": {
      "value": "Grape Vineyard & Onion Farm (Bagayat)",
      "rawText": "द्राक्ष बाग व कांदा पीक बागायत शेतजमीन",
      "confidence": 95
    },
    "irrigationSource": {
      "value": "Drip Irrigation & Farm Pond (Shet-Tale)",
      "rawText": "ठिबक सिंचन व शेततळे",
      "confidence": 93
    },
    "totalAreaDeclared": {
      "value": 2.15,
      "rawText": "२ हेक्टर १० आर",
      "confidence": 97,
      "isHandwritten": false,
      "boundingBox": {
        "x": 14,
        "y": 52,
        "width": 28,
        "height": 6
      }
    },
    "declaredUnit": {
      "value": "HECTARE",
      "confidence": 99
    },
    "normalizedAreaSqMeters": 21500,
    "annualLandRevenue": {
      "value": 196.8,
      "rawText": "₹196.80",
      "confidence": 97
    },
    "encumbranceStatus": {
      "value": "CLEAR",
      "rawText": "निष्कंटक / निरंक बोजा",
      "confidence": 98
    },
    "bankLienDetails": "No active lien or mortgage on MahaBhulekh portal",
    "mutations": [],
    "boundaries": {
      "north": "Gat 388 (Grape orchard of Ramesh Kadam)",
      "south": "Pimpalgaon APMC market link road",
      "east": "Gat 389/1 (Suresh Shinde)",
      "west": "Kadwa canal branch"
    },
    "cadastralPolygon": [
      [
        73.98,
        20.17
      ],
      [
        73.9845,
        20.1705
      ],
      [
        73.984,
        20.1665
      ],
      [
        73.9795,
        20.1662
      ]
    ],
    "preprocessingMetrics": {
      "deskewAngleDegrees": -1.44,
      "contrastScore": 74,
      "dpiEstimated": 314,
      "binarizationMethod": "Otsu",
      "noiseReductionApplied": true
    },
    "validationResults": [
      {
        "ruleId": "VR-01-ARITH",
        "ruleName": "Area Summation Consistency",
        "category": "ARITHMETIC",
        "passed": true,
        "severity": "INFO",
        "message": "Sole owner 2.10 Hectares verified."
      }
    ],
    "reviewHistory": [
      {
        "timestamp": "2026-07-06T00:46:00.000Z",
        "officerName": "Tehsildar Niphad",
        "role": "REVENUE_OFFICER",
        "action": "Sanctioned & Digital Sign Attached"
      }
    ]
  },
  {
    "id": "REC-MH-SAT-019",
    "documentNumber": "MH-SAT-KAR-2024-712-245",
    "documentType": "7_12_EXTRACT",
    "primaryLanguage": "marathi",
    "script": "Devanagari (मराठी)",
    "sourceFileName": "MH_Satara_Karad_Ond_245.pdf",
    "sourceImageUrl": "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&q=80&w=1200",
    "uploadedAt": "2026-07-07T08:24:00.000Z",
    "uploadedBy": "Talathi P. A. Chavan (Ond Saza)",
    "status": "VERIFIED_AND_SANCTIONED",
    "overallConfidence": 96.1,
    "state": {
      "value": "Maharashtra",
      "rawText": "महाराष्ट्र शासन",
      "confidence": 99
    },
    "district": {
      "value": "Satara",
      "rawText": "सातारा",
      "confidence": 98
    },
    "tehsil": {
      "value": "Karad",
      "rawText": "कराड",
      "confidence": 98
    },
    "village": {
      "value": "Ond",
      "rawText": "ओंड",
      "confidence": 97
    },
    "censusVillageCode": {
      "value": "223319",
      "rawText": "५६३४१२",
      "confidence": 96
    },
    "khasraNumber": {
      "value": "245/3",
      "rawText": "गट क्र. २४५/३",
      "confidence": 96,
      "isHandwritten": false,
      "boundingBox": {
        "x": 38,
        "y": 16,
        "width": 22,
        "height": 6
      }
    },
    "khataNumber": {
      "value": "631",
      "rawText": "खाते क्र. ६३१",
      "confidence": 97,
      "isHandwritten": false,
      "boundingBox": {
        "x": 68,
        "y": 16,
        "width": 18,
        "height": 6
      }
    },
    "primaryOwnerName": {
      "value": "Anandrao Yashwantrao Mohite",
      "rawText": "आनंदराव यशवंतराव मोहिते",
      "confidence": 97,
      "isHandwritten": false,
      "boundingBox": {
        "x": 14,
        "y": 32,
        "width": 38,
        "height": 7
      }
    },
    "parentageOrSpouse": {
      "value": "Yashwantrao Mohite",
      "rawText": "यशवंतराव मोहिते (वडील)",
      "confidence": 95
    },
    "totalOwnersCount": 1,
    "coSharers": [],
    "landClassification": {
      "value": "Sugarcane Agro-Farm (Bagayat)",
      "rawText": "ऊस बागायत शेतजमीन",
      "confidence": 94
    },
    "irrigationSource": {
      "value": "Koyna River Lift Irrigation Scheme",
      "rawText": "कोयना नदी उपसा सिंचन योजना",
      "confidence": 92
    },
    "totalAreaDeclared": {
      "value": 1.45,
      "rawText": "१ हेक्टर ४५ आर",
      "confidence": 96,
      "isHandwritten": false,
      "boundingBox": {
        "x": 14,
        "y": 52,
        "width": 28,
        "height": 6
      }
    },
    "declaredUnit": {
      "value": "HECTARE",
      "confidence": 99
    },
    "normalizedAreaSqMeters": 14500,
    "annualLandRevenue": {
      "value": 204.75,
      "rawText": "₹204.75",
      "confidence": 97
    },
    "encumbranceStatus": {
      "value": "CLEAR",
      "rawText": "निष्कंटक",
      "confidence": 98
    },
    "bankLienDetails": "Clear title",
    "mutations": [],
    "boundaries": {
      "north": "Gat 244 (Sahyadri Sugar factory road)",
      "south": "Gat 246 (Vithal Mohite)",
      "east": "Koyna canal channel",
      "west": "Gat 245/2 (Prakash Patil)"
    },
    "cadastralPolygon": [
      [
        74.18,
        17.28
      ],
      [
        74.184,
        17.2805
      ],
      [
        74.1835,
        17.277
      ],
      [
        74.1795,
        17.2768
      ]
    ],
    "preprocessingMetrics": {
      "deskewAngleDegrees": -1.36,
      "contrastScore": 74.5,
      "dpiEstimated": 316,
      "binarizationMethod": "AdaptiveGaussian",
      "noiseReductionApplied": false
    },
    "validationResults": [
      {
        "ruleId": "VR-01-ARITH",
        "ruleName": "Area Summation Consistency",
        "category": "ARITHMETIC",
        "passed": true,
        "severity": "INFO",
        "message": "Sole owner 1.45 Hectares verified."
      }
    ],
    "reviewHistory": [
      {
        "timestamp": "2026-07-07T12:24:00.000Z",
        "officerName": "Tehsildar Karad",
        "role": "REVENUE_OFFICER",
        "action": "Sanctioned & Digital Sign Attached"
      }
    ]
  },
  {
    "id": "REC-MH-NAG-020",
    "documentNumber": "MH-NAG-HIN-2024-712-118",
    "documentType": "7_12_EXTRACT",
    "primaryLanguage": "marathi",
    "script": "Devanagari (मराठी)",
    "sourceFileName": "MH_Nagpur_Hingna_Wanadongri_118.pdf",
    "sourceImageUrl": "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=1200",
    "uploadedAt": "2026-07-08T20:47:00.000Z",
    "uploadedBy": "Talathi D. B. Raut (Wanadongri)",
    "status": "VERIFIED_AND_SANCTIONED",
    "overallConfidence": 95.5,
    "state": {
      "value": "Maharashtra",
      "rawText": "महाराष्ट्र शासन",
      "confidence": 99
    },
    "district": {
      "value": "Nagpur",
      "rawText": "नागपूर",
      "confidence": 98
    },
    "tehsil": {
      "value": "Hingna",
      "rawText": "हिंगणा",
      "confidence": 98
    },
    "village": {
      "value": "Wanadongri",
      "rawText": "वाणाडोंगरी",
      "confidence": 97
    },
    "censusVillageCode": {
      "value": "224058",
      "rawText": "५३५२०१",
      "confidence": 96
    },
    "khasraNumber": {
      "value": "118/4",
      "rawText": "सर्व्हे क्र. ११८/४",
      "confidence": 96,
      "isHandwritten": false,
      "boundingBox": {
        "x": 38,
        "y": 16,
        "width": 22,
        "height": 6
      }
    },
    "khataNumber": {
      "value": "308",
      "rawText": "खाते क्र. ३०५",
      "confidence": 97,
      "isHandwritten": false,
      "boundingBox": {
        "x": 68,
        "y": 16,
        "width": 18,
        "height": 6
      }
    },
    "primaryOwnerName": {
      "value": "Sanjay Manohar Deshmukh",
      "rawText": "संजय मनोहर देशमुख",
      "confidence": 97,
      "isHandwritten": false,
      "boundingBox": {
        "x": 14,
        "y": 32,
        "width": 36,
        "height": 7
      }
    },
    "parentageOrSpouse": {
      "value": "Manohar Deshmukh",
      "rawText": "मनोहर देशमुख (वडील)",
      "confidence": 95
    },
    "totalOwnersCount": 1,
    "coSharers": [],
    "landClassification": {
      "value": "Orange Orchard & Cotton Field (Jirayat/Bagayat)",
      "rawText": "संत्रा बाग व कापूस शेती",
      "confidence": 94
    },
    "irrigationSource": {
      "value": "Vena River Lift & Borewell",
      "rawText": "वेणा नदी उपसा व कूपनलिका",
      "confidence": 92
    },
    "totalAreaDeclared": {
      "value": 1.78,
      "rawText": "१ हेक्टर ७५ आर",
      "confidence": 96,
      "isHandwritten": false,
      "boundingBox": {
        "x": 14,
        "y": 52,
        "width": 28,
        "height": 6
      }
    },
    "declaredUnit": {
      "value": "HECTARE",
      "confidence": 99
    },
    "normalizedAreaSqMeters": 17800,
    "annualLandRevenue": {
      "value": 212.7,
      "rawText": "₹212.70",
      "confidence": 97
    },
    "encumbranceStatus": {
      "value": "CLEAR",
      "rawText": "साफ",
      "confidence": 98
    },
    "bankLienDetails": "No lien registered",
    "mutations": [],
    "boundaries": {
      "north": "Survey 117 (MIDC Hingna buffer zone)",
      "south": "Wanadongri village road",
      "east": "Survey 118/3 (Narendra Wankhede)",
      "west": "Nallah"
    },
    "cadastralPolygon": [
      [
        78.98,
        21.08
      ],
      [
        78.984,
        21.0804
      ],
      [
        78.9835,
        21.077
      ],
      [
        78.9795,
        21.0768
      ]
    ],
    "preprocessingMetrics": {
      "deskewAngleDegrees": -1.28,
      "contrastScore": 74.9,
      "dpiEstimated": 318,
      "binarizationMethod": "OtsuGlobal",
      "noiseReductionApplied": true
    },
    "validationResults": [
      {
        "ruleId": "VR-01-ARITH",
        "ruleName": "Area Summation Consistency",
        "category": "ARITHMETIC",
        "passed": true,
        "severity": "INFO",
        "message": "Sole owner 1.75 Hectares verified."
      }
    ],
    "reviewHistory": [
      {
        "timestamp": "2026-07-09T00:47:00.000Z",
        "officerName": "Tehsildar Hingna",
        "role": "REVENUE_OFFICER",
        "action": "Sanctioned & Digital Sign Attached"
      }
    ]
  },
  {
    "id": "REC-GJ-SUR-021",
    "documentNumber": "GJ-SUR-BAR-2024-712-412",
    "documentType": "7_12_EXTRACT",
    "primaryLanguage": "gujarati",
    "script": "Gujarati (ગુજરાતી)",
    "sourceFileName": "GJ_Surat_Bardoli_Mota_412.pdf",
    "sourceImageUrl": "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&q=80&w=1200",
    "uploadedAt": "2026-07-10T08:25:00.000Z",
    "uploadedBy": "Talati-cum-Mantri H. R. Patel (Mota Gram Panchayat)",
    "status": "VERIFIED_AND_SANCTIONED",
    "overallConfidence": 96.9,
    "state": {
      "value": "Gujarat",
      "rawText": "ગુજરાત સરકાર - મહેસૂલ વિભાગ",
      "confidence": 99
    },
    "district": {
      "value": "Surat",
      "rawText": "સુરત",
      "confidence": 98
    },
    "tehsil": {
      "value": "Bardoli",
      "rawText": "બારડોલી",
      "confidence": 98
    },
    "village": {
      "value": "Mota",
      "rawText": "મોટા",
      "confidence": 97
    },
    "censusVillageCode": {
      "value": "224797",
      "rawText": "૫૨૪૧૦૨",
      "confidence": 96
    },
    "khasraNumber": {
      "value": "412/1",
      "rawText": "બ્લોક / સર્વે નંબર ૪૧૨/૧",
      "confidence": 97,
      "isHandwritten": false,
      "boundingBox": {
        "x": 38,
        "y": 16,
        "width": 22,
        "height": 6
      }
    },
    "khataNumber": {
      "value": "782",
      "rawText": "ખાતા નંબર ૭૮૨",
      "confidence": 98,
      "isHandwritten": false,
      "boundingBox": {
        "x": 68,
        "y": 16,
        "width": 18,
        "height": 6
      }
    },
    "primaryOwnerName": {
      "value": "Kantilal Somabhai Patel",
      "rawText": "કાંતિલાલ સોમાભાઈ પટેલ",
      "confidence": 98,
      "isHandwritten": false,
      "boundingBox": {
        "x": 14,
        "y": 32,
        "width": 36,
        "height": 7
      }
    },
    "parentageOrSpouse": {
      "value": "Somabhai Patel",
      "rawText": "સોમાભાઈ પટેલ (પિતા)",
      "confidence": 96
    },
    "totalOwnersCount": 2,
    "coSharers": [
      {
        "id": "CS-GU-011",
        "name": "Kantilal Somabhai Patel",
        "relation": "Primary Khatedar",
        "shareFraction": "1/2",
        "shareAreaSqMeters": 7750,
        "panOrAadhaarRef": "XXXX-XXXX-4487"
      },
      {
        "id": "CS-GU-012",
        "name": "Bharatbhai Somabhai Patel",
        "relation": "Brother / Co-Khatedar",
        "shareFraction": "1/2",
        "shareAreaSqMeters": 7750,
        "panOrAadhaarRef": "XXXX-XXXX-4804"
      }
    ],
    "landClassification": {
      "value": "Sugarcane & Banana Plantation (Jirayat/Piyat)",
      "rawText": "શેરડી અને કેળ પિયત જમીન",
      "confidence": 95
    },
    "irrigationSource": {
      "value": "Ukai Dam Left Bank Canal & Deep Tubewell",
      "rawText": "ઉકાઈ કેનાલ અને બોરવેલ",
      "confidence": 93
    },
    "totalAreaDeclared": {
      "value": 1.55,
      "rawText": "૧-૫૫-૦૦ હેક્ટર-આરે-ચો.મી.",
      "confidence": 97,
      "isHandwritten": false,
      "boundingBox": {
        "x": 14,
        "y": 52,
        "width": 30,
        "height": 6
      }
    },
    "declaredUnit": {
      "value": "HECTARE",
      "confidence": 99
    },
    "normalizedAreaSqMeters": 15500,
    "annualLandRevenue": {
      "value": 225.2,
      "rawText": "₹225.20",
      "confidence": 97
    },
    "encumbranceStatus": {
      "value": "CLEAR",
      "rawText": "બોજારહિત / સાફ",
      "confidence": 98
    },
    "bankLienDetails": "No active encumbrance on AnyROR Gujarat registry",
    "mutations": [
      {
        "mutationNumber": "MR-2024-5222",
        "dateOfOrder": "2024-07-01",
        "sanctioningOfficer": "Mamlatdar Bardoli",
        "mutationType": "INHERITANCE",
        "transferor": "Late Somabhai Patel",
        "transferee": "Kantilal & Bharatbhai Patel",
        "status": "SANCTIONED",
        "remarks": "Varasai entry confirmed under Gujarat Land Revenue Code"
      }
    ],
    "boundaries": {
      "north": "Survey 411 (Bardoli Sugar Factory canal)",
      "south": "Village approach tarmac road",
      "east": "Survey 412/2 (Rameshbhai Patel)",
      "west": "Drainage channel"
    },
    "cadastralPolygon": [
      [
        73.12,
        21.11
      ],
      [
        73.124,
        21.1105
      ],
      [
        73.1235,
        21.107
      ],
      [
        73.1195,
        21.1068
      ]
    ],
    "preprocessingMetrics": {
      "deskewAngleDegrees": -1.2,
      "contrastScore": 75.4,
      "dpiEstimated": 320,
      "binarizationMethod": "Sauvola",
      "noiseReductionApplied": true
    },
    "validationResults": [
      {
        "ruleId": "VR-01-ARITH",
        "ruleName": "Area Summation Consistency",
        "category": "ARITHMETIC",
        "passed": true,
        "severity": "INFO",
        "message": "Equal co-khatedar shares match 1.55 Hectares (15,500 sq.m)."
      }
    ],
    "reviewHistory": [
      {
        "timestamp": "2026-07-10T12:25:00.000Z",
        "officerName": "Mamlatdar Bardoli",
        "role": "REVENUE_OFFICER",
        "action": "Sanctioned & Digital Sign Attached"
      }
    ]
  },
  {
    "id": "REC-GJ-MEH-022",
    "documentNumber": "GJ-MEH-KAD-2024-712-156",
    "documentType": "7_12_EXTRACT",
    "primaryLanguage": "gujarati",
    "script": "Gujarati (ગુજરાતી)",
    "sourceFileName": "GJ_Mehsana_Kadi_Nandasan_156.pdf",
    "sourceImageUrl": "https://images.unsplash.com/photo-1516214104703-d870798883c5?auto=format&fit=crop&q=80&w=1200",
    "uploadedAt": "2026-07-11T20:48:00.000Z",
    "uploadedBy": "Talati J. K. Vaghela (Nandasan)",
    "status": "VERIFIED_AND_SANCTIONED",
    "overallConfidence": 96.2,
    "state": {
      "value": "Gujarat",
      "rawText": "ગુજરાત સરકાર",
      "confidence": 99
    },
    "district": {
      "value": "Mehsana",
      "rawText": "મહેસાણા",
      "confidence": 98
    },
    "tehsil": {
      "value": "Kadi",
      "rawText": "કડી",
      "confidence": 98
    },
    "village": {
      "value": "Nandasan",
      "rawText": "નંદાસણ",
      "confidence": 97
    },
    "censusVillageCode": {
      "value": "225536",
      "rawText": "૫૦૮૨૩૦",
      "confidence": 96
    },
    "khasraNumber": {
      "value": "156/2",
      "rawText": "સર્વે નંબર ૧૫૬/૨",
      "confidence": 96,
      "isHandwritten": false,
      "boundingBox": {
        "x": 38,
        "y": 16,
        "width": 22,
        "height": 6
      }
    },
    "khataNumber": {
      "value": "342",
      "rawText": "ખાતા નંબર ૩૪૦",
      "confidence": 97,
      "isHandwritten": false,
      "boundingBox": {
        "x": 68,
        "y": 16,
        "width": 18,
        "height": 6
      }
    },
    "primaryOwnerName": {
      "value": "Pravinbhai Jethalal Prajapati",
      "rawText": "પ્રવીણભાઈ જેઠાલાલ પ્રજાપતિ",
      "confidence": 97,
      "isHandwritten": false,
      "boundingBox": {
        "x": 14,
        "y": 32,
        "width": 38,
        "height": 7
      }
    },
    "parentageOrSpouse": {
      "value": "Jethalal Prajapati",
      "rawText": "જેઠાલાલ પ્રજાપતિ (પિતા)",
      "confidence": 95
    },
    "totalOwnersCount": 1,
    "coSharers": [],
    "landClassification": {
      "value": "Castor & Mustard Cultivation (Piyat)",
      "rawText": "દિવેલા અને રાયડો પિયત જમીન",
      "confidence": 94
    },
    "irrigationSource": {
      "value": "Narmada Canal Branch & Solar Tubewell",
      "rawText": "નર્મદા કેનાલ અને બોરવેલ",
      "confidence": 92
    },
    "totalAreaDeclared": {
      "value": 1.84,
      "rawText": "૧-૮૦-૦૦ હેક્ટર",
      "confidence": 96,
      "isHandwritten": false,
      "boundingBox": {
        "x": 14,
        "y": 52,
        "width": 28,
        "height": 6
      }
    },
    "declaredUnit": {
      "value": "HECTARE",
      "confidence": 99
    },
    "normalizedAreaSqMeters": 18400,
    "annualLandRevenue": {
      "value": 233.15,
      "rawText": "₹233.15",
      "confidence": 97
    },
    "encumbranceStatus": {
      "value": "CLEAR",
      "rawText": "ચોખ્ખી જમીન",
      "confidence": 98
    },
    "bankLienDetails": "Clear title",
    "mutations": [],
    "boundaries": {
      "north": "Survey 155 (Nandasan-Kadi link road)",
      "south": "Survey 157 (Ambalal Patel)",
      "east": "Narmada sub-canal channel",
      "west": "Survey 156/1 (Manilal Prajapati)"
    },
    "cadastralPolygon": [
      [
        72.45,
        23.27
      ],
      [
        72.454,
        23.2705
      ],
      [
        72.4535,
        23.267
      ],
      [
        72.4495,
        23.2668
      ]
    ],
    "preprocessingMetrics": {
      "deskewAngleDegrees": -1.12,
      "contrastScore": 75.9,
      "dpiEstimated": 322,
      "binarizationMethod": "Otsu",
      "noiseReductionApplied": false
    },
    "validationResults": [
      {
        "ruleId": "VR-01-ARITH",
        "ruleName": "Area Summation Consistency",
        "category": "ARITHMETIC",
        "passed": true,
        "severity": "INFO",
        "message": "Sole owner 1.80 Hectares verified on AnyROR."
      }
    ],
    "reviewHistory": [
      {
        "timestamp": "2026-07-12T00:48:00.000Z",
        "officerName": "Mamlatdar Kadi",
        "role": "REVENUE_OFFICER",
        "action": "Sanctioned & Digital Sign Attached"
      }
    ]
  },
  {
    "id": "REC-GJ-RAJ-023",
    "documentNumber": "GJ-RAJ-GON-2024-712-289",
    "documentType": "7_12_EXTRACT",
    "primaryLanguage": "gujarati",
    "script": "Gujarati (ગુજરાતી)",
    "sourceFileName": "GJ_Rajkot_Gondal_Bhojpara_289.pdf",
    "sourceImageUrl": "https://images.unsplash.com/photo-1475921075678-b0218225f8f8?auto=format&fit=crop&q=80&w=1200",
    "uploadedAt": "2026-07-13T08:26:00.000Z",
    "uploadedBy": "Talati V. M. Jadeja (Bhojpara)",
    "status": "VERIFIED_AND_SANCTIONED",
    "overallConfidence": 95.8,
    "state": {
      "value": "Gujarat",
      "rawText": "ગુજરાત સરકાર",
      "confidence": 99
    },
    "district": {
      "value": "Rajkot",
      "rawText": "રાજકોટ",
      "confidence": 98
    },
    "tehsil": {
      "value": "Gondal",
      "rawText": "ગોંડલ",
      "confidence": 98
    },
    "village": {
      "value": "Bhojpara",
      "rawText": "ભોજપરા",
      "confidence": 97
    },
    "censusVillageCode": {
      "value": "226275",
      "rawText": "૫૧૩૯૦૪",
      "confidence": 96
    },
    "khasraNumber": {
      "value": "289/3",
      "rawText": "સર્વે નંબર ૨૮૯/૩",
      "confidence": 96,
      "isHandwritten": false,
      "boundingBox": {
        "x": 38,
        "y": 16,
        "width": 22,
        "height": 6
      }
    },
    "khataNumber": {
      "value": "512",
      "rawText": "ખાતા નંબર ૫૧૨",
      "confidence": 97,
      "isHandwritten": false,
      "boundingBox": {
        "x": 68,
        "y": 16,
        "width": 18,
        "height": 6
      }
    },
    "primaryOwnerName": {
      "value": "Hasmukhbhai Mohanlal Jadeja",
      "rawText": "હસમુખભાઈ મોહનલાલ જાડેજા",
      "confidence": 97,
      "isHandwritten": false,
      "boundingBox": {
        "x": 14,
        "y": 32,
        "width": 38,
        "height": 7
      }
    },
    "parentageOrSpouse": {
      "value": "Mohanlal Jadeja",
      "rawText": "મોહનલાલ જાડેજા (પિતા)",
      "confidence": 95
    },
    "totalOwnersCount": 1,
    "coSharers": [],
    "landClassification": {
      "value": "Groundnut & Cotton Agricultural (Piyat)",
      "rawText": "મગફળી અને કપાસ પિયત ખેતી",
      "confidence": 94
    },
    "irrigationSource": {
      "value": "Bhadar River Irrigation & Check Dam",
      "rawText": "ભાદર નદી ચેકડેમ અને બોર",
      "confidence": 92
    },
    "totalAreaDeclared": {
      "value": 2.2,
      "rawText": "૨-૨૦-૦૦ હેક્ટર",
      "confidence": 96,
      "isHandwritten": false,
      "boundingBox": {
        "x": 14,
        "y": 52,
        "width": 28,
        "height": 6
      }
    },
    "declaredUnit": {
      "value": "HECTARE",
      "confidence": 99
    },
    "normalizedAreaSqMeters": 22000,
    "annualLandRevenue": {
      "value": 241.1,
      "rawText": "₹241.10",
      "confidence": 97
    },
    "encumbranceStatus": {
      "value": "CLEAR",
      "rawText": "સાફ",
      "confidence": 98
    },
    "bankLienDetails": "No encumbrance registered",
    "mutations": [],
    "boundaries": {
      "north": "Survey 288 (Bhojpara village approach road)",
      "south": "Bhadar river tributary check dam",
      "east": "Survey 289/2 (Gordhanbhai Jadeja)",
      "west": "Cart track"
    },
    "cadastralPolygon": [
      [
        70.8,
        21.96
      ],
      [
        70.8045,
        21.9605
      ],
      [
        70.804,
        21.9565
      ],
      [
        70.7995,
        21.9562
      ]
    ],
    "preprocessingMetrics": {
      "deskewAngleDegrees": -1.04,
      "contrastScore": 76.3,
      "dpiEstimated": 324,
      "binarizationMethod": "AdaptiveGaussian",
      "noiseReductionApplied": true
    },
    "validationResults": [
      {
        "ruleId": "VR-01-ARITH",
        "ruleName": "Area Summation Consistency",
        "category": "ARITHMETIC",
        "passed": true,
        "severity": "INFO",
        "message": "Sole owner 2.20 Hectares verified on AnyROR."
      }
    ],
    "reviewHistory": [
      {
        "timestamp": "2026-07-13T12:26:00.000Z",
        "officerName": "Mamlatdar Gondal",
        "role": "REVENUE_OFFICER",
        "action": "Sanctioned & Digital Sign Attached"
      }
    ]
  },
  {
    "id": "REC-RJ-JAI-024",
    "documentNumber": "RJ-JAI-SAN-2024-JAM-504",
    "documentType": "JAMABANDI",
    "primaryLanguage": "hindi",
    "script": "Devanagari (देवनागरी)",
    "sourceFileName": "RJ_Jaipur_Sanganer_Muhana_504.pdf",
    "sourceImageUrl": "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=1200",
    "uploadedAt": "2026-07-14T20:49:00.000Z",
    "uploadedBy": "Patwari B. L. Sharma (Muhana Circle)",
    "status": "VERIFIED_AND_SANCTIONED",
    "overallConfidence": 96.5,
    "state": {
      "value": "Rajasthan",
      "rawText": "राजस्थान सरकार - राजस्व मंडल",
      "confidence": 99
    },
    "district": {
      "value": "Jaipur",
      "rawText": "जयपुर",
      "confidence": 98
    },
    "tehsil": {
      "value": "Sanganer",
      "rawText": "सांगानेर",
      "confidence": 98
    },
    "village": {
      "value": "Muhana",
      "rawText": "मुहाना",
      "confidence": 97
    },
    "censusVillageCode": {
      "value": "227014",
      "rawText": "०८०१०२",
      "confidence": 96
    },
    "khasraNumber": {
      "value": "504/1",
      "rawText": "खसरा संख्या ५०४/१",
      "confidence": 97,
      "isHandwritten": false,
      "boundingBox": {
        "x": 38,
        "y": 16,
        "width": 22,
        "height": 6
      }
    },
    "khataNumber": {
      "value": "219",
      "rawText": "खाता संख्या २१९",
      "confidence": 98,
      "isHandwritten": false,
      "boundingBox": {
        "x": 68,
        "y": 16,
        "width": 18,
        "height": 6
      }
    },
    "primaryOwnerName": {
      "value": "Ramji Lal Meena",
      "rawText": "रामजी लाल मीणा",
      "confidence": 98,
      "isHandwritten": false,
      "boundingBox": {
        "x": 14,
        "y": 32,
        "width": 34,
        "height": 7
      }
    },
    "parentageOrSpouse": {
      "value": "Moolchand Meena",
      "rawText": "पुत्र मूलचंद मीणा (पिता)",
      "confidence": 96
    },
    "totalOwnersCount": 1,
    "coSharers": [],
    "landClassification": {
      "value": "Chahi Barani Agricultural (Horticulture Belt)",
      "rawText": "चाही बारानी बागवानी कृषि भूमि",
      "confidence": 95
    },
    "irrigationSource": {
      "value": "Deep Tubewell & Drip Micro-irrigation",
      "rawText": "नलकूप व बूंद-बूंद सिंचाई",
      "confidence": 93
    },
    "totalAreaDeclared": {
      "value": 1.28,
      "rawText": "१.२५०० हेक्टेयर (४ बीघा १९ बिस्वा)",
      "confidence": 97,
      "isHandwritten": false,
      "boundingBox": {
        "x": 14,
        "y": 52,
        "width": 30,
        "height": 6
      }
    },
    "declaredUnit": {
      "value": "HECTARE",
      "confidence": 99
    },
    "normalizedAreaSqMeters": 12800,
    "annualLandRevenue": {
      "value": 249.05,
      "rawText": "₹249.05",
      "confidence": 97
    },
    "encumbranceStatus": {
      "value": "CLEAR",
      "rawText": "भारमुक्त / बेबाक",
      "confidence": 98
    },
    "bankLienDetails": "No active encumbrance on Apna Khata Rajasthan portal",
    "mutations": [],
    "boundaries": {
      "north": "Khasra 503 (Muhana Mandi link road)",
      "south": "Khasra 505 (Kalyan Sahay Meena)",
      "east": "Chak road",
      "west": "Khasra 504/2 (Bhori Lal Meena)"
    },
    "cadastralPolygon": [
      [
        75.73,
        26.78
      ],
      [
        75.734,
        26.7805
      ],
      [
        75.7335,
        26.777
      ],
      [
        75.7295,
        26.7768
      ]
    ],
    "preprocessingMetrics": {
      "deskewAngleDegrees": -0.96,
      "contrastScore": 76.8,
      "dpiEstimated": 326,
      "binarizationMethod": "OtsuGlobal",
      "noiseReductionApplied": true
    },
    "validationResults": [
      {
        "ruleId": "VR-01-ARITH",
        "ruleName": "Area Summation Consistency",
        "category": "ARITHMETIC",
        "passed": true,
        "severity": "INFO",
        "message": "Sole owner 1.2500 Hectares verified on Apna Khata."
      }
    ],
    "reviewHistory": [
      {
        "timestamp": "2026-07-15T00:49:00.000Z",
        "officerName": "Tehsildar Sanganer",
        "role": "REVENUE_OFFICER",
        "action": "Sanctioned & Digital Sign Attached"
      }
    ]
  },
  {
    "id": "REC-RJ-JOD-025",
    "documentNumber": "RJ-JOD-OSI-2024-JAM-721",
    "documentType": "JAMABANDI",
    "primaryLanguage": "hindi",
    "script": "Devanagari (देवनागरी)",
    "sourceFileName": "RJ_Jodhpur_Osian_Tiwri_721.pdf",
    "sourceImageUrl": "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=1200",
    "uploadedAt": "2026-07-16T08:27:00.000Z",
    "uploadedBy": "Patwari H. S. Bhati (Tiwri)",
    "status": "VERIFIED_AND_SANCTIONED",
    "overallConfidence": 95.7,
    "state": {
      "value": "Rajasthan",
      "rawText": "राजस्थान सरकार",
      "confidence": 99
    },
    "district": {
      "value": "Jodhpur",
      "rawText": "जोधपुर",
      "confidence": 98
    },
    "tehsil": {
      "value": "Osian",
      "rawText": "ओसियां",
      "confidence": 98
    },
    "village": {
      "value": "Tiwri",
      "rawText": "तिंवरी",
      "confidence": 97
    },
    "censusVillageCode": {
      "value": "227753",
      "rawText": "०८४२१०",
      "confidence": 96
    },
    "khasraNumber": {
      "value": "721/2",
      "rawText": "खसरा संख्या ७२१/२",
      "confidence": 96,
      "isHandwritten": false,
      "boundingBox": {
        "x": 38,
        "y": 16,
        "width": 22,
        "height": 6
      }
    },
    "khataNumber": {
      "value": "184",
      "rawText": "खाता संख्या १८४",
      "confidence": 97,
      "isHandwritten": false,
      "boundingBox": {
        "x": 68,
        "y": 16,
        "width": 18,
        "height": 6
      }
    },
    "primaryOwnerName": {
      "value": "Bhawani Singh Rathore",
      "rawText": "भवानी सिंह राठौड़",
      "confidence": 97,
      "isHandwritten": false,
      "boundingBox": {
        "x": 14,
        "y": 32,
        "width": 36,
        "height": 7
      }
    },
    "parentageOrSpouse": {
      "value": "Sumer Singh Rathore",
      "rawText": "पुत्र सुमेर सिंह राठौड़",
      "confidence": 95
    },
    "totalOwnersCount": 1,
    "coSharers": [],
    "landClassification": {
      "value": "Barani Cumin & Isabgol Cultivation",
      "rawText": "बारानी जीरा व इसबगोल कृषि भूमि",
      "confidence": 94
    },
    "irrigationSource": {
      "value": "Rainfed & Solar Tubewell",
      "rawText": "वर्षा आधारित व सौर नलकूप",
      "confidence": 91
    },
    "totalAreaDeclared": {
      "value": 3.65,
      "rawText": "३.५००० हेक्टेयर (१४ बीघा)",
      "confidence": 96,
      "isHandwritten": false,
      "boundingBox": {
        "x": 14,
        "y": 52,
        "width": 28,
        "height": 6
      }
    },
    "declaredUnit": {
      "value": "HECTARE",
      "confidence": 99
    },
    "normalizedAreaSqMeters": 36500,
    "annualLandRevenue": {
      "value": 257,
      "rawText": "₹257.00",
      "confidence": 97
    },
    "encumbranceStatus": {
      "value": "CLEAR",
      "rawText": "भारमुक्त",
      "confidence": 98
    },
    "bankLienDetails": "No lien registered",
    "mutations": [],
    "boundaries": {
      "north": "Khasra 720 (Gauchar land)",
      "south": "Tiwri to Osian state highway link",
      "east": "Khasra 721/1 (Shaitan Singh)",
      "west": "Dune boundary"
    },
    "cadastralPolygon": [
      [
        72.98,
        26.54
      ],
      [
        72.985,
        26.5405
      ],
      [
        72.9845,
        26.536
      ],
      [
        72.9795,
        26.5358
      ]
    ],
    "preprocessingMetrics": {
      "deskewAngleDegrees": -0.88,
      "contrastScore": 77.3,
      "dpiEstimated": 328,
      "binarizationMethod": "Sauvola",
      "noiseReductionApplied": false
    },
    "validationResults": [
      {
        "ruleId": "VR-01-ARITH",
        "ruleName": "Area Summation Consistency",
        "category": "ARITHMETIC",
        "passed": true,
        "severity": "INFO",
        "message": "Sole owner 3.5000 Hectares verified."
      }
    ],
    "reviewHistory": [
      {
        "timestamp": "2026-07-16T12:27:00.000Z",
        "officerName": "Tehsildar Osian",
        "role": "REVENUE_OFFICER",
        "action": "Sanctioned & Digital Sign Attached"
      }
    ]
  },
  {
    "id": "REC-RJ-KOT-026",
    "documentNumber": "RJ-KOT-SAN-2024-JAM-338",
    "documentType": "JAMABANDI",
    "primaryLanguage": "hindi",
    "script": "Devanagari (देवनागरी)",
    "sourceFileName": "RJ_Kota_Sangod_Kanwas_338.pdf",
    "sourceImageUrl": "https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&q=80&w=1200",
    "uploadedAt": "2026-07-17T20:50:00.000Z",
    "uploadedBy": "Patwari M. L. Dhakar (Kanwas)",
    "status": "VERIFIED_AND_SANCTIONED",
    "overallConfidence": 96.1,
    "state": {
      "value": "Rajasthan",
      "rawText": "राजस्थान सरकार",
      "confidence": 99
    },
    "district": {
      "value": "Kota",
      "rawText": "कोटा",
      "confidence": 98
    },
    "tehsil": {
      "value": "Sangod",
      "rawText": "सांगोद",
      "confidence": 98
    },
    "village": {
      "value": "Kanwas",
      "rawText": "कनवास",
      "confidence": 97
    },
    "censusVillageCode": {
      "value": "228492",
      "rawText": "०९१४५०",
      "confidence": 96
    },
    "khasraNumber": {
      "value": "338/1",
      "rawText": "खसरा संख्या ३३८/१",
      "confidence": 96,
      "isHandwritten": false,
      "boundingBox": {
        "x": 38,
        "y": 16,
        "width": 22,
        "height": 6
      }
    },
    "khataNumber": {
      "value": "375",
      "rawText": "खाता संख्या ३७५",
      "confidence": 97,
      "isHandwritten": false,
      "boundingBox": {
        "x": 68,
        "y": 16,
        "width": 18,
        "height": 6
      }
    },
    "primaryOwnerName": {
      "value": "Om Prakash Dhakar",
      "rawText": "ओम प्रकाश धाकड़",
      "confidence": 97,
      "isHandwritten": false,
      "boundingBox": {
        "x": 14,
        "y": 32,
        "width": 34,
        "height": 7
      }
    },
    "parentageOrSpouse": {
      "value": "Rameshwar Dhakar",
      "rawText": "पुत्र रामेश्वर धाकड़",
      "confidence": 95
    },
    "totalOwnersCount": 1,
    "coSharers": [],
    "landClassification": {
      "value": "Soybean & Mustard Agriculture (Chahi)",
      "rawText": "सोयाबीन व सरसों चाही कृषि भूमि",
      "confidence": 94
    },
    "irrigationSource": {
      "value": "Chambal Left Main Canal & Well",
      "rawText": "चंबल नहर व कुआं",
      "confidence": 92
    },
    "totalAreaDeclared": {
      "value": 2.08,
      "rawText": "२.०००० हेक्टेयर (८ बीघा)",
      "confidence": 96,
      "isHandwritten": false,
      "boundingBox": {
        "x": 14,
        "y": 52,
        "width": 26,
        "height": 6
      }
    },
    "declaredUnit": {
      "value": "HECTARE",
      "confidence": 99
    },
    "normalizedAreaSqMeters": 20800,
    "annualLandRevenue": {
      "value": 264.95,
      "rawText": "₹264.95",
      "confidence": 97
    },
    "encumbranceStatus": {
      "value": "CLEAR",
      "rawText": "साफ",
      "confidence": 98
    },
    "bankLienDetails": "Clear title",
    "mutations": [],
    "boundaries": {
      "north": "Khasra 337 (Canal distributary)",
      "south": "Kanwas village road",
      "east": "Khasra 338/2 (Brijmohan Dhakar)",
      "west": "Drainage channel"
    },
    "cadastralPolygon": [
      [
        76.15,
        24.89
      ],
      [
        76.154,
        24.8904
      ],
      [
        76.1535,
        24.887
      ],
      [
        76.1495,
        24.8868
      ]
    ],
    "preprocessingMetrics": {
      "deskewAngleDegrees": -0.8,
      "contrastScore": 77.8,
      "dpiEstimated": 330,
      "binarizationMethod": "Otsu",
      "noiseReductionApplied": true
    },
    "validationResults": [
      {
        "ruleId": "VR-01-ARITH",
        "ruleName": "Area Summation Consistency",
        "category": "ARITHMETIC",
        "passed": true,
        "severity": "INFO",
        "message": "Sole owner 2.0000 Hectares verified."
      }
    ],
    "reviewHistory": [
      {
        "timestamp": "2026-07-18T00:50:00.000Z",
        "officerName": "Tehsildar Sangod",
        "role": "REVENUE_OFFICER",
        "action": "Sanctioned & Digital Sign Attached"
      }
    ]
  },
  {
    "id": "REC-GA-BAR-027",
    "documentNumber": "GA-BAR-ASS-2024-F14-104",
    "documentType": "7_12_EXTRACT",
    "primaryLanguage": "english",
    "script": "Latin / Devanagari (Goan Revenue)",
    "sourceFileName": "GA_NorthGoa_Bardez_Assagao_104.pdf",
    "sourceImageUrl": "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&q=80&w=1200",
    "uploadedAt": "2026-07-19T08:28:00.000Z",
    "uploadedBy": "Mamlatdar Bardez Taluka (Mapusa)",
    "status": "VERIFIED_AND_SANCTIONED",
    "overallConfidence": 97.4,
    "state": {
      "value": "Goa",
      "rawText": "Government of Goa - Directorate of Settlement & Land Records",
      "confidence": 99
    },
    "district": {
      "value": "North Goa",
      "rawText": "North Goa",
      "confidence": 98
    },
    "tehsil": {
      "value": "Bardez",
      "rawText": "Bardez",
      "confidence": 98
    },
    "village": {
      "value": "Assagao",
      "rawText": "Assagao",
      "confidence": 97
    },
    "censusVillageCode": {
      "value": "229231",
      "rawText": "626802",
      "confidence": 96
    },
    "khasraNumber": {
      "value": "104/5",
      "rawText": "Survey No. 104 Sub-Div 5",
      "confidence": 97,
      "isHandwritten": false,
      "boundingBox": {
        "x": 38,
        "y": 16,
        "width": 22,
        "height": 6
      }
    },
    "khataNumber": {
      "value": "42",
      "rawText": "Chitta / Matrix No. 42",
      "confidence": 98,
      "isHandwritten": false,
      "boundingBox": {
        "x": 68,
        "y": 16,
        "width": 18,
        "height": 6
      }
    },
    "primaryOwnerName": {
      "value": "Inacio Francisco Fernandes",
      "rawText": "Inacio Francisco Fernandes",
      "confidence": 98,
      "isHandwritten": false,
      "boundingBox": {
        "x": 14,
        "y": 32,
        "width": 36,
        "height": 7
      }
    },
    "parentageOrSpouse": {
      "value": "Late Antonio Fernandes",
      "rawText": "s/o Late Antonio Fernandes",
      "confidence": 96
    },
    "totalOwnersCount": 1,
    "coSharers": [],
    "landClassification": {
      "value": "Coconut & Cashew Grove (Bagayat / Morod)",
      "rawText": "Bagayat / Morod (Orchard Class I)",
      "confidence": 95
    },
    "irrigationSource": {
      "value": "Natural Spring & Open Masonry Well",
      "rawText": "Natural Spring Stream & Well",
      "confidence": 93
    },
    "totalAreaDeclared": {
      "value": 0.425,
      "rawText": "4,250 Sq. Meters (0.4250 Ha.)",
      "confidence": 97,
      "isHandwritten": false,
      "boundingBox": {
        "x": 14,
        "y": 52,
        "width": 28,
        "height": 6
      }
    },
    "declaredUnit": {
      "value": "SQ_METERS",
      "confidence": 99
    },
    "normalizedAreaSqMeters": 4250,
    "annualLandRevenue": {
      "value": 272.9,
      "rawText": "₹272.90",
      "confidence": 97
    },
    "encumbranceStatus": {
      "value": "CLEAR",
      "rawText": "NIL Encumbrance",
      "confidence": 98
    },
    "bankLienDetails": "Clear title verified on Goa DSLR Form I & XIV database",
    "mutations": [],
    "boundaries": {
      "north": "Survey 103 (Village traditional pathway)",
      "south": "Assagao-Badem village road",
      "east": "Survey 104/4 (Maria D'Souza)",
      "west": "Survey 104/6 (Jose Pereira)"
    },
    "cadastralPolygon": [
      [
        73.78,
        15.59
      ],
      [
        73.783,
        15.5903
      ],
      [
        73.7828,
        15.5875
      ],
      [
        73.7798,
        15.5872
      ]
    ],
    "preprocessingMetrics": {
      "deskewAngleDegrees": -0.72,
      "contrastScore": 78.2,
      "dpiEstimated": 332,
      "binarizationMethod": "AdaptiveGaussian",
      "noiseReductionApplied": true
    },
    "validationResults": [
      {
        "ruleId": "VR-01-ARITH",
        "ruleName": "Area Summation Consistency",
        "category": "ARITHMETIC",
        "passed": true,
        "severity": "INFO",
        "message": "Sole owner 4,250 sq.m verified on DSLR portal."
      }
    ],
    "reviewHistory": [
      {
        "timestamp": "2026-07-19T12:28:00.000Z",
        "officerName": "Mamlatdar Bardez",
        "role": "REVENUE_OFFICER",
        "action": "Sanctioned & Digital Sign Attached"
      }
    ]
  },
  {
    "id": "REC-GA-SAL-028",
    "documentNumber": "GA-SAL-RAI-2024-F14-218",
    "documentType": "7_12_EXTRACT",
    "primaryLanguage": "english",
    "script": "Latin / Devanagari (Goan Revenue)",
    "sourceFileName": "GA_SouthGoa_Salcete_Raia_218.pdf",
    "sourceImageUrl": "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&q=80&w=1200",
    "uploadedAt": "2026-07-20T20:51:00.000Z",
    "uploadedBy": "Mamlatdar Salcete Taluka (Margao)",
    "status": "VERIFIED_AND_SANCTIONED",
    "overallConfidence": 96.8,
    "state": {
      "value": "Goa",
      "rawText": "Government of Goa",
      "confidence": 99
    },
    "district": {
      "value": "South Goa",
      "rawText": "South Goa",
      "confidence": 98
    },
    "tehsil": {
      "value": "Salcete",
      "rawText": "Salcete",
      "confidence": 98
    },
    "village": {
      "value": "Raia",
      "rawText": "Raia",
      "confidence": 97
    },
    "censusVillageCode": {
      "value": "229970",
      "rawText": "627104",
      "confidence": 96
    },
    "khasraNumber": {
      "value": "218/2",
      "rawText": "Survey No. 218 Sub-Div 2",
      "confidence": 97,
      "isHandwritten": false,
      "boundingBox": {
        "x": 38,
        "y": 16,
        "width": 22,
        "height": 6
      }
    },
    "khataNumber": {
      "value": "89",
      "rawText": "Chitta No. 89",
      "confidence": 97,
      "isHandwritten": false,
      "boundingBox": {
        "x": 68,
        "y": 16,
        "width": 18,
        "height": 6
      }
    },
    "primaryOwnerName": {
      "value": "Caetano Xavier Rodrigues",
      "rawText": "Caetano Xavier Rodrigues",
      "confidence": 97,
      "isHandwritten": false,
      "boundingBox": {
        "x": 14,
        "y": 32,
        "width": 36,
        "height": 7
      }
    },
    "parentageOrSpouse": {
      "value": "Late Sebastiao Rodrigues",
      "rawText": "s/o Late Sebastiao Rodrigues",
      "confidence": 95
    },
    "totalOwnersCount": 1,
    "coSharers": [],
    "landClassification": {
      "value": "Paddy Field (Khazan / Ker Land)",
      "rawText": "Ker Land (Double Paddy Crop)",
      "confidence": 95
    },
    "irrigationSource": {
      "value": "Rachol Lake Channel & Sluice Gate Bandh",
      "rawText": "Lake Channel & Traditional Bund",
      "confidence": 92
    },
    "totalAreaDeclared": {
      "value": 0.65,
      "rawText": "6,500 Sq. Meters (0.6500 Ha.)",
      "confidence": 97,
      "isHandwritten": false,
      "boundingBox": {
        "x": 14,
        "y": 52,
        "width": 28,
        "height": 6
      }
    },
    "declaredUnit": {
      "value": "SQ_METERS",
      "confidence": 99
    },
    "normalizedAreaSqMeters": 6500,
    "annualLandRevenue": {
      "value": 285.4,
      "rawText": "₹285.40",
      "confidence": 97
    },
    "encumbranceStatus": {
      "value": "CLEAR",
      "rawText": "Clear",
      "confidence": 98
    },
    "bankLienDetails": "No encumbrance reported",
    "mutations": [],
    "boundaries": {
      "north": "Survey 217 (Comunidade of Raia bandh)",
      "south": "Raia-Loutolim MDR road",
      "east": "Survey 218/1 (Antonio Costa)",
      "west": "Sluice gate drainage channel"
    },
    "cadastralPolygon": [
      [
        73.98,
        15.31
      ],
      [
        73.9835,
        15.3103
      ],
      [
        73.983,
        15.3075
      ],
      [
        73.9795,
        15.3072
      ]
    ],
    "preprocessingMetrics": {
      "deskewAngleDegrees": -0.64,
      "contrastScore": 78.7,
      "dpiEstimated": 334,
      "binarizationMethod": "OtsuGlobal",
      "noiseReductionApplied": false
    },
    "validationResults": [
      {
        "ruleId": "VR-01-ARITH",
        "ruleName": "Area Summation Consistency",
        "category": "ARITHMETIC",
        "passed": true,
        "severity": "INFO",
        "message": "Sole owner 6,500 sq.m verified on DSLR."
      }
    ],
    "reviewHistory": [
      {
        "timestamp": "2026-07-21T00:51:00.000Z",
        "officerName": "Mamlatdar Salcete",
        "role": "REVENUE_OFFICER",
        "action": "Sanctioned & Digital Sign Attached"
      }
    ]
  }
];
