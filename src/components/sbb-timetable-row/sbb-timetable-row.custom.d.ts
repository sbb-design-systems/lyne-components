import { PTRideLeg } from '../sbb-pearl-chain/sbb-pearl-chain.custom';

/** travel hints for the transportation */
export interface Notice {
  name: string;
  /** Priority - A lower priority value means a higher importance */
  priority: number;
  /** Text format with linkable parameters */
  text: string;
}

/** Occupancy for first and second class at StopPlace */
export type OccupancyEnum = 'HIGH' | 'LOW' | 'MEDIUM' | 'UNKNOWN';

/** A public transportation situation message affecting the planned Public Transport operation */
export interface PtSituation {
  /** Priority value: lowest = 80, medium = 60, highest = 40, de: Großereignis = 20 */
  broadcastMessages: PtSituationMessage[];
  /** A classification of what caused the SITUATION (HIM category) */
  cause?: PtSituationCauseEnum | null;
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

export interface ScheduledStopPointDetail {
  delay: any;
  /** True if platform change (de:Gleis-/Kante-/Steg-Änderung) */
  quayChanged?: boolean | null;
  /** A Quay (or platform or track) for any means of transport-mode / VehicleMode (train, bus, boat, etc.). */
  quayRtName?: string | null;
  /** planned arrival/departure time */
  time: string;
}

export interface ServiceProduct {
  number?: string | null;
  vehicleMode: VehicleModeEnum;

  corporateIdentityIcon?: string | null;
  /**
   * Usually referring to a specific commercial PT route (where direction might be either way), shown on vehicle displays.
   * example: 1
   */
  line?: string | null;
  /** Product name for e.g. "IC 1 753" */
  name: string;
  /**
   * Short, displayable name of product-category (related to Vehicle).
   * example: IC
   */
  vehicleSubModeShortName?: string | null;
  corporateIdentityIcon?: string | null;
}

export interface TripStatus {
  cancelled: boolean;
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
  arrivalWalk: any;
  departure?: ScheduledStopPointDetail | mull;
  departureWalk: any;
  direction?: string | null;
  duration: any;
  occupancy: Occupancy;
  product?: ServiceProduct | null;
  tripStatus: TripStatus | null;
}

export interface Price {
  price: string;
  text: string;
  isDiscount: boolean;
}

export interface Trip {
  /** List of transfer points */
  legs?: PTRideLeg[];
  /**
   * List of legs travel hints
   * Usefull for level 1, may be usefull for legend, in buttom of results, in level 2
   */
  notices: Notice[];
  /**
   * List of legs situation messages
   * Usefull for level 1, may not needed for level 2
   */
  situations: PtSituation[];
  /**
   * Summary of most relevant aspects of the given Trip and its PTRideLeg's
   * Usefull for level 1, not needed for level 2
   */
  summary?: TripSummary;
  /** contains all info for ZVS::Reise to get TripOffer price from NOVA */
  id: string;
  /** rideable whole Trip should be true to book, otherwise TariffOffer makes no sense */
  valid: boolean;
}
export interface InterfaceTimetableRowAttributes {
  trip: Trip;
  price?: Price;
}
