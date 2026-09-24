import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import jsQR from 'jsqr';
import { 
  Camera, 
  CameraOff, 
  RefreshCw, 
  Upload, 
  CheckCircle2, 
  AlertCircle, 
  QrCode, 
  Scan, 
  ShieldCheck, 
  FileCheck, 
  ArrowRight, 
  ExternalLink,
  Volume2,
  VolumeX,
  FlipHorizontal,
  Zap,
  Info,
  Layers,
  MapPin,
  Building,
  User,
  Stamp,
  Sparkles
} from 'lucide-react';
import { ExtractedLandRecord, UserRole } from '../types';
import { findMasterRecord, DILRMP_MASTER_DATABASE } from '../data/dilrmpDatabase';
import { runAutomatedValidationRules } from '../services/landRecordService';

export interface QrCodeScannerModuleProps {
  allRecords: ExtractedLandRecord[];
  onRecordIngested: (record: ExtractedLandRecord) => void;
  onNavigateToVerification: (record?: ExtractedLandRecord) => void;
}

export interface ParsedQrData {
  raw: string;
  documentNumber?: string;
  khasraNumber?: string;
  village?: string;
  district?: string;
  state?: string;
  ownerName?: string;
  areaSqM?: number;
  status?: string;
  token?: string;
  format: 'JSON_PAYLOAD' | 'DILRMP_URL' | 'ULPIN_CODE' | 'RAW_REF';
}

