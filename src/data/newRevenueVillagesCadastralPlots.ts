import { CadastralPlot } from './cadastralPlotsData';
import { ExtractedLandRecord } from '../types';

export const NEW_VILLAGE_CENTERS: Record<string, { lat: number; lng: number; zoom: number; label: string; state: string; district: string; tehsil: string }> = {
  Devbagh: {
    lat: 15.9924,
    lng: 73.4985,
    zoom: 17,
    label: 'Devbagh, Malvan Tehsil, Sindhudurg',
    state: 'Maharashtra',
    district: 'Sindhudurg',
    tehsil: 'Malvan'
  },
  Naggar: {
    lat: 32.1158,
    lng: 77.1684,
    zoom: 17,
    label: 'Naggar, Naggar Tehsil, Kullu',
    state: 'Himachal Pradesh',
    district: 'Kullu',
    tehsil: 'Naggar'
  },
  Ramgarh: {
    lat: 27.2415,
    lng: 70.5052,
    zoom: 17,
    label: 'Ramgarh, Jaisalmer Tehsil, Jaisalmer',
    state: 'Rajasthan',
    district: 'Jaisalmer',
    tehsil: 'Jaisalmer'
  },
  Nedumudi: {
    lat: 9.4352,
    lng: 76.4025,
    zoom: 17,
    label: 'Nedumudi, Kuttanad Tehsil, Alappuzha',
    state: 'Kerala',
    district: 'Alappuzha',
    tehsil: 'Kuttanad'
  },
  Garmur: {
    lat: 26.9625,
    lng: 94.2185,
    zoom: 17,
    label: 'Garmur, Majuli Sub-Division, Majuli',
    state: 'Assam',
    district: 'Majuli',
    tehsil: 'Majuli Sub-Division'
  },
  Bangarapet: {
    lat: 12.9815,
    lng: 78.2045,
    zoom: 17,
    label: 'Bangarapet, Bangarapet Tehsil, Kolar',
    state: 'Karnataka',
    district: 'Kolar',
    tehsil: 'Bangarapet'
  },
  Bhimavaram: {
    lat: 16.5448,
    lng: 81.5212,
    zoom: 17,
    label: 'Bhimavaram, Bhimavaram Tehsil, West Godavari',
    state: 'Andhra Pradesh',
    district: 'West Godavari',
    tehsil: 'Bhimavaram'
  },
  Kulgam: {
    lat: 33.6450,
    lng: 75.0210,
    zoom: 17,
    label: 'Kulgam, Devsar Tehsil, Kulgam',
    state: 'Jammu & Kashmir',
    district: 'Kulgam',
    tehsil: 'Devsar'
  }
};

export const NEW_VILLAGE_INFRASTRUCTURE: Record<string, { canals?: Array<Array<{ lat: number; lng: number }>>; roads?: Array<Array<{ lat: number; lng: number }>> }> = {
  Devbagh: {
    canals: [
      [
        { lat: 15.9950, lng: 73.4960 },
        { lat: 15.9935, lng: 73.4980 },
        { lat: 15.9920, lng: 73.5000 },
        { lat: 15.9905, lng: 73.5020 }
      ]
    ],
    roads: [
      [
        { lat: 15.9928, lng: 73.4960 },
        { lat: 15.9925, lng: 73.4985 },
        { lat: 15.9922, lng: 73.5020 }
      ]
    ]
  },
  Naggar: {
    canals: [
      [
        { lat: 32.1180, lng: 77.1660 },
        { lat: 32.1170, lng: 77.1680 },
        { lat: 32.1155, lng: 77.1695 },
        { lat: 32.1140, lng: 77.1710 }
      ]
    ],
    roads: [
      [
        { lat: 32.1162, lng: 77.1660 },
        { lat: 32.1158, lng: 77.1685 },
        { lat: 32.1155, lng: 77.1710 }
      ]
    ]
  },
  Ramgarh: {
    canals: [
      [
        { lat: 27.2440, lng: 70.5020 },
        { lat: 27.2430, lng: 70.5045 },
        { lat: 27.2415, lng: 70.5065 },
        { lat: 27.2400, lng: 70.5085 }
      ]
    ],
    roads: [
      [
        { lat: 27.2420, lng: 70.5020 },
        { lat: 27.2415, lng: 70.5052 },
        { lat: 27.2410, lng: 70.5085 }
      ]
    ]
  },
  Nedumudi: {
    canals: [
      [
        { lat: 9.4380, lng: 76.4000 },
        { lat: 9.4365, lng: 76.4020 },
        { lat: 9.4350, lng: 76.4035 },
        { lat: 9.4335, lng: 76.4055 }
      ]
    ],
    roads: [
      [
        { lat: 9.4356, lng: 76.4000 },
        { lat: 9.4352, lng: 76.4025 },
        { lat: 9.4348, lng: 76.4055 }
      ]
    ]
  },
  Garmur: {
    canals: [
      [
        { lat: 26.9650, lng: 94.2160 },
        { lat: 26.9635, lng: 94.2180 },
        { lat: 26.9620, lng: 94.2195 },
        { lat: 26.9605, lng: 94.2215 }
      ]
    ],
    roads: [
      [
        { lat: 26.9630, lng: 94.2160 },
        { lat: 26.9625, lng: 94.2185 },
        { lat: 26.9620, lng: 94.2215 }
      ]
    ]
  },
  Bangarapet: {
    canals: [
      [
        { lat: 12.9840, lng: 78.2020 },
        { lat: 12.9825, lng: 78.2040 },
        { lat: 12.9810, lng: 78.2055 },
        { lat: 12.9795, lng: 78.2075 }
      ]
    ],
    roads: [
      [
        { lat: 12.9820, lng: 78.2020 },
        { lat: 12.9815, lng: 78.2045 },
        { lat: 12.9810, lng: 78.2075 }
      ]
    ]
  },
  Bhimavaram: {
    canals: [
      [
        { lat: 16.5475, lng: 81.5190 },
        { lat: 16.5460, lng: 81.5210 },
        { lat: 16.5445, lng: 81.5225 },
        { lat: 16.5430, lng: 81.5245 }
      ]
    ],
    roads: [
      [
        { lat: 16.5452, lng: 81.5190 },
        { lat: 16.5448, lng: 81.5212 },
        { lat: 16.5444, lng: 81.5245 }
      ]
    ]
  },
  Kulgam: {
    canals: [
      [
        { lat: 33.6480, lng: 75.0185 },
        { lat: 33.6465, lng: 75.0205 },
        { lat: 33.6445, lng: 75.0220 },
        { lat: 33.6430, lng: 75.0240 }
      ]
    ],
    roads: [
      [
        { lat: 33.6455, lng: 75.0185 },
        { lat: 33.6450, lng: 75.0210 },
        { lat: 33.6446, lng: 75.0240 }
      ]
    ]
  }
};

