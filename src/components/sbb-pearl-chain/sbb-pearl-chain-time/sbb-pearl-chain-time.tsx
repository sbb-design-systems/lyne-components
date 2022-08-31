import { Component, h, JSX, Prop, Host } from '@stencil/core';
import { InterfacePearlChainAttributes } from '../sbb-pearl-chain.custom';
import {
  i18nDeparture,
  i18nArrival,
  i18nWalkingDistanceDeparture,
  i18nWalkingDistanceArrival,
} from '../../../global/i18n';
import getDocumentLang from '../../../global/helpers/get-document-lang';
import { format } from 'date-fns-tz';

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

  /** Prop to render the departure time */
  @Prop() public departureTime!: string;

  /** Prop to render the arrival time */
  @Prop() public arrivalTime!: string;

  /** Optional prop to render the walk time before departure */
  @Prop() public departureWalk?: number;

  /** Optional prop to render the walk time after arrival */
  @Prop() public arrivalWalk?: number;

  /**
   * Per default, the current location has a pulsating animation. You can
   * disable the animation with this property.
   */
  @Prop() public disableAnimation?: boolean;

  private _walkTime = (walkTime: number, position: string): JSX.Element => {
    if (position === 'after') {
      return (
        <span class="timetable__row-walktime">
          <time dateTime={walkTime + 'M'}>
            <span class="screenreaderonly">{i18nWalkingDistanceArrival[getDocumentLang()]}</span>
            {walkTime}
            <span aria-hidden="true">'</span>
          </time>
          <sbb-icon name="walk-small"></sbb-icon>
        </span>
      );
    } else {
      return (
        <span class="timetable__row-walktime">
          <sbb-icon name="walk-small"></sbb-icon>
          <time dateTime={walkTime + 'M'}>
            <span class="screenreaderonly">{i18nWalkingDistanceDeparture[getDocumentLang()]}</span>
            {walkTime}
            <span aria-hidden="true">'</span>
          </time>
        </span>
      );
    }
  };

  public render(): JSX.Element {
    return (
      <Host>
        {this.departureWalk && this._walkTime(this.departureWalk, 'before')}
        <time class="timetable__row-time" dateTime={'' + this.departureTime}>
          <span class="screenreaderonly">{i18nDeparture[this._currentLanguage]}</span>
          {this.departureTime && format(new Date(this.departureTime), 'H:mm')}
        </time>
        <sbb-pearl-chain
          class="timetable__row-chain"
          legs={this.legs}
          disable-animation={this.disableAnimation}
        />
        <time class="timetable__row-time" dateTime={'' + this.arrivalTime}>
          <span class="screenreaderonly">{i18nArrival[this._currentLanguage]}</span>
          {this.arrivalTime && format(new Date(this.arrivalTime), 'H:mm')}
        </time>
        {this.arrivalWalk && this._walkTime(this.arrivalWalk, 'after')}
      </Host>
    );
  }
}
