import { forceType } from '@sbb-esta/lyne-elements/core/decorators/force-type';
import type { CSSResultGroup, TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import interiorPlaceSeatDefault from '../assets/interior-place-seat-default.svg';
import interiorPlaceSeatNotBookable from '../assets/interior-place-seat-not-bookable.svg';
import interiorPlaceSeatSelected from '../assets/interior-place-seat-selected.svg';
import interiorPlaceSeatUnavailable from '../assets/interior-place-seat-unavailable.svg';

import '../seat-reservation-navigation/seat-reservation-navigation.js';

import style from './seat-reservation.scss?lit&inline';

/**
 * Describe the purpose of the component with a single short sentence.
 *
 * @slot - Use the unnamed slot to add elements.
 */
export
@customElement('sbb-seat-reservation')
class SbbSeatReservationElement extends LitElement {
  public static override styles: CSSResultGroup = style;

  /** example Prop */
  @forceType()
  @property({ attribute: 'align-vertical', type: Boolean })
  public accessor alignVertical: boolean = false;

  protected override render(): TemplateResult {
    const classAlignVertical = this.alignVertical
      ? 'sbb-seat-reservation__wrapper sbb-seat-reservation__wrapper--vertical'
      : 'sbb-seat-reservation__wrapper';

    return html`
      <div class="${classAlignVertical}">
        <sbb-seat-reservation-navigation .alignVertical=${this.alignVertical}></sbb-seat-reservation-navigation>
        <div class="sbb-seat-reservation__parent">
          <ul class="sbb-seat-reservation__list-coaches">
          <li class="sbb-seat-reservation__item-coach">
            Coach 0
          </li> 
          <li class="sbb-seat-reservation__item-coach">
            Coach 1
          </li>
          <li class="sbb-seat-reservation__item-coach">
            Coach 2
          </li>
          <li class="sbb-seat-reservation__item-coach">
            Coach 3
          </li><ul>
        </div>
      </div>

      <div class="sbb-seat-reservation">
      <slot></slot>
      <img src="${interiorPlaceSeatDefault}" alt="" />
      <img src="${interiorPlaceSeatSelected}" alt="" />
      <img src="${interiorPlaceSeatUnavailable}" alt="" />
      <img src="${interiorPlaceSeatNotBookable}" alt="" />
      <hr />
      <sbb-seat-reservation-place
        seat-number="888"
        direction="right"
      ></sbb-seat-reservation-place>
      <sbb-seat-reservation-place
        seat-number="888"
        direction="right"
        state="selected"
      ></sbb-seat-reservation-place>
      <sbb-seat-reservation-place
        seat-number="888"
        direction="right"
        state="unavailable"
      ></sbb-seat-reservation-place>
      <sbb-seat-reservation-place
        seat-number="888"
        direction="right"
        state="not-bookable"
      ></sbb-seat-reservation-place>
      <sbb-seat-reservation-place seat-number="123" direction="left"></sbb-seat-reservation-place>
      <sbb-seat-reservation-place
        seat-number="123"
        direction="left"
        state="selected"
      ></sbb-seat-reservation-place>
      <sbb-seat-reservation-place
        seat-number="123"
        direction="left"
        state="unavailable"
      ></sbb-seat-reservation-place>
      <sbb-seat-reservation-place
        seat-number="123"
        direction="left"
        state="not-bookable"
      ></sbb-seat-reservation-place>
      <hr />
      <sbb-seat-reservation-place
        seat-number="888"
        direction="bottom"
      ></sbb-seat-reservation-place>
      <sbb-seat-reservation-place
        seat-number="888"
        direction="bottom"
        state="selected"
      ></sbb-seat-reservation-place>
      <sbb-seat-reservation-place
        seat-number="888"
        direction="bottom"
        state="unavailable"
      ></sbb-seat-reservation-place>
      <sbb-seat-reservation-place
        seat-number="888"
        direction="bottom"
        state="not-bookable"
      ></sbb-seat-reservation-place>
      <hr />
      <sbb-seat-reservation-place seat-number="123" direction="top"></sbb-seat-reservation-place>
      <sbb-seat-reservation-place
        seat-number="123"
        direction="top"
        state="selected"
      ></sbb-seat-reservation-place>
      <sbb-seat-reservation-place
        seat-number="123"
        direction="top"
        state="unavailable"
      ></sbb-seat-reservation-place>
      <sbb-seat-reservation-place
        seat-number="123"
        direction="top"
        state="not-bookable"
      ></sbb-seat-reservation-place>
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
