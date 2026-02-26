import { SbbButtonBaseElement } from '@sbb-esta/lyne-elements/core/base-elements.js';
import { SbbLanguageController } from '@sbb-esta/lyne-elements/core/controllers.js';
import { forceType } from '@sbb-esta/lyne-elements/core/decorators.js';
import { boxSizingStyles } from '@sbb-esta/lyne-elements/core/styles.js';
import { type CSSResultGroup, html, nothing, type TemplateResult, type PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

import { getI18nSeatReservation } from '../common.ts';
import type { PlaceSelection, PlaceState, PlaceType, TravelDirection } from '../common.ts';

import '../seat-reservation-graphic.ts';

import style from './seat-reservation-place-control.scss?lit&inline';

type TravelDirectionI18nKey =
  | 'TRAVEL_DIRECTION_IN_DIRECTION'
  | 'TRAVEL_DIRECTION_IN_OPPOSITE_DIRECTION'
  | 'TRAVEL_DIRECTION_TRANSVERSELY';

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

  /** direction of a whole train, used to compute an orientation of a place */
  @property({ attribute: 'travel-direction' })
  public accessor travelDirection: TravelDirection = 'NONE';

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

  /** Disable the mouse over title information */
  @forceType()
  @property({ type: Boolean, useDefault: true })
  public accessor showTitleInfo: boolean = false;

  private _optionalScreenreaderInfo: string = '';

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

    // if title was shown once, we cannot unset it completely, but this
    // behaviour should not happen very often as the title should
    // not switch from on to off and on again
    if (changedProperties.has('showTitleInfo')) {
      if (!this.showTitleInfo) {
        this.title = '';
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

    // only set title to the SbbButtonBaseElement if requested; otherwise provide the title
    // information to screen readers via an additional element
    if (this.showTitleInfo) {
      this.title = this._getTitleDescriptionPlace(rotation);
    } else {
      this._optionalScreenreaderInfo = this._getTitleDescriptionPlace(rotation);
    }

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
        ${!this.showTitleInfo
          ? html`<sbb-screen-reader-only id="${this.id}"
              >${this._optionalScreenreaderInfo}</sbb-screen-reader-only
            >`
          : nothing}
      </div>
    `;
  }

  private _getPlaceSvg(type: PlaceType, state: PlaceState): string {
    const typeString = type as string;
    const stateString = state as string;
    return `PLACE_${typeString}_${stateString}`;
  }

  private _getTitleDescriptionPlace(rotation: string | undefined): string {
    const translationKey = 'PLACE_CONTROL_' + this.type + '_' + this.state;
    let description = getI18nSeatReservation(translationKey, this._language.current, [this.text]);

    const relativeTravelDirection = this._getRelativeTravelDirection(rotation);

    if (this.propertyIds.length || relativeTravelDirection) {
      description +=
        '. ' + getI18nSeatReservation('PLACE_PROPERTY', this._language.current).concat(': ');

      description += [relativeTravelDirection, ...this.propertyIds]
        .map((propertyId) =>
          getI18nSeatReservation('PLACE_PROPERTIES.' + propertyId, this._language.current),
        )
        .filter((value) => value)
        .join(', ');
    }

    return description;
  }

  private _getRelativeTravelDirection(
    rotationValue: string | undefined,
  ): TravelDirectionI18nKey | undefined {
    if (
      !this.travelDirection ||
      this.travelDirection === 'NONE' ||
      this.placeType !== 'SEAT' ||
      !rotationValue
    )
      return undefined;
    const rotation = Number(rotationValue);

    if (rotation === 90 || rotation === 270) {
      return 'TRAVEL_DIRECTION_TRANSVERSELY';
    }

    const inDirection =
      (rotation === 0 && this.travelDirection === 'RIGHT') ||
      (rotation === 180 && this.travelDirection === 'LEFT');

    if (inDirection) {
      return 'TRAVEL_DIRECTION_IN_DIRECTION';
    } else if (rotation === 0 || rotation === 180) {
      return 'TRAVEL_DIRECTION_IN_OPPOSITE_DIRECTION';
    }

    return undefined;
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
