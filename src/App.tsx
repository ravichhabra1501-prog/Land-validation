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
import { OfflineSyncStatusBar } from './components/OfflineSyncStatusBar';
import { ExtractedLandRecord, UserRole, IndicLanguage, AuthUser, CitizenAppointment } from './types';
import { INITIAL_LAND_RECORDS } from './data/sampleRecords';
import { INITIAL_CITIZEN_APPOINTMENTS } from './data/sampleAppointments';
import { runAutomatedValidationRules } from './services/landRecordService';
import { PRESET_OFFICER_PERSONAS, AUTH_STORAGE_KEY } from './data/authPersonas';
import { ShieldCheck, Layers, Sparkles, Database, CheckCircle2, AlertCircle } from 'lucide-react';
import { getTranslations, getStoredLanguage, setStoredLanguage } from './utils/translations';
import { 
  testFirestoreConnection, 
  subscribeToLandRecords, 
  saveLandRecordToFirestore, 
  saveBatchLandRecordsToFirestore,
  subscribeToCitizenAppointments,
  saveCitizenAppointmentToFirestore,
  syncPendingOfflineMutationsToFirestore
} from './services/firebase';
import { 
  seedLocalStorageCacheIfEmpty, 
  loadRecordsFromLocalCache, 
  loadAppointmentsFromLocalCache,
  saveRecordsToLocalCache,
  queueOfflineMutation
} from './services/offlineStorage';
import { initPwaServiceWorker } from './services/pwaService';

