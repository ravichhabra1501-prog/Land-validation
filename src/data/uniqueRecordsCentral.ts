import { ExtractedLandRecord } from '../types';

export const UNIQUE_RECORDS_CENTRAL: ExtractedLandRecord[] = [
  {
    "id": "REC-MP-SEH-045",
    "documentNumber": "MP-SEH-BIL-2024-KHA-184",
    "documentType": "KHASRA_KHATAUNI",
    "primaryLanguage": "hindi",
    "script": "Devanagari (देवनागरी)",
    "sourceFileName": "MP_Sehore_Bilkisganj_MungaliyaChhap_184.pdf",
    "sourceImageUrl": "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=1200",
    "uploadedAt": "2026-08-15T08:37:00.000Z",
    "uploadedBy": "Patwari Rajesh Malviya (Bilkisganj Halka 14)",
    "status": "NEEDS_REVIEW",
    "overallConfidence": 79.1,
    "state": {
      "value": "Madhya Pradesh",
      "rawText": "मध्य प्रदेश शासन - राजस्व विभाग",
      "confidence": 99
    },
    "district": {
      "value": "Sehore",
      "rawText": "सीहोर",
      "confidence": 98
    },
    "tehsil": {
      "value": "Bilkisganj",
      "rawText": "बिलकिसगंज",
      "confidence": 98
    },
    "village": {
      "value": "Mungaliya Chhap",
      "rawText": "मुंगालिया छाप",
      "confidence": 97
    },
    "censusVillageCode": {
      "value": "242533",
      "rawText": "४८५१२०",
      "confidence": 96
    },
    "khasraNumber": {
      "value": "184/2",
      "rawText": "खसरा क्रमांक १८४/२",
      "confidence": 88,
      "isHandwritten": false,
      "boundingBox": {
        "x": 38,
        "y": 16,
        "width": 22,
        "height": 6
      }
    },
    "khataNumber": {
      "value": "149",
      "rawText": "खाता क्रमांक १४५",
      "confidence": 94,
      "isHandwritten": false,
      "boundingBox": {
        "x": 68,
        "y": 16,
        "width": 18,
        "height": 6
      }
    },
    "subDivisionNumber": {
      "value": "2",
      "rawText": "बटांक २",
      "confidence": 90
    },
    "primaryOwnerName": {
      "value": "Shivnarayan Patidar",
      "rawText": "शिवनारायण पाटीदार",
      "confidence": 92,
      "isHandwritten": false,
      "boundingBox": {
        "x": 14,
        "y": 32,
        "width": 36,
        "height": 7
      }
    },
    "parentageOrSpouse": {
      "value": "Babulal Patidar (Father)",
      "rawText": "बाबूलाल पाटीदार (पिता)",
      "confidence": 90
    },
    "totalOwnersCount": 2,
    "coSharers": [
      {
        "id": "CS-MA-023",
        "name": "Shivnarayan Patidar",
        "relation": "Primary Bhumiswami",
        "shareFraction": "1/2",
        "shareAreaSqMeters": 12000,
        "panOrAadhaarRef": "XXXX-XXXX-8291"
      },
      {
        "id": "CS-MA-024",
        "name": "Kailash Patidar",
        "relation": "Brother / Co-Bhumiswami",
        "shareFraction": "1/2",
        "shareAreaSqMeters": 12000,
        "panOrAadhaarRef": "XXXX-XXXX-8608"
      }
    ],
    "landClassification": {
      "value": "Wheat & Soybean Black Soil (Sinchit)",
      "rawText": "काली गहरी कृषि भूमि सिंचित",
      "confidence": 93
    },
    "irrigationSource": {
      "value": "Kolar River Canal Minor & Electric Borewell",
      "rawText": "कोलार नहर व निजी नलकूप",
      "confidence": 91
    },
    "totalAreaDeclared": {
      "value": 2.4,
      "rawText": "२.४००० हेक्टेयर (५.९३ एकड़)",
      "confidence": 84,
      "isHandwritten": true,
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
    "normalizedAreaSqMeters": 24000,
    "annualLandRevenue": {
      "value": 429.65,
      "rawText": "₹429.65",
      "confidence": 97
    },
    "encumbranceStatus": {
      "value": "MORTGAGED",
      "rawText": "बैंक बंधक / किसान क्रेडिट कार्ड ₹3,50,000 SBI Sehore",
      "confidence": 76,
      "isHandwritten": true,
      "isFlagged": true,
      "flagReason": "Kisan Credit Card hypothecation charge registered by State Bank of India"
    },
    "bankLienDetails": "SBI Agricultural Branch Sehore KCC hypothecation loan account #3088192314 for ₹3,50,000 registered on 2023-03-15",
    "mutations": [
      {
        "mutationNumber": "MR-2024-5444",
        "dateOfOrder": "2024-12-16",
        "sanctioningOfficer": "Naib Tehsildar Bilkisganj",
        "mutationType": "PARTITION",
        "transferor": "Joint Khata 145",
        "transferee": "Shivnarayan & Kailash Patidar",
        "status": "SANCTIONED",
        "remarks": "Order passed under MP Land Revenue Code 1959 Section 178"
      }
    ],
    "boundaries": {
      "north": "Khasra 185 (Shaskiya Charan Bhumi)",
      "south": "Village Link PWD Road Bilkisganj-Bhopal",
      "east": "Khasra 184/1 (Kailash Patidar)",
      "west": "Khasra 183 (Jagdish Prasad Verma)"
    },
    "cadastralPolygon": [
      [
        77.203,
        23.1135
      ],
      [
        77.2062,
        23.1137
      ],
      [
        77.206,
        23.1105
      ],
      [
        77.2028,
        23.1103
      ]
    ],
    "preprocessingMetrics": {
      "deskewAngleDegrees": 0.72,
      "contrastScore": 86.7,
      "dpiEstimated": 368,
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
        "message": "Shares sum to exactly 2.4000 Hectares (24,000 sq.m)."
      },
      {
        "ruleId": "VR-04-FLAG",
        "ruleName": "Bank Encumbrance Verification",
        "category": "LEGAL",
        "passed": false,
        "severity": "WARNING",
        "message": "Active Kisan Credit Card lien note requires Bank NOC."
      }
    ],
    "reviewHistory": [
      {
        "timestamp": "2026-08-15T12:37:00.000Z",
        "officerName": "AI OCR Pipeline v3.8",
        "role": "VERIFICATION_SPECIALIST",
        "action": "Ingested & Flagged for Bank Lien Verification"
      }
    ]
  },
  {
    "id": "REC-MP-IND-046",
    "documentNumber": "MP-IND-SAN-2024-KHA-312",
    "documentType": "KHASRA_KHATAUNI",
    "primaryLanguage": "hindi",
    "script": "Devanagari (देवनागरी)",
    "sourceFileName": "MP_Indore_Sanwer_Chandravatiganj_312.pdf",
    "sourceImageUrl": "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&q=80&w=1200",
    "uploadedAt": "2026-08-16T20:15:00.000Z",
    "uploadedBy": "Patwari M. L. Choudhary (Sanwer)",
    "status": "VERIFIED_AND_SANCTIONED",
    "overallConfidence": 96.5,
    "state": {
      "value": "Madhya Pradesh",
      "rawText": "मध्य प्रदेश शासन",
      "confidence": 99
    },
    "district": {
      "value": "Indore",
      "rawText": "इन्दौर",
      "confidence": 98
    },
    "tehsil": {
      "value": "Sanwer",
      "rawText": "सांवेर",
      "confidence": 98
    },
    "village": {
      "value": "Chandravatiganj",
      "rawText": "चन्द्रावतीगंज",
      "confidence": 97
    },
    "censusVillageCode": {
      "value": "243272",
      "rawText": "४८९२०१",
      "confidence": 96
    },
    "khasraNumber": {
      "value": "312/1",
      "rawText": "खसरा ३१२/१",
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
      "value": "280",
      "rawText": "खाता २८०",
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
      "value": "Radheshyam Choudhary",
      "rawText": "राधेश्याम चौधरी",
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
      "value": "Ganpat Choudhary",
      "rawText": "पुत्र गणपत चौधरी",
      "confidence": 95
    },
    "totalOwnersCount": 1,
    "coSharers": [],
    "landClassification": {
      "value": "Potato & Garlic Commercial Agriculture (Sinchit)",
      "rawText": "आलू व लहसुन सिंचित कृषि भूमि",
      "confidence": 94
    },
    "irrigationSource": {
      "value": "Chambal Lift Canal & Tube-well Network",
      "rawText": "नहर व नलकूप",
      "confidence": 92
    },
    "totalAreaDeclared": {
      "value": 1.88,
      "rawText": "१.८५०० हेक्टेयर",
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
    "normalizedAreaSqMeters": 18800,
    "annualLandRevenue": {
      "value": 437.6,
      "rawText": "₹437.60",
      "confidence": 97
    },
    "encumbranceStatus": {
      "value": "CLEAR",
      "rawText": "निष्कंटक",
      "confidence": 98
    },
    "bankLienDetails": "Clear title on MP Bhulekh portal",
    "mutations": [],
    "boundaries": {
      "north": "Khasra 311 (Sanwer-Ujjain highway link)",
      "south": "Khasra 313 (Gokul Choudhary)",
      "east": "Canal minor",
      "west": "Khasra 312/2 (Ramesh Choudhary)"
    },
    "cadastralPolygon": [
      [
        75.82,
        22.98
      ],
      [
        75.824,
        22.9804
      ],
      [
        75.8235,
        22.977
      ],
      [
        75.8195,
        22.9768
      ]
    ],
    "preprocessingMetrics": {
      "deskewAngleDegrees": 0.8,
      "contrastScore": 87.2,
      "dpiEstimated": 370,
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
        "message": "Sole owner 1.8500 Hectares verified."
      }
    ],
    "reviewHistory": [
      {
        "timestamp": "2026-08-17T00:15:00.000Z",
        "officerName": "Tehsildar Sanwer",
        "role": "REVENUE_OFFICER",
        "action": "Sanctioned & Digital Sign Attached"
      }
    ]
  },
  {
    "id": "REC-MP-UJJ-047",
    "documentNumber": "MP-UJJ-NAG-2024-KHA-405",
    "documentType": "KHASRA_KHATAUNI",
    "primaryLanguage": "hindi",
    "script": "Devanagari (देवनागरी)",
    "sourceFileName": "MP_Ujjain_Nagda_Rupeta_405.pdf",
    "sourceImageUrl": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200",
    "uploadedAt": "2026-08-18T08:38:00.000Z",
    "uploadedBy": "Patwari K. S. Solanki (Rupeta)",
    "status": "VERIFIED_AND_SANCTIONED",
    "overallConfidence": 96.2,
    "state": {
      "value": "Madhya Pradesh",
      "rawText": "मध्य प्रदेश शासन",
      "confidence": 99
    },
    "district": {
      "value": "Ujjain",
      "rawText": "उज्जैन",
      "confidence": 98
    },
    "tehsil": {
      "value": "Nagda",
      "rawText": "नागदा",
      "confidence": 98
    },
    "village": {
      "value": "Rupeta",
      "rawText": "रुपेता",
      "confidence": 97
    },
    "censusVillageCode": {
      "value": "244011",
      "rawText": "४८६७४०",
      "confidence": 96
    },
    "khasraNumber": {
      "value": "405/3",
      "rawText": "खसरा ४०५/३",
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
      "value": "315",
      "rawText": "खाता ३१५",
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
      "value": "Dharmendra Singh Rajput",
      "rawText": "धर्मेन्द्र सिंह राजपूत",
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
      "value": "Vikram Singh Rajput",
      "rawText": "पुत्र विक्रम सिंह राजपूत",
      "confidence": 95
    },
    "totalOwnersCount": 1,
    "coSharers": [],
    "landClassification": {
      "value": "Soybean & Gram Black Soil (Sinchit)",
      "rawText": "काली मिट्टी सोयाबीन व चना सिंचित",
      "confidence": 94
    },
    "irrigationSource": {
      "value": "Chambal River Feeder & Tubewell",
      "rawText": "चंबल नदी उपसा व नलकूप",
      "confidence": 92
    },
    "totalAreaDeclared": {
      "value": 2.22,
      "rawText": "२.१५०० हेक्टेयर",
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
    "normalizedAreaSqMeters": 22200,
    "annualLandRevenue": {
      "value": 450.1,
      "rawText": "₹450.10",
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
      "north": "Khasra 404 (Chambal river flood bund)",
      "south": "Rupeta-Nagda road",
      "east": "Khasra 405/2 (Mahendra Singh)",
      "west": "Panchayat drainage"
    },
    "cadastralPolygon": [
      [
        75.42,
        23.45
      ],
      [
        75.424,
        23.4504
      ],
      [
        75.4235,
        23.447
      ],
      [
        75.4195,
        23.4468
      ]
    ],
    "preprocessingMetrics": {
      "deskewAngleDegrees": 0.88,
      "contrastScore": 87.6,
      "dpiEstimated": 372,
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
        "message": "Sole owner 2.1500 Hectares verified."
      }
    ],
    "reviewHistory": [
      {
        "timestamp": "2026-08-18T12:38:00.000Z",
        "officerName": "Tehsildar Nagda",
        "role": "REVENUE_OFFICER",
        "action": "Sanctioned & Digital Sign Attached"
      }
    ]
  },
  {
    "id": "REC-CG-RAI-048",
    "documentNumber": "CG-RAI-ARA-2024-B1-215",
    "documentType": "KHASRA_KHATAUNI",
    "primaryLanguage": "hindi",
    "script": "Devanagari (देवनागरी)",
    "sourceFileName": "CG_Raipur_Arang_MandirHasaud_215.pdf",
    "sourceImageUrl": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200",
    "uploadedAt": "2026-08-19T20:16:00.000Z",
    "uploadedBy": "Patwari T. R. Sahu (Mandir Hasaud Circle)",
    "status": "VERIFIED_AND_SANCTIONED",
    "overallConfidence": 96.6,
    "state": {
      "value": "Chhattisgarh",
      "rawText": "छत्तीसगढ़ शासन - राजस्व विभाग (भुइयां)",
      "confidence": 99
    },
    "district": {
      "value": "Raipur",
      "rawText": "रायपुर",
      "confidence": 98
    },
    "tehsil": {
      "value": "Arang",
      "rawText": "आरंग",
      "confidence": 98
    },
    "village": {
      "value": "Mandir Hasaud",
      "rawText": "मंदिर हसौद",
      "confidence": 97
    },
    "censusVillageCode": {
      "value": "244750",
      "rawText": "४४६१०२",
      "confidence": 96
    },
    "khasraNumber": {
      "value": "217/1",
      "rawText": "खसरा क्रमांक २१५/१",
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
      "value": "182",
      "rawText": "खाता बी-१ क्रमांक १८२",
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
      "value": "Toman Lal Sahu",
      "rawText": "तोमन लाल साहू",
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
      "value": "Bisahu Ram Sahu",
      "rawText": "पुत्र बिसाहू राम साहू (पिता)",
      "confidence": 95
    },
    "totalOwnersCount": 2,
    "coSharers": [
      {
        "id": "CS-CH-025",
        "name": "Toman Lal Sahu",
        "relation": "Bhumiswami",
        "shareFraction": "1/2",
        "shareAreaSqMeters": 8000,
        "panOrAadhaarRef": "XXXX-XXXX-8925"
      },
      {
        "id": "CS-CH-026",
        "name": "Khemchand Sahu",
        "relation": "Brother / Co-Bhumiswami",
        "shareFraction": "1/2",
        "shareAreaSqMeters": 8000,
        "panOrAadhaarRef": "XXXX-XXXX-9242"
      }
    ],
    "landClassification": {
      "value": "Dorsa / Paddy Double Cropped (Sinchit)",
      "rawText": "डोरसा सिंचित दो फसली धान कृषि",
      "confidence": 95
    },
    "irrigationSource": {
      "value": "Mahanadi Main Canal & Electric Borewell",
      "rawText": "महानदी मुख्य नहर व नलकूप",
      "confidence": 93
    },
    "totalAreaDeclared": {
      "value": 1.6,
      "rawText": "१.६००० हेक्टेयर (३.९५ एकड़)",
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
    "normalizedAreaSqMeters": 16000,
    "annualLandRevenue": {
      "value": 458.05,
      "rawText": "₹458.05",
      "confidence": 97
    },
    "encumbranceStatus": {
      "value": "CLEAR",
      "rawText": "भारमुक्त / बेबाक",
      "confidence": 98
    },
    "bankLienDetails": "No active encumbrance on CG Bhuiyan portal",
    "mutations": [
      {
        "mutationNumber": "MR-2024-5481",
        "dateOfOrder": "2025-01-13",
        "sanctioningOfficer": "Tehsildar Arang",
        "mutationType": "INHERITANCE",
        "transferor": "Late Bisahu Ram Sahu",
        "transferee": "Toman Lal & Khemchand Sahu",
        "status": "SANCTIONED",
        "remarks": "Wirasat namantaran sanctioned under CG Land Revenue Code Section 109"
      }
    ],
    "boundaries": {
      "north": "Khasra 214 (Canal minor)",
      "south": "Mandir Hasaud to Arang link road",
      "east": "Khasra 215/2 (Pawan Kumar Sahu)",
      "west": "Panchayat drainage"
    },
    "cadastralPolygon": [
      [
        81.78,
        21.22
      ],
      [
        81.784,
        21.2204
      ],
      [
        81.7835,
        21.217
      ],
      [
        81.7795,
        21.2168
      ]
    ],
    "preprocessingMetrics": {
      "deskewAngleDegrees": 0.96,
      "contrastScore": 88.1,
      "dpiEstimated": 374,
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
        "message": "Equal shares match 1.6000 Hectares (16,000 sq.m)."
      }
    ],
    "reviewHistory": [
      {
        "timestamp": "2026-08-20T00:16:00.000Z",
        "officerName": "Tehsildar Arang",
        "role": "REVENUE_OFFICER",
        "action": "Sanctioned & Digital Sign Attached"
      }
    ]
  },
  {
    "id": "REC-CG-DUR-049",
    "documentNumber": "CG-DUR-PAT-2024-B1-340",
    "documentType": "KHASRA_KHATAUNI",
    "primaryLanguage": "hindi",
    "script": "Devanagari (देवनागरी)",
    "sourceFileName": "CG_Durg_Patan_Jamgaon_340.pdf",
    "sourceImageUrl": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1200",
    "uploadedAt": "2026-08-21T08:39:00.000Z",
    "uploadedBy": "Patwari R. K. Verma (Jamgaon)",
    "status": "VERIFIED_AND_SANCTIONED",
    "overallConfidence": 96.1,
    "state": {
      "value": "Chhattisgarh",
      "rawText": "छत्तीसगढ़ शासन",
      "confidence": 99
    },
    "district": {
      "value": "Durg",
      "rawText": "दुर्ग",
      "confidence": 98
    },
    "tehsil": {
      "value": "Patan",
      "rawText": "पाटन",
      "confidence": 98
    },
    "village": {
      "value": "Jamgaon",
      "rawText": "जामगांव",
      "confidence": 97
    },
    "censusVillageCode": {
      "value": "245489",
      "rawText": "४४८२३०",
      "confidence": 96
    },
    "khasraNumber": {
      "value": "342/2",
      "rawText": "खसरा ३४०/२",
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
      "value": "248",
      "rawText": "खाता २४५",
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
      "value": "Devendra Kumar Verma",
      "rawText": "देवेन्द्र कुमार वर्मा",
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
      "value": "Ramdayal Verma",
      "rawText": "पुत्र रामदयाल वर्मा",
      "confidence": 95
    },
    "totalOwnersCount": 1,
    "coSharers": [],
    "landClassification": {
      "value": "Matasi / Paddy & Vegetables (Sinchit)",
      "rawText": "मटासी सिंचित धान व सब्जी कृषि",
      "confidence": 94
    },
    "irrigationSource": {
      "value": "Tandula Canal Network & Tubewell",
      "rawText": "तांदुला नहर व नलकूप",
      "confidence": 92
    },
    "totalAreaDeclared": {
      "value": 1.4,
      "rawText": "१.४००० हेक्टेयर",
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
    "normalizedAreaSqMeters": 14000,
    "annualLandRevenue": {
      "value": 466,
      "rawText": "₹466.00",
      "confidence": 97
    },
    "encumbranceStatus": {
      "value": "CLEAR",
      "rawText": "भारमुक्त",
      "confidence": 98
    },
    "bankLienDetails": "Clear title",
    "mutations": [],
    "boundaries": {
      "north": "Khasra 339 (Jamgaon village road)",
      "south": "Canal branch",
      "east": "Khasra 340/1 (Narayan Verma)",
      "west": "Cart track"
    },
    "cadastralPolygon": [
      [
        81.52,
        21.05
      ],
      [
        81.524,
        21.0504
      ],
      [
        81.5235,
        21.047
      ],
      [
        81.5195,
        21.0468
      ]
    ],
    "preprocessingMetrics": {
      "deskewAngleDegrees": 1.04,
      "contrastScore": 88.6,
      "dpiEstimated": 376,
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
        "message": "Sole owner 1.4000 Hectares verified on Bhuiyan."
      }
    ],
    "reviewHistory": [
      {
        "timestamp": "2026-08-21T12:39:00.000Z",
        "officerName": "Tehsildar Patan",
        "role": "REVENUE_OFFICER",
        "action": "Sanctioned & Digital Sign Attached"
      }
    ]
  },
  {
    "id": "REC-CG-BIL-050",
    "documentNumber": "CG-BIL-TAK-2024-B1-178",
    "documentType": "KHASRA_KHATAUNI",
    "primaryLanguage": "hindi",
    "script": "Devanagari (देवनागरी)",
    "sourceFileName": "CG_Bilaspur_Takhatpur_Belpan_178.pdf",
    "sourceImageUrl": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200",
    "uploadedAt": "2026-08-22T20:17:00.000Z",
    "uploadedBy": "Patwari S. K. Kashyap (Belpan)",
    "status": "VERIFIED_AND_SANCTIONED",
    "overallConfidence": 95.8,
    "state": {
      "value": "Chhattisgarh",
      "rawText": "छत्तीसगढ़ शासन",
      "confidence": 99
    },
    "district": {
      "value": "Bilaspur",
      "rawText": "बिलासपुर",
      "confidence": 98
    },
    "tehsil": {
      "value": "Takhatpur",
      "rawText": "तखतपुर",
      "confidence": 98
    },
    "village": {
      "value": "Belpan",
      "rawText": "बेलपान",
      "confidence": 97
    },
    "censusVillageCode": {
      "value": "246228",
      "rawText": "४४२९१०",
      "confidence": 96
    },
    "khasraNumber": {
      "value": "178/4",
      "rawText": "खसरा १७८/४",
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
      "value": "309",
      "rawText": "खाता ३०९",
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
      "value": "Santosh Kumar Kashyap",
      "rawText": "संतोष कुमार कश्यप",
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
      "value": "Bhawan Kashyap",
      "rawText": "पुत्र भवन कश्यप",
      "confidence": 95
    },
    "totalOwnersCount": 1,
    "coSharers": [],
    "landClassification": {
      "value": "Paddy & Pulse Field (Kanhar / Sinchit)",
      "rawText": "कन्हार सिंचित धान व दलहन",
      "confidence": 94
    },
    "irrigationSource": {
      "value": "Khudiya Dam Canal Channel & Borewell",
      "rawText": "खूड़िया नहर व नलकूप",
      "confidence": 92
    },
    "totalAreaDeclared": {
      "value": 1.86,
      "rawText": "१.८००० हेक्टेयर",
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
    "normalizedAreaSqMeters": 18600,
    "annualLandRevenue": {
      "value": 473.95,
      "rawText": "₹473.95",
      "confidence": 97
    },
    "encumbranceStatus": {
      "value": "CLEAR",
      "rawText": "साफ",
      "confidence": 98
    },
    "bankLienDetails": "No encumbrance reported",
    "mutations": [],
    "boundaries": {
      "north": "Khasra 177 (Narmada kund sacred reserve buffer)",
      "south": "Belpan-Takhatpur road",
      "east": "Khasra 178/3 (Ramcharan Kashyap)",
      "west": "Drainage channel"
    },
    "cadastralPolygon": [
      [
        81.88,
        22.18
      ],
      [
        81.884,
        22.1804
      ],
      [
        81.8835,
        22.177
      ],
      [
        81.8795,
        22.1768
      ]
    ],
    "preprocessingMetrics": {
      "deskewAngleDegrees": 1.12,
      "contrastScore": 89,
      "dpiEstimated": 378,
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
        "message": "Sole owner 1.8000 Hectares verified."
      }
    ],
    "reviewHistory": [
      {
        "timestamp": "2026-08-23T00:17:00.000Z",
        "officerName": "Tehsildar Takhatpur",
        "role": "REVENUE_OFFICER",
        "action": "Sanctioned & Digital Sign Attached"
      }
    ]
  },
  {
    "id": "REC-BR-PAT-051",
    "documentNumber": "BR-PAT-PHU-2024-KHT-892",
    "documentType": "KHASRA_KHATAUNI",
    "primaryLanguage": "hindi",
    "script": "Devanagari (देवनागरी)",
    "sourceFileName": "BR_Patna_PhulwariSharif_Sampatchak_892.pdf",
    "sourceImageUrl": "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&q=80&w=1200",
    "uploadedAt": "2026-08-24T08:40:00.000Z",
    "uploadedBy": "Revenue Karamchari B. K. Singh (Sampatchak Halka)",
    "status": "VERIFIED_AND_SANCTIONED",
    "overallConfidence": 96.8,
    "state": {
      "value": "Bihar",
      "rawText": "बिहार सरकार - राजस्व एवं भूमि सुधार विभाग",
      "confidence": 99
    },
    "district": {
      "value": "Patna",
      "rawText": "पटना",
      "confidence": 98
    },
    "tehsil": {
      "value": "Phulwari Sharif",
      "rawText": "फुलवारी शरीफ",
      "confidence": 98
    },
    "village": {
      "value": "Sampatchak",
      "rawText": "संपतचक",
      "confidence": 97
    },
    "censusVillageCode": {
      "value": "246967",
      "rawText": "२४५१०२",
      "confidence": 96
    },
    "khasraNumber": {
      "value": "892/1",
      "rawText": "खेसरा / प्लॉट संख्या ८९२/१",
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
      "value": "344",
      "rawText": "खाता संख्या ३४०",
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
      "value": "Upendra Prasad Singh",
      "rawText": "उपेन्द्र प्रसाद सिंह",
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
      "value": "Ramchandra Singh",
      "rawText": "पिता: रामचंद्र सिंह",
      "confidence": 96
    },
    "totalOwnersCount": 2,
    "coSharers": [
      {
        "id": "CS-BI-027",
        "name": "Upendra Prasad Singh",
        "relation": "Primary Rayat",
        "shareFraction": "1/2",
        "shareAreaSqMeters": 4600,
        "panOrAadhaarRef": "XXXX-XXXX-9559"
      },
      {
        "id": "CS-BI-028",
        "name": "Surendra Prasad Singh",
        "relation": "Brother / Co-Rayat",
        "shareFraction": "1/2",
        "shareAreaSqMeters": 4600,
        "panOrAadhaarRef": "XXXX-XXXX-9876"
      }
    ],
    "landClassification": {
      "value": "Kewal / Paddy & Wheat Alluvial Belt (Nal-Koop Sinchit)",
      "rawText": "केवाल नलकूप सिंचित कृषि भूमि",
      "confidence": 95
    },
    "irrigationSource": {
      "value": "Patna Canal Minor & Deep State Tubewell",
      "rawText": "पटना नहर व राजकीय नलकूप",
      "confidence": 93
    },
    "totalAreaDeclared": {
      "value": 0.92,
      "rawText": "०.९००० हेक्टेयर (३ बीघा १२ कट्ठा)",
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
    "normalizedAreaSqMeters": 9200,
    "annualLandRevenue": {
      "value": 481.9,
      "rawText": "₹481.90",
      "confidence": 97
    },
    "encumbranceStatus": {
      "value": "CLEAR",
      "rawText": "भारमुक्त / बेबाक",
      "confidence": 98
    },
    "bankLienDetails": "No active encumbrance on Bihar Bhumi portal",
    "mutations": [
      {
        "mutationNumber": "MR-2024-5518",
        "dateOfOrder": "2025-02-10",
        "sanctioningOfficer": "Circle Officer Phulwari Sharif",
        "mutationType": "INHERITANCE",
        "transferor": "Late Ramchandra Singh",
        "transferee": "Upendra & Surendra Prasad Singh",
        "status": "SANCTIONED",
        "remarks": "Dakhil-kharij order passed under Bihar Land Mutation Act 2011"
      }
    ],
    "boundaries": {
      "north": "Khesra 891 (Patna bypass link road)",
      "south": "Khesra 893 (Manoj Kumar Singh)",
      "east": "Canal branch",
      "west": "Khesra 892/2 (Dinesh Singh)"
    },
    "cadastralPolygon": [
      [
        85.12,
        25.55
      ],
      [
        85.124,
        25.5504
      ],
      [
        85.1235,
        25.547
      ],
      [
        85.1195,
        25.5468
      ]
    ],
    "preprocessingMetrics": {
      "deskewAngleDegrees": 1.2,
      "contrastScore": 89.5,
      "dpiEstimated": 380,
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
        "message": "Equal co-rayat shares match 0.9000 Hectares (9,000 sq.m)."
      }
    ],
    "reviewHistory": [
      {
        "timestamp": "2026-08-24T12:40:00.000Z",
        "officerName": "Circle Officer Phulwari Sharif",
        "role": "REVENUE_OFFICER",
        "action": "Sanctioned & Digital Sign Attached"
      }
    ]
  },
  {
    "id": "REC-BR-MUZ-052",
    "documentNumber": "BR-MUZ-KAN-2024-KHT-415",
    "documentType": "KHASRA_KHATAUNI",
    "primaryLanguage": "hindi",
    "script": "Devanagari (देवनागरी)",
    "sourceFileName": "BR_Muzaffarpur_Kanti_Damodarpur_415.pdf",
    "sourceImageUrl": "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=1200",
    "uploadedAt": "2026-08-25T20:18:00.000Z",
    "uploadedBy": "Revenue Karamchari N. K. Jha (Kanti)",
    "status": "VERIFIED_AND_SANCTIONED",
    "overallConfidence": 96.3,
    "state": {
      "value": "Bihar",
      "rawText": "बिहार सरकार",
      "confidence": 99
    },
    "district": {
      "value": "Muzaffarpur",
      "rawText": "मुजफ्फरपुर",
      "confidence": 98
    },
    "tehsil": {
      "value": "Kanti",
      "rawText": "कांटी",
      "confidence": 98
    },
    "village": {
      "value": "Damodarpur",
      "rawText": "दामोदरपुर",
      "confidence": 97
    },
    "censusVillageCode": {
      "value": "247706",
      "rawText": "२३१४५०",
      "confidence": 96
    },
    "khasraNumber": {
      "value": "415/2",
      "rawText": "खेसरा ४१५/२",
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
      "value": "194",
      "rawText": "खाता १८९",
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
      "value": "Nagendra Kumar Jha",
      "rawText": "नागेन्द्र कुमार झा",
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
      "value": "Satyanarayan Jha",
      "rawText": "पिता: सत्यनारायण झा",
      "confidence": 95
    },
    "totalOwnersCount": 1,
    "coSharers": [],
    "landClassification": {
      "value": "Shahi Litchi Orchard & Agricultural (Sinchit)",
      "rawText": "शाही लीची बाग व कृषि भूमि",
      "confidence": 94
    },
    "irrigationSource": {
      "value": "Gandak Canal Minor & Drip Tube-well",
      "rawText": "गंडक नहर व नलकूप",
      "confidence": 92
    },
    "totalAreaDeclared": {
      "value": 1.12,
      "rawText": "१.१५०० हेक्टेयर",
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
    "normalizedAreaSqMeters": 11200,
    "annualLandRevenue": {
      "value": 489.85,
      "rawText": "₹489.85",
      "confidence": 97
    },
    "encumbranceStatus": {
      "value": "CLEAR",
      "rawText": "भारमुक्त",
      "confidence": 98
    },
    "bankLienDetails": "Clear title",
    "mutations": [],
    "boundaries": {
      "north": "Khesra 414 (NH 28 highway buffer)",
      "south": "Damodarpur village road",
      "east": "Khesra 415/1 (Baidyanath Jha)",
      "west": "Drainage channel"
    },
    "cadastralPolygon": [
      [
        85.32,
        26.15
      ],
      [
        85.324,
        26.1504
      ],
      [
        85.3235,
        26.147
      ],
      [
        85.3195,
        26.1468
      ]
    ],
    "preprocessingMetrics": {
      "deskewAngleDegrees": 1.28,
      "contrastScore": 90,
      "dpiEstimated": 382,
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
        "message": "Sole owner 1.1500 Hectares verified on Bihar Bhumi."
      }
    ],
    "reviewHistory": [
      {
        "timestamp": "2026-08-26T00:18:00.000Z",
        "officerName": "Circle Officer Kanti",
        "role": "REVENUE_OFFICER",
        "action": "Sanctioned & Digital Sign Attached"
      }
    ]
  },
  {
    "id": "REC-BR-GAY-053",
    "documentNumber": "BR-GAY-BOD-2024-KHT-604",
    "documentType": "KHASRA_KHATAUNI",
    "primaryLanguage": "hindi",
    "script": "Devanagari (देवनागरी)",
    "sourceFileName": "BR_Gaya_BodhGaya_Bakrour_604.pdf",
    "sourceImageUrl": "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1200",
    "uploadedAt": "2026-08-27T08:41:00.000Z",
    "uploadedBy": "Revenue Karamchari R. P. Yadav (Bodh Gaya)",
    "status": "VERIFIED_AND_SANCTIONED",
    "overallConfidence": 96,
    "state": {
      "value": "Bihar",
      "rawText": "बिहार सरकार",
      "confidence": 99
    },
    "district": {
      "value": "Gaya",
      "rawText": "गया",
      "confidence": 98
    },
    "tehsil": {
      "value": "Bodh Gaya",
      "rawText": "बोध गया",
      "confidence": 98
    },
    "village": {
      "value": "Bakrour",
      "rawText": "बकरौर",
      "confidence": 97
    },
    "censusVillageCode": {
      "value": "248445",
      "rawText": "२५६८९०",
      "confidence": 96
    },
    "khasraNumber": {
      "value": "604/3",
      "rawText": "खेसरा ६०४/३",
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
      "value": "412",
      "rawText": "खाता ४१२",
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
      "value": "Bikramaditya Prasad Yadav",
      "rawText": "विक्रमादित्य प्रसाद यादव",
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
      "value": "Jagdish Yadav",
      "rawText": "पिता: जगदीश यादव",
      "confidence": 95
    },
    "totalOwnersCount": 1,
    "coSharers": [],
    "landClassification": {
      "value": "Wheat & Mustard Agro-Plot (Punarwas / Sinchit)",
      "rawText": "गेहूं व सरसों सिंचित कृषि भूमि",
      "confidence": 94
    },
    "irrigationSource": {
      "value": "Falgu River Alluvial Tube-well",
      "rawText": "फल्गु कछार नलकूप",
      "confidence": 92
    },
    "totalAreaDeclared": {
      "value": 1.05,
      "rawText": "१.०५०० हेक्टेयर",
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
    "normalizedAreaSqMeters": 10500,
    "annualLandRevenue": {
      "value": 497.8,
      "rawText": "₹497.80",
      "confidence": 97
    },
    "encumbranceStatus": {
      "value": "CLEAR",
      "rawText": "साफ",
      "confidence": 98
    },
    "bankLienDetails": "No encumbrance reported",
    "mutations": [],
    "boundaries": {
      "north": "Khesra 603 (Sujata Kuti tourist pathway)",
      "south": "Bakrour village link road",
      "east": "Falgu river secondary embankment",
      "west": "Khesra 604/2 (Raju Yadav)"
    },
    "cadastralPolygon": [
      [
        84.99,
        24.7
      ],
      [
        84.994,
        24.7004
      ],
      [
        84.9935,
        24.697
      ],
      [
        84.9895,
        24.6968
      ]
    ],
    "preprocessingMetrics": {
      "deskewAngleDegrees": 1.36,
      "contrastScore": 90.4,
      "dpiEstimated": 384,
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
        "message": "Sole owner 1.0500 Hectares verified."
      }
    ],
    "reviewHistory": [
      {
        "timestamp": "2026-08-27T12:41:00.000Z",
        "officerName": "Circle Officer Bodh Gaya",
        "role": "REVENUE_OFFICER",
        "action": "Sanctioned & Digital Sign Attached"
      }
    ]
  },
  {
    "id": "REC-JH-RAN-054",
    "documentNumber": "JH-RAN-KAN-2024-KHT-512",
    "documentType": "KHASRA_KHATAUNI",
    "primaryLanguage": "hindi",
    "script": "Devanagari (देवनागरी)",
    "sourceFileName": "JH_Ranchi_Kanke_Pithoria_512.pdf",
    "sourceImageUrl": "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200",
    "uploadedAt": "2026-08-28T20:19:00.000Z",
    "uploadedBy": "Circle Inspector A. K. Munda (Kanke Circle)",
    "status": "VERIFIED_AND_SANCTIONED",
    "overallConfidence": 96.9,
    "state": {
      "value": "Jharkhand",
      "rawText": "झारखंड सरकार - राजस्व एवं भूमि सुधार विभाग (झारभूमि)",
      "confidence": 99
    },
    "district": {
      "value": "Ranchi",
      "rawText": "राँची",
      "confidence": 98
    },
    "tehsil": {
      "value": "Kanke",
      "rawText": "कांके",
      "confidence": 98
    },
    "village": {
      "value": "Pithoria",
      "rawText": "पिठौरिया",
      "confidence": 97
    },
    "censusVillageCode": {
      "value": "249184",
      "rawText": "३७२१०५",
      "confidence": 96
    },
    "khasraNumber": {
      "value": "512/1",
      "rawText": "प्लॉट संख्या ५१२/१",
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
      "value": "146",
      "rawText": "खतियान खाता १४२ (रैयती)",
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
      "value": "Birsa Munda",
      "rawText": "बिरसा मुंडा",
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
      "value": "Late Somra Munda",
      "rawText": "पिता: स्व. सोमरा मुंडा",
      "confidence": 96
    },
    "totalOwnersCount": 2,
    "coSharers": [
      {
        "id": "CS-JH-029",
        "name": "Birsa Munda",
        "relation": "Primary Rayat (CNT Act Protected)",
        "shareFraction": "1/2",
        "shareAreaSqMeters": 6100,
        "panOrAadhaarRef": "XXXX-XXXX-1293"
      },
      {
        "id": "CS-JH-030",
        "name": "Budhu Munda",
        "relation": "Brother / Co-Rayat",
        "shareFraction": "1/2",
        "shareAreaSqMeters": 6100,
        "panOrAadhaarRef": "XXXX-XXXX-1610"
      }
    ],
    "landClassification": {
      "value": "Don Class II / Paddy & Vegetable (Sinchit)",
      "rawText": "दोन दोयम सिंचित धान व मौसमी सब्जी",
      "confidence": 95
    },
    "irrigationSource": {
      "value": "Potpoto River Sub-Stream & Solar Lift Well",
      "rawText": "पोटपोटो नदी कछार व सौर कूप",
      "confidence": 93
    },
    "totalAreaDeclared": {
      "value": 1.22,
      "rawText": "१.२५०० हेक्टेयर (३.०९ एकड़)",
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
    "normalizedAreaSqMeters": 12200,
    "annualLandRevenue": {
      "value": 510.3,
      "rawText": "₹510.30",
      "confidence": 97
    },
    "encumbranceStatus": {
      "value": "CLEAR",
      "rawText": "भारमुक्त (CNT Sec 46 Protected)",
      "confidence": 98
    },
    "bankLienDetails": "Protected under Chota Nagpur Tenancy Act 1908 Section 46, no unauthorized mortgage permissible",
    "mutations": [
      {
        "mutationNumber": "MR-2024-5555",
        "dateOfOrder": "2025-03-10",
        "sanctioningOfficer": "Circle Officer Kanke",
        "mutationType": "INHERITANCE",
        "transferor": "Late Somra Munda",
        "transferee": "Birsa & Budhu Munda",
        "status": "SANCTIONED",
        "remarks": "Wirasat mutation certified under Bihar Tenancy / CNT Act rules"
      }
    ],
    "boundaries": {
      "north": "Plot 511 (Pithoria to Patratu valley road)",
      "south": "Potpoto stream drainage",
      "east": "Plot 512/2 (Mangra Munda)",
      "west": "Cart track"
    },
    "cadastralPolygon": [
      [
        85.31,
        23.51
      ],
      [
        85.314,
        23.5104
      ],
      [
        85.3135,
        23.507
      ],
      [
        85.3095,
        23.5068
      ]
    ],
    "preprocessingMetrics": {
      "deskewAngleDegrees": 1.44,
      "contrastScore": 90.9,
      "dpiEstimated": 386,
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
        "message": "Equal co-rayat shares match 1.2500 Hectares (12,500 sq.m)."
      }
    ],
    "reviewHistory": [
      {
        "timestamp": "2026-08-29T00:19:00.000Z",
        "officerName": "Circle Officer Kanke",
        "role": "REVENUE_OFFICER",
        "action": "Sanctioned & Digital Sign Attached"
      }
    ]
  },
  {
    "id": "REC-JH-BOK-055",
    "documentNumber": "JH-BOK-CHA-2024-KHT-324",
    "documentType": "KHASRA_KHATAUNI",
    "primaryLanguage": "hindi",
    "script": "Devanagari (देवनागरी)",
    "sourceFileName": "JH_Bokaro_Chas_Chandankyari_324.pdf",
    "sourceImageUrl": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1200",
    "uploadedAt": "2026-08-30T08:42:00.000Z",
    "uploadedBy": "Revenue Karamchari S. Mahto (Chas)",
    "status": "VERIFIED_AND_SANCTIONED",
    "overallConfidence": 96.2,
    "state": {
      "value": "Jharkhand",
      "rawText": "झारखंड सरकार",
      "confidence": 99
    },
    "district": {
      "value": "Bokaro",
      "rawText": "बोकारो",
      "confidence": 98
    },
    "tehsil": {
      "value": "Chas",
      "rawText": "चास",
      "confidence": 98
    },
    "village": {
      "value": "Chandankyari",
      "rawText": "चंदनकियारी",
      "confidence": 97
    },
    "censusVillageCode": {
      "value": "249923",
      "rawText": "३६८९२०",
      "confidence": 96
    },
    "khasraNumber": {
      "value": "324/2",
      "rawText": "प्लॉट ३२४/२",
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
      "value": "214",
      "rawText": "खाता २१०",
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
      "value": "Mahadev Chandra Mahto",
      "rawText": "महादेव चंद्र महतो",
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
      "value": "Nityanand Mahto",
      "rawText": "पिता: नित्यानंद महतो",
      "confidence": 95
    },
    "totalOwnersCount": 1,
    "coSharers": [],
    "landClassification": {
      "value": "Don Class III / Paddy Agro-Farm",
      "rawText": "दोन तृतीय धान कृषि भूमि",
      "confidence": 94
    },
    "irrigationSource": {
      "value": "Damodar Canal Distributary & Well",
      "rawText": "दामोदर नहर व कुआं",
      "confidence": 92
    },
    "totalAreaDeclared": {
      "value": 1.54,
      "rawText": "१.५००० हेक्टेयर",
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
    "normalizedAreaSqMeters": 15400,
    "annualLandRevenue": {
      "value": 518.25,
      "rawText": "₹518.25",
      "confidence": 97
    },
    "encumbranceStatus": {
      "value": "CLEAR",
      "rawText": "भारमुक्त",
      "confidence": 98
    },
    "bankLienDetails": "Clear title on Jharbhoomi",
    "mutations": [],
    "boundaries": {
      "north": "Plot 323 (Chas-Chandankyari PWD road)",
      "south": "Damodar river feeder canal",
      "east": "Plot 324/1 (Ganesh Mahto)",
      "west": "Cart track"
    },
    "cadastralPolygon": [
      [
        86.35,
        23.58
      ],
      [
        86.354,
        23.5804
      ],
      [
        86.3535,
        23.577
      ],
      [
        86.3495,
        23.5768
      ]
    ],
    "preprocessingMetrics": {
      "deskewAngleDegrees": 1.52,
      "contrastScore": 91.4,
      "dpiEstimated": 388,
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
        "message": "Sole owner 1.5000 Hectares verified."
      }
    ],
    "reviewHistory": [
      {
        "timestamp": "2026-08-30T12:42:00.000Z",
        "officerName": "Circle Officer Chas",
        "role": "REVENUE_OFFICER",
        "action": "Sanctioned & Digital Sign Attached"
      }
    ]
  },
  {
    "id": "REC-JH-HAZ-056",
    "documentNumber": "JH-HAZ-BAR-2024-KHT-689",
    "documentType": "KHASRA_KHATAUNI",
    "primaryLanguage": "hindi",
    "script": "Devanagari (देवनागरी)",
    "sourceFileName": "JH_Hazaribagh_Barhi_Padma_689.pdf",
    "sourceImageUrl": "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=1200",
    "uploadedAt": "2026-08-31T20:20:00.000Z",
    "uploadedBy": "Revenue Karamchari B. K. Kushwaha (Barhi)",
    "status": "VERIFIED_AND_SANCTIONED",
    "overallConfidence": 96,
    "state": {
      "value": "Jharkhand",
      "rawText": "झारखंड सरकार",
      "confidence": 99
    },
    "district": {
      "value": "Hazaribagh",
      "rawText": "हजारीबाग",
      "confidence": 98
    },
    "tehsil": {
      "value": "Barhi",
      "rawText": "बरही",
      "confidence": 98
    },
    "village": {
      "value": "Padma",
      "rawText": "पद्मा",
      "confidence": 97
    },
    "censusVillageCode": {
      "value": "250662",
      "rawText": "३६४१५०",
      "confidence": 96
    },
    "khasraNumber": {
      "value": "689/1",
      "rawText": "प्लॉट ६८९/१",
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
      "value": "316",
      "rawText": "खाता ३०५",
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
      "value": "Suresh Prasad Kushwaha",
      "rawText": "सुरेश प्रसाद कुशवाहा",
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
      "value": "Baldeo Mahto",
      "rawText": "पिता: बलदेव महतो",
      "confidence": 95
    },
    "totalOwnersCount": 1,
    "coSharers": [],
    "landClassification": {
      "value": "Tand Class I / Mustard & Maize Agriculture",
      "rawText": "टांड़ अव्वल सरसों व मक्का कृषि",
      "confidence": 94
    },
    "irrigationSource": {
      "value": "Barakar Basin Lift & Borewell",
      "rawText": "बराक नदी उपसा व नलकूप",
      "confidence": 92
    },
    "totalAreaDeclared": {
      "value": 1.7,
      "rawText": "१.७००० हेक्टेयर",
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
    "normalizedAreaSqMeters": 17000,
    "annualLandRevenue": {
      "value": 526.2,
      "rawText": "₹526.20",
      "confidence": 97
    },
    "encumbranceStatus": {
      "value": "CLEAR",
      "rawText": "साफ",
      "confidence": 98
    },
    "bankLienDetails": "No encumbrance reported",
    "mutations": [],
    "boundaries": {
      "north": "Plot 688 (NH 31 highway corridor)",
      "south": "Padma village road",
      "east": "Plot 689/2 (Kishore Kushwaha)",
      "west": "Drainage channel"
    },
    "cadastralPolygon": [
      [
        85.45,
        24.22
      ],
      [
        85.454,
        24.2204
      ],
      [
        85.4535,
        24.217
      ],
      [
        85.4495,
        24.2168
      ]
    ],
    "preprocessingMetrics": {
      "deskewAngleDegrees": 1.6,
      "contrastScore": 91.8,
      "dpiEstimated": 390,
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
        "message": "Sole owner 1.7000 Hectares verified."
      }
    ],
    "reviewHistory": [
      {
        "timestamp": "2026-09-01T00:20:00.000Z",
        "officerName": "Circle Officer Barhi",
        "role": "REVENUE_OFFICER",
        "action": "Sanctioned & Digital Sign Attached"
      }
    ]
  }
];
