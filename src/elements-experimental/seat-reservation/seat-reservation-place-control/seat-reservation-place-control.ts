import { SbbLanguageController } from '@sbb-esta/lyne-elements/core/controllers.js';
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

import { getI18nSeatReservation } from '../common.js';
import type { PlaceSelection, PlaceState, PlaceType } from '../seat-reservation.js';

import '../seat-reservation-graphic.js';

import style from './seat-reservation-place-control.scss?lit&inline';

/**
 * Output the graphic of a seat or a bicycle place as a control element.
 *
 * @event {CustomEvent<PlaceSelection>} selectPlace - Emits when a place was selected and returns a PlaceSelection object with necessary place information
 */
export
@customElement('sbb-seat-reservation-place-control')
class SbbSeatReservationPlaceControlElement extends LitElement {
  public static override styles: CSSResultGroup = style;
  public static readonly events = {
    selectPlace: 'selectPlace',
  } as const;

  /** Type Prop */
  @forceType()
  @property({ attribute: 'type', type: String })
  public accessor type: PlaceType = 'SEAT';

  /** State Prop */
  @forceType()
  @property({ attribute: 'state', type: String })
  public accessor state: PlaceState = 'FREE';

  /** Rotation Prop */
  @forceType()
  @property({ attribute: 'rotation', type: Number })
  public accessor rotation: number = 0;

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

  /** Coach Index Prop to identifer the right place to coach */
  @forceType()
  @property({ attribute: 'coach-index', type: Number })
  public accessor coachIndex: number = null!;

  /** Disable prop to prevent any seat action */
  @forceType()
  @property({ attribute: 'disable', type: Boolean })
  public accessor disable: boolean = false;

  /** Set the place focus outline style */
  @forceType()
  @property({ attribute: 'keyfocus', type: String })
  public accessor keyfocus: string = 'unfocus';

  /** Emits when a place was selected by user. */
  protected placeSelected: EventEmitter<PlaceSelection> = new EventEmitter(
    this,
    SbbSeatReservationPlaceControlElement.events.selectPlace,
  );

  private _language = new SbbLanguageController(this);

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('width') || changedProperties.has('height')) {
      this.style?.setProperty(
        '--sbb-place-control-text-scale-value',
        `${Math.min(this.width, this.height)}`,
      );
    }

    if (changedProperties.has('textRotation')) {
      this.style?.setProperty(
        '--sbb-reservation-place-control-text-rotation',
        `${this.textRotation}`,
      );
    }

    if (changedProperties.has('rotation')) {
      this.style?.setProperty('--sbb-reservation-place-control-rotation', `${this.rotation}`);
    }

    if (changedProperties.has('keyfocus')) {
      const placeButton = this.shadowRoot?.querySelector(
        '.sbb-seat-reservation-place-control__button',
      ) as HTMLButtonElement;

      if (this.keyfocus === 'focus') {
        placeButton.focus();
      }
    }
  }

  protected override render(): TemplateResult {
    const name: string = this._getPlaceSvg(this.type, this.state);
    const buttonDisabled: boolean =
      this.disable || !(this.state === 'FREE' || this.state === 'SELECTED');
    const type: string = this.type.toLowerCase();
    const state: string = this.state.toLowerCase();
    const text: string | null = this.text;
    const width: number = this.width;
    const height: number = this.height;
    const inverseRotationPlaceCheckIcon = this.textRotation - this.rotation;

    return html`
      <div
        class="sbb-seat-reservation-place-control--orientation-${this
          .rotation} sbb-seat-reservation-place-control sbb-seat-reservation-place-control--type-${type} sbb-seat-reservation-place-control--state-${state}"
      >
        <button
          class="sbb-seat-reservation-place-control__button"
          @click=${() => this._selectPlace()}
          aria-label=${this._getAriaPlaceLabel()}
          ?disabled=${buttonDisabled || nothing}
          tabindex="-1"
        >
          <sbb-seat-reservation-graphic
            .name=${name}
            .width=${width}
            .height=${height}
            .rotation=${this.rotation}
            .inverseRotation=${inverseRotationPlaceCheckIcon}
            aria-hidden="true"
          ></sbb-seat-reservation-graphic>
          <span
            ${this.text ?? nothing}
            class="sbb-seat-reservation-place-control__text"
            aria-hidden="true"
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
          ? getI18nSeatReservation('PLACE_CONTROL_SELECTED', this._language.current, [this.text])
          : getI18nSeatReservation('PLACE_CONTROL_FREE', this._language.current, [this.text]);
      }
      return this.state === 'SELECTED'
        ? getI18nSeatReservation('PLACE_CONTROL_BIKE_SELECTED', this._language.current, [this.text])
        : getI18nSeatReservation('PLACE_CONTROL_BIKE_FREE', this._language.current, [this.text]);
    } else {
      return this.type === 'SEAT'
        ? getI18nSeatReservation('PLACE_CONTROL_SEAT_NOT_AVAILABLE', this._language.current)
        : getI18nSeatReservation('PLACE_CONTROL_BIKE_SEAT_NOT_AVAILABLE', this._language.current);
    }
  }

  /** If the place selectable, we emit the placeSelection object which contains infos to the place state */
  private _selectPlace(): void {
    const selectable = this.state === 'FREE' || this.state === 'SELECTED';

    if (selectable) {
      this.state = this.state === 'FREE' ? 'SELECTED' : 'FREE';
      const placeSelection: PlaceSelection = {
        id: this.id,
        coachIndex: this.coachIndex,
        number: this.text,
        state: this.state,
      };
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
