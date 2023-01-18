import { h, JSX } from '@stencil/core';
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  addMinutes,
  subHours,
  subDays,
} from 'date-fns';
import getDocumentLang from '../../global/helpers/get-document-lang';
import { i18nDurationMinute, i18nDurationHour } from '../../global/i18n';
import { PtRideLeg } from '../../global/interfaces/pearl-chain-properties';
import { HimCus, Notice, PtSituation, Trip, VehicleModeEnum } from './sbb-timetable-row.custom';

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
      return 'bus-right';
    case 'CABLEWAY':
      return 'standseilbahn-right';
    case 'CHAIRLIFT':
      return 'sessellift-right';
    case 'COG_RAILWAY':
      return 'zahnradbahn-right';
    case 'GONDOLA':
      return 'gondelbahn-right';
    case 'METRO':
      return 'metro-right';
    case 'PLANE':
      return 'flugzeug-right';
    case 'SHIP':
      return 'schiff-right';
    case 'TAXI':
      return 'taxi-right';
    case 'TRAIN':
      return 'zug-right';
    case 'TRAMWAY':
      return 'tram-right';
    case 'ELEVATOR':
      return 'lift';
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
    'tgv',
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

const isReachable = (legs: PtRideLeg[]): boolean => {
  return legs?.some((leg) => leg.serviceJourney?.serviceAlteration?.reachable === true);
};

const getReachableText = (legs: PtRideLeg[]): string => {
  return legs.find((leg) => leg.serviceJourney?.serviceAlteration?.reachableText !== '')
    .serviceJourney?.serviceAlteration?.reachableText;
};

const isRedirected = (legs: PtRideLeg[]): boolean => {
  return legs?.some((leg) => leg.serviceJourney?.serviceAlteration?.redirected === true);
};

const getRedirectedText = (legs: PtRideLeg[]): string => {
  return legs.find((leg) => leg.serviceJourney?.serviceAlteration?.redirectedText !== '')
    .serviceJourney?.serviceAlteration?.redirectedText;
};

const getUnplannedStop = (legs: PtRideLeg[]): string => {
  return legs.find((leg) => leg.serviceJourney?.serviceAlteration?.unplannedStopPointsText !== '')
    ?.serviceJourney?.serviceAlteration?.unplannedStopPointsText;
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

export const getHimIcon = (situation: PtSituation): HimCus => {
  switch (situation?.cause) {
    case 'DISTURBANCE':
      return {
        name: 'disruption',
        text: situation?.broadcastMessages ? situation?.broadcastMessages[0].title : '',
      };
    case 'INFORMATION':
      return {
        name: 'info',
        text: situation?.broadcastMessages ? situation?.broadcastMessages[0].title : '',
      };
    case 'DELAY':
      return {
        name: 'delay',
        text: situation?.broadcastMessages ? situation?.broadcastMessages[0].title : '',
      };
    case 'TRAIN_REPLACEMENT_BY_BUS':
      return {
        name: 'replacementbus',
        text: situation?.broadcastMessages ? situation?.broadcastMessages[0].title : '',
      };
    case 'CONSTRUCTION_SITE':
      return {
        name: 'construction',
        text: situation?.broadcastMessages ? situation?.broadcastMessages[0].title : '',
      };
    default:
      return {
        name: 'info',
        text: situation?.broadcastMessages ? situation?.broadcastMessages[0].title : '',
      };
  }
};

export const getCus = (trip: Trip): HimCus => {
  const { legs, summary } = trip;
  const { tripStatus } = summary || {};

  if (tripStatus?.cancelled || tripStatus?.partiallyCancelled)
    return { name: 'cancellation', text: tripStatus?.cancelledText };
  if (!isReachable(legs)) return { name: 'missed-connection', text: getReachableText(legs) };
  if (tripStatus?.alternative) return { name: 'alternative', text: tripStatus.alternativeText };
  if (isRedirected(legs)) return { name: 'reroute', text: getRedirectedText(legs) };
  if (getUnplannedStop(legs)) return { name: 'add-stop', text: getUnplannedStop(legs) };
  if (tripStatus?.delayed || tripStatus?.delayedUnknown) return { name: 'delay', text: '' };
  if (tripStatus?.quayChanged) return { name: 'platform-change', text: '' };

  return {} as HimCus;
};

const findAndReplaceNotice = (notices: Notice[]): Notice | undefined => {
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
  ];

  return notices.reduce((foundNotice, notice) => {
    if (foundNotice) return foundNotice;
    if (reservationNotice.includes(notice.name)) {
      return {
        name: 'RR',
        text: notice.text?.template,
      } as Notice;
    }
  }, undefined);
};

export const filterNotices = (notices: Notice[]): Notice[] => {
  const allowedNames = ['Z', 'SB', 'SZ', 'VR', 'TG'];

  const filterNotice = notices.filter((notice, index) => {
    return notices.findIndex((n) => n.name === notice.name) === index;
  });

  return filterNotice
    .filter((notice) => allowedNames.includes(notice.name))
    .sort((a, b) => allowedNames.indexOf(a.name) - allowedNames.indexOf(b.name));
};

export const handleNotices = (notices: Notice[]): Notice[] => {
  const reservationNotice = findAndReplaceNotice(notices);
  const filteredNotices = filterNotices(notices);

  if (reservationNotice === undefined) return filteredNotices;
  if (!filteredNotices.length) return [reservationNotice];

  if (filteredNotices[0].name === 'Z' && filteredNotices[1]) {
    return [filteredNotices[0], reservationNotice, filteredNotices[1]].concat(
      filteredNotices.slice(2)
    );
  }

  return [reservationNotice, ...filteredNotices];
};
