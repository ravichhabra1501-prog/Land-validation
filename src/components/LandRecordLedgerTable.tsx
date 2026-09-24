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
      <div className="text-center py-12 px-4 text-slate-400 text-xs bg-[#090E1A]/80 rounded-xl border border-slate-800">
        <Landmark className="w-8 h-8 mx-auto text-slate-600 mb-2" />
        <p className="font-semibold text-slate-200 text-sm">No land records found</p>
        <p className="text-slate-400 mt-1">Try adjusting your state filter, search keywords, or format criteria.</p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-slate-800 bg-[#090E1A]/95 shadow-inner">
      <table className="w-full text-left border-collapse text-xs">
        <thead>
          <tr className="border-b border-slate-800 bg-[#0C1527] text-cyan-400 font-semibold text-[11px] uppercase tracking-wider font-mono">
            <th className="py-3 px-3 w-10 text-center">
              <span className="sr-only">Select</span>
            </th>
            <th className="py-3 px-3 min-w-[130px]">Record Ref &amp; Date</th>
            <th className="py-3 px-3 min-w-[200px]">
              <div className="flex items-center gap-1.5">
                <span>State &amp; Land Format</span>
                <button
                  onClick={onOpenDirectoryModal}
                  className="text-cyan-400 hover:text-cyan-300 hover:underline normal-case font-mono text-[10px]"
                  title="View full National Directory of State Formats"
                >
                  [Guide]
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
        <tbody className="divide-y divide-slate-800/80 text-slate-200">
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
                    ? 'bg-cyan-950/40 border-l-2 border-cyan-400' 
                    : 'hover:bg-cyan-950/20'
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
                    className="w-4 h-4 rounded text-cyan-500 accent-cyan-500 cursor-pointer bg-slate-900 border-slate-700"
                    aria-label={`Select record ${record.documentNumber}`}
                  />
                </td>

                {/* Record Ref & Date */}
                <td className="py-3 px-3">
                  <div className="font-mono text-[11px] font-bold text-cyan-300 group-hover:text-cyan-200 transition-colors">
                    {record.documentNumber}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5 font-mono">
                    {uploadDate}
                  </div>
                </td>

                {/* State & Official Statutory Land Format */}
                <td className="py-3 px-3">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-bold text-slate-100 natural-serif text-xs">
                      {record.state.value}
                    </span>
                  </div>
                  <div className="mt-1">
                    <span 
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-cyan-950/80 text-cyan-300 border border-cyan-500/40 font-mono shadow-[0_0_8px_rgba(6,182,212,0.15)]"
                      title={`${format.statutoryAct} • ${format.portalUrl}`}
                    >
                      <Landmark className="w-2.5 h-2.5 shrink-0 text-cyan-400" />
                      <span>{format.formatShort}</span>
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono mt-0.5 truncate max-w-[190px]">
                    {format.formCode}
                  </div>
                </td>

                {/* Location (Village, Tehsil, District) */}
                <td className="py-3 px-3">
                  <div className="font-medium text-slate-200 text-xs">
                    {record.village.value}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {record.tehsil.value}, {record.district.value}
                  </div>
                  {record.censusVillageCode?.value && (
                    <div className="text-[9px] text-amber-400 font-mono mt-0.5">
                      LGD: {record.censusVillageCode.value}
                    </div>
                  )}
                </td>

                {/* Parcel / Khasra / Survey Number */}
                <td className="py-3 px-3">
                  <div className="font-bold text-slate-100 natural-serif text-xs">
                    {record.khasraNumber.value}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    Khata: {record.khataNumber.value}
                  </div>
                </td>

                {/* Primary Landholder */}
                <td className="py-3 px-3">
                  <div className="font-semibold text-slate-100 text-xs leading-tight">
                    {record.primaryOwnerName.value}
                  </div>
                  {record.coOwners && record.coOwners.length > 0 && (
                    <div className="text-[10px] text-cyan-400/80 mt-0.5">
                      +{record.coOwners.length} co-sharer{record.coOwners.length > 1 ? 's' : ''}
                    </div>
                  )}
                  {record.parentageOrSpouse?.value && (
                    <div className="text-[9px] text-slate-400 italic truncate max-w-[150px]">
                      s/o {record.parentageOrSpouse.value}
                    </div>
                  )}
                </td>

                {/* Total Declared Area */}
                <td className="py-3 px-3">
                  <div className="font-bold text-slate-100 text-xs font-mono">
                    {record.totalAreaDeclared.value} {record.declaredUnit.value}
                  </div>
                  {record.normalizedAreaSqMeters && (
                    <div className="text-[10px] text-slate-400 font-mono">
                      {record.normalizedAreaSqMeters.toLocaleString()} m²
                    </div>
                  )}
                </td>

                {/* Encumbrance / Lien */}
                <td className="py-3 px-3">
                  {hasLien ? (
                    <span 
                      className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-amber-950/60 text-amber-300 border border-amber-500/40"
                      title={record.encumbranceRemarks?.value || 'Active encumbrance noted'}
                    >
                      <AlertTriangle className="w-2.5 h-2.5 shrink-0 text-amber-400" />
                      <span className="truncate max-w-[110px] font-mono">{record.encumbranceStatus.value.replace(/_/g, ' ')}</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400 font-mono">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      <span>Clear / Freehold</span>
                    </span>
                  )}
                </td>

                {/* AI Confidence */}
                <td className="py-3 px-3 text-center">
                  <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold font-mono ${
                    record.overallConfidence >= 90
                      ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 shadow-[0_0_8px_rgba(16,185,129,0.2)]'
                      : record.overallConfidence >= 75
                      ? 'bg-amber-950/80 text-amber-300 border border-amber-500/40'
                      : 'bg-rose-950/80 text-rose-300 border border-rose-500/40'
                  }`}>
                    {record.overallConfidence}%
                  </span>
                </td>

                {/* Status */}
                <td className="py-3 px-3">
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold font-mono ${
                    isVerified
                      ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 shadow-[0_0_8px_rgba(16,185,129,0.25)]'
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
                    className="p-1.5 rounded-lg border border-slate-700 bg-slate-800/80 hover:bg-cyan-950 hover:border-cyan-400 text-slate-300 hover:text-cyan-300 transition-all cursor-pointer shadow-xs"
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
