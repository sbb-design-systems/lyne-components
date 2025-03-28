import type {
  CoachItem,
  PlaceTravelClass,
  SeatReservation,
  VehicleType,
} from '../seat-reservation.js';

import { MOCK_COACHES_RAW_0, MOCK_COACHES_RAW_1 } from './seat-reservation-sample-data.js';
import { svgs } from './svgs.js';

/**
 * Map Object from OSDM Code to SVG
 */
export const mapCodeToSvg: Record<string, string> = {
  BISTRO: svgs.serviceBistro,
  BUSINESS: svgs.serviceBusiness,
  COMPARTMENT_PASSAGE: svgs.chassisPassageCompartmentMiddle,
  COMPARTMENT_PASSAGE_HIGH: svgs.chassisPassageCompartmentLeftTop,
  COMPARTMENT_PASSAGE_LOW: svgs.chassisPassageCompartmentRightBottom,
  COACH_BORDER_OUTER: svgs.chassisRowOuter,
  COACH_BORDER_MIDDLE: svgs.chassisRowMiddle,
  COACH_PASSAGE: svgs.chassisPassageWaggonTopLeft,
  DRIVER_AREA: svgs.chassisDriverTrain,
  DRIVER_AREA_FULL_TRAIN: svgs.chassisDriverTrainFull,
  DRIVER_AREA_FULL_BUS: svgs.chassisDriverBus,
  EASY_ACCESS_AREA: svgs.servicePrm,
  ENTRY_EXIT: svgs.layoutEntrance,
  LUGGAGE_AREA: svgs.serviceLuggage,
  MULTI_FUNCTION_AREA: svgs.serviceMultifunction,
  PRAM_AREA: svgs.servicePram,
  PRAM_ICON: svgs.servicePram,
  PLACE_SEAT_FREE: svgs.interiorPlaceSeatDefault,
  PLACE_SEAT_SELECTED: svgs.interiorPlaceSeatSelected,
  PLACE_SEAT_RESTRICTED: svgs.interiorPlaceSeatNotBookable,
  PLACE_SEAT_ALLOCATED: svgs.interiorPlaceSeatUnavailable,
  PLACE_BICYCLE_FREE: svgs.interiorPlaceBikeDefault,
  PLACE_BICYCLE_SELECTED: svgs.interiorPlaceBikeSelected,
  PLACE_BICYCLE_RESTRICTED: svgs.interiorPlaceBikeNotBookable,
  PLACE_BICYCLE_ALLOCATED: svgs.interiorPlaceBikeUnavailable,
  PLAYGROUND_ICON: svgs.serviceFamily,
  PLAYGROUND_AREA: svgs.serviceFamily,
  TABLE: svgs.interiorTableTest,
  TOILET_AREA: svgs.serviceToilet,
  SKI_AREA: svgs.layoutSki,
  SKI_ICON: svgs.layoutSki,
  SILENCE_AREA_ICON: svgs.serviceSilence,
  STAIR_AREA: svgs.layoutStair,
  RESTAURANT_ICON: svgs.serviceRestaurant,
  WHEELCHAIR_ICON: svgs.serviceWheelchair,
  WHEELCHAIR_TOILET_AREA: svgs.serviceToiletPrm,
  WIFI: svgs.serviceWifi,
};

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

        //Collect unique properties for coach
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
