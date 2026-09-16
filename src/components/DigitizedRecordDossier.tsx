import React, { useState } from 'react';
import { 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  Ruler, 
  ShieldCheck, 
  Users, 
  History, 
  ExternalLink, 
  Eye, 
  Sparkles, 
  Scale, 
  Stamp, 
  ArrowRightLeft, 
  Copy, 
  Check, 
  Layers, 
  Download, 
  Search, 
  ChevronRight,
  MapPin,
  FileCheck,
  Calendar,
  MessageSquare
} from 'lucide-react';
import { ExtractedLandRecord, UserRole } from '../types';
import { CadastralPlot } from '../data/cadastralPlotsData';
import { calculateBoundarySegments, calculatePerimeterMeters } from '../utils/cadastralUtils';

interface DigitizedRecordDossierProps {
  record: ExtractedLandRecord;
  selectedPlot: CadastralPlot;
  allRecords: ExtractedLandRecord[];
  onSelectRecord: (record: ExtractedLandRecord) => void;
  onNavigateToVerification?: () => void;
  onSelectPlotByKhasra?: (khasra: string) => void;
  userRole?: UserRole;
  onScheduleWithGisOfficer?: (khasra: string, village?: string) => void;
}

export const DigitizedRecordDossier: React.FC<DigitizedRecordDossierProps> = ({
  record,
  selectedPlot,
  allRecords,
  onSelectRecord,
  onNavigateToVerification,
  onSelectPlotByKhasra,
  userRole,
  onScheduleWithGisOfficer
}) => {
  const [activeDossierTab, setActiveDossierTab] = useState<'concordance' | 'boundaries' | 'owners' | 'scan' | 'mutations'>('concordance');
  const [copiedUlpin, setCopiedUlpin] = useState<boolean>(false);
  const [scanFilter, setScanFilter] = useState<'normal' | 'contrast' | 'invert'>('normal');
  const [concordanceCertified, setConcordanceCertified] = useState<boolean>(false);
  const [showDiscrepancyToast, setShowDiscrepancyToast] = useState<boolean>(false);

  // Derive spatial segments from current plot
  const boundarySegments = calculateBoundarySegments(selectedPlot.coordinates);
  const totalPerimeterMeters = calculatePerimeterMeters(selectedPlot.coordinates);

  // Check identifier concordance
  const isKhasraMatch = record.khasraNumber.value.trim() === selectedPlot.khasra.trim();
  const isKhataMatch = record.khataNumber.value.trim() === selectedPlot.khata.trim();
  const isOwnerMatch = record.primaryOwnerName.value.toLowerCase().includes(selectedPlot.owner.toLowerCase()) ||
                       selectedPlot.owner.toLowerCase().includes(record.primaryOwnerName.value.toLowerCase());

  // Area variance calculation
  const legalAreaSqM = record.normalizedAreaSqMeters;
  const spatialAreaSqM = selectedPlot.areaSqM;
  const areaDeltaSqM = Math.abs(legalAreaSqM - spatialAreaSqM);
  const areaDeltaPercent = legalAreaSqM > 0 ? (areaDeltaSqM / legalAreaSqM) * 100 : 0;
  const isAreaCompliant = areaDeltaPercent <= 1.0; // Within DILRMP ±1% survey margin

  // Copy ULPIN / Doc ID
  const handleCopyUlpin = () => {
    navigator.clipboard?.writeText(record.documentNumber);
    setCopiedUlpin(true);
    setTimeout(() => setCopiedUlpin(false), 2000);
  };

  // Check if a plot in the village matches the record's khasra
  const matchingPlotInVillage = isKhasraMatch 
    ? null 
    : onSelectPlotByKhasra 
    ? record.khasraNumber.value 
    : null;

  // Document type label in Indic & English
  const getDocTypeBadge = () => {
    switch (record.documentType) {
      case '7_12_EXTRACT':
        return { label: '7/12 Saat-Baara', state: 'Maharashtra / Gujarat', color: 'bg-[#EAF2EB] text-[#3D5A40] border-[#BCD4C0]' };
      case 'KHASRA_KHATAUNI':
        return { label: 'Khasra-Khatauni (खतौनी)', state: 'Uttar Pradesh / MP', color: 'bg-[#FFF9EA] text-[#8B4513] border-[#DCD7CE]' };
      case 'JAMABANDI':
        return { label: 'Jamabandi Nakal (ਜਮ੍ਹਾਂਬੰਦੀ)', state: 'Punjab / Haryana / RJ', color: 'bg-[#F0F4F8] text-[#2C4C64] border-[#BDD0E0]' };
      case 'BHOOMI_RTC':
        return { label: 'Bhoomi RTC Pahani (ಪಹಣಿ)', state: 'Karnataka', color: 'bg-[#F7EDF5] text-[#6A2E59] border-[#DFBED9]' };
      default:
        return { label: 'Record of Rights (RoR)', state: record.state.value, color: 'bg-[#F5F3EE] text-[#5A5A40] border-[#DCD7CE]' };
    }
  };

  const docBadge = getDocTypeBadge();

  return (
    <div className="bg-[#FAF8F5] rounded-xl border border-[#DCD7CE] shadow-2xs flex flex-col h-full overflow-hidden">
      {/* 1. Header: Document Identity & Record Switcher */}
      <div className="p-4 border-b border-[#DCD7CE] bg-[#F5F3EE]/70 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-0.5 rounded text-[11px] font-bold border ${docBadge.color}`}>
              {docBadge.label}
            </span>
            <span className="text-xs text-[#6B6B58] font-mono">
              #{record.documentNumber}
            </span>
            <button
              id="btn-copy-ulpin"
              onClick={handleCopyUlpin}
              title="Copy Record Document Number"
              className="text-[#6B6B58] hover:text-[#33332A] p-0.5 rounded transition-colors cursor-pointer"
            >
              {copiedUlpin ? <Check className="w-3.5 h-3.5 text-[#3D5A40]" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
              record.status === 'VERIFIED_AND_SANCTIONED'
                ? 'bg-[#EAF2EB] text-[#3D5A40] border-[#BCD4C0]'
                : record.status === 'NEEDS_REVIEW'
                ? 'bg-[#FFF9EA] text-[#8B4513] border-[#DCD7CE]'
                : 'bg-[#F5F3EE] text-[#5A5A40] border-[#DCD7CE]'
            }`}>
              {record.status.replace(/_/g, ' ')}
            </span>
            <span className="text-[11px] font-semibold text-[#5A5A40] bg-[#FFF9EA] px-2 py-0.5 rounded border border-[#DCD7CE]">
              OCR: {record.overallConfidence}%
            </span>
          </div>
        </div>

        {/* Quick Record Switcher Dropdown */}
        <div className="flex items-center justify-between gap-3 pt-1">
          <div className="flex items-center gap-1.5 text-xs text-[#6B6B58]">
            <FileText className="w-3.5 h-3.5 text-[#5A5A40]" />
            <span className="font-semibold">{userRole === 'CITIZEN_VIEWER' ? 'Your Land Record:' : 'Compare Record:'}</span>
            {userRole === 'CITIZEN_VIEWER' ? (
              <span className="bg-[#FAF8F5] border border-[#BCD4C0] text-emerald-950 px-2 py-0.5 rounded text-xs font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                {record.village?.value || record.village} - Gat #{record.khasraNumber?.value} ({record.primaryOwnerName?.value})
              </span>
            ) : (
              <select
                id="select-dossier-record"
                value={record.id}
                onChange={(e) => {
                  const found = allRecords.find((r) => r.id === e.target.value);
                  if (found) onSelectRecord(found);
                }}
                aria-label="Select Digitized Record to Compare"
                className="bg-[#FAF8F5] border border-[#DCD7CE] rounded px-2 py-1 text-xs font-bold text-[#33332A] focus:outline-hidden cursor-pointer"
              >
                {allRecords.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.village?.value || r.village} - Khasra #{r.khasraNumber?.value} ({r.primaryOwnerName?.value})
                  </option>
                ))}
              </select>
            )}
          </div>

          {onNavigateToVerification && userRole !== 'CITIZEN_VIEWER' && (
            <button
              id="btn-dossier-open-workspace"
              onClick={onNavigateToVerification}
              className="text-xs font-semibold text-[#5A5A40] hover:text-[#33332A] flex items-center gap-1 hover:underline cursor-pointer"
            >
              <span>Edit in Station</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Concordance Status Banner */}
        <div className={`p-2.5 rounded-lg border text-xs flex items-center justify-between gap-2 ${
          isKhasraMatch
            ? 'bg-[#EAF2EB] text-[#3D5A40] border-[#BCD4C0]'
            : 'bg-[#FFF9EA] text-[#8B4513] border-[#DCD7CE]'
        }`}>
          <div className="flex items-center gap-2">
            {isKhasraMatch ? (
              <CheckCircle2 className="w-4 h-4 text-[#3D5A40] shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-[#8B4513] shrink-0" />
            )}
            <div>
              {isKhasraMatch ? (
                <span>
                  <strong>Identical Parcel Concordance:</strong> Record Khasra #{record.khasraNumber.value} aligns directly with Map Parcel #{selectedPlot.khasra}.
                </span>
              ) : (
                <span>
                  <strong>Cross-Parcel Comparison:</strong> Record Khasra #{record.khasraNumber.value} compared against Map Parcel #{selectedPlot.khasra}.
                </span>
              )}
            </div>
          </div>

          {!isKhasraMatch && onSelectPlotByKhasra && (
            <button
              id="btn-sync-map-to-record"
              onClick={() => onSelectPlotByKhasra(record.khasraNumber.value)}
              className="px-2 py-1 rounded bg-[#8B4513] hover:bg-[#6D340E] text-[#FFF9EA] font-semibold text-[11px] whitespace-nowrap transition-colors cursor-pointer"
            >
              Sync Map to #{record.khasraNumber.value}
            </button>
          )}
        </div>
      </div>

      {/* 2. Dossier Navigation Tabs */}
      <div className="flex items-center border-b border-[#DCD7CE] bg-[#FAF8F5] px-3 pt-2 text-xs overflow-x-auto gap-1">
        <button
          id="tab-dossier-concordance"
          onClick={() => setActiveDossierTab('concordance')}
          className={`px-3 py-2 border-b-2 font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
            activeDossierTab === 'concordance'
              ? 'border-[#5A5A40] text-[#5A5A40] bg-[#F5F3EE]'
              : 'border-transparent text-[#6B6B58] hover:text-[#33332A]'
          }`}
        >
          <Scale className="w-3.5 h-3.5" />
          <span>Concordance Audit</span>
        </button>

        <button
          id="tab-dossier-boundaries"
          onClick={() => setActiveDossierTab('boundaries')}
          className={`px-3 py-2 border-b-2 font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
            activeDossierTab === 'boundaries'
              ? 'border-[#5A5A40] text-[#5A5A40] bg-[#F5F3EE]'
              : 'border-transparent text-[#6B6B58] hover:text-[#33332A]'
          }`}
        >
          <Ruler className="w-3.5 h-3.5" />
          <span>Boundary Schedule</span>
        </button>

        <button
          id="tab-dossier-owners"
          onClick={() => setActiveDossierTab('owners')}
          className={`px-3 py-2 border-b-2 font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
            activeDossierTab === 'owners'
              ? 'border-[#5A5A40] text-[#5A5A40] bg-[#F5F3EE]'
              : 'border-transparent text-[#6B6B58] hover:text-[#33332A]'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>Co-Sharers ({record.totalOwnersCount})</span>
        </button>

        <button
          id="tab-dossier-scan"
          onClick={() => setActiveDossierTab('scan')}
          className={`px-3 py-2 border-b-2 font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
            activeDossierTab === 'scan'
              ? 'border-[#5A5A40] text-[#5A5A40] bg-[#F5F3EE]'
              : 'border-transparent text-[#6B6B58] hover:text-[#33332A]'
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Original Deed Scan</span>
        </button>

        <button
          id="tab-dossier-mutations"
          onClick={() => setActiveDossierTab('mutations')}
          className={`px-3 py-2 border-b-2 font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
            activeDossierTab === 'mutations'
              ? 'border-[#5A5A40] text-[#5A5A40] bg-[#F5F3EE]'
              : 'border-transparent text-[#6B6B58] hover:text-[#33332A]'
          }`}
        >
          <History className="w-3.5 h-3.5" />
          <span>Mutations ({record.mutations?.length || 0})</span>
        </button>
      </div>

      {/* 3. Tab Content Area with Smooth Scroll */}
      <div className="p-4 flex-1 overflow-y-auto space-y-4 text-xs">
        {/* TAB 1: CONCORDANCE AUDIT */}
        {activeDossierTab === 'concordance' && (
          <div className="space-y-4">
            {/* Area Comparison Card */}
            <div className="p-3.5 rounded-lg bg-[#F5F3EE] border border-[#DCD7CE] space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#33332A] natural-serif text-sm">
                  Area & Geometry Reconciliation
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  isAreaCompliant 
                    ? 'bg-[#EAF2EB] text-[#3D5A40] border border-[#BCD4C0]' 
                    : 'bg-[#FDF0ED] text-[#8B0000] border border-[#F2C2BA]'
                }`}>
                  {isAreaCompliant ? 'Compliant (Δ < 1%)' : 'Survey Variance Detected'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="bg-[#FAF8F5] p-2.5 rounded border border-[#DCD7CE]">
                  <span className="text-[#6B6B58] text-[10px] uppercase font-bold block">
                    Legal Declared Area (Deed)
                  </span>
                  <div className="font-bold text-[#33332A] text-sm mt-0.5">
                    {record.totalAreaDeclared.value} {record.declaredUnit.value}
                  </div>
                  <span className="text-[10px] text-[#6B6B58] block mt-0.5 font-mono">
                    {legalAreaSqM.toLocaleString()} sq.meters
                  </span>
                </div>

                <div className="bg-[#FAF8F5] p-2.5 rounded border border-[#DCD7CE]">
                  <span className="text-[#6B6B58] text-[10px] uppercase font-bold block">
                    Spatial Polygon Area (GIS)
                  </span>
                  <div className="font-bold text-[#33332A] text-sm mt-0.5">
                    {selectedPlot.areaHa} Hectares
                  </div>
                  <span className="text-[10px] text-[#6B6B58] block mt-0.5 font-mono">
                    {spatialAreaSqM.toLocaleString()} sq.meters
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-[#DCD7CE] flex items-center justify-between text-[11px]">
                <span className="text-[#6B6B58]">Calculated Area Variance:</span>
                <span className={`font-mono font-bold ${
                  areaDeltaSqM === 0 
                    ? 'text-[#3D5A40]' 
                    : isAreaCompliant 
                    ? 'text-[#5A5A40]' 
                    : 'text-[#8B0000]'
                }`}>
                  {areaDeltaSqM.toFixed(1)} sq.m ({areaDeltaPercent.toFixed(2)}% delta)
                </span>
              </div>
            </div>

            {/* Field Concordance Table */}
            <div className="border border-[#DCD7CE] rounded-lg overflow-hidden bg-[#FAF8F5]">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#F5F3EE] border-b border-[#DCD7CE] text-[10px] text-[#5A5A40] uppercase font-bold tracking-wider">
                    <th className="p-2.5">Attribute</th>
                    <th className="p-2.5">Extracted RoR Deed</th>
                    <th className="p-2.5">Spatial Cadastral Map</th>
                    <th className="p-2.5 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DCD7CE] text-[11px]">
                  <tr>
                    <td className="p-2.5 font-semibold text-[#5A5A40]">Khasra / Gat #</td>
                    <td className="p-2.5 font-bold text-[#33332A]">
                      {record.khasraNumber.value}
                      <span className="text-[10px] text-[#6B6B58] block">{record.khasraNumber.rawText}</span>
                    </td>
                    <td className="p-2.5 font-bold text-[#33332A]">{selectedPlot.khasra}</td>
                    <td className="p-2.5 text-center">
                      {isKhasraMatch ? (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#EAF2EB] text-[#3D5A40]">Match</span>
                      ) : (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#FDF0ED] text-[#8B0000]">Mismatch</span>
                      )}
                    </td>
                  </tr>

                  <tr>
                    <td className="p-2.5 font-semibold text-[#5A5A40]">Khata Ledger Folio</td>
                    <td className="p-2.5 text-[#33332A]">#{record.khataNumber.value}</td>
                    <td className="p-2.5 text-[#33332A]">#{selectedPlot.khata}</td>
                    <td className="p-2.5 text-center">
                      {isKhataMatch ? (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#EAF2EB] text-[#3D5A40]">Match</span>
                      ) : (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#FFF9EA] text-[#8B4513]">Variant</span>
                      )}
                    </td>
                  </tr>

                  <tr>
                    <td className="p-2.5 font-semibold text-[#5A5A40]">Registered Khatedar</td>
                    <td className="p-2.5 text-[#33332A]">
                      <span className="font-bold">{record.primaryOwnerName.value}</span>
                      <span className="text-[10px] text-[#6B6B58] block">{record.parentageOrSpouse.value}</span>
                    </td>
                    <td className="p-2.5 text-[#33332A]">
                      <span className="font-bold">{selectedPlot.owner}</span>
                      <span className="text-[10px] text-[#6B6B58] block">{selectedPlot.parentage}</span>
                    </td>
                    <td className="p-2.5 text-center">
                      {isOwnerMatch ? (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#EAF2EB] text-[#3D5A40]">Aligned</span>
                      ) : (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#FFF9EA] text-[#8B4513]">Review</span>
                      )}
                    </td>
                  </tr>

                  <tr>
                    <td className="p-2.5 font-semibold text-[#5A5A40]">Soil / Land Class</td>
                    <td className="p-2.5 text-[#33332A]">{record.landClassification.value}</td>
                    <td className="p-2.5 text-[#33332A]">{selectedPlot.soil}</td>
                    <td className="p-2.5 text-center">
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#EAF2EB] text-[#3D5A40]">Concordant</span>
                    </td>
                  </tr>

                  <tr>
                    <td className="p-2.5 font-semibold text-[#5A5A40]">Encumbrance / Injunction</td>
                    <td className="p-2.5 text-[#33332A]">
                      <span className="font-bold">{record.encumbranceStatus.value}</span>
                      {record.bankLienDetails && (
                        <span className="text-[10px] text-[#8B4513] block mt-0.5 truncate max-w-[180px]" title={record.bankLienDetails}>
                          {record.bankLienDetails}
                        </span>
                      )}
                    </td>
                    <td className="p-2.5 text-[#33332A]">
                      <span className="font-bold">{selectedPlot.status}</span>
                      {selectedPlot.disputeDetails && (
                        <span className="text-[10px] text-[#8B0000] block mt-0.5 truncate max-w-[180px]" title={selectedPlot.disputeDetails}>
                          {selectedPlot.disputeDetails}
                        </span>
                      )}
                    </td>
                    <td className="p-2.5 text-center">
                      {selectedPlot.status === 'LITIGATION' || record.encumbranceStatus.value === 'COURT_STAY' ? (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#FDF0ED] text-[#8B0000]">Stay Alert</span>
                      ) : (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#EAF2EB] text-[#3D5A40]">Clear</span>
                      )}
                    </td>
                  </tr>

                  <tr>
                    <td className="p-2.5 font-semibold text-[#5A5A40]">Village & Sub-Division</td>
                    <td className="p-2.5 text-[#33332A]">
                      {record.village.value}, {record.tehsil.value}
                    </td>
                    <td className="p-2.5 text-[#33332A]">
                      {selectedPlot.village}, {selectedPlot.tehsil}
                    </td>
                    <td className="p-2.5 text-center">
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#EAF2EB] text-[#3D5A40]">Match</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Digital Stamp Certification Action */}
            <div className="p-3.5 rounded-lg bg-[#FAF8F5] border border-[#DCD7CE] flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs">
                <Stamp className="w-4 h-4 text-[#5A5A40]" />
                <div>
                  <span className="font-bold text-[#33332A] block">Patwari Spatial Concordance Stamp</span>
                  <span className="text-[#6B6B58] text-[11px]">
                    {concordanceCertified 
                      ? 'Reconciled & digitally attested against survey shajra.' 
                      : 'Attest that legal deed matches spatial polygon geometry.'}
                  </span>
                </div>
              </div>

              <button
                id="btn-certify-spatial-concordance"
                onClick={() => setConcordanceCertified(!concordanceCertified)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  concordanceCertified
                    ? 'bg-[#3D5A40] text-[#FFF9EA] shadow-2xs'
                    : 'bg-[#5A5A40] hover:bg-[#43432F] text-[#FFF9EA]'
                }`}
              >
                {concordanceCertified ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Concordance Certified</span>
                  </>
                ) : (
                  <>
                    <Stamp className="w-3.5 h-3.5" />
                    <span>Certify Spatial Match</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: BOUNDARY SCHEDULE (CHAUHADDI) */}
        {activeDossierTab === 'boundaries' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-1 border-b border-[#DCD7CE]">
              <div>
                <h4 className="font-bold text-[#33332A] natural-serif text-sm">
                  Deed Chauhaddi vs Spatial Polygon Edges
                </h4>
                <p className="text-[11px] text-[#6B6B58]">
                  Direct comparison between four written deed boundaries (चतुःसीमा) and calculated GIS polygon perimeter
                </p>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-[#6B6B58] uppercase block">Total Perimeter</span>
                <span className="font-mono font-bold text-[#33332A] text-xs">{totalPerimeterMeters} meters</span>
              </div>
            </div>

            {/* 4 Directional Cards */}
            <div className="space-y-2.5">
              {[
                { 
                  dir: 'North', 
                  label: 'North (उत्तर)', 
                  written: record.boundaries?.north || 'Gat No. 141 (Agricultural field of D. B. Jadhav)', 
                  segment: boundarySegments[0] 
                },
                { 
                  dir: 'East', 
                  label: 'East (पूर्व)', 
                  written: record.boundaries?.east || 'Gat No. 143 (Adjacent farmer holding)', 
                  segment: boundarySegments[1] 
                },
                { 
                  dir: 'South', 
                  label: 'South (दक्षिण)', 
                  written: record.boundaries?.south || 'Village Nala and DP Road boundary', 
                  segment: boundarySegments[2] 
                },
                { 
                  dir: 'West', 
                  label: 'West (पश्चिम)', 
                  written: record.boundaries?.west || 'Gat No. 142/2 (Co-divided holding)', 
                  segment: boundarySegments[3] 
                }
              ].map((b) => (
                <div key={b.dir} className="p-3 rounded-lg bg-[#F5F3EE] border border-[#DCD7CE] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#5A5A40] text-xs">{b.label}</span>
                    {b.segment && (
                      <span className="font-mono text-[11px] font-bold text-[#33332A] bg-[#FAF8F5] px-2 py-0.5 rounded border border-[#DCD7CE]">
                        Spatial Length: {b.segment.lengthMeters} m ({b.segment.bearingCompass})
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                    <div className="bg-[#FAF8F5] p-2 rounded border border-[#DCD7CE]">
                      <span className="text-[10px] uppercase text-[#6B6B58] font-semibold block">Written in Deed:</span>
                      <p className="text-[#33332A] font-medium mt-0.5">{b.written}</p>
                    </div>

                    <div className="bg-[#FAF8F5] p-2 rounded border border-[#DCD7CE]">
                      <span className="text-[10px] uppercase text-[#6B6B58] font-semibold block">Spatial Boundary Coordinates:</span>
                      {b.segment ? (
                        <p className="text-[#5A5A40] font-mono mt-0.5 text-[10px]">
                          {b.segment.startPoint.lat.toFixed(4)}°N, {b.segment.startPoint.lng.toFixed(4)}°E → {b.segment.endPoint.lat.toFixed(4)}°N, {b.segment.endPoint.lng.toFixed(4)}°E
                        </p>
                      ) : (
                        <p className="text-[#6B6B58]">Calculated from cadastral vertex polygon</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Boundary Concordance Footnote */}
            <div className="p-3 bg-[#FAF8F5] border border-[#DCD7CE] rounded-lg text-[11px] text-[#6B6B58] space-y-1">
              <div className="flex items-center gap-1.5 text-[#3D5A40] font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Boundary Concordance Corroborated</span>
              </div>
              <p>
                Written boundary references in the registered deed correspond with adjacent spatial parcel boundaries (±0.42m boundary bund tolerance).
              </p>
            </div>
          </div>
        )}

        {/* TAB 3: CO-SHARERS & QUOTAS */}
        {activeDossierTab === 'owners' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-1 border-b border-[#DCD7CE]">
              <div>
                <h4 className="font-bold text-[#33332A] natural-serif text-sm">
                  Registered Khatedars & Co-Sharers Schedule
                </h4>
                <p className="text-[11px] text-[#6B6B58]">
                  Total {record.totalOwnersCount} registered legal title holders on Khata #{record.khataNumber.value}
                </p>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-[#6B6B58] uppercase block">Land Revenue (Lagaan)</span>
                <span className="font-bold text-[#33332A] text-xs">₹{record.annualLandRevenue.value.toFixed(2)} / yr</span>
              </div>
            </div>

            {/* Co-Sharers Table */}
            <div className="border border-[#DCD7CE] rounded-lg overflow-hidden bg-[#FAF8F5]">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#F5F3EE] border-b border-[#DCD7CE] text-[10px] text-[#5A5A40] uppercase font-bold tracking-wider">
                    <th className="p-2.5">Title Holder</th>
                    <th className="p-2.5">Relation</th>
                    <th className="p-2.5">Share Fraction</th>
                    <th className="p-2.5 text-right">Quota (sq.m)</th>
                    <th className="p-2.5">Govt ID Reference</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DCD7CE] text-[11px]">
                  {record.coSharers.map((cs) => (
                    <tr key={cs.id} className="hover:bg-[#F5F3EE]/50">
                      <td className="p-2.5 font-bold text-[#33332A]">{cs.name}</td>
                      <td className="p-2.5 text-[#6B6B58]">{cs.relation}</td>
                      <td className="p-2.5 font-mono font-bold text-[#5A5A40]">{cs.shareFraction}</td>
                      <td className="p-2.5 text-right font-mono text-[#33332A]">{cs.shareAreaSqMeters.toLocaleString()} sq.m</td>
                      <td className="p-2.5 font-mono text-[10px] text-[#6B6B58]">{cs.panOrAadhaarRef || 'Verified'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Summation Verification */}
            <div className="p-2.5 bg-[#F5F3EE] border border-[#DCD7CE] rounded-lg flex items-center justify-between text-[11px]">
              <span className="text-[#6B6B58]">Sum of Co-Sharer Quotas:</span>
              <span className="font-mono font-bold text-[#3D5A40]">
                {record.coSharers.reduce((acc, c) => acc + c.shareAreaSqMeters, 0).toLocaleString()} sq.m (Equals Declared Parcel Area)
              </span>
            </div>
          </div>
        )}

        {/* TAB 4: ORIGINAL SCANNED DEED & OCR */}
        {activeDossierTab === 'scan' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-[#33332A] natural-serif text-sm">
                  Digitized Parchment / Deed Scan
                </h4>
                <p className="text-[11px] text-[#6B6B58]">
                  Source file: {record.sourceFileName} &bull; Script: {record.script}
                </p>
              </div>

              {/* Filter Toggles */}
              <div className="flex items-center gap-1 bg-[#F5F3EE] p-1 rounded-lg border border-[#DCD7CE] text-[11px]">
                <button
                  id="btn-scan-filter-normal"
                  onClick={() => setScanFilter('normal')}
                  className={`px-2 py-0.5 rounded font-semibold cursor-pointer ${
                    scanFilter === 'normal' ? 'bg-[#5A5A40] text-[#FFF9EA]' : 'text-[#6B6B58]'
                  }`}
                >
                  Normal
                </button>
                <button
                  id="btn-scan-filter-contrast"
                  onClick={() => setScanFilter('contrast')}
                  className={`px-2 py-0.5 rounded font-semibold cursor-pointer ${
                    scanFilter === 'contrast' ? 'bg-[#5A5A40] text-[#FFF9EA]' : 'text-[#6B6B58]'
                  }`}
                >
                  High Contrast
                </button>
                <button
                  id="btn-scan-filter-invert"
                  onClick={() => setScanFilter('invert')}
                  className={`px-2 py-0.5 rounded font-semibold cursor-pointer ${
                    scanFilter === 'invert' ? 'bg-[#5A5A40] text-[#FFF9EA]' : 'text-[#6B6B58]'
                  }`}
                >
                  Inverted
                </button>
              </div>
            </div>

            {/* Document Image with Bounding Box Highlights */}
            <div className="relative rounded-lg overflow-hidden border border-[#DCD7CE] bg-[#2E2E24] max-h-72 flex items-center justify-center">
              <img
                src={record.sourceImageUrl}
                alt={`Scanned land record for ${record.village.value}`}
                referrerPolicy="no-referrer"
                className={`max-w-full max-h-72 object-contain transition-all duration-300 ${
                  scanFilter === 'contrast' 
                    ? 'contrast-200 grayscale' 
                    : scanFilter === 'invert' 
                    ? 'invert grayscale' 
                    : ''
                }`}
              />

              {/* Simulated OCR Highlights */}
              <div 
                className="absolute border-2 border-[#E5C37A] bg-[#E5C37A]/20 pointer-events-none rounded"
                style={{ top: '18%', left: '42%', width: '22%', height: '8%' }}
                title="Khasra Bounding Box"
              >
                <span className="absolute -top-4 left-0 bg-[#E5C37A] text-[#1F2018] px-1 py-0.2 rounded text-[8px] font-bold">
                  Khasra {record.khasraNumber.value}
                </span>
              </div>
            </div>

            {/* Raw Extracted Strings in Native Indic Script */}
            <div className="p-3 bg-[#F5F3EE] rounded-lg border border-[#DCD7CE] space-y-1.5">
              <span className="text-[10px] uppercase font-bold text-[#5A5A40] block">
                Original Indic Script Transcriptions (Devanagari / Indic Core)
              </span>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div>
                  <span className="text-[#6B6B58]">गट / खसरा:</span>{' '}
                  <span className="font-bold text-[#33332A]">{record.khasraNumber.rawText || record.khasraNumber.value}</span>
                </div>
                <div>
                  <span className="text-[#6B6B58]">खातेदार:</span>{' '}
                  <span className="font-bold text-[#33332A]">{record.primaryOwnerName.rawText || record.primaryOwnerName.value}</span>
                </div>
                <div>
                  <span className="text-[#6B6B58]">क्षेत्रफळ:</span>{' '}
                  <span className="font-bold text-[#33332A]">{record.totalAreaDeclared.rawText || record.totalAreaDeclared.value}</span>
                </div>
                <div>
                  <span className="text-[#6B6B58]">गाव / तालुका:</span>{' '}
                  <span className="font-bold text-[#33332A]">{record.village.rawText || record.village.value}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: MUTATIONS & RULES */}
        {activeDossierTab === 'mutations' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-1 border-b border-[#DCD7CE]">
              <div>
                <h4 className="font-bold text-[#33332A] natural-serif text-sm">
                  Mutation Register (दाखिल-खारिज / नामांतरण)
                </h4>
                <p className="text-[11px] text-[#6B6B58]">
                  Historical title transactions recorded under Section 149/150 Land Revenue Code
                </p>
              </div>
            </div>

            {/* Mutation List */}
            {record.mutations && record.mutations.length > 0 ? (
              <div className="space-y-2.5">
                {record.mutations.map((mut) => (
                  <div key={mut.mutationNumber} className="p-3 bg-[#F5F3EE] border border-[#DCD7CE] rounded-lg space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#5A5A40] text-xs font-mono">
                        Mutation #{mut.mutationNumber} ({mut.mutationType})
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        mut.status === 'SANCTIONED'
                          ? 'bg-[#EAF2EB] text-[#3D5A40]'
                          : 'bg-[#FFF9EA] text-[#8B4513]'
                      }`}>
                        {mut.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px] text-[#33332A]">
                      <div>
                        <span className="text-[#6B6B58] block text-[10px]">Transferor (देणारा):</span>
                        <span>{mut.transferor}</span>
                      </div>
                      <div>
                        <span className="text-[#6B6B58] block text-[10px]">Transferee (घेणारा):</span>
                        <span>{mut.transferee}</span>
                      </div>
                    </div>

                    <div className="pt-1 border-t border-[#DCD7CE] flex items-center justify-between text-[10px] text-[#6B6B58]">
                      <span>Order Date: {mut.dateOfOrder}</span>
                      <span>Sanctioned by: {mut.sanctioningOfficer}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 bg-[#FAF8F5] border border-[#DCD7CE] rounded-lg text-center text-[#6B6B58]">
                No pending or historical mutations registered on this folio.
              </div>
            )}

            {/* Automated Validation Results */}
            <div className="pt-2">
              <span className="text-[11px] font-bold text-[#33332A] uppercase block mb-2">
                Automated Validation Checks ({record.validationResults?.length || 0})
              </span>
              <div className="space-y-1.5">
                {record.validationResults?.map((v) => (
                  <div key={v.ruleId} className={`p-2 rounded border flex items-start gap-2 text-[11px] ${
                    v.passed 
                      ? 'bg-[#EAF2EB] text-[#3D5A40] border-[#BCD4C0]' 
                      : v.severity === 'CRITICAL'
                      ? 'bg-[#FDF0ED] text-[#8B0000] border-[#F2C2BA]'
                      : 'bg-[#FFF9EA] text-[#8B4513] border-[#DCD7CE]'
                  }`}>
                    {v.passed ? (
                      <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                    ) : (
                      <AlertTriangle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                    )}
                    <div>
                      <span className="font-bold block">{v.ruleName}</span>
                      <span className="opacity-90">{v.message}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 4. Action Footer */}
      <div className="p-3 border-t border-[#DCD7CE] bg-[#F5F3EE] flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          {userRole === 'CITIZEN_VIEWER' ? (
            <>
              {onScheduleWithGisOfficer && (
                <button
                  id="btn-citizen-schedule-gis-officer"
                  onClick={() => onScheduleWithGisOfficer(selectedPlot.khasra, selectedPlot.village)}
                  className="px-3 py-1.5 rounded-lg bg-[#5A5A40] hover:bg-[#43432F] text-[#FFF9EA] font-semibold flex items-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Schedule Hearing with GIS Officer</span>
                </button>
              )}

              {onScheduleWithGisOfficer && (
                <button
                  id="btn-citizen-submit-feedback"
                  onClick={() => onScheduleWithGisOfficer(selectedPlot.khasra, selectedPlot.village)}
                  className="px-3 py-1.5 rounded-lg bg-[#FAF8F5] hover:bg-[#EBE7DF] border border-[#DCD7CE] text-[#4A3728] font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#5A5A40]" />
                  <span>Submit Parcel Feedback</span>
                </button>
              )}
            </>
          ) : (
            <>
              {onNavigateToVerification && (
                <button
                  id="btn-open-in-verification"
                  onClick={onNavigateToVerification}
                  className="px-3 py-1.5 rounded-lg bg-[#5A5A40] hover:bg-[#43432F] text-[#FFF9EA] font-semibold flex items-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <FileCheck className="w-3.5 h-3.5" />
                  <span>Open in Verification Station</span>
                </button>
              )}

              <button
                id="btn-flag-discrepancy"
                onClick={() => {
                  setShowDiscrepancyToast(true);
                  setTimeout(() => setShowDiscrepancyToast(false), 3000);
                }}
                className="px-3 py-1.5 rounded-lg bg-[#FAF8F5] hover:bg-[#EBE7DF] border border-[#DCD7CE] text-[#4A3728] font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                <AlertTriangle className="w-3.5 h-3.5 text-[#8B4513]" />
                <span>Flag Alignment Notice</span>
              </button>
            </>
          )}
        </div>

        {showDiscrepancyToast && (
          <span className="text-[11px] text-[#8B4513] font-semibold bg-[#FFF9EA] px-2 py-1 rounded border border-[#DCD7CE]">
            Discrepancy flagged for Patwari field resurvey!
          </span>
        )}
      </div>
    </div>
  );
};
