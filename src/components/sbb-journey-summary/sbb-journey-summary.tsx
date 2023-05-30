import { Component, h, JSX, Prop, Element, ComponentInterface, State } from '@stencil/core';
import { InterfaceSbbJourneySummaryAttributes } from './sbb-journey-summary.custom';
import { isValid, format } from 'date-fns';

import { i18nTripDuration } from '../../global/i18n';
import { durationToTime, removeTimezoneFromISOTimeString } from '../../global/helpers/date-helper';
import {
  HandlerRepository,
  documentLanguage,
  languageChangeHandlerAspect,
} from '../../global/helpers';

@Component({
  shadow: true,
  styleUrl: 'sbb-journey-summary.scss',
  tag: 'sbb-journey-summary',
})
export class SbbJourneySummary implements ComponentInterface {
  /**  The trip prop */
  @Prop() public trip!: InterfaceSbbJourneySummaryAttributes;

  /**  The tripBack prop */
  @Prop() public tripBack?: InterfaceSbbJourneySummaryAttributes;

  /**
   * The RoundTrip prop. This prop controls if one or two arrows are displayed in the header.
   */
  @Prop() public roundTrip?: boolean;
  /**
   * Per default, the current location has a pulsating animation. You can
   * disable the animation with this property.
   */
  @Prop() public disableAnimation?: boolean;

  @State() private _currentLanguage = documentLanguage();

  @Element() private _element!: HTMLElement;

  private _hasContentSlot: boolean;

  public componentWillLoad(): void {
    this._hasContentSlot = Boolean(this._element.querySelector('[slot="content"]'));
  }

  private _handlerRepository = new HandlerRepository(
    this._element,
    languageChangeHandlerAspect((l) => (this._currentLanguage = l))
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

  /**  renders the date of the journey or if it is the current or next day */
  private _renderJourneyStart(departureTime: Date): JSX.Element {
    if (isValid(departureTime))
      return (
        <span>
          <span>
            {departureTime.toLocaleDateString(this._currentLanguage, { weekday: 'short' })}.{' '}
          </span>
          <span>
            <time dateTime={format(departureTime, 'd') + ' ' + format(departureTime, 'M')}>
              {format(departureTime, 'dd.MM.yyyy')}
            </time>
          </span>
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

  private _renderJourneyInformation(trip: InterfaceSbbJourneySummaryAttributes): JSX.Element {
    const { vias, duration, departureWalk, departure, arrivalWalk, arrival, legs } = trip || {};

    const durationObj = durationToTime(duration, this._currentLanguage);

    return (
      <div>
        {vias?.length > 0 && this._renderJourneyVias(vias)}
        <div class="sbb-journey-summary__date">
          {this._renderJourneyStart(removeTimezoneFromISOTimeString(departure))}
          {duration > 0 && (
            <time>
              <span class="sbb-screenreaderonly">
                {`${i18nTripDuration[this._currentLanguage]} ${durationObj.long}`}
              </span>
              <span aria-hidden="true">, {durationObj.short}</span>
            </time>
          )}
        </div>
        <sbb-pearl-chain-time
          arrivalTime={arrival}
          departureTime={departure}
          departureWalk={departureWalk}
          arrivalWalk={arrivalWalk}
          legs={legs}
          disableAnimation={this.disableAnimation}
          data-now={this._now()}
        />
      </div>
    );
  }

  public render(): JSX.Element {
    const { origin, destination } = this.trip || {};
    return (
      <div class="sbb-journey-summary">
        {origin && (
          <sbb-journey-header
            size="l"
            level="3"
            origin={origin}
            destination={destination}
            roundTrip={this.roundTrip}
          ></sbb-journey-header>
        )}
        {this._renderJourneyInformation(this.trip)}
        {this.tripBack && (
          <div>
            <sbb-divider class="sbb-journey-summary__divider"></sbb-divider>
            {this._renderJourneyInformation(this.tripBack)}
          </div>
        )}
        {this._hasContentSlot && (
          <div class="sbb-journey-summary__slot">
            <slot name="content" />
          </div>
        )}
      </div>
    );
  }
}
