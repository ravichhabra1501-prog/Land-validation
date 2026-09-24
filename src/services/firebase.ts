import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  doc, 
  getDocs, 
  setDoc, 
  getDocFromServer,
  onSnapshot
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { ExtractedLandRecord, CitizenAppointment } from '../types';
import { INITIAL_LAND_RECORDS } from '../data/sampleRecords';
import { INITIAL_CITIZEN_APPOINTMENTS } from '../data/sampleAppointments';
import { 
  saveRecordsToLocalCache, 
  loadRecordsFromLocalCache, 
  saveAppointmentsToLocalCache, 
  loadAppointmentsFromLocalCache, 
  queueOfflineMutation,
  getPendingOfflineMutations,
  clearPendingOfflineMutations
} from './offlineStorage';

// Initialize Firebase App singleton
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Firestore with specific database ID if configured
export const db = firebaseConfig.firestoreDatabaseId && firebaseConfig.firestoreDatabaseId !== '(default)'
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

const LAND_RECORDS_COLLECTION = 'land_records';
const CITIZEN_APPOINTMENTS_COLLECTION = 'citizen_appointments';

/**
 * Validate connection to Firestore using getDocFromServer
 */
export async function testFirestoreConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    console.info('Firebase Firestore connected successfully.');
    return true;
  } catch (error) {
    if (error instanceof Error && (error.message.includes('offline') || error.message.includes('unavailable') || error.message.includes('network'))) {
      console.warn('Firebase Firestore: client is offline or network unreachable. Falling back to local storage.');
      return false;
    }
    // Expected on initial setup if document doesn't exist, but server handshake succeeded
    return true;
  }
}

/**
 * Sanitize an object for Firestore:
 * 1. Strips or converts undefined values to null
 * 2. Converts nested arrays (like [[lat, lng], ...]) into arrays of objects to satisfy Firestore constraint
 */
export function sanitizeForFirestore(obj: any): any {
  if (obj === undefined) {
    return null;
  }
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  if (Array.isArray(obj)) {
    // If array of arrays (e.g. cadastralPolygon: [[lng, lat], ...])
    if (obj.length > 0 && Array.isArray(obj[0])) {
      return obj.map((subArr) => {
        if (Array.isArray(subArr)) {
          return { lng: subArr[0] ?? 0, lat: subArr[1] ?? 0 };
        }
        return sanitizeForFirestore(subArr);
      });
    }
    return obj.map((item) => sanitizeForFirestore(item));
  }

  const result: Record<string, any> = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value !== undefined) {
      result[key] = sanitizeForFirestore(value);
    }
  }
  return result;
}

/**
 * Normalizes loaded records from Firestore, reconstructing polygon arrays if needed
 */
export function normalizeLoadedRecord(record: any): ExtractedLandRecord {
  if (record && Array.isArray(record.cadastralPolygon) && record.cadastralPolygon.length > 0) {
    if (typeof record.cadastralPolygon[0] === 'object' && !Array.isArray(record.cadastralPolygon[0])) {
      record.cadastralPolygon = record.cadastralPolygon.map((p: any) => [p.lng ?? 0, p.lat ?? 0]);
    }
  }
  return record as ExtractedLandRecord;
}

/**
 * Seed initial land records into Firestore if collection is empty
 */
export async function seedInitialRecordsIfEmpty(): Promise<void> {
  try {
    const colRef = collection(db, LAND_RECORDS_COLLECTION);
    const snapshot = await getDocs(colRef);
    if (snapshot.empty) {
      console.info('Seeding initial land records to Firestore...');
      for (const record of INITIAL_LAND_RECORDS) {
        await setDoc(doc(db, LAND_RECORDS_COLLECTION, record.id), sanitizeForFirestore(record));
      }
      console.info('Initial land records seeded.');
    }
  } catch (err) {
    console.warn('Could not check or seed initial land records in Firestore (will use local storage):', err);
  }
}

/**
 * Seed initial citizen appointments into Firestore if collection is empty
 */
export async function seedInitialAppointmentsIfEmpty(): Promise<void> {
  try {
    const colRef = collection(db, CITIZEN_APPOINTMENTS_COLLECTION);
    const snapshot = await getDocs(colRef);
    if (snapshot.empty) {
      console.info('Seeding initial citizen appointments to Firestore...');
      for (const apt of INITIAL_CITIZEN_APPOINTMENTS) {
        await setDoc(doc(db, CITIZEN_APPOINTMENTS_COLLECTION, apt.id), apt);
      }
      console.info('Initial citizen appointments seeded.');
    }
  } catch (err) {
    console.warn('Could not check or seed citizen appointments in Firestore (will use local storage):', err);
  }
}

