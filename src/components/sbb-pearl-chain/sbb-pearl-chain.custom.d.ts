import {
  PtSituation,
  ScheduledStopPointDetail,
  Occupancy,
  Notice,
} from '../sbb-timetable-row/sbb-timetable-row.custom';

export interface Coordinate {
  latitude: any;
  longitude: any;
}

export interface Place {
  centroid?: Coordinate;
  id: string;
  name: string;
}

export interface StopPlace {
  centroid?: Coordinate;
  id: string;
  name: string;
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
   * example: Your connecting train will be waiting, please change trains immediately.
   */
  reachableText?: string;
}

/**
 * A passenger carrying Service (phyisical public transport vehicle)
 * provided and operated by a certain Operator allocated to a concrete ServiceJourney
 */
export interface ServiceProduct {
  /**
   * Corporate Identity Icon for e.g. Train 'SBB_oev_b_t02'
   * // TODO - Ist diese Info zum Icon nützlich oder wäre die Art des Transportmittel (ZUg, Bus, ..) nützlicher
   */
  corporateIdentityIcon?: string;
  /**
   * Usually referring to a specific commercial PT route (where direction might be either way), shown on vehicle displays. If this value is missing, it is probably a single-journey (de:Einzelfahrt)
   * example: 1
   */
  line?: string;
  /** Product name for e.g. "IC 1 753" */
  name: string;
  /**
   * Unique per OperatingDay and name (where 'IC 1' can run several times per day in either of opposite directions)
   * example: 753
   */
  number?: string;
  /** A characterisation of the public transport operation according to the means of transport. */
  vehicleMode: VehicleModeEnum;
  /**
   * Short, displayable name of product-category (related to Vehicle).
   * example: IC
   */
  vehicleSubModeShortName?: string;
}

export type StopStatusEnum =
  | 'BEGIN_PARTIAL_CANCELLATION'
  | 'CANCELLED'
  | 'END_PARTIAL_CANCELLATION'
  | 'NOT_SERVICED'
  | 'PLANNED'
  | 'UNPLANNED'
  | 'UNPLANNED'
  | 'UNPLANNED'
  | 'UNPLANNED'
  | 'UNPLANNED'
  | 'UNPLANNED';

/** Stop point on a vehicle journey */
export interface ScheduledStopPoint {
  /** Arrival time and quay */
  arrival?: ScheduledStopPointDetail;
  /** The most relevant boarding/alighting accessibility restriction for handicaped people (according to business rules) */
  boardingAlightingAccessibility?: BoardingAlightingAccessibilityEnum;
  /** Departure time and quay */
  departure?: ScheduledStopPointDetail;
  /** Occupancy */
  occupancy: Occupancy;
  /** Place (name, coordinates, ...) */
  place: StopPlace;
  /** Status at ScheduledStopPlace on a PTRide */
  stopStatus?: StopStatusEnum;
}

export interface ServiceJourney {
  /** (last) Direction information correlating to vehicle or perron (platform) display */
  direction?: string;
  /** ServiceJourney ID */
  id: string;
  /** List of ServiceProduct attributes and journey hints */
  notices: Notice[];
  /** Status (realtime changes) to Journey. */
  serviceAlteration: ServiceAlteration;
  /** Line operated by Vehicle operator(s) (list representes partial changes on the Line like Line::number, Line::operator). */
  serviceProduct: ServiceProduct;
  /** List of situation messages */
  situations: PtSituation;
  /** List of stop points */
  stopPoints: ScheduledStopPoint;
}

export interface PTRideLeg {
  arrival: ScheduledStopPointDetail;
  /** departure time and quay */
  departure: ScheduledStopPointDetail;
  /** duration from previous transferpoint to current in minutes */
  duration?: any;
  /** End point */
  end?: Place;
  /** (partial) journey details */
  serviceJourney: ServiceJourney;
  /** Start point */
  start?: Place;
}
export interface InterfacePearlChainAttributes {
  legs: PTRideLeg[];
}
