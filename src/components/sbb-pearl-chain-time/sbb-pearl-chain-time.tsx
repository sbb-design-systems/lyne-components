import { Component, h, JSX, Prop } from '@stencil/core';
import { InterfacePearlChainAttributes } from '../sbb-pearl-chain/sbb-pearl-chain.custom';
import {
  i18nDeparture,
  i18nArrival,
  i18nWalkingDistanceDeparture,
  i18nWalkingDistanceArrival,
} from '../../global/i18n';
import getDocumentLang from '../../global/helpers/get-document-lang';
import { format } from 'date-fns';
import { removeTimezoneFromDate } from './helper/timezone-helper';

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
  @Prop() public legs!: InterfacePearlChainAttributes['legs'];

  /** Prop to render the departure time - will be formatted as "H:mm" */
  @Prop() public departureTime!: string;

  /** Prop to render the arrival time - will be formatted as "H:mm" */
  @Prop() public arrivalTime!: string;

  /** Optional prop to render the walk time (in minutes) before departure */
  @Prop() public departureWalk?: number;

  /** Optional prop to render the walk time (in minutes) after arrival */
  @Prop() public arrivalWalk?: number;

  /**
   * Per default, the current location has a pulsating animation. You can
   * disable the animation with this property.
   */
  @Prop() public disableAnimation?: boolean;

  public render(): JSX.Element {
    const departure: Date = removeTimezoneFromDate(this.departureTime);
    const arrival: Date = removeTimezoneFromDate(this.arrivalTime);

    return (
      <div class="sbb-pearl-chain__time">
        {this.departureWalk && (
          <span class="sbb-pearl-chain__time-walktime">
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
        <time class="sbb-pearl-chain__time-time" dateTime={this.departureTime}>
          <span class="sbb-screenreaderonly">{i18nDeparture[this._currentLanguage]}</span>
          {this.departureTime && format(departure, 'H:mm')}
        </time>
        <sbb-pearl-chain
          class="sbb-pearl-chain__time-chain"
          legs={this.legs}
          disable-animation={this.disableAnimation}
        />
        <time class="sbb-pearl-chain__time-time" dateTime={this.arrivalTime}>
          <span class="sbb-screenreaderonly">{i18nArrival[this._currentLanguage]}</span>
          {this.arrivalTime && format(arrival, 'H:mm')}
        </time>
        {this.arrivalWalk && (
          <span class="sbb-pearl-chain__time-walktime">
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
