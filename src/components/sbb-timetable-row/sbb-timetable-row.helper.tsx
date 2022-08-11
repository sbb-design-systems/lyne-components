import { h } from '@stencil/core';
import getDocumentLang from '../../global/helpers/get-document-lang';
import { i18nWalkingDistanceArrival, i18nWalkingDistanceDeparture } from '../../global/i18n';

export const durationToTime = (duration: number): string => {
  let durationValue = '';
  const days = Math.floor(duration / 1440);
  const hours = Math.floor((duration / 60) % 24);
  const minutes = duration % 60;

  days >= 1 ? (durationValue += days + ' d ') : '';
  hours >= 1 ? (durationValue += hours + ' h ') : '';
  minutes >= 1 ? (durationValue += minutes + ' min') : '';

  return durationValue;
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
    'vae'
  ];

  if (possibleTransportTypes.includes(transport)) {
    return true;
  }

  return false;
};

export const convertDate = (time: Date): string => {
  const hours = time?.getHours();
  const minutes = time?.getMinutes();

  return hours + ':' + minutes;
};

export const renderIconProduct = (transport: string, line: string): JSX.Element => {
  return <sbb-icon class="timetable__row-transport" name={transport.toLowerCase() + '-' + line} />;
};

export const renderStringProduct = (vehicleName: string, line: string): JSX.Element => {
  return <span class="timetable__row-transportnumber">{vehicleName + ' ' + line}</span>;
};

export const walkTimeBefore = (walkTime: number): JSX.Element => {
  return (
    <span class="timetable__row-walktime">
      <sbb-icon name="walk-small"></sbb-icon>
      <slot name="walkTimeBefore">
        <time dateTime={'TP' + walkTime + 'M'}>
          <span class="screenreaderonly">{i18nWalkingDistanceDeparture[getDocumentLang()]}</span>
          {walkTime}
          <span aria-hidden="true">'</span>
        </time>
      </slot>
    </span>
  );
};

export const walkTimeAfter = (walkTime: number): JSX.Element => {
  return (
    <span class="timetable__row-walktime">
      <slot name="walkTimeAfter">
        <time dateTime={'TP' + walkTime + 'M'}>
          <span class="screenreaderonly">{i18nWalkingDistanceArrival[getDocumentLang()]}</span>
          {walkTime}
          <span aria-hidden="true">'</span>
        </time>
      </slot>
      <sbb-icon name="walk-small"></sbb-icon>
    </span>
  );
};
