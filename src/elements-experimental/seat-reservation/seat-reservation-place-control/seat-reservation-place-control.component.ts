import { SbbButtonBaseElement } from '@sbb-esta/lyne-elements/core/base-elements.js';
import { SbbLanguageController } from '@sbb-esta/lyne-elements/core/controllers.js';
import { forceType } from '@sbb-esta/lyne-elements/core/decorators.js';
import { boxSizingStyles } from '@sbb-esta/lyne-elements/core/styles.js';
import { type CSSResultGroup, html, nothing, type TemplateResult, type PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

import { getI18nSeatReservation } from '../common.ts';
import type { PlaceSelection, PlaceState, PlaceType } from '../common.ts';

import '../seat-reservation-graphic.ts';

import style from './seat-reservation-place-control.scss?lit&inline';

/**
 * Output the graphic of a seat or a bicycle place as a control element.
 */
export
@customElement('sbb-seat-reservation-place-control')
class SbbSeatReservationPlaceControlElement extends SbbButtonBaseElement {
  public static override styles: CSSResultGroup = [boxSizingStyles, style];
  public static readonly events = {
    selectplace: 'selectplace',
  } as const;

  /** placeType of the place, e.g. 'SEAT', 'BICYCLE' */
  @forceType()
  @property({ attribute: 'type' })
  public accessor placeType: PlaceType = 'SEAT';

  /** state of the place, e.g. 'FREE', 'SELECTED', 'BLOCKED' */
  @forceType()
  @property({ attribute: 'state', reflect: true })
  public accessor state: PlaceState = 'FREE';

  /** property ids of the place, to display more info about the place */
  @property({ attribute: 'propertyIds', type: Array })
  public accessor propertyIds: string[] = [];

  /** label of the place, e.g. '1A', '2B' */
  @forceType()
  @property({ attribute: 'text' })
  public accessor text: string = '';

  /** Deck Index Prop to identifier the right place to deck */
  @forceType()
  @property({ attribute: 'deck-index', type: Number })
  public accessor deckIndex: number = null!;

  /** Coach Index Prop to identifier the right place to coach */
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

  private _language = new SbbLanguageController(this);

  public constructor() {
    super();
    this.addEventListener('click', () => this._selectPlace());
  }

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);

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
    const width = this.style?.getPropertyValue('--sbb-seat-reservation-place-control-width');
    const height = this.style?.getPropertyValue('--sbb-seat-reservation-place-control-height');
    const rotation = this.style?.getPropertyValue('--sbb-seat-reservation-place-control-rotation');
    const textRotation = this.style?.getPropertyValue(
      '--sbb-seat-reservation-place-control-text-rotation',
    );
    const inverseRotationPlaceCheckIcon = Number(textRotation) - Number(rotation);
    const disabledClass = this.preventClick ? 'sbb-reservation-place-control--disabled' : null;

    this.title = this._getTitleDescriptionPlace();
    this.tabIndex = -1;

    return html`
      <div
        part="sbb-sr-place-part"
        class="sbb-sr-place-ctrl sbb-sr-place-ctrl--orientation-${rotation} sbb-sr-place-ctrl--state-${state} sbb-sr-place-ctrl--type-${type} ${disabledClass}"
      >
        <sbb-seat-reservation-graphic
          style=${styleMap({
            '--sbb-seat-reservation-graphic-width': width,
            '--sbb-seat-reservation-graphic-height': height,
            '--sbb-seat-reservation-graphic-rotation': rotation,
            '--sbb-seat-reservation-graphic-inverse-rotation': inverseRotationPlaceCheckIcon,
          })}
          .name=${name}
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
        .map((propertyId) =>
          getI18nSeatReservation('PLACE_PROPERTIES.' + propertyId, this._language.current),
        )
        .filter((value) => value)
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
        deckIndex: this.deckIndex,
        coachIndex: this.coachIndex,
        number: this.text,
        state: this.state,
        placeType: this.placeType,
      };

      /**
       * @type {CustomEvent<PlaceSelection>}
       * Emits when a place was selected via user interaction and returns a
       * PlaceSelection object with necessary place information.
       */
      this.dispatchEvent(
        new CustomEvent<PlaceSelection>('selectplace', {
          detail: placeSelection,
          bubbles: true,
          composed: true,
        }),
      );
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-seat-reservation-place-control': SbbSeatReservationPlaceControlElement;
  }
}
