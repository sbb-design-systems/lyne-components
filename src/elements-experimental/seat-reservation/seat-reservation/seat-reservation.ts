import { forceType } from '@sbb-esta/lyne-elements/core/decorators/force-type';
import type { CSSResultGroup, TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import interiorPlaceSeatDefault from '../assets/interior-place-seat-default.svg';
import interiorPlaceSeatNotBookable from '../assets/interior-place-seat-not-bookable.svg';
import interiorPlaceSeatSelected from '../assets/interior-place-seat-selected.svg';
import interiorPlaceSeatUnavailable from '../assets/interior-place-seat-unavailable.svg';

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
  @property({ attribute: 'my-prop' })
  public accessor myProp: string = 'Headline';

  // public static readonly events: Record<string, string> = {
  //   // Add event names or remove
  // } as const;

  protected override render(): TemplateResult {
    const myPropVar: string = this.myProp;
    return html`
      <div class="sbb-seat-reservation">
        <h1>${myPropVar}</h1>
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
