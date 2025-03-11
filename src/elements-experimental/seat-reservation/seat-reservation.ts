export * from './seat-reservation/seat-reservation.js';

/** SeatReservation defines all information about a vehicle and the wagons it contains */
export type SeatReservation = {
  vehicleType: VehicleType;
  deckCoachIndex: number;
  coachItems: CoachItem[];
};

export type CoachItem = {
  id: string;
  number: string;
  dimension: ElementDimension;
  type?: CoachType;
  places?: Place[];
  graphicElements?: BaseElement[];
  serviceElements?: BaseElement[];
  travelClass: PlaceTravelClass[];
  propertyIds?: string[];
};

export interface Place extends BaseElement {
  number: string;
  state: PlaceState;
  type: PlaceType;
  travelClass?: PlaceTravelClass;
  remarkId?: string;
  propertyIds?: string[];
  selected?: boolean;
}

export type BaseElement = {
  icon?: string | null;
  rotation?: number;
  position: ElementPosition;
  dimension: ElementDimension;
};

export type ElementDimension = {
  w: number;
  h: number;
};

export type ElementPosition = {
  x: number;
  y: number;
  z: number;
};

export type PlaceSelection = {
  id: string;
  number: string;
  coachIndex: number;
  state: PlaceState;
};

export type SeatReservationPlaceSelection = {
  id: string;
  coachId: string;
  coachNumber: string;
  coachIndex: number;
  placeNumber: string;
  placeType: PlaceType;
  placeTravelClass: PlaceTravelClass;
  propertyIds: string[];
};

export const elementMountingOptions = <const>[
  'FREE',
  'UPPER_BORDER',
  'LOWER_BORDER',
  'UPPER_TO_LOWER_BORDER',
];
export type ElementMounting = (typeof elementMountingOptions)[number];
export type ElementDirection = 'TOP' | 'RIGHT' | 'BOTTOM' | 'LEFT';
export type PlaceType = 'SEAT' | 'BICYCLE';
export type CoachType = 'RESTAURANT_COACH' | 'BICYCLE_COACH' | 'LUGGAGE_COACH' | 'TRAIN_HEAD';
export type PlaceState = 'FREE' | 'ALLOCATED' | 'RESTRICTED' | 'SELECTED';
export type PlaceTravelClass = 'FIRST' | 'SECOND' | 'ANY_CLASS';
export type VehicleType = 'TRAIN' | 'BUS';
