export interface ScheduledStopPointDetail {
  /** delay at arrival/departure (in minutes) - type "any" is needed because of the generated types */
  delay: any;
  /** True if platform change (de:Gleis-/Kante-/Steg-Änderung) */
  quayChanged?: boolean | null;
  /** A Quay (or platform or track) for any means of transport-mode / VehicleMode (train, bus, boat, etc.). */
  quayRtName?: string | null;
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
}

export interface ServiceJourney {
  /** List of ServiceProduct attributes and journey hints */
  /** Status (realtime changes) to Journey. */
  serviceAlteration: ServiceAlteration;
}

export interface PTRideLeg {
  arrival: ScheduledStopPointDetail;
  /** departure time and quay */
  departure: ScheduledStopPointDetail;
  /** duration from previous transferpoint to current in minutes - type "any" is needed because of the generated types */
  duration?: any;
  /** (partial) journey details */
  serviceJourney: ServiceJourney;
}
