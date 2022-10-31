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
  let dashLine = '';
  if (line) {
    dashLine = '-' + line;
  }
  return <sbb-icon class="timetable__row-transport" name={transport.toLowerCase() + dashLine} />;
};

export const renderStringProduct = (vehicleName: string, line: string): JSX.Element => {
  return <span class="timetable__row-transportnumber">{vehicleName + ' ' + line}</span>;
};
