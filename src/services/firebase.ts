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
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase Firestore: client is offline or network unreachable.');
      return false;
    }
    // Expected on initial setup if document doesn't exist, but server handshake succeeded
    return true;
  }
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
        await setDoc(doc(db, LAND_RECORDS_COLLECTION, record.id), record);
      }
      console.info('Initial land records seeded.');
    }
  } catch (err) {
    console.warn('Could not check or seed initial land records in Firestore:', err);
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
    console.warn('Could not check or seed citizen appointments in Firestore:', err);
  }
}

/**
 * Real-time listener for Land Records from Firestore
 */
export function subscribeToLandRecords(
  onRecordsUpdated: (records: ExtractedLandRecord[]) => void,
  onError?: (err: Error) => void
): () => void {
  const colRef = collection(db, LAND_RECORDS_COLLECTION);
  return onSnapshot(
    colRef,
    (snapshot) => {
      if (!snapshot.empty) {
        const records: ExtractedLandRecord[] = [];
        snapshot.forEach((d) => {
          records.push(d.data() as ExtractedLandRecord);
        });
        onRecordsUpdated(records);
      } else {
        // If empty, trigger seeding
        seedInitialRecordsIfEmpty().then(() => {
          onRecordsUpdated(INITIAL_LAND_RECORDS);
        });
      }
    },
    (error) => {
      console.warn('Firestore land records subscription error:', error);
      onError?.(error);
    }
  );
}

/**
 * Persist or update a single Land Record in Firestore
 */
export async function saveLandRecordToFirestore(record: ExtractedLandRecord): Promise<void> {
  try {
    const docRef = doc(db, LAND_RECORDS_COLLECTION, record.id);
    await setDoc(docRef, record, { merge: true });
  } catch (err) {
    console.error('Error saving land record to Firestore:', err);
    throw err;
  }
}

/**
 * Persist batch updates of multiple Land Records in Firestore
 */
export async function saveBatchLandRecordsToFirestore(records: ExtractedLandRecord[]): Promise<void> {
  try {
    const promises = records.map((record) => {
      const docRef = doc(db, LAND_RECORDS_COLLECTION, record.id);
      return setDoc(docRef, record, { merge: true });
    });
    await Promise.all(promises);
  } catch (err) {
    console.error('Error saving batch land records to Firestore:', err);
    throw err;
  }
}

/**
 * Real-time listener for Citizen Appointments from Firestore
 */
export function subscribeToCitizenAppointments(
  onAppointmentsUpdated: (appointments: CitizenAppointment[]) => void,
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
        onAppointmentsUpdated(appointments);
      } else {
        seedInitialAppointmentsIfEmpty().then(() => {
          onAppointmentsUpdated(INITIAL_CITIZEN_APPOINTMENTS);
        });
      }
    },
    (error) => {
      console.warn('Firestore appointments subscription error:', error);
      onError?.(error);
    }
  );
}

/**
 * Persist or update a single Citizen Appointment in Firestore
 */
export async function saveCitizenAppointmentToFirestore(appointment: CitizenAppointment): Promise<void> {
  try {
    const docRef = doc(db, CITIZEN_APPOINTMENTS_COLLECTION, appointment.id);
    await setDoc(docRef, appointment, { merge: true });
  } catch (err) {
    console.error('Error saving citizen appointment to Firestore:', err);
    throw err;
  }
}
