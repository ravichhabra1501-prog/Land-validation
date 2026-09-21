import React from 'react';
import { 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  ExternalLink, 
  ChevronRight, 
  MapPin, 
  ShieldCheck, 
  Eye, 
  Building2,
  Landmark,
  Scale
} from 'lucide-react';
import { ExtractedLandRecord } from '../types';
import { getStateLandFormat } from '../data/stateLandFormats';

interface LandRecordLedgerTableProps {
  records: ExtractedLandRecord[];
  selectedRecordIds: string[];
  onToggleSelectRecord: (recordId: string) => void;
  onSelectRecord: (record: ExtractedLandRecord) => void;
  onOpenDirectoryModal: () => void;
}

export const LandRecordLedgerTable: React.FC<LandRecordLedgerTableProps> = ({
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
    <div className="w-full overflow-x-auto rounded-xl border border-[#DCD7CE] bg-[#FAF8F5]">
      <table className="w-full text-left border-collapse text-xs">
        <thead>
          <tr className="border-b border-[#DCD7CE] bg-[#F5F3EE] text-[#5A5A40] font-semibold text-[11px] uppercase tracking-wider natural-serif">
            <th className="py-3 px-3 w-10 text-center">
              <span className="sr-only">Select</span>
            </th>
            <th className="py-3 px-3 min-w-[130px]">Record Ref &amp; Date</th>
            <th className="py-3 px-3 min-w-[200px]">
              <div className="flex items-center gap-1.5">
                <span>State &amp; Land Format</span>
                <button
                  onClick={onOpenDirectoryModal}
                  className="text-[#8B4513] hover:underline normal-case font-normal text-[10px]"
                  title="View full National Directory of State Formats"
                >
                  (Guide)
                </button>
              </div>
            </th>
            <th className="py-3 px-3 min-w-[150px]">Location (Village / Dist)</th>
            <th className="py-3 px-3 min-w-[110px]">Parcel / Khasra</th>
            <th className="py-3 px-3 min-w-[160px]">Primary Landholder</th>
            <th className="py-3 px-3 min-w-[120px]">Total Area</th>
            <th className="py-3 px-3 min-w-[130px]">Encumbrance / Lien</th>
            <th className="py-3 px-3 min-w-[90px] text-center">AI Conf.</th>
            <th className="py-3 px-3 min-w-[130px]">Status</th>
            <th className="py-3 px-3 w-20 text-center">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#DCD7CE]/70 text-[#33332A]">
          {records.map((record) => {
            const isSelected = selectedRecordIds.includes(record.id);
            const isVerified = record.status === 'VERIFIED_AND_SANCTIONED';
            const format = getStateLandFormat(record.state.value, record.documentType);
            const hasLien = record.encumbranceStatus.value !== 'CLEAR_NO_ENCUMBRANCES';
            const uploadDate = record.uploadedAt 
              ? new Date(record.uploadedAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
              : 'Archival';

            return (
              <tr
                key={record.id}
                onClick={() => onSelectRecord(record)}
                className={`transition-colors cursor-pointer group ${
                  isSelected 
                    ? 'bg-[#FFF9EA]' 
                    : 'hover:bg-[#EBE7DF]/50'
                }`}
              >
                {/* Checkbox */}
                <td 
                  className="py-3 px-3 text-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleSelectRecord(record.id);
                  }}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => {}}
                    className="w-4 h-4 rounded text-[#5A5A40] accent-[#5A5A40] cursor-pointer"
                    aria-label={`Select record ${record.documentNumber}`}
                  />
                </td>

                {/* Record Ref & Date */}
                <td className="py-3 px-3">
                  <div className="font-mono text-[11px] font-bold text-[#33332A] group-hover:text-[#8B4513] transition-colors">
                    {record.documentNumber}
                  </div>
                  <div className="text-[10px] text-[#6B6B58] mt-0.5">
                    {uploadDate}
                  </div>
                </td>

                {/* State & Official Statutory Land Format */}
                <td className="py-3 px-3">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-bold text-[#33332A] natural-serif text-xs">
                      {record.state.value}
                    </span>
                  </div>
                  <div className="mt-1">
                    <span 
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold border ${format.badgeBg} ${format.badgeText} ${format.badgeBorder}`}
                      title={`${format.statutoryAct} • ${format.portalUrl}`}
                    >
                      <Landmark className="w-2.5 h-2.5 shrink-0" />
                      <span>{format.formatShort}</span>
                    </span>
                  </div>
                  <div className="text-[10px] text-[#6B6B58] font-mono mt-0.5 truncate max-w-[190px]">
                    {format.formCode}
                  </div>
                </td>

                {/* Location (Village, Tehsil, District) */}
                <td className="py-3 px-3">
                  <div className="font-medium text-[#33332A] text-xs">
                    {record.village.value}
                  </div>
                  <div className="text-[10px] text-[#6B6B58]">
                    {record.tehsil.value}, {record.district.value}
                  </div>
                  {record.censusVillageCode?.value && (
                    <div className="text-[9px] text-[#8B4513] font-mono">
                      LGD: {record.censusVillageCode.value}
                    </div>
                  )}
                </td>

                {/* Parcel / Khasra / Survey Number */}
                <td className="py-3 px-3">
                  <div className="font-bold text-[#33332A] natural-serif text-xs">
                    {record.khasraNumber.value}
                  </div>
                  <div className="text-[10px] text-[#6B6B58]">
                    Khata: {record.khataNumber.value}
                  </div>
                </td>

                {/* Primary Landholder */}
                <td className="py-3 px-3">
                  <div className="font-semibold text-[#33332A] text-xs leading-tight">
                    {record.primaryOwnerName.value}
                  </div>
                  {record.coOwners && record.coOwners.length > 0 && (
                    <div className="text-[10px] text-[#6B6B58] mt-0.5">
                      +{record.coOwners.length} co-sharer{record.coOwners.length > 1 ? 's' : ''}
                    </div>
                  )}
                  {record.parentageOrSpouse?.value && (
                    <div className="text-[9px] text-[#6B6B58] italic truncate max-w-[150px]">
                      s/o {record.parentageOrSpouse.value}
                    </div>
                  )}
                </td>

                {/* Total Declared Area */}
                <td className="py-3 px-3">
                  <div className="font-bold text-[#33332A] text-xs">
                    {record.totalAreaDeclared.value} {record.declaredUnit.value}
                  </div>
                  {record.normalizedAreaSqMeters && (
                    <div className="text-[10px] text-[#6B6B58]">
                      {record.normalizedAreaSqMeters.toLocaleString()} m²
                    </div>
                  )}
                </td>

                {/* Encumbrance / Lien */}
                <td className="py-3 px-3">
                  {hasLien ? (
                    <span 
                      className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-[#FFF9EA] text-[#8B4513] border border-[#DCD7CE]"
                      title={record.encumbranceRemarks?.value || 'Active encumbrance noted'}
                    >
                      <AlertTriangle className="w-2.5 h-2.5 shrink-0 text-[#8B4513]" />
                      <span className="truncate max-w-[110px]">{record.encumbranceStatus.value.replace(/_/g, ' ')}</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#3D5A40]">
                      <CheckCircle2 className="w-3 h-3 text-[#3D5A40]" />
                      <span>Clear / Freehold</span>
                    </span>
                  )}
                </td>

                {/* AI Confidence */}
                <td className="py-3 px-3 text-center">
                  <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold ${
                    record.overallConfidence >= 90
                      ? 'bg-[#EAF2EB] text-[#3D5A40] border border-[#BCD4C0]'
                      : record.overallConfidence >= 75
                      ? 'bg-[#FFF9EA] text-[#8B4513] border border-[#DCD7CE]'
                      : 'bg-[#FDF0ED] text-[#8B0000] border border-[#F2C2BA]'
                  }`}>
                    {record.overallConfidence}%
                  </span>
                </td>

                {/* Status */}
                <td className="py-3 px-3">
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
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
                        <span>Review Needed</span>
                      </>
                    )}
                  </span>
                </td>

                {/* Action */}
                <td className="py-3 px-3 text-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectRecord(record);
                    }}
                    className="p-1.5 rounded-lg border border-[#DCD7CE] bg-[#FAF8F5] hover:bg-[#EBE7DF] text-[#33332A] group-hover:text-[#8B4513] group-hover:border-[#C4BDAF] transition-all cursor-pointer"
                    title="Inspect and verify this land record"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
