import { Component, h, JSX, Prop, Element, ComponentInterface, State, Listen } from '@stencil/core';
import { InterfaceSbbJourneySummaryAttributes } from './sbb-journey-summary.custom';
import { isTomorrow, isToday, isValid, format } from 'date-fns';

import { i18nToday, i18nTomorrow, i18nTripDuration } from '../../global/i18n';
import { documentLanguage, SbbLanguageChangeEvent } from '../../global/helpers/language';
import { durationToTime, removeTimezoneFromISOTimeString } from '../../global/helpers/date-helper';

@Component({
  shadow: true,
  styleUrl: 'sbb-journey-summary.scss',
  tag: 'sbb-journey-summary',
})
export class SbbJourneySummary implements ComponentInterface {
  /**  The config prop */
  @Prop() public config!: InterfaceSbbJourneySummaryAttributes;

  /**
   * Per default, the current location has a pulsating animation. You can
   * disable the animation with this property.
   */
  @Prop() public disableAnimation?: boolean;

  @State() private _currentLanguage = documentLanguage();

  @Element() private _hostElement: HTMLElement;

  private _hasContentSlot: boolean;

  public componentWillLoad(): void {
    this._hasContentSlot = Boolean(this._hostElement.querySelector('[slot="content"]'));
  }

  @Listen('sbbLanguageChange', { target: 'document' })
  public handleLanguageChange(event: SbbLanguageChangeEvent): void {
    this._currentLanguage = event.detail;
  }

  private _now(): number {
    const dataNow = +this._hostElement.dataset?.now;
    return isNaN(dataNow) ? Date.now() : dataNow;
  }

  /**  renders the date of the journey or if it is the current or next day */
  private _renderJourneyStart(departureTime: Date): JSX.Element {
    if (isTomorrow(departureTime) || isToday(departureTime)) {
      return isTomorrow(departureTime) ? (
        <span>{i18nTomorrow[this._currentLanguage]}</span>
      ) : (
        <span>{i18nToday[this._currentLanguage]}</span>
      );
    }
    if (isValid(departureTime))
      return (
        <span>
          <time dateTime={format(departureTime, 'd') + ' ' + format(departureTime, 'M')}>
            {format(departureTime, 'dd.MM')}
          </time>
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

  public render(): JSX.Element {
    const {
      vias,
      origin,
      destination,
      duration,
      departureWalk,
      departure,
      arrivalWalk,
      arrival,
      legs,
    } = this.config || {};

    return (
      <div class="sbb-journey-summary">
        {origin && (
          <sbb-journey-header
            size="l"
            level="4"
            origin={origin}
            destination={destination}
          ></sbb-journey-header>
        )}
        {vias?.length > 0 && this._renderJourneyVias(vias)}
        <span class="sbb-journey-summary__date">
          {this._renderJourneyStart(removeTimezoneFromISOTimeString(departure))}
          {duration > 0 && (
            <span>
              ,
              <time>
                <span class="sbb-screenreaderonly">
                  {i18nTripDuration[this._currentLanguage] +
                    ' ' +
                    durationToTime(duration, this._currentLanguage).long}
                </span>
                <span aria-hidden>{durationToTime(duration, this._currentLanguage).short}</span>
              </time>
            </span>
          )}
        </span>
        <sbb-pearl-chain-time
          arrivalTime={arrival}
          departureTime={departure}
          departureWalk={departureWalk}
          arrivalWalk={arrivalWalk}
          legs={legs}
          disableAnimation={this.disableAnimation}
          data-now={this._now()}
        />
        {this._hasContentSlot && (
          <div class="sbb-journey-summary__slot">
            <slot name="content" />
          </div>
        )}
      </div>
    );
  }
}
