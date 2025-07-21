/** SeatReservation defines all information about a vehicle and the wagons it contains */
export type SeatReservation = {
  vehicleType: VehicleType;
  deckCoachIndex: number;
  deckCoachLevel: CoachDeckLevel;
  coachItems: CoachItem[];
};

/** Describes a coach (wagon) in the reservation. */
export type CoachItem = {
  // id - Compartment number, max. 3 digits; CH-wide usually 2 digits
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

/** Extends BaseElement with seat-specific data. */
export interface Place extends BaseElement {
  number: string;
  state: PlaceState;
  type: PlaceType;
  travelClass?: PlaceTravelClass;
  propertyIds?: string[];
}

/** Base properties for any renderable element within a coach. */
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

/* Info about */
export type CoachNumberOfFreePlaces = {
  seats: number;
  bicycles: number;
};

/** Selection info for a single place. */
export type PlaceSelection = {
  id: string;
  number: string;
  deckIndex: number;
  coachIndex: number;
  state: PlaceState;
};

export type SeatReservationPlaceSelection = {
  id: string;
  coachId: string;
  coachNumber: string;
  coachIndex: number;
  deckIndex: number;
  placeNumber: string;
  placeType: PlaceType;
  placeTravelClass: PlaceTravelClass;
  propertyIds: string[];
};

export type SeatReservationCoachSelection = {
  coachId: string;
  coachNumber: string;
  coachIndex: number;
  coachType?: CoachType;
  coachTravelClass: PlaceTravelClass[];
  coachPropertyIds?: string[];
  coachNumberOfFreePlaces?: CoachNumberOfFreePlaces;
};

export type PlaceType = 'SEAT' | 'BICYCLE';
export type CoachDeckLevel = 'SINGLE_DECK' | 'LOWER_DECK' | 'MIDDLE_DECK' | 'UPPER_DECK';
export type CoachType = 'RESTAURANT_COACH' | 'BICYCLE_COACH' | 'LUGGAGE_COACH' | 'TRAIN_HEAD';
export type PlaceState = 'FREE' | 'ALLOCATED' | 'RESTRICTED' | 'SELECTED';
export type PlaceTravelClass = 'FIRST' | 'SECOND' | 'ANY_CLASS';
export type VehicleType = 'TRAIN' | 'BUS';