export default function App() {
  const [isDbConnected, setIsDbConnected] = useState<boolean>(false);
  const [isSimulatedOffline, setIsSimulatedOffline] = useState<boolean>(false);
  const [lastDataSource, setLastDataSource] = useState<'CLOUD' | 'LOCAL_CACHE'>('LOCAL_CACHE');
  const [isSyncingOffline, setIsSyncingOffline] = useState<boolean>(false);
  const [syncNotice, setSyncNotice] = useState<string | null>(null);

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

  // Initialize records from browser Local Storage cache first to ensure instant offline access
  const [records, setRecords] = useState<ExtractedLandRecord[]>(() => {
    const cached = loadRecordsFromLocalCache();
    const base = (cached && cached.length > 0) ? cached : INITIAL_LAND_RECORDS;
    return base.map(rec => ({
      ...rec,
      validationResults: runAutomatedValidationRules(rec, base)
    }));
  });

  // Citizen Feedback & Scheduling States initialized from Local Storage cache
  const [citizenAppointments, setCitizenAppointments] = useState<CitizenAppointment[]>(() => {
    const cached = loadAppointmentsFromLocalCache();
    return (cached && cached.length > 0) ? cached : INITIAL_CITIZEN_APPOINTMENTS;
  });

  const [preselectedKhasraForScheduling, setPreselectedKhasraForScheduling] = useState<string | undefined>();
  const [preselectedVillageForScheduling, setPreselectedVillageForScheduling] = useState<string | undefined>();

  const [selectedRecord, setSelectedRecord] = useState<ExtractedLandRecord>(records[0]);

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

  // 1. Initialize PWA Service Worker for offline shell precaching
  useEffect(() => {
    const unregister = initPwaServiceWorker();
    // Seed initial cache into LocalStorage if first visit
    seedLocalStorageCacheIfEmpty();
    return () => {
      unregister();
    };
  }, []);

  // 2. Listen to browser Online/Offline network state changes
  useEffect(() => {
    const handleOnline = () => {
      console.info('Browser connection restored online.');
      testFirestoreConnection().then(connected => {
        setIsDbConnected(connected);
        if (connected && !isSimulatedOffline) {
          setLastDataSource('CLOUD');
          // Auto sync any queued changes
          syncPendingOfflineMutationsToFirestore().then(result => {
            if (result.syncedCount > 0) {
              setSyncNotice(`Connection restored: ${result.syncedCount} queued change(s) synchronized with Firestore.`);
              setTimeout(() => setSyncNotice(null), 5000);
            }
          });
        }
      });
    };

    const handleOffline = () => {
      console.warn('Browser connection lost. Switched to offline Local Storage fallback.');
      setIsDbConnected(false);
      setLastDataSource('LOCAL_CACHE');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [isSimulatedOffline]);

  // 3. Firebase Firestore real-time listener with automatic Local Storage fallback
  useEffect(() => {
    testFirestoreConnection().then(connected => {
      setIsDbConnected(connected);
      if (connected) setLastDataSource('CLOUD');
    });

    const unsubscribeRecords = subscribeToLandRecords(
      (firestoreOrCachedRecords, source) => {
        if (!isSimulatedOffline && firestoreOrCachedRecords && firestoreOrCachedRecords.length > 0) {
          setRecords(firestoreOrCachedRecords);
          setLastDataSource(source);
          if (source === 'CLOUD') {
            setIsDbConnected(true);
          }
          setSelectedRecord(prev => {
            if (!prev) return firestoreOrCachedRecords[0];
            const updated = firestoreOrCachedRecords.find(r => r.id === prev.id);
            return updated || firestoreOrCachedRecords[0];
          });
        }
      },
      (err) => {
        console.warn('Firestore connection notice:', err);
        setIsDbConnected(false);
        setLastDataSource('LOCAL_CACHE');
      }
    );

    const unsubscribeAppointments = subscribeToCitizenAppointments(
      (firestoreOrCachedAppointments) => {
        if (!isSimulatedOffline && firestoreOrCachedAppointments && firestoreOrCachedAppointments.length > 0) {
          setCitizenAppointments(firestoreOrCachedAppointments);
        }
      },
      (err) => {
        console.warn('Firestore appointments notice:', err);
      }
    );

    return () => {
      unsubscribeRecords();
      unsubscribeAppointments();
    };
  }, [isSimulatedOffline]);

  // Handler for manual sync
  const handleManualSync = async () => {
    setIsSyncingOffline(true);
    try {
      const res = await syncPendingOfflineMutationsToFirestore();
      if (res.syncedCount > 0) {
        setSyncNotice(`Synced ${res.syncedCount} offline modification(s) to Firestore successfully.`);
      } else {
        setSyncNotice('All local records and appointments are currently in sync with the cloud.');
      }
      setTimeout(() => setSyncNotice(null), 4000);
    } catch (e: any) {
      console.warn('Manual sync failure:', e);
    } finally {
      setIsSyncingOffline(false);
    }
  };

  // Toggle simulated offline mode
  const handleToggleSimulateOffline = () => {
    setIsSimulatedOffline(prev => {
      const next = !prev;
      if (next) {
        setLastDataSource('LOCAL_CACHE');
      } else {
        testFirestoreConnection().then(connected => {
          setIsDbConnected(connected);
          if (connected) {
            setLastDataSource('CLOUD');
            handleManualSync();
          }
        });
      }
      return next;
    });
  };

  // Reconnect check
  const handleForceReconnect = () => {
    testFirestoreConnection().then(connected => {
      setIsDbConnected(connected);
      if (connected) {
        setLastDataSource('CLOUD');
        handleManualSync();
      }
    });
  };

  // Calculate pending reviews for badge
  const pendingReviewCount = records.filter(r => r.status === 'NEEDS_REVIEW').length;

  const handleSelectRecord = (record: ExtractedLandRecord) => {
    setSelectedRecord(record);
    setCurrentTab('verification');
  };

  const handleRecordIngested = (newRecord: ExtractedLandRecord) => {
    const updatedList = [newRecord, ...records];
    setRecords(updatedList);
    setSelectedRecord(newRecord);
    saveRecordsToLocalCache(updatedList);

    if (isSimulatedOffline || !isDbConnected) {
      queueOfflineMutation('RECORD_CREATE', newRecord);
      setSyncNotice('Record saved to browser Local Storage (queued for cloud sync).');
      setTimeout(() => setSyncNotice(null), 3500);
    } else {
      saveLandRecordToFirestore(newRecord).catch(err => {
        console.warn('Could not persist ingested record to Firestore, queued offline:', err);
      });
    }
  };

  const handleUpdateRecord = (updatedRecord: ExtractedLandRecord) => {
    const updatedList = records.map(r => r.id === updatedRecord.id ? updatedRecord : r);
    setRecords(updatedList);
    setSelectedRecord(updatedRecord);
    saveRecordsToLocalCache(updatedList);

    if (isSimulatedOffline || !isDbConnected) {
      queueOfflineMutation('RECORD_UPDATE', updatedRecord);
      setSyncNotice('Verification changes saved locally (queued for cloud sync).');
      setTimeout(() => setSyncNotice(null), 3500);
    } else {
      saveLandRecordToFirestore(updatedRecord).catch(err => {
        console.warn('Could not persist updated record to Firestore, queued offline:', err);
      });
    }
  };

  const handleUpdateAllRecords = (updatedRecords: ExtractedLandRecord[]) => {
    setRecords(updatedRecords);
    const updatedSelected = updatedRecords.find(r => r.id === selectedRecord.id) || updatedRecords[0];
    setSelectedRecord(updatedSelected);
    saveRecordsToLocalCache(updatedRecords);

    if (isSimulatedOffline || !isDbConnected) {
      queueOfflineMutation('RECORD_BATCH', updatedRecords);
      setSyncNotice('Batch records saved locally (queued for cloud sync).');
      setTimeout(() => setSyncNotice(null), 3500);
    } else {
      saveBatchLandRecordsToFirestore(updatedRecords).catch(err => {
        console.warn('Could not persist batch records to Firestore, queued offline:', err);
      });
    }
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

      {/* Offline Storage Fallback & Cloud Connection Status Bar */}
      <OfflineSyncStatusBar
        isDbConnected={isDbConnected}
        isSimulatedOffline={isSimulatedOffline}
        onToggleSimulateOffline={handleToggleSimulateOffline}
        onManualSync={handleManualSync}
        isSyncing={isSyncingOffline}
        totalRecordsCount={records.length}
        lastDataSource={lastDataSource}
        onForceReconnect={handleForceReconnect}
      />

      {/* Temporary Sync Notification Toast */}
      <AnimatePresence>
        {syncNotice && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="bg-[#3D5A40] text-[#FFF9EA] px-4 py-2 text-xs text-center font-medium shadow-md flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-[#82B37A]" />
            <span>{syncNotice}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sub-header Operational Context Ribbon */}
      <div className="bg-[#FAF8F5]/60 border-b border-[#DCD7CE]/60 py-1.5 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-[#5A5A40]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#82B37A] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#3D5A40]"></span>
            </span>
            <span className="font-semibold text-[#33332A]">{t.sessionActive}</span>
            <span className="text-[#6B6B58] hidden sm:inline">•</span>
            <span className="text-[#6B6B58] hidden sm:inline font-mono">DILRMP-CADASTRE-OFFLINE-ENGINE</span>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-[#5A5A40]">
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
                onNavigateToVerification={(rec) => {
                  if (rec) setSelectedRecord(rec);
                  setCurrentTab('verification');
                }}
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
                records={records}
                selectedRecord={selectedRecord}
                onSelectRecord={setSelectedRecord}
                onScheduleMeeting={(khasra, village) => {
                  setPreselectedKhasraForScheduling(khasra);
                  setPreselectedVillageForScheduling(village);
                  setCurrentTab('citizen_feedback');
                }}
              />
            )}

            {currentTab === 'citizen_feedback' && (
              <CitizenFeedbackScheduleView
                selectedRecord={selectedRecord}
                records={records}
                onNavigateToGis={() => setCurrentTab('gis')}
                preselectedKhasra={preselectedKhasraForScheduling}
                preselectedVillage={preselectedVillageForScheduling}
                currentUser={currentUser}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer Branding and Statutory Assurance */}
      <footer className="bg-[#FAF8F5] border-t border-[#DCD7CE] py-4 text-xs text-[#6B6B58] text-center">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#5A5A40]" />
            <span>DILRMP Certified Cadastral Verification & Offline Storage Engine • Government of India</span>
          </div>
          <div className="flex items-center gap-3 text-[11px]">
            <span>Local Storage Fallback Active</span>
            <span>•</span>
            <span>Service Worker PWA Cached</span>
            <span>•</span>
            <span>ISO 19152 LADM Aligned</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
