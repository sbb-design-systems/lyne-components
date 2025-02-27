import { forceType } from '@sbb-esta/lyne-elements/core/decorators/force-type';
import type { CSSResultGroup, TemplateResult } from 'lit';
import { html, LitElement, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import type { PlaceSelection } from '../seat-reservation-place-control.js';
import type {
  CoachItem,
  Place,
  ElementDimension,
  ElementPosition,
  InternalElement,
  SeatReservationLayout,
  DirectedInternalElement,
  CompartmentNumberElement,
  SignElement,
  BaseElement,
} from '../seat-reservation.js';

import style from './seat-reservation.scss?lit&inline';

import '../seat-reservation-area.js';
import '../seat-reservation-graphic.js';
import '../seat-reservation-navigation.js';
import '../seat-reservation-place-control.js';

/**
 * Describe the purpose of the component with a single short sentence.
 *
 * @slot - Use the unnamed slot to add elements.
 */
export
@customElement('sbb-seat-reservation')
class SbbSeatReservationElement extends LitElement {
  public static override styles: CSSResultGroup = style;

  /** align-vertical controls the visual represention of seat reservation in a horizonal or vertical alignment*/

  @forceType()
  @property({ attribute: 'layout', type: Object })
  public accessor seatReservationLayout: SeatReservationLayout = null!;

  /** Maximal number of possible clickable seats*/
  @forceType()
  @property({ attribute: 'max-reservations', type: Number })
  public accessor maxReservations: number = null!;

  /** align-vertical controls the visual represention of seat reservation in a horizonal or vertical alignment*/
  @forceType()
  @property({ attribute: 'align-vertical', type: Boolean })
  public accessor alignVertical: boolean = false;

  /** Any click functionality is prevented*/
  @forceType()
  @property({ attribute: 'disable', type: Boolean })
  public accessor disable: boolean = false;

  @state() private accessor _placeCollection: Record<string, Place[]> = {};
  private _maxHeight = 128;
  private _gridSize = 8;
  private _sizeFactor = this._maxHeight / this._gridSize;

  protected override render(): TemplateResult {
    console.log('RENDER SEATS');
    const classAlignVertical = this.alignVertical
      ? 'sbb-seat-reservation__wrapper sbb-seat-reservation__wrapper--vertical'
      : 'sbb-seat-reservation__wrapper';

    return html`
      <div class="sbb-seat-reservation">
        <div class="${classAlignVertical}">
          <sbb-seat-reservation-navigation
            .alignVertical=${this.alignVertical}
          ></sbb-seat-reservation-navigation>
          <div class="sbb-seat-reservation__parent">
            <ul class="sbb-seat-reservation__list-coaches">
              ${this._renderCoaches(this.seatReservationLayout.coachItems)}
            </ul>
          </div>
        </div>
      </div>
    `;
  }

  /**
   *
   * @param coaches
   * @returns
   */
  private _renderCoaches(coaches: CoachItem[]): TemplateResult[] {
    return coaches.map((coachItem: CoachItem, index: number) => {
      return html`
        <li class="sbb-seat-reservation__item-coach">
          ${this._renderCoachElement(coachItem, index)}
        </li>
      `;
    });
  }

  private _renderCoachElement(coachItem: CoachItem, index: number): TemplateResult {
    const calculatedCoachDimension = this._getCalculatedDimension(coachItem.dimension);

    if (!this._placeCollection[coachItem.id] && coachItem.places) {
      this._placeCollection[coachItem.id] = coachItem.places;
    }

    return html`
      <div style="width:${calculatedCoachDimension.w}px; height:${calculatedCoachDimension.h}px;">
        ${this._getRenderedCoachBorders(coachItem, index)}
        ${this._getRenderedDirectedInternalElements(coachItem.directedInternals)}
        ${this._getRenderedInternalElements(coachItem.internals)}
        ${this._getRenderedSignElements(coachItem.signs)}
        ${this._getRenderedCompoartmentNumberElements(coachItem.compartmentNumbers)}
        ${this._getRenderedPlaces(coachItem.id)}
      </div>
    `;
  }

  private _getRenderedCoachBorders(coachItem: CoachItem, coachIndex: number): TemplateResult {
    const allElements = coachItem.directedInternals?.concat(coachItem.internals || []);
    const driverArea = allElements?.find(
      (element: BaseElement) => element.icon === 'DRIVER_AREA_FULL',
    );
    const borderWidth = driverArea
      ? coachItem.dimension.w - driverArea.dimension.w
      : coachItem.dimension.w - 2;
    const borderOffsetX =
      coachIndex === 0 && driverArea
        ? (driverArea?.dimension.w - 1) * this._sizeFactor
        : this._sizeFactor;
    return html`
      <div style="position:absolute; left:${borderOffsetX}px;">
        <sbb-seat-reservation-graphic
          name="COACH_BORDER_MIDDLE"
          width=${borderWidth}
          height=${coachItem.dimension.h}
        ></sbb-seat-reservation-graphic>
      </div>
    `;
  }

  private _getRenderedPlaces(coachId: string): TemplateResult[] | null {
    return this._placeCollection[coachId]?.map((place: Place) => {
      const calculatedInternalDimension = this._getCalculatedDimension(place.dimension);
      const calculatedInternalPosition = this._getCalculatedPosition(place.position);
      const textRotation = place.rotation ? place.rotation * -1 : 0;

      return html`
        <div
          class="coach-background"
          style="position:absolute; top:${calculatedInternalPosition.y}px; left:${calculatedInternalPosition.x}px; width:${calculatedInternalDimension.w}px; height:${calculatedInternalDimension.h}px;"
        >
          <sbb-seat-reservation-place-control
            @selectPlace=${(selectPlaceEvent: CustomEvent) => this._onSelectPlace(selectPlaceEvent)}
            id=${coachId}
            text=${place.number}
            type=${place.type}
            state=${place.state}
            width=${place.dimension.w}
            height=${place.dimension.h}
            rotation=${place.rotation ?? nothing}
            text-rotation=${textRotation}
          ></sbb-seat-reservation-place-control>
        </div>
      `;
    });
  }

  private _onSelectPlace(selectPlaceEvent: CustomEvent): void {
    const selectedPlace = selectPlaceEvent.detail as PlaceSelection;
    console.log(selectedPlace);
  }

  private _getRenderedInternalElements(internals?: InternalElement[]): TemplateResult[] | null {
    if (!internals) {
      return null;
    }

    return internals?.map((internal: InternalElement) => {
      const calculatedInternalDimension = this._getCalculatedDimension(internal.dimension);
      const calculatedInternalPosition = this._getCalculatedPosition(internal.position);
      const rotation = internal.rotation ?? 0;
      return html`
        <div
          style="position:absolute; top:${calculatedInternalPosition.y}px; left:${calculatedInternalPosition.x}px; width:${calculatedInternalDimension.w}px; height:${calculatedInternalDimension.h}px;"
        >
          <sbb-seat-reservation-graphic
            name=${internal.icon ?? nothing}
            width=${internal.dimension.w}
            height=${internal.dimension.h}
            rotation=${rotation}
          ></sbb-seat-reservation-graphic>
        </div>
      `;
    });
  }

  private _getRenderedDirectedInternalElements(
    directedInternals?: InternalElement[],
  ): TemplateResult[] | null {
    if (!directedInternals) {
      return null;
    }

    return directedInternals?.map((directedInternal: DirectedInternalElement) => {
      const calculatedInternalDimension = this._getCalculatedDimension(directedInternal.dimension);
      const calculatedInternalPosition = this._getCalculatedPosition(directedInternal.position);
      const elementMounting = directedInternal.direction ?? 'FREE';

      return html`
        <div
          style="position:absolute; top:${calculatedInternalPosition.y}px; left:${calculatedInternalPosition.x}px; width:${calculatedInternalDimension.w}px; height:${calculatedInternalDimension.h}px;"
        >
          <sbb-seat-reservation-area
            width=${directedInternal.dimension.w}
            height=${directedInternal.dimension.h}
            mounting=${elementMounting}
          ></sbb-seat-reservation-area>
        </div>
      `;
    });
  }

  private _getRenderedSignElements(signs?: SignElement[]): TemplateResult[] | null {
    if (!signs) {
      return null;
    }

    return signs?.map((sign: SignElement) => {
      const calculatedcCmpartmentNumberDimension = this._getCalculatedDimension(sign.dimension);
      const calculatedcCmpartmentNumberPosition = this._getCalculatedPosition(sign.position);
      return html`
        <div
          style="position:absolute; top:${calculatedcCmpartmentNumberPosition.y}px; left:${calculatedcCmpartmentNumberPosition.x}px; width:${calculatedcCmpartmentNumberDimension.w}px; height:${calculatedcCmpartmentNumberDimension.h}px;"
        >
          <sbb-seat-reservation-graphic
            name=${sign.icon ?? nothing}
            width=${sign.dimension.w}
            height=${sign.dimension.h}
          ></sbb-seat-reservation-graphic>
        </div>
      `;
    });
  }

  private _getRenderedCompoartmentNumberElements(
    compartmentNumbers?: CompartmentNumberElement[],
  ): TemplateResult[] | null {
    if (!compartmentNumbers) {
      return null;
    }

    return compartmentNumbers?.map((compartmentNumber: CompartmentNumberElement) => {
      const calculatedcCmpartmentNumberDimension = this._getCalculatedDimension(
        compartmentNumber.dimension,
      );
      const calculatedcCmpartmentNumberPosition = this._getCalculatedPosition(
        compartmentNumber.position,
      );
      const color = compartmentNumber.number === '1' ? 'green' : 'yellow';
      return html`
        <div
          class="seat-reservation__compartment-number"
          style="position:absolute; top:${calculatedcCmpartmentNumberPosition.y}px; left:${calculatedcCmpartmentNumberPosition.x}px; width:${calculatedcCmpartmentNumberDimension.w}px; height:${calculatedcCmpartmentNumberDimension.h}px; background-color:${color};"
        >
          ${compartmentNumber.number}
        </div>
      `;
    });
  }

  private _getCalculatedDimension(elementDimension: ElementDimension): ElementDimension {
    return {
      w: this._sizeFactor * elementDimension.w,
      h: this._sizeFactor * elementDimension.h,
    };
  }

  private _getCalculatedPosition(elementPosition: ElementPosition): ElementPosition {
    return {
      x: this._sizeFactor * elementPosition.x,
      y: this._sizeFactor * elementPosition.y,
      z: 0,
    };
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-seat-reservation': SbbSeatReservationElement;
  }
}
