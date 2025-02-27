import { forceType } from '@sbb-esta/lyne-elements/core/decorators.js';
import { EventEmitter } from '@sbb-esta/lyne-elements/core/eventing.js';
import {
  type CSSResultGroup,
  html,
  nothing,
  type TemplateResult,
  LitElement,
  type PropertyValues,
} from 'lit';
import { customElement, property } from 'lit/decorators.js';

import type { PlaceState, PlaceType } from '../seat-reservation.js';

import '../seat-reservation-graphic.js';

import style from './seat-reservation-place-control.scss?lit&inline';

export type PlaceSelection = {
  id: string;
  state: PlaceState;
};

/**
 * Describe the purpose of the component with a single short sentence.
 *
 * @slot - Use the unnamed slot to add elements.
 * @event {CustomEvent<PlaceSelection>} selectPlace - Emits when select a place and returns a PlaceSelection object with necessary place information
 */
export
@customElement('sbb-seat-reservation-place-control')
class SbbSeatReservationPlaceControlElement extends LitElement {
  public static override styles: CSSResultGroup = style;
  public static readonly events = {
    selectPlace: 'selectPlace',
  } as const;

  /** Id Prop */
  @forceType()
  @property({ attribute: 'id', type: String })
  public accessor coachId: string = '';

  /** Type Prop */
  @forceType()
  @property({ attribute: 'type' })
  public accessor type: PlaceType = 'SEAT';

  /** State Prop */
  @forceType()
  @property({ attribute: 'state' })
  public accessor state: PlaceState = 'FREE';

  /** Rotation Prop */
  @forceType()
  @property({ attribute: 'rotation', type: Number })
  public accessor rotation: number = 0;

  /** Graphic Rotation Prop */
  @forceType()
  @property({ attribute: 'graphic-rotation', type: Number })
  public accessor graphicRotation: number = 0;

  /** Width Prop */
  @forceType()
  @property({ attribute: 'width', type: Number })
  public accessor width: number = 3;

  /** Height Prop */
  @forceType()
  @property({ attribute: 'height', type: Number })
  public accessor height: number = 3;

  /** Text Prop */
  @forceType()
  @property({ attribute: 'text', type: String })
  public accessor text: string = '';

  /** TextRotation Prop */
  @forceType()
  @property({ attribute: 'text-rotation' })
  public accessor textRotation: number = 0;

  /** Emits when an place was selected by user. */
  protected placeSelected: EventEmitter = new EventEmitter(
    this,
    SbbSeatReservationPlaceControlElement.events.selectPlace,
  );

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
    const name: string = this._getPlaceSvg(this.type, this.state); //getSvgName(this.type, this.state);
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
        <button
          class="sbb-seat-reservation-place-control__button"
          @click=${() => this._selectPlace()}
          aria-label=${this._getAriaPlaceLabel()}
        >
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

  private _getPlaceSvg(type: PlaceType, state: PlaceState): string {
    const typeString = type as string;
    const stateString = state as string;
    return `PLACE_${typeString}_${stateString}`;
  }

  private _getAriaPlaceLabel(): string {
    if (this.state === 'FREE' || this.state === 'SELECTED') {
      if (this.type === 'SEAT') {
        return this.state === 'SELECTED'
          ? `Seat number ${this.text} is selected`
          : `Seat number ${this.text} is free`;
      }
      return this.state === 'SELECTED'
        ? `Bike place number ${this.text} is selected`
        : `Bike place number ${this.text} is free`;
    } else {
      return this.type === 'SEAT' ? `Seat not available` : `Bike place not available`;
    }
  }

  /** If the place selectable, we emit the placeSelection object which contains infos to the place state */
  private _selectPlace(): void {
    const selectable = this.state === 'FREE' || this.state === 'SELECTED';

    if (selectable) {
      this.state = this.state === 'FREE' ? 'SELECTED' : 'FREE';

      const placeSelection: PlaceSelection = { id: this.id, state: this.state };
      this.placeSelected.emit(placeSelection);
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-seat-reservation-place-control': SbbSeatReservationPlaceControlElement;
  }
}
