import React, { useState, useMemo } from 'react';
import { 
  Filter, 
  Check, 
  Eye, 
  EyeOff, 
  Sparkles, 
  Building2, 
  UserCheck, 
  Trees, 
  ShieldAlert, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  RotateCcw, 
  X, 
  Search, 
  ChevronRight,
  SlidersHorizontal,
  MapPin,
  Layers
} from 'lucide-react';
import { CadastralPlot } from '../data/cadastralPlotsData';
import { ExtractedLandRecord } from '../types';
import { 
  LandType, 
  LAND_TYPE_CONFIG, 
  getPlotLandType, 
  DisplayValidationStatus, 
  VALIDATION_STATUS_CONFIG, 
  getPlotValidationStatus 
} from '../utils/cadastralUtils';

export interface CadastralFilterSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  plots: CadastralPlot[];
  records: ExtractedLandRecord[];
  selectedKhasra: string;
  onSelectPlot: (plot: CadastralPlot) => void;
  visibleLandTypes: Record<LandType, boolean>;
  onToggleLandType: (type: LandType) => void;
  onResetLandTypes: () => void;
  selectedValidationStatus: DisplayValidationStatus | 'ALL';
  onChangeValidationStatus: (status: DisplayValidationStatus | 'ALL') => void;
  highlightOnly: boolean;
  onToggleHighlightOnly: () => void;
  className?: string;
}

