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
  cancelledText?: string;
  /** true: Journey is (partially) cancelled (default=false) */
  cancelled: boolean;
  /**
   * Enduser text, saying whether there is a delay on PTRideLeg (referring to first/last Stop).
   *
   */
  delayText: string;

  /** true: journey is redirected */
  redirected: boolean;
  redirectedFormatted?: string;
  redirectedText: string;

  /**
   * true: transport-product change from PTRideLeg to PTRideLeg is reachable
   * (de: Anschluss kann gehalten werden, see Trip::valid);
   * false: de:nicht mehr erreichbare Fahrt
   *
   */
  reachable: boolean;
  reachableText?: string;

  /** Text intended for passengers about an additional non-planned stop at a station */
  unplannedStopPointsText?: string;
}

/** Text template with optional formattable parameters. Useful to represent in UIs as clickable features like an e-Mail, phone or URL. */
export type LinkedText = {
  /** End-user text. */
  template?: string;
};

/** Wrapper for an Notice with image/picto name and text */
export interface Notice {
  name: string;
  /** Priority - A lower priority value means a higher importance */
  priority?: number;
  /** Text format with linkable parameters */
  text?: LinkedText;
}

/** vehicle journeys stop point state */
export type StopStatusEnum =
  | 'BEGIN_PARTIAL_CANCELLATION'
  | 'CANCELLED'
  | 'END_PARTIAL_CANCELLATION'
  | 'NOT_SERVICED'
  | 'PLANNED'
  | 'UNPLANNED';

/** Stop point on a vehicle journey */
export interface ScheduledStopPoint {
  stopStatus?: StopStatusEnum;
}

/** A passenger carrying vehicle journey for one specified operation day */
export interface ServiceJourney {
  /** List of ServiceProduct attributes and journey hints */
  /** Status (realtime changes) to Journey. */
  serviceAlteration: ServiceAlteration;
  /** List of stop points */
  stopPoints: ScheduledStopPoint[];
  /** List of ServiceProduct attributes and journey hints */
  notices: Notice[];
}

export interface Leg {
  /** duration from previous transfer point to current in minutes */
  duration?: number;
}

export type PtRideLeg = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  __typename?: 'PTRideLeg';
  /** arrival time and quay */
  arrival: ScheduledStopPointDetail;
  /** departure time and quay */
  departure: ScheduledStopPointDetail;
  duration?: number;
  /** (partial) journey details */
  serviceJourney: ServiceJourney;
};

/** StopPlace to StopPlace transfer (up to passenger to find a proper service). */
export type PtConnectionLeg = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  __typename?: 'PTConnectionLeg';
  duration?: number;
  notices: Notice[];
};
