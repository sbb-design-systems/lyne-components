import { SbbLanguageController } from '@sbb-esta/lyne-elements/core/controllers/language-controller';
import { forceType } from '@sbb-esta/lyne-elements/core/decorators/force-type';
import { EventEmitter } from '@sbb-esta/lyne-elements/core/eventing/event-emitter';
import { type CSSResultGroup, nothing, type TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import type { CoachItem } from '../../seat-reservation.js';

import style from './seat-reservation-navigation-coach.scss?lit&inline';

import { getI18nSeatReservation } from '@sbb-esta/lyne-elements-experimental/seat-reservation/common/translations/i18n';
import '../../seat-reservation-graphic/seat-reservation-graphic.js';
import '../seat-reservation-navigation-services/seat-reservation-navigation-services.js';

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

  /* seat-reservation property */
  @forceType()
  @property({ attribute: 'coach-item', type: Object })
  public accessor coachItem: CoachItem = null!;

  /* pre-selected Coach index property */
  @forceType()
  @property({ attribute: 'selected', type: Boolean })
  public accessor selected: boolean = false;

  @forceType()
  @property({ attribute: 'index', type: Number })
  public accessor index: number = 0;

  @forceType()
  @property({ attribute: 'travelclass', type: String })
  public accessor travelclass: string = '';

  @forceType()
  @property({ attribute: 'driverarea', type: Boolean })
  public accessor driverarea: boolean = false;

  @forceType()
  @property({ attribute: 'first', type: Boolean })
  public accessor first: boolean = false;

  @forceType()
  @property({ attribute: 'last', type: Boolean })
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
        ${this._getNavigationButton(this.coachItem)}
        ${!this.driverarea && this.coachItem.propertyIds?.length
          ? html`<sbb-seat-reservation-navigation-services
              .propertyIds="${this.coachItem.propertyIds}"
            ></sbb-seat-reservation-navigation-services>`
          : nothing}
      </div>
    `;
  }

  private _getNavigationButton(coachItem: CoachItem): TemplateResult | null {
    if (!coachItem) {
      return null;
    }

    return html`
      ${!this.driverarea
        ? html` <button
            type="button"
            class="sbb-seat-reservation-navigation__control-button"
            title="${getI18nSeatReservation('NAVIGATE_TO_COACH', this._language.current, [
              coachItem.id,
            ])}"
            @click=${() => this._selectNavCoach(this.index)}
            @keydown="${(evt: KeyboardEvent) => this._handleKeyboardEvent(evt)}"
          >
            ${this._getBtnInformation(coachItem)}
          </button>`
        : html`<div class="sbb-seat-reservation-navigation-driver-area"></div>`}
    `;
  }

  private _getBtnInformation(coachItem: CoachItem): TemplateResult | null {
    if (!coachItem) {
      return null;
    }

    return html`
      ${this.travelclass.includes('FIRST')
        ? html`<span class="sbb-seat-reservation-navigation--first-class"></span>`
        : nothing}
      ${!this.driverarea
        ? html`
            <div class="sbb-seat-reservation-navigation__additional-information">
              <div class="sbb-seat-reservation-navigation__item-coach-number">${coachItem.id}</div>

              ${this.travelclass.includes('FIRST')
                ? html`<div class="sbb-seat-reservation-navigation__item-coach-travelclass">1</div>`
                : this.travelclass.includes('SECOND')
                  ? html`<div class="sbb-seat-reservation-navigation__item-coach-travelclass">
                      2
                    </div>`
                  : nothing}
            </div>
          `
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
