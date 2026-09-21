import { ExtractedLandRecord } from '../types';
import { ADDITIONAL_CADASTRAL_PLOTS, ADDITIONAL_VILLAGE_CENTERS, ADDITIONAL_VILLAGE_INFRASTRUCTURE } from './additionalCadastralPlots';

export interface CadastralPlot {
  id: string;
  khasra: string;
  khata: string;
  owner: string;
  parentage: string;
  areaHa: number;
  areaSqM: number;
  soil: string;
  status: 'CLEAN' | 'LITIGATION' | 'GOVT_RESERVE';
  village: string;
  tehsil: string;
  district: string;
  state: string;
  centroid: { lat: number; lng: number };
  coordinates: Array<{ lat: number; lng: number }>;
  svgPath: string;
  svgCentroid: { x: number; y: number };
  color: string;
  recordId: string | null;
  surveyDate: string;
  benchmarkBearing: string;
  disputeDetails?: string | {
    caseNumber: string;
    court: string;
    disputeType: string;
    stayOrderActive: boolean;
    hearingDate: string;
  };
}

export const CADASTRAL_PLOTS: CadastralPlot[] = [
{
  "id": "PLOT-WAGHOLI-142-1",
  "khasra": "142/1",
  "khata": "882",
  "owner": "Tukaram Eknath Patil",
  "parentage": "S/o Eknath Vitthal Patil",
  "areaHa": 1.42,
  "areaSqM": 14200,
  "soil": "Jirayat Class II (Black Cotton Loam)",
  "status": "CLEAN",
  "village": "Wagholi",
  "tehsil": "Haveli",
  "district": "Pune",
  "state": "Maharashtra",
  "centroid": {
    "lat": 18.5815,
    "lng": 73.981
  },
  "coordinates": [
    {
      "lat": 18.5822,
      "lng": 73.9802
    },
    {
      "lat": 18.5824,
      "lng": 73.9818
    },
    {
      "lat": 18.5808,
      "lng": 73.9819
    },
    {
      "lat": 18.5806,
      "lng": 73.9803
    }
  ],
  "svgPath": "M 115 85 L 235 90 L 230 185 L 110 180 Z",
  "svgCentroid": {
    "x": 173,
    "y": 133
  },
  "color": "#3D5A40",
  "recordId": "REC-MH-712-8821",
  "surveyDate": "1956 Cadastral Revision (DILRMP Verified) - Jan 2026",
  "benchmarkBearing": "N 14° 15' E"
},
{
  "id": "PLOT-WAGHOLI-142-2",
  "khasra": "142/2",
  "khata": "883",
  "owner": "Babanrao Mahadev Shinde",
  "parentage": "S/o Mahadev R. Shinde",
  "areaHa": 0.85,
  "areaSqM": 8500,
  "soil": "Bagayat Irrigated (Well & Canal)",
  "status": "LITIGATION",
  "disputeDetails": "Civil court injunction stay order in Partition Suit No. 142/2023. Registry frozen under Sec 52 TPA.",
  "village": "Wagholi",
  "tehsil": "Haveli",
  "district": "Pune",
  "state": "Maharashtra",
  "centroid": {
    "lat": 18.5814,
    "lng": 73.9825
  },
  "coordinates": [
    {
      "lat": 18.5824,
      "lng": 73.9818
    },
    {
      "lat": 18.5826,
      "lng": 73.9832
    },
    {
      "lat": 18.5809,
      "lng": 73.9833
    },
    {
      "lat": 18.5808,
      "lng": 73.9819
    }
  ],
  "svgPath": "M 235 90 L 355 95 L 350 190 L 230 185 Z",
  "svgCentroid": {
    "x": 292,
    "y": 140
  },
  "color": "#8B0000",
  "recordId": null,
  "surveyDate": "1957 Aks Shajra Digital Settlement (Audit) - May 2026",
  "benchmarkBearing": "N 18° 30' E"
},
{
  "id": "PLOT-WAGHOLI-141",
  "khasra": "141",
  "khata": "879",
  "owner": "D. B. Jadhav",
  "parentage": "S/o Balasaheb Jadhav",
  "areaHa": 2.1,
  "areaSqM": 21000,
  "soil": "Jirayat Class I (Fertile Alluvial Clay)",
  "status": "CLEAN",
  "village": "Wagholi",
  "tehsil": "Haveli",
  "district": "Pune",
  "state": "Maharashtra",
  "centroid": {
    "lat": 18.5832,
    "lng": 73.9811
  },
  "coordinates": [
    {
      "lat": 18.584,
      "lng": 73.9803
    },
    {
      "lat": 18.5842,
      "lng": 73.9819
    },
    {
      "lat": 18.5824,
      "lng": 73.9818
    },
    {
      "lat": 18.5822,
      "lng": 73.9802
    }
  ],
  "svgPath": "M 115 -5 L 355 0 L 355 95 L 235 90 L 115 85 Z",
  "svgCentroid": {
    "x": 235,
    "y": 43
  },
  "color": "#8B4513",
  "recordId": null,
  "surveyDate": "1958 Consolidation Bandobast (DGPS Verified) - Sep 2026",
  "benchmarkBearing": "N 21° 45' E"
},
{
  "id": "PLOT-WAGHOLI-143",
  "khasra": "143",
  "khata": "891",
  "owner": "Kishore B. Patil",
  "parentage": "S/o Baburao Patil",
  "areaHa": 1.15,
  "areaSqM": 11500,
  "soil": "Jirayat Class II",
  "status": "CLEAN",
  "village": "Wagholi",
  "tehsil": "Haveli",
  "district": "Pune",
  "state": "Maharashtra",
  "centroid": {
    "lat": 18.5834,
    "lng": 73.9826
  },
  "coordinates": [
    {
      "lat": 18.5842,
      "lng": 73.9819
    },
    {
      "lat": 18.5843,
      "lng": 73.9833
    },
    {
      "lat": 18.5826,
      "lng": 73.9832
    },
    {
      "lat": 18.5824,
      "lng": 73.9818
    }
  ],
  "svgPath": "M 110 180 L 350 190 L 345 280 L 105 270 Z",
  "svgCentroid": {
    "x": 227,
    "y": 230
  },
  "color": "#3D5A40",
  "recordId": null,
  "surveyDate": "1959 Revenue Settlement Revision (Certified) - Jan 2026",
  "benchmarkBearing": "N 24° 10' E"
},
{
  "id": "PLOT-WAGHOLI-140",
  "khasra": "140",
  "khata": "865",
  "owner": "Gram Panchayat Common Land (Gair Mumkin / Gochar)",
  "parentage": "Government Revenue Dept",
  "areaHa": 3.4,
  "areaSqM": 34000,
  "soil": "Gair Mumkin / Abadi Grazing",
  "status": "GOVT_RESERVE",
  "disputeDetails": "Encroachment notice served under Section 50 Maharashtra Land Revenue Code 1966.",
  "village": "Wagholi",
  "tehsil": "Haveli",
  "district": "Pune",
  "state": "Maharashtra",
  "centroid": {
    "lat": 18.5798,
    "lng": 73.9817
  },
  "coordinates": [
    {
      "lat": 18.5806,
      "lng": 73.9803
    },
    {
      "lat": 18.5809,
      "lng": 73.9833
    },
    {
      "lat": 18.5788,
      "lng": 73.9831
    },
    {
      "lat": 18.5786,
      "lng": 73.9801
    }
  ],
  "svgPath": "M -5 85 L 115 85 L 110 180 L -10 175 Z",
  "svgCentroid": {
    "x": 53,
    "y": 131
  },
  "color": "#5A5A40",
  "recordId": null,
  "surveyDate": "1960 SVAMITVA Drone Orthophoto Verification - May 2026",
  "benchmarkBearing": "N 27° 55' E"
},
{
  "id": "PLOT-BABATPUR-512",
  "khasra": "512",
  "khata": "00142",
  "owner": "Dharmendra Nath Tiwari",
  "parentage": "S/o Late Kedarnath Tiwari",
  "areaHa": 2.53,
  "areaSqM": 25300,
  "soil": "Dumat Loam (Nahri Canals Fed)",
  "status": "CLEAN",
  "village": "Babatpur",
  "tehsil": "Pindra",
  "district": "Varanasi",
  "state": "Uttar Pradesh",
  "centroid": {
    "lat": 25.4498,
    "lng": 82.8596
  },
  "coordinates": [
    {
      "lat": 25.451,
      "lng": 82.858
    },
    {
      "lat": 25.4512,
      "lng": 82.8612
    },
    {
      "lat": 25.4485,
      "lng": 82.861
    },
    {
      "lat": 25.4483,
      "lng": 82.8578
    }
  ],
  "svgPath": "M 170 85 L 290 90 L 285 185 L 165 180 Z",
  "svgCentroid": {
    "x": 228,
    "y": 133
  },
  "color": "#3D5A40",
  "recordId": "REC-UP-KHASRA-5120",
  "surveyDate": "1961 Cadastral Revision (DILRMP Verified) - Apr 2026",
  "benchmarkBearing": "N 31° 20' E"
},
{
  "id": "PLOT-BABATPUR-513",
  "khasra": "513",
  "khata": "00143",
  "owner": "Ramakant Ramprasad Mishra",
  "parentage": "S/o Ramprasad Mishra",
  "areaHa": 1.85,
  "areaSqM": 18500,
  "soil": "Dumat Loam (Double Crop Irrigated)",
  "status": "CLEAN",
  "village": "Babatpur",
  "tehsil": "Pindra",
  "district": "Varanasi",
  "state": "Uttar Pradesh",
  "centroid": {
    "lat": 25.4499,
    "lng": 82.8628
  },
  "coordinates": [
    {
      "lat": 25.4512,
      "lng": 82.8612
    },
    {
      "lat": 25.4514,
      "lng": 82.8644
    },
    {
      "lat": 25.4486,
      "lng": 82.8642
    },
    {
      "lat": 25.4485,
      "lng": 82.861
    }
  ],
  "svgPath": "M 290 90 L 410 95 L 405 190 L 285 185 Z",
  "svgCentroid": {
    "x": 347,
    "y": 140
  },
  "color": "#3D5A40",
  "recordId": null,
  "surveyDate": "1962 Aks Shajra Digital Settlement (Audit) - Aug 2026",
  "benchmarkBearing": "N 35° 40' E"
},
{
  "id": "PLOT-BABATPUR-511",
  "khasra": "511",
  "khata": "00139",
  "owner": "Shyam Sundar Lal",
  "parentage": "S/o Murli Manohar Lal",
  "areaHa": 2.11,
  "areaSqM": 21100,
  "soil": "Nahri Irrigated (Tube-well & Canal)",
  "status": "LITIGATION",
  "disputeDetails": "Boundary dispute suit pending before Sub-Divisional Magistrate (SDM) Pindra under Sec 24 UP Revenue Code 2006.",
  "village": "Babatpur",
  "tehsil": "Pindra",
  "district": "Varanasi",
  "state": "Uttar Pradesh",
  "centroid": {
    "lat": 25.4525,
    "lng": 82.8595
  },
  "coordinates": [
    {
      "lat": 25.4538,
      "lng": 82.8579
    },
    {
      "lat": 25.454,
      "lng": 82.8611
    },
    {
      "lat": 25.4512,
      "lng": 82.8612
    },
    {
      "lat": 25.451,
      "lng": 82.858
    }
  ],
  "svgPath": "M 170 -5 L 410 0 L 410 95 L 290 90 L 170 85 Z",
  "svgCentroid": {
    "x": 290,
    "y": 43
  },
  "color": "#8B0000",
  "recordId": null,
  "surveyDate": "1963 Consolidation Bandobast (DGPS Verified) - Dec 2026",
  "benchmarkBearing": "N 39° 05' E"
},
{
  "id": "PLOT-BABATPUR-514",
  "khasra": "514",
  "khata": "00001",
  "owner": "Gaon Sabha Pokhari (Village Pond & Waterbody)",
  "parentage": "Revenue Dept (Sec 77 Public Utility)",
  "areaHa": 1.6,
  "areaSqM": 16000,
  "soil": "Jalmagna / Water Reservoir (Non-agricultural)",
  "status": "GOVT_RESERVE",
  "disputeDetails": "Protected public waterbody under Hinch Lal Tiwari v. Kamala Devi (Supreme Court). No alienation permitted.",
  "village": "Babatpur",
  "tehsil": "Pindra",
  "district": "Varanasi",
  "state": "Uttar Pradesh",
  "centroid": {
    "lat": 25.447,
    "lng": 82.8594
  },
  "coordinates": [
    {
      "lat": 25.4483,
      "lng": 82.8578
    },
    {
      "lat": 25.4485,
      "lng": 82.861
    },
    {
      "lat": 25.4457,
      "lng": 82.8608
    },
    {
      "lat": 25.4455,
      "lng": 82.8576
    }
  ],
  "svgPath": "M 165 180 L 405 190 L 400 280 L 160 270 Z",
  "svgCentroid": {
    "x": 282,
    "y": 230
  },
  "color": "#2F6B55",
  "recordId": null,
  "surveyDate": "1964 Revenue Settlement Revision (Certified) - Apr 2026",
  "benchmarkBearing": "N 42° 50' E"
},
{
  "id": "PLOT-RAIKOT-34--12-2",
  "khasra": "34//12/2",
  "khata": "104/218",
  "owner": "Gurpreet Singh & Balwinder Kaur",
  "parentage": "S/o Baldev Singh",
  "areaHa": 1.62,
  "areaSqM": 16187,
  "soil": "Nehri / Chahi (Canal & Tubewell Irrigated)",
  "status": "LITIGATION",
  "disputeDetails": "Civil Suit No. 41/2023 pending before Senior Sub-Judge Jagraon regarding partition dispute.",
  "village": "Raikot",
  "tehsil": "Jagraon",
  "district": "Ludhiana",
  "state": "Punjab",
  "centroid": {
    "lat": 30.6495,
    "lng": 75.4825
  },
  "coordinates": [
    {
      "lat": 30.651,
      "lng": 75.481
    },
    {
      "lat": 30.6512,
      "lng": 75.4842
    },
    {
      "lat": 30.648,
      "lng": 75.484
    },
    {
      "lat": 30.6478,
      "lng": 75.4808
    }
  ],
  "svgPath": "M 225 85 L 345 90 L 340 185 L 220 180 Z",
  "svgCentroid": {
    "x": 283,
    "y": 133
  },
  "color": "#8B0000",
  "recordId": "REC-PB-JAM-3412",
  "surveyDate": "1965 Sub-division Demarcation Bandobast - Apr 2026",
  "benchmarkBearing": "N 46° 15' E"
},
{
  "id": "PLOT-RAIKOT-34--12-1",
  "khasra": "34//12/1",
  "khata": "104/219",
  "owner": "Tejinder Singh Grewal",
  "parentage": "S/o Baldev Singh (Branch B)",
  "areaHa": 1.41,
  "areaSqM": 14164,
  "soil": "Nehri Irrigated Wheat-Paddy",
  "status": "CLEAN",
  "village": "Raikot",
  "tehsil": "Jagraon",
  "district": "Ludhiana",
  "state": "Punjab",
  "centroid": {
    "lat": 30.6496,
    "lng": 75.4792
  },
  "coordinates": [
    {
      "lat": 30.651,
      "lng": 75.4776
    },
    {
      "lat": 30.651,
      "lng": 75.4808
    },
    {
      "lat": 30.6482,
      "lng": 75.4808
    },
    {
      "lat": 30.648,
      "lng": 75.4776
    }
  ],
  "svgPath": "M 345 90 L 465 95 L 460 190 L 340 185 Z",
  "svgCentroid": {
    "x": 402,
    "y": 140
  },
  "color": "#3D5A40",
  "recordId": null,
  "surveyDate": "1966 Cadastral Revision (DILRMP Verified) - Aug 2026",
  "benchmarkBearing": "N 49° 35' E"
},
{
  "id": "PLOT-RAIKOT-34--11",
  "khasra": "34//11",
  "khata": "102/210",
  "owner": "Sohan Singh Grewal",
  "parentage": "S/o Pritam Singh",
  "areaHa": 2.02,
  "areaSqM": 20234,
  "soil": "Chahi (Borewell Irrigated)",
  "status": "CLEAN",
  "village": "Raikot",
  "tehsil": "Jagraon",
  "district": "Ludhiana",
  "state": "Punjab",
  "centroid": {
    "lat": 30.6528,
    "lng": 75.4825
  },
  "coordinates": [
    {
      "lat": 30.6542,
      "lng": 75.481
    },
    {
      "lat": 30.6544,
      "lng": 75.4842
    },
    {
      "lat": 30.6512,
      "lng": 75.4842
    },
    {
      "lat": 30.651,
      "lng": 75.481
    }
  ],
  "svgPath": "M 225 -5 L 465 0 L 465 95 L 345 90 L 225 85 Z",
  "svgCentroid": {
    "x": 345,
    "y": 43
  },
  "color": "#3D5A40",
  "recordId": null,
  "surveyDate": "1967 Aks Shajra Digital Settlement (Audit) - Dec 2026",
  "benchmarkBearing": "N 53° 00' E"
},
{
  "id": "PLOT-RAIKOT-35--1",
  "khasra": "35//1",
  "khata": "001/001",
  "owner": "Gram Panchayat Shamlat Deh (Common Land)",
  "parentage": "Public Village Body",
  "areaHa": 1.13,
  "areaSqM": 11330,
  "soil": "Gair Mumkin Phirni / Johar",
  "status": "GOVT_RESERVE",
  "disputeDetails": "Village commons protected under Punjab Village Common Lands Act 1961.",
  "village": "Raikot",
  "tehsil": "Jagraon",
  "district": "Ludhiana",
  "state": "Punjab",
  "centroid": {
    "lat": 30.6465,
    "lng": 75.4825
  },
  "coordinates": [
    {
      "lat": 30.6478,
      "lng": 75.4808
    },
    {
      "lat": 30.648,
      "lng": 75.484
    },
    {
      "lat": 30.645,
      "lng": 75.484
    },
    {
      "lat": 30.645,
      "lng": 75.4808
    }
  ],
  "svgPath": "M 220 180 L 460 190 L 455 280 L 215 270 Z",
  "svgCentroid": {
    "x": 337,
    "y": 230
  },
  "color": "#B8860B",
  "recordId": null,
  "surveyDate": "1968 Consolidation Bandobast (DGPS Verified) - Apr 2026",
  "benchmarkBearing": "N 56° 25' E"
},
{
  "id": "PLOT-HULLAHALLI-89-3",
  "khasra": "89/3",
  "khata": "KH-402",
  "owner": "Basavaraju M. & Chennamma B.",
  "parentage": "Late Marigowda",
  "areaHa": 1.21,
  "areaSqM": 12140,
  "soil": "Wetland (Tari - Kabini Canal Irrigated)",
  "status": "CLEAN",
  "village": "Hullahalli",
  "tehsil": "Nanjangud",
  "district": "Mysuru",
  "state": "Karnataka",
  "centroid": {
    "lat": 12.1175,
    "lng": 76.6795
  },
  "coordinates": [
    {
      "lat": 12.119,
      "lng": 76.678
    },
    {
      "lat": 12.1192,
      "lng": 76.6812
    },
    {
      "lat": 12.116,
      "lng": 76.681
    },
    {
      "lat": 12.1158,
      "lng": 76.6778
    }
  ],
  "svgPath": "M 280 85 L 400 90 L 395 185 L 275 180 Z",
  "svgCentroid": {
    "x": 338,
    "y": 133
  },
  "color": "#3D5A40",
  "recordId": "REC-KA-RTC-8930",
  "surveyDate": "1969 SVAMITVA Drone Orthophoto Verification - Apr 2026",
  "benchmarkBearing": "N 60° 10' E"
},
{
  "id": "PLOT-HULLAHALLI-89-2",
  "khasra": "89/2",
  "khata": "KH-401",
  "owner": "Puttaswamy Gowda",
  "parentage": "S/o Ningegowda",
  "areaHa": 1.01,
  "areaSqM": 10117,
  "soil": "Wetland (Tari Paddy)",
  "status": "CLEAN",
  "village": "Hullahalli",
  "tehsil": "Nanjangud",
  "district": "Mysuru",
  "state": "Karnataka",
  "centroid": {
    "lat": 12.1175,
    "lng": 76.6763
  },
  "coordinates": [
    {
      "lat": 12.119,
      "lng": 76.6748
    },
    {
      "lat": 12.119,
      "lng": 76.6778
    },
    {
      "lat": 12.1158,
      "lng": 76.6778
    },
    {
      "lat": 12.1158,
      "lng": 76.6748
    }
  ],
  "svgPath": "M 400 90 L 520 95 L 515 190 L 395 185 Z",
  "svgCentroid": {
    "x": 457,
    "y": 140
  },
  "color": "#3D5A40",
  "recordId": null,
  "surveyDate": "1970 Sub-division Demarcation Bandobast - Aug 2026",
  "benchmarkBearing": "N 63° 45' E"
},
{
  "id": "PLOT-HULLAHALLI-90-1",
  "khasra": "90/1",
  "khata": "KH-408",
  "owner": "Nanjundaiah Swamy",
  "parentage": "S/o Siddalingaiah",
  "areaHa": 1.7,
  "areaSqM": 17000,
  "soil": "Garden Land (Bagayat Coconut / Areca)",
  "status": "LITIGATION",
  "disputeDetails": "Injunction suit in OS No. 219/2023 before Senior Civil Judge Nanjangud regarding field bund encroachment.",
  "village": "Hullahalli",
  "tehsil": "Nanjangud",
  "district": "Mysuru",
  "state": "Karnataka",
  "centroid": {
    "lat": 12.1176,
    "lng": 76.6828
  },
  "coordinates": [
    {
      "lat": 12.1192,
      "lng": 76.6812
    },
    {
      "lat": 12.1194,
      "lng": 76.6844
    },
    {
      "lat": 12.116,
      "lng": 76.6842
    },
    {
      "lat": 12.116,
      "lng": 76.681
    }
  ],
  "svgPath": "M 280 -5 L 520 0 L 520 95 L 400 90 L 280 85 Z",
  "svgCentroid": {
    "x": 400,
    "y": 43
  },
  "color": "#8B0000",
  "recordId": null,
  "surveyDate": "1971 Cadastral Revision (DILRMP Verified) - Dec 2026",
  "benchmarkBearing": "N 67° 20' E"
},
{
  "id": "PLOT-HULLAHALLI-89-1",
  "khasra": "89/1",
  "khata": "KH-001",
  "owner": "Karnataka Forest Department Reserve",
  "parentage": "Social Forestry Division",
  "areaHa": 2.42,
  "areaSqM": 24200,
  "soil": "Gomal / Government Reserve",
  "status": "GOVT_RESERVE",
  "disputeDetails": "Notified reserve forest catchment area under Section 4 Karnataka Forest Act.",
  "village": "Hullahalli",
  "tehsil": "Nanjangud",
  "district": "Mysuru",
  "state": "Karnataka",
  "centroid": {
    "lat": 12.1205,
    "lng": 76.6795
  },
  "coordinates": [
    {
      "lat": 12.122,
      "lng": 76.678
    },
    {
      "lat": 12.1222,
      "lng": 76.6812
    },
    {
      "lat": 12.1192,
      "lng": 76.6812
    },
    {
      "lat": 12.119,
      "lng": 76.678
    }
  ],
  "svgPath": "M 275 180 L 515 190 L 510 280 L 270 270 Z",
  "svgCentroid": {
    "x": 392,
    "y": 230
  },
  "color": "#2F6B55",
  "recordId": null,
  "surveyDate": "1972 Aks Shajra Digital Settlement (Audit) - Apr 2026",
  "benchmarkBearing": "N 71° 05' E"
},
{
  "id": "PLOT-MORIJA-312-1",
  "khasra": "312/1",
  "khata": "00214",
  "owner": "Sawai Singh Rathore",
  "parentage": "S/o Bhawani Singh Rathore",
  "areaHa": 3.25,
  "areaSqM": 32500,
  "soil": "Chahi Barani (Canal & Deep Tubewell Fed)",
  "status": "CLEAN",
  "village": "Morija",
  "tehsil": "Chomu",
  "district": "Jaipur",
  "state": "Rajasthan",
  "centroid": {
    "lat": 27.1645,
    "lng": 75.7285
  },
  "coordinates": [
    {
      "lat": 27.1662,
      "lng": 75.7268
    },
    {
      "lat": 27.1664,
      "lng": 75.7302
    },
    {
      "lat": 27.1628,
      "lng": 75.73
    },
    {
      "lat": 27.1626,
      "lng": 75.7266
    }
  ],
  "svgPath": "M 335 85 L 455 90 L 450 185 L 330 180 Z",
  "svgCentroid": {
    "x": 393,
    "y": 133
  },
  "color": "#3D5A40",
  "recordId": "REC-RJ-JAM-9102",
  "surveyDate": "1973 Revenue Settlement Revision (Certified) - Apr 2026",
  "benchmarkBearing": "N 74° 50' E"
},
{
  "id": "PLOT-MORIJA-312-2",
  "khasra": "312/2",
  "khata": "00215",
  "owner": "Gajendra Singh Rathore",
  "parentage": "S/o Bhawani Singh Rathore (Branch B)",
  "areaHa": 1.8,
  "areaSqM": 18000,
  "soil": "Barani Doyam (Rainfed Mustard & Bajra)",
  "status": "CLEAN",
  "village": "Morija",
  "tehsil": "Chomu",
  "district": "Jaipur",
  "state": "Rajasthan",
  "centroid": {
    "lat": 27.1646,
    "lng": 75.732
  },
  "coordinates": [
    {
      "lat": 27.1664,
      "lng": 75.7302
    },
    {
      "lat": 27.1665,
      "lng": 75.7335
    },
    {
      "lat": 27.1629,
      "lng": 75.7334
    },
    {
      "lat": 27.1628,
      "lng": 75.73
    }
  ],
  "svgPath": "M 455 90 L 575 95 L 570 190 L 450 185 Z",
  "svgCentroid": {
    "x": 512,
    "y": 140
  },
  "color": "#3D5A40",
  "recordId": null,
  "surveyDate": "1974 SVAMITVA Drone Orthophoto Verification - Aug 2026",
  "benchmarkBearing": "N 78° 15' E"
},
{
  "id": "PLOT-MORIJA-311",
  "khasra": "311",
  "khata": "00208",
  "owner": "Ram Swaroop Sharma",
  "parentage": "S/o Moolchand Sharma",
  "areaHa": 2.4,
  "areaSqM": 24000,
  "soil": "Chahi Awwal (Double Cropped)",
  "status": "LITIGATION",
  "disputeDetails": "Partition and right-of-way appeal pending before Revenue Appellate Authority (RAA) Jaipur.",
  "village": "Morija",
  "tehsil": "Chomu",
  "district": "Jaipur",
  "state": "Rajasthan",
  "centroid": {
    "lat": 27.1645,
    "lng": 75.725
  },
  "coordinates": [
    {
      "lat": 27.166,
      "lng": 75.7235
    },
    {
      "lat": 27.1662,
      "lng": 75.7268
    },
    {
      "lat": 27.1626,
      "lng": 75.7266
    },
    {
      "lat": 27.1625,
      "lng": 75.7233
    }
  ],
  "svgPath": "M 335 -5 L 575 0 L 575 95 L 455 90 L 335 85 Z",
  "svgCentroid": {
    "x": 455,
    "y": 43
  },
  "color": "#8B0000",
  "recordId": null,
  "surveyDate": "1975 Sub-division Demarcation Bandobast - Dec 2026",
  "benchmarkBearing": "N 81° 40' E"
},
{
  "id": "PLOT-MORIJA-313",
  "khasra": "313",
  "khata": "00007",
  "owner": "Gochar / Oran Bhumi (Gram Panchayat Morija)",
  "parentage": "Protected Pasture Commons",
  "areaHa": 4.1,
  "areaSqM": 41000,
  "soil": "Gair Mumkin Rasta & Oran",
  "status": "GOVT_RESERVE",
  "disputeDetails": "Protected public pasture land under Rajasthan Tenancy Act Section 16. Encroachment strictly prohibited.",
  "village": "Morija",
  "tehsil": "Chomu",
  "district": "Jaipur",
  "state": "Rajasthan",
  "centroid": {
    "lat": 27.168,
    "lng": 75.7285
  },
  "coordinates": [
    {
      "lat": 27.1698,
      "lng": 75.7268
    },
    {
      "lat": 27.17,
      "lng": 75.7302
    },
    {
      "lat": 27.1664,
      "lng": 75.7302
    },
    {
      "lat": 27.1662,
      "lng": 75.7268
    }
  ],
  "svgPath": "M 330 180 L 570 190 L 565 280 L 325 270 Z",
  "svgCentroid": {
    "x": 447,
    "y": 230
  },
  "color": "#B8860B",
  "recordId": null,
  "surveyDate": "1976 Cadastral Revision (DILRMP Verified) - Apr 2026",
  "benchmarkBearing": "N 85° 05' E"
},
{
  "id": "PLOT-SHELA-214",
  "khasra": "214",
  "khata": "00518",
  "owner": "Patel Bhikhabhai Somabhai",
  "parentage": "S/o Somabhai N. Patel",
  "areaHa": 1.82,
  "areaSqM": 18200,
  "soil": "Bagayat Irrigated (Narmada Sub-canal)",
  "status": "CLEAN",
  "village": "Shela",
  "tehsil": "Sanand",
  "district": "Ahmedabad",
  "state": "Gujarat",
  "centroid": {
    "lat": 22.9985,
    "lng": 72.459
  },
  "coordinates": [
    {
      "lat": 23,
      "lng": 72.4575
    },
    {
      "lat": 23.0002,
      "lng": 72.4608
    },
    {
      "lat": 22.997,
      "lng": 72.4605
    },
    {
      "lat": 22.9968,
      "lng": 72.4572
    }
  ],
  "svgPath": "M 140 130 L 260 135 L 255 230 L 135 225 Z",
  "svgCentroid": {
    "x": 198,
    "y": 178
  },
  "color": "#3D5A40",
  "recordId": "REC-GJ-712-4421",
  "surveyDate": "1977 Consolidation Bandobast (DGPS Verified) - Apr 2026",
  "benchmarkBearing": "N 12° 20' W"
},
{
  "id": "PLOT-SHELA-215",
  "khasra": "215",
  "khata": "00519",
  "owner": "Patel Jayeshkumar Bhikhabhai",
  "parentage": "S/o Bhikhabhai S. Patel",
  "areaHa": 2.09,
  "areaSqM": 20900,
  "soil": "Bagayat Wheat & Cotton",
  "status": "CLEAN",
  "village": "Shela",
  "tehsil": "Sanand",
  "district": "Ahmedabad",
  "state": "Gujarat",
  "centroid": {
    "lat": 22.9986,
    "lng": 72.4625
  },
  "coordinates": [
    {
      "lat": 23.0002,
      "lng": 72.4608
    },
    {
      "lat": 23.0004,
      "lng": 72.464
    },
    {
      "lat": 22.9971,
      "lng": 72.4638
    },
    {
      "lat": 22.997,
      "lng": 72.4605
    }
  ],
  "svgPath": "M 260 135 L 380 140 L 375 235 L 255 230 Z",
  "svgCentroid": {
    "x": 317,
    "y": 185
  },
  "color": "#3D5A40",
  "recordId": null,
  "surveyDate": "1978 Revenue Settlement Revision (Certified) - Aug 2026",
  "benchmarkBearing": "N 16° 45' W"
},
{
  "id": "PLOT-SHELA-213",
  "khasra": "213",
  "khata": "00512",
  "owner": "Manilal Kanjibhai Vankar",
  "parentage": "S/o Kanjibhai Vankar",
  "areaHa": 1.45,
  "areaSqM": 14500,
  "soil": "Jirayat Class I",
  "status": "LITIGATION",
  "disputeDetails": "Tenancy dispute under Gujarat Agricultural Lands Ceiling Act before Mamlatdar Sanand.",
  "village": "Shela",
  "tehsil": "Sanand",
  "district": "Ahmedabad",
  "state": "Gujarat",
  "centroid": {
    "lat": 22.9984,
    "lng": 72.4555
  },
  "coordinates": [
    {
      "lat": 22.9998,
      "lng": 72.454
    },
    {
      "lat": 23,
      "lng": 72.4575
    },
    {
      "lat": 22.9968,
      "lng": 72.4572
    },
    {
      "lat": 22.9966,
      "lng": 72.4538
    }
  ],
  "svgPath": "M 140 40 L 380 45 L 380 140 L 260 135 L 140 130 Z",
  "svgCentroid": {
    "x": 260,
    "y": 88
  },
  "color": "#8B0000",
  "recordId": null,
  "surveyDate": "1979 SVAMITVA Drone Orthophoto Verification - Dec 2026",
  "benchmarkBearing": "N 20° 10' W"
},
{
  "id": "PLOT-SHELA-216",
  "khasra": "216",
  "khata": "00002",
  "owner": "Shela Gam Talav & Drainage Channel",
  "parentage": "Sanand Taluka Panchayat",
  "areaHa": 3.5,
  "areaSqM": 35000,
  "soil": "Waterbody / Khara Kharaba",
  "status": "GOVT_RESERVE",
  "disputeDetails": "Natural reservoir catchment protected under Gujarat Water Conservation norms.",
  "village": "Shela",
  "tehsil": "Sanand",
  "district": "Ahmedabad",
  "state": "Gujarat",
  "centroid": {
    "lat": 22.995,
    "lng": 72.459
  },
  "coordinates": [
    {
      "lat": 22.9968,
      "lng": 72.4572
    },
    {
      "lat": 22.997,
      "lng": 72.4605
    },
    {
      "lat": 22.9935,
      "lng": 72.4605
    },
    {
      "lat": 22.9932,
      "lng": 72.457
    }
  ],
  "svgPath": "M 135 225 L 375 235 L 370 325 L 130 315 Z",
  "svgCentroid": {
    "x": 252,
    "y": 275
  },
  "color": "#2F6B55",
  "recordId": null,
  "surveyDate": "1980 Sub-division Demarcation Bandobast - Apr 2026",
  "benchmarkBearing": "N 23° 35' W"
},
{
  "id": "PLOT-BILKISGANJ-184-2",
  "khasra": "184/2",
  "khata": "00329",
  "owner": "Shivnarayan Patidar",
  "parentage": "S/o Babulal Patidar",
  "areaHa": 2.41,
  "areaSqM": 24100,
  "soil": "Kali Gehri Mitti (Deep Black Soil - Soybean/Wheat)",
  "status": "CLEAN",
  "village": "Bilkisganj",
  "tehsil": "Sehore",
  "district": "Sehore",
  "state": "Madhya Pradesh",
  "centroid": {
    "lat": 23.112,
    "lng": 77.2045
  },
  "coordinates": [
    {
      "lat": 23.1135,
      "lng": 77.203
    },
    {
      "lat": 23.1137,
      "lng": 77.2062
    },
    {
      "lat": 23.1105,
      "lng": 77.206
    },
    {
      "lat": 23.1103,
      "lng": 77.2028
    }
  ],
  "svgPath": "M 195 130 L 315 135 L 310 230 L 190 225 Z",
  "svgCentroid": {
    "x": 253,
    "y": 178
  },
  "color": "#3D5A40",
  "recordId": "REC-MP-KHASRA-618",
  "surveyDate": "1981 Aks Shajra Digital Settlement (Audit) - Apr 2026",
  "benchmarkBearing": "N 27° 00' W"
},
{
  "id": "PLOT-BILKISGANJ-184-1",
  "khasra": "184/1",
  "khata": "00330",
  "owner": "Kailash Patidar",
  "parentage": "S/o Babulal Patidar (Branch B)",
  "areaHa": 1.95,
  "areaSqM": 19500,
  "soil": "Kali Gehri Sinchit (Well Irrigated)",
  "status": "CLEAN",
  "village": "Bilkisganj",
  "tehsil": "Sehore",
  "district": "Sehore",
  "state": "Madhya Pradesh",
  "centroid": {
    "lat": 23.1121,
    "lng": 77.2078
  },
  "coordinates": [
    {
      "lat": 23.1137,
      "lng": 77.2062
    },
    {
      "lat": 23.1138,
      "lng": 77.2094
    },
    {
      "lat": 23.1106,
      "lng": 77.2092
    },
    {
      "lat": 23.1105,
      "lng": 77.206
    }
  ],
  "svgPath": "M 315 135 L 435 140 L 430 235 L 310 230 Z",
  "svgCentroid": {
    "x": 372,
    "y": 185
  },
  "color": "#3D5A40",
  "recordId": null,
  "surveyDate": "1982 Consolidation Bandobast (DGPS Verified) - Aug 2026",
  "benchmarkBearing": "N 30° 25' W"
},
{
  "id": "PLOT-BILKISGANJ-183",
  "khasra": "183",
  "khata": "00324",
  "owner": "Jagdish Prasad Verma",
  "parentage": "S/o Ramdayal Verma",
  "areaHa": 2.8,
  "areaSqM": 28000,
  "soil": "Pali / Dumat (Medium Black)",
  "status": "LITIGATION",
  "disputeDetails": "Partition dispute pending before Sub-Divisional Officer (SDO) Sehore under MP Land Revenue Code Sec 178.",
  "village": "Bilkisganj",
  "tehsil": "Sehore",
  "district": "Sehore",
  "state": "Madhya Pradesh",
  "centroid": {
    "lat": 23.112,
    "lng": 77.2012
  },
  "coordinates": [
    {
      "lat": 23.1134,
      "lng": 77.1996
    },
    {
      "lat": 23.1135,
      "lng": 77.203
    },
    {
      "lat": 23.1103,
      "lng": 77.2028
    },
    {
      "lat": 23.1102,
      "lng": 77.1995
    }
  ],
  "svgPath": "M 195 40 L 435 45 L 435 140 L 315 135 L 195 130 Z",
  "svgCentroid": {
    "x": 315,
    "y": 88
  },
  "color": "#8B0000",
  "recordId": null,
  "surveyDate": "1983 Revenue Settlement Revision (Certified) - Dec 2026",
  "benchmarkBearing": "N 34° 50' W"
},
{
  "id": "PLOT-BILKISGANJ-185",
  "khasra": "185",
  "khata": "00003",
  "owner": "Shaskiya Charan Bhumi (Govt Grazing Reserve)",
  "parentage": "MP Revenue Dept",
  "areaHa": 5.2,
  "areaSqM": 52000,
  "soil": "Charagah / Pasture Land",
  "status": "GOVT_RESERVE",
  "disputeDetails": "Dedicated public pasture for village livestock under MP Land Revenue Code Section 237.",
  "village": "Bilkisganj",
  "tehsil": "Sehore",
  "district": "Sehore",
  "state": "Madhya Pradesh",
  "centroid": {
    "lat": 23.1152,
    "lng": 77.2045
  },
  "coordinates": [
    {
      "lat": 23.117,
      "lng": 77.203
    },
    {
      "lat": 23.1172,
      "lng": 77.2062
    },
    {
      "lat": 23.1137,
      "lng": 77.2062
    },
    {
      "lat": 23.1135,
      "lng": 77.203
    }
  ],
  "svgPath": "M 190 225 L 430 235 L 425 325 L 185 315 Z",
  "svgCentroid": {
    "x": 307,
    "y": 275
  },
  "color": "#2F6B55",
  "recordId": null,
  "surveyDate": "1984 SVAMITVA Drone Orthophoto Verification - Apr 2026",
  "benchmarkBearing": "N 38° 15' W"
},
{
  "id": "PLOT-ANAIMALAI-409-2A",
  "khasra": "409/2A",
  "khata": "1842",
  "owner": "S. Marimuthu Gounder",
  "parentage": "Subbiah Gounder",
  "areaHa": 2.15,
  "areaSqM": 21500,
  "soil": "Thottam / Nanjai (Irrigated Coconut Grove)",
  "status": "CLEAN",
  "village": "Anaimalai",
  "tehsil": "Pollachi",
  "district": "Coimbatore",
  "state": "Tamil Nadu",
  "centroid": {
    "lat": 10.5807,
    "lng": 76.9864
  },
  "coordinates": [
    {
      "lat": 10.582,
      "lng": 76.985
    },
    {
      "lat": 10.5822,
      "lng": 76.988
    },
    {
      "lat": 10.5795,
      "lng": 76.9878
    },
    {
      "lat": 10.5793,
      "lng": 76.9848
    }
  ],
  "svgPath": "M 250 130 L 370 135 L 365 230 L 245 225 Z",
  "svgCentroid": {
    "x": 308,
    "y": 178
  },
  "color": "#3D5A40",
  "recordId": "REC-TN-PATTA-4109",
  "surveyDate": "1985 Cadastral Revision (DILRMP Verified) - Apr 2026",
  "benchmarkBearing": "N 41° 40' W"
},
{
  "id": "PLOT-TARAORI-45--18-1",
  "khasra": "45//18/1",
  "khata": "78/142",
  "owner": "Chaudhary Harphool Singh",
  "parentage": "Deep Chand",
  "areaHa": 3.28,
  "areaSqM": 32800,
  "soil": "Chahi (Basmati Belt)",
  "status": "CLEAN",
  "village": "Taraori",
  "tehsil": "Nilokheri",
  "district": "Karnal",
  "state": "Haryana",
  "centroid": {
    "lat": 29.8122,
    "lng": 76.9639
  },
  "coordinates": [
    {
      "lat": 29.814,
      "lng": 76.962
    },
    {
      "lat": 29.8143,
      "lng": 76.966
    },
    {
      "lat": 29.8105,
      "lng": 76.9658
    },
    {
      "lat": 29.8102,
      "lng": 76.9618
    }
  ],
  "svgPath": "M 305 130 L 425 135 L 420 230 L 300 225 Z",
  "svgCentroid": {
    "x": 363,
    "y": 178
  },
  "color": "#3D5A40",
  "recordId": "REC-HR-JAM-5519",
  "surveyDate": "1988 SVAMITVA Drone Orthophoto Verification - Jan 2026",
  "benchmarkBearing": "N 52° 15' W"
},
  ...ADDITIONAL_CADASTRAL_PLOTS
];

