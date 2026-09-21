import { ExtractedLandRecord } from '../types';

export const UNIQUE_RECORDS_NORTH: ExtractedLandRecord[] = [
  {
    "id": "REC-HP-KNG-001",
    "documentNumber": "HP-KNG-PAL-2024-JAM-108",
    "documentType": "JAMABANDI",
    "primaryLanguage": "hindi",
    "script": "Devanagari (देवनागरी)",
    "sourceFileName": "HP_Kangra_Palampur_Bandla_108.pdf",
    "sourceImageUrl": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=1200",
    "uploadedAt": "2026-06-10T08:15:00.000Z",
    "uploadedBy": "Kanungo R. S. Rana (Palampur Tehsil)",
    "status": "VERIFIED_AND_SANCTIONED",
    "overallConfidence": 96.2,
    "state": {
      "value": "Himachal Pradesh",
      "rawText": "हिमाचल प्रदेश सरकार - राजस्व विभाग",
      "confidence": 99
    },
    "district": {
      "value": "Kangra",
      "rawText": "कांगड़ा",
      "confidence": 98
    },
    "tehsil": {
      "value": "Palampur",
      "rawText": "पालमपुर",
      "confidence": 97
    },
    "village": {
      "value": "Bandla",
      "rawText": "बंदला",
      "confidence": 98
    },
    "censusVillageCode": {
      "value": "210017",
      "rawText": "०२१४०१",
      "confidence": 96
    },
    "khasraNumber": {
      "value": "108/2",
      "rawText": "खसरा न. १०८/२",
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
      "value": "24/45",
      "rawText": "खाता खतौनी २४/४५",
      "confidence": 97,
      "isHandwritten": false,
      "boundingBox": {
        "x": 68,
        "y": 16,
        "width": 20,
        "height": 6
      }
    },
    "subDivisionNumber": {
      "value": "2",
      "rawText": "हिस्सा २",
      "confidence": 94
    },
    "primaryOwnerName": {
      "value": "Pradeep Singh Katoch",
      "rawText": "प्रदीप सिंह कटोच",
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
      "value": "Sumer Singh Katoch",
      "rawText": "पुत्र सुमेर सिंह कटोच (पिता)",
      "confidence": 95
    },
    "totalOwnersCount": 2,
    "coSharers": [
      {
        "id": "CS-HI-001",
        "name": "Pradeep Singh Katoch",
        "relation": "Self / Primary Khatedar",
        "shareFraction": "1/2",
        "shareAreaSqMeters": 2529.3,
        "panOrAadhaarRef": "XXXX-XXXX-1317"
      },
      {
        "id": "CS-HI-002",
        "name": "Kavita Katoch",
        "relation": "Wife",
        "shareFraction": "1/2",
        "shareAreaSqMeters": 2529.3,
        "panOrAadhaarRef": "XXXX-XXXX-1634"
      }
    ],
    "landClassification": {
      "value": "Barani / Tea Garden & Orchards",
      "rawText": "बारानी अव्वल / चाय बागान",
      "confidence": 94
    },
    "irrigationSource": {
      "value": "Neugal Khad Gravity Channel (Kuhl)",
      "rawText": "न्यूगल खड्ड कूहल",
      "confidence": 92
    },
    "totalAreaDeclared": {
      "value": 6.25,
      "rawText": "६ बीघा ५ बिस्वा",
      "confidence": 96,
      "isHandwritten": false,
      "boundingBox": {
        "x": 14,
        "y": 52,
        "width": 30,
        "height": 6
      }
    },
    "declaredUnit": {
      "value": "BIGHA",
      "confidence": 99
    },
    "normalizedAreaSqMeters": 5058.6,
    "annualLandRevenue": {
      "value": 48,
      "rawText": "₹48.00",
      "confidence": 97
    },
    "encumbranceStatus": {
      "value": "CLEAR",
      "rawText": "साफ / कोई भार नहीं",
      "confidence": 98
    },
    "bankLienDetails": "No mortgage or government charge recorded on Jamabandi register",
    "mutations": [
      {
        "mutationNumber": "MR-2024-5037",
        "dateOfOrder": "2024-02-12",
        "sanctioningOfficer": "Tehsildar Palampur",
        "mutationType": "INHERITANCE",
        "transferor": "Late Sumer Singh Katoch",
        "transferee": "Pradeep Singh Katoch & Kavita Katoch",
        "status": "SANCTIONED",
        "remarks": "Wirasat mutation sanctioned under HP Land Revenue Act Section 34"
      }
    ],
    "boundaries": {
      "north": "Kuhl Channel and Reserve Pine Forest",
      "south": "Village Link PWD Road Palampur-Bandla",
      "east": "Khasra 108/1 (Kalyan Singh Katoch)",
      "west": "Khasra 109 (Tea Board experimental plot)"
    },
    "cadastralPolygon": [
      [
        76.54,
        32.122
      ],
      [
        76.5435,
        32.1224
      ],
      [
        76.543,
        32.119
      ],
      [
        76.5398,
        32.1188
      ]
    ],
    "preprocessingMetrics": {
      "deskewAngleDegrees": -2.8,
      "contrastScore": 66,
      "dpiEstimated": 280,
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
        "message": "Co-sharer shares equal declared 6.25 Bigha (5058.6 sq.m)."
      }
    ],
    "reviewHistory": [
      {
        "timestamp": "2026-06-10T12:15:00.000Z",
        "officerName": "Tehsildar Palampur",
        "role": "REVENUE_OFFICER",
        "action": "Sanctioned & Digital Sign Attached"
      }
    ]
  },
  {
    "id": "REC-HP-SHM-002",
    "documentNumber": "HP-SHM-THE-2024-JAM-215",
    "documentType": "JAMABANDI",
    "primaryLanguage": "hindi",
    "script": "Devanagari (देवनागरी)",
    "sourceFileName": "HP_Shimla_Theog_Fagu_215.pdf",
    "sourceImageUrl": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1200",
    "uploadedAt": "2026-06-11T20:38:00.000Z",
    "uploadedBy": "Patwari H. C. Sharma (Fagu Circle)",
    "status": "NEEDS_REVIEW",
    "overallConfidence": 81.5,
    "state": {
      "value": "Himachal Pradesh",
      "rawText": "हिमाचल प्रदेश सरकार",
      "confidence": 99
    },
    "district": {
      "value": "Shimla",
      "rawText": "शिमला",
      "confidence": 98
    },
    "tehsil": {
      "value": "Theog",
      "rawText": "ठियोग",
      "confidence": 97
    },
    "village": {
      "value": "Fagu",
      "rawText": "फागू",
      "confidence": 98
    },
    "censusVillageCode": {
      "value": "210756",
      "rawText": "०२३१५०",
      "confidence": 95
    },
    "khasraNumber": {
      "value": "219/1",
      "rawText": "खसरा २१५/१",
      "confidence": 84,
      "isHandwritten": true,
      "boundingBox": {
        "x": 36,
        "y": 18,
        "width": 22,
        "height": 6
      }
    },
    "khataNumber": {
      "value": "31/72",
      "rawText": "खाता ३१/७२",
      "confidence": 88,
      "isHandwritten": false,
      "boundingBox": {
        "x": 66,
        "y": 18,
        "width": 18,
        "height": 6
      }
    },
    "primaryOwnerName": {
      "value": "Virender Kumar Sharma",
      "rawText": "विरेन्द्र कुमार शर्मा",
      "confidence": 86,
      "isHandwritten": true,
      "boundingBox": {
        "x": 14,
        "y": 34,
        "width": 38,
        "height": 7
      }
    },
    "parentageOrSpouse": {
      "value": "Durga Dutt Sharma",
      "rawText": "पुत्र दुर्गा दत्त शर्मा",
      "confidence": 85
    },
    "totalOwnersCount": 1,
    "coSharers": [],
    "landClassification": {
      "value": "Apple Orchard (Bagicha Seb)",
      "rawText": "बगीचा सेब अव्वल",
      "confidence": 87
    },
    "irrigationSource": {
      "value": "Natural Spring (Chashma) & Rainfed",
      "rawText": "कुदरती चश्मा जल",
      "confidence": 83
    },
    "totalAreaDeclared": {
      "value": 4.5,
      "rawText": "४ बीघा १० बिस्वा",
      "confidence": 81,
      "isHandwritten": true,
      "boundingBox": {
        "x": 14,
        "y": 54,
        "width": 28,
        "height": 6
      }
    },
    "declaredUnit": {
      "value": "BIGHA",
      "confidence": 99
    },
    "normalizedAreaSqMeters": 3642.2,
    "annualLandRevenue": {
      "value": 60.5,
      "rawText": "₹60.50",
      "confidence": 97
    },
    "encumbranceStatus": {
      "value": "MORTGAGED",
      "rawText": "बंधक HP State Cooperative Bank Theog ₹2,00,000",
      "confidence": 76,
      "isHandwritten": true,
      "isFlagged": true,
      "flagReason": "Kisan Credit Card hypothecation loan noted on column 9"
    },
    "bankLienDetails": "HP State Co-operative Bank Theog Branch charge under KCC Act ₹2,00,000 dated 2022-09-14",
    "mutations": [],
    "boundaries": {
      "north": "Hindustan-Tibet National Highway 5",
      "south": "Khasra 216 (Apple orchard of Mohan Lal)",
      "east": "Municipal drainage line Fagu",
      "west": "Khasra 215/2 (Forest boundary pillar 12)"
    },
    "cadastralPolygon": [
      [
        77.26,
        31.091
      ],
      [
        77.263,
        31.0915
      ],
      [
        77.2628,
        31.0885
      ],
      [
        77.2598,
        31.0882
      ]
    ],
    "preprocessingMetrics": {
      "deskewAngleDegrees": -2.72,
      "contrastScore": 66.5,
      "dpiEstimated": 282,
      "binarizationMethod": "Otsu",
      "noiseReductionApplied": true
    },
    "validationResults": [
      {
        "ruleId": "VR-03-ENC",
        "ruleName": "Bank Charge Encumbrance Flag",
        "category": "LEGAL",
        "passed": false,
        "severity": "WARNING",
        "message": "Active bank mortgage requires clearance certificate before land partition."
      }
    ],
    "reviewHistory": [
      {
        "timestamp": "2026-06-12T00:38:00.000Z",
        "officerName": "AI OCR Pipeline v3.8",
        "role": "VERIFICATION_SPECIALIST",
        "action": "Ingested & Flagged for Bank Lien Verification"
      }
    ]
  },
  {
    "id": "REC-HP-MAN-003",
    "documentNumber": "HP-MAN-SAR-2024-JAM-342",
    "documentType": "JAMABANDI",
    "primaryLanguage": "hindi",
    "script": "Devanagari (देवनागरी)",
    "sourceFileName": "HP_Mandi_Sarkaghat_Gopalpur_342.pdf",
    "sourceImageUrl": "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=1200",
    "uploadedAt": "2026-06-13T08:16:00.000Z",
    "uploadedBy": "Kanungo B. R. Sen (Sarkaghat)",
    "status": "VERIFIED_AND_SANCTIONED",
    "overallConfidence": 94.8,
    "state": {
      "value": "Himachal Pradesh",
      "rawText": "हिमाचल प्रदेश सरकार",
      "confidence": 99
    },
    "district": {
      "value": "Mandi",
      "rawText": "मंडी",
      "confidence": 98
    },
    "tehsil": {
      "value": "Sarkaghat",
      "rawText": "सरकाघाट",
      "confidence": 97
    },
    "village": {
      "value": "Gopalpur",
      "rawText": "गोपालपुर",
      "confidence": 98
    },
    "censusVillageCode": {
      "value": "211495",
      "rawText": "०२२८९०",
      "confidence": 96
    },
    "khasraNumber": {
      "value": "342/4",
      "rawText": "खसरा ३४२/४",
      "confidence": 95,
      "isHandwritten": false,
      "boundingBox": {
        "x": 38,
        "y": 16,
        "width": 22,
        "height": 6
      }
    },
    "khataNumber": {
      "value": "56/89",
      "rawText": "खाता ५६/८९",
      "confidence": 96,
      "isHandwritten": false,
      "boundingBox": {
        "x": 68,
        "y": 16,
        "width": 18,
        "height": 6
      }
    },
    "primaryOwnerName": {
      "value": "Dev Raj Thakur",
      "rawText": "देव राज ठाकुर",
      "confidence": 96,
      "isHandwritten": false,
      "boundingBox": {
        "x": 14,
        "y": 32,
        "width": 34,
        "height": 7
      }
    },
    "parentageOrSpouse": {
      "value": "Gian Chand Thakur",
      "rawText": "पुत्र ज्ञान चंद ठाकुर",
      "confidence": 94
    },
    "totalOwnersCount": 1,
    "coSharers": [],
    "landClassification": {
      "value": "Bakhal Awwal (Terraced Agricultural)",
      "rawText": "बाखल अव्वल कृषि",
      "confidence": 93
    },
    "irrigationSource": {
      "value": "Rainfed & Local Bawari Stream",
      "rawText": "प्राकृतिक बावड़ी जल",
      "confidence": 90
    },
    "totalAreaDeclared": {
      "value": 8,
      "rawText": "८ बीघा ० बिस्वा",
      "confidence": 95,
      "isHandwritten": false,
      "boundingBox": {
        "x": 14,
        "y": 52,
        "width": 26,
        "height": 6
      }
    },
    "declaredUnit": {
      "value": "BIGHA",
      "confidence": 99
    },
    "normalizedAreaSqMeters": 6475,
    "annualLandRevenue": {
      "value": 68.45,
      "rawText": "₹68.45",
      "confidence": 97
    },
    "encumbranceStatus": {
      "value": "CLEAR",
      "rawText": "साफ एवं निष्कंटक",
      "confidence": 98
    },
    "bankLienDetails": "No encumbrance reported",
    "mutations": [],
    "boundaries": {
      "north": "Khasra 341 (Panchayat land)",
      "south": "Gopalpur link road",
      "east": "Khasra 342/3 (Jai Ram Thakur)",
      "west": "Nallah stream"
    },
    "cadastralPolygon": [
      [
        76.73,
        31.7
      ],
      [
        76.734,
        31.7005
      ],
      [
        76.7335,
        31.697
      ],
      [
        76.7298,
        31.6968
      ]
    ],
    "preprocessingMetrics": {
      "deskewAngleDegrees": -2.64,
      "contrastScore": 66.9,
      "dpiEstimated": 284,
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
        "message": "Sole owner 8 Bigha verified against Himbhoomi portal."
      }
    ],
    "reviewHistory": [
      {
        "timestamp": "2026-06-13T12:16:00.000Z",
        "officerName": "Tehsildar Sarkaghat",
        "role": "REVENUE_OFFICER",
        "action": "Sanctioned & Digital Sign Attached"
      }
    ]
  },
  {
    "id": "REC-UK-USN-004",
    "documentNumber": "UK-USN-KAS-2024-KHT-184",
    "documentType": "KHASRA_KHATAUNI",
    "primaryLanguage": "hindi",
    "script": "Devanagari (देवनागरी)",
    "sourceFileName": "UK_USNagar_Kashipur_Kundeshwari_184.pdf",
    "sourceImageUrl": "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1200",
    "uploadedAt": "2026-06-14T20:39:00.000Z",
    "uploadedBy": "Naib Tehsildar P. C. Joshi (Kashipur)",
    "status": "VERIFIED_AND_SANCTIONED",
    "overallConfidence": 95.8,
    "state": {
      "value": "Uttarakhand",
      "rawText": "उत्तराखंड शासन - राजस्व विभाग",
      "confidence": 99
    },
    "district": {
      "value": "Udham Singh Nagar",
      "rawText": "ऊधम सिंह नगर",
      "confidence": 98
    },
    "tehsil": {
      "value": "Kashipur",
      "rawText": "काशीपुर",
      "confidence": 98
    },
    "village": {
      "value": "Kundeshwari",
      "rawText": "कुण्डेश्वरी",
      "confidence": 97
    },
    "censusVillageCode": {
      "value": "212234",
      "rawText": "०४५१०२",
      "confidence": 96
    },
    "khasraNumber": {
      "value": "186/3",
      "rawText": "खसरा सं. १८४/३",
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
      "value": "112",
      "rawText": "खाता सं. ११२",
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
      "value": "Harpreet Singh Cheema",
      "rawText": "हरप्रीत सिंह चीमा",
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
      "value": "Gurmukh Singh Cheema",
      "rawText": "आत्मज गुरमुख सिंह चीमा",
      "confidence": 95
    },
    "totalOwnersCount": 2,
    "coSharers": [
      {
        "id": "CS-UT-003",
        "name": "Harpreet Singh Cheema",
        "relation": "Bhumidhar with transferable rights",
        "shareFraction": "1/2",
        "shareAreaSqMeters": 10117,
        "panOrAadhaarRef": "XXXX-XXXX-1951"
      },
      {
        "id": "CS-UT-004",
        "name": "Manpreet Singh Cheema",
        "relation": "Brother / Co-Bhumidhar",
        "shareFraction": "1/2",
        "shareAreaSqMeters": 10117,
        "panOrAadhaarRef": "XXXX-XXXX-2268"
      }
    ],
    "landClassification": {
      "value": "Tarai Irrigated (Sinchit)",
      "rawText": "तराई सिंचित प्रथम",
      "confidence": 95
    },
    "irrigationSource": {
      "value": "Tumaria Dam Feeder Canal & Tubewell",
      "rawText": "तुमरिया बांध नहर व निजी नलकूप",
      "confidence": 93
    },
    "totalAreaDeclared": {
      "value": 2.0234,
      "rawText": "२.०२३४ हेक्टेयर (५ एकड़)",
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
    "normalizedAreaSqMeters": 20234,
    "annualLandRevenue": {
      "value": 76.4,
      "rawText": "₹76.40",
      "confidence": 97
    },
    "encumbranceStatus": {
      "value": "CLEAR",
      "rawText": "निष्कंटक / बेबाक",
      "confidence": 98
    },
    "bankLienDetails": "No active encumbrance on Devbhoomi portal register",
    "mutations": [
      {
        "mutationNumber": "MR-2024-5074",
        "dateOfOrder": "2024-03-11",
        "sanctioningOfficer": "Tehsildar Kashipur",
        "mutationType": "PARTITION",
        "transferor": "Gurmukh Singh Cheema (Father)",
        "transferee": "Harpreet & Manpreet Singh Cheema",
        "status": "SANCTIONED",
        "remarks": "Family settlement order passed under Section 116 UPZALR Act (adapted UK)"
      }
    ],
    "boundaries": {
      "north": "Khasra 183 (Jaswant Singh)",
      "south": "Canal distributary channel 4",
      "east": "Khasra 185 (Sukhdev Singh Dhillon)",
      "west": "Kundeshwari to Ramnagar state highway"
    },
    "cadastralPolygon": [
      [
        78.95,
        29.23
      ],
      [
        78.954,
        29.2305
      ],
      [
        78.9538,
        29.226
      ],
      [
        78.9495,
        29.2255
      ]
    ],
    "preprocessingMetrics": {
      "deskewAngleDegrees": -2.56,
      "contrastScore": 67.4,
      "dpiEstimated": 286,
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
        "message": "Equal co-bhumidhar shares match 2.0234 Hectares exactly."
      }
    ],
    "reviewHistory": [
      {
        "timestamp": "2026-06-15T00:39:00.000Z",
        "officerName": "Tehsildar Kashipur",
        "role": "REVENUE_OFFICER",
        "action": "Sanctioned & Digital Sign Attached"
      }
    ]
  },
  {
    "id": "REC-UK-DDN-005",
    "documentNumber": "UK-DDN-RIS-2024-KHT-429",
    "documentType": "KHASRA_KHATAUNI",
    "primaryLanguage": "hindi",
    "script": "Devanagari (देवनागरी)",
    "sourceFileName": "UK_Dehradun_Rishikesh_Raiwala_429.pdf",
    "sourceImageUrl": "https://images.unsplash.com/photo-1524813686514-a57563d77d66?auto=format&fit=crop&q=80&w=1200",
    "uploadedAt": "2026-06-16T08:17:00.000Z",
    "uploadedBy": "Patwari S. P. Negi (Raiwala Circle)",
    "status": "VERIFIED_AND_SANCTIONED",
    "overallConfidence": 96.1,
    "state": {
      "value": "Uttarakhand",
      "rawText": "उत्तराखंड शासन",
      "confidence": 99
    },
    "district": {
      "value": "Dehradun",
      "rawText": "देहरादून",
      "confidence": 98
    },
    "tehsil": {
      "value": "Rishikesh",
      "rawText": "ऋषिकेश",
      "confidence": 98
    },
    "village": {
      "value": "Raiwala",
      "rawText": "रायवाला",
      "confidence": 97
    },
    "censusVillageCode": {
      "value": "212973",
      "rawText": "०४३२२०",
      "confidence": 96
    },
    "khasraNumber": {
      "value": "429/1",
      "rawText": "खसरा ४२९/१",
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
      "value": "88",
      "rawText": "खाता संख्या ८८",
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
      "value": "Manoj Singh Rawat",
      "rawText": "मनोज सिंह रावत",
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
      "value": "Birender Singh Rawat",
      "rawText": "पुत्र बीरेन्द्र सिंह रावत",
      "confidence": 95
    },
    "totalOwnersCount": 1,
    "coSharers": [],
    "landClassification": {
      "value": "Doab Agricultural (Chahi / Sinchit)",
      "rawText": "कृषि भूमि सिंचित",
      "confidence": 94
    },
    "irrigationSource": {
      "value": "Song River Canal & Government Tubewell",
      "rawText": "सोंग नदी नहर व नलकूप",
      "confidence": 92
    },
    "totalAreaDeclared": {
      "value": 1.18,
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
    "normalizedAreaSqMeters": 11800,
    "annualLandRevenue": {
      "value": 84.35,
      "rawText": "₹84.35",
      "confidence": 97
    },
    "encumbranceStatus": {
      "value": "CLEAR",
      "rawText": "भारमुक्त",
      "confidence": 98
    },
    "bankLienDetails": "No mortgage or attachment registered",
    "mutations": [],
    "boundaries": {
      "north": "Khasra 428 (Gram Sabha pasture)",
      "south": "Rishikesh-Haridwar Railway Track buffer",
      "east": "Khasra 429/2 (Kundan Singh Negi)",
      "west": "Song River embankment bund"
    },
    "cadastralPolygon": [
      [
        78.22,
        30.01
      ],
      [
        78.2235,
        30.0104
      ],
      [
        78.223,
        30.007
      ],
      [
        78.2195,
        30.0068
      ]
    ],
    "preprocessingMetrics": {
      "deskewAngleDegrees": -2.48,
      "contrastScore": 67.9,
      "dpiEstimated": 288,
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
        "message": "Sole owner 1.1500 Hectares verified against Devbhoomi ROR."
      }
    ],
    "reviewHistory": [
      {
        "timestamp": "2026-06-16T12:17:00.000Z",
        "officerName": "SDM Rishikesh",
        "role": "REVENUE_OFFICER",
        "action": "Sanctioned & Digital Sign Attached"
      }
    ]
  },
  {
    "id": "REC-UK-HAR-006",
    "documentNumber": "UK-HAR-ROO-2024-KHT-301",
    "documentType": "KHASRA_KHATAUNI",
    "primaryLanguage": "hindi",
    "script": "Devanagari (देवनागरी)",
    "sourceFileName": "UK_Haridwar_Roorkee_Iqbalpur_301.pdf",
    "sourceImageUrl": "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&q=80&w=1200",
    "uploadedAt": "2026-06-17T20:40:00.000Z",
    "uploadedBy": "Lekhpal Rajesh Kumar (Iqbalpur)",
    "status": "NEEDS_REVIEW",
    "overallConfidence": 82.3,
    "state": {
      "value": "Uttarakhand",
      "rawText": "उत्तराखंड शासन",
      "confidence": 99
    },
    "district": {
      "value": "Haridwar",
      "rawText": "हरिद्वार",
      "confidence": 98
    },
    "tehsil": {
      "value": "Roorkee",
      "rawText": "रुड़की",
      "confidence": 98
    },
    "village": {
      "value": "Iqbalpur",
      "rawText": "इकबालपुर",
      "confidence": 97
    },
    "censusVillageCode": {
      "value": "213712",
      "rawText": "०४४६१०",
      "confidence": 95
    },
    "khasraNumber": {
      "value": "301/2",
      "rawText": "खसरा ३०१/२",
      "confidence": 83,
      "isHandwritten": true,
      "boundingBox": {
        "x": 36,
        "y": 18,
        "width": 22,
        "height": 6
      }
    },
    "khataNumber": {
      "value": "147",
      "rawText": "खाता १४५",
      "confidence": 88,
      "isHandwritten": false,
      "boundingBox": {
        "x": 66,
        "y": 18,
        "width": 18,
        "height": 6
      }
    },
    "primaryOwnerName": {
      "value": "Choudhary Arvind Tyagi",
      "rawText": "चौधरी अरविन्द त्यागी",
      "confidence": 85,
      "isHandwritten": true,
      "boundingBox": {
        "x": 14,
        "y": 34,
        "width": 38,
        "height": 7
      }
    },
    "parentageOrSpouse": {
      "value": "Dharampal Tyagi",
      "rawText": "पुत्र धर्मपाल त्यागी",
      "confidence": 84
    },
    "totalOwnersCount": 1,
    "coSharers": [],
    "landClassification": {
      "value": "Sugarcane Agro-Belt (Eekh / Sinchit)",
      "rawText": "गन्ना कृषि भूमि सिंचित",
      "confidence": 86
    },
    "irrigationSource": {
      "value": "Upper Ganga Canal Branch & Tubewell",
      "rawText": "ऊपरी गंगा नहर व निजी नलकूप",
      "confidence": 85
    },
    "totalAreaDeclared": {
      "value": 1.82,
      "rawText": "१.८००० हेक्टेयर",
      "confidence": 82,
      "isHandwritten": true,
      "boundingBox": {
        "x": 14,
        "y": 54,
        "width": 26,
        "height": 6
      }
    },
    "declaredUnit": {
      "value": "HECTARE",
      "confidence": 99
    },
    "normalizedAreaSqMeters": 18200,
    "annualLandRevenue": {
      "value": 92.3,
      "rawText": "₹92.30",
      "confidence": 97
    },
    "encumbranceStatus": {
      "value": "MORTGAGED",
      "rawText": "बंधक पंजाब नेशनल बैंक इकबालपुर ₹4,50,000",
      "confidence": 77,
      "isHandwritten": true,
      "isFlagged": true,
      "flagReason": "Tractor loan charge registered by PNB Iqbalpur"
    },
    "bankLienDetails": "Punjab National Bank Iqbalpur branch charge registered on 2023-01-18 for agricultural equipment finance",
    "mutations": [],
    "boundaries": {
      "north": "Khasra 300 (Sugar Mill access road)",
      "south": "Upper Ganga canal feeder minor",
      "east": "Khasra 301/1 (Satender Tyagi)",
      "west": "Village Chak Road"
    },
    "cadastralPolygon": [
      [
        77.92,
        29.85
      ],
      [
        77.924,
        29.8505
      ],
      [
        77.9235,
        29.847
      ],
      [
        77.9195,
        29.8468
      ]
    ],
    "preprocessingMetrics": {
      "deskewAngleDegrees": -2.4,
      "contrastScore": 68.3,
      "dpiEstimated": 290,
      "binarizationMethod": "Otsu",
      "noiseReductionApplied": true
    },
    "validationResults": [
      {
        "ruleId": "VR-04-FLAG",
        "ruleName": "Bank Encumbrance Verification",
        "category": "LEGAL",
        "passed": false,
        "severity": "WARNING",
        "message": "Active bank mortgage requires Bank NOC."
      }
    ],
    "reviewHistory": [
      {
        "timestamp": "2026-06-18T00:40:00.000Z",
        "officerName": "AI OCR Pipeline v3.8",
        "role": "VERIFICATION_SPECIALIST",
        "action": "Ingested & Flagged for Bank Lien"
      }
    ]
  },
  {
    "id": "REC-PB-LDH-007",
    "documentNumber": "PB-LDH-JAG-2024-JAM-411",
    "documentType": "JAMABANDI",
    "primaryLanguage": "punjabi",
    "script": "Gurmukhi (ਗੁਰਮੁਖੀ)",
    "sourceFileName": "PB_Ludhiana_Jagraon_KotheSherjang_411.pdf",
    "sourceImageUrl": "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&q=80&w=1200",
    "uploadedAt": "2026-06-19T08:18:00.000Z",
    "uploadedBy": "Patwari Harjit Singh (Jagraon Tehsil)",
    "status": "NEEDS_REVIEW",
    "overallConfidence": 79.4,
    "state": {
      "value": "Punjab",
      "rawText": "ਸਰਕਾਰ ਪੰਜਾਬ - ਮਾਲ ਵਿਭਾਗ",
      "confidence": 99
    },
    "district": {
      "value": "Ludhiana",
      "rawText": "ਲੁਧਿਆਣਾ",
      "confidence": 98
    },
    "tehsil": {
      "value": "Jagraon",
      "rawText": "ਜਗਰਾਉਂ",
      "confidence": 97
    },
    "village": {
      "value": "Kothe Sherjang",
      "rawText": "ਕੋਠੇ ਸ਼ੇਰਜੰਗ",
      "confidence": 98
    },
    "censusVillageCode": {
      "value": "214451",
      "rawText": "੦੩੧੨੦੫",
      "confidence": 96
    },
    "khasraNumber": {
      "value": "41//12/2",
      "rawText": "ਖਸਰਾ ਨੰ. ੪੧//੧੨/੨",
      "confidence": 82,
      "isHandwritten": true,
      "boundingBox": {
        "x": 38,
        "y": 16,
        "width": 24,
        "height": 6
      },
      "isFlagged": true,
      "flagReason": "Sub-murabba parcel fraction contains ambiguous handwritten stroke"
    },
    "khataNumber": {
      "value": "218/304",
      "rawText": "ਖੇਵਟ/ਖਤੌਨੀ ਨੰ. ੨੧੮/੩੦੪",
      "confidence": 89,
      "isHandwritten": false,
      "boundingBox": {
        "x": 68,
        "y": 16,
        "width": 22,
        "height": 6
      }
    },
    "subDivisionNumber": {
      "value": "12/2",
      "rawText": "ਕਿਲ੍ਹਾ ੧੨/੨",
      "confidence": 85
    },
    "primaryOwnerName": {
      "value": "Gurpreet Singh Sandhu",
      "rawText": "ਗੁਰਪ੍ਰੀਤ ਸਿੰਘ ਸੰਧੂ",
      "confidence": 91,
      "isHandwritten": false,
      "boundingBox": {
        "x": 12,
        "y": 38,
        "width": 34,
        "height": 7
      }
    },
    "parentageOrSpouse": {
      "value": "Baldev Singh Sandhu",
      "rawText": "ਪੁੱਤਰ ਬਲਦੇਵ ਸਿੰਘ ਸੰਧੂ",
      "confidence": 89
    },
    "totalOwnersCount": 2,
    "coSharers": [
      {
        "id": "CS-PU-005",
        "name": "Gurpreet Singh Sandhu",
        "relation": "Son / Joint Owner",
        "shareFraction": "1/2",
        "shareAreaSqMeters": 8397.2,
        "panOrAadhaarRef": "XXXX-XXXX-2585"
      },
      {
        "id": "CS-PU-006",
        "name": "Balwinder Kaur Sandhu",
        "relation": "Wife / Joint Owner",
        "shareFraction": "1/2",
        "shareAreaSqMeters": 8397.2,
        "panOrAadhaarRef": "XXXX-XXXX-2902"
      }
    ],
    "landClassification": {
      "value": "Nehri / Chahi (Canal & Tubewell Irrigated)",
      "rawText": "ਨਹਿਰੀ / ਚਾਹੀ ਖੇਤੀਬਾੜੀ",
      "confidence": 88
    },
    "irrigationSource": {
      "value": "Sirhind Canal Minor & Electric Tubewell",
      "rawText": "ਸਰਹਿੰਦ ਨਹਿਰ ਖਾਲ਼ਾ ਤੇ ਟਿਊਬਵੈੱਲ",
      "confidence": 87
    },
    "totalAreaDeclared": {
      "value": 4.15,
      "rawText": "੪ ਏਕੜ (੩੨ ਕਨਾਲ - ੦ ਮਰਲਾ)",
      "confidence": 81,
      "isHandwritten": true,
      "boundingBox": {
        "x": 12,
        "y": 56,
        "width": 30,
        "height": 7
      }
    },
    "declaredUnit": {
      "value": "ACRE",
      "confidence": 99
    },
    "normalizedAreaSqMeters": 16794.4,
    "annualLandRevenue": {
      "value": 100.25,
      "rawText": "₹100.25",
      "confidence": 97
    },
    "encumbranceStatus": {
      "value": "COURT_STAY",
      "rawText": "ਅਦਾਲਤੀ ਰੋਕ / ਸਿਵਲ ਮੁਕੱਦਮਾ ਨੰ. ੪੧/੨੦੨੩",
      "confidence": 68,
      "isHandwritten": true,
      "isFlagged": true,
      "flagReason": "Red-ink marginal note indicates stay order by Civil Court Jagraon"
    },
    "bankLienDetails": "Civil Suit No. 41/2023 pending before Senior Sub-Judge Jagraon regarding partition dispute",
    "mutations": [
      {
        "mutationNumber": "MR-2024-5111",
        "dateOfOrder": "2024-04-08",
        "sanctioningOfficer": "Tehsildar Jagraon",
        "mutationType": "INHERITANCE",
        "transferor": "Late Baldev Singh Sandhu",
        "transferee": "Gurpreet Singh Sandhu",
        "status": "DISPUTED",
        "remarks": "Contested by sibling Amarjit Singh in court"
      }
    ],
    "boundaries": {
      "north": "Killa 41//11 (Sukhjit Singh)",
      "south": "Village Link PWD Road to GT Road",
      "east": "Killa 41//13 (Watercourse / Khala)",
      "west": "Killa 41//12/1 (Amarjit Singh)"
    },
    "cadastralPolygon": [
      [
        75.48,
        30.79
      ],
      [
        75.484,
        30.7904
      ],
      [
        75.4835,
        30.7865
      ],
      [
        75.4795,
        30.7862
      ]
    ],
    "preprocessingMetrics": {
      "deskewAngleDegrees": -2.32,
      "contrastScore": 68.8,
      "dpiEstimated": 292,
      "binarizationMethod": "AdaptiveGaussian",
      "noiseReductionApplied": false
    },
    "validationResults": [
      {
        "ruleId": "VR-02-CDB",
        "ruleName": "DILRMP Central Registry Cross-Check",
        "category": "CROSS_DB",
        "passed": false,
        "severity": "CRITICAL",
        "message": "Status mismatch: Central database flags pending partition dispute (Civil Suit 41/2023)."
      }
    ],
    "reviewHistory": [
      {
        "timestamp": "2026-06-19T12:18:00.000Z",
        "officerName": "AI OCR Pipeline v3.8",
        "role": "VERIFICATION_SPECIALIST",
        "action": "Ingested & Flagged for Legal Check"
      }
    ]
  },
  {
    "id": "REC-PB-ASR-008",
    "documentNumber": "PB-ASR-AJN-2024-JAM-885",
    "documentType": "JAMABANDI",
    "primaryLanguage": "punjabi",
    "script": "Gurmukhi (ਗੁਰਮੁਖੀ)",
    "sourceFileName": "PB_Amritsar_Ajnala_Ramdas_885.pdf",
    "sourceImageUrl": "https://images.unsplash.com/photo-1498084393753-b411b2d26b34?auto=format&fit=crop&q=80&w=1200",
    "uploadedAt": "2026-06-20T20:41:00.000Z",
    "uploadedBy": "Kanungo Sukhchain Singh (Ajnala)",
    "status": "VERIFIED_AND_SANCTIONED",
    "overallConfidence": 96.7,
    "state": {
      "value": "Punjab",
      "rawText": "ਪੰਜਾਬ ਸਰਕਾਰ",
      "confidence": 99
    },
    "district": {
      "value": "Amritsar",
      "rawText": "ਅੰਮ੍ਰਿਤਸਰ",
      "confidence": 98
    },
    "tehsil": {
      "value": "Ajnala",
      "rawText": "ਅਜਨਾਲਾ",
      "confidence": 98
    },
    "village": {
      "value": "Ramdas",
      "rawText": "ਰਾਮਦਾਸ",
      "confidence": 97
    },
    "censusVillageCode": {
      "value": "215190",
      "rawText": "੦੩੦੪੫੦",
      "confidence": 96
    },
    "khasraNumber": {
      "value": "88//5/1",
      "rawText": "ਖਸਰਾ ੮੮//੫/੧",
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
      "value": "144",
      "rawText": "ਖੇਵਟ ੧੪੨",
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
      "value": "Harbhajan Singh Dhillon",
      "rawText": "ਹਰਭਜਨ ਸਿੰਘ ਢਿੱਲੋਂ",
      "confidence": 98,
      "isHandwritten": false,
      "boundingBox": {
        "x": 12,
        "y": 34,
        "width": 36,
        "height": 7
      }
    },
    "parentageOrSpouse": {
      "value": "Kartar Singh Dhillon",
      "rawText": "ਪੁੱਤਰ ਕਰਤਾਰ ਸਿੰਘ ਢਿੱਲੋਂ",
      "confidence": 96
    },
    "totalOwnersCount": 1,
    "coSharers": [],
    "landClassification": {
      "value": "Chahi (Borewell Irrigated)",
      "rawText": "ਚਾਹੀ ਖੇਤੀਬਾੜੀ",
      "confidence": 95
    },
    "irrigationSource": {
      "value": "Solar Powered Deep Tubewell",
      "rawText": "ਸੋਲਰ ਟਿਊਬਵੈੱਲ",
      "confidence": 93
    },
    "totalAreaDeclared": {
      "value": 3.55,
      "rawText": "੩.੫ ਏਕੜ (੨੮ ਕਨਾਲ)",
      "confidence": 97,
      "isHandwritten": false,
      "boundingBox": {
        "x": 12,
        "y": 52,
        "width": 28,
        "height": 6
      }
    },
    "declaredUnit": {
      "value": "ACRE",
      "confidence": 99
    },
    "normalizedAreaSqMeters": 14366.4,
    "annualLandRevenue": {
      "value": 112.75,
      "rawText": "₹112.75",
      "confidence": 97
    },
    "encumbranceStatus": {
      "value": "CLEAR",
      "rawText": "ਸਾਫ ਰਿਕਾਰਡ",
      "confidence": 98
    },
    "bankLienDetails": "No bank lien or encumbrance registered",
    "mutations": [],
    "boundaries": {
      "north": "Killa 88//4 (Gurbax Singh)",
      "south": "Ravi river secondary bund",
      "east": "Killa 88//5/2 (Joginder Singh)",
      "west": "Village Chak Road"
    },
    "cadastralPolygon": [
      [
        74.92,
        31.96
      ],
      [
        74.924,
        31.9605
      ],
      [
        74.9235,
        31.957
      ],
      [
        74.9195,
        31.9568
      ]
    ],
    "preprocessingMetrics": {
      "deskewAngleDegrees": -2.24,
      "contrastScore": 69.3,
      "dpiEstimated": 294,
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
        "message": "Sole owner 3.5 Acres verified against PLRS portal."
      }
    ],
    "reviewHistory": [
      {
        "timestamp": "2026-06-21T00:41:00.000Z",
        "officerName": "Tehsildar Ajnala",
        "role": "REVENUE_OFFICER",
        "action": "Sanctioned & Digital Sign Attached"
      }
    ]
  },
  {
    "id": "REC-PB-JAL-009",
    "documentNumber": "PB-JAL-PHI-2024-JAM-192",
    "documentType": "JAMABANDI",
    "primaryLanguage": "punjabi",
    "script": "Gurmukhi (ਗੁਰਮੁਖੀ)",
    "sourceFileName": "PB_Jalandhar_Phillaur_Apra_192.pdf",
    "sourceImageUrl": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200",
    "uploadedAt": "2026-06-22T08:19:00.000Z",
    "uploadedBy": "Patwari Kulwant Rai (Apra)",
    "status": "VERIFIED_AND_SANCTIONED",
    "overallConfidence": 95.4,
    "state": {
      "value": "Punjab",
      "rawText": "ਪੰਜਾਬ ਸਰਕਾਰ",
      "confidence": 99
    },
    "district": {
      "value": "Jalandhar",
      "rawText": "ਜਲੰਧਰ",
      "confidence": 98
    },
    "tehsil": {
      "value": "Phillaur",
      "rawText": "ਫਿਲੌਰ",
      "confidence": 97
    },
    "village": {
      "value": "Apra",
      "rawText": "ਅਪਰਾ",
      "confidence": 98
    },
    "censusVillageCode": {
      "value": "215929",
      "rawText": "੦੩੧੮੯੦",
      "confidence": 96
    },
    "khasraNumber": {
      "value": "19//22",
      "rawText": "ਖਸਰਾ ੧੯//੨੨",
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
      "value": "97",
      "rawText": "ਖੇਵਟ ੯੭",
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
      "value": "Jaswinder Kaur",
      "rawText": "ਜਸਵਿੰਦਰ ਕੌਰ",
      "confidence": 96,
      "isHandwritten": false,
      "boundingBox": {
        "x": 12,
        "y": 34,
        "width": 32,
        "height": 7
      }
    },
    "parentageOrSpouse": {
      "value": "W/o Late Sukhwinder Singh Johal",
      "rawText": "ਪਤਨੀ ਸਵਰਗੀ ਸੁਖਵਿੰਦਰ ਸਿੰਘ ਜੌਹਲ",
      "confidence": 94
    },
    "totalOwnersCount": 1,
    "coSharers": [],
    "landClassification": {
      "value": "Nehri / Chahi (Double Cropped)",
      "rawText": "ਨਹਿਰੀ ਦੋ ਫ਼ਸਲੀ",
      "confidence": 94
    },
    "irrigationSource": {
      "value": "Bist Doab Canal Sub-Minor",
      "rawText": "ਬਿਸਤ ਦੁਆਬ ਨਹਿਰ",
      "confidence": 91
    },
    "totalAreaDeclared": {
      "value": 2.25,
      "rawText": "੨.੨੫ ਏਕੜ (੧੮ ਕਨਾਲ)",
      "confidence": 95,
      "isHandwritten": false,
      "boundingBox": {
        "x": 12,
        "y": 52,
        "width": 26,
        "height": 6
      }
    },
    "declaredUnit": {
      "value": "ACRE",
      "confidence": 99
    },
    "normalizedAreaSqMeters": 9105.4,
    "annualLandRevenue": {
      "value": 120.7,
      "rawText": "₹120.70",
      "confidence": 97
    },
    "encumbranceStatus": {
      "value": "CLEAR",
      "rawText": "ਨਿਰੋਲ",
      "confidence": 98
    },
    "bankLienDetails": "Clear title, no mortgage recorded",
    "mutations": [],
    "boundaries": {
      "north": "Killa 19//21 (Tarsem Lal)",
      "south": "Apra to Phillaur road",
      "east": "Killa 19//23 (Mohan Singh)",
      "west": "Panchayat water channel"
    },
    "cadastralPolygon": [
      [
        75.9,
        31.14
      ],
      [
        75.9035,
        31.1404
      ],
      [
        75.903,
        31.137
      ],
      [
        75.8995,
        31.1368
      ]
    ],
    "preprocessingMetrics": {
      "deskewAngleDegrees": -2.16,
      "contrastScore": 69.8,
      "dpiEstimated": 296,
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
        "message": "Sole owner 2.25 Acres validated."
      }
    ],
    "reviewHistory": [
      {
        "timestamp": "2026-06-22T12:19:00.000Z",
        "officerName": "Tehsildar Phillaur",
        "role": "REVENUE_OFFICER",
        "action": "Sanctioned & Digital Sign Attached"
      }
    ]
  },
  {
    "id": "REC-HR-KAR-010",
    "documentNumber": "HR-KAR-NIL-2024-JAM-152",
    "documentType": "JAMABANDI",
    "primaryLanguage": "hindi",
    "script": "Devanagari (देवनागरी)",
    "sourceFileName": "HR_Karnal_Nilokheri_Taraori_152.pdf",
    "sourceImageUrl": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=1200",
    "uploadedAt": "2026-06-23T20:42:00.000Z",
    "uploadedBy": "Patwari Rakesh Kumar (Taraori)",
    "status": "VERIFIED_AND_SANCTIONED",
    "overallConfidence": 96.4,
    "state": {
      "value": "Haryana",
      "rawText": "हरियाणा सरकार - राजस्व विभाग",
      "confidence": 99
    },
    "district": {
      "value": "Karnal",
      "rawText": "करनाल",
      "confidence": 98
    },
    "tehsil": {
      "value": "Nilokheri",
      "rawText": "नीलोखेड़ी",
      "confidence": 98
    },
    "village": {
      "value": "Taraori",
      "rawText": "तरावड़ी",
      "confidence": 97
    },
    "censusVillageCode": {
      "value": "216668",
      "rawText": "०३६७२०",
      "confidence": 96
    },
    "khasraNumber": {
      "value": "152//8",
      "rawText": "खसरा १५२//८",
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
      "value": "312",
      "rawText": "खेवट ३१२",
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
      "value": "Ranbir Singh Hooda",
      "rawText": "रणबीर सिंह हुड्डा",
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
      "value": "Ramkishan Hooda",
      "rawText": "पुत्र रामकिशन हुड्डा",
      "confidence": 95
    },
    "totalOwnersCount": 1,
    "coSharers": [],
    "landClassification": {
      "value": "Basmati Paddy Agricultural (Nahri / Tubewell)",
      "rawText": "नहरी बासमती कृषि भूमि",
      "confidence": 95
    },
    "irrigationSource": {
      "value": "Western Jamuna Canal & Deep Tubewell",
      "rawText": "पश्चिमी यमुना नहर व नलकूप",
      "confidence": 93
    },
    "totalAreaDeclared": {
      "value": 5.25,
      "rawText": "५ एकड़ (४० कनाल)",
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
      "value": "ACRE",
      "confidence": 99
    },
    "normalizedAreaSqMeters": 21246,
    "annualLandRevenue": {
      "value": 128.65,
      "rawText": "₹128.65",
      "confidence": 97
    },
    "encumbranceStatus": {
      "value": "CLEAR",
      "rawText": "भारमुक्त",
      "confidence": 98
    },
    "bankLienDetails": "No encumbrance on Jamabandi portal",
    "mutations": [],
    "boundaries": {
      "north": "Killa 152//7 (Dharampal Hooda)",
      "south": "Taraori to Karnal grain market road",
      "east": "Canal minor channel",
      "west": "Killa 152//9 (Krishan Kumar)"
    },
    "cadastralPolygon": [
      [
        76.92,
        29.8
      ],
      [
        76.9245,
        29.8005
      ],
      [
        76.924,
        29.796
      ],
      [
        76.9195,
        29.7958
      ]
    ],
    "preprocessingMetrics": {
      "deskewAngleDegrees": -2.08,
      "contrastScore": 70.2,
      "dpiEstimated": 298,
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
        "message": "Sole owner 5 Acres matches Jamabandi portal record."
      }
    ],
    "reviewHistory": [
      {
        "timestamp": "2026-06-24T00:42:00.000Z",
        "officerName": "Tehsildar Nilokheri",
        "role": "REVENUE_OFFICER",
        "action": "Sanctioned & Digital Sign Attached"
      }
    ]
  },
  {
    "id": "REC-HR-SNP-011",
    "documentNumber": "HR-SNP-GAN-2024-JAM-094",
    "documentType": "JAMABANDI",
    "primaryLanguage": "hindi",
    "script": "Devanagari (देवनागरी)",
    "sourceFileName": "HR_Sonipat_Gannaur_Ghasauli_094.pdf",
    "sourceImageUrl": "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=1200",
    "uploadedAt": "2026-06-25T08:20:00.000Z",
    "uploadedBy": "Patwari Sunil Dahiya (Gannaur)",
    "status": "VERIFIED_AND_SANCTIONED",
    "overallConfidence": 95.9,
    "state": {
      "value": "Haryana",
      "rawText": "हरियाणा सरकार",
      "confidence": 99
    },
    "district": {
      "value": "Sonipat",
      "rawText": "सोनीपत",
      "confidence": 98
    },
    "tehsil": {
      "value": "Gannaur",
      "rawText": "गन्नौर",
      "confidence": 98
    },
    "village": {
      "value": "Ghasauli",
      "rawText": "घसौली",
      "confidence": 97
    },
    "censusVillageCode": {
      "value": "217407",
      "rawText": "०३८९१०",
      "confidence": 96
    },
    "khasraNumber": {
      "value": "94//14/1",
      "rawText": "खसरा ९४//१४/१",
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
      "value": "188",
      "rawText": "खेवट १८८",
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
      "value": "Satish Kumar Dahiya",
      "rawText": "सतीश कुमार दहिया",
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
      "value": "Ishwar Singh Dahiya",
      "rawText": "पुत्र ईश्वर सिंह दहिया",
      "confidence": 95
    },
    "totalOwnersCount": 1,
    "coSharers": [],
    "landClassification": {
      "value": "Agricultural / Horticulture (Vegetable Belt)",
      "rawText": "सब्जी उत्पादन कृषि भूमि",
      "confidence": 94
    },
    "irrigationSource": {
      "value": "Drip Irrigation & Government Tubewell",
      "rawText": "टपक सिंचाई व नलकूप",
      "confidence": 92
    },
    "totalAreaDeclared": {
      "value": 3.12,
      "rawText": "३ एकड़ (२४ कनाल)",
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
      "value": "ACRE",
      "confidence": 99
    },
    "normalizedAreaSqMeters": 12626.2,
    "annualLandRevenue": {
      "value": 136.6,
      "rawText": "₹136.60",
      "confidence": 97
    },
    "encumbranceStatus": {
      "value": "CLEAR",
      "rawText": "साफ",
      "confidence": 98
    },
    "bankLienDetails": "No active lien",
    "mutations": [],
    "boundaries": {
      "north": "Killa 94//13 (Bijender Dahiya)",
      "south": "Gannaur-Sonipat link road",
      "east": "Killa 94//14/2 (Subhash Dahiya)",
      "west": "Panchayat water channel"
    },
    "cadastralPolygon": [
      [
        77.08,
        29.13
      ],
      [
        77.0835,
        29.1305
      ],
      [
        77.083,
        29.127
      ],
      [
        77.0795,
        29.1268
      ]
    ],
    "preprocessingMetrics": {
      "deskewAngleDegrees": -2,
      "contrastScore": 70.7,
      "dpiEstimated": 300,
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
        "message": "Sole owner 3 Acres verified."
      }
    ],
    "reviewHistory": [
      {
        "timestamp": "2026-06-25T12:20:00.000Z",
        "officerName": "Tehsildar Gannaur",
        "role": "REVENUE_OFFICER",
        "action": "Sanctioned & Digital Sign Attached"
      }
    ]
  },
  {
    "id": "REC-HR-KUR-012",
    "documentNumber": "HR-KUR-THA-2024-JAM-206",
    "documentType": "JAMABANDI",
    "primaryLanguage": "hindi",
    "script": "Devanagari (देवनागरी)",
    "sourceFileName": "HR_Kurukshetra_Thanesar_Amin_206.pdf",
    "sourceImageUrl": "https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&q=80&w=1200",
    "uploadedAt": "2026-06-26T20:43:00.000Z",
    "uploadedBy": "Kanungo Om Prakash (Thanesar)",
    "status": "VERIFIED_AND_SANCTIONED",
    "overallConfidence": 95.1,
    "state": {
      "value": "Haryana",
      "rawText": "हरियाणा सरकार",
      "confidence": 99
    },
    "district": {
      "value": "Kurukshetra",
      "rawText": "कुरुक्षेत्र",
      "confidence": 98
    },
    "tehsil": {
      "value": "Thanesar",
      "rawText": "थानेसर",
      "confidence": 98
    },
    "village": {
      "value": "Amin",
      "rawText": "अमीन",
      "confidence": 97
    },
    "censusVillageCode": {
      "value": "218146",
      "rawText": "०३७१४०",
      "confidence": 96
    },
    "khasraNumber": {
      "value": "206//3",
      "rawText": "खसरा २०६//३",
      "confidence": 95,
      "isHandwritten": false,
      "boundingBox": {
        "x": 38,
        "y": 16,
        "width": 22,
        "height": 6
      }
    },
    "khataNumber": {
      "value": "405",
      "rawText": "खेवट ४०५",
      "confidence": 96,
      "isHandwritten": false,
      "boundingBox": {
        "x": 68,
        "y": 16,
        "width": 18,
        "height": 6
      }
    },
    "primaryOwnerName": {
      "value": "Kuldeep Singh Saini",
      "rawText": "कुलदीप सिंह सैनी",
      "confidence": 96,
      "isHandwritten": false,
      "boundingBox": {
        "x": 14,
        "y": 32,
        "width": 34,
        "height": 7
      }
    },
    "parentageOrSpouse": {
      "value": "Bhagat Ram Saini",
      "rawText": "पुत्र भगत राम सैनी",
      "confidence": 94
    },
    "totalOwnersCount": 1,
    "coSharers": [],
    "landClassification": {
      "value": "Chahi Wheat & Mustard Agro-Plot",
      "rawText": "चाही गेहूं व सरसों कृषि भूमि",
      "confidence": 93
    },
    "irrigationSource": {
      "value": "Electric Tubewell & Saraswati Minor",
      "rawText": "सरस्वती माइनर व नलकूप",
      "confidence": 91
    },
    "totalAreaDeclared": {
      "value": 2.65,
      "rawText": "२.५ एकड़ (२० कनाल)",
      "confidence": 95,
      "isHandwritten": false,
      "boundingBox": {
        "x": 14,
        "y": 52,
        "width": 26,
        "height": 6
      }
    },
    "declaredUnit": {
      "value": "ACRE",
      "confidence": 99
    },
    "normalizedAreaSqMeters": 10724.2,
    "annualLandRevenue": {
      "value": 144.55,
      "rawText": "₹144.55",
      "confidence": 97
    },
    "encumbranceStatus": {
      "value": "CLEAR",
      "rawText": "निष्कंटक",
      "confidence": 98
    },
    "bankLienDetails": "No encumbrance reported",
    "mutations": [],
    "boundaries": {
      "north": "Killa 206//2 (Raj Kumar Saini)",
      "south": "Amin link road",
      "east": "Killa 206//4 (Pala Ram)",
      "west": "Chak road"
    },
    "cadastralPolygon": [
      [
        76.85,
        29.93
      ],
      [
        76.8535,
        29.9304
      ],
      [
        76.853,
        29.927
      ],
      [
        76.8495,
        29.9268
      ]
    ],
    "preprocessingMetrics": {
      "deskewAngleDegrees": -1.92,
      "contrastScore": 71.2,
      "dpiEstimated": 302,
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
        "message": "Sole owner 2.5 Acres validated against Haryana Jamabandi."
      }
    ],
    "reviewHistory": [
      {
        "timestamp": "2026-06-27T00:43:00.000Z",
        "officerName": "Tehsildar Thanesar",
        "role": "REVENUE_OFFICER",
        "action": "Sanctioned & Digital Sign Attached"
      }
    ]
  },
  {
    "id": "REC-UP-LKO-013",
    "documentNumber": "UP-LKO-BAK-2024-KHT-512",
    "documentType": "KHASRA_KHATAUNI",
    "primaryLanguage": "hindi",
    "script": "Devanagari (देवनागरी)",
    "sourceFileName": "UP_Lucknow_BakshiKaTalab_Kathwara_512.pdf",
    "sourceImageUrl": "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&q=80&w=1200",
    "uploadedAt": "2026-06-28T08:21:00.000Z",
    "uploadedBy": "Lekhpal Anil Kumar Mishra (Kathwara Circle)",
    "status": "VERIFIED_AND_SANCTIONED",
    "overallConfidence": 97.1,
    "state": {
      "value": "Uttar Pradesh",
      "rawText": "उत्तर प्रदेश शासन - राजस्व परिषद",
      "confidence": 99
    },
    "district": {
      "value": "Lucknow",
      "rawText": "लखनऊ",
      "confidence": 98
    },
    "tehsil": {
      "value": "Bakshi Ka Talab",
      "rawText": "बख्शी का तालाब",
      "confidence": 98
    },
    "village": {
      "value": "Kathwara",
      "rawText": "कठवारा",
      "confidence": 97
    },
    "censusVillageCode": {
      "value": "218885",
      "rawText": "१४२१०४",
      "confidence": 96
    },
    "khasraNumber": {
      "value": "512/2",
      "rawText": "गाटा संख्या ५१२/२",
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
      "value": "1042",
      "rawText": "खाता संख्या १०४२",
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
      "value": "Rameshwar Nath Tiwari",
      "rawText": "रामेश्वर नाथ तिवारी",
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
      "value": "Pandit Badri Nath Tiwari",
      "rawText": "आत्मज पं. बद्री नाथ तिवारी",
      "confidence": 96
    },
    "totalOwnersCount": 2,
    "coSharers": [
      {
        "id": "CS-UT-007",
        "name": "Rameshwar Nath Tiwari",
        "relation": "Bhumidhar with transferable rights",
        "shareFraction": "1/2",
        "shareAreaSqMeters": 6900,
        "panOrAadhaarRef": "XXXX-XXXX-3219"
      },
      {
        "id": "CS-UT-008",
        "name": "Shyam Sundar Tiwari",
        "relation": "Brother / Co-Bhumidhar",
        "shareFraction": "1/2",
        "shareAreaSqMeters": 6900,
        "panOrAadhaarRef": "XXXX-XXXX-3536"
      }
    ],
    "landClassification": {
      "value": "Sinchit Multi-Crop Agro Land",
      "rawText": "कृषि भूमि सिंचित बहुफसली",
      "confidence": 95
    },
    "irrigationSource": {
      "value": "Sharda Sahayak Feeder Canal & Private Borewell",
      "rawText": "शारदा सहायक नहर व निजी नलकूप",
      "confidence": 93
    },
    "totalAreaDeclared": {
      "value": 1.38,
      "rawText": "१.३५०० हेक्टेयर",
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
    "normalizedAreaSqMeters": 13800,
    "annualLandRevenue": {
      "value": 152.5,
      "rawText": "₹152.50",
      "confidence": 97
    },
    "encumbranceStatus": {
      "value": "CLEAR",
      "rawText": "भारमुक्त / बेबाक",
      "confidence": 98
    },
    "bankLienDetails": "No bank mortgage or government dues registered on UP Bhulekh",
    "mutations": [
      {
        "mutationNumber": "MR-2024-5148",
        "dateOfOrder": "2024-05-06",
        "sanctioningOfficer": "Tehsildar BKT",
        "mutationType": "INHERITANCE",
        "transferor": "Late Badri Nath Tiwari",
        "transferee": "Rameshwar Nath & Shyam Sundar Tiwari",
        "status": "SANCTIONED",
        "remarks": "Wirasat order passed under Section 33 UP Revenue Code 2006"
      }
    ],
    "boundaries": {
      "north": "Gata 511 (Gram Sabha road)",
      "south": "Gata 513 (Durga Prasad Verma)",
      "east": "Canal distributary channel 2",
      "west": "Gata 512/1 (Devi Dayal Tiwari)"
    },
    "cadastralPolygon": [
      [
        80.91,
        26.98
      ],
      [
        80.914,
        26.9805
      ],
      [
        80.9135,
        26.977
      ],
      [
        80.9095,
        26.9768
      ]
    ],
    "preprocessingMetrics": {
      "deskewAngleDegrees": -1.84,
      "contrastScore": 71.6,
      "dpiEstimated": 304,
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
        "message": "Bhumidhar shares equal declared 1.3500 Hectares (13,500 sq.m)."
      }
    ],
    "reviewHistory": [
      {
        "timestamp": "2026-06-28T12:21:00.000Z",
        "officerName": "Tehsildar BKT",
        "role": "REVENUE_OFFICER",
        "action": "Sanctioned & Digital Sign Attached"
      }
    ]
  },
  {
    "id": "REC-UP-VAR-014",
    "documentNumber": "UP-VAR-PIN-2024-KHT-319",
    "documentType": "KHASRA_KHATAUNI",
    "primaryLanguage": "hindi",
    "script": "Devanagari (देवनागरी)",
    "sourceFileName": "UP_Varanasi_Pindra_Babepur_319.pdf",
    "sourceImageUrl": "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=1200",
    "uploadedAt": "2026-06-29T20:44:00.000Z",
    "uploadedBy": "Lekhpal Shambhu Nath (Babepur)",
    "status": "VERIFIED_AND_SANCTIONED",
    "overallConfidence": 96.3,
    "state": {
      "value": "Uttar Pradesh",
      "rawText": "उत्तर प्रदेश शासन",
      "confidence": 99
    },
    "district": {
      "value": "Varanasi",
      "rawText": "वाराणसी",
      "confidence": 98
    },
    "tehsil": {
      "value": "Pindra",
      "rawText": "पिंडरा",
      "confidence": 98
    },
    "village": {
      "value": "Babepur",
      "rawText": "बाबेपुर",
      "confidence": 97
    },
    "censusVillageCode": {
      "value": "219624",
      "rawText": "१४५९२०",
      "confidence": 96
    },
    "khasraNumber": {
      "value": "319/1",
      "rawText": "गाटा संख्या ३१९/१",
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
      "value": "650",
      "rawText": "खाता ६५०",
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
      "value": "Dharmendra Kumar Maurya",
      "rawText": "धर्मेन्द्र कुमार मौर्य",
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
      "value": "Ram Lal Maurya",
      "rawText": "आत्मज राम लाल मौर्य",
      "confidence": 95
    },
    "totalOwnersCount": 1,
    "coSharers": [],
    "landClassification": {
      "value": "Vegetable & Marigold Cultivation (Sinchit)",
      "rawText": "सब्जी एवं गेंदा पुष्प कृषि भूमि",
      "confidence": 94
    },
    "irrigationSource": {
      "value": "Varuna River Minor Canal & Tubewell",
      "rawText": "वरुणा नहर व निजी नलकूप",
      "confidence": 92
    },
    "totalAreaDeclared": {
      "value": 0.87,
      "rawText": "०.८५०० हेक्टेयर",
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
    "normalizedAreaSqMeters": 8700,
    "annualLandRevenue": {
      "value": 160.45,
      "rawText": "₹160.45",
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
      "north": "Gata 318 (Varanasi-Jaunpur Highway link)",
      "south": "Gata 320 (Kashi Nath Maurya)",
      "east": "Panchayat Chak road",
      "west": "Gata 319/2 (Gokul Maurya)"
    },
    "cadastralPolygon": [
      [
        82.85,
        25.48
      ],
      [
        82.8535,
        25.4804
      ],
      [
        82.853,
        25.477
      ],
      [
        82.8495,
        25.4768
      ]
    ],
    "preprocessingMetrics": {
      "deskewAngleDegrees": -1.76,
      "contrastScore": 72.1,
      "dpiEstimated": 306,
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
        "message": "Sole owner 0.8500 Hectares verified."
      }
    ],
    "reviewHistory": [
      {
        "timestamp": "2026-06-30T00:44:00.000Z",
        "officerName": "Tehsildar Pindra",
        "role": "REVENUE_OFFICER",
        "action": "Sanctioned & Digital Sign Attached"
      }
    ]
  },
  {
    "id": "REC-UP-PRY-015",
    "documentNumber": "UP-PRY-SOR-2024-KHT-745",
    "documentType": "KHASRA_KHATAUNI",
    "primaryLanguage": "hindi",
    "script": "Devanagari (देवनागरी)",
    "sourceFileName": "UP_Prayagraj_Soraon_Dahiyawan_745.pdf",
    "sourceImageUrl": "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?auto=format&fit=crop&q=80&w=1200",
    "uploadedAt": "2026-07-01T08:22:00.000Z",
    "uploadedBy": "Lekhpal Akhilesh Pandey (Soraon)",
    "status": "VERIFIED_AND_SANCTIONED",
    "overallConfidence": 95.7,
    "state": {
      "value": "Uttar Pradesh",
      "rawText": "उत्तर प्रदेश शासन",
      "confidence": 99
    },
    "district": {
      "value": "Prayagraj",
      "rawText": "प्रयागराज",
      "confidence": 98
    },
    "tehsil": {
      "value": "Soraon",
      "rawText": "सोरांव",
      "confidence": 98
    },
    "village": {
      "value": "Dahiyawan",
      "rawText": "दहियावां",
      "confidence": 97
    },
    "censusVillageCode": {
      "value": "220363",
      "rawText": "१४७८१०",
      "confidence": 96
    },
    "khasraNumber": {
      "value": "745/3",
      "rawText": "गाटा संख्या ७४५/३",
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
      "value": "889",
      "rawText": "खाता संख्या ८८९",
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
      "value": "Vindhyavasini Prasad Shukla",
      "rawText": "विन्ध्यवासिनी प्रसाद शुक्ला",
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
      "value": "Kedarnath Shukla",
      "rawText": "आत्मज केदारनाथ शुक्ला",
      "confidence": 95
    },
    "totalOwnersCount": 1,
    "coSharers": [],
    "landClassification": {
      "value": "Guava Orchard & Agricultural (Sinchit)",
      "rawText": "अमरूद बाग व कृषि भूमि",
      "confidence": 94
    },
    "irrigationSource": {
      "value": "Ganga Canal Branch & Tubewell",
      "rawText": "गंगा नहर शाखा व नलकूप",
      "confidence": 92
    },
    "totalAreaDeclared": {
      "value": 1.62,
      "rawText": "१.६२०० हेक्टेयर",
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
    "normalizedAreaSqMeters": 16200,
    "annualLandRevenue": {
      "value": 172.95,
      "rawText": "₹172.95",
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
      "north": "Gata 744 (Shyam Lal Yadav)",
      "south": "Soraon to Holagarh PWD road",
      "east": "Gata 745/2 (Raghunath Shukla)",
      "west": "Village canal channel"
    },
    "cadastralPolygon": [
      [
        81.82,
        25.58
      ],
      [
        81.824,
        25.5804
      ],
      [
        81.8235,
        25.5768
      ],
      [
        81.8195,
        25.5765
      ]
    ],
    "preprocessingMetrics": {
      "deskewAngleDegrees": -1.68,
      "contrastScore": 72.6,
      "dpiEstimated": 308,
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
        "message": "Sole owner 1.6200 Hectares verified."
      }
    ],
    "reviewHistory": [
      {
        "timestamp": "2026-07-01T12:22:00.000Z",
        "officerName": "Tehsildar Soraon",
        "role": "REVENUE_OFFICER",
        "action": "Sanctioned & Digital Sign Attached"
      }
    ]
  },
  {
    "id": "REC-UP-MRT-016",
    "documentNumber": "UP-MRT-MAW-2024-KHT-628",
    "documentType": "KHASRA_KHATAUNI",
    "primaryLanguage": "hindi",
    "script": "Devanagari (देवनागरी)",
    "sourceFileName": "UP_Meerut_Mawana_Kithore_628.pdf",
    "sourceImageUrl": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1200",
    "uploadedAt": "2026-07-02T20:45:00.000Z",
    "uploadedBy": "Lekhpal Ravindra Singh (Kithore)",
    "status": "NEEDS_REVIEW",
    "overallConfidence": 80.8,
    "state": {
      "value": "Uttar Pradesh",
      "rawText": "उत्तर प्रदेश शासन",
      "confidence": 99
    },
    "district": {
      "value": "Meerut",
      "rawText": "मेरठ",
      "confidence": 98
    },
    "tehsil": {
      "value": "Mawana",
      "rawText": "मवाना",
      "confidence": 98
    },
    "village": {
      "value": "Kithore",
      "rawText": "किठौर",
      "confidence": 97
    },
    "censusVillageCode": {
      "value": "221102",
      "rawText": "१४१२०५",
      "confidence": 95
    },
    "khasraNumber": {
      "value": "628/1",
      "rawText": "गाटा ६२८/१",
      "confidence": 82,
      "isHandwritten": true,
      "boundingBox": {
        "x": 36,
        "y": 18,
        "width": 22,
        "height": 6
      }
    },
    "khataNumber": {
      "value": "415",
      "rawText": "खाता ४१५",
      "confidence": 86,
      "isHandwritten": false,
      "boundingBox": {
        "x": 66,
        "y": 18,
        "width": 18,
        "height": 6
      }
    },
    "primaryOwnerName": {
      "value": "Chaudhary Naresh Pal",
      "rawText": "चौधरी नरेश पाल",
      "confidence": 85,
      "isHandwritten": true,
      "boundingBox": {
        "x": 14,
        "y": 34,
        "width": 36,
        "height": 7
      }
    },
    "parentageOrSpouse": {
      "value": "Mahavir Singh",
      "rawText": "पुत्र महावीर सिंह",
      "confidence": 84
    },
    "totalOwnersCount": 1,
    "coSharers": [],
    "landClassification": {
      "value": "Sugarcane Agro-Farm (Eekh Sinchit)",
      "rawText": "गन्ना कृषि भूमि सिंचित",
      "confidence": 86
    },
    "irrigationSource": {
      "value": "Anupshahr Canal & Electric Tubewell",
      "rawText": "अनूपशहर नहर व नलकूप",
      "confidence": 84
    },
    "totalAreaDeclared": {
      "value": 2.12,
      "rawText": "२.१००० हेक्टेयर",
      "confidence": 81,
      "isHandwritten": true,
      "boundingBox": {
        "x": 14,
        "y": 54,
        "width": 26,
        "height": 6
      }
    },
    "declaredUnit": {
      "value": "HECTARE",
      "confidence": 99
    },
    "normalizedAreaSqMeters": 21200,
    "annualLandRevenue": {
      "value": 180.9,
      "rawText": "₹180.90",
      "confidence": 97
    },
    "encumbranceStatus": {
      "value": "MORTGAGED",
      "rawText": "बंधक केनरा बैंक किठौर ₹5,00,000",
      "confidence": 75,
      "isHandwritten": true,
      "isFlagged": true,
      "flagReason": "Kisan Credit Card hypothecation loan registered with Canara Bank"
    },
    "bankLienDetails": "Canara Bank Kithore branch charge registered for ₹5,00,000 on 2023-05-12",
    "mutations": [],
    "boundaries": {
      "north": "Gata 627 (Brij Pal Singh)",
      "south": "Kithore-Mawana PWD highway",
      "east": "Canal minor 3",
      "west": "Gata 628/2 (Dharampal Singh)"
    },
    "cadastralPolygon": [
      [
        77.98,
        28.87
      ],
      [
        77.9845,
        28.8705
      ],
      [
        77.984,
        28.8665
      ],
      [
        77.9795,
        28.8662
      ]
    ],
    "preprocessingMetrics": {
      "deskewAngleDegrees": -1.6,
      "contrastScore": 73,
      "dpiEstimated": 310,
      "binarizationMethod": "OtsuGlobal",
      "noiseReductionApplied": false
    },
    "validationResults": [
      {
        "ruleId": "VR-04-FLAG",
        "ruleName": "Bank Encumbrance Verification",
        "category": "LEGAL",
        "passed": false,
        "severity": "WARNING",
        "message": "Active bank mortgage requires Bank clearance."
      }
    ],
    "reviewHistory": [
      {
        "timestamp": "2026-07-03T00:45:00.000Z",
        "officerName": "AI OCR Pipeline v3.8",
        "role": "VERIFICATION_SPECIALIST",
        "action": "Ingested & Flagged for Bank Lien"
      }
    ]
  }
];
