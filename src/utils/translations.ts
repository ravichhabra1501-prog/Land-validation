import { IndicLanguage } from '../types';

export const LANGUAGE_STORAGE_KEY = 'bhumi_dilrmp_selected_language';

export interface TranslationDictionary {
  // Portal branding
  appName: string;
  appSubtitle: string;
  programName: string;
  versionBadge: string;
  ministryName: string;
  authorizedAccessDesc: string;

  // Nav Tabs
  tabDashboard: string;
  tabIngestion: string;
  tabVerification: string;
  tabRules: string;
  tabGis: string;
  tabCitizenFeedback: string;
  tabCitizenLandMap: string;
  tabCitizenConsultation: string;

  // Sub-header Ribbon
  sessionActive: string;
  totalRecords: string;
  pendingReview: string;
  logout: string;
  logoutConfirmTitle: string;
  logoutConfirmDesc: string;
  cancel: string;
  confirmLogout: string;

  // Roles & Badges
  roleRevenueOfficer: string;
  roleVerificationSpecialist: string;
  roleSettlementOfficer: string;
  roleCitizenViewer: string;
  currentRoleLabel: string;

  // Login Page
  officerAuthHeader: string;
  officerIdLabel: string;
  officerIdPlaceholder: string;
  passwordLabel: string;
  roleClassificationLabel: string;
  securityVerification: string;
  refreshCaptcha: string;
  roleGuidanceNotice: string;
  authenticateBtn: string;
  verifyingBtn: string;
  statutoryCompliance: string;
  helpdeskNotice: string;

  // Common UI words
  khasraNo: string;
  village: string;
  tehsil: string;
  district: string;
  state: string;
  ownerName: string;
  totalArea: string;
  status: string;
  statusVerified: string;
  statusNeedsReview: string;
  statusProcessing: string;
  searchPlaceholder: string;
}