/**
 * Real-time listener for Land Records from Firestore with automatic Local Storage Fallback
 */
export function subscribeToLandRecords(
  onRecordsUpdated: (records: ExtractedLandRecord[], source: 'CLOUD' | 'LOCAL_CACHE') => void,
  onError?: (err: Error) => void
): () => void {
  const colRef = collection(db, LAND_RECORDS_COLLECTION);
  return onSnapshot(
    colRef,
    (snapshot) => {
      if (!snapshot.empty) {
        const firestoreRecords: ExtractedLandRecord[] = [];
        snapshot.forEach((d) => {
          firestoreRecords.push(normalizeLoadedRecord(d.data()));
        });

        // Merge Firestore records with INITIAL_LAND_RECORDS to ensure all state data is always present
        const firestoreMap = new Map<string, ExtractedLandRecord>(firestoreRecords.map(r => [r.id, r]));
        const missingInFirestore: ExtractedLandRecord[] = [];

        const mergedRecords: ExtractedLandRecord[] = INITIAL_LAND_RECORDS.map(initRec => {
          if (firestoreMap.has(initRec.id)) {
            const fsRec = firestoreMap.get(initRec.id)!;
            firestoreMap.delete(initRec.id);
            return fsRec;
          } else {
            missingInFirestore.push(initRec);
            return initRec;
          }
        });

        // Add any additional records created directly in Firestore (like user uploads)
        firestoreMap.forEach(fsRec => {
          mergedRecords.push(fsRec);
        });

        // 1. Immediately backup all records to browser localStorage for offline fallback
        saveRecordsToLocalCache(mergedRecords);

        // 2. Dispatch updated records to the UI
        onRecordsUpdated(mergedRecords, 'CLOUD');

        // 3. Lazily sync missing initial records to Firestore in background
        if (missingInFirestore.length > 0) {
          saveBatchLandRecordsToFirestore(missingInFirestore).catch(e => {
            console.warn('Background sync of new initial records to Firestore:', e);
          });
        }
      } else {
        // If empty, trigger seeding and cache
        seedInitialRecordsIfEmpty().then(() => {
          saveRecordsToLocalCache(INITIAL_LAND_RECORDS);
          onRecordsUpdated(INITIAL_LAND_RECORDS, 'CLOUD');
        }).catch(() => {
          const cached = loadRecordsFromLocalCache() || INITIAL_LAND_RECORDS;
          onRecordsUpdated(cached, 'LOCAL_CACHE');
        });
      }
    },
    (error) => {
      console.warn('Firestore land records subscription encountered error/instability. Activating Local Storage fallback:', error);
      // Fallback: load latest cached records from Local Storage immediately
      const cached = loadRecordsFromLocalCache() || INITIAL_LAND_RECORDS;
      onRecordsUpdated(cached, 'LOCAL_CACHE');
      onError?.(error);
    }
  );
}

/**
 * Persist or update a single Land Record in Firestore with Local Storage cache & queueing
 */
export async function saveLandRecordToFirestore(record: ExtractedLandRecord): Promise<void> {
  // Always update local storage cache immediately so UI and offline mode remain instant
  const currentCached = loadRecordsFromLocalCache() || INITIAL_LAND_RECORDS;
  const existingIdx = currentCached.findIndex(r => r.id === record.id);
  const updatedCache = existingIdx >= 0
    ? currentCached.map(r => r.id === record.id ? record : r)
    : [record, ...currentCached];
  saveRecordsToLocalCache(updatedCache);

  try {
    const docRef = doc(db, LAND_RECORDS_COLLECTION, record.id);
    await setDoc(docRef, sanitizeForFirestore(record), { merge: true });
  } catch (err) {
    console.warn('Firebase connection unstable: queued record update to offline pending queue:', err);
    queueOfflineMutation('RECORD_UPDATE', record);
  }
}

/**
 * Persist batch updates of multiple Land Records in Firestore with Local Storage fallback
 */
export async function saveBatchLandRecordsToFirestore(records: ExtractedLandRecord[]): Promise<void> {
  // Update local cache first
  const currentCached = loadRecordsFromLocalCache() || INITIAL_LAND_RECORDS;
  const map = new Map<string, ExtractedLandRecord>(currentCached.map(r => [r.id, r]));
  records.forEach(r => map.set(r.id, r));
  saveRecordsToLocalCache(Array.from(map.values()));

  try {
    const promises = records.map((record) => {
      const docRef = doc(db, LAND_RECORDS_COLLECTION, record.id);
      return setDoc(docRef, sanitizeForFirestore(record), { merge: true });
    });
    await Promise.all(promises);
  } catch (err) {
    console.warn('Firebase batch update failed or unstable: queued to offline storage:', err);
    queueOfflineMutation('RECORD_BATCH', records);
  }
}

