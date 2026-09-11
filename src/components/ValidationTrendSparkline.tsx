import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine
} from 'recharts';
import {
  TrendingUp,
  ShieldCheck,
  AlertTriangle,
  FileCheck,
  Calendar,
  Layers,
  ArrowUpRight,
  Info,
  CheckCircle2,
  Filter
} from 'lucide-react';
import { ExtractedLandRecord, ValidationTrendDataPoint } from '../types';
import { generate365DayValidationTrend, calculateTrendStats } from '../data/validationTrendData';

interface ValidationTrendSparklineProps {
  records?: ExtractedLandRecord[];
  onOpenReportModal?: () => void;
}

type TimeRangeOption = '365D' | '180D' | '90D' | '30D';
type MetricViewMode = 'STATUS_BREAKDOWN' | 'PASS_RATE' | 'CUMULATIVE';

export const ValidationTrendSparkline: React.FC<ValidationTrendSparklineProps> = ({
  records,
  onOpenReportModal
}) => {
  const [timeRange, setTimeRange] = useState<TimeRangeOption>('365D');
  const [viewMode, setViewMode] = useState<MetricViewMode>('STATUS_BREAKDOWN');

  // Generate continuous 365-day baseline
  const all365Points = useMemo(() => {
    return generate365DayValidationTrend(records);
  }, [records]);

  // Filter based on selected time range
  const filteredData = useMemo(() => {
    const totalDays = all365Points.length;
    let daysToTake = 365;
    if (timeRange === '180D') daysToTake = 180;
    if (timeRange === '90D') daysToTake = 90;
    if (timeRange === '30D') daysToTake = 30;

    return all365Points.slice(Math.max(0, totalDays - daysToTake));
  }, [all365Points, timeRange]);

  // Calculate high-level summary statistics
  const stats = useMemo(() => {
    return calculateTrendStats(filteredData);
  }, [filteredData]);

  // Downsample ticks for clean axis labeling across 365 days
  const xTickInterval = useMemo(() => {
    if (timeRange === '365D') return Math.floor(filteredData.length / 8);
    if (timeRange === '180D') return Math.floor(filteredData.length / 6);
    if (timeRange === '90D') return Math.floor(filteredData.length / 5);
    return Math.floor(filteredData.length / 4);
  }, [filteredData, timeRange]);

  return (
    <div 
      id="section-validation-sparkline-365"
      className="bg-[#FAF8F5] rounded-2xl border border-[#DCD7CE] p-5 sm:p-6 shadow-2xs space-y-4"
    >
      {/* Header & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#DCD7CE]">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#EAF2EB] text-[#3D5A40] border border-[#BCD4C0]">
              <TrendingUp className="w-4 h-4" />
            </span>
            <h3 className="text-base font-bold text-[#33332A] natural-serif flex items-center gap-2">
              365-Day Land Record Validation Trend
              <span className="text-[11px] font-sans font-semibold px-2 py-0.5 rounded-full bg-[#EBE7DF] text-[#5A5A40] border border-[#DCD7CE]">
                DILRMP Audit Series
              </span>
            </h3>
          </div>
          <p className="text-xs text-[#6B6B58]">
            Continuous statutory velocity tracking sanctioned titles, human review triggers, and automated pass rates over the past year.
          </p>
        </div>

        {/* View Mode & Timeframe Selectors */}
        <div className="flex flex-wrap items-center gap-2 self-start lg:self-auto">
          {/* View Mode Toggle */}
          <div className="inline-flex p-0.5 rounded-xl bg-[#EBE7DF] border border-[#DCD7CE] text-xs">
            <button
              type="button"
              id="btn-trend-mode-status"
              onClick={() => setViewMode('STATUS_BREAKDOWN')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                viewMode === 'STATUS_BREAKDOWN'
                  ? 'bg-[#FAF8F5] text-[#33332A] shadow-2xs font-semibold'
                  : 'text-[#6B6B58] hover:text-[#33332A]'
              }`}
            >
              Status Volumes
            </button>
            <button
              type="button"
              id="btn-trend-mode-passrate"
              onClick={() => setViewMode('PASS_RATE')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                viewMode === 'PASS_RATE'
                  ? 'bg-[#FAF8F5] text-[#33332A] shadow-2xs font-semibold'
                  : 'text-[#6B6B58] hover:text-[#33332A]'
              }`}
            >
              Pass Rate %
            </button>
            <button
              type="button"
              id="btn-trend-mode-cumulative"
              onClick={() => setViewMode('CUMULATIVE')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                viewMode === 'CUMULATIVE'
                  ? 'bg-[#FAF8F5] text-[#33332A] shadow-2xs font-semibold'
                  : 'text-[#6B6B58] hover:text-[#33332A]'
              }`}
            >
              Cumulative
            </button>
          </div>

          {/* Timeframe Selector Buttons */}
          <div className="inline-flex p-0.5 rounded-xl bg-[#EBE7DF] border border-[#DCD7CE] text-xs">
            {(['30D', '90D', '180D', '365D'] as TimeRangeOption[]).map((range) => (
              <button
                key={range}
                type="button"
                id={`btn-timerange-${range}`}
                onClick={() => setTimeRange(range)}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                  timeRange === range
                    ? 'bg-[#5A5A40] text-[#FFF9EA] shadow-2xs'
                    : 'text-[#6B6B58] hover:text-[#33332A]'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Metric Summary Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-1">
        <div className="bg-[#FAF8F5] p-3 rounded-xl border border-[#DCD7CE]/80">
          <div className="flex items-center justify-between text-xs text-[#6B6B58]">
            <span className="natural-serif">Parcels Processed</span>
            <Calendar className="w-3.5 h-3.5 text-[#5A5A40]" />
          </div>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span className="text-xl font-bold text-[#33332A] natural-serif font-mono">
              {stats.totalProcessed.toLocaleString()}
            </span>
          </div>
          <span className="text-[10px] text-[#6B6B58]">Across {timeRange} window</span>
        </div>

        <div className="bg-[#FAF8F5] p-3 rounded-xl border border-[#BCD4C0] bg-[#EAF2EB]/30">
          <div className="flex items-center justify-between text-xs text-[#3D5A40]">
            <span className="natural-serif font-semibold">Sanctioned &amp; Verified</span>
            <FileCheck className="w-3.5 h-3.5 text-[#3D5A40]" />
          </div>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span className="text-xl font-bold text-[#3D5A40] natural-serif font-mono">
              {stats.totalSanctioned.toLocaleString()}
            </span>
            <span className="text-[10px] font-bold text-[#3D5A40] bg-[#EAF2EB] px-1 py-0.2 rounded border border-[#BCD4C0]">
              {stats.averagePassRate}%
            </span>
          </div>
          <span className="text-[10px] text-[#3D5A40]/80">DSC digitally sealed</span>
        </div>

        <div className="bg-[#FAF8F5] p-3 rounded-xl border border-[#DCD7CE] bg-[#FFF9EA]/40">
          <div className="flex items-center justify-between text-xs text-[#8B4513]">
            <span className="natural-serif font-semibold">HITL Backlog Flagged</span>
            <AlertTriangle className="w-3.5 h-3.5 text-[#8B4513]" />
          </div>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span className="text-xl font-bold text-[#8B4513] natural-serif font-mono">
              {stats.totalNeedsReview.toLocaleString()}
            </span>
            <span className="text-[10px] text-[#8B4513] font-medium">
              ({stats.totalProcessed > 0 ? Math.round((stats.totalNeedsReview / stats.totalProcessed) * 100) : 0}%)
            </span>
          </div>
          <span className="text-[10px] text-[#6B6B58]">Requires manual review</span>
        </div>

        <div className="bg-[#FAF8F5] p-3 rounded-xl border border-[#DCD7CE]">
          <div className="flex items-center justify-between text-xs text-[#6B6B58]">
            <span className="natural-serif">Annual Velocity Gain</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#3D5A40]" />
          </div>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span className="text-xl font-bold text-[#3D5A40] natural-serif font-mono">
              +{stats.growthYoY}%
            </span>
            <span className="text-[10px] text-[#3D5A40] font-semibold">YoY</span>
          </div>
          <span className="text-[10px] text-[#6B6B58]">Peak: {stats.peakDailySanctioned.count}/day</span>
        </div>
      </div>

      {/* Main Recharts Sparkline Area Chart */}
      <div className="pt-2 relative">
        {/* Chart Legend / Active Series Info */}
        <div className="flex items-center justify-between text-xs mb-2 px-1">
          <div className="flex items-center gap-4 flex-wrap">
            {viewMode === 'STATUS_BREAKDOWN' && (
              <>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#3D5A40]"></span>
                  <span className="text-xs font-semibold text-[#33332A]">Sanctioned &amp; Validated</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#C27D38]"></span>
                  <span className="text-xs font-medium text-[#6B6B58]">Needs Review / Flags</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#B85450]"></span>
                  <span className="text-xs font-medium text-[#6B6B58]">Contested / Rejected</span>
                </div>
              </>
            )}

            {viewMode === 'PASS_RATE' && (
              <div className="flex items-center gap-2">
                <span className="w-3 h-0.5 bg-[#3D5A40]"></span>
                <span className="text-xs font-semibold text-[#3D5A40]">Automated + Officer Validation Pass Rate (%)</span>
                <span className="text-[11px] text-[#6B6B58] ml-2">• 90% DILRMP Statutory Benchmark</span>
              </div>
            )}

            {viewMode === 'CUMULATIVE' && (
              <div className="flex items-center gap-2">
                <span className="w-3 h-0.5 bg-[#5A5A40]"></span>
                <span className="text-xs font-semibold text-[#33332A]">Cumulative Sanctioned Cadastral Parcels</span>
              </div>
            )}
          </div>

          <span className="text-[11px] text-[#6B6B58] hidden sm:inline">
            Hover sparkline curve for inspection
          </span>
        </div>

        {/* Recharts Container with explicit height */}
        <div className="w-full h-48 sm:h-56 bg-[#FAF8F5] rounded-xl p-2">
          <ResponsiveContainer width="100%" height="100%">
            {viewMode === 'STATUS_BREAKDOWN' ? (
              <AreaChart data={filteredData} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradSanctioned" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3D5A40" stopOpacity={0.45} />
                    <stop offset="95%" stopColor="#3D5A40" stopOpacity={0.02} />
                  </linearGradient>
                  <linearGradient id="gradReview" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C27D38" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#C27D38" stopOpacity={0.02} />
                  </linearGradient>
                  <linearGradient id="gradRejected" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#B85450" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#B85450" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#EBE7DF" vertical={false} />
                <XAxis
                  dataKey="displayDate"
                  interval={xTickInterval}
                  tick={{ fill: '#6B6B58', fontSize: 10 }}
                  axisLine={{ stroke: '#DCD7CE' }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: '#6B6B58', fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomSparklineTooltip />} />
                <Area
                  type="monotone"
                  dataKey="sanctioned"
                  name="Sanctioned"
                  stroke="#3D5A40"
                  strokeWidth={2}
                  fill="url(#gradSanctioned)"
                  dot={false}
                  activeDot={{ r: 4, fill: '#3D5A40', stroke: '#FFF9EA', strokeWidth: 1.5 }}
                />
                <Area
                  type="monotone"
                  dataKey="needsReview"
                  name="Needs Review"
                  stroke="#C27D38"
                  strokeWidth={1.5}
                  fill="url(#gradReview)"
                  dot={false}
                  activeDot={{ r: 3.5, fill: '#C27D38', stroke: '#FAF8F5' }}
                />
                <Area
                  type="monotone"
                  dataKey="rejected"
                  name="Rejected"
                  stroke="#B85450"
                  strokeWidth={1}
                  fill="url(#gradRejected)"
                  dot={false}
                />
              </AreaChart>
            ) : viewMode === 'PASS_RATE' ? (
              <LineChart data={filteredData} margin={{ top: 8, right: 8, left: -15, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradPassRate" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3D5A40" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3D5A40" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#EBE7DF" vertical={false} />
                <XAxis
                  dataKey="displayDate"
                  interval={xTickInterval}
                  tick={{ fill: '#6B6B58', fontSize: 10 }}
                  axisLine={{ stroke: '#DCD7CE' }}
                  tickLine={false}
                />
                <YAxis
                  domain={[75, 100]}
                  unit="%"
                  tick={{ fill: '#6B6B58', fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                />
                <ReferenceLine y={90} stroke="#5A5A40" strokeDasharray="4 4" label={{ value: 'Target 90%', fill: '#5A5A40', fontSize: 10, position: 'right' }} />
                <Tooltip content={<CustomPassRateTooltip />} />
                <Line
                  type="monotone"
                  dataKey="passRate"
                  name="Pass Rate"
                  stroke="#3D5A40"
                  strokeWidth={2.5}
                  dot={false}
                  activeDot={{ r: 5, fill: '#3D5A40', stroke: '#FFF9EA', strokeWidth: 2 }}
                />
              </LineChart>
            ) : (
              <AreaChart data={filteredData} margin={{ top: 8, right: 8, left: -5, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradCumulative" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#5A5A40" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#5A5A40" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#EBE7DF" vertical={false} />
                <XAxis
                  dataKey="displayDate"
                  interval={xTickInterval}
                  tick={{ fill: '#6B6B58', fontSize: 10 }}
                  axisLine={{ stroke: '#DCD7CE' }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: '#6B6B58', fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(val) => `${Math.round(val / 1000)}k`}
                />
                <Tooltip content={<CustomCumulativeTooltip />} />
                <Area
                  type="monotone"
                  dataKey="cumulativeSanctioned"
                  name="Cumulative Sanctioned"
                  stroke="#5A5A40"
                  strokeWidth={2}
                  fill="url(#gradCumulative)"
                  dot={false}
                  activeDot={{ r: 4, fill: '#5A5A40', stroke: '#FFF9EA', strokeWidth: 2 }}
                />
              </AreaChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Insights Footer */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-3 border-t border-[#DCD7CE] text-xs text-[#6B6B58]">
        <div className="flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-[#5A5A40] shrink-0" />
          <span>
            Data reconciled daily against District Revenue Collectors &amp; State Land Information Systems (Bhulekh / Bhoomi / AnyRoR).
          </span>
        </div>

        {onOpenReportModal && (
          <button
            type="button"
            onClick={onOpenReportModal}
            className="text-[#3D5A40] hover:text-[#2A3E2C] font-semibold underline cursor-pointer shrink-0 self-start sm:self-auto"
          >
            Download 365-Day Audit PDF
          </button>
        )}
      </div>
    </div>
  );
};

// Custom Tooltip for Status Volume Sparkline
const CustomSparklineTooltip: React.FC<any> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data: ValidationTrendDataPoint = payload[0].payload;
    return (
      <div className="bg-[#363625] text-[#FAF8F5] p-3 rounded-xl shadow-xl border border-[#5A5A40] text-xs space-y-1.5 min-w-44">
        <div className="font-bold text-[#FFF9EA] pb-1 border-b border-[#52523C] flex justify-between items-center">
          <span>{data.displayDate}</span>
          <span className="text-[10px] text-[#D7D2C5] font-mono">{data.totalProcessed} parcels</span>
        </div>
        <div className="flex justify-between items-center text-[#A6CCA0]">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#82B37A]"></span>
            Sanctioned:
          </span>
          <span className="font-mono font-bold">{data.sanctioned}</span>
        </div>
        <div className="flex justify-between items-center text-[#E5C37A]">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#E5C37A]"></span>
            Needs Review:
          </span>
          <span className="font-mono font-bold">{data.needsReview}</span>
        </div>
        {data.rejected > 0 && (
          <div className="flex justify-between items-center text-[#F2C2BA]">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#B85450]"></span>
              Rejected:
            </span>
            <span className="font-mono font-bold">{data.rejected}</span>
          </div>
        )}
        <div className="pt-1 border-t border-[#52523C] flex justify-between text-[11px]">
          <span className="text-[#D7D2C5]">Validation Rate:</span>
          <span className="font-bold text-[#FFF9EA]">{data.passRate}%</span>
        </div>
      </div>
    );
  }
  return null;
};

// Custom Tooltip for Pass Rate
const CustomPassRateTooltip: React.FC<any> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data: ValidationTrendDataPoint = payload[0].payload;
    return (
      <div className="bg-[#363625] text-[#FAF8F5] p-2.5 rounded-xl shadow-xl border border-[#5A5A40] text-xs space-y-1 min-w-36">
        <div className="font-bold text-[#FFF9EA] text-[11px] pb-1 border-b border-[#52523C]">
          {data.displayDate}
        </div>
        <div className="flex justify-between items-center text-[#A6CCA0]">
          <span>Pass Rate:</span>
          <span className="font-mono font-bold text-sm">{data.passRate}%</span>
        </div>
        <div className="text-[10px] text-[#D7D2C5]">
          {data.sanctioned} sanctioned / {data.totalProcessed} processed
        </div>
      </div>
    );
  }
  return null;
};

// Custom Tooltip for Cumulative Growth
const CustomCumulativeTooltip: React.FC<any> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data: ValidationTrendDataPoint = payload[0].payload;
    return (
      <div className="bg-[#363625] text-[#FAF8F5] p-2.5 rounded-xl shadow-xl border border-[#5A5A40] text-xs space-y-1 min-w-40">
        <div className="font-bold text-[#FFF9EA] text-[11px] pb-1 border-b border-[#52523C]">
          {data.displayDate}
        </div>
        <div className="flex justify-between items-center text-[#EBE7DF]">
          <span>Total Sanctioned:</span>
          <span className="font-mono font-bold text-sm text-[#FFF9EA]">
            {data.cumulativeSanctioned.toLocaleString()}
          </span>
        </div>
      </div>
    );
  }
  return null;
};

/**
 * Micro-sparkline component for embedding directly inside KPI cards.
 */
interface MicroSparklineProps {
  color?: string;
  dataKey?: 'sanctioned' | 'needsReview' | 'passRate';
  height?: number;
}

export const MicroSparkline: React.FC<MicroSparklineProps> = ({
  color = '#3D5A40',
  dataKey = 'sanctioned',
  height = 36
}) => {
  // Generate a sampled 30-day subset for crisp KPI card display
  const microData = useMemo(() => {
    const raw = generate365DayValidationTrend();
    return raw.slice(-30); // Last 30 days of the 365-day trend
  }, []);

  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={microData} margin={{ top: 2, right: 2, left: 2, bottom: 2 }}>
          <defs>
            <linearGradient id={`microGrad-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.4} />
              <stop offset="95%" stopColor={color} stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey={dataKey}
            stroke={color}
            strokeWidth={1.5}
            fill={`url(#microGrad-${dataKey})`}
            dot={false}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
