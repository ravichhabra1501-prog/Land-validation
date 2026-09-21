import { ExtractedLandRecord, StateDigitizationProgress } from '../types';
import { UNIQUE_RECORDS_NORTH } from './uniqueRecordsNorth';
import { UNIQUE_RECORDS_WEST } from './uniqueRecordsWest';
import { UNIQUE_RECORDS_SOUTH } from './uniqueRecordsSouth';
import { UNIQUE_RECORDS_CENTRAL } from './uniqueRecordsCentral';
import { UNIQUE_RECORDS_EAST } from './uniqueRecordsEast';

// Consolidated globally unique land records (66 distinct records spanning 20+ states)
export const INITIAL_LAND_RECORDS: ExtractedLandRecord[] = [
  ...UNIQUE_RECORDS_NORTH,
  ...UNIQUE_RECORDS_WEST,
  ...UNIQUE_RECORDS_SOUTH,
  ...UNIQUE_RECORDS_CENTRAL,
  ...UNIQUE_RECORDS_EAST
];

export const STATE_DIGITIZATION_DATA: StateDigitizationProgress[] = [
  {
    stateName: 'Uttar Pradesh',
    totalVillages: 106774,
    digitizedVillages: 99420,
    totalRecords: 48200000,
    digitizedRecords: 46100000,
    verifiedPercentage: 95.6,
    cadastralMapsDigitized: 98120,
    totalCadastralMaps: 106774,
    averageOcrConfidence: 94.2
  },
  {
    stateName: 'Maharashtra',
    totalVillages: 44000,
    digitizedVillages: 41800,
    totalRecords: 26500000,
    digitizedRecords: 24700000,
    verifiedPercentage: 93.2,
    cadastralMapsDigitized: 40100,
    totalCadastralMaps: 44000,
    averageOcrConfidence: 91.8
  },
  {
    stateName: 'Madhya Pradesh',
    totalVillages: 55000,
    digitizedVillages: 52100,
    totalRecords: 19800000,
    digitizedRecords: 18900000,
    verifiedPercentage: 95.4,
    cadastralMapsDigitized: 51200,
    totalCadastralMaps: 55000,
    averageOcrConfidence: 93.5
  },
  {
    stateName: 'Karnataka',
    totalVillages: 29400,
    digitizedVillages: 28900,
    totalRecords: 21400000,
    digitizedRecords: 20900000,
    verifiedPercentage: 97.6,
    cadastralMapsDigitized: 28700,
    totalCadastralMaps: 29400,
    averageOcrConfidence: 96.1
  },
  {
    stateName: 'Punjab',
    totalVillages: 12581,
    digitizedVillages: 11950,
    totalRecords: 14200000,
    digitizedRecords: 12800000,
    verifiedPercentage: 90.1,
    cadastralMapsDigitized: 11200,
    totalCadastralMaps: 12581,
    averageOcrConfidence: 89.4
  },
  {
    stateName: 'Rajasthan',
    totalVillages: 45000,
    digitizedVillages: 39800,
    totalRecords: 17500000,
    digitizedRecords: 15200000,
    verifiedPercentage: 86.8,
    cadastralMapsDigitized: 38200,
    totalCadastralMaps: 45000,
    averageOcrConfidence: 88.7
  },
  {
    stateName: 'Gujarat',
    totalVillages: 18600,
    digitizedVillages: 18100,
    totalRecords: 12800000,
    digitizedRecords: 12400000,
    verifiedPercentage: 96.8,
    cadastralMapsDigitized: 17900,
    totalCadastralMaps: 18600,
    averageOcrConfidence: 95.0
  }
];

export const SAMPLE_LAND_RECORDS = INITIAL_LAND_RECORDS;
