// This helper file contains several functions related to accessing attributes for the connections.

import { JSX, h, Fragment } from '@stencil/core';
import { i18nWalkingDistanceArrival, i18nWalkingDistanceDeparture } from '../i18n';
import { extractTimeAndStringFromNoticeText } from '../../components/sbb-pearl-chain-time/sbb-pearl-chain-time.helper';
import { Leg, PtRideLeg, PtConnectionLeg } from '../interfaces';
import { isConnectionLeg, isRideLeg } from './timetable-helper';

interface IAccessAttribute {
  duration: number;
  text: string;
  icon: string;
}

/**
 * @returns the attribute of a ConnectionLeg
 */
function getPTConnectionAttribute(
  leg: PtRideLeg | PtConnectionLeg,
  connectionLegNotice: string[],
): IAccessAttribute | null {
  const connectionFirstLeg = isConnectionLeg(leg) ? (leg as PtConnectionLeg) : null;

  const connectionFirstLegNotice = connectionFirstLeg
    ? connectionFirstLeg?.notices?.filter((notice) => connectionLegNotice.includes(notice.name))[0]
    : null;

  return connectionFirstLegNotice
    ? {
        duration: connectionFirstLeg?.duration || 0,
        text: connectionFirstLegNotice?.text?.template || '',
        icon: 'walk-small',
      }
    : null;
}

/**
 * @returns the extended enter attribute of the PTRideLeg
 */
function getFirstExtendedLegAttribute(
  leg: PtRideLeg | PtConnectionLeg,
  departureWalk: number,
): IAccessAttribute | null {
  // Extended enter
  const extendedFirstLeg = isRideLeg(leg)
    ? (leg as PtRideLeg)?.serviceJourney?.notices?.filter((notice) =>
        ['CI'].includes(notice.name),
      )[0]
    : null;

  const extractTimeAndString =
    extendedFirstLeg && extractTimeAndStringFromNoticeText(extendedFirstLeg);

  return extendedFirstLeg
    ? {
        duration: (extractTimeAndString?.duration || 0) + (departureWalk || 0),
        text: extractTimeAndString?.text || '',
        icon: `sa-${extendedFirstLeg?.name?.toLowerCase()}`,
      }
    : null;
}

/**
 * @returns the extended exit attribute of the PTRideLeg
 */
function getLastExtendedLegAttribute(leg: Leg, arrivalWalk: number): IAccessAttribute | null {
  // Extended exit
  const extendedLastLeg = isRideLeg(leg)
    ? (leg as PtRideLeg)?.serviceJourney?.notices?.filter((notice) =>
        ['CO'].includes(notice.name),
      )[0]
    : null;

  const extractTimeAndString =
    extendedLastLeg && extractTimeAndStringFromNoticeText(extendedLastLeg);

  return extendedLastLeg
    ? {
        duration: (extractTimeAndString?.duration || 0) + (arrivalWalk || 0),
        text: extractTimeAndString?.text || '',
        icon: `sa-${extendedLastLeg?.name?.toLowerCase()}`,
      }
    : null;
}

/**
 * renders the extended exit/enter icon with the duration
 */
function renderTransferTime(
  duration: number | string,
  icon: string,
  currentLanguage: string,
  label?: string,
  type?: 'departure' | 'arrival',
): JSX.Element {
  return (
    <span class={`sbb-pearl-chain__time-transfer sbb-pearl-chain__time-transfer--${type}`}>
      <sbb-icon name={icon}></sbb-icon>
      <time dateTime={duration + 'M'}>
        <span class="sbb-screenreaderonly">
          {!label &&
            type &&
            (type === 'departure'
              ? i18nWalkingDistanceDeparture[currentLanguage]
              : i18nWalkingDistanceArrival[currentLanguage])}
          {label && <span>{label}</span>}&nbsp;
        </span>
        {duration}
        <span aria-hidden="true">'</span>
        <span class="sbb-screenreaderonly">min</span>
      </time>
    </span>
  );
}

/**
 * renders a walk-time icon with the walk duration
 */
function renderWalkTime(
  duration: number | string,
  label: string,
  variant: 'left' | 'right',
): JSX.Element {
  return (
    <span class={`sbb-pearl-chain__time-walktime sbb-pearl-chain__time-walktime--${variant}`}>
      <sbb-icon name="walk-small"></sbb-icon>
      <time dateTime={duration + 'M'}>
        <span class="sbb-screenreaderonly">{label}</span>
        {duration}
        <span aria-hidden="true">'</span>
      </time>
    </span>
  );
}

