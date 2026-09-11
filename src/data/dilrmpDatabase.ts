export interface MasterLandRecord {
  state: string;
  district: string;
  tehsil: string;
  village: string;
  khasraNumber: string;
  khataNumber: string;
  masterAreaSqMeters: number;
  registeredOwners: string[];
  status: 'CLEAN' | 'LITIGATION' | 'ACQUISITION_PENDING' | 'MUTATION_IN_PROCESS';
  lastMutationNumber: string;
  soilClass: string;
}

export const DILRMP_MASTER_DATABASE: MasterLandRecord[] = [
  {
    state: 'Maharashtra',
    district: 'Pune',
    tehsil: 'Haveli',
    village: 'Wagholi',
    khasraNumber: '142/1',
    khataNumber: '882',
    masterAreaSqMeters: 14200, // ~1.42 Hectares
    registeredOwners: ['Tukaram Eknath Patil', 'Santosh Tukaram Patil'],
    status: 'CLEAN',
    lastMutationNumber: 'MR-2022-8419',
    soilClass: 'Jirayat Class II (Black Cotton Soil)'
  },
  {
    state: 'Maharashtra',
    district: 'Pune',
    tehsil: 'Haveli',
    village: 'Wagholi',
    khasraNumber: '142/2',
    khataNumber: '883',
    masterAreaSqMeters: 8500,
    registeredOwners: ['Babanrao Mahadev Shinde'],
    status: 'LITIGATION',
    lastMutationNumber: 'MR-2021-3310',
    soilClass: 'Bagayat'
  },
  {
    state: 'Uttar Pradesh',
    district: 'Varanasi',
    tehsil: 'Pindra',
    village: 'Babatpur',
    khasraNumber: '512',
    khataNumber: '00142',
    masterAreaSqMeters: 25300, // 1.000 Hectare = 10,000 sq m -> 2.53 Ha
    registeredOwners: ['Dharmendra Nath Tiwari', 'Virendra Nath Tiwari'],
    status: 'CLEAN',
    lastMutationNumber: 'DK-2023-7721',
    soilClass: 'Dumat (Loam) Nahri'
  },
  {
    state: 'Punjab',
    district: 'Ludhiana',
    tehsil: 'Jagraon',
    village: 'Raikot',
    khasraNumber: '34//12/2',
    khataNumber: '104/218',
    masterAreaSqMeters: 16187, // ~4 Acres
    registeredOwners: ['Gurpreet Singh', 'Balwinder Kaur'],
    status: 'MUTATION_IN_PROCESS',
    lastMutationNumber: 'JAM-2023-441',
    soilClass: 'Nehri / Chahi'
  },
  {
    state: 'Karnataka',
    district: 'Mysuru',
    tehsil: 'Nanjangud',
    village: 'Hullahalli',
    khasraNumber: '89/3',
    khataNumber: 'KH-402',
    masterAreaSqMeters: 12140, // ~3 Acres
    registeredOwners: ['Basavaraju M.', 'Chennamma B.'],
    status: 'CLEAN',
    lastMutationNumber: 'BHOOMI-2024-9182',
    soilClass: 'Wetland (Tari)'
  },
  {
    state: 'Madhya Pradesh',
    district: 'Indore',
    tehsil: 'Sanwer',
    village: 'Kshipra',
    khasraNumber: '204/1',
    khataNumber: '319',
    masterAreaSqMeters: 18000,
    registeredOwners: ['Radheshyam Patidar'],
    status: 'ACQUISITION_PENDING',
    lastMutationNumber: 'MP-LR-2020-098',
    soilClass: 'Malwi Black'
  },
  {
    state: 'Rajasthan',
    district: 'Jaipur',
    tehsil: 'Chomu',
    village: 'Morija',
    khasraNumber: '312/1',
    khataNumber: '00214',
    masterAreaSqMeters: 32500,
    registeredOwners: ['Sawai Singh Rathore', 'Gajendra Singh Rathore'],
    status: 'CLEAN',
    lastMutationNumber: 'NAMANTARAN-2023-8812',
    soilClass: 'Chahi Barani Doyam'
  },
  {
    state: 'Gujarat',
    district: 'Ahmedabad',
    tehsil: 'Sanand',
    village: 'Shela',
    khasraNumber: '214',
    khataNumber: '00518',
    masterAreaSqMeters: 18200,
    registeredOwners: ['Patel Bhikhabhai Somabhai', 'Patel Jayeshkumar Bhikhabhai'],
    status: 'CLEAN',
    lastMutationNumber: 'HAKK-PATRAK-2022-4192',
    soilClass: 'Bagayat Irrigated'
  },
  {
    state: 'Madhya Pradesh',
    district: 'Sehore',
    tehsil: 'Sehore',
    village: 'Bilkisganj',
    khasraNumber: '184/2',
    khataNumber: '00329',
    masterAreaSqMeters: 24000,
    registeredOwners: ['Shivnarayan Patidar', 'Kailash Patidar'],
    status: 'CLEAN',
    lastMutationNumber: 'MP-NAM-2023-1102',
    soilClass: 'Kali Gehri Mitti'
  },
  {
    state: 'Tamil Nadu',
    district: 'Coimbatore',
    tehsil: 'Pollachi',
    village: 'Anaimalai',
    khasraNumber: '409/2A',
    khataNumber: '1842',
    masterAreaSqMeters: 21500,
    registeredOwners: ['S. Marimuthu Gounder', 'M. Senthilkumar'],
    status: 'CLEAN',
    lastMutationNumber: 'TN-MUT-2023-5120',
    soilClass: 'Nanjai Red Loam'
  },
  {
    state: 'Andhra Pradesh',
    district: 'Guntur',
    tehsil: 'Tenali',
    village: 'Angalakuduru',
    khasraNumber: '118/3B',
    khataNumber: '409',
    masterAreaSqMeters: 18200,
    registeredOwners: ['Koteswara Rao Chennupati', 'Lakshmi Chennupati'],
    status: 'CLEAN',
    lastMutationNumber: 'AP-MUT-2022-9912',
    soilClass: 'Krishna Alluvial Clay Loam'
  },
  {
    state: 'West Bengal',
    district: 'Hooghly',
    tehsil: 'Singur',
    village: 'Gopalnagar',
    khasraNumber: '624',
    khataNumber: '1104',
    masterAreaSqMeters: 9500,
    registeredOwners: ['Bimalendu Mukherjee', 'Subhendu Mukherjee'],
    status: 'CLEAN',
    lastMutationNumber: 'WB-MUT-2023-4109',
    soilClass: 'Gangetic Alluvial Silt'
  },
  {
    state: 'Kerala',
    district: 'Palakkad',
    tehsil: 'Chittur',
    village: 'Kozhinjampara',
    khasraNumber: '245/7',
    khataNumber: '512',
    masterAreaSqMeters: 12000,
    registeredOwners: ['K. Radhakrishnan Nair', 'Valsala Kumari'],
    status: 'CLEAN',
    lastMutationNumber: 'KL-PKV-2023-1190',
    soilClass: 'Lateritic Loam'
  },
  {
    state: 'Odisha',
    district: 'Cuttack',
    tehsil: 'Athagarh',
    village: 'Khuntuni',
    khasraNumber: '1042/1890',
    khataNumber: '215/64',
    masterAreaSqMeters: 16500,
    registeredOwners: ['Pratap Chandra Mohanty', 'Pramod Kumar Mohanty'],
    status: 'CLEAN',
    lastMutationNumber: 'OD-MUT-2023-7412',
    soilClass: 'Mahanadi Alluvial Loam'
  },
  {
    state: 'Haryana',
    district: 'Karnal',
    tehsil: 'Nilokheri',
    village: 'Taraori',
    khasraNumber: '45//18/1',
    khataNumber: '78/142',
    masterAreaSqMeters: 32500,
    registeredOwners: ['Chaudhary Harphool Singh', 'Devender Singh'],
    status: 'CLEAN',
    lastMutationNumber: 'HR-INT-2022-8910',
    soilClass: 'Indo-Gangetic Basmati Alluvium'
  },
  {
    state: 'Telangana',
    district: 'Rangareddy',
    tehsil: 'Shamshabad',
    village: 'Pedda Golconda',
    khasraNumber: '74/A/1',
    khataNumber: 'T281900412',
    masterAreaSqMeters: 20500,
    registeredOwners: ['G. Srinivas Reddy'],
    status: 'ACQUISITION_PENDING',
    lastMutationNumber: 'TS-DHN-2021-3310',
    soilClass: 'Chalka Red Earth'
  },
  {
    state: 'Bihar',
    district: 'Muzaffarpur',
    tehsil: 'Kanti',
    village: 'Marwan',
    khasraNumber: '892',
    khataNumber: '143',
    masterAreaSqMeters: 11500,
    registeredOwners: ['Ramashray Prasad Singh', 'Vidyanand Singh'],
    status: 'CLEAN',
    lastMutationNumber: 'BR-DK-2022-5401',
    soilClass: 'Gandak Alluvial Calcareous'
  },
  {
    state: 'Assam',
    district: 'Kamrup Metropolitan',
    tehsil: 'Sonapur',
    village: 'Khetri',
    khasraNumber: '318',
    khataNumber: 'KP-82',
    masterAreaSqMeters: 15000,
    registeredOwners: ['Hemanta Kumar Baruah', 'Monojit Baruah'],
    status: 'CLEAN',
    lastMutationNumber: 'AS-MUT-2023-1890',
    soilClass: 'Brahmaputra Valley Red Loam'
  },
  {
    state: 'Uttarakhand',
    district: 'Udham Singh Nagar',
    tehsil: 'Kashipur',
    village: 'Kundeshwari',
    khasraNumber: '241/2',
    khataNumber: '00088',
    masterAreaSqMeters: 28000,
    registeredOwners: ['Gurmukh Singh Gill', 'Harpreet Kaur Gill'],
    status: 'CLEAN',
    lastMutationNumber: 'UK-KHT-2022-3104',
    soilClass: 'Tarai Fertile Silt Loam'
  },
  {
    state: 'Jharkhand',
    district: 'Ranchi',
    tehsil: 'Ormanjhi',
    village: 'Irba',
    khasraNumber: '476',
    khataNumber: '00054',
    masterAreaSqMeters: 13500,
    registeredOwners: ['Somra Munda', 'Mangra Munda'],
    status: 'CLEAN',
    lastMutationNumber: 'JH-DK-2023-8812',
    soilClass: 'Chotanagpur Red Clayey Soil'
  },
  {
    state: 'Chhattisgarh',
    district: 'Durg',
    tehsil: 'Patan',
    village: 'Jamgaon',
    khasraNumber: '158/4',
    khataNumber: '76',
    masterAreaSqMeters: 17500,
    registeredOwners: ['Nandkumar Sahu', 'Kamal Sahu'],
    status: 'CLEAN',
    lastMutationNumber: 'CG-NAM-2023-4120',
    soilClass: 'Matasi Yellow Sandy Loam'
  },
  {
    state: 'Maharashtra',
    district: 'Nashik',
    tehsil: 'Niphad',
    village: 'Pimpalgaon Baswant',
    khasraNumber: '284/1B',
    khataNumber: '412',
    masterAreaSqMeters: 19500,
    registeredOwners: ['Dnyaneshwar Bhausaheb Patil', 'Sopan Bhausaheb Patil'],
    status: 'CLEAN',
    lastMutationNumber: 'MR-2023-9118',
    soilClass: 'Deccan Trap Black Basaltic'
  }
];

export function findMasterRecord(khasra: string, village: string, state: string) {
  const normKhasra = khasra.trim().toLowerCase().replace(/\s+/g, '');
  const normVillage = village.trim().toLowerCase();
  const normState = state.trim().toLowerCase();

  return DILRMP_MASTER_DATABASE.find(item => 
    item.khasraNumber.toLowerCase().replace(/\s+/g, '') === normKhasra &&
    (item.village.toLowerCase() === normVillage || normVillage.includes(item.village.toLowerCase())) &&
    (item.state.toLowerCase() === normState || normState.includes(item.state.toLowerCase()))
  );
}
