import { h, JSX } from '@stencil/core';
import { HimCus } from './sbb-timetable-row.custom';
import { i18nTripQuayChange } from '../../global/i18n';
import {
  isRideLeg,
  ITripItem,
  Notice,
  PtRideLeg,
  PtSituation,
  VehicleModeEnum,
} from '../../global/timetable';

export const getTransportIcon = (
  vehicleMode: VehicleModeEnum,
  vehicleSubMode: string,
  language: string,
): string => {
  // As there are no English pictograms, we fall back to German
  const normalizedLanguage = language.replace('en', 'de');

  if (vehicleMode === 'BUS') {
    return 'bus-right';
  } else if (vehicleMode === 'CABLEWAY') {
    return 'funicular-railway-right';
  } else if (vehicleMode === 'CHAIRLIFT') {
    return 'chair-lift-right';
  } else if (vehicleMode === 'COG_RAILWAY') {
    return 'cog-railway-right';
  } else if (vehicleMode === 'GONDOLA' && vehicleSubMode === 'PB') {
    return 'cableway-right';
  } else if (vehicleMode === 'GONDOLA') {
    return 'gondola-lift-right';
  } else if (vehicleMode === 'METRO') {
    return `metro-right-${normalizedLanguage}`;
  } else if (vehicleMode === 'PLANE') {
    return 'aeroplane-right';
  } else if (vehicleMode === 'SHIP') {
    return 'jetty-right';
  } else if (vehicleMode === 'TAXI') {
    return 'taxi-right';
  } else if (vehicleMode === 'TRAIN') {
    return 'train-right';
  } else if (vehicleMode === 'TRAMWAY') {
    return 'tram-right';
  } else if (vehicleMode === 'ELEVATOR') {
    return 'lift';
  } else {
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
    <span class="sbb-timetable__row-transport">
      <sbb-icon name={transport.toLowerCase() + dashLine} />
      <span class="sbb-screenreaderonly"> {transport.toLowerCase() + dashLine}</span>
    </span>
  );
};

export const renderStringProduct = (vehicleName: string, line?: string | null): JSX.Element => {
  const space = ['M', 'B', 'T'].includes(vehicleName) ? ' ' : '';
  return (
    <span class="sbb-timetable__row-transportnumber">
      {line !== null ? vehicleName + space + line : vehicleName}
    </span>
  );
};

const getReachableText = (legs: PtRideLeg[]): string => {
  return legs?.find((leg) => leg.serviceJourney?.serviceAlteration?.reachableText)?.serviceJourney
    ?.serviceAlteration?.reachableText;
};

const getDelayText = (legs: PtRideLeg[]): string => {
  return legs?.find((leg) => leg.serviceJourney?.serviceAlteration?.delayText)?.serviceJourney
    ?.serviceAlteration?.delayText;
};

const getRedirectedText = (legs: PtRideLeg[]): string => {
  return legs?.find((leg) => !!leg.serviceJourney?.serviceAlteration?.redirectedText)
    ?.serviceJourney?.serviceAlteration?.redirectedText;
};

const getUnplannedStop = (legs: PtRideLeg[]): string => {
  return legs?.find((leg) => !!leg.serviceJourney?.serviceAlteration?.unplannedStopPointsText)
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
    (a: PtSituation, b: PtSituation) => priorities[a.cause] - priorities[b.cause],
  );
};

export const getHimIcon = (situation: PtSituation): HimCus => {
  switch (situation?.cause) {
    case 'DISTURBANCE':
      return {
        name: 'disruption',
        text: situation?.broadcastMessages?.length ? situation?.broadcastMessages[0].title : '',
      };
    case 'INFORMATION':
      return {
        name: 'info',
        text: situation?.broadcastMessages.length ? situation?.broadcastMessages[0].title : '',
      };
    case 'DELAY':
      return {
        name: 'delay',
        text: situation?.broadcastMessages.length ? situation?.broadcastMessages[0].title : '',
      };
    case 'TRAIN_REPLACEMENT_BY_BUS':
      return {
        name: 'replacementbus',
        text: situation?.broadcastMessages.length ? situation?.broadcastMessages[0].title : '',
      };
    case 'CONSTRUCTION_SITE':
      return {
        name: 'construction',
        text: situation?.broadcastMessages.length ? situation?.broadcastMessages[0].title : '',
      };
    default:
      return {
        name: 'info',
        text: situation?.broadcastMessages.length ? situation?.broadcastMessages[0].title : '',
      };
  }
};

export const getCus = (trip: ITripItem, currentLanguage: string): HimCus => {
  const { summary, legs } = trip || {};
  const rideLegs = legs?.filter((leg) => isRideLeg(leg)) as PtRideLeg[];
  const { tripStatus } = summary || {};

  if (tripStatus?.cancelled || tripStatus?.partiallyCancelled)
    return { name: 'cancellation', text: tripStatus?.cancelledText };
  if (getReachableText(rideLegs))
    return { name: 'missed-connection', text: getReachableText(rideLegs) };
  if (tripStatus?.alternative) return { name: 'alternative', text: tripStatus.alternativeText };
  if (getRedirectedText(rideLegs)) return { name: 'reroute', text: getRedirectedText(rideLegs) };
  if (getUnplannedStop(rideLegs)) return { name: 'add-stop', text: getUnplannedStop(rideLegs) };
  if (tripStatus?.delayed || tripStatus?.delayedUnknown)
    return { name: 'delay', text: getDelayText(rideLegs) };
  if (tripStatus?.quayChanged) {
    const departure = rideLegs[0].departure;
    return {
      name: 'platform-change',
      text: departure.quayChanged ? departure.quayChangedText : i18nTripQuayChange[currentLanguage],
    };
  }

  return {} as HimCus;
};

const findAndReplaceNotice = (notices: Notice[]): Notice | undefined => {
  const reservationNotice = ['RR', 'RK', 'RC', 'RL', 'RM', 'RS', 'RU', 'XP', 'XR', 'XT'];

  return notices.reduce((foundNotice, notice) => {
    if (foundNotice) return foundNotice;
    if (reservationNotice.includes(notice.name)) {
      return { ...notice, name: 'RR' } as Notice;
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
      filteredNotices.slice(2),
    );
  }

  return [reservationNotice, ...filteredNotices];
};