/**
 * @param legs: An array of Leg objects representing the journey legs.
 * @param departureWalk: The walking distance in minutes from the departure point to the first leg.
 * @param arrivalWalk: The walking distance in minutes from the last leg to the arrival point.
 * @param currentLanguage: The current language for localization.
 * @returns renderDepartureTimeAttribute: A function that renders the JSX element for the departure time attribute.
 * @returns renderArrivalTimeAttribute: A function that renders the JSX element for the arrival time attribute.
 * @returns arrivalTimeAttribute: The access attribute for the arrival time.
 * @returns departureTimeAttribute: The access attribute for the departure time.
 */
export function getDepartureArrivalTimeAttribute(
  legs: Leg[],
  departureWalk: number,
  arrivalWalk: number,
  currentLanguage: string,
): {
  renderDepartureTimeAttribute: () => JSX.Element;
  renderArrivalTimeAttribute: () => JSX.Element;
  departureTimeAttribute: IAccessAttribute | null;
  arrivalTimeAttribute: IAccessAttribute | null;
} {
  const connectionRideLeg =
    legs &&
    (legs.filter((leg) => isRideLeg(leg) || isConnectionLeg(leg))[0] as
      | PtRideLeg
      | PtConnectionLeg);

  const connectionLegNotice = ['YM', 'YB', 'Y', 'YT'];

  const connectionFirstLeg = getPTConnectionAttribute(connectionRideLeg, connectionLegNotice);
  const extendedFirstLeg = getFirstExtendedLegAttribute(connectionRideLeg, departureWalk);
  const departureWalkAttribute = departureWalk
    ? {
        text: i18nWalkingDistanceDeparture[currentLanguage],
        duration: departureWalk,
        icon: 'walk-small',
      }
    : null;

  const getDepartureType = (): IAccessAttribute | null => {
    if (connectionFirstLeg) {
      return connectionFirstLeg;
    } else if (departureWalkAttribute && !extendedFirstLeg && !connectionFirstLeg) {
      return departureWalkAttribute;
    } else if (extendedFirstLeg) {
      return extendedFirstLeg;
    } else {
      return null;
    }
  };

  function renderDepartureTimeAttribute(): JSX.Element {
    return (
      <Fragment>
        {connectionFirstLeg &&
          renderWalkTime(connectionFirstLeg.duration, connectionFirstLeg.text, 'left')}

        {departureWalkAttribute &&
          !extendedFirstLeg &&
          !connectionFirstLeg &&
          renderWalkTime(departureWalkAttribute.duration, departureWalkAttribute.text, 'left')}

        {extendedFirstLeg &&
          renderTransferTime(
            extendedFirstLeg.duration,
            extendedFirstLeg.icon,
            currentLanguage,
            extendedFirstLeg.text,
            'departure',
          )}
      </Fragment>
    );
  }

  const lastLeg = legs && legs[legs.length - 1];
  const lastConnectionRideLeg =
    (isConnectionLeg(lastLeg) || isRideLeg(lastLeg)) && (lastLeg as PtConnectionLeg | PtRideLeg);

  const connectionLastLeg =
    lastConnectionRideLeg && getPTConnectionAttribute(lastConnectionRideLeg, connectionLegNotice);
  const extendedLastLeg =
    lastConnectionRideLeg && getLastExtendedLegAttribute(lastConnectionRideLeg, arrivalWalk);
  const arrivalWalkAttribute = arrivalWalk
    ? {
        text: i18nWalkingDistanceArrival[currentLanguage],
        duration: arrivalWalk,
        icon: 'walk-small',
      }
    : null;

  const getArrivalType = (): IAccessAttribute | null => {
    if (connectionLastLeg) {
      return connectionLastLeg;
    } else if (arrivalWalkAttribute && !extendedLastLeg && !connectionLastLeg) {
      return arrivalWalkAttribute;
    } else if (extendedLastLeg) {
      return extendedLastLeg;
    } else {
      return null;
    }
  };

  function renderArrivalTimeAttribute(): JSX.Element {
    return (
      <Fragment>
        {connectionLastLeg &&
          renderWalkTime(connectionLastLeg.duration, connectionLastLeg.text, 'right')}

        {arrivalWalkAttribute &&
          !extendedLastLeg &&
          !connectionLastLeg &&
          renderWalkTime(arrivalWalkAttribute.duration, arrivalWalkAttribute.text, 'right')}

        {extendedLastLeg &&
          renderTransferTime(
            extendedLastLeg.duration,
            extendedLastLeg.icon,
            currentLanguage,
            extendedLastLeg.text,
            'arrival',
          )}
      </Fragment>
    );
  }

  return {
    renderDepartureTimeAttribute,
    renderArrivalTimeAttribute,
    departureTimeAttribute: getDepartureType(),
    arrivalTimeAttribute: getArrivalType(),
  };
}
