import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import { 
  APIProvider, 
  Map as GoogleMap, 
  Polygon as GooglePolygon, 
  AdvancedMarker, 
  InfoWindow as GoogleInfoWindow 
} from '@vis.gl/react-google-maps';
import { 
  Layers, 
  Eye, 
  Maximize2, 
  RotateCcw, 
  AlertTriangle, 
  CheckCircle2, 
  MapPin,
  Sliders,
  Compass,
  Satellite,
  Plus,
  Minus,
  Sparkles,
  RefreshCw,
  ExternalLink,
  ShieldAlert,
  Ruler,
  FileSpreadsheet,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Grid,
  LayoutGrid
} from 'lucide-react';
import { CadastralPlot, VILLAGE_CENTERS, VILLAGE_INFRASTRUCTURE } from '../data/cadastralPlotsData';
import { 
  calculateLandScheduleDimensions, 
  LandScheduleDimensions,
  calculateHaversineDistanceMeters,
  calculateSegmentMidpoint,
  DisplayValidationStatus,
  VALIDATION_STATUS_CONFIG,
  getPlotValidationStatus
} from '../utils/cadastralUtils';
import { ExtractedLandRecord } from '../types';

export type MapLayerType = 'plain-structure' | 'google-hybrid' | 'google-satellite' | 'esri-satellite' | 'google-roadmap';

export interface CadastralGoogleMapViewProps {
  plots: CadastralPlot[];
  selectedPlot: CadastralPlot;
  onSelectPlot: (plot: CadastralPlot) => void;
  activeLayer: 'cadastral' | 'satellite' | 'plain' | 'soils' | 'disputes';
  onLayerChange?: (layer: 'cadastral' | 'satellite' | 'plain' | 'soils' | 'disputes') => void;
  cadastralOpacity: number;
  onOpacityChange: (opacity: number) => void;
  showRoads: boolean;
  showWaterbodies: boolean;
  showLabels: boolean;
  onToggleLabels: () => void;
  showGrid?: boolean;
  onToggleGrid?: () => void;
  gridInterval?: number;
  onGridIntervalChange?: (interval: number) => void;
  showPlainStructure?: boolean;
  onTogglePlainStructure?: () => void;
  heightClass?: string;
  highlightedKhasras?: string[];
  highlightValidationStatus?: DisplayValidationStatus | 'ALL';
  records?: ExtractedLandRecord[];
}

