import * as assets from '../assets/index.js';
import { MOCK_COACHES_RAW_0 } from '../seat-reservation-sample-data.js';
import type { CoachItem, PlaceTravelClass, SeatReservation } from '../seat-reservation.js';

/**
 * Map Object from OSDM Code to SVG
 */
export const mapCodeToSvg: Record<string, string> = {
  BISTRO: assets.serviceBistro,
  BUSINESS: assets.serviceBusiness,
  COMPARTMENT_PASSAGE: assets.chassisPassageCompartmentMiddle,
  COMPARTMENT_PASSAGE_HIGH: assets.chassisPassageCompartmentLeftTop,
  COMPARTMENT_PASSAGE_LOW: assets.chassisPassageCompartmentRightBottom,
  COACH_BORDER_OUTER: assets.chassisRowOuter,
  COACH_BORDER_MIDDLE: assets.chassisRowMiddle,
  COACH_PASSAGE: assets.chassisPassageWaggonTopLeft,
  DRIVER_AREA: assets.chassisDriverTrain,
  DRIVER_AREA_FULL: assets.chassisDriverTrainFull,
  EASY_ACCESS_AREA: assets.servicePrm,
  ENTRY_EXIT: assets.layoutEntrance,
  LUGGAGE_AREA: assets.serviceLuggage,
  MULTI_FUNCTION_AREA: assets.serviceMultifunction,
  PRAM_AREA: assets.servicePram,
  PRAM_ICON: assets.servicePram,
  PLACE_SEAT_FREE: assets.interiorPlaceSeatDefault,
  PLACE_SEAT_SELECTED: assets.interiorPlaceSeatSelected,
  PLACE_SEAT_RESTRICTED: assets.interiorPlaceSeatNotBookable,
  PLACE_SEAT_ALLOCATED: assets.interiorPlaceSeatUnavailable,
  PLACE_BICYCLE_FREE: assets.interiorPlaceBikeDefault,
  PLACE_BICYCLE_SELECTED: assets.interiorPlaceBikeSelected,
  PLACE_BICYCLE_RESTRICTED: assets.interiorPlaceBikeNotBookable,
  PLACE_BICYCLE_ALLOCATED: assets.interiorPlaceBikeUnavailable,
  PLAYGROUND_ICON: assets.serviceFamily,
  PLAYGROUND_AREA: assets.serviceFamily,
  TABLE: assets.interiorTableTest,
  TOILET_AREA: assets.serviceToilet,
  SKI_AREA: assets.layoutSki,
  SKI_ICON: assets.layoutSki,
  SILENCE_AREA_ICON: assets.serviceSilence,
  STAIR_AREA: assets.layoutStair,
  RESTAURANT_ICON: assets.serviceRestaurant,
  WHEELCHAIR_ICON: assets.serviceWheelchair,
  WHEELCHAIR_TOILET_AREA: assets.serviceToiletPrm,
  WIFI: assets.serviceWifi,
};

export const mapRawDataToSeatReservation = (): SeatReservation => {
  const coachsArr = MOCK_COACHES_RAW_0.map((coachDeckLayout) => {
    const choachLayout = coachDeckLayout?.coachDeckLayout;
    const coachTravelClasses: PlaceTravelClass[] = [];
    const places = choachLayout.placeGroups
      .map((placeGroup: any) => {
        //Collect unique travel classes for coach
        if (coachTravelClasses.indexOf(placeGroup.travelClass) === -1) {
          coachTravelClasses.push(placeGroup.travelClass);
        }

        return placeGroup.places?.map((place: any) => {
          return {
            number: place?.number,
            state: 'FREE',
            type: placeGroup.accommodationSubType.indexOf('SEAT') > -1 ? 'SEAT' : 'BICYCLE',
            dimension: { w: place.rectangle.dimension.width, h: place.rectangle.dimension.height },
            position: {
              x: place.rectangle.position.x,
              y: place.rectangle.position.y,
              z: place.rectangle.position.z,
            },
            rotation: place?.orientation || 0,
            travelClass: placeGroup?.travelClass,
            remarkId: '',
            propertyIds: place?.propertyIds,
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
      dimension: { w: choachLayout.dimension.width, h: choachLayout.dimension.height },
      places: places,
      signs: signs,
      graphicElements: graphicalElements,
      travelClass: coachTravelClasses,
    } as CoachItem;
  });

  return {
    vehicleType: 'TRAIN',
    deckCoachIndex: 0,
    coachItems: coachsArr,
  };
};
