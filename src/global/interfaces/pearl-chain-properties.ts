import type { DeepExtractTypeSkipArrays } from 'ts-deep-extract-types';

/* eslint-disable @typescript-eslint/naming-convention */
export interface ScheduledStopPointDetail {
  /** delay at arrival/departure (in minutes) */
  delay: number;
  /** True if platform change (de:Gleis-/Kante-/Steg-Änderung) */
  quayChanged?: boolean | null;
  /** A Quay (or platform or track) for any means of transport-mode / VehicleMode (train, bus, boat, etc.). */
  quayRtName?: string | null;
  /**
   * A Quay (or platform or track) for any means of transport-mode / VehicleMode (train, bus, boat, etc.).
   * Planed quay.
   */
  quayAimedName?: string;
  /** planned arrival/departure time */
  time: string;
}

export interface ServiceAlteration {
  /** If (partially) cancelled, enduser cancellation info. */
  cancelledText?: string;
  /** true: Journey is (partially) cancelled (default=false) */
  cancelled: boolean;
  /**
   * Enduser text, saying whether there is a delay on PTRideLeg (referring to first/last Stop).
   *
   */
  delayText: string;

  /** true: journey is redirected */
  redirected: boolean;
  redirectedFormatted?: string;
  redirectedText: string;

  /**
   * true: transport-product change from PTRideLeg to PTRideLeg is reachable
   * (de: Anschluss kann gehalten werden, see Trip::valid);
   * false: de:nicht mehr erreichbare Fahrt
   *
   */
  reachable: boolean;
  reachableText?: string;

  /** Text intended for passengers about an additional non-planned stop at a station */
  unplannedStopPointsText?: string;
}

/** Text template with optional formattable parameters. Useful to represent in UIs as clickable features like an e-Mail, phone or URL. */
export type LinkedText = {
  /** End-user text. */
  template?: string;
};

/** vehicle journeys stop point state */
export type StopStatusEnum =
  | 'BEGIN_PARTIAL_CANCELLATION'
  | 'CANCELLED'
  | 'END_PARTIAL_CANCELLATION'
  | 'NOT_SERVICED'
  | 'PLANNED'
  | 'UNPLANNED';

/** Stop point on a vehicle journey */
export interface ScheduledStopPoint {
  stopStatus?: StopStatusEnum;
}

export enum BoardingAlightingAccessibilityEnum {
  BOARDING_ALIGHTING_BY_CREW = 'BOARDING_ALIGHTING_BY_CREW',
  BOARDING_ALIGHTING_BY_NOTIFICATION = 'BOARDING_ALIGHTING_BY_NOTIFICATION',
  BOARDING_ALIGHTING_NOT_POSSIBLE = 'BOARDING_ALIGHTING_NOT_POSSIBLE',
  BOARDING_ALIGHTING_SELF = 'BOARDING_ALIGHTING_SELF',
}

export enum PtSituationCauseEnum {
  CONSTRUCTION_SITE = 'CONSTRUCTION_SITE',
  DELAY = 'DELAY',
  DISTURBANCE = 'DISTURBANCE',
  END_MESSAGE = 'END_MESSAGE',
  INFORMATION = 'INFORMATION',
  TRAIN_REPLACEMENT_BY_BUS = 'TRAIN_REPLACEMENT_BY_BUS',
}
export enum OccupancyEnum {
  HIGH = 'HIGH',
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  UNKNOWN = 'UNKNOWN',
}

/** Type of Notice */
export enum NoticeTypeEnum {
  ATTRIBUTE = 'ATTRIBUTE',
  INFO = 'INFO',
}

export enum TextArgumentEnum {
  EMAIL = 'EMAIL',
  PHONE = 'PHONE',
  URL = 'URL',
}

/** key-value pair. Key is one of: (EMAIL,PHONE,URL) */
export type TextArgument = {
  __typename?: 'TextArgument';
  type?: TextArgumentEnum;
  values: string[];
};

/** Mode of public transportation */
export enum VehicleModeEnum {
  BUS = 'BUS',
  CABLEWAY = 'CABLEWAY',
  CHAIRLIFT = 'CHAIRLIFT',
  COG_RAILWAY = 'COG_RAILWAY',
  ELEVATOR = 'ELEVATOR',
  GONDOLA = 'GONDOLA',
  METRO = 'METRO',
  PLANE = 'PLANE',
  SHIP = 'SHIP',
  TAXI = 'TAXI',
  TRAIN = 'TRAIN',
  TRAMWAY = 'TRAMWAY',
  UNKNOWN = 'UNKNOWN',
}