export const CadastralFilterSidebar: React.FC<CadastralFilterSidebarProps> = ({
  isOpen,
  onToggle,
  plots,
  records,
  selectedKhasra,
  onSelectPlot,
  visibleLandTypes,
  onToggleLandType,
  onResetLandTypes,
  selectedValidationStatus,
  onChangeValidationStatus,
  highlightOnly,
  onToggleHighlightOnly,
  className = ''
}) => {
  const [khasraSearch, setKhasraSearch] = useState<string>('');

  // Group and count plots by Land Type
  const landTypeCounts = useMemo(() => {
    const counts: Record<LandType, { count: number; totalAreaHa: number }> = {
      GOVERNMENT: { count: 0, totalAreaHa: 0 },
      PRIVATE: { count: 0, totalAreaHa: 0 },
      COMMON: { count: 0, totalAreaHa: 0 }
    };

    plots.forEach((plot) => {
      const type = getPlotLandType(plot);
      counts[type].count += 1;
      counts[type].totalAreaHa += plot.areaHa;
    });

    return counts;
  }, [plots]);

  // Group and count plots by Validation Status
  const statusCounts = useMemo(() => {
    const counts: Record<DisplayValidationStatus | 'ALL', number> = {
      ALL: plots.length,
      VERIFIED_AND_SANCTIONED: 0,
      PARTIALLY_VERIFIED: 0,
      NEEDS_REVIEW: 0,
      PENDING_EXTRACTION: 0,
      LITIGATION: 0
    };

    plots.forEach((plot) => {
      const status = getPlotValidationStatus(plot, records);
      counts[status] += 1;
    });

    return counts;
  }, [plots, records]);

  // Filtered Khasra plots list
  const filteredKhasras = useMemo(() => {
    return plots.filter((plot) => {
      const landType = getPlotLandType(plot);
      // Check land type visibility
      if (!visibleLandTypes[landType]) {
        return false;
      }

      // Check validation status if filtered
      if (selectedValidationStatus !== 'ALL') {
        const status = getPlotValidationStatus(plot, records);
        if (status !== selectedValidationStatus) {
          return false;
        }
      }

      // Check search query
      if (khasraSearch.trim()) {
        const q = khasraSearch.toLowerCase();
        return (
          plot.khasra.toLowerCase().includes(q) ||
          plot.owner.toLowerCase().includes(q) ||
          plot.khata.toLowerCase().includes(q)
        );
      }

      return true;
    });
  }, [plots, records, visibleLandTypes, selectedValidationStatus, khasraSearch]);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (!visibleLandTypes.GOVERNMENT || !visibleLandTypes.PRIVATE || !visibleLandTypes.COMMON) {
      count += (visibleLandTypes.GOVERNMENT ? 0 : 1) + (visibleLandTypes.PRIVATE ? 0 : 1) + (visibleLandTypes.COMMON ? 0 : 1);
    }
    if (selectedValidationStatus !== 'ALL') {
      count += 1;
    }
    return count;
  }, [visibleLandTypes, selectedValidationStatus]);

  const handleResetAll = () => {
    onResetLandTypes();
    onChangeValidationStatus('ALL');
    setKhasraSearch('');
  };

  if (!isOpen) {
    return (
      <button
        id="btn-open-filter-sidebar"
        onClick={onToggle}
        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#FAF8F5] hover:bg-[#F5F3EE] text-[#4A3728] border border-[#DCD7CE] text-xs font-semibold shadow-2xs transition-all cursor-pointer"
        title="Open Land Type and Validation Status Filters"
      >
        <SlidersHorizontal className="w-3.5 h-3.5 text-[#5A5A40]" />
        <span>Filters & Land Types</span>
        {activeFiltersCount > 0 && (
          <span className="w-5 h-5 rounded-full bg-[#5A5A40] text-[#FFF9EA] text-[10px] font-mono flex items-center justify-center font-bold">
            {activeFiltersCount}
          </span>
        )}
      </button>
    );
  }

  return (
    <aside 
      id="cadastral-filter-sidebar" 
      aria-label="Cadastral GIS Filter Sidebar"
      className={`bg-[#FAF8F5] rounded-xl border border-[#DCD7CE] p-4 text-xs text-[#33332A] shadow-md flex flex-col space-y-4 max-h-[800px] overflow-y-auto transition-all ${className}`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#DCD7CE]">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-[#5A5A40] text-[#FFF9EA]">
            <Filter className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold natural-serif text-sm text-[#33332A] flex items-center gap-1.5">
              <span>GIS Layer Filters</span>
              {activeFiltersCount > 0 && (
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-[#E5C37A] text-[#1F2018] font-bold">
                  {activeFiltersCount} Active
                </span>
              )}
            </h3>
            <span className="text-[10px] text-[#6B6B58]">
              Land type visibility & validation highlighting
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {activeFiltersCount > 0 && (
            <button
              id="btn-reset-filters"
              onClick={handleResetAll}
              className="p-1 rounded text-[#6B6B58] hover:text-[#33332A] hover:bg-[#EBE7DF] transition-colors cursor-pointer text-[11px] flex items-center gap-1"
              title="Reset all filters to default"
            >
              <RotateCcw className="w-3 h-3" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          )}
          <button
            id="btn-close-filter-sidebar"
            onClick={onToggle}
            className="p-1 rounded text-[#6B6B58] hover:text-[#33332A] hover:bg-[#EBE7DF] transition-colors cursor-pointer"
            title="Collapse Filter Sidebar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* SECTION 1: Land Types Visibility Toggles */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="font-bold text-[11px] uppercase tracking-wider text-[#5A5A40] flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-[#5A5A40]" />
            <span>1. Land Type Visibility (भू-प्रकार)</span>
          </span>
          <div className="flex items-center gap-1 text-[10px]">
            <button
              id="btn-landtypes-all"
              onClick={onResetLandTypes}
              className="text-[#5A5A40] hover:underline cursor-pointer font-semibold"
            >
              Show All
            </button>
          </div>
        </div>

        <div className="space-y-1.5">
          {(['GOVERNMENT', 'PRIVATE', 'COMMON'] as LandType[]).map((type) => {
            const config = LAND_TYPE_CONFIG[type];
            const isVisible = visibleLandTypes[type];
            const stats = landTypeCounts[type];

            return (
              <div
                key={type}
                id={`filter-landtype-${type.toLowerCase()}`}
                onClick={() => onToggleLandType(type)}
                className={`p-2.5 rounded-lg border transition-all cursor-pointer flex items-center justify-between gap-2.5 ${
                  isVisible
                    ? 'bg-[#FFFFFF] border-[#DCD7CE] shadow-2xs hover:border-[#5A5A40]'
                    : 'bg-[#F5F3EE]/70 border-dashed border-[#DCD7CE] opacity-60 hover:opacity-90'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className="w-4 h-4 rounded flex items-center justify-center text-white shrink-0"
                    style={{ backgroundColor: config.colorHex }}
                  >
                    {isVisible ? <Check className="w-3 h-3 stroke-[3]" /> : <X className="w-3 h-3 stroke-[3]" />}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-xs text-[#33332A] truncate">
                        {config.label}
                      </span>
                      <span 
                        className="text-[9px] font-semibold px-1.5 py-0.2 rounded border truncate"
                        style={{ 
                          backgroundColor: config.badgeBg, 
                          color: config.badgeText, 
                          borderColor: config.badgeBorder 
                        }}
                      >
                        {config.indicLabel.split(' ')[0]}
                      </span>
                    </div>
                    <span className="text-[10px] text-[#6B6B58] block truncate">
                      {config.description}
                    </span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="font-mono font-bold text-xs text-[#33332A] block">
                    {stats.count} {stats.count === 1 ? 'plot' : 'plots'}
                  </span>
                  <span className="text-[10px] text-[#6B6B58] font-mono">
                    {stats.totalAreaHa.toFixed(2)} Ha
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 2: Validation Status Filter & Highlighting */}
      <div className="space-y-2.5 pt-2 border-t border-[#DCD7CE]">
        <div className="flex items-center justify-between">
          <span className="font-bold text-[11px] uppercase tracking-wider text-[#5A5A40] flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-[#5A5A40]" />
            <span>2. Validation Status (सत्यापन)</span>
          </span>
          <button
            id="btn-toggle-highlight-mode"
            onClick={onToggleHighlightOnly}
            className={`px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 border transition-colors cursor-pointer ${
              highlightOnly
                ? 'bg-amber-100 text-amber-900 border-amber-300'
                : 'bg-[#F5F3EE] text-[#4A3728] border-[#DCD7CE]'
            }`}
            title="Toggle between highlighting matching plots vs isolating/filtering only matching plots"
          >
            <Sparkles className="w-3 h-3 text-[#B45309]" />
            <span>{highlightOnly ? 'Filter Visibility' : 'Highlight Mode'}</span>
          </button>
        </div>

        {/* Status Option Pills */}
        <div className="grid grid-cols-2 gap-1.5">
          <button
            id="btn-status-all"
            onClick={() => onChangeValidationStatus('ALL')}
            className={`px-2.5 py-1.5 rounded-lg text-[11px] font-semibold flex items-center justify-between transition-all cursor-pointer border ${
              selectedValidationStatus === 'ALL'
                ? 'bg-[#5A5A40] text-[#FFF9EA] border-[#43432F] shadow-2xs font-bold'
                : 'bg-[#FFFFFF] text-[#4A3728] border-[#DCD7CE] hover:bg-[#F5F3EE]'
            }`}
          >
            <span>All Statuses</span>
            <span className="font-mono text-[10px] px-1 rounded bg-black/10">
              {statusCounts.ALL}
            </span>
          </button>

          {(['VERIFIED_AND_SANCTIONED', 'NEEDS_REVIEW', 'PARTIALLY_VERIFIED', 'LITIGATION'] as DisplayValidationStatus[]).map((st) => {
            const config = VALIDATION_STATUS_CONFIG[st];
            const isSelected = selectedValidationStatus === st;
            const count = statusCounts[st];

            return (
              <button
                key={st}
                id={`btn-status-${st.toLowerCase()}`}
                onClick={() => onChangeValidationStatus(st)}
                className={`px-2 py-1.5 rounded-lg text-[10px] font-semibold flex items-center justify-between transition-all cursor-pointer border text-left ${
                  isSelected
                    ? 'border-2 shadow-2xs font-bold'
                    : 'bg-[#FFFFFF] text-[#4A3728] border-[#DCD7CE] hover:bg-[#F5F3EE]'
                }`}
                style={
                  isSelected
                    ? { 
                        backgroundColor: config.badgeBg, 
                        borderColor: config.colorHex, 
                        color: config.badgeText 
                      }
                    : {}
                }
              >
                <div className="flex items-center gap-1.5 truncate">
                  <span 
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: config.colorHex }}
                  />
                  <span className="truncate">{config.label.split('/')[0].trim()}</span>
                </div>
                <span className="font-mono text-[9px] px-1 rounded bg-black/10 shrink-0 ml-1">
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* SECTION 3: Highlighted & Filtered Khasra Numbers List */}
      <div className="space-y-2 pt-2 border-t border-[#DCD7CE]">
        <div className="flex items-center justify-between text-[11px]">
          <span className="font-bold uppercase tracking-wider text-[#5A5A40]">
            3. Matching Khasra Numbers ({filteredKhasras.length})
          </span>
          <span className="text-[10px] text-[#6B6B58]">
            Click parcel to center map
          </span>
        </div>

        {/* Quick Khasra Search Filter */}
        <div className="relative">
          <input
            id="input-sidebar-khasra-search"
            type="text"
            placeholder="Search Khasra / Owner..."
            value={khasraSearch}
            onChange={(e) => setKhasraSearch(e.target.value)}
            className="w-full pl-7 pr-2.5 py-1 rounded-lg border border-[#DCD7CE] bg-[#FFFFFF] text-xs text-[#33332A] placeholder:text-[#A3A390] focus:outline-hidden focus:border-[#5A5A40]"
          />
          <Search className="w-3.5 h-3.5 text-[#6B6B58] absolute left-2 top-2" />
        </div>

        {/* Khasra List */}
        <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
          {filteredKhasras.length === 0 ? (
            <div className="p-4 rounded-lg bg-[#F5F3EE] text-center text-xs text-[#6B6B58]">
              No land parcels match the selected filters.
            </div>
          ) : (
            filteredKhasras.map((plot) => {
              const isSelected = plot.khasra === selectedKhasra;
              const landType = getPlotLandType(plot);
              const valStatus = getPlotValidationStatus(plot, records);
              const landMeta = LAND_TYPE_CONFIG[landType];
              const statusMeta = VALIDATION_STATUS_CONFIG[valStatus];

              return (
                <div
                  key={plot.khasra}
                  id={`item-sidebar-khasra-${plot.khasra.replace('/', '-')}`}
                  onClick={() => onSelectPlot(plot)}
                  className={`p-2 rounded-lg border transition-all cursor-pointer flex items-center justify-between gap-2 ${
                    isSelected
                      ? 'bg-[#FFF9EA] border-[#8B4513] shadow-2xs'
                      : 'bg-[#FFFFFF] border-[#DCD7CE] hover:border-[#5A5A40] hover:bg-[#FDFCF9]'
                  }`}
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-xs natural-serif text-[#33332A]">
                        Khasra #{plot.khasra}
                      </span>
                      {isSelected && (
                        <span className="text-[9px] bg-[#8B4513] text-[#FFF9EA] px-1 rounded font-bold">
                          Active
                        </span>
                      )}
                      <span 
                        className="text-[9px] px-1 py-0.2 rounded border font-semibold truncate"
                        style={{ 
                          backgroundColor: landMeta.badgeBg, 
                          color: landMeta.badgeText, 
                          borderColor: landMeta.badgeBorder 
                        }}
                      >
                        {landMeta.label.split(' ')[0]}
                      </span>
                    </div>

                    <span className="text-[10px] text-[#6B6B58] block truncate">
                      {plot.owner}
                    </span>
                  </div>

                  <div className="text-right shrink-0">
                    <span 
                      className="text-[9px] font-bold px-1.5 py-0.2 rounded border block mb-0.5"
                      style={{ 
                        backgroundColor: statusMeta.badgeBg, 
                        color: statusMeta.badgeText, 
                        borderColor: statusMeta.badgeBorder 
                      }}
                    >
                      {statusMeta.label.split(' ')[0]}
                    </span>
                    <span className="text-[10px] font-mono text-[#33332A]">
                      {plot.areaHa} Ha
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Footer Info */}
      <div className="pt-2 border-t border-[#DCD7CE] flex items-center justify-between text-[10px] text-[#6B6B58]">
        <span>Visible Area: <strong>{filteredKhasras.reduce((sum, p) => sum + p.areaHa, 0).toFixed(2)} Ha</strong></span>
        <span className="font-mono">{filteredKhasras.length} of {plots.length} Parcels</span>
      </div>
    </aside>
  );
};
