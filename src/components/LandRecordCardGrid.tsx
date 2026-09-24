import React from 'react';
import { 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  ChevronRight, 
  MapPin, 
  ShieldCheck, 
  Landmark,
  Scale,
  Calendar,
  Layers
} from 'lucide-react';
import { ExtractedLandRecord } from '../types';
import { getStateLandFormat } from '../data/stateLandFormats';

interface LandRecordCardGridProps {
  records: ExtractedLandRecord[];
  selectedRecordIds: string[];
  onToggleSelectRecord: (recordId: string) => void;
  onSelectRecord: (record: ExtractedLandRecord) => void;
  onOpenDirectoryModal: () => void;
}

export const LandRecordCardGrid: React.FC<LandRecordCardGridProps> = ({
  records,
  selectedRecordIds,
  onToggleSelectRecord,
  onSelectRecord,
  onOpenDirectoryModal
}) => {
  if (records.length === 0) {
    return (
      <div className="text-center py-12 px-4 text-slate-400 text-xs bg-[#090E1A]/80 rounded-xl border border-slate-800">
        <Landmark className="w-8 h-8 mx-auto text-slate-600 mb-2" />
        <p className="font-semibold text-slate-200 text-sm">No land records found</p>
        <p className="text-slate-400 mt-1">Try adjusting your state filter, search keywords, or format criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
      {records.map((record) => {
        const isSelected = selectedRecordIds.includes(record.id);
        const isVerified = record.status === 'VERIFIED_AND_SANCTIONED';
        const format = getStateLandFormat(record.state.value, record.documentType);
        const hasLien = record.encumbranceStatus.value !== 'CLEAR_NO_ENCUMBRANCES';

        return (
          <div
            key={record.id}
            onClick={() => onSelectRecord(record)}
            className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between group backdrop-blur-md ${
              isSelected
                ? 'bg-[#0F1B38]/90 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.3)] ring-1 ring-cyan-400/50'
                : 'bg-[#090E1A]/90 border-slate-800 hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]'
            }`}
          >
            {/* Card Header with State Land Format Pill & Selection */}
            <div>
              <div className="flex items-start justify-between gap-2 pb-2.5 border-b border-slate-800">
                <div className="flex items-start gap-2">
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleSelectRecord(record.id);
                    }}
                    className="pt-0.5 cursor-pointer"
                    title={isSelected ? 'Deselect parcel' : 'Select parcel for bulk action'}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => {}}
                      className="w-4 h-4 rounded text-cyan-500 accent-cyan-500 cursor-pointer bg-slate-900 border-slate-700"
                    />
                  </div>

                  <div>
                    {/* Official State Format Badge */}
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-xs font-bold text-slate-100 natural-serif">
                        {record.state.value}
                      </span>
                      <span 
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-950/80 text-cyan-300 border border-cyan-500/40 font-mono shadow-[0_0_8px_rgba(6,182,212,0.15)]"
                        title={`${format.statutoryAct} • ${format.portalUrl}`}
                      >
                        <Landmark className="w-2.5 h-2.5 shrink-0 text-cyan-400" />
                        <span>{format.formatShort}</span>
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                      {format.formCode}
                    </p>
                  </div>
                </div>

                {/* Status Badge */}
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold font-mono ${
                  isVerified
                    ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 shadow-[0_0_8px_rgba(16,185,129,0.2)]'
                    : 'bg-amber-950/80 text-amber-300 border border-amber-500/40 shadow-[0_0_8px_rgba(245,158,11,0.2)]'
                }`}>
                  {isVerified ? (
                    <>
                      <ShieldCheck className="w-3 h-3 text-emerald-400" />
                      <span>Sanctioned</span>
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="w-3 h-3 text-amber-400" />
                      <span>Review</span>
                    </>
                  )}
                </span>
              </div>

              {/* Record Key Details */}
              <div className="pt-3 space-y-2 text-xs">
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-xs font-bold text-cyan-300 group-hover:text-cyan-200 transition-colors">
                    {record.documentNumber}
                  </span>
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold ${
                    record.overallConfidence >= 90
                      ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40'
                      : 'bg-amber-950/80 text-amber-300 border border-amber-500/40'
                  }`}>
                    {record.overallConfidence}% AI
                  </span>
                </div>

                <div className="bg-[#0D152A] p-2.5 rounded-lg border border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="text-slate-400">Parcel / Khasra:</span>
                    <span className="font-bold text-slate-100 font-mono">{record.khasraNumber.value}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="text-slate-400">Khata Roll:</span>
                    <span className="font-medium text-slate-200 font-mono">{record.khataNumber.value}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="text-slate-400">Primary Holder:</span>
                    <span className="font-semibold text-slate-100 truncate max-w-[150px]">{record.primaryOwnerName.value}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] pt-1 text-slate-400">
                  <div className="flex items-center gap-1 truncate max-w-[170px]">
                    <MapPin className="w-3 h-3 text-cyan-400 shrink-0" />
                    <span>{record.village.value}, {record.district.value}</span>
                  </div>
                  <div className="font-bold text-slate-200 font-mono">
                    {record.totalAreaDeclared.value} {record.declaredUnit.value}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Lien status & Action */}
            <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between text-xs">
              <div>
                {hasLien ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-400 font-mono">
                    <AlertTriangle className="w-3 h-3" />
                    <span className="truncate max-w-[140px]">{record.encumbranceStatus.value.replace(/_/g, ' ')}</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-400 font-mono">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Clear Freehold</span>
                  </span>
                )}
              </div>

              <div className="inline-flex items-center gap-1 text-cyan-400 group-hover:text-cyan-300 font-medium text-[11px]">
                <span>Inspect</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