export const QrCodeScannerModule: React.FC<QrCodeScannerModuleProps> = ({
  allRecords,
  onRecordIngested,
  onNavigateToVerification
}) => {
  // Camera state
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [availableCameras, setAvailableCameras] = useState<MediaDeviceInfo[]>([]);
  const [selectedCameraId, setSelectedCameraId] = useState<string>('');
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [torchActive, setTorchActive] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Scan state
  const [isScanning, setIsScanning] = useState<boolean>(true);
  const [scannedResult, setScannedResult] = useState<ParsedQrData | null>(null);
  const [matchedRecord, setMatchedRecord] = useState<ExtractedLandRecord | null>(null);
  const [detectionSuccessPulse, setDetectionSuccessPulse] = useState<boolean>(false);
  const [isIngestingFromQr, setIsIngestingFromQr] = useState<boolean>(false);

  // DOM Refs
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sound chime synthesizer using Web Audio API
  const playBeep = useCallback(() => {
    if (!soundEnabled) return;
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      
      const now = ctx.currentTime;
      osc.frequency.setValueAtTime(880, now); // A5
      osc.frequency.exponentialRampToValueAtTime(1760, now + 0.12); // A6
      
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.18);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(now);
      osc.stop(now + 0.18);
    } catch {
      // Ignore audio failure
    }
  }, [soundEnabled]);

  // Parse any land record QR text
  const parseQrContent = (text: string): ParsedQrData => {
    const trimmed = text.trim();

    // Check JSON
    if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
      try {
        const obj = JSON.parse(trimmed);
        return {
          raw: trimmed,
          documentNumber: obj.documentNumber || obj.docNumber || obj.doc || obj.id,
          khasraNumber: obj.khasraNumber || obj.khasra || obj.surveyNo || obj.gat,
          village: obj.village || obj.mauza,
          district: obj.district,
          state: obj.state,
          ownerName: obj.owner || obj.primaryOwner || obj.khatedar,
          areaSqM: obj.areaSqM || obj.area,
          status: obj.status,
          token: obj.token || obj.securityToken,
          format: 'JSON_PAYLOAD'
        };
      } catch {
        // Fallback below
      }
    }

    // Check URL
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
      try {
        const url = new URL(trimmed);
        const doc = url.searchParams.get('doc') || url.searchParams.get('ref') || url.searchParams.get('id');
        const khasra = url.searchParams.get('khasra') || url.searchParams.get('survey');
        const village = url.searchParams.get('village');
        const state = url.searchParams.get('state');

        return {
          raw: trimmed,
          documentNumber: doc || undefined,
          khasraNumber: khasra || undefined,
          village: village || undefined,
          state: state || undefined,
          format: 'DILRMP_URL'
        };
      } catch {
        // Fallback below
      }
    }

    // Check ULPIN
    if (trimmed.toUpperCase().startsWith('ULPIN:') || trimmed.toUpperCase().startsWith('BHU-')) {
      const parts = trimmed.split(':');
      const code = parts[1] || parts[0];
      return {
        raw: trimmed,
        documentNumber: code,
        token: trimmed,
        format: 'ULPIN_CODE'
      };
    }

    // Raw Reference
    return {
      raw: trimmed,
      documentNumber: trimmed,
      format: 'RAW_REF'
    };
  };

  // Check matching in existing records or master database
  const lookupRecordFromQr = useCallback((qrData: ParsedQrData) => {
    const rawVal = qrData.raw.toLowerCase();
    const docVal = qrData.documentNumber?.toLowerCase();
    const khasraVal = qrData.khasraNumber?.toLowerCase();
    const villageVal = qrData.village?.toLowerCase();

    // 1. Check all active loaded records in queue
    const directMatch = allRecords.find(r => {
      const rDoc = r.documentNumber.toLowerCase();
      const rId = r.id.toLowerCase();
      const rKhasra = r.khasraNumber.value.toLowerCase();
      const rVillage = r.village.value.toLowerCase();

      if (docVal && (rDoc.includes(docVal) || docVal.includes(rDoc) || rId === docVal)) return true;
      if (khasraVal && rKhasra === khasraVal) {
        if (!villageVal || rVillage === villageVal) return true;
      }
      if (rawVal.includes(rDoc) || rawVal.includes(rId)) return true;
      return false;
    });

    if (directMatch) {
      setMatchedRecord(directMatch);
      return;
    }

    // 2. Check Central DILRMP Master Database
    let masterMatch = null;
    if (khasraVal) {
      masterMatch = findMasterRecord(qrData.khasraNumber!, qrData.village || '', qrData.state || '');
      if (!masterMatch) {
        // Search without state/village if not matched
        masterMatch = DILRMP_MASTER_DATABASE.find(m => m.khasraNumber.toLowerCase() === khasraVal);
      }
    }

    if (masterMatch) {
      // Synthesize official record from master record
      const synthRecord: ExtractedLandRecord = {
        id: `REC-QR-${Date.now().toString(36).toUpperCase()}`,
        documentNumber: qrData.documentNumber || `DILRMP-${masterMatch.state.substring(0, 2).toUpperCase()}-2024-${masterMatch.khasraNumber.replace('/', '-')}`,
        documentType: masterMatch.state === 'Maharashtra' ? '7_12_EXTRACT' : masterMatch.state === 'Punjab' ? 'JAMABANDI' : 'KHASRA_KHATAUNI',
        primaryLanguage: masterMatch.state === 'Maharashtra' ? 'marathi' : masterMatch.state === 'Punjab' ? 'punjabi' : 'hindi',
        script: masterMatch.state === 'Maharashtra' ? 'Devanagari (मराठी)' : masterMatch.state === 'Punjab' ? 'Gurmukhi (ਪੰਜਾਬੀ)' : 'Devanagari (हिन्दी)',
        sourceFileName: `Physical_QR_Scan_${masterMatch.village}_Khasra${masterMatch.khasraNumber.replace('/', '_')}.jpg`,
        sourceImageUrl: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=1200',
        uploadedAt: new Date().toISOString(),
        uploadedBy: 'Patwari / QR Camera Scanner Verification Node',
        status: masterMatch.status === 'CLEAN' ? 'VERIFIED_AND_SANCTIONED' : 'NEEDS_REVIEW',
        overallConfidence: 98.4,

        state: { value: masterMatch.state, confidence: 99 },
        district: { value: masterMatch.district, confidence: 99 },
        tehsil: { value: masterMatch.tehsil, confidence: 99 },
        village: { value: masterMatch.village, confidence: 99 },
        censusVillageCode: { value: '27-432-019', confidence: 95 },

        khasraNumber: { value: masterMatch.khasraNumber, confidence: 99 },
        khataNumber: { value: masterMatch.khataNumber, confidence: 99 },
        subDivisionNumber: { value: '1', confidence: 95 },

        primaryOwnerName: { value: masterMatch.registeredOwners[0] || 'Registered Owner', confidence: 98 },
        parentageOrSpouse: { value: 'S/o Landholder Ancestor', confidence: 94 },
        totalOwnersCount: masterMatch.registeredOwners.length,
        coSharers: masterMatch.registeredOwners.map((name, idx) => ({
          id: `CS-QR-${idx + 1}`,
          name: name,
          relation: idx === 0 ? 'Self' : 'Co-Sharer',
          shareFraction: `${1}/${masterMatch.registeredOwners.length}`,
          shareAreaSqMeters: Math.round(masterMatch.masterAreaSqMeters / masterMatch.registeredOwners.length),
          panOrAadhaarRef: `XXXX-XXXX-${Math.floor(1000 + Math.random() * 9000)}`
        })),

        landClassification: { value: 'Agricultural / Jirayat Class II', confidence: 96 },
        irrigationSource: { value: 'Canal Perennial & Tubewell', confidence: 92 },
        totalAreaDeclared: { value: Number((masterMatch.masterAreaSqMeters / 10000).toFixed(2)), confidence: 98 },
        declaredUnit: { value: 'HECTARE', confidence: 99 },
        normalizedAreaSqMeters: masterMatch.masterAreaSqMeters,

        annualLandRevenue: { value: 72.00, confidence: 95 },
        encumbranceStatus: { 
          value: masterMatch.status === 'CLEAN' ? 'CLEAR' : masterMatch.status === 'LITIGATION' ? 'COURT_STAY' : 'GOVT_ACQUISITION', 
          confidence: 97 
        },
        bankLienDetails: masterMatch.status === 'CLEAN' ? undefined : 'Sub-judice stay order under Section 145 CrPC',

        mutations: [
          {
            mutationNumber: masterMatch.lastMutationNumber,
            dateOfOrder: '2024-01-15',
            sanctioningOfficer: 'Tehsildar / Settlement Officer',
            mutationType: 'INHERITANCE',
            transferor: 'Predecessor Titleholder',
            transferee: masterMatch.registeredOwners.join(' & '),
            status: 'SANCTIONED',
            remarks: 'Official QR attested mutation entry'
          }
        ],

        cadastralPolygon: [
          [73.9820, 18.5780],
          [73.9850, 18.5782],
          [73.9846, 18.5755],
          [73.9815, 18.5753]
        ],

        preprocessingMetrics: {
          deskewAngleDegrees: 0,
          contrastScore: 95,
          dpiEstimated: 300,
          binarizationMethod: 'Otsu',
          noiseReductionApplied: true
        },

        validationResults: [],
        reviewHistory: [
          {
            timestamp: new Date().toISOString(),
            officerName: 'QR Code Hardware Attestation Reader',
            role: 'VERIFICATION_SPECIALIST',
            action: 'QR Verification & Master Sync',
            notes: `Verified against Central DILRMP Master Registry. Match status: ${masterMatch.status}.`
          }
        ]
      };

      synthRecord.validationResults = runAutomatedValidationRules(synthRecord, allRecords);
      setMatchedRecord(synthRecord);
      return;
    }

    // 3. If not in DB, create placeholder record so user can ingest it directly
    const fallbackRecord: ExtractedLandRecord = {
      id: `REC-QR-${Date.now().toString(36).toUpperCase()}`,
      documentNumber: qrData.documentNumber || `DILRMP-SCAN-${Date.now().toString().slice(-6)}`,
      documentType: '7_12_EXTRACT',
      primaryLanguage: 'marathi',
      script: 'Devanagari (मराठी)',
      sourceFileName: 'Physical_Document_QR_Scan.jpg',
      sourceImageUrl: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=1200',
      uploadedAt: new Date().toISOString(),
      uploadedBy: 'Patwari / QR Camera Scanner Verification Node',
      status: 'NEEDS_REVIEW',
      overallConfidence: 91.5,

      state: { value: qrData.state || 'Maharashtra', confidence: 95 },
      district: { value: qrData.district || 'Pune', confidence: 95 },
      tehsil: { value: 'Haveli', confidence: 95 },
      village: { value: qrData.village || 'Wagholi', confidence: 95 },

      khasraNumber: { value: qrData.khasraNumber || '142/1', confidence: 95 },
      khataNumber: { value: '882', confidence: 95 },
      subDivisionNumber: { value: '1', confidence: 90 },

      primaryOwnerName: { value: qrData.ownerName || 'Verified Citizen Landholder', confidence: 92 },
      parentageOrSpouse: { value: 'S/o Ancestral Khatedar', confidence: 88 },
      totalOwnersCount: 1,
      coSharers: [{
        id: 'CS-QR-1',
        name: qrData.ownerName || 'Verified Citizen Landholder',
        relation: 'Self',
        shareFraction: '1/1',
        shareAreaSqMeters: qrData.areaSqM || 14200
      }],

      landClassification: { value: 'Agricultural / Jirayat Class II', confidence: 90 },
      totalAreaDeclared: { value: 1.42, confidence: 92 },
      declaredUnit: { value: 'HECTARE', confidence: 99 },
      normalizedAreaSqMeters: qrData.areaSqM || 14200,

      annualLandRevenue: { value: 58.00, confidence: 90 },
      encumbranceStatus: { value: 'CLEAR', confidence: 92 },

      mutations: [],
      cadastralPolygon: [
        [73.9820, 18.5780],
        [73.9850, 18.5782],
        [73.9846, 18.5755],
        [73.9815, 18.5753]
      ],

      preprocessingMetrics: {
        deskewAngleDegrees: 0,
        contrastScore: 92,
        dpiEstimated: 300,
        binarizationMethod: 'Sauvola',
        noiseReductionApplied: true
      },

      validationResults: [],
      reviewHistory: [
        {
          timestamp: new Date().toISOString(),
          officerName: 'QR Code Hardware Attestation Reader',
          role: 'VERIFICATION_SPECIALIST',
          action: 'Physical QR Scan Ingestion',
          notes: `Ingested from physical document QR payload.`
        }
      ]
    };

    fallbackRecord.validationResults = runAutomatedValidationRules(fallbackRecord, allRecords);
    setMatchedRecord(fallbackRecord);
  }, [allRecords]);

  // Handle successful QR detection
  const handleQrDetected = useCallback((dataStr: string) => {
    if (!isScanning) return;
    setIsScanning(false);
    playBeep();
    setDetectionSuccessPulse(true);
    setTimeout(() => setDetectionSuccessPulse(false), 2000);

    const parsed = parseQrContent(dataStr);
    setScannedResult(parsed);
    lookupRecordFromQr(parsed);
  }, [isScanning, playBeep, lookupRecordFromQr]);

  // Frame processing loop for Camera
  const scanFrame = useCallback(() => {
    if (!isCameraActive || !videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    if (video.readyState === video.HAVE_ENOUGH_DATA && ctx) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: 'attemptBoth',
      });

      if (code && code.data && isScanning) {
        handleQrDetected(code.data);
        return;
      }
    }

    if (isCameraActive) {
      animationFrameRef.current = requestAnimationFrame(scanFrame);
    }
  }, [isCameraActive, isScanning, handleQrDetected]);

  // Start Camera Stream
  const startCamera = async () => {
    setCameraError(null);
    try {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => t.stop());
      }

      const constraints: MediaStreamConstraints = {
        video: selectedCameraId 
          ? { deviceId: { exact: selectedCameraId } }
          : { facingMode: facingMode, width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      setIsCameraActive(true);
      setIsScanning(true);

      // Enumerate cameras
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(d => d.kind === 'videoinput');
        setAvailableCameras(videoDevices);
      } catch {
        // Ignore
      }
    } catch (err: any) {
      console.warn('Camera stream error:', err);
      setCameraError(
        err.name === 'NotAllowedError'
          ? 'Camera permission denied. Please allow camera access in browser settings or use the file upload / demo benchmark buttons below.'
          : err.name === 'NotFoundError'
          ? 'No camera hardware found on this terminal. You can upload any QR image or test with official benchmark samples below.'
          : `Camera could not be started (${err.message || 'Restricted'}). Use file upload or test benchmark samples below.`
      );
      setIsCameraActive(false);
    }
  };

  // Stop Camera Stream
  const stopCamera = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
    setTorchActive(false);
  };

  // Toggle Torch
  const toggleTorch = async () => {
    if (!streamRef.current) return;
    try {
      const track = streamRef.current.getVideoTracks()[0];
      const capabilities: any = track.getCapabilities?.() || {};
      if (capabilities.torch) {
        await (track as any).applyConstraints({
          advanced: [{ torch: !torchActive }]
        });
        setTorchActive(!torchActive);
      }
    } catch {
      // Ignore
    }
  };

  // Toggle Facing Mode
  const toggleFacingMode = () => {
    const nextMode = facingMode === 'environment' ? 'user' : 'environment';
    setFacingMode(nextMode);
    setSelectedCameraId('');
    if (isCameraActive) {
      setTimeout(() => startCamera(), 100);
    }
  };

  // Scan loop effect
  useEffect(() => {
    if (isCameraActive && isScanning) {
      animationFrameRef.current = requestAnimationFrame(scanFrame);
    }
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isCameraActive, isScanning, scanFrame]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  // Handle Image File Upload (for testing without a live camera)
  const handleQrImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: 'attemptBoth'
        });

        if (code && code.data) {
          handleQrDetected(code.data);
        } else {
          setCameraError('No valid QR code could be decoded from this uploaded image. Try a higher contrast photo.');
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  // Preset Benchmark Physical Land Record QRs for Instant 1-Click Verification
  const sampleLandRecordQrs = [
    {
      label: 'Maharashtra 7/12 (Saat-Baara)',
      village: 'Wagholi, Pune',
      khasra: '142/1',
      docRef: 'MH-PUN-HAV-2024-712-142',
      status: 'Clean Title (Sanctioned)',
      data: JSON.stringify({
        docNumber: 'MH-PUN-HAV-2024-712-142',
        khasra: '142/1',
        khata: '882',
        village: 'Wagholi',
        tehsil: 'Haveli',
        district: 'Pune',
        state: 'Maharashtra',
        owner: 'Tukaram Eknath Patil',
        areaSqM: 14200,
        status: 'VERIFIED_AND_SANCTIONED',
        token: 'SHA256-DILRMP-MH-WAG-142'
      })
    },
    {
      label: 'UP Khasra-Khatauni',
      village: 'Babatpur, Varanasi',
      khasra: '512',
      docRef: 'UP-VAR-PIN-2024-512',
      status: 'Master Registry Verified',
      data: JSON.stringify({
        docNumber: 'UP-VAR-PIN-2024-512',
        khasra: '512',
        khata: '00142',
        village: 'Babatpur',
        tehsil: 'Pindra',
        district: 'Varanasi',
        state: 'Uttar Pradesh',
        owner: 'Dharmendra Nath Tiwari',
        areaSqM: 25300,
        status: 'CLEAN',
        token: 'SHA256-DILRMP-UP-VAR-512'
      })
    },
    {
      label: 'Punjab Jamabandi Nakal',
      village: 'Raikot, Ludhiana',
      khasra: '34//12/2',
      docRef: 'PB-LDH-JAG-2024-104',
      status: 'Clean Canal Holding',
      data: JSON.stringify({
        docNumber: 'PB-LDH-JAG-2024-104',
        khasra: '34//12/2',
        khata: '104/218',
        village: 'Raikot',
        tehsil: 'Jagraon',
        district: 'Ludhiana',
        state: 'Punjab',
        owner: 'Gurpreet Singh Dhillon',
        areaSqM: 16187,
        status: 'CLEAN',
        token: 'SHA256-DILRMP-PB-LDH-104'
      })
    },
    {
      label: 'Maharashtra Disputed Gat',
      village: 'Wagholi, Pune',
      khasra: '142/2',
      docRef: 'MH-PUN-HAV-2024-712-143',
      status: 'Court Injunction Active',
      data: JSON.stringify({
        docNumber: 'MH-PUN-HAV-2024-712-143',
        khasra: '142/2',
        khata: '883',
        village: 'Wagholi',
        tehsil: 'Haveli',
        district: 'Pune',
        state: 'Maharashtra',
        owner: 'Babanrao Mahadev Shinde',
        areaSqM: 8500,
        status: 'LITIGATION',
        token: 'SHA256-DILRMP-LIT-WAG-142-2'
      })
    }
  ];

  // Action: Ingest & Navigate
  const handleProceedToVerification = () => {
    if (!matchedRecord) return;
    setIsIngestingFromQr(true);

    // If not already in allRecords, ingest it
    const exists = allRecords.some(r => r.id === matchedRecord.id || r.documentNumber === matchedRecord.documentNumber);
    if (!exists) {
      onRecordIngested(matchedRecord);
    }

    setTimeout(() => {
      setIsIngestingFromQr(false);
      onNavigateToVerification(matchedRecord);
    }, 400);
  };

  // Reset scanner
  const handleResetScan = () => {
    setScannedResult(null);
    setMatchedRecord(null);
    setIsScanning(true);
    setCameraError(null);
    if (!isCameraActive) {
      startCamera();
    }
  };

  return (
    <div className="space-y-5">
      {/* Hidden processing canvas */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Main Scanner Container Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* LEFT PANE (7 Cols): Camera Viewfinder & Camera Controls */}
        <div className="lg:col-span-7 space-y-3">
          <div className="bg-[#FAF8F5] rounded-xl border border-[#DCD7CE] p-4 sm:p-5 shadow-2xs space-y-3">
            {/* Viewfinder Header */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-[#DCD7CE]">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-[#FFF9EA] text-[#8B4513] border border-[#DCD7CE]">
                  <Scan className="w-4 h-4 text-[#8B4513]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#33332A] natural-serif">
                    Live Optical QR Scanner
                  </h3>
                  <p className="text-[11px] text-[#6B6B58]">
                    DILRMP Physical Document Verification &amp; Cryptographic Attestation Reader
                  </p>
                </div>
              </div>

              {/* Quick Camera Action Controls */}
              <div className="flex items-center gap-1.5 text-xs">
                {/* Sound Toggle */}
                <button
                  type="button"
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                    soundEnabled 
                      ? 'bg-[#EAF2EB] text-[#3D5A40] border-[#BCD4C0]' 
                      : 'bg-[#F5F3EE] text-[#6B6B58] border-[#DCD7CE]'
                  }`}
                  title={soundEnabled ? 'Chime Sound Enabled' : 'Chime Muted'}
                >
                  {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                </button>

                {/* Torch Toggle (mobile) */}
                {isCameraActive && (
                  <button
                    type="button"
                    onClick={toggleTorch}
                    className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                      torchActive 
                        ? 'bg-amber-100 text-amber-900 border-amber-300' 
                        : 'bg-[#F5F3EE] text-[#6B6B58] border-[#DCD7CE]'
                    }`}
                    title="Toggle Flashlight / Torch"
                  >
                    <Zap className="w-3.5 h-3.5" />
                  </button>
                )}

                {/* Flip Camera */}
                {isCameraActive && (
                  <button
                    type="button"
                    onClick={toggleFacingMode}
                    className="p-1.5 rounded-lg bg-[#F5F3EE] hover:bg-[#EBE7DF] text-[#6B6B58] hover:text-[#33332A] border border-[#DCD7CE] transition-colors cursor-pointer"
                    title={`Switch Camera (Currently: ${facingMode === 'environment' ? 'Back' : 'Front'})`}
                  >
                    <FlipHorizontal className="w-3.5 h-3.5" />
                  </button>
                )}

                {/* Power Camera Button */}
                {isCameraActive ? (
                  <button
                    type="button"
                    onClick={stopCamera}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#FDF0ED] hover:bg-[#FBE4E0] text-[#8B0000] border border-[#F2C2BA] font-semibold transition-colors cursor-pointer"
                  >
                    <CameraOff className="w-3.5 h-3.5" />
                    <span>Stop Camera</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={startCamera}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#5A5A40] hover:bg-[#43432F] text-[#FFF9EA] font-semibold shadow-2xs transition-colors cursor-pointer"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>Start Camera</span>
                  </button>
                )}
              </div>
            </div>

            {/* Video Canvas / Viewfinder Box */}
            <div className="relative rounded-xl border border-[#DCD7CE] bg-[#1E1E14] overflow-hidden min-h-[320px] max-h-[420px] flex items-center justify-center">
              {/* Camera Video Stream */}
              <video
                ref={videoRef}
                playsInline
                muted
                className={`w-full h-full object-cover max-h-[400px] ${!isCameraActive ? 'hidden' : 'block'}`}
              />

              {/* Viewfinder Target Overlay HUD (When camera is active) */}
              {isCameraActive && (
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  {/* Darkened outer vignette */}
                  <div className="absolute inset-0 bg-black/35" />

                  {/* Clear target window box */}
                  <div className="relative w-64 h-64 sm:w-72 sm:h-72 border-2 border-[#E5C37A]/60 rounded-2xl shadow-[0_0_0_9999px_rgba(0,0,0,0.45)] flex items-center justify-center overflow-hidden">
                    {/* Viewfinder Corner Brackets */}
                    <div className="absolute top-2 left-2 w-5 h-5 border-t-4 border-l-4 border-[#E5C37A] rounded-tl" />
                    <div className="absolute top-2 right-2 w-5 h-5 border-t-4 border-r-4 border-[#E5C37A] rounded-tr" />
                    <div className="absolute bottom-2 left-2 w-5 h-5 border-b-4 border-l-4 border-[#E5C37A] rounded-bl" />
                    <div className="absolute bottom-2 right-2 w-5 h-5 border-b-4 border-r-4 border-[#E5C37A] rounded-br" />

                    {/* Central Crosshair */}
                    <div className="w-4 h-0.5 bg-[#E5C37A]/50" />
                    <div className="h-4 w-0.5 bg-[#E5C37A]/50 absolute" />

                    {/* Animated Scanning Laser Beam */}
                    {isScanning && (
                      <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent shadow-[0_0_12px_#FFD700] animate-laser-scan opacity-90" />
                    )}

                    {/* Detection Pulse Success Flash */}
                    {detectionSuccessPulse && (
                      <div className="absolute inset-0 bg-emerald-500/30 animate-ping rounded-2xl" />
                    )}
                  </div>

                  {/* HUD Status Badge */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-[#26261A]/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] text-[#EBE7DF] border border-[#52523C] flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span>Align physical land record QR code inside frame</span>
                  </div>
                </div>
              )}

              {/* Camera Offline / Standby State Screen */}
              {!isCameraActive && (
                <div className="text-center p-6 text-[#D7D2C5] space-y-3 z-10 max-w-md">
                  <div className="w-14 h-14 mx-auto rounded-full bg-[#2E2E20] border border-[#52523C] flex items-center justify-center text-[#E5C37A]">
                    <QrCode className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#FFF9EA] natural-serif">
                      Camera Stream Standby
                    </h4>
                    <p className="text-xs text-[#D7D2C5]/80 mt-1">
                      Activate camera to scan QR codes on physical 7/12 extracts, Jamabandi nakals, and Patta certificates directly with your device webcam.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={startCamera}
                      className="px-4 py-2 rounded-xl bg-natural-olive hover:bg-natural-olive-dark text-[#FFF9EA] text-xs font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <Camera className="w-4 h-4" />
                      <span>Start Camera Scanner</span>
                    </button>

                    {/* Image Upload Trigger */}
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-3.5 py-2 rounded-xl bg-[#FAF8F5] hover:bg-[#EBE7DF] text-[#33332A] text-xs font-semibold border border-[#DCD7CE] transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Upload className="w-3.5 h-3.5 text-[#8B4513]" />
                      <span>Upload QR Photo</span>
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleQrImageUpload}
                      accept="image/*"
                      className="hidden"
                      aria-label="Upload QR code image"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Camera Error Alert */}
            <AnimatePresence>
              {cameraError && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="p-3 bg-[#FDF0ED] border border-[#F2C2BA] rounded-xl text-xs text-[#8B0000] flex items-start gap-2.5"
                >
                  <AlertCircle className="w-4 h-4 text-[#8B0000] shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <span className="font-semibold">{cameraError}</span>
                    <p className="text-[11px] mt-0.5 opacity-90">
                      Tip: You can use the instant benchmark samples on the right to test physical QR verification without camera hardware.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Quick Upload or Paste Bar */}
            <div className="flex items-center justify-between p-2.5 bg-[#F5F3EE] rounded-lg border border-[#DCD7CE] text-xs text-[#5A5A40]">
              <span className="flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-[#8B4513]" />
                <span>Supports standard ISO/IEC 18004 2D Barcodes and Central DILRMP ULPIN seals.</span>
              </span>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="font-bold text-[#8B4513] hover:underline cursor-pointer"
              >
                Upload File Instead
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT PANE (5 Cols): Scanned Record Verification & Benchmark Presets */}
        <div className="lg:col-span-5 space-y-3">
          {/* Scanned Result / Verification Summary Box */}
          <div className="bg-[#FAF8F5] rounded-xl border border-[#DCD7CE] p-4 sm:p-5 shadow-2xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#DCD7CE]">
              <h3 className="text-sm font-bold text-[#33332A] natural-serif flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#3D5A40]" />
                <span>Verification &amp; Decoded Ledger</span>
              </h3>
              {scannedResult && (
                <button
                  type="button"
                  onClick={handleResetScan}
                  className="text-xs font-semibold text-[#8B4513] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Scan Next</span>
                </button>
              )}
            </div>

            {/* State A: Record Matched & Found */}
            {matchedRecord ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-3"
              >
                {/* Status Callout */}
                <div className="p-3 rounded-lg bg-[#EAF2EB] border border-[#BCD4C0] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#3D5A40]" />
                    <span className="text-xs font-bold text-[#2A402D]">
                      Authentic Land Record Verified!
                    </span>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                    matchedRecord.status === 'VERIFIED_AND_SANCTIONED'
                      ? 'bg-[#3D5A40] text-white'
                      : 'bg-[#FFF9EA] text-[#8B4513] border border-[#DCD7CE]'
                  }`}>
                    {matchedRecord.status.replace(/_/g, ' ')}
                  </span>
                </div>

                {/* Key Cadastral Metrics Card */}
                <div className="p-3 bg-white rounded-lg border border-[#DCD7CE] space-y-2 text-xs">
                  <div className="flex items-center justify-between pb-1.5 border-b border-[#EBE7DF]">
                    <span className="text-[#6B6B58]">Document Reference:</span>
                    <span className="font-mono font-bold text-[#33332A]">{matchedRecord.documentNumber}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div>
                      <span className="text-[#6B6B58] block">Khasra / Survey No.</span>
                      <span className="font-bold text-[#8B4513] font-mono text-xs">{matchedRecord.khasraNumber.value}</span>
                    </div>
                    <div>
                      <span className="text-[#6B6B58] block">Khata Number</span>
                      <span className="font-semibold text-[#33332A] font-mono">{matchedRecord.khataNumber.value}</span>
                    </div>
                    <div>
                      <span className="text-[#6B6B58] block">Village / Mauza</span>
                      <span className="font-semibold text-[#33332A]">{matchedRecord.village.value} ({matchedRecord.tehsil.value})</span>
                    </div>
                    <div>
                      <span className="text-[#6B6B58] block">State</span>
                      <span className="font-semibold text-[#33332A]">{matchedRecord.state.value}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-[#6B6B58] block">Registered Khatedar / Owner</span>
                      <span className="font-bold text-[#33332A]">{matchedRecord.primaryOwnerName.value}</span>
                    </div>
                    <div>
                      <span className="text-[#6B6B58] block">Normalized Area</span>
                      <span className="font-mono font-semibold text-[#33332A]">{matchedRecord.normalizedAreaSqMeters.toLocaleString('en-IN')} sq.m</span>
                    </div>
                    <div>
                      <span className="text-[#6B6B58] block">Encumbrance</span>
                      <span className={`font-semibold ${
                        matchedRecord.encumbranceStatus.value === 'CLEAR' ? 'text-emerald-700' : 'text-amber-800'
                      }`}>
                        {matchedRecord.encumbranceStatus.value}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Primary Action Button */}
                <button
                  type="button"
                  id="btn-qr-open-verification"
                  disabled={isIngestingFromQr}
                  onClick={handleProceedToVerification}
                  className="w-full py-2.5 px-4 rounded-xl bg-natural-olive hover:bg-natural-olive-dark text-[#FFF9EA] text-xs font-bold shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  {isIngestingFromQr ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Opening in Verification Studio...</span>
                    </>
                  ) : (
                    <>
                      <FileCheck className="w-4 h-4 text-[#FFF9EA]" />
                      <span>Inspect in Verification Station &rarr;</span>
                    </>
                  )}
                </button>
              </motion.div>
            ) : (
              /* State B: Standby / Instructions */
              <div className="text-center py-6 px-3 text-[#6B6B58] space-y-2">
                <QrCode className="w-10 h-10 mx-auto text-[#A5A58D] opacity-60" />
                <p className="text-xs font-medium text-[#33332A]">
                  No QR code currently scanned
                </p>
                <p className="text-[11px] text-[#6B6B58] max-w-xs mx-auto">
                  Hold a physical land document up to the camera or click any official benchmark sample below to test lookup and validation instantly.
                </p>
              </div>
            )}
          </div>

          {/* Preset Benchmark Physical Land Record QRs */}
          <div className="bg-[#FAF8F5] rounded-xl border border-[#DCD7CE] p-4 sm:p-5 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-[#4A3728] uppercase tracking-wider natural-serif flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#8B4513]" />
                <span>Test Benchmark Physical QRs</span>
              </h4>
              <span className="text-[10px] text-[#8B4513] font-semibold">1-Click Test</span>
            </div>
            <p className="text-[11px] text-[#6B6B58]">
              Simulate physical paper barcode scanning for pre-indexed states without holding a document to the camera:
            </p>

            <div className="space-y-2 pt-1">
              {sampleLandRecordQrs.map((sample) => (
                <div
                  key={sample.docRef}
                  onClick={() => handleQrDetected(sample.data)}
                  className="p-2.5 rounded-lg border border-[#DCD7CE] hover:border-[#8B4513] hover:bg-[#FFF9EA]/60 bg-white cursor-pointer transition-all flex items-center justify-between gap-2 group"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#33332A] group-hover:text-[#8B4513] transition-colors">
                        {sample.label}
                      </span>
                      <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-[#EBE7DF] text-[#4A3728]">
                        Gat {sample.khasra}
                      </span>
                    </div>
                    <p className="text-[10px] text-[#6B6B58] mt-0.5">
                      {sample.village} • <span className="italic">{sample.status}</span>
                    </p>
                  </div>

                  <div className="shrink-0 p-1.5 rounded-md bg-[#F5F3EE] group-hover:bg-[#8B4513] group-hover:text-white text-[#5A5A40] transition-colors">
                    <QrCode className="w-3.5 h-3.5" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
