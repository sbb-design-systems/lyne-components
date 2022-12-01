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

export const renderIconProduct = (transport: string, line?: string): JSX.Element => {
  const dashLine = line ? '-' + line : '';
  return (
    <sbb-icon class="sbb-timetable__row-transport" name={transport.toLowerCase() + dashLine} />
  );
};

export const renderStringProduct = (vehicleName: string, line: string): JSX.Element => {
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

  return situations
    ?.slice()
    ?.sort((a: PtSituation, b: PtSituation) => priorities[a?.cause] - priorities[b?.cause]);
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

export const getCus = (trip: Trip): string[] => {
  const cus = [];
  (trip?.summary.tripStatus?.cancelled || trip?.summary.tripStatus?.partiallyCancelled) &&
    cus.push('cancellation');
  !cus.length && !isReachable(trip?.legs) && cus.push('missed-connection');
  !cus.length && trip?.summary?.tripStatus?.alternative && cus.push('alternative');
  !cus.length && isRedirected(trip?.legs) && cus.push('reroute');
  !cus.length && isUnplannedStop(trip?.legs) && cus.push('add-stop');
  !cus.length &&
    (trip?.summary?.tripStatus?.delayed || trip?.summary?.tripStatus?.delayedUnknown) &&
    cus.push('delay');
  !cus.length && trip?.summary?.tripStatus?.quayChanged && cus.push('platform-change');

  return cus;
};

export const handleNotices = (notices: Notice[]): string[] => {
  const sortedNotices = [];
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

  notices?.some((notice) => notice.name === 'Z') && sortedNotices.push('sa-z');
  notices?.some((notice) => reservationNotice.includes(notice.name)) && sortedNotices.push('sa-rr');
  notices?.some((notice) => notice.name === 'SB') && sortedNotices.push('sa-sb');
  notices?.some((notice) => notice.name === 'SZ') && sortedNotices.push('sa-sz');
  notices?.some((notice) => notice.name === 'VR') && sortedNotices.push('sa-vr');
  notices?.some((notice) => notice.name === 'TG') && sortedNotices.push('sa-tg');

  return sortedNotices;
};
