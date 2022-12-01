export interface ScheduledStopPointDetail {
  /** delay at arrival/departure (in minutes) */
  delay: number;
  /** True if platform change (de:Gleis-/Kante-/Steg-Änderung) */
  quayChanged?: boolean | null;
  /** A Quay (or platform or track) for any means of transport-mode / VehicleMode (train, bus, boat, etc.). */
  quayRtName?: string | null;
  /**
   * A Quay (or platform or track) for any means of transport-mode / VehicleMode (train, bus, boat, etc.).
   * Planed quay.
   */
  quayAimedName?: string;
  /** planned arrival/departure time */
  time: string;
}

export interface ServiceAlteration {
  /** If (partially) cancelled, enduser cancellation info. */
  cancellationInfo?: string;
  /** true: Journey is (partially) cancelled (default=false) */
  cancelled: boolean;
  /**
   * Enduser text, saying whether there is a delay on PTRideLeg (referring to first/last Stop).
   *
   */
  delayText: string;
  /**
   * true: transport-product change from PTRideLeg to PTRideLeg is reachable
   * (de: Anschluss kann gehalten werden, see Trip::valid);
   * false: de:nicht mehr erreichbare Fahrt
   *
   */
  reachable: boolean;
  /** true: journey is redirected */
  redirected: boolean;

  /**
   * Transport-product change from Leg to Leg info according to SBB business rules. Relates to reachable.
   * Example: Your connecting train will be waiting, please change trains immediately.
   */
  reachableText?: string;

  /** Text intended for passengers about an additional non-planned stop at a station */
  unplannedStopPointsText?: string;
}

export interface ServiceJourney {
  /** List of ServiceProduct attributes and journey hints */
  /** Status (realtime changes) to Journey. */
  serviceAlteration: ServiceAlteration;
}

export interface PTRideLeg {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  __typename?: 'PTRideLeg';
  /** arrival time and quay */
  arrival: ScheduledStopPointDetail;
  /** departure time and quay */
  departure: ScheduledStopPointDetail;
  /** duration from previous transferpoint to current in minutes */
  duration?: number;
  /** (partial) journey details */
  serviceJourney: ServiceJourney;
}
