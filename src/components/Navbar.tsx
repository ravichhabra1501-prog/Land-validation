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
  Sparkles,
  Layers,
  ChevronDown,
  LogOut,
  AlertTriangle,
  X,
  Lock,
  Clock,
  Terminal
} from 'lucide-react';
import { UserRole, IndicLanguage, AuthUser } from '../types';

interface NavbarProps {
  currentTab: 'dashboard' | 'ingestion' | 'verification' | 'rules' | 'gis';
  setCurrentTab: (tab: 'dashboard' | 'ingestion' | 'verification' | 'rules' | 'gis') => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  selectedLanguage: IndicLanguage;
  setSelectedLanguage: (lang: IndicLanguage) => void;
  pendingReviewCount: number;
  currentUser?: AuthUser | null;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  userRole,
  setUserRole,
  selectedLanguage,
  setSelectedLanguage,
  pendingReviewCount,
  currentUser,
  onLogout
}) => {
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState<boolean>(false);
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
    urdu: { native: 'اردو', english: 'Urdu' }
  };

  const navTabs = [
    { id: 'dashboard' as const, label: 'Modernization Dashboard', icon: Building2 },
    { id: 'ingestion' as const, label: 'Ingestion & OCR', icon: FileText },
    { id: 'verification' as const, label: 'Verification Station (HITL)', icon: CheckCircle2, count: pendingReviewCount },
    { id: 'rules' as const, label: 'Validation Engine', icon: ShieldCheck },
    { id: 'gis' as const, label: 'Cadastral GIS (भू-नक्शा)', icon: MapIcon }
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#FAF8F5]/90 backdrop-blur-xl border-b border-[#DCD7CE]/80 shadow-xs transition-all">
      {/* Main Header & Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Portal Branding */}
          <motion.div 
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => setCurrentTab('dashboard')}
          >
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#5A5A40] via-[#4A4A33] to-[#363625] flex items-center justify-center text-[#FFF9EA] shadow-xs border border-[#707052]/50 group-hover:shadow-md transition-shadow">
              <Layers className="w-5 h-5 text-[#EBE7DF]" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#82B37A] border-2 border-[#FAF8F5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold tracking-tight text-[#33332A] natural-serif leading-tight">
                  BhumiRecord AI
                </h1>
                <span className="bg-[#FFF9EA] text-[#8B4513] text-[10px] font-semibold px-2 py-0.5 rounded-full border border-[#DCD7CE] uppercase tracking-wide">
                  DILRMP v3.8
                </span>
              </div>
              <p className="text-[11px] text-[#5A5A40] font-medium leading-none mt-0.5">
                Intelligent Land Record Digitization &amp; Validation Portal
              </p>
            </div>
          </motion.div>

          {/* Controls: Language, Role Switchers & Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Selector */}
            <motion.div 
              whileHover={{ y: -1 }}
              className="relative inline-block text-left"
            >
              <div className="flex items-center gap-1.5 bg-[#EBE7DF]/80 hover:bg-[#E2DDD3] px-3 py-1.5 rounded-xl border border-[#DCD7CE] text-xs font-medium text-[#33332A] transition-colors shadow-2xs">
                <Globe2 className="w-3.5 h-3.5 text-[#5A5A40]" />
                <select
                  aria-label="Select portal language"
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value as IndicLanguage)}
                  className="bg-transparent border-none outline-hidden cursor-pointer pr-1 font-medium text-[#33332A]"
                >
                  {Object.entries(languageLabels).map(([key, lang]) => (
                    <option key={key} value={key} className="bg-[#FAF8F5] text-[#33332A]">
                      {lang.native} ({lang.english})
                    </option>
                  ))}
                </select>
              </div>
            </motion.div>

            {/* Role Switcher */}
            <motion.div 
              whileHover={{ y: -1 }}
              className="relative inline-block text-left"
            >
              <div className="flex items-center gap-1.5 bg-[#EBE7DF]/80 hover:bg-[#E2DDD3] px-3 py-1.5 rounded-xl border border-[#DCD7CE] text-xs font-medium text-[#33332A] transition-colors shadow-2xs">
                <UserCheck className="w-3.5 h-3.5 text-[#8B4513]" />
                <select
                  aria-label="Select administrative role"
                  value={userRole}
                  onChange={(e) => setUserRole(e.target.value as UserRole)}
                  className="bg-transparent border-none outline-hidden cursor-pointer pr-1 font-medium text-[#33332A]"
                >
                  <option value="REVENUE_OFFICER" className="bg-[#FAF8F5] text-[#33332A]">Tehsildar / SDM (Sanction)</option>
                  <option value="VERIFICATION_SPECIALIST" className="bg-[#FAF8F5] text-[#33332A]">Patwari / Lekhpal (Verifier)</option>
                  <option value="SETTLEMENT_OFFICER" className="bg-[#FAF8F5] text-[#33332A]">Settlement Officer (Cadastral)</option>
                  <option value="CITIZEN_VIEWER" className="bg-[#FAF8F5] text-[#33332A]">Citizen (Public Record View)</option>
                </select>
              </div>
            </motion.div>

            {/* Current Officer / User Profile Badge */}
            {currentUser && (
              <motion.div 
                whileHover={{ y: -1 }}
                className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#FAF8F5] border border-[#DCD7CE] text-xs shadow-2xs"
              >
                <div className="w-6 h-6 rounded-full bg-[#5A5A40] text-[#FFF9EA] text-[10px] font-bold flex items-center justify-center shrink-0">
                  {currentUser.avatarInitials}
                </div>
                <div className="text-left leading-tight">
                  <div className="font-bold text-[#33332A] truncate max-w-[120px]">{currentUser.name}</div>
                  <div className="text-[10px] text-[#6B6B58] truncate max-w-[120px] font-mono">{currentUser.terminalId}</div>
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
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#DCD7CE] bg-[#FAF8F5] hover:bg-[#FDF0ED] hover:border-[#F2C2BA] text-xs font-semibold text-[#8B0000] transition-all shadow-2xs cursor-pointer group"
              title="Log out and exit from revenue portal"
            >
              <LogOut className="w-3.5 h-3.5 text-[#8B0000] group-hover:-translate-x-0.5 transition-transform" />
              <span className="hidden sm:inline">Logout</span>
            </motion.button>
          </div>
        </div>

        {/* Modern Animated Tab Navigation Menu */}
        <nav className="flex space-x-1 sm:space-x-1.5 overflow-x-auto py-2 border-t border-[#DCD7CE]/70 scrollbar-none" aria-label="Tabs">
          {navTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`tab-btn-${tab.id}`}
                onClick={() => setCurrentTab(tab.id)}
                className={`relative flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-medium rounded-xl transition-colors whitespace-nowrap cursor-pointer z-10 ${
                  isActive ? 'text-[#FFF9EA] font-semibold' : 'text-[#5A5A40] hover:text-[#33332A]'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabBadge"
                    className="absolute inset-0 bg-[#5A5A40] rounded-xl shadow-xs -z-10"
                    transition={{ type: 'spring', bounce: 0.18, duration: 0.35 }}
                  />
                )}
                <Icon className={`w-4 h-4 transition-transform duration-200 ${isActive ? 'scale-105 text-[#FFF9EA]' : 'text-[#5A5A40]'}`} />
                <span>{tab.label}</span>
                {tab.count !== undefined && tab.count > 0 && (
                  <span className="relative flex items-center justify-center ml-1">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E5C37A] opacity-50"></span>
                    <span className="relative inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-[#8B4513] text-[#FFF9EA]">
                      {tab.count}
                    </span>
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Logout Confirmation Dialog Modal with Spring Physics */}
      <AnimatePresence>
        {isLogoutConfirmOpen && (
          <motion.div 
            id="modal-logout-confirm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#33332A]/50 backdrop-blur-sm"
          >
            <motion.div 
              role="dialog"
              aria-modal="true"
              aria-labelledby="logout-dialog-title"
              initial={{ scale: 0.94, opacity: 0, y: 8 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 8 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="bg-[#FAF8F5] rounded-2xl border border-[#DCD7CE] max-w-md w-full shadow-2xl p-6 space-y-4"
            >
              <div className="flex items-start justify-between">
                <div className="w-11 h-11 rounded-xl bg-[#FDF0ED] border border-[#F2C2BA] text-[#8B0000] flex items-center justify-center shadow-2xs">
                  <LogOut className="w-5 h-5" />
                </div>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsLogoutConfirmOpen(false)}
                  className="text-[#6B6B58] hover:text-[#33332A] p-1.5 rounded-lg hover:bg-[#EBE7DF] cursor-pointer transition-colors"
                  aria-label="Close dialog"
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>

              <div className="space-y-1">
                <h3 id="logout-dialog-title" className="text-base font-bold text-[#33332A] natural-serif">
                  Confirm Exit from Revenue Portal
                </h3>
                <p className="text-xs text-[#5A5A40] leading-relaxed">
                  You are about to terminate your active administrative session and disconnect from the Digital India Land Records Modernization network.
                </p>
              </div>

              {currentUser && (
                <div className="bg-[#F5F3EE] p-3.5 rounded-xl border border-[#DCD7CE] text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[#6B6B58]">Officer Name:</span>
                    <span className="font-bold text-[#33332A]">{currentUser.name}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#6B6B58]">Designation:</span>
                    <span className="font-medium text-[#4A3728] text-right truncate max-w-[200px]">{currentUser.designation}</span>
                  </div>
                  <div className="flex items-center justify-between font-mono text-[11px] pt-1 border-t border-[#DCD7CE]/60">
                    <span className="text-[#6B6B58] flex items-center gap-1">
                      <Terminal className="w-3 h-3" /> Terminal ID:
                    </span>
                    <span className="text-[#5A5A40] font-semibold">{currentUser.terminalId}</span>
                  </div>
                </div>
              )}

              <div className="text-[11px] text-[#8B4513] bg-[#FFF9EA] p-3 rounded-xl border border-[#DCD7CE] flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-[#8B4513] shrink-0 mt-0.5" />
                <span className="leading-snug">
                  Audit Trail Notice: Session logs, pending validation tokens, and cryptographic signatures have been registered with the Central Master Database.
                </span>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  id="btn-cancel-logout"
                  type="button"
                  onClick={() => setIsLogoutConfirmOpen(false)}
                  className="px-4 py-2 rounded-xl border border-[#DCD7CE] bg-[#EBE7DF] hover:bg-[#E2DDD3] text-xs font-semibold text-[#33332A] cursor-pointer transition-colors shadow-2xs"
                >
                  Stay Signed In
                </button>
                <button
                  id="btn-confirm-logout"
                  type="button"
                  onClick={() => {
                    setIsLogoutConfirmOpen(false);
                    onLogout();
                  }}
                  className="px-4 py-2 rounded-xl bg-[#8B0000] hover:bg-[#6D0000] text-[#FFF9EA] text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Log Out &amp; Exit</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
