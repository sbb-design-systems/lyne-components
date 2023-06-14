import { Leg } from '../../global/interfaces/timetable-properties';

export interface InterfaceSbbJourneySummaryAttributes {
  headerLevel?: '1' | '2' | '3' | '4' | '5' | '6';
  legs: Leg[];
  vias?: string[];
  origin: string;
  destination: string;
  arrivalWalk?: number;
  departure: string;
  arrival: string;
  departureWalk?: number;
  duration?: number;
}
