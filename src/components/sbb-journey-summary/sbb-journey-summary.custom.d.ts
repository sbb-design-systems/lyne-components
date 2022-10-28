import { Leg, TimeQuayWrapper } from '../../global/interfaces/pearl-chain-properties';

declare interface SummaryConfig {
  legs: Leg[];
  vias: string[];
  origin: string;
  destination: string;
  arrivalWalk: number;
  departure: TimeQuayWrapper;
  arrival: TimeQuayWrapper;
  departureWalk: number;
  duration: number;
};

export interface InterfaceJourneySummaryAttributes {
  config: SummaryConfig;
}
