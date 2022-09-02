declare type Leg = {
  duration: number;
};

declare type TimeQuayWrapper = {
  delay?: number;
  /** True if platform change (de:Gleis-/Kante-/Steg-Änderung) */
  quayChanged?: boolean;
  /** A Quay (or platform or track) for any means of transport-mode / VehicleMode (train, bus, boat, etc.). */
  quayName?: string;
  /** planned arrival/departure time */
  time: string;
};

declare type SummaryConfig = {
  legs: string;
  vias: string[];
  origin: string;
  destination: string;
  arrivalWalk: number;
  departure: TimeQuayWrapper;
  arrival: TimeQuayWrapper;
  departureWalk: number;
};

export interface InterfaceJourneySummaryAttributes {
  config: SummaryConfig;
}