export const CadastralGoogleMapView: React.FC<CadastralGoogleMapViewProps> = ({
  plots,
  selectedPlot,
  onSelectPlot,
  activeLayer,
  onLayerChange,
  cadastralOpacity,
  onOpacityChange,
  showRoads,
  showWaterbodies,
  showLabels,
  onToggleLabels,
  showGrid: propShowGrid,
  onToggleGrid,
  gridInterval: propGridInterval,
  onGridIntervalChange,
  showPlainStructure: propShowPlainStructure,
  onTogglePlainStructure,
  heightClass,
  highlightedKhasras,
  highlightValidationStatus,
  records = []
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const gridGroupRef = useRef<L.FeatureGroup | null>(null);
  const plainStructureGroupRef = useRef<L.FeatureGroup | null>(null);
  const polygonsGroupRef = useRef<L.FeatureGroup | null>(null);
  const infrastructureGroupRef = useRef<L.FeatureGroup | null>(null);
  const markersGroupRef = useRef<L.FeatureGroup | null>(null);
  const dimensionMarkersGroupRef = useRef<L.FeatureGroup | null>(null);

  const getInitialTileType = (layer: string): MapLayerType => {
    if (layer === 'plain') return 'plain-structure';
    if (layer === 'cadastral') return 'google-roadmap';
    if (layer === 'soils') return 'esri-satellite';
    return 'google-hybrid';
  };

  const [activeTileType, setActiveTileType] = useState<MapLayerType>(getInitialTileType(activeLayer));
  const [internalShowGrid, setInternalShowGrid] = useState<boolean>(true);
  const [internalGridInterval, setInternalGridInterval] = useState<number>(50);
  const [internalPlainStructure, setInternalPlainStructure] = useState<boolean>(activeLayer === 'plain');

  const showGrid = propShowGrid !== undefined ? propShowGrid : internalShowGrid;
  const gridInterval = propGridInterval !== undefined ? propGridInterval : internalGridInterval;
  
  // Plain structure is active ONLY when activeLayer is 'plain'
  const isPlainStructure = activeLayer === 'plain';

  const handleToggleGrid = () => {
    if (onToggleGrid) {
      onToggleGrid();
    } else {
      setInternalShowGrid((prev) => !prev);
    }
  };

  const handleGridIntervalChange = (interval: number) => {
    if (onGridIntervalChange) {
      onGridIntervalChange(interval);
    } else {
      setInternalGridInterval(interval);
    }
  };

  const handleTogglePlainStructure = () => {
    if (onTogglePlainStructure) {
      onTogglePlainStructure();
    } else {
      setInternalPlainStructure((prev) => !prev);
    }
  };

  // Synchronize when parent activeLayer switches between any of the 5 models
  useEffect(() => {
    if (activeLayer === 'plain') {
      setActiveTileType('plain-structure');
      setInternalPlainStructure(true);
    } else {
      setInternalPlainStructure(false);
      if (activeLayer === 'satellite') {
        setActiveTileType('google-hybrid');
      } else if (activeLayer === 'soils') {
        setActiveTileType('esri-satellite');
      } else if (activeLayer === 'cadastral') {
        setActiveTileType('google-roadmap');
      } else if (activeLayer === 'disputes') {
        setActiveTileType('google-hybrid');
      }
    }
  }, [activeLayer]);

  const [cursorCoords, setCursorCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [useJsSdk, setUseJsSdk] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showDimensions, setShowDimensions] = useState<boolean>(true);
  const [isScheduleDrawerOpen, setIsScheduleDrawerOpen] = useState<boolean>(true);
  const [unitMode, setUnitMode] = useState<'METRIC' | 'IMPERIAL' | 'TRADITIONAL'>('METRIC');

  const selectedDimensions = calculateLandScheduleDimensions(selectedPlot.coordinates);

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

  // Tile layer URLs
  const getTileUrl = (type: MapLayerType) => {
    switch (type) {
      case 'plain-structure':
        return 'https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png';
      case 'google-hybrid':
        return 'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}';
      case 'google-satellite':
        return 'https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}';
      case 'esri-satellite':
        return 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
      case 'google-roadmap':
      default:
        return 'https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}';
    }
  };

  const getTileAttribution = (type: MapLayerType) => {
    if (type === 'plain-structure') {
      return '&copy; CartoDB &bull; OpenStreetMap contributors &bull; DILRMP Plain Cadastral Shajra';
    }
    if (type === 'esri-satellite') {
      return 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community';
    }
    return '&copy; Google Maps Platform &bull; DILRMP Cadastral Overlay';
  };

  // 1. Initialize Leaflet Map once container is mounted
  useEffect(() => {
    if (useJsSdk || !mapContainerRef.current) return;

    if (leafletMapRef.current) {
      leafletMapRef.current.remove();
      leafletMapRef.current = null;
    }

    const map = L.map(mapContainerRef.current, {
      center: [selectedPlot.centroid.lat, selectedPlot.centroid.lng],
      zoom: 17,
      zoomControl: false,
      attributionControl: false
    });

    // Create high z-index panes so Grid and Boundary features render consistently over parcel fills
    const gridPane = map.createPane('cadastralGridPane');
    gridPane.style.zIndex = '550';
    gridPane.style.pointerEvents = 'none';

    const plainPane = map.createPane('cadastralPlainPane');
    plainPane.style.zIndex = '560';
    plainPane.style.pointerEvents = 'none';

    // Add initial Tile Layer with robust error fallback
    const tileLayer = L.tileLayer(getTileUrl(activeTileType), {
      maxZoom: 21,
      maxNativeZoom: 19,
      subdomains: activeTileType === 'plain-structure' ? ['a', 'b', 'c', 'd'] : ['mt0', 'mt1', 'mt2', 'mt3'],
      attribution: getTileAttribution(activeTileType)
    });

    // Fallback handler: ensures Plain Structure and other layers never show broken tile icons or fail due to network/API key
    tileLayer.on('tileerror', (e) => {
      const img = (e as any).tile as HTMLImageElement;
      if (img) {
        img.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" fill="%23FAF8F5"><rect width="256" height="256" fill="%23FAF8F5"/><path d="M0 0h256v256H0z" fill="none" stroke="%23EBE7DF" stroke-width="0.5"/></svg>';
      }
    });

    tileLayer.addTo(map);
    tileLayerRef.current = tileLayer;

    // Create layer groups for vectors
    const gridGroup = L.featureGroup().addTo(map);
    const polyGroup = L.featureGroup().addTo(map);
    const plainGroup = L.featureGroup().addTo(map);
    const infraGroup = L.featureGroup().addTo(map);
    const markGroup = L.featureGroup().addTo(map);
    const dimGroup = L.featureGroup().addTo(map);

    gridGroupRef.current = gridGroup;
    polygonsGroupRef.current = polyGroup;
    plainStructureGroupRef.current = plainGroup;
    infrastructureGroupRef.current = infraGroup;
    markersGroupRef.current = markGroup;
    dimensionMarkersGroupRef.current = dimGroup;

    // Track mouse coordinates
    map.on('mousemove', (e) => {
      setCursorCoords({ lat: e.latlng.lat, lng: e.latlng.lng });
    });

    leafletMapRef.current = map;

    // Handle container resize (e.g. split-screen toggle) to invalidate map size
    let resizeObserver: ResizeObserver | null = null;
    if (mapContainerRef.current) {
      resizeObserver = new ResizeObserver(() => {
        if (leafletMapRef.current) {
          leafletMapRef.current.invalidateSize();
        }
      });
      resizeObserver.observe(mapContainerRef.current);
    }

    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      map.remove();
      leafletMapRef.current = null;
    };
  }, [useJsSdk]);

  // 2. Update Tile Layer when user switches Map Type
  useEffect(() => {
    if (!leafletMapRef.current || useJsSdk) return;

    if (tileLayerRef.current) {
      leafletMapRef.current.removeLayer(tileLayerRef.current);
    }

    const newTile = L.tileLayer(getTileUrl(activeTileType), {
      maxZoom: 21,
      maxNativeZoom: 19,
      subdomains: activeTileType === 'plain-structure' ? ['a', 'b', 'c', 'd'] : ['mt0', 'mt1', 'mt2', 'mt3'],
      attribution: getTileAttribution(activeTileType)
    });

    newTile.on('tileerror', (e) => {
      const img = (e as any).tile as HTMLImageElement;
      if (img) {
        img.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" fill="%23FAF8F5"><rect width="256" height="256" fill="%23FAF8F5"/><path d="M0 0h256v256H0z" fill="none" stroke="%23EBE7DF" stroke-width="0.5"/></svg>';
      }
    });

    newTile.addTo(leafletMapRef.current);
    tileLayerRef.current = newTile;
  }, [activeTileType, useJsSdk]);

  // 3. Render Cadastral Parcel Polygons, Hover States, and Centroid Badges
  useEffect(() => {
    if (!leafletMapRef.current || !polygonsGroupRef.current || !markersGroupRef.current || useJsSdk) return;

    const polyGroup = polygonsGroupRef.current;
    const markGroup = markersGroupRef.current;

    polyGroup.clearLayers();
    markGroup.clearLayers();

    plots.forEach((plot) => {
      const isSelected = plot.khasra === selectedPlot.khasra;
      const isDisputed = plot.status === 'LITIGATION';
      const isGovt = plot.status === 'GOVT_RESERVE';
      const isHighlighted = highlightedKhasras && highlightedKhasras.includes(plot.khasra);
      const hasActiveHighlightFilter = highlightedKhasras && highlightedKhasras.length > 0 && highlightedKhasras.length < plots.length;
      const opacity = cadastralOpacity / 100;

      let fillColor = '#5A5A40';
      let strokeColor = '#E5C37A';

      if (isHighlighted) {
        // High-contrast highlighting for plots matching selected validation status
        const valStatus = getPlotValidationStatus(plot, records);
        const statusMeta = VALIDATION_STATUS_CONFIG[valStatus];
        fillColor = isPlainStructure ? statusMeta.badgeBg : statusMeta.colorHex;
        strokeColor = statusMeta.colorHex;
      } else if (hasActiveHighlightFilter && !isSelected) {
        // Muted presentation for non-matching parcels when a filter is actively highlighting
        fillColor = isPlainStructure ? '#F5F3EE' : '#2D2D20';
        strokeColor = isPlainStructure ? '#DCD7CE' : '#4D4D38';
      } else if (isPlainStructure) {
        // Plain Structure Cadastral Revenue Plan Drafting Scheme
        if (isDisputed) {
          fillColor = '#FDF0ED';
          strokeColor = '#8B0000';
        } else if (isGovt) {
          fillColor = '#FFFDE8';
          strokeColor = '#B8860B';
        } else if (isSelected) {
          fillColor = '#FFF9EA';
          strokeColor = '#8B4513';
        } else {
          fillColor = '#FAF8F5';
          strokeColor = '#5A5A40';
        }
      } else if (activeLayer === 'disputes') {
        if (isDisputed) {
          fillColor = '#8B0000';
          strokeColor = '#FF4444';
        } else if (isGovt) {
          fillColor = '#B8860B';
          strokeColor = '#FFD700';
        } else {
          fillColor = '#3D5A40';
          strokeColor = '#A6CCA0';
        }
      } else if (activeLayer === 'soils') {
        if (plot.soil.includes('Nahri') || plot.soil.includes('Irrigated')) {
          fillColor = '#2F6B55';
          strokeColor = '#7EA0B7';
        } else {
          fillColor = '#8B4513';
          strokeColor = '#D4AC50';
        }
      } else {
        if (isSelected) {
          fillColor = '#E5C37A';
          strokeColor = '#FFFFFF';
        } else {
          fillColor = '#5A5A40';
          strokeColor = '#EBE7DF';
        }
      }

      // Convert lat/lng coordinates to Leaflet LatLngExpression
      const latLngs: [number, number][] = plot.coordinates.map((c) => [c.lat, c.lng]);

      const polygonWeight = isSelected 
        ? 3.8 
        : isHighlighted 
        ? 3.6 
        : hasActiveHighlightFilter 
        ? 1.2 
        : (isPlainStructure ? 2 : 2);

      const calculatedFillOpacity = isHighlighted
        ? (isPlainStructure ? 0.90 : Math.max(0.70, opacity * 0.85))
        : hasActiveHighlightFilter && !isSelected
        ? (isPlainStructure ? 0.40 : 0.18)
        : isPlainStructure 
        ? (isSelected ? 0.92 : 0.85)
        : (isSelected ? Math.min(opacity * 0.85 + 0.15, 0.85) : opacity * 0.5);

      const polygon = L.polygon(latLngs, {
        color: isSelected ? (isPlainStructure ? '#8B4513' : '#FFFFFF') : strokeColor,
        weight: polygonWeight,
        fillColor: fillColor,
        fillOpacity: calculatedFillOpacity,
        dashArray: isHighlighted ? undefined : (isDisputed ? '4, 4' : undefined)
      });

      // Interactive Click & Hover
      polygon.on('click', () => {
        onSelectPlot(plot);
      });

      polygon.on('mouseover', function () {
        if (!isSelected) {
          this.setStyle({
            weight: 3,
            color: '#FFF9EA',
            fillOpacity: Math.min(opacity * 0.75 + 0.2, 0.8)
          });
        }
      });

      polygon.on('mouseout', function () {
        if (!isSelected) {
          this.setStyle({
            weight: 2,
            color: strokeColor,
            fillOpacity: opacity * 0.5
          });
        }
      });

      // Bind rich popup
      const plotDim = calculateLandScheduleDimensions(plot.coordinates);
      const statusBadge = plot.status === 'CLEAN' 
        ? '<span style="background: #EAF2EB; color: #3D5A40; padding: 2px 6px; border-radius: 4px; font-weight: bold; font-size: 10px;">Clean Title</span>'
        : '<span style="background: #FDF0ED; color: #8B0000; padding: 2px 6px; border-radius: 4px; font-weight: bold; font-size: 10px;">⚠️ Active Litigation</span>';

      const popupContent = `
        <div style="font-family: 'Plus Jakarta Sans', system-ui, sans-serif; font-size: 12px; line-height: 1.4; color: #33332A; min-width: 240px; padding: 4px;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #DCD7CE; padding-bottom: 6px; margin-bottom: 6px;">
            <strong style="font-size: 13px; color: #5A5A40; font-family: Georgia, serif;">Khasra / Gat #${plot.khasra}</strong>
            ${statusBadge}
          </div>
          <div><strong>Owner:</strong> ${plot.owner}</div>
          <div style="font-size: 11px; color: #6B6B58; margin-bottom: 4px;">${plot.parentage}</div>
          <div><strong>Area:</strong> ${plot.areaHa} Ha (${plot.areaSqM.toLocaleString()} sq.m)</div>
          
          <div style="background: #F5F3EE; border: 1px solid #DCD7CE; border-radius: 6px; padding: 6px; margin: 6px 0;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <span style="font-size: 10px; color: #5A5A40; font-weight: bold; text-transform: uppercase;">Land Schedule Dimensions (पैमाइश)</span>
              <span style="font-size: 9px; background: #EAF2EB; color: #3D5A40; padding: 1px 4px; border-radius: 3px; font-weight: bold;">All Roles</span>
            </div>
            <div style="font-size: 12px; font-weight: bold; color: #33332A; font-family: monospace;">
              Length: ${plotDim.lengthMeters} m &bull; Width: ${plotDim.widthMeters} m
            </div>
            <div style="font-size: 10px; color: #5A5A40; margin-top: 1px;">
              (${plotDim.lengthFeet} ft × ${plotDim.widthFeet} ft) &bull; ${plotDim.dimensionsTraditional}
            </div>
            <div style="font-size: 10px; color: #6B6B58; margin-top: 3px; border-top: 1px dashed #DCD7CE; padding-top: 3px; display: flex; justify-content: space-between;">
              <span>Perimeter: <strong>${plotDim.perimeterMeters} m</strong></span>
              <span>Shape: <strong>${plotDim.shapeClassification}</strong></span>
            </div>
          </div>

          <div><strong>Soil:</strong> ${plot.soil}</div>
          <div style="margin-top: 6px; padding-top: 4px; border-top: 1px dashed #DCD7CE; font-size: 10px; color: #6B6B58;">
            Khata Folio: #${plot.khata} &bull; Village: ${plot.village}
          </div>
        </div>
      `;

      polygon.bindPopup(popupContent, {
        closeButton: true,
        className: 'cadastral-custom-popup'
      });

      if (isSelected) {
        polygon.openPopup([plot.centroid.lat, plot.centroid.lng]);
      }

      polyGroup.addLayer(polygon);

      // Centroid Label Badge Marker
      if (showLabels) {
        const badgeIcon = L.divIcon({
          className: 'custom-cadastral-label',
          html: `
            <div style="
              background: ${isSelected ? '#E5C37A' : isHighlighted ? '#FEF3C7' : 'rgba(38, 38, 26, 0.88)'};
              color: ${isSelected ? '#26261A' : isHighlighted ? '#92400E' : '#FFF9EA'};
              border: 1.5px solid ${isSelected ? '#FFFFFF' : isHighlighted ? '#F59E0B' : '#707052'};
              padding: 2px 7px;
              border-radius: 6px;
              font-size: 10px;
              font-weight: bold;
              white-space: nowrap;
              text-align: center;
              box-shadow: ${isHighlighted ? '0 0 8px rgba(245, 158, 11, 0.6)' : '0 2px 6px rgba(0,0,0,0.35)'};
              cursor: pointer;
              transform: translate(-50%, -50%);
            ">
              <span>${isHighlighted ? '★ ' : ''}${plot.khasra}</span>
            </div>
          `,
          iconSize: [0, 0]
        });

        const labelMarker = L.marker([plot.centroid.lat, plot.centroid.lng], { icon: badgeIcon });
        labelMarker.on('click', () => {
          onSelectPlot(plot);
        });
        markGroup.addLayer(labelMarker);
      }
    });

    // Centroid Selected Pin Marker
    const pinIcon = L.divIcon({
      className: 'selected-khasra-pin',
      html: `
        <div style="
          background: #FAF8F5;
          color: #33332A;
          border: 2px solid #8B4513;
          border-radius: 6px;
          padding: 3px 8px;
          font-size: 11px;
          font-weight: bold;
          display: flex;
          align-items: center;
          gap: 4px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.4);
          transform: translate(-50%, -100%);
          margin-top: -8px;
        ">
          <span style="color: #8B4513;">📍</span>
          <span>Khasra ${selectedPlot.khasra}</span>
        </div>
      `,
      iconSize: [0, 0]
    });

    const centerPin = L.marker([selectedPlot.centroid.lat, selectedPlot.centroid.lng], { icon: pinIcon });
    markGroup.addLayer(centerPin);

    // Boundary Edge Dimension Markers (Length & Width) for Selected Parcel
    if (dimensionMarkersGroupRef.current) {
      const dimGroup = dimensionMarkersGroupRef.current;
      dimGroup.clearLayers();

      if (showDimensions && selectedPlot.coordinates?.length >= 3) {
        const selDim = calculateLandScheduleDimensions(selectedPlot.coordinates);
        const edges = [
          { dir: 'North', indic: 'उत्तर', lengthM: selDim.northEdgeMeters, lengthFt: selDim.northEdgeFeet, pt: selDim.northMidpoint, type: 'Length' },
          { dir: 'East', indic: 'पूर्व', lengthM: selDim.eastEdgeMeters, lengthFt: selDim.eastEdgeFeet, pt: selDim.eastMidpoint, type: 'Width' },
          { dir: 'South', indic: 'दक्षिण', lengthM: selDim.southEdgeMeters, lengthFt: selDim.southEdgeFeet, pt: selDim.southMidpoint, type: 'Length' },
          { dir: 'West', indic: 'पश्चिम', lengthM: selDim.westEdgeMeters, lengthFt: selDim.westEdgeFeet, pt: selDim.westMidpoint, type: 'Width' }
        ];

        edges.forEach((edge) => {
          if (!edge.pt) return;
          const badge = L.divIcon({
            className: 'boundary-edge-dimension-badge',
            html: `
              <div style="
                background: rgba(31, 32, 24, 0.94);
                color: #FFF9EA;
                border: 1.5px solid #E5C37A;
                border-radius: 6px;
                padding: 2px 7px;
                font-size: 10px;
                font-family: monospace;
                white-space: nowrap;
                box-shadow: 0 3px 8px rgba(0,0,0,0.5);
                display: flex;
                align-items: center;
                gap: 4px;
                transform: translate(-50%, -50%);
                pointer-events: none;
              ">
                <span style="color: #E5C37A; font-weight: bold;">${edge.dir[0]}</span>
                <span style="color: #A3A390; font-size: 9px;">${edge.type}:</span>
                <strong style="color: #FFFFFF;">${edge.lengthM}m</strong>
                <span style="color: #C2BFB4; font-size: 9px;">(${edge.lengthFt}ft)</span>
              </div>
            `,
            iconSize: [0, 0]
          });
          const m = L.marker([edge.pt.lat, edge.pt.lng], { icon: badge, interactive: false });
          dimGroup.addLayer(m);
        });
      }
    }

  }, [plots, selectedPlot, activeLayer, cadastralOpacity, showLabels, showDimensions, isPlainStructure, useJsSdk, highlightedKhasras, records]);


  // 4. Render Infrastructure (Canals and Chak Marg Roads)
  useEffect(() => {
    if (!leafletMapRef.current || !infrastructureGroupRef.current || useJsSdk) return;

    const infraGroup = infrastructureGroupRef.current;
    infraGroup.clearLayers();

    const villageInfra = VILLAGE_INFRASTRUCTURE[selectedPlot.village as keyof typeof VILLAGE_INFRASTRUCTURE];
    if (!villageInfra) return;

    // Canals / Rajbaha Network
    if (showWaterbodies && villageInfra.canals) {
      villageInfra.canals.forEach((lineCoords) => {
        const canalLine: [number, number][] = lineCoords.map((c) => [c.lat, c.lng]);
        const polyline = L.polyline(canalLine, {
          color: '#4DA2DB',
          weight: 6,
          opacity: 0.9,
          lineCap: 'round',
          lineJoin: 'round'
        });
        polyline.bindTooltip('Rajbaha Irrigation Canal (राजबाहा)', { sticky: true });
        infraGroup.addLayer(polyline);
      });
    }

    // Roads & Paths
    if (showRoads && villageInfra.roads) {
      villageInfra.roads.forEach((lineCoords) => {
        const roadLine: [number, number][] = lineCoords.map((c) => [c.lat, c.lng]);
        const polyline = L.polyline(roadLine, {
          color: '#E5C37A',
          weight: 4.5,
          opacity: 0.95,
          dashArray: '6, 4',
          lineCap: 'round'
        });
        polyline.bindTooltip('Village PWD / Chak Marg (गाँव संपर्क मार्ग)', { sticky: true });
        infraGroup.addLayer(polyline);
      });
    }
  }, [selectedPlot.village, showRoads, showWaterbodies, useJsSdk]);

  // 5. Render Cadastral Survey Metric Coordinate Grid across FULL MAP FORMATIONS (Satellite, Plain, Soils, Cadastral, Disputes)
  useEffect(() => {
    if (!leafletMapRef.current || !gridGroupRef.current || useJsSdk) return;

    const map = leafletMapRef.current;
    const gridGroup = gridGroupRef.current;

    const renderFullFormationGrid = () => {
      gridGroup.clearLayers();

      if (!showGrid) return;

      const villageCenter = VILLAGE_CENTERS[selectedPlot.village as keyof typeof VILLAGE_CENTERS] || selectedPlot.centroid;
      const originLat = villageCenter.lat;
      const originLng = villageCenter.lng;

      // Metric degree equivalents at village origin latitude
      const latMetersPerDegree = 111139;
      const lngMetersPerDegree = 111139 * Math.cos((originLat * Math.PI) / 180);

      const baseStepMeters = gridInterval || 50;

      // Dynamic viewport bounds for full map formations
      const bounds = map.getBounds();
      const zoom = map.getZoom();

      // Adaptive step for full map zoom ranges (guarantees continuous visibility across wide formations without freezing)
      let stepMeters = baseStepMeters;
      if (zoom < 11) {
        stepMeters = Math.max(baseStepMeters, 5000); // 5km macro geodetic formation
      } else if (zoom < 13) {
        stepMeters = Math.max(baseStepMeters, 1000); // 1km tehsil block grid
      } else if (zoom < 15) {
        stepMeters = Math.max(baseStepMeters, 200);  // 200m village block grid
      } else {
        stepMeters = baseStepMeters; // 20m Zarib, 25m fine, 50m Cadastral, 100m survey block
      }

      // Buffer of 2 grid steps around the visible viewport bounds so panning is completely seamless
      const bufferPaddingLat = (stepMeters * 3) / latMetersPerDegree;
      const bufferPaddingLng = (stepMeters * 3) / lngMetersPerDegree;

      const southLatLimit = bounds.getSouth() - bufferPaddingLat;
      const northLatLimit = bounds.getNorth() + bufferPaddingLat;
      const westLngLimit = bounds.getWest() - bufferPaddingLng;
      const eastLngLimit = bounds.getEast() + bufferPaddingLng;

      // Calculate steps relative to Village Datum Origin (0,0)
      const westSteps = Math.ceil((originLng - westLngLimit) * lngMetersPerDegree / stepMeters);
      const eastSteps = Math.ceil((eastLngLimit - originLng) * lngMetersPerDegree / stepMeters);
      const southSteps = Math.ceil((originLat - southLatLimit) * latMetersPerDegree / stepMeters);
      const northSteps = Math.ceil((northLatLimit - originLat) * latMetersPerDegree / stepMeters);

      // Total steps safety cap to keep 60fps rendering in extreme zoom ranges
      let effectiveStep = stepMeters;
      if (westSteps + eastSteps > 140) {
        effectiveStep = Math.ceil(((eastLngLimit - westLngLimit) * lngMetersPerDegree) / 100);
      }

      // Distinct, calibrated styling for each of the 5 requested map models:
      let gridStrokeColor = '#FFD700';
      let gridOpacity = 0.85;
      let gridWeight = 1.25;
      let datumColor = '#FEF08A';
      let labelBg = 'rgba(15, 23, 42, 0.94)';
      let labelText = '#FEF08A';
      let labelBorder = '#EAB308';
      let crosshairColor = '#FBBF24';
      let dashArray: string | undefined = '4, 4';

      const isSoilModel = activeLayer === 'soils' || (activeLayer as string) === 'soil';

      if (isPlainStructure || activeLayer === 'plain') {
        // Plain Structure Model (सादा भू-नक्शा): crisp dark bistre ink lines with ivory badges & Munara reference
        gridStrokeColor = '#3B3A2C';
        gridOpacity = 0.75;
        gridWeight = 1.2;
        datumColor = '#78350F';
        labelBg = 'rgba(250, 248, 245, 0.98)';
        labelText = '#1F2018';
        labelBorder = '#78350F';
        crosshairColor = '#78350F';
        dashArray = '4, 4';
      } else if (activeLayer === 'satellite') {
        // Full Satellite Model: luminous solar gold lines with dark badges for high contrast over dark vegetation
        gridStrokeColor = '#FFD700';
        gridOpacity = 0.85;
        gridWeight = 1.3;
        datumColor = '#FEF08A';
        labelBg = 'rgba(15, 23, 42, 0.95)';
        labelText = '#FEF08A';
        labelBorder = '#EAB308';
        crosshairColor = '#FBBF24';
        dashArray = '4, 4';
      } else if (activeLayer === 'cadastral') {
        // Cadastral Shajra Model: traditional warm amber Zarib / Gunter's Chain grid with chainage ticks
        gridStrokeColor = '#F59E0B';
        gridOpacity = 0.85;
        gridWeight = 1.3;
        datumColor = '#D97706';
        labelBg = 'rgba(41, 27, 10, 0.95)';
        labelText = '#FDE68A';
        labelBorder = '#F59E0B';
        crosshairColor = '#F59E0B';
        dashArray = '5, 3';
      } else if (isSoilModel) {
        // Soil Formation Model: high-contrast electric neon cyan/teal grid cutting through brown and green soil polygons
        gridStrokeColor = '#00E5FF';
        gridOpacity = 0.90;
        gridWeight = 1.3;
        datumColor = '#06B6D4';
        labelBg = 'rgba(8, 51, 68, 0.95)';
        labelText = '#67E8F9';
        labelBorder = '#06B6D4';
        crosshairColor = '#22D3EE';
        dashArray = '5, 3';
      } else if (activeLayer === 'disputes') {
        // Disputes Model: high-alert hazard red & orange grid highlighting parcel discrepancies and litigation corridors
        gridStrokeColor = '#EF4444';
        gridOpacity = 0.90;
        gridWeight = 1.4;
        datumColor = '#DC2626';
        labelBg = 'rgba(69, 10, 10, 0.96)';
        labelText = '#FCA5A5';
        labelBorder = '#EF4444';
        crosshairColor = '#F87171';
        dashArray = '4, 4';
      }

      // North-South Grid Lines (Eastings) across full viewport formation
      for (let i = -westSteps; i <= eastSteps; i++) {
        const eastingOffset = i * effectiveStep;
        const lineLng = originLng + eastingOffset / lngMetersPerDegree;
        const startLat = southLatLimit;
        const endLat = northLatLimit;
        const isDatum = i === 0;

        const gridLine = L.polyline(
          [
            [startLat, lineLng],
            [endLat, lineLng]
          ],
          {
            pane: 'cadastralGridPane',
            color: isDatum ? datumColor : gridStrokeColor,
            weight: isDatum ? gridWeight * 1.8 : gridWeight,
            opacity: isDatum ? 0.98 : gridOpacity,
            dashArray: isDatum ? undefined : dashArray,
            interactive: false
          }
        );
        gridGroup.addLayer(gridLine);

        // Metric coordinate label along visible northern edge
        if (i % 2 === 0 || effectiveStep >= 100 || isDatum) {
          const offsetLabel = isDatum ? '0m DATUM (E)' : `${eastingOffset > 0 ? '+' : ''}${Math.abs(eastingOffset) >= 1000 ? (eastingOffset / 1000).toFixed(1) + 'km' : eastingOffset + 'm'} E`;
          const labelLat = Math.min(bounds.getNorth(), northLatLimit);
          const labelIcon = L.divIcon({
            className: 'cadastral-grid-label',
            html: `
              <div style="
                background: ${labelBg};
                color: ${labelText};
                border: 1px solid ${labelBorder};
                font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
                font-size: 8.5px;
                padding: 1px 4px;
                border-radius: 3px;
                white-space: nowrap;
                transform: translate(-50%, -50%);
                pointer-events: none;
                font-weight: ${isDatum ? 'bold' : '600'};
                box-shadow: 0 1px 4px rgba(0,0,0,0.4);
                letter-spacing: 0.2px;
              ">
                ${offsetLabel}
              </div>
            `,
            iconSize: [0, 0]
          });
          const mNorth = L.marker([labelLat, lineLng], { icon: labelIcon, pane: 'cadastralGridPane', interactive: false });
          gridGroup.addLayer(mNorth);
        }
      }

      // East-West Grid Lines (Northings) across full viewport formation
      for (let j = -southSteps; j <= northSteps; j++) {
        const northingOffset = j * effectiveStep;
        const lineLat = originLat + northingOffset / latMetersPerDegree;
        const startLng = westLngLimit;
        const endLng = eastLngLimit;
        const isDatum = j === 0;

        const gridLine = L.polyline(
          [
            [lineLat, startLng],
            [lineLat, endLng]
          ],
          {
            pane: 'cadastralGridPane',
            color: isDatum ? datumColor : gridStrokeColor,
            weight: isDatum ? gridWeight * 1.8 : gridWeight,
            opacity: isDatum ? 0.98 : gridOpacity,
            dashArray: isDatum ? undefined : dashArray,
            interactive: false
          }
        );
        gridGroup.addLayer(gridLine);

        // Metric coordinate label along visible western edge
        if (j % 2 === 0 || effectiveStep >= 100 || isDatum) {
          const offsetLabel = isDatum ? '0m DATUM (N)' : `${northingOffset > 0 ? '+' : ''}${Math.abs(northingOffset) >= 1000 ? (northingOffset / 1000).toFixed(1) + 'km' : northingOffset + 'm'} N`;
          const labelLng = Math.max(bounds.getWest(), westLngLimit);
          const labelIcon = L.divIcon({
            className: 'cadastral-grid-label',
            html: `
              <div style="
                background: ${labelBg};
                color: ${labelText};
                border: 1px solid ${labelBorder};
                font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
                font-size: 8.5px;
                padding: 1px 4px;
                border-radius: 3px;
                white-space: nowrap;
                transform: translate(-50%, -50%);
                pointer-events: none;
                font-weight: ${isDatum ? 'bold' : '600'};
                box-shadow: 0 1px 4px rgba(0,0,0,0.4);
                letter-spacing: 0.2px;
              ">
                ${offsetLabel}
              </div>
            `,
            iconSize: [0, 0]
          });
          const mWest = L.marker([lineLat, labelLng], { icon: labelIcon, pane: 'cadastralGridPane', interactive: false });
          gridGroup.addLayer(mWest);
        }
      }

      // Render intersection crosshairs (+) at visible junctions for surveying precision
      if (zoom >= 15 && westSteps + eastSteps < 80) {
        const visibleMinLat = bounds.getSouth();
        const visibleMaxLat = bounds.getNorth();
        const visibleMinLng = bounds.getWest();
        const visibleMaxLng = bounds.getEast();

        for (let i = -westSteps; i <= eastSteps; i += 2) {
          const lineLng = originLng + (i * effectiveStep) / lngMetersPerDegree;
          if (lineLng < visibleMinLng || lineLng > visibleMaxLng) continue;

          for (let j = -southSteps; j <= northSteps; j += 2) {
            const lineLat = originLat + (j * effectiveStep) / latMetersPerDegree;
            if (lineLat < visibleMinLat || lineLat > visibleMaxLat) continue;

            const crosshairIcon = L.divIcon({
              className: 'cadastral-crosshair',
              html: `<span style="color: ${crosshairColor}; font-size: 11px; opacity: 0.75; font-weight: bold; pointer-events: none; transform: translate(-50%, -50%); display: block;">+</span>`,
              iconSize: [0, 0]
            });
            gridGroup.addLayer(L.marker([lineLat, lineLng], { icon: crosshairIcon, pane: 'cadastralGridPane', interactive: false }));
          }
        }
      }

      // Village Coordinate Datum Benchmark (0,0 Origin)
      const datumIcon = L.divIcon({
        className: 'cadastral-datum-marker',
        html: `
          <div style="
            display: flex;
            align-items: center;
            gap: 4px;
            background: ${isPlainStructure ? '#78350F' : datumColor};
            color: ${isPlainStructure ? '#FFF9EA' : '#1F2018'};
            border: 2px solid #FFFFFF;
            padding: 2.5px 8px;
            border-radius: 9999px;
            font-size: 9.5px;
            font-weight: 800;
            font-family: ui-monospace, SFMono-Regular, monospace;
            box-shadow: 0 3px 10px rgba(0,0,0,0.5);
            transform: translate(-50%, -50%);
            white-space: nowrap;
            letter-spacing: 0.3px;
          ">
            <span>✛</span>
            <span>Datum (0,0) Origin</span>
          </div>
        `,
        iconSize: [0, 0]
      });
      const datumMarker = L.marker([originLat, originLng], { icon: datumIcon, pane: 'cadastralGridPane' });
      datumMarker.bindTooltip(
        `<strong>${selectedPlot.village} Village Geodetic Datum (0,0)</strong><br/>
         Model Formation: <strong>${activeLayer.toUpperCase()}</strong><br/>
         Lat: ${originLat.toFixed(6)}°, Lng: ${originLng.toFixed(6)}°<br/>
         Grid Phase Step: ${effectiveStep}m`,
        { direction: 'top' }
      );
      gridGroup.addLayer(datumMarker);

      gridGroup.bringToFront();
    };

    renderFullFormationGrid();

    // Dynamically re-render whenever user pans, drags, or zooms the full map formation
    map.on('moveend', renderFullFormationGrid);
    map.on('zoomend', renderFullFormationGrid);

    return () => {
      map.off('moveend', renderFullFormationGrid);
      map.off('zoomend', renderFullFormationGrid);
    };
  }, [showGrid, gridInterval, isPlainStructure, activeLayer, plots, selectedPlot.village, selectedPlot.centroid.lat, selectedPlot.centroid.lng, useJsSdk]);

  // 6. Render Plain Structure Details: Boundary Corner Stones (मुनारा Pillars) & Triangulation Tie-Lines (कर्ण रेखा)
  useEffect(() => {
    if (!leafletMapRef.current || !plainStructureGroupRef.current || useJsSdk) return;

    const plainGroup = plainStructureGroupRef.current;
    plainGroup.clearLayers();

    if (!isPlainStructure) return;

    // Render Boundary Corner Stones (चांदा / मुनारा Pillars) at all vertices of selected plot
    if (selectedPlot.coordinates && selectedPlot.coordinates.length >= 3) {
      selectedPlot.coordinates.forEach((pt, idx) => {
        const pillarNum = idx + 1;
        const pillarIcon = L.divIcon({
          className: 'cadastral-corner-stone',
          html: `
            <div style="
              width: 14px;
              height: 14px;
              background: #8B4513;
              border: 2px solid #FFFDF7;
              border-radius: 50%;
              box-shadow: 0 1px 4px rgba(0,0,0,0.5);
              display: flex;
              align-items: center;
              justify-content: center;
              transform: translate(-50%, -50%);
              cursor: pointer;
            ">
              <span style="width: 4px; height: 4px; background: #FFF9EA; border-radius: 50%;"></span>
            </div>
          `,
          iconSize: [0, 0]
        });

        const stoneMarker = L.marker([pt.lat, pt.lng], { icon: pillarIcon });
        stoneMarker.bindPopup(`
          <div style="font-family: 'Plus Jakarta Sans', system-ui, sans-serif; font-size: 11px; padding: 4px; color: #33332A;">
            <div style="font-weight: bold; color: #8B4513; border-bottom: 1px solid #DCD7CE; padding-bottom: 3px; margin-bottom: 4px;">
              📍 Boundary Corner Stone (चांदा / सीमा मुनारा #${pillarNum})
            </div>
            <div><strong>Parcel:</strong> Khasra #${selectedPlot.khasra}</div>
            <div><strong>Vertex:</strong> V${pillarNum} of ${selectedPlot.coordinates.length}</div>
            <div style="font-family: monospace; font-size: 10px; color: #5A5A40; margin-top: 3px; background: #F5F3EE; padding: 2px 4px; border-radius: 4px;">
              ${pt.lat.toFixed(6)}°N, ${pt.lng.toFixed(6)}°E
            </div>
            <div style="font-size: 9px; color: #6B6B58; margin-top: 3px;">
              DILRMP Geodetic Boundary Benchmark
            </div>
          </div>
        `, { className: 'cadastral-custom-popup' });
        plainGroup.addLayer(stoneMarker);
      });

      // Triangulation Structural Tie-Lines (कर्ण रेखाएं - Internal Diagonals for Cadastral Survey)
      const coords = selectedPlot.coordinates;
      if (coords.length >= 4) {
        // Connect opposite corners: 0 to 2, and 1 to 3
        const tieLines = [
          { from: coords[0], to: coords[2], label: 'कर्ण D1 (Diagonal 1)' },
          coords.length > 3 ? { from: coords[1], to: coords[3], label: 'कर्ण D2 (Diagonal 2)' } : null
        ].filter(Boolean);

        tieLines.forEach((tl) => {
          if (!tl) return;
          const linePts: [number, number][] = [
            [tl.from.lat, tl.from.lng],
            [tl.to.lat, tl.to.lng]
          ];
          const diagonalPoly = L.polyline(linePts, {
            color: '#8B4513',
            weight: 1.5,
            opacity: 0.65,
            dashArray: '4, 6'
          });
          plainGroup.addLayer(diagonalPoly);

          // Diagonal distance label
          const distMeters = Math.round(calculateHaversineDistanceMeters(tl.from, tl.to) * 10) / 10;
          const midPt = calculateSegmentMidpoint(tl.from, tl.to);

          const diagLabelIcon = L.divIcon({
            className: 'cadastral-diagonal-badge',
            html: `
              <div style="
                background: rgba(255, 249, 234, 0.94);
                color: #8B4513;
                border: 1px solid #8B4513;
                font-family: monospace;
                font-size: 9px;
                font-weight: bold;
                padding: 1px 5px;
                border-radius: 4px;
                white-space: nowrap;
                transform: translate(-50%, -50%);
                box-shadow: 0 1px 3px rgba(0,0,0,0.25);
                pointer-events: none;
              ">
                ${tl.label}: ${distMeters}m
              </div>
            `,
            iconSize: [0, 0]
          });
          const diagMarker = L.marker([midPt.lat, midPt.lng], { icon: diagLabelIcon, interactive: false });
          plainGroup.addLayer(diagMarker);
        });
      }
    }

  }, [isPlainStructure, selectedPlot, useJsSdk]);

  // 7. Smooth pan or flyTo to selected plot centroid when changed
  useEffect(() => {
    if (!leafletMapRef.current || useJsSdk) return;
    const currentCenter = leafletMapRef.current.getCenter();
    const distance = Math.hypot(
      currentCenter.lat - selectedPlot.centroid.lat,
      currentCenter.lng - selectedPlot.centroid.lng
    );

    if (distance > 0.05) {
      // Distant village: smooth flyTo animation
      leafletMapRef.current.flyTo(
        [selectedPlot.centroid.lat, selectedPlot.centroid.lng],
        17,
        { duration: 1.2 }
      );
    } else {
      // Adjacent parcel in same village: gentle pan
      leafletMapRef.current.panTo(
        [selectedPlot.centroid.lat, selectedPlot.centroid.lng],
        { animate: true, duration: 0.6 }
      );
    }
  }, [selectedPlot.centroid.lat, selectedPlot.centroid.lng, useJsSdk]);

  // Zoom handlers
  const handleZoomIn = () => {
    if (leafletMapRef.current) leafletMapRef.current.zoomIn();
  };

  const handleZoomOut = () => {
    if (leafletMapRef.current) leafletMapRef.current.zoomOut();
  };

  const handleResetCenter = () => {
    if (leafletMapRef.current) {
      leafletMapRef.current.setView([selectedPlot.centroid.lat, selectedPlot.centroid.lng], 17);
    }
  };

  return (
    <div 
      className={`relative w-full rounded-xl overflow-hidden border border-[#DCD7CE] ${
        isPlainStructure ? 'bg-[#F9F7F2]' : 'bg-[#1F2018]'
      } shadow-sm transition-all duration-300 ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none h-screen' : (heightClass || 'h-[520px]')
      }`}
    >
      {/* Top Map Action Bar */}
      <div className="absolute top-3 left-3 right-3 z-400 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        {/* Full Map Formation Models Switcher (Full Satellite, Plain, Soil, Cadastral, Disputes) */}
        <div className="flex items-center gap-1 bg-[#26261A]/94 backdrop-blur-md p-1 rounded-lg border border-[#52523C] text-xs shadow-md pointer-events-auto">
          <button
            id="btn-formation-satellite"
            onClick={() => {
              if (onLayerChange) onLayerChange('satellite');
              setActiveTileType('google-hybrid');
              setInternalPlainStructure(false);
            }}
            className={`px-2.5 py-1 rounded font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeLayer === 'satellite'
                ? 'bg-[#E5C37A] text-[#26261A] shadow-2xs font-bold'
                : 'text-[#D7D2C5] hover:text-[#FFF9EA]'
            }`}
            title="Full Satellite Formation with luminous solar grid overlay"
          >
            <span>🛰️</span>
            <span>Full Satellite</span>
          </button>

          <button
            id="btn-formation-plain"
            onClick={() => {
              if (onLayerChange) onLayerChange('plain');
              setActiveTileType('plain-structure');
              setInternalPlainStructure(true);
            }}
            className={`px-2.5 py-1 rounded font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeLayer === 'plain'
                ? 'bg-[#8B4513] text-[#FFF9EA] shadow-2xs font-bold border border-[#A0522D]'
                : 'text-[#D7D2C5] hover:text-[#FFF9EA]'
            }`}
            title="Plain Drafting Ink Shajra Sheet (सादा भू-नक्शा)"
          >
            <LayoutGrid className="w-3 h-3 text-[#E5C37A]" />
            <span>Plain (सादा)</span>
          </button>

          <button
            id="btn-formation-soils"
            onClick={() => {
              if (onLayerChange) onLayerChange('soils');
              setActiveTileType('esri-satellite');
              setInternalPlainStructure(false);
            }}
            className={`px-2.5 py-1 rounded font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeLayer === 'soils'
                ? 'bg-[#00E5FF] text-[#083344] shadow-2xs font-bold'
                : 'text-[#D7D2C5] hover:text-[#FFF9EA]'
            }`}
            title="Soil Classification Model with neon cyan survey grid"
          >
            <span>🌾</span>
            <span>Soil Model</span>
          </button>

          <button
            id="btn-formation-cadastral"
            onClick={() => {
              if (onLayerChange) onLayerChange('cadastral');
              setActiveTileType('google-roadmap');
              setInternalPlainStructure(false);
            }}
            className={`px-2.5 py-1 rounded font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeLayer === 'cadastral'
                ? 'bg-[#F59E0B] text-[#291B0A] shadow-2xs font-bold'
                : 'text-[#D7D2C5] hover:text-[#FFF9EA]'
            }`}
            title="Cadastral Shajra Parcel Model with warm amber Zarib chain grid"
          >
            <span>📐</span>
            <span>Cadastral</span>
          </button>

          <button
            id="btn-formation-disputes"
            onClick={() => {
              if (onLayerChange) onLayerChange('disputes');
              setActiveTileType('google-hybrid');
              setInternalPlainStructure(false);
            }}
            className={`px-2.5 py-1 rounded font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeLayer === 'disputes'
                ? 'bg-[#EF4444] text-[#FFFFFF] shadow-2xs font-bold'
                : 'text-[#D7D2C5] hover:text-[#FFF9EA]'
            }`}
            title="Disputed Parcels & Injunction Model with hazard alert grid"
          >
            <span>⚠️</span>
            <span>Disputes</span>
          </button>
        </div>

        {/* Status Indicators & Control Buttons */}
        <div className="flex items-center gap-1.5 pointer-events-auto">
          {/* Toggle Full Formation Grid Phase Button & Interval Selector */}
          <div className="flex items-center bg-[#26261A]/90 rounded-lg border border-[#52523C] p-0.5 text-xs shadow-md">
            <button
              id="btn-toggle-survey-grid"
              onClick={handleToggleGrid}
              className={`px-2 py-1 rounded text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                showGrid
                  ? 'bg-natural-olive text-[#FFF9EA]'
                  : 'text-[#D7D2C5] hover:text-[#FFF9EA]'
              }`}
              title="Toggle Cadastral Metric Coordinate Grid Phase (भू-सर्वेक्षण ग्रिड) across Full Map Formations"
            >
              <Grid className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Grid Phase</span>
              <span className="text-[10px] font-mono px-1 py-0.2 rounded bg-black/30">
                {showGrid ? 'ON' : 'OFF'}
              </span>
            </button>
            {showGrid && (
              <select
                id="select-grid-interval"
                value={gridInterval}
                onChange={(e) => handleGridIntervalChange(Number(e.target.value))}
                aria-label="Survey Grid Phase Interval"
                className="text-[10px] font-mono bg-transparent text-[#E5C37A] font-bold border-l border-[#52523C] pl-1 pr-1.5 py-1 cursor-pointer focus:outline-hidden"
                title="Select metric grid interval spacing"
              >
                <option value={20} className="bg-[#26261A] text-[#FFF9EA]">20m (Zarib Chain)</option>
                <option value={25} className="bg-[#26261A] text-[#FFF9EA]">25m (Fine)</option>
                <option value={50} className="bg-[#26261A] text-[#FFF9EA]">50m (Parcel Mesh)</option>
                <option value={100} className="bg-[#26261A] text-[#FFF9EA]">100m (Revenue Block)</option>
                <option value={200} className="bg-[#26261A] text-[#FFF9EA]">200m (Macro Grid)</option>
              </select>
            )}
          </div>

          {/* Toggle Plain Structure Button */}
          <button
            id="btn-toggle-plain-structure"
            onClick={handleTogglePlainStructure}
            className={`px-2.5 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-md ${
              isPlainStructure
                ? 'bg-[#8B4513] text-[#FFF9EA] border-[#A0522D] font-bold'
                : 'bg-[#26261A]/90 text-[#D7D2C5] border-[#52523C] hover:text-[#FFF9EA]'
            }`}
            title="Toggle Plain Structure (Boundary Corner Pillars & Triangulation Lines)"
          >
            <Compass className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Plain Structure</span>
            <span className="text-[10px] font-mono px-1 py-0.2 rounded bg-black/20">
              {isPlainStructure ? 'ON' : 'OFF'}
            </span>
          </button>

          {/* Toggle Boundary Edge Dimensions Button */}
          <button
            id="btn-toggle-edge-dimensions"
            onClick={() => setShowDimensions(!showDimensions)}
            className={`px-2.5 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-md ${
              showDimensions
                ? 'bg-[#E5C37A] text-[#26261A] border-[#D4AC57] font-bold'
                : 'bg-[#26261A]/90 text-[#D7D2C5] border-[#52523C] hover:text-[#FFF9EA]'
            }`}
            title="Toggle on-map length and width dimension labels along plot edges"
          >
            <Ruler className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Edge Dimensions</span>
            <span className="text-[10px] font-mono px-1 py-0.2 rounded bg-black/20">
              {showDimensions ? 'ON' : 'OFF'}
            </span>
          </button>

          {/* Toggle Land Schedule HUD Overlay */}
          <button
            id="btn-toggle-schedule-hud"
            onClick={() => setIsScheduleDrawerOpen(!isScheduleDrawerOpen)}
            className={`px-2.5 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-md ${
              isScheduleDrawerOpen
                ? 'bg-[#5A5A40] text-[#FFF9EA] border-[#43432F]'
                : 'bg-[#26261A]/90 text-[#D7D2C5] border-[#52523C] hover:text-[#FFF9EA]'
            }`}
            title="Toggle floating Land Schedule (Length & Width) table"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Land Schedule</span>
          </button>

          <div className="bg-[#26261A]/90 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-[#52523C] text-xs text-[#EBE7DF] hidden xl:flex items-center gap-2 shadow-md">
            <span className={`w-2 h-2 rounded-full animate-pulse ${
              activeLayer === 'satellite' ? 'bg-amber-400' :
              activeLayer === 'plain' ? 'bg-[#E5C37A]' :
              activeLayer === 'soils' ? 'bg-[#00E5FF]' :
              activeLayer === 'cadastral' ? 'bg-orange-400' : 'bg-red-500'
            }`}></span>
            <span className="font-semibold natural-serif text-[#E5C37A]">
              {activeLayer === 'plain' 
                ? 'Plain Structure Shajra (सादा भू-नक्शा)'
                : activeLayer === 'soils'
                ? 'Soil Classification Formation'
                : activeLayer === 'cadastral'
                ? 'Cadastral Shajra Parcel Model'
                : activeLayer === 'disputes'
                ? 'Disputed Parcel & Litigation Model'
                : 'Full Satellite Formation'}
            </span>
            {showGrid && (
              <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${
                activeLayer === 'satellite' ? 'bg-amber-950/60 text-amber-300 border-amber-700/50' :
                activeLayer === 'plain' ? 'bg-[#FAF8F5] text-[#1F2018] border-[#78350F]' :
                activeLayer === 'soils' ? 'bg-cyan-950/60 text-cyan-300 border-cyan-700/50' :
                activeLayer === 'cadastral' ? 'bg-amber-950/60 text-amber-300 border-amber-700/50' :
                'bg-red-950/60 text-red-300 border-red-700/50'
              }`}>
                Grid Phase: {gridInterval}m
              </span>
            )}
            <span className="text-[10px] text-[#A3A390] font-mono">EPSG:4326</span>
          </div>

          <button
            id="btn-recenter-parcel"
            onClick={handleResetCenter}
            className="p-1.5 bg-[#26261A]/90 hover:bg-[#333322] text-[#D7D2C5] hover:text-[#FFF9EA] rounded-lg border border-[#52523C] shadow-md transition-colors cursor-pointer"
            title="Recenter Camera on Selected Parcel"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            id="btn-fullscreen-toggle"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 bg-[#26261A]/90 hover:bg-[#333322] text-[#D7D2C5] hover:text-[#FFF9EA] rounded-lg border border-[#52523C] shadow-md transition-colors cursor-pointer"
            title="Toggle Map Fullscreen"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Floating On-Map Land Schedule Dimensions HUD (Accessible to ALL roles) */}
      <div className="absolute top-14 left-3 z-400 max-w-[340px] sm:max-w-sm pointer-events-auto transition-all">
        {isScheduleDrawerOpen ? (
          <div className="bg-[#1F2018]/94 backdrop-blur-md rounded-xl border border-[#52523C] text-[#EBE7DF] p-3.5 shadow-2xl space-y-2.5">
            {/* HUD Header */}
            <div className="flex items-center justify-between gap-2 pb-2 border-b border-[#52523C]">
              <div className="flex items-center gap-1.5 min-w-0">
                <div className="p-1 rounded bg-[#E5C37A]/20 text-[#E5C37A] shrink-0">
                  <Ruler className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-xs text-[#FFF9EA] natural-serif truncate">
                      Land Schedule: Khasra #{selectedPlot.khasra}
                    </span>
                    <span className="text-[9px] bg-emerald-950/80 text-emerald-300 border border-emerald-700/50 px-1.5 py-0.2 rounded font-semibold whitespace-nowrap">
                      All Roles
                    </span>
                  </div>
                  <span className="text-[10px] text-[#A3A390] block truncate">
                    {selectedPlot.village} &bull; Khata #{selectedPlot.khata}
                  </span>
                </div>
              </div>
              <button
                id="btn-minimize-schedule-hud"
                onClick={() => setIsScheduleDrawerOpen(false)}
                className="text-[#A3A390] hover:text-[#FFF9EA] p-1 rounded hover:bg-[#333322] cursor-pointer"
                title="Collapse Land Schedule HUD"
              >
                <ChevronUp className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Unit Mode Selector */}
            <div className="flex items-center justify-between gap-2 text-[10px]">
              <span className="text-[#A3A390] font-semibold">Measurement Units:</span>
              <div className="flex items-center gap-1 bg-[#2D2E22] p-0.5 rounded border border-[#52523C]">
                {(['METRIC', 'IMPERIAL', 'TRADITIONAL'] as const).map((unit) => (
                  <button
                    key={unit}
                    id={`btn-unit-${unit.toLowerCase()}`}
                    onClick={() => setUnitMode(unit)}
                    className={`px-1.5 py-0.5 rounded text-[9px] font-semibold transition-colors cursor-pointer ${
                      unitMode === unit
                        ? 'bg-[#E5C37A] text-[#1F2018] font-bold'
                        : 'text-[#C2BFB4] hover:text-[#FFF9EA]'
                    }`}
                  >
                    {unit === 'METRIC' ? 'Meters (m)' : unit === 'IMPERIAL' ? 'Feet (ft)' : 'Gatta/Jarib'}
                  </button>
                ))}
              </div>
            </div>

            {/* Primary Highlight: Length & Width Dimensions */}
            <div className="grid grid-cols-2 gap-2">
              {/* Length Card */}
              <div className="p-2.5 rounded-lg bg-[#28291F] border border-[#52523C]">
                <div className="flex items-center justify-between text-[10px] text-[#E5C37A] font-bold uppercase tracking-wider mb-0.5">
                  <span>Length (लंबाई)</span>
                  <span className="font-mono text-[9px] text-[#A3A390]">N ↔ S</span>
                </div>
                <div className="text-sm font-mono font-bold text-[#FFF9EA]">
                  {unitMode === 'METRIC' && `${selectedDimensions.lengthMeters} m`}
                  {unitMode === 'IMPERIAL' && `${selectedDimensions.lengthFeet} ft`}
                  {unitMode === 'TRADITIONAL' && `${selectedDimensions.lengthGatta} Gatta`}
                </div>
                <div className="text-[9px] text-[#A3A390] mt-0.5">
                  N: {unitMode === 'METRIC' ? `${selectedDimensions.northEdgeMeters}m` : `${selectedDimensions.northEdgeFeet}ft`} &bull; 
                  S: {unitMode === 'METRIC' ? `${selectedDimensions.southEdgeMeters}m` : `${selectedDimensions.southEdgeFeet}ft`}
                </div>
              </div>

              {/* Width Card */}
              <div className="p-2.5 rounded-lg bg-[#28291F] border border-[#52523C]">
                <div className="flex items-center justify-between text-[10px] text-[#E5C37A] font-bold uppercase tracking-wider mb-0.5">
                  <span>Width (चौड़ाई)</span>
                  <span className="font-mono text-[9px] text-[#A3A390]">E ↔ W</span>
                </div>
                <div className="text-sm font-mono font-bold text-[#FFF9EA]">
                  {unitMode === 'METRIC' && `${selectedDimensions.widthMeters} m`}
                  {unitMode === 'IMPERIAL' && `${selectedDimensions.widthFeet} ft`}
                  {unitMode === 'TRADITIONAL' && `${selectedDimensions.widthGatta} Gatta`}
                </div>
                <div className="text-[9px] text-[#A3A390] mt-0.5">
                  E: {unitMode === 'METRIC' ? `${selectedDimensions.eastEdgeMeters}m` : `${selectedDimensions.eastEdgeFeet}ft`} &bull; 
                  W: {unitMode === 'METRIC' ? `${selectedDimensions.westEdgeMeters}m` : `${selectedDimensions.westEdgeFeet}ft`}
                </div>
              </div>
            </div>

            {/* Composite Dimensions, Perimeter, & Area Breakdown */}
            <div className="p-2 rounded-lg bg-[#28291F]/70 border border-[#52523C]/60 text-[10px] space-y-1 font-mono">
              <div className="flex items-center justify-between">
                <span className="text-[#A3A390]">Schedule (L × W):</span>
                <strong className="text-[#E5C37A]">
                  {unitMode === 'METRIC' && selectedDimensions.dimensionsMetric}
                  {unitMode === 'IMPERIAL' && selectedDimensions.dimensionsImperial}
                  {unitMode === 'TRADITIONAL' && selectedDimensions.dimensionsTraditional}
                </strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#A3A390]">Perimeter (घेरा):</span>
                <span className="text-[#FFF9EA]">
                  {unitMode === 'METRIC' && `${selectedDimensions.perimeterMeters} m`}
                  {unitMode === 'IMPERIAL' && `${selectedDimensions.perimeterFeet} ft`}
                  {unitMode === 'TRADITIONAL' && `${selectedDimensions.perimeterGatta} Gatta`}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#A3A390]">Cadastral Area:</span>
                <span className="text-[#FFF9EA]">{selectedPlot.areaHa} Ha ({selectedPlot.areaSqM.toLocaleString()} sq.m)</span>
              </div>
            </div>

            {/* Four-Direction Cardinal Schedule Table (Chauhaddi) */}
            <div className="space-y-1 text-[10px]">
              <span className="text-[#A3A390] font-bold uppercase tracking-wider block text-[9px]">
                Cardinal Edge Dimensions (चौहद्दी व नाप)
              </span>
              <div className="grid grid-cols-2 gap-1 text-[9px]">
                <div className="p-1.5 rounded bg-[#2D2E22] border border-[#52523C]">
                  <span className="text-[#E5C37A] font-bold block">North (उत्तर)</span>
                  <span className="font-mono font-semibold text-[#FFF9EA]">
                    {unitMode === 'METRIC' ? `${selectedDimensions.northEdgeMeters} m` : `${selectedDimensions.northEdgeFeet} ft`}
                  </span>
                  <span className="text-[#A3A390] block truncate">{selectedPlot.boundaries?.north || 'Adjacent Field'}</span>
                </div>
                <div className="p-1.5 rounded bg-[#2D2E22] border border-[#52523C]">
                  <span className="text-[#E5C37A] font-bold block">East (पूर्व)</span>
                  <span className="font-mono font-semibold text-[#FFF9EA]">
                    {unitMode === 'METRIC' ? `${selectedDimensions.eastEdgeMeters} m` : `${selectedDimensions.eastEdgeFeet} ft`}
                  </span>
                  <span className="text-[#A3A390] block truncate">{selectedPlot.boundaries?.east || 'Adjacent Field'}</span>
                </div>
                <div className="p-1.5 rounded bg-[#2D2E22] border border-[#52523C]">
                  <span className="text-[#E5C37A] font-bold block">South (दक्षिण)</span>
                  <span className="font-mono font-semibold text-[#FFF9EA]">
                    {unitMode === 'METRIC' ? `${selectedDimensions.southEdgeMeters} m` : `${selectedDimensions.southEdgeFeet} ft`}
                  </span>
                  <span className="text-[#A3A390] block truncate">{selectedPlot.boundaries?.south || 'Adjacent Field'}</span>
                </div>
                <div className="p-1.5 rounded bg-[#2D2E22] border border-[#52523C]">
                  <span className="text-[#E5C37A] font-bold block">West (पश्चिम)</span>
                  <span className="font-mono font-semibold text-[#FFF9EA]">
                    {unitMode === 'METRIC' ? `${selectedDimensions.westEdgeMeters} m` : `${selectedDimensions.westEdgeFeet} ft`}
                  </span>
                  <span className="text-[#A3A390] block truncate">{selectedPlot.boundaries?.west || 'Adjacent Field'}</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <button
            id="btn-expand-schedule-hud"
            onClick={() => setIsScheduleDrawerOpen(true)}
            className="bg-[#1F2018]/94 hover:bg-[#28291F] backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#52523C] text-xs text-[#FFF9EA] shadow-xl flex items-center gap-2 cursor-pointer transition-all"
          >
            <Ruler className="w-3.5 h-3.5 text-[#E5C37A]" />
            <span className="font-bold natural-serif">Land Schedule:</span>
            <span className="font-mono text-[#E5C37A] font-semibold">{selectedDimensions.dimensionsMetric}</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#A3A390]" />
          </button>
        )}
      </div>


      {/* Floating Zoom Controls (Top Right) */}
      <div className="absolute top-16 right-3 z-400 flex flex-col gap-1.5 pointer-events-auto">
        <button
          id="btn-map-zoom-in"
          onClick={handleZoomIn}
          className="p-2 bg-[#26261A]/90 hover:bg-[#333322] text-[#FFF9EA] rounded-lg border border-[#52523C] shadow-md transition-colors cursor-pointer"
          title="Zoom In"
        >
          <Plus className="w-4 h-4" />
        </button>
        <button
          id="btn-map-zoom-out"
          onClick={handleZoomOut}
          className="p-2 bg-[#26261A]/90 hover:bg-[#333322] text-[#FFF9EA] rounded-lg border border-[#52523C] shadow-md transition-colors cursor-pointer"
          title="Zoom Out"
        >
          <Minus className="w-4 h-4" />
        </button>
      </div>

      {/* Live Leaflet Map Container */}
      <div 
        ref={mapContainerRef} 
        id="cadastral-satellite-leaflet-canvas"
        className="w-full h-full cursor-grab active:cursor-grabbing"
      />

      {/* Bottom Left: Cadastral Shajra Opacity Slider */}
      <div className="absolute bottom-3 left-3 z-400 bg-[#26261A]/92 backdrop-blur-md p-3 rounded-xl border border-[#52523C] text-xs text-[#EBE7DF] shadow-lg max-w-sm space-y-2">
        <div className="flex items-center justify-between gap-4">
          <span className="font-bold text-[#E5C37A] natural-serif flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-[#E5C37A]" />
            Aks Shajra Cadastral Opacity
          </span>
          <span className="font-mono text-[#FFF9EA] font-semibold">{cadastralOpacity}%</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] text-[#A3A390]">Satellite</span>
          <input
            id="range-cadastral-opacity"
            type="range"
            min="0"
            max="100"
            value={cadastralOpacity}
            onChange={(e) => onOpacityChange(Number(e.target.value))}
            aria-label="Adjust cadastral boundary overlay opacity"
            className="w-44 h-1.5 bg-[#43432F] rounded-lg appearance-none cursor-pointer accent-[#E5C37A]"
          />
          <span className="text-[10px] text-[#A3A390]">Boundary</span>
        </div>

        <div className="flex items-center justify-between pt-1 border-t border-[#43432F] text-[10px]">
          <span className="text-[#D7D2C5]">
            Village: <strong className="text-[#FFF9EA]">{selectedPlot.village}</strong> ({selectedPlot.district})
          </span>
          <span className="font-mono text-[#E5C37A]">
            {cursorCoords 
              ? `${cursorCoords.lat.toFixed(5)}°N, ${cursorCoords.lng.toFixed(5)}°E` 
              : `${selectedPlot.centroid.lat.toFixed(5)}°N, ${selectedPlot.centroid.lng.toFixed(5)}°E`}
          </span>
        </div>
      </div>

      {/* Bottom Right: Quick Status Legend & Attribution */}
      <div className="absolute bottom-3 right-3 z-400 bg-[#26261A]/92 backdrop-blur-md p-2.5 rounded-xl border border-[#52523C] text-[10px] text-[#EBE7DF] shadow-lg space-y-1.5 min-w-[200px]">
        <div className="flex items-center justify-between pb-1 border-b border-[#43432F] text-[9.5px]">
          <span className="font-bold text-[#E5C37A] uppercase tracking-wider">Formation Model:</span>
          <span className="font-mono text-[#FFF9EA] font-semibold uppercase">{activeLayer}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded bg-[#E5C37A] border border-white"></span>
          <span>Selected Parcel (#{selectedPlot.khasra})</span>
        </div>

        {activeLayer === 'disputes' ? (
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-[#EF4444] border border-[#FCA5A5] animate-pulse"></span>
            <span>Court Injunction / Stay Corridor</span>
          </div>
        ) : activeLayer === 'soils' ? (
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-[#10B981] border border-[#6EE7B7]"></span>
            <span>Soil Type: Alluvial Loam (दोमट)</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-[#8B0000] border border-[#FF4444]"></span>
            <span>Litigation Stay Order</span>
          </div>
        )}

        <div className="flex items-center gap-2">
          <span className="w-3 h-1 bg-[#4DA2DB] rounded"></span>
          <span>Rajbaha Canal Network</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-1 border-t border-dashed border-[#E5C37A]"></span>
          <span>PWD / Chak Marg Road</span>
        </div>

        {showGrid && (
          <div className="flex items-center justify-between pt-1 border-t border-[#43432F]">
            <div className="flex items-center gap-2">
              <span className={`w-3 h-1 border-t border-dashed ${
                activeLayer === 'satellite' ? 'border-[#FFD700]' :
                activeLayer === 'plain' ? 'border-[#3B3A2C]' :
                activeLayer === 'soils' ? 'border-[#00E5FF]' :
                activeLayer === 'cadastral' ? 'border-[#F59E0B]' :
                'border-[#EF4444]'
              }`}></span>
              <span>Grid Phase ({gridInterval}m)</span>
            </div>
            <span className="text-[9px] font-mono text-emerald-400">ACTIVE</span>
          </div>
        )}

        <div className="flex items-center gap-2">
          <span className="text-[10px] text-amber-400 font-bold">✛</span>
          <span>Geodetic Datum (0,0) Origin</span>
        </div>

        {isPlainStructure && (
          <>
            <div className="flex items-center gap-2 pt-1 border-t border-[#43432F]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#8B4513] border border-white"></span>
              <span>Boundary Stones (चांदा मुनारा)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-1 border-t border-dashed border-[#8B4513]"></span>
              <span>Triangulation (कर्ण रेखा)</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
