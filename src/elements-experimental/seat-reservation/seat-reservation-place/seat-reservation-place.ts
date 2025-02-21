import { forceType } from '@sbb-esta/lyne-elements/core/decorators/force-type';
import type { CSSResultGroup, TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import style from './seat-reservation-place.scss?lit&inline';

/**
 * Describe the purpose of the component with a single short sentence.
 *
 * @slot - Use the unnamed slot to add elements.
 */
export
@customElement('sbb-seat-reservation-place')
class SbbSeatReservationPlaceElement extends LitElement {
  public static override styles: CSSResultGroup = style;

  /** Seat Number Prop */
  @forceType()
  @property({ attribute: 'seat-number' })
  public accessor seatNumber: string = '';

  /** Direction Prop */
  @forceType()
  @property({ attribute: 'direction' })
  public accessor seatDirection: 'right' | 'bottom' | 'left' | 'top' = 'right';

  /** State Prop */
  @forceType()
  @property({ attribute: 'state' })
  public accessor seatState: 'free' | 'selected' | 'unavailable' | 'not-bookable' = 'free';

  protected override render(): TemplateResult {
    const seatNumber: string = this.seatNumber;
    const seatDirection: string = this.seatDirection;
    const seatState: string = this.seatState;
    const className = `place-seat place-seat--${seatDirection} place-seat--${seatState}`;

    let textOffsetX = 0;
    let textOffsetY = 0;
    if (seatDirection === 'right') {
      textOffsetX = -4;
      textOffsetY = 4;
    } else if (seatDirection === 'left') {
      textOffsetX = 4;
      textOffsetY = 4;
    } else if (seatDirection === 'top') {
      textOffsetY = 5;
    }

    return html` <svg
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      height="36"
      width="36"
      viewBox="0 0 36 36"
      class="${className}"
    >
      <g class="place-seat__shape">
        <path
          d="M1.5 4C1.5 3.17157 2.17157 2.5 3 2.5H25C26.933 2.5 28.5 4.067 28.5 6V30C28.5 31.933 26.933 33.5 25 33.5H3C2.17157 33.5 1.5 32.8284 1.5 32V4Z"
          class="place-seat__background"
        ></path>
        <path
          d="M1.5 4C1.5 3.17157 2.17157 2.5 3 2.5H25C26.933 2.5 28.5 4.067 28.5 6V30C28.5 31.933 26.933 33.5 25 33.5H3C2.17157 33.5 1.5 32.8284 1.5 32V4Z"
          stroke="currentColor"
        ></path>
        <path
          d="M9 32V34H3C1.89543 34 1 33.1046 1 32V4C1 2.89543 1.89543 2 3 2H9V4C9 5.10457 8.10457 6 7 6C5.89543 6 5 6.89543 5 8V28C5 29.1046 5.89543 30 7 30C8.10457 30 9 30.8954 9 32Z"
          fill="currentColor"
        ></path>
      </g>
      <path
        class="place-seat__checkmark"
        d="M15.7805 23.8065L24.8171 14.5161C24.8659 14.4645 24.9085 14.4065 24.9451 14.3419C24.9817 14.2774 25 14.2065 25 14.129C25 14.0516 24.9817 13.9742 24.9451 13.8968C24.9085 13.8194 24.8659 13.7548 24.8171 13.7032L23.3537 12.1935C23.3049 12.1419 23.2439 12.0968 23.1707 12.0581C23.0976 12.0194 23.0244 12 22.9512 12C22.878 12 22.8049 12.0194 22.7317 12.0581C22.6585 12.0968 22.5976 12.1419 22.5488 12.1935L15.378 19.5484L12.4512 16.6065C12.4024 16.529 12.3415 16.4774 12.2683 16.4516C12.1951 16.4258 12.122 16.4129 12.0488 16.4129C11.9756 16.4129 11.9085 16.4258 11.8476 16.4516C11.7866 16.4774 11.7195 16.529 11.6463 16.6065L10.1829 18.1161C10.1341 18.1677 10.0915 18.2323 10.0549 18.3097C10.0183 18.3871 10 18.4516 10 18.5032C10 18.6065 10.0183 18.6903 10.0549 18.7548C10.0915 18.8194 10.1341 18.8774 10.1829 18.929L14.9756 23.8065C15.0244 23.8839 15.0854 23.9355 15.1585 23.9613C15.2317 23.9871 15.3049 24 15.378 24C15.4512 24 15.5244 23.9871 15.5976 23.9613C15.6707 23.9355 15.7317 23.8839 15.7805 23.8065Z"
        fill="white"
      />
      <path
        class="place-seat__cross"
        d="M17 19.557L21.2818 23.8388C21.4967 24.0537 21.8453 24.0537 22.0603 23.8388L22.8388 23.0603C23.0537 22.8453 23.0537 22.4967 22.8388 22.2818L18.557 18L22.8388 13.7182C23.0537 13.5033 23.0537 13.1547 22.8388 12.9397L22.0603 12.1612C21.8453 11.9463 21.4967 11.9463 21.2818 12.1612L17 16.443L12.7182 12.1612C12.5033 11.9463 12.1547 11.9463 11.9397 12.1612L11.1612 12.9397C10.9463 13.1547 10.9463 13.5033 11.1612 13.7182L15.443 18L11.1612 22.2818C10.9463 22.4967 10.9463 22.8453 11.1612 23.0603L11.9397 23.8388C12.1547 24.0537 12.5033 24.0537 12.7182 23.8388L17 19.557Z"
        fill="#B7B7B7"
      />
      <text
        class="place-seat__text"
        fill="currentColor"
        x="${50 + textOffsetX}%"
        y="${50 + textOffsetY}%"
        dominant-baseline="middle"
        text-anchor="middle"
      >
        ${seatNumber}
      </text>
    </svg>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-seat-reservation-place': SbbSeatReservationPlaceElement;
  }
}
