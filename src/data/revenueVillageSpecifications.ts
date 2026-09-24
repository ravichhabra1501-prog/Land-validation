export interface DominantSoilSpecification {
  name: string;
  vernacularName: string;
  classification: string;
  fertilityRating: 'HIGH' | 'MEDIUM' | 'SPECIALIZED' | 'MARGINAL';
  description: string;
}

export interface VillageIrrigationSpecification {
  primarySource: string;
  waterRightsCustom: string;
  seasonalCanalsCount: number;
  tankOrPondCount: number;
  energizedTubewellsCount: number;
}

export interface RevenueVillageSpecification {
  villageId: string;
  villageName: string;
  vernacularName: string;
  censusVillageCode: string;
  state: string;
  district: string;
  subDivision: string;
  tehsil: string;
  revenueCircle: string;
  gramPanchayat: string;
  parganaOrHobli: string;
  
  // Geographical & Agro-Climatic Profile
  agroClimaticZone: string;
  elevationMeters: number;
  annualRainfallMm: number;
  terrainType: 
    | 'COASTAL_LOWLAND' 
    | 'RIVERINE_FLOODPLAIN' 
    | 'TERRACED_HILL' 
    | 'ARID_DESERT' 
    | 'SEMI_ARID_PLATEAU' 
    | 'DELTAIC_WETLAND' 
    | 'VALLEY_BASIN' 
    | 'ALLUVIAL_PLAINS';
  centroid: { lat: number; lng: number };
  
  // Cadastral Survey & Statutory Specifications
  primaryRorFormat: string;
  statutoryAct: string;
  cadastralSheetNo: string;
  lastBandobastYear: number;
  svamitvaDroneSurveyed: boolean;
  dgpsBenchmarkPillar: string;
  totalSurveyParcels: number;
  totalGeographicAreaHa: number;
  
  // Measurement & Units
  primaryLocalUnit: string;
  localUnitToSqM: number;
  unitFormulaDisplay: string;
  
  // Soil & Irrigation Specifications
  dominantSoils: DominantSoilSpecification[];
  irrigationInfrastructure: VillageIrrigationSpecification;
  
  // Tenurial & Legal Regime
  tenureRegime: string;
  avgAnnualRevenuePerHa: number;
  specialStatutoryProtections: string[];
  
  // Crops & Cropping Seasons
  kharifCrops: string[];
  rabiCrops: string[];
  zaidOrPerennialCrops: string[];
  
  // Historical / Contextual Notes
  revenueHistoryRemarks: string;
}

