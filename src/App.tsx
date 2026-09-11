/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from './components/Navbar';
import { DashboardView } from './components/DashboardView';
import { DocumentIngestionView } from './components/DocumentIngestionView';
import { VerificationStationView } from './components/VerificationStationView';
import { CadastralGisView } from './components/CadastralGisView';
import { ValidationRulesView } from './components/ValidationRulesView';
import { LoginView } from './components/LoginView';
import { ExtractedLandRecord, UserRole, IndicLanguage, AuthUser } from './types';
import { INITIAL_LAND_RECORDS } from './data/sampleRecords';
import { runAutomatedValidationRules } from './services/landRecordService';
import { PRESET_OFFICER_PERSONAS, AUTH_STORAGE_KEY } from './data/authPersonas';
import { ShieldCheck, Layers, Sparkles } from 'lucide-react';

export default function App() {
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
  const [currentTab, setCurrentTab] = useState<'dashboard' | 'ingestion' | 'verification' | 'rules' | 'gis'>('dashboard');
  const [userRole, setUserRoleState] = useState<UserRole>(() => currentUser?.role || 'REVENUE_OFFICER');
  const [selectedLanguage, setSelectedLanguage] = useState<IndicLanguage>('english');

  const setUserRole = (role: UserRole) => {
    setUserRoleState(role);
    if (currentUser) {
      const updatedUser: AuthUser = {
        ...PRESET_OFFICER_PERSONAS[role],
        loginTimestamp: currentUser.loginTimestamp
      };
      setCurrentUser(updatedUser);
      try {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(updatedUser));
      } catch {
        // ignore
      }
    }
  };

  const handleLogin = (user: AuthUser) => {
    setCurrentUser(user);
    setUserRoleState(user.role);
    setLoggedOutNotice(null);
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

  // Calculate pending reviews for badge
  const pendingReviewCount = records.filter(r => r.status === 'NEEDS_REVIEW').length;

  const handleSelectRecord = (record: ExtractedLandRecord) => {
    setSelectedRecord(record);
    setCurrentTab('verification');
  };

  const handleRecordIngested = (newRecord: ExtractedLandRecord) => {
    setRecords(prev => [newRecord, ...prev]);
    setSelectedRecord(newRecord);
  };

  const handleUpdateRecord = (updatedRecord: ExtractedLandRecord) => {
    setRecords(prev => prev.map(r => r.id === updatedRecord.id ? updatedRecord : r));
    setSelectedRecord(updatedRecord);
  };

  const handleUpdateAllRecords = (updatedRecords: ExtractedLandRecord[]) => {
    setRecords(updatedRecords);
    const updatedSelected = updatedRecords.find(r => r.id === selectedRecord.id) || updatedRecords[0];
    setSelectedRecord(updatedSelected);
  };

  if (!currentUser) {
    return (
      <LoginView
        onLogin={handleLogin}
        selectedLanguage={selectedLanguage}
        onLanguageChange={setSelectedLanguage}
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
        setUserRole={setUserRole}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
        pendingReviewCount={pendingReviewCount}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* Sub-header Live Status & Operational Context Ribbon */}
      <div className="bg-[#FAF8F5]/60 border-b border-[#DCD7CE]/60 py-2 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-[#5A5A40]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#82B37A] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#3D5A40]"></span>
            </span>
            <span className="font-semibold text-[#33332A]">DILRMP High-Security Session Active</span>
            <span className="text-[#6B6B58] hidden sm:inline">•</span>
            <span className="text-[#6B6B58] hidden sm:inline font-mono">NODE-AS-EAST-1</span>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-[#5A5A40]">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[#EBE7DF]/70 border border-[#DCD7CE]">
              <span className="font-medium">Total Records:</span>
              <span className="font-bold text-[#33332A]">{records.length}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[#FFF9EA] border border-[#DCD7CE] text-[#8B4513]">
              <span className="font-medium">Pending Review:</span>
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
                records={records}
                selectedRecord={selectedRecord}
                onSelectRecord={setSelectedRecord}
                onNavigateToVerification={() => setCurrentTab('verification')}
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
