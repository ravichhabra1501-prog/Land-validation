import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, 
  FileText, 
  ShieldCheck, 
  CheckCircle2, 
  Map as MapIcon, 
  Globe2, 
  UserCheck, 
  Layers, 
  LogOut, 
  AlertTriangle, 
  X, 
  Terminal, 
  Calendar,
  Activity,
  Radio,
  Cpu
} from 'lucide-react';
import { UserRole, IndicLanguage, AuthUser } from '../types';
import { getTranslations, setStoredLanguage } from '../utils/translations';

interface NavbarProps {
  currentTab: 'dashboard' | 'ingestion' | 'verification' | 'rules' | 'gis' | 'citizen_feedback';
  setCurrentTab: (tab: 'dashboard' | 'ingestion' | 'verification' | 'rules' | 'gis' | 'citizen_feedback') => void;
  userRole: UserRole;
  selectedLanguage: IndicLanguage;
  setSelectedLanguage: (lang: IndicLanguage) => void;
  pendingReviewCount: number;
  currentUser?: AuthUser | null;
  onLogout: () => void;
  citizenAppointmentCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  userRole,
  selectedLanguage,
  setSelectedLanguage,
  pendingReviewCount,
  currentUser,
  onLogout,
  citizenAppointmentCount = 0
}) => {
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState<boolean>(false);
  const t = getTranslations(selectedLanguage);

  const languageLabels: Record<IndicLanguage, { native: string; english: string }> = {
    english: { native: 'English', english: 'English' },
    hindi: { native: 'हिन्दी', english: 'Hindi' },
    marathi: { native: 'मराठी', english: 'Marathi' },
    punjabi: { native: 'ਪੰਜਾਬੀ', english: 'Punjabi' },
    gujarati: { native: 'ગુજરાતી', english: 'Gujarati' },
    bengali: { native: 'বাংলা', english: 'Bengali' },
    kannada: { native: 'ಕನ್ನಡ', english: 'Kannada' },
    telugu: { native: 'తెలుగు', english: 'Telugu' },
    tamil: { native: 'தமிழ்', english: 'Tamil' },
    malayalam: { native: 'മലയാളം', english: 'Malayalam' },
    odia: { native: 'ଓଡ଼ିଆ', english: 'Odia' },
    assamese: { native: 'অসমীয়া', english: 'Assamese' },
    urdu: { native: 'اردو', english: 'Urdu' }
  };

  const handleLanguageChange = (lang: IndicLanguage) => {
    setSelectedLanguage(lang);
    setStoredLanguage(lang);
  };

  // Tabs dynamically translated according to selectedLanguage
  const navTabs = userRole === 'CITIZEN_VIEWER'
    ? [
        { id: 'gis' as const, label: t.tabCitizenLandMap, icon: MapIcon },
        { 
          id: 'citizen_feedback' as const, 
          label: t.tabCitizenConsultation, 
          icon: Calendar, 
          count: citizenAppointmentCount 
        }
      ]
    : [
        { id: 'dashboard' as const, label: t.tabDashboard, icon: Building2 },
        { id: 'ingestion' as const, label: t.tabIngestion, icon: FileText },
        { id: 'verification' as const, label: t.tabVerification, icon: CheckCircle2, count: pendingReviewCount },
        { id: 'rules' as const, label: t.tabRules, icon: ShieldCheck },
        { id: 'gis' as const, label: t.tabGis, icon: MapIcon },
        { 
          id: 'citizen_feedback' as const, 
          label: t.tabCitizenFeedback, 
          icon: Calendar, 
          count: citizenAppointmentCount 
        }
      ];

  const roleLabel = 
    userRole === 'REVENUE_OFFICER' ? t.roleRevenueOfficer :
    userRole === 'VERIFICATION_SPECIALIST' ? t.roleVerificationSpecialist :
    userRole === 'SETTLEMENT_OFFICER' ? t.roleSettlementOfficer :
    t.roleCitizenViewer;

  return (
    <header className="sticky top-0 z-50 bg-[#070A12]/85 backdrop-blur-2xl border-b border-cyan-500/20 shadow-[0_4px_30px_rgba(0,0,0,0.8)] transition-all">
      {/* Top Telemetry Hairline Accent */}
      <div className="h-[2px] w-full bg-gradient-to-r from-cyan-500 via-emerald-400 to-amber-400 opacity-90" />

      {/* Main Header & Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Portal Branding */}
          <motion.div 
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => setCurrentTab(userRole === 'CITIZEN_VIEWER' ? 'gis' : 'dashboard')}
          >
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#0F1D38] via-[#0E1526] to-[#070A12] flex items-center justify-center text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.25)] border border-cyan-500/40 group-hover:border-cyan-400 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all">
              <Layers className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#10B981] border-2 border-[#070A12]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold tracking-tight text-slate-100 natural-serif leading-tight">
                  {t.appName}
                </h1>
                <span className="bg-cyan-950/80 text-cyan-300 text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md border border-cyan-500/30 uppercase tracking-wider shadow-[0_0_10px_rgba(6,182,212,0.2)]">
                  QUANTUM HUD
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium leading-none mt-0.5 flex items-center gap-1.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span>{t.appSubtitle}</span>
              </p>
            </div>
          </motion.div>

          {/* Controls: Language Selector, Authenticated Role Badge & Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Selector */}
            <motion.div 
              whileHover={{ y: -1 }}
              className="relative inline-block text-left"
            >
              <div className="flex items-center gap-1.5 bg-[#0E172A]/90 hover:bg-[#131F38] px-3 py-1.5 rounded-xl border border-cyan-500/30 text-xs font-medium text-slate-200 transition-colors shadow-[0_0_12px_rgba(6,182,212,0.1)]">
                <Globe2 className="w-3.5 h-3.5 text-cyan-400" />
                <select
                  aria-label="Select portal language"
                  value={selectedLanguage}
                  onChange={(e) => handleLanguageChange(e.target.value as IndicLanguage)}
                  className="bg-transparent border-none outline-hidden cursor-pointer pr-1 font-medium text-slate-200"
                >
                  {Object.entries(languageLabels).map(([key, lang]) => (
                    <option key={key} value={key} className="bg-[#0D1527] text-slate-200">
                      {lang.native} ({lang.english})
                    </option>
                  ))}
                </select>
              </div>
            </motion.div>

            {/* Authenticated Role Status Badge (Read-Only) */}
            <div 
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0E172A]/90 border border-slate-700/80 text-xs text-slate-300 shadow-sm"
              title={`${t.currentRoleLabel}: ${roleLabel}`}
            >
              <UserCheck className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <div className="text-left leading-tight">
                <span className="font-semibold text-slate-200 max-w-[160px] truncate block font-mono text-[11px]">
                  {roleLabel}
                </span>
              </div>
            </div>

            {/* Current Officer / User Profile Badge */}
            {currentUser && (
              <motion.div 
                whileHover={{ y: -1 }}
                className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0E172A]/90 border border-slate-700/80 text-xs shadow-sm"
              >
                <div className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 text-[10px] font-bold flex items-center justify-center shrink-0 shadow-[0_0_8px_rgba(6,182,212,0.3)]">
                  {currentUser.avatarInitials}
                </div>
                <div className="text-left leading-tight">
                  <div className="font-bold text-slate-100 truncate max-w-[120px]">{currentUser.name}</div>
                  <div className="text-[10px] text-cyan-400/80 truncate max-w-[120px] font-mono">{currentUser.terminalId}</div>
                </div>
              </motion.div>
            )}

            {/* Logout / Exit Portal Button */}
            <motion.button
              id="btn-navbar-logout"
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsLogoutConfirmOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-rose-500/40 bg-rose-950/30 hover:bg-rose-900/50 hover:border-rose-400 text-xs font-semibold text-rose-300 transition-all shadow-[0_0_12px_rgba(244,63,94,0.15)] cursor-pointer group"
              title="Log out and exit from revenue portal"
            >
              <LogOut className="w-3.5 h-3.5 text-rose-400 group-hover:-translate-x-0.5 transition-transform" />
              <span className="hidden sm:inline">{t.logout}</span>
            </motion.button>
          </div>
        </div>

        {/* Modern Cyber Segmented Tab Navigation Menu */}
        <nav className="flex space-x-1 sm:space-x-1.5 overflow-x-auto py-2 border-t border-slate-800/80 scrollbar-none" aria-label="Tabs">
          {navTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`tab-btn-${tab.id}`}
                onClick={() => setCurrentTab(tab.id)}
                className={`relative flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-medium rounded-xl transition-all whitespace-nowrap cursor-pointer z-10 ${
                  isActive 
                    ? 'text-cyan-300 font-semibold border border-cyan-400/40 shadow-[0_0_15px_rgba(6,182,212,0.25)]' 
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabBadge"
                    className="absolute inset-0 bg-gradient-to-r from-cyan-950/80 to-blue-950/80 rounded-xl -z-10"
                    transition={{ type: 'spring', bounce: 0.18, duration: 0.35 }}
                  />
                )}
                <Icon className={`w-4 h-4 transition-transform duration-200 ${isActive ? 'scale-105 text-cyan-400' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {tab.count !== undefined && tab.count > 0 && (
                  <span className="relative flex items-center justify-center ml-1">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-60"></span>
                    <span className="relative inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-[0_0_8px_rgba(245,158,11,0.4)]">
                      {tab.count}
                    </span>
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Logout Confirmation Dialog Modal with Cyber HUD styling */}
      <AnimatePresence>
        {isLogoutConfirmOpen && (
          <motion.div 
            id="modal-logout-confirm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md"
          >
            <motion.div 
              role="dialog"
              aria-modal="true"
              aria-labelledby="logout-dialog-title"
              initial={{ scale: 0.94, opacity: 0, y: 8 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 8 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="bg-[#0D1527] rounded-2xl border border-rose-500/40 max-w-md w-full shadow-[0_0_40px_rgba(244,63,94,0.25)] p-6 space-y-4 text-slate-200"
            >
              <div className="flex items-start justify-between">
                <div className="w-11 h-11 rounded-xl bg-rose-950/60 border border-rose-500/50 text-rose-400 flex items-center justify-center shadow-[0_0_15px_rgba(244,63,94,0.3)]">
                  <LogOut className="w-5 h-5" />
                </div>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsLogoutConfirmOpen(false)}
                  className="text-slate-400 hover:text-slate-100 p-1.5 rounded-lg hover:bg-slate-800 cursor-pointer transition-colors"
                  aria-label="Close dialog"
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>

              <div className="space-y-1">
                <h3 id="logout-dialog-title" className="text-base font-bold text-slate-100 natural-serif tracking-wide">
                  {t.logoutConfirmTitle}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {t.logoutConfirmDesc}
                </p>
              </div>

              {currentUser && (
                <div className="bg-[#080E1C] p-3.5 rounded-xl border border-slate-800 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Officer Name:</span>
                    <span className="font-bold text-slate-200">{currentUser.name}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Designation:</span>
                    <span className="font-medium text-cyan-300 text-right truncate max-w-[200px]">{currentUser.designation}</span>
                  </div>
                  <div className="flex items-center justify-between font-mono text-[11px] pt-1 border-t border-slate-800">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Terminal className="w-3 h-3 text-cyan-400" /> Terminal ID:
                    </span>
                    <span className="text-cyan-400 font-semibold">{currentUser.terminalId}</span>
                  </div>
                </div>
              )}

              <div className="text-[11px] text-amber-300 bg-amber-950/40 p-3 rounded-xl border border-amber-500/30 flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="leading-snug">
                  Audit Trail Notice: Session logs, pending validation tokens, and cryptographic signatures have been registered with the Central Master Database.
                </span>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  id="btn-cancel-logout"
                  type="button"
                  onClick={() => setIsLogoutConfirmOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-xs font-semibold text-slate-200 cursor-pointer transition-colors shadow-sm"
                >
                  {t.cancel}
                </button>
                <button
                  id="btn-confirm-logout"
                  type="button"
                  onClick={() => {
                    setIsLogoutConfirmOpen(false);
                    onLogout();
                  }}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-[0_0_15px_rgba(244,63,94,0.4)] transition-all"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>{t.confirmLogout}</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
