import { Component, h, JSX, Prop } from '@stencil/core';
import { InterfaceJourneySummaryAttributes } from './sbb-journey-summary.custom';
import isTomorrow from 'date-fns/isTomorrow';
import { isToday, parseISO, format, intervalToDuration, isBefore, isValid } from 'date-fns';
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
  @Prop() public summaryConfig!: InterfaceJourneySummaryAttributes['config'];

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

  private _getDuration(startTime: Date, endTime: Date): Duration {
    if (isValid(startTime) && isValid(endTime)) {
      return intervalToDuration({ start: startTime, end: endTime });
    }
  }

  /**  renders the date of the journey or if it is the current or next day */
  private _renderJourneyStart(departureTime: Date, arrivalTime: Date): JSX.Element {
    const duration: Duration = isBefore(departureTime, arrivalTime)
      ? this._getDuration(departureTime, arrivalTime)
      : this._getDuration(arrivalTime, departureTime);

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
    const { vias, origin, destination } = this.summaryConfig || {};
    const departureTime: Date = parseISO(this.summaryConfig?.departure?.time);
    const arrivalTime: Date = parseISO(this.summaryConfig?.arrival?.time);

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
            {this.summaryConfig?.departureWalk &&
              this._renderWalkTime(true, this.summaryConfig?.departureWalk)}
            {isValid(departureTime) && <time>{format(departureTime, 'HH:mm')}</time>}
            <div class="journey-summary__pearlchain">
              <sbb-pearl-chain legs={this.summaryConfig?.legs} />
            </div>
            {isValid(arrivalTime) && <time>{format(arrivalTime, 'HH:mm')}</time>}
            <span class="screenreaderonly">{i18nArrival[this._currentLanguage]}</span>
            {this.summaryConfig?.arrivalWalk &&
              this._renderWalkTime(false, this.summaryConfig?.arrivalWalk)}
          </div>
          <div class="journey-summary__slot">
            <slot />
          </div>
        </div>
      </div>
    );
  }
}
