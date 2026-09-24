import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Database, 
  HardDrive, 
  Wifi, 
  WifiOff, 
  RefreshCw, 
  CheckCircle2, 
  AlertTriangle, 
  Download, 
  Info, 
  ShieldCheck, 
  Sparkles, 
  SlidersHorizontal 
} from 'lucide-react';
import { 
  getOfflineCacheMetadata, 
  getPendingOfflineMutations, 
  OfflineCacheMetadata 
} from '../services/offlineStorage';
import { promptPwaInstall, canInstallPwa } from '../services/pwaService';

export interface OfflineSyncStatusBarProps {
  isDbConnected: boolean;
  isSimulatedOffline: boolean;
  onToggleSimulateOffline: () => void;
  onManualSync: () => Promise<void>;
  isSyncing: boolean;
  totalRecordsCount: number;
  lastDataSource: 'CLOUD' | 'LOCAL_CACHE';
  onForceReconnect: () => void;
}

export const OfflineSyncStatusBar: React.FC<OfflineSyncStatusBarProps> = ({
  isDbConnected,
  isSimulatedOffline,
  onToggleSimulateOffline,
  onManualSync,
  isSyncing,
  totalRecordsCount,
  lastDataSource,
  onForceReconnect
}) => {
  const [cacheMeta, setCacheMeta] = useState<OfflineCacheMetadata>(() => getOfflineCacheMetadata());
  const [pendingCount, setPendingCount] = useState<number>(() => getPendingOfflineMutations().length);
  const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false);
  const [installable, setInstallable] = useState<boolean>(false);
  const [installSuccess, setInstallSuccess] = useState<boolean>(false);

  useEffect(() => {
    const update = () => {
      setCacheMeta(getOfflineCacheMetadata());
      setPendingCount(getPendingOfflineMutations().length);
      setInstallable(canInstallPwa());
    };
    update();
    const interval = setInterval(update, 2500);
    return () => clearInterval(interval);
  }, []);

  const handleInstall = async () => {
    const accepted = await promptPwaInstall();
    if (accepted) {
      setInstallSuccess(true);
      setInstallable(false);
      setTimeout(() => setInstallSuccess(false), 5000);
    }
  };

  const isActuallyOffline = isSimulatedOffline || !isDbConnected;

  return (
    <div className="w-full bg-[#FAF8F5] border-b border-[#DCD7CE] text-xs">
      {/* Primary Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap items-center justify-between gap-2.5">
        {/* Left Side: Status Indicators */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Connection Status Pill */}
          {isActuallyOffline ? (
            <span 
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border font-medium ${
                isSimulatedOffline 
                  ? 'bg-amber-50 text-amber-900 border-amber-300'
                  : 'bg-[#FDF0ED] text-[#8B0000] border-[#F2C2BA]'
              }`}
              title={isSimulatedOffline ? "Testing offline fallback (simulated)" : "Firebase connection unstable or offline"}
            >
              <WifiOff className="w-3.5 h-3.5 text-amber-700 shrink-0" />
              <span>
                {isSimulatedOffline ? 'Simulated Offline Fallback' : 'Firebase Unstable • Offline Fallback'}
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-200/70 text-amber-900 font-bold uppercase">
                Local Active
              </span>
            </span>
          ) : (
            <span 
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#EAF2EB] border border-[#BCD4C0] text-[#3D5A40] font-medium"
              title="Connected to Firebase Firestore live cloud database"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#82B37A] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#3D5A40]"></span>
              </span>
              <Database className="w-3.5 h-3.5 text-[#3D5A40] shrink-0" />
              <span>Firebase Firestore:</span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded bg-[#3D5A40] text-white">
                Live
              </span>
            </span>
          )}

          {/* Local Storage Cache Status */}
          <span 
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#FAF8F5] border border-[#DCD7CE] text-[#5A5A40]"
            title="All land records and Aks Shajra parcel geometry are preserved in browser LocalStorage"
          >
            <HardDrive className="w-3.5 h-3.5 text-[#8B4513]" />
            <span className="hidden sm:inline">Local Storage Fallback:</span>
            <span className="font-bold text-[#33332A] font-mono">{cacheMeta.recordCount || totalRecordsCount}</span>
            <span className="text-[11px] text-[#6B6B58]">records cached</span>
          </span>

          {/* Service Worker PWA Indicator */}
          <span 
            className="hidden md:inline-flex items-center gap-1 px-2 py-1 rounded-md bg-[#FAF8F5] border border-[#DCD7CE] text-[#5A5A40]"
            title="Service Worker is active, precaching app shell & assets for offline fieldwork"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            <span className="text-[11px]">Service Worker Precached</span>
          </span>
        </div>

        {/* Right Side: Actions, Offline Test & Sync */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Pending Changes Badge & Sync Button */}
          {pendingCount > 0 && (
            <button
              onClick={onManualSync}
              disabled={isSyncing}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-100 hover:bg-amber-200 border border-amber-300 text-amber-900 font-semibold text-xs transition-colors cursor-pointer shadow-2xs"
              title="Click to sync queued offline edits to Firestore"
            >
              <RefreshCw className={`w-3 h-3 text-amber-800 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{pendingCount} offline edit{pendingCount > 1 ? 's' : ''} queued</span>
              <span className="text-[10px] underline ml-0.5">Sync Now</span>
            </button>
          )}

          {/* PWA Install Button if available */}
          {installable && (
            <button
              onClick={handleInstall}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#5A5A40] hover:bg-[#4A4A32] text-[#FFF9EA] font-medium text-xs transition-colors cursor-pointer shadow-2xs"
              title="Install progressive web app for native offline field usage"
            >
              <Download className="w-3 h-3" />
              <span>Install Offline App</span>
            </button>
          )}

          {installSuccess && (
            <span className="inline-flex items-center gap-1 text-emerald-700 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Installed</span>
            </span>
          )}

          {/* Simulate Offline / Network Drop Test Toggle */}
          <button
            onClick={onToggleSimulateOffline}
            className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium border transition-colors cursor-pointer ${
              isSimulatedOffline
                ? 'bg-amber-600 text-white border-amber-700 shadow-2xs'
                : 'bg-white text-[#5A5A40] hover:text-[#33332A] border-[#DCD7CE] hover:bg-[#F2EFE9]'
            }`}
            title="Toggle to simulate network interruption or Firestore unavailability to test Local Storage fallback"
          >
            <SlidersHorizontal className="w-3 h-3" />
            <span className="hidden sm:inline">{isSimulatedOffline ? 'End Simulation' : 'Test Offline Fallback'}</span>
            <span className="sm:hidden">{isSimulatedOffline ? 'Online' : 'Test Offline'}</span>
          </button>

          {/* Details / Help Toggle */}
          <button
            onClick={() => setIsDetailsOpen(!isDetailsOpen)}
            className="p-1 rounded-md text-[#6B6B58] hover:text-[#33332A] hover:bg-[#EBE7DF] transition-colors"
            title="View offline storage & service worker resilience architecture"
          >
            <Info className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Offline Alert Banner (shown when connection is offline or simulated offline) */}
      <AnimatePresence>
        {isActuallyOffline && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-amber-50/95 border-t border-amber-200 text-amber-900 px-4 py-2 text-xs"
          >
            <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
                <span className="font-semibold">
                  {isSimulatedOffline
                    ? 'Simulated Network Interruption Active:'
                    : 'Firebase Connection Unstable or Disconnected:'}
                </span>
                <span>
                  Viewing {totalRecordsCount} land records and cadastral plots directly from browser <strong>Local Storage</strong> and <strong>Service Worker cache</strong>. All verification tools, search, and Aks Shajra maps remain fully functional.
                </span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {!isSimulatedOffline && (
                  <button
                    onClick={onForceReconnect}
                    className="px-2 py-0.5 rounded bg-amber-200 hover:bg-amber-300 text-amber-900 font-medium text-[11px] cursor-pointer"
                  >
                    Retry Cloud Connection
                  </button>
                )}
                {isSimulatedOffline && (
                  <button
                    onClick={onToggleSimulateOffline}
                    className="px-2 py-0.5 rounded bg-amber-700 hover:bg-amber-800 text-white font-medium text-[11px] cursor-pointer"
                  >
                    Restore Normal Cloud Sync
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expandable Architecture Details Dialog */}
      <AnimatePresence>
        {isDetailsOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden bg-[#F2EFE9] border-t border-[#DCD7CE] px-4 py-3"
          >
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-[#5A5A40]">
              <div className="p-2.5 rounded-lg bg-white border border-[#DCD7CE]">
                <div className="flex items-center gap-1.5 font-bold text-[#33332A] mb-1">
                  <HardDrive className="w-3.5 h-3.5 text-[#8B4513]" />
                  <span>Persistent Local Storage Layer</span>
                </div>
                <p className="text-[11px] text-[#6B6B58] leading-relaxed">
                  All {cacheMeta.recordCount} Jamabandi / RoR land parcels, citizen consultation appointments, and validation results are mirrored in <code>localStorage</code>. Zero blank screens during network drops.
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-white border border-[#DCD7CE]">
                <div className="flex items-center gap-1.5 font-bold text-[#33332A] mb-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                  <span>PWA Service Worker Engine</span>
                </div>
                <p className="text-[11px] text-[#6B6B58] leading-relaxed">
                  Pre-caches application HTML, JavaScript, stylesheets, fonts, and vector drafting canvas via <code>vite-plugin-pwa</code>. Field officers can conduct Aks Shajra survey inspections without cellular coverage.
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-white border border-[#DCD7CE]">
                <div className="flex items-center gap-1.5 font-bold text-[#33332A] mb-1">
                  <RefreshCw className="w-3.5 h-3.5 text-[#5A5A40]" />
                  <span>Pending Offline Mutation Queue</span>
                </div>
                <p className="text-[11px] text-[#6B6B58] leading-relaxed">
                  Edits, manual verifications, and approvals made offline are queued with cryptographic timestamps and automatically reconciled with Firebase Firestore once connectivity stabilizes.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
