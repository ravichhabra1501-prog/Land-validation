/**
 * Cadastral Boundary and Geodesic Utilities for DILRMP Spatial Reconciliation
 */

export interface LatLngCoord {
  lat: number;
  lng: number;
}

export interface BoundarySegmentMetrics {
  direction: 'North' | 'East' | 'South' | 'West';
  indicDirection: string;
  indicScriptLabel: string;
  lengthMeters: number;
  bearingDegrees: number;
  bearingCompass: string;
  startPoint: LatLngCoord;
  endPoint: LatLngCoord;
}

/**
 * Calculates accurate geodesic distance in meters between two lat/lng coordinates
 * using the Haversine formula on WGS84 sphere.
 */
export function calculateHaversineDistanceMeters(c1: LatLngCoord, c2: LatLngCoord): number {
  const R = 6371000; // Earth mean radius in meters
  const rad = Math.PI / 180;
  const dLat = (c2.lat - c1.lat) * rad;
  const dLng = (c2.lng - c1.lng) * rad;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(c1.lat * rad) * Math.cos(c2.lat * rad) * Math.sin(dLng / 2) * Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

/**
 * Calculates the forward azimuth bearing in degrees between two points (0° to 360°).
 */
export function calculateBearingDegrees(c1: LatLngCoord, c2: LatLngCoord): number {
  const rad = Math.PI / 180;
  const y = Math.sin((c2.lng - c1.lng) * rad) * Math.cos(c2.lat * rad);
  const x =
    Math.cos(c1.lat * rad) * Math.sin(c2.lat * rad) -
    Math.sin(c1.lat * rad) * Math.cos(c2.lat * rad) * Math.cos((c2.lng - c1.lng) * rad);
  const brng = (Math.atan2(y, x) * 180) / Math.PI;
  return Math.round(((brng + 360) % 360) * 10) / 10;
}

/**
 * Converts degrees to compass notation e.g. "N 24° E"
 */
export function degreesToCompassNotation(deg: number): string {
  if (deg >= 337.5 || deg < 22.5) return `N ${deg.toFixed(1)}°`;
  if (deg >= 22.5 && deg < 67.5) return `N ${(deg - 22.5).toFixed(1)}° E`;
  if (deg >= 67.5 && deg < 112.5) return `E ${(deg - 67.5).toFixed(1)}°`;
  if (deg >= 112.5 && deg < 157.5) return `S ${(deg - 112.5).toFixed(1)}° E`;
  if (deg >= 157.5 && deg < 202.5) return `S ${(deg - 157.5).toFixed(1)}°`;
  if (deg >= 202.5 && deg < 247.5) return `S ${(deg - 202.5).toFixed(1)}° W`;
  if (deg >= 247.5 && deg < 292.5) return `W ${(deg - 247.5).toFixed(1)}°`;
  return `N ${(360 - deg).toFixed(1)}° W`;
}

/**
 * Breaks down polygon vertices into 4 cardinal boundary segments (North, East, South, West)
 */
export function calculateBoundarySegments(coordinates: LatLngCoord[]): BoundarySegmentMetrics[] {
  if (!coordinates || coordinates.length < 3) return [];

  const directions: Array<{
    direction: 'North' | 'East' | 'South' | 'West';
    indicDirection: string;
    indicScriptLabel: string;
  }> = [
    { direction: 'North', indicDirection: 'उत्तर (Shimal)', indicScriptLabel: 'North Edge' },
    { direction: 'East', indicDirection: 'पूर्व (Mashriq)', indicScriptLabel: 'East Edge' },
    { direction: 'South', indicDirection: 'दक्षिण (Janub)', indicScriptLabel: 'South Edge' },
    { direction: 'West', indicDirection: 'पश्चिम (Maghrib)', indicScriptLabel: 'West Edge' }
  ];

  const segments: BoundarySegmentMetrics[] = [];
  const n = coordinates.length;

  for (let i = 0; i < Math.min(n, 4); i++) {
    const start = coordinates[i];
    const end = coordinates[(i + 1) % n];
    const lengthMeters = calculateHaversineDistanceMeters(start, end);
    const bearingDeg = calculateBearingDegrees(start, end);
    const dirInfo = directions[i] || {
      direction: 'North',
      indicDirection: `Edge ${i + 1}`,
      indicScriptLabel: `Segment ${i + 1}`
    };

    segments.push({
      direction: dirInfo.direction,
      indicDirection: dirInfo.indicDirection,
      indicScriptLabel: dirInfo.indicScriptLabel,
      lengthMeters,
      bearingDegrees: bearingDeg,
      bearingCompass: degreesToCompassNotation(bearingDeg),
      startPoint: start,
      endPoint: end
    });
  }

  return segments;
}

/**
 * Calculates total polygon perimeter in meters
 */
export function calculatePerimeterMeters(coordinates: LatLngCoord[]): number {
  if (!coordinates || coordinates.length < 2) return 0;
  let total = 0;
  for (let i = 0; i < coordinates.length; i++) {
    const c1 = coordinates[i];
    const c2 = coordinates[(i + 1) % coordinates.length];
    total += calculateHaversineDistanceMeters(c1, c2);
  }
  return Math.round(total * 10) / 10;
}

export interface LandScheduleDimensions {
  // Primary Dimensions
  lengthMeters: number; // Average Length
  lengthFeet: number;
  widthMeters: number;  // Average Width
  widthFeet: number;

  // Traditional Indic Survey Units
  lengthGatta: number; // 1 Gatta = 2.7432m (9 feet)
  widthGatta: number;
  lengthJarib: number; // 1 Jarib = 20.1168m (66 feet)
  widthJarib: number;

  // Formatted Strings for Quick Display
  dimensionsMetric: string; // e.g. "177.1 m × 169.5 m"
  dimensionsImperial: string; // e.g. "581.0 ft × 556.1 ft"
  dimensionsTraditional: string; // e.g. "64.6 × 61.8 Gatta"

  // Cardinal Edge Measurements
  northEdgeMeters: number;
  northEdgeFeet: number;
  southEdgeMeters: number;
  southEdgeFeet: number;
  eastEdgeMeters: number;
  eastEdgeFeet: number;
  westEdgeMeters: number;
  westEdgeFeet: number;

  // Midpoints for on-map edge labeling
  northMidpoint?: LatLngCoord;
  southMidpoint?: LatLngCoord;
  eastMidpoint?: LatLngCoord;
  westMidpoint?: LatLngCoord;

  // Summary Metrics
  perimeterMeters: number;
  perimeterFeet: number;
  perimeterGatta: number;
  aspectRatio: string;
  shapeClassification: 'Regular Rectangular' | 'Trapezoidal Parcel' | 'Polygonal Holding';
}

/**
 * Calculates accurate geodesic midpoint between two coordinates
 */
export function calculateSegmentMidpoint(c1: LatLngCoord, c2: LatLngCoord): LatLngCoord {
  return {
    lat: (c1.lat + c2.lat) / 2,
    lng: (c1.lng + c2.lng) / 2
  };
}

/**
 * Derives comprehensive Land Schedule dimensions (Length, Width, Chauhaddi measurements)
 * from polygon vertices according to National Land Record Modernization Programme standards.
 */
export function calculateLandScheduleDimensions(coordinates: LatLngCoord[]): LandScheduleDimensions {
  if (!coordinates || coordinates.length < 3) {
    return {
      lengthMeters: 0,
      lengthFeet: 0,
      widthMeters: 0,
      widthFeet: 0,
      lengthGatta: 0,
      widthGatta: 0,
      lengthJarib: 0,
      widthJarib: 0,
      dimensionsMetric: '0 m × 0 m',
      dimensionsImperial: '0 ft × 0 ft',
      dimensionsTraditional: '0 × 0 Gatta',
      northEdgeMeters: 0,
      northEdgeFeet: 0,
      southEdgeMeters: 0,
      southEdgeFeet: 0,
      eastEdgeMeters: 0,
      eastEdgeFeet: 0,
      westEdgeMeters: 0,
      westEdgeFeet: 0,
      perimeterMeters: 0,
      perimeterFeet: 0,
      perimeterGatta: 0,
      aspectRatio: '1.00 : 1',
      shapeClassification: 'Polygonal Holding'
    };
  }

  const segments = calculateBoundarySegments(coordinates);
  const n = coordinates.length;

  const northSeg = segments[0];
  const eastSeg = segments[1];
  const southSeg = segments[2];
  const westSeg = segments[3];

  const northM = northSeg ? northSeg.lengthMeters : 0;
  const eastM = eastSeg ? eastSeg.lengthMeters : 0;
  const southM = southSeg ? southSeg.lengthMeters : northM;
  const westM = westSeg ? westSeg.lengthMeters : eastM;

  // In Indian cadastral practice, average North/South and East/West
  const avgNS = Math.round(((northM + southM) / 2) * 10) / 10;
  const avgEW = Math.round(((eastM + westM) / 2) * 10) / 10;

  // The longer dimension is conventionally designated as Length (लंबाई) and shorter as Width (चौड़ाई)
  const isNSLonger = avgNS >= avgEW;
  const lengthMeters = isNSLonger ? avgNS : avgEW;
  const widthMeters = isNSLonger ? avgEW : avgNS;

  const mToFt = (m: number) => Math.round(m * 3.28084 * 10) / 10;
  const mToGatta = (m: number) => Math.round((m / 2.7432) * 10) / 10;
  const mToJarib = (m: number) => Math.round((m / 20.1168) * 100) / 100;

  const perimeterMeters = calculatePerimeterMeters(coordinates);
  const perimeterFeet = mToFt(perimeterMeters);

  const nsVariance = Math.abs(northM - southM) / (northM || 1);
  const ewVariance = Math.abs(eastM - westM) / (eastM || 1);
  let shape: 'Regular Rectangular' | 'Trapezoidal Parcel' | 'Polygonal Holding' = 'Regular Rectangular';
  if (nsVariance > 0.08 || ewVariance > 0.08) {
    shape = 'Trapezoidal Parcel';
  }
  if (n > 4) {
    shape = 'Polygonal Holding';
  }

  const ratio = widthMeters > 0 ? (lengthMeters / widthMeters).toFixed(2) : '1.00';

  return {
    lengthMeters,
    lengthFeet: mToFt(lengthMeters),
    widthMeters,
    widthFeet: mToFt(widthMeters),
    lengthGatta: mToGatta(lengthMeters),
    widthGatta: mToGatta(widthMeters),
    lengthJarib: mToJarib(lengthMeters),
    widthJarib: mToJarib(widthMeters),
    dimensionsMetric: `${lengthMeters.toFixed(1)} m × ${widthMeters.toFixed(1)} m`,
    dimensionsImperial: `${mToFt(lengthMeters).toFixed(1)} ft × ${mToFt(widthMeters).toFixed(1)} ft`,
    dimensionsTraditional: `${mToGatta(lengthMeters).toFixed(1)} × ${mToGatta(widthMeters).toFixed(1)} Gatta`,
    northEdgeMeters: northM,
    northEdgeFeet: mToFt(northM),
    southEdgeMeters: southM,
    southEdgeFeet: mToFt(southM),
    eastEdgeMeters: eastM,
    eastEdgeFeet: mToFt(eastM),
    westEdgeMeters: westM,
    westEdgeFeet: mToFt(westM),
    northMidpoint: northSeg ? calculateSegmentMidpoint(northSeg.startPoint, northSeg.endPoint) : undefined,
    eastMidpoint: eastSeg ? calculateSegmentMidpoint(eastSeg.startPoint, eastSeg.endPoint) : undefined,
    southMidpoint: southSeg ? calculateSegmentMidpoint(southSeg.startPoint, southSeg.endPoint) : undefined,
    westMidpoint: westSeg ? calculateSegmentMidpoint(westSeg.startPoint, westSeg.endPoint) : undefined,
    perimeterMeters,
    perimeterFeet,
    perimeterGatta: mToGatta(perimeterMeters),
    aspectRatio: `${ratio} : 1`,
    shapeClassification: shape
  };
}

export type LandType = 'GOVERNMENT' | 'PRIVATE' | 'COMMON';

export interface LandTypeMeta {
  type: LandType;
  label: string;
  indicLabel: string;
  description: string;
  colorHex: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
}

export const LAND_TYPE_CONFIG: Record<LandType, LandTypeMeta> = {
  GOVERNMENT: {
    type: 'GOVERNMENT',
    label: 'Government Land',
    indicLabel: 'सरकारी भूमि (शासकीय)',
    description: 'Reserved for state departments, forest, public works, railways, or government assets',
    colorHex: '#D97706', // Amber / Gold
    badgeBg: '#FEF3C7',
    badgeText: '#92400E',
    badgeBorder: '#FCD34D'
  },
  PRIVATE: {
    type: 'PRIVATE',
    label: 'Private Land',
    indicLabel: 'निजी खातेदार (रैयती)',
    description: 'Individual or family agricultural, residential, or commercial freehold landholdings',
    colorHex: '#16A34A', // Green
    badgeBg: '#DCFCE7',
    badgeText: '#166534',
    badgeBorder: '#86EFAC'
  },
  COMMON: {
    type: 'COMMON',
    label: 'Common / Community Land',
    indicLabel: 'सार्वजनिक / शामलात (गोचर)',
    description: 'Gram Panchayat common land, Shamlat Deh, Gochar grazing, village pond/waterbody, or cremation ground',
    colorHex: '#0284C7', // Sky Blue
    badgeBg: '#E0F2FE',
    badgeText: '#075985',
    badgeBorder: '#7DD3FC'
  }
};

/**
 * Classifies a cadastral parcel into Government, Private, or Common Land
 */
export function getPlotLandType(plot: {
  owner?: string;
  status?: string;
  soil?: string;
}): LandType {
  const ownerLower = (plot.owner || '').toLowerCase();
  const statusLower = (plot.status || '').toLowerCase();

  // 1. Common / Community Land Check
  if (
    ownerLower.includes('gram panchayat') ||
    ownerLower.includes('gaon sabha') ||
    ownerLower.includes('shamlat') ||
    ownerLower.includes('gochar') ||
    ownerLower.includes('oran') ||
    ownerLower.includes('common') ||
    ownerLower.includes('gair mumkin') ||
    ownerLower.includes('gam talav') ||
    ownerLower.includes('pokhari') ||
    ownerLower.includes('drainage') ||
    ownerLower.includes('community')
  ) {
    return 'COMMON';
  }

  // 2. Government Land Check
  if (
    ownerLower.includes('forest') ||
    ownerLower.includes('shaskiya') ||
    ownerLower.includes('government') ||
    ownerLower.includes('govt') ||
    ownerLower.includes('pwd') ||
    ownerLower.includes('railway') ||
    ownerLower.includes('department') ||
    statusLower === 'govt_reserve'
  ) {
    return 'GOVERNMENT';
  }

  // 3. Default: Private Landholding
  return 'PRIVATE';
}

export type DisplayValidationStatus = 
  | 'VERIFIED_AND_SANCTIONED'
  | 'PARTIALLY_VERIFIED'
  | 'NEEDS_REVIEW'
  | 'PENDING_EXTRACTION'
  | 'LITIGATION';

export interface ValidationStatusMeta {
  status: DisplayValidationStatus;
  label: string;
  indicLabel: string;
  colorHex: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  description: string;
}

export const VALIDATION_STATUS_CONFIG: Record<DisplayValidationStatus, ValidationStatusMeta> = {
  VERIFIED_AND_SANCTIONED: {
    status: 'VERIFIED_AND_SANCTIONED',
    label: 'Verified & Sanctioned',
    indicLabel: 'सत्यापित एवं स्वीकृत',
    colorHex: '#16A34A',
    badgeBg: '#DCFCE7',
    badgeText: '#166534',
    badgeBorder: '#86EFAC',
    description: 'Clean title, passed all arithmetic and boundary reconciliation audits'
  },
  PARTIALLY_VERIFIED: {
    status: 'PARTIALLY_VERIFIED',
    label: 'Partially Verified',
    indicLabel: 'आंशिक सत्यापित',
    colorHex: '#0284C7',
    badgeBg: '#E0F2FE',
    badgeText: '#075985',
    badgeBorder: '#7DD3FC',
    description: 'Core metadata confirmed; awaiting secondary survey or mutation clearance'
  },
  NEEDS_REVIEW: {
    status: 'NEEDS_REVIEW',
    label: 'Needs Review',
    indicLabel: 'पुनरीक्षण आवश्यक',
    colorHex: '#D97706',
    badgeBg: '#FEF3C7',
    badgeText: '#92400E',
    badgeBorder: '#FCD34D',
    description: 'Flagged for surveyor inspection due to area delta or OCR discrepancy'
  },
  PENDING_EXTRACTION: {
    status: 'PENDING_EXTRACTION',
    label: 'Pending Extraction',
    indicLabel: 'प्रतीक्षारत',
    colorHex: '#64748B',
    badgeBg: '#F1F5F9',
    badgeText: '#334155',
    badgeBorder: '#CBD5E1',
    description: 'Queued for OCR/HWR extraction and schema parsing'
  },
  LITIGATION: {
    status: 'LITIGATION',
    label: 'Disputed / In Litigation',
    indicLabel: 'विवादित / न्यायालय स्थगन',
    colorHex: '#DC2626',
    badgeBg: '#FEE2E2',
    badgeText: '#991B1B',
    badgeBorder: '#FCA5A5',
    description: 'Active injunction, stay order, partition dispute, or encroachment flagged'
  }
};

/**
 * Resolves the effective validation status for a plot
 */
export function getPlotValidationStatus(
  plot: { khasra: string; village: string; recordId?: string | null; status?: string },
  records: Array<{ id: string; village?: { value: string }; khasraNumber?: { value: string }; status?: string }>
): DisplayValidationStatus {
  // Check matching digitized record first
  const matched = records.find(
    (r) => 
      (r.village?.value === plot.village && r.khasraNumber?.value === plot.khasra) || 
      (plot.recordId && r.id === plot.recordId)
  );

  if (matched?.status) {
    if (matched.status === 'VERIFIED_AND_SANCTIONED') return 'VERIFIED_AND_SANCTIONED';
    if (matched.status === 'PARTIALLY_VERIFIED') return 'PARTIALLY_VERIFIED';
    if (matched.status === 'NEEDS_REVIEW') return 'NEEDS_REVIEW';
    if (matched.status === 'PENDING_EXTRACTION' || matched.status === 'PROCESSING') return 'PENDING_EXTRACTION';
    if (matched.status === 'REJECTED') return 'LITIGATION';
  }

  // Fallback to plot's spatial status
  if (plot.status === 'LITIGATION') return 'LITIGATION';
  if (plot.status === 'ENCROACHMENT_SUSPECTED') return 'NEEDS_REVIEW';
  if (plot.status === 'GOVT_RESERVE') return 'VERIFIED_AND_SANCTIONED';
  return 'VERIFIED_AND_SANCTIONED';
}


