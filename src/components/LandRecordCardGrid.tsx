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
      <div className="text-center py-12 px-4 text-[#6B6B58] text-xs">
        <Landmark className="w-8 h-8 mx-auto text-[#C4BDAF] mb-2" />
        <p className="font-semibold text-[#33332A] text-sm">No land records found</p>
        <p className="text-[#6B6B58] mt-1">Try adjusting your state filter, search keywords, or format criteria.</p>
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
            className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between group ${
              isSelected
                ? 'bg-[#FFF9EA] border-[#C4BDAF] ring-1 ring-[#C4BDAF] shadow-xs'
                : 'bg-[#FAF8F5] border-[#DCD7CE] hover:border-[#C4BDAF] hover:shadow-xs'
            }`}
          >
            {/* Card Header with State Land Format Pill & Selection */}
            <div>
              <div className="flex items-start justify-between gap-2 pb-2.5 border-b border-[#DCD7CE]/60">
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
                      className="w-4 h-4 rounded text-[#5A5A40] accent-[#5A5A40] cursor-pointer"
                    />
                  </div>

                  <div>
                    {/* Official State Format Badge */}
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-xs font-bold text-[#33332A] natural-serif">
                        {record.state.value}
                      </span>
                      <span 
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold border ${format.badgeBg} ${format.badgeText} ${format.badgeBorder}`}
                        title={`${format.statutoryAct} • ${format.portalUrl}`}
                      >
                        <Landmark className="w-2.5 h-2.5 shrink-0" />
                        <span>{format.formatShort}</span>
                      </span>
                    </div>
                    <p className="text-[10px] text-[#6B6B58] font-mono mt-0.5">
                      {format.formCode}
                    </p>
                  </div>
                </div>

                {/* Status Badge */}
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${
                  isVerified
                    ? 'bg-[#EAF2EB] text-[#3D5A40] border border-[#BCD4C0]'
                    : 'bg-[#FFF9EA] text-[#8B4513] border border-[#DCD7CE]'
                }`}>
                  {isVerified ? (
                    <>
                      <ShieldCheck className="w-3 h-3 text-[#3D5A40]" />
                      <span>Sanctioned</span>
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="w-3 h-3 text-[#8B4513]" />
                      <span>Pending Review</span>
                    </>
                  )}
                </span>
              </div>

              {/* Main Parcel Details */}
              <div className="mt-3 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-[#33332A] group-hover:text-[#8B4513] transition-colors natural-serif">
                    Khasra {record.khasraNumber.value}
                  </span>
                  <span className="text-[11px] font-mono text-[#6B6B58]">
                    Khata #{record.khataNumber.value}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-[#5A5A40]">
                  <MapPin className="w-3 h-3 text-[#6B6B58] shrink-0" />
                  <span className="font-medium text-[#33332A] truncate">
                    {record.village.value}, {record.tehsil.value}, {record.district.value}
                  </span>
                </div>

                <div className="bg-[#F5F3EE] p-2 rounded-lg border border-[#DCD7CE]/70 text-[11px] space-y-1">
                  <div className="flex justify-between items-baseline">
                    <span className="text-[#6B6B58]">Pattadar / Owner:</span>
                    <span className="font-bold text-[#33332A] truncate max-w-[170px]">
                      {record.primaryOwnerName.value}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-[#6B6B58]">Declared Area:</span>
                    <span className="font-semibold text-[#33332A]">
                      {record.totalAreaDeclared.value} {record.declaredUnit.value}
                      {record.normalizedAreaSqMeters && (
                        <span className="text-[#6B6B58] font-normal text-[10px] ml-1">
                          ({record.normalizedAreaSqMeters.toLocaleString()} m²)
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-[#6B6B58]">Lien / Mortgage:</span>
                    {hasLien ? (
                      <span className="text-[#8B4513] font-semibold text-[10px] truncate max-w-[160px]">
                        ⚠️ {record.encumbranceStatus.value.replace(/_/g, ' ')}
                      </span>
                    ) : (
                      <span className="text-[#3D5A40] font-medium text-[10px]">
                        ✓ Clear / Nil
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Card Footer with OCR Confidence & Action */}
            <div className="mt-3 pt-2.5 border-t border-[#DCD7CE]/60 flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-2">
                <span className={`px-1.5 py-0.2 rounded font-bold text-[10px] ${
                  record.overallConfidence >= 90
                    ? 'bg-[#EAF2EB] text-[#3D5A40] border border-[#BCD4C0]'
                    : record.overallConfidence >= 75
                    ? 'bg-[#FFF9EA] text-[#8B4513] border border-[#DCD7CE]'
                    : 'bg-[#FDF0ED] text-[#8B0000] border border-[#F2C2BA]'
                }`}>
                  {record.overallConfidence}% OCR
                </span>
                <span className="text-[10px] text-[#6B6B58] font-mono">
                  {record.documentNumber.slice(-10)}
                </span>
              </div>

              <div className="flex items-center gap-1 text-[#8B4513] font-semibold text-xs group-hover:translate-x-0.5 transition-transform">
                <span>Inspect Record</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
