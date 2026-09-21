export interface StateLandFormatInfo {
  state: string;
  formatTitle: string;
  formatShort: string;
  formCode: string;
  vernacularName: string;
  statutoryAct: string;
  portalName: string;
  portalUrl: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  description: string;
  keyFields: string[];
  standardColumns: { colNo: string; title: string; desc: string }[];
}

export const STATE_LAND_FORMATS: Record<string, StateLandFormatInfo> = {
  'Maharashtra': {
    state: 'Maharashtra',
    formatTitle: 'MahaBhulekh Saat-Baara Extract (7/12)',
    formatShort: 'Saat-Baara (7/12)',
    formCode: 'Village Form VII & XII (गाव नमुना ७ व १२)',
    vernacularName: 'सात-बारा उतारा (हक्क व पीक पाहणी पत्रक)',
    statutoryAct: 'Maharashtra Land Revenue Code, 1966 (Sec 148)',
    portalName: 'MahaBhulekh (महाभूलेख)',
    portalUrl: 'bhulekh.mahabhumi.gov.in',
    badgeBg: 'bg-[#FFF9EA]',
    badgeText: 'text-[#8B4513]',
    badgeBorder: 'border-[#DCD7CE]',
    description: 'Composed of Village Form 7 (Record of Rights, Occupants/Kabjedar, Potkharaba) and Village Form 12 (Register of Crops/Pika-Pahani, Irrigated Area).',
    keyFields: ['Gat / Survey No', 'Hissa No', 'Khate Kramank', 'Bhogavatadar Class', 'Pot-Kharaba', 'Pika-Pahani'],
    standardColumns: [
      { colNo: 'VF-7A', title: 'भूमापन क्रमांक व हिस्सा (Gat / Survey & Hissa)', desc: 'Cadastral parcel identifier and sub-division.' },
      { colNo: 'VF-7B', title: 'भोगवटादाराचे नाव (Occupant Name & Class)', desc: 'Class 1 (unrestricted) or Class 2 (restricted tenure).' },
      { colNo: 'VF-7C', title: 'क्षेत्र व आकारणी (Area & Assessment)', desc: 'Cultivable area, Pot-Kharaba (uncultivable) and assessment fee.' },
      { colNo: 'VF-7D', title: 'इतर हक्क व बोजा (Other Rights & Encumbrances)', desc: 'Bank hypothecations, tenancy rights, and court attachments.' },
      { colNo: 'VF-12', title: 'पिकांची नोंद (Crop & Irrigation Inspection)', desc: 'Kharif/Rabi/Summer crop varieties and source of irrigation.' }
    ]
  },
  'Uttar Pradesh': {
    state: 'Uttar Pradesh',
    formatTitle: 'UP BhuLekh Khatauni ROR (खतौनी अधिकार अभिलेख)',
    formatShort: 'Khatauni (खतौनी Form 45)',
    formCode: 'Form 45 / Prapatra 45 (प्रपत्र ४५)',
    vernacularName: 'खतौनी (अधिकार अभिलेख नकल)',
    statutoryAct: 'Uttar Pradesh Revenue Code, 2006 (Sec 31) & ZALR Act',
    portalName: 'UP BhuLekh (यूपी भूलेख)',
    portalUrl: 'upbhulekh.gov.in',
    badgeBg: 'bg-[#EAF2EB]',
    badgeText: 'text-[#2D4A30]',
    badgeBorder: 'border-[#BCD4C0]',
    description: 'Statutory 14-column land record ledger recording tenure holder details, share fractions, khasra area in hectares, land revenue, and mutation order remarks.',
    keyFields: ['Khata Number', 'Khasra Number', 'Bhumidhar Category', 'Fasli Year', 'Lagan (Revenue)', 'Khaifiyat (Remarks)'],
    standardColumns: [
      { colNo: '1', title: 'खाता संख्या (Khata Serial No)', desc: 'Register account serial number.' },
      { colNo: '2', title: 'खातेदार का नाम व पिता/पति (Tenure Holder & Parentage)', desc: 'Primary owner and co-sharers residence.' },
      { colNo: '3', title: 'अधिकार का स्वरूप (Tenure Status)', desc: 'Bhumidhar with transferable rights or non-transferable.' },
      { colNo: '4-6', title: 'खसरा संख्या व क्षेत्रफल (Khasra & Area)', desc: 'Survey parcel number and area in metric hectares.' },
      { colNo: '7-10', title: 'भू-राजस्व व देय (Land Revenue Assessment)', desc: 'Annual statutory malguzari assessed.' },
      { colNo: '11-14', title: 'आदेश / कैफियत (Mutation Orders & Liens)', desc: 'Court orders, bank KCC liens, and registered transfers.' }
    ]
  },
  'Karnataka': {
    state: 'Karnataka',
    formatTitle: 'Karnataka Bhoomi RTC (ಪಹಣಿ / ಹಕ್ಕು ದಾಖಲೆ)',
    formatShort: 'Bhoomi RTC (Form 16)',
    formCode: 'Form 16 / Namoone 16 (ನಮೂನೆ ೧೬)',
    vernacularName: 'ಆರ್.ಟಿ.ಸಿ - ಪಹಣಿ ಪತ್ರಿಕೆ (Record of Rights, Tenancy & Crops)',
    statutoryAct: 'Karnataka Land Revenue Act, 1964 (Sec 127)',
    portalName: 'Bhoomi (ಭೂಮಿ ಪೋರ್ಟಲ್)',
    portalUrl: 'bhoomi.karnataka.gov.in',
    badgeBg: 'bg-[#F2EDFB]',
    badgeText: 'text-[#4A2D78]',
    badgeBorder: 'border-[#D2C5E8]',
    description: '12-column digital cadastral statement documenting ownership (Kabjedar), tenancy (Geni), cultivation (Bhoomi), soil class, and dry/wet area in Acres-Guntas.',
    keyFields: ['Survey Number', 'Hissa Number', 'Khata Number', 'Kabjedar Name', 'Kandaya (Revenue)', 'Bin-Sheti'],
    standardColumns: [
      { colNo: 'Col 1-3', title: 'ಸರ್ವೆ ನಂ & ಹಿಸ್ಸಾ (Survey & Hissa No)', desc: 'Base survey and sub-division.' },
      { colNo: 'Col 4-6', title: 'ಖಾತೆದಾರರ ಹೆಸರು (Kabjedar & Owner Extent)', desc: 'Registered pattadar names and share fractions.' },
      { colNo: 'Col 7-8', title: 'ವಿಸ್ತೀರ್ಣ (Extent in Acres-Guntas)', desc: 'Cultivable vs Kharabu (uncultivable) area breakdown.' },
      { colNo: 'Col 9-10', title: 'ಕಂದಾಯ & ನೀರಿನ ಮೂಲ (Revenue & Water Source)', desc: 'Canal, borewell, or rainfed assessment.' },
      { colNo: 'Col 11-12', title: 'ಬೆಳೆ ವಿವರ & ಋಣಭಾರ (Crops & Encumbrances)', desc: 'Active crop varieties and bank loan hypothecation.' }
    ]
  },
  'Punjab': {
    state: 'Punjab',
    formatTitle: 'Punjab PLRS Jamabandi Nakal (ਜਮਾਂਬੰਦੀ ਫਾਰਮ ੪)',
    formatShort: 'Jamabandi (Form IV)',
    formCode: 'Form IV (ਫਾਰਮ ੪ - ਨਕਲ ਜਮਾਂਬੰਦੀ)',
    vernacularName: 'ਨਕਲ ਜਮਾਂਬੰਦੀ (ਰਜਿਸਟਰ ਹੱਕਦਾਰਾਨ ਜ਼ਮੀਨ)',
    statutoryAct: 'Punjab Land Revenue Act, 1887 (Sec 31)',
    portalName: 'PLRS Jamabandi (ਪੰਜਾਬ ਲੈਂਡ ਰਿਕਾਰਡਜ਼)',
    portalUrl: 'jamabandi.punjab.gov.in',
    badgeBg: 'bg-[#FFF2E5]',
    badgeText: 'text-[#7D3C00]',
    badgeBorder: 'border-[#F0C9A5]',
    description: 'Quadrennial 12-column record of rights listing Khewat (owner group), Khatoni (cultivator holding), Murabba/Killa numbers, and canal irrigation shares.',
    keyFields: ['Khewat / Khata No', 'Khatoni No', 'Khasra / Killa No', 'Malkan (Owners)', 'Kashtkaran (Cultivators)', 'Malguzari'],
    standardColumns: [
      { colNo: 'Col 1-2', title: 'ਖੇਵਟ ਤੇ ਖਤੌਨੀ ਨੰਬਰ (Khewat & Khatoni)', desc: 'Ownership group and tenant holding account.' },
      { colNo: 'Col 3-4', title: 'ਮਾਲਕਾਨ ਤੇ ਕਾਸ਼ਤਕਾਰਾਨ (Owners & Cultivators)', desc: 'Names, shares, and actual tillers of soil.' },
      { colNo: 'Col 5-6', title: 'ਮੁਰੱਬਾ ਤੇ ਖਸਰਾ ਨੰਬਰ (Murabba & Khasra No)', desc: 'Survey rectangle and acre square sub-plots.' },
      { colNo: 'Col 7-8', title: 'ਰਕਬਾ ਤੇ ਕਿਸਮ ਜ਼ਮੀਨ (Area & Soil Classification)', desc: 'Area in Kanals-Marlas and soil (Chahi/Nehri/Barani).' },
      { colNo: 'Col 9-12', title: 'ਮਾਮਲਾ ਤੇ ਕੈਫ਼ੀਅਤ (Revenue & Remarks/Intiqal)', desc: 'Assessed tax, pending mutation (intiqal), and mortgage liens.' }
    ]
  },
  'Haryana': {
    state: 'Haryana',
    formatTitle: 'Haryana Jamabandi Nakal (नकल जमाबंदी)',
    formatShort: 'Jamabandi (Form IV)',
    formCode: 'Form IV / Nakal Jamabandi (फॉर्म ४)',
    vernacularName: 'जमाबंदी (रजिस्टर हकदारान ज़मीन)',
    statutoryAct: 'Punjab/Haryana Land Revenue Act, 1887',
    portalName: 'Jamabandi Haryana (हरियाणा जमाबंदी)',
    portalUrl: 'jamabandi.nic.in',
    badgeBg: 'bg-[#FFF2E5]',
    badgeText: 'text-[#7D3C00]',
    badgeBorder: 'border-[#F0C9A5]',
    description: 'Official 12-column revenue register detailing Murabba numbers, Killa numbers, Khewat shares, canal irrigation turn (Wara-bandi), and bank hypothecations.',
    keyFields: ['Khewat No', 'Khatoni No', 'Murabba & Khasra', 'Malkan Names', 'Area in Kanal-Marla', 'Maamla'],
    standardColumns: [
      { colNo: 'Col 1-2', title: 'खेवट व खतौनी संख्या (Khewat & Khatoni)', desc: 'Owner group and tenancy account.' },
      { colNo: 'Col 3-4', title: 'मालिक व काश्तकार (Owners & Tillers)', desc: 'Names with parentage and share fractions.' },
      { colNo: 'Col 5-7', title: 'मुरब्बा, खसरा व रकबा (Murabba, Khasra & Area)', desc: 'Sub-divisions and area in Kanals-Marlas.' },
      { colNo: 'Col 8-12', title: 'मामला व कैफियत (Revenue & Encumbrances)', desc: 'Tax, stay orders, and bank charges.' }
    ]
  },
  'Tamil Nadu': {
    state: 'Tamil Nadu',
    formatTitle: 'Tamil Nadu Patta Chitta Extract (பட்டா சிட்டா)',
    formatShort: 'Patta Chitta (படிவம் A/B)',
    formCode: 'e-Sevai Form A & B (படிவம் அ/ஆ)',
    vernacularName: 'பட்டா சிட்டா மற்றும் அ-பதிவேடு (A-Register)',
    statutoryAct: 'Tamil Nadu Patta Pass Book Act, 1983',
    portalName: 'AnyData e-Services (நில உரிமை விவரங்கள்)',
    portalUrl: 'eservices.tn.gov.in',
    badgeBg: 'bg-[#EDF5FD]',
    badgeText: 'text-[#1B4B75]',
    badgeBorder: 'border-[#BBD7F2]',
    description: 'Statutory record of ownership (Patta) coupled with land survey settlement register (Chitta) specifying Nanjai (wet) and Punjai (dry) classifications.',
    keyFields: ['Patta Number', 'Survey Number', 'Sub-division (Udprivu)', 'Pattadar Name', 'Nanjai / Punjai Extent', 'Theervai (Tax)'],
    standardColumns: [
      { colNo: 'Sec 1', title: 'புல எண் & உட்பிரிவு (Survey & Sub-Division)', desc: 'Unique survey parcel and sub-division.' },
      { colNo: 'Sec 2', title: 'பட்டா எண் & உரிமையாளர் (Patta No & Pattadar)', desc: 'Patta passbook identity and owner name.' },
      { colNo: 'Sec 3', title: 'நில வகைப்பாடு (Land Classification)', desc: 'Nanjai (wet canal), Punjai (dry rainfed), or Manavari.' },
      { colNo: 'Sec 4', title: 'பரப்பளவு (Extent in Hectares/Ares)', desc: 'Normalized area in metric hectares and ares.' },
      { colNo: 'Sec 5', title: 'தீர்வை (Revenue Assessment)', desc: 'Annual statutory theervai assessment.' }
    ]
  },
  'Rajasthan': {
    state: 'Rajasthan',
    formatTitle: 'Rajasthan Apna Khata Jamabandi (जमाबंदी नकल)',
    formatShort: 'Jamabandi (Form 24)',
    formCode: 'Form 24 / Prapatra 24 (प्रपत्र २४)',
    vernacularName: 'जमाबंदी (अधिकार अभिलेख)',
    statutoryAct: 'Rajasthan Land Revenue Act, 1956 (Sec 114)',
    portalName: 'Apna Khata (अपना खाता - ई-धरती)',
    portalUrl: 'apnakhata.rajasthan.gov.in',
    badgeBg: 'bg-[#FFF2E5]',
    badgeText: 'text-[#7D3C00]',
    badgeBorder: 'border-[#F0C9A5]',
    description: 'Record of rights showing Khata numbers, Khasra numbers, Kashtkar names, soil category (Chahi, Barani, Talabi), and annual lagan.',
    keyFields: ['Khata Number', 'Khasra Number', 'Kashtkar Name', 'Rakba (Area in Ha/Bigha)', 'Lagan', 'Namantaran (Mutation)'],
    standardColumns: [
      { colNo: 'Col 1', title: 'खाता संख्या (Khata Serial)', desc: 'Tenure account number.' },
      { colNo: 'Col 2', title: 'काश्तकार का नाम (Owner/Kashtkar)', desc: 'Name, father name, and caste/residence.' },
      { colNo: 'Col 3', title: 'खसरा संख्या व क्षेत्रफल (Khasra & Area)', desc: 'Survey number and area in Hectares.' },
      { colNo: 'Col 4', title: 'भूमि किस्म व लगान (Soil Type & Tax)', desc: 'Barani (rainfed), Chahi (well), or Nahri (canal).' },
      { colNo: 'Col 5', title: 'नामान्तरण व कैफियत (Mutations & Remarks)', desc: 'Sanctioned mutations and bank mortgage entries.' }
    ]
  },
  'Gujarat': {
    state: 'Gujarat',
    formatTitle: 'Gujarat AnyRoR 7/12 & 8A (ગામ નમૂનો ૭/૧૨ અને ૮-અ)',
    formatShort: 'AnyRoR 7/12 & 8A',
    formCode: 'Village Form 7, 12 & 8A (ગામ નમૂનો ૭, ૧૨, ૮-અ)',
    vernacularName: 'ગામ નમૂનો ૭/૧૨ નો ઉતારો અને ૮-અ ખાતાવહી',
    statutoryAct: 'Gujarat Land Revenue Code, 1879',
    portalName: 'AnyRoR Gujarat (એની આર.ઓ.આર)',
    portalUrl: 'anyror.gujarat.gov.in',
    badgeBg: 'bg-[#FFF9EA]',
    badgeText: 'text-[#8B4513]',
    badgeBorder: 'border-[#DCD7CE]',
    description: 'Triple-ledger system: Form 7 (Tenure & Area), Form 12 (Crop details), and Form 8-A (Khata ledger of all land parcels owned by a farmer).',
    keyFields: ['Survey / Block No', 'Khata No', 'Bhogvatadar', 'Akarni (Assessment)', 'Pot Kharaba', 'Hakka Nondh'],
    standardColumns: [
      { colNo: 'VF-7', title: 'સર્વે નંબર, ક્ષેત્રફળ અને આકારણી (Survey, Area & Tax)', desc: 'Parcel boundary and assessment.' },
      { colNo: 'VF-7 Rights', title: 'ખાતેદારનું નામ અને હક્કો (Khatedar & Rights)', desc: 'New tenure (Nava Sharat) or Old tenure (Juni Sharat).' },
      { colNo: 'VF-12', title: 'પાકની વિગતો (Crop Details)', desc: 'Irrigation method, Kharif/Rabi harvest.' },
      { colNo: 'VF-8A', title: 'ખાતાવહી ખાતું (Khata Consolidation)', desc: 'Combined holdings and total revenue dues.' }
    ]
  },
  'Madhya Pradesh': {
    state: 'Madhya Pradesh',
    formatTitle: 'MP Bhu-Abhilekh Khasra B-1 (खसरा खतौनी प्रपत्र बी-१)',
    formatShort: 'Khasra B-1 (प्रपत्र बी-१)',
    formCode: 'Form B-1 / Prapatra B-1 (प्रपत्र बी-१)',
    vernacularName: 'खसरा पंचसाला व खतौनी (भू-अभिलेख)',
    statutoryAct: 'Madhya Pradesh Land Revenue Code, 1959 (Sec 121)',
    portalName: 'MP Bhulekh (म.प्र. भूलेख)',
    portalUrl: 'mpbhulekh.gov.in',
    badgeBg: 'bg-[#EAF2EB]',
    badgeText: 'text-[#2D4A30]',
    badgeBorder: 'border-[#BCD4C0]',
    description: 'Statutory 12-column Khasra register detailing survey parcel area, soil classification, irrigated source, tenure type, and KCC mortgage liens.',
    keyFields: ['Khasra Number', 'Khata Number', 'Bhoomiswami Name', 'Area in Hectare', 'Sinchit / Asinchit', 'Kisan Credit Card Lien'],
    standardColumns: [
      { colNo: 'Col 1', title: 'खसरा क्रमांक (Khasra No)', desc: 'Cadastral survey plot number.' },
      { colNo: 'Col 2-3', title: 'भूमिस्वामी का नाम व हिस्सा (Owner & Share)', desc: 'Bhoomiswami names and share fractions.' },
      { colNo: 'Col 4-5', title: 'क्षेत्रफल व लगान (Area & Revenue)', desc: 'Metric hectares and annual assessment fee.' },
      { colNo: 'Col 6-8', title: 'सिंचाई का साधन व फसल (Irrigation & Crops)', desc: 'Tube well, canal, or unirrigated.' },
      { colNo: 'Col 9-12', title: 'कैफियत व बैंक बंधक (Mortgage & Orders)', desc: 'Registered bank liens and revenue court orders.' }
    ]
  },
  'Himachal Pradesh': {
    state: 'Himachal Pradesh',
    formatTitle: 'Himachal Himbhoomi Jamabandi (जमाबंदी प्रपत्र २१)',
    formatShort: 'Himbhoomi Jamabandi (Form 21)',
    formCode: 'Form 21 / Prapatra 21 (प्रपत्र २१)',
    vernacularName: 'जमाबंदी (नकल मिसल मियादी)',
    statutoryAct: 'Himachal Pradesh Land Revenue Act, 1954 (Sec 32)',
    portalName: 'Himbhoomi (हिमभूमि - ई-हिमभूमी)',
    portalUrl: 'lrc.hp.nic.in',
    badgeBg: 'bg-[#EAF2EB]',
    badgeText: 'text-[#2D4A30]',
    badgeBorder: 'border-[#BCD4C0]',
    description: 'Hill land record format reflecting terraced hill parcels, orchards (Bagicha), Khewat-Khatoni holdings, and Sec 118 HP Tenancy clearance flags.',
    keyFields: ['Khewat No', 'Khatauni No', 'Khasra No', 'Malkan Names', 'Area in Hectare/Bigha', 'Section 118 Status'],
    standardColumns: [
      { colNo: 'Col 1-2', title: 'खेवट व खतौनी (Khewat & Khatauni)', desc: 'Ownership and tenancy accounts.' },
      { colNo: 'Col 3-4', title: 'मालिक व काश्तकार (Owners & Apple Growers)', desc: 'Registered farmers and co-owners.' },
      { colNo: 'Col 5-7', title: 'खसरा व रकबा (Khasra & Hill Area)', desc: 'Terraced survey parcel and slope rating.' },
      { colNo: 'Col 8-12', title: 'किस्म ज़मीन व कैफियत (Soil Class & Remarks)', desc: 'Bagicha Apple, Barani, or Ghasni (pasture).' }
    ]
  },
  'Uttarakhand': {
    state: 'Uttarakhand',
    formatTitle: 'Uttarakhand Devbhoomi Khatauni ROR (देवभूमि अधिकार अभिलेख)',
    formatShort: 'Devbhoomi Khatauni (Form 45)',
    formCode: 'Form 45 / Prapatra 45 (प्रपत्र ४५)',
    vernacularName: 'खतौनी (देवभूमि ई-राजस्व)',
    statutoryAct: 'Uttarakhand Land Revenue Act, 2001',
    portalName: 'Devbhoomi (देवभूमि पोर्टल)',
    portalUrl: 'bhulekh.uk.gov.in',
    badgeBg: 'bg-[#EAF2EB]',
    badgeText: 'text-[#2D4A30]',
    badgeBorder: 'border-[#BCD4C0]',
    description: 'Garhwal and Kumaon division record of rights tracking both plains agriculture and Himalayan terraced agricultural holdings.',
    keyFields: ['Khata Number', 'Khasra Number', 'Bhumidhar Name', 'Fasli Year', 'Area in Hectares', 'Lagan'],
    standardColumns: [
      { colNo: 'Col 1-3', title: 'खाता संख्या व खातेदार (Khata & Holder)', desc: 'Tenure account and resident details.' },
      { colNo: 'Col 4-6', title: 'खसरा संख्या व क्षेत्रफल (Khasra & Area)', desc: 'Survey parcel and hectare area.' },
      { colNo: 'Col 7-10', title: 'मालगुज़ारी व लगान (Revenue Assessment)', desc: 'Assessed annual statutory dues.' },
      { colNo: 'Col 11-14', title: 'कैफियत व आदेश (Orders & Liens)', desc: 'Mutation endorsements and court attachments.' }
    ]
  },
  'Assam': {
    state: 'Assam',
    formatTitle: 'Assam Dharitree Jamabandi & Chitha (জমা বন্দী আৰু চিঠা)',
    formatShort: 'Dharitree Jamabandi (Form A)',
    formCode: 'Form A / Chitha Register (চিঠা)',
    vernacularName: 'ম্যাদী পট্টা আৰু জমা বন্দী (Record of Rights)',
    statutoryAct: 'Assam Land and Revenue Regulation, 1886',
    portalName: 'Dharitree (ধৰিত্ৰী پੋਰ্টেল)',
    portalUrl: 'landrecords.assam.gov.in',
    badgeBg: 'bg-[#EDF5FD]',
    badgeText: 'text-[#1B4B75]',
    badgeBorder: 'border-[#BBD7F2]',
    description: 'Tea estate, flood-plain (Char), and valley agricultural land registry specifying Dag numbers, Periodic (Myadi) or Annual Patta, and Bigha-Katha-Lessa area.',
    keyFields: ['Dag Number', 'Patta Number', 'Patta Type (Myadi / Eksona)', 'Pattadar Name', 'Area in Bigha-Katha-Lessa', 'Khajana'],
    standardColumns: [
      { colNo: 'Dag', title: 'দাগ নং (Dag Number)', desc: 'Cadastral parcel identifier.' },
      { colNo: 'Patta', title: 'পট্টা নং ও প্ৰকাৰ (Patta No & Type)', desc: 'Periodic Myadi Patta or Annual Eksona Patta.' },
      { colNo: 'Pattadar', title: 'পট্টাদাৰৰ নাম (Pattadar Name)', desc: 'Registered landholder names and shares.' },
      { colNo: 'Area', title: 'মাটিৰ পৰিমাণ (Area in B-K-L)', desc: 'Bigha (14,400 sq.ft), Katha, and Lessa measurements.' },
      { colNo: 'Khajana', title: 'ৰাজহ (Revenue Assessment)', desc: 'Assessed statutory land revenue.' }
    ]
  },
  'West Bengal': {
    state: 'West Bengal',
    formatTitle: 'WB Banglarbhumi Khatian RoR (খতিয়ান ও পর্চা)',
    formatShort: 'Banglarbhumi Khatian (Form 1)',
    formCode: 'Form 1 / ROR Parja (ফরম ১ - খতিয়ান)',
    vernacularName: 'খতিয়ান ও মৌজা পর্চা (Record of Rights)',
    statutoryAct: 'West Bengal Land Reforms Act, 1955 (Sec 50)',
    portalName: 'Banglarbhumi (বাংলারভূমি)',
    portalUrl: 'banglarbhumi.gov.in',
    badgeBg: 'bg-[#EDF5FD]',
    badgeText: 'text-[#1B4B75]',
    badgeBorder: 'border-[#BBD7F2]',
    description: 'Record of Rights ledger listing Khatian number, Plot/Dag number, Rayat class (Khatian holder), land classification (Sali, Danga, Baid, Bastu), and ceiling limits.',
    keyFields: ['Khatian Number', 'Plot / Dag Number', 'Rayat Name', 'Classification (Shreni)', 'Area in Acre/Dec', 'Khajana'],
    standardColumns: [
      { colNo: '1', title: 'খতিয়ান নং (Khatian Number)', desc: 'Unique record of rights registry ledger.' },
      { colNo: '2', title: 'রায়তের নাম ও পিতা (Rayat Name & Father)', desc: 'Registered tenant farmer or landholder.' },
      { colNo: '3', title: 'দাগ নং (Dag / Plot Number)', desc: 'Cadastral survey plot reference.' },
      { colNo: '4', title: 'জমির শ্রেণী (Land Classification)', desc: 'Sali (agricultural), Danga (highland), or Bastu (homestead).' },
      { colNo: '5', title: 'অংশ ও জমির পরিমাণ (Share & Extent in Decimals)', desc: 'Share fraction and area in acres and decimals.' }
    ]
  },
  'Bihar': {
    state: 'Bihar',
    formatTitle: 'Bihar Bhumi Khatian / Panji-II (खतियान एवं पंजी-२)',
    formatShort: 'Bihar Khatian (Panji-II)',
    formCode: 'Panji-II / Khesra Register (पंजी-२)',
    vernacularName: 'खतियान ও दाखिल-खारिज जमाबंदी (पंजी-२)',
    statutoryAct: 'Bihar Land Reforms Act, 1950 & Bihar Tenancy Act, 1885',
    portalName: 'Bihar Bhumi (बिहार भूमि)',
    portalUrl: 'biharbhumi.bihar.gov.in',
    badgeBg: 'bg-[#EAF2EB]',
    badgeText: 'text-[#2D4A30]',
    badgeBorder: 'border-[#BCD4C0]',
    description: 'Cadastral survey Khatian recording Jamabandi serial, Khesra numbers, Khata numbers, Raiyat rights, land cess, and boundary Chauhaddi.',
    keyFields: ['Khata Number', 'Khesra Number', 'Jamabandi Number', 'Raiyat Name', 'Lagan & Cess', 'Chauhaddi (Boundaries)'],
    standardColumns: [
      { colNo: 'Col 1', title: 'खाता व खेसरा नं (Khata & Khesra No)', desc: 'Account and cadastral parcel index.' },
      { colNo: 'Col 2', title: 'रैयत का नाम व वल्दियत (Raiyat & Parentage)', desc: 'Owner name and legal heir status.' },
      { colNo: 'Col 3', title: 'रकबा (Area in Bigha-Katha-Dhur)', desc: 'Declared and normalized metric extent.' },
      { colNo: 'Col 4', title: 'लगान व उपकर (Lagan & Cess)', desc: 'Annual statutory cess assessment.' },
      { colNo: 'Col 5', title: 'चौहद्दी (North/South/East/West Boundaries)', desc: 'Physical abutting land parcel boundaries.' }
    ]
  },
  'Odisha': {
    state: 'Odisha',
    formatTitle: 'Bhulekh Odisha RoR Khatian (ସ୍ୱତ୍ୱଲିପି ଖତିଆନ)',
    formatShort: 'Bhulekh Odisha RoR (Form 3)',
    formCode: 'Khatian Form 3 (ଫର୍ମ ୩ - ସ୍ୱତ୍ୱଲିପି)',
    vernacularName: 'ସ୍ୱତ୍ୱଲିପି (ରେକର୍ଡ ଅଫ୍ ରାଇଟ୍ସ)',
    statutoryAct: 'Odisha Survey & Settlement Act, 1958',
    portalName: 'Bhulekh Odisha (ଓଡ଼ିଶା ଭୂଲେଖ)',
    portalUrl: 'bhulekh.ori.nic.in',
    badgeBg: 'bg-[#F2EDFB]',
    badgeText: 'text-[#4A2D78]',
    badgeBorder: 'border-[#D2C5E8]',
    description: '3-tier RoR statement documenting Rayat names, Khata numbers, Plot numbers, Kissam (soil/irrigation class: Sarada, Biali, Pala), and cess assessment.',
    keyFields: ['Khata Number', 'Plot Number', 'Rayat Name', 'Kissam (Soil Class)', 'Area in Hectares/Acres', 'Rent & Cess'],
    standardColumns: [
      { colNo: 'Sec 1', title: 'ଖାତା ନଂ ଓ ରୟତ ନାମ (Khata No & Rayat)', desc: 'Registry ledger and cultivator.' },
      { colNo: 'Sec 2', title: 'ପ୍ଲଟ୍ ନଂ (Plot / Khasra Number)', desc: 'Cadastral parcel identifier.' },
      { colNo: 'Sec 3', title: 'କିସମ (Kissam / Soil Class)', desc: 'Sarada (paddy), Biali (autumn), or Gochar.' },
      { colNo: 'Sec 4', title: 'ରକବା (Extent in Hectares)', desc: 'Metric hectares and local unit conversion.' },
      { colNo: 'Sec 5', title: 'ଖଜଣା ଓ ସେସ୍ (Rent & Cess)', desc: 'Total statutory revenue liability.' }
    ]
  },
  'Andhra Pradesh': {
    state: 'Andhra Pradesh',
    formatTitle: 'AP Meebhoomi 1B Adangal (1B అడంగల్ / పహానీ)',
    formatShort: 'Meebhoomi 1B (Adangal)',
    formCode: 'Form 1B / Adangal Register (ఫారం 1B)',
    vernacularName: '1B అడంగల్ మరియు పట్టాదారు పాస్ పుస్తకం',
    statutoryAct: 'AP Rights in Land and Pattadar Pass Books Act, 1971',
    portalName: 'Meebhoomi (మీభూమి)',
    portalUrl: 'meebhoomi.ap.gov.in',
    badgeBg: 'bg-[#EDF5FD]',
    badgeText: 'text-[#1B4B75]',
    badgeBorder: 'border-[#BBD7F2]',
    description: 'Comprehensive digital parcel extract detailing Survey Number, Sub-division, Pattadar (owner), Anubhavadar (possessor), Magani (wet) or Metta (dry), and water cess.',
    keyFields: ['Survey Number', 'Khata Number', 'Pattadar Name', 'Anubhavadar Name', 'Extent in Acres-Cents', 'Teerva (Revenue)'],
    standardColumns: [
      { colNo: 'Col 1', title: 'సర్వే నెం & సబ్-డివిజన్ (Survey & Sub-division)', desc: 'Cadastral survey parcel number.' },
      { colNo: 'Col 2', title: 'ఖాతా నంబర్ (Khata Number)', desc: 'Pattadar passbook account identity.' },
      { colNo: 'Col 3', title: 'పట్టాదారు & అనుభవదారు (Pattadar & Possessor)', desc: 'Title owner and actual tiller.' },
      { colNo: 'Col 4', title: 'భూమి స్వభావం (Magani / Metta Class)', desc: 'Wet canal, tankfed, or rainfed.' },
      { colNo: 'Col 5', title: 'విస్తీర్ణం & తీరువ (Extent & Teerva)', desc: 'Area in Acres-Cents and assessed water tax.' }
    ]
  },
  'Telangana': {
    state: 'Telangana',
    formatTitle: 'Telangana Dharani Pahani (ధరణి పహానీ / ROR-1B)',
    formatShort: 'Dharani Pahani (ROR-1B)',
    formCode: 'ROR-1B & Pahani (ధరణి పాస్ బుక్)',
    vernacularName: 'ధరణి సమగ్ర భూ రికార్డుల నిర్వహణ పహానీ',
    statutoryAct: 'Telangana Rights in Land and Pattadar Pass Books Act, 2020',
    portalName: 'Dharani (ధరణి పోర్టల్)',
    portalUrl: 'dharani.telangana.gov.in',
    badgeBg: 'bg-[#EDF5FD]',
    badgeText: 'text-[#1B4B75]',
    badgeBorder: 'border-[#BBD7F2]',
    description: 'Integrated land management portal record uniting passbook account, mutation history, market valuation, and instant digital registration.',
    keyFields: ['Survey / Hissa No', 'PPB Khata No', 'Pattadar Name', 'Land Nature (Ayacut/Dry)', 'Area in Acres-Guntas', 'Shisthu'],
    standardColumns: [
      { colNo: '1', title: 'సర్వే నెంబర్ & హిస్సా (Survey & Hissa)', desc: 'Cadastral parcel identifier.' },
      { colNo: '2', title: 'పట్టాదారు పాస్ బుక్ నం (Pattadar Passbook No)', desc: 'Biometric passbook account serial.' },
      { colNo: '3', title: 'భూమి స్వభావం (Tari / Mettā Land Nature)', desc: 'Wet well, canal, or dry chalka soil.' },
      { colNo: '4', title: 'విస్తీర్ణం (Extent in Acres-Guntas)', desc: 'Declared parcel extent.' },
      { colNo: '5', title: 'ధరణి రిమార్కులు (Dharani Encumbrance Status)', desc: 'Court stays, prohibited property (22A), or clear.' }
    ]
  },
  'Kerala': {
    state: 'Kerala',
    formatTitle: 'Kerala E-Rekha Thandaper Register (താണ്ഡപ്പേർ രജിസ്റ്റർ)',
    formatShort: 'E-Rekha Thandaper (Form 5)',
    formCode: 'Form 5 / Thandaper Register (ഫോറം 5)',
    vernacularName: 'താണ്ഡപ്പേർ കണക്കും പഹണിയും (Record of Rights)',
    statutoryAct: 'Kerala Land Relinquishment / Revenue Act',
    portalName: 'E-Rekha Kerala (ഇ-രേഖ കേരളം)',
    portalUrl: 'erekha.kerala.gov.in',
    badgeBg: 'bg-[#EAF2EB]',
    badgeText: 'text-[#2D4A30]',
    badgeBorder: 'border-[#BCD4C0]',
    description: 'Unique revenue account number (Thandaper) encompassing all parcels held by a landholder within a village, classifying Purayidam (garden) and Nilam (paddy).',
    keyFields: ['Survey Number', 'Resurvey Number', 'Thandaper Number', 'Pattadar Name', 'Purayidam / Nilam', 'Karam (Tax)'],
    standardColumns: [
      { colNo: 'Sec 1', title: 'സർവേ & റീസർവേ നമ്പർ (Survey & Resurvey)', desc: 'Cadastral survey and digital resurvey index.' },
      { colNo: 'Sec 2', title: 'താണ്ഡപ്പേർ നമ്പർ (Thandaper Account)', desc: 'Tax account number.' },
      { colNo: 'Sec 3', title: 'ഭూവുടമയുടെ പേര് (Pattadar & Legal Heirs)', desc: 'Registered landholders and tenure.' },
      { colNo: 'Sec 4', title: 'ഭൂതരം (Purayidam / Nilam Classification)', desc: 'Coconut garden vs wetland paddy.' },
      { colNo: 'Sec 5', title: 'വിസ്തീർണം & കരം (Extent & Land Tax)', desc: 'Area in Hectares-Ares and annual tax fee.' }
    ]
  },
  'Jharkhand': {
    state: 'Jharkhand',
    formatTitle: 'Jharkhand Jharbhoomi Khatian (खतियान एवं पंजी-२)',
    formatShort: 'Jharbhoomi Khatian (Panji-II)',
    formCode: 'Panji-II / Khesra Register (पंजी-२)',
    vernacularName: 'झारभूमि खतियान व दाखिल-खारिज पंजी',
    statutoryAct: 'Chota Nagpur Tenancy Act, 1908 (CNT) / SPT Act, 1949',
    portalName: 'Jharbhoomi (झारभूमि)',
    portalUrl: 'jharbhoomi.jharkhand.gov.in',
    badgeBg: 'bg-[#EAF2EB]',
    badgeText: 'text-[#2D4A30]',
    badgeBorder: 'border-[#BCD4C0]',
    description: 'Tribal tenancy and general land record system recording Khata, Khesra, Rayat class, CNT Act Section 46 restrictions, and annual Lagan.',
    keyFields: ['Khata Number', 'Khesra Number', 'Raiyat Name', 'CNT/SPT Act Flag', 'Area in Acres/Decimals', 'Lagan'],
    standardColumns: [
      { colNo: '1', title: 'खाता व खेसरा संख्या (Khata & Khesra)', desc: 'Registry account and parcel.' },
      { colNo: '2', title: 'रैयत का नाम व जाति (Raiyat & Caste)', desc: 'Tenant name and CNT protection classification.' },
      { colNo: '3', title: 'भूमि श्रेणी (Don / Tanr Land Class)', desc: 'Don (terrace wet) vs Tanr (upland).' },
      { colNo: '4', title: 'रकबा (Area in Acres/Decimals)', desc: 'Surveyed parcel dimensions.' },
      { colNo: '5', title: 'कैफियत व लगान (Lagan & CNT Status)', desc: 'Tribal protection status and revenue assessment.' }
    ]
  },
  'Chhattisgarh': {
    state: 'Chhattisgarh',
    formatTitle: 'Chhattisgarh Bhuiyan B-1 Khasra (भुइयां खसरा बी-१)',
    formatShort: 'Bhuiyan Khasra (Form B-1)',
    formCode: 'Form B-1 / Prapatra B-1 (प्रपत्र बी-१)',
    vernacularName: 'भुइयां खसरा पंचसाला व खतौनी (बी-१)',
    statutoryAct: 'Chhattisgarh Land Revenue Code, 1959',
    portalName: 'Bhuiyan (भुइयां पोर्टल)',
    portalUrl: 'bhuiyan.cg.nic.in',
    badgeBg: 'bg-[#EAF2EB]',
    badgeText: 'text-[#2D4A30]',
    badgeBorder: 'border-[#BCD4C0]',
    description: 'Paddy belt digital land record documenting Khasra numbers, Bhoomiswami tenure, canal irrigation assessment, and KCC loan charges.',
    keyFields: ['Khasra Number', 'Khata Number', 'Bhoomiswami Name', 'Area in Hectares', 'Sinchit Area', 'Lagan'],
    standardColumns: [
      { colNo: '1', title: 'खसरा क्रमांक (Khasra Number)', desc: 'Parcel survey index.' },
      { colNo: '2', title: 'भूमिस्वामी का नाम (Bhoomiswami)', desc: 'Registered owner and co-sharers.' },
      { colNo: '3', title: 'रकबा व लगान (Area & Tax)', desc: 'Metric hectares and assessed revenue.' },
      { colNo: '4', title: 'सिंचित/असिंचित रकबा (Irrigated Area)', desc: 'Mahanadi/canal or tube-well irrigation.' },
      { colNo: '5', title: 'कैफियत (Mortgages & Encumbrances)', desc: 'Registered bank liens and revenue annotations.' }
    ]
  }
};

export function getStateLandFormat(stateName?: string, documentType?: string): StateLandFormatInfo {
  if (!stateName) {
    return STATE_LAND_FORMATS['Maharashtra'];
  }
  const directMatch = STATE_LAND_FORMATS[stateName];
  if (directMatch) return directMatch;

  // Search by partial state name match
  const stateLower = stateName.toLowerCase();
  for (const [key, format] of Object.entries(STATE_LAND_FORMATS)) {
    if (stateLower.includes(key.toLowerCase()) || key.toLowerCase().includes(stateLower)) {
      return format;
    }
  }

  // Fallback by documentType
  if (documentType === '7_12_EXTRACT' || documentType === 'SEVEN_TWELVE') return STATE_LAND_FORMATS['Maharashtra'];
  if (documentType === 'BHOOMI_RTC') return STATE_LAND_FORMATS['Karnataka'];
  if (documentType === 'JAMABANDI') return STATE_LAND_FORMATS['Punjab'];
  if (documentType === 'PATTA_CHITTA') return STATE_LAND_FORMATS['Tamil Nadu'];
  if (documentType === 'KHASRA_KHATAUNI') return STATE_LAND_FORMATS['Uttar Pradesh'];

  return STATE_LAND_FORMATS['Maharashtra'];
}
