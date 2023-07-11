import { Component, Element, h, JSX, Prop, State } from '@stencil/core';
import {
  i18nDeparture,
  i18nArrival,
  i18nWalkingDistanceDeparture,
  i18nWalkingDistanceArrival,
  i18nTransferProcedures,
} from '../../global/i18n';
import { format } from 'date-fns';
import { removeTimezoneFromISOTimeString } from '../../global/helpers/date-helper';
import { Leg, PtConnectionLeg, PtRideLeg } from '../../global/interfaces/timetable-properties';
import { extractTimeAndStringFromNoticeText } from './sbb-pearl-chain-time.helper';
import { isConnectionLeg, isRideLeg } from '../../global/helpers/timetable-helper';
import {
  documentLanguage,
  HandlerRepository,
  languageChangeHandlerAspect,
} from '../../global/helpers';

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

  private _transferTime(
    duration: number | string,
    icon: string,
    label?: string,
    type?: 'departure' | 'arrival',
  ): JSX.Element {
    return (
      <span class={`sbb-pearl-chain__time-transfer sbb-pearl-chain__time-transfer--${type}`}>
        <sbb-icon name={icon}></sbb-icon>
        <time dateTime={duration + 'M'}>
          <span class="sbb-screenreaderonly">
            {!label &&
              type &&
              (type === 'departure'
                ? i18nWalkingDistanceDeparture[this._currentLanguage]
                : i18nWalkingDistanceArrival[this._currentLanguage])}
            {label && <span>{label}</span>}&nbsp;
          </span>
          {duration}
          <span aria-hidden="true">'</span>
          <span class="sbb-screenreaderonly">min</span>
        </time>
      </span>
    );
  }

  public render(): JSX.Element {
    const legs =
      this.legs &&
      (this.legs.filter((leg) => isRideLeg(leg) || isConnectionLeg(leg)) as (
        | PtRideLeg
        | PtConnectionLeg
      )[]);
    const lastLeg = legs && legs[legs.length - 1];

    const departure: Date | undefined = this.departureTime
      ? removeTimezoneFromISOTimeString(this.departureTime)
      : undefined;
    const arrival: Date | undefined = this.arrivalTime
      ? removeTimezoneFromISOTimeString(this.arrivalTime)
      : undefined;

    // Extended enter and exits
    const extendedFirstLeg =
      legs && legs[0] && legs[0].__typename === 'PTRideLeg'
        ? legs[0]?.serviceJourney?.notices?.filter((notice) => ['CI'].includes(notice.name))[0]
        : undefined;

    const extendedLastLeg =
      lastLeg && lastLeg?.__typename === 'PTRideLeg'
        ? lastLeg?.serviceJourney?.notices?.filter((notice) => ['CO'].includes(notice.name))[0]
        : undefined;

    // Additional informations for first and last leg

    const connectionLegNotice = ['YM', 'YB', 'Y', 'YT'];

    const connectionFirstLeg =
      legs && legs[0] && legs[0].__typename === 'PTConnectionLeg'
        ? (legs[0] as PtConnectionLeg)
        : undefined;

    const connectionFirstLegNotices = connectionFirstLeg
      ? connectionFirstLeg?.notices?.filter((notice) =>
          connectionLegNotice.includes(notice.name),
        )[0]
      : undefined;

    const connectionLastLeg =
      lastLeg && lastLeg.__typename === 'PTConnectionLeg'
        ? (lastLeg as PtConnectionLeg)
        : undefined;

    const connectionLastLegNotices = connectionLastLeg
      ? connectionLastLeg?.notices?.filter((notice) => connectionLegNotice.includes(notice.name))[0]
      : undefined;

    const rideLegs = this.legs?.filter((leg) => isRideLeg(leg));
    return (
      <div class="sbb-pearl-chain__time">
        {connectionFirstLeg && (
          <span class="sbb-pearl-chain__time-walktime sbb-pearl-chain__time-walktime--left">
            <sbb-icon name="walk-small"></sbb-icon>
            <time dateTime={connectionFirstLeg.duration + 'M'}>
              <span class="sbb-screenreaderonly">{connectionFirstLegNotices?.text?.template}</span>
              {connectionFirstLeg.duration}
              <span aria-hidden="true">'</span>
            </time>
          </span>
        )}

        {!!this.departureWalk && !extendedFirstLeg && !connectionFirstLeg && (
          <span class="sbb-pearl-chain__time-walktime sbb-pearl-chain__time-walktime--left">
            <sbb-icon name="walk-small"></sbb-icon>
            <time dateTime={this.departureWalk + 'M'}>
              <span class="sbb-screenreaderonly">
                {i18nWalkingDistanceDeparture[this._currentLanguage]}
              </span>
              {this.departureWalk}
              <span aria-hidden="true">'</span>
            </time>
          </span>
        )}

        {!!extendedFirstLeg &&
          this._transferTime(
            extractTimeAndStringFromNoticeText(extendedFirstLeg).duration +
              (this.departureWalk || 0),
            `sa-${extendedFirstLeg?.name?.toLowerCase()}`,
            extractTimeAndStringFromNoticeText(extendedFirstLeg).text,
            'departure',
          )}

        {departure && (
          <time class="sbb-pearl-chain__time-time" dateTime={this.departureTime}>
            <span class="sbb-screenreaderonly">{i18nDeparture[this._currentLanguage]}:&nbsp;</span>
            {format(departure, 'HH:mm')}
          </time>
        )}
        <span class="sbb-screenreaderonly">
          {`${rideLegs?.length - 1} ${i18nTransferProcedures[this._currentLanguage]}`}
        </span>
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
        {!!this.arrivalWalk && !extendedLastLeg && !connectionLastLeg && (
          <span class="sbb-pearl-chain__time-walktime sbb-pearl-chain__time-walktime--right">
            <sbb-icon name="walk-small"></sbb-icon>
            <time dateTime={this.arrivalWalk + 'M'}>
              <span class="sbb-screenreaderonly">
                {i18nWalkingDistanceArrival[this._currentLanguage]}
              </span>
              {this.arrivalWalk}
              <span aria-hidden="true">'</span>
            </time>
          </span>
        )}

        {connectionLastLeg && (
          <span class="sbb-pearl-chain__time-walktime sbb-pearl-chain__time-walktime--right">
            <sbb-icon name="walk-small"></sbb-icon>
            <time dateTime={connectionLastLeg.duration + 'M'}>
              <span class="sbb-screenreaderonly">{connectionLastLegNotices?.text}</span>
              {connectionLastLeg.duration}
              <span aria-label="min">'</span>
            </time>
          </span>
        )}

        {!!extendedLastLeg &&
          this._transferTime(
            extractTimeAndStringFromNoticeText(extendedLastLeg).duration + (this.arrivalWalk || 0),
            `sa-${extendedLastLeg?.name?.toLowerCase()}`,
            extractTimeAndStringFromNoticeText(extendedLastLeg).text,
            'arrival',
          )}
      </div>
    );
  }
}
