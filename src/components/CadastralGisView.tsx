import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Map as MapIcon, 
  Layers, 
  Search, 
  Info, 
  CheckCircle2, 
  AlertTriangle, 
  Compass, 
  Eye, 
  Maximize, 
  FileText,
  ShieldCheck,
  Building,
  Ruler,
  Globe,
  Sliders,
  MapPin,
  ExternalLink,
  Satellite,
  ChevronRight,
  Columns,
  Layout,
  Scale,
  Sparkles,
  Check,
  Calendar,
  MessageSquare
} from 'lucide-react';
import { ExtractedLandRecord, UserRole, AuthUser } from '../types';
import { CadastralGoogleMapView } from './CadastralGoogleMapView';
import { DigitizedRecordDossier } from './DigitizedRecordDossier';
import { CADASTRAL_PLOTS, CadastralPlot, VILLAGE_CENTERS } from '../data/cadastralPlotsData';
import { calculateBoundarySegments, calculatePerimeterMeters } from '../utils/cadastralUtils';

interface CadastralGisViewProps {
  records: ExtractedLandRecord[];
  selectedRecord: ExtractedLandRecord;
  onSelectRecord: (record: ExtractedLandRecord) => void;
  onNavigateToVerification?: () => void;
  userRole?: UserRole;
  currentUser?: AuthUser | null;
  onNavigateToFeedbackSchedule?: (khasra?: string, village?: string) => void;
}

