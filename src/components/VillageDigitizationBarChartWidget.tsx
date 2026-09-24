import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  Cell
} from 'recharts';
import {
  BarChart3,
  Calendar,
  Layers,
  CheckCircle2,
  AlertTriangle,
  MapPin,
  Filter,
  ArrowUpDown,
  Download,
  ExternalLink,
  ChevronRight,
  Sparkles,
  TrendingUp,
  Info,
  Maximize2,
  SlidersHorizontal,
  FileSpreadsheet
} from 'lucide-react';
import { ExtractedLandRecord } from '../types';
import {
  calculateVillage30DayDigitizationSummary,
  Village30DayDigitizationSummary
} from '../data/villageDigitizationSummary';
import { getRevenueVillageSpecification } from '../data/revenueVillageSpecifications';

interface VillageDigitizationBarChartWidgetProps {
  records: ExtractedLandRecord[];
  onFilterVillage?: (villageName: string) => void;
  onOpenVillageModal?: (villageName: string) => void;
}

type ChartMetricMode = 'TOTAL' | 'STACKED_STATUS' | 'AREA_HA';
type ChartOrientation = 'HORIZONTAL' | 'VERTICAL';
type SortOption = 'VOLUME_DESC' | 'VOLUME_ASC' | 'PASS_RATE' | 'NAME_ASC';

