import { AuthUser, UserRole } from '../types';

export const PRESET_OFFICER_PERSONAS: Record<UserRole, AuthUser> = {
  REVENUE_OFFICER: {
    id: 'OFF-REV-094',
    name: 'Alok Srivastava',
    email: 'alok.srivastava@nic.in',
    role: 'REVENUE_OFFICER',
    designation: 'Sub-Divisional Magistrate (SDM) & Tehsildar',
    jurisdiction: 'Tehsil Sadar, Lucknow Division, Uttar Pradesh',
    terminalId: 'REV-MAG-LKO-094',
    loginTimestamp: new Date().toISOString(),
    avatarInitials: 'AS',
    badgeNumber: 'UP-REV-SDM-2026-094',
    digitalTokenId: 'DSC-GOI-REV-2026-X77A'
  },
  VERIFICATION_SPECIALIST: {
    id: 'SPEC-PAT-108',
    name: 'Rajesh Kumar Sharma',
    email: 'rajesh.patwari@nic.in',
    role: 'VERIFICATION_SPECIALIST',
    designation: 'Senior Patwari & Field Verification Specialist',
    jurisdiction: 'Halka Rampur & Madhopur (Revenue Circle 04)',
    terminalId: 'PAT-TERM-CIR04-108',
    loginTimestamp: new Date().toISOString(),
    avatarInitials: 'RS',
    badgeNumber: 'PAT-REV-INSP-108',
    digitalTokenId: 'DSC-GOI-PAT-2026-B44'
  },
  SETTLEMENT_OFFICER: {
    id: 'CAD-SETT-042',
    name: 'Dr. Priya Nair',
    email: 'priya.nair@surveyofindia.gov.in',
    role: 'SETTLEMENT_OFFICER',
    designation: 'Settlement & Cadastral GIS Officer',
    jurisdiction: 'Directorate of Land Records & Cadastral Survey',
    terminalId: 'GIS-SURV-STN-042',
    loginTimestamp: new Date().toISOString(),
    avatarInitials: 'PN',
    badgeNumber: 'SOI-CAD-SO-042',
    digitalTokenId: 'DSC-GOI-GIS-2026-S42'
  },
  CITIZEN_VIEWER: {
    id: 'CIT-IND-771',
    name: 'Vikramjit Singh Dhillon',
    email: 'vikram.singh@gmail.com',
    role: 'CITIZEN_VIEWER',
    designation: 'Registered Agricultural Landowner (Khatedar)',
    jurisdiction: 'Village Madhopur & Rampur, Tehsil Sadar',
    terminalId: 'CIT-WEB-PORTAL-771',
    loginTimestamp: new Date().toISOString(),
    avatarInitials: 'VD',
    badgeNumber: 'AADHAAR-VERIFIED-771',
    digitalTokenId: 'UIDAI-KYC-AUTH-2026'
  }
};

export const AUTH_STORAGE_KEY = 'bhumi_dilrmp_authenticated_user';