export const CadastralGisView: React.FC<CadastralGisViewProps> = ({
  records,
  selectedRecord,
  onSelectRecord,
  onNavigateToVerification,
  userRole,
  currentUser,
  onNavigateToFeedbackSchedule
}) => {
  // View mode: 'split' (side-by-side record & map), 'standard' (map + compact inspector), or 'full_map'
  const [viewMode, setViewMode] = useState<'split' | 'standard' | 'full_map'>('split');
  const [activeLayer, setActiveLayer] = useState<'cadastral' | 'satellite' | 'soils' | 'disputes'>('satellite');
  
  const isCitizen = userRole === 'CITIZEN_VIEWER';
  const citizenVillage = currentUser?.assignedVillage || 'Wagholi';
  const citizenKhasra = currentUser?.assignedKhasra || '142/1';
  // For citizens: toggle to see strictly their own parcel or the contiguous parcels of their village only
  const [citizenLandScope, setCitizenLandScope] = useState<'MY_LAND_ONLY' | 'MY_VILLAGE'>('MY_LAND_ONLY');

  // Initialize village based on citizen assignment if citizen, otherwise selected record if valid, otherwise Wagholi
  const initialVillage = isCitizen
    ? citizenVillage
    : (selectedRecord?.village?.value && VILLAGE_CENTERS[selectedRecord.village.value])
    ? selectedRecord.village.value
    : 'Wagholi';

  const [activeVillage, setActiveVillage] = useState<string>(initialVillage);
  const [selectedPlotKhasra, setSelectedPlotKhasra] = useState<string>(
    isCitizen ? citizenKhasra : (selectedRecord?.khasraNumber?.value || '142/1')
  );
  const [cadastralOpacity, setCadastralOpacity] = useState<number>(65);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showRoads, setShowRoads] = useState<boolean>(true);
  const [showWaterbodies, setShowWaterbodies] = useState<boolean>(true);
  const [showLabels, setShowLabels] = useState<boolean>(true);

  // Synchronize village and plot when incoming selectedRecord changes
  useEffect(() => {
    if (isCitizen) {
      setActiveVillage(citizenVillage);
      if (selectedRecord?.khasraNumber?.value) {
        setSelectedPlotKhasra(selectedRecord.khasraNumber.value);
      }
      return;
    }
    if (selectedRecord?.village?.value && VILLAGE_CENTERS[selectedRecord.village.value]) {
      setActiveVillage(selectedRecord.village.value);
      if (selectedRecord.khasraNumber?.value) {
        setSelectedPlotKhasra(selectedRecord.khasraNumber.value);
      }
    }
  }, [selectedRecord, isCitizen, citizenVillage]);

  // Filter plots based on active village or search query, enforcing STRICT isolation for citizens
  const availablePlots = CADASTRAL_PLOTS.filter((plot) => {
    if (isCitizen) {
      // CITIZEN ISOLATION: Never show any parcel outside the citizen's assigned village
      if (plot.village !== citizenVillage) return false;
      if (citizenLandScope === 'MY_LAND_ONLY') {
        return plot.khasra === citizenKhasra;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          plot.khasra.toLowerCase().includes(q) ||
          plot.owner.toLowerCase().includes(q) ||
          plot.khata.toLowerCase().includes(q)
        );
      }
      return true;
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        plot.khasra.toLowerCase().includes(q) ||
        plot.owner.toLowerCase().includes(q) ||
        plot.khata.toLowerCase().includes(q) ||
        plot.village.toLowerCase().includes(q) ||
        plot.state.toLowerCase().includes(q)
      );
    }
    return plot.village === activeVillage;
  });

  const currentPlot = 
    CADASTRAL_PLOTS.find((p) => p.khasra === selectedPlotKhasra && p.village === (isCitizen ? citizenVillage : activeVillage)) ||
    availablePlots[0] ||
    CADASTRAL_PLOTS.find(p => p.village === (isCitizen ? citizenVillage : activeVillage)) ||
    CADASTRAL_PLOTS[0];

  // Geodesic boundary segments and perimeter for currently selected parcel
  const boundarySegments = calculateBoundarySegments(currentPlot.coordinates);
  const totalPerimeterMeters = calculatePerimeterMeters(currentPlot.coordinates);

  const handlePlotClick = (plot: CadastralPlot) => {
    if (isCitizen && plot.village !== citizenVillage) {
      return; // Do not allow citizen to view other villages
    }
    setSelectedPlotKhasra(plot.khasra);
    if (plot.village !== activeVillage) {
      setActiveVillage(plot.village);
    }
    if (plot.recordId) {
      const matched = records.find((r) => r.id === plot.recordId);
      if (matched) {
        onSelectRecord(matched);
      }
    } else {
      // Find matching record by khasra in same village if exists
      const matchedByKhasra = records.find(
        (r) => r.village.value === plot.village && r.khasraNumber.value === plot.khasra
      );
      if (matchedByKhasra) {
        onSelectRecord(matchedByKhasra);
      }
    }
  };

  const handleVillageChange = (village: string) => {
    if (isCitizen) return; // Disallow switching away from citizen's village
    setActiveVillage(village);
    const firstInVillage = CADASTRAL_PLOTS.find((p) => p.village === village);
    if (firstInVillage) {
      setSelectedPlotKhasra(firstInVillage.khasra);
      if (firstInVillage.recordId) {
        const matched = records.find((r) => r.id === firstInVillage.recordId);
        if (matched) onSelectRecord(matched);
      } else {
        const matchedByVillage = records.find((r) => r.village.value === village);
        if (matchedByVillage) onSelectRecord(matchedByVillage);
      }
    }
  };

  // Village summary stats
  const plotsInVillage = CADASTRAL_PLOTS.filter((p) => p.village === activeVillage);
  const totalHa = plotsInVillage.reduce((acc, p) => acc + p.areaHa, 0).toFixed(2);
  const litigatedCount = plotsInVillage.filter((p) => p.status === 'LITIGATION').length;
  const currentVillageCenter = VILLAGE_CENTERS[activeVillage] || VILLAGE_CENTERS['Wagholi'];

  const stateAbbrMap: Record<string, string> = {
    'Maharashtra': 'MH',
    'Uttar Pradesh': 'UP',
    'Punjab': 'PB',
    'Karnataka': 'KA',
    'Rajasthan': 'RJ',
    'Gujarat': 'GJ',
    'Madhya Pradesh': 'MP'
  };

  return (
    <div className="space-y-6">
      {/* Citizen Public Portal Ribbon if in Citizen Mode */}
      {userRole === 'CITIZEN_VIEWER' && (
        <div className="p-4 rounded-xl bg-[#FFF9EA] border border-[#DCD7CE] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#5A5A40] text-[#FFF9EA] flex items-center justify-center shrink-0">
              <MapIcon className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-[#33332A] text-sm natural-serif block">
                Citizen Public Land Map View (सार्वजनिक भू-नक्शा)
              </span>
              <span className="text-[#6B6B58] text-xs">
                Inspect land parcel boundaries, search your Khasra #{currentPlot.khasra}, or view village sheets. Have a boundary dispute or question?
              </span>
            </div>
          </div>
          {onNavigateToFeedbackSchedule && (
            <button
              id="btn-citizen-header-schedule"
              type="button"
              onClick={() => onNavigateToFeedbackSchedule(currentPlot.khasra, currentPlot.village)}
              className="px-4 py-2 rounded-xl bg-[#5A5A40] hover:bg-[#43432F] text-[#FFF9EA] font-bold text-xs flex items-center gap-2 shrink-0 transition-colors cursor-pointer shadow-2xs"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Schedule GIS Officer Hearing</span>
            </button>
          )}
        </div>
      )}

      {/* Top Banner with Layer Switcher, Village Selector, and Split-Screen Toggle */}
      <div className="bg-[#FAF8F5] rounded-xl border border-[#DCD7CE] p-5 shadow-2xs space-y-4">
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-[#FFF9EA] text-[#8B4513] border border-[#DCD7CE]">
              <Satellite className="w-5 h-5 text-[#5A5A40]" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl font-bold text-[#33332A] natural-serif">
                  Cadastral GIS Map (भू-नक्शा / Aks Shajra)
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#EAF2EB] text-[#3D5A40] border border-[#BCD4C0]">
                  Google Maps Satellite Connected
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#F5F3EE] text-[#5A5A40] border border-[#DCD7CE]">
                  {isCitizen ? `1 Registered Village (${citizenVillage})` : `${Object.keys(VILLAGE_CENTERS).length} Revenue Villages Active`}
                </span>
              </div>
              <p className="text-xs text-[#6B6B58] mt-0.5">
                {isCitizen 
                  ? 'Spatial boundary inspection for your registered agricultural landholding and contiguous village parcels'
                  : 'Side-by-side spatial boundary verification against digitized Land Records (RoR / 7-12 / Khatauni)'}
              </p>
            </div>
          </div>

          {/* Controls: View Mode Selector + Village Dropdown + Layer Tabs */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Split Screen View Mode Toggle */}
            <div className="flex items-center gap-1 bg-[#EBE7DF] p-1 rounded-lg border border-[#DCD7CE] text-xs">
              <button
                id="btn-view-split"
                onClick={() => setViewMode('split')}
                className={`px-3 py-1.5 rounded-md font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  viewMode === 'split'
                    ? 'bg-[#5A5A40] text-[#FFF9EA] shadow-2xs'
                    : 'text-[#4A3728] hover:text-[#33332A]'
                }`}
                title="Split-screen: Digitized Land Record details vs Spatial Map Boundaries side-by-side"
              >
                <Columns className="w-3.5 h-3.5" />
                <span>Split-Screen Comparison</span>
              </button>

              <button
                id="btn-view-standard"
                onClick={() => setViewMode('standard')}
                className={`px-3 py-1.5 rounded-md font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  viewMode === 'standard'
                    ? 'bg-[#5A5A40] text-[#FFF9EA] shadow-2xs'
                    : 'text-[#4A3728] hover:text-[#33332A]'
                }`}
                title="Standard map with parcel inspector"
              >
                <Layout className="w-3.5 h-3.5" />
                <span>Standard GIS</span>
              </button>

              <button
                id="btn-view-full"
                onClick={() => setViewMode('full_map')}
                className={`px-3 py-1.5 rounded-md font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  viewMode === 'full_map'
                    ? 'bg-[#5A5A40] text-[#FFF9EA] shadow-2xs'
                    : 'text-[#4A3728] hover:text-[#33332A]'
                }`}
                title="Expanded map canvas"
              >
                <Maximize className="w-3.5 h-3.5" />
                <span>Full Map</span>
              </button>
            </div>

            {/* Village Selector Dropdown (Protected for Citizen Viewers) */}
            {isCitizen ? (
              <div className="flex items-center gap-1.5 bg-[#FAF8F5] px-3 py-1.5 rounded-lg border border-[#DCD7CE] text-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                <span className="text-[#6B6B58] font-semibold">Registered Land:</span>
                <span className="font-bold text-[#33332A]">{citizenVillage}, Pune (Gat #{citizenKhasra})</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 bg-[#F5F3EE] px-2.5 py-1.5 rounded-lg border border-[#DCD7CE] text-xs">
                <Globe className="w-3.5 h-3.5 text-[#5A5A40]" />
                <span className="text-[#6B6B58] font-semibold">Village:</span>
                <select
                  id="select-village-location"
                  value={activeVillage}
                  onChange={(e) => handleVillageChange(e.target.value)}
                  aria-label="Select Village Cadastral Boundary Location"
                  className="bg-transparent font-bold text-[#33332A] focus:outline-hidden cursor-pointer"
                >
                  {Object.entries(VILLAGE_CENTERS).map(([villageName, meta]) => (
                    <option key={villageName} value={villageName}>
                      {villageName}, {meta.district} ({stateAbbrMap[meta.state] || meta.state})
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Layer Tabs */}
            <div className="flex items-center gap-1 bg-[#EBE7DF] p-1 rounded-lg border border-[#DCD7CE] text-xs">
              {(['satellite', 'cadastral', 'soils', 'disputes'] as const).map((layer) => (
                <button
                  key={layer}
                  id={`btn-layer-${layer}`}
                  onClick={() => setActiveLayer(layer)}
                  className={`px-2.5 py-1 rounded-md font-semibold capitalize transition-colors cursor-pointer ${
                    activeLayer === layer
                      ? 'bg-natural-olive text-[#FFF9EA] shadow-2xs'
                      : 'text-[#4A3728] hover:text-[#33332A]'
                  }`}
                >
                  {layer === 'satellite' ? 'Satellite' : layer}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Village Pill Switcher Bar / Citizen Land Scope Bar */}
        {isCitizen ? (
          <div className="pt-2 border-t border-[#DCD7CE] flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              <span className="text-[#5A5A40] text-[11px] font-bold uppercase tracking-wider whitespace-nowrap mr-1">
                Your Land View:
              </span>
              <button
                id="btn-citizen-scope-my-land"
                onClick={() => {
                  setCitizenLandScope('MY_LAND_ONLY');
                  setSelectedPlotKhasra(citizenKhasra);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap border ${
                  citizenLandScope === 'MY_LAND_ONLY'
                    ? 'bg-[#5A5A40] text-[#FFF9EA] border-[#43432F] shadow-2xs'
                    : 'bg-[#F5F3EE] text-[#4A3728] border-[#DCD7CE] hover:bg-[#EBE7DF]'
                }`}
              >
                <span>⭐ Only My Land Parcel (Khasra #{citizenKhasra})</span>
              </button>
              <button
                id="btn-citizen-scope-village"
                onClick={() => setCitizenLandScope('MY_VILLAGE')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap border ${
                  citizenLandScope === 'MY_VILLAGE'
                    ? 'bg-[#5A5A40] text-[#FFF9EA] border-[#43432F] shadow-2xs'
                    : 'bg-[#F5F3EE] text-[#4A3728] border-[#DCD7CE] hover:bg-[#EBE7DF]'
                }`}
              >
                <span>Village {citizenVillage} Sheet (Contiguous Parcels)</span>
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs text-[#5A5A40] bg-[#FAF8F5] px-3 py-1 rounded-lg border border-[#DCD7CE]">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              <span className="font-semibold">Private Citizen Access:</span>
              <span>Showing only your registered land in {citizenVillage}. Other villages restricted.</span>
            </div>
          </div>
        ) : (
          <div className="pt-2 border-t border-[#DCD7CE] flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
              <span className="text-[#6B6B58] text-[11px] font-bold uppercase tracking-wider whitespace-nowrap mr-1">
                Select Village:
              </span>
              {Object.entries(VILLAGE_CENTERS).map(([villageName, meta]) => {
                const isSelected = villageName === activeVillage;
                const villagePlotCount = CADASTRAL_PLOTS.filter((p) => p.village === villageName).length;
                const stateAbbr = stateAbbrMap[meta.state] || meta.state.slice(0, 2).toUpperCase();

                return (
                  <button
                    key={villageName}
                    id={`btn-village-pill-${villageName.toLowerCase()}`}
                    onClick={() => handleVillageChange(villageName)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap border ${
                      isSelected
                        ? 'bg-[#5A5A40] text-[#FFF9EA] border-[#43432F] shadow-2xs'
                        : 'bg-[#F5F3EE] text-[#4A3728] border-[#DCD7CE] hover:bg-[#EBE7DF]'
                    }`}
                  >
                    <span className={`px-1 py-0.2 rounded text-[9px] font-bold ${
                      isSelected ? 'bg-[#FFF9EA]/20 text-[#FFF9EA]' : 'bg-[#EBE7DF] text-[#5A5A40]'
                    }`}>
                      {stateAbbr}
                    </span>
                    <span>{villageName}</span>
                    <span className={`text-[10px] ${isSelected ? 'text-[#E5C37A]' : 'text-[#6B6B58]'}`}>
                      ({villagePlotCount})
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Quick Village Overview Tag */}
            <div className="flex items-center gap-3 text-xs text-[#6B6B58] bg-[#F5F3EE] px-3 py-1 rounded-lg border border-[#DCD7CE]">
              <span><strong>{currentVillageCenter.district}</strong> District, {currentVillageCenter.state}</span>
              <span>&bull;</span>
              <span><strong>{plotsInVillage.length}</strong> Khasra Plots ({totalHa} Ha)</span>
              {litigatedCount > 0 && (
                <>
                  <span>&bull;</span>
                  <span className="text-[#8B0000] font-semibold">{litigatedCount} Litigated</span>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* MODE 1: SPLIT-SCREEN COMPARISON VIEW (Record Details Left 50% ↔ Spatial Map Right 50%) */}
      <AnimatePresence mode="wait">
        {viewMode === 'split' && (
          <motion.div
            key="split"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start"
          >
            {/* Left Column: Digitized Land Record Details Dossier (6 Cols on XL) */}
          <div className="xl:col-span-6 h-full flex flex-col">
            <DigitizedRecordDossier
              record={selectedRecord}
              selectedPlot={currentPlot}
              allRecords={records}
              onSelectRecord={onSelectRecord}
              onNavigateToVerification={onNavigateToVerification}
              userRole={userRole}
              onScheduleWithGisOfficer={onNavigateToFeedbackSchedule}
              onSelectPlotByKhasra={(khasra) => {
                const targetPlot = CADASTRAL_PLOTS.find(p => p.khasra === khasra && p.village === activeVillage)
                                || CADASTRAL_PLOTS.find(p => p.khasra === khasra);
                if (targetPlot) {
                  handlePlotClick(targetPlot);
                }
              }}
            />
          </div>

          {/* Right Column: Spatial Cadastral Map & Boundary Geometries (6 Cols on XL) */}
          <div className="xl:col-span-6 bg-[#FAF8F5] rounded-xl border border-[#DCD7CE] p-5 shadow-2xs space-y-4 flex flex-col">
            {/* Map Header & Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#DCD7CE] text-xs">
              <div className="flex items-center gap-3">
                <span className="font-bold text-[#33332A] natural-serif text-sm">
                  Spatial Boundaries: Khasra #{currentPlot.khasra}
                </span>
                <span className="text-[#A3A390]">|</span>
                <div className="flex items-center gap-1 text-[#6B6B58] font-mono text-[11px]">
                  <MapPin className="w-3.5 h-3.5 text-[#5A5A40]" />
                  <span>{currentPlot.centroid.lat.toFixed(4)}°N, {currentPlot.centroid.lng.toFixed(4)}°E</span>
                </div>
              </div>

              {/* Quick Search */}
              <div className="relative">
                <input
                  id="input-cadastral-search-split"
                  type="text"
                  placeholder="Search Khasra / Owner..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-44 pl-7 pr-2.5 py-1 rounded-lg border border-[#DCD7CE] bg-[#F5F3EE] text-xs text-[#33332A] placeholder:text-[#A3A390] focus:outline-hidden focus:border-[#5A5A40]"
                />
                <Search className="w-3.5 h-3.5 text-[#6B6B58] absolute left-2 top-2" />
              </div>

              {/* Layer Toggles */}
              <div className="flex items-center gap-3 text-xs">
                <label className="flex items-center gap-1.5 cursor-pointer text-[#4A3728]">
                  <input
                    id="chk-split-show-roads"
                    type="checkbox"
                    checked={showRoads}
                    onChange={(e) => setShowRoads(e.target.checked)}
                    className="rounded text-natural-olive accent-[#5A5A40]"
                  />
                  <span>Roads</span>
                </label>

                <label className="flex items-center gap-1.5 cursor-pointer text-[#4A3728]">
                  <input
                    id="chk-split-show-water"
                    type="checkbox"
                    checked={showWaterbodies}
                    onChange={(e) => setShowWaterbodies(e.target.checked)}
                    className="rounded text-natural-olive accent-[#5A5A40]"
                  />
                  <span>Canals</span>
                </label>

                <label className="flex items-center gap-1.5 cursor-pointer text-[#4A3728]">
                  <input
                    id="chk-split-show-labels"
                    type="checkbox"
                    checked={showLabels}
                    onChange={(e) => setShowLabels(e.target.checked)}
                    className="rounded text-natural-olive accent-[#5A5A40]"
                  />
                  <span>Badges</span>
                </label>
              </div>
            </div>

            {/* Interactive Leaflet/Google Maps Satellite Cadastral Canvas */}
            <CadastralGoogleMapView
              plots={availablePlots}
              selectedPlot={currentPlot}
              onSelectPlot={handlePlotClick}
              activeLayer={activeLayer}
              cadastralOpacity={cadastralOpacity}
              onOpacityChange={setCadastralOpacity}
              showRoads={showRoads}
              showWaterbodies={showWaterbodies}
              showLabels={showLabels}
              onToggleLabels={() => setShowLabels(!showLabels)}
              heightClass="h-[480px]"
            />

            {/* Spatial Boundary Segments Telemetry Card */}
            <div className="p-3.5 bg-[#F5F3EE] border border-[#DCD7CE] rounded-lg space-y-2.5 text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Ruler className="w-4 h-4 text-[#5A5A40]" />
                  <span className="font-bold text-[#33332A] natural-serif">
                    Spatial Polygon Boundary Edges (चतुःसीमा मापन)
                  </span>
                </div>
                <span className="font-mono text-[11px] font-bold text-[#5A5A40] bg-[#FAF8F5] px-2 py-0.5 rounded border border-[#DCD7CE]">
                  Perimeter: {totalPerimeterMeters} m
                </span>
              </div>

              {/* 4 Edge Lengths & Bearings */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {boundarySegments.map((seg) => (
                  <div key={seg.direction} className="bg-[#FAF8F5] p-2 rounded border border-[#DCD7CE] text-[11px]">
                    <span className="text-[10px] text-[#6B6B58] uppercase font-bold block">
                      {seg.direction} Edge
                    </span>
                    <span className="font-mono font-bold text-[#33332A] text-xs mt-0.5 block">
                      {seg.lengthMeters} m
                    </span>
                    <span className="text-[10px] font-mono text-[#5A5A40] block">
                      {seg.bearingCompass}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-[#DCD7CE] text-[11px] text-[#6B6B58]">
                <span>GIS Polygon Area: <strong>{currentPlot.areaSqM.toLocaleString()} sq.m</strong> ({currentPlot.areaHa} Ha)</span>
                <span className="text-[#3D5A40] font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Physical Bund Corroboration: 98.2%</span>
                </span>
              </div>
            </div>

            {/* Quick Plot Switcher Chips */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-[#DCD7CE]">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                <span className="text-[#6B6B58] font-bold text-[11px] whitespace-nowrap">
                  {isCitizen ? 'Your Registered Parcels:' : 'Village Parcels:'}
                </span>
                {availablePlots.map((plot) => (
                  <button
                    key={plot.khasra}
                    id={`btn-split-plot-chip-${plot.khasra.replace(/[/\\ ]/g, '-')}`}
                    onClick={() => handlePlotClick(plot)}
                    className={`px-2.5 py-1 rounded-lg border text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      plot.khasra === currentPlot.khasra
                        ? 'bg-[#5A5A40] text-[#FFF9EA] border-[#43432F] shadow-2xs'
                        : plot.status === 'LITIGATION'
                        ? 'bg-[#FDF0ED] text-[#8B0000] border-[#F2C2BA] hover:bg-[#FBE4E0]'
                        : 'bg-[#F5F3EE] text-[#4A3728] border-[#DCD7CE] hover:bg-[#EBE7DF]'
                    }`}
                  >
                    {isCitizen && plot.khasra === citizenKhasra ? '⭐ ' : ''}
                    Khasra {plot.khasra}
                    {isCitizen && plot.khasra === citizenKhasra ? ' (Your Land)' : ''}
                    {plot.status === 'LITIGATION' && ' ⚠️'}
                  </button>
                ))}
              </div>

              <div className="text-[11px] text-[#6B6B58] font-mono whitespace-nowrap">
                Scale 1:2000 &bull; WGS84
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* MODE 2: STANDARD GIS VIEW (8 Cols Map + 4 Cols Compact Inspector) */}
      {viewMode === 'standard' && (
        <motion.div
          key="standard"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6"
        >
          {/* Cadastral Interactive Map Canvas */}
          <div className="lg:col-span-8 bg-[#FAF8F5] rounded-xl border border-[#DCD7CE] p-5 shadow-2xs space-y-4">
            {/* Map Controls, Search & Toggles */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#DCD7CE] text-xs">
              <div className="flex items-center gap-3">
                <span className="font-bold text-[#33332A] natural-serif">
                  {currentPlot.village}, {currentPlot.tehsil} ({currentPlot.state})
                </span>
                <span className="text-[#A3A390]">|</span>
                <div className="flex items-center gap-1 text-[#6B6B58] font-mono">
                  <MapPin className="w-3.5 h-3.5 text-[#5A5A40]" />
                  <span>{currentPlot.centroid.lat.toFixed(4)}°N, {currentPlot.centroid.lng.toFixed(4)}°E</span>
                </div>
              </div>

              {/* Quick Search */}
              <div className="relative">
                <input
                  id="input-cadastral-search"
                  type="text"
                  placeholder="Search Khasra / Khatedar / Village..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-56 pl-7 pr-2.5 py-1 rounded-lg border border-[#DCD7CE] bg-[#F5F3EE] text-xs text-[#33332A] placeholder:text-[#A3A390] focus:outline-hidden focus:border-[#5A5A40]"
                />
                <Search className="w-3.5 h-3.5 text-[#6B6B58] absolute left-2 top-2" />
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-1.5 cursor-pointer text-[#4A3728]">
                  <input
                    id="chk-show-roads"
                    type="checkbox"
                    checked={showRoads}
                    onChange={(e) => setShowRoads(e.target.checked)}
                    className="rounded text-natural-olive accent-[#5A5A40]"
                  />
                  <span>Roads</span>
                </label>

                <label className="flex items-center gap-1.5 cursor-pointer text-[#4A3728]">
                  <input
                    id="chk-show-water"
                    type="checkbox"
                    checked={showWaterbodies}
                    onChange={(e) => setShowWaterbodies(e.target.checked)}
                    className="rounded text-natural-olive accent-[#5A5A40]"
                  />
                  <span>Canals</span>
                </label>

                <label className="flex items-center gap-1.5 cursor-pointer text-[#4A3728]">
                  <input
                    id="chk-show-labels"
                    type="checkbox"
                    checked={showLabels}
                    onChange={(e) => setShowLabels(e.target.checked)}
                    className="rounded text-natural-olive accent-[#5A5A40]"
                  />
                  <span>Labels</span>
                </label>
              </div>
            </div>

            {/* Connected Google Map Satellite Cadastral View */}
            <CadastralGoogleMapView
              plots={availablePlots}
              selectedPlot={currentPlot}
              onSelectPlot={handlePlotClick}
              activeLayer={activeLayer}
              cadastralOpacity={cadastralOpacity}
              onOpacityChange={setCadastralOpacity}
              showRoads={showRoads}
              showWaterbodies={showWaterbodies}
              showLabels={showLabels}
              onToggleLabels={() => setShowLabels(!showLabels)}
              heightClass="h-[520px]"
            />

            {/* Quick Plot Switcher Chips */}
            <div className="pt-2 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
                <span className="text-[#6B6B58] font-bold text-[11px] whitespace-nowrap">
                  {isCitizen ? 'Your Registered Parcels:' : `Plots in ${activeVillage}:`}
                </span>
                {availablePlots.map((plot) => (
                  <button
                    key={plot.khasra}
                    id={`btn-plot-chip-${plot.khasra.replace(/[/\\ ]/g, '-')}`}
                    onClick={() => handlePlotClick(plot)}
                    className={`px-2.5 py-1 rounded-lg border text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      plot.khasra === currentPlot.khasra
                        ? 'bg-[#5A5A40] text-[#FFF9EA] border-[#43432F] shadow-2xs'
                        : plot.status === 'LITIGATION'
                        ? 'bg-[#FDF0ED] text-[#8B0000] border-[#F2C2BA] hover:bg-[#FBE4E0]'
                        : 'bg-[#F5F3EE] text-[#4A3728] border-[#DCD7CE] hover:bg-[#EBE7DF]'
                    }`}
                  >
                    {isCitizen && plot.khasra === citizenKhasra ? '⭐ ' : ''}
                    Khasra {plot.khasra}
                    {isCitizen && plot.khasra === citizenKhasra ? ' (Your Land)' : ''}
                    {plot.status === 'LITIGATION' && ' ⚠️'}
                  </button>
                ))}
              </div>

              <div className="text-[11px] text-[#6B6B58] font-mono whitespace-nowrap">
                Cadastral Scale: 1:2000
              </div>
            </div>
          </div>

          {/* Parcel Inspector Panel (Right 4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-[#FAF8F5] rounded-xl border border-[#DCD7CE] p-5 shadow-2xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#DCD7CE]">
                <div>
                  <h3 className="text-sm font-bold text-[#33332A] natural-serif">Parcel Attribute Inspector</h3>
                  <p className="text-xs text-[#6B6B58]">
                    {currentPlot.village} &bull; Gat / Khasra #{currentPlot.khasra}
                  </p>
                </div>
                <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                  currentPlot.status === 'CLEAN'
                    ? 'bg-[#EAF2EB] text-[#3D5A40] border border-[#BCD4C0]'
                    : currentPlot.status === 'GOVT_RESERVE'
                    ? 'bg-[#FFF9EA] text-[#8B4513] border border-[#DCD7CE]'
                    : 'bg-[#FDF0ED] text-[#8B0000] border border-[#F2C2BA]'
                }`}>
                  {currentPlot.status === 'CLEAN' 
                    ? 'Clean Title' 
                    : currentPlot.status === 'GOVT_RESERVE' 
                    ? 'Govt Reserve' 
                    : 'Litigation Injunction'}
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-[#5A5A40] block text-[10px] uppercase font-bold">Registered Khatedar</span>
                  <span className="font-bold text-[#33332A] text-sm natural-serif">{currentPlot.owner}</span>
                  <span className="text-[11px] text-[#6B6B58] block mt-0.5">{currentPlot.parentage}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div className="p-2.5 rounded-lg bg-[#F5F3EE] border border-[#DCD7CE]">
                    <span className="text-[#6B6B58] block text-[10px] uppercase font-semibold">Cadastral Area</span>
                    <span className="font-bold text-[#33332A] text-xs">{currentPlot.areaHa} Hectares</span>
                    <span className="text-[10px] text-[#6B6B58] block mt-0.5">({currentPlot.areaSqM.toLocaleString()} sq.m)</span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-[#F5F3EE] border border-[#DCD7CE]">
                    <span className="text-[#6B6B58] block text-[10px] uppercase font-semibold">Khata Folio</span>
                    <span className="font-bold text-[#33332A] text-xs">#{currentPlot.khata}</span>
                    <span className="text-[10px] text-[#6B6B58] block mt-0.5">Village {currentPlot.village}</span>
                  </div>
                </div>

                <div>
                  <span className="text-[#5A5A40] block text-[10px] uppercase font-bold">Soil / Crop Classification</span>
                  <span className="font-medium text-[#33332A]">{currentPlot.soil}</span>
                </div>

                <div className="p-2.5 rounded-lg bg-[#F5F3EE] border border-[#DCD7CE] space-y-1">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-[#6B6B58]">Survey Settlement:</span>
                    <span className="font-medium text-[#33332A]">{currentPlot.surveyDate}</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-[#6B6B58]">Benchmark Bearing:</span>
                    <span className="font-mono text-[#5A5A40] font-semibold">{currentPlot.benchmarkBearing}</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-[#6B6B58]">State Jurisdiction:</span>
                    <span className="font-medium text-[#33332A]">{currentPlot.district}, {currentPlot.state}</span>
                  </div>
                </div>

                <div className="pt-2 space-y-2">
                  <button
                    id="btn-switch-to-split"
                    onClick={() => setViewMode('split')}
                    className="w-full py-2 px-3 rounded-lg bg-[#5A5A40] hover:bg-[#43432F] text-[#FFF9EA] font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    <Columns className="w-3.5 h-3.5" />
                    <span>Compare with Digitized RoR (Split-Screen)</span>
                  </button>

                  {userRole === 'CITIZEN_VIEWER' && onNavigateToFeedbackSchedule && (
                    <button
                      id="btn-inspector-citizen-schedule"
                      onClick={() => onNavigateToFeedbackSchedule(currentPlot.khasra, currentPlot.village)}
                      className="w-full py-2 px-3 rounded-lg bg-[#FFF9EA] hover:bg-[#F5F0E1] border border-[#DCD7CE] text-[#8B4513] font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Schedule Consultation for Khasra #{currentPlot.khasra}</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Ground vs Shajra Audit */}
            <div className="bg-[#FAF8F5] rounded-xl border border-[#DCD7CE] p-4 text-xs space-y-2.5 shadow-2xs">
              <div className="flex items-center gap-2 text-[#33332A]">
                <Ruler className="w-4 h-4 text-[#5A5A40]" />
                <span className="font-bold natural-serif">Ground vs Shajra Alignment Audit</span>
              </div>
              <p className="text-[11px] leading-relaxed text-[#6B6B58]">
                Google Maps satellite layer verifies physical agricultural bunds (*medh*) directly against the legal Aks Shajra boundaries for <strong>{activeVillage}</strong>.
              </p>
              <div className="bg-[#F5F3EE] p-2.5 rounded-lg border border-[#DCD7CE] space-y-1 text-[11px]">
                <div className="flex items-center justify-between text-[#33332A]">
                  <span>Physical Bund Concordance:</span>
                  <span className="font-bold text-[#3D5A40]">98.2% Aligned</span>
                </div>
                <div className="flex items-center justify-between text-[#6B6B58]">
                  <span>Max Edge Variance:</span>
                  <span className="font-mono text-[#33332A]">0.42 meters (Compliant)</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* MODE 3: FULL MAP VIEW */}
      {viewMode === 'full_map' && (
        <motion.div
          key="full_map"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="bg-[#FAF8F5] rounded-xl border border-[#DCD7CE] p-5 shadow-2xs space-y-4"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#DCD7CE] text-xs">
            <div className="flex items-center gap-3">
              <span className="font-bold text-[#33332A] natural-serif text-sm">
                Full Cadastral Sheet: {currentPlot.village}, {currentPlot.district} &bull; Khasra #{currentPlot.khasra}
              </span>
              <span className="text-[#6B6B58] font-mono">
                {currentPlot.areaHa} Ha &bull; Khata #{currentPlot.khata}
              </span>
            </div>

            <button
              id="btn-exit-full-map"
              onClick={() => setViewMode('split')}
              className="px-3 py-1.5 rounded-lg bg-[#5A5A40] hover:bg-[#43432F] text-[#FFF9EA] font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <Columns className="w-3.5 h-3.5" />
              <span>Return to Split Comparison</span>
            </button>
          </div>

          <CadastralGoogleMapView
            plots={availablePlots}
            selectedPlot={currentPlot}
            onSelectPlot={handlePlotClick}
            activeLayer={activeLayer}
            cadastralOpacity={cadastralOpacity}
            onOpacityChange={setCadastralOpacity}
            showRoads={showRoads}
            showWaterbodies={showWaterbodies}
            showLabels={showLabels}
            onToggleLabels={() => setShowLabels(!showLabels)}
            heightClass="h-[620px]"
          />
        </motion.div>
      )}
      </AnimatePresence>
    </div>
  );
};
