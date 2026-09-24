import React, { useState } from 'react';
import {
  X,
  MapPin,
  Compass,
  FileSpreadsheet,
  Droplets,
  Layers,
  ShieldCheck,
  Calendar,
  Calculator,
  ChevronRight,
  Sparkles,
  Search,
  ExternalLink,
  Trees,
  CheckCircle2,
  Info
} from 'lucide-react';
import {
  REVENUE_VILLAGE_SPECIFICATIONS,
  RevenueVillageSpecification,
  getRevenueVillageSpecification
} from '../data/revenueVillageSpecifications';
import { VILLAGE_CENTERS } from '../data/cadastralPlotsData';

interface VillageSpecificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentVillageName: string;
  onSelectVillage?: (villageName: string) => void;
}

export const VillageSpecificationModal: React.FC<VillageSpecificationModalProps> = ({
  isOpen,
  onClose,
  currentVillageName,
  onSelectVillage
}) => {
  const [selectedVillageKey, setSelectedVillageKey] = useState<string>(currentVillageName || 'Wagholi');
  const [activeTab, setActiveTab] = useState<'cadastral' | 'agro' | 'soils' | 'units' | 'history'>('cadastral');
  const [searchFilter, setSearchFilter] = useState<string>('');
  
  // Interactive Local Unit Converter State
  const [unitInputValue, setUnitInputValue] = useState<number>(1);

  if (!isOpen) return null;

  const spec: RevenueVillageSpecification = getRevenueVillageSpecification(selectedVillageKey);

  // Available villages for quick selection
  const allVillages = Object.keys(VILLAGE_CENTERS);
  const filteredVillages = allVillages.filter((v) => {
    if (!searchFilter.trim()) return true;
    const query = searchFilter.toLowerCase();
    const vSpec = getRevenueVillageSpecification(v);
    return (
      v.toLowerCase().includes(query) ||
      vSpec.vernacularName.toLowerCase().includes(query) ||
      vSpec.state.toLowerCase().includes(query) ||
      vSpec.district.toLowerCase().includes(query) ||
      vSpec.censusVillageCode.includes(query)
    );
  });

  const convertedSqM = unitInputValue * (spec.localUnitToSqM || 100);
  const convertedAcres = convertedSqM / 4046.86;
  const convertedHectares = convertedSqM / 10000;

  const handleVillageChange = (villageName: string) => {
    setSelectedVillageKey(villageName);
    if (onSelectVillage) {
      onSelectVillage(villageName);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-[#FAF8F5] border border-[#DCD7CE] rounded-2xl shadow-2xl w-full max-w-5xl overflow-hidden my-auto flex flex-col max-h-[90vh]">
        {/* Header Ribbon */}
        <div className="bg-natural-olive text-[#FFF9EA] px-6 py-4 flex items-center justify-between border-b border-[#43432F] shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15">
              <Compass className="w-5 h-5 text-[#E5C37A]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold tracking-tight">
                  Revenue Village Specification Dossier
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E5C37A] text-[#2C3E2D]">
                  Cadastral Master Registry
                </span>
              </div>
              <p className="text-xs text-[#FFF9EA]/80">
                Agro-climatic classification, statutory tenurial rules, soil parameters &amp; customary water rights
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#FFF9EA]/70 hover:text-[#FFF9EA] hover:bg-white/10 transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Village Selection Bar */}
        <div className="bg-[#FFF9EA] border-b border-[#DCD7CE] px-6 py-3 shrink-0 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#8B4513] shrink-0" />
            <span className="text-xs font-bold text-[#4A3728] whitespace-nowrap">
              Active Village:
            </span>
            <select
              value={selectedVillageKey}
              onChange={(e) => handleVillageChange(e.target.value)}
              className="bg-white border border-[#DCD7CE] rounded-lg px-3 py-1.5 text-xs font-bold text-[#2C3E2D] focus:ring-2 focus:ring-[#8B4513] focus:outline-hidden cursor-pointer"
            >
              {allVillages.map((v) => {
                const s = getRevenueVillageSpecification(v);
                return (
                  <option key={v} value={v}>
                    {v} ({s.state}) - {s.vernacularName}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[#6B6B58] absolute left-2.5 top-2.5" />
              <input
                type="text"
                placeholder="Filter villages or state..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="pl-8 pr-3 py-1 text-xs bg-white border border-[#DCD7CE] rounded-lg focus:outline-hidden focus:ring-1 focus:ring-[#8B4513] w-48 text-[#2C3E2D]"
              />
            </div>
            {onSelectVillage && (
              <button
                onClick={() => {
                  onSelectVillage(selectedVillageKey);
                  onClose();
                }}
                className="px-3 py-1 text-xs font-bold bg-[#8B4513] hover:bg-[#6D340E] text-[#FFF9EA] rounded-lg shadow-xs flex items-center gap-1 cursor-pointer transition-colors"
              >
                <span>Open in GIS Map</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Village Summary Hero Card */}
        <div className="px-6 py-4 bg-white border-b border-[#DCD7CE] shrink-0">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h3 className="text-xl font-extrabold text-[#2C3E2D]">
                  {spec.villageName}
                </h3>
                <span className="text-base font-semibold text-[#8B4513]">
                  {spec.vernacularName}
                </span>
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-[#EAF2EB] text-[#2D4A30] border border-[#BCD4C0]">
                  LGD Code: {spec.censusVillageCode}
                </span>
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-[#FFF2E5] text-[#7D3C00] border border-[#F0C9A5]">
                  {spec.terrainType.replace(/_/g, ' ')}
                </span>
              </div>
              <p className="text-xs text-[#6B6B58] mt-1 flex items-center gap-1.5 flex-wrap">
                <span>{spec.gramPanchayat}</span>
                <span>&bull;</span>
                <span>{spec.revenueCircle}</span>
                <span>&bull;</span>
                <span className="font-semibold text-[#2C3E2D]">{spec.tehsil} Tehsil</span>
                <span>&bull;</span>
                <span className="font-semibold text-[#2C3E2D]">{spec.district} District</span>
                <span>&bull;</span>
                <span className="font-bold text-[#8B4513]">{spec.state}</span>
              </p>
            </div>

            <div className="flex items-center gap-3 text-right">
              <div className="bg-[#F5F3EE] p-2 rounded-xl border border-[#DCD7CE] text-center min-w-[100px]">
                <span className="text-[10px] text-[#6B6B58] uppercase font-bold block">Total Parcels</span>
                <span className="text-base font-extrabold text-[#2C3E2D]">{spec.totalSurveyParcels}</span>
              </div>
              <div className="bg-[#F5F3EE] p-2 rounded-xl border border-[#DCD7CE] text-center min-w-[100px]">
                <span className="text-[10px] text-[#6B6B58] uppercase font-bold block">Cadastral Area</span>
                <span className="text-base font-extrabold text-[#2C3E2D]">{spec.totalGeographicAreaHa} Ha</span>
              </div>
              <div className="bg-[#F5F3EE] p-2 rounded-xl border border-[#DCD7CE] text-center min-w-[100px]">
                <span className="text-[10px] text-[#6B6B58] uppercase font-bold block">Local Unit</span>
                <span className="text-xs font-extrabold text-[#8B4513]">{spec.primaryLocalUnit}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-[#FAF8F5] border-b border-[#DCD7CE] px-6 pt-2 shrink-0 flex gap-2 overflow-x-auto">
          {[
            { id: 'cadastral', label: 'Cadastral & Administrative', icon: FileSpreadsheet },
            { id: 'agro', label: 'Agro-Climatic & Terrain', icon: Compass },
            { id: 'soils', label: 'Soil Classes & Water Rights', icon: Droplets },
            { id: 'units', label: 'Measurement & Tenurial Legal Regime', icon: Calculator },
            { id: 'history', label: 'Bandobast & Drone Survey History', icon: Info }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? 'border-[#8B4513] text-[#8B4513] bg-white rounded-t-lg'
                    : 'border-transparent text-[#6B6B58] hover:text-[#2C3E2D] hover:bg-[#F0ECE1] rounded-t-lg'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Area (Scrollable) */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-[#FAF8F5]">
          {/* TAB 1: CADASTRAL & ADMINISTRATIVE */}
          {activeTab === 'cadastral' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-white border border-[#DCD7CE] shadow-2xs">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#6B6B58] block mb-1">
                    Primary Statutory Format
                  </span>
                  <div className="text-sm font-bold text-[#2C3E2D] mb-1">
                    {spec.primaryRorFormat}
                  </div>
                  <p className="text-xs text-[#6B6B58]">
                    Governed under {spec.statutoryAct}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#DCD7CE] shadow-2xs">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#6B6B58] block mb-1">
                    Cadastral Aks Shajra Sheet
                  </span>
                  <div className="text-sm font-bold text-[#8B4513] font-mono mb-1">
                    {spec.cadastralSheetNo}
                  </div>
                  <p className="text-xs text-[#6B6B58]">
                    Last Comprehensive Bandobast: <span className="font-semibold">{spec.lastBandobastYear}</span>
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#DCD7CE] shadow-2xs">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#6B6B58] block mb-1">
                    SVAMITVA &amp; DGPS Benchmarking
                  </span>
                  <div className="flex items-center gap-1.5 mb-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span className="text-sm font-bold text-emerald-800">
                      High-Resolution Orthophoto Digitized
                    </span>
                  </div>
                  <p className="text-xs text-[#6B6B58] font-mono">
                    Pillar Ref: {spec.dgpsBenchmarkPillar}
                  </p>
                </div>
              </div>

              {/* Administrative Hierarchy Card */}
              <div className="bg-white rounded-xl border border-[#DCD7CE] p-5">
                <h4 className="text-xs font-bold text-[#4A3728] uppercase tracking-wider mb-3 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#8B4513]" />
                  <span>Administrative &amp; Revenue Jurisdiction Chain</span>
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-2.5 rounded-lg bg-[#FAF8F5] border border-[#DCD7CE]">
                    <span className="text-[10px] text-[#6B6B58] block">State</span>
                    <span className="font-bold text-[#2C3E2D]">{spec.state}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#FAF8F5] border border-[#DCD7CE]">
                    <span className="text-[10px] text-[#6B6B58] block">District</span>
                    <span className="font-bold text-[#2C3E2D]">{spec.district}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#FAF8F5] border border-[#DCD7CE]">
                    <span className="text-[10px] text-[#6B6B58] block">Sub-Division</span>
                    <span className="font-bold text-[#2C3E2D]">{spec.subDivision}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#FAF8F5] border border-[#DCD7CE]">
                    <span className="text-[10px] text-[#6B6B58] block">Tehsil / Taluk</span>
                    <span className="font-bold text-[#2C3E2D]">{spec.tehsil}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#FAF8F5] border border-[#DCD7CE]">
                    <span className="text-[10px] text-[#6B6B58] block">Revenue Circle / Halka</span>
                    <span className="font-bold text-[#2C3E2D]">{spec.revenueCircle}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#FAF8F5] border border-[#DCD7CE]">
                    <span className="text-[10px] text-[#6B6B58] block">Gram Panchayat</span>
                    <span className="font-bold text-[#2C3E2D]">{spec.gramPanchayat}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#FAF8F5] border border-[#DCD7CE]">
                    <span className="text-[10px] text-[#6B6B58] block">Pargana / Hobli / Mouza</span>
                    <span className="font-bold text-[#2C3E2D]">{spec.parganaOrHobli}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#FAF8F5] border border-[#DCD7CE]">
                    <span className="text-[10px] text-[#6B6B58] block">Census LGD Code</span>
                    <span className="font-bold text-[#8B4513] font-mono">{spec.censusVillageCode}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: AGRO-CLIMATIC & TERRAIN */}
          {activeTab === 'agro' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-white border border-[#DCD7CE] shadow-2xs">
                  <span className="text-[10px] uppercase font-bold text-[#6B6B58] block mb-1">Agro-Climatic Zone</span>
                  <div className="text-xs font-bold text-[#2C3E2D] leading-snug">
                    {spec.agroClimaticZone}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#DCD7CE] shadow-2xs">
                  <span className="text-[10px] uppercase font-bold text-[#6B6B58] block mb-1">Elevation MSL</span>
                  <div className="text-base font-extrabold text-[#2C3E2D]">
                    {spec.elevationMeters} meters
                  </div>
                  <span className="text-[11px] text-[#6B6B58]">Above Mean Sea Level</span>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#DCD7CE] shadow-2xs">
                  <span className="text-[10px] uppercase font-bold text-[#6B6B58] block mb-1">Annual Rainfall</span>
                  <div className="text-base font-extrabold text-[#2C3E2D]">
                    {spec.annualRainfallMm} mm
                  </div>
                  <span className="text-[11px] text-[#6B6B58]">Normal meteorological mean</span>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#DCD7CE] shadow-2xs">
                  <span className="text-[10px] uppercase font-bold text-[#6B6B58] block mb-1">Geographic Centroid</span>
                  <div className="text-xs font-bold font-mono text-[#8B4513]">
                    {spec.centroid.lat.toFixed(4)}° N, {spec.centroid.lng.toFixed(4)}° E
                  </div>
                  <span className="text-[11px] text-[#6B6B58]">WGS84 Reference datum</span>
                </div>
              </div>

              {/* Cropping Pattern Card */}
              <div className="bg-white rounded-xl border border-[#DCD7CE] p-5">
                <h4 className="text-xs font-bold text-[#4A3728] uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#8B4513]" />
                  <span>Cropping Seasons &amp; Agro-Economy Profile</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="p-3 rounded-xl bg-[#FFF9EA] border border-[#DCD7CE]">
                    <span className="font-bold text-[#8B4513] block mb-2">Kharif Crops (Monsoon)</span>
                    <div className="flex flex-wrap gap-1.5">
                      {spec.kharifCrops.map((c) => (
                        <span key={c} className="px-2 py-0.5 bg-white text-[#4A3728] rounded-md font-medium border border-[#DCD7CE]">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#EAF2EB] border border-[#BCD4C0]">
                    <span className="font-bold text-[#2D4A30] block mb-2">Rabi Crops (Winter)</span>
                    <div className="flex flex-wrap gap-1.5">
                      {spec.rabiCrops.map((c) => (
                        <span key={c} className="px-2 py-0.5 bg-white text-[#2D4A30] rounded-md font-medium border border-[#BCD4C0]">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#EDF5FD] border border-[#BBD7F2]">
                    <span className="font-bold text-[#1B4B75] block mb-2">Zaid &amp; Perennial Cash Crops</span>
                    <div className="flex flex-wrap gap-1.5">
                      {spec.zaidOrPerennialCrops.map((c) => (
                        <span key={c} className="px-2 py-0.5 bg-white text-[#1B4B75] rounded-md font-medium border border-[#BBD7F2]">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SOILS & WATER RIGHTS */}
          {activeTab === 'soils' && (
            <div className="space-y-6 animate-fadeIn">
              {/* Soil Classification Grid */}
              <div>
                <h4 className="text-xs font-bold text-[#4A3728] uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#8B4513]" />
                  <span>Dominant Pedological Soil Series &amp; Vernacular Classification</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {spec.dominantSoils.map((soil, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-white border border-[#DCD7CE] shadow-2xs space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <h5 className="text-sm font-bold text-[#2C3E2D]">{soil.name}</h5>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          soil.fertilityRating === 'HIGH'
                            ? 'bg-emerald-100 text-emerald-800'
                            : soil.fertilityRating === 'SPECIALIZED'
                            ? 'bg-amber-100 text-amber-900'
                            : 'bg-stone-100 text-stone-700'
                        }`}>
                          {soil.fertilityRating} FERTILITY
                        </span>
                      </div>
                      <div className="text-xs font-semibold text-[#8B4513]">
                        Vernacular: {soil.vernacularName}
                      </div>
                      <div className="text-[11px] font-mono text-[#6B6B58]">
                        Taxonomy: {soil.classification}
                      </div>
                      <p className="text-xs text-[#5A5A40] pt-1 border-t border-[#DCD7CE]/60">
                        {soil.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Customary Water Rights Card */}
              <div className="bg-white rounded-xl border border-[#DCD7CE] p-5 space-y-4">
                <h4 className="text-xs font-bold text-[#4A3728] uppercase tracking-wider flex items-center gap-2">
                  <Droplets className="w-4 h-4 text-[#1B4B75]" />
                  <span>Irrigation Infrastructure &amp; Customary Water Rights</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3 rounded-lg bg-[#FAF8F5] border border-[#DCD7CE]">
                    <span className="text-[10px] text-[#6B6B58] block">Seasonal Canals</span>
                    <span className="text-base font-extrabold text-[#2C3E2D]">
                      {spec.irrigationInfrastructure.seasonalCanalsCount} Lines
                    </span>
                  </div>
                  <div className="p-3 rounded-lg bg-[#FAF8F5] border border-[#DCD7CE]">
                    <span className="text-[10px] text-[#6B6B58] block">Community Tanks &amp; Ponds</span>
                    <span className="text-base font-extrabold text-[#2C3E2D]">
                      {spec.irrigationInfrastructure.tankOrPondCount} Units
                    </span>
                  </div>
                  <div className="p-3 rounded-lg bg-[#FAF8F5] border border-[#DCD7CE]">
                    <span className="text-[10px] text-[#6B6B58] block">Energized Ag Tubewells</span>
                    <span className="text-base font-extrabold text-[#2C3E2D]">
                      {spec.irrigationInfrastructure.energizedTubewellsCount} Wells
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#EDF5FD] border border-[#BBD7F2] text-xs">
                  <span className="font-bold text-[#1B4B75] block mb-1">
                    Primary Water Source: {spec.irrigationInfrastructure.primarySource}
                  </span>
                  <p className="text-[#3A5672]">
                    <strong className="text-[#1B4B75]">Customary Right:</strong> {spec.irrigationInfrastructure.waterRightsCustom}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: UNITS & TENURIAL REGIME */}
          {activeTab === 'units' && (
            <div className="space-y-6 animate-fadeIn">
              {/* Interactive Unit Calculator */}
              <div className="p-5 rounded-xl bg-white border border-[#DCD7CE] shadow-2xs">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <h4 className="text-xs font-bold text-[#4A3728] uppercase tracking-wider flex items-center gap-2">
                    <Calculator className="w-4 h-4 text-[#8B4513]" />
                    <span>Local Land Unit &amp; Metric Area Calculator</span>
                  </h4>
                  <span className="text-xs font-mono font-bold text-[#8B4513] bg-[#FFF9EA] px-2.5 py-1 rounded-md border border-[#DCD7CE]">
                    {spec.unitFormulaDisplay}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-center pt-2">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#6B6B58]">
                      Quantity ({spec.primaryLocalUnit})
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      value={unitInputValue}
                      onChange={(e) => setUnitInputValue(parseFloat(e.target.value) || 0)}
                      className="w-full bg-[#FAF8F5] border border-[#DCD7CE] rounded-lg px-3 py-2 text-sm font-bold text-[#2C3E2D] focus:ring-2 focus:ring-[#8B4513] focus:outline-hidden"
                    />
                  </div>

                  <div className="p-3 rounded-lg bg-[#FAF8F5] border border-[#DCD7CE] text-center">
                    <span className="text-[10px] text-[#6B6B58] block">Square Meters</span>
                    <span className="text-sm font-extrabold text-[#2C3E2D]">
                      {convertedSqM.toLocaleString('en-IN', { maximumFractionDigits: 1 })} sq.m
                    </span>
                  </div>

                  <div className="p-3 rounded-lg bg-[#FAF8F5] border border-[#DCD7CE] text-center">
                    <span className="text-[10px] text-[#6B6B58] block">Standard Acres</span>
                    <span className="text-sm font-extrabold text-[#2C3E2D]">
                      {convertedAcres.toFixed(3)} Ac
                    </span>
                  </div>

                  <div className="p-3 rounded-lg bg-[#FAF8F5] border border-[#DCD7CE] text-center">
                    <span className="text-[10px] text-[#6B6B58] block">Metric Hectares</span>
                    <span className="text-sm font-extrabold text-[#8B4513]">
                      {convertedHectares.toFixed(4)} Ha
                    </span>
                  </div>
                </div>
              </div>

              {/* Tenurial Regime & Protections */}
              <div className="bg-white rounded-xl border border-[#DCD7CE] p-5 space-y-4">
                <h4 className="text-xs font-bold text-[#4A3728] uppercase tracking-wider flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#8B4513]" />
                  <span>Tenurial Rights &amp; Statutory Legal Protections</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-3.5 rounded-lg bg-[#FAF8F5] border border-[#DCD7CE]">
                    <span className="text-[10px] uppercase font-bold text-[#6B6B58] block mb-1">
                      Registered Tenure Regime
                    </span>
                    <span className="font-bold text-[#2C3E2D] text-sm block mb-1">
                      {spec.tenureRegime}
                    </span>
                    <span className="text-[#6B6B58]">
                      Average statutory land revenue: <strong>₹{spec.avgAnnualRevenuePerHa.toFixed(2)} / Hectare / Year</strong>
                    </span>
                  </div>

                  <div className="p-3.5 rounded-lg bg-[#FAF8F5] border border-[#DCD7CE]">
                    <span className="text-[10px] uppercase font-bold text-[#6B6B58] block mb-1">
                      Special Statutory Easements &amp; Restrictions
                    </span>
                    <ul className="space-y-1 mt-1">
                      {spec.specialStatutoryProtections.map((p, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-xs text-[#4A3728]">
                          <span className="text-[#8B4513] font-bold">&bull;</span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: HISTORY & BANDOBAST */}
          {activeTab === 'history' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-white rounded-xl border border-[#DCD7CE] p-5 space-y-4">
                <h4 className="text-xs font-bold text-[#4A3728] uppercase tracking-wider flex items-center gap-2">
                  <Info className="w-4 h-4 text-[#8B4513]" />
                  <span>Bandobast Revision &amp; Cartographic History</span>
                </h4>
                <p className="text-xs text-[#4A3728] leading-relaxed bg-[#FFF9EA] p-4 rounded-xl border border-[#DCD7CE]">
                  {spec.revenueHistoryRemarks}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-2">
                  <div className="p-3 rounded-lg bg-[#FAF8F5] border border-[#DCD7CE]">
                    <span className="text-[10px] text-[#6B6B58] block">Settlement Era</span>
                    <span className="font-bold text-[#2C3E2D]">{spec.lastBandobastYear} Cadastral Bandobast</span>
                  </div>
                  <div className="p-3 rounded-lg bg-[#FAF8F5] border border-[#DCD7CE]">
                    <span className="text-[10px] text-[#6B6B58] block">SVAMITVA Drone Map</span>
                    <span className="font-bold text-emerald-800">100% Large Scale Mapping</span>
                  </div>
                  <div className="p-3 rounded-lg bg-[#FAF8F5] border border-[#DCD7CE]">
                    <span className="text-[10px] text-[#6B6B58] block">Primary Survey Instrument</span>
                    <span className="font-bold text-[#8B4513]">DGPS + Total Station + Drone</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-[#FAF8F5] border-t border-[#DCD7CE] px-6 py-3 shrink-0 flex items-center justify-between text-xs text-[#6B6B58]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
            <span>Digital India Land Records Modernization Programme (DILRMP) Master Sync</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold bg-white hover:bg-[#F5F3EE] text-[#4A3728] border border-[#DCD7CE] rounded-lg transition-colors cursor-pointer"
          >
            Close Dossier
          </button>
        </div>
      </div>
    </div>
  );
};
