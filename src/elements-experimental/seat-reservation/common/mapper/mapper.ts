import type {
  CoachItem,
  Place,
  PlaceSelection,
  PlaceTravelClass,
  SeatReservation,
  SeatReservationCoachSelection,
  SeatReservationPlaceSelection,
  VehicleType,
} from '../../seat-reservation.js';

import { MOCK_COACHES_RAW_0, MOCK_COACHES_RAW_1 } from './seat-reservation-sample-data.js';

/**
 * Map function that converts the RAW OSDM mock data into SeatReservation
 */
export const mapRawDataToSeatReservation = (vehicleType: VehicleType): SeatReservation => {
  const MOCK_DATA = vehicleType === 'TRAIN' ? MOCK_COACHES_RAW_0 : MOCK_COACHES_RAW_1;
  const coachsArr = MOCK_DATA.map((coachDeckLayout) => {
    const choachLayout = coachDeckLayout?.coachDeckLayout;
    const coachTravelClasses: PlaceTravelClass[] = [];
    const coachPropertyIds: string[] = [];
    const places = choachLayout.placeGroups
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
            remarkId: '',
            propertyIds: place.placeProperties || [],
            selected: false,
          };
        });
      })
      .flat();

    const signs = choachLayout.serviceIcons.map((serviceIcon) => {
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

    const graphicalElements = choachLayout.graphicElements.map((element) => {
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
      id: choachLayout?.id,
      number: choachLayout?.name,
      dimension: { w: choachLayout.dimension?.width, h: choachLayout.dimension?.height },
      places: places,
      serviceElements: signs,
      graphicElements: graphicalElements,
      travelClass: coachTravelClasses,
      propertyIds: coachPropertyIds,
    } as CoachItem;
  });

  return {
    vehicleType: vehicleType,
    deckCoachIndex: 0,
    coachItems: coachsArr,
  };
};

/**
 * Mapped place and coach informations to place selection
 * @param place
 * @param coachIndex
 * @returns PlaceSelection
 */
export const mapPlaceInfosToPlaceSelection = (place: Place, coachIndex: number): PlaceSelection => {
  const placeId = 'seat-reservation__place-button-' + coachIndex + '-' + place.number;
  return {
    id: placeId,
    number: place.number,
    coachIndex: coachIndex,
    state: place.state,
  };
};

/**
 * Mapped informations from place, coach and the coachiondex  to the seatReaservationPlaceSelection.
 * This Object information is emitted outwards
 * @param place
 * @param CoachItem
 * @param coachIndex
 * @returns SeatReservationPlaceSelection
 */
export const mapPlaceAndCoachToSeatReservationPlaceSelection = (
  place: Place,
  coach: CoachItem,
  coachIndex: number,
): SeatReservationPlaceSelection => {
  const placeId = 'seat-reservation__place-button-' + coachIndex + '-' + place.number;
  return {
    id: placeId,
    coachId: coach.id,
    coachNumber: coach.number,
    coachIndex: coachIndex,
    placeNumber: place.number,
    placeType: place.type,
    placeTravelClass: place.travelClass || 'ANY_CLASS',
    propertyIds: place.propertyIds || [],
  };
};

/**
 * Mapped coach informations to coach selection
 * @param place
 * @param coachIndex
 * @returns PlaceSelection
 */
export const mapCoachInfosToCoachSelection = (
  coachIndex: number,
  coach: CoachItem,
): SeatReservationCoachSelection => {
  return {
    coachId: coach.id,
    coachNumber: coach.number,
    coachIndex: coachIndex,
    coachType: coach?.type,
    coachTravelClass: coach?.travelClass,
    coachPropertyIds: coach?.propertyIds,
  };
};
