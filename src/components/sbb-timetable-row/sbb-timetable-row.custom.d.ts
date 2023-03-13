import {
  PtRideLeg,
  ScheduledStopPointDetail,
} from '../../global/interfaces/pearl-chain-properties';

/** HimCus interface for mapped icon name and text */
export interface HimCus {
  name: string;
  text: string;
}

/** Boarding icon interface for mapped icon name and text */
export interface Boarding {
  name: string;
  text: string;
}

/** Occupancy for first and second class at StopPlace */
export type OccupancyEnum = 'HIGH' | 'LOW' | 'MEDIUM' | 'UNKNOWN';

/** A public transportation situation message affecting the planned Public Transport operation */
export interface PtSituation {
  /** Priority value: lowest = 80, medium = 60, highest = 40, de: Großereignis = 20 */
  broadcastMessages?: PtSituationMessage[];
  /** A classification of what caused the SITUATION (HIM category) */
  cause: PtSituationCauseEnum | null;
}

/** Mode of public transportation */
export type VehicleModeEnum =
  | 'BUS'
  | 'CABLEWAY'
  | 'CHAIRLIFT'
  | 'COG_RAILWAY'
  | 'ELEVATOR'
  | 'GONDOLA'
  | 'METRO'
  | 'PLANE'
  | 'SHIP'
  | 'TAXI'
  | 'TRAIN'
  | 'TRAMWAY'
  | 'UNKNOWN';

/** A classification of what caused a Situation (HIM category) */
export type PtSituationCauseEnum =
  | 'CONSTRUCTION_SITE'
  | 'DELAY'
  | 'DISTURBANCE'
  | 'END_MESSAGE'
  | 'INFORMATION'
  | 'TRAIN_REPLACEMENT_BY_BUS';

/** A public transportation situation broadcast message affecting the planned PT operation */
export interface PtSituationMessage {
  /** Complete Footer/text of message */
  detail: string;
  id: string;
  /** Priority rank: default = 100, low = 80, medium = 60, high = 40, de:Großereignis = 20 */
  priority: number;
  /** Heading of message */
  title: string;
}

export interface Occupancy {
  /** occupancy first class */
  firstClass?: OccupancyEnum | null;
  /** occupancy second class */
  secondClass?: OccupancyEnum | null;
}

export interface ServiceProduct {
  number?: string | null;
  vehicleMode: VehicleModeEnum;

  /**
   * Usually referring to a specific commercial PT route (where direction might be either way), shown on vehicle displays.
   * Example: 1
   */
  line?: string | null;
  /** Product name for e.g. "IC 1 753" */
  name: string;
  /**
   * Short, displayable name of product-category (related to Vehicle).
   * Example: IC
   */
  vehicleSubModeShortName?: string | null;
}

export interface TripStatus {
  /** false: Planned connection; true: Realtime alternative */
  alternative: boolean;
  /** Text intended for passengers about an alternative Trip, relates to alternative. */
  alternativeText?: string;
  /** PTRideLeg cancelled */
  cancelled: boolean;
  cancelledText: string;
  /** Contains at least one delay (de:Verspätung) on any PTRideLeg. */
  delayed: boolean;
  /** Contains at lease one unknown delay (de:Unbestimmte Verspätung) on any PTRideLeg. */
  delayedUnknown: boolean;
  /** PTRideLeg partially cancelled (de:Teilausfall). */
  partiallyCancelled: boolean;
  /** Contains at least one platform change (de:Gleis-/Kante-/Steg-Änderung) on any PTRideLeg */
  quayChanged: boolean;
}

export interface TripSummary {
  arrival?: ScheduledStopPointDetail | null;
  arrivalWalk: number;
  departure?: ScheduledStopPointDetail | mull;
  departureWalk: number;
  direction?: string | null;
  duration: number;
  occupancy: Occupancy;
  product?: ServiceProduct | null;
  tripStatus: TripStatus | null;
}

export interface Price {
  price?: string;
  text?: string;
  isDiscount?: boolean;
}

export interface Trip {
  /** List of transfer points */
  legs: (PtRideLeg & PtConnectionLeg)[];
  /**
   * List of legs travel hints
   * Usefull for level 1, may be usefull for legend, in buttom of results, in level 2
   */
  notices: Notice[];
  /**
   * List of legs situation messages
   * Usefull for level 1, may not needed for level 2
   */
  situations: PtSituation[] | undefined;
  /**
   * Summary of most relevant aspects of the given Trip and its PTRideLeg's
   * Usefull for level 1, not needed for level 2
   */
  summary?: TripSummary;
  /** contains all info for ZVS::Reise to get TripOffer price from NOVA */
  id: string;
  /** rideable whole Trip should be true to book, otherwise TariffOffer makes no sense */
  valid?: boolean;
}
