import { forceType } from '@sbb-esta/lyne-elements/core/decorators/force-type';
import type { CSSResultGroup, TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import type { SeatReservationLayout } from '../seat-reservation.js';

import style from './seat-reservation.scss?lit&inline';

import '../seat-reservation-navigation.js';
import '../seat-reservation-place-control.js';

/**
 * Describe the purpose of the component with a single short sentence.
 *
 * @slot - Use the unnamed slot to add elements.
 */
export
@customElement('sbb-seat-reservation')
class SbbSeatReservationElement extends LitElement {
  public static override styles: CSSResultGroup = style;

  /** align-vertical controls the visual represention of seat reservation in a horizonal or vertical alignment*/
  @forceType()
  @property({ attribute: 'seat-reservation-layout', type: Object })
  public accessor seatReservationLayout: SeatReservationLayout = null!;

  /** Maximal number of possible clickable seats*/
  @forceType()
  @property({ attribute: 'max-reservations', type: Number })
  public accessor maxReservations: number = null!;

  /** align-vertical controls the visual represention of seat reservation in a horizonal or vertical alignment*/
  @forceType()
  @property({ attribute: 'align-vertical', type: Boolean })
  public accessor alignVertical: boolean = false;

  /** Any click functionality is prevented*/
  @forceType()
  @property({ attribute: 'disable', type: Boolean })
  public accessor disable: boolean = false;

  protected override render(): TemplateResult {
    const classAlignVertical = this.alignVertical
      ? 'sbb-seat-reservation__wrapper sbb-seat-reservation__wrapper--vertical'
      : 'sbb-seat-reservation__wrapper';
    const placeRotation = this.alignVertical ? -90 : 0;

    return html`
      <div class="sbb-seat-reservation">
        <div class="${classAlignVertical}">
          <sbb-seat-reservation-navigation
            .alignVertical=${this.alignVertical}
          ></sbb-seat-reservation-navigation>
          <div class="sbb-seat-reservation__parent">
            <ul class="sbb-seat-reservation__list-coaches">
              <li class="sbb-seat-reservation__item-coach">
                Coach 0
                <sbb-seat-reservation-place-control
                  name="PLACE_SEAT_FREE"
                  width="2"
                  height="2"
                  text="123"
                  text-rotation="${placeRotation}"
                ></sbb-seat-reservation-place-control>
                <sbb-seat-reservation-place-control
                  name="PLACE_SEAT_SELECTED"
                  width="2"
                  height="2"
                ></sbb-seat-reservation-place-control>
                <sbb-seat-reservation-place-control
                  name="PLACE_SEAT_RESTRICTED"
                  width="2"
                  height="2"
                ></sbb-seat-reservation-place-control>
                <sbb-seat-reservation-place-control
                  name="PLACE_SEAT_ALLOCATED"
                  width="2"
                  height="2"
                  text="123"
                  text-rotation="${placeRotation}"
                ></sbb-seat-reservation-place-control>
              </li>
              <li class="sbb-seat-reservation__item-coach">
                Coach 1
                <sbb-seat-reservation-place-control
                  name="PLACE_BIKE_FREE"
                  width="2"
                  height="2"
                  rotation="${placeRotation}"
                  text="123"
                ></sbb-seat-reservation-place-control>
                <sbb-seat-reservation-place-control
                  name="PLACE_BIKE_SELECTED"
                  width="2"
                  height="2"
                  rotation="${placeRotation}"
                ></sbb-seat-reservation-place-control>
                <sbb-seat-reservation-place-control
                  name="PLACE_BIKE_RESTRICTED"
                  width="2"
                  height="2"
                  rotation="${placeRotation}"
                  text="123"
                ></sbb-seat-reservation-place-control>
                <sbb-seat-reservation-place-control
                  name="PLACE_BIKE_ALLOCATED"
                  width="2"
                  height="2"
                  rotation="${placeRotation}"
                  text="123"
                ></sbb-seat-reservation-place-control>
              </li>
              <li class="sbb-seat-reservation__item-coach">Coach 2</li>
              <li class="sbb-seat-reservation__item-coach">Coach 3</li>
            </ul>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-seat-reservation': SbbSeatReservationElement;
  }
}
