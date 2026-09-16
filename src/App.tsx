/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from './components/Navbar';
import { DashboardView } from './components/DashboardView';
import { DocumentIngestionView } from './components/DocumentIngestionView';
import { VerificationStationView } from './components/VerificationStationView';
import { CadastralGisView } from './components/CadastralGisView';
import { ValidationRulesView } from './components/ValidationRulesView';
import { CitizenFeedbackScheduleView } from './components/CitizenFeedbackScheduleView';
import { LoginView } from './components/LoginView';
import { ExtractedLandRecord, UserRole, IndicLanguage, AuthUser, CitizenAppointment } from './types';
import { INITIAL_LAND_RECORDS } from './data/sampleRecords';
import { INITIAL_CITIZEN_APPOINTMENTS } from './data/sampleAppointments';
import { runAutomatedValidationRules } from './services/landRecordService';
import { PRESET_OFFICER_PERSONAS, AUTH_STORAGE_KEY } from './data/authPersonas';
import { ShieldCheck, Layers, Sparkles, Database } from 'lucide-react';
import { getTranslations, getStoredLanguage, setStoredLanguage } from './utils/translations';
import { 
  testFirestoreConnection, 
  subscribeToLandRecords, 
  saveLandRecordToFirestore, 
  saveBatchLandRecordsToFirestore,
  subscribeToCitizenAppointments,
  saveCitizenAppointmentToFirestore
} from './services/firebase';

