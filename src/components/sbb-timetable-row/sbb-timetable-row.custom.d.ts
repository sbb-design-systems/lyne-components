// import { Leg } from '../sbb-pearl-chain/sbb-pearl-chain.custom';

export type Notice = {
  name?: string;
  /** Priority - A lower priority value means a higher importance */
  priority?: number;
  /** Text format with linkable parameters */
  text?: string;
  /** additional information, like phone, email, url according to text */
  textArguments?: TextArgument;
  /** Type of Notice */
  type?: NoticeTypeEnum;
};

declare type TextArgument = {
  type?: TextArgumentEnum;
  values?: string;
};

declare enum TextArgumentEnum {
  email = 'EMAIL',
  phone = 'PHONE',
  url = 'URL',
}

declare enum NoticeTypeEnum {
  attribute = 'ATTRIBUTE',
  info = 'INFO',
}

declare enum OccupancyEnum {
  high = 'HIGH',
  low = 'LOW',
  medium = 'MEDIUM',
  unknown = 'UNKNOWN',
}

export type PtSituation = {
  /** Priority value: lowest = 80, medium = 60, highest = 40, de: Großereignis = 20 */
  broadcastMessages: PtSituationMessage[];
  /** A classification of what caused the SITUATION (HIM category) */
  cause: PtSituationCauseEnum;
};

/** A classification of what caused a Situation (HIM category) */
declare enum PtSituationCauseEnum {
  constructionSite = 'CONSTRUCTION_SITE',
  delay = 'DELAY',
  disturbance = 'DISTURBANCE',
  endMessage = 'END_MESSAGE',
  information = 'INFORMATION',
  trainReplacementByBus = 'TRAIN_REPLACEMENT_BY_BUS',
}

/** A public transportation situation broadcast message affecting the planned PT operation */
declare type PtSituationMessage = {
  /** Complete Footer/text of message */
  detail?: string;
  /** Priority rank: default = 100, low = 80, medium = 60, high = 40, de:Großereignis = 20 */
  priority?: string;
  /** Heading of message */
  title?: string;
};

declare type Occupancy = {
  /** occupancy first class */
  firstClass?: OccupancyEnum;
  /** occupancy second class */
  secondClass?: OccupancyEnum;
};

declare type TimeQuayWrapper = {
  delay?: number;
  /** True if platform change (de:Gleis-/Kante-/Steg-Änderung) */
  quayChanged?: boolean;
  /** A Quay (or platform or track) for any means of transport-mode / VehicleMode (train, bus, boat, etc.). */
  quayName?: string;
  /** planned arrival/departure time */
  time: Date;
};

declare type ServiceProduct = {
  number?: string;
  vehicleMode?: string;

  corporateIdentityIcon?: string;
  /**
   * Usually referring to a specific commercial PT route (where direction might be either way), shown on vehicle displays.
   * example: 1
   */
  line: string;
  /** Product name for e.g. "IC 1 753" */
  name: string;
  /**
   * Short, displayable name of product-category (related to Vehicle).
   * example: IC
   */
  vehicleSubModeShortName: string;
};

declare type TripStatus = {
  cancelled: boolean;
  /** Contains at least one delay (de:Verspätung) on any PTRideLeg. */
  delayed: boolean;
  /** Contains at lease one unknown delay (de:Unbestimmte Verspätung) on any PTRideLeg. */
  delayedUnknown: boolean;
  /** PTRideLeg partially cancelled (de:Teilausfall). */
  partiallyCancelled: boolean;
  /** Contains at least one platform change (de:Gleis-/Kante-/Steg-Änderung) on any PTRideLeg */
  quayChanged: boolean;
};

declare type TripSummary = {
  arrival: TimeQuayWrapper;
  arrivalWalk: number;
  departure: TimeQuayWrapper;
  departureWalk: number;
  direction: string;
  duration: number;
  occupancy: Occupancy;
  product: ServiceProduct;
  tripStatus: TripStatus;
};

declare type Trip = {
  price: string;

  /** List of transfer points */
  // legs: Leg[];
  /**
   * List of legs travel hints
   * Usefull for level 1, may be usefull for legend, in buttom of results, in level 2
   */
  notices?: Notice[];
  /**
   * List of legs situation messages
   * Usefull for level 1, may not needed for level 2
   */
  situations?: PtSituation[];
  /**
   * Summary of most relevant aspects of the given Trip and its PTRideLeg's
   * Usefull for level 1, not needed for level 2
   */
  summary: TripSummary;
  /** contains all info for ZVS::Reise to get TripOffer price from NOVA */
  tripId: string;
  /** rideable whole Trip should be true to book, otherwise TariffOffer makes no sense */
  valid?: boolean;
};
export interface InterfaceTimetableRowAttributes {
  trip: Trip;
}
