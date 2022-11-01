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
}

export interface TimeQuayWrapper {
  delay?: number;
  /** True if platform change (de:Gleis-/Kante-/Steg-Änderung) */
  quayChanged?: boolean;
  /** A Quay (or platform or track) for any means of transport-mode / VehicleMode (train, bus, boat, etc.). */
  quayName?: string;
  /** planned arrival/departure time */
  time: string;
}

export interface Leg {
  duration: number;
  arrival?: {
    time: string;
  };
  departure?: {
    time: string;
  };
  serviceJourney?: {
    serviceAlteration: ServiceAlteration;
  };
}