export const TRANSLATIONS: Record<IndicLanguage, TranslationDictionary> = {
  english: {
    appName: 'BhumiRecord AI',
    appSubtitle: 'Intelligent Land Record Digitization & Validation Portal',
    programName: 'Digital India Land Records Modernization Programme (DILRMP)',
    versionBadge: 'DILRMP v3.8',
    ministryName: 'Ministry of Rural Development, Govt. of India',
    authorizedAccessDesc: 'Statutory Officer & Public Access Portal • Ministry of Rural Development, Govt. of India',

    tabDashboard: 'Modernization Dashboard',
    tabIngestion: 'Ingestion & OCR',
    tabVerification: 'Verification Station (HITL)',
    tabRules: 'Validation Engine',
    tabGis: 'Cadastral GIS (भू-नक्शा)',
    tabCitizenFeedback: 'Citizen Inquiries & Grievances',
    tabCitizenLandMap: 'Cadastral Land Map (भू-नक्शा)',
    tabCitizenConsultation: 'Feedback & Schedule GIS Officer',

    sessionActive: 'High-Security Session Active',
    totalRecords: 'Total Records',
    pendingReview: 'Pending Review',
    logout: 'Logout',
    logoutConfirmTitle: 'Confirm Portal Exit',
    logoutConfirmDesc: 'You are about to securely log out of your session. All unsaved changes will remain in local draft.',
    cancel: 'Cancel',
    confirmLogout: 'Yes, Sign Out',

    roleRevenueOfficer: 'Tehsildar / SDM (Sanction)',
    roleVerificationSpecialist: 'Patwari / Lekhpal (Verification)',
    roleSettlementOfficer: 'Settlement Officer (Cadastral GIS)',
    roleCitizenViewer: 'Citizen Landowner (Public Portal)',
    currentRoleLabel: 'Active Role',

    officerAuthHeader: 'Officer ID & Password Authentication',
    officerIdLabel: 'Government Officer ID / NIC Email',
    officerIdPlaceholder: 'e.g. alok.srivastava@nic.in',
    passwordLabel: 'Password / Secret Passkey',
    roleClassificationLabel: 'Role Classification',
    securityVerification: 'Security Verification',
    refreshCaptcha: 'Refresh',
    roleGuidanceNotice: 'Selecting a role will configure corresponding jurisdictional rights and verification tools.',
    authenticateBtn: 'Authenticate & Enter Portal',
    verifyingBtn: 'Verifying Credentials & Terminal...',
    statutoryCompliance: 'Statutory Compliance: Information Technology Act 2000 & DILRMP Guidelines',
    helpdeskNotice: 'For technical assistance, contact Revenue Administration Helpdesk at helpdesk-dilrmp@nic.in',

    khasraNo: 'Khasra / Gat No.',
    village: 'Village',
    tehsil: 'Tehsil',
    district: 'District',
    state: 'State',
    ownerName: 'Primary Landowner',
    totalArea: 'Total Area',
    status: 'Status',
    statusVerified: 'Verified & Sanctioned',
    statusNeedsReview: 'Needs Review',
    statusProcessing: 'Processing OCR',
    searchPlaceholder: 'Search by Khasra, Gat, Village, or Owner...'
  },

  hindi: {
    appName: 'भूमि-अभिलेख एआई (BhumiRecord AI)',
    appSubtitle: 'बुद्धिमान भूमि अभिलेख डिजिटलीकरण एवं सत्यापन पोर्टल',
    programName: 'डिजिटल इंडिया भूमि अभिलेख आधुनिकीकरण कार्यक्रम (DILRMP)',
    versionBadge: 'डीआईएलआरएमपी 3.8',
    ministryName: 'ग्रामीण विकास मंत्रालय, भारत सरकार',
    authorizedAccessDesc: 'संवैधानिक अधिकारी एवं सार्वजनिक भूमि पोर्टल • ग्रामीण विकास मंत्रालय, भारत सरकार',

    tabDashboard: 'आधुनिकीकरण डैशबोर्ड',
    tabIngestion: 'दस्तावेज़ स्कैन व ओसीआर (OCR)',
    tabVerification: 'सत्यापन केंद्र (HITL)',
    tabRules: 'सत्यापन नियम इंजन',
    tabGis: 'भू-नक्शा (Cadastral GIS)',
    tabCitizenFeedback: 'नागरिक पूछताछ व शिकायतें',
    tabCitizenLandMap: 'आपकी भूमि व भू-नक्शा',
    tabCitizenConsultation: 'प्रतिक्रिया व अधिकारी परामर्श',

    sessionActive: 'उच्च-सुरक्षा सत्र सक्रिय',
    totalRecords: 'कुल अभिलेख',
    pendingReview: 'सत्यापन लंबित',
    logout: 'लॉगआउट',
    logoutConfirmTitle: 'पोर्टल से बाहर निकलने की पुष्टि करें',
    logoutConfirmDesc: 'आप अपने सुरक्षित सत्र से लॉगआउट करने जा रहे हैं। क्या आप निश्चित हैं?',
    cancel: 'रद्द करें',
    confirmLogout: 'हाँ, लॉगआउट करें',

    roleRevenueOfficer: 'तहसीलदार / उपजिलाधिकारी (एसडीएम)',
    roleVerificationSpecialist: 'पटवारी / लेखपाल (सत्यापनकर्ता)',
    roleSettlementOfficer: 'बंदोबस्त व भू-नक्शा अधिकारी',
    roleCitizenViewer: 'नागरिक खातेदार (सार्वजनिक पोर्टल)',
    currentRoleLabel: 'वर्तमान पद',

    officerAuthHeader: 'अधिकारी आईडी एवं पासवर्ड प्रमाणीकरण',
    officerIdLabel: 'शासकीय अधिकारी आईडी / एनआईसी ईमेल',
    officerIdPlaceholder: 'उदा. alok.srivastava@nic.in',
    passwordLabel: 'पासवर्ड / गोपनीय पासकी',
    roleClassificationLabel: 'प्रशासनिक पद वर्गीकरण',
    securityVerification: 'सुरक्षा कैप्चा सत्यापन',
    refreshCaptcha: 'नया कैप्चा',
    roleGuidanceNotice: 'पद चुनने पर संबंधित अधिकार क्षेत्र व सत्यापन उपकरण स्वतः सक्रिय हो जाएंगे।',
    authenticateBtn: 'प्रमाणित करें व पोर्टल में प्रवेश करें',
    verifyingBtn: 'प्रमाणपत्र व टर्मिनल सत्यापन जारी...',
    statutoryCompliance: 'वैधानिक अनुपालन: सूचना प्रौद्योगिकी अधिनियम 2000 व डीआईएलआरएमपी दिशा-निर्देश',
    helpdeskNotice: 'तकनीकी सहायता हेतु राजस्व प्रशासन हेल्पडेस्क helpdesk-dilrmp@nic.in पर संपर्क करें',

    khasraNo: 'खसरा / गाटा संख्या',
    village: 'ग्राम / मौज़ा',
    tehsil: 'तहसील',
    district: 'जनपद / ज़िला',
    state: 'राज्य',
    ownerName: 'मुख्य खातेदार / भूस्वामी',
    totalArea: 'कुल क्षेत्रफल',
    status: 'स्थिति',
    statusVerified: 'सत्यापित व स्वीकृत',
    statusNeedsReview: 'पुनरावलोकन आवश्यक',
    statusProcessing: 'ओसीआर प्रक्रियाधीन',
    searchPlaceholder: 'खसरा, गाटा, ग्राम या खातेदार नाम से खोजें...'
  },

  marathi: {
    appName: 'भूमि-अभिलेख एआय (BhumiRecord AI)',
    appSubtitle: 'बुद्धिमत्तापूर्ण जमीन महसूल अभिलेख संगणकीकरण व पडताळणी पोर्टल',
    programName: 'डिजिटल इंडिया भूमी अभिलेख आधुनिकीकरण कार्यक्रम (DILRMP)',
    versionBadge: 'डीआयएलआरएमपी ३.८',
    ministryName: 'ग्रामीण विकास मंत्रालय, भारत सरकार',
    authorizedAccessDesc: 'वैधानिक महसूल अधिकारी व नागरिक जमीन पोर्टल • भारत सरकार',

    tabDashboard: 'आधुनिकीकरण डॅशबोर्ड',
    tabIngestion: 'दस्तऐवज स्कॅन व ओसीआर',
    tabVerification: 'पडताळणी केंद्र (HITL)',
    tabRules: 'नियम व पडताळणी इंजिन',
    tabGis: 'भू-नकाशा व गट नकाशा (GIS)',
    tabCitizenFeedback: 'नागरिक चौकशी व तक्रारी',
    tabCitizenLandMap: 'आपली जमीन व भू-नकाशा (७/१२)',
    tabCitizenConsultation: 'अभिप्राय व अधिकारी सल्लामसलत',

    sessionActive: 'उच्च-सुरक्षा सत्र कार्यरत',
    totalRecords: 'एकूण सातबारा / नोंदी',
    pendingReview: 'पडताळणी प्रलंबित',
    logout: 'लॉगआउट',
    logoutConfirmTitle: 'पोर्टलमधून बाहेर पडण्याची खात्री करा',
    logoutConfirmDesc: 'तुम्ही सुरक्षित सत्रातून बाहेर पडत आहात. तुमचे काम सुरक्षित ठेवले जाईल.',
    cancel: 'रद्द करा',
    confirmLogout: 'होय, बाहेर पडा',

    roleRevenueOfficer: 'तहसीलदार / उपविभागीय अधिकारी (SDM)',
    roleVerificationSpecialist: 'तलाठी / मंडळ अधिकारी (पडताळणी)',
    roleSettlementOfficer: 'जमाबंदी व भूमी अभिलेख अधिकारी',
    roleCitizenViewer: 'नागरिक खातेदार (सार्वजनिक पोर्टल)',
    currentRoleLabel: 'सध्याचे पद',

    officerAuthHeader: 'अधिकारी ओळख व गुप्त पासवर्ड पडताळणी',
    officerIdLabel: 'शासकीय अधिकारी आयडी / NIC ईमेल',
    officerIdPlaceholder: 'उदा. alok.srivastava@nic.in',
    passwordLabel: 'पासवर्ड / सिक्रेट पासकी',
    roleClassificationLabel: 'महसूल पद वर्गीकरण',
    securityVerification: 'सुरक्षा कॅप्चा पडताळणी',
    refreshCaptcha: 'पुन्हा लोड करा',
    roleGuidanceNotice: 'पद निवडल्यानंतर संबंधित अधिकारक्षेत्र आणि पडताळणी साधने उपलब्ध होतील.',
    authenticateBtn: 'प्रमाणित करा व पोर्टल उघडा',
    verifyingBtn: 'ओळख व टर्मिनल पडताळणी सुरू आहे...',
    statutoryCompliance: 'माहिती तंत्रज्ञान कायदा २००० व DILRMP नियमांनुसार संरक्षित',
    helpdeskNotice: 'तांत्रिक मदतीसाठी महसूल सहाय्यता कक्ष helpdesk-dilrmp@nic.in शी संपर्क साधा',

    khasraNo: 'गट क्रमांक / सर्व्हे क्र.',
    village: 'गाव / मौजे',
    tehsil: 'तालुका',
    district: 'जिल्हा',
    state: 'राज्य',
    ownerName: 'प्रमुख खातेदार / भूधारक',
    totalArea: 'एकूण क्षेत्रफळ (हेक्टर)',
    status: 'स्थिती',
    statusVerified: 'प्रमाणित व मंजूर',
    statusNeedsReview: 'तपासणी आवश्यक',
    statusProcessing: 'स्कॅनिंग सुरू आहे',
    searchPlaceholder: 'गट नंबर, गाव किंवा खातेदाराच्या नावाने शोधा...'
  },

  punjabi: {
    appName: 'ਭੂਮੀ-ਰਿਕਾਰਡ ਏਆਈ (BhumiRecord AI)',
    appSubtitle: 'ਜ਼ਮੀਨੀ ਰਿਕਾਰਡ ਡਿਜੀਟਾਈਜ਼ੇਸ਼ਨ ਅਤੇ ਤਸਦੀਕ ਪੋਰਟਲ',
    programName: 'ਡਿਜੀਟਲ ਇੰਡੀਆ ਲੈਂਡ ਰਿਕਾਰਡਜ਼ ਆਧੁਨਿਕੀਕਰਨ ਪ੍ਰੋਗਰਾਮ (DILRMP)',
    versionBadge: 'DILRMP v3.8',
    ministryName: 'ਪੇਂਡੂ ਵਿਕਾਸ ਮੰਤਰਾਲਾ, ਭਾਰਤ ਸਰਕਾਰ',
    authorizedAccessDesc: 'ਅਧਿਕਾਰਤ ਮਾਲ ਅਧਿਕਾਰੀ ਅਤੇ ਜਨਤਕ ਜ਼ਮੀਨ ਪੋਰਟਲ • ਭਾਰਤ ਸਰਕਾਰ',

    tabDashboard: 'ਆਧੁਨਿਕੀਕਰਨ ਡੈਸ਼ਬੋਰਡ',
    tabIngestion: 'ਦਸਤਾਵੇਜ਼ ਸਕੈਨ ਤੇ ਓਸੀਆਰ (OCR)',
    tabVerification: 'ਪੜਤਾਲ ਕੇਂਦਰ (HITL)',
    tabRules: 'ਤਸਦੀਕ ਨਿਯਮ ਇੰਜਣ',
    tabGis: 'ਭੂ-ਨਕਸ਼ਾ (ਕੈਡਾਸਟਰਲ ਜੀਆਈਐਸ)',
    tabCitizenFeedback: 'ਨਾਗਰਿਕ ਪੁੱਛਗਿੱਛ ਅਤੇ ਸ਼ਿਕਾਇਤਾਂ',
    tabCitizenLandMap: 'ਤੁਹਾਡੀ ਜ਼ਮੀਨ ਤੇ ਭੂ-ਨਕਸ਼ਾ (ਜਮ੍ਹਾਬੰਦੀ)',
    tabCitizenConsultation: 'ਰਾਏ ਅਤੇ ਅਧਿਕਾਰੀ ਸਲਾਹ',

    sessionActive: 'ਸੁਰੱਖਿਅਤ ਸੈਸ਼ਨ ਚੱਲ ਰਿਹਾ ਹੈ',
    totalRecords: 'ਕੁੱਲ ਰਿਕਾਰਡ',
    pendingReview: 'ਪੜਤਾਲ ਬਕਾਇਆ',
    logout: 'ਲਾਗਆਉਟ',
    logoutConfirmTitle: 'ਲਾਗਆਉਟ ਦੀ ਪੁਸ਼ਟੀ ਕਰੋ',
    logoutConfirmDesc: 'ਤੁਸੀਂ ਪੋਰਟਲ ਤੋਂ ਲਾਗਆਉਟ ਕਰਨ ਜਾ ਰਹੇ ਹੋ।',
    cancel: 'ਰੱਦ ਕਰੋ',
    confirmLogout: 'ਹਾਂ, ਬਾਹਰ ਨਿਕਲੋ',

    roleRevenueOfficer: 'ਤਹਿਸੀਲਦਾਰ / ਐਸਡੀਐਮ (SDM)',
    roleVerificationSpecialist: 'ਪਟਵਾਰੀ / ਕਾਨੂੰਨਗੋ (ਪੜਤਾਲਕਾਰ)',
    roleSettlementOfficer: 'ਬੰਦੋਬਸਤ ਅਧਿਕਾਰੀ (ਜੀਆਈਐਸ)',
    roleCitizenViewer: 'ਨਾਗਰਿਕ ਖਾਤੇਦਾਰ (ਲੋਕ ਪੋਰਟਲ)',
    currentRoleLabel: 'ਮੌਜੂਦਾ ਅਹੁਦਾ',

    officerAuthHeader: 'ਅਧਿਕਾਰੀ ਆਈਡੀ ਅਤੇ ਪਾਸਵਰਡ ਤਸਦੀਕ',
    officerIdLabel: 'ਸਰਕਾਰੀ ਅਧਿਕਾਰੀ ਆਈਡੀ / NIC ਈਮੇਲ',
    officerIdPlaceholder: 'ਜਿਵੇਂ alok.srivastava@nic.in',
    passwordLabel: 'ਪਾਸਵਰਡ / ਗੁਪਤ ਪਾਸਕੀ',
    roleClassificationLabel: 'ਮਾਲ ਅਹੁਦਾ ਚੋਣ',
    securityVerification: 'ਸੁਰੱਖਿਆ ਕੈਪਚਾ ਪੜਤਾਲ',
    refreshCaptcha: 'ਨਵਾਂ ਕੈਪਚਾ',
    roleGuidanceNotice: 'ਅਹੁਦਾ ਚੁਣਨ ਨਾਲ ਸੰਬੰਧਿਤ ਅਧਿਕਾਰ ਖੇਤਰ ਅਤੇ ਟੂਲ ਉਪਲਬਧ ਹੋਣਗੇ।',
    authenticateBtn: 'ਤਸਦੀਕ ਕਰੋ ਅਤੇ ਦਾਖਲ ਹੋਵੋ',
    verifyingBtn: 'ਪੜਤਾਲ ਜਾਰੀ ਹੈ...',
    statutoryCompliance: 'ਸੂਚਨਾ ਤਕਨਾਲੋਜੀ ਐਕਟ 2000 ਅਤੇ DILRMP ਦਿਸ਼ਾ-ਨਿਰਦੇਸ਼ਾਂ ਅਧੀਨ ਸੁਰੱਖਿਅਤ',
    helpdeskNotice: 'ਤਕਨੀਕੀ ਮਦਦ ਲਈ helpdesk-dilrmp@nic.in ਤੇ ਸੰਪਰਕ ਕਰੋ',

    khasraNo: 'ਖਸਰਾ / ਮੁਰੱਬਾ ਨੰਬਰ',
    village: 'ਪਿੰਡ / ਮੌਜ਼ਾ',
    tehsil: 'ਤਹਿਸੀਲ',
    district: 'ਜ਼ਿਲ੍ਹਾ',
    state: 'ਰਾਜ',
    ownerName: 'ਮੁੱਖ ਜ਼ਮੀਨ ਮਾਲਕ / ਖਾਤੇਦਾਰ',
    totalArea: 'ਕੁੱਲ ਰਕਬਾ (ਹੈਕਟੇਅਰ)',
    status: 'ਸਥਿਤੀ',
    statusVerified: 'ਤਸਦੀਕਸ਼ੁਦਾ ਅਤੇ ਮਨਜ਼ੂਰ',
    statusNeedsReview: 'ਮੁੜ-ਜਾਂਚ ਲੋੜੀਂਦੀ',
    statusProcessing: 'ਓਸੀਆਰ ਪ੍ਰਕਿਰਿਆ ਜਾਰੀ',
    searchPlaceholder: 'ਖਸਰਾ, ਪਿੰਡ ਜਾਂ ਮਾਲਕ ਦੇ ਨਾਮ ਨਾਲ ਖੋਜੋ...'
  },

  gujarati: {
    appName: 'ભૂમિ-રેકોર્ડ એઆઈ (BhumiRecord AI)',
    appSubtitle: 'બુદ્ધિશાળી જમીન દસ્તાવેજ ડિજિટાઈઝેશન અને ચકાસણી પોર્ટલ',
    programName: 'ડિજિટલ ઇન્ડિયા લેન્ડ રેકોર્ડ્સ આધુનિકીકરણ કાર્યક્રમ (DILRMP)',
    versionBadge: 'DILRMP v3.8',
    ministryName: 'ગ્રામીણ વિકાસ મંત્રાલય, ભારત સરકાર',
    authorizedAccessDesc: 'સત્તાવાર મહેસૂલ અધિકારી અને જાહેર જમીન પોર્ટલ • ભારત સરકાર',

    tabDashboard: 'આધુનિકીકરણ ડેશબોર્ડ',
    tabIngestion: 'દસ્તાવેજ સ્કેન અને ઓસીઆર',
    tabVerification: 'ચકાસણી મથક (HITL)',
    tabRules: 'ચકાસણી નિયમ એન્જિન',
    tabGis: 'કેડસ્ટ્રલ ભૂ-નકશો (GIS)',
    tabCitizenFeedback: 'નાગરિક પૂછપરછ અને ફરિયાદો',
    tabCitizenLandMap: 'તમારી જમીન અને ભૂ-નકશો (૭/૧૨)',
    tabCitizenConsultation: 'પ્રતિસાદ અને અધિકારી પરામર્શ',

    sessionActive: 'ઉચ્ચ-સુરક્ષા સત્ર સક્રિય',
    totalRecords: 'કુલ રેકોર્ડ્સ',
    pendingReview: 'ચકાસણી બાકી',
    logout: 'લૉગઆઉટ',
    logoutConfirmTitle: 'પોર્ટલમાંથી બહાર નીકળવાની ખાતરી કરો',
    logoutConfirmDesc: 'તમે તમારા સુરક્ષિત સત્રમાંથી બહાર નીકળી રહ્યા છો.',
    cancel: 'રદ કરો',
    confirmLogout: 'હા, લૉગઆઉટ કરો',

    roleRevenueOfficer: 'મામલતદાર / નાયબ કલેક્ટર (SDM)',
    roleVerificationSpecialist: 'તલાટી / મહેસૂલ નિરીક્ષક',
    roleSettlementOfficer: 'જમીન દફતર અને સર્વે અધિકારી',
    roleCitizenViewer: 'નાગરિક ખાતેદાર (જાહેર પોર્ટલ)',
    currentRoleLabel: 'વર્તમાન હોદ્દો',

    officerAuthHeader: 'અધિકારી આઈડી અને પાસવર્ડ પ્રમાણીકરણ',
    officerIdLabel: 'સરકારી અધિકારી આઈડી / NIC ઈમેલ',
    officerIdPlaceholder: 'દા.ત. alok.srivastava@nic.in',
    passwordLabel: 'પાસવર્ડ / ગુપ્ત પાસકી',
    roleClassificationLabel: 'મહેસૂલી હોદ્દા વર્ગીકરણ',
    securityVerification: 'સુરક્ષા કેપ્ચા ચકાસણી',
    refreshCaptcha: 'નવો કેપ્ચા',
    roleGuidanceNotice: 'હોદ્દો પસંદ કરવાથી સંબંધિત કાર્યક્ષેત્ર અને સાધનો સક્રિય થશે.',
    authenticateBtn: 'પ્રમાણિત કરો અને પ્રવેશ કરો',
    verifyingBtn: 'ચકાસણી ચાલુ છે...',
    statutoryCompliance: 'ઇન્ફોર્મેશન ટેકનોલોજી એક્ટ 2000 અને DILRMP નિયમો હેઠળ સુરક્ષિત',
    helpdeskNotice: 'તકનીકી સહાય માટે helpdesk-dilrmp@nic.in પર સંપર્ક કરો',

    khasraNo: 'સર્વે / બ્લોક / ખાતા નં.',
    village: 'ગામ',
    tehsil: 'તાલુકો',
    district: 'જિલ્લો',
    state: 'રાજ્ય',
    ownerName: 'મુખ્ય ખાતેદારનું નામ',
    totalArea: 'કુલ ક્ષેત્રફળ (હેક્ટર)',
    status: 'સ્થિતિ',
    statusVerified: 'ચકાસાયેલ અને મંજૂર',
    statusNeedsReview: 'સમીક્ષા જરૂરી',
    statusProcessing: 'ઓસીઆર પ્રક્રિયા ચાલુ',
    searchPlaceholder: 'સર્વે નંબર, ગામ અથવા ખાતેદારના નામથી શોધો...'
  },

  bengali: {
    appName: 'ভূমিরেকর্ড এআই (BhumiRecord AI)',
    appSubtitle: 'বুদ্ধিমান ভূমি রেকর্ড ডিজিটাইজেশন ও যাচাইকরণ পোর্টাল',
    programName: 'ডিজিটাল ইন্ডিয়া ভূমি রেকর্ড আধুনিকীকরণ কর্মসূচি (DILRMP)',
    versionBadge: 'DILRMP v3.8',
    ministryName: 'পল্লী উন্নয়ন মন্ত্রক, ভারত সরকার',
    authorizedAccessDesc: 'আইনসম্মত রাজস্ব কর্মকর্তা ও নাগরিক জমি পোর্টাল • ভারত সরকার',

    tabDashboard: 'আধুনিকীকরণ ড্যাশবোর্ড',
    tabIngestion: 'নথি স্ক্যান ও ওসিআর (OCR)',
    tabVerification: 'যাচাইকরণ কেন্দ্র (HITL)',
    tabRules: 'বৈধতা ইঞ্জিন',
    tabGis: 'মৌজা নকশা ও জিআইএস (GIS)',
    tabCitizenFeedback: 'নাগরিক অনুসন্ধান ও অভিযোগ',
    tabCitizenLandMap: 'আপনার জমি ও মৌজা মানচিত্র',
    tabCitizenConsultation: 'প্রতিক্রিয়া ও কর্মকর্তা পরামর্শ',

    sessionActive: 'উচ্চ-নিরাপত্তা অধিবেশন সক্রিয়',
    totalRecords: 'মোট রেকর্ড',
    pendingReview: 'যাচাই বাকি',
    logout: 'লগআউট',
    logoutConfirmTitle: 'লগআউট নিশ্চিত করুন',
    logoutConfirmDesc: 'আপনি আপনার সুরক্ষিত অধিবেশন থেকে প্রস্থান করতে চলেছেন।',
    cancel: 'বাতিল',
    confirmLogout: 'হ্যাঁ, প্রস্থান করুন',

    roleRevenueOfficer: 'তহশিলদার / মহকুমা শাসক (SDM)',
    roleVerificationSpecialist: 'রাজস্ব পরিদর্শক / পাটোয়ারী',
    roleSettlementOfficer: 'ভূমি জরিপ ও বন্দোবস্ত কর্মকর্তা',
    roleCitizenViewer: 'নাগরিক রায়ত / খতিয়ানধারী',
    currentRoleLabel: 'বর্তমান পদবী',

    officerAuthHeader: 'কর্মকর্তা আইডি ও পাসওয়ার্ড যাচাইকরণ',
    officerIdLabel: 'সরকারি কর্মকর্তা আইডি / NIC ইমেল',
    officerIdPlaceholder: 'যেমন alok.srivastava@nic.in',
    passwordLabel: 'পাসওয়ার্ড / গোপন পাসকি',
    roleClassificationLabel: 'রাজস্ব পদবী নির্বাচন',
    securityVerification: 'নিরাপত্তা ক্যাপচা যাচাই',
    refreshCaptcha: 'নতুন ক্যাপচা',
    roleGuidanceNotice: 'পদ নির্বাচন করলে সংশ্লিষ্ট এক্তিয়ার এবং যাচাই সরঞ্জাম সক্রিয় হবে।',
    authenticateBtn: 'যাচাই করুন ও প্রবেশ করুন',
    verifyingBtn: 'যাচাই প্রক্রিয়াধীন...',
    statutoryCompliance: 'তথ্য প্রযুক্তি আইন ২০০০ এবং DILRMP নির্দেশিকা অনুযায়ী সুরক্ষিত',
    helpdeskNotice: 'প্রযুক্তিগত সহায়তার জন্য helpdesk-dilrmp@nic.in এ যোগাযোগ করুন',

    khasraNo: 'দাগ / খতিয়ান নং',
    village: 'মৌজা / গ্রাম',
    tehsil: 'ব্লক / তহশিল',
    district: 'জেলা',
    state: 'রাজ্য',
    ownerName: 'প্রধান রায়ত / জমির মালিক',
    totalArea: 'মোট আয়তন (হেক্টর)',
    status: 'অবস্থা',
    statusVerified: 'যাচাইকৃত ও অনুমোদিত',
    statusNeedsReview: 'পর্যালোচনা প্রয়োজন',
    statusProcessing: 'ওসিআর প্রক্রিয়াধীন',
    searchPlaceholder: 'দাগ নং, মৌজা বা মালিকের নাম দিয়ে খুঁজুন...'
  },

  kannada: {
    appName: 'ಭೂಮಿರೆಕಾರ್ಡ್ ಎಐ (BhumiRecord AI)',
    appSubtitle: 'ಬುದ್ಧಿವಂತ ಭೂ ದಾಖಲೆಗಳ ಡಿಜಿಟಲೀಕರಣ ಮತ್ತು ಪರಿಶೀಲನಾ ಪೋರ್ಟಲ್',
    programName: 'ಡಿಜಿಟಲ್ ಇಂಡಿಯಾ ಭೂ ದಾಖಲೆಗಳ ಆಧುನೀಕರಣ ಕಾರ್ಯಕ್ರಮ (DILRMP)',
    versionBadge: 'DILRMP v3.8',
    ministryName: 'ಗ್ರಾಮೀಣಾಭಿವೃದ್ಧಿ ಸಚಿವಾಲಯ, ಭಾರತ ಸರ್ಕಾರ',
    authorizedAccessDesc: 'ಅಧಿಕೃತ ಕಂದಾಯ ಅಧಿಕಾರಿ ಮತ್ತು ನಾಗರಿಕ ಭೂ ಪೋರ್ಟಲ್ • ಭಾರತ ಸರ್ಕಾರ',

    tabDashboard: 'ಆಧುನೀಕರಣ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    tabIngestion: 'ದಾಖಲೆ ಸ್ಕ್ಯಾನ್ ಮತ್ತು ಒಸಿಆರ್ (OCR)',
    tabVerification: 'ಪರಿಶೀಲನಾ ಕೇಂದ್ರ (HITL)',
    tabRules: 'ದೃಢೀಕರಣ ನಿಯಮಗಳ ಎಂಜಿನ್',
    tabGis: 'ಭೂ-ನಕ್ಷೆ (ಕ್ಯಾಡಾಸ್ಟ್ರಲ್ ಜಿಐಎಸ್)',
    tabCitizenFeedback: 'ನಾಗರಿಕರ ವಿಚಾರಣೆಗಳು ಮತ್ತು ಕುಂದುಕೊರತೆಗಳು',
    tabCitizenLandMap: 'ನಿಮ್ಮ ಭೂಮಿ ಮತ್ತು ಭೂ-ನಕ್ಷೆ (RTC ಪಹಣಿ)',
    tabCitizenConsultation: 'ಪ್ರತಿಕ್ರಿಯೆ ಮತ್ತು ಅಧಿಕಾರಿ ಸಮಾಲೋಚನೆ',

    sessionActive: 'ಉನ್ನತ-ಭದ್ರತಾ ಸೆಷನ್ ಸಕ್ರಿಯವಾಗಿದೆ',
    totalRecords: 'ಒಟ್ಟು ದಾಖಲೆಗಳು',
    pendingReview: 'ಪರಿಶೀಲನೆ ಬಾಕಿ',
    logout: 'ಲಾಗ್‌ಔಟ್',
    logoutConfirmTitle: 'ಲಾಗ್‌ಔಟ್ ದೃಢೀಕರಿಸಿ',
    logoutConfirmDesc: 'ನಿಮ್ಮ ಸುರಕ್ಷಿತ ಸೆಷನ್‌ನಿಂದ ಹೊರಬರಲು ನೀವು ಸಿದ್ಧರಿದ್ದೀರಾ?',
    cancel: 'ರದ್ದುಮಾಡಿ',
    confirmLogout: 'ಹೌದು, ನಿರ್ಗಮಿಸಿ',

    roleRevenueOfficer: 'ತಹಶೀಲ್ದಾರ್ / ಉಪವಿಭಾಗಾಧಿಕಾರಿ (AC/SDM)',
    roleVerificationSpecialist: 'ಗ್ರಾಮ ಆಡಳಿತಾಧಿಕಾರಿ / ಪಟವಾರಿ (ಪರಿಶೀಲಕ)',
    roleSettlementOfficer: 'ಭೂಮಾಪನ ಮತ್ತು বন্দೋಬಸ್ತ್ ಅಧಿಕಾರಿ',
    roleCitizenViewer: 'ನಾಗರಿಕ ಖಾತೆದಾರ (ಸಾರ್ವಜನಿಕ ಪೋರ್ಟಲ್)',
    currentRoleLabel: 'ಪ್ರಸ್ತುತ ಹುದ್ದೆ',

    officerAuthHeader: 'ಅಧಿಕಾರಿ ಐಡಿ ಮತ್ತು ಪಾಸ್‌ವರ್ಡ್ ದೃಢೀಕರಣ',
    officerIdLabel: 'ಸರ್ಕಾರಿ ಅಧಿಕಾರಿ ಐಡಿ / NIC ಇಮೇಲ್',
    officerIdPlaceholder: 'ಉದಾ. alok.srivastava@nic.in',
    passwordLabel: 'ಪಾಸ್‌ವರ್ಡ್ / ರಹಸ್ಯ ಪಾಸ್‌ಕೀ',
    roleClassificationLabel: 'ಕಂದಾಯ ಹುದ್ದೆ ವರ್ಗೀಕರಣ',
    securityVerification: 'ಭದ್ರತಾ ಕ್ಯಾಪ್ಚಾ ಪರಿಶೀಲನೆ',
    refreshCaptcha: 'ಹೊಸ ಕ್ಯಾಪ್ಚಾ',
    roleGuidanceNotice: 'ಹುದ್ದೆಯನ್ನು ಆಯ್ಕೆ ಮಾಡುವುದರಿಂದ ಅನುಗುಣವಾದ ಅಧಿಕಾರ ಮತ್ತು ಪರಿಕರಗಳು ಲಭ್ಯವಾಗುತ್ತವೆ.',
    authenticateBtn: 'ದೃಢೀಕರಿಸಿ ಮತ್ತು ಪ್ರವೇಶಿಸಿ',
    verifyingBtn: 'ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ...',
    statutoryCompliance: 'ಮಾಹಿತಿ ತಂತ್ರಜ್ಞಾನ ಕಾಯ್ದೆ 2000 ಮತ್ತು DILRMP ನಿಯಮಗಳ ಅಡಿಯಲ್ಲಿ ಸುರಕ್ಷಿತ',
    helpdeskNotice: 'ತಾಂತ್ರಿಕ ಸಹಾಯಕ್ಕಾಗಿ helpdesk-dilrmp@nic.in ಅನ್ನು ಸಂಪರ್ಕಿಸಿ',

    khasraNo: 'ಸರ್ವೆ / ಹಿಸ್ಸಾ ನಂ.',
    village: 'ಗ್ರಾಮ',
    tehsil: 'ತಾಲೂಕು',
    district: 'ಜಿಲ್ಲೆ',
    state: 'ರಾಜ್ಯ',
    ownerName: 'ಮುಖ್ಯ ಖಾತೆದಾರ / ಭೂಮಾಲೀಕ',
    totalArea: 'ಒಟ್ಟು ವಿಸ್ತೀರ್ಣ (ಹೆಕ್ಟೇರ್)',
    status: 'ಸ್ಥಿತಿ',
    statusVerified: 'ಪರಿಶೀಲಿಸಲಾಗಿದೆ ಮತ್ತು ಅನುಮೋದಿಸಲಾಗಿದೆ',
    statusNeedsReview: 'ಪರಿಶೀಲನೆ ಅಗತ್ಯವಿದೆ',
    statusProcessing: 'ಒಸಿಆರ್ ಪ್ರಕ್ರಿಯೆಯಲ್ಲಿದೆ',
    searchPlaceholder: 'ಸರ್ವೆ ನಂ, ಗ್ರಾಮ ಅಥವಾ ಖಾತೆದಾರರ ಹೆಸರಿನಿಂದ ಹುಡುಕಿ...'
  },

  telugu: {
    appName: 'భూమిరికార్డ్ ఏఐ (BhumiRecord AI)',
    appSubtitle: 'ఇంటెలిజెంట్ భూ రికార్డుల డిజిటలైజేషన్ మరియు ధృవీకరణ పోర్టల్',
    programName: 'డిజిటల్ ఇండియా ల్యాండ్ రికార్డ్స్ ఆధునీకరణ కార్యక్రమం (DILRMP)',
    versionBadge: 'DILRMP v3.8',
    ministryName: 'గ్రామీణాభివృద్ధి మంత్రిత్వ శాఖ, భారత ప్రభుత్వం',
    authorizedAccessDesc: 'అధికారిక రెవెన్యూ అధికారి & ప్రజా భూ పోర్టల్ • భారత ప్రభుత్వం',

    tabDashboard: 'ఆధునీకరణ డాష్‌బోర్డ్',
    tabIngestion: 'పత్రాల స్కానింగ్ & ఓసిఆర్ (OCR)',
    tabVerification: 'ధృవీకరణ కేంద్రం (HITL)',
    tabRules: 'ధృవీకరణ నియమాల ఇంజిన్',
    tabGis: 'భూ-నక్ష (కాడస్ట్రల్ జిఐఎస్)',
    tabCitizenFeedback: 'పౌరుల విచారణలు & ఫిర్యాదులు',
    tabCitizenLandMap: 'మీ భూమి & భూ-నక్ష (పట్టాదారు పాస్‌బుక్)',
    tabCitizenConsultation: 'అభిప్రాయం & అధికారి సంప్రదింపులు',

    sessionActive: 'హై-సెక్యూరిటీ సెషన్ యాక్టివ్',
    totalRecords: 'మొత్తం రికార్డులు',
    pendingReview: 'సమీక్ష పెండింగ్‌లో ఉంది',
    logout: 'లాగౌట్',
    logoutConfirmTitle: 'లాగౌట్ నిర్ధారించండి',
    logoutConfirmDesc: 'మీరు సురక్షిత సెషన్ నుండి నిష్క్రమించబోతున్నారు.',
    cancel: 'రద్దు చేయి',
    confirmLogout: 'అవును, నిష్క్రమించు',

    roleRevenueOfficer: 'తహశీల్దార్ / ఆర్డీవో (SDM)',
    roleVerificationSpecialist: 'విలేజ్ రెవెన్యూ ఆఫీసర్ (VRO / పట్వారీ)',
    roleSettlementOfficer: 'సర్వే & సెటిల్‌మెంట్ అధికారి',
    roleCitizenViewer: 'పౌర పట్టాదారు (ప్రజా పోర్టల్)',
    currentRoleLabel: 'ప్రస్తుత హోదా',

    officerAuthHeader: 'అధికారి ఐడి & పాస్‌వర్డ్ ప్రామాణీకరణ',
    officerIdLabel: 'ప్రభుత్వ అధికారి ఐడి / NIC ఇమెయిల్',
    officerIdPlaceholder: 'ఉదా. alok.srivastava@nic.in',
    passwordLabel: 'పాస్‌వర్డ్ / సీక్రెట్ పాస్‌కీ',
    roleClassificationLabel: 'రెవెన్యూ హోదా వర్గీకరణ',
    securityVerification: 'సెక్యూరిటీ క్యాప్చా ధృవీకరణ',
    refreshCaptcha: 'కొత్త క్యాప్చా',
    roleGuidanceNotice: 'హోదాను ఎంచుకోవడం ద్వారా సంబంధిత అధికారాలు మరియు సాధనాలు సక్రియం అవుతాయి.',
    authenticateBtn: 'ధృవీకరించి ప్రవేశించండి',
    verifyingBtn: 'ధృవీకరిస్తోంది...',
    statutoryCompliance: 'సమాచార సాంకేతిక చట్టం 2000 & DILRMP మార్గదర్శకాల ప్రకారం భద్రపరచబడింది',
    helpdeskNotice: 'సాంకేతిక సహాయం కోసం helpdesk-dilrmp@nic.in సంప్రదించండి',

    khasraNo: 'సర్వే / ఖాతా నెం.',
    village: 'గ్రామం',
    tehsil: 'మండలం',
    district: 'జిల్లా',
    state: 'రాష్ట్రం',
    ownerName: 'ప్రధాన పట్టాదారుని పేరు',
    totalArea: 'మొత్తం విస్తీర్ణం (హెక్టార్లు)',
    status: 'స్థితి',
    statusVerified: 'ధృవీకరించబడింది & ఆమోదించబడింది',
    statusNeedsReview: 'సమీక్ష అవసరం',
    statusProcessing: 'ఓసిఆర్ ప్రాసెస్ అవుతోంది',
    searchPlaceholder: 'సర్వే నెం, గ్రామం లేదా పట్టాదారు పేరుతో శోధించండి...'
  },

  tamil: {
    appName: 'பூமி-ரெக்கார்ட் ஏஐ (BhumiRecord AI)',
    appSubtitle: 'அறிவார்ந்த நில ஆவணங்கள் டிஜிட்டல் மயமாக்கல் மற்றும் சரிபார்ப்பு போர்டல்',
    programName: 'டிஜிட்டல் இந்தியா நில ஆவணங்கள் நவீனமயமாக்கல் திட்டம் (DILRMP)',
    versionBadge: 'DILRMP v3.8',
    ministryName: 'ஊரக வளர்ச்சி அமைச்சகம், இந்திய அரசு',
    authorizedAccessDesc: 'அதிகாரப்பூர்வ வருவாய் அலுவலர் மற்றும் குடிமக்கள் நில போர்டல் • இந்திய அரசு',

    tabDashboard: 'நவீனமயமாக்கல் டாஷ்போர்டு',
    tabIngestion: 'ஆவண ஸ்கேன் & ஓசிஆர் (OCR)',
    tabVerification: 'சரிபார்ப்பு நிலையம் (HITL)',
    tabRules: 'விதிகள் மற்றும் சரிபார்ப்பு இயந்திரம்',
    tabGis: 'நில வரைபடம் (புலப்படம் / GIS)',
    tabCitizenFeedback: 'குடிமக்கள் விசாரணைகள் மற்றும் குறைகள்',
    tabCitizenLandMap: 'உங்கள் நிலம் & வரைபடம் (பட்டா / சிட்டா)',
    tabCitizenConsultation: 'கருத்து & அலுவலர் ஆலோசனை',

    sessionActive: 'உயர் பாதுகாப்பு அமர்வு செயலில் உள்ளது',
    totalRecords: 'மொத்த ஆவணங்கள்',
    pendingReview: 'சரிபார்ப்பு நிலுவையில் உள்ளது',
    logout: 'வெளியேறு',
    logoutConfirmTitle: 'வெளியேறுவதை உறுதிப்படுத்தவும்',
    logoutConfirmDesc: 'உங்கள் பாதுகாப்பான அமர்விலிருந்து வெளியேற உள்ளீர்கள்.',
    cancel: 'ரத்து செய்',
    confirmLogout: 'ஆம், வெளியேறு',

    roleRevenueOfficer: 'வட்டாட்சியர் / சார் ஆட்சியர் (SDM)',
    roleVerificationSpecialist: 'கிராம நிர்வாக அலுவலர் (VAO / கர்ணம்)',
    roleSettlementOfficer: 'நில அளவை மற்றும் தீர்வு அலுவலர்',
    roleCitizenViewer: 'நில உரிமையாளர் / பட்டாதாரர் (பொது போர்டல்)',
    currentRoleLabel: 'தற்போதைய பதவி',

    officerAuthHeader: 'அலுவலர் ஐடி மற்றும் கடவுச்சொல் அங்கீகரிப்பு',
    officerIdLabel: 'அரசு அலுவலர் ஐடி / NIC மின்னஞ்சல்',
    officerIdPlaceholder: 'எ.கா. alok.srivastava@nic.in',
    passwordLabel: 'கடவுச்சொல் / ரகசிய பாஸ்கீ',
    roleClassificationLabel: 'வருவாய்த்துறை பதவி வகைப்பாடு',
    securityVerification: 'பாதுகாப்பு கேப்ட்சா சரிபார்ப்பு',
    refreshCaptcha: 'புதிய கேப்ட்சா',
    roleGuidanceNotice: 'பதவியைத் தேர்ந்தெடுப்பது தொடர்புடைய அதிகார வரம்பையும் கருவிகளையும் செயல்படுத்தும்.',
    authenticateBtn: 'அங்கீகரித்து உள்நுழையவும்',
    verifyingBtn: 'சரிபார்க்கப்படுகிறது...',
    statutoryCompliance: 'தகவல் தொழில்நுட்ப சட்டம் 2000 மற்றும் DILRMP விதிகளின் கீழ் பாதுகாப்பானது',
    helpdeskNotice: 'தொழில்நுட்ப உதவிக்கு helpdesk-dilrmp@nic.in ஐ தொடர்பு கொள்ளவும்',

    khasraNo: 'புல எண் / உட்பிரிவு (Survey No)',
    village: 'கிராமம்',
    tehsil: 'வட்டம் (தாலுகா)',
    district: 'மாவட்டம்',
    state: 'மாநிலம்',
    ownerName: 'முதன்மையான பட்டாதாரர் பெயர்',
    totalArea: 'மொத்த பரப்பளவு (ஹெக்டேர்)',
    status: 'நிலை',
    statusVerified: 'சரிபார்க்கப்பட்டு அங்கீகரிக்கப்பட்டது',
    statusNeedsReview: 'மறுஆய்வு தேவை',
    statusProcessing: 'ஓசிஆர் செயலாக்கத்தில் உள்ளது',
    searchPlaceholder: 'புல எண், கிராமம் அல்லது பட்டாதாரர் பெயரால் தேடவும்...'
  },

  urdu: {
    appName: 'بھومی ریکارڈ اے آئی (BhumiRecord AI)',
    appSubtitle: 'زمین کے ریکارڈ کی ڈیجیٹائزیشن اور تصدیقی پورٹل',
    programName: 'ڈیجیٹل انڈیا لینڈ ریکارڈز ماڈرنائزیشن پروگرام (DILRMP)',
    versionBadge: 'DILRMP v3.8',
    ministryName: 'وزارت دیہی ترقی، حکومت ہند',
    authorizedAccessDesc: 'سرکاری ریونیو افسران اور عوامی زمین پورٹل • حکومت ہند',

    tabDashboard: 'ماڈرنائزیشن ڈیش بورڈ',
    tabIngestion: 'دستاویزات اسکین اور او سی آر (OCR)',
    tabVerification: 'تصدیقی اسٹیشن (HITL)',
    tabRules: 'تصدیقی قواعد انجن',
    tabGis: 'شجرہ و بھو-نقشہ (GIS)',
    tabCitizenFeedback: 'عوامی استفسارات و شکایات',
    tabCitizenLandMap: 'آپ کی زمین اور نقشہ (شجرہ)',
    tabCitizenConsultation: 'رائے اور افسر سے مشاورت',

    sessionActive: 'ہائی سیکیورٹی سیشن فعال ہے',
    totalRecords: 'کل ریکارڈز',
    pendingReview: 'تصدیق زیر التواء',
    logout: 'لاگ آؤٹ',
    logoutConfirmTitle: 'لاگ آؤٹ کی تصدیق کریں',
    logoutConfirmDesc: 'آپ اپنے محفوظ سیشن سے باہر نکلنے والے ہیں۔',
    cancel: 'منسوخ کریں',
    confirmLogout: 'ہاں، لاگ آؤٹ کریں',

    roleRevenueOfficer: 'تحصیلدار / ایس ڈی ایم (SDM)',
    roleVerificationSpecialist: 'پٹواری / قانونگو (تصدیق کنندہ)',
    roleSettlementOfficer: 'بندوبست و کیڈسٹرل افسر',
    roleCitizenViewer: 'شہری کھاتہ دار (عوامی پورٹل)',
    currentRoleLabel: 'موجودہ عہدہ',

    officerAuthHeader: 'افسر شناختی کارڈ اور پاس ورڈ تصدیق',
    officerIdLabel: 'سرکاری افسر آئی ڈی / NIC ای میل',
    officerIdPlaceholder: 'مثال: alok.srivastava@nic.in',
    passwordLabel: 'پاس ورڈ / خفیہ پاس کی',
    roleClassificationLabel: 'ریونیو عہدہ کا انتخاب',
    securityVerification: 'سیکیورٹی کیپچا تصدیق',
    refreshCaptcha: 'نیا کیپچا',
    roleGuidanceNotice: 'عہدہ منتخب کرنے سے متعلقہ اختیارات اور ٹولز فعال ہو جائیں گے۔',
    authenticateBtn: 'تصدیق کریں اور داخل ہوں',
    verifyingBtn: 'تصدیق جاری ہے...',
    statutoryCompliance: 'انفارمیشن ٹکنالوجی ایکٹ 2000 اور DILRMP ہدایات کے تحت محفوظ',
    helpdeskNotice: 'تکنیکی مدد کے لیے helpdesk-dilrmp@nic.in پر رابطہ کریں',

    khasraNo: 'خسرہ / گٹ نمبر',
    village: 'موضع / گاؤں',
    tehsil: 'تحصیل',
    district: 'ضلع',
    state: 'ریاست',
    ownerName: 'اہم کھاتہ دار کا نام',
    totalArea: 'کل رقبہ (ہیکٹر)',
    status: 'حیثیت',
    statusVerified: 'تصدیق شدہ و منظور شدہ',
    statusNeedsReview: 'نظر ثانی درکار',
    statusProcessing: 'او سی آر جاری ہے',
    searchPlaceholder: 'خسرہ، گاؤں یا مالک کے نام سے تلاش کریں...'
  },
  malayalam: {
    appName: 'ഭൂമിറെക്കോർഡ് AI',
    appSubtitle: 'ബുദ്ധിമാനായ ഭൂമി രേഖ ഡിജിറ്റൈസേഷൻ & സാധുതാ പരിശോധനാ പോർട്ടൽ',
    programName: 'ഡിജിറ്റൽ ഇന്ത്യ ലാൻഡ് റെക്കോർഡ്സ് മോഡേണൈസേഷൻ പ്രോഗ്രാം (DILRMP)',
    versionBadge: 'DILRMP v3.8',
    ministryName: 'ഗ്രാമവികസന മന്ത്രാലയം, ഭാരത സർക്കാർ',
    authorizedAccessDesc: 'റവന്യൂ ഉദ്യോഗസ്ഥർക്കും പൊതുജനങ്ങൾക്കുമുള്ള പോർട്ടൽ • ഭാരത സർക്കാർ',

    tabDashboard: 'ആധുനികവൽക്കരണ ഡാഷ്‌ബോർഡ്',
    tabIngestion: 'ഇൻജഷൻ & ഒസിആർ',
    tabVerification: 'പരിശോധനാ കേന്ദ്രം (HITL)',
    tabRules: 'സാധുതാ എൻജിൻ',
    tabGis: 'ഭൂ-നക്ഷാ ജിഐഎസ് (ക്യാഡസ്ട്രൽ)',
    tabCitizenFeedback: 'പൗര അന്വേഷണങ്ങളും പരാതികളും',
    tabCitizenLandMap: 'ഭൂ-നക്ഷാ മാപ്പ്',
    tabCitizenConsultation: 'പരാതി പരിഹാര കൂടിക്കാഴ്ച',

    sessionActive: 'സജീവം',
    totalRecords: 'ആകെ രേഖകൾ',
    pendingReview: 'പരിശോധന ബാക്കി',
    logout: 'ലോഗ് ഔട്ട്',
    logoutConfirmTitle: 'ലോഗ് ഔട്ട് സ്ഥിരീകരിക്കുക',
    logoutConfirmDesc: 'ഈ സെഷൻ അവസാനിപ്പിക്കാൻ ഉറപ്പാണോ?',
    cancel: 'റദ്ദാക്കുക',
    confirmLogout: 'ലോഗ് ഔട്ട് ചെയ്യുക',

    roleRevenueOfficer: 'റവന്യൂ ഓഫീസർ (തഹസിൽദാർ)',
    roleVerificationSpecialist: 'പരിശോധനാ വിദഗ്ദ്ധൻ (പട്‌വാരി/സർവേയർ)',
    roleSettlementOfficer: 'സെറ്റിൽമെൻ്റ് ഓഫീസർ',
    roleCitizenViewer: 'പൗര പരിശോധകൻ',
    currentRoleLabel: 'ചുമതല',

    officerAuthHeader: 'റവന്യൂ ഉദ്യോഗസ്ഥ ലോഗിൻ',
    officerIdLabel: 'ഓഫീസർ ഐഡി / NIC ഇമെയിൽ',
    officerIdPlaceholder: 'ഉദാ: alok.srivastava@nic.in',
    passwordLabel: 'പാസ്‌വേഡ്',
    roleClassificationLabel: 'റവന്യൂ തസ്തിക തിരഞ്ഞെടുക്കുക',
    securityVerification: 'സുരക്ഷാ ക്യാപ്ച പരിശോധന',
    refreshCaptcha: 'പുതിയ ക്യാപ്ച',
    roleGuidanceNotice: 'തിരഞ്ഞെടുത്ത തസ്തികയ്ക്കനുസരിച്ചുള്ള ഉപകരണങ്ങൾ പ്രവർത്തനക്ഷമമാകും.',
    authenticateBtn: 'പ്രവേശിക്കുക',
    verifyingBtn: 'പരിശോധിക്കുന്നു...',
    statutoryCompliance: 'ഐടി ആക്റ്റ് 2000 പ്രകാരം സുരക്ഷിതം',
    helpdeskNotice: 'സാങ്കേതിക സഹായത്തിന്: helpdesk-dilrmp@nic.in',

    khasraNo: 'ഖസ്ര / സർവേ നമ്പർ',
    village: 'ഗ്രാമം',
    tehsil: 'താലൂക്ക് / തഹസിൽ',
    district: 'ജില്ല',
    state: 'സംസ്ഥാനം',
    ownerName: 'ഭൂവുടമയുടെ പേര്',
    totalArea: 'ആകെ വിസ്തീർണം (ഹെക്ടർ)',
    status: 'നിലവിലെ അവസ്ഥ',
    statusVerified: 'സാധുത ഉറപ്പാക്കിയത്',
    statusNeedsReview: 'പരിശോധന ആവശ്യമാണ്',
    statusProcessing: 'പ്രോസസ്സിംഗ് നടക്കുന്നു',
    searchPlaceholder: 'ഖസ്ര, ഗ്രാമം അല്ലെങ്കിൽ ഉടമയുടെ പേര് ഉപയോഗിച്ച് തിരയുക...'
  },
  odia: {
    appName: 'ଭୂମିରେକର୍ଡ AI',
    appSubtitle: 'ବୁଦ୍ଧିମାନ ଭୂମି ରେକର୍ଡ ଡିଜିଟାଇଜେସନ୍ ଏବଂ ବୈଧତା ପୋର୍ଟାଲ୍',
    programName: 'ଡିଜିଟାଲ୍ ଇଣ୍ଡିଆ ଲ୍ୟାଣ୍ଡ ରେକର୍ଡସ୍ ଆଧୁନିକୀକରଣ କାର୍ଯ୍ୟକ୍ରମ (DILRMP)',
    versionBadge: 'DILRMP v3.8',
    ministryName: 'ଗ୍ରାମ୍ୟ ଉନ୍ନୟନ ମନ୍ତ୍ରଣାଳୟ, ଭାରତ ସରକାର',
    authorizedAccessDesc: 'ରାଜସ୍ୱ ଅଧିକାରୀ ଓ ଜନସାଧାରଣ ପୋର୍ଟାଲ୍ • ଭାରତ ସରକାର',

    tabDashboard: 'ଆଧୁନିକୀକରଣ ଡ୍ୟାସବୋର୍ଡ',
    tabIngestion: 'ଇଞ୍ଜେସନ୍ ଏବଂ ଓସିଆର୍',
    tabVerification: 'ଯାଞ୍ଚ କେନ୍ଦ୍ର (HITL)',
    tabRules: 'ବୈଧତା ଇଞ୍ଜିନ୍',
    tabGis: 'ଭୂ-ନକ୍ସା ଜିଆଇଏସ୍ (କାଡାଷ୍ଟ୍ରାଲ୍)',
    tabCitizenFeedback: 'ନାଗରିକ ଅନୁସନ୍ଧାନ ଓ ଅଭିଯୋଗ',
    tabCitizenLandMap: 'ଜମି ନକ୍ସା',
    tabCitizenConsultation: 'ପରାମର୍ଶ କାର୍ଯ୍ୟସୂଚୀ',

    sessionActive: 'ସକ୍ରିୟ',
    totalRecords: 'ମୋଟ ରେକର୍ଡ',
    pendingReview: 'ବାକି ଯାଞ୍ଚ',
    logout: 'ଲଗ୍ ଆଉଟ୍',
    logoutConfirmTitle: 'ଲଗ୍ ଆଉଟ୍ ନିଶ୍ଚିତ କରନ୍ତୁ',
    logoutConfirmDesc: 'ଆପଣ ଏହି ଅଧିବେଶନ ଶେଷ କରିବାକୁ ନିଶ୍ଚିତ କି?',
    cancel: 'ବାତିଲ୍',
    confirmLogout: 'ଲଗ୍ ଆଉଟ୍ କରନ୍ତୁ',

    roleRevenueOfficer: 'ରାଜସ୍ୱ ଅଧିକାରୀ (ତହସିଲଦାର)',
    roleVerificationSpecialist: 'ଯାଞ୍ଚ ବିଶେଷଜ୍ଞ (ପଟୱାରୀ/ସର୍ଭେୟର)',
    roleSettlementOfficer: 'ବନ୍ଦୋବସ୍ତ ଅଧିକାରୀ',
    roleCitizenViewer: 'ନାଗରିକ ଦର୍ଶକ',
    currentRoleLabel: 'ପଦବୀ',

    officerAuthHeader: 'ରାଜସ୍ୱ ଅଧିକାରୀ ପ୍ରବେଶ',
    officerIdLabel: 'ଅଧିକାରୀ ID / NIC ଇମେଲ୍',
    officerIdPlaceholder: 'ଉଦାହରଣ: alok.srivastava@nic.in',
    passwordLabel: 'ପାସୱାର୍ଡ',
    roleClassificationLabel: 'ରାଜସ୍ୱ ପଦବୀ ଚୟନ କରନ୍ତୁ',
    securityVerification: 'ସୁରକ୍ଷା କ୍ୟାପଚା ଯାଞ୍ଚ',
    refreshCaptcha: 'ନୂଆ କ୍ୟାପଚା',
    roleGuidanceNotice: 'ଚୟନିତ ପଦବୀ ଅନୁଯାୟୀ ଅଧିକାର ଏବଂ ସାଧନ ଉପଲବ୍ଧ ହେବ।',
    authenticateBtn: 'ପ୍ରମାଣୀକରଣ ଏବଂ ପ୍ରବେଶ',
    verifyingBtn: 'ଯାଞ୍ଚ ଚାଲିଛି...',
    statutoryCompliance: 'IT ଆଇନ 2000 ଅନୁଯାୟୀ ସୁରକ୍ଷିତ',
    helpdeskNotice: 'ଯାନ୍ତ୍ରିକ ସହାୟତା ପାଇଁ: helpdesk-dilrmp@nic.in',

    khasraNo: 'ଖସରା / ଦାଗ ନମ୍ବର',
    village: 'ଗ୍ରାମ / ମୌଜା',
    tehsil: 'ତହସିଲ',
    district: 'ଜିଲ୍ଲା',
    state: 'ରାଜ୍ୟ',
    ownerName: 'ମୁଖ୍ୟ ଜମିଦାରଙ୍କ ନାମ',
    totalArea: 'ମୋଟ କ୍ଷେତ୍ରଫଳ (ହେକ୍ଟର)',
    status: 'ସ୍ଥିତି',
    statusVerified: 'ଯାଞ୍ଚ ଓ ଅନୁମୋଦିତ',
    statusNeedsReview: 'ପୁନର୍ବିଚାର ଆବଶ୍ୟକ',
    statusProcessing: 'ଓସିଆର୍ ପ୍ରକ୍ରିୟାଧୀନ',
    searchPlaceholder: 'ଖସରା, ଗ୍ରାମ କିମ୍ବା ମାଲିକଙ୍କ ନାମ ଦ୍ୱାରା ଖୋଜନ୍ତୁ...'
  },
  assamese: {
    appName: 'ভূমিৰেকৰ্ড AI',
    appSubtitle: 'বুদ্ধিমত্তাৰে ভূমি ৰেকৰ্ড ডিজিটাইজেচন আৰু বৈধকৰণ পৰ্টেল',
    programName: 'ডিজিটেল ইণ্ডিয়া ভূমি ৰেকৰ্ড আধুনিকীকৰণ কাৰ্যসূচী (DILRMP)',
    versionBadge: 'DILRMP v3.8',
    ministryName: 'গ্ৰামোন্নয়ন মন্ত্ৰালয়, ভাৰত চৰকাৰ',
    authorizedAccessDesc: 'ৰাজহ বিষয়া আৰু ৰাজহুৱা পৰ্টেল • ভাৰত চৰকাৰ',

    tabDashboard: 'আধুনিকীকৰণ ডেশ্বব’ৰ্ড',
    tabIngestion: 'ইনজেচন আৰু অচিআৰ',
    tabVerification: 'পৰীক্ষণ কেন্দ্ৰ (HITL)',
    tabRules: 'বৈধকৰণ ইঞ্জিন',
    tabGis: 'কেডাষ্ট্ৰেল জিআইএছ (ভূ-নক্সা)',
    tabCitizenFeedback: 'নাগৰিক অনুসন্ধান আৰু অভিযোগ',
    tabCitizenLandMap: 'ভূমি নক্সা',
    tabCitizenConsultation: 'পৰামৰ্শ সূচী',

    sessionActive: 'সক্ৰিয়',
    totalRecords: 'মুঠ ৰেকৰ্ড',
    pendingReview: 'বাকী পৰীক্ষণ',
    logout: 'লগ আউট',
    logoutConfirmTitle: 'লগ আউট নিশ্চিত কৰক',
    logoutConfirmDesc: 'আপুনি এই অধিবেশন সমাপ্ত কৰিবলৈ নিশ্চিতনে?',
    cancel: 'বাতিল',
    confirmLogout: 'লগ আউট কৰক',

    roleRevenueOfficer: 'ৰাজহ বিষয়া (চক্ৰ বিষয়া/তহচিলদাৰ)',
    roleVerificationSpecialist: 'পৰীক্ষণ বিশেষজ্ঞ (লাট মণ্ডল/চাৰ্ভেয়াৰ)',
    roleSettlementOfficer: 'বন্দোবস্ত বিষয়া',
    roleCitizenViewer: 'নাগৰিক দৰ্শক',
    currentRoleLabel: 'পদবী',

    officerAuthHeader: 'ৰাজহ বিষয়া প্ৰৱেশ',
    officerIdLabel: 'বিষয়া ID / NIC ইমেইল',
    officerIdPlaceholder: 'উদাহৰণ: alok.srivastava@nic.in',
    passwordLabel: 'পাছৱৰ্ড',
    roleClassificationLabel: 'ৰাজহ পদবী নিৰ্বাচন কৰক',
    securityVerification: 'সুৰক্ষা কেপচা পৰীক্ষা',
    refreshCaptcha: 'নতুন কেপচা',
    roleGuidanceNotice: 'নিৰ্বাচিত পদবী অনুসৰি ক্ষমতা আৰু সঁজুলি উপলব্ধ হ’ব।',
    authenticateBtn: 'প্ৰমাণীকৰণ আৰু প্ৰৱেশ',
    verifyingBtn: 'পৰীক্ষা চলি আছে...',
    statutoryCompliance: 'আইটি আইন ২০০০ অনুসৰি সুৰক্ষিত',
    helpdeskNotice: 'কাৰিকৰী সহায়ৰ বাবে: helpdesk-dilrmp@nic.in',

    khasraNo: 'দাগ / খচৰা নম্বৰ',
    village: 'গাঁও / মৌজা',
    tehsil: 'ৰাজহ চক্ৰ',
    district: 'জিলা',
    state: 'ৰাজ্য',
    ownerName: 'প্ৰধান পট্টাদাৰৰ নাম',
    totalArea: 'মুঠ কালি (হেক্টৰ)',
    status: 'স্থিতি',
    statusVerified: 'পৰীক্ষিত আৰু অনুমোদিত',
    statusNeedsReview: 'পুনৰীক্ষণ প্ৰয়োজন',
    statusProcessing: 'অচিআৰ প্ৰক্ৰিয়াকৰণত আছে',
    searchPlaceholder: 'দাগ, গাঁও বা পট্টাদাৰৰ নামেৰে অনুসন্ধান কৰক...'
  }
};

export function getTranslations(lang: IndicLanguage): TranslationDictionary {
  return TRANSLATIONS[lang] || TRANSLATIONS.english;
}

export function getStoredLanguage(): IndicLanguage {
  try {
    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (stored && stored in TRANSLATIONS) {
      return stored as IndicLanguage;
    }
  } catch {
    // ignore
  }
  return 'english';
}

export function setStoredLanguage(lang: IndicLanguage): void {
  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
  } catch {
    // ignore
  }
}