export const VILLAGE_INFRASTRUCTURE: Record<string, { canals?: Array<Array<{ lat: number; lng: number }>>; roads?: Array<Array<{ lat: number; lng: number }>> }> = {
  Wagholi: {
    canals: [
      [
        { lat: 18.5845, lng: 73.9790 },
        { lat: 18.5835, lng: 73.9810 },
        { lat: 18.5825, lng: 73.9825 },
        { lat: 18.5810, lng: 73.9845 }
      ]
    ],
    roads: [
      [
        { lat: 18.5805, lng: 73.9785 },
        { lat: 18.5807, lng: 73.9810 },
        { lat: 18.5808, lng: 73.9835 },
        { lat: 18.5809, lng: 73.9850 }
      ]
    ]
  },
  Babatpur: {
    canals: [
      [
        { lat: 25.4545, lng: 82.8565 },
        { lat: 25.4515, lng: 82.8595 },
        { lat: 25.4485, lng: 82.8625 },
        { lat: 25.4455, lng: 82.8655 }
      ]
    ],
    roads: [
      [
        { lat: 25.4484, lng: 82.8560 },
        { lat: 25.4485, lng: 82.8595 },
        { lat: 25.4486, lng: 82.8630 },
        { lat: 25.4487, lng: 82.8660 }
      ]
    ]
  },
  Raikot: {
    canals: [
      [
        { lat: 30.6550, lng: 75.4760 },
        { lat: 30.6520, lng: 75.4800 },
        { lat: 30.6490, lng: 75.4840 },
        { lat: 30.6450, lng: 75.4880 }
      ]
    ],
    roads: [
      [
        { lat: 30.6478, lng: 75.4750 },
        { lat: 30.6480, lng: 75.4800 },
        { lat: 30.6480, lng: 75.4850 },
        { lat: 30.6482, lng: 75.4900 }
      ]
    ]
  },
  Hullahalli: {
    canals: [
      [
        { lat: 12.1230, lng: 76.6730 },
        { lat: 12.1200, lng: 76.6770 },
        { lat: 12.1170, lng: 76.6810 },
        { lat: 12.1140, lng: 76.6850 }
      ]
    ],
    roads: [
      [
        { lat: 12.1158, lng: 76.6730 },
        { lat: 12.1160, lng: 76.6780 },
        { lat: 12.1160, lng: 76.6820 },
        { lat: 12.1162, lng: 76.6860 }
      ]
    ]
  },
  Morija: {
    canals: [
      [
        { lat: 27.1710, lng: 75.7220 },
        { lat: 27.1680, lng: 75.7260 },
        { lat: 27.1640, lng: 75.7300 },
        { lat: 27.1610, lng: 75.7340 }
      ]
    ],
    roads: [
      [
        { lat: 27.1626, lng: 75.7220 },
        { lat: 27.1628, lng: 75.7270 },
        { lat: 27.1629, lng: 75.7310 },
        { lat: 27.1630, lng: 75.7350 }
      ]
    ]
  },
  Shela: {
    canals: [
      [
        { lat: 23.0020, lng: 72.4530 },
        { lat: 22.9990, lng: 72.4570 },
        { lat: 22.9970, lng: 72.4610 },
        { lat: 22.9940, lng: 72.4650 }
      ]
    ],
    roads: [
      [
        { lat: 22.9968, lng: 72.4520 },
        { lat: 22.9970, lng: 72.4570 },
        { lat: 22.9971, lng: 72.4620 },
        { lat: 22.9972, lng: 72.4660 }
      ]
    ]
  },
  Bilkisganj: {
    canals: [
      [
        { lat: 23.1180, lng: 77.1980 },
        { lat: 23.1140, lng: 77.2020 },
        { lat: 23.1110, lng: 77.2060 },
        { lat: 23.1080, lng: 77.2100 }
      ]
    ],
    roads: [
      [
        { lat: 23.1103, lng: 77.1980 },
        { lat: 23.1105, lng: 77.2030 },
        { lat: 23.1106, lng: 77.2070 },
        { lat: 23.1108, lng: 77.2110 }
      ]
    ]
  },
  ...ADDITIONAL_VILLAGE_INFRASTRUCTURE
};

