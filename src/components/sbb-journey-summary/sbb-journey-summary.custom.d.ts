import { Leg } from '../../global/interfaces/timetable-properties';

export interface InterfaceSbbJourneySummaryAttributes {
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
