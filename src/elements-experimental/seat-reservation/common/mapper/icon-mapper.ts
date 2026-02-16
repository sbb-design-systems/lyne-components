import { svgs } from '../svgs.ts';

/**
 * Map Object from OSDM Code to SVG icon name represented in svg-icon
 * component regarding the namespace "fpl".
 */
export type SeatReservationIcon = {
  svgName?: string;
  svg?: string;
};

export const mapIconToSvg: Record<string, SeatReservationIcon> = {
  BICYCLE: { svgName: 'sa-vo' },
  BICYCLE_HIGH: { svgName: 'sa-vo' },
  BICYCLE_HIGH_ICON: { svgName: 'sa-vo' },
  BICYCLE_ICON: { svgName: 'sa-vo' },
  BICYCLE_LOW: { svgName: 'sa-vo' },
  BICYCLE_LOW_ICON: { svgName: 'sa-vo' },
  BICYCLE_MIDDLE: { svgName: 'sa-vo' },
  BICYCLE_MIDDLE_ICON: { svgName: 'sa-vo' },
  BISTRO: { svgName: 'sa-mi' },
  BISTRO_ICON: { svgName: 'sa-mi' },
  BUSINESS: { svgName: 'sa-bz' },
  BUSINESS_COMFORT: { svgName: 'sa-bz' },
  BUSINESS_ICON: { svgName: 'sa-bz' },
  COACH_BORDER_MIDDLE: { svg: svgs.chassisRowMiddle },
  COACH_WALL_NO_PASSAGE: { svg: svgs.chassisRowOuter },
  COACH_PASSAGE: { svg: svgs.chassisPassageWaggonTopLeft },
  COMPARTMENT_PASSAGE: { svg: svgs.chassisPassageCompartmentMiddle },
  COMPARTMENT_PASSAGE_HIGH: { svg: svgs.chassisPassageCompartmentLeftTop },
  COMPARTMENT_PASSAGE_LOW: { svg: svgs.chassisPassageCompartmentRightBottom },
  COMPARTMENT_WALL: { svg: svgs.chassisSeparator },
  DRIVER_AREA: { svg: svgs.chassisDriverTrain },
  DRIVER_AREA_BUS: { svg: svgs.chassisDriverBus },
  DRIVER_AREA_TRAIN: { svg: svgs.chassisDriverTrainFull },
  EASY_ACCESS: { svgName: 'sa-em' },
  EASY_ACCESS_AREA: { svgName: 'sa-em' },
  EASY_ACCESS_ICON: { svgName: 'sa-em' },
  ENTRY_EXIT: { svg: svgs.layoutEntrance },
  FAMILY: { svgName: 'sa-fa' },
  LUGGAGE_AREA: { svgName: 'sa-ga' },
  LUGGAGE_ICON: { svgName: 'sa-ga' },
  MULTI_FUNCTION_AREA: { svgName: 'sa-mf' },
  MULTI_FUNCTION_ICON: { svgName: 'sa-mf' },
  PLACE_BICYCLE_ALLOCATED: { svg: svgs.interiorPlaceBikeUnavailable },
  PLACE_BICYCLE_FREE: { svg: svgs.interiorPlaceBikeDefault },
  PLACE_BICYCLE_RESTRICTED: { svg: svgs.interiorPlaceBikeNotBookable },
  PLACE_BICYCLE_SELECTED: { svg: svgs.interiorPlaceBikeSelected },
  PLACE_SEAT_ALLOCATED: { svg: svgs.interiorPlaceSeatUnavailable },
  PLACE_SEAT_FREE: { svg: svgs.interiorPlaceSeatDefault },
  PLACE_SEAT_RESTRICTED: { svg: svgs.interiorPlaceSeatNotBookable },
  PLACE_SEAT_SELECTED: { svg: svgs.interiorPlaceSeatSelected },
  PLAYGROUND_AREA: { svgName: 'sa-fa' },
  PLAYGROUND_ICON: { svgName: 'sa-fa' },
  PRAM: { svgName: 'sa-abteilkinderwagen' },
  PRAM_AREA: { svgName: 'sa-abteilkinderwagen' },
  PRAM_ICON: { svgName: 'sa-abteilkinderwagen' },
  RESTAURANT: { svgName: 'sa-wr' },
  RESTAURANT_AREA: { svgName: 'sa-wr' },
  RESTAURANT_ICON: { svgName: 'sa-wr' },
  SILENCE: { svgName: 'sa-rz' },
  SILENCE_AREA_ICON: { svgName: 'sa-rz' },
  SILENCE_ICON: { svgName: 'sa-rz' },
  SKI_AREA: { svgName: 'sa-sa' },
  SKI_ICON: { svgName: 'sa-sa' },
  STAFF_AREA: { svgName: 'avatar-train-staff-medium' },
  STAIR_AREA: { svgName: 'sa-ac' },
  TOILET_AREA: { svgName: 'sa-wc' },
  TOILET_ICON: { svgName: 'sa-wc' },
  TOILET_WHEELCHAIR_AREA: { svgName: 'sa-rw' },
  TOILET_WHEELCHAIR_ICON: { svgName: 'sa-rw' },
  WARDROBE_AREA: { svgName: 'sa-ka' },
  WHEELCHAIR: { svgName: 'sa-rs' },
  WHEELCHAIR_AND_SEAT: { svgName: 'sa-rs' },
  WHEELCHAIR_ICON: { svgName: 'sa-rs' },
  WHEELCHAIR_NO_SEAT: { svgName: 'sa-rn' },
  WIFI: { svgName: 'sa-wv' },
};

