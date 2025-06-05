import { SbbButtonBaseElement } from '@sbb-esta/lyne-elements/core/base-elements.js';
import { SbbLanguageController } from '@sbb-esta/lyne-elements/core/controllers.js';
import { forceType } from '@sbb-esta/lyne-elements/core/decorators.js';
import { EventEmitter } from '@sbb-esta/lyne-elements/core/eventing.js';
import { type CSSResultGroup, html, nothing, type TemplateResult, type PropertyValues } from 'lit';
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
class SbbSeatReservationPlaceControlElement extends SbbButtonBaseElement {
  public static override styles: CSSResultGroup = style;
  public static readonly events = {
    selectPlace: 'selectPlace',
  } as const;

  /** placeType of the place, e.g. 'SEAT', 'BICYCLE' */
  @forceType()
  @property({ attribute: 'type' })
  public accessor placeType: PlaceType = 'SEAT';

  /** state of the place, e.g. 'FREE', 'SELECTED', 'BLOCKED' */
  @forceType()
  @property({ attribute: 'state' })
  public accessor state: PlaceState = 'FREE';

  /** property ids of the place, to display more info about the place */
  @property({ attribute: 'propertyIds', type: Array })
  public accessor propertyIds: string[] = [];

  /** rotation in degrees (without unit) */
  @forceType()
  @property({ attribute: 'rotation', type: Number })
  public accessor rotation: number = 0;

  /** width of the place in pixels (without unit) */
  @forceType()
  @property({ attribute: 'width', type: Number })
  public accessor width: number = 32;

  /** height of the place in pixels (without unit) */
  @forceType()
  @property({ attribute: 'height', type: Number })
  public accessor height: number = 32;

  /** label of the place, e.g. '1A', '2B' */
  @forceType()
  @property({ attribute: 'text' })
  public accessor text: string = '';

  /** Rotation of the text in degrees (without unit) */
  @forceType()
  @property({ attribute: 'text-rotation' })
  public accessor textRotation: number = 0;

  /** Coach Index Prop to identifer the right place to coach */
  @forceType()
  @property({ attribute: 'coach-index', type: Number })
  public accessor coachIndex: number = null!;

  /** Prevent click prop prevent any place action */
  @forceType()
  @property({ attribute: 'prevent-click', type: Boolean })
  public accessor preventClick: boolean = false;

  /** Set the place focus outline style */
  @forceType()
  @property({ attribute: 'keyfocus' })
  public accessor keyfocus: string = 'unfocus';

  /** Emits when a place was selected by user. */
  protected placeSelected: EventEmitter<PlaceSelection> = new EventEmitter(
    this,
    SbbSeatReservationPlaceControlElement.events.selectPlace,
  );

  private _language = new SbbLanguageController(this);

  public constructor() {
    super();
    this.addEventListener('click', () => this._selectPlace());
  }

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
      if (this.keyfocus === 'focus') {
        this.focus();
      }
    }
  }

  protected override render(): TemplateResult {
    const name: string = this._getPlaceSvg(this.placeType, this.state);
    const type: string = this.type.toLowerCase();
    const state: string = this.state.toLowerCase();
    const text: string | null = this.text;
    const width: number = this.width;
    const height: number = this.height;
    const inverseRotationPlaceCheckIcon = this.textRotation - this.rotation;
    const disabledClass = this.preventClick ? 'sbb-reservation-place-control--disabled' : null;

    this.title = this._getTitleDescriptionPlace();
    this.tabIndex = -1;

    return html`
      <div
        part="sbb-sr-place-part"
        class="sbb-sr-place-ctrl sbb-sr-place-ctrl--orientation-${this
          .rotation} sbb-sr-place-ctrl--state-${state} sbb-sr-place-ctrl--type-${type} ${disabledClass}"
      >
        <sbb-seat-reservation-graphic
          .name=${name}
          .width=${width}
          .height=${height}
          .rotation=${this.rotation}
          .inverseRotation=${inverseRotationPlaceCheckIcon}
          aria-hidden="true"
        ></sbb-seat-reservation-graphic>
        <span ${this.text ?? nothing} class="sbb-sr-place-ctrl__text" aria-hidden="true"
          >${text}</span
        >
      </div>
    `;
  }

  private _getPlaceSvg(type: PlaceType, state: PlaceState): string {
    const typeString = type as string;
    const stateString = state as string;
    return `PLACE_${typeString}_${stateString}`;
  }

  private _getTitleDescriptionPlace(): string {
    const translationKey = 'PLACE_CONTROL_' + this.type + '_' + this.state;
    let description = getI18nSeatReservation(translationKey, this._language.current, [this.text]);

    if (this.propertyIds.length) {
      description +=
        '. ' + getI18nSeatReservation('PLACE_PROPERTY', this._language.current).concat(': ');
      description += this.propertyIds
        .map((propertyId) => getI18nSeatReservation(propertyId, this._language.current))
        .join(', ');
    }

    return description;
  }

  /** If the place selectable, we emit the placeSelection object which contains infos to the place state */
  private _selectPlace(): void {
    const selectable = (this.state === 'FREE' || this.state === 'SELECTED') && !this.preventClick;

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
