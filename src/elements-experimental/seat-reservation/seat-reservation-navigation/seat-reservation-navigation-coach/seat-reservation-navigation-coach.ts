import { SbbLanguageController } from '@sbb-esta/lyne-elements/core/controllers/language-controller';
import { forceType } from '@sbb-esta/lyne-elements/core/decorators/force-type';
import { EventEmitter } from '@sbb-esta/lyne-elements/core/eventing/event-emitter';
import { type CSSResultGroup, nothing, type TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { choose } from 'lit/directives/choose.js';

import style from './seat-reservation-navigation-coach.scss?lit&inline';

import { getI18nSeatReservation } from '@sbb-esta/lyne-elements-experimental/seat-reservation/common/translations/i18n';
import '../../seat-reservation-graphic/seat-reservation-graphic.js';
import '../seat-reservation-navigation-services/seat-reservation-navigation-services.js';
import type { PlaceTravelClass } from '@sbb-esta/lyne-elements-experimental/seat-reservation/seat-reservation';

/**
 * This component will display the navigation coach item for Seat reservation.
 *
 * @event {CustomEvent<T>} selectCoach - Emits when a coach within the navigation was selected and returns the clicked coach nav index
 */
export
@customElement('sbb-seat-reservation-navigation-coach')
class SbbSeatReservationNavigationCoachElement extends LitElement {
  public static override styles: CSSResultGroup = style;
  public static readonly events = {
    selectCoach: 'selectCoach',
  } as const;

  @forceType()
  @property({ attribute: 'coach-id', type: String })
  public accessor coachId: string = '';

  @property({ attribute: 'property-ids', type: Array })
  public accessor propertyIds: string[] = [];

  /* pre-selected Coach index property */
  @forceType()
  @property({ type: Boolean })
  public accessor selected: boolean = false;

  @forceType()
  @property({ type: Number })
  public accessor index: number = 0;

  @property({ attribute: 'travel-class', type: String })
  public accessor travelClass: PlaceTravelClass = 'ANY_CLASS';

  @forceType()
  @property({ attribute: 'driver-area', type: Boolean })
  public accessor driverArea: boolean = false;

  @forceType()
  @property({ type: Boolean })
  public accessor first: boolean = false;

  @forceType()
  @property({ type: Boolean })
  public accessor last: boolean = false;

  private _language = new SbbLanguageController(this);

  /** Emits when a coach within the navigation was selected */
  protected selectNavCoach: EventEmitter<number> = new EventEmitter(
    this,
    SbbSeatReservationNavigationCoachElement.events.selectCoach,
  );

  protected override render(): TemplateResult {
    const coachSelectedClass = this.selected
      ? 'sbb-seat-reservation-navigation__item-coach--selected'
      : '';

    const lastCoachInLayout = this.last ? 'last-coach' : '';
    const firstCoachInLayout = this.first ? 'first-coach' : '';

    return html`
      <div
        class="sbb-seat-reservation-navigation__item-coach ${coachSelectedClass} ${lastCoachInLayout} ${firstCoachInLayout}"
      >
        ${this._getNavigationButton()}
        ${!this.driverArea && this.propertyIds?.length
          ? html`<sbb-seat-reservation-navigation-services
              .propertyIds="${this.propertyIds}"
            ></sbb-seat-reservation-navigation-services>`
          : nothing}
      </div>
    `;
  }

  private _getNavigationButton(): TemplateResult | null {
    return html`
      ${!this.driverArea
        ? html` <button
            type="button"
            class="sbb-seat-reservation-navigation__control-button"
            title="${getI18nSeatReservation('NAVIGATE_TO_COACH', this._language.current, [
              this.id,
            ])}"
            @click=${() => this._selectNavCoach(this.index)}
            @keydown="${(evt: KeyboardEvent) => this._handleKeyboardEvent(evt)}"
          >
            ${this._getBtnInformation()}
          </button>`
        : html`<div class="sbb-seat-reservation-navigation-driver-area"></div>`}
    `;
  }

  private _getBtnInformation(): TemplateResult | null {
    return html`
      ${this.travelClass === 'FIRST'
        ? html`<span class="sbb-seat-reservation-navigation--first-class"></span>`
        : nothing}
      ${this.travelClass || this.coachId
        ? html`<div class="sbb-seat-reservation-navigation__additional-information">
            ${this.coachId
              ? html`<div class="sbb-seat-reservation-navigation__item-coach-number">
                  ${this.coachId}
                </div>`
              : nothing}
            ${choose(this.travelClass, [
              [
                'FIRST',
                () =>
                  html`<div class="sbb-seat-reservation-navigation__item-coach-travelclass">
                    1
                  </div>`,
              ],
              [
                'SECOND',
                () =>
                  html`<div class="sbb-seat-reservation-navigation__item-coach-travelclass">
                    2
                  </div>`,
              ],
            ])}
          </div>`
        : nothing}
    `;
  }

  // handle navigation done with enter.
  private _handleKeyboardEvent(evt: KeyboardEvent): void {
    if (evt.code === 'Enter') {
      this._selectNavCoach(this.index);
    }
  }

  /**
   * emits the index of the coach array for the main navigation.
   * @param coachIndex
   * @private
   */
  private _selectNavCoach(coachIndex: number): void {
    this.selectNavCoach.emit(coachIndex);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-seat-reservation-navigation-coach': SbbSeatReservationNavigationCoachElement;
  }
}