export type GetTripsQuery = {
  __typename?: 'TripResponse';
  trips: {
    __typename?: 'Trip';
    id: string;
    valid: boolean;
    searchHint?: string | null;
    legs: (
      | {
          __typename: 'AccessLeg';
          duration?: any | null;
          distance?: any | null;
          id: string;
          start?:
            | { __typename?: 'Address'; id: string; name: string }
            | { __typename?: 'PointOfInterest'; id: string; name: string }
            | { __typename?: 'StopPlace'; id: string; name: string }
            | null;
          end?:
            | { __typename?: 'Address'; id: string; name: string }
            | { __typename?: 'PointOfInterest'; id: string; name: string }
            | { __typename?: 'StopPlace'; id: string; name: string }
            | null;
        }
      | { __typename: 'AlternativeModeLeg'; mode: string; duration?: any | null; id: string }
      | {
          __typename: 'PTConnectionLeg';
          duration?: any | null;
          id: string;
          start?: { __typename?: 'StopPlace'; name: string } | null;
          end?: { __typename?: 'StopPlace'; name: string } | null;
          notices: {
            __typename?: 'Notice';
            name: string;
            type: NoticeTypeEnum;
            priority: number;
            text?: {
              __typename?: 'LinkedText';
              template?: string | null;
              arguments: {
                __typename?: 'TextArgument';
                type?: TextArgumentEnum | null;
                values: string[];
              }[];
            } | null;
          }[];
        }
      | {
          __typename: 'PTRideLeg';
          duration?: any | null;
          id: string;
          start?:
            | { __typename?: 'Address'; id: string; name: string }
            | { __typename?: 'PointOfInterest'; id: string; name: string }
            | { __typename?: 'StopPlace'; id: string; name: string }
            | null;
          end?:
            | { __typename?: 'Address'; id: string; name: string }
            | { __typename?: 'PointOfInterest'; id: string; name: string }
            | { __typename?: 'StopPlace'; id: string; name: string }
            | null;
          arrival: {
            __typename?: 'ScheduledStopPointDetail';
            time: string;
            delay: any;
            delayText?: string | null;
            quayAimedName?: string | null;
            quayRtName?: string | null;
            quayChanged: boolean;
            quayChangedText?: string | null;
          };
          departure: {
            __typename?: 'ScheduledStopPointDetail';
            time: string;
            delay: any;
            delayText?: string | null;
            quayAimedName?: string | null;
            quayRtName?: string | null;
            quayChanged: boolean;
            quayChangedText?: string | null;
          };
          serviceJourney: {
            __typename?: 'ServiceJourney';
            id: string;
            direction?: string | null;
            quayTypeName?: string | null;
            quayTypeShortName?: string | null;
            stopPoints: {
              __typename?: 'ScheduledStopPoint';
              stopStatus?: StopStatusEnum | null;
              stopStatusFormatted?: string | null;
              place: { __typename?: 'StopPlace'; id: string; name: string };
              occupancy: {
                __typename?: 'Occupancy';
                firstClass?: OccupancyEnum | null;
                secondClass?: OccupancyEnum | null;
              };
              accessibilityBoardingAlighting?: {
                __typename?: 'AccessibilityBoardingAlighting';
                limitation?: BoardingAlightingAccessibilityEnum | null;
                name?: string | null;
                description?: string | null;
                assistanceService?: {
                  __typename?: 'LinkedText';
                  template?: string | null;
                  arguments: {
                    __typename?: 'TextArgument';
                    type?: TextArgumentEnum | null;
                    values: string[];
                  }[];
                } | null;
              } | null;
            }[];
            serviceProducts: {
              __typename?: 'ServiceProduct';
              name: string;
              line?: string | null;
              number?: string | null;
              vehicleMode: VehicleModeEnum;
              vehicleSubModeShortName?: string | null;
              corporateIdentityIcon?: string | null;
              routeIndexFrom?: number | null;
              routeIndexTo?: number | null;
            }[];
            serviceAlteration: {
              __typename?: 'ServiceAlteration';
              cancelled: boolean;
              cancelledText?: string | null;
              partiallyCancelled: boolean;
              partiallyCancelledText?: string | null;
              redirected: boolean;
              redirectedText?: string | null;
              reachable: boolean;
              reachableText?: string | null;
              delayText?: string | null;
              unplannedStopPointsText?: string | null;
              quayChangedText?: string | null;
            };
            situations: {
              __typename?: 'PTSituation';
              cause?: PtSituationCauseEnum | null;
              affectedStopPointFromIdx?: number | null;
              affectedStopPointToIdx?: number | null;
              broadcastMessages: {
                __typename?: 'PTSituationMessage';
                id: string;
                priority: number;
                title: string;
                detail: string;
                detailShort?: string | null;
                distributionPeriod?: {
                  __typename?: 'PublicationWindow';
                  startDate?: string | null;
                  endDate?: string | null;
                } | null;
              }[];
            }[];
            notices: {
              __typename?: 'Notice';
              name: string;
              type: NoticeTypeEnum;
              priority: number;
              text?: {
                __typename?: 'LinkedText';
                template?: string | null;
                arguments: {
                  __typename?: 'TextArgument';
                  type?: TextArgumentEnum | null;
                  values: string[];
                }[];
              } | null;
            }[];
          };
        }
    )[];
    situations: {
      __typename?: 'PTSituation';
      cause?: PtSituationCauseEnum | null;
      affectedStopPointFromIdx?: number | null;
      affectedStopPointToIdx?: number | null;
      broadcastMessages: {
        __typename?: 'PTSituationMessage';
        id: string;
        priority: number;
        title: string;
        detail: string;
      }[];
    }[];
    notices: {
      __typename?: 'Notice';
      name: string;
      type: NoticeTypeEnum;
      priority: number;
      text?: {
        __typename?: 'LinkedText';
        template?: string | null;
        arguments: {
          __typename?: 'TextArgument';
          type?: TextArgumentEnum | null;
          values: string[];
        }[];
      } | null;
    }[];
    summary?: {
      __typename?: 'TripSummary';
      duration: any;
      arrivalWalk: any;
      departureWalk: any;
      direction?: string | null;
      boardingAlightingAccessibility?: BoardingAlightingAccessibilityEnum | null;
      arrival?: {
        __typename?: 'ScheduledStopPointDetail';
        time: string;
        delay: any;
        delayText?: string | null;
        quayAimedName?: string | null;
        quayRtName?: string | null;
        quayChanged: boolean;
        quayChangedText?: string | null;
      } | null;
      tripStatus: {
        __typename?: 'TripStatus';
        alternative: boolean;
        alternativeText?: string | null;
        cancelledText?: string | null;
        cancelled: boolean;
        partiallyCancelled: boolean;
        delayed: boolean;
        delayedUnknown: boolean;
        quayChanged: boolean;
      };
      departure?: {
        __typename?: 'ScheduledStopPointDetail';
        time: string;
        delay: any;
        delayText?: string | null;
        quayAimedName?: string | null;
        quayRtName?: string | null;
        quayChanged: boolean;
        quayChangedText?: string | null;
      } | null;
      product?: {
        __typename?: 'ServiceProduct';
        name: string;
        line?: string | null;
        number?: string | null;
        vehicleMode: VehicleModeEnum;
        vehicleSubModeShortName?: string | null;
        corporateIdentityIcon?: string | null;
      } | null;
      occupancy: {
        __typename?: 'Occupancy';
        firstClass?: OccupancyEnum | null;
        secondClass?: OccupancyEnum | null;
      };
    } | null;
  };
};

export type ITripItem = DeepExtractTypeSkipArrays<GetTripsQuery, ['trips']>;
export type Leg = DeepExtractTypeSkipArrays<ITripItem, ['legs']>;

export type PTRideLeg = Extract<Leg, { __typename: 'PTRideLeg' }>;
export type PTConnectionLeg = Extract<Leg, { __typename: 'PTConnectionLeg' }>;
export type ServiceJourney = DeepExtractTypeSkipArrays<PTRideLeg, ['serviceJourney']>;
export type PTSituation = DeepExtractTypeSkipArrays<ServiceJourney, ['situations']>;
export type Notice = DeepExtractTypeSkipArrays<ITripItem, ['notices']>;

export const isRideLeg = (leg: any): leg is Extract<Leg, { __typename: 'PTRideLeg' }> => {
  return leg?.__typename === 'PTRideLeg';
};

export const isConnectionLeg = (
  leg: any
): leg is Extract<Leg, { __typename: 'PTConnectionLeg' }> => {
  return leg?.__typename === 'PTConnectionLeg';
};
