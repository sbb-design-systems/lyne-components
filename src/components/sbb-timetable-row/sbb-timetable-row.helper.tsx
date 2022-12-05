'use strict';

import { h, JSX } from '@stencil/core';
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  subHours,
  addMinutes,
  subDays,
} from 'date-fns';
import getDocumentLang from '../../global/helpers/get-document-lang';
import { i18nDurationMinute, i18nDurationHour } from '../../global/i18n';
import { PTRideLeg } from '../../global/interfaces/pearl-chain-properties';
import { Notice, PtSituation, Trip, VehicleModeEnum } from './sbb-timetable-row.custom';

export const durationToTime = (duration: number): string => {
  const result = [];
  const now = 0;
  let future = addMinutes(now, duration);

  const days = differenceInDays(future, now);
  if (days > 0) {
    result.push(`${days} d`);
    future = subDays(future, days);
  }

  const hours = differenceInHours(future, now);
  if (hours > 0) {
    result.push(`${hours} ${i18nDurationHour.multiple.short[getDocumentLang()]}`);
    future = subHours(future, hours);
  }

  const minutes = differenceInMinutes(future, now);
  if (minutes > 0) {
    result.push(`${minutes} ${i18nDurationMinute.multiple.short[getDocumentLang()]}`);
  }

  return result.join(' ');
};

export const getTransportIcon = (vehicleMode: VehicleModeEnum): string => {
  switch (vehicleMode) {
    case 'BUS':
      return 'bus';
    case 'CABLEWAY':
      return 'luftseilbahn';
    case 'CHAIRLIFT':
      return 'sessellift';
    case 'COG_RAILWAY':
      return 'zahnradbahn';
    case 'GONDOLA':
      return 'gondelbahn';
    case 'METRO':
      return 'metro';
    case 'PLANE':
      return 'flugzeug';
    case 'SHIP':
      return 'schiff';
    case 'TAXI':
      return 'taxi';
    case 'TRAIN':
      return 'zug';
    case 'TRAMWAY':
      return 'tram';
    default:
      return '';
  }
};

export const isProductIcon = (transport: string): boolean => {
  const possibleTransportTypes = [
    'bex',
    'cnl',
    'ec',
    'en',
    'gex',
    'ic',
    'ice',
    'icn',
    'ir',
    'nj',
    'ogv',
    'pe',
    're',
    'rj',
    'rjx',
    'rx',
    'sn',
    'rgv',
    'vae',
  ];

  return possibleTransportTypes.includes(transport);
};

export const renderIconProduct = (transport: string, line?: string | null): JSX.Element => {
  const dashLine = line ? '-' + line : '';

  return (
    <sbb-icon class="sbb-timetable__row-transport" name={transport.toLowerCase() + dashLine} />
  );
};

export const renderStringProduct = (vehicleName: string, line?: string | null): JSX.Element => {
  return (
    <span class="sbb-timetable__row-transportnumber">
      {line !== null ? vehicleName + ' ' + line : vehicleName}
    </span>
  );
};

const isReachable = (legs: PTRideLeg[]): boolean => {
  return legs?.some((leg) => leg.serviceJourney?.serviceAlteration?.reachable === true);
};

const isRedirected = (legs: PTRideLeg[]): boolean => {
  return legs?.some((leg) => leg.serviceJourney?.serviceAlteration?.redirected === true);
};

const isUnplannedStop = (legs: PTRideLeg[]): boolean => {
  return legs?.some(
    (leg) => !!leg.serviceJourney?.serviceAlteration?.unplannedStopPointsText === true
  );
};

export const sortSituation = (situations: PtSituation[]): PtSituation[] => {
  const priorities = {
    DISTURBANCE: 0,
    INFORMATION: 1,
    DELAY: 2,
    TRAIN_REPLACEMENT_BY_BUS: 3,
    CONSTRUCTION_SITE: 4,
    END_MESSAGE: 5,
  };

  return [...situations]?.sort(
    (a: PtSituation, b: PtSituation) => priorities[a.cause] - priorities[b.cause]
  );
};

export const getHimIcon = (situation: PtSituation): string => {
  switch (situation?.cause) {
    case 'DISTURBANCE':
      return 'disruption';
    case 'INFORMATION':
      return 'info';
    case 'DELAY':
      return 'delay';
    case 'TRAIN_REPLACEMENT_BY_BUS':
      return 'replacementbus';
    case 'CONSTRUCTION_SITE':
      return 'construction';
    default:
      return 'info';
  }
};

export const getCus = (trip: Trip): string => {
  const { legs, summary } = trip;
  const { tripStatus } = summary || {};
  if (tripStatus?.cancelled || tripStatus?.partiallyCancelled) return 'cancellation';
  if (!isReachable(legs)) return 'missed-connection';
  if (tripStatus?.alternative) return 'alternative';
  if (isRedirected(legs)) return 'reroute';
  if (isUnplannedStop(legs)) return 'add-stop';
  if (tripStatus?.delayed || tripStatus?.delayedUnknown) return 'delay';
  if (tripStatus?.quayChanged) return 'platform-change';

  return '';
};

export const handleNotices = (notices: Notice[]): string[] => {
  const reservationNotice = [
    'RR',
    'RK',
    'RC',
    'RL',
    'RM',
    'RN',
    'RS',
    'RT',
    'RU',
    'XP',
    'XR',
    'XT',
    'R',
    'RB',
  ];

  const names = notices.map((item) => item.name);

  const priority: [string, (names: string[]) => boolean][] = [
    ['sa-z', (names) => names.includes('Z')],
    ['sa-rr', (names) => names.some((n) => reservationNotice.includes(n))],
    ['sa-sb', (names) => names.includes('SB')],
    ['sa-sz', (names) => names.includes('SZ')],
    ['sa-vr', (names) => names.includes('VR')],
    ['sa-tg', (names) => names.includes('TG')],
  ];

  return priority.reduce((arr, item) => {
    return item[1](names) ? [...arr, item[0]] : arr;
  }, [] as string[]);
};
