import { Component, Element, h, JSX, Prop, State } from '@stencil/core';
import { i18nDeparture, i18nArrival, i18nTransferProcedures } from '../../global/i18n';
import { format } from 'date-fns';
import { removeTimezoneFromISOTimeString } from '../../global/datetime';
import {
  documentLanguage,
  HandlerRepository,
  languageChangeHandlerAspect,
} from '../../global/eventing';
import { getDepartureArrivalTimeAttribute, isRideLeg, Leg } from '../../global/timetable';

@Component({
  shadow: true,
  styleUrl: 'sbb-pearl-chain-time.scss',
  tag: 'sbb-pearl-chain-time',
})
export class SbbPearlChainTime {
  /**
   * define the legs of the pearl-chain.
   * Format:
   * `{"legs": [{"duration": 25}, ...]}`
   * `duration` in minutes. Duration of the leg is relative
   * to the total travel time. Example: departure 16:30, change at 16:40,
   * arrival at 17:00. So the change should have a duration of 33.33%.
   */
  @Prop() public legs!: Leg[];

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

  @State() private _currentLanguage = documentLanguage();

  @Element() private _element!: HTMLElement;

  private _handlerRepository = new HandlerRepository(
    this._element,
    languageChangeHandlerAspect((l) => (this._currentLanguage = l)),
  );

  public connectedCallback(): void {
    this._handlerRepository.connect();
  }

  public disconnectedCallback(): void {
    this._handlerRepository.disconnect();
  }

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

    const { renderDepartureTimeAttribute, renderArrivalTimeAttribute } =
      getDepartureArrivalTimeAttribute(
        this.legs,
        this.departureWalk || 0,
        this.arrivalWalk || 0,
        this._currentLanguage,
      );

    const rideLegs = this.legs?.filter((leg) => isRideLeg(leg));
    return (
      <div class="sbb-pearl-chain__time">
        {renderDepartureTimeAttribute()}

        {departure && (
          <time class="sbb-pearl-chain__time-time" dateTime={this.departureTime}>
            <span class="sbb-screenreaderonly">{i18nDeparture[this._currentLanguage]}:&nbsp;</span>
            {format(departure, 'HH:mm')}
          </time>
        )}
        {rideLegs?.length > 1 && (
          <span class="sbb-screenreaderonly">
            {`${rideLegs?.length - 1} ${i18nTransferProcedures[this._currentLanguage]}`}
          </span>
        )}
        <sbb-pearl-chain
          class="sbb-pearl-chain__time-chain"
          legs={this.legs}
          disable-animation={this.disableAnimation}
          data-now={this._now()}
        />
        {arrival && (
          <time class="sbb-pearl-chain__time-time" dateTime={this.arrivalTime}>
            <span class="sbb-screenreaderonly">{i18nArrival[this._currentLanguage]}:&nbsp;</span>
            {format(arrival, 'HH:mm')}
          </time>
        )}
        {renderArrivalTimeAttribute()}
      </div>
    );
  }
}
