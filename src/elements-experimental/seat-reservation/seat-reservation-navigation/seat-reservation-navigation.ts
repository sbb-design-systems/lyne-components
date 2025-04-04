import { SbbLanguageController } from '@sbb-esta/lyne-elements/core/controllers.js';
import { forceType } from '@sbb-esta/lyne-elements/core/decorators.js';
import { type CSSResultGroup, type TemplateResult, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { getI18nSeatReservation } from '../common.js';
import type { CoachItem, SeatReservation } from '../seat-reservation.js';

import style from './seat-reservation-navigation.scss?lit&inline';

import '../seat-reservation-graphic.js';
import '@sbb-esta/lyne-elements/icon.js';
import './seat-reservation-navigation-coach/seat-reservation-navigation-coach.js';
/**
 * It will display the navigation for Seat reservation.
 *
 */
export
@customElement('sbb-seat-reservation-navigation')
class SbbSeatReservationNavigationElement extends LitElement {
  public static override styles: CSSResultGroup = style;

  /* seat-reservation property */
  @property({ attribute: 'seat-reservation', type: Object })
  public accessor seatReservation: SeatReservation = null!;

  /* pre-selected Coach index property */
  @forceType()
  @property({ attribute: 'selected-coach-index', type: Number })
  public accessor selectedCoachIndex: number = 0;

  private _language = new SbbLanguageController(this);

  protected override render(): TemplateResult {
    return html`
      <nav>
        <div
          aria-label="${getI18nSeatReservation(
            'SEAT_RESERVATION_NAVIGATION',
            this._language.current,
          )}"
          class="sbb-seat-reservation-navigation__list-coaches"
          role="list"
        >
          ${this.seatReservation?.coachItems.map((coachItem: CoachItem, index: number) => {
            return html`
              <sbb-seat-reservation-navigation-coach
                index="${index}"
                ?selected="${this.selectedCoachIndex === index}"
                coach-id="${coachItem.id}"
                .propertyIds="${coachItem.propertyIds}"
                travel-class="${coachItem.travelClass}"
                ?driver-area="${!coachItem.places?.length}"
                ?first="${index === 0}"
                ?last="${index === this.seatReservation?.coachItems.length - 1}"
                role="listitem"
              >
              </sbb-seat-reservation-navigation-coach>
            `;
          })}
        </div>
      </nav>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-seat-reservation-navigation': SbbSeatReservationNavigationElement;
  }
}
