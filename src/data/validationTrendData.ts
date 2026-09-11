import { ValidationTrendDataPoint, ExtractedLandRecord } from '../types';

/**
 * Generates continuous 365-day statutory validation trend data for land records.
 * Anchored to the current date (Sep 2026) back 365 days to Sep 2025.
 */
export function generate365DayValidationTrend(currentRecords?: ExtractedLandRecord[]): ValidationTrendDataPoint[] {
  const points: ValidationTrendDataPoint[] = [];
  const endDate = new Date('2026-09-06T12:00:00Z');
  let runningCumulative = 14200; // Starting baseline from prior phase

  for (let i = 365; i >= 0; i--) {
    const d = new Date(endDate.getTime() - i * 24 * 60 * 60 * 1000);
    const dateStr = d.toISOString().split('T')[0];
    const monthKey = d.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
    const displayDate = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    // Day of week factor (lower on weekends)
    const dayOfWeek = d.getUTCDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const dayFactor = isWeekend ? 0.35 : 1.0;

    // Progress over the 365-day period (gradual improvement in automated accuracy and volume)
    const progressFactor = 1 - (i / 365); // 0 at start, 1 at end
    const baseDailyVolume = 85 + (progressFactor * 85); // 85 -> 170 records/day

    // Cyclic variation for seasonal revenue court sessions
    const seasonalWave = Math.sin((365 - i) / 28) * 18;
    const randomNoise = (Math.sin(i * 13.7) + Math.cos(i * 7.3)) * 8;

    const totalProcessed = Math.max(15, Math.round((baseDailyVolume + seasonalWave + randomNoise) * dayFactor));

    // Pass rate starts around 87% and climbs to ~95%
    const basePassRate = 0.865 + (progressFactor * 0.085);
    const passRateVariation = (Math.sin(i * 3.1) * 0.025);
    const passRateClamped = Math.min(0.98, Math.max(0.81, basePassRate + passRateVariation));

    const sanctioned = Math.round(totalProcessed * passRateClamped);
    const remaining = totalProcessed - sanctioned;
    const needsReview = Math.round(remaining * 0.78);
    const rejected = Math.max(0, remaining - needsReview);

    runningCumulative += sanctioned;

    points.push({
      date: dateStr,
      displayDate,
      monthKey,
      sanctioned,
      needsReview,
      rejected,
      totalProcessed,
      passRate: Math.round(passRateClamped * 1000) / 10,
      cumulativeSanctioned: runningCumulative
    });
  }

  // If current records are passed, align the most recent day's numbers with active batch stats
  if (currentRecords && currentRecords.length > 0 && points.length > 0) {
    const lastPoint = points[points.length - 1];
    const batchVerified = currentRecords.filter(r => r.status === 'VERIFIED_AND_SANCTIONED').length;
    const batchReview = currentRecords.filter(r => r.status === 'NEEDS_REVIEW').length;
    const batchRejected = currentRecords.filter(r => r.status === 'REJECTED').length;

    lastPoint.sanctioned = Math.max(lastPoint.sanctioned, batchVerified * 12);
    lastPoint.needsReview = Math.max(lastPoint.needsReview, batchReview * 4);
    lastPoint.rejected = Math.max(lastPoint.rejected, batchRejected * 2);
    lastPoint.totalProcessed = lastPoint.sanctioned + lastPoint.needsReview + lastPoint.rejected;
    lastPoint.passRate = Math.round((lastPoint.sanctioned / lastPoint.totalProcessed) * 1000) / 10;
  }

  return points;
}

export interface SparklineSummaryStats {
  totalSanctioned: number;
  totalNeedsReview: number;
  totalRejected: number;
  totalProcessed: number;
  averagePassRate: number;
  peakDailySanctioned: { date: string; count: number };
  growthYoY: number; // percentage growth
}

export function calculateTrendStats(points: ValidationTrendDataPoint[]): SparklineSummaryStats {
  if (!points.length) {
    return {
      totalSanctioned: 0,
      totalNeedsReview: 0,
      totalRejected: 0,
      totalProcessed: 0,
      averagePassRate: 0,
      peakDailySanctioned: { date: '', count: 0 },
      growthYoY: 0
    };
  }

  let totalSanctioned = 0;
  let totalNeedsReview = 0;
  let totalRejected = 0;
  let totalProcessed = 0;
  let peakDailySanctioned = { date: points[0].displayDate, count: points[0].sanctioned };

  for (const pt of points) {
    totalSanctioned += pt.sanctioned;
    totalNeedsReview += pt.needsReview;
    totalRejected += pt.rejected;
    totalProcessed += pt.totalProcessed;
    if (pt.sanctioned > peakDailySanctioned.count) {
      peakDailySanctioned = { date: pt.displayDate, count: pt.sanctioned };
    }
  }

  const averagePassRate = totalProcessed > 0 ? Math.round((totalSanctioned / totalProcessed) * 1000) / 10 : 0;

  // Compare first 30 days vs last 30 days for YoY trend
  const first30DaysSanctioned = points.slice(0, 30).reduce((acc, p) => acc + p.sanctioned, 0);
  const last30DaysSanctioned = points.slice(-30).reduce((acc, p) => acc + p.sanctioned, 0);
  const growthYoY = first30DaysSanctioned > 0
    ? Math.round(((last30DaysSanctioned - first30DaysSanctioned) / first30DaysSanctioned) * 1000) / 10
    : 0;

  return {
    totalSanctioned,
    totalNeedsReview,
    totalRejected,
    totalProcessed,
    averagePassRate,
    peakDailySanctioned,
    growthYoY
  };
}
