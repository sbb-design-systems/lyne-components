import { SbbLanguageController } from '@sbb-esta/lyne-elements/core/controllers.js';
import { forceType } from '@sbb-esta/lyne-elements/core/decorators.js';
import { html, nothing } from 'lit';
import type { CSSResultGroup, PropertyValues, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { getI18nSeatReservation } from '../common.js';
import type {
  CoachItem,
  Place,
  ElementDimension,
  BaseElement,
  PlaceSelection,
  SeatReservation,
} from '../seat-reservation.js';

import { SeatReservationBaseElement } from './seat-reservation-base-element.js';
import style from './seat-reservation.scss?lit&inline';

import '../seat-reservation-area.js';
import '../seat-reservation-graphic.js';
import '../seat-reservation-place-control.js';
import '../seat-reservation-navigation/seat-reservation-navigation-coach/seat-reservation-navigation-coach.js';
import './scoped-components/scoped-element.js';

/**
 * Describe the purpose of the component with a single short sentence.
 *
 * @event {CustomEvent<SeatReservationPlaceSelection>} selectedPlaces - Emits when a place was selected and returns a Place array with all selected places
 */
export
@customElement('sbb-seat-reservation')
class SbbSeatReservationElement extends SeatReservationBaseElement {
  public static override styles: CSSResultGroup = style;

  /** seat reservation */
  @property({ attribute: 'seat-reservation', type: Object })
  public override accessor seatReservation: SeatReservation = null!;

  /** The seat resvervation navigation can be toggled by this property*/
  @forceType()
  @property({ attribute: 'has-navigation', type: Boolean })
  public override accessor hasNavigation: boolean = true;

  /** align-vertical controls the visual represention of seat reservation in a horizonal or vertical alignment*/
  @forceType()
  @property({ attribute: 'align-vertical', type: Boolean })
  public override accessor alignVertical: boolean = false;

  /** Maximal number of possible clickable seats*/
  @forceType()
  @property({ attribute: 'max-reservations', type: Number })
  public override accessor maxReservations: number = null!;

  /** Any click functionality is prevented*/
  @forceType()
  @property({ attribute: 'disable', type: Boolean })
  public accessor disable: boolean = false;

  private _language = new SbbLanguageController(this);
  private _coachesHtmlTemplate?: TemplateResult;
  private _notAreaElements = [
    'DRIVER_AREA_FULL',
    'COACH_PASSAGE',
    'COMPARTMENT_PASSAGE',
    'COMPARTMENT_PASSAGE_HIGH',
    'COMPARTMENT_PASSAGE_MIDDLE',
    'COMPARTMENT_PASSAGE_LOW',
    'COACH_BORDER_OUTER',
  ];

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('hasNavigation')) {
      if (this.hasNavigation) {
        this.shadowRoot
          ?.querySelectorAll('table')
          .forEach((table) => table.removeAttribute('tabindex'));
      } else {
        this.shadowRoot
          ?.querySelectorAll('table')
          .forEach((table) => table.setAttribute('tabindex', '0'));
      }
    }
  }

  protected override firstUpdated(changedProperties: PropertyValues<this>): void {
    super.firstUpdated(changedProperties);
    this._componentSetup();
  }

  protected override render(): TemplateResult | null {
    this._initVehicleSeatReservationConstruction();
    return this._coachesHtmlTemplate || null;
  }

  private _componentSetup(): void {
    this.initNavigationSelectionByScrollEvent();
  }

  private _initVehicleSeatReservationConstruction(): void {
    const coachItems = JSON.parse(JSON.stringify(this.seatReservation?.coachItems));
    const classAlignVertical = this.alignVertical ? 'sbb-seat-reservation__wrapper--vertical' : '';

    this._coachesHtmlTemplate = html`
      <div class="sbb-seat-reservation">
        <sbb-screen-reader-only>
          <input
            id="first-tab-element"
            type="text"
            aria-label="Beginn der Grafische Sitzplatzreservierung"
            role="contentinfo"
            readonly
          />
        </sbb-screen-reader-only>

        ${this._renderNavigation()}

        <div
          class="sbb-seat-reservation__wrapper ${classAlignVertical}"
          @keydown=${(evt: KeyboardEvent) => this.handleKeyboardEvent(evt)}
        >
          <div
            id="sbb-seat-reservation__parent-area"
            class="sbb-seat-reservation__parent"
            tabindex="-1"
          >
            <ul class="sbb-seat-reservation__list-coaches" role="presentation">
              ${this._renderCoaches(coachItems)}
            </ul>
          </div>
        </div>

        <sbb-screen-reader-only>
          <input
            id="last-tab-element"
            type="input"
            aria-label="Verlassen der Grafische Sitzplatzreservierung"
            role="contentinfo"
            readonly
          />
        </sbb-screen-reader-only>
      </div>
    `;
  }

  private _renderNavigation(): TemplateResult | null {
    if (!this.hasNavigation) {
      return null;
    }

    const classAlignVertical = this.alignVertical
      ? 'sbb-seat-reservation-navigation--vertical'
      : '';

    return html`
      <nav class="sbb-seat-reservation-navigation ${classAlignVertical}">
        <ul
          class="sbb-seat-reservation-navigation__list-coaches"
          aria-label="${getI18nSeatReservation(
            'SEAT_RESERVATION_NAVIGATION',
            this._language.current,
          )}"
        >
          ${this.seatReservation?.coachItems.map((coachItem: CoachItem, index: number) => {
            return html`<li>
              <sbb-seat-reservation-navigation-coach
                @selectCoach=${(event: CustomEvent) => this._onSelectNavCoach(event)}
                @focusCoach=${() => this._onFocusNavCoach()}
                index="${index}"
                coach-id="${coachItem.id}"
                .selected=${this.selectedCoachIndex === index}
                .focused=${this.focusedCoachIndex === index}
                .propertyIds="${coachItem.propertyIds}"
                .travelClass="${coachItem.travelClass}"
                ?driver-area="${!coachItem.places?.length}"
                ?first="${index === 0}"
                ?last="${index === this.seatReservation?.coachItems.length - 1}"
                ?vertical="${this.alignVertical}"
              >
              </sbb-seat-reservation-navigation-coach>
            </li>`;
          })}
        </ul>
      </nav>
    `;
  }
  /**
   *
   * @param coaches
   * @returns
   */
  private _renderCoaches(coaches?: CoachItem[]): TemplateResult[] | null {
    if (!coaches) {
      return null;
    }
    return coaches.map((coachItem: CoachItem, index: number) => {
      return html`
        <li class="sbb-seat-reservation__item-coach">
          ${this._renderCoachElement(coachItem, index)}
        </li>
      `;
    });
  }

  private _renderCoachElement(coachItem: CoachItem, index: number): TemplateResult {
    const calculatedCoachDimension = this.getCalculatedDimension(coachItem.dimension);
    return html`
      <sbb-scoped-element
        scoped-classes="coach-wrapper"
        height="${calculatedCoachDimension.h}px"
        width="${calculatedCoachDimension.w}px"
      >
        ${this._getRenderedCoachBorders(coachItem, index)}
        ${this._getRenderedGraphicalElements(coachItem.graphicElements || [], coachItem.dimension)}
        ${this._getRenderedServiceElements(coachItem.serviceElements)}
        <table
          @focus=${() => this.onFocusTableCoachAndPreselectPlace(index)}
          class="coach-wrapper__table"
          id="seat-reservation-coach-${index}"
          role="grid"
        >
          ${this._getRenderedRowPlaces(coachItem, index)}
        </table>
      </sbb-scoped-element>
    `;
  }

  private _getRenderedCoachBorders(coachItem: CoachItem, coachIndex: number): TemplateResult {
    const allElements = coachItem.graphicElements;
    const COACH_PASSAGE_WIDTH = 1;
    const driverArea = allElements?.find(
      (element: BaseElement) => element.icon === 'DRIVER_AREA_FULL',
    );
    const borderWidth = driverArea
      ? coachItem.dimension.w - driverArea.dimension.w - COACH_PASSAGE_WIDTH
      : coachItem.dimension.w - COACH_PASSAGE_WIDTH * 2;
    const borderOffsetX =
      coachIndex === 0 && driverArea
        ? driverArea?.dimension.w * this.baseGridSize
        : this.baseGridSize;

    return html`
      <sbb-scoped-element
        scoped-classes="coach-border"
        inset-block-start="${this.coachBorderPadding * -1}px"
        inset-inline-start="${borderOffsetX}px"
      >
        <sbb-seat-reservation-graphic
          name="COACH_BORDER_MIDDLE"
          width=${borderWidth * this.baseGridSize}
          height=${(coachItem.dimension.h + this.coachBorderOffset * 2) * this.baseGridSize}
          ?stretch=${true}
          role="presentation"
        ></sbb-seat-reservation-graphic>
      </sbb-scoped-element>
    `;
  }

  private _getRenderedRowPlaces(coach: CoachItem, coachIndex: number): TemplateResult[] | null {
    if (!coach.places) {
      return null;
    }

    // Prepair rows with the places to render a table
    const tableRowPlaces: Record<number, Place[]> = {};
    for (const place of coach.places) {
      if (!tableRowPlaces[place.position.y]) {
        tableRowPlaces[place.position.y] = [place];
      } else {
        tableRowPlaces[place.position.y].push(place);
      }
    }

    return Object.values(tableRowPlaces)
      .map((rowPlaces: Place[], index) => {
        return html`
          <tr id="row-${coachIndex}-${rowPlaces[0].position.y}" data-row-index=${index}>
            ${this._getRenderedColumnPlaces(rowPlaces, coachIndex)}
          </tr>
        `;
      })
      .flatMap((rowTemplate) => rowTemplate);
  }

  private _getRenderedColumnPlaces(places: Place[], coachIndex: number): TemplateResult[] | null {
    //Sorts each place by its ascending x coordinate
    places.sort(
      (placeA: Place, placeB: Place) => Number(placeA.position.x) - Number(placeB.position.x),
    );

    return places?.map((place: Place, index: number) => {
      const calculatedInternalDimension = this.getCalculatedDimension(place.dimension);
      const calculatedInternalPosition = this.getCalculatedPosition(place.position);
      const textRotation = place.rotation ? place.rotation * -1 : 0;

      return html`
        <sbb-scoped-element
          scoped-classes="graphical-element"
          inset-block-start="${calculatedInternalPosition.y}px"
          inset-inline-start="${calculatedInternalPosition.x}px"
          width="${calculatedInternalDimension.w}px"
          height="${calculatedInternalDimension.h}px"
          z-index="${place.position.z}"
          cell-id="cell-${coachIndex}-${place.position.y}-${index}"
        >
          <sbb-seat-reservation-place-control
            @selectPlace=${(selectPlaceEvent: CustomEvent) => this._onSelectPlace(selectPlaceEvent)}
            id="seat-reservation__place-button-${coachIndex}-${place.number}"
            class="seat-reservation-place-control"
            data-cell-id="${coachIndex}-${place.position.y}-${index}"
            text=${place.number}
            type=${place.type}
            state=${place.state}
            width=${place.dimension.w * this.baseGridSize}
            height=${place.dimension.h * this.baseGridSize}
            rotation=${place.rotation ?? nothing}
            text-rotation=${textRotation}
            coach-index=${coachIndex}
            ?disable=${this.disable}
          ></sbb-seat-reservation-place-control>
        </sbb-scoped-element>
      `;
    });
  }

  private _getRenderedGraphicalElements(
    graphicalElements: BaseElement[],
    coachDimension: ElementDimension,
  ): TemplateResult[] | null {
    if (!graphicalElements) {
      return null;
    }

    return graphicalElements?.map((graphicalElement: BaseElement) => {
      const icon = graphicalElement.icon ?? '';
      const rotation = graphicalElement.rotation ?? 0;

      //check if the current element is not an area element, since this element is drawn without an area component
      if (this._notAreaElements.findIndex((notAreaElement) => notAreaElement === icon) > -1) {
        return this._getRenderElementWithoutArea(graphicalElement, rotation, coachDimension);
      }
      return this._getRenderElementWithArea(graphicalElement, rotation, coachDimension);
    });
  }

  private _getRenderElementWithArea(
    graphicalElement: BaseElement,
    rotation: number,
    coachDimension: ElementDimension,
  ): TemplateResult {
    const stretchHeight = graphicalElement.icon !== 'ENTRY_EXIT';
    const ariaLabelForArea = getI18nSeatReservation(
      graphicalElement.icon || '',
      this._language.current,
    );
    const calculatedDimension = this.getCalculatedDimension(
      graphicalElement.dimension,
      coachDimension,
      true,
      stretchHeight,
    );
    const calculatedPosition = this.getCalculatedPosition(
      graphicalElement.position,
      graphicalElement.dimension,
      coachDimension,
      true,
    );

    let elementMounting = 'FREE';
    if (graphicalElement.position.y === this.coachBorderOffset * -1) {
      elementMounting = 'UPPER_BORDER';
    } else if (
      graphicalElement.position.y + graphicalElement.dimension.h ===
      coachDimension.h + this.coachBorderOffset
    ) {
      elementMounting = 'LOWER_BORDER';
    }

    return html`
      <sbb-scoped-element
        scoped-classes="graphical-element"
        graph-elem-aria-label="${ariaLabelForArea}"
        inset-block-start="${calculatedPosition.y}px"
        inset-inline-start="${calculatedPosition.x}px"
        width="${calculatedDimension.w}px"
        height="${calculatedDimension.h}px"
        z-index="${graphicalElement.position.z}"
      >
        <sbb-seat-reservation-area
          width=${graphicalElement.dimension.w * this.baseGridSize}
          height=${graphicalElement.dimension.h * this.baseGridSize}
          mounting=${elementMounting}
          background="dark"
          aria-hidden="true"
        >
          <sbb-seat-reservation-graphic
            name=${graphicalElement.icon ?? nothing}
            rotation=${rotation}
            width=${this.baseGridSize}
            height=${this.baseGridSize}
            role="img"
            aria-hidden="true"
          ></sbb-seat-reservation-graphic>
        </sbb-seat-reservation-area>
      </sbb-scoped-element>
    `;
  }

  private _getRenderElementWithoutArea(
    graphicalElement: BaseElement,
    rotation: number,
    coachDimension: ElementDimension,
  ): TemplateResult {
    const calculatedDimension = this.getCalculatedDimension(
      graphicalElement.dimension,
      coachDimension,
    );
    const calculatedPosition = this.getCalculatedPosition(
      graphicalElement.position,
      graphicalElement.dimension,
      coachDimension,
    );

    // If the icon is the driver area, then here concat the vehicle type to get the right vehicle chassie icon
    const icon =
      graphicalElement.icon && graphicalElement.icon.indexOf('DRIVER_AREA') === -1
        ? graphicalElement.icon
        : graphicalElement.icon?.concat('_', this.seatReservation.vehicleType);
    const ariaLabel =
      icon && icon.indexOf('COACH_PASSAGE') > -1
        ? getI18nSeatReservation('COACH_PASSAGE', this._language.current)
        : null;

    return html`
      <sbb-scoped-element
        scoped-classes="graphical-element"
        graph-elem-aria-label="${ariaLabel || nothing}"
        inset-block-start="${calculatedPosition.y}px"
        inset-inline-start="${calculatedPosition.x}px"
        width="${calculatedDimension.w}px"
        height="${calculatedDimension.h}px"
        z-index="${graphicalElement.position.z}"
      >
        <sbb-seat-reservation-graphic
          name=${icon ?? nothing}
          width=${graphicalElement.dimension.w * this.baseGridSize}
          height=${graphicalElement.dimension.h * this.baseGridSize}
          rotation=${rotation}
          aria-hidden="true"
          ?stretch=${true}
        ></sbb-seat-reservation-graphic>
      </sbb-scoped-element>
    `;
  }

  private _getRenderedServiceElements(serviceElements?: BaseElement[]): TemplateResult[] | null {
    if (!serviceElements) {
      return null;
    }

    return serviceElements?.map((serviceElement: BaseElement) => {
      const calculatedcCmpartmentNumberDimension = this.getCalculatedDimension(
        serviceElement.dimension,
      );
      const calculatedcCmpartmentNumberPosition = this.getCalculatedPosition(
        serviceElement.position,
      );
      return html`
        <sbb-scoped-element
          scoped-classes="graphical-element"
          inset-block-start="${calculatedcCmpartmentNumberPosition.y}px"
          inset-inline-start="${calculatedcCmpartmentNumberPosition.x}px"
          width="${calculatedcCmpartmentNumberDimension.w}px"
          height="${calculatedcCmpartmentNumberDimension.h}px"
          z-index="${serviceElement.position.z}"
        >
          <sbb-seat-reservation-graphic
            name=${serviceElement.icon ?? nothing}
            width=${serviceElement.dimension.w * this.baseGridSize}
            height=${serviceElement.dimension.h * this.baseGridSize}
            role="img"
            aria-hidden="true"
          ></sbb-seat-reservation-graphic>
        </sbb-scoped-element>
      `;
    });
  }

  /**
   * Manages the selected place event triggered from the place
   * Each selection emits an array of all selected places
   * @param selectPlaceEvent
   */
  private _onSelectPlace(selectPlaceEvent: CustomEvent): void {
    const selectedPlace = selectPlaceEvent.detail as PlaceSelection;

    if (this.focusedCoachIndex === -1 || this.focusedCoachIndex === this.currSelectedCoachIndex) {
      // preventCoachScrollByPlaceClick tur used to prevent auto scroll We prevent
      this.preventCoachScrollByPlaceClick = true;
      if (!this.disable) {
        const place = this.seatReservation.coachItems[selectedPlace.coachIndex].places?.find(
          (place) => place.number == selectedPlace.number,
        );

        //Add place to place collection
        this.updateSelectedSeatReservationPlaces(selectedPlace);

        if (place) {
          this.selectedCoachIndex = selectedPlace.coachIndex;
          this.currSelectedCoachIndex = selectedPlace.coachIndex;
          this.currSelectedPlace = place;
        }
      }
    }
  }

  private _onSelectNavCoach(event: CustomEvent): void {
    const selectedNavCoachIndex = event.detail as number;
    if (selectedNavCoachIndex !== null && selectedNavCoachIndex !== this.currSelectedCoachIndex) {
      this.unfocusPlaceElement();
      this.scrollToSelectedNavCoach(selectedNavCoachIndex);
    }
  }

  private _onFocusNavCoach(): void {
    if (!this.preventCoachScrollByPlaceClick) {
      this.preselectFirstPlaceInCoach();
    } else {
      this.focusPlaceElement(this.currSelectedPlace);
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-seat-reservation': SbbSeatReservationElement;
  }
}
