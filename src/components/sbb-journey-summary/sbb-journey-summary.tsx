import { Component, h, JSX, Prop, Element } from '@stencil/core';
import { InterfaceJourneySummaryAttributes } from './sbb-journey-summary.custom';
import { isTomorrow, isToday, isValid, format } from 'date-fns';

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
import { removeTimezoneFromISOTimeString } from '../../global/helpers/timezone-helper';

@Component({
  shadow: true,
  styleUrl: 'sbb-journey-summary.scss',
  tag: 'sbb-journey-summary',
})
export class SbbJourneySummary {
  /**  The config prop */
  @Prop() public config!: InterfaceJourneySummaryAttributes['config'];

  /**
   * Per default, the current location has a pulsating animation. You can
   * disable the animation with this property.
   */
  @Prop() public disableAnimation?: boolean;

  private _currentLanguage = getDocumentLang();

  @Element() private _hostElement: HTMLElement;

  private _hasContentSlot: boolean;

  public componentWillLoad(): void {
    this._hasContentSlot = Boolean(this._hostElement.querySelector('[slot="content"]'));
  }

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

  private _convertDuration(duration: number): Duration {
    const hours = duration / 60;
    const rhours = Math.floor(hours);
    const minutes = (hours - rhours) * 60;
    const rminutes = Math.round(minutes);
    const dur: Duration = { hours: rhours, minutes: rminutes };
    return dur;
  }

  /**  renders the date of the journey or if it is the current or next day */
  private _renderJourneyStart(departureTime: Date, dur: number): JSX.Element {
    const duration: Duration = this._convertDuration(dur);

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
    const slicedVias = vias.slice(0, 5);
    return (
      <div class="sbb-journey-summary__via-block">
        <span class="sbb-journey-summary__via-text">Via</span>
        <ul class="sbb-journey-summary__vias">
          {slicedVias.map((via, index) => (
            <li class="sbb-journey-summary__via">
              {via}
              {index !== slicedVias.length - 1 && index < 4 && <span>,</span>}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  /** renders the optional walktimes, the icon is displayed either before or after the time*/
  private _renderWalkTime(departure: boolean, duration: number): JSX.Element {
    return (
      <span class="sbb-journey-summary__walktime">
        <sbb-icon name="walk-small"></sbb-icon>
        <time dateTime={duration.toString()}>
          {duration}
          <span aria-hidden="true">'</span>
        </time>
        <span class="screenreaderonly">
          {departure
            ? i18nWalkingDistanceDeparture[this._currentLanguage]
            : i18nWalkingDistanceArrival[this._currentLanguage]}
        </span>
      </span>
    );
  }

  public render(): JSX.Element {
    const { vias, origin, destination, duration } = this.config || {};
    const departureTime: Date = removeTimezoneFromISOTimeString(this.config?.departure?.time);
    const arrivalTime: Date = removeTimezoneFromISOTimeString(this.config?.arrival?.time);

    return (
      <div class="sbb-journey-summary">
        {origin && (
          <sbb-journey-header origin={origin} destination={destination}></sbb-journey-header>
        )}
        {vias && this._renderJourneyVias(vias)}
        <div class="sbb-journey-summary__body">
          {this._renderJourneyStart(departureTime, duration)}
          <div class="sbb-journey-summary__transportation-details">
            <span class="screenreaderonly">{i18nDeparture[this._currentLanguage]}</span>
            {this.config?.departureWalk && this._renderWalkTime(true, this.config?.departureWalk)}
            {isValid(departureTime) && (
              <time class="sbb-journey-summary__time">{format(departureTime, 'HH:mm')}</time>
            )}
            <div class="sbb-journey-summary__pearlchain">
              <sbb-pearl-chain legs={this.config?.legs} disableAnimation={this.disableAnimation} />
            </div>
            {isValid(arrivalTime) && (
              <time class="sbb-journey-summary__time">{format(arrivalTime, 'HH:mm')}</time>
            )}
            <span class="screenreaderonly">{i18nArrival[this._currentLanguage]}</span>
            {this.config?.arrivalWalk && this._renderWalkTime(false, this.config?.arrivalWalk)}
          </div>
          {this._hasContentSlot && (
            <div class="sbb-journey-summary__slot">
              <slot name="content" />
            </div>
          )}
        </div>
      </div>
    );
  }
}
