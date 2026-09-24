/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Offline Local Storage & Service Worker Fallback Service
 * Ensures continuous, uninterrupted access to Land Records, Aks Shajra parcels, 
 * and Citizen Consultations during Firebase Firestore connection instability or offline field work.
 */

import { ExtractedLandRecord, CitizenAppointment } from '../types';
import { INITIAL_LAND_RECORDS } from '../data/sampleRecords';
import { INITIAL_CITIZEN_APPOINTMENTS } from '../data/sampleAppointments';

const STORAGE_KEYS = {
  LAND_RECORDS: 'dilrmp_offline_land_records_v1',
  CITIZEN_APPOINTMENTS: 'dilrmp_offline_citizen_appointments_v1',
  PENDING_MUTATIONS: 'dilrmp_offline_pending_mutations_v1',
  METADATA: 'dilrmp_offline_cache_meta_v1',
} as const;

export interface OfflinePendingMutation {
  id: string;
  type: 'RECORD_UPDATE' | 'RECORD_CREATE' | 'RECORD_BATCH' | 'APPOINTMENT_CREATE' | 'APPOINTMENT_UPDATE';
  timestamp: string;
  payload: any;
}

export interface OfflineCacheMetadata {
  lastCachedAt: string;
  recordCount: number;
  appointmentCount: number;
  pendingMutationCount: number;
  version: string;
}

export type NetworkConnectionStatus = 'LIVE_CLOUD' | 'UNSTABLE_FALLBACK' | 'OFFLINE_LOCAL';

/**
 * Save land records to browser localStorage for offline fallback
 */
export function saveRecordsToLocalCache(records: ExtractedLandRecord[]): void {
  try {
    if (!records || records.length === 0) return;
    localStorage.setItem(STORAGE_KEYS.LAND_RECORDS, JSON.stringify(records));
    updateCacheMetadata({ recordCount: records.length });
  } catch (err) {
    console.warn('LocalStorage quota or serialization error when caching land records:', err);
  }
}

/**
 * Retrieve cached land records from browser localStorage
 */
export function loadRecordsFromLocalCache(): ExtractedLandRecord[] | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.LAND_RECORDS);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch (err) {
    console.warn('Could not read land records from localStorage cache:', err);
  }
  return null;
}

/**
 * Save citizen appointments to browser localStorage for offline fallback
 */
export function saveAppointmentsToLocalCache(appointments: CitizenAppointment[]): void {
  try {
    if (!appointments) return;
    localStorage.setItem(STORAGE_KEYS.CITIZEN_APPOINTMENTS, JSON.stringify(appointments));
    updateCacheMetadata({ appointmentCount: appointments.length });
  } catch (err) {
    console.warn('LocalStorage error when caching appointments:', err);
  }
}

/**
 * Retrieve cached citizen appointments from browser localStorage
 */
export function loadAppointmentsFromLocalCache(): CitizenAppointment[] | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CITIZEN_APPOINTMENTS);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch (err) {
    console.warn('Could not read appointments from localStorage cache:', err);
  }
  return null;
}

/**
 * Queue a mutation made while Firebase is offline or unstable
 */
export function queueOfflineMutation(
  type: OfflinePendingMutation['type'],
  payload: any
): void {
  try {
    const existing = getPendingOfflineMutations();
    const newMutation: OfflinePendingMutation = {
      id: `MUT-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      type,
      timestamp: new Date().toISOString(),
      payload,
    };
    const updated = [newMutation, ...existing];
    localStorage.setItem(STORAGE_KEYS.PENDING_MUTATIONS, JSON.stringify(updated));
    updateCacheMetadata({ pendingMutationCount: updated.length });
  } catch (err) {
    console.warn('Could not queue offline mutation:', err);
  }
}

/**
 * Get all pending offline mutations queued for cloud synchronization
 */
export function getPendingOfflineMutations(): OfflinePendingMutation[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PENDING_MUTATIONS);
    if (!raw) return [];
    return JSON.parse(raw) || [];
  } catch {
    return [];
  }
}

/**
 * Clear pending mutations after successful synchronization
 */
export function clearPendingOfflineMutations(): void {
  try {
    localStorage.removeItem(STORAGE_KEYS.PENDING_MUTATIONS);
    updateCacheMetadata({ pendingMutationCount: 0 });
  } catch {
    // ignore
  }
}

/**
 * Update metadata timestamp and record counts
 */
function updateCacheMetadata(partial: Partial<OfflineCacheMetadata>): void {
  try {
    const current = getOfflineCacheMetadata();
    const updated: OfflineCacheMetadata = {
      ...current,
      ...partial,
      lastCachedAt: new Date().toISOString(),
      version: '1.0.0',
    };
    localStorage.setItem(STORAGE_KEYS.METADATA, JSON.stringify(updated));
  } catch {
    // ignore
  }
}

/**
 * Retrieve metadata about offline cache
 */
export function getOfflineCacheMetadata(): OfflineCacheMetadata {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.METADATA);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {
    // fallback below
  }
  return {
    lastCachedAt: new Date().toISOString(),
    recordCount: INITIAL_LAND_RECORDS.length,
    appointmentCount: INITIAL_CITIZEN_APPOINTMENTS.length,
    pendingMutationCount: 0,
    version: '1.0.0',
  };
}

/**
 * Seed local storage cache with initial dataset if cache is completely empty
 */
export function seedLocalStorageCacheIfEmpty(): { records: ExtractedLandRecord[]; appointments: CitizenAppointment[] } {
  let records = loadRecordsFromLocalCache();
  if (!records || records.length === 0) {
    saveRecordsToLocalCache(INITIAL_LAND_RECORDS);
    records = INITIAL_LAND_RECORDS;
  }

  let appointments = loadAppointmentsFromLocalCache();
  if (!appointments || appointments.length === 0) {
    saveAppointmentsToLocalCache(INITIAL_CITIZEN_APPOINTMENTS);
    appointments = INITIAL_CITIZEN_APPOINTMENTS;
  }

  return { records, appointments };
}