export default function App() {
  const [isDbConnected, setIsDbConnected] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => {
    try {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY);
      if (saved === 'LOGGED_OUT') return null;
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return PRESET_OFFICER_PERSONAS['REVENUE_OFFICER'];
  });

  const [loggedOutNotice, setLoggedOutNotice] = useState<string | null>(null);
  const [userRole, setUserRoleState] = useState<UserRole>(() => currentUser?.role || 'REVENUE_OFFICER');
  const [currentTab, setCurrentTab] = useState<'dashboard' | 'ingestion' | 'verification' | 'rules' | 'gis' | 'citizen_feedback'>(() => {
    return (currentUser?.role === 'CITIZEN_VIEWER') ? 'gis' : 'dashboard';
  });
  const [selectedLanguage, setSelectedLanguage] = useState<IndicLanguage>(() => getStoredLanguage());

  const handleLanguageChange = (lang: IndicLanguage) => {
    setSelectedLanguage(lang);
    setStoredLanguage(lang);
  };

  const t = getTranslations(selectedLanguage);

  // Citizen Feedback & Scheduling States
  const [citizenAppointments, setCitizenAppointments] = useState<CitizenAppointment[]>(INITIAL_CITIZEN_APPOINTMENTS);
  const [preselectedKhasraForScheduling, setPreselectedKhasraForScheduling] = useState<string | undefined>();
  const [preselectedVillageForScheduling, setPreselectedVillageForScheduling] = useState<string | undefined>();

  // Citizen view guard: if citizen view, can only view land map ('gis') and feedback with schedule with cadastral GIS officer ('citizen_feedback')
  useEffect(() => {
    if (userRole === 'CITIZEN_VIEWER' && currentTab !== 'gis' && currentTab !== 'citizen_feedback') {
      setCurrentTab('gis');
    }
  }, [userRole, currentTab]);

  const handleLogin = (user: AuthUser) => {
    setCurrentUser(user);
    setUserRoleState(user.role);
    setLoggedOutNotice(null);
    if (user.role === 'CITIZEN_VIEWER') {
      setCurrentTab('gis');
      const targetVillage = user.assignedVillage || 'Wagholi';
      const targetKhasra = user.assignedKhasra || '142/1';
      const citizenRec = records.find(r => {
        const v = r.village?.value || (typeof r.village === 'string' ? r.village : '');
        return v && v.toLowerCase() === targetVillage.toLowerCase() && r.khasraNumber?.value === targetKhasra;
      }) || records[0];
      if (citizenRec) {
        setSelectedRecord(citizenRec);
      }
    }
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    } catch {
      // ignore
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setLoggedOutNotice('You have successfully signed out and exited your revenue session.');
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, 'LOGGED_OUT');
    } catch {
      // ignore
    }
  };

  // Initialize records with real automated validation rules
  const [records, setRecords] = useState<ExtractedLandRecord[]>(() => {
    return INITIAL_LAND_RECORDS.map(rec => ({
      ...rec,
      validationResults: runAutomatedValidationRules(rec, INITIAL_LAND_RECORDS)
    }));
  });

  const [selectedRecord, setSelectedRecord] = useState<ExtractedLandRecord>(records[0]);

  // Citizen data isolation parameters
  const isCitizen = userRole === 'CITIZEN_VIEWER';
  const citizenVillage = currentUser?.assignedVillage || 'Wagholi';
  const citizenKhasra = currentUser?.assignedKhasra || '142/1';

  // Strict citizen land isolation: only records belonging to the citizen's assigned village
  const visibleRecords = useMemo(() => {
    if (!isCitizen) return records;
    const filtered = records.filter(r => {
      const v = r.village?.value || (typeof r.village === 'string' ? r.village : '');
      return v && v.toLowerCase() === citizenVillage.toLowerCase();
    });
    return filtered.length > 0 ? filtered : [records[0]];
  }, [records, isCitizen, citizenVillage]);

  // Synchronize selectedRecord when citizen view is active
  useEffect(() => {
    if (isCitizen) {
      const currentVil = selectedRecord?.village?.value || (typeof selectedRecord?.village === 'string' ? selectedRecord.village : '');
      if (currentVil.toLowerCase() !== citizenVillage.toLowerCase() || selectedRecord?.khasraNumber?.value !== citizenKhasra) {
        const citizenRec = visibleRecords.find(r => r.khasraNumber?.value === citizenKhasra) || visibleRecords[0];
        if (citizenRec) {
          setSelectedRecord(citizenRec);
        }
      }
    }
  }, [isCitizen, citizenVillage, citizenKhasra, selectedRecord, visibleRecords]);

  // Firebase Firestore live database synchronization and connection validation
  useEffect(() => {
    testFirestoreConnection().then(connected => {
      setIsDbConnected(connected);
    });

    const unsubscribeRecords = subscribeToLandRecords(
      (firestoreRecords) => {
        if (firestoreRecords && firestoreRecords.length > 0) {
          setRecords(firestoreRecords);
          setSelectedRecord(prev => {
            if (!prev) return firestoreRecords[0];
            const updated = firestoreRecords.find(r => r.id === prev.id);
            return updated || firestoreRecords[0];
          });
          setIsDbConnected(true);
        }
      },
      (err) => {
        console.warn('Firestore real-time sync notice:', err);
      }
    );

    const unsubscribeAppointments = subscribeToCitizenAppointments(
      (firestoreAppointments) => {
        if (firestoreAppointments && firestoreAppointments.length > 0) {
          setCitizenAppointments(firestoreAppointments);
        }
      }
    );

    return () => {
      unsubscribeRecords();
      unsubscribeAppointments();
    };
  }, []);

  // Calculate pending reviews for badge
  const pendingReviewCount = records.filter(r => r.status === 'NEEDS_REVIEW').length;

  const handleSelectRecord = (record: ExtractedLandRecord) => {
    setSelectedRecord(record);
    setCurrentTab('verification');
  };

  const handleRecordIngested = (newRecord: ExtractedLandRecord) => {
    setRecords(prev => [newRecord, ...prev]);
    setSelectedRecord(newRecord);
    saveLandRecordToFirestore(newRecord).catch(err => {
      console.warn('Could not persist ingested record to Firestore:', err);
    });
  };

  const handleUpdateRecord = (updatedRecord: ExtractedLandRecord) => {
    setRecords(prev => prev.map(r => r.id === updatedRecord.id ? updatedRecord : r));
    setSelectedRecord(updatedRecord);
    saveLandRecordToFirestore(updatedRecord).catch(err => {
      console.warn('Could not persist updated record to Firestore:', err);
    });
  };

  const handleUpdateAllRecords = (updatedRecords: ExtractedLandRecord[]) => {
    setRecords(updatedRecords);
    const updatedSelected = updatedRecords.find(r => r.id === selectedRecord.id) || updatedRecords[0];
    setSelectedRecord(updatedSelected);
    saveBatchLandRecordsToFirestore(updatedRecords).catch(err => {
      console.warn('Could not persist batch records to Firestore:', err);
    });
  };

  if (!currentUser) {
    return (
      <LoginView
        onLogin={handleLogin}
        selectedLanguage={selectedLanguage}
        onLanguageChange={handleLanguageChange}
        loggedOutNotice={loggedOutNotice}
        onDismissNotice={() => setLoggedOutNotice(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f0] text-[#33332A] flex flex-col font-sans selection:bg-[#EBE7DF] selection:text-[#4A3728]">
      {/* Navigation Header */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        userRole={userRole}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={handleLanguageChange}
        pendingReviewCount={pendingReviewCount}
        currentUser={currentUser}
        onLogout={handleLogout}
        citizenAppointmentCount={citizenAppointments.length}
      />

      {/* Sub-header Live Status & Operational Context Ribbon */}
      <div className="bg-[#FAF8F5]/60 border-b border-[#DCD7CE]/60 py-2 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-[#5A5A40]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#82B37A] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#3D5A40]"></span>
            </span>
            <span className="font-semibold text-[#33332A]">{t.sessionActive}</span>
            <span className="text-[#6B6B58] hidden sm:inline">•</span>
            <span className="text-[#6B6B58] hidden sm:inline font-mono">NODE-AS-EAST-1</span>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-[#5A5A40]">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[#EAF2EB] border border-[#BCD4C0] text-[#3D5A40]">
              <Database className="w-3 h-3 text-[#3D5A40]" />
              <span className="font-medium">Firebase Firestore:</span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded bg-[#3D5A40] text-white">
                {isDbConnected ? 'Live' : 'Connecting'}
              </span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[#EBE7DF]/70 border border-[#DCD7CE]">
              <span className="font-medium">{t.totalRecords}:</span>
              <span className="font-bold text-[#33332A]">{records.length}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[#FFF9EA] border border-[#DCD7CE] text-[#8B4513]">
              <span className="font-medium">{t.pendingReview}:</span>
              <span className="font-bold">{pendingReviewCount}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Workspace with Animated View Transitions */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="w-full"
          >
            {currentTab === 'dashboard' && (
              <DashboardView
                records={records}
                onSelectRecord={handleSelectRecord}
                onNavigateToIngestion={() => setCurrentTab('ingestion')}
                onNavigateToVerification={() => setCurrentTab('verification')}
                onUpdateRecords={handleUpdateAllRecords}
                currentUser={currentUser}
                selectedLanguage={selectedLanguage}
              />
            )}

            {currentTab === 'ingestion' && (
              <DocumentIngestionView
                onRecordIngested={handleRecordIngested}
                allRecords={records}
                onNavigateToVerification={() => setCurrentTab('verification')}
              />
            )}

            {currentTab === 'verification' && (
              <VerificationStationView
                records={records}
                selectedRecord={selectedRecord}
                onSelectRecord={setSelectedRecord}
                onUpdateRecord={handleUpdateRecord}
                userRole={userRole}
                onOpenCadastralMap={() => setCurrentTab('gis')}
              />
            )}

            {currentTab === 'rules' && (
              <ValidationRulesView
                records={records}
                onUpdateAllRecords={handleUpdateAllRecords}
                onSelectRecord={handleSelectRecord}
              />
            )}

            {currentTab === 'gis' && (
              <CadastralGisView
                records={visibleRecords}
                selectedRecord={selectedRecord}
                onSelectRecord={setSelectedRecord}
                onNavigateToVerification={() => setCurrentTab('verification')}
                userRole={userRole}
                currentUser={currentUser}
                onNavigateToFeedbackSchedule={(khasra, village) => {
                  setPreselectedKhasraForScheduling(khasra);
                  setPreselectedVillageForScheduling(village);
                  setCurrentTab('citizen_feedback');
                }}
              />
            )}

            {currentTab === 'citizen_feedback' && (
              <CitizenFeedbackScheduleView
                currentUser={currentUser}
                records={visibleRecords}
                appointments={citizenAppointments}
                onAddAppointment={(newApt) => {
                  setCitizenAppointments(prev => [newApt, ...prev]);
                  saveCitizenAppointmentToFirestore(newApt).catch(err => {
                    console.warn('Could not persist appointment to Firestore:', err);
                  });
                }}
                onUpdateAppointment={(updatedApt) => {
                  setCitizenAppointments(prev => prev.map(a => a.id === updatedApt.id ? updatedApt : a));
                  saveCitizenAppointmentToFirestore(updatedApt).catch(err => {
                    console.warn('Could not persist updated appointment to Firestore:', err);
                  });
                }}
                onNavigateToMap={(khasra) => {
                  if (khasra) {
                    const matched = visibleRecords.find(r => r.khasraNumber?.value?.trim() === khasra.trim());
                    if (matched) {
                      setSelectedRecord(matched);
                    }
                  }
                  setCurrentTab('gis');
                }}
                initialKhasra={preselectedKhasraForScheduling}
                initialVillage={preselectedVillageForScheduling}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer conforming to DILRMP Standards in Natural Tones theme */}
      <footer className="bg-[#FAF8F5] border-t border-[#DCD7CE] mt-auto py-6 text-xs text-[#5A5A40]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#3D5A40]"></span>
            <span className="font-semibold text-[#4A3728]">Digital India Land Records Modernization Programme (DILRMP)</span>
            <span className="hidden md:inline text-[#6B6B58]">• National Land Administration Standards (ISO 19152 LADM)</span>
          </div>

          <div className="flex items-center gap-4 text-[#707052]">
            <span>NIC / MeitY Architecture</span>
            <span>•</span>
            <span>OGC WMS/WFS GeoServer</span>
            <span>•</span>
            <span>Gemini 3.8 Indic Core</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
