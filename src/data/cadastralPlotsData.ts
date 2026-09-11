export interface CadastralPlot {
  khasra: string;
  khata: string;
  owner: string;
  parentage: string;
  areaHa: number;
  areaSqM: number;
  soil: string;
  status: 'CLEAN' | 'LITIGATION' | 'GOVT_RESERVE' | 'ENCROACHMENT_SUSPECTED';
  disputeDetails?: string;
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
}

export const CADASTRAL_PLOTS: CadastralPlot[] = [
  {
    khasra: '142/1',
    khata: '882',
    owner: 'Tukaram Eknath Patil',
    parentage: 'S/o Eknath Vitthal Patil',
    areaHa: 1.42,
    areaSqM: 14200,
    soil: 'Jirayat Class II (Black Cotton Loam)',
    status: 'CLEAN',
    village: 'Wagholi',
    tehsil: 'Haveli',
    district: 'Pune',
    state: 'Maharashtra',
    centroid: { lat: 18.5815, lng: 73.9810 },
    coordinates: [
      { lat: 18.5822, lng: 73.9802 },
      { lat: 18.5824, lng: 73.9818 },
      { lat: 18.5808, lng: 73.9819 },
      { lat: 18.5806, lng: 73.9803 }
    ],
    svgPath: 'M 180 140 L 320 150 L 310 270 L 170 260 Z',
    svgCentroid: { x: 245, y: 205 },
    color: '#3D5A40',
    recordId: 'REC-MH-712-8821',
    surveyDate: '1984 Cadastral Revision (DILRMP Verified 2026)',
    benchmarkBearing: 'N 24° 15\' E'
  },
  {
    khasra: '142/2',
    khata: '883',
    owner: 'Babanrao Mahadev Shinde',
    parentage: 'S/o Mahadev R. Shinde',
    areaHa: 0.85,
    areaSqM: 8500,
    soil: 'Bagayat Irrigated (Well & Canal)',
    status: 'LITIGATION',
    disputeDetails: 'Civil court injunction stay order in Partition Suit No. 142/2023. Registry frozen under Sec 52 TPA.',
    village: 'Wagholi',
    tehsil: 'Haveli',
    district: 'Pune',
    state: 'Maharashtra',
    centroid: { lat: 18.5814, lng: 73.9825 },
    coordinates: [
      { lat: 18.5824, lng: 73.9818 },
      { lat: 18.5826, lng: 73.9832 },
      { lat: 18.5809, lng: 73.9833 },
      { lat: 18.5808, lng: 73.9819 }
    ],
    svgPath: 'M 320 150 L 440 160 L 430 280 L 310 270 Z',
    svgCentroid: { x: 375, y: 215 },
    color: '#8B0000',
    recordId: null,
    surveyDate: '1984 Cadastral Survey',
    benchmarkBearing: 'N 28° 40\' E'
  },
  {
    khasra: '141',
    khata: '879',
    owner: 'D. B. Jadhav',
    parentage: 'S/o Balasaheb Jadhav',
    areaHa: 2.10,
    areaSqM: 21000,
    soil: 'Jirayat Class I (Fertile Alluvial Clay)',
    status: 'CLEAN',
    village: 'Wagholi',
    tehsil: 'Haveli',
    district: 'Pune',
    state: 'Maharashtra',
    centroid: { lat: 18.5832, lng: 73.9811 },
    coordinates: [
      { lat: 18.5840, lng: 73.9803 },
      { lat: 18.5842, lng: 73.9819 },
      { lat: 18.5824, lng: 73.9818 },
      { lat: 18.5822, lng: 73.9802 }
    ],
    svgPath: 'M 190 40 L 330 50 L 320 150 L 180 140 Z',
    svgCentroid: { x: 255, y: 95 },
    color: '#8B4513',
    recordId: null,
    surveyDate: '1984 Cadastral Survey',
    benchmarkBearing: 'N 18° 10\' E'
  },
  {
    khasra: '143',
    khata: '891',
    owner: 'Kishore B. Patil',
    parentage: 'S/o Baburao Patil',
    areaHa: 1.15,
    areaSqM: 11500,
    soil: 'Jirayat Class II',
    status: 'CLEAN',
    village: 'Wagholi',
    tehsil: 'Haveli',
    district: 'Pune',
    state: 'Maharashtra',
    centroid: { lat: 18.5834, lng: 73.9826 },
    coordinates: [
      { lat: 18.5842, lng: 73.9819 },
      { lat: 18.5843, lng: 73.9833 },
      { lat: 18.5826, lng: 73.9832 },
      { lat: 18.5824, lng: 73.9818 }
    ],
    svgPath: 'M 440 160 L 560 170 L 550 290 L 430 280 Z',
    svgCentroid: { x: 495, y: 225 },
    color: '#3D5A40',
    recordId: null,
    surveyDate: '1984 Cadastral Survey',
    benchmarkBearing: 'N 31° 05\' E'
  },
  {
    khasra: '140',
    khata: '865',
    owner: 'Gram Panchayat Common Land (Gair Mumkin / Gochar)',
    parentage: 'Government Revenue Dept',
    areaHa: 3.40,
    areaSqM: 34000,
    soil: 'Gair Mumkin / Abadi Grazing',
    status: 'GOVT_RESERVE',
    disputeDetails: 'Encroachment notice served under Section 50 Maharashtra Land Revenue Code 1966.',
    village: 'Wagholi',
    tehsil: 'Haveli',
    district: 'Pune',
    state: 'Maharashtra',
    centroid: { lat: 18.5798, lng: 73.9817 },
    coordinates: [
      { lat: 18.5806, lng: 73.9803 },
      { lat: 18.5809, lng: 73.9833 },
      { lat: 18.5788, lng: 73.9831 },
      { lat: 18.5786, lng: 73.9801 }
    ],
    svgPath: 'M 170 260 L 430 280 L 420 380 L 160 360 Z',
    svgCentroid: { x: 295, y: 320 },
    color: '#5A5A40',
    recordId: null,
    surveyDate: '1984 Cadastral Survey',
    benchmarkBearing: 'N 22° 45\' E'
  },
  {
    khasra: '512',
    khata: '00142',
    owner: 'Dharmendra Nath Tiwari',
    parentage: 'S/o Late Kedarnath Tiwari',
    areaHa: 2.53,
    areaSqM: 25300,
    soil: 'Dumat Loam (Nahri Canals Fed)',
    status: 'CLEAN',
    village: 'Babatpur',
    tehsil: 'Pindra',
    district: 'Varanasi',
    state: 'Uttar Pradesh',
    centroid: { lat: 25.4498, lng: 82.8596 },
    coordinates: [
      { lat: 25.4510, lng: 82.8580 },
      { lat: 25.4512, lng: 82.8612 },
      { lat: 25.4485, lng: 82.8610 },
      { lat: 25.4483, lng: 82.8578 }
    ],
    svgPath: 'M 560 170 L 680 180 L 670 300 L 550 290 Z',
    svgCentroid: { x: 615, y: 235 },
    color: '#3D5A40',
    recordId: 'REC-UP-KHASRA-5120',
    surveyDate: '2018 Settlement Revision',
    benchmarkBearing: 'N 12° 30\' E'
  },
  {
    khasra: '513',
    khata: '00143',
    owner: 'Ramakant Ramprasad Mishra',
    parentage: 'S/o Ramprasad Mishra',
    areaHa: 1.85,
    areaSqM: 18500,
    soil: 'Dumat Loam (Double Crop Irrigated)',
    status: 'CLEAN',
    village: 'Babatpur',
    tehsil: 'Pindra',
    district: 'Varanasi',
    state: 'Uttar Pradesh',
    centroid: { lat: 25.4499, lng: 82.8628 },
    coordinates: [
      { lat: 25.4512, lng: 82.8612 },
      { lat: 25.4514, lng: 82.8644 },
      { lat: 25.4486, lng: 82.8642 },
      { lat: 25.4485, lng: 82.8610 }
    ],
    svgPath: 'M 680 180 L 800 190 L 790 310 L 670 300 Z',
    svgCentroid: { x: 735, y: 245 },
    color: '#3D5A40',
    recordId: null,
    surveyDate: '2018 Settlement Revision',
    benchmarkBearing: 'N 14° 10\' E'
  },
  {
    khasra: '511',
    khata: '00139',
    owner: 'Shyam Sundar Lal',
    parentage: 'S/o Murli Manohar Lal',
    areaHa: 2.10,
    areaSqM: 21000,
    soil: 'Nahri Irrigated (Tube-well & Canal)',
    status: 'LITIGATION',
    disputeDetails: 'Boundary dispute suit pending before Sub-Divisional Magistrate (SDM) Pindra under Sec 24 UP Revenue Code 2006.',
    village: 'Babatpur',
    tehsil: 'Pindra',
    district: 'Varanasi',
    state: 'Uttar Pradesh',
    centroid: { lat: 25.4525, lng: 82.8595 },
    coordinates: [
      { lat: 25.4538, lng: 82.8579 },
      { lat: 25.4540, lng: 82.8611 },
      { lat: 25.4512, lng: 82.8612 },
      { lat: 25.4510, lng: 82.8580 }
    ],
    svgPath: 'M 560 50 L 680 60 L 670 170 L 550 160 Z',
    svgCentroid: { x: 615, y: 110 },
    color: '#8B0000',
    recordId: null,
    surveyDate: '2018 Settlement Revision',
    benchmarkBearing: 'N 09° 45\' E'
  },
  {
    khasra: '514',
    khata: '00001',
    owner: 'Gaon Sabha Pokhari (Village Pond & Waterbody)',
    parentage: 'Revenue Dept (Sec 77 Public Utility)',
    areaHa: 1.60,
    areaSqM: 16000,
    soil: 'Jalmagna / Water Reservoir (Non-agricultural)',
    status: 'GOVT_RESERVE',
    disputeDetails: 'Protected public waterbody under Hinch Lal Tiwari v. Kamala Devi (Supreme Court). No alienation permitted.',
    village: 'Babatpur',
    tehsil: 'Pindra',
    district: 'Varanasi',
    state: 'Uttar Pradesh',
    centroid: { lat: 25.4470, lng: 82.8594 },
    coordinates: [
      { lat: 25.4483, lng: 82.8578 },
      { lat: 25.4485, lng: 82.8610 },
      { lat: 25.4457, lng: 82.8608 },
      { lat: 25.4455, lng: 82.8576 }
    ],
    svgPath: 'M 550 300 L 670 310 L 660 410 L 540 400 Z',
    svgCentroid: { x: 605, y: 355 },
    color: '#2F6B55',
    recordId: null,
    surveyDate: '2018 Settlement Revision',
    benchmarkBearing: 'N 16° 20\' E'
  },

  // Punjab - Raikot (Ludhiana District)
  {
    khasra: '34//12/2',
    khata: '104/218',
    owner: 'Gurpreet Singh & Balwinder Kaur',
    parentage: 'S/o Baldev Singh',
    areaHa: 1.62,
    areaSqM: 16187,
    soil: 'Nehri / Chahi (Canal & Tubewell Irrigated)',
    status: 'LITIGATION',
    disputeDetails: 'Civil Suit No. 41/2023 pending before Senior Sub-Judge Jagraon regarding partition dispute.',
    village: 'Raikot',
    tehsil: 'Jagraon',
    district: 'Ludhiana',
    state: 'Punjab',
    centroid: { lat: 30.6495, lng: 75.4825 },
    coordinates: [
      { lat: 30.6510, lng: 75.4810 },
      { lat: 30.6512, lng: 75.4842 },
      { lat: 30.6480, lng: 75.4840 },
      { lat: 30.6478, lng: 75.4808 }
    ],
    svgPath: 'M 200 120 L 340 125 L 335 250 L 195 245 Z',
    svgCentroid: { x: 265, y: 185 },
    color: '#8B0000',
    recordId: 'REC-PB-JAM-3412',
    surveyDate: '1998 Jamabandi Revision',
    benchmarkBearing: 'N 05° 15\' W'
  },
  {
    khasra: '34//12/1',
    khata: '104/219',
    owner: 'Tejinder Singh Grewal',
    parentage: 'S/o Baldev Singh',
    areaHa: 1.41,
    areaSqM: 14164,
    soil: 'Nehri Irrigated Wheat-Paddy',
    status: 'CLEAN',
    village: 'Raikot',
    tehsil: 'Jagraon',
    district: 'Ludhiana',
    state: 'Punjab',
    centroid: { lat: 30.6496, lng: 75.4792 },
    coordinates: [
      { lat: 30.6510, lng: 75.4776 },
      { lat: 30.6510, lng: 75.4808 },
      { lat: 30.6482, lng: 75.4808 },
      { lat: 30.6480, lng: 75.4776 }
    ],
    svgPath: 'M 60 120 L 195 125 L 190 250 L 55 245 Z',
    svgCentroid: { x: 125, y: 185 },
    color: '#3D5A40',
    recordId: null,
    surveyDate: '1998 Jamabandi Revision',
    benchmarkBearing: 'N 04° 45\' W'
  },
  {
    khasra: '34//11',
    khata: '102/210',
    owner: 'Sohan Singh Grewal',
    parentage: 'S/o Pritam Singh',
    areaHa: 2.02,
    areaSqM: 20234,
    soil: 'Chahi (Borewell Irrigated)',
    status: 'CLEAN',
    village: 'Raikot',
    tehsil: 'Jagraon',
    district: 'Ludhiana',
    state: 'Punjab',
    centroid: { lat: 30.6528, lng: 75.4825 },
    coordinates: [
      { lat: 30.6542, lng: 75.4810 },
      { lat: 30.6544, lng: 75.4842 },
      { lat: 30.6512, lng: 75.4842 },
      { lat: 30.6510, lng: 75.4810 }
    ],
    svgPath: 'M 200 10 L 340 15 L 335 120 L 195 115 Z',
    svgCentroid: { x: 265, y: 65 },
    color: '#3D5A40',
    recordId: null,
    surveyDate: '1998 Jamabandi Revision',
    benchmarkBearing: 'N 03° 10\' W'
  },
  {
    khasra: '35//1',
    khata: '001/001',
    owner: 'Gram Panchayat Shamlat Deh (Common Land)',
    parentage: 'Public Village Body',
    areaHa: 1.13,
    areaSqM: 11330,
    soil: 'Gair Mumkin Phirni / Johar',
    status: 'GOVT_RESERVE',
    disputeDetails: 'Village commons protected under Punjab Village Common Lands Act 1961.',
    village: 'Raikot',
    tehsil: 'Jagraon',
    district: 'Ludhiana',
    state: 'Punjab',
    centroid: { lat: 30.6465, lng: 75.4825 },
    coordinates: [
      { lat: 30.6478, lng: 75.4808 },
      { lat: 30.6480, lng: 75.4840 },
      { lat: 30.6450, lng: 75.4840 },
      { lat: 30.6450, lng: 75.4808 }
    ],
    svgPath: 'M 200 255 L 340 260 L 335 370 L 195 365 Z',
    svgCentroid: { x: 265, y: 310 },
    color: '#B8860B',
    recordId: null,
    surveyDate: '1998 Jamabandi Revision',
    benchmarkBearing: 'N 02° 30\' W'
  },

  // Karnataka - Hullahalli (Mysuru District)
  {
    khasra: '89/3',
    khata: 'KH-402',
    owner: 'Basavaraju M. & Chennamma B.',
    parentage: 'Late Marigowda',
    areaHa: 1.21,
    areaSqM: 12140,
    soil: 'Wetland (Tari - Kabini Canal Irrigated)',
    status: 'CLEAN',
    village: 'Hullahalli',
    tehsil: 'Nanjangud',
    district: 'Mysuru',
    state: 'Karnataka',
    centroid: { lat: 12.1175, lng: 76.6795 },
    coordinates: [
      { lat: 12.1190, lng: 76.6780 },
      { lat: 12.1192, lng: 76.6812 },
      { lat: 12.1160, lng: 76.6810 },
      { lat: 12.1158, lng: 76.6778 }
    ],
    svgPath: 'M 210 130 L 350 135 L 345 260 L 205 255 Z',
    svgCentroid: { x: 275, y: 195 },
    color: '#3D5A40',
    recordId: 'REC-KA-RTC-8930',
    surveyDate: '2024 Bhoomi 3.0 Settlement',
    benchmarkBearing: 'S 82° 10\' E'
  },
  {
    khasra: '89/2',
    khata: 'KH-401',
    owner: 'Puttaswamy Gowda',
    parentage: 'S/o Ningegowda',
    areaHa: 1.01,
    areaSqM: 10117,
    soil: 'Wetland (Tari Paddy)',
    status: 'CLEAN',
    village: 'Hullahalli',
    tehsil: 'Nanjangud',
    district: 'Mysuru',
    state: 'Karnataka',
    centroid: { lat: 12.1175, lng: 76.6763 },
    coordinates: [
      { lat: 12.1190, lng: 76.6748 },
      { lat: 12.1190, lng: 76.6778 },
      { lat: 12.1158, lng: 76.6778 },
      { lat: 12.1158, lng: 76.6748 }
    ],
    svgPath: 'M 70 130 L 205 135 L 200 260 L 65 255 Z',
    svgCentroid: { x: 135, y: 195 },
    color: '#3D5A40',
    recordId: null,
    surveyDate: '2024 Bhoomi 3.0 Settlement',
    benchmarkBearing: 'S 81° 40\' E'
  },
  {
    khasra: '90/1',
    khata: 'KH-408',
    owner: 'Nanjundaiah Swamy',
    parentage: 'S/o Siddalingaiah',
    areaHa: 1.70,
    areaSqM: 17000,
    soil: 'Garden Land (Bagayat Coconut / Areca)',
    status: 'LITIGATION',
    disputeDetails: 'Injunction suit in OS No. 219/2023 before Senior Civil Judge Nanjangud regarding field bund encroachment.',
    village: 'Hullahalli',
    tehsil: 'Nanjangud',
    district: 'Mysuru',
    state: 'Karnataka',
    centroid: { lat: 12.1176, lng: 76.6828 },
    coordinates: [
      { lat: 12.1192, lng: 76.6812 },
      { lat: 12.1194, lng: 76.6844 },
      { lat: 12.1160, lng: 76.6842 },
      { lat: 12.1160, lng: 76.6810 }
    ],
    svgPath: 'M 350 135 L 480 140 L 475 260 L 345 255 Z',
    svgCentroid: { x: 410, y: 195 },
    color: '#8B0000',
    recordId: null,
    surveyDate: '2024 Bhoomi 3.0 Settlement',
    benchmarkBearing: 'S 83° 00\' E'
  },
  {
    khasra: '89/1',
    khata: 'KH-001',
    owner: 'Karnataka Forest Department Reserve',
    parentage: 'Social Forestry Division',
    areaHa: 2.42,
    areaSqM: 24200,
    soil: 'Gomal / Government Reserve',
    status: 'GOVT_RESERVE',
    disputeDetails: 'Notified reserve forest catchment area under Section 4 Karnataka Forest Act.',
    village: 'Hullahalli',
    tehsil: 'Nanjangud',
    district: 'Mysuru',
    state: 'Karnataka',
    centroid: { lat: 12.1205, lng: 76.6795 },
    coordinates: [
      { lat: 12.1220, lng: 76.6780 },
      { lat: 12.1222, lng: 76.6812 },
      { lat: 12.1192, lng: 76.6812 },
      { lat: 12.1190, lng: 76.6780 }
    ],
    svgPath: 'M 210 20 L 350 25 L 345 130 L 205 125 Z',
    svgCentroid: { x: 275, y: 75 },
    color: '#2F6B55',
    recordId: null,
    surveyDate: '2024 Bhoomi 3.0 Settlement',
    benchmarkBearing: 'S 80° 30\' E'
  },

  // Rajasthan - Morija (Chomu Tehsil, Jaipur District)
  {
    khasra: '312/1',
    khata: '00214',
    owner: 'Sawai Singh Rathore',
    parentage: 'S/o Bhawani Singh Rathore',
    areaHa: 3.25,
    areaSqM: 32500,
    soil: 'Chahi Barani (Canal & Deep Tubewell Fed)',
    status: 'CLEAN',
    village: 'Morija',
    tehsil: 'Chomu',
    district: 'Jaipur',
    state: 'Rajasthan',
    centroid: { lat: 27.1645, lng: 75.7285 },
    coordinates: [
      { lat: 27.1662, lng: 75.7268 },
      { lat: 27.1664, lng: 75.7302 },
      { lat: 27.1628, lng: 75.7300 },
      { lat: 27.1626, lng: 75.7266 }
    ],
    svgPath: 'M 220 140 L 370 145 L 365 275 L 215 270 Z',
    svgCentroid: { x: 290, y: 205 },
    color: '#3D5A40',
    recordId: 'REC-RJ-JAM-9102',
    surveyDate: '1992 Settlement Nakal (Apna Khata Digitized)',
    benchmarkBearing: 'N 31° 45\' E'
  },
  {
    khasra: '312/2',
    khata: '00215',
    owner: 'Gajendra Singh Rathore',
    parentage: 'S/o Bhawani Singh Rathore',
    areaHa: 1.80,
    areaSqM: 18000,
    soil: 'Barani Doyam (Rainfed Mustard & Bajra)',
    status: 'CLEAN',
    village: 'Morija',
    tehsil: 'Chomu',
    district: 'Jaipur',
    state: 'Rajasthan',
    centroid: { lat: 27.1646, lng: 75.7320 },
    coordinates: [
      { lat: 27.1664, lng: 75.7302 },
      { lat: 27.1665, lng: 75.7335 },
      { lat: 27.1629, lng: 75.7334 },
      { lat: 27.1628, lng: 75.7300 }
    ],
    svgPath: 'M 370 145 L 500 150 L 495 275 L 365 270 Z',
    svgCentroid: { x: 435, y: 205 },
    color: '#3D5A40',
    recordId: null,
    surveyDate: '1992 Settlement Nakal',
    benchmarkBearing: 'N 32° 15\' E'
  },
  {
    khasra: '311',
    khata: '00208',
    owner: 'Ram Swaroop Sharma',
    parentage: 'S/o Moolchand Sharma',
    areaHa: 2.40,
    areaSqM: 24000,
    soil: 'Chahi Awwal (Double Cropped)',
    status: 'LITIGATION',
    disputeDetails: 'Partition and right-of-way appeal pending before Revenue Appellate Authority (RAA) Jaipur.',
    village: 'Morija',
    tehsil: 'Chomu',
    district: 'Jaipur',
    state: 'Rajasthan',
    centroid: { lat: 27.1645, lng: 75.7250 },
    coordinates: [
      { lat: 27.1660, lng: 75.7235 },
      { lat: 27.1662, lng: 75.7268 },
      { lat: 27.1626, lng: 75.7266 },
      { lat: 27.1625, lng: 75.7233 }
    ],
    svgPath: 'M 80 140 L 215 145 L 210 275 L 75 270 Z',
    svgCentroid: { x: 145, y: 205 },
    color: '#8B0000',
    recordId: null,
    surveyDate: '1992 Settlement Nakal',
    benchmarkBearing: 'N 30° 50\' E'
  },
  {
    khasra: '313',
    khata: '00001',
    owner: 'Gochar / Oran Bhumi (Gram Panchayat Morija)',
    parentage: 'Protected Pasture Commons',
    areaHa: 4.10,
    areaSqM: 41000,
    soil: 'Gair Mumkin Rasta & Oran',
    status: 'GOVT_RESERVE',
    disputeDetails: 'Protected public pasture land under Rajasthan Tenancy Act Section 16. Encroachment strictly prohibited.',
    village: 'Morija',
    tehsil: 'Chomu',
    district: 'Jaipur',
    state: 'Rajasthan',
    centroid: { lat: 27.1680, lng: 75.7285 },
    coordinates: [
      { lat: 27.1698, lng: 75.7268 },
      { lat: 27.1700, lng: 75.7302 },
      { lat: 27.1664, lng: 75.7302 },
      { lat: 27.1662, lng: 75.7268 }
    ],
    svgPath: 'M 220 20 L 370 25 L 365 140 L 215 135 Z',
    svgCentroid: { x: 290, y: 80 },
    color: '#B8860B',
    recordId: null,
    surveyDate: '1992 Settlement Nakal',
    benchmarkBearing: 'N 33° 00\' E'
  },

  // Gujarat - Shela (Sanand Tehsil, Ahmedabad District)
  {
    khasra: '214',
    khata: '00518',
    owner: 'Patel Bhikhabhai Somabhai',
    parentage: 'S/o Somabhai N. Patel',
    areaHa: 1.82,
    areaSqM: 18200,
    soil: 'Bagayat Irrigated (Narmada Sub-canal)',
    status: 'CLEAN',
    village: 'Shela',
    tehsil: 'Sanand',
    district: 'Ahmedabad',
    state: 'Gujarat',
    centroid: { lat: 22.9985, lng: 72.4590 },
    coordinates: [
      { lat: 23.0000, lng: 72.4575 },
      { lat: 23.0002, lng: 72.4608 },
      { lat: 22.9970, lng: 72.4605 },
      { lat: 22.9968, lng: 72.4572 }
    ],
    svgPath: 'M 200 130 L 340 135 L 335 260 L 195 255 Z',
    svgCentroid: { x: 265, y: 195 },
    color: '#3D5A40',
    recordId: 'REC-GJ-712-4421',
    surveyDate: '2023 AnyRoR Digital Survey',
    benchmarkBearing: 'N 18° 30\' E'
  },
  {
    khasra: '215',
    khata: '00519',
    owner: 'Patel Jayeshkumar Bhikhabhai',
    parentage: 'S/o Bhikhabhai S. Patel',
    areaHa: 2.10,
    areaSqM: 21000,
    soil: 'Bagayat Wheat & Cotton',
    status: 'CLEAN',
    village: 'Shela',
    tehsil: 'Sanand',
    district: 'Ahmedabad',
    state: 'Gujarat',
    centroid: { lat: 22.9986, lng: 72.4625 },
    coordinates: [
      { lat: 23.0002, lng: 72.4608 },
      { lat: 23.0004, lng: 72.4640 },
      { lat: 22.9971, lng: 72.4638 },
      { lat: 22.9970, lng: 72.4605 }
    ],
    svgPath: 'M 340 135 L 470 140 L 465 260 L 335 255 Z',
    svgCentroid: { x: 405, y: 195 },
    color: '#3D5A40',
    recordId: null,
    surveyDate: '2023 AnyRoR Digital Survey',
    benchmarkBearing: 'N 19° 10\' E'
  },
  {
    khasra: '213',
    khata: '00512',
    owner: 'Manilal Kanjibhai Vankar',
    parentage: 'S/o Kanjibhai Vankar',
    areaHa: 1.45,
    areaSqM: 14500,
    soil: 'Jirayat Class I',
    status: 'LITIGATION',
    disputeDetails: 'Tenancy dispute under Gujarat Agricultural Lands Ceiling Act before Mamlatdar Sanand.',
    village: 'Shela',
    tehsil: 'Sanand',
    district: 'Ahmedabad',
    state: 'Gujarat',
    centroid: { lat: 22.9984, lng: 72.4555 },
    coordinates: [
      { lat: 22.9998, lng: 72.4540 },
      { lat: 23.0000, lng: 72.4575 },
      { lat: 22.9968, lng: 72.4572 },
      { lat: 22.9966, lng: 72.4538 }
    ],
    svgPath: 'M 70 130 L 195 135 L 190 260 L 65 255 Z',
    svgCentroid: { x: 130, y: 195 },
    color: '#8B0000',
    recordId: null,
    surveyDate: '2023 AnyRoR Digital Survey',
    benchmarkBearing: 'N 17° 50\' E'
  },
  {
    khasra: '216',
    khata: '00002',
    owner: 'Shela Gam Talav & Drainage Channel',
    parentage: 'Sanand Taluka Panchayat',
    areaHa: 3.50,
    areaSqM: 35000,
    soil: 'Waterbody / Khara Kharaba',
    status: 'GOVT_RESERVE',
    disputeDetails: 'Natural reservoir catchment protected under Gujarat Water Conservation norms.',
    village: 'Shela',
    tehsil: 'Sanand',
    district: 'Ahmedabad',
    state: 'Gujarat',
    centroid: { lat: 22.9950, lng: 72.4590 },
    coordinates: [
      { lat: 22.9968, lng: 72.4572 },
      { lat: 22.9970, lng: 72.4605 },
      { lat: 22.9935, lng: 72.4605 },
      { lat: 22.9932, lng: 72.4570 }
    ],
    svgPath: 'M 200 265 L 340 270 L 335 380 L 195 375 Z',
    svgCentroid: { x: 265, y: 320 },
    color: '#2F6B55',
    recordId: null,
    surveyDate: '2023 AnyRoR Digital Survey',
    benchmarkBearing: 'N 18° 00\' E'
  },

  // Madhya Pradesh - Bilkisganj (Sehore Tehsil / District)
  {
    khasra: '184/2',
    khata: '00329',
    owner: 'Shivnarayan Patidar',
    parentage: 'S/o Babulal Patidar',
    areaHa: 2.40,
    areaSqM: 24000,
    soil: 'Kali Gehri Mitti (Deep Black Soil - Soybean/Wheat)',
    status: 'CLEAN',
    village: 'Bilkisganj',
    tehsil: 'Sehore',
    district: 'Sehore',
    state: 'Madhya Pradesh',
    centroid: { lat: 23.1120, lng: 77.2045 },
    coordinates: [
      { lat: 23.1135, lng: 77.2030 },
      { lat: 23.1137, lng: 77.2062 },
      { lat: 23.1105, lng: 77.2060 },
      { lat: 23.1103, lng: 77.2028 }
    ],
    svgPath: 'M 210 135 L 350 140 L 345 265 L 205 260 Z',
    svgCentroid: { x: 275, y: 200 },
    color: '#3D5A40',
    recordId: 'REC-MP-KHASRA-618',
    surveyDate: '2022 MP Bhulekh Revision',
    benchmarkBearing: 'N 08° 20\' E'
  },
  {
    khasra: '184/1',
    khata: '00330',
    owner: 'Kailash Patidar',
    parentage: 'S/o Babulal Patidar',
    areaHa: 1.95,
    areaSqM: 19500,
    soil: 'Kali Gehri Sinchit (Well Irrigated)',
    status: 'CLEAN',
    village: 'Bilkisganj',
    tehsil: 'Sehore',
    district: 'Sehore',
    state: 'Madhya Pradesh',
    centroid: { lat: 23.1121, lng: 77.2078 },
    coordinates: [
      { lat: 23.1137, lng: 77.2062 },
      { lat: 23.1138, lng: 77.2094 },
      { lat: 23.1106, lng: 77.2092 },
      { lat: 23.1105, lng: 77.2060 }
    ],
    svgPath: 'M 350 140 L 480 145 L 475 265 L 345 260 Z',
    svgCentroid: { x: 410, y: 200 },
    color: '#3D5A40',
    recordId: null,
    surveyDate: '2022 MP Bhulekh Revision',
    benchmarkBearing: 'N 09° 00\' E'
  },
  {
    khasra: '183',
    khata: '00324',
    owner: 'Jagdish Prasad Verma',
    parentage: 'S/o Ramdayal Verma',
    areaHa: 2.80,
    areaSqM: 28000,
    soil: 'Pali / Dumat (Medium Black)',
    status: 'LITIGATION',
    disputeDetails: 'Partition dispute pending before Sub-Divisional Officer (SDO) Sehore under MP Land Revenue Code Sec 178.',
    village: 'Bilkisganj',
    tehsil: 'Sehore',
    district: 'Sehore',
    state: 'Madhya Pradesh',
    centroid: { lat: 23.1120, lng: 77.2012 },
    coordinates: [
      { lat: 23.1134, lng: 77.1996 },
      { lat: 23.1135, lng: 77.2030 },
      { lat: 23.1103, lng: 77.2028 },
      { lat: 23.1102, lng: 77.1995 }
    ],
    svgPath: 'M 75 135 L 205 140 L 200 265 L 70 260 Z',
    svgCentroid: { x: 135, y: 200 },
    color: '#8B0000',
    recordId: null,
    surveyDate: '2022 MP Bhulekh Revision',
    benchmarkBearing: 'N 07° 45\' E'
  },
  {
    khasra: '185',
    khata: '00001',
    owner: 'Shaskiya Charan Bhumi (Govt Grazing Reserve)',
    parentage: 'MP Revenue Dept',
    areaHa: 5.20,
    areaSqM: 52000,
    soil: 'Charagah / Pasture Land',
    status: 'GOVT_RESERVE',
    disputeDetails: 'Dedicated public pasture for village livestock under MP Land Revenue Code Section 237.',
    village: 'Bilkisganj',
    tehsil: 'Sehore',
    district: 'Sehore',
    state: 'Madhya Pradesh',
    centroid: { lat: 23.1152, lng: 77.2045 },
    coordinates: [
      { lat: 23.1170, lng: 77.2030 },
      { lat: 23.1172, lng: 77.2062 },
      { lat: 23.1137, lng: 77.2062 },
      { lat: 23.1135, lng: 77.2030 }
    ],
    svgPath: 'M 210 20 L 350 25 L 345 135 L 205 130 Z',
    svgCentroid: { x: 275, y: 75 },
    color: '#2F6B55',
    recordId: null,
    surveyDate: '2022 MP Bhulekh Revision',
    benchmarkBearing: 'N 08° 50\' E'
  },
  {
    khasra: '409/2A',
    khata: '1842',
    owner: 'S. Marimuthu Gounder',
    parentage: 'Subbiah Gounder',
    areaHa: 2.15,
    areaSqM: 21500,
    soil: 'Thottam / Nanjai (Irrigated Coconut Grove)',
    status: 'CLEAN',
    village: 'Anaimalai',
    tehsil: 'Pollachi',
    district: 'Coimbatore',
    state: 'Tamil Nadu',
    centroid: { lat: 10.5807, lng: 76.9864 },
    coordinates: [
      { lat: 10.5820, lng: 76.9850 },
      { lat: 10.5822, lng: 76.9880 },
      { lat: 10.5795, lng: 76.9878 },
      { lat: 10.5793, lng: 76.9848 }
    ],
    svgPath: 'M 190 130 L 330 135 L 325 260 L 185 250 Z',
    svgCentroid: { x: 257, y: 195 },
    color: '#3D5A40',
    recordId: 'REC-TN-PATTA-4109',
    surveyDate: '2024 Tamil Nadu e-Services Revision',
    benchmarkBearing: 'N 12° 20\' E'
  },
  {
    khasra: '45//18/1',
    khata: '78/142',
    owner: 'Chaudhary Harphool Singh',
    parentage: 'Deep Chand',
    areaHa: 3.25,
    areaSqM: 32500,
    soil: 'Chahi (Basmati Belt)',
    status: 'CLEAN',
    village: 'Taraori',
    tehsil: 'Nilokheri',
    district: 'Karnal',
    state: 'Haryana',
    centroid: { lat: 29.8122, lng: 76.9639 },
    coordinates: [
      { lat: 29.8140, lng: 76.9620 },
      { lat: 29.8143, lng: 76.9660 },
      { lat: 29.8105, lng: 76.9658 },
      { lat: 29.8102, lng: 76.9618 }
    ],
    svgPath: 'M 170 120 L 340 125 L 335 280 L 165 270 Z',
    svgCentroid: { x: 252, y: 200 },
    color: '#3D5A40',
    recordId: 'REC-HR-JAM-5519',
    surveyDate: '2024 Jamabandi Revision',
    benchmarkBearing: 'N 05° 40\' E'
  }
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
  }
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
  }
};
