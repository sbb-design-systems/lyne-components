import { SbbLanguageController } from '@sbb-esta/lyne-elements/core/controllers.js';
import { html, isServer, nothing } from 'lit';
import type { CSSResultGroup, PropertyValues, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';

import { getI18nSeatReservation } from '../common.js';
import type { CoachItem, Place, ElementDimension, BaseElement, PlaceSelection } from '../common.js';

import { SeatReservationBaseElement } from './seat-reservation-base-element.js';
import style from './seat-reservation.scss?lit&inline';

import '@sbb-esta/lyne-elements/screen-reader-only.js';
import '../seat-reservation-area.js';
import '../seat-reservation-graphic.js';
import '../seat-reservation-place-control.js';
import '../seat-reservation-navigation/seat-reservation-navigation-coach.js';
import './seat-reservation-scoped.js';
import '@sbb-esta/lyne-elements/popover/popover.js';

/**
 * Main component for the seat reservation.
 *
 * @event {CustomEvent<SeatReservationSelectedPlacesEventDetails>} selectedPlaces - Emits when a place was selected and returns a Place array with all selected places
 * @event {CustomEvent<SeatReservationCoachSelection>} selectedCoach - Emits when a coach was selected and returns a CoachSelection
 */
export
@customElement('sbb-seat-reservation')
class SbbSeatReservationElement extends SeatReservationBaseElement {
  public static override styles: CSSResultGroup = style;

  private _language = new SbbLanguageController(this);
  private _coachesHtmlTemplate?: TemplateResult;

  // Graphics that should not be rendered with an area
  private _notAreaElements = [
    'DRIVER_AREA_FULL',
    'COACH_PASSAGE',
    'COACH_WALL_NO_PASSAGE',
    'COMPARTMENT_PASSAGE',
    'COMPARTMENT_PASSAGE_HIGH',
    'COMPARTMENT_PASSAGE_MIDDLE',
    'COMPARTMENT_PASSAGE_LOW',
  ];

  // Area icons that should not be fixed during rotation when vertical mode is selected
  private _notFixedRotatableAreaIcons = ['ENTRY_EXIT'];

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
    if (!isServer) {
      this._determineBaseFontSize();
    }

    this._initVehicleSeatReservationConstruction();
    return this._coachesHtmlTemplate || null;
  }

  private _componentSetup(): void {
    this.initNavigationSelectionByScrollEvent();
  }

  private _determineBaseFontSize(): void {
    const baseFontSize = parseInt(window.getComputedStyle(document.body).fontSize, 10);
    //calculate rem of 1px
    const onePixelInRem = 1 / baseFontSize;
    this.style?.setProperty('--sbb-reservation-one-px-rem', `${onePixelInRem + 'rem'}`);
  }

  private _initVehicleSeatReservationConstruction(): void {
    const coachItems = JSON.parse(JSON.stringify(this.seatReservation?.coachItems));
    const classAlignVertical = this.alignVertical ? 'sbb-sr__wrapper--vertical' : '';
    this._coachesHtmlTemplate = html`
      <div>
        <sbb-screen-reader-only>
          <input
            id="first-tab-element"
            role="contentinfo"
            type="text"
            aria-label="${getI18nSeatReservation('SEAT_RESERVATION_BEGIN', this._language.current)}"
            readonly
          />
        </sbb-screen-reader-only>

        <div @keydown=${(evt: KeyboardEvent) => this.handleKeyboardEvent(evt)}>
          ${this._renderNavigation()}
          <div class="sbb-sr__wrapper ${classAlignVertical}">
            <div id="sbb-sr__parent-area" class="sbb-sr__parent" tabindex="-1">
              <ul class="sbb-sr__list-coaches" role="presentation">
                ${this._renderCoaches(coachItems)}
              </ul>
            </div>
          </div>
        </div>

        <sbb-screen-reader-only>
          <input
            id="last-tab-element"
            role="contentinfo"
            type="text"
            aria-label="${getI18nSeatReservation('SEAT_RESERVATION_END', this._language.current)}"
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

    return html`
      <nav class="${classMap({ 'sbb-sr-navigation--vertical': this.alignVertical })}">
        <ul
          class="sbb-sr-navigation__list-coaches"
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
        <li class="sbb-sr__item-coach">${this._renderCoachElement(coachItem, index)}</li>
      `;
    });
  }

  private _renderCoachElement(coachItem: CoachItem, index: number): TemplateResult {
    const calculatedCoachDimension = this.getCalculatedDimension(coachItem.dimension);
    const descriptionTableCoachWithServices = this._getDescriptionTableCoach(coachItem);

    return html`<sbb-seat-reservation-scoped
      style=${styleMap({
        '--sbb-reservation-scoped-width': calculatedCoachDimension.w,
        '--sbb-reservation-scoped-height': calculatedCoachDimension.h,
      })}
    >
      ${this._getRenderedCoachBorders(coachItem, index)}
      ${this._getRenderedGraphicalElements(
        coachItem.graphicElements || [],
        coachItem.dimension,
        index,
      )}
      ${this._getRenderedServiceElements(index, coachItem.serviceElements)}

      <table
        @focus=${() => this.onFocusTableCoachAndPreselectPlace(index)}
        id="sbb-sr-coach-${index}"
        class="sbb-sr-coach-wrapper__table"
        aria-describedby="sbb-sr-coach-caption-${index}"
      >
        <caption id="sbb-sr-coach-caption-${index}" tabindex="-1">
          <sbb-screen-reader-only>${descriptionTableCoachWithServices}</sbb-screen-reader-only>
        </caption>
        ${this._getRenderedRowPlaces(coachItem, index)}
      </table>
    </sbb-seat-reservation-scoped>`;
  }

  /**
   * @returns Returns the border graphic (COACH_BORDER_MIDDLE) of a coach with calculated border gap and coach width,
   * depending on whether the coach is with a driver area or without.
   */
  private _getRenderedCoachBorders(coachItem: CoachItem, coachIndex: number): TemplateResult {
    const COACH_PASSAGE_WIDTH = 1;
    const allElements = coachItem.graphicElements;
    const driverArea = allElements?.find(
      (element: BaseElement) => element.icon === 'DRIVER_AREA_FULL',
    );
    const borderWidth = driverArea
      ? coachItem.dimension.w - driverArea.dimension.w - COACH_PASSAGE_WIDTH
      : coachItem.dimension.w - COACH_PASSAGE_WIDTH * 2;
    const borderHeight = (coachItem.dimension.h + this.coachBorderOffset * 2) * this.baseGridSize;
    const borderOffsetX =
      coachIndex === 0 && driverArea
        ? driverArea?.dimension.w * this.baseGridSize
        : this.baseGridSize;
    return html`
      <sbb-seat-reservation-graphic
        style=${styleMap({
          '--sbb-reservation-graphic-width': borderWidth * this.baseGridSize,
          '--sbb-reservation-graphic-height': borderHeight,
          '--sbb-reservation-graphic-top': this.coachBorderPadding * -1,
          '--sbb-reservation-graphic-left': borderOffsetX,
          '--sbb-reservation-graphic-position': 'absolute',
        })}
        name="COACH_BORDER_MIDDLE"
        ?stretch=${true}
        role="presentation"
      ></sbb-seat-reservation-graphic>
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
      const calculatedDimension = this.getCalculatedDimension(place.dimension);
      const calculatedPosition = this.getCalculatedPosition(place.position);
      const textRotation = this.alignVertical ? -90 : 0;

      return html`
        <td id="cell-${coachIndex}-${place.position.y}-${index}" class="graphical-element">
          <sbb-seat-reservation-place-control
            style=${styleMap({
              '--sbb-reservation-place-control-width': calculatedDimension.w,
              '--sbb-reservation-place-control-height': calculatedDimension.h,
              '--sbb-reservation-place-control-top': calculatedPosition.y,
              '--sbb-reservation-place-control-left': calculatedPosition.x,
            })}
            @selectPlace=${(selectPlaceEvent: CustomEvent) => this._onSelectPlace(selectPlaceEvent)}
            exportparts="sbb-sr-place-part"
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
            .propertyIds=${place.propertyIds}
            .preventClick=${this.preventPlaceClick}
          ></sbb-seat-reservation-place-control>
        </td>
      `;
    });
  }

  private _getRenderedGraphicalElements(
    graphicalElements: BaseElement[],
    coachDimension: ElementDimension,
    coachIndex: number,
  ): TemplateResult[] | null {
    if (!graphicalElements) {
      return null;
    }

    return graphicalElements?.map((graphicalElement: BaseElement) => {
      const icon = graphicalElement.icon ?? '';
      const elementRotation = graphicalElement.rotation || 0;
      const isNotFixedRotationGraphicalElement =
        this._notFixedRotatableAreaIcons.indexOf(graphicalElement.icon!) === -1;
      const elementFixedRotation =
        this.alignVertical && isNotFixedRotationGraphicalElement
          ? elementRotation - 90
          : elementRotation;

      //check if the current element is not an area element, since this element is drawn without an area component
      if (this._notAreaElements.findIndex((notAreaElement) => notAreaElement === icon) > -1) {
        return this._getRenderElementWithoutArea(graphicalElement, elementRotation, coachDimension);
      }
      return this._getRenderElementWithArea(
        graphicalElement,
        elementFixedRotation,
        coachDimension,
        coachIndex,
      );
    });
  }

  /**
   * creates a rendered element with an area component
   * @param graphicalElement
   * @param rotation
   * @param coachDimension
   * @param coachIndex used to generate a unique id for the popover trigger
   * @private
   */
  private _getRenderElementWithArea(
    graphicalElement: BaseElement,
    rotation: number,
    coachDimension: ElementDimension,
    coachIndex: number,
  ): TemplateResult {
    // for TABLE, we use the area component itself to display the table instead of the SVG graphic.
    // Due to different heights and widths, it wouldn't show correctly. To correct this, we would
    // need difficult calculations for position, rotation and dimension.
    const isNotTableGraphic = graphicalElement.icon?.indexOf('TABLE') === -1;

    const areaProperty = graphicalElement.icon && isNotTableGraphic ? graphicalElement.icon : null;
    const stretchHeight = areaProperty !== 'ENTRY_EXIT';
    const ariaLabelForArea = graphicalElement.icon
      ? getI18nSeatReservation(graphicalElement.icon, this._language.current)
      : nothing;
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

    //generate unique index number for the trigger element
    const triggerId = `popover-trigger-${coachIndex}-${calculatedPosition.x}-${calculatedPosition.y}`;

    let elementMounting = 'free';
    if (graphicalElement.position.y === this.coachBorderOffset * -1) {
      elementMounting = 'upper-border';
    } else if (
      graphicalElement.position.y + graphicalElement.dimension.h ===
      coachDimension.h + this.coachBorderOffset
    ) {
      elementMounting = 'lower-border';
    }

    return html`
      <sbb-seat-reservation-area
        id="${triggerId}"
        style=${styleMap({
          '--sbb-reservation-area-width': calculatedDimension.w,
          '--sbb-reservation-area-height': calculatedDimension.h,
          '--sbb-reservation-area-top': calculatedPosition.y,
          '--sbb-reservation-area-left': calculatedPosition.x,
        })}
        mounting=${elementMounting}
        background="dark"
        aria-hidden="true"
      >
        ${areaProperty
          ? html`
              <sbb-seat-reservation-graphic
                style=${styleMap({
                  '--sbb-reservation--cursor-pointer': 'pointer',
                })}
                name=${areaProperty}
                width=${this.baseGridSize}
                height=${this.baseGridSize}
                rotation=${rotation}
                role="img"
                aria-hidden="true"
              ></sbb-seat-reservation-graphic>
            `
          : nothing}
      </sbb-seat-reservation-area>
      ${this._popover(triggerId, ariaLabelForArea)}
    `;
  }

  /**
   * Creates a popover for extra service information
   * @param triggerId
   * @param popoverContent
   * @private
   */
  private _popover(
    triggerId: string,
    popoverContent: string | null | typeof nothing,
  ): TemplateResult {
    return html`
      <sbb-popover trigger="${triggerId}">
        <p class="sbb-text-s sbb-sr-popover">${popoverContent}</p>
      </sbb-popover>
    `;
  }

  /**
   * trigger to close all opened popovers (normally only one is opened at a time)
   * @private
   */
  private _closePopover(): void {
    this.shadowRoot
      ?.querySelectorAll('sbb-popover[data-state="opened"]')
      .forEach((popover) => popover.setAttribute('data-state', 'closed'));
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

    return html` <sbb-seat-reservation-graphic
      style=${styleMap({
        '--sbb-reservation-graphic-width': calculatedDimension.w,
        '--sbb-reservation-graphic-height': calculatedDimension.h,
        '--sbb-reservation-graphic-top': calculatedPosition.y,
        '--sbb-reservation-graphic-left': calculatedPosition.x,
        '--sbb-reservation-graphic-position': 'absolute',
      })}
      name=${icon ?? nothing}
      rotation=${rotation}
      aria-hidden="true"
      ?stretch=${true}
    ></sbb-seat-reservation-graphic>`;
  }

  private _getRenderedServiceElements(
    coachIndex: number,
    serviceElements?: BaseElement[],
  ): TemplateResult[] | null {
    if (!serviceElements) {
      return null;
    }

    return serviceElements?.map((serviceElement: BaseElement) => {
      const titleDescription = serviceElement.icon
        ? getI18nSeatReservation(serviceElement.icon, this._language.current)
        : null;
      const calculatedDimension = this.getCalculatedDimension(serviceElement.dimension);
      const calculatedPosition = this.getCalculatedPosition(serviceElement.position);
      const elementRotation = serviceElement.rotation || 0;
      const elementFixedRotation = this.alignVertical ? elementRotation - 90 : elementRotation;

      //generate unique index number for the trigger element
      const triggerId = `popover-trigger-${coachIndex}-${calculatedPosition.x}-${calculatedPosition.y}`;

      return html`
        <sbb-seat-reservation-graphic
          id="${triggerId}"
          style=${styleMap({
            '--sbb-reservation-graphic-width': calculatedDimension.w,
            '--sbb-reservation-graphic-height': calculatedDimension.h,
            '--sbb-reservation-graphic-top': calculatedPosition.y,
            '--sbb-reservation-graphic-left': calculatedPosition.x,
            '--sbb-reservation-graphic-position': 'absolute',
            '--sbb-reservation--cursor-pointer': 'pointer',
          })}
          name=${serviceElement.icon ?? nothing}
          .rotation=${elementFixedRotation}
          role="img"
          aria-hidden="true"
        ></sbb-seat-reservation-graphic>
        ${this._popover(triggerId, titleDescription)}
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
    // We have to set preventCoachScrollByPlaceClick to true, to prevent automatic scrolling to the new focused place
    this.preventCoachScrollByPlaceClick = true;
    this.isCoachGridFocusable = false;
    if (!this.preventPlaceClick) {
      // Add place to place collection
      this.updateSelectedSeatReservationPlaces(selectedPlace);
      this.updateCurrentSelectedPlaceInCoach(selectedPlace);
    }
  }

  private _onSelectNavCoach(event: CustomEvent): void {
    const selectedNavCoachIndex = event.detail as number;
    this.isKeyboardNavigation = false;

    if (selectedNavCoachIndex !== null && selectedNavCoachIndex !== this.currSelectedCoachIndex) {
      this.unfocusPlaceElement();
      this.scrollToSelectedNavCoach(selectedNavCoachIndex);
    } else if (selectedNavCoachIndex === this.currSelectedCoachIndex) {
      this.updateCurrentSelectedCoach();
      this.preselectPlaceInCoach();
    }

    //close all opened popovers
    this._closePopover();
  }

  private _onFocusNavCoach(): void {
    if (!this.preventCoachScrollByPlaceClick) {
      this.preselectPlaceInCoach();
    } else {
      this.focusPlaceElement(this.currSelectedPlace);
    }
    this.isAutoScrolling = false;
  }

  private _getDescriptionTableCoach(coachItem: CoachItem): string {
    if (!coachItem.places?.length) {
      return getI18nSeatReservation('COACH_BLOCKED_TABLE_CAPTION', this._language.current, [
        coachItem.id,
      ]);
    }

    let tableCoachDescription: string;
    const areaDescriptions = this._getTitleDescriptionListString(coachItem.graphicElements!);
    const serviceDescriptions = this._getTitleDescriptionListString(coachItem.serviceElements!);

    tableCoachDescription = getI18nSeatReservation('COACH_TABLE_CAPTION', this._language.current, [
      coachItem.id,
    ]);

    if (!!areaDescriptions || !!serviceDescriptions) {
      tableCoachDescription +=
        '. ' + getI18nSeatReservation('COACH_AVAILABLE_SERVICES', this._language.current) + ': ';
      tableCoachDescription += serviceDescriptions + ', ' + areaDescriptions + '.';
    }
    return tableCoachDescription;
  }

  private _getTitleDescriptionListString(descriptionsElements: BaseElement[]): string {
    const uniqueDescriptions: string[] = [];

    return descriptionsElements
      ?.map((descriptionElement) => {
        const icon = descriptionElement.icon;
        if (!icon) return null;

        const descriptionAlreayExist = uniqueDescriptions.indexOf(icon) > -1;
        const translation = getI18nSeatReservation(
          descriptionElement.icon!,
          this._language.current,
        );
        const isValidDescription =
          this._notFixedRotatableAreaIcons.indexOf(icon) === -1 &&
          this._notAreaElements.indexOf(icon) === -1;

        if (!descriptionAlreayExist) {
          uniqueDescriptions.push(descriptionElement.icon!);
        }
        return !!translation && !descriptionAlreayExist && isValidDescription ? translation : null;
      })
      .filter((description) => !!description)
      .join(', ');
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-seat-reservation': SbbSeatReservationElement;
  }
}
