import { forceType } from '@sbb-esta/lyne-elements/core/decorators/force-type';
import {
  type CSSResultGroup,
  html,
  nothing,
  type TemplateResult,
  LitElement,
  type PropertyValues,
} from 'lit';
import { customElement, property } from 'lit/decorators.js';

import '../seat-reservation-graphic.js';

import style from './seat-reservation-place-control.scss?lit&inline';

export const controlPlaceTypeOptions = <const>['SEAT', 'BIKE'];
export type ControlPlaceType = (typeof controlPlaceTypeOptions)[number];

export const controlPlaceStateOptions = <const>['FREE', 'SELECTED', 'RESTRICTED', 'ALLOCATED'];
export type ControlPlaceState = (typeof controlPlaceStateOptions)[number];

export const controlIconNames = <const>[
  'PLACE_SEAT_FREE',
  'PLACE_SEAT_SELECTED',
  'PLACE_SEAT_RESTRICTED',
  'PLACE_SEAT_ALLOCATED',
  'PLACE_BIKE_FREE',
  'PLACE_BIKE_SELECTED',
  'PLACE_BIKE_RESTRICTED',
  'PLACE_BIKE_ALLOCATED',
];
export type ControlIconNames = (typeof controlIconNames)[number];

const getSvgName = (type: ControlPlaceType, state: ControlPlaceState): ControlIconNames | '' => {
  console.log(type, state);
  switch (type) {
    case 'SEAT':
      switch (state) {
        case 'FREE':
          return 'PLACE_SEAT_FREE';
        case 'SELECTED':
          return 'PLACE_SEAT_SELECTED';
        case 'RESTRICTED':
          return 'PLACE_SEAT_RESTRICTED';
        case 'ALLOCATED':
          return 'PLACE_SEAT_ALLOCATED';
        default:
          return '';
      }
    case 'BIKE':
      switch (state) {
        case 'FREE':
          return 'PLACE_BIKE_FREE';
        case 'SELECTED':
          return 'PLACE_BIKE_SELECTED';
        case 'RESTRICTED':
          return 'PLACE_BIKE_RESTRICTED';
        case 'ALLOCATED':
          return 'PLACE_BIKE_ALLOCATED';
        default:
          return '';
      }
    default:
      return '';
  }
};

/**
 * Describe the purpose of the component with a single short sentence.
 *
 * @slot - Use the unnamed slot to add elements.
 */
export
@customElement('sbb-seat-reservation-place-control')
class SbbSeatReservationPlaceControlElement extends LitElement {
  public static override styles: CSSResultGroup = style;

  /** Type Prop */
  @forceType()
  @property({ attribute: 'type' })
  public accessor type: ControlPlaceType = controlPlaceTypeOptions[0];

  /** State Prop */
  @forceType()
  @property({ attribute: 'state' })
  public accessor state: ControlPlaceState = controlPlaceStateOptions[0];

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
  public accessor text: string = '';

  /** TextRotation Prop */
  @forceType()
  @property({ attribute: 'text-rotation' })
  public accessor textRotation: number = 0;

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);
    if (changedProperties.has('width') || changedProperties.has('height')) {
      this.style?.setProperty(
        '--place-control-text-scale-from-host',
        `${Math.min(this.width, this.height)}`,
      );
    }
    if (changedProperties.has('textRotation')) {
      this.style?.setProperty('--place-control-text-rotation-from-host', `${this.textRotation}`);
    }
    if (changedProperties.has('rotation')) {
      this.style?.setProperty('--place-control-rotation-from-host', `${this.rotation}`);
    }
  }

  protected override render(): TemplateResult {
    const name: string = getSvgName(this.type, this.state);
    const type: string = this.type.toLowerCase();
    const state: string = this.state.toLowerCase();
    const text: string | null = this.text;
    const width: number = this.width;
    const height: number = this.height;
    const graphicRotation: number = this.graphicRotation | 0;

    return html`
      <div
        class="sbb-seat-reservation-place-control sbb-seat-reservation-place-control--type-${type}  sbb-seat-reservation-place-control--state-${state}"
      >
        <button class="sbb-seat-reservation-place-control__button">
          <sbb-seat-reservation-graphic
            .name=${name}
            .width=${width}
            .height=${height}
            .rotation=${graphicRotation}
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
