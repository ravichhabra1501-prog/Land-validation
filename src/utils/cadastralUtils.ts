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
