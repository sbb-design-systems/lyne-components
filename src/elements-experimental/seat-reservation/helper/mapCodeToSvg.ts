import * as assets from '../assets/index.js';

/**
 * Map Object from OSDM Code to SVG
 */
export const mapCodeToSvg: Record<string, string> = {
  BISTRO: assets.serviceBistro,
  BUSINESS: assets.serviceBusiness,
  COMPARTMENT_PASSAGE: assets.chassisPassageCompartmentMiddle,
  COMPARTMENT_PASSAGE_HIGH: assets.chassisPassageCompartmentLeftTop,
  COMPARTMENT_PASSAGE_LOW: assets.chassisPassageCompartmentRightBottom,
  COACH_PASSAGE: assets.chassisPassageWaggonTopLeft,
  DRIVER_AREA: assets.chassisDriverTrain,
  EASY_ACCESS_AREA: assets.servicePrm,
  LUGGAGE_AREA: assets.serviceLuggage,
  MULTI_FUNCTION_AREA: assets.serviceMultifunction,
  PRAM_AREA: assets.servicePram,
  PRAM_ICON: assets.servicePram,
  PLACE_SEAT_FREE: assets.interiorPlaceSeatDefault,
  PLACE_SEAT_SELECTED: assets.interiorPlaceSeatSelected,
  PLACE_SEAT_RESTRICTED: assets.interiorPlaceSeatNotBookable,
  PLACE_SEAT_ALLOCATED: assets.interiorPlaceSeatUnavailable,
  PLACE_BIKE_FREE: assets.interiorPlaceSeatDefault,
  PLACE_BIKE_SELECTED: assets.interiorPlaceBikeSelected,
  PLACE_BIKE_RESTRICTED: assets.interiorPlaceBikeUnavailableNotBookable,
  PLACE_BIKE_ALLOCATED: assets.interiorPlaceBikeUnavailableNotBookable,
  PLAYGROUND_ICON: assets.serviceFamily,
  PLAYGROUND_AREA: assets.serviceFamily,
  TABLE: assets.interiorTableTest,
  TOILET_AREA: assets.serviceToilet,
  SKI_AREA: assets.layoutSki,
  SKI_ICON: assets.layoutSki,
  SILENCE_AREA_ICON: assets.serviceSilence,
  STAIR_AREA: assets.layoutStair,
  RESTAURANT_ICON: assets.serviceRestaurant,
  WHEELCHAIR: assets.serviceWheelchair,
  WHEELCHAIR_TOILET_AREA: assets.serviceToiletPrm,
  WIFI: assets.serviceWifi,
};
