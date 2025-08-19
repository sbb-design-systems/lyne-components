import type {
  BaseElement,
  CoachItem,
  CoachNumberOfFreePlaces,
  ElementDimension,
  ElementPosition,
  Place,
  PlaceSelection,
  PlaceTravelClass,
  SeatReservation,
  SeatReservationPlaceSelection,
  SeatReservationSelectedCoach,
  VehicleType,
} from '../types.js';

import { MOCK_COACHES_RAW_0, MOCK_COACHES_RAW_1 } from './seat-reservation-sample-data.js';

/**
 * Map function that converts the RAW OSDM mock data into SeatReservation
 */
export const mapRawDataToSeatReservation = (vehicleType: VehicleType): SeatReservation => {
  const MOCK_DATA = vehicleType === 'TRAIN' ? MOCK_COACHES_RAW_0 : MOCK_COACHES_RAW_1;

  const coachsArr = MOCK_DATA.map((coachDeckLayout) => {
    const coachLayout = coachDeckLayout?.coachDeckLayout;
    const travelDirection = coachLayout.travelDirection ?? 'STARTING_IN_DIRECTION';

    const coachTravelClasses: PlaceTravelClass[] = [];
    const coachPropertyIds: string[] = [];
    const places = coachLayout.placeGroups
      .map((placeGroup: any) => {
        //Collect unique travel classes for coach
        if (coachTravelClasses.indexOf(placeGroup.travelClass) === -1) {
          coachTravelClasses.push(placeGroup.travelClass);
        }

        // Collect unique properties for coach
        if (coachPropertyIds.indexOf(placeGroup.accommodationSubType) === -1) {
          coachPropertyIds.push(placeGroup.accommodationSubType);
        }

        return placeGroup.places?.map((place: any) => {
          return {
            number: place?.number,
            state: place?.state,
            type: placeGroup.accommodationSubType.indexOf('BICYCLE') === -1 ? 'SEAT' : 'BICYCLE',
            dimension: { w: place.rectangle.dimension.width, h: place.rectangle.dimension.height },
            position: {
              x: place.rectangle.position.x,
              y: place.rectangle.position.y,
              z: place.rectangle.position.z,
            },
            rotation: place?.orientation || 0,
            travelClass: placeGroup?.travelClass,
            propertyIds: place.placeProperties || [],
          };
        });
      })
      .flat();

    const signs = coachLayout.serviceIcons.map((serviceIcon) => {
      return {
        icon: serviceIcon.type,
        position: {
          x: serviceIcon.rectangle.position.x,
          y: serviceIcon.rectangle.position.y,
          z: serviceIcon.rectangle.position.z,
        },
        dimension: {
          w: serviceIcon.rectangle.dimension.width,
          h: serviceIcon.rectangle.dimension.height,
        },
      };
    });

    const graphicalElements = coachLayout.graphicElements.map((element) => {
      return {
        icon: element?.type,
        position: {
          x: element.rectangle.position.x,
          y: element.rectangle.position.y,
          z: element.rectangle.position.z,
        },
        dimension: { w: element.rectangle.dimension.width, h: element.rectangle.dimension.height },
        rotation: element.orientation,
      };
    });

    return {
      id: coachLayout?.id,
      number: coachLayout?.name,
      dimension: { w: coachLayout.dimension?.width, h: coachLayout.dimension?.height },
      places: places,
      serviceElements: signs,
      graphicElements: graphicalElements,
      travelDirection: travelDirection,
      travelClass: coachTravelClasses,
      propertyIds: coachPropertyIds,
    } as CoachItem;
  });

  return {
    vehicleType: vehicleType,
    deckCoachIndex: 0,
    deckCoachLevel: 'SINGLE_DECK',
    coachItems: coachsArr,
  };
};

/**
 * Mapped place and coach information to place selection
 * @param place
 * @param coachIndex
 * @returns PlaceSelection
 */
export const mapPlaceInfosToPlaceSelection = (
  place: Place,
  deckIndex: number,
  coachIndex: number,
): PlaceSelection => {
  const placeId =
    'seat-reservation__place-button-' + deckIndex + '-' + coachIndex + '-' + place.number;
  return {
    id: placeId,
    number: place.number,
    deckIndex: deckIndex,
    coachIndex: coachIndex,
    state: place.state,
    placeType: place.type,
  };
};

/**
 * Mapped information from place, coach and the coachindex  to the seatReservationPlaceSelection.
 * This Object information is emitted outwards
 * @param place
 * @param coach
 * @param coachIndex
 * @returns SeatReservationPlaceSelection
 */
export const mapPlaceAndCoachToSeatReservationPlaceSelection = (
  place: Place,
  coach: CoachItem,
  deckIndex: number,
  coachIndex: number,
): SeatReservationPlaceSelection => {
  const placeId =
    'seat-reservation__place-button-' + deckIndex + '-' + coachIndex + '-' + place.number;
  return {
    id: placeId,
    coachId: coach.id,
    coachNumber: coach.number,
    coachIndex: coachIndex,
    deckIndex: deckIndex,
    placeNumber: place.number,
    placeType: place.type,
    placeTravelClass: place.travelClass || 'ANY_CLASS',
    propertyIds: place.propertyIds || [],
  };
};

/**
 * Mapped coach information to coach selection
 * @param coachIndex
 * @param coach
 * @param coachNumberOfFreePlaces
 * @returns PlaceSelection
 */
export const mapCoachInfosToCoachSelection = (
  coachIndex: number,
  coach: CoachItem,
  coachNumberOfFreePlaces: CoachNumberOfFreePlaces,
): SeatReservationSelectedCoach => {
  return {
    coachId: coach.id,
    coachNumber: coach.number,
    coachIndex: coachIndex,
    coachType: coach?.type,
    coachTravelClass: coach?.travelClass,
    coachPropertyIds: coach?.propertyIds,
    coachNumberOfFreePlaces: coachNumberOfFreePlaces,
  };
};

export const mapElementPositionByCoachTravelDirection = (
  element: BaseElement,
  coachDimension: ElementDimension,
): ElementPosition => {
  // Invert element X/Y position by coach dimension and element dimension
  const modX = coachDimension.w - element.position.x - element.dimension.w;
  const modY = coachDimension.h - element.position.y - element.dimension.h;
  return { x: modX, y: modY, z: element.position.z };
};