export const NEW_CADASTRAL_PLOTS: CadastralPlot[] = [
  // --- VILLAGE 1: DEVBAGH (Sindhudurg, Maharashtra) ---
  {
    id: "PLOT-DEVBAGH-84-1",
    khasra: "84/1",
    khata: "210",
    owner: "Ganesh Pandurang Parab",
    parentage: "S/o Pandurang Mahadev Parab",
    areaHa: 0.81,
    areaSqM: 8094,
    soil: "Coastal Laterite Sandy Loam (Alphonso Mango Orchard)",
    status: "CLEAN",
    village: "Devbagh",
    tehsil: "Malvan",
    district: "Sindhudurg",
    state: "Maharashtra",
    centroid: { lat: 15.9928, lng: 73.4975 },
    coordinates: [
      { lat: 15.9936, lng: 73.4965 },
      { lat: 15.9937, lng: 73.4985 },
      { lat: 15.9919, lng: 73.4986 },
      { lat: 15.9918, lng: 73.4966 }
    ],
    svgPath: "M 220 140 L 340 145 L 335 240 L 215 235 Z",
    svgCentroid: { x: 278, y: 190 },
    color: "#8B4513",
    recordId: "REC-MH-SIN-DEV-0841",
    surveyDate: "1974 Konkan Bandobast (DGPS Verified) - Nov 2026",
    benchmarkBearing: "N 34° 15' W"
  },
  {
    id: "PLOT-DEVBAGH-84-2",
    khasra: "84/2",
    khata: "211",
    owner: "Sunita Ganesh Parab",
    parentage: "W/o Ganesh Pandurang Parab",
    areaHa: 0.61,
    areaSqM: 6070,
    soil: "Jambha Dagadi (Coconut & Betelnut Bagayat)",
    status: "CLEAN",
    village: "Devbagh",
    tehsil: "Malvan",
    district: "Sindhudurg",
    state: "Maharashtra",
    centroid: { lat: 15.9926, lng: 73.4995 },
    coordinates: [
      { lat: 15.9937, lng: 73.4985 },
      { lat: 15.9938, lng: 73.5005 },
      { lat: 15.9920, lng: 73.5006 },
      { lat: 15.9919, lng: 73.4986 }
    ],
    svgPath: "M 340 145 L 460 150 L 455 245 L 335 240 Z",
    svgCentroid: { x: 398, y: 195 },
    color: "#8B4513",
    recordId: null,
    surveyDate: "1974 Konkan Bandobast (DGPS Verified) - Nov 2026",
    benchmarkBearing: "N 28° 45' E"
  },
  {
    id: "PLOT-DEVBAGH-85",
    khasra: "85",
    khata: "212",
    owner: "Vasant Sakharam Samant",
    parentage: "S/o Sakharam Baburao Samant",
    areaHa: 1.05,
    areaSqM: 10500,
    soil: "Khajan Saline Protective Embankment Paddy",
    status: "LITIGATION",
    village: "Devbagh",
    tehsil: "Malvan",
    district: "Sindhudurg",
    state: "Maharashtra",
    centroid: { lat: 15.9910, lng: 73.4980 },
    coordinates: [
      { lat: 15.9919, lng: 73.4970 },
      { lat: 15.9920, lng: 73.4995 },
      { lat: 15.9902, lng: 73.4996 },
      { lat: 15.9901, lng: 73.4971 }
    ],
    svgPath: "M 215 235 L 340 240 L 335 330 L 210 325 Z",
    svgCentroid: { x: 275, y: 282 },
    color: "#8B4513",
    recordId: null,
    surveyDate: "1974 Konkan Bandobast - Dec 2026",
    benchmarkBearing: "S 15° 10' W",
    disputeDetails: {
      caseNumber: "REV-SIN-2024-881",
      court: "Sub-Divisional Officer Kankavli",
      disputeType: "Kharland Bandhara repair covenant easement claim",
      stayOrderActive: true,
      hearingDate: "2026-11-18"
    }
  },
  {
    id: "PLOT-DEVBAGH-86",
    khasra: "86",
    khata: "GOV-MH-09",
    owner: "Government of Maharashtra (Khar Land Development Dept)",
    parentage: "Tidal Sluice Gate Reserve",
    areaHa: 0.42,
    areaSqM: 4200,
    soil: "Coastal Mangrove Buffer & Sluice Dyke",
    status: "GOVT_RESERVE",
    village: "Devbagh",
    tehsil: "Malvan",
    district: "Sindhudurg",
    state: "Maharashtra",
    centroid: { lat: 15.9908, lng: 73.5005 },
    coordinates: [
      { lat: 15.9920, lng: 73.4995 },
      { lat: 15.9921, lng: 73.5015 },
      { lat: 15.9903, lng: 73.5016 },
      { lat: 15.9902, lng: 73.4996 }
    ],
    svgPath: "M 340 240 L 455 245 L 450 335 L 335 330 Z",
    svgCentroid: { x: 395, y: 288 },
    color: "#5A5A40",
    recordId: null,
    surveyDate: "CRZ-I Cadastral Mapping - 2026",
    benchmarkBearing: "S 42° 30' E"
  },

  // --- VILLAGE 2: NAGGAR (Kullu, Himachal Pradesh) ---
  {
    id: "PLOT-NAGGAR-112-1",
    khasra: "112/1",
    khata: "67",
    owner: "Vikramaditya Thakur",
    parentage: "S/o Rajendra Singh Thakur",
    areaHa: 0.89,
    areaSqM: 8900,
    soil: "Bakhal Awal (Terraced Mountain Loam - Royal Delicious Apple)",
    status: "CLEAN",
    village: "Naggar",
    tehsil: "Naggar",
    district: "Kullu",
    state: "Himachal Pradesh",
    centroid: { lat: 32.1162, lng: 77.1675 },
    coordinates: [
      { lat: 32.1170, lng: 77.1665 },
      { lat: 32.1171, lng: 77.1685 },
      { lat: 32.1153, lng: 77.1686 },
      { lat: 32.1152, lng: 77.1666 }
    ],
    svgPath: "M 230 130 L 350 135 L 345 230 L 225 225 Z",
    svgCentroid: { x: 288, y: 180 },
    color: "#2D4A30",
    recordId: "REC-HP-KUL-NAG-1121",
    surveyDate: "1989 Bandobast (DGPS Verified) - Oct 2026",
    benchmarkBearing: "N 58° 10' W"
  },
  {
    id: "PLOT-NAGGAR-112-2",
    khasra: "112/2",
    khata: "68",
    owner: "Padma Dolma Thakur",
    parentage: "W/o Vikramaditya Thakur",
    areaHa: 0.65,
    areaSqM: 6500,
    soil: "Bagicha Seb (Apple & Kullu Walnut Orchard)",
    status: "CLEAN",
    village: "Naggar",
    tehsil: "Naggar",
    district: "Kullu",
    state: "Himachal Pradesh",
    centroid: { lat: 32.1160, lng: 77.1695 },
    coordinates: [
      { lat: 32.1171, lng: 77.1685 },
      { lat: 32.1172, lng: 77.1705 },
      { lat: 32.1154, lng: 77.1706 },
      { lat: 32.1153, lng: 77.1686 }
    ],
    svgPath: "M 350 135 L 470 140 L 465 235 L 345 230 Z",
    svgCentroid: { x: 408, y: 185 },
    color: "#2D4A30",
    recordId: null,
    surveyDate: "1989 Bandobast (DGPS Verified) - Oct 2026",
    benchmarkBearing: "N 24° 30' E"
  },
  {
    id: "PLOT-NAGGAR-113",
    khasra: "113",
    khata: "69",
    owner: "Hari Chand Negi",
    parentage: "S/o Surat Ram Negi",
    areaHa: 1.15,
    areaSqM: 11500,
    soil: "Bakhal Doem (Hill Maize & Kidney Beans)",
    status: "LITIGATION",
    village: "Naggar",
    tehsil: "Naggar",
    district: "Kullu",
    state: "Himachal Pradesh",
    centroid: { lat: 32.1144, lng: 77.1680 },
    coordinates: [
      { lat: 32.1153, lng: 77.1670 },
      { lat: 32.1154, lng: 77.1695 },
      { lat: 32.1136, lng: 77.1696 },
      { lat: 32.1135, lng: 77.1671 }
    ],
    svgPath: "M 225 225 L 350 230 L 345 320 L 220 315 Z",
    svgCentroid: { x: 285, y: 272 },
    color: "#2D4A30",
    recordId: null,
    surveyDate: "1989 Settlement - Sep 2026",
    benchmarkBearing: "S 22° 40' W",
    disputeDetails: {
      caseNumber: "HP-TEN-118-2025-014",
      court: "Collector Kullu / Financial Commissioner Appeals",
      disputeType: "Section 118 HP Tenancy Act non-agriculturist lease challenge",
      stayOrderActive: true,
      hearingDate: "2026-12-04"
    }
  },
  {
    id: "PLOT-NAGGAR-114",
    khasra: "114",
    khata: "GOV-HP-04",
    owner: "Gram Panchayat Naggar (Charand Forest Reserve)",
    parentage: "Village Grazing & Kuhl Channel Head",
    areaHa: 0.54,
    areaSqM: 5400,
    soil: "Deodar & Oak High Slope Watershed Buffer",
    status: "GOVT_RESERVE",
    village: "Naggar",
    tehsil: "Naggar",
    district: "Kullu",
    state: "Himachal Pradesh",
    centroid: { lat: 32.1142, lng: 77.1705 },
    coordinates: [
      { lat: 32.1154, lng: 77.1695 },
      { lat: 32.1155, lng: 77.1715 },
      { lat: 32.1137, lng: 77.1716 },
      { lat: 32.1136, lng: 77.1696 }
    ],
    svgPath: "M 350 230 L 465 235 L 460 325 L 345 320 Z",
    svgCentroid: { x: 405, y: 278 },
    color: "#5A5A40",
    recordId: null,
    surveyDate: "Forest Demarcation 2025",
    benchmarkBearing: "S 65° 15' E"
  },

  // --- VILLAGE 3: RAMGARH (Jaisalmer, Rajasthan) ---
  {
    id: "PLOT-RAMGARH-401-1",
    khasra: "401/1",
    khata: "112",
    owner: "Bhairon Singh Bhati",
    parentage: "S/o Kalyan Singh Bhati",
    areaHa: 2.53,
    areaSqM: 25293,
    soil: "Nahri Dumat (IGNP Canal Command - Cumin & Mustard)",
    status: "CLEAN",
    village: "Ramgarh",
    tehsil: "Jaisalmer",
    district: "Jaisalmer",
    state: "Rajasthan",
    centroid: { lat: 27.2422, lng: 70.5040 },
    coordinates: [
      { lat: 27.2432, lng: 70.5030 },
      { lat: 27.2433, lng: 70.5052 },
      { lat: 27.2411, lng: 70.5053 },
      { lat: 27.2410, lng: 70.5031 }
    ],
    svgPath: "M 210 130 L 340 135 L 335 240 L 205 235 Z",
    svgCentroid: { x: 272, y: 185 },
    color: "#7D3C00",
    recordId: "REC-RJ-JAI-RAM-4011",
    surveyDate: "1998 Murabbabandi (DGPS Verified) - Dec 2026",
    benchmarkBearing: "N 42° 20' W"
  },
  {
    id: "PLOT-RAMGARH-401-2",
    khasra: "401/2",
    khata: "113",
    owner: "Mukesh Kumar Meghwal",
    parentage: "S/o Ramu Ram Meghwal",
    areaHa: 2.02,
    areaSqM: 20234,
    soil: "Retili Balui Bhur (Cluster Bean / Gowar & Pearl Millet)",
    status: "CLEAN",
    village: "Ramgarh",
    tehsil: "Jaisalmer",
    district: "Jaisalmer",
    state: "Rajasthan",
    centroid: { lat: 27.2420, lng: 70.5065 },
    coordinates: [
      { lat: 27.2433, lng: 70.5052 },
      { lat: 27.2434, lng: 70.5074 },
      { lat: 27.2412, lng: 70.5075 },
      { lat: 27.2411, lng: 70.5053 }
    ],
    svgPath: "M 340 135 L 470 140 L 465 245 L 335 240 Z",
    svgCentroid: { x: 402, y: 190 },
    color: "#7D3C00",
    recordId: null,
    surveyDate: "1998 Murabbabandi (DGPS Verified) - Dec 2026",
    benchmarkBearing: "N 31° 10' E"
  },
  {
    id: "PLOT-RAMGARH-402",
    khasra: "402",
    khata: "114",
    owner: "Durgadas Jasraj Paliwal",
    parentage: "S/o Jasraj Khemaji Paliwal",
    areaHa: 3.15,
    areaSqM: 31500,
    soil: "Chahi Barani (Sprinkler Irrigated Isabgol / Psyllium)",
    status: "LITIGATION",
    village: "Ramgarh",
    tehsil: "Jaisalmer",
    district: "Jaisalmer",
    state: "Rajasthan",
    centroid: { lat: 27.2402, lng: 70.5045 },
    coordinates: [
      { lat: 27.2411, lng: 70.5035 },
      { lat: 27.2412, lng: 70.5060 },
      { lat: 27.2392, lng: 70.5061 },
      { lat: 27.2391, lng: 70.5036 }
    ],
    svgPath: "M 205 235 L 340 240 L 335 335 L 200 330 Z",
    svgCentroid: { x: 270, y: 285 },
    color: "#7D3C00",
    recordId: null,
    surveyDate: "1998 Colonisation Survey - Nov 2026",
    benchmarkBearing: "S 18° 50' W",
    disputeDetails: {
      caseNumber: "RAJ-REV-JAI-2025-410",
      court: "Revenue Appellate Authority Jodhpur",
      disputeType: "Canal Osrabandi water turn allocation share partition",
      stayOrderActive: true,
      hearingDate: "2026-11-26"
    }
  },
  {
    id: "PLOT-RAMGARH-403",
    khasra: "403",
    khata: "GOV-RJ-16",
    owner: "Government of Rajasthan (IGNP Command Area Wing)",
    parentage: "Sagarmal Gopa Canal Lift Minor Chak Buffer",
    areaHa: 1.25,
    areaSqM: 12500,
    soil: "Canal Bank & Desert Sand-Dune Stabilisation Shelterbelt",
    status: "GOVT_RESERVE",
    village: "Ramgarh",
    tehsil: "Jaisalmer",
    district: "Jaisalmer",
    state: "Rajasthan",
    centroid: { lat: 27.2400, lng: 70.5072 },
    coordinates: [
      { lat: 27.2412, lng: 70.5060 },
      { lat: 27.2413, lng: 70.5085 },
      { lat: 27.2393, lng: 70.5086 },
      { lat: 27.2392, lng: 70.5061 }
    ],
    svgPath: "M 340 240 L 465 245 L 460 340 L 335 335 Z",
    svgCentroid: { x: 400, y: 290 },
    color: "#5A5A40",
    recordId: null,
    surveyDate: "IGNP Right-of-Way 2026",
    benchmarkBearing: "S 55° 05' E"
  },

  // --- VILLAGE 4: NEDUMUDI (Alappuzha, Kerala) ---
  {
    id: "PLOT-NEDUMUDI-78-1",
    khasra: "78/1",
    khata: "TH-340",
    owner: "Kuriakose Thomas Palathinkal",
    parentage: "S/o Thomas Kuriakose Palathinkal",
    areaHa: 0.72,
    areaSqM: 7200,
    soil: "Kari Nilam (Below Sea Level Acid Saline Paddy Polder)",
    status: "CLEAN",
    village: "Nedumudi",
    tehsil: "Kuttanad",
    district: "Alappuzha",
    state: "Kerala",
    centroid: { lat: 9.4358, lng: 76.4015 },
    coordinates: [
      { lat: 9.4366, lng: 76.4005 },
      { lat: 9.4367, lng: 76.4025 },
      { lat: 9.4349, lng: 76.4026 },
      { lat: 9.4348, lng: 76.4006 }
    ],
    svgPath: "M 220 140 L 340 145 L 335 240 L 215 235 Z",
    svgCentroid: { x: 278, y: 190 },
    color: "#2D4A30",
    recordId: "REC-KL-ALP-NED-0781",
    surveyDate: "2004 Digital Resurvey (DGPS Verified) - Oct 2026",
    benchmarkBearing: "N 45° 10' W"
  },
  {
    id: "PLOT-NEDUMUDI-78-2",
    khasra: "78/2",
    khata: "TH-341",
    owner: "Mary Kuriakose Palathinkal",
    parentage: "W/o Kuriakose Thomas",
    areaHa: 0.48,
    areaSqM: 4800,
    soil: "Purayidam (Elevated Lake Ridge Coconut & Nutmeg Garden)",
    status: "CLEAN",
    village: "Nedumudi",
    tehsil: "Kuttanad",
    district: "Alappuzha",
    state: "Kerala",
    centroid: { lat: 9.4356, lng: 76.4035 },
    coordinates: [
      { lat: 9.4367, lng: 76.4025 },
      { lat: 9.4368, lng: 76.4045 },
      { lat: 9.4350, lng: 76.4046 },
      { lat: 9.4349, lng: 76.4026 }
    ],
    svgPath: "M 340 145 L 460 150 L 455 245 L 335 240 Z",
    svgCentroid: { x: 398, y: 195 },
    color: "#2D4A30",
    recordId: null,
    surveyDate: "2004 Resurvey (DGPS Verified) - Oct 2026",
    benchmarkBearing: "N 36° 20' E"
  },
  {
    id: "PLOT-NEDUMUDI-79",
    khasra: "79",
    khata: "TH-342",
    owner: "Devadasan Nair Kayamkulam",
    parentage: "S/o Raghavan Nair",
    areaHa: 0.95,
    areaSqM: 9500,
    soil: "Kayal Padasekharam Polder Rice",
    status: "LITIGATION",
    village: "Nedumudi",
    tehsil: "Kuttanad",
    district: "Alappuzha",
    state: "Kerala",
    centroid: { lat: 9.4340, lng: 76.4020 },
    coordinates: [
      { lat: 9.4349, lng: 76.4010 },
      { lat: 9.4350, lng: 76.4035 },
      { lat: 9.4332, lng: 76.4036 },
      { lat: 9.4331, lng: 76.4011 }
    ],
    svgPath: "M 215 235 L 340 240 L 335 330 L 210 325 Z",
    svgCentroid: { x: 275, y: 282 },
    color: "#2D4A30",
    recordId: null,
    surveyDate: "2004 Resurvey - Nov 2026",
    benchmarkBearing: "S 12° 15' W",
    disputeDetails: {
      caseNumber: "KL-WETLAND-ALP-2024-118",
      court: "High Court of Kerala (Kuttanad Wetland Bench)",
      disputeType: "Paddy Land & Wetland Conservation Act 2008 conversion stay",
      stayOrderActive: true,
      hearingDate: "2026-11-20"
    }
  },
  {
    id: "PLOT-NEDUMUDI-80",
    khasra: "80",
    khata: "GOV-KL-02",
    owner: "Padasekharam Samithi (Kuttanad Development Board)",
    parentage: "Community Dewatering Sump & Ring Bund",
    areaHa: 0.35,
    areaSqM: 3500,
    soil: "Protective Ring Bund & Dewatering Motor Shed",
    status: "GOVT_RESERVE",
    village: "Nedumudi",
    tehsil: "Kuttanad",
    district: "Alappuzha",
    state: "Kerala",
    centroid: { lat: 9.4338, lng: 76.4045 },
    coordinates: [
      { lat: 9.4350, lng: 76.4035 },
      { lat: 9.4351, lng: 76.4055 },
      { lat: 9.4333, lng: 76.4056 },
      { lat: 9.4332, lng: 76.4036 }
    ],
    svgPath: "M 340 240 L 455 245 L 450 335 L 335 330 Z",
    svgCentroid: { x: 395, y: 288 },
    color: "#5A5A40",
    recordId: null,
    surveyDate: "Polder Infrastructure Demarcation 2025",
    benchmarkBearing: "S 68° 45' E"
  },

  // --- VILLAGE 5: GARMUR (Majuli, Assam) ---
  {
    id: "PLOT-GARMUR-156-1",
    khasra: "156/1",
    khata: "PT-88",
    owner: "Bipul Chandra Saikia",
    parentage: "S/o Mahendra Nath Saikia",
    areaHa: 1.34,
    areaSqM: 13400,
    soil: "Poli Mati (Recent Brahmaputra Flood Silt - Deepwater Bao Rice)",
    status: "CLEAN",
    village: "Garmur",
    tehsil: "Majuli Sub-Division",
    district: "Majuli",
    state: "Assam",
    centroid: { lat: 26.9632, lng: 94.2175 },
    coordinates: [
      { lat: 26.9640, lng: 94.2165 },
      { lat: 26.9641, lng: 94.2185 },
      { lat: 26.9623, lng: 94.2186 },
      { lat: 26.9622, lng: 94.2166 }
    ],
    svgPath: "M 220 135 L 345 140 L 340 235 L 215 230 Z",
    svgCentroid: { x: 280, y: 185 },
    color: "#1B4B75",
    recordId: "REC-AS-MAJ-GAR-1561",
    surveyDate: "1982 Cadastral Survey (DGPS Verified) - Dec 2026",
    benchmarkBearing: "N 38° 10' W"
  },
  {
    id: "PLOT-GARMUR-156-2",
    khasra: "156/2",
    khata: "PT-89",
    owner: "Ranjit Borah",
    parentage: "S/o Dimbeswar Borah",
    areaHa: 0.98,
    areaSqM: 9800,
    soil: "Char-Chapori Silt (Toria Yellow Mustard & Black Gram)",
    status: "CLEAN",
    village: "Garmur",
    tehsil: "Majuli Sub-Division",
    district: "Majuli",
    state: "Assam",
    centroid: { lat: 26.9630, lng: 94.2195 },
    coordinates: [
      { lat: 26.9641, lng: 94.2185 },
      { lat: 26.9642, lng: 94.2205 },
      { lat: 26.9624, lng: 94.2206 },
      { lat: 26.9623, lng: 94.2186 }
    ],
    svgPath: "M 345 140 L 465 145 L 460 240 L 340 235 Z",
    svgCentroid: { x: 402, y: 190 },
    color: "#1B4B75",
    recordId: null,
    surveyDate: "1982 Cadastral Survey (DGPS Verified) - Dec 2026",
    benchmarkBearing: "N 26° 45' E"
  },
  {
    id: "PLOT-GARMUR-157",
    khasra: "157",
    khata: "PT-90",
    owner: "Pradip Kumar Kalita",
    parentage: "S/o Golap Chandra Kalita",
    areaHa: 1.45,
    areaSqM: 14500,
    soil: "Bari Mati (Elevated Homestead, Arecanut & Assam Lemon)",
    status: "LITIGATION",
    village: "Garmur",
    tehsil: "Majuli Sub-Division",
    district: "Majuli",
    state: "Assam",
    centroid: { lat: 26.9614, lng: 94.2180 },
    coordinates: [
      { lat: 26.9623, lng: 94.2170 },
      { lat: 26.9624, lng: 94.2195 },
      { lat: 26.9606, lng: 94.2196 },
      { lat: 26.9605, lng: 94.2171 }
    ],
    svgPath: "M 215 230 L 340 235 L 335 325 L 210 320 Z",
    svgCentroid: { x: 275, y: 278 },
    color: "#1B4B75",
    recordId: null,
    surveyDate: "1982 Cadastral Survey - Nov 2026",
    benchmarkBearing: "S 15° 30' W",
    disputeDetails: {
      caseNumber: "AS-REV-MAJ-2025-072",
      court: "Deputy Commissioner Revenue Court Majuli",
      disputeType: "River bank erosion re-allotment & annual Eksona conversion claim",
      stayOrderActive: true,
      hearingDate: "2026-11-22"
    }
  },
  {
    id: "PLOT-GARMUR-158",
    khasra: "158",
    khata: "GOV-AS-07",
    owner: "Garmur Satra Trust & Cultural Reserve",
    parentage: "Monastic Bamboo & Heritage Preservation Buffer",
    areaHa: 0.85,
    areaSqM: 8500,
    soil: "Riparian Alluvial Wetland Buffer",
    status: "GOVT_RESERVE",
    village: "Garmur",
    tehsil: "Majuli Sub-Division",
    district: "Majuli",
    state: "Assam",
    centroid: { lat: 26.9612, lng: 94.2205 },
    coordinates: [
      { lat: 26.9624, lng: 94.2195 },
      { lat: 26.9625, lng: 94.2215 },
      { lat: 26.9607, lng: 94.2216 },
      { lat: 26.9606, lng: 94.2196 }
    ],
    svgPath: "M 340 235 L 460 240 L 455 330 L 335 325 Z",
    svgCentroid: { x: 398, y: 282 },
    color: "#5A5A40",
    recordId: null,
    surveyDate: "Satra Heritage Demarcation 2026",
    benchmarkBearing: "S 48° 10' E"
  },

  // --- VILLAGE 6: BANGARAPET (Kolar, Karnataka) ---
  {
    id: "PLOT-BANGARAPET-64-1",
    khasra: "64/1",
    khata: "KH-510",
    owner: "K. N. Munivenkatappa",
    parentage: "S/o Narayanappa K.",
    areaHa: 1.21,
    areaSqM: 12140,
    soil: "Kempu Jiddu Mannu (Red Sandy Loam - V1 Mulberry Sericulture)",
    status: "CLEAN",
    village: "Bangarapet",
    tehsil: "Bangarapet",
    district: "Kolar",
    state: "Karnataka",
    centroid: { lat: 12.9822, lng: 78.2035 },
    coordinates: [
      { lat: 12.9830, lng: 78.2025 },
      { lat: 12.9831, lng: 78.2045 },
      { lat: 12.9813, lng: 78.2046 },
      { lat: 12.9812, lng: 78.2026 }
    ],
    svgPath: "M 225 135 L 345 140 L 340 235 L 220 230 Z",
    svgCentroid: { x: 282, y: 185 },
    color: "#4A2D78",
    recordId: "REC-KA-KOL-BAN-0641",
    surveyDate: "1992 Bhoomi Survey (DGPS Verified) - Oct 2026",
    benchmarkBearing: "N 32° 40' W"
  },
  {
    id: "PLOT-BANGARAPET-64-2",
    khasra: "64/2",
    khata: "KH-511",
    owner: "M. Manjunatha",
    parentage: "S/o K. N. Munivenkatappa",
    areaHa: 0.81,
    areaSqM: 8094,
    soil: "Red Alfisol (Drip Irrigated Totapuri Mango Orchard)",
    status: "CLEAN",
    village: "Bangarapet",
    tehsil: "Bangarapet",
    district: "Kolar",
    state: "Karnataka",
    centroid: { lat: 12.9820, lng: 78.2055 },
    coordinates: [
      { lat: 12.9831, lng: 78.2045 },
      { lat: 12.9832, lng: 78.2065 },
      { lat: 12.9814, lng: 78.2066 },
      { lat: 12.9813, lng: 78.2046 }
    ],
    svgPath: "M 345 140 L 465 145 L 460 240 L 340 235 Z",
    svgCentroid: { x: 402, y: 190 },
    color: "#4A2D78",
    recordId: null,
    surveyDate: "1992 Bhoomi Survey (DGPS Verified) - Oct 2026",
    benchmarkBearing: "N 25° 15' E"
  },
  {
    id: "PLOT-BANGARAPET-65",
    khasra: "65",
    khata: "KH-512",
    owner: "Anjanamma Byrappa",
    parentage: "W/o Byrappa",
    areaHa: 1.01,
    areaSqM: 10117,
    soil: "Kere Achukattu Wetland (Tank-Fed Ragi & Pulses)",
    status: "LITIGATION",
    village: "Bangarapet",
    tehsil: "Bangarapet",
    district: "Kolar",
    state: "Karnataka",
    centroid: { lat: 12.9804, lng: 78.2040 },
    coordinates: [
      { lat: 12.9813, lng: 78.2030 },
      { lat: 12.9814, lng: 78.2055 },
      { lat: 12.9796, lng: 78.2056 },
      { lat: 12.9795, lng: 78.2031 }
    ],
    svgPath: "M 220 230 L 340 235 L 335 325 L 215 320 Z",
    svgCentroid: { x: 278, y: 278 },
    color: "#4A2D78",
    recordId: null,
    surveyDate: "1992 Bhoomi Revision - Dec 2026",
    benchmarkBearing: "S 19° 20' W",
    disputeDetails: {
      caseNumber: "KA-PTCL-KOL-2024-098",
      court: "Assistant Commissioner Kolar Sub-Division",
      disputeType: "Karnataka PTCL Act 1978 granted land restitution application",
      stayOrderActive: true,
      hearingDate: "2026-11-28"
    }
  },
  {
    id: "PLOT-BANGARAPET-66",
    khasra: "66",
    khata: "GOV-KA-11",
    owner: "Minor Irrigation Dept Karnataka (Bethamangala Feeder)",
    parentage: "Cascade Tank Ayacut Channel Reserve",
    areaHa: 0.62,
    areaSqM: 6200,
    soil: "Tank Bund Silt & Water Harvesting Buffer",
    status: "GOVT_RESERVE",
    village: "Bangarapet",
    tehsil: "Bangarapet",
    district: "Kolar",
    state: "Karnataka",
    centroid: { lat: 12.9802, lng: 78.2065 },
    coordinates: [
      { lat: 12.9814, lng: 78.2055 },
      { lat: 12.9815, lng: 78.2075 },
      { lat: 12.9797, lng: 78.2076 },
      { lat: 12.9796, lng: 78.2056 }
    ],
    svgPath: "M 340 235 L 460 240 L 455 330 L 335 325 Z",
    svgCentroid: { x: 398, y: 282 },
    color: "#5A5A40",
    recordId: null,
    surveyDate: "Kere Angala Demarcation 2026",
    benchmarkBearing: "S 61° 30' E"
  },

  // --- VILLAGE 7: BHIMAVARAM (West Godavari, Andhra Pradesh) ---
  {
    id: "PLOT-BHIMAVARAM-230-1",
    khasra: "230/1",
    khata: "PPB-914",
    owner: "Venkata Satyanarayana Raju Penmatsa",
    parentage: "S/o Bhupathi Raju Penmatsa",
    areaHa: 1.42,
    areaSqM: 14164,
    soil: "Godavari Nalla Regadi (Heavy Black Clay - Vannamei Aquaculture Pond)",
    status: "CLEAN",
    village: "Bhimavaram",
    tehsil: "Bhimavaram",
    district: "West Godavari",
    state: "Andhra Pradesh",
    centroid: { lat: 16.5455, lng: 81.5202 },
    coordinates: [
      { lat: 16.5463, lng: 81.5192 },
      { lat: 16.5464, lng: 81.5212 },
      { lat: 16.5446, lng: 81.5213 },
      { lat: 16.5445, lng: 81.5193 }
    ],
    svgPath: "M 220 135 L 345 140 L 340 235 L 215 230 Z",
    svgCentroid: { x: 280, y: 185 },
    color: "#1B4B75",
    recordId: "REC-AP-WG-BHI-2301",
    surveyDate: "1986 Webland Bandobast (DGPS Verified) - Nov 2026",
    benchmarkBearing: "N 41° 15' W"
  },
  {
    id: "PLOT-BHIMAVARAM-230-2",
    khasra: "230/2",
    khata: "PPB-915",
    owner: "Subba Raju Penmatsa",
    parentage: "S/o Venkata Satyanarayana Raju",
    areaHa: 1.01,
    areaSqM: 10117,
    soil: "Magani Ondru Matti (Delta Canal Irrigated Samba Mahsuri Rice)",
    status: "CLEAN",
    village: "Bhimavaram",
    tehsil: "Bhimavaram",
    district: "West Godavari",
    state: "Andhra Pradesh",
    centroid: { lat: 16.5453, lng: 81.5222 },
    coordinates: [
      { lat: 16.5464, lng: 81.5212 },
      { lat: 16.5465, lng: 81.5232 },
      { lat: 16.5447, lng: 81.5233 },
      { lat: 16.5446, lng: 81.5213 }
    ],
    svgPath: "M 345 140 L 465 145 L 460 240 L 340 235 Z",
    svgCentroid: { x: 402, y: 190 },
    color: "#1B4B75",
    recordId: null,
    surveyDate: "1986 Webland Bandobast (DGPS Verified) - Nov 2026",
    benchmarkBearing: "N 29° 30' E"
  },
  {
    id: "PLOT-BHIMAVARAM-231",
    khasra: "231",
    khata: "PPB-916",
    owner: "Kasi Viswanadham Gadiraju",
    parentage: "S/o Rama Raju Gadiraju",
    areaHa: 1.82,
    areaSqM: 18210,
    soil: "Regur Alluvium (Dalwa Paddy & Oil Palm Plantation)",
    status: "LITIGATION",
    village: "Bhimavaram",
    tehsil: "Bhimavaram",
    district: "West Godavari",
    state: "Andhra Pradesh",
    centroid: { lat: 16.5436, lng: 81.5208 },
    coordinates: [
      { lat: 16.5446, lng: 81.5198 },
      { lat: 16.5447, lng: 81.5222 },
      { lat: 16.5429, lng: 81.5223 },
      { lat: 16.5428, lng: 81.5199 }
    ],
    svgPath: "M 215 230 L 340 235 L 335 325 L 210 320 Z",
    svgCentroid: { x: 275, y: 278 },
    color: "#1B4B75",
    recordId: null,
    surveyDate: "1986 Settlement - Oct 2026",
    benchmarkBearing: "S 16° 45' W",
    disputeDetails: {
      caseNumber: "AP-NALA-CAA-2025-044",
      court: "District Revenue Officer Eluru",
      disputeType: "NALA conversion to brackish shrimp tank drainage complaint",
      stayOrderActive: true,
      hearingDate: "2026-11-15"
    }
  },
  {
    id: "PLOT-BHIMAVARAM-232",
    khasra: "232",
    khata: "GOV-AP-08",
    owner: "Irrigation & CAD Dept AP (Godavari Western Delta Drainage)",
    parentage: "Yenamadurru Drain Right-of-Way Buffer",
    areaHa: 0.75,
    areaSqM: 7500,
    soil: "Canal Outfall & Flood Drainage Bank",
    status: "GOVT_RESERVE",
    village: "Bhimavaram",
    tehsil: "Bhimavaram",
    district: "West Godavari",
    state: "Andhra Pradesh",
    centroid: { lat: 16.5434, lng: 81.5232 },
    coordinates: [
      { lat: 16.5447, lng: 81.5222 },
      { lat: 16.5448, lng: 81.5242 },
      { lat: 16.5430, lng: 81.5243 },
      { lat: 16.5429, lng: 81.5223 }
    ],
    svgPath: "M 340 235 L 460 240 L 455 330 L 335 325 Z",
    svgCentroid: { x: 398, y: 282 },
    color: "#5A5A40",
    recordId: null,
    surveyDate: "Drainage Easement Survey 2026",
    benchmarkBearing: "S 58° 20' E"
  },

  // --- VILLAGE 8: KULGAM (Kulgam, Jammu & Kashmir) ---
  {
    id: "PLOT-KULGAM-91-1",
    khasra: "91/1",
    khata: "KH-142",
    owner: "Ghulam Mohammad Mir",
    parentage: "S/o Abdul Gani Mir",
    areaHa: 0.76,
    areaSqM: 7588,
    soil: "Vuddr / Karewa Loam (High Plateau Saffron / Crocus sativus)",
    status: "CLEAN",
    village: "Kulgam",
    tehsil: "Devsar",
    district: "Kulgam",
    state: "Jammu & Kashmir",
    centroid: { lat: 33.6456, lng: 75.0200 },
    coordinates: [
      { lat: 33.6464, lng: 75.0190 },
      { lat: 33.6465, lng: 75.0210 },
      { lat: 33.6447, lng: 75.0211 },
      { lat: 33.6446, lng: 75.0191 }
    ],
    svgPath: "M 225 130 L 345 135 L 340 230 L 220 225 Z",
    svgCentroid: { x: 282, y: 180 },
    color: "#2D4A30",
    recordId: "REC-JK-KUL-DEV-0911",
    surveyDate: "1984 Misal-e-Haqiqat (DGPS Verified) - Dec 2026",
    benchmarkBearing: "N 36° 10' W"
  },
  {
    id: "PLOT-KULGAM-91-2",
    khasra: "91/2",
    khata: "KH-143",
    owner: "Bashir Ahmad Mir",
    parentage: "S/o Ghulam Mohammad Mir",
    areaHa: 0.61,
    areaSqM: 6070,
    soil: "Shil Alluvial Loam (High Density Delicious Apple & Walnut)",
    status: "CLEAN",
    village: "Kulgam",
    tehsil: "Devsar",
    district: "Kulgam",
    state: "Jammu & Kashmir",
    centroid: { lat: 33.6454, lng: 75.0220 },
    coordinates: [
      { lat: 33.6465, lng: 75.0210 },
      { lat: 33.6466, lng: 75.0230 },
      { lat: 33.6448, lng: 75.0231 },
      { lat: 33.6447, lng: 75.0211 }
    ],
    svgPath: "M 345 135 L 465 140 L 460 235 L 340 230 Z",
    svgCentroid: { x: 402, y: 185 },
    color: "#2D4A30",
    recordId: null,
    surveyDate: "1984 Misal-e-Haqiqat (DGPS Verified) - Dec 2026",
    benchmarkBearing: "N 27° 40' E"
  },
  {
    id: "PLOT-KULGAM-92",
    khasra: "92",
    khata: "KH-144",
    owner: "Mohammad Shafi Rather",
    parentage: "S/o Wali Mohammad Rather",
    areaHa: 0.91,
    areaSqM: 9105,
    soil: "Snowmelt Kul Irrigated Mushkbudji Scented Rice",
    status: "LITIGATION",
    village: "Kulgam",
    tehsil: "Devsar",
    district: "Kulgam",
    state: "Jammu & Kashmir",
    centroid: { lat: 33.6438, lng: 75.0205 },
    coordinates: [
      { lat: 33.6447, lng: 75.0195 },
      { lat: 33.6448, lng: 75.0220 },
      { lat: 33.6430, lng: 75.0221 },
      { lat: 33.6429, lng: 75.0196 }
    ],
    svgPath: "M 220 225 L 340 230 L 335 320 L 215 315 Z",
    svgCentroid: { x: 278, y: 272 },
    color: "#2D4A30",
    recordId: null,
    surveyDate: "1984 Bandobast - Nov 2026",
    benchmarkBearing: "S 14° 10' W",
    disputeDetails: {
      caseNumber: "JK-SAFFRON-KUL-2025-019",
      court: "Financial Commissioner Revenue Srinagar Bench",
      disputeType: "J&K Saffron Act Karewa conversion prohibition dispute",
      stayOrderActive: true,
      hearingDate: "2026-12-08"
    }
  },
  {
    id: "PLOT-KULGAM-93",
    khasra: "93",
    khata: "GOV-JK-03",
    owner: "Irrigation & Flood Control Dept J&K (Veshaw Kul Head)",
    parentage: "Snowmelt River Kul Sluice Reserve",
    areaHa: 0.45,
    areaSqM: 4552,
    soil: "Riparian Chinar Grove & Kul Water Channel",
    status: "GOVT_RESERVE",
    village: "Kulgam",
    tehsil: "Devsar",
    district: "Kulgam",
    state: "Jammu & Kashmir",
    centroid: { lat: 33.6436, lng: 75.0230 },
    coordinates: [
      { lat: 33.6448, lng: 75.0220 },
      { lat: 33.6449, lng: 75.0240 },
      { lat: 33.6431, lng: 75.0241 },
      { lat: 33.6430, lng: 75.0221 }
    ],
    svgPath: "M 340 230 L 460 235 L 455 325 L 335 320 Z",
    svgCentroid: { x: 398, y: 278 },
    color: "#5A5A40",
    recordId: null,
    surveyDate: "Kul Headwork Demarcation 2026",
    benchmarkBearing: "S 52° 45' E"
  }
];

