import { forceType } from '@sbb-esta/lyne-elements/core/decorators/force-type';
import { type CSSResultGroup, nothing, type TemplateResult } from 'lit';
import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import '../seat-reservation-graphic.js';

import style from './seat-reservation-place-control.scss?lit&inline';

export const controlIcons = <const>[
  'PLACE_SEAT_FREE',
  'PLACE_SEAT_SELECTED',
  'PLACE_SEAT_RESTRICTED',
  'PLACE_SEAT_ALLOCATED',
  'PLACE_BIKE_FREE',
  'PLACE_BIKE_SELECTED',
  'PLACE_BIKE_RESTRICTED',
  'PLACE_BIKE_ALLOCATED',
];
export type ControlIcons = (typeof controlIcons)[number];

/**
 * Describe the purpose of the component with a single short sentence.
 *
 * @slot - Use the unnamed slot to add elements.
 */
export
@customElement('sbb-seat-reservation-place-control')
class SbbSeatReservationPlaceControlElement extends LitElement {
  public static override styles: CSSResultGroup = style;

  /** Name Prop */
  @forceType()
  @property({ attribute: 'name' })
  public accessor name: ControlIcons = controlIcons[0];

  /** Rotation Prop */
  @forceType()
  @property({ attribute: 'rotation' })
  public accessor rotation: number = 0;

  /** Graphic Rotation Prop */
  @forceType()
  @property({ attribute: 'graphic-rotation' })
  public accessor graphicRotation: number = 0;

  /** Width Prop */
  @forceType()
  @property({ attribute: 'width' })
  public accessor width: number = 3;

  /** Height Prop */
  @forceType()
  @property({ attribute: 'height' })
  public accessor height: number = 3;

  /** Text Prop */
  @forceType()
  @property({ attribute: 'text' })
  public accessor text: string = null;

  /** TextRotation Prop */
  @forceType()
  @property({ attribute: 'text-rotation' })
  public accessor textRotation: number = 0;

  protected override render(): TemplateResult {
    const name: string = this.name;
    const text: string | null = this.text;
    const width: number = this.width;
    const height: number = this.height;
    const rotation: number = this.rotation;
    const graphicRotation: number = this.graphicRotation | 0;
    const textRotation: number = this.textRotation | 0;

    return html`
      <style>
        :host {
          --place-control-rotation-from-host: ${unsafeCSS(rotation)};
          --place-control-text-rotation-from-host: ${unsafeCSS(textRotation)};
          --place-control-text-scale-from-host: ${unsafeCSS(Math.min(width, height))};
        }
      </style>
      <div class="sbb-seat-reservation-place-control">
        <button class="sbb-seat-reservation-place-control__button">
          <sbb-seat-reservation-graphic
            name="${name}"
            width="${width}"
            height="${height}"
            rotation="${graphicRotation}"
          ></sbb-seat-reservation-graphic>
          <span ${this.text ?? nothing} class="sbb-seat-reservation-place-control__text"
            >${text}</span
          >
        </button>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-seat-reservation-place-control': SbbSeatReservationPlaceControlElement;
  }
}