export const REVENUE_VILLAGE_SPECIFICATIONS: Record<string, RevenueVillageSpecification> = {
  // NEW VILLAGE 1: Devbagh (Konkan Coastal Belt, Maharashtra)
  Devbagh: {
    villageId: 'VIL-MH-DEV-001',
    villageName: 'Devbagh',
    vernacularName: 'देवबाग (सिंधुदुर्ग)',
    censusVillageCode: '566890',
    state: 'Maharashtra',
    district: 'Sindhudurg',
    subDivision: 'Kankavli',
    tehsil: 'Malvan',
    revenueCircle: 'Malvan Saza No. 4',
    gramPanchayat: 'Devbagh Gram Panchayat',
    parganaOrHobli: 'Malvan Pargana',
    agroClimaticZone: 'Zone 12: West Coast Plains & Ghats (Konkan Maritime)',
    elevationMeters: 8,
    annualRainfallMm: 3100,
    terrainType: 'COASTAL_LOWLAND',
    centroid: { lat: 15.9924, lng: 73.4985 },
    primaryRorFormat: 'MahaBhulekh Saat-Baara Extract (गाव नमुना ७ व १२)',
    statutoryAct: 'Maharashtra Land Revenue Code, 1966 (Sec 148)',
    cadastralSheetNo: 'Aks Shajra Sheet MH-SIN-MAL-04/2026',
    lastBandobastYear: 1974,
    svamitvaDroneSurveyed: true,
    dgpsBenchmarkPillar: 'GCP-MAH-SIN-DEV-01',
    totalSurveyParcels: 384,
    totalGeographicAreaHa: 412.5,
    primaryLocalUnit: 'Guntha (गुंठा)',
    localUnitToSqM: 101.17,
    unitFormulaDisplay: '1 Guntha = 101.17 sq.m | 40 Gunthas = 1 Acre (4,046.86 sq.m)',
    dominantSoils: [
      {
        name: 'Coastal Lateritic Sandy Loam',
        vernacularName: 'जांभा दगडी रेताड जमीन (Jambha Dagadi)',
        classification: 'Laterite Typic Tropaquult',
        fertilityRating: 'SPECIALIZED',
        description: 'Rich in iron and aluminum oxides; exceptional drainage ideal for Alphonso Mango (Hapus) and Cashew.'
      },
      {
        name: 'Saline Coastal Marine Alluvium',
        vernacularName: 'खाजण जमीन (Khajan Saline Soil)',
        classification: 'Salic Fluvaquent',
        fertilityRating: 'MARGINAL',
        description: 'Tidal creek backwater soils protected by earthen Kharland dykes; seasonal Pokkali/salt-tolerant paddy.'
      }
    ],
    irrigationInfrastructure: {
      primarySource: 'Perennial Coastal Shallow Dugwells & Karli Estuary Backwaters',
      waterRightsCustom: 'Traditional bandhara earthen bunds with sea-sluice gates for monsoon freshwater retention',
      seasonalCanalsCount: 0,
      tankOrPondCount: 6,
      energizedTubewellsCount: 42
    },
    tenureRegime: 'Bhogavatadar Class 1 (भोगवटादार वर्ग १ - Unrestricted Tenure)',
    avgAnnualRevenuePerHa: 48.50,
    specialStatutoryProtections: [
      'Coastal Regulation Zone (CRZ-I & CRZ-III) environmental development restrictions',
      'Maharashtra Khar Land Development Act, 1979 protective embankment covenant'
    ],
    kharifCrops: ['Kharland Saline-Tolerant Rice (Walai / Panvel-1)', 'Finger Millet (Ragi / Nachani)'],
    rabiCrops: ['Coastal Cowpea (Chawli)', 'Groundnut', 'Sweet Potato'],
    zaidOrPerennialCrops: ['GI-Tagged Sindhudurg Alphonso Mango (Hapus)', 'Coconut Palm (Bana)', 'Betelnut (Supari)', 'Cashew'],
    revenueHistoryRemarks: 'Surveyed under 1974 Konkan Coastal Cadastral Revision. DGPS control points tied to Karli River estuarine benchmark.'
  },

  // NEW VILLAGE 2: Naggar (High Himalayan Apple Terraces, Himachal Pradesh)
  Naggar: {
    villageId: 'VIL-HP-NAG-002',
    villageName: 'Naggar',
    vernacularName: 'नग्गर (कुल्लू)',
    censusVillageCode: '013456',
    state: 'Himachal Pradesh',
    district: 'Kullu',
    subDivision: 'Manali',
    tehsil: 'Naggar',
    revenueCircle: 'Naggar Patwar Circle No. 2',
    gramPanchayat: 'Naggar Gram Panchayat',
    parganaOrHobli: 'Kullu Wazir-e-Pargana',
    agroClimaticZone: 'Zone 1: Western Himalayan High Hill Temperate Zone',
    elevationMeters: 1760,
    annualRainfallMm: 1240,
    terrainType: 'TERRACED_HILL',
    centroid: { lat: 32.1158, lng: 77.1684 },
    primaryRorFormat: 'Himbhoomi Jamabandi (प्रपत्र २१ - रजिस्टर हकदारान)',
    statutoryAct: 'Himachal Pradesh Land Revenue Act, 1954 (Sec 32)',
    cadastralSheetNo: 'Shajra Kishtwar Sheet HP-KUL-NAG-07',
    lastBandobastYear: 1989,
    svamitvaDroneSurveyed: true,
    dgpsBenchmarkPillar: 'GCP-HP-KUL-NAG-09',
    totalSurveyParcels: 620,
    totalGeographicAreaHa: 580.2,
    primaryLocalUnit: 'Bigha-Biswa (बीघा-बिस्वा)',
    localUnitToSqM: 809.37,
    unitFormulaDisplay: '1 Bigha = 809.37 sq.m (20 Biswa) | 5 Bighas = 1 Acre (4,046.86 sq.m)',
    dominantSoils: [
      {
        name: 'Mountain Brown Forest Terraced Loam',
        vernacularName: 'बाखल अव्वल (Bakhal Awal Terraced Loam)',
        classification: 'Humic Dystrudept',
        fertilityRating: 'HIGH',
        description: 'High organic carbon content, slightly acidic pH (5.8-6.5), optimal for deciduous pome fruits.'
      },
      {
        name: 'High Altitude Stony Orchard Soil',
        vernacularName: 'बगीचा सेब (Bagicha Seb Horti Soil)',
        classification: 'Typic Udorthent',
        fertilityRating: 'SPECIALIZED',
        description: 'Deep gravelly loam on 15°-25° slopes; high potassium reserves critical for apple fruit color and crispness.'
      }
    ],
    irrigationInfrastructure: {
      primarySource: 'Glacial Snowmelt Gravity Channels (Kuhl System)',
      waterRightsCustom: 'Codified Riwaj-i-Aabpashi (ਰਿਵਾਜ-ਏ-ਆਬਪਾਸ਼ੀ) rotatory water-turn rights governed by village community kuhl committee',
      seasonalCanalsCount: 4,
      tankOrPondCount: 12,
      energizedTubewellsCount: 0
    },
    tenureRegime: 'Bhumidhar with Transferable Rights (Subject to Section 118 restrictions)',
    avgAnnualRevenuePerHa: 36.00,
    specialStatutoryProtections: [
      'Section 118 of HP Tenancy & Land Reforms Act, 1972 (Non-agriculturist land transfer ban)',
      'Himalayan Watershed Slope Stability Conservation Easement'
    ],
    kharifCrops: ['Hill Maize (Chhali)', 'Buckwheat (Ogla)', 'Kidney Beans (Rajma)'],
    rabiCrops: ['Barley (Jau)', 'Hill Wheat', 'Mustard'],
    zaidOrPerennialCrops: ['Royal Delicious Apple', 'Gala Apple', 'Kullu Walnut', 'Wild Apricot (Chulli)'],
    revenueHistoryRemarks: 'Ancient capital of Kullu Rajas. Settlement records maintain historical Kuhl water-turn distribution register (Riwaj-i-Aabpashi).'
  },

  // NEW VILLAGE 3: Ramgarh (Thar Arid Zone, Rajasthan)
  Ramgarh: {
    villageId: 'VIL-RJ-RAM-003',
    villageName: 'Ramgarh',
    vernacularName: 'रामगढ़ (जैसलमेर)',
    censusVillageCode: '085420',
    state: 'Rajasthan',
    district: 'Jaisalmer',
    subDivision: 'Jaisalmer',
    tehsil: 'Jaisalmer',
    revenueCircle: 'Ramgarh ILR Circle',
    gramPanchayat: 'Ramgarh Gram Panchayat',
    parganaOrHobli: 'Marwar West Pargana',
    agroClimaticZone: 'Zone 14: Western Dry Region (Hyper-Arid Partial Irrigated Thar)',
    elevationMeters: 220,
    annualRainfallMm: 165,
    terrainType: 'ARID_DESERT',
    centroid: { lat: 27.2415, lng: 70.5052 },
    primaryRorFormat: 'Apna Khata Jamabandi (प्रपत्र २४ - अधिकार अभिलेख)',
    statutoryAct: 'Rajasthan Land Revenue Act, 1956 (Sec 114) & Rajasthan Tenancy Act, 1955',
    cadastralSheetNo: 'Aks Shajra Murabbabandi Sheet RJ-JAI-RAM-12',
    lastBandobastYear: 1998,
    svamitvaDroneSurveyed: true,
    dgpsBenchmarkPillar: 'GCP-RJ-JAI-RAM-04',
    totalSurveyParcels: 790,
    totalGeographicAreaHa: 1420.0,
    primaryLocalUnit: 'Pukka Bigha (पक्का बीघा)',
    localUnitToSqM: 2529.28,
    unitFormulaDisplay: '1 Pukka Bigha = 2,529.28 sq.m (20 Biswa) | 1.6 Bigha = 1 Acre (4,046.86 sq.m)',
    dominantSoils: [
      {
        name: 'Arid Sandy Desert Loam',
        vernacularName: 'रेतीली बलुई भूर (Retili Balui Bhur)',
        classification: 'Typic Torripsamment',
        fertilityRating: 'MARGINAL',
        description: 'Coarse sand with low water retention; rapid infiltration requiring micro-drip or sprinkler irrigation.'
      },
      {
        name: 'Canal Command Alluvial Silt Loam',
        vernacularName: 'नहरी दोमट चाही (Nahri Dumat Chahi)',
        classification: 'Typic Haplocambid',
        fertilityRating: 'HIGH',
        description: 'Deposited along IGNP Lift Canal minors; productive under controlled irrigation for seed spices.'
      }
    ],
    irrigationInfrastructure: {
      primarySource: 'Indira Gandhi Nahar Pariyojana (IGNP) Sagarmal Gopa Lift Branch & Deep Borewells',
      waterRightsCustom: 'Statutory Osrabandi (ओसरा-बंदी) weekly rotational canal water rationing allocated per Murabba (25 Bigha Chak)',
      seasonalCanalsCount: 2,
      tankOrPondCount: 3,
      energizedTubewellsCount: 28
    },
    tenureRegime: 'Khatedari Tenant Rights (खातेदारी अधिकार - Permanent Hereditary Transferable)',
    avgAnnualRevenuePerHa: 22.00,
    specialStatutoryProtections: [
      'Rajasthan Colonisation Act, 1954 (Command Area Land Ceiling & Water-use regulations)',
      'Desert Afforestation & Sand-Dune Stabilization Green Belt Easements'
    ],
    kharifCrops: ['Cluster Bean (Gowar)', 'Pearl Millet (Bajra)', 'Moth Bean'],
    rabiCrops: ['Cumin (Jeera)', 'Isabgol (Psyllium Husk)', 'Mustard (Raya)', 'Wheat'],
    zaidOrPerennialCrops: ['Date Palm (Khajur)', 'Desert Teak (Rohida)', 'Khejri (Prosopis cineraria)'],
    revenueHistoryRemarks: 'Underwent Murabbabandi (square parcelization) in 1998 following extension of the Sagarmal Gopa Canal distributary.'
  },

  // NEW VILLAGE 4: Nedumudi (Below-Sea-Level Polder Wetland, Kerala)
  Nedumudi: {
    villageId: 'VIL-KL-NED-004',
    villageName: 'Nedumudi',
    vernacularName: 'നെടുമുടി (കുട്ടനാട്)',
    censusVillageCode: '628312',
    state: 'Kerala',
    district: 'Alappuzha',
    subDivision: 'Alappuzha',
    tehsil: 'Kuttanad',
    revenueCircle: 'Nedumudi Village Office',
    gramPanchayat: 'Nedumudi Grama Panchayat',
    parganaOrHobli: 'Champakulam Firka',
    agroClimaticZone: 'Zone 12: West Coast Tropical Humid (Kuttanad Wetland Below-Sea-Level System)',
    elevationMeters: -1.5,
    annualRainfallMm: 2950,
    terrainType: 'DELTAIC_WETLAND',
    centroid: { lat: 9.4352, lng: 76.4025 },
    primaryRorFormat: 'Kerala E-Rekha Thandaper Register (ഫോറം 5 - താണ്ഡപ്പേർ)',
    statutoryAct: 'Kerala Land Reforms Act, 1963 & Kerala Conservation of Paddy Land & Wetland Act, 2008',
    cadastralSheetNo: 'Resurvey Block KL-ALP-KUT-09',
    lastBandobastYear: 2004,
    svamitvaDroneSurveyed: true,
    dgpsBenchmarkPillar: 'GCP-KL-ALP-NED-02',
    totalSurveyParcels: 512,
    totalGeographicAreaHa: 388.4,
    primaryLocalUnit: 'Cent & Are (സെന്റ് / ആർ)',
    localUnitToSqM: 40.47,
    unitFormulaDisplay: '1 Cent = 40.47 sq.m | 100 Cents = 1 Acre (4,046.86 sq.m) | 1 Are = 100 sq.m',
    dominantSoils: [
      {
        name: 'Acid Saline Peat Kayal Alluvium',
        vernacularName: 'കരി നിലം / കായൽ മണ്ണ് (Kari Nilam & Kayal Soil)',
        classification: 'Sulfic Endoaquept (Acid Sulfate Soil)',
        fertilityRating: 'SPECIALIZED',
        description: 'Rich in organic matter with low pH (3.5-5.0) neutralized by seasonal freshwater river flushing from Pamba & Manimala rivers.'
      },
      {
        name: 'Garden Homestead Alluvium',
        vernacularName: 'പുരയിടം (Purayidam Garden Land)',
        classification: 'Typic Tropofluvent',
        fertilityRating: 'HIGH',
        description: 'Elevated reclaimed ridges along lake banks suited for homesteads, multi-tier coconut and spice farming.'
      }
    ],
    irrigationInfrastructure: {
      primarySource: 'Pamba River Inland Backwaters & Padasekharam Ring Bund Drainage',
      waterRightsCustom: 'Padasekharam Samithi (പടശേഖര സമിതി) cooperative mechanical dewatering using large electric axial-flow pumps',
      seasonalCanalsCount: 6,
      tankOrPondCount: 18,
      energizedTubewellsCount: 0
    },
    tenureRegime: 'Janmam Ryotwari Freehold under Thandaper Passbook (Section 72 KLR Act)',
    avgAnnualRevenuePerHa: 52.00,
    specialStatutoryProtections: [
      'Kerala Conservation of Paddy Land and Wetland Act, 2008 (Strict ban on wetland conversion)',
      'Ramsar Wetland Site (Vembanad-Kol Wetland) Ecological Protection Regulations'
    ],
    kharifCrops: ['Punja Rice (Uma / Jyothi red rice)', 'Duck Rearing along Padasekharams'],
    rabiCrops: ['Secondary Flood Recession Paddy', 'Tapioca', 'Banana (Nendran)'],
    zaidOrPerennialCrops: ['West Coast Tall Coconut', 'Nutmeg (Jathikka)', 'Black Pepper', 'Freshwater Scampi (Karimeen)'],
    revenueHistoryRemarks: 'Internationally recognized FAO Globally Important Agricultural Heritage System (GIAHS) for below-sea-level farming.'
  },

  // NEW VILLAGE 5: Garmur (Brahmaputra River Island Char-Land, Assam)
  Garmur: {
    villageId: 'VIL-AS-GAR-005',
    villageName: 'Garmur',
    vernacularName: 'গড়মূৰ (মাজুলী)',
    censusVillageCode: '293410',
    state: 'Assam',
    district: 'Majuli',
    subDivision: 'Majuli Island',
    tehsil: 'Majuli Sub-Division',
    revenueCircle: 'Kamalabari Revenue Circle',
    gramPanchayat: 'Garmur Gram Panchayat',
    parganaOrHobli: 'Majuli Mouza',
    agroClimaticZone: 'Zone 2: Eastern Himalayan Sub-Tropical Brahmaputra Valley',
    elevationMeters: 85,
    annualRainfallMm: 2150,
    terrainType: 'RIVERINE_FLOODPLAIN',
    centroid: { lat: 26.9625, lng: 94.2185 },
    primaryRorFormat: 'Assam Dharitree Jamabandi & Chitha (ম্যাদী পট্টা আৰু জমা বন্দী)',
    statutoryAct: 'Assam Land and Revenue Regulation, 1886',
    cadastralSheetNo: 'Cadastral Map Sheet AS-MAJ-KAM-03',
    lastBandobastYear: 1982,
    svamitvaDroneSurveyed: true,
    dgpsBenchmarkPillar: 'GCP-AS-MAJ-GAR-01',
    totalSurveyParcels: 440,
    totalGeographicAreaHa: 625.0,
    primaryLocalUnit: 'Bigha-Katha-Lessa (বিঘা-কঠা-লেচা)',
    localUnitToSqM: 1337.8,
    unitFormulaDisplay: '1 Bigha = 1,337.8 sq.m (5 Katha = 100 Lessa) | 3.025 Bigha = 1 Acre (4,046.86 sq.m)',
    dominantSoils: [
      {
        name: 'Recent Brahmaputra Riverine Silt Loam',
        vernacularName: 'পলি মাটি / চাপৰি মাটি (Poli Mati / Char-Chapori)',
        classification: 'Typic Fluvaquent',
        fertilityRating: 'HIGH',
        description: 'Replenished annually by nutrient-dense river silt during monsoon flooding; excellent fertility without chemical inputs.'
      },
      {
        name: 'High Ridge Homestead Clayey Silt',
        vernacularName: 'বাৰী মাটি (Bari Mati - Homestead & Orchard)',
        classification: 'Aeric Endoaquept',
        fertilityRating: 'HIGH',
        description: 'Elevated village mounded settlements protected above normal flood stages; used for bamboo, betelnut, and mustard.'
      }
    ],
    irrigationInfrastructure: {
      primarySource: 'Kherkatia Suti Brahmaputra River Tributary & Shallow River Channels (Dongs)',
      waterRightsCustom: 'Customary flood recession cultivation with collective Dong-bandh community earthen check dams',
      seasonalCanalsCount: 3,
      tankOrPondCount: 14,
      energizedTubewellsCount: 19
    },
    tenureRegime: 'Periodic Myadi Patta (ম্যাদী পট্টা - Permanent Heritable) & Annual Eksona Patta (একচনা পট্টা)',
    avgAnnualRevenuePerHa: 30.00,
    specialStatutoryProtections: [
      'Majuli Cultural Landscape Heritage & Eco-sensitive Buffer Zone Protections',
      'Assam Land & Revenue Regulation Chapter X (Protection of indigenous tribal and riverine belts)'
    ],
    kharifCrops: ['Deepwater Floating Rice (Bao Dhan)', 'Autumn Rice (Ahu Dhan)', 'Jute (Pat)'],
    rabiCrops: ['Toria / Yellow Mustard (Sorisha)', 'Black Gram (Mati Mah)', 'Winter Rice (Boro Dhan)'],
    zaidOrPerennialCrops: ['Assam Lemon (Kaji Nemu)', 'Arecanut (Tamul)', 'Bamboos (Bhaluka Bah)'],
    revenueHistoryRemarks: 'Located on the worlds largest inhabited river island. Settlement maps incorporate active river bank erosion and sand siltation adjustments.'
  },

  // NEW VILLAGE 6: Bangarapet (Southern Dry Plateau Sericulture Belt, Karnataka)
  Bangarapet: {
    villageId: 'VIL-KA-BAN-006',
    villageName: 'Bangarapet',
    vernacularName: 'ಬಂಗಾರಪೇಟೆ (ಕೋಲಾರ)',
    censusVillageCode: '629402',
    state: 'Karnataka',
    district: 'Kolar',
    subDivision: 'Kolar',
    tehsil: 'Bangarapet',
    revenueCircle: 'Bangarapet Kasaba Nada Kacheri',
    gramPanchayat: 'Bangarapet Rural Panchayat',
    parganaOrHobli: 'Kasaba Hobli',
    agroClimaticZone: 'Zone 5: Eastern Dry Semi-Arid Plateau Zone of Karnataka',
    elevationMeters: 840,
    annualRainfallMm: 740,
    terrainType: 'SEMI_ARID_PLATEAU',
    centroid: { lat: 12.9815, lng: 78.2045 },
    primaryRorFormat: 'Karnataka Bhoomi RTC (ನಮೂನೆ ೧೬ - ಪಹಣಿ ಪತ್ರಿಕೆ)',
    statutoryAct: 'Karnataka Land Revenue Act, 1964 (Sec 127)',
    cadastralSheetNo: 'Tippani Cadastral Map KA-KOL-BAN-05',
    lastBandobastYear: 1992,
    svamitvaDroneSurveyed: true,
    dgpsBenchmarkPillar: 'GCP-KA-KOL-BAN-08',
    totalSurveyParcels: 710,
    totalGeographicAreaHa: 745.8,
    primaryLocalUnit: 'Acre-Gunta (ಎಕರೆ-ಗುಂಟೆ)',
    localUnitToSqM: 101.17,
    unitFormulaDisplay: '1 Gunta = 101.17 sq.m | 40 Guntas = 1 Acre (4,046.86 sq.m)',
    dominantSoils: [
      {
        name: 'Deep Red Gravelly Sandy Loam',
        vernacularName: 'ಕೆಂಪು ಜಿಡ್ಡು ಮಣ್ಣು (Kempu Jiddu Mannu)',
        classification: 'Udic Paleustalf (Red Alfisol)',
        fertilityRating: 'MEDIUM',
        description: 'Well-drained red soil formed on Precambrian crystalline granitic gneisses; ideal for mulberry, ragi, and mango.'
      },
      {
        name: 'Tank Bed Silt Clay Alluvium',
        vernacularName: 'ಕೆರೆ ಅಚ್ಚುಕಟ್ಟು ಮಣ್ಣು (Kere Achukattu Wetland)',
        classification: 'Typic Vertic Epiaquept',
        fertilityRating: 'HIGH',
        description: 'Deposited in the ayacut of historical Chola-era irrigation cascade tanks; seasonal paddy and sugarcane.'
      }
    ],
    irrigationInfrastructure: {
      primarySource: 'Hard-Rock Granitic Deep Borewells with Micro-Drip & Bethamangala Cascade Tank',
      waterRightsCustom: 'KC Valley treated groundwater recharge pipeline water harvesting; traditional Neeruganti (ನೀರುಗಂಟಿ) sluice turn managers',
      seasonalCanalsCount: 1,
      tankOrPondCount: 9,
      energizedTubewellsCount: 88
    },
    tenureRegime: 'Ryotwari Freehold under Bhoomi Digital Mutation (ಬಯೋಮೆಟ್ರಿಕ್ ಖಾತಾ)',
    avgAnnualRevenuePerHa: 44.00,
    specialStatutoryProtections: [
      'Karnataka Scheduled Castes and Scheduled Tribes (Prohibition of Transfer of Certain Lands) Act, 1978 (PTCL Act)',
      'Tank Bed (Kere Angala) Encroachment Prevention & Buffer Restrictions'
    ],
    kharifCrops: ['Finger Millet (Ragi - GPU 28)', 'Groundnut (KCG 2)', 'Red Gram (Thogari)'],
    rabiCrops: ['Horsegram (Huruli)', 'Field Beans (Avare)', 'Vegetables (Tomato & Capsicum)'],
    zaidOrPerennialCrops: ['V-1 Variety Mulberry for Bivoltine Silk Sericulture', 'Totapuri & Banganapalli Mango', 'Eucalyptus Farm Forestry'],
    revenueHistoryRemarks: 'Famous silk and gold-fields transit hub. Cadastral records synchronized with Bhoomi digital survey database (Phodi & Tatkal Durasti).'
  },

  // NEW VILLAGE 7: Bhimavaram (Godavari Delta Aquaculture & Alluvium, Andhra Pradesh)
  Bhimavaram: {
    villageId: 'VIL-AP-BHI-007',
    villageName: 'Bhimavaram',
    vernacularName: 'భీమవరం (పశ్చిమ గోదావరి)',
    censusVillageCode: '588492',
    state: 'Andhra Pradesh',
    district: 'West Godavari',
    subDivision: 'Narasapuram',
    tehsil: 'Bhimavaram',
    revenueCircle: 'Bhimavaram Revenue Circle No. 1',
    gramPanchayat: 'Bhimavaram Rural Mandal',
    parganaOrHobli: 'Bhimavaram Firka',
    agroClimaticZone: 'Zone 11: East Coast Plains & Hills (Godavari Delta Alluvial Zone)',
    elevationMeters: 6,
    annualRainfallMm: 1150,
    terrainType: 'DELTAIC_WETLAND',
    centroid: { lat: 16.5448, lng: 81.5212 },
    primaryRorFormat: 'AP Meebhoomi 1B Adangal (ఫారం 1B మరియు అడంగల్)',
    statutoryAct: 'AP Rights in Land and Pattadar Pass Books Act, 1971 & AP Inland Fisheries Act',
    cadastralSheetNo: 'FMB (Field Measurement Book) Sheet AP-WG-BHI-11',
    lastBandobastYear: 1986,
    svamitvaDroneSurveyed: true,
    dgpsBenchmarkPillar: 'GCP-AP-WG-BHI-03',
    totalSurveyParcels: 680,
    totalGeographicAreaHa: 810.5,
    primaryLocalUnit: 'Acre-Cent (ఎకరాలు-సెంట్లు)',
    localUnitToSqM: 40.47,
    unitFormulaDisplay: '1 Cent = 40.47 sq.m | 100 Cents = 1 Acre (4,046.86 sq.m)',
    dominantSoils: [
      {
        name: 'Godavari Deltaic Heavy Black Regur Clay',
        vernacularName: 'గోదావరి నల్ల రేగడి మట్టి (Godavari Nalla Regadi)',
        classification: 'Chromic Udic Haplustert',
        fertilityRating: 'HIGH',
        description: 'Fine-textured montmorillonitic clay with high water holding capacity and natural CEC; ideal for rice and brackish aquaculture.'
      },
      {
        name: 'Delta Coastal Alluvial Silt Loam',
        vernacularName: 'మాగాణి ఒండ్రు మట్టి (Magani Ondru Matti)',
        classification: 'Typic Fluvaquent',
        fertilityRating: 'HIGH',
        description: 'Deposited by the Godavari Western Delta irrigation canals; high phosphorus and potassium availability.'
      }
    ],
    irrigationInfrastructure: {
      primarySource: 'Sir Arthur Cotton Godavari Western Delta Main Canal (Yenamadurru Drain Command)',
      waterRightsCustom: 'Sir Arthur Cotton Delta Warabandi Ayacut rights guaranteeing water rotation during Sarva (kharif) and Dalwa (rabi)',
      seasonalCanalsCount: 5,
      tankOrPondCount: 22,
      energizedTubewellsCount: 56
    },
    tenureRegime: 'Ryotwari Registered Pattadar under Meebhoomi Digital Adangal (1B Passbook)',
    avgAnnualRevenuePerHa: 58.00,
    specialStatutoryProtections: [
      'Coastal Aquaculture Authority (CAA) brackish water shrimp farm registration regulations',
      'AP Agricultural Land Conversion (NALA) Act, 2006 for aquaculture conversion verification'
    ],
    kharifCrops: ['Sarva Season Paddy (BPT 5204 Samba Mahsuri / MTU 1010)', 'Black Gram (Minumu)'],
    rabiCrops: ['Dalwa Season Paddy (MTU 1001)', 'Maize', 'Sunflower'],
    zaidOrPerennialCrops: ['Litopenaeus vannamei Brackish Aquaculture', 'Coconut Groves', 'Oil Palm plantations'],
    revenueHistoryRemarks: 'Heart of the Godavari Rice & Aquaculture Bowl. FMB stone-to-stone digitized sub-divisions validated under DILRMP Webland system.'
  },

  // NEW VILLAGE 8: Kulgam (Kashmir Valley Saffron & Apple Karewa, Jammu & Kashmir)
  Kulgam: {
    villageId: 'VIL-JK-KUL-008',
    villageName: 'Kulgam',
    vernacularName: 'کولگام / कुलगाम (کشمیر)',
    censusVillageCode: '003290',
    state: 'Jammu & Kashmir',
    district: 'Kulgam',
    subDivision: 'Kulgam',
    tehsil: 'Devsar',
    revenueCircle: 'Devsar Patwar Circle No. 3',
    gramPanchayat: 'Kulgam Rural Halqa',
    parganaOrHobli: 'Shahabad Pargana',
    agroClimaticZone: 'Zone 1: Kashmir Valley High Altitude Temperate Plateau',
    elevationMeters: 1739,
    annualRainfallMm: 860,
    terrainType: 'VALLEY_BASIN',
    centroid: { lat: 33.6450, lng: 75.0210 },
    primaryRorFormat: 'J&K Jamabandi & Misal-e-Haqiqat (رجسٹر حقداران زمیں - مثل حقیقت)',
    statutoryAct: 'Jammu & Kashmir Land Revenue Act, 1996 (1939 AD)',
    cadastralSheetNo: 'Shajra Aks Kishtwar Sheet JK-KUL-DEV-06',
    lastBandobastYear: 1984,
    svamitvaDroneSurveyed: true,
    dgpsBenchmarkPillar: 'GCP-JK-KUL-DEV-05',
    totalSurveyParcels: 540,
    totalGeographicAreaHa: 530.0,
    primaryLocalUnit: 'Kanal-Marla (کنال-مرلہ)',
    localUnitToSqM: 505.86,
    unitFormulaDisplay: '1 Kanal = 505.86 sq.m (20 Marlas) | 8 Kanals = 1 Acre (4,046.86 sq.m)',
    dominantSoils: [
      {
        name: 'Karewa Lacustrine Silt-Clay Plateau Soil',
        vernacularName: 'وُڈّر مژھ (Vuddr / Karewa Loam)',
        classification: 'Typic Hapludalf',
        fertilityRating: 'SPECIALIZED',
        description: 'Deep Pleistocene lacustrine plateau silt; permeable and rich in micronutrients, prized globally for Saffron (Kong) cultivation.'
      },
      {
        name: 'Veshaw River Alluvial Valley Loam',
        vernacularName: 'شل مژھ (Shil Alluvial Loam)',
        classification: 'Fluventic Dystrudept',
        fertilityRating: 'HIGH',
        description: 'Formed from snowmelt sediment of Veshaw River; fertile and highly responsive to organic manure for high-density Apple orchards.'
      }
    ],
    irrigationInfrastructure: {
      primarySource: 'Veshaw Snowmelt River Canals (Kuls) & Perennial Mountain Springs',
      waterRightsCustom: 'Mirab (میراآب) customary watermaster administration governing rotational Kul irrigation rights',
      seasonalCanalsCount: 4,
      tankOrPondCount: 8,
      energizedTubewellsCount: 12
    },
    tenureRegime: 'Proprietary Owner (Malik-e-Zamin) under J&K Big Landed Estates Abolition Act',
    avgAnnualRevenuePerHa: 38.00,
    specialStatutoryProtections: [
      'J&K Saffron Act (Prohibition of non-agricultural conversion of Karewa Saffron soil)',
      'J&K Land Revenue Act agricultural tenancy and heritage orchard preservation covenants'
    ],
    kharifCrops: ['Kashmiri Rice (K-332 / Mushkbudji scented rice)', 'Maize', 'Pulses (Moong)'],
    rabiCrops: ['Kashmir Mustard (Tilgogul)', 'Barley', 'Turnips'],
    zaidOrPerennialCrops: ['GI-Tagged Saffron (Crocus sativus)', 'Kullu/Kashmiri Delicious Apple', 'Walnut (Akhrot)', 'Pear (Babugosha)'],
    revenueHistoryRemarks: 'Known as the Rice Bowl of Kashmir. Misal-e-Haqiqat cadastral records updated with DILRMP GIS digital parcel boundaries.'
  },

  // EXISTING VILLAGES WITH FULL ENRICHED SPECIFICATIONS
  Wagholi: {
    villageId: 'VIL-MH-WAG-009',
    villageName: 'Wagholi',
    vernacularName: 'वाघोली (पुणे)',
    censusVillageCode: '221841',
    state: 'Maharashtra',
    district: 'Pune',
    subDivision: 'Haveli',
    tehsil: 'Haveli',
    revenueCircle: 'Wagholi Saza No. 1',
    gramPanchayat: 'Wagholi Gram Panchayat (PMRDA Urban Fringe)',
    parganaOrHobli: 'Haveli Pargana',
    agroClimaticZone: 'Zone 9: Western Plateau & Hill Region (Scarcity to Assured Rainfall Zone)',
    elevationMeters: 570,
    annualRainfallMm: 680,
    terrainType: 'SEMI_ARID_PLATEAU',
    centroid: { lat: 18.5815, lng: 73.9817 },
    primaryRorFormat: 'MahaBhulekh Saat-Baara Extract (गाव नमुना ७ व १२)',
    statutoryAct: 'Maharashtra Land Revenue Code, 1966 (Sec 148)',
    cadastralSheetNo: 'Aks Shajra Sheet MH-PUN-HAV-02/2026',
    lastBandobastYear: 1982,
    svamitvaDroneSurveyed: true,
    dgpsBenchmarkPillar: 'GCP-MAH-PUN-WAG-01',
    totalSurveyParcels: 842,
    totalGeographicAreaHa: 1120.4,
    primaryLocalUnit: 'Guntha (गुंठा)',
    localUnitToSqM: 101.17,
    unitFormulaDisplay: '1 Guntha = 101.17 sq.m | 40 Gunthas = 1 Acre (4,046.86 sq.m)',
    dominantSoils: [
      {
        name: 'Medium Deep Black Cotton Soil',
        vernacularName: 'मध्यम काळी रेगुर जमीन (Jirayat Class II)',
        classification: 'Typic Chromustert',
        fertilityRating: 'HIGH',
        description: 'Montmorillonite rich cracking clay; excellent moisture retention suitable for sugarcane, onion, and pulses.'
      },
      {
        name: 'Shallow Reddish-Brown Murrum Gravel',
        vernacularName: 'तांबूस मुरुमाड जमीन (Murrum Malran)',
        classification: 'Lithic Ustorthent',
        fertilityRating: 'MEDIUM',
        description: 'Well-drained upland gravelly loam; fast drainage suitable for peri-urban greenhouse floriculture.'
      }
    ],
    irrigationInfrastructure: {
      primarySource: 'Mutha Right Bank Canal Network & Perennial Deep Ag-Borewells',
      waterRightsCustom: 'Pani-Vatap Sanstha (पाणी वाटप संस्था) canal water-turn distribution schedule',
      seasonalCanalsCount: 2,
      tankOrPondCount: 5,
      energizedTubewellsCount: 110
    },
    tenureRegime: 'Bhogavatadar Class 1 (भोगवटादार वर्ग १ - Unrestricted Transferable Tenure)',
    avgAnnualRevenuePerHa: 64.00,
    specialStatutoryProtections: [
      'PMRDA Urban Development Fringe NA (Non-Agricultural) Section 44 Verification',
      'Maharashtra Fragmentation & Consolidation of Holdings Act minimum parcel size limits'
    ],
    kharifCrops: ['Hybrid Pearl Millet (Bajra)', 'Soybean (JS 335)', 'Onion (Kharif Fursungi)'],
    rabiCrops: ['Rabi Sorghum (Maldandi Jowar)', 'Gram (Chana / Harbara)', 'Wheat (Trimbak)'],
    zaidOrPerennialCrops: ['Perennial Sugarcane (Co 86032)', 'Fodder Maize', 'Greenhouse Dutch Roses'],
    revenueHistoryRemarks: 'Rapidly transforming peri-urban agrarian-fringe village undergoing dual DILRMP GIS alignment and PMRDA town planning validation.'
  },

  Babatpur: {
    villageId: 'VIL-UP-BAB-010',
    villageName: 'Babatpur',
    vernacularName: 'बाबतपुर (वाराणसी)',
    censusVillageCode: '208119',
    state: 'Uttar Pradesh',
    district: 'Varanasi',
    subDivision: 'Pindra',
    tehsil: 'Pindra',
    revenueCircle: 'Pindra Halka No. 3',
    gramPanchayat: 'Babatpur Gram Sabha',
    parganaOrHobli: 'Kolaslah Pargana',
    agroClimaticZone: 'Zone 4: Middle Gangetic Plain Region (Eastern Alluvial Plains)',
    elevationMeters: 81,
    annualRainfallMm: 1020,
    terrainType: 'ALLUVIAL_PLAINS',
    centroid: { lat: 25.4498, lng: 82.8596 },
    primaryRorFormat: 'UP BhuLekh Khatauni ROR (खतौनी प्रपत्र ४५)',
    statutoryAct: 'Uttar Pradesh Revenue Code, 2006 (Sec 31) & ZALR Act',
    cadastralSheetNo: 'Shajra Map Sheet UP-VAR-PIN-01',
    lastBandobastYear: 1978,
    svamitvaDroneSurveyed: true,
    dgpsBenchmarkPillar: 'GCP-UP-VAR-BAB-03',
    totalSurveyParcels: 915,
    totalGeographicAreaHa: 890.0,
    primaryLocalUnit: 'Bigha-Biswa-Biswansi (बीघा-बिस्वा)',
    localUnitToSqM: 2530.0,
    unitFormulaDisplay: '1 Pukka Bigha = 2,530 sq.m (20 Biswa) | 1.6 Bigha = 1 Acre (4,046.86 sq.m)',
    dominantSoils: [
      {
        name: 'Gangetic Deep Silt Loam',
        vernacularName: 'दोमट नहरी (Dumat Nahri Alluvium)',
        classification: 'Typic Ustifluvent',
        fertilityRating: 'HIGH',
        description: 'Neutral pH (7.2), rich in illite clay minerals; ideal for intensive multi-crop wheat, mustard, and potato.'
      },
      {
        name: 'Heavy Clayey Lowland Alluvium',
        vernacularName: 'मटियारी मटियार (Matiyari Clay)',
        classification: 'Vertic Haplustept',
        fertilityRating: 'HIGH',
        description: 'Deep clayey soil with high cation exchange capacity suited for standing water paddy cultivation.'
      }
    ],
    irrigationInfrastructure: {
      primarySource: 'Government Minor Canals & State Tube-well Network',
      waterRightsCustom: 'Roster-based tubewell tokens and canal delivery schedule governed by Tehsil Irrigation Officer',
      seasonalCanalsCount: 2,
      tankOrPondCount: 7,
      energizedTubewellsCount: 94
    },
    tenureRegime: 'Bhumidhar with Transferable Rights (संक्रमणीय भूमिधर)',
    avgAnnualRevenuePerHa: 50.00,
    specialStatutoryProtections: [
      'UP Revenue Code Section 89/90 ceiling limits (12.5 acres maximum holding)',
      'Varanasi Airport Runway Safety & Height Buffer Zone land conversion covenants'
    ],
    kharifCrops: ['Basmati Rice (Pusa 1121)', 'Maize', 'Pigeon Pea (Arhar / Tur)'],
    rabiCrops: ['Wheat (PBW 343)', 'Yellow Mustard', 'Potato (Kufri Jyoti)'],
    zaidOrPerennialCrops: ['Zaid Moong', 'Cucurbits (Watermelon / Cucumber)', 'Banana'],
    revenueHistoryRemarks: 'Consolidated under the 1978 UP Consolidation of Holdings Act (Chakbandi). Modernized under UP BhuLekh digital system.'
  },

  Raikot: {
    villageId: 'VIL-PB-RAI-011',
    villageName: 'Raikot',
    vernacularName: 'ਰਾਏਕੋਟ (ਲੁਧਿਆਣਾ)',
    censusVillageCode: '032890',
    state: 'Punjab',
    district: 'Ludhiana',
    subDivision: 'Jagraon',
    tehsil: 'Jagraon',
    revenueCircle: 'Raikot Patwar Halka No. 1',
    gramPanchayat: 'Raikot Rural Gram Panchayat',
    parganaOrHobli: 'Malwa Central Pargana',
    agroClimaticZone: 'Zone 3: Trans-Gangetic Plains Region (Central Punjab Alluvial)',
    elevationMeters: 235,
    annualRainfallMm: 680,
    terrainType: 'ALLUVIAL_PLAINS',
    centroid: { lat: 30.6495, lng: 75.4825 },
    primaryRorFormat: 'PLRS Jamabandi Nakal (ਫਾਰਮ ੪ - ਨਕਲ ਜਮਾਂਬੰਦੀ)',
    statutoryAct: 'Punjab Land Revenue Act, 1887 (Sec 31)',
    cadastralSheetNo: 'Shajra Kishtwar Sheet PB-LDH-JAG-04',
    lastBandobastYear: 1966,
    svamitvaDroneSurveyed: true,
    dgpsBenchmarkPillar: 'GCP-PB-LDH-RAI-01',
    totalSurveyParcels: 1040,
    totalGeographicAreaHa: 1350.0,
    primaryLocalUnit: 'Kanal-Marla (ਕਨਾਲ-ਮਰਲਾ)',
    localUnitToSqM: 505.86,
    unitFormulaDisplay: '1 Kanal = 505.86 sq.m (20 Marlas) | 8 Kanals = 1 Acre (4,046.86 sq.m)',
    dominantSoils: [
      {
        name: 'Indo-Gangetic Deep Coarse Loamy Alluvium',
        vernacularName: 'ਨਹਿਰੀ ਚਾਹੀ ਜ਼ਮੀਨ (Nehri Chahi Loam)',
        classification: 'Typic Ustochrept',
        fertilityRating: 'HIGH',
        description: 'Highly fertile alluvial soil with high base saturation; responsive to balanced NPK fertilisation.'
      }
    ],
    irrigationInfrastructure: {
      primarySource: 'Sirhind Canal Feeder Branch & Deep Electric Submersible Tube-wells',
      waterRightsCustom: 'Warabandi (ਵਾਰਾਬੰਦੀ) statutory 168-hour weekly canal water distribution schedule',
      seasonalCanalsCount: 2,
      tankOrPondCount: 4,
      energizedTubewellsCount: 165
    },
    tenureRegime: 'Malkan Freehold with Joint Khewat Co-ownership (ਮਾਲਕ ਜ਼ਮੀਨ)',
    avgAnnualRevenuePerHa: 72.00,
    specialStatutoryProtections: [
      'Punjab Preservation of Subsoil Water Act, 2009 (Mandatory June paddy transplanting dates)',
      'Punjab Security of Land Tenures Act, 1953'
    ],
    kharifCrops: ['Non-Basmati High-Yield Rice (PR 126 / PR 128)', 'Cotton (Bt Cotton)'],
    rabiCrops: ['Wheat (HD 3086 / PBW 824)', 'Mustard (Raya)', 'Green Peas'],
    zaidOrPerennialCrops: ['Summer Moong', 'Fodder Berseem', 'Kinnow Mandarin Orchards'],
    revenueHistoryRemarks: 'Consolidated under 1966 Punjab Bandobast into standardized 1-acre square Killas within 25-acre Murabbas.'
  },

  Hullahalli: {
    villageId: 'VIL-KA-HUL-012',
    villageName: 'Hullahalli',
    vernacularName: 'ಹುಲ್ಲಹಳ್ಳಿ (ಮೈಸೂರು)',
    censusVillageCode: '619210',
    state: 'Karnataka',
    district: 'Mysuru',
    subDivision: 'Nanjangud',
    tehsil: 'Nanjangud',
    revenueCircle: 'Hullahalli Nadakacheri',
    gramPanchayat: 'Hullahalli Grama Panchayat',
    parganaOrHobli: 'Hullahalli Hobli',
    agroClimaticZone: 'Zone 6: Southern Dry Zone of Karnataka (Cauvery / Kapila Basin)',
    elevationMeters: 675,
    annualRainfallMm: 780,
    terrainType: 'SEMI_ARID_PLATEAU',
    centroid: { lat: 12.1175, lng: 76.6795 },
    primaryRorFormat: 'Karnataka Bhoomi RTC (ನಮೂನೆ ೧೬ - ಪಹಣಿ ಪತ್ರಿಕೆ)',
    statutoryAct: 'Karnataka Land Revenue Act, 1964 (Sec 127)',
    cadastralSheetNo: 'Aks Map Sheet KA-MYS-NAN-08',
    lastBandobastYear: 1988,
    svamitvaDroneSurveyed: true,
    dgpsBenchmarkPillar: 'GCP-KA-MYS-HUL-02',
    totalSurveyParcels: 640,
    totalGeographicAreaHa: 690.0,
    primaryLocalUnit: 'Acre-Gunta (ಎಕರೆ-ಗುಂಟೆ)',
    localUnitToSqM: 101.17,
    unitFormulaDisplay: '1 Gunta = 101.17 sq.m | 40 Guntas = 1 Acre (4,046.86 sq.m)',
    dominantSoils: [
      {
        name: 'Riverine Kapila Wetland Clay',
        vernacularName: 'ತರಿ ಕೆಸರು ಮಣ್ಣು (Tari Wetland Clay)',
        classification: 'Typic Paleustalf',
        fertilityRating: 'HIGH',
        description: 'Heavy clay loam enriched by Kabini River alluvium; ideal for long-duration paddy and banana.'
      }
    ],
    irrigationInfrastructure: {
      primarySource: 'Kabini Right Bank Canal Network (Hullahalli Branch)',
      waterRightsCustom: 'Cauvery Neeravari Nigama canal rotation schedule',
      seasonalCanalsCount: 2,
      tankOrPondCount: 6,
      energizedTubewellsCount: 52
    },
    tenureRegime: 'Ryotwari Pattadar under Bhoomi Digital Mutation (ಖಾತೆದಾರ)',
    avgAnnualRevenuePerHa: 55.00,
    specialStatutoryProtections: [
      'Karnataka Land Reforms Act Section 79A/B deregulation verification',
      'Kapila River Flood Margin Easement'
    ],
    kharifCrops: ['Paddy (Jyothi / Jaya)', 'Sugarcane (Co 62175)'],
    rabiCrops: ['Ragi (Finger Millet)', 'Field Beans (Avare)'],
    zaidOrPerennialCrops: ['Nanjangud Rasabale Banana (GI Tagged)', 'Coconut', 'Betel Vine'],
    revenueHistoryRemarks: 'Home to the prized GI-tagged Nanjangud Rasabale banana. Cadastral records synchronized with Bhoomi database.'
  }
};

export function getRevenueVillageSpecification(villageName: string): RevenueVillageSpecification {
  if (REVENUE_VILLAGE_SPECIFICATIONS[villageName]) {
    return REVENUE_VILLAGE_SPECIFICATIONS[villageName];
  }
  
  // Search case-insensitively or partial match
  const lower = villageName.toLowerCase().trim();
  for (const [key, spec] of Object.entries(REVENUE_VILLAGE_SPECIFICATIONS)) {
    if (key.toLowerCase() === lower || spec.villageName.toLowerCase() === lower) {
      return spec;
    }
  }

  // Fallback to Wagholi
  return REVENUE_VILLAGE_SPECIFICATIONS['Wagholi'];
}