const DEFAULT_PREPROCESSING = {
  deskewAngleDegrees: -0.85,
  contrastScore: 82.4,
  dpiEstimated: 300,
  binarizationMethod: 'Sauvola' as const,
  noiseReductionApplied: true
};

const DEFAULT_VALIDATION_RESULTS = [
  {
    ruleId: 'VR-01-ARITH',
    ruleName: 'Area Summation Consistency',
    category: 'ARITHMETIC' as const,
    passed: true,
    severity: 'INFO' as const,
    message: 'Area breakdown matches cadastral boundaries and village shajra sheet.'
  }
];

const DEFAULT_REVIEW_HISTORY = [
  {
    timestamp: '2026-09-21T10:00:00.000Z',
    officerName: 'Revenue Verification Station',
    role: 'VERIFICATION_SPECIALIST' as const,
    action: 'DILRMP digital sync and biometric verification approved'
  }
];

// Sample Extracted Land Records for each of the new villages
const RAW_NEW_VILLAGE_LAND_RECORDS: Omit<ExtractedLandRecord, 'preprocessingMetrics' | 'validationResults' | 'reviewHistory'>[] = [
  {
    id: "REC-MH-SIN-DEV-0841",
    documentNumber: "MH-SIN-MAL-2024-712-084",
    documentType: "7_12_EXTRACT",
    primaryLanguage: "marathi",
    script: "Devanagari (मराठी)",
    sourceFileName: "MH_Sindhudurg_Malvan_Devbagh_84_1.pdf",
    sourceImageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1200",
    uploadedAt: "2026-09-12T09:15:00.000Z",
    uploadedBy: "Talathi R. P. Sawant (Devbagh Saza)",
    status: "VERIFIED_AND_SANCTIONED",
    overallConfidence: 96.4,
    state: { value: "Maharashtra", rawText: "महाराष्ट्र शासन महसूल विभाग", confidence: 99 },
    district: { value: "Sindhudurg", rawText: "सिंधुदुर्ग", confidence: 98 },
    tehsil: { value: "Malvan", rawText: "मालवण", confidence: 98 },
    village: { value: "Devbagh", rawText: "देवबाग", confidence: 99 },
    censusVillageCode: { value: "566890", rawText: "५६६८९०", confidence: 98 },
    khasraNumber: { value: "84/1", rawText: "गट क्र. ८४/१", confidence: 96, isHandwritten: false },
    khataNumber: { value: "210", rawText: "खाते क्र. २१०", confidence: 97, isHandwritten: false },
    subDivisionNumber: { value: "1", rawText: "हिस्सा १", confidence: 95 },
    primaryOwnerName: { value: "Ganesh Pandurang Parab", rawText: "गणेश पांडुरंग परब", confidence: 95, isHandwritten: false },
    parentageOrSpouse: { value: "Pandurang Mahadev Parab", rawText: "पांडुरंग महादेव परब", confidence: 94 },
    totalOwnersCount: 2,
    coSharers: [
      {
        id: "CS-DEV-01",
        name: "Sunita Ganesh Parab",
        relation: "Wife",
        shareFraction: "1/2",
        shareAreaSqMeters: 4047,
        panOrAadhaarRef: "XXXX-XXXX-9124"
      }
    ],
    landClassification: { value: "Agricultural (Alphonso Bagayat)", rawText: "जिरायत / बागायत हापूस आंबा", confidence: 95 },
    irrigationSource: { value: "Coastal Dugwell & River Spring", rawText: "विहीर व खाडी किनारा झरा", confidence: 92 },
    totalAreaDeclared: { value: 0.81, rawText: "०.८१ हे.", confidence: 96 },
    declaredUnit: { value: "GUNTHA", confidence: 98 },
    normalizedAreaSqMeters: 8094,
    annualLandRevenue: { value: 39.25, rawText: "₹39.25", confidence: 94 },
    encumbranceStatus: { value: "CLEAR", rawText: "निरंक / बोजा नाही", confidence: 97 },
    mutations: [
      {
        mutationNumber: "MH-SIN-MUT-2024-841",
        dateOfOrder: "2024-05-18",
        sanctioningOfficer: "Talathi Devbagh",
        mutationType: "INHERITANCE",
        transferor: "Late Pandurang Parab",
        transferee: "Ganesh Pandurang Parab",
        status: "SANCTIONED",
        remarks: "Succession entry sanctioned in favor of Ganesh Parab & Sunita Parab"
      }
    ]
  },
  {
    id: "REC-HP-KUL-NAG-1121",
    documentNumber: "HP-KUL-NAG-2024-JAM-112",
    documentType: "JAMABANDI",
    primaryLanguage: "hindi",
    script: "Devanagari (हिन्दी)",
    sourceFileName: "HP_Kullu_Naggar_112_1.pdf",
    sourceImageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=1200",
    uploadedAt: "2026-09-14T11:20:00.000Z",
    uploadedBy: "Patwari K. S. Thakur (Naggar Circle)",
    status: "VERIFIED_AND_SANCTIONED",
    overallConfidence: 95.8,
    state: { value: "Himachal Pradesh", rawText: "हिमाचल प्रदेश सरकार - राजस्व विभाग", confidence: 99 },
    district: { value: "Kullu", rawText: "कुल्लू", confidence: 98 },
    tehsil: { value: "Naggar", rawText: "नग्गर", confidence: 98 },
    village: { value: "Naggar", rawText: "नग्गर", confidence: 99 },
    censusVillageCode: { value: "013456", rawText: "०१३४५६", confidence: 97 },
    khasraNumber: { value: "112/1", rawText: "खसरा नं. ११२/१", confidence: 95, isHandwritten: false },
    khataNumber: { value: "67", rawText: "खेवट/खतौनी ६७", confidence: 96, isHandwritten: false },
    subDivisionNumber: { value: "1", rawText: "मिन १", confidence: 94 },
    primaryOwnerName: { value: "Vikramaditya Thakur", rawText: "विक्रमादित्य ठाकुर", confidence: 96, isHandwritten: false },
    parentageOrSpouse: { value: "Rajendra Singh Thakur", rawText: "राजेन्द्र सिंह ठाकुर", confidence: 95 },
    totalOwnersCount: 2,
    coSharers: [
      {
        id: "CS-NAG-01",
        name: "Padma Dolma Thakur",
        relation: "Wife",
        shareFraction: "1/2",
        shareAreaSqMeters: 4450,
        panOrAadhaarRef: "XXXX-XXXX-4512"
      }
    ],
    landClassification: { value: "Terraced Orchard (Bagicha Seb)", rawText: "बाखल अव्वल / बगीचा सेब", confidence: 95 },
    irrigationSource: { value: "Glacial Gravity Kuhl (Snowmelt)", rawText: "कूहल आबपाशी", confidence: 93 },
    totalAreaDeclared: { value: 0.89, rawText: "०.८९ बीघा", confidence: 95 },
    declaredUnit: { value: "BIGHA", confidence: 98 },
    normalizedAreaSqMeters: 8900,
    annualLandRevenue: { value: 32.00, rawText: "₹32.00", confidence: 92 },
    encumbranceStatus: { value: "CLEAR", rawText: "बेबाक / कोई भार नहीं", confidence: 96 },
    mutations: [
      {
        mutationNumber: "HP-KUL-MUT-2024-112",
        dateOfOrder: "2024-04-12",
        sanctioningOfficer: "Tehsildar Naggar",
        mutationType: "PARTITION",
        transferor: "Joint Khewat 67",
        transferee: "Vikramaditya Thakur",
        status: "SANCTIONED",
        remarks: "Family partition between co-sharers recorded under HP Land Revenue Act"
      }
    ]
  },
  {
    id: "REC-RJ-JAI-RAM-4011",
    documentNumber: "RJ-JAI-RAM-2024-JAM-401",
    documentType: "JAMABANDI",
    primaryLanguage: "hindi",
    script: "Devanagari (हिन्दी)",
    sourceFileName: "RJ_Jaisalmer_Ramgarh_401_1.pdf",
    sourceImageUrl: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&q=80&w=1200",
    uploadedAt: "2026-09-15T14:40:00.000Z",
    uploadedBy: "Girdawar S. R. Bhati (Ramgarh)",
    status: "VERIFIED_AND_SANCTIONED",
    overallConfidence: 94.7,
    state: { value: "Rajasthan", rawText: "राजस्थान सरकार राजस्व मण्डल", confidence: 99 },
    district: { value: "Jaisalmer", rawText: "जैसलमेर", confidence: 98 },
    tehsil: { value: "Jaisalmer", rawText: "जैसलमेर", confidence: 98 },
    village: { value: "Ramgarh", rawText: "रामगढ़", confidence: 99 },
    censusVillageCode: { value: "085420", rawText: "०८५४२०", confidence: 96 },
    khasraNumber: { value: "401/1", rawText: "खसरा नं. ४०१/१", confidence: 94, isHandwritten: false },
    khataNumber: { value: "112", rawText: "खाता सं. ११२", confidence: 95, isHandwritten: false },
    subDivisionNumber: { value: "1", rawText: "मुरब्बा ४०१ हिस्सा १", confidence: 93 },
    primaryOwnerName: { value: "Bhairon Singh Bhati", rawText: "भैरव सिंह भाटी", confidence: 95, isHandwritten: false },
    parentageOrSpouse: { value: "Kalyan Singh Bhati", rawText: "कल्याण सिंह भाटी", confidence: 94 },
    totalOwnersCount: 1,
    coSharers: [],
    landClassification: { value: "Agricultural (IGNP Canal Command)", rawText: "नहरी दोमट चाही", confidence: 94 },
    irrigationSource: { value: "IGNP Lift Canal (Sagarmal Gopa Branch)", rawText: "आईजीएनपी सागरमल गोपा लिफ्ट नहर", confidence: 92 },
    totalAreaDeclared: { value: 2.53, rawText: "२.५३ पक्का बीघा", confidence: 94 },
    declaredUnit: { value: "BIGHA", confidence: 99 },
    normalizedAreaSqMeters: 25293,
    annualLandRevenue: { value: 55.60, rawText: "₹55.60", confidence: 91 },
    encumbranceStatus: { value: "CLEAR", rawText: "भारमुक्त", confidence: 96 },
    mutations: [
      {
        mutationNumber: "RJ-JAI-MUT-2024-401",
        dateOfOrder: "2024-03-09",
        sanctioningOfficer: "Naib Tehsildar Ramgarh",
        mutationType: "INHERITANCE",
        transferor: "Late Kalyan Singh Bhati",
        transferee: "Bhairon Singh Bhati",
        status: "SANCTIONED",
        remarks: "Khatedari succession sanctioned following Colonisation Bandobast"
      }
    ]
  },
  {
    id: "REC-KL-ALP-NED-0781",
    documentNumber: "KL-ALP-KUT-2024-TR-078",
    documentType: "PATTA_CHITTA",
    primaryLanguage: "malayalam",
    script: "Malayalam (മലയാളം)",
    sourceFileName: "KL_Alappuzha_Kuttanad_Nedumudi_78_1.pdf",
    sourceImageUrl: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=1200",
    uploadedAt: "2026-09-16T10:10:00.000Z",
    uploadedBy: "Village Officer V. K. Nair (Nedumudi)",
    status: "VERIFIED_AND_SANCTIONED",
    overallConfidence: 96.1,
    state: { value: "Kerala", rawText: "കേരള സർക്കാർ റവന്യൂ വകുപ്പ്", confidence: 99 },
    district: { value: "Alappuzha", rawText: "ആലപ്പുഴ", confidence: 98 },
    tehsil: { value: "Kuttanad", rawText: "കുട്ടനാട്", confidence: 98 },
    village: { value: "Nedumudi", rawText: "നെടുമുടി", confidence: 99 },
    censusVillageCode: { value: "628312", rawText: "൬൨൮൩൧൨", confidence: 97 },
    khasraNumber: { value: "78/1", rawText: "സർവേ നം. ൭൮/൧", confidence: 95, isHandwritten: false },
    khataNumber: { value: "TH-340", rawText: "താണ്ഡപ്പേർ ൩൪൦", confidence: 96, isHandwritten: false },
    subDivisionNumber: { value: "1", rawText: "ഉപവിഭാഗം ൧", confidence: 94 },
    primaryOwnerName: { value: "Kuriakose Thomas Palathinkal", rawText: "കുര്യാക്കോസ് തോമസ് പാലത്തിങ്കൽ", confidence: 95, isHandwritten: false },
    parentageOrSpouse: { value: "Thomas Kuriakose Palathinkal", rawText: "തോമസ് കുര്യാക്കോസ്", confidence: 94 },
    totalOwnersCount: 2,
    coSharers: [
      {
        id: "CS-NED-01",
        name: "Mary Kuriakose",
        relation: "Wife",
        shareFraction: "1/2",
        shareAreaSqMeters: 3600,
        panOrAadhaarRef: "XXXX-XXXX-6712"
      }
    ],
    landClassification: { value: "Kari Wetland (Padasekharam Paddy)", rawText: "കരി നിലം / നെൽപാടം", confidence: 96 },
    irrigationSource: { value: "Padasekharam Polder Dewatering System", rawText: "പടശേഖര പമ്പിംഗ് സംവിധാനം", confidence: 94 },
    totalAreaDeclared: { value: 0.72, rawText: "൭൨ സെന്റ്", confidence: 96 },
    declaredUnit: { value: "HECTARE", confidence: 99 },
    normalizedAreaSqMeters: 7200,
    annualLandRevenue: { value: 37.40, rawText: "₹37.40", confidence: 93 },
    encumbranceStatus: { value: "CLEAR", rawText: "ബാധ്യതകൾ ഇല്ല", confidence: 97 },
    mutations: [
      {
        mutationNumber: "KL-ALP-MUT-2024-078",
        dateOfOrder: "2024-06-21",
        sanctioningOfficer: "Tahsildar Kuttanad",
        mutationType: "INHERITANCE",
        transferor: "Late Thomas Kuriakose",
        transferee: "Kuriakose Thomas Palathinkal",
        status: "SANCTIONED",
        remarks: "Thandaper passbook updated under Kerala Land Reforms Act 1963"
      }
    ]
  },
  {
    id: "REC-AS-MAJ-GAR-1561",
    documentNumber: "AS-MAJ-KAM-2024-JAM-156",
    documentType: "JAMABANDI",
    primaryLanguage: "assamese",
    script: "Bengali-Assamese (অসমীয়া)",
    sourceFileName: "AS_Majuli_Garmur_156_1.pdf",
    sourceImageUrl: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=1200",
    uploadedAt: "2026-09-17T08:30:00.000Z",
    uploadedBy: "Mandal B. C. Das (Garmur Lot)",
    status: "VERIFIED_AND_SANCTIONED",
    overallConfidence: 94.9,
    state: { value: "Assam", rawText: "অসম চৰকাৰ ৰাজহ আৰু দুৰ্যোগ ব্যৱস্থাপনা বিভাগ", confidence: 99 },
    district: { value: "Majuli", rawText: "মাজুলী", confidence: 98 },
    tehsil: { value: "Majuli Sub-Division", rawText: "মাজুলী মহকুমা", confidence: 97 },
    village: { value: "Garmur", rawText: "গড়মূৰ", confidence: 99 },
    censusVillageCode: { value: "293410", rawText: "২৯৩৪১০", confidence: 96 },
    khasraNumber: { value: "156/1", rawText: "দাগ নং ১৫৬/১", confidence: 94, isHandwritten: false },
    khataNumber: { value: "PT-88", rawText: "ম্যাদী পট্টা নং ৮৮", confidence: 95, isHandwritten: false },
    subDivisionNumber: { value: "1", rawText: "হিস্যা ১", confidence: 93 },
    primaryOwnerName: { value: "Bipul Chandra Saikia", rawText: "বিপুল চন্দ্ৰ শইকীয়া", confidence: 95, isHandwritten: false },
    parentageOrSpouse: { value: "Mahendra Nath Saikia", rawText: "মহেন্দ্ৰ নাথ শইকীয়া", confidence: 94 },
    totalOwnersCount: 1,
    coSharers: [],
    landClassification: { value: "Riverine Alluvial (Bao Paddy & Mustard)", rawText: "পলি মাটি / ৰূপিত খেতি", confidence: 94 },
    irrigationSource: { value: "Dong Community Earthen Canal", rawText: "ডাং বান্ধ / নলা", confidence: 91 },
    totalAreaDeclared: { value: 1.34, rawText: "১ বিঘা ৩ কঠা", confidence: 94 },
    declaredUnit: { value: "BIGHA", confidence: 98 },
    normalizedAreaSqMeters: 13400,
    annualLandRevenue: { value: 40.20, rawText: "₹40.20", confidence: 91 },
    encumbranceStatus: { value: "CLEAR", rawText: "দায়মুক্ত", confidence: 96 },
    mutations: [
      {
        mutationNumber: "AS-MAJ-MUT-2024-156",
        dateOfOrder: "2024-02-14",
        sanctioningOfficer: "Circle Officer Kamalabari",
        mutationType: "INHERITANCE",
        transferor: "Late Mahendra Nath Saikia",
        transferee: "Bipul Chandra Saikia",
        status: "SANCTIONED",
        remarks: "Periodic Myadi Patta record digitized under Dharitree portal"
      }
    ]
  },
  {
    id: "REC-KA-KOL-BAN-0641",
    documentNumber: "KA-KOL-BAN-2024-RTC-064",
    documentType: "BHOOMI_RTC",
    primaryLanguage: "kannada",
    script: "Kannada (ಕನ್ನಡ)",
    sourceFileName: "KA_Kolar_Bangarapet_64_1.pdf",
    sourceImageUrl: "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&q=80&w=1200",
    uploadedAt: "2026-09-18T12:05:00.000Z",
    uploadedBy: "Village Accountant M. Gowda (Bangarapet Kasaba)",
    status: "VERIFIED_AND_SANCTIONED",
    overallConfidence: 96.7,
    state: { value: "Karnataka", rawText: "ಕರ್ನಾಟಕ ಸರ್ಕಾರ ಕಂದಾಯ ಇಲಾಖೆ", confidence: 99 },
    district: { value: "Kolar", rawText: "ಕೋಲಾರ", confidence: 98 },
    tehsil: { value: "Bangarapet", rawText: "ಬಂಗಾರಪೇಟೆ", confidence: 98 },
    village: { value: "Bangarapet", rawText: "ಬಂಗಾರಪೇಟೆ", confidence: 99 },
    censusVillageCode: { value: "629402", rawText: "೬೨೯೪೦೨", confidence: 97 },
    khasraNumber: { value: "64/1", rawText: "ಸರ್ವೆ ನಂ. ೬೪/೧", confidence: 96, isHandwritten: false },
    khataNumber: { value: "KH-510", rawText: "ಖಾತೆ ನಂ. ೫೧೦", confidence: 97, isHandwritten: false },
    subDivisionNumber: { value: "1", rawText: "ಹಿಸ್ಸಾ ೧", confidence: 95 },
    primaryOwnerName: { value: "K. N. Munivenkatappa", rawText: "ಕೆ. ಎನ್. ಮುನಿವೆಂಕಟಪ್ಪ", confidence: 96, isHandwritten: false },
    parentageOrSpouse: { value: "Narayanappa K.", rawText: "ನಾರಾಯಣಪ್ಪ ಕೆ.", confidence: 95 },
    totalOwnersCount: 2,
    coSharers: [
      {
        id: "CS-BAN-01",
        name: "M. Manjunatha",
        relation: "Son",
        shareFraction: "1/2",
        shareAreaSqMeters: 6070,
        panOrAadhaarRef: "XXXX-XXXX-8821"
      }
    ],
    landClassification: { value: "Dry Agro-Horti (Mulberry Sericulture)", rawText: "ಖುಷ್ಕಿ ರೇಷ್ಮೆ ಹಿಪ್ಪುನೇರಳೆ ತೋಟ", confidence: 95 },
    irrigationSource: { value: "Deep Borewell Micro-Drip & Tank", rawText: "ಕೊಳವೆಬಾವಿ ಹಾಗೂ ಕೆರೆ ಅಚ್ಚುಕಟ್ಟು", confidence: 93 },
    totalAreaDeclared: { value: 1.21, rawText: "೧ ಎಕರೆ ೮ ಗುಂಟೆ", confidence: 96 },
    declaredUnit: { value: "GUNTHA", confidence: 98 },
    normalizedAreaSqMeters: 12140,
    annualLandRevenue: { value: 53.30, rawText: "₹53.30", confidence: 93 },
    encumbranceStatus: { value: "CLEAR", rawText: "ಯಾವುದೇ ಋಣಭಾರವಿಲ್ಲ", confidence: 98 },
    mutations: [
      {
        mutationNumber: "KA-KOL-MUT-2024-510",
        dateOfOrder: "2024-05-30",
        sanctioningOfficer: "Revenue Inspector Kasaba",
        mutationType: "INHERITANCE",
        transferor: "Late Narayanappa K.",
        transferee: "K. N. Munivenkatappa",
        status: "SANCTIONED",
        remarks: "Biometric e-Pahani mutation sanctioned under Bhoomi digital platform"
      }
    ]
  },
  {
    id: "REC-AP-WG-BHI-2301",
    documentNumber: "AP-WG-BHI-2024-1B-230",
    documentType: "PATTA_CHITTA",
    primaryLanguage: "telugu",
    script: "Telugu (తెలుగు)",
    sourceFileName: "AP_WestGodavari_Bhimavaram_230_1.pdf",
    sourceImageUrl: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=1200",
    uploadedAt: "2026-09-19T14:15:00.000Z",
    uploadedBy: "VRO P. S. Raju (Bhimavaram Mandal)",
    status: "VERIFIED_AND_SANCTIONED",
    overallConfidence: 96.0,
    state: { value: "Andhra Pradesh", rawText: "ఆంధ్రప్రదేశ్ ప్రభుత్వం రెవెన్యూ శాఖ", confidence: 99 },
    district: { value: "West Godavari", rawText: "పశ్చిమ గోదావరి", confidence: 98 },
    tehsil: { value: "Bhimavaram", rawText: "భీమవరం", confidence: 98 },
    village: { value: "Bhimavaram", rawText: "భీమవరం", confidence: 99 },
    censusVillageCode: { value: "588492", rawText: "౫౮౮౪౯౨", confidence: 97 },
    khasraNumber: { value: "230/1", rawText: "సర్వే నెం. ౨౩౦/౧", confidence: 95, isHandwritten: false },
    khataNumber: { value: "PPB-914", rawText: "ఖాతా నం. ౯౧౪", confidence: 96, isHandwritten: false },
    subDivisionNumber: { value: "1", rawText: "సబ్-డివిజన్ ౧", confidence: 94 },
    primaryOwnerName: { value: "Venkata Satyanarayana Raju Penmatsa", rawText: "పెన్మత్స వెంకట సత్యనారాయణ రాజు", confidence: 95, isHandwritten: false },
    parentageOrSpouse: { value: "Bhupathi Raju Penmatsa", rawText: "భూపతి రాజు", confidence: 94 },
    totalOwnersCount: 1,
    coSharers: [],
    landClassification: { value: "Aquaculture / Double-Crop Wet Rice", rawText: "మాగాణి రొయ్యల చెరువు", confidence: 95 },
    irrigationSource: { value: "Sir Arthur Cotton Godavari West Canal", rawText: "గోదావరి పశ్చిమ డెల్టా కాలువ", confidence: 94 },
    totalAreaDeclared: { value: 1.42, rawText: "౧.౪౨ ఎకరాలు", confidence: 96 },
    declaredUnit: { value: "ACRE", confidence: 98 },
    normalizedAreaSqMeters: 14164,
    annualLandRevenue: { value: 82.35, rawText: "₹82.35", confidence: 93 },
    encumbranceStatus: { value: "CLEAR", rawText: "నిరంక్", confidence: 97 },
    mutations: [
      {
        mutationNumber: "AP-WG-MUT-2024-914",
        dateOfOrder: "2024-07-08",
        sanctioningOfficer: "Tahsildar Bhimavaram",
        mutationType: "SALE_DEED",
        transferor: "Bhupathi Raju Penmatsa",
        transferee: "Venkata Satyanarayana Raju Penmatsa",
        status: "SANCTIONED",
        remarks: "Webland 1B Adangal passbook issued with digital signature"
      }
    ]
  },
  {
    id: "REC-JK-KUL-DEV-0911",
    documentNumber: "JK-KUL-DEV-2024-JAM-091",
    documentType: "JAMABANDI",
    primaryLanguage: "hindi",
    script: "Nastaliq / Urdu & Devanagari",
    sourceFileName: "JK_Kulgam_Devsar_91_1.pdf",
    sourceImageUrl: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&q=80&w=1200",
    uploadedAt: "2026-09-20T11:45:00.000Z",
    uploadedBy: "Patwari G. M. Bhat (Devsar Halqa)",
    status: "VERIFIED_AND_SANCTIONED",
    overallConfidence: 95.3,
    state: { value: "Jammu & Kashmir", rawText: "حکومت جموں و کشمیر محکمہ مال / राजस्व विभाग", confidence: 99 },
    district: { value: "Kulgam", rawText: "کولگام / कुलगाम", confidence: 98 },
    tehsil: { value: "Devsar", rawText: "دیوسر / देवसर", confidence: 98 },
    village: { value: "Kulgam", rawText: "کولگام", confidence: 99 },
    censusVillageCode: { value: "003290", rawText: "००३२९०", confidence: 96 },
    khasraNumber: { value: "91/1", rawText: "خسرہ نمبر ۹۱/۱", confidence: 94, isHandwritten: false },
    khataNumber: { value: "KH-142", rawText: "کھاتہ نمبر ۱۴۲", confidence: 95, isHandwritten: false },
    subDivisionNumber: { value: "1", rawText: "حصہ ۱", confidence: 93 },
    primaryOwnerName: { value: "Ghulam Mohammad Mir", rawText: "غلام محمد میر / गुलाम मोहम्मद मीर", confidence: 95, isHandwritten: false },
    parentageOrSpouse: { value: "Abdul Gani Mir", rawText: "عبد الغنی میر", confidence: 94 },
    totalOwnersCount: 2,
    coSharers: [
      {
        id: "CS-KUL-01",
        name: "Bashir Ahmad Mir",
        relation: "Son",
        shareFraction: "1/2",
        shareAreaSqMeters: 3794,
        panOrAadhaarRef: "XXXX-XXXX-3345"
      }
    ],
    landClassification: { value: "Karewa Horticultural (GI Saffron & Apple)", rawText: "وُڈّر باغبانی زعفران و سیب", confidence: 95 },
    irrigationSource: { value: "Snowmelt River Kul & Mountain Spring", rawText: "چشمہ و کُل آبپاشی", confidence: 92 },
    totalAreaDeclared: { value: 0.76, rawText: "۱۵ کنال", confidence: 95 },
    declaredUnit: { value: "HECTARE", confidence: 98 },
    normalizedAreaSqMeters: 7588,
    annualLandRevenue: { value: 28.80, rawText: "₹28.80", confidence: 91 },
    encumbranceStatus: { value: "CLEAR", rawText: "صاف / کوئی بوجھ نہیں", confidence: 96 },
    mutations: [
      {
        mutationNumber: "JK-KUL-MUT-2024-091",
        dateOfOrder: "2024-01-19",
        sanctioningOfficer: "Tehsildar Devsar",
        mutationType: "INHERITANCE",
        transferor: "Late Abdul Gani Mir",
        transferee: "Ghulam Mohammad Mir",
        status: "SANCTIONED",
        remarks: "Inheritance mutation entered in Misal-e-Haqiqat register"
      }
    ]
  }
];

export const NEW_VILLAGE_LAND_RECORDS: ExtractedLandRecord[] = RAW_NEW_VILLAGE_LAND_RECORDS.map((rec) => ({
  ...rec,
  preprocessingMetrics: DEFAULT_PREPROCESSING,
  validationResults: DEFAULT_VALIDATION_RESULTS,
  reviewHistory: DEFAULT_REVIEW_HISTORY
}));