export const VILLAGE_CENTERS: Record<string, { lat: number; lng: number; zoom: number; label: string; state: string; district: string; tehsil: string }> = {
  Wagholi: {
    lat: 18.5815,
    lng: 73.9817,
    zoom: 17,
    label: 'Wagholi, Haveli Tehsil, Pune',
    state: 'Maharashtra',
    district: 'Pune',
    tehsil: 'Haveli'
  },
  Babatpur: {
    lat: 25.4498,
    lng: 82.8596,
    zoom: 17,
    label: 'Babatpur, Pindra Tehsil, Varanasi',
    state: 'Uttar Pradesh',
    district: 'Varanasi',
    tehsil: 'Pindra'
  },
  Raikot: {
    lat: 30.6495,
    lng: 75.4825,
    zoom: 17,
    label: 'Raikot, Jagraon Tehsil, Ludhiana',
    state: 'Punjab',
    district: 'Ludhiana',
    tehsil: 'Jagraon'
  },
  Hullahalli: {
    lat: 12.1175,
    lng: 76.6795,
    zoom: 17,
    label: 'Hullahalli, Nanjangud Tehsil, Mysuru',
    state: 'Karnataka',
    district: 'Mysuru',
    tehsil: 'Nanjangud'
  },
  Morija: {
    lat: 27.1645,
    lng: 75.7285,
    zoom: 17,
    label: 'Morija, Chomu Tehsil, Jaipur',
    state: 'Rajasthan',
    district: 'Jaipur',
    tehsil: 'Chomu'
  },
  Shela: {
    lat: 22.9985,
    lng: 72.4590,
    zoom: 17,
    label: 'Shela, Sanand Tehsil, Ahmedabad',
    state: 'Gujarat',
    district: 'Ahmedabad',
    tehsil: 'Sanand'
  },
  Bilkisganj: {
    lat: 23.1120,
    lng: 77.2045,
    zoom: 17,
    label: 'Bilkisganj, Sehore Tehsil, Sehore',
    state: 'Madhya Pradesh',
    district: 'Sehore',
    tehsil: 'Sehore'
  },
  Anaimalai: {
    lat: 10.5807,
    lng: 76.9864,
    zoom: 17,
    label: 'Anaimalai, Pollachi Tehsil, Coimbatore',
    state: 'Tamil Nadu',
    district: 'Coimbatore',
    tehsil: 'Pollachi'
  },
  Taraori: {
    lat: 29.8122,
    lng: 76.9639,
    zoom: 17,
    label: 'Taraori, Nilokheri Tehsil, Karnal',
    state: 'Haryana',
    district: 'Karnal',
    tehsil: 'Nilokheri'
  },
  ...ADDITIONAL_VILLAGE_CENTERS
};

