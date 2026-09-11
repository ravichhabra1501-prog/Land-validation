import React, { useState } from 'react';
import { 
  Building2, 
  ShieldCheck, 
  Lock, 
  KeyRound, 
  User, 
  UserCheck, 
  Sparkles, 
  Layers, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Eye, 
  EyeOff, 
  Globe2, 
  BadgeCheck, 
  Fingerprint, 
  ShieldAlert,
  Info,
  RefreshCw,
  FileText
} from 'lucide-react';
import { AuthUser, UserRole, IndicLanguage } from '../types';
import { PRESET_OFFICER_PERSONAS } from '../data/authPersonas';

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
  const [authMode, setAuthMode] = useState<'PERSONA' | 'CREDENTIALS' | 'SSO'>('PERSONA');
  
  // Credentials Form States
  const [officerId, setOfficerId] = useState<string>('alok.srivastava@nic.in');
  const [password, setPassword] = useState<string>('••••••••••••');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>('REVENUE_OFFICER');
  const [captchaAnswer, setCaptchaAnswer] = useState<string>('');
  const [captchaNum1, setCaptchaNum1] = useState<number>(8);
  const [captchaNum2, setCaptchaNum2] = useState<number>(5);
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
    setCaptchaNum1(Math.floor(Math.random() * 9) + 2);
    setCaptchaNum2(Math.floor(Math.random() * 9) + 2);
    setCaptchaAnswer('');
    setErrorMessage(null);
  };

  const handleCredentialsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!officerId.trim()) {
      setErrorMessage('Please enter your Officer ID or government email address.');
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
    }, 600);
  };

  const handlePersonaLogin = (role: UserRole) => {
    setIsLoading(true);
    setTimeout(() => {
      const preset = PRESET_OFFICER_PERSONAS[role];
      const userWithTime: AuthUser = {
        ...preset,
        loginTimestamp: new Date().toISOString()
      };
      setIsLoading(false);
      onLogin(userWithTime);
    }, 350);
  };

  const handleSsoLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      const ssoUser: AuthUser = {
        id: 'GOI-SSO-PARICHAY-904',
        name: 'Alok Srivastava (IAS)',
        email: 'alok.srivastava@nic.in',
        role: 'REVENUE_OFFICER',
        designation: 'Sub-Divisional Magistrate & Revenue Collector',
        jurisdiction: 'District Collectorate & Revenue Courts',
        terminalId: 'PARICHAY-SSO-NODE-01',
        loginTimestamp: new Date().toISOString(),
        avatarInitials: 'AS',
        badgeNumber: 'GOI-NIC-SSO-904',
        digitalTokenId: 'PARICHAY-AUTH-TOKEN-2026'
      };
      setIsLoading(false);
      onLogin(ssoUser);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#F5F3EE] flex flex-col justify-between text-[#33332A] selection:bg-[#EBE7DF] selection:text-[#4A3728]">
      {/* Main Login Area */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-10">
        <div className="w-full max-w-4xl bg-[#FAF8F5] rounded-2xl border border-[#DCD7CE] shadow-lg overflow-hidden space-y-0 relative">
          {/* Top Right Quick Controls */}
          <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-[#EBE7DF] px-2.5 py-1 rounded-lg border border-[#DCD7CE] text-xs text-[#33332A] shadow-2xs">
              <Globe2 className="w-3.5 h-3.5 text-[#8B4513]" />
              <select
                aria-label="Select portal language"
                value={selectedLanguage}
                onChange={(e) => onLanguageChange(e.target.value as IndicLanguage)}
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
                  BhumiRecord AI
                </h1>
                <span className="bg-[#FFF9EA] text-[#8B4513] text-xs font-bold px-2.5 py-0.5 rounded-full border border-[#DCD7CE]">
                  DILRMP v3.8
                </span>
              </div>
              <p className="text-sm font-semibold text-[#5A5A40] mt-1">
                National Land Records Modernization &amp; Intelligent Verification Portal
              </p>
              <p className="text-xs text-[#6B6B58] max-w-xl mx-auto mt-0.5">
                Authorized access for Revenue Courts, Sub-Divisional Magistrates, Settlement Officers, Patwaris, and Citizen Landowners
              </p>
            </div>

            {/* Authentication Mode Tabs */}
            <div className="flex justify-center pt-2">
              <div className="inline-flex p-1 rounded-xl bg-[#EBE7DF] border border-[#DCD7CE] text-xs font-semibold text-[#5A5A40]">
                <button
                  id="tab-login-personas"
                  type="button"
                  onClick={() => setAuthMode('PERSONA')}
                  className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                    authMode === 'PERSONA'
                      ? 'bg-[#5A5A40] text-[#FFF9EA] shadow-2xs'
                      : 'hover:text-[#33332A]'
                  }`}
                >
                  <BadgeCheck className="w-3.5 h-3.5" />
                  <span>Quick Officer Access</span>
                </button>

                <button
                  id="tab-login-credentials"
                  type="button"
                  onClick={() => setAuthMode('CREDENTIALS')}
                  className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                    authMode === 'CREDENTIALS'
                      ? 'bg-[#5A5A40] text-[#FFF9EA] shadow-2xs'
                      : 'hover:text-[#33332A]'
                  }`}
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Officer ID &amp; Password</span>
                </button>

                <button
                  id="tab-login-sso"
                  type="button"
                  onClick={() => setAuthMode('SSO')}
                  className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                    authMode === 'SSO'
                      ? 'bg-[#5A5A40] text-[#FFF9EA] shadow-2xs'
                      : 'hover:text-[#33332A]'
                  }`}
                >
                  <Fingerprint className="w-3.5 h-3.5" />
                  <span>National SSO (Parichay)</span>
                </button>
              </div>
            </div>
          </div>

          {/* Tab Content 1: Quick Officer Persona Cards */}
          {authMode === 'PERSONA' && (
            <div className="p-6 sm:p-8 space-y-5">
              <div className="text-center">
                <span className="text-xs font-bold text-[#5A5A40] uppercase tracking-wider">
                  Select an authorized administrative persona to enter the portal instantly
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Persona 1: SDM / Tehsildar */}
                <div 
                  id="card-persona-sdm"
                  onClick={() => handlePersonaLogin('REVENUE_OFFICER')}
                  className="p-4 rounded-xl border border-[#DCD7CE] bg-[#F5F3EE] hover:bg-[#EBE7DF] hover:border-[#8B4513] transition-all cursor-pointer group shadow-2xs space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#FFF9EA] text-[#8B4513] border border-[#DCD7CE] flex items-center justify-center font-bold text-sm">
                        AS
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-bold text-[#33332A] group-hover:text-[#8B4513] transition-colors natural-serif">
                            Alok Srivastava
                          </h3>
                          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-[#FFF9EA] text-[#8B4513] border border-[#DCD7CE]">
                            Sanctioning Head
                          </span>
                        </div>
                        <p className="text-xs text-[#5A5A40] font-medium">Sub-Divisional Magistrate (SDM) &amp; Tehsildar</p>
                      </div>
                    </div>
                  </div>

                  <div className="text-[11px] text-[#6B6B58] space-y-0.5 border-t border-[#DCD7CE] pt-2">
                    <div>Jurisdiction: <strong>Tehsil Sadar, Lucknow Division</strong></div>
                    <div>Permissions: <strong>Digital Signature Sanction (DSC), Court Stay Audits</strong></div>
                  </div>

                  <div className="pt-1 flex items-center justify-between">
                    <span className="text-[10px] text-[#8B4513] font-mono">ID: OFF-REV-094</span>
                    <span className="text-xs font-bold text-[#8B4513] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      Enter as SDM <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>

                {/* Persona 2: Patwari / Lekhpal */}
                <div 
                  id="card-persona-patwari"
                  onClick={() => handlePersonaLogin('VERIFICATION_SPECIALIST')}
                  className="p-4 rounded-xl border border-[#DCD7CE] bg-[#F5F3EE] hover:bg-[#EBE7DF] hover:border-[#3D5A40] transition-all cursor-pointer group shadow-2xs space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#EAF2EB] text-[#3D5A40] border border-[#BCD4C0] flex items-center justify-center font-bold text-sm">
                        RS
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-bold text-[#33332A] group-hover:text-[#3D5A40] transition-colors natural-serif">
                            Rajesh Kumar Sharma
                          </h3>
                          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-[#EAF2EB] text-[#3D5A40] border border-[#BCD4C0]">
                            Field Verifier
                          </span>
                        </div>
                        <p className="text-xs text-[#5A5A40] font-medium">Senior Patwari &amp; Field Verification Specialist</p>
                      </div>
                    </div>
                  </div>

                  <div className="text-[11px] text-[#6B6B58] space-y-0.5 border-t border-[#DCD7CE] pt-2">
                    <div>Jurisdiction: <strong>Halka Rampur &amp; Madhopur (Circle 04)</strong></div>
                    <div>Permissions: <strong>OCR/HWR Correction, Field Notes &amp; Rectification</strong></div>
                  </div>

                  <div className="pt-1 flex items-center justify-between">
                    <span className="text-[10px] text-[#3D5A40] font-mono">ID: SPEC-PAT-108</span>
                    <span className="text-xs font-bold text-[#3D5A40] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      Enter as Patwari <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>

                {/* Persona 3: Settlement Officer */}
                <div 
                  id="card-persona-settlement"
                  onClick={() => handlePersonaLogin('SETTLEMENT_OFFICER')}
                  className="p-4 rounded-xl border border-[#DCD7CE] bg-[#F5F3EE] hover:bg-[#EBE7DF] hover:border-[#5A5A40] transition-all cursor-pointer group shadow-2xs space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#EBE7DF] text-[#4A3728] border border-[#DCD7CE] flex items-center justify-center font-bold text-sm">
                        PN
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-bold text-[#33332A] natural-serif">
                            Dr. Priya Nair
                          </h3>
                          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-[#EBE7DF] text-[#4A3728] border border-[#DCD7CE]">
                            Cadastral GIS
                          </span>
                        </div>
                        <p className="text-xs text-[#5A5A40] font-medium">Settlement &amp; Cadastral GIS Officer</p>
                      </div>
                    </div>
                  </div>

                  <div className="text-[11px] text-[#6B6B58] space-y-0.5 border-t border-[#DCD7CE] pt-2">
                    <div>Jurisdiction: <strong>Directorate of Land Records &amp; Surveys</strong></div>
                    <div>Permissions: <strong>Cadastral GIS (भू-नक्शा), Boundary Reconciliation</strong></div>
                  </div>

                  <div className="pt-1 flex items-center justify-between">
                    <span className="text-[10px] text-[#5A5A40] font-mono">ID: CAD-SETT-042</span>
                    <span className="text-xs font-bold text-[#5A5A40] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      Enter as Settlement Officer <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>

                {/* Persona 4: Citizen Landowner */}
                <div 
                  id="card-persona-citizen"
                  onClick={() => handlePersonaLogin('CITIZEN_VIEWER')}
                  className="p-4 rounded-xl border border-[#DCD7CE] bg-[#F5F3EE] hover:bg-[#EBE7DF] hover:border-[#6B6B58] transition-all cursor-pointer group shadow-2xs space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#FAF8F5] text-[#5A5A40] border border-[#DCD7CE] flex items-center justify-center font-bold text-sm">
                        VD
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-bold text-[#33332A] natural-serif">
                            Vikramjit Singh Dhillon
                          </h3>
                          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-[#FAF8F5] text-[#5A5A40] border border-[#DCD7CE]">
                            Citizen View
                          </span>
                        </div>
                        <p className="text-xs text-[#5A5A40] font-medium">Registered Agricultural Landowner (Khatedar)</p>
                      </div>
                    </div>
                  </div>

                  <div className="text-[11px] text-[#6B6B58] space-y-0.5 border-t border-[#DCD7CE] pt-2">
                    <div>Jurisdiction: <strong>Village Madhopur &amp; Rampur, Tehsil Sadar</strong></div>
                    <div>Permissions: <strong>Public Record Inspection, RoR / Bhulekh Verification</strong></div>
                  </div>

                  <div className="pt-1 flex items-center justify-between">
                    <span className="text-[10px] text-[#6B6B58] font-mono">ID: CIT-IND-771</span>
                    <span className="text-xs font-bold text-[#6B6B58] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      Enter Citizen Portal <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab Content 2: Credentials Form */}
          {authMode === 'CREDENTIALS' && (
            <form onSubmit={handleCredentialsSubmit} className="p-6 sm:p-8 space-y-4 max-w-lg mx-auto">
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
                  <span>Government Officer ID / NIC Email</span>
                </label>
                <input
                  id="input-officer-id"
                  type="text"
                  value={officerId}
                  onChange={(e) => setOfficerId(e.target.value)}
                  placeholder="e.g. alok.srivastava@nic.in"
                  className="w-full px-3.5 py-2 rounded-xl border border-[#DCD7CE] bg-[#FAF8F5] text-xs text-[#33332A] focus:outline-hidden focus:border-[#8B4513] shadow-2xs font-mono"
                  required
                />
              </div>

              {/* Password */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#33332A] flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5 text-[#5A5A40]" />
                  <span>Password / Secret Passkey</span>
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
                  <span>Role Classification</span>
                </label>
                <select
                  id="select-officer-role"
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value as UserRole)}
                  className="w-full px-3 py-2 rounded-xl border border-[#DCD7CE] bg-[#FAF8F5] text-xs font-medium text-[#33332A] focus:outline-hidden focus:border-[#8B4513] shadow-2xs cursor-pointer"
                >
                  <option value="REVENUE_OFFICER">Tehsildar / Sub-Divisional Magistrate (Sanction)</option>
                  <option value="VERIFICATION_SPECIALIST">Patwari / Lekhpal (Verification Specialist)</option>
                  <option value="SETTLEMENT_OFFICER">Settlement Officer (Cadastral GIS)</option>
                  <option value="CITIZEN_VIEWER">Citizen Landowner (Public Portal)</option>
                </select>
              </div>

              {/* Security Captcha Challenge */}
              <div className="space-y-1 bg-[#F5F3EE] p-3 rounded-xl border border-[#DCD7CE]">
                <div className="flex items-center justify-between text-xs font-bold text-[#33332A]">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#8B4513]" />
                    <span>Security Verification</span>
                  </span>
                  <button
                    type="button"
                    onClick={refreshCaptcha}
                    className="text-[11px] text-[#5A5A40] hover:text-[#33332A] flex items-center gap-1 cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Refresh</span>
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
                    <span>Verifying Credentials &amp; Terminal...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Authenticate &amp; Enter Portal</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* Tab Content 3: MeriPehchan / Jan Parichay National SSO */}
          {authMode === 'SSO' && (
            <div className="p-6 sm:p-8 space-y-5 max-w-md mx-auto text-center">
              <div className="w-16 h-16 rounded-2xl bg-[#FFF9EA] text-[#8B4513] border border-[#DCD7CE] flex items-center justify-center mx-auto shadow-xs">
                <Fingerprint className="w-8 h-8 text-[#8B4513]" />
              </div>

              <div className="space-y-1">
                <h3 className="text-base font-bold text-[#33332A] natural-serif">
                  MeriPehchan • National Single Sign-On (NSSO)
                </h3>
                <p className="text-xs text-[#5A5A40]">
                  Jan Parichay federated identity service managed by National Informatics Centre (NIC)
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#F5F3EE] border border-[#DCD7CE] text-left text-xs space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold text-[#33332A]">
                  <CheckCircle2 className="w-4 h-4 text-[#3D5A40]" />
                  <span>Features of GOI National SSO:</span>
                </div>
                <ul className="text-[11px] text-[#6B6B58] list-disc list-inside space-y-1 pl-1">
                  <li>Single credentials across all State Revenue &amp; DILRMP Portals</li>
                  <li>e-Pramaan cryptographic 2-factor token authentication</li>
                  <li>Direct integration with Digilocker and National Land Records Index</li>
                </ul>
              </div>

              <button
                id="btn-meripehchan-sso"
                type="button"
                disabled={isLoading}
                onClick={handleSsoLogin}
                className="w-full py-2.5 rounded-xl bg-[#8B4513] hover:bg-[#6D340E] text-[#FFF9EA] text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-[#FFF9EA]" />
                    <span>Connecting to Jan Parichay Gate...</span>
                  </>
                ) : (
                  <>
                    <Fingerprint className="w-4 h-4" />
                    <span>Sign in with Jan Parichay / MeriPehchan</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* Statutory Security Footer */}
          <div className="p-4 bg-[#F5F3EE] border-t border-[#DCD7CE] flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#6B6B58] gap-2">
            <div className="flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-[#8B4513] shrink-0" />
              <span>Statutory Compliance: Information Technology Act 2000 &amp; DILRMP Guidelines</span>
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
          Digital India Land Records Modernization Programme (DILRMP) • Ministry of Rural Development, Govt. of India
        </p>
        <p className="text-[10px] text-[#A3A390] mt-0.5">
          For technical assistance, contact Revenue Administration Helpdesk at helpdesk-dilrmp@nic.in
        </p>
      </div>
    </div>
  );
};
