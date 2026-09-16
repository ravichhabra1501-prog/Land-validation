import { CitizenAppointment } from '../types';

export const INITIAL_CITIZEN_APPOINTMENTS: CitizenAppointment[] = [
  {
    id: 'GIS-APT-2026-8801',
    citizenName: 'Vikramjit Singh Dhillon',
    citizenPhone: '+91 98765 43210',
    citizenAadhaarOrId: 'XXXX-XXXX-7712',
    citizenEmail: 'vikram.singh@gmail.com',
    village: 'Wagholi',
    khasraNumber: '142/1',
    khataNumber: '882',
    category: 'BOUNDARY_DISCREPANCY',
    feedbackText: 'Northern agricultural boundary ridge (medh) with Khasra 142/2 shifted by approx 1.8 meters during recent irrigation channel desilting. Requesting official cadastral GIS demarcation using Total Station / DGPS.',
    consultationMode: 'FIELD_DEMARCATION',
    preferredDate: '2026-09-21',
    preferredTimeSlot: '11:00 AM - 12:30 PM',
    assignedOfficerName: 'Dr. Priya Nair',
    assignedOfficerDesignation: 'Settlement & Cadastral GIS Officer',
    status: 'CONFIRMED',
    createdAt: '2026-09-14T10:15:00Z',
    officerRemarks: 'DGPS survey kit assigned to Surveyor Team B. Verification notice served to adjacent landowner of Khasra 142/2.',
    venueOrMeetingLink: 'Plot #142/1 On-site, Village Wagholi, Tehsil Haveli',
    rescheduledCount: 0
  },
  {
    id: 'GIS-APT-2026-8802',
    citizenName: 'Vikramjit Singh Dhillon',
    citizenPhone: '+91 98765 43210',
    citizenAadhaarOrId: 'XXXX-XXXX-7712',
    citizenEmail: 'vikram.singh@gmail.com',
    village: 'Wagholi',
    khasraNumber: '144/2',
    khataNumber: '884',
    category: 'DRONE_SURVEY_INQUIRY',
    feedbackText: 'Inquiry regarding SVAMITVA drone survey orthorectified boundary alignment with the old 1932 Aks Shajra sheet. Would like to review the superimposition layer with the GIS Officer.',
    consultationMode: 'IN_PERSON_TEHSIL',
    preferredDate: '2026-09-24',
    preferredTimeSlot: '02:30 PM - 03:15 PM',
    assignedOfficerName: 'Dr. Priya Nair',
    assignedOfficerDesignation: 'Settlement & Cadastral GIS Officer',
    status: 'SCHEDULED',
    createdAt: '2026-09-15T14:30:00Z',
    officerRemarks: 'Appointment accepted. Digital orthophoto map sheet loaded on GIS Workstation 02.',
    venueOrMeetingLink: 'Room 104, Cadastral GIS Lab, Tehsil Revenue Complex',
    rescheduledCount: 0
  },
  {
    id: 'GIS-APT-2026-8740',
    citizenName: 'Vikramjit Singh Dhillon',
    citizenPhone: '+91 98765 43210',
    citizenAadhaarOrId: 'XXXX-XXXX-7712',
    citizenEmail: 'vikram.singh@gmail.com',
    village: 'Bhor',
    khasraNumber: '38/1',
    khataNumber: '401',
    category: 'AREA_VARIANCE',
    feedbackText: 'Discrepancy of 0.08 Ha noted between RoR Extract (1.85 Ha) and the digitized polygon area calculation (1.77 Ha).',
    consultationMode: 'VIRTUAL_MEETING',
    preferredDate: '2026-09-08',
    preferredTimeSlot: '04:00 PM - 04:30 PM',
    assignedOfficerName: 'Dr. Priya Nair',
    assignedOfficerDesignation: 'Settlement & Cadastral GIS Officer',
    status: 'RESOLVED',
    createdAt: '2026-09-02T09:00:00Z',
    officerRemarks: 'Variance resolved. Old road widening reservation of 0.08 Ha deducted under 2018 Gazette notification #R-109.',
    venueOrMeetingLink: 'NIC Video Portal (https://meet.nic.in/dilrmp-cadastral-042)',
    rescheduledCount: 0
  }
];

export const CADASTRAL_GIS_OFFICERS = [
  {
    id: 'CAD-SETT-042',
    name: 'Dr. Priya Nair',
    designation: 'Settlement & Cadastral GIS Officer',
    department: 'Directorate of Land Records & Cadastral Survey',
    jurisdiction: 'District Cadastral GIS Cell & Survey Settlements',
    email: 'priya.nair@surveyofindia.gov.in',
    officeLocation: 'Room 104, Modern Cadastral GIS Centre, District Collectorate',
    hearingDays: 'Tuesday & Thursday (10:30 AM - 04:30 PM)',
    activeCases: 14,
    rating: '4.9/5 (182 citizen consultations)'
  },
  {
    id: 'CAD-SURV-118',
    name: 'Shri Amitav Roy',
    designation: 'Senior Cadastral Geodesist & Drone Surveyor',
    department: 'Survey of India / DILRMP GIS Cell',
    jurisdiction: 'Haveli, Sadar & Western Circle Clusters',
    email: 'amitav.roy@dilrmp.nic.in',
    officeLocation: 'DGPS Field Operations Center, Tehsil Bhavan',
    hearingDays: 'Monday & Wednesday (11:00 AM - 03:30 PM)',
    activeCases: 9,
    rating: '4.8/5 (95 citizen consultations)'
  }
];
