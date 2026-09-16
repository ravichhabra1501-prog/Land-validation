import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  KeyRound, 
  User, 
  UserCheck, 
  Layers, 
  CheckCircle2, 
  AlertCircle, 
  Eye, 
  EyeOff, 
  Globe2, 
  ShieldAlert,
  RefreshCw,
  Info
} from 'lucide-react';
import { AuthUser, UserRole, IndicLanguage } from '../types';
import { PRESET_OFFICER_PERSONAS } from '../data/authPersonas';
import { getTranslations, setStoredLanguage } from '../utils/translations';

interface LoginViewProps {
  onLogin: (user: AuthUser) => void;
  selectedLanguage: IndicLanguage;
  onLanguageChange: (lang: IndicLanguage) => void;
  loggedOutNotice?: string | null;
  onDismissNotice?: () => void;
}

export const LoginView: React.FC<LoginViewProps> = ({
  onLogin,
  selectedLanguage,
  onLanguageChange,
  loggedOutNotice,
  onDismissNotice
}) => {
  const t = getTranslations(selectedLanguage);

  // Credentials Form States
  const [officerId, setOfficerId] = useState<string>('alok.srivastava@nic.in');
  const [password, setPassword] = useState<string>('Revenue@2026');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>('REVENUE_OFFICER');
  const [captchaNum1, setCaptchaNum1] = useState<number>(8);
  const [captchaNum2, setCaptchaNum2] = useState<number>(5);
  const [captchaAnswer, setCaptchaAnswer] = useState<string>('13');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  const refreshCaptcha = () => {
    const n1 = Math.floor(Math.random() * 9) + 2;
    const n2 = Math.floor(Math.random() * 9) + 2;
    setCaptchaNum1(n1);
    setCaptchaNum2(n2);
    setCaptchaAnswer(String(n1 + n2));
    setErrorMessage(null);
  };

  const handleLanguageSelect = (lang: IndicLanguage) => {
    onLanguageChange(lang);
    setStoredLanguage(lang);
  };

  const handleRoleChange = (newRole: UserRole) => {
    setSelectedRole(newRole);
    const preset = PRESET_OFFICER_PERSONAS[newRole];
    if (preset) {
      setOfficerId(preset.email);
    }
  };

  const handleCredentialsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!officerId.trim()) {
      setErrorMessage('Please enter your Officer ID or email address.');
      return;
    }

    if (!password.trim()) {
      setErrorMessage('Please enter your security passkey or password.');
      return;
    }

    const expectedSum = captchaNum1 + captchaNum2;
    if (parseInt(captchaAnswer.trim(), 10) !== expectedSum) {
      setErrorMessage(`Security Captcha verification failed. Please solve: ${captchaNum1} + ${captchaNum2}`);
      return;
    }

    setIsLoading(true);

    // Simulate authentic government portal verification
    setTimeout(() => {
      // Find matching preset or generate auth user for role
      const basePreset = PRESET_OFFICER_PERSONAS[selectedRole];
      const customUser: AuthUser = {
        ...basePreset,
        email: officerId.includes('@') ? officerId : `${officerId}@nic.in`,
        loginTimestamp: new Date().toISOString(),
        terminalId: `SEC-TERM-${Math.floor(Math.random() * 899 + 100)}`
      };

      setIsLoading(false);
      onLogin(customUser);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#F5F3EE] flex flex-col justify-between text-[#33332A] selection:bg-[#EBE7DF] selection:text-[#4A3728]">
      {/* Main Login Area */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-10">
        <div className="w-full max-w-xl bg-[#FAF8F5] rounded-2xl border border-[#DCD7CE] shadow-lg overflow-hidden space-y-0 relative">
          {/* Top Right Language Selector */}
          <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-[#EBE7DF] px-2.5 py-1 rounded-lg border border-[#DCD7CE] text-xs text-[#33332A] shadow-2xs">
              <Globe2 className="w-3.5 h-3.5 text-[#8B4513]" />
              <select
                aria-label="Select portal language"
                value={selectedLanguage}
                onChange={(e) => handleLanguageSelect(e.target.value as IndicLanguage)}
                className="bg-transparent border-none outline-hidden cursor-pointer text-[#33332A] text-xs font-medium"
              >
                {Object.entries(languageLabels).map(([key, lang]) => (
                  <option key={key} value={key} className="bg-[#FAF8F5] text-[#33332A]">
                    {lang.native} ({lang.english})
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Logout Alert Notice Banner (if redirected after exit) */}
          {loggedOutNotice && (
            <div className="bg-[#FFF9EA] border-b border-[#DCD7CE] p-3.5 flex items-center justify-between text-xs text-[#8B4513] animate-fadeIn">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#8B4513] shrink-0" />
                <span className="font-medium">{loggedOutNotice}</span>
              </div>
              {onDismissNotice && (
                <button 
                  onClick={onDismissNotice}
                  className="text-xs font-bold text-[#8B4513] hover:underline cursor-pointer ml-3"
                >
                  Dismiss
                </button>
              )}
            </div>
          )}

          {/* Portal Header */}
          <div className="p-6 sm:p-8 bg-[#FAF8F5] border-b border-[#DCD7CE] text-center space-y-3">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#5A5A40] via-[#4A4A33] to-[#363625] text-[#FFF9EA] shadow-md border border-[#707052]/40">
              <Layers className="w-7 h-7 text-[#FFF9EA]" />
            </div>

            <div>
              <div className="flex items-center justify-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-bold text-[#33332A] natural-serif tracking-tight">
                  {t.appName}
                </h1>
                <span className="bg-[#FFF9EA] text-[#8B4513] text-xs font-bold px-2.5 py-0.5 rounded-full border border-[#DCD7CE]">
                  {t.versionBadge}
                </span>
              </div>
              <p className="text-sm font-semibold text-[#5A5A40] mt-1">
                {t.appSubtitle}
              </p>
              <p className="text-xs text-[#6B6B58] max-w-md mx-auto mt-0.5">
                {t.authorizedAccessDesc}
              </p>
            </div>
          </div>

          {/* Officer ID & Password Credentials Form */}
          <form onSubmit={handleCredentialsSubmit} className="p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between pb-1 border-b border-[#DCD7CE]">
              <span className="text-xs font-bold text-[#5A5A40] uppercase tracking-wider flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-[#8B4513]" />
                {t.officerAuthHeader}
              </span>
              <span className="text-[10px] text-[#6B6B58] font-mono">
                ISO 19152 Secure Node
              </span>
            </div>

            {errorMessage && (
              <div className="p-3 rounded-lg bg-[#FDF0ED] border border-[#F2C2BA] text-xs text-[#8B0000] flex items-center gap-2 animate-fadeIn">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Officer ID / Email */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#33332A] flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#5A5A40]" />
                <span>{t.officerIdLabel}</span>
              </label>
              <input
                id="input-officer-id"
                type="text"
                value={officerId}
                onChange={(e) => setOfficerId(e.target.value)}
                placeholder={t.officerIdPlaceholder}
                className="w-full px-3.5 py-2 rounded-xl border border-[#DCD7CE] bg-[#FAF8F5] text-xs text-[#33332A] focus:outline-hidden focus:border-[#8B4513] shadow-2xs font-mono"
                required
              />
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#33332A] flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-[#5A5A40]" />
                <span>{t.passwordLabel}</span>
              </label>
              <div className="relative">
                <input
                  id="input-officer-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3.5 py-2 pr-10 rounded-xl border border-[#DCD7CE] bg-[#FAF8F5] text-xs text-[#33332A] focus:outline-hidden focus:border-[#8B4513] shadow-2xs font-mono"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-[#6B6B58] hover:text-[#33332A] cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Administrative Role Selector */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#33332A] flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5 text-[#5A5A40]" />
                <span>{t.roleClassificationLabel}</span>
              </label>
              <select
                id="select-officer-role"
                value={selectedRole}
                onChange={(e) => handleRoleChange(e.target.value as UserRole)}
                className="w-full px-3 py-2 rounded-xl border border-[#DCD7CE] bg-[#FAF8F5] text-xs font-medium text-[#33332A] focus:outline-hidden focus:border-[#8B4513] shadow-2xs cursor-pointer"
              >
                <option value="REVENUE_OFFICER">{t.roleRevenueOfficer}</option>
                <option value="VERIFICATION_SPECIALIST">{t.roleVerificationSpecialist}</option>
                <option value="SETTLEMENT_OFFICER">{t.roleSettlementOfficer}</option>
                <option value="CITIZEN_VIEWER">{t.roleCitizenViewer}</option>
              </select>
            </div>

            {/* Security Captcha Challenge */}
            <div className="space-y-1 bg-[#F5F3EE] p-3 rounded-xl border border-[#DCD7CE]">
              <div className="flex items-center justify-between text-xs font-bold text-[#33332A]">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#8B4513]" />
                  <span>{t.securityVerification}</span>
                </span>
                <button
                  type="button"
                  onClick={refreshCaptcha}
                  className="text-[11px] text-[#5A5A40] hover:text-[#33332A] flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>{t.refreshCaptcha}</span>
                </button>
              </div>
              
              <div className="flex items-center gap-3 pt-1">
                <div className="px-4 py-1.5 bg-[#FAF8F5] border border-[#DCD7CE] rounded-lg font-mono font-bold text-sm tracking-widest text-[#4A3728] select-none">
                  {captchaNum1} + {captchaNum2} = ?
                </div>
                <input
                  id="input-captcha"
                  type="number"
                  value={captchaAnswer}
                  onChange={(e) => setCaptchaAnswer(e.target.value)}
                  placeholder="Result"
                  className="w-28 px-3 py-1.5 rounded-lg border border-[#DCD7CE] bg-[#FAF8F5] text-xs font-mono text-center font-bold text-[#33332A] focus:outline-hidden focus:border-[#8B4513]"
                  required
                />
              </div>
            </div>

            {/* Quick Guidance Note */}
            <div className="p-2.5 rounded-lg bg-[#F5F3EE] border border-[#DCD7CE] flex items-start gap-2 text-[11px] text-[#6B6B58]">
              <Info className="w-4 h-4 text-[#5A5A40] shrink-0 mt-0.5" />
              <span>
                {t.roleGuidanceNotice}
              </span>
            </div>

            {/* Submit Button */}
            <button
              id="btn-submit-credentials-login"
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 rounded-xl bg-[#5A5A40] hover:bg-[#43432F] text-[#FFF9EA] text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-[#FFF9EA]" />
                  <span>{t.verifyingBtn}</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>{t.authenticateBtn}</span>
                </>
              )}
            </button>
          </form>

          {/* Statutory Security Footer */}
          <div className="p-4 bg-[#F5F3EE] border-t border-[#DCD7CE] flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#6B6B58] gap-2">
            <div className="flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-[#8B4513] shrink-0" />
              <span>{t.statutoryCompliance}</span>
            </div>
            <div className="flex items-center gap-2 font-mono text-[10px]">
              <span>SSL/TLS 1.3 256-bit</span>
              <span>&bull;</span>
              <span>ISO 19152 Verified</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal Notice */}
      <div className="py-4 text-center text-xs text-[#707052] border-t border-[#DCD7CE] bg-[#FAF8F5]">
        <p>
          {t.programName} • {t.ministryName}
        </p>
        <p className="text-[10px] text-[#A3A390] mt-0.5">
          {t.helpdeskNotice}
        </p>
      </div>
    </div>
  );
};