export const VillageDigitizationBarChartWidget: React.FC<VillageDigitizationBarChartWidgetProps> = ({
  records,
  onFilterVillage,
  onOpenVillageModal
}) => {
  const [metricMode, setMetricMode] = useState<ChartMetricMode>('STACKED_STATUS');
  const [orientation, setOrientation] = useState<ChartOrientation>('HORIZONTAL');
  const [selectedState, setSelectedState] = useState<string>('ALL');
  const [villageDisplayLimit, setVillageDisplayLimit] = useState<number>(10);
  const [sortBy, setSortBy] = useState<SortOption>('VOLUME_DESC');
  const [selectedVillageName, setSelectedVillageName] = useState<string | null>(null);

  // Compute 30-day stats
  const { villageSummaries, overallTotals } = useMemo(() => {
    return calculateVillage30DayDigitizationSummary(records);
  }, [records]);

  // Unique states for filtering
  const availableStates = useMemo(() => {
    const states = new Set(villageSummaries.map((v) => v.state));
    return ['ALL', ...Array.from(states).sort()];
  }, [villageSummaries]);

  // Filter and sort villages
  const processedVillages = useMemo(() => {
    let list = [...villageSummaries];

    // State filter
    if (selectedState !== 'ALL') {
      list = list.filter((v) => v.state.toLowerCase() === selectedState.toLowerCase());
    }

    // Sort
    list.sort((a, b) => {
      if (sortBy === 'VOLUME_DESC') return b.totalDigitized30Days - a.totalDigitized30Days;
      if (sortBy === 'VOLUME_ASC') return a.totalDigitized30Days - b.totalDigitized30Days;
      if (sortBy === 'PASS_RATE') return b.verificationRate - a.verificationRate;
      if (sortBy === 'NAME_ASC') return a.villageName.localeCompare(b.villageName);
      return 0;
    });

    // Limit if specified
    if (villageDisplayLimit > 0) {
      return list.slice(0, villageDisplayLimit);
    }
    return list;
  }, [villageSummaries, selectedState, sortBy, villageDisplayLimit]);

  // Format data for Recharts
  const chartData = useMemo(() => {
    return processedVillages.map((v) => ({
      name: v.villageName,
      fullName: `${v.villageName} (${v.district})`,
      state: v.state,
      district: v.district,
      vernacular: v.vernacularName,
      total: v.totalDigitized30Days,
      sanctioned: v.sanctionedCount,
      needsReview: v.needsReviewCount,
      verificationRate: v.verificationRate,
      areaHa: v.totalAreaHectares,
      avgConfidence: v.avgConfidence,
      primaryUnit: v.primaryLocalUnit,
      dailyAvg: v.dailyVelocityAvg,
      censusCode: v.censusCode
    }));
  }, [processedVillages]);

  // Selected village detail
  const selectedVillageData = useMemo(() => {
    if (!selectedVillageName) return null;
    return villageSummaries.find((v) => v.villageName.toLowerCase() === selectedVillageName.toLowerCase()) || null;
  }, [selectedVillageName, villageSummaries]);

  // CSV Export
  const handleExportCSV = () => {
    const headers = [
      'Village Name',
      'Vernacular Name',
      'District',
      'State',
      'Census LGD Code',
      '30-Day Digitized Total',
      'Sanctioned & Verified',
      'Needs Review',
      'Verification Pass Rate (%)',
      'Average OCR Confidence (%)',
      'Total Area Digitized (Ha)',
      'Primary Local Unit',
      'Daily Velocity (Avg)'
    ];

    const rows = processedVillages.map((v) => [
      `"${v.villageName}"`,
      `"${v.vernacularName}"`,
      `"${v.district}"`,
      `"${v.state}"`,
      `"${v.censusCode}"`,
      v.totalDigitized30Days,
      v.sanctionedCount,
      v.needsReviewCount,
      v.verificationRate,
      v.avgConfidence,
      v.totalAreaHectares,
      `"${v.primaryLocalUnit}"`,
      v.dailyVelocityAvg
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `DILRMP_Village_Digitization_30Day_Summary_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Custom Cyber Tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (!active || !payload || !payload.length) return null;
    const data = payload[0].payload;

    return (
      <div className="bg-[#0B1224]/95 text-slate-100 p-3.5 rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.8)] border border-cyan-500/40 text-xs max-w-xs space-y-2 z-50 backdrop-blur-xl">
        <div className="border-b border-slate-800 pb-2">
          <div className="flex items-center justify-between gap-2">
            <span className="font-bold text-sm text-slate-100 natural-serif">{data.name}</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40 font-mono">
              {data.state}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-0.5">
            <span>{data.vernacular}</span>
            <span>•</span>
            <span>Dist: {data.district}</span>
            <span>•</span>
            <span className="font-mono text-[10px] text-amber-400">LGD: {data.censusCode}</span>
          </div>
        </div>

        <div className="space-y-1.5 py-1">
          <div className="flex justify-between items-center">
            <span className="text-slate-400">30-Day Digitized Total:</span>
            <span className="font-bold text-sm text-cyan-300 font-mono">{data.total} parcels</span>
          </div>
          <div className="flex justify-between items-center text-emerald-400">
            <span>✓ Sanctioned &amp; Verified:</span>
            <span className="font-bold font-mono">{data.sanctioned} ({data.verificationRate}%)</span>
          </div>
          <div className="flex justify-between items-center text-amber-400">
            <span>⚠ Pending Review:</span>
            <span className="font-bold font-mono">{data.needsReview}</span>
          </div>
          <div className="flex justify-between items-center text-cyan-300">
            <span>Indic OCR/HWR Accuracy:</span>
            <span className="font-bold font-mono">{data.avgConfidence}%</span>
          </div>
          <div className="flex justify-between items-center text-slate-300">
            <span>Area Digitized:</span>
            <span className="font-medium text-slate-100 font-mono">{data.areaHa} Ha ({data.primaryUnit})</span>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-800 text-[10px] text-emerald-400 flex items-center justify-between font-mono">
          <span>Run-rate: ~{data.dailyAvg} /day</span>
          <span className="text-cyan-400 underline cursor-pointer">Click to inspect</span>
        </div>
      </div>
    );
  };

  return (
    <div 
      id="widget-village-30day-digitization"
      className="bg-[#0E172A]/90 rounded-2xl border border-slate-800 p-5 sm:p-6 shadow-xl space-y-5 backdrop-blur-md"
    >
      {/* Widget Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 flex-wrap">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-950/80 text-cyan-300 text-xs font-semibold border border-cyan-500/40 font-mono shadow-[0_0_10px_rgba(6,182,212,0.2)]">
              <BarChart3 className="w-3.5 h-3.5 text-cyan-400" />
              <span>30-Day Village Digitization Velocity</span>
            </div>
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#0A0F1D] text-slate-300 text-xs font-mono border border-slate-700">
              <Calendar className="w-3 h-3 text-cyan-400" />
              <span>{overallTotals.dateWindowLabel}</span>
            </div>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-100 natural-serif tracking-tight">
            Land Records Digitized per Revenue Village
          </h3>
          <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
            Rolling 30-day telemetry throughput showing electronic mutation conversion, Saat-Baara / Jamabandi registers, and cadastral survey parcels sanctioned across active village jurisdictions.
          </p>
        </div>

        {/* Action Buttons: Export & Limits */}
        <div className="flex items-center gap-2 flex-wrap self-start lg:self-center">
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-cyan-500/30 bg-[#0B1327] hover:bg-[#111D3B] text-cyan-300 text-xs font-mono font-medium transition-colors cursor-pointer shadow-[0_0_10px_rgba(6,182,212,0.15)]"
            title="Download CSV summary for these revenue villages"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* KPI Highlight Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-[#090E1A] p-3 rounded-xl border border-slate-800">
          <span className="text-[11px] font-semibold text-slate-400 block uppercase tracking-wider font-mono">
            30-Day Total
          </span>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="text-xl font-bold text-slate-100 font-mono">
              {overallTotals.totalParcelsDigitized.toLocaleString()}
            </span>
            <span className="text-[10px] text-slate-400">parcels</span>
          </div>
        </div>

        <div className="bg-[#090E1A] p-3 rounded-xl border border-slate-800">
          <span className="text-[11px] font-semibold text-slate-400 block uppercase tracking-wider font-mono">
            Active Villages
          </span>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="text-xl font-bold text-slate-100 font-mono">
              {overallTotals.activeVillagesCount}
            </span>
            <span className="text-[10px] text-cyan-400 font-semibold font-mono">Hubs</span>
          </div>
        </div>

        <div className="bg-emerald-950/40 p-3 rounded-xl border border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
          <span className="text-[11px] font-semibold text-emerald-400 block uppercase tracking-wider font-mono">
            Sanctioned
          </span>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="text-xl font-bold text-emerald-300 font-mono">
              {overallTotals.totalSanctioned.toLocaleString()}
            </span>
            <span className="text-[10px] text-emerald-400 font-bold font-mono">
              ({overallTotals.overallPassRate}%)
            </span>
          </div>
        </div>

        <div className="bg-amber-950/40 p-3 rounded-xl border border-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.15)]">
          <span className="text-[11px] font-semibold text-amber-400 block uppercase tracking-wider font-mono">
            Pending Review
          </span>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="text-xl font-bold text-amber-300 font-mono">
              {overallTotals.totalNeedsReview.toLocaleString()}
            </span>
            <span className="text-[10px] text-amber-400 font-semibold font-mono">Parcels</span>
          </div>
        </div>

        <div className="bg-[#090E1A] p-3 rounded-xl border border-slate-800">
          <span className="text-[11px] font-semibold text-slate-400 block uppercase tracking-wider font-mono">
            Daily Velocity
          </span>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="text-xl font-bold text-slate-100 font-mono">
              ~{overallTotals.dailyVelocityAverage}
            </span>
            <span className="text-[10px] text-slate-400 font-mono">/day</span>
          </div>
        </div>

        <div className="bg-cyan-950/40 p-3 rounded-xl border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
          <span className="text-[11px] font-semibold text-cyan-400 block uppercase tracking-wider font-mono truncate" title={overallTotals.topVillageName}>
            Leading Hub
          </span>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="text-sm font-bold text-slate-100 truncate natural-serif" title={overallTotals.topVillageName}>
              {overallTotals.topVillageName.split(' ')[0]}
            </span>
            <span className="text-[10px] font-bold text-cyan-300 font-mono">
              ({overallTotals.topVillageCount})
            </span>
          </div>
        </div>
      </div>

      {/* Toolbar Controls: Metric Mode, Orientation, State Filter, Sorting, Limit */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-[#090E1A] border border-slate-800">
        {/* Metric Mode Pill Switcher */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs font-semibold text-slate-400 font-mono mr-1">Display:</span>
          <div className="inline-flex rounded-lg border border-slate-800 bg-[#0C1527] p-0.5">
            <button
              onClick={() => setMetricMode('STACKED_STATUS')}
              className={`px-2.5 py-1 text-xs rounded-md transition-all cursor-pointer font-mono font-medium ${
                metricMode === 'STACKED_STATUS'
                  ? 'bg-emerald-500/25 text-emerald-300 border border-emerald-500/50 shadow-[0_0_10px_rgba(16,185,129,0.3)]'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Sanctioned vs Review
            </button>
            <button
              onClick={() => setMetricMode('TOTAL')}
              className={`px-2.5 py-1 text-xs rounded-md transition-all cursor-pointer font-mono font-medium ${
                metricMode === 'TOTAL'
                  ? 'bg-cyan-500/25 text-cyan-300 border border-cyan-500/50 shadow-[0_0_10px_rgba(6,182,212,0.3)]'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Total Volume
            </button>
            <button
              onClick={() => setMetricMode('AREA_HA')}
              className={`px-2.5 py-1 text-xs rounded-md transition-all cursor-pointer font-mono font-medium ${
                metricMode === 'AREA_HA'
                  ? 'bg-sky-500/25 text-sky-300 border border-sky-500/50 shadow-[0_0_10px_rgba(56,189,248,0.3)]'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Area (Hectares)
            </button>
          </div>
        </div>

        {/* Filters and View Controls */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Orientation Toggle */}
          <div className="inline-flex rounded-lg border border-slate-800 bg-[#0C1527] p-0.5 text-xs font-mono">
            <button
              onClick={() => setOrientation('HORIZONTAL')}
              className={`px-2 py-1 rounded-md transition-all cursor-pointer ${
                orientation === 'HORIZONTAL'
                  ? 'bg-slate-800 text-cyan-300 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Horizontal Bar Chart (Best for readability)"
            >
              Horizontal
            </button>
            <button
              onClick={() => setOrientation('VERTICAL')}
              className={`px-2 py-1 rounded-md transition-all cursor-pointer ${
                orientation === 'VERTICAL'
                  ? 'bg-slate-800 text-cyan-300 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Vertical Column Chart"
            >
              Vertical
            </button>
          </div>

          {/* State Filter */}
          <div className="flex items-center gap-1 text-xs">
            <Filter className="w-3.5 h-3.5 text-cyan-400" />
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="bg-[#0C1527] border border-slate-800 text-slate-200 rounded-lg px-2 py-1 text-xs font-medium focus:outline-hidden focus:border-cyan-400 cursor-pointer font-mono"
            >
              {availableStates.map((st) => (
                <option key={st} value={st} className="bg-[#0C1527]">
                  {st === 'ALL' ? 'All States' : st}
                </option>
              ))}
            </select>
          </div>

          {/* Limit / Scope */}
          <div className="flex items-center gap-1 text-xs font-mono">
            <span className="text-slate-400">Show:</span>
            <select
              value={villageDisplayLimit}
              onChange={(e) => setVillageDisplayLimit(Number(e.target.value))}
              className="bg-[#0C1527] border border-slate-800 text-slate-200 rounded-lg px-2 py-1 text-xs font-medium focus:outline-hidden focus:border-cyan-400 cursor-pointer font-mono"
            >
              <option value={8}>Top 8</option>
              <option value={10}>Top 10</option>
              <option value={14}>Top 14</option>
              <option value={0}>All ({villageSummaries.length})</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="flex items-center gap-1 text-xs font-mono">
            <ArrowUpDown className="w-3.5 h-3.5 text-cyan-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-[#0C1527] border border-slate-800 text-slate-200 rounded-lg px-2 py-1 text-xs font-medium focus:outline-hidden focus:border-cyan-400 cursor-pointer font-mono"
            >
              <option value="VOLUME_DESC">Highest Volume</option>
              <option value="VOLUME_ASC">Lowest Volume</option>
              <option value="PASS_RATE">Pass Rate %</option>
              <option value="NAME_ASC">Name (A-Z)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Bar Chart Container */}
      <div className="w-full relative">
        <div 
          className={`w-full transition-all duration-300 ${
            orientation === 'HORIZONTAL'
              ? processedVillages.length > 8
                ? 'h-[460px]'
                : 'h-[360px]'
              : 'h-[360px]'
          }`}
        >
          <ResponsiveContainer width="100%" height="100%">
            {orientation === 'HORIZONTAL' ? (
              <BarChart
                data={chartData}
                layout="vertical"
                margin={{ top: 10, right: 30, left: 35, bottom: 10 }}
                onClick={(e: any) => {
                  if (e && e.activePayload && e.activePayload.length) {
                    const vName = e.activePayload[0].payload.name;
                    setSelectedVillageName(vName);
                  }
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" horizontal={true} vertical={true} />
                <XAxis 
                  type="number" 
                  stroke="#64748B" 
                  fontSize={11} 
                  tickLine={false} 
                  axisLine={{ stroke: '#334155' }} 
                />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  stroke="#94A3B8" 
                  fontSize={11} 
                  width={110}
                  tickLine={false}
                  axisLine={{ stroke: '#334155' }}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: '#1E293B', opacity: 0.3 }} />
                <Legend 
                  verticalAlign="top" 
                  height={32}
                  iconType="circle"
                  iconSize={8}
                  formatter={(val: string) => (
                    <span className="text-xs font-mono text-slate-300">{val}</span>
                  )}
                />

                {metricMode === 'STACKED_STATUS' ? (
                  <>
                    <Bar 
                      dataKey="sanctioned" 
                      name="Sanctioned & Verified" 
                      stackId="status" 
                      fill="#10B981" 
                      radius={[0, 0, 0, 0]}
                    >
                      {chartData.map((entry, index) => (
                        <Cell 
                          key={`cell-sanctioned-${index}`}
                          fill={selectedVillageName === entry.name ? '#34D399' : '#10B981'}
                          className="cursor-pointer transition-opacity hover:opacity-90"
                        />
                      ))}
                    </Bar>
                    <Bar 
                      dataKey="needsReview" 
                      name="Pending Review (HITL)" 
                      stackId="status" 
                      fill="#F59E0B" 
                      radius={[0, 6, 6, 0]}
                    >
                      {chartData.map((entry, index) => (
                        <Cell 
                          key={`cell-review-${index}`}
                          fill={selectedVillageName === entry.name ? '#FBBF24' : '#F59E0B'}
                          className="cursor-pointer transition-opacity hover:opacity-90"
                        />
                      ))}
                    </Bar>
                  </>
                ) : metricMode === 'TOTAL' ? (
                  <Bar 
                    dataKey="total" 
                    name="30-Day Digitized Parcels" 
                    fill="#06B6D4" 
                    radius={[0, 6, 6, 0]}
                  >
                    {chartData.map((entry, index) => (
                      <Cell 
                        key={`cell-total-${index}`}
                        fill={selectedVillageName === entry.name ? '#22D3EE' : index === 0 ? '#38BDF8' : '#06B6D4'}
                        className="cursor-pointer transition-opacity hover:opacity-90"
                      />
                    ))}
                  </Bar>
                ) : (
                  <Bar 
                    dataKey="areaHa" 
                    name="Total Area (Hectares)" 
                    fill="#38BDF8" 
                    radius={[0, 6, 6, 0]}
                  >
                    {chartData.map((entry, index) => (
                      <Cell 
                        key={`cell-area-${index}`}
                        fill={selectedVillageName === entry.name ? '#7DD3FC' : '#38BDF8'}
                        className="cursor-pointer transition-opacity hover:opacity-90"
                      />
                    ))}
                  </Bar>
                )}
              </BarChart>
            ) : (
              <BarChart
                data={chartData}
                layout="horizontal"
                margin={{ top: 15, right: 20, left: 10, bottom: 45 }}
                onClick={(e: any) => {
                  if (e && e.activePayload && e.activePayload.length) {
                    const vName = e.activePayload[0].payload.name;
                    setSelectedVillageName(vName);
                  }
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                <XAxis 
                  dataKey="name" 
                  stroke="#94A3B8" 
                  fontSize={11}
                  interval={0}
                  angle={-35}
                  textAnchor="end"
                  height={50}
                  tickLine={false}
                  axisLine={{ stroke: '#334155' }}
                />
                <YAxis 
                  stroke="#64748B" 
                  fontSize={11}
                  tickLine={false}
                  axisLine={{ stroke: '#334155' }}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: '#1E293B', opacity: 0.3 }} />
                <Legend 
                  verticalAlign="top" 
                  height={32}
                  iconType="circle"
                  iconSize={8}
                  formatter={(val: string) => (
                    <span className="text-xs font-mono text-slate-300">{val}</span>
                  )}
                />

                {metricMode === 'STACKED_STATUS' ? (
                  <>
                    <Bar 
                      dataKey="sanctioned" 
                      name="Sanctioned & Verified" 
                      stackId="status" 
                      fill="#10B981"
                    >
                      {chartData.map((entry, index) => (
                        <Cell 
                          key={`cell-v-sanctioned-${index}`}
                          fill={selectedVillageName === entry.name ? '#34D399' : '#10B981'}
                          className="cursor-pointer"
                        />
                      ))}
                    </Bar>
                    <Bar 
                      dataKey="needsReview" 
                      name="Pending Review" 
                      stackId="status" 
                      fill="#F59E0B" 
                      radius={[6, 6, 0, 0]}
                    >
                      {chartData.map((entry, index) => (
                        <Cell 
                          key={`cell-v-review-${index}`}
                          fill={selectedVillageName === entry.name ? '#FBBF24' : '#F59E0B'}
                          className="cursor-pointer"
                        />
                      ))}
                    </Bar>
                  </>
                ) : metricMode === 'TOTAL' ? (
                  <Bar 
                    dataKey="total" 
                    name="30-Day Digitized Parcels" 
                    fill="#06B6D4" 
                    radius={[6, 6, 0, 0]}
                  >
                    {chartData.map((entry, index) => (
                      <Cell 
                        key={`cell-v-total-${index}`}
                        fill={selectedVillageName === entry.name ? '#22D3EE' : '#06B6D4'}
                        className="cursor-pointer"
                      />
                    ))}
                  </Bar>
                ) : (
                  <Bar 
                    dataKey="areaHa" 
                    name="Area (Hectares)" 
                    fill="#38BDF8" 
                    radius={[6, 6, 0, 0]}
                  >
                    {chartData.map((entry, index) => (
                      <Cell 
                        key={`cell-v-area-${index}`}
                        fill={selectedVillageName === entry.name ? '#7DD3FC' : '#38BDF8'}
                        className="cursor-pointer"
                      />
                    ))}
                  </Bar>
                )}
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>

      {/* Interactive Selected Village Action Strip */}
      <AnimatePresence>
        {selectedVillageData && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="p-4 rounded-xl bg-[#091024] border-2 border-cyan-500/50 shadow-[0_0_25px_rgba(6,182,212,0.25)] flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-950 text-cyan-300 border border-cyan-500/40 shadow-[0_0_10px_rgba(6,182,212,0.3)]">
                <MapPin className="w-5 h-5 text-cyan-400" />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-slate-100 text-sm sm:text-base natural-serif">
                    {selectedVillageData.villageName} ({selectedVillageData.vernacularName})
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-medium">
                    {selectedVillageData.district}, {selectedVillageData.state}
                  </span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-950/60 text-amber-300 border border-amber-500/40">
                    LGD: {selectedVillageData.censusCode}
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-mono">
                  Digitized in last 30 days: <strong className="text-cyan-300">{selectedVillageData.totalDigitized30Days} parcels</strong> ({selectedVillageData.totalAreaHectares} Ha) • Verification Rate: <strong className="text-emerald-400">{selectedVillageData.verificationRate}%</strong> • Avg OCR: <strong className="text-slate-200">{selectedVillageData.avgConfidence}%</strong>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap self-start md:self-auto">
              {onFilterVillage && (
                <button
                  onClick={() => onFilterVillage(selectedVillageData.villageName)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/50 text-xs font-mono font-semibold shadow-[0_0_10px_rgba(6,182,212,0.2)] transition-colors cursor-pointer"
                  title="Filter Ingestion Queue table to this village"
                >
                  <Filter className="w-3.5 h-3.5" />
                  <span>Filter Ingestion Queue</span>
                </button>
              )}

              {onOpenVillageModal && (
                <button
                  onClick={() => onOpenVillageModal(selectedVillageData.villageName)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium transition-colors cursor-pointer"
                  title="View full agro-climatic and tenurial specifications"
                >
                  <Info className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Village Specifications</span>
                </button>
              )}

              <button
                onClick={() => setSelectedVillageName(null)}
                className="px-2.5 py-1.5 rounded-lg hover:bg-slate-800 text-slate-400 text-xs transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Village Summary Footnote */}
      <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-slate-400">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>
            Aggregates live scanned ingestions with Aks Shajra survey sprint records under DILRMP Phase-4.
          </span>
        </div>
        <div className="flex items-center gap-2 text-cyan-400 font-mono text-[10px]">
          <span>Tip: Click on any village bar to filter the ledger or inspect village specifications.</span>
        </div>
      </div>
    </div>
  );
};
