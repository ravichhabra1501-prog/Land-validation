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
  ShieldAlert
} from 'lucide-react';
import { CadastralPlot, VILLAGE_CENTERS, VILLAGE_INFRASTRUCTURE } from '../data/cadastralPlotsData';

interface CadastralGoogleMapViewProps {
  plots: CadastralPlot[];
  selectedPlot: CadastralPlot;
  onSelectPlot: (plot: CadastralPlot) => void;
  activeLayer: 'cadastral' | 'satellite' | 'soils' | 'disputes';
  cadastralOpacity: number;
  onOpacityChange: (opacity: number) => void;
  showRoads: boolean;
  showWaterbodies: boolean;
  showLabels: boolean;
  onToggleLabels: () => void;
  heightClass?: string;
}

type MapLayerType = 'google-hybrid' | 'google-satellite' | 'esri-satellite' | 'google-roadmap';

export const CadastralGoogleMapView: React.FC<CadastralGoogleMapViewProps> = ({
  plots,
  selectedPlot,
  onSelectPlot,
  activeLayer,
  cadastralOpacity,
  onOpacityChange,
  showRoads,
  showWaterbodies,
  showLabels,
  onToggleLabels,
  heightClass
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const polygonsGroupRef = useRef<L.FeatureGroup | null>(null);
  const infrastructureGroupRef = useRef<L.FeatureGroup | null>(null);
  const markersGroupRef = useRef<L.FeatureGroup | null>(null);

  const [activeTileType, setActiveTileType] = useState<MapLayerType>('google-hybrid');
  const [cursorCoords, setCursorCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [useJsSdk, setUseJsSdk] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

  // Tile layer URLs
  const getTileUrl = (type: MapLayerType) => {
    switch (type) {
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

    // Add initial Satellite Tile Layer
    const tileLayer = L.tileLayer(getTileUrl(activeTileType), {
      maxZoom: 21,
      maxNativeZoom: 19,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    }).addTo(map);

    tileLayerRef.current = tileLayer;

    // Create layer groups for vectors
    const polyGroup = L.featureGroup().addTo(map);
    const infraGroup = L.featureGroup().addTo(map);
    const markGroup = L.featureGroup().addTo(map);

    polygonsGroupRef.current = polyGroup;
    infrastructureGroupRef.current = infraGroup;
    markersGroupRef.current = markGroup;

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
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    }).addTo(leafletMapRef.current);

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
      const opacity = cadastralOpacity / 100;

      let fillColor = '#5A5A40';
      let strokeColor = '#E5C37A';

      if (activeLayer === 'disputes') {
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

      const polygon = L.polygon(latLngs, {
        color: isSelected ? '#FFFFFF' : strokeColor,
        weight: isSelected ? 3.5 : 2,
        fillColor: fillColor,
        fillOpacity: isSelected 
          ? Math.min(opacity * 0.85 + 0.15, 0.85) 
          : opacity * 0.5,
        dashArray: isDisputed ? '4, 4' : undefined
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
      const statusBadge = plot.status === 'CLEAN' 
        ? '<span style="background: #EAF2EB; color: #3D5A40; padding: 2px 6px; border-radius: 4px; font-weight: bold; font-size: 10px;">Clean Title</span>'
        : '<span style="background: #FDF0ED; color: #8B0000; padding: 2px 6px; border-radius: 4px; font-weight: bold; font-size: 10px;">⚠️ Active Litigation</span>';

      const popupContent = `
        <div style="font-family: 'Plus Jakarta Sans', system-ui, sans-serif; font-size: 12px; line-height: 1.4; color: #33332A; min-width: 220px; padding: 4px;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #DCD7CE; padding-bottom: 6px; margin-bottom: 6px;">
            <strong style="font-size: 13px; color: #5A5A40; font-family: Georgia, serif;">Khasra / Gat #${plot.khasra}</strong>
            ${statusBadge}
          </div>
          <div><strong>Owner:</strong> ${plot.owner}</div>
          <div style="font-size: 11px; color: #6B6B58; margin-bottom: 4px;">${plot.parentage}</div>
          <div><strong>Area:</strong> ${plot.areaHa} Ha (${plot.areaSqM.toLocaleString()} sq.m)</div>
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
              background: ${isSelected ? '#E5C37A' : 'rgba(38, 38, 26, 0.88)'};
              color: ${isSelected ? '#26261A' : '#FFF9EA'};
              border: 1.5px solid ${isSelected ? '#FFFFFF' : '#707052'};
              padding: 2px 7px;
              border-radius: 6px;
              font-size: 10px;
              font-weight: bold;
              white-space: nowrap;
              text-align: center;
              box-shadow: 0 2px 6px rgba(0,0,0,0.35);
              cursor: pointer;
              transform: translate(-50%, -50%);
            ">
              <span>${plot.khasra}</span>
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

  }, [plots, selectedPlot, activeLayer, cadastralOpacity, showLabels, useJsSdk]);

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

  // 5. Smooth pan or flyTo to selected plot centroid when changed
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
      className={`relative w-full rounded-xl overflow-hidden border border-[#DCD7CE] bg-[#1F2018] shadow-sm transition-all duration-300 ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none h-screen' : (heightClass || 'h-[520px]')
      }`}
    >
      {/* Top Map Action Bar */}
      <div className="absolute top-3 left-3 right-3 z-400 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        {/* Layer Type Switcher */}
        <div className="flex items-center gap-1 bg-[#26261A]/90 backdrop-blur-md p-1 rounded-lg border border-[#52523C] text-xs shadow-md pointer-events-auto">
          <button
            id="btn-layer-google-hybrid"
            onClick={() => setActiveTileType('google-hybrid')}
            className={`px-2.5 py-1 rounded font-semibold transition-colors cursor-pointer ${
              activeTileType === 'google-hybrid'
                ? 'bg-natural-olive text-[#FFF9EA] shadow-2xs'
                : 'text-[#D7D2C5] hover:text-[#FFF9EA]'
            }`}
          >
            Google Hybrid
          </button>
          <button
            id="btn-layer-google-satellite"
            onClick={() => setActiveTileType('google-satellite')}
            className={`px-2.5 py-1 rounded font-semibold transition-colors cursor-pointer ${
              activeTileType === 'google-satellite'
                ? 'bg-natural-olive text-[#FFF9EA] shadow-2xs'
                : 'text-[#D7D2C5] hover:text-[#FFF9EA]'
            }`}
          >
            Pure Satellite
          </button>
          <button
            id="btn-layer-esri"
            onClick={() => setActiveTileType('esri-satellite')}
            className={`px-2.5 py-1 rounded font-semibold transition-colors cursor-pointer ${
              activeTileType === 'esri-satellite'
                ? 'bg-natural-olive text-[#FFF9EA] shadow-2xs'
                : 'text-[#D7D2C5] hover:text-[#FFF9EA]'
            }`}
          >
            Esri Aerial
          </button>
          <button
            id="btn-layer-roadmap"
            onClick={() => setActiveTileType('google-roadmap')}
            className={`px-2.5 py-1 rounded font-semibold transition-colors cursor-pointer ${
              activeTileType === 'google-roadmap'
                ? 'bg-natural-olive text-[#FFF9EA] shadow-2xs'
                : 'text-[#D7D2C5] hover:text-[#FFF9EA]'
            }`}
          >
            Roadmap
          </button>
        </div>

        {/* Status Indicators & Control Buttons */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <div className="bg-[#26261A]/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#52523C] text-xs text-[#EBE7DF] flex items-center gap-2 shadow-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-semibold natural-serif text-[#E5C37A]">
              {activeTileType === 'esri-satellite' ? 'Esri World Imagery' : 'Google Maps Satellite'}
            </span>
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
      <div className="absolute bottom-3 right-3 z-400 bg-[#26261A]/92 backdrop-blur-md p-2.5 rounded-xl border border-[#52523C] text-[10px] text-[#EBE7DF] shadow-lg space-y-1.5">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded bg-[#E5C37A] border border-white"></span>
          <span>Selected Parcel (#{selectedPlot.khasra})</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded bg-[#8B0000] border border-[#FF4444]"></span>
          <span>Litigation Stay Order</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-1 bg-[#4DA2DB] rounded"></span>
          <span>Rajbaha Canal Network</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-1 border-t border-dashed border-[#E5C37A]"></span>
          <span>PWD / Chak Marg Road</span>
        </div>
      </div>
    </div>
  );
};
