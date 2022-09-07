import { Component, h, JSX, Prop } from '@stencil/core';
import { InterfaceJourneySummaryAttributes } from './sbb-journey-summary.custom';
import { isTomorrow, isToday, parseISO, intervalToDuration, isValid } from 'date-fns';
import { format } from 'date-fns-tz'
import {
  i18nArrival,
  i18nDeparture,
  i18nDurationHour,
  i18nDurationMinute,
  i18nToday,
  i18nTomorrow,
  i18nWalkingDistanceArrival,
  i18nWalkingDistanceDeparture,
} from '../../global/i18n';
import getDocumentLang from '../../global/helpers/get-document-lang';
@Component({
  shadow: true,
  styleUrl: 'sbb-journey-summary.scss',
  tag: 'sbb-journey-summary',
})
export class SbbJourneySummary {
  /**  The config prop */
  @Prop() public config!: InterfaceJourneySummaryAttributes['config'];

  private _currentLanguage = getDocumentLang();

  /**  formats the duration of the journey */
  private _formatTime(duration: Duration): JSX.Element {
    return (
      <time dateTime={duration.hours + ' ' + duration.minutes}>
        {duration.hours > 0 && (
          <span>
            {duration.hours}
            {i18nDurationHour.single.short[this._currentLanguage] + ' '}
          </span>
        )}
        {duration.minutes}
        {i18nDurationMinute.multiple.short[this._currentLanguage]}
      </time>
    );
  }

  /** returns duration in hours and minutes */
  private _getDuration(startTime: Date, endTime: Date): Duration {
    if (isValid(startTime) && isValid(endTime)) {
      const interval = intervalToDuration({ start: startTime, end: endTime });
      if (interval.days > 0) {
        const intervalDayChange: Duration = {
          hours: interval.hours + interval.days * 24,
          minutes: interval.minutes,
        };
        return intervalDayChange;
      } else return interval;
    }
    return { hours: 0, minutes: 0 };
  }

  /**  renders the date of the journey or if it is the current or next day */
  private _renderJourneyStart(departureTime: Date, arrivalTime: Date): JSX.Element {
    const duration: Duration = this._getDuration(arrivalTime, departureTime);

    if (isTomorrow(departureTime) || isToday(departureTime)) {
      return isTomorrow(departureTime) ? (
        <span>
          {i18nTomorrow[this._currentLanguage]}, {this._formatTime(duration)}
        </span>
      ) : (
        <span>
          {i18nToday[this._currentLanguage]}, {this._formatTime(duration)}
        </span>
      );
    }
    if (isValid(departureTime))
      return (
        <span>
          <time dateTime={format(departureTime, 'd') + ' ' + format(departureTime, 'M')}>
            {format(departureTime, 'dd.MM, ')}
          </time>
          {this._formatTime(duration)}
        </span>
      );
  }

  private _renderJourneyVias(vias: string[]): JSX.Element {
    const slicedVias = vias.slice(0, 4);
    return (
      <div class="journey-summary__via-block">
        <span class="journey-summary__via-text">Via</span>
        <ul class="journey-summary__vias">
          {slicedVias.map((via, index) => (
            <li class="journey-summary__via">
              {via}
              {index !== slicedVias.length - 1 && <span>, </span>}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  /** renders the optional walktimes, the icon is displayed either before or after the time*/
  private _renderWalkTime(iconBefore: boolean, duration: number): JSX.Element {
    return (
      <span class="journey-summary__walktime">
        {iconBefore && <sbb-icon name="walk-small"></sbb-icon>}
        <time dateTime={duration.toString()}>
          {duration}
          <span aria-hidden="true">'</span>
        </time>
        <span class="screenreaderonly">
          {iconBefore
            ? i18nWalkingDistanceDeparture[this._currentLanguage]
            : i18nWalkingDistanceArrival[this._currentLanguage]}
        </span>
        {!iconBefore && <sbb-icon name="walk-small"></sbb-icon>}
      </span>
    );
  }

  public render(): JSX.Element {
    const { vias, origin, destination } = this.config || {};
    const departureTime: Date = parseISO(this.config?.departure?.time);
    const arrivalTime: Date = parseISO(this.config?.arrival?.time);

    return (
      <div class="journey-summary">
        {origin && (
          <sbb-journey-header origin={origin} destination={destination}></sbb-journey-header>
        )}
        {vias && this._renderJourneyVias(vias)}
        <div class="journey-summary__body">
          {this._renderJourneyStart(departureTime, arrivalTime)}
          <div class="journey-summary__transportation-details">
            <span class="screenreaderonly">{i18nDeparture[this._currentLanguage]}</span>
            {this.config?.departureWalk &&
              this._renderWalkTime(true, this.config?.departureWalk)}
            {isValid(departureTime) && (
              <time class="journey-summary__time">{format(departureTime, 'HH:mm')}</time>
            )}
            <div class="journey-summary__pearlchain">
              <sbb-pearl-chain legs={this.config?.legs} />
            </div>
            {isValid(arrivalTime) && (
              <time class="journey-summary__time">{format(arrivalTime, 'HH:mm')}</time>
            )}
            <span class="screenreaderonly">{i18nArrival[this._currentLanguage]}</span>
            {this.config?.arrivalWalk &&
              this._renderWalkTime(false, this.config?.arrivalWalk)}
          </div>
          <slot />
        </div>
      </div>
    );
  }
}
