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
      `${v.verificationRate}%`,
      `${v.avgConfidence}%`,
      v.totalAreaHectares,
      `"${v.primaryLocalUnit}"`,
      v.dailyVelocityAvg
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `DILRMP_30Day_Village_Digitization_Summary_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Custom Tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload || !payload.length) return null;
    const data = payload[0].payload;

    return (
      <div className="bg-[#363625] text-[#FAF8F5] p-3.5 rounded-xl shadow-xl border border-[#5A5A40] text-xs max-w-xs space-y-2 z-50">
        <div className="border-b border-[#5A5A40] pb-2">
          <div className="flex items-center justify-between gap-2">
            <span className="font-bold text-sm text-[#FFF9EA] natural-serif">{data.name}</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#5A5A40] text-[#EBE7DF]">
              {data.state}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-[#D7D2C5] mt-0.5">
            <span>{data.vernacular}</span>
            <span>•</span>
            <span>Dist: {data.district}</span>
            <span>•</span>
            <span className="font-mono text-[10px]">LGD: {data.censusCode}</span>
          </div>
        </div>

        <div className="space-y-1.5 py-1">
          <div className="flex justify-between items-center">
            <span className="text-[#D7D2C5]">30-Day Digitized Total:</span>
            <span className="font-bold text-sm text-[#FFF9EA]">{data.total} parcels</span>
          </div>
          <div className="flex justify-between items-center text-[#A6CCA0]">
            <span>✓ Sanctioned &amp; Verified:</span>
            <span className="font-bold">{data.sanctioned} ({data.verificationRate}%)</span>
          </div>
          <div className="flex justify-between items-center text-[#F2C2BA]">
            <span>⚠ Pending Review:</span>
            <span className="font-bold">{data.needsReview}</span>
          </div>
          <div className="flex justify-between items-center text-[#E5C37A]">
            <span>Indic OCR/HWR Accuracy:</span>
            <span className="font-bold">{data.avgConfidence}%</span>
          </div>
          <div className="flex justify-between items-center text-[#D7D2C5]">
            <span>Area Digitized:</span>
            <span className="font-medium text-[#FAF8F5]">{data.areaHa} Ha ({data.primaryUnit})</span>
          </div>
        </div>

        <div className="pt-2 border-t border-[#5A5A40] text-[10px] text-[#A6CCA0] flex items-center justify-between">
          <span>Daily Run-rate: ~{data.dailyAvg} parcels/day</span>
          <span className="text-[#FFF9EA] underline cursor-pointer">Click to inspect</span>
        </div>
      </div>
    );
  };

  return (
    <div 
      id="widget-village-30day-digitization"
      className="bg-[#FAF8F5] rounded-2xl border border-[#DCD7CE] p-5 sm:p-6 shadow-2xs space-y-5"
    >
      {/* Widget Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#DCD7CE]">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 flex-wrap">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#EAF2EB] text-[#3D5A40] text-xs font-semibold border border-[#BCD4C0]">
              <BarChart3 className="w-3.5 h-3.5" />
              <span>30-Day Village Digitization Velocity</span>
            </div>
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#EBE7DF] text-[#5A5A40] text-xs font-medium border border-[#DCD7CE]">
              <Calendar className="w-3 h-3" />
              <span>{overallTotals.dateWindowLabel}</span>
            </div>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-[#33332A] natural-serif tracking-tight">
            Land Records Digitized per Revenue Village
          </h3>
          <p className="text-xs text-[#6B6B58] max-w-2xl leading-relaxed">
            Rolling 30-day throughput showing electronic mutation conversion, Saat-Baara / Jamabandi registers, and cadastral survey parcels sanctioned across active village jurisdictions.
          </p>
        </div>

        {/* Action Buttons: Export & Limits */}
        <div className="flex items-center gap-2 flex-wrap self-start lg:self-center">
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#DCD7CE] bg-[#FAF8F5] hover:bg-[#F5F3EE] text-[#4A3728] text-xs font-medium transition-colors cursor-pointer shadow-2xs"
            title="Download CSV summary for these revenue villages"
          >
            <Download className="w-3.5 h-3.5 text-[#5A5A40]" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* KPI Highlight Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-[#F5F3EE] p-3 rounded-xl border border-[#DCD7CE]">
          <span className="text-[11px] font-semibold text-[#6B6B58] block uppercase tracking-wider natural-serif">
            30-Day Total
          </span>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="text-xl font-bold text-[#33332A] natural-serif">
              {overallTotals.totalParcelsDigitized.toLocaleString()}
            </span>
            <span className="text-[10px] text-[#6B6B58]">parcels</span>
          </div>
        </div>

        <div className="bg-[#F5F3EE] p-3 rounded-xl border border-[#DCD7CE]">
          <span className="text-[11px] font-semibold text-[#6B6B58] block uppercase tracking-wider natural-serif">
            Active Villages
          </span>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="text-xl font-bold text-[#33332A] natural-serif">
              {overallTotals.activeVillagesCount}
            </span>
            <span className="text-[10px] text-[#3D5A40] font-semibold">Jurisdictions</span>
          </div>
        </div>

        <div className="bg-[#EAF2EB] p-3 rounded-xl border border-[#BCD4C0]">
          <span className="text-[11px] font-semibold text-[#3D5A40] block uppercase tracking-wider natural-serif">
            Sanctioned
          </span>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="text-xl font-bold text-[#2D4530] natural-serif">
              {overallTotals.totalSanctioned.toLocaleString()}
            </span>
            <span className="text-[10px] text-[#3D5A40] font-bold">
              ({overallTotals.overallPassRate}%)
            </span>
          </div>
        </div>

        <div className="bg-[#FDF0ED] p-3 rounded-xl border border-[#F2C2BA]">
          <span className="text-[11px] font-semibold text-[#8B0000] block uppercase tracking-wider natural-serif">
            Pending Review
          </span>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="text-xl font-bold text-[#8B0000] natural-serif">
              {overallTotals.totalNeedsReview.toLocaleString()}
            </span>
            <span className="text-[10px] text-[#8B0000] font-semibold">Parcels</span>
          </div>
        </div>

        <div className="bg-[#F5F3EE] p-3 rounded-xl border border-[#DCD7CE]">
          <span className="text-[11px] font-semibold text-[#6B6B58] block uppercase tracking-wider natural-serif">
            Daily Velocity
          </span>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="text-xl font-bold text-[#33332A] natural-serif">
              ~{overallTotals.dailyVelocityAverage}
            </span>
            <span className="text-[10px] text-[#6B6B58]">parcels/day</span>
          </div>
        </div>

        <div className="bg-[#FFF9EA] p-3 rounded-xl border border-[#DCD7CE]">
          <span className="text-[11px] font-semibold text-[#8B4513] block uppercase tracking-wider natural-serif truncate" title={overallTotals.topVillageName}>
            Leading Hub
          </span>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="text-sm font-bold text-[#4A3728] truncate natural-serif" title={overallTotals.topVillageName}>
              {overallTotals.topVillageName.split(' ')[0]}
            </span>
            <span className="text-[10px] font-bold text-[#8B4513]">
              ({overallTotals.topVillageCount})
            </span>
          </div>
        </div>
      </div>

      {/* Toolbar Controls: Metric Mode, Orientation, State Filter, Sorting, Limit */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-[#F5F3EE] border border-[#DCD7CE]">
        {/* Metric Mode Pill Switcher */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs font-semibold text-[#6B6B58] natural-serif mr-1">Display:</span>
          <div className="inline-flex rounded-lg border border-[#DCD7CE] bg-[#FAF8F5] p-0.5">
            <button
              onClick={() => setMetricMode('STACKED_STATUS')}
              className={`px-2.5 py-1 text-xs rounded-md transition-all cursor-pointer font-medium ${
                metricMode === 'STACKED_STATUS'
                  ? 'bg-[#3D5A40] text-[#FFF9EA] font-bold shadow-2xs'
                  : 'text-[#5A5A40] hover:text-[#33332A]'
              }`}
            >
              Sanctioned vs Review
            </button>
            <button
              onClick={() => setMetricMode('TOTAL')}
              className={`px-2.5 py-1 text-xs rounded-md transition-all cursor-pointer font-medium ${
                metricMode === 'TOTAL'
                  ? 'bg-[#5A5A40] text-[#FFF9EA] font-bold shadow-2xs'
                  : 'text-[#5A5A40] hover:text-[#33332A]'
              }`}
            >
              Total Volume
            </button>
            <button
              onClick={() => setMetricMode('AREA_HA')}
              className={`px-2.5 py-1 text-xs rounded-md transition-all cursor-pointer font-medium ${
                metricMode === 'AREA_HA'
                  ? 'bg-[#8B4513] text-[#FFF9EA] font-bold shadow-2xs'
                  : 'text-[#5A5A40] hover:text-[#33332A]'
              }`}
            >
              Area (Hectares)
            </button>
          </div>
        </div>

        {/* Filters and View Controls */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Orientation Toggle */}
          <div className="inline-flex rounded-lg border border-[#DCD7CE] bg-[#FAF8F5] p-0.5 text-xs">
            <button
              onClick={() => setOrientation('HORIZONTAL')}
              className={`px-2 py-1 rounded-md transition-all cursor-pointer ${
                orientation === 'HORIZONTAL'
                  ? 'bg-[#EBE7DF] text-[#33332A] font-bold'
                  : 'text-[#6B6B58] hover:text-[#33332A]'
              }`}
              title="Horizontal Bar Chart (Best for readability)"
            >
              Horizontal
            </button>
            <button
              onClick={() => setOrientation('VERTICAL')}
              className={`px-2 py-1 rounded-md transition-all cursor-pointer ${
                orientation === 'VERTICAL'
                  ? 'bg-[#EBE7DF] text-[#33332A] font-bold'
                  : 'text-[#6B6B58] hover:text-[#33332A]'
              }`}
              title="Vertical Column Chart"
            >
              Vertical
            </button>
          </div>

          {/* State Filter */}
          <div className="flex items-center gap-1 text-xs">
            <Filter className="w-3.5 h-3.5 text-[#6B6B58]" />
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="bg-[#FAF8F5] border border-[#DCD7CE] text-[#33332A] rounded-lg px-2 py-1 text-xs font-medium focus:outline-hidden focus:ring-1 focus:ring-[#5A5A40] cursor-pointer"
            >
              {availableStates.map((st) => (
                <option key={st} value={st}>
                  {st === 'ALL' ? 'All States' : st}
                </option>
              ))}
            </select>
          </div>

          {/* Limit / Scope */}
          <div className="flex items-center gap-1 text-xs">
            <span className="text-[#6B6B58]">Show:</span>
            <select
              value={villageDisplayLimit}
              onChange={(e) => setVillageDisplayLimit(Number(e.target.value))}
              className="bg-[#FAF8F5] border border-[#DCD7CE] text-[#33332A] rounded-lg px-2 py-1 text-xs font-medium focus:outline-hidden focus:ring-1 focus:ring-[#5A5A40] cursor-pointer"
            >
              <option value={8}>Top 8</option>
              <option value={10}>Top 10</option>
              <option value={14}>Top 14</option>
              <option value={0}>All ({villageSummaries.length})</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="flex items-center gap-1 text-xs">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#6B6B58]" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-[#FAF8F5] border border-[#DCD7CE] text-[#33332A] rounded-lg px-2 py-1 text-xs font-medium focus:outline-hidden focus:ring-1 focus:ring-[#5A5A40] cursor-pointer"
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
                <CartesianGrid strokeDasharray="3 3" stroke="#EBE7DF" horizontal={true} vertical={true} />
                <XAxis 
                  type="number" 
                  stroke="#8C887B" 
                  fontSize={11}
                  tickLine={false}
                  axisLine={{ stroke: '#DCD7CE' }}
                />
                <YAxis 
                  type="category" 
                  dataKey="name" 
                  stroke="#4A3728" 
                  fontSize={11}
                  tickLine={false}
                  axisLine={{ stroke: '#DCD7CE' }}
                  width={90}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: '#EBE7DF', opacity: 0.4 }} />
                <Legend 
                  verticalAlign="top" 
                  height={32}
                  iconType="circle"
                  iconSize={8}
                  formatter={(val: string) => (
                    <span className="text-xs font-medium text-[#4A3728] natural-serif">{val}</span>
                  )}
                />

                {metricMode === 'STACKED_STATUS' ? (
                  <>
                    <Bar 
                      dataKey="sanctioned" 
                      name="Sanctioned & Verified" 
                      stackId="status" 
                      fill="#3D5A40" 
                      radius={[0, 0, 0, 0]}
                    >
                      {chartData.map((entry, index) => (
                        <Cell 
                          key={`cell-sanctioned-${index}`}
                          fill={selectedVillageName === entry.name ? '#253828' : '#3D5A40'}
                          className="cursor-pointer transition-opacity hover:opacity-90"
                        />
                      ))}
                    </Bar>
                    <Bar 
                      dataKey="needsReview" 
                      name="Pending Review (HITL)" 
                      stackId="status" 
                      fill="#C89D54" 
                      radius={[0, 6, 6, 0]}
                    >
                      {chartData.map((entry, index) => (
                        <Cell 
                          key={`cell-review-${index}`}
                          fill={selectedVillageName === entry.name ? '#A67C33' : '#C89D54'}
                          className="cursor-pointer transition-opacity hover:opacity-90"
                        />
                      ))}
                    </Bar>
                  </>
                ) : metricMode === 'TOTAL' ? (
                  <Bar 
                    dataKey="total" 
                    name="30-Day Digitized Parcels" 
                    fill="#5A5A40" 
                    radius={[0, 6, 6, 0]}
                  >
                    {chartData.map((entry, index) => (
                      <Cell 
                        key={`cell-total-${index}`}
                        fill={selectedVillageName === entry.name ? '#3D5A40' : index === 0 ? '#43432F' : '#5A5A40'}
                        className="cursor-pointer transition-opacity hover:opacity-90"
                      />
                    ))}
                  </Bar>
                ) : (
                  <Bar 
                    dataKey="areaHa" 
                    name="Total Area (Hectares)" 
                    fill="#8B4513" 
                    radius={[0, 6, 6, 0]}
                  >
                    {chartData.map((entry, index) => (
                      <Cell 
                        key={`cell-area-${index}`}
                        fill={selectedVillageName === entry.name ? '#5E2E0D' : '#8B4513'}
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
                <CartesianGrid strokeDasharray="3 3" stroke="#EBE7DF" />
                <XAxis 
                  dataKey="name" 
                  stroke="#4A3728" 
                  fontSize={11}
                  interval={0}
                  angle={-35}
                  textAnchor="end"
                  height={50}
                  tickLine={false}
                  axisLine={{ stroke: '#DCD7CE' }}
                />
                <YAxis 
                  stroke="#8C887B" 
                  fontSize={11}
                  tickLine={false}
                  axisLine={{ stroke: '#DCD7CE' }}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: '#EBE7DF', opacity: 0.4 }} />
                <Legend 
                  verticalAlign="top" 
                  height={32}
                  iconType="circle"
                  iconSize={8}
                  formatter={(val: string) => (
                    <span className="text-xs font-medium text-[#4A3728] natural-serif">{val}</span>
                  )}
                />

                {metricMode === 'STACKED_STATUS' ? (
                  <>
                    <Bar 
                      dataKey="sanctioned" 
                      name="Sanctioned & Verified" 
                      stackId="status" 
                      fill="#3D5A40"
                    >
                      {chartData.map((entry, index) => (
                        <Cell 
                          key={`cell-v-sanctioned-${index}`}
                          fill={selectedVillageName === entry.name ? '#253828' : '#3D5A40'}
                          className="cursor-pointer"
                        />
                      ))}
                    </Bar>
                    <Bar 
                      dataKey="needsReview" 
                      name="Pending Review" 
                      stackId="status" 
                      fill="#C89D54" 
                      radius={[6, 6, 0, 0]}
                    >
                      {chartData.map((entry, index) => (
                        <Cell 
                          key={`cell-v-review-${index}`}
                          fill={selectedVillageName === entry.name ? '#A67C33' : '#C89D54'}
                          className="cursor-pointer"
                        />
                      ))}
                    </Bar>
                  </>
                ) : metricMode === 'TOTAL' ? (
                  <Bar 
                    dataKey="total" 
                    name="30-Day Digitized Parcels" 
                    fill="#5A5A40" 
                    radius={[6, 6, 0, 0]}
                  >
                    {chartData.map((entry, index) => (
                      <Cell 
                        key={`cell-v-total-${index}`}
                        fill={selectedVillageName === entry.name ? '#3D5A40' : '#5A5A40'}
                        className="cursor-pointer"
                      />
                    ))}
                  </Bar>
                ) : (
                  <Bar 
                    dataKey="areaHa" 
                    name="Area (Hectares)" 
                    fill="#8B4513" 
                    radius={[6, 6, 0, 0]}
                  >
                    {chartData.map((entry, index) => (
                      <Cell 
                        key={`cell-v-area-${index}`}
                        fill={selectedVillageName === entry.name ? '#5E2E0D' : '#8B4513'}
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
            className="p-4 rounded-xl bg-[#FAF8F5] border-2 border-[#5A5A40] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-[#363625] text-[#FFF9EA]">
                <MapPin className="w-5 h-5 text-[#E5C37A]" />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-[#33332A] text-sm sm:text-base natural-serif">
                    {selectedVillageData.villageName} ({selectedVillageData.vernacularName})
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[#EBE7DF] text-[#5A5A40] font-medium">
                    {selectedVillageData.district}, {selectedVillageData.state}
                  </span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#F5F3EE] text-[#6B6B58] border border-[#DCD7CE]">
                    LGD: {selectedVillageData.censusCode}
                  </span>
                </div>
                <p className="text-xs text-[#6B6B58]">
                  Digitized in last 30 days: <strong className="text-[#33332A]">{selectedVillageData.totalDigitized30Days} parcels</strong> ({selectedVillageData.totalAreaHectares} Ha) • Verification Rate: <strong className="text-[#3D5A40]">{selectedVillageData.verificationRate}%</strong> • Avg OCR: <strong>{selectedVillageData.avgConfidence}%</strong>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap self-start md:self-auto">
              {onFilterVillage && (
                <button
                  onClick={() => onFilterVillage(selectedVillageData.villageName)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#3D5A40] hover:bg-[#2F4632] text-[#FFF9EA] text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
                  title="Filter Ingestion Queue table to this village"
                >
                  <Filter className="w-3.5 h-3.5" />
                  <span>Filter Ingestion Queue</span>
                </button>
              )}

              {onOpenVillageModal && (
                <button
                  onClick={() => onOpenVillageModal(selectedVillageData.villageName)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FAF8F5] hover:bg-[#EBE7DF] text-[#4A3728] border border-[#DCD7CE] text-xs font-semibold transition-colors cursor-pointer"
                  title="View full agro-climatic and tenurial specifications"
                >
                  <Info className="w-3.5 h-3.5 text-[#5A5A40]" />
                  <span>Village Specifications</span>
                </button>
              )}

              <button
                onClick={() => setSelectedVillageName(null)}
                className="px-2.5 py-1.5 rounded-lg hover:bg-[#EBE7DF] text-[#6B6B58] text-xs transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Village Summary Footnote */}
      <div className="pt-3 border-t border-[#DCD7CE] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-[#6B6B58]">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#8B4513]" />
          <span>
            Aggregates live scanned ingestions with Aks Shajra survey sprint records under DILRMP Phase-4.
          </span>
        </div>
        <div className="flex items-center gap-2 text-[#5A5A40]">
          <span>Tip: Click on any village bar to filter the ledger or inspect village specifications.</span>
        </div>
      </div>
    </div>
  );
};
