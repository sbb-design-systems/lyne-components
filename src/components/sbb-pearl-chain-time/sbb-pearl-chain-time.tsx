import { Component, Element, h, JSX, Prop } from '@stencil/core';
import {
  i18nDeparture,
  i18nArrival,
  i18nWalkingDistanceDeparture,
  i18nWalkingDistanceArrival,
} from '../../global/i18n';
import getDocumentLang from '../../global/helpers/get-document-lang';
import { format } from 'date-fns';
import { removeTimezoneFromISOTimeString } from '../../global/helpers/timezone-helper';
import { PtRideLeg } from '../../global/interfaces/pearl-chain-properties';

@Component({
  shadow: true,
  styleUrl: 'sbb-pearl-chain-time.scss',
  tag: 'sbb-pearl-chain-time',
})
export class SbbPearlChainTime {
  private _currentLanguage = getDocumentLang();

  /**
   * define the legs of the pearl-chain.
   * Format:
   * `{"legs": [{"duration": 25}, ...]}`
   * `duration` in minutes. Duration of the leg is relative
   * to the total travel time. Example: departure 16:30, change at 16:40,
   * arrival at 17:00. So the change should have a duration of 33.33%.
   */
  @Prop() public legs!: PtRideLeg[];

  /** Prop to render the departure time - will be formatted as "H:mm" */
  @Prop() public departureTime?: string;

  /** Prop to render the arrival time - will be formatted as "H:mm" */
  @Prop() public arrivalTime?: string;

  /** Optional prop to render the walk time (in minutes) before departure */
  @Prop() public departureWalk?: number;

  /** Optional prop to render the walk time (in minutes) after arrival */
  @Prop() public arrivalWalk?: number;

  /**
   * Per default, the current location has a pulsating animation. You can
   * disable the animation with this property.
   */
  @Prop() public disableAnimation?: boolean;

  @Element() private _element: HTMLElement;

  private _now(): number {
    const dataNow = +this._element.dataset?.now;
    return isNaN(dataNow) ? Date.now() : dataNow;
  }

  public render(): JSX.Element {
    const departure: Date | undefined = this.departureTime
      ? removeTimezoneFromISOTimeString(this.departureTime)
      : undefined;
    const arrival: Date | undefined = this.arrivalTime
      ? removeTimezoneFromISOTimeString(this.arrivalTime)
      : undefined;

    return (
      <div class="sbb-pearl-chain__time">
        {this.departureWalk > 0 && (
          <span class="sbb-pearl-chain__time-walktime sbb-pearl-chain__time-walktime--left">
            <sbb-icon name="walk-small"></sbb-icon>
            <time dateTime={this.departureWalk + 'M'}>
              <span class="sbb-screenreaderonly">
                {i18nWalkingDistanceDeparture[getDocumentLang()]}
              </span>
              {this.departureWalk}
              <span aria-hidden="true">'</span>
            </time>
          </span>
        )}
        {departure && (
          <time class="sbb-pearl-chain__time-time" dateTime={this.departureTime}>
            <span class="sbb-screenreaderonly">{i18nDeparture[this._currentLanguage]}</span>
            {format(departure, 'H:mm')}
          </time>
        )}
        <sbb-pearl-chain
          class="sbb-pearl-chain__time-chain"
          legs={this.legs}
          disable-animation={this.disableAnimation}
          data-now={this._now()}
        />
        {arrival && (
          <time class="sbb-pearl-chain__time-time" dateTime={this.arrivalTime}>
            <span class="sbb-screenreaderonly">{i18nArrival[this._currentLanguage]}</span>
            {format(arrival, 'H:mm')}
          </time>
        )}
        {this.arrivalWalk > 0 && (
          <span class="sbb-pearl-chain__time-walktime sbb-pearl-chain__time-walktime--right">
            <sbb-icon name="walk-small"></sbb-icon>
            <time dateTime={this.arrivalWalk + 'M'}>
              <span class="sbb-screenreaderonly">
                {i18nWalkingDistanceArrival[getDocumentLang()]}
              </span>
              {this.arrivalWalk}
              <span aria-hidden="true">'</span>
            </time>
          </span>
        )}
      </div>
    );
  }
}