/**
 * Current icons that could be supported, but not necessarily will be
 * Status: 14.05.2025
 *
 * GraphicElement:
 *       type: string
 *       enum:
 *         - EASY_ACCESS_AREA
 *         - LUGGAGE_AREA
 *         - MULTI_FUNCTION_AREA
 *         - PLAYGROUND_AREA
 *         - PRAM_AREA
 *         - RESTAURANT_AREA
 *         - SKI_AREA
 *         - STAFF_AREA
 *         - TOILET_AREA
 *         - TOILET_WHEELCHAIR_AREA
 *         - DRIVER_AREA_LEFT
 *         - DRIVER_AREA_RIGHT
 *         - ENTRY_EXIT
 *         - STAIR_AREA
 *         - TABLE
 *
 * AccommodationSubType:
 *       type: string
 *       enum:
 *         - BISTRO
 *         - BUSINESS
 *         - BUSINESS_COMFORT
 *         - CHILDREN_AREA
 *         - COMPARTMENT
 *         - EXCELLENCE
 *         - FAMILY
 *         - OPEN_SPACE
 *         - PANORAMA
 *         - PREMIUM
 *         - RESTAURANT
 *         - SILENCE
 *         - SALON
 *
 * PlaceProperty:
 *       type: string
 *       enum:
 *         - AISLE
 *         - AIR_CONDITIONED
 *         - BICYCLE
 *         - BICYCLE_LOW
 *         - BICYCLE_MIDDLE
 *         - BICYCLE_HIGH
 *         - EASY_ACCESS
 *         - FRONT_VIEW
 *         - MIDDLE_SEAT
 *         - NEAR_ANIMALS
 *         - NEAR_BICYCLE_AREA
 *         - NEAR_DINING
 *         - NEAR_PLAY_AREA
 *         - NEAR_WHEELCHAIR_AREA
 *         - PHONE
 *         - POWER
 *         - PRAM
 *         - PRAM_WITH_SEAT
 *         - SIDE_BY_SIDE
 *         - TANDEM
 *         - WHEELCHAIR
 *         - WHEELCHAIR_AND_SEAT
 *         - WHEELCHAIR_NO_SEAT
 *         - WIFI
 *         - WINDOW
 *         - WITH_ANIMALS
 *         - WITH_SMALL_CHILDREN
 *         - WITHOUT_ANIMALS
 *
 * ServiceIcon:
 *       type: string
 *       enum:
 *         - BICYCLE_ICON
 *         - BICYCLE_LOW_ICON
 *         - BICYCLE_MIDDLE_ICON
 *         - BICYCLE_HIGH_ICON
 *         - BISTRO_ICON
 *         - BUSINESS_ICON
 *         - CHILDREN_ICON
 *         - EASY_ACCESS_ICON
 *         - LUGGAGE_ICON
 *         - MULTI_FUNCTION_ICON
 *         - PLAYGROUND_ICON
 *         - PRAM_ICON
 *         - RESTAURANT_ICON
 *         - SILENCE_AREA_ICON
 *         - SKI_ICON
 *         - TOILET_ICON
 *         - TOILET_PRAM_ICON
 *         - TOILET_WHEELCHAIR_ICON
 *         - TROLLEY_ICON
 *         - WHEELCHAIR_ICON
 */
