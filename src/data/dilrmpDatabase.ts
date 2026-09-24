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
    "state": "Maharashtra",
    "district": "Pune",
    "tehsil": "Haveli",
    "village": "Wagholi",
    "khasraNumber": "142/1",
    "khataNumber": "882",
    "masterAreaSqMeters": 14200,
    "registeredOwners": [
      "Tukaram Eknath Patil",
      "Santosh Tukaram Patil"
    ],
    "status": "CLEAN",
    "lastMutationNumber": "MR-2022-8419",
    "soilClass": "Jirayat Class II (Black Cotton Soil)"
  },
  {
    "state": "Maharashtra",
    "district": "Pune",
    "tehsil": "Haveli",
    "village": "Wagholi",
    "khasraNumber": "142/2",
    "khataNumber": "883",
    "masterAreaSqMeters": 8500,
    "registeredOwners": [
      "Babanrao Mahadev Shinde"
    ],
    "status": "LITIGATION",
    "lastMutationNumber": "MR-2021-3310",
    "soilClass": "Bagayat"
  },
  {
    "state": "Uttar Pradesh",
    "district": "Varanasi",
    "tehsil": "Pindra",
    "village": "Babatpur",
    "khasraNumber": "512",
    "khataNumber": "00142",
    "masterAreaSqMeters": 25300,
    "registeredOwners": [
      "Dharmendra Nath Tiwari",
      "Virendra Nath Tiwari"
    ],
    "status": "CLEAN",
    "lastMutationNumber": "DK-2023-7721",
    "soilClass": "Dumat (Loam) Nahri"
  },
  {
    "state": "Punjab",
    "district": "Ludhiana",
    "tehsil": "Jagraon",
    "village": "Raikot",
    "khasraNumber": "34//12/2",
    "khataNumber": "104/218",
    "masterAreaSqMeters": 16187,
    "registeredOwners": [
      "Gurpreet Singh",
      "Balwinder Kaur"
    ],
    "status": "MUTATION_IN_PROCESS",
    "lastMutationNumber": "JAM-2023-441",
    "soilClass": "Nehri / Chahi"
  },
  {
    "state": "Karnataka",
    "district": "Mysuru",
    "tehsil": "Nanjangud",
    "village": "Hullahalli",
    "khasraNumber": "89/3",
    "khataNumber": "KH-402",
    "masterAreaSqMeters": 12140,
    "registeredOwners": [
      "Basavaraju M.",
      "Chennamma B."
    ],
    "status": "CLEAN",
    "lastMutationNumber": "BHOOMI-2024-9182",
    "soilClass": "Wetland (Tari)"
  },
  {
    "state": "Madhya Pradesh",
    "district": "Indore",
    "tehsil": "Sanwer",
    "village": "Kshipra",
    "khasraNumber": "204/1",
    "khataNumber": "319",
    "masterAreaSqMeters": 18000,
    "registeredOwners": [
      "Radheshyam Patidar"
    ],
    "status": "ACQUISITION_PENDING",
    "lastMutationNumber": "MP-LR-2020-098",
    "soilClass": "Malwi Black"
  },
  {
    "state": "Rajasthan",
    "district": "Jaipur",
    "tehsil": "Chomu",
    "village": "Morija",
    "khasraNumber": "312/1",
    "khataNumber": "00214",
    "masterAreaSqMeters": 32500,
    "registeredOwners": [
      "Sawai Singh Rathore",
      "Gajendra Singh Rathore"
    ],
    "status": "CLEAN",
    "lastMutationNumber": "NAMANTARAN-2023-8812",
    "soilClass": "Chahi Barani Doyam"
  },
  {
    "state": "Gujarat",
    "district": "Ahmedabad",
    "tehsil": "Sanand",
    "village": "Shela",
    "khasraNumber": "214",
    "khataNumber": "00518",
    "masterAreaSqMeters": 18200,
    "registeredOwners": [
      "Patel Bhikhabhai Somabhai",
      "Patel Jayeshkumar Bhikhabhai"
    ],
    "status": "CLEAN",
    "lastMutationNumber": "HAKK-PATRAK-2022-4192",
    "soilClass": "Bagayat Irrigated"
  },
  {
    "state": "Madhya Pradesh",
    "district": "Sehore",
    "tehsil": "Sehore",
    "village": "Bilkisganj",
    "khasraNumber": "184/2",
    "khataNumber": "00329",
    "masterAreaSqMeters": 24000,
    "registeredOwners": [
      "Shivnarayan Patidar",
      "Kailash Patidar"
    ],
    "status": "CLEAN",
    "lastMutationNumber": "MP-NAM-2023-1102",
    "soilClass": "Kali Gehri Mitti"
  },
  {
    "state": "Tamil Nadu",
    "district": "Coimbatore",
    "tehsil": "Pollachi",
    "village": "Anaimalai",
    "khasraNumber": "409/2A",
    "khataNumber": "1842",
    "masterAreaSqMeters": 21500,
    "registeredOwners": [
      "S. Marimuthu Gounder",
      "M. Senthilkumar"
    ],
    "status": "CLEAN",
    "lastMutationNumber": "TN-MUT-2023-5120",
    "soilClass": "Nanjai Red Loam"
  },
  {
    "state": "Andhra Pradesh",
    "district": "Guntur",
    "tehsil": "Tenali",
    "village": "Angalakuduru",
    "khasraNumber": "118/3B",
    "khataNumber": "409",
    "masterAreaSqMeters": 19300,
    "registeredOwners": [
      "Koteswara Rao Chennupati",
      "Lakshmi Chennupati"
    ],
    "status": "CLEAN",
    "lastMutationNumber": "AP-MUT-2022-9912",
    "soilClass": "Krishna Alluvial Clay Loam"
  },
  {
    "state": "West Bengal",
    "district": "Hooghly",
    "tehsil": "Singur",
    "village": "Gopalnagar",
    "khasraNumber": "624",
    "khataNumber": "1104",
    "masterAreaSqMeters": 9500,
    "registeredOwners": [
      "Bimalendu Mukherjee",
      "Subhendu Mukherjee"
    ],
    "status": "CLEAN",
    "lastMutationNumber": "WB-MUT-2023-4109",
    "soilClass": "Gangetic Alluvial Silt"
  },
  {
    "state": "Kerala",
    "district": "Palakkad",
    "tehsil": "Chittur",
    "village": "Kozhinjampara",
    "khasraNumber": "245/7",
    "khataNumber": "512",
    "masterAreaSqMeters": 12000,
    "registeredOwners": [
      "K. Radhakrishnan Nair",
      "Valsala Kumari"
    ],
    "status": "CLEAN",
    "lastMutationNumber": "KL-PKV-2023-1190",
    "soilClass": "Lateritic Loam"
  },
  {
    "state": "Odisha",
    "district": "Cuttack",
    "tehsil": "Athagarh",
    "village": "Khuntuni",
    "khasraNumber": "1042/1890",
    "khataNumber": "215/64",
    "masterAreaSqMeters": 16500,
    "registeredOwners": [
      "Pratap Chandra Mohanty",
      "Pramod Kumar Mohanty"
    ],
    "status": "CLEAN",
    "lastMutationNumber": "OD-MUT-2023-7412",
    "soilClass": "Mahanadi Alluvial Loam"
  },
  {
    "state": "Haryana",
    "district": "Karnal",
    "tehsil": "Nilokheri",
    "village": "Taraori",
    "khasraNumber": "45//18/1",
    "khataNumber": "78/142",
    "masterAreaSqMeters": 34000,
    "registeredOwners": [
      "Chaudhary Harphool Singh",
      "Devender Singh"
    ],
    "status": "CLEAN",
    "lastMutationNumber": "HR-INT-2022-8910",
    "soilClass": "Indo-Gangetic Basmati Alluvium"
  },
  {
    "state": "Telangana",
    "district": "Rangareddy",
    "tehsil": "Shamshabad",
    "village": "Pedda Golconda",
    "khasraNumber": "74/A/1",
    "khataNumber": "T281900412",
    "masterAreaSqMeters": 20500,
    "registeredOwners": [
      "G. Srinivas Reddy"
    ],
    "status": "ACQUISITION_PENDING",
    "lastMutationNumber": "TS-DHN-2021-3310",
    "soilClass": "Chalka Red Earth"
  },
  {
    "state": "Bihar",
    "district": "Muzaffarpur",
    "tehsil": "Kanti",
    "village": "Marwan",
    "khasraNumber": "892",
    "khataNumber": "143",
    "masterAreaSqMeters": 11500,
    "registeredOwners": [
      "Ramashray Prasad Singh",
      "Vidyanand Singh"
    ],
    "status": "CLEAN",
    "lastMutationNumber": "BR-DK-2022-5401",
    "soilClass": "Gandak Alluvial Calcareous"
  },
  {
    "state": "Assam",
    "district": "Kamrup Metropolitan",
    "tehsil": "Sonapur",
    "village": "Khetri",
    "khasraNumber": "318",
    "khataNumber": "KP-82",
    "masterAreaSqMeters": 15000,
    "registeredOwners": [
      "Hemanta Kumar Baruah",
      "Monojit Baruah"
    ],
    "status": "CLEAN",
    "lastMutationNumber": "AS-MUT-2023-1890",
    "soilClass": "Brahmaputra Valley Red Loam"
  },
  {
    "state": "Uttarakhand",
    "district": "Udham Singh Nagar",
    "tehsil": "Kashipur",
    "village": "Kundeshwari",
    "khasraNumber": "241/2",
    "khataNumber": "00088",
    "masterAreaSqMeters": 28000,
    "registeredOwners": [
      "Gurmukh Singh Gill",
      "Harpreet Kaur Gill"
    ],
    "status": "CLEAN",
    "lastMutationNumber": "UK-KHT-2022-3104",
    "soilClass": "Tarai Fertile Silt Loam"
  },
  {
    "state": "Jharkhand",
    "district": "Ranchi",
    "tehsil": "Ormanjhi",
    "village": "Irba",
    "khasraNumber": "476",
    "khataNumber": "00054",
    "masterAreaSqMeters": 13500,
    "registeredOwners": [
      "Somra Munda",
      "Mangra Munda"
    ],
    "status": "CLEAN",
    "lastMutationNumber": "JH-DK-2023-8812",
    "soilClass": "Chotanagpur Red Clayey Soil"
  },
  {
    "state": "Chhattisgarh",
    "district": "Durg",
    "tehsil": "Patan",
    "village": "Jamgaon",
    "khasraNumber": "158/4",
    "khataNumber": "76",
    "masterAreaSqMeters": 17500,
    "registeredOwners": [
      "Nandkumar Sahu",
      "Kamal Sahu"
    ],
    "status": "CLEAN",
    "lastMutationNumber": "CG-NAM-2023-4120",
    "soilClass": "Matasi Yellow Sandy Loam"
  },
  {
    "state": "Maharashtra",
    "district": "Nashik",
    "tehsil": "Niphad",
    "village": "Pimpalgaon Baswant",
    "khasraNumber": "284/1B",
    "khataNumber": "412",
    "masterAreaSqMeters": 19500,
    "registeredOwners": [
      "Dnyaneshwar Bhausaheb Patil",
      "Sopan Bhausaheb Patil"
    ],
    "status": "CLEAN",
    "lastMutationNumber": "MR-2023-9118",
    "soilClass": "Deccan Trap Black Basaltic"
  },
  {
    "state": "Himachal Pradesh",
    "district": "Kangra",
    "tehsil": "Kangra",
    "village": "Dhar",
    "khasraNumber": "88/1",
    "khataNumber": "44",
    "masterAreaSqMeters": 9400,
    "registeredOwners": [
      "Karam Chand Katoch"
    ],
    "status": "CLEAN",
    "lastMutationNumber": "HP-MUT-2023-412",
    "soilClass": "Bakhal Awal (Terraced Hill Loam)"
  },
  {
    "state": "Himachal Pradesh",
    "district": "Kangra",
    "tehsil": "Kangra",
    "village": "Dhar",
    "khasraNumber": "88/2",
    "khataNumber": "45",
    "masterAreaSqMeters": 7200,
    "registeredOwners": [
      "Rupinder Singh Jamwal"
    ],
    "status": "CLEAN",
    "lastMutationNumber": "HP-MUT-2022-109",
    "soilClass": "Bagicha Seb (Apple Orchard / Horti)"
  },
  {
    "state": "Uttarakhand",
    "district": "Udham Singh Nagar",
    "tehsil": "Kashipur",
    "village": "Kundeshwari",
    "khasraNumber": "402",
    "khataNumber": "104",
    "masterAreaSqMeters": 30500,
    "registeredOwners": [
      "Gurmukh Singh Gill"
    ],
    "status": "CLEAN",
    "lastMutationNumber": "UK-KHT-2022-7128",
    "soilClass": "Tarai Fertile Silt Loam (Sugarcane)"
  },
  {
    "state": "Uttarakhand",
    "district": "Udham Singh Nagar",
    "tehsil": "Kashipur",
    "village": "Kundeshwari",
    "khasraNumber": "403/1",
    "khataNumber": "105",
    "masterAreaSqMeters": 14500,
    "registeredOwners": [
      "Virendra Singh Rawat"
    ],
    "status": "CLEAN",
    "lastMutationNumber": "UK-KHT-2023-1180",
    "soilClass": "Rousli Clay Loam (Paddy-Wheat)"
  },
  {
    "state": "Assam",
    "district": "Kamrup Metropolitan",
    "tehsil": "Sonapur Circle",
    "village": "Sonapur",
    "khasraNumber": "114",
    "khataNumber": "KP-52",
    "masterAreaSqMeters": 17700,
    "registeredOwners": [
      "Hemanta Kumar Baruah"
    ],
    "status": "CLEAN",
    "lastMutationNumber": "AS-MUT-2023-7222",
    "soilClass": "Shali Alluvial (Paddy Land Class I)"
  },
  {
    "state": "Assam",
    "district": "Kamrup Metropolitan",
    "tehsil": "Sonapur Circle",
    "village": "Sonapur",
    "khasraNumber": "115/1",
    "khataNumber": "KP-53",
    "masterAreaSqMeters": 14300,
    "registeredOwners": [
      "Pranab Jyoti Saikia"
    ],
    "status": "CLEAN",
    "lastMutationNumber": "AS-MUT-2024-0041",
    "soilClass": "Bari (Homestead & Arecanut Orchard)"
  },
  {
    "state": "West Bengal",
    "district": "Hooghly",
    "tehsil": "Singur",
    "village": "Singur",
    "khasraNumber": "204",
    "khataNumber": "1142",
    "masterAreaSqMeters": 21100,
    "registeredOwners": [
      "Subhash Chandra Ghosh"
    ],
    "status": "CLEAN",
    "lastMutationNumber": "WB-ROR-2023-5591",
    "soilClass": "Dohan Silt Loam (Multi-Crop Paddy & Potato)"
  },
  {
    "state": "West Bengal",
    "district": "Hooghly",
    "tehsil": "Singur",
    "village": "Singur",
    "khasraNumber": "205/1",
    "khataNumber": "1143",
    "masterAreaSqMeters": 12800,
    "registeredOwners": [
      "Bhabani Charan Mukherjee"
    ],
    "status": "CLEAN",
    "lastMutationNumber": "WB-ROR-2024-0129",
    "soilClass": "Sali Class I (Irrigated Boro Rice)"
  },
  {
    "state": "Maharashtra",
    "district": "Sindhudurg",
    "tehsil": "Malvan",
    "village": "Devbagh",
    "khasraNumber": "84/1",
    "khataNumber": "210",
    "masterAreaSqMeters": 8094,
    "registeredOwners": [
      "Ganesh Pandurang Parab",
      "Sunita Ganesh Parab"
    ],
    "status": "CLEAN",
    "lastMutationNumber": "MH-SIN-2024-0841",
    "soilClass": "Coastal Laterite Sandy Loam (Alphonso Mango Orchard)"
  },
  {
    "state": "Maharashtra",
    "district": "Sindhudurg",
    "tehsil": "Malvan",
    "village": "Devbagh",
    "khasraNumber": "85",
    "khataNumber": "212",
    "masterAreaSqMeters": 10500,
    "registeredOwners": [
      "Vasant Sakharam Samant"
    ],
    "status": "LITIGATION",
    "lastMutationNumber": "MH-SIN-2023-0850",
    "soilClass": "Khajan Saline Protective Embankment Paddy"
  },
  {
    "state": "Himachal Pradesh",
    "district": "Kullu",
    "tehsil": "Naggar",
    "village": "Naggar",
    "khasraNumber": "112/1",
    "khataNumber": "67",
    "masterAreaSqMeters": 8900,
    "registeredOwners": [
      "Vikramaditya Thakur",
      "Padma Dolma Thakur"
    ],
    "status": "CLEAN",
    "lastMutationNumber": "HP-KUL-2024-1121",
    "soilClass": "Bakhal Awal (Terraced Mountain Loam - Royal Delicious Apple)"
  },
  {
    "state": "Himachal Pradesh",
    "district": "Kullu",
    "tehsil": "Naggar",
    "village": "Naggar",
    "khasraNumber": "113",
    "khataNumber": "69",
    "masterAreaSqMeters": 11500,
    "registeredOwners": [
      "Hari Chand Negi"
    ],
    "status": "LITIGATION",
    "lastMutationNumber": "HP-KUL-2023-1130",
    "soilClass": "Bakhal Doem (Hill Maize & Kidney Beans)"
  },
  {
    "state": "Rajasthan",
    "district": "Jaisalmer",
    "tehsil": "Jaisalmer",
    "village": "Ramgarh",
    "khasraNumber": "401/1",
    "khataNumber": "112",
    "masterAreaSqMeters": 25293,
    "registeredOwners": [
      "Bhairon Singh Bhati"
    ],
    "status": "CLEAN",
    "lastMutationNumber": "RJ-JAI-2024-4011",
    "soilClass": "Nahri Dumat (IGNP Canal Command - Cumin & Mustard)"
  },
  {
    "state": "Rajasthan",
    "district": "Jaisalmer",
    "tehsil": "Jaisalmer",
    "village": "Ramgarh",
    "khasraNumber": "402",
    "khataNumber": "114",
    "masterAreaSqMeters": 31500,
    "registeredOwners": [
      "Durgadas Jasraj Paliwal"
    ],
    "status": "LITIGATION",
    "lastMutationNumber": "RJ-JAI-2023-4020",
    "soilClass": "Chahi Barani (Sprinkler Irrigated Isabgol / Psyllium)"
  },
  {
    "state": "Kerala",
    "district": "Alappuzha",
    "tehsil": "Kuttanad",
    "village": "Nedumudi",
    "khasraNumber": "78/1",
    "khataNumber": "TH-340",
    "masterAreaSqMeters": 7200,
    "registeredOwners": [
      "Kuriakose Thomas Palathinkal",
      "Mary Kuriakose"
    ],
    "status": "CLEAN",
    "lastMutationNumber": "KL-ALP-2024-0781",
    "soilClass": "Kari Nilam (Below Sea Level Acid Saline Paddy Polder)"
  },
  {
    "state": "Kerala",
    "district": "Alappuzha",
    "tehsil": "Kuttanad",
    "village": "Nedumudi",
    "khasraNumber": "79",
    "khataNumber": "TH-342",
    "masterAreaSqMeters": 9500,
    "registeredOwners": [
      "Devadasan Nair Kayamkulam"
    ],
    "status": "LITIGATION",
    "lastMutationNumber": "KL-ALP-2023-0790",
    "soilClass": "Kayal Padasekharam Polder Rice"
  },
  {
    "state": "Assam",
    "district": "Majuli",
    "tehsil": "Majuli Sub-Division",
    "village": "Garmur",
    "khasraNumber": "156/1",
    "khataNumber": "PT-88",
    "masterAreaSqMeters": 13400,
    "registeredOwners": [
      "Bipul Chandra Saikia"
    ],
    "status": "CLEAN",
    "lastMutationNumber": "AS-MAJ-2024-1561",
    "soilClass": "Poli Mati (Recent Brahmaputra Flood Silt - Deepwater Bao Rice)"
  },
  {
    "state": "Karnataka",
    "district": "Kolar",
    "tehsil": "Bangarapet",
    "village": "Bangarapet",
    "khasraNumber": "64/1",
    "khataNumber": "KH-510",
    "masterAreaSqMeters": 12140,
    "registeredOwners": [
      "K. N. Munivenkatappa",
      "M. Manjunatha"
    ],
    "status": "CLEAN",
    "lastMutationNumber": "KA-KOL-2024-0641",
    "soilClass": "Kempu Jiddu Mannu (Red Sandy Loam - V1 Mulberry Sericulture)"
  },
  {
    "state": "Andhra Pradesh",
    "district": "West Godavari",
    "tehsil": "Bhimavaram",
    "village": "Bhimavaram",
    "khasraNumber": "230/1",
    "khataNumber": "PPB-914",
    "masterAreaSqMeters": 14164,
    "registeredOwners": [
      "Venkata Satyanarayana Raju Penmatsa"
    ],
    "status": "CLEAN",
    "lastMutationNumber": "AP-WG-2024-2301",
    "soilClass": "Godavari Nalla Regadi (Heavy Black Clay - Vannamei Aquaculture Pond)"
  },
  {
    "state": "Jammu & Kashmir",
    "district": "Kulgam",
    "tehsil": "Devsar",
    "village": "Kulgam",
    "khasraNumber": "91/1",
    "khataNumber": "KH-142",
    "masterAreaSqMeters": 7588,
    "registeredOwners": [
      "Ghulam Mohammad Mir",
      "Bashir Ahmad Mir"
    ],
    "status": "CLEAN",
    "lastMutationNumber": "JK-KUL-2024-0911",
    "soilClass": "Vuddr / Karewa Loam (High Plateau Saffron / Crocus sativus)"
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