/**
 * Real-time listener for Citizen Appointments from Firestore with Local Storage fallback
 */
export function subscribeToCitizenAppointments(
  onAppointmentsUpdated: (appointments: CitizenAppointment[], source: 'CLOUD' | 'LOCAL_CACHE') => void,
  onError?: (err: Error) => void
): () => void {
  const colRef = collection(db, CITIZEN_APPOINTMENTS_COLLECTION);
  return onSnapshot(
    colRef,
    (snapshot) => {
      if (!snapshot.empty) {
        const appointments: CitizenAppointment[] = [];
        snapshot.forEach((d) => {
          appointments.push(d.data() as CitizenAppointment);
        });
        saveAppointmentsToLocalCache(appointments);
        onAppointmentsUpdated(appointments, 'CLOUD');
      } else {
        seedInitialAppointmentsIfEmpty().then(() => {
          saveAppointmentsToLocalCache(INITIAL_CITIZEN_APPOINTMENTS);
          onAppointmentsUpdated(INITIAL_CITIZEN_APPOINTMENTS, 'CLOUD');
        }).catch(() => {
          const cached = loadAppointmentsFromLocalCache() || INITIAL_CITIZEN_APPOINTMENTS;
          onAppointmentsUpdated(cached, 'LOCAL_CACHE');
        });
      }
    },
    (error) => {
      console.warn('Firestore appointments subscription error/unstable. Using Local Storage fallback:', error);
      const cached = loadAppointmentsFromLocalCache() || INITIAL_CITIZEN_APPOINTMENTS;
      onAppointmentsUpdated(cached, 'LOCAL_CACHE');
      onError?.(error);
    }
  );
}

/**
 * Persist or update a single Citizen Appointment in Firestore with Local Storage caching
 */
export async function saveCitizenAppointmentToFirestore(appointment: CitizenAppointment): Promise<void> {
  const currentCached = loadAppointmentsFromLocalCache() || INITIAL_CITIZEN_APPOINTMENTS;
  const existingIdx = currentCached.findIndex(a => a.id === appointment.id);
  const updatedCache = existingIdx >= 0
    ? currentCached.map(a => a.id === appointment.id ? appointment : a)
    : [appointment, ...currentCached];
  saveAppointmentsToLocalCache(updatedCache);

  try {
    const docRef = doc(db, CITIZEN_APPOINTMENTS_COLLECTION, appointment.id);
    await setDoc(docRef, appointment, { merge: true });
  } catch (err) {
    console.warn('Firebase offline: queued appointment update to offline queue:', err);
    queueOfflineMutation('APPOINTMENT_CREATE', appointment);
  }
}

/**
 * Synchronize any pending offline mutations back to Firestore when connection stabilizes
 */
export async function syncPendingOfflineMutationsToFirestore(): Promise<{ syncedCount: number; errors: string[] }> {
  const pending = getPendingOfflineMutations();
  if (pending.length === 0) {
    return { syncedCount: 0, errors: [] };
  }

  console.info(`Attempting to sync ${pending.length} pending offline mutations to Firestore...`);
  let successCount = 0;
  const errors: string[] = [];

  for (const mutation of pending) {
    try {
      if (mutation.type === 'RECORD_UPDATE' || mutation.type === 'RECORD_CREATE') {
        const rec = mutation.payload as ExtractedLandRecord;
        const docRef = doc(db, LAND_RECORDS_COLLECTION, rec.id);
        await setDoc(docRef, sanitizeForFirestore(rec), { merge: true });
        successCount++;
      } else if (mutation.type === 'RECORD_BATCH') {
        const records = mutation.payload as ExtractedLandRecord[];
        for (const rec of records) {
          const docRef = doc(db, LAND_RECORDS_COLLECTION, rec.id);
          await setDoc(docRef, sanitizeForFirestore(rec), { merge: true });
        }
        successCount++;
      } else if (mutation.type === 'APPOINTMENT_CREATE' || mutation.type === 'APPOINTMENT_UPDATE') {
        const apt = mutation.payload as CitizenAppointment;
        const docRef = doc(db, CITIZEN_APPOINTMENTS_COLLECTION, apt.id);
        await setDoc(docRef, apt, { merge: true });
        successCount++;
      }
    } catch (err: any) {
      errors.push(`Failed mutation ${mutation.id}: ${err?.message || 'Unknown error'}`);
    }
  }

  if (errors.length === 0) {
    clearPendingOfflineMutations();
    console.info(`Successfully synchronized all ${successCount} offline changes to Firestore.`);
  }

  return { syncedCount: successCount, errors };
}
