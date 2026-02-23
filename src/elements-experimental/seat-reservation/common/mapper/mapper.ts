import type {
  CoachDeckLevel,
  CoachItem,
  CoachNumberOfFreePlaces,
  Place,
  PlaceSelection,
  PlaceTravelClass,
  SeatReservation,
  SeatReservationPlaceSelection,
  SeatReservationSelectedCoach,
  VehicleType,
} from '../types.ts';

import { MOCK_COACHES_RAW_BUS } from './sample-data/seat-reservation-sample-data-bus.ts';
import {
  MOCK_COACHE_RAW_DECK_LOWER,
  MOCK_COACHE_RAW_DECK_UPPPER,
} from './sample-data/seat-reservation-sample-data-decks.ts';
import { MOCK_COACHES_RAW_TRAIN } from './sample-data/seat-reservation-sample-data-train.ts';

/**
 * Handle mock data based on vehicle type or coach deck level
 * @param vehicleType
 * @param coachDeckLevel
 * @returns
 */
function getMockData(
  vehicleType: VehicleType | null,
  coachDeckLevel: CoachDeckLevel | null,
): any[] {
  if (vehicleType !== null) {
    return vehicleType === 'TRAIN' ? MOCK_COACHES_RAW_TRAIN : MOCK_COACHES_RAW_BUS;
  } else {
    if (coachDeckLevel === 'LOWER_DECK') {
      return MOCK_COACHE_RAW_DECK_LOWER;
    } else if (coachDeckLevel === 'UPPER_DECK') {
      return MOCK_COACHE_RAW_DECK_UPPPER;
    }
  }
  return MOCK_COACHES_RAW_TRAIN;
}

/**
 * Map function that converts the RAW OSDM mock data into SeatReservation
 */
export const mapRawDataToSeatReservation = (
  vehicleType: VehicleType | null,
  coachDeckLevel: CoachDeckLevel | null = null,
): SeatReservation => {
  const MOCK_DATA = getMockData(vehicleType, coachDeckLevel);
  const deckCoachLevelIndex = coachDeckLevel === 'LOWER_DECK' ? 1 : 0;

  const coachsArr = MOCK_DATA.map((coachDeckLayout) => {
    const coachLayout = coachDeckLayout?.coachDeckLayout;
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

    const signs = coachLayout.serviceIcons.map((serviceIcon: any) => {
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

    const graphicalElements = coachLayout.graphicElements.map((element: any) => {
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
      travelClass: coachTravelClasses,
      propertyIds: coachPropertyIds,
    } as CoachItem;
  });

  return {
    vehicleType: vehicleType || 'TRAIN',
    deckCoachIndex: deckCoachLevelIndex,
    deckCoachLevel: 'SINGLE_DECK',
    coachItems: coachsArr,
  };
};

/**
 * Mapped place and coach information to place selection
 * @param place
 * @param placeId
 * @param deckIndex
 * @param coachIndex
 * @returns PlaceSelection
 */
export const mapPlaceInfosToPlaceSelection = (
  place: Place,
  placeId: string,
  deckIndex: number,
  coachIndex: number,
): PlaceSelection => {
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
 * @param placeId
 * @param deckIndex
 * @param coachIndex
 * @returns SeatReservationPlaceSelection
 */
export const mapPlaceAndCoachToSeatReservationPlaceSelection = (
  place: Place,
  coach: CoachItem,
  placeId: string,
  deckIndex: number,
  coachIndex: number,
): SeatReservationPlaceSelection => {
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
