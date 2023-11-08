import { Leg } from '../core/timetable';
import { isValid, format } from 'date-fns';
import { i18nTripDuration } from '../core/i18n';
import {
  durationToTime,
  NativeDateAdapter,
  removeTimezoneFromISOTimeString,
} from '../core/datetime';
import { documentLanguage, HandlerRepository, languageChangeHandlerAspect } from '../core/eventing';
import { CSSResult, html, LitElement, nothing, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { TitleLevel } from '../title';
import style from './journey-summary.scss?lit&inline';
import '../pearl-chain-time';
import '../journey-header';
import '../divider';

export interface InterfaceSbbJourneySummaryAttributes {
  legs: Leg[];
  vias?: string[];
  origin: string;
  destination: string;
  arrivalWalk?: number;
  departure: string;
  arrival: string;
  departureWalk?: number;
  duration?: number;
}

/**
 * TODO: Document me
 */
@customElement('sbb-journey-summary')
export class SbbJourneySummary extends LitElement {
  public static override styles: CSSResult = style;

  /**  The trip prop */
  @property({ type: Object }) public trip!: InterfaceSbbJourneySummaryAttributes;

  /**  The tripBack prop */
  @property({ attribute: 'trip-back', type: Object })
  public tripBack?: InterfaceSbbJourneySummaryAttributes;

  /**
   * The RoundTrip prop. This prop controls if one or two arrows are displayed in the header.
   */
  @property({ attribute: 'round-trip', type: Boolean }) public roundTrip?: boolean;

  /** Heading level of the journey header element (e.g. h1-h6). */
  @property({ attribute: 'header-level' }) public headerLevel?: TitleLevel = '3';

  /**
   * Per default, the current location has a pulsating animation. You can
   * disable the animation with this property.
   */
  @property({ attribute: 'disable-animation', type: Boolean }) public disableAnimation?: boolean;

  @state() private _currentLanguage = documentLanguage();

  private _hasContentSlot: boolean;

  private _handlerRepository = new HandlerRepository(
    this,
    languageChangeHandlerAspect((l) => (this._currentLanguage = l)),
  );

  public override connectedCallback(): void {
    super.connectedCallback();
    this._hasContentSlot = Boolean(this.querySelector('[slot="content"]'));
    this._handlerRepository.connect();
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._handlerRepository.disconnect();
  }

  private _now(): number {
    const dataNow = +this.dataset?.now;
    return isNaN(dataNow) ? Date.now() : dataNow;
  }

  /**  renders the date of the journey or if it is the current or next day */
  private _renderJourneyStart(departureTime: Date, duration: number): TemplateResult {
    const dateAdapter = new NativeDateAdapter();
    const durationObj = durationToTime(duration, this._currentLanguage);

    if (isValid(departureTime))
      return html`
        <time datetime=${format(departureTime, 'd') + ' ' + format(departureTime, 'M')}>
          ${dateAdapter.format(departureTime).replace(',', '.')}</time
        >${duration > 0
          ? html`,<time>
                <span class="sbb-screenreaderonly">
                  ${i18nTripDuration[this._currentLanguage]} ${durationObj.long}
                </span>
                <span aria-hidden="true">${durationObj.short}</span>
              </time>`
          : nothing}
      `;
  }

  private _renderJourneyVias(vias: string[]): TemplateResult {
    const slicedVias = vias.slice(0, 5);
    return html`
      <div class="sbb-journey-summary__via-block">
        <span class="sbb-journey-summary__via-text">Via</span>
        <ul class="sbb-journey-summary__vias" role=${vias.length <= 1 ? 'presentation' : nothing}>
          ${slicedVias.map(
            (via, index) =>
              html`<li class="sbb-journey-summary__via">
                ${via}${index !== slicedVias.length - 1 && index < 4
                  ? html`<span>,</span>`
                  : nothing}
              </li>`,
          )}
        </ul>
      </div>
    `;
  }

  private _renderJourneyInformation(trip: InterfaceSbbJourneySummaryAttributes): TemplateResult {
    const { vias, duration, departureWalk, departure, arrivalWalk, arrival, legs } = trip || {};

    return html`
      <div>
        ${vias?.length > 0 ? this._renderJourneyVias(vias) : nothing}
        <div class="sbb-journey-summary__date">
          ${this._renderJourneyStart(removeTimezoneFromISOTimeString(departure), duration)}
        </div>
        <sbb-pearl-chain-time
          .arrivalTime=${arrival}
          .departureTime=${departure}
          .departureWalk=${departureWalk}
          .arrivalWalk=${arrivalWalk}
          .legs=${legs}
          .disableAnimation=${this.disableAnimation}
          data-now=${this._now()}
        ></sbb-pearl-chain-time>
      </div>
    `;
  }

  protected override render(): TemplateResult {
    const { origin, destination } = this.trip || {};
    return html`
      <div class="sbb-journey-summary">
        ${origin
          ? html`<sbb-journey-header
              size="l"
              .level=${this.headerLevel ?? nothing}
              .origin=${origin}
              .destination=${destination}
              .roundTrip=${this.roundTrip ?? nothing}
            ></sbb-journey-header>`
          : nothing}
        ${this._renderJourneyInformation(this.trip)}
        ${this.tripBack
          ? html`<div>
              <sbb-divider class="sbb-journey-summary__divider"></sbb-divider>
              ${this._renderJourneyInformation(this.tripBack)}
            </div>`
          : nothing}
        ${this._hasContentSlot
          ? html` <div class="sbb-journey-summary__slot">
              <slot name="content"></slot>
            </div>`
          : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-journey-summary': SbbJourneySummary;
  }
}
