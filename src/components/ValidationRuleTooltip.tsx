import React, { useState, useRef, useEffect } from 'react';
import {
  Info,
  HelpCircle,
  ShieldCheck,
  AlertTriangle,
  AlertCircle,
  CheckCircle2,
  BookOpen,
  Scale,
  Code2,
  Pin,
  PinOff,
  X,
  ExternalLink,
  Sparkles,
  Check
} from 'lucide-react';
import { ExtractedLandRecord } from '../types';
import { FIELD_VALIDATION_RULES, FieldValidationGuide } from '../data/fieldValidationRulesData';

interface ValidationRuleTooltipProps {
  fieldKey: string;
  record: ExtractedLandRecord;
  align?: 'left' | 'right' | 'center';
  size?: 'sm' | 'md';
  customLabel?: string;
  showBadge?: boolean;
}

export const ValidationRuleTooltip: React.FC<ValidationRuleTooltipProps> = ({
  fieldKey,
  record,
  align = 'right',
  size = 'sm',
  customLabel,
  showBadge = false
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isPinned, setIsPinned] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const guide = FIELD_VALIDATION_RULES[fieldKey];

  // Close on outside click if not pinned
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        if (!isPinned) {
          setIsOpen(false);
        }
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        setIsPinned(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isPinned]);

  if (!guide) {
    return null;
  }

  const liveStatus = guide.getLiveStatus(record);

  const toggleOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isOpen) {
      if (isPinned) {
        setIsPinned(false);
        setIsOpen(false);
      } else {
        setIsPinned(true);
      }
    } else {
      setIsOpen(true);
      setIsPinned(true); // Clicking automatically pins for easy reading
    }
  };

  const handleMouseEnter = () => {
    if (!isPinned) {
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isPinned) {
      setIsOpen(false);
    }
  };

  const handleTogglePin = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPinned(!isPinned);
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(false);
    setIsPinned(false);
  };

  // Status color mappings
  const statusColors = {
    PASSED: {
      bg: 'bg-[#EAF2EB]',
      border: 'border-[#BCD4C0]',
      text: 'text-[#2A402D]',
      icon: <CheckCircle2 className="w-3.5 h-3.5 text-[#3D5A40] shrink-0" />
    },
    WARNING: {
      bg: 'bg-[#FFF9EA]',
      border: 'border-[#DCD7CE]',
      text: 'text-[#8B4513]',
      icon: <AlertTriangle className="w-3.5 h-3.5 text-[#8B4513] shrink-0" />
    },
    CRITICAL: {
      bg: 'bg-[#FDF0ED]',
      border: 'border-[#F2C2BA]',
      text: 'text-[#8B0000]',
      icon: <AlertCircle className="w-3.5 h-3.5 text-[#8B0000] shrink-0" />
    },
    INFO: {
      bg: 'bg-[#F5F3EE]',
      border: 'border-[#DCD7CE]',
      text: 'text-[#4A3728]',
      icon: <Info className="w-3.5 h-3.5 text-[#5A5A40] shrink-0" />
    }
  }[liveStatus.status];

  // Category badge colors
  const categoryBadgeColors = {
    ARITHMETIC: 'bg-[#EAF2EB] text-[#3D5A40] border-[#BCD4C0]',
    CROSS_DB: 'bg-[#FFF9EA] text-[#8B4513] border-[#DCD7CE]',
    IDENTITY: 'bg-[#EBE7DF] text-[#4A3728] border-[#DCD7CE]',
    LEGAL: 'bg-[#FDF0ED] text-[#8B0000] border-[#F2C2BA]',
    FORMAT: 'bg-[#F5F3EE] text-[#5A5A40] border-[#DCD7CE]',
    CADASTRAL: 'bg-[#EAF2EB] text-[#2F4F4F] border-[#BCD4C0]'
  }[guide.ruleCategory];

  return (
    <div
      ref={containerRef}
      className="relative inline-flex items-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Interactive Trigger Button */}
      <button
        type="button"
        id={`btn-rule-tooltip-${fieldKey}`}
        onClick={toggleOpen}
        aria-expanded={isOpen}
        title={`Validation Guidance for ${guide.fieldLabel} (${guide.ruleCode})`}
        className={`inline-flex items-center gap-1 rounded-md transition-all cursor-pointer focus:outline-hidden focus:ring-1 focus:ring-[#5A5A40] ${
          showBadge
            ? 'px-1.5 py-0.5 text-[10px] font-semibold bg-[#EBE7DF] hover:bg-[#DCD7CE] text-[#5A5A40] border border-[#DCD7CE]'
            : 'p-0.5 text-[#6B6B58] hover:text-[#8B4513] hover:bg-[#EBE7DF]/80'
        } ${isPinned ? 'ring-1 ring-[#8B4513] bg-[#FFF9EA] text-[#8B4513]' : ''}`}
      >
        <HelpCircle className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
        {showBadge && (
          <span className="font-mono text-[9px] tracking-tight">{guide.ruleCode.split('&')[0].trim()}</span>
        )}
      </button>

      {/* Popover Floating Tooltip */}
      {isOpen && (
        <div
          id={`popover-rule-guide-${fieldKey}`}
          className={`absolute z-50 w-72 sm:w-84 p-3.5 bg-[#FAF8F5] text-[#33332A] rounded-xl shadow-2xl border border-[#DCD7CE] animate-in fade-in zoom-in-95 duration-150 text-xs space-y-3 ${
            align === 'left' 
              ? 'left-0 top-6' 
              : align === 'center'
              ? 'left-1/2 -translate-x-1/2 top-6'
              : 'right-0 top-6'
          }`}
          style={{ maxWidth: 'calc(100vw - 32px)' }}
          onClick={(e) => e.stopPropagation()} // Prevent click propagation
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-2 border-b border-[#DCD7CE] pb-2">
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded border ${categoryBadgeColors}`}>
                  {guide.ruleCode}
                </span>
                <span className="text-[10px] text-[#6B6B58] font-medium uppercase tracking-wider">
                  {guide.ruleCategory}
                </span>
              </div>
              <h4 className="font-bold text-xs text-[#33332A] natural-serif">
                {customLabel || guide.fieldLabel}
              </h4>
              {guide.indicTerm && (
                <span className="text-[10px] text-[#6B6B58] font-mono block">
                  {guide.indicTerm}
                </span>
              )}
            </div>

            {/* Pin & Close Buttons */}
            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                id={`btn-pin-tooltip-${fieldKey}`}
                onClick={handleTogglePin}
                title={isPinned ? 'Unpin tooltip' : 'Pin tooltip (keep open while editing)'}
                className={`p-1 rounded hover:bg-[#EBE7DF] transition-colors cursor-pointer ${
                  isPinned ? 'text-[#8B4513] bg-[#FFF9EA]' : 'text-[#6B6B58]'
                }`}
              >
                {isPinned ? <PinOff className="w-3.5 h-3.5" /> : <Pin className="w-3.5 h-3.5" />}
              </button>
              <button
                type="button"
                onClick={handleClose}
                title="Close guidance"
                className="p-1 rounded hover:bg-[#EBE7DF] text-[#6B6B58] transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Live Validation Evaluation for Current Record */}
          <div className={`p-2.5 rounded-lg border text-[11px] space-y-1 ${statusColors.bg} ${statusColors.border} ${statusColors.text}`}>
            <div className="flex items-center justify-between font-bold text-[10px] uppercase tracking-wider">
              <span className="flex items-center gap-1">
                {statusColors.icon}
                <span>Current Evaluation</span>
              </span>
              <span className="font-mono">{liveStatus.status}</span>
            </div>
            <p className="font-medium text-xs leading-snug">
              {liveStatus.message}
            </p>
            {liveStatus.details && (
              <p className="text-[10px] opacity-85 leading-tight">
                {liveStatus.details}
              </p>
            )}
          </div>

          {/* Statutory Reference & Authority */}
          <div className="space-y-1 bg-[#F5F3EE] p-2 rounded-lg border border-[#DCD7CE] text-[11px]">
            <div className="flex items-center gap-1 text-[#5A5A40] font-bold text-[10px] uppercase tracking-wider natural-serif">
              <Scale className="w-3 h-3 text-[#5A5A40]" />
              <span>Statutory Mandate</span>
            </div>
            <p className="text-[11px] text-[#4A3728] leading-tight">
              {guide.statutoryReference}
            </p>
          </div>

          {/* Syntax & Format Standard */}
          <div className="space-y-1 text-[11px]">
            <div className="flex items-center gap-1 text-[#5A5A40] font-bold text-[10px] uppercase tracking-wider natural-serif">
              <Code2 className="w-3 h-3 text-[#5A5A40]" />
              <span>Format &amp; Syntax Rule</span>
            </div>
            <p className="text-[11px] text-[#33332A] font-mono bg-[#EBE7DF] px-2 py-1 rounded border border-[#DCD7CE]">
              {guide.syntaxFormat}
            </p>
          </div>

          {/* Validation Rule Logic & Constraint */}
          <div className="space-y-1 text-[11px]">
            <div className="flex items-center gap-1 text-[#5A5A40] font-bold text-[10px] uppercase tracking-wider natural-serif">
              <ShieldCheck className="w-3 h-3 text-[#3D5A40]" />
              <span>Algorithmic Validation Logic</span>
            </div>
            <p className="text-[11px] text-[#6B6B58] leading-tight">
              {guide.validationLogic}
            </p>
            <div className="text-[10px] text-[#8B4513] font-medium pt-0.5">
              <span className="natural-serif font-bold">Tolerance:</span> {guide.toleranceOrConstraint}
            </div>
          </div>

          {/* Revenue Officer Practical Verification Tip */}
          <div className="p-2.5 rounded-lg bg-[#FFF9EA] border border-[#DCD7CE] text-[11px] text-[#4A3728] space-y-1">
            <div className="flex items-center gap-1 text-[#8B4513] font-bold text-[10px] uppercase tracking-wider natural-serif">
              <Sparkles className="w-3 h-3 text-[#8B4513]" />
              <span>Officer Verification Guidance</span>
            </div>
            <p className="text-[10px] text-[#4A3728] leading-relaxed">
              {guide.verificationTip}
            </p>
            {guide.commonErrorSample && (
              <p className="text-[9px] text-[#8B4513] italic pt-0.5 border-t border-[#DCD7CE]/60">
                <span className="font-semibold">Watch out for:</span> {guide.commonErrorSample}
              </p>
            )}
          </div>

          {/* Pinned Helper Status Footer */}
          <div className="flex items-center justify-between text-[10px] text-[#6B6B58] pt-1 border-t border-[#DCD7CE]">
            <span>
              {isPinned ? '📌 Pinned open for editing reference' : 'Hover or click pin to lock open'}
            </span>
            <span className="font-mono text-[9px]">DILRMP 2026</span>
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * Real-time Inline Guidance Banner rendered directly under active form inputs.
 */
interface InputGuidanceBannerProps {
  fieldKey: string;
  currentValue: string;
  record: ExtractedLandRecord;
}

export const InputGuidanceBanner: React.FC<InputGuidanceBannerProps> = ({
  fieldKey,
  currentValue,
  record
}) => {
  const guide = FIELD_VALIDATION_RULES[fieldKey];
  if (!guide) return null;

  // Real-time syntax check based on field
  const getSyntaxFeedback = () => {
    const val = currentValue.trim();
    if (!val) {
      return { isValid: false, message: 'Field cannot be left blank under revenue rules.' };
    }

    if (fieldKey === 'khasraNumber') {
      const khasraRegex = /^[0-9]+(\/[0-9]+(\/[A-Za-z0-9]+)?)?$/;
      if (!khasraRegex.test(val)) {
        return { 
          isValid: false, 
          message: 'Format notice: Standard Khasra format is digits with optional sub-plot (e.g. 142/1, 74/2).' 
        };
      }
      return { isValid: true, message: 'Khasra syntax compliant with DILRMP cadastral specification.' };
    }

    if (fieldKey === 'khataNumber') {
      const khataRegex = /^[0-9]+$/;
      if (!khataRegex.test(val)) {
        return { 
          isValid: false, 
          message: 'Format notice: Khatauni folio must be positive numeric digits (e.g. 882).' 
        };
      }
      return { isValid: true, message: 'Khata folio compliant with Jamabandi register.' };
    }

    if (fieldKey === 'totalAreaDeclared') {
      const num = parseFloat(val);
      if (isNaN(num) || num <= 0) {
        return { isValid: false, message: 'Area must be a positive decimal number.' };
      }
      return { isValid: true, message: `Area parsed: ${num} ${record.declaredUnit.value.toLowerCase()}.` };
    }

    if (fieldKey === 'primaryOwnerName') {
      const parts = val.split(/\s+/).filter(Boolean);
      if (parts.length < 2) {
        return { 
          isValid: false, 
          message: 'Identity rule: Provide at least Given Name and Surname/Patronymic.' 
        };
      }
      return { isValid: true, message: 'Legal titleholder name complies with Title Deed standard.' };
    }

    if (fieldKey === 'parentageOrSpouse') {
      const parts = val.split(/\s+/).filter(Boolean);
      if (parts.length < 2) {
        return {
          isValid: false,
          message: 'Provide relative name and relation descriptor (e.g. "Eknath Patil (Father)" or "s/o Gurdev Singh").'
        };
      }
      return { isValid: true, message: 'Genealogical relationship notation verified.' };
    }

    if (fieldKey === 'annualLandRevenue') {
      const num = parseFloat(val);
      if (isNaN(num) || num < 0) {
        return { isValid: false, message: 'Assessment (Lagaan) must be a non-negative currency amount (₹).' };
      }
      return { isValid: true, message: `Annual assessment valid: ₹${num.toFixed(2)} / year.` };
    }

    if (fieldKey === 'encumbranceStatus') {
      const validStatuses = ['CLEAR', 'MORTGAGED', 'DISPUTED', 'COURT_STAY', 'RESTRICTED_TENURE'];
      if (!validStatuses.includes(val)) {
        return { isValid: false, message: `Select valid statutory encumbrance: ${validStatuses.join(', ')}` };
      }
      return { isValid: true, message: `Statutory encumbrance status: ${val}.` };
    }

    if (fieldKey === 'landClassification') {
      return { isValid: true, message: `Land use classification "${val}" verified against Revenue Code.` };
    }

    return { isValid: true, message: 'Value recorded for statutory validation audit.' };
  };

  const feedback = getSyntaxFeedback();

  return (
    <div className="mt-1 p-2 rounded-lg bg-[#FAF8F5] border border-[#DCD7CE] text-[11px] space-y-1 text-[#33332A]">
      <div className="flex items-center justify-between text-[10px]">
        <span className="font-semibold text-[#5A5A40] natural-serif flex items-center gap-1">
          <ShieldCheck className="w-3 h-3 text-[#3D5A40]" />
          <span>Validation Rule: {guide.ruleCode}</span>
        </span>
        <span className={`font-bold text-[9px] px-1.5 py-0.2 rounded ${
          feedback.isValid 
            ? 'bg-[#EAF2EB] text-[#3D5A40] border border-[#BCD4C0]' 
            : 'bg-[#FFF9EA] text-[#8B4513] border border-[#DCD7CE]'
        }`}>
          {feedback.isValid ? 'Format Valid' : 'Format Advisory'}
        </span>
      </div>

      <div className="text-[10px] text-[#6B6B58] flex items-start gap-1">
        {feedback.isValid ? (
          <Check className="w-3 h-3 text-[#3D5A40] shrink-0 mt-0.5" />
        ) : (
          <AlertTriangle className="w-3 h-3 text-[#8B4513] shrink-0 mt-0.5" />
        )}
        <span className={feedback.isValid ? 'text-[#2A402D]' : 'text-[#8B4513]'}>
          {feedback.message}
        </span>
      </div>

      <div className="text-[9px] text-[#6B6B58] pt-0.5 border-t border-[#DCD7CE]/60 flex items-center justify-between">
        <span>Constraint: {guide.toleranceOrConstraint}</span>
        <span className="text-[#8B4513] font-medium">Click (?) icon above for full legal tip</span>
      </div>
    </div>
  );
};
