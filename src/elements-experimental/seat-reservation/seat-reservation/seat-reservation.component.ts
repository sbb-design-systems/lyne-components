import { SbbLanguageController } from '@sbb-esta/lyne-elements/core/controllers.js';
import { boxSizingStyles } from '@sbb-esta/lyne-elements/core/styles.js';
import type { SbbPopoverElement } from '@sbb-esta/lyne-elements/popover.js';
import { html, nothing } from 'lit';
import type { CSSResultGroup, PropertyValues, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { repeat } from 'lit/directives/repeat.js';
import { styleMap } from 'lit/directives/style-map.js';

import { getI18nSeatReservation } from '../common.ts';
import type {
  CoachItem,
  Place,
  ElementDimension,
  BaseElement,
  PlaceSelection,
  SeatReservation,
  CoachItemDetails,
} from '../common.ts';

import { SeatReservationBaseElement } from './seat-reservation-base-element.ts';
import style from './seat-reservation.scss?lit&inline';

import '@sbb-esta/lyne-elements/button.js';
import '@sbb-esta/lyne-elements/screen-reader-only.js';
import '@sbb-esta/lyne-elements/popover.js';
import '../seat-reservation-area.ts';
import '../seat-reservation-graphic.ts';
import '../seat-reservation-place-control.ts';
import '../seat-reservation-navigation-coach.ts';
import '../seat-reservation-scoped.ts';

/**
 * Main component for the seat reservation.
 *
 */
export
@customElement('sbb-seat-reservation')
class SbbSeatReservationElement extends SeatReservationBaseElement {
  public static override styles: CSSResultGroup = [boxSizingStyles, style];

  private _language = new SbbLanguageController(this);
  private _coachesHtmlTemplate?: TemplateResult;

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

    // We need to wait until the first update is complete to init different HTML element dimensions
    this.updateComplete.then(() => {
      this.initNavigationSelectionByScrollEvent();
    });
  }

  protected override render(): TemplateResult | null {
    this._initVehicleSeatReservationConstruction();
    return this._coachesHtmlTemplate || null;
  }

  private _initVehicleSeatReservationConstruction(): void {
    this._coachesHtmlTemplate = html`
      ${this._renderTravelDirection()}
      <div class="sbb-sr__component">
        ${this._renderNavigation()}
        <div
          class="sbb-sr__wrapper-coach-decks"
          @keydown=${(evt: KeyboardEvent) => this.keyboardSeatmapEventHandling(evt)}
        >
          <div class="sbb-sr__wrapper-deck-labels">${this._renderDeckLabels()}</div>
          <div
            @scroll=${() => this.coachAreaScrollend()}
            id="sbb-sr__wrapper-scrollarea"
            class="sbb-sr__wrapper-scrollarea"
            tabindex="-1"
          >
            <div id="sbb-sr__parent-area" class="sbb-sr__parent">
              <ul
                class="${classMap({
                  'sbb-sr__list-decks': true,
                  'sbb-sr__list-decks--gap': this.hasMultipleDecks,
                })}"
              >
                ${this.seatReservations?.map(
                  (seatReservation: SeatReservation, coachDeckIndex: number) => {
                    return html`<li class="sbb-sr__list-item-deck">
                      <ul class="sbb-sr__list-coaches" role="presentation">
                        ${this._renderCoaches(seatReservation, coachDeckIndex)}
                      </ul>
                    </li>`;
                  },
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  private _renderDeckLabels(): TemplateResult[] | null {
    if (!this.hasMultipleDecks) return null;

    return this.seatReservations.map((seatReservation) => {
      const deckDescription = getI18nSeatReservation(
        seatReservation.deckCoachLevel,
        this._language.current,
      );
      return html`<b aria-hidden="true">${deckDescription}</b>`;
    });
  }

  private _renderNavigationControlButton(btnDirection: string): TemplateResult | null {
    if (!this.hasNavigation || !this.seatReservations) return null;
    const btnNavigationDirectionId =
      btnDirection == 'DIRECTION_RIGHT'
        ? 'sbb-sr-navigation__wrapper-button-direction--right'
        : 'sbb-sr-navigation__wrapper-button-direction--left';
    const btnIcon =
      btnDirection == 'DIRECTION_RIGHT' ? 'chevron-small-right-small' : 'chevron-small-left-small';
    const btnAriaDescription =
      btnDirection == 'DIRECTION_RIGHT'
        ? getI18nSeatReservation('SEAT_RESERVATION_END', this._language.current)
        : getI18nSeatReservation('SEAT_RESERVATION_BEGIN', this._language.current);
    let btnDisabled = true;

    if (btnDirection == 'DIRECTION_LEFT' && this.selectedCoachIndex > 0) {
      btnDisabled = false;
    } else if (
      btnDirection == 'DIRECTION_RIGHT' &&
      this.selectedCoachIndex < this.coachItemDetailsElements.length - 1
    ) {
      btnDisabled = false;
    }

    return html`<div class="sbb-sr-navigation__wrapper-button-direction">
      <sbb-secondary-button
        @click="${() => this.navigateByDirectionBtn(btnDirection)}"
        @focus="${() => this.onFocusNavDirectionButton()}"
        id="${btnNavigationDirectionId}"
        class="sbb-sr__navigation-control-button"
        size="m"
        icon-name="${btnIcon}"
        type="button"
        aria-label="${btnAriaDescription}"
        role="button"
        .disabledInteractive="${btnDisabled || nothing}"
        .disabled="${btnDisabled || nothing}"
      ></sbb-secondary-button>
    </div>`;
  }

  private _renderTravelDirection(): TemplateResult | null {
    if (!this.travelDirection || this.travelDirection === 'NONE') return null;

    const labelText = getI18nSeatReservation(
      'SEAT_RESERVATION_TRAVEL_DIRECTION',
      this._language.current,
    );

    const arrowDirection = this.alignVertical
      ? this.travelDirection === 'RIGHT'
        ? 'down'
        : 'up'
      : this.travelDirection === 'RIGHT'
        ? 'right'
        : 'left';

    const iconName = `arrow-${arrowDirection}-small`;

    return html`<div class="sbb-sr-travel-direction-wrapper">
      <div class="sbb-sr__travel-direction--arrow">
        <sbb-icon slot="icon" name="${iconName}"></sbb-icon>
      </div>
      <div class="sbb-sr__travel-direction--label">${labelText}</div>
    </div>`;
  }

  private _renderNavigation(): TemplateResult | null {
    if (!this.hasNavigation || !this.seatReservations) return null;
    return html`<div class="sbb-sr-navigation-wrapper">
      <nav id="sbb-sr-navigation" class="sbb-sr-navigation">
        ${this._renderNavigationControlButton('DIRECTION_LEFT')}
        <ul
          id="sbb-sr__navigation-list-coaches"
          class="sbb-sr-navigation__list-coaches"
          aria-label="${getI18nSeatReservation(
            'SEAT_RESERVATION_NAVIGATION',
            this._language.current,
          )}"
        >
          ${this.coachItemDetailsElements.map(
            (coachItemDetails: CoachItemDetails, index: number) => {
              return html`<li>
                <sbb-seat-reservation-navigation-coach
                  @selectcoach=${(event: CustomEvent<number>) => this._onSelectNavCoach(event)}
                  @focuscoach=${() => this._onFocusNavCoach()}
                  @keyup=${(evt: KeyboardEvent) => this.onKeyNavigationNavCoachButton(evt, index)}
                  index="${index}"
                  .selected=${this.selectedCoachIndex === index}
                  .focused=${this.focusedCoachIndex === index}
                  .hovered=${this.hoveredCoachIndex === index}
                  .nativeFocusActive=${this.hasSeatReservationNativeFocus}
                  .coachItemDetails="${coachItemDetails}"
                  ?vertical="${this.alignVertical}"
                  ?showTitleInfo="${this.showTitleInfo}"
                >
                </sbb-seat-reservation-navigation-coach>
              </li>`;
            },
          )}
        </ul>
        ${this._renderNavigationControlButton('DIRECTION_RIGHT')}
      </nav>
    </div>`;
  }
  /**
   *
   * @returns
   * @param seatReservation
   * @param coachDeckIndex
   */
  private _renderCoaches(
    seatReservation: SeatReservation,
    coachDeckIndex: number,
  ): TemplateResult[] | null {
    const coaches: CoachItem[] = JSON.parse(JSON.stringify(seatReservation?.coachItems));

    if (!coaches) {
      return null;
    }
    return coaches.map((coachItem: CoachItem, coachIndex: number) => {
      return html`
        <li class="sbb-sr__item-coach">
          ${this._renderCoachElement(
            coachItem,
            coachIndex,
            coachDeckIndex,
            seatReservation.deckCoachIndex,
          )}
        </li>
      `;
    });
  }

  private _renderCoachElement(
    coachItem: CoachItem,
    coachIndex: number,
    coachDeckIndex: number,
    placeCoachDeckIndex: number,
  ): TemplateResult {
    const calculatedCoachDimension = this.getCalculatedDimension(coachItem.dimension);
    const descriptionTableCoachWithServices = this._getDescriptionTableCoach(coachItem);

    return html`<sbb-seat-reservation-scoped
      style=${styleMap({
        '--sbb-seat-reservation-scoped-width': calculatedCoachDimension.w,
        '--sbb-seat-reservation-scoped-height': calculatedCoachDimension.h,
      })}
    >
      ${this._getRenderedCoachBorders(coachItem, coachIndex)}
      ${this._getRenderedGraphicalElements(
        coachItem.graphicElements || [],
        coachItem.dimension,
        coachIndex,
        coachDeckIndex,
      )}
      ${this._getRenderedServiceElements(coachIndex, coachDeckIndex, coachItem.serviceElements)}

      <table
        @focus=${() => this.onFocusTableCoachAndPreselectPlace(coachIndex)}
        id="sbb-sr-coach-${coachIndex}"
        class="sbb-sr-coach-wrapper__table"
        aria-describedby="sbb-sr-coach-caption-${coachIndex}"
        tabindex="-1"
      >
        <caption id="sbb-sr-coach-caption-${coachIndex}" tabindex="-1">
          <sbb-screen-reader-only>${descriptionTableCoachWithServices}</sbb-screen-reader-only>
        </caption>
        ${this._getRenderedRowPlaces(coachItem, coachIndex, coachDeckIndex, placeCoachDeckIndex)}
      </table>
    </sbb-seat-reservation-scoped>`;
  }

  /**
   * @returns Returns the border graphic (COACH_BORDER_MIDDLE) of a coach with calculated border gap and coach width,
   * depending on whether the coach is with a driver area or without.
   */
  private _getRenderedCoachBorders(
    coachItem: CoachItem,
    coachIndex: number,
  ): TemplateResult | null {
    if (!coachItem.graphicElements) return null;

    const COACH_PASSAGE_WIDTH = 1;
    const driverArea = this.coachItemDetailsElements[coachIndex]?.driverAreaElements?.driverArea;
    const driverAreaNoVerticalWall =
      this.coachItemDetailsElements[coachIndex]?.driverAreaElements?.driverAreaNoVerticalWall;

    let borderWidth = driverArea
      ? coachItem.dimension.w - driverArea.dimension.w - COACH_PASSAGE_WIDTH
      : coachItem.dimension.w - COACH_PASSAGE_WIDTH * 2;

    //multiply with base grid size always for all kind of borderWidth
    borderWidth *= this.baseGridSize;

    const borderHeight = (coachItem.dimension.h + this.coachBorderOffset * 2) * this.baseGridSize;
    let borderOffsetX =
      driverArea && driverArea.position.x === 0
        ? driverArea?.dimension.w * this.baseGridSize
        : this.baseGridSize;

    //recalculate the border width and offset if there is a driver area without vertical wall on both sides
    if (driverAreaNoVerticalWall) {
      const coachWidth = this.getCalculatedDimension(coachItem.dimension).w;

      //recalculated borderWidth = coachWidth - 2 * driver area width, since the driver area is on both sides
      borderWidth = coachWidth - 2 * (driverAreaNoVerticalWall.dimension.w * this.baseGridSize);

      //recalculated borderOffsetX = driver area width, since the border starts after the driver area on the left side
      borderOffsetX = driverAreaNoVerticalWall.dimension.w * this.baseGridSize;
    }

    const currentCoachOverlappingInfo = this.overHangingElementInformation.find(
      (el) => el.coachId == coachItem.id,
    );

    // check if there are overhanging places or graphical elements to adjust the border width and offset + gap
    // We do not differentiate whether there is something to be done on both sides as this would lead to unnecessary
    // complexity. So if there is something on one side, we just increase the coach-border on both sides.
    if (
      currentCoachOverlappingInfo?.overhangingPlaces ||
      currentCoachOverlappingInfo?.overhangingGraphicAreas
    ) {
      borderWidth += 2 * this.baseGridSize; // we increase the width by 2 grid sizes to have enough space for protruded places on both sides
      borderOffsetX = 0; // we start at 0 to have enough space on the left side as well
    }

    return html`
      <sbb-seat-reservation-graphic
        class="${classMap({
          'sbb-sr-coach-has-overhanging-elements':
            currentCoachOverlappingInfo?.overhangingPlaces ||
            currentCoachOverlappingInfo?.overhangingGraphicAreas ||
            false,
        })}"
        style=${styleMap({
          '--sbb-seat-reservation-graphic-width': borderWidth,
          '--sbb-seat-reservation-graphic-height': borderHeight,
          '--sbb-seat-reservation-graphic-top': this.coachBorderPadding * -1,
          '--sbb-seat-reservation-graphic-left': borderOffsetX,
          '--sbb-seat-reservation-graphic-position': 'absolute',
        })}
        name="COACH_BORDER_MIDDLE"
        ?stretch=${true}
        role="presentation"
      ></sbb-seat-reservation-graphic>
    `;
  }

  private _getRenderedRowPlaces(
    coach: CoachItem,
    coachIndex: number,
    coachDeckIndex: number,
    placeCoachDeckIndex: number,
  ): TemplateResult[] | null {
    if (!coach.places) {
      return null;
    }

    // Prepare rows with the places to render a table
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
            ${this._getRenderedColumnPlaces(
              rowPlaces,
              coachIndex,
              coachDeckIndex,
              placeCoachDeckIndex,
            )}
          </tr>
        `;
      })
      .flatMap((rowTemplate) => rowTemplate);
  }

  private _getRenderedColumnPlaces(
    places: Place[],
    coachIndex: number,
    deckIndex: number,
    placeCoachDeckIndex: number,
  ): TemplateResult | null {
    //Sorts each place by its ascending x coordinate
    places.sort(
      (placeA: Place, placeB: Place) => Number(placeA.position.x) - Number(placeB.position.x),
    );

    // For rendering the places within a td element, here we use repeat directive for better performance for reusing elements (track by id).
    const trackPlaceId = coachIndex + '-' + placeCoachDeckIndex;
    return html`${repeat(
      places,
      (place) => trackPlaceId + '-' + place.number,
      (place, index) => {
        const calculatedDimension = this.getCalculatedDimension(place.dimension);
        const calculatedPosition = this.getCalculatedPosition(place.position);
        const rotation = place.rotation || 0;
        const textRotation = this.alignVertical ? -90 : 0;
        const placeId = this.getPlaceElementId(deckIndex, coachIndex, place.number);
        return html`
          <td
            id="cell-${deckIndex}-${coachIndex}-${place.position.y}-${index}"
            class="graphical-element"
          >
            <sbb-seat-reservation-place-control
              style=${styleMap({
                '--sbb-seat-reservation-place-control-text-scale-value': Math.min(
                  calculatedDimension.w,
                  calculatedDimension.h,
                ),
                '--sbb-seat-reservation-place-control-width': calculatedDimension.w,
                '--sbb-seat-reservation-place-control-height': calculatedDimension.h,
                '--sbb-seat-reservation-place-control-top': calculatedPosition.y,
                '--sbb-seat-reservation-place-control-left': calculatedPosition.x,
                '--sbb-seat-reservation-place-control-rotation': rotation,
                '--sbb-seat-reservation-place-control-text-rotation': textRotation,
              })}
              @selectplace=${(selectPlaceEvent: CustomEvent<PlaceSelection>) =>
                this._onSelectPlace(selectPlaceEvent)}
              exportparts="sbb-sr-place-part"
              id=${placeId}
              class="seat-reservation-place-control"
              text=${place.number}
              type=${place.type}
              state=${place.state}
              coach-index=${coachIndex}
              deck-index=${placeCoachDeckIndex}
              data-deck-index=${deckIndex}
              .propertyIds=${place.propertyIds}
              .preventClick=${this.preventPlaceClick}
              ?showTitleInfo="${this.showTitleInfo}"
            ></sbb-seat-reservation-place-control>
          </td>
        `;
      },
    )}`;
  }

  private _getRenderedGraphicalElements(
    graphicalElements: BaseElement[],
    coachDimension: ElementDimension,
    coachIndex: number,
    coachDeckIndex: number,
  ): TemplateResult[] | null {
    if (!graphicalElements) return null;

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
      if (this.notAreaElements.findIndex((notAreaElement) => notAreaElement === icon) > -1) {
        return this._getRenderElementWithoutArea(graphicalElement, elementRotation, coachDimension);
      }
      return this._getRenderElementWithArea(
        graphicalElement,
        elementFixedRotation,
        coachDimension,
        coachIndex,
        coachDeckIndex,
      );
    });
  }

  /**
   * creates a rendered element with an area component
   * @param graphicalElement
   * @param rotation
   * @param coachDimension
   * @param coachIndex used to generate a unique id for the popover trigger
   * @param coachDeckIndex used to generate a unique id
   * @private
   */
  private _getRenderElementWithArea(
    graphicalElement: BaseElement,
    rotation: number,
    coachDimension: ElementDimension,
    coachIndex: number,
    coachDeckIndex: number,
  ): TemplateResult {
    // for TABLE, we use the area component itself to display the table instead of the SVG graphic.
    // Due to different heights and widths, it wouldn't show correctly. To correct this, we would
    // need difficult calculations for position, rotation and dimension.
    const isNotTableGraphic = graphicalElement.icon?.indexOf('TABLE') === -1;
    const areaProperty = graphicalElement.icon && isNotTableGraphic ? graphicalElement.icon : null;
    const stretchHeight =
      this.isElementDirectlyOnBorder(graphicalElement, coachDimension) &&
      areaProperty !== 'ENTRY_EXIT';
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
    const triggerId = `popover-trigger-${coachDeckIndex}-${coachIndex}-${calculatedPosition.x}-${calculatedPosition.y}`;
    let elementMounting = 'free';

    if (graphicalElement.position.y === this.coachBorderOffset * -1) {
      elementMounting = 'upper-border';
    } else if (
      graphicalElement.position.y + graphicalElement.dimension.h ===
      coachDimension.h + this.coachBorderOffset
    ) {
      elementMounting = 'lower-border';
    }

    // TIMO-45830
    // If area elements are located at the border of coach,
    // we have to manually modify the position and height of the area element,
    // so that we get a gap from the visuel coach border
    if (elementMounting !== 'free') {
      calculatedPosition.y += elementMounting === 'upper-border' ? 2 : 1;
      calculatedDimension.h -= 3;
    }
    return html`
      <sbb-seat-reservation-area
        id="${triggerId}"
        class="${classMap({ 'sbb-seat-reservation-area--cursor-pointer': areaProperty !== null })}"
        style=${styleMap({
          '--sbb-seat-reservation-area-width': calculatedDimension.w,
          '--sbb-seat-reservation-area-height': calculatedDimension.h,
          '--sbb-seat-reservation-area-top': calculatedPosition.y,
          '--sbb-seat-reservation-area-left': calculatedPosition.x,
        })}
        mounting=${elementMounting}
        background="dark"
        aria-hidden="true"
      >
        ${areaProperty
          ? html`
              <sbb-seat-reservation-graphic
                style=${styleMap({
                  '--sbb-seat-reservation-graphic-max-width': calculatedDimension.w,
                  '--sbb-seat-reservation-graphic-height': this.baseGridSize,
                  '--sbb-seat-reservation-graphic-rotation': rotation,
                })}
                name=${areaProperty}
                role="img"
                aria-hidden="true"
                class="auto-width"
              ></sbb-seat-reservation-graphic>
            `
          : nothing}
      </sbb-seat-reservation-area>
      ${areaProperty ? this._popover(triggerId, ariaLabelForArea) : nothing}
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

    // If the icon is the driver area, then here concat the vehicle type to get the right vehicle chassis icon
    const icon =
      graphicalElement.icon && graphicalElement.icon.endsWith('DRIVER_AREA')
        ? graphicalElement.icon?.concat(
            '_',
            this.seatReservations[this.currSelectedDeckIndex].vehicleType,
          )
        : graphicalElement.icon;

    return html` <sbb-seat-reservation-graphic
      style=${styleMap({
        '--sbb-seat-reservation-graphic-width': calculatedDimension.w,
        '--sbb-seat-reservation-graphic-height': calculatedDimension.h,
        '--sbb-seat-reservation-graphic-top': calculatedPosition.y,
        '--sbb-seat-reservation-graphic-left': calculatedPosition.x,
        '--sbb-seat-reservation-graphic-position': 'absolute',
        '--sbb-seat-reservation-graphic-rotation': rotation,
      })}
      name=${icon ?? nothing}
      aria-hidden="true"
      ?stretch=${true}
    ></sbb-seat-reservation-graphic>`;
  }

  private _getRenderedServiceElements(
    coachIndex: number,
    coachDeckIndex: number,
    serviceElements?: BaseElement[],
  ): TemplateResult[] | null {
    if (!serviceElements) return null;

    return serviceElements?.map((serviceElement: BaseElement) => {
      const titleDescription = serviceElement.icon
        ? getI18nSeatReservation(serviceElement.icon, this._language.current)
        : null;
      const calculatedDimension = this.getCalculatedDimension(serviceElement.dimension);
      const calculatedPosition = this.getCalculatedPosition(serviceElement.position);
      const elementRotation = serviceElement.rotation || 0;
      const elementFixedRotation = this.alignVertical ? elementRotation - 90 : elementRotation;

      //generate unique index number for the trigger element
      const triggerId = `popover-trigger-${coachDeckIndex}-${coachIndex}-${calculatedPosition.x}-${calculatedPosition.y}`;

      return html`
        <sbb-seat-reservation-graphic
          id="${triggerId}"
          style=${styleMap({
            '--sbb-seat-reservation-graphic-width': calculatedDimension.w,
            '--sbb-seat-reservation-graphic-height': calculatedDimension.h,
            '--sbb-seat-reservation-graphic-top': calculatedPosition.y,
            '--sbb-seat-reservation-graphic-left': calculatedPosition.x,
            '--sbb-seat-reservation-graphic-position': 'absolute',
            '--sbb-seat-reservation-graphic-rotation': elementFixedRotation,
          })}
          class="sbb-seat-reservation-graphic--cursor-pointer"
          name=${serviceElement.icon ?? nothing}
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
  private _onSelectPlace(selectPlaceEvent: CustomEvent<PlaceSelection>): void {
    const selectedPlace = selectPlaceEvent.detail;
    // We have to set preventCoachScrollByPlaceClick to true, to prevent automatic scrolling to the new focused place
    this.preventCoachScrollByPlaceClick = true;
    this.isCoachGridFocusable = false;
    this.focusedCoachIndex = -1;
    // Check any keyboard event was triggered inside the seat reservation component,
    // so we can say the native browser focus lies on the component
    if (!this.hasSeatReservationNativeFocus) {
      this.hasSeatReservationNativeFocus = true;
    }

    if (!this.preventPlaceClick) {
      // Add place to place collection
      this.updateSelectedSeatReservationPlaces(selectedPlace);
      this.updateCurrentSelectedPlaceInCoach(selectedPlace);
    }
  }

  private _onSelectNavCoach(event: CustomEvent<number>): void {
    const selectedNavCoachIndex = event.detail;

    this.isKeyboardNavigation = false;
    this.preventCoachScrollByPlaceClick = false;
    this.hasSeatReservationNativeFocus = true;

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
      <sbb-popover trigger="${triggerId}" hover-trigger="">
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
      ?.querySelectorAll<SbbPopoverElement>('sbb-popover:state(state-opened)')
      .forEach((popover) => popover.close());
  }

  private _getDescriptionTableCoach(coachItem: CoachItem): string {
    //show different table caption for screenreader if it is a locomotive
    if (coachItem.type === 'LOCOMOTIVE_COACH') {
      return getI18nSeatReservation('COACH_LOCOMOTIVE', this._language.current);
    }

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

    if (!this.hasNavigation) {
      // Expands the number of available seats and bicycle spaces as info
      const freePlaces = this.getAvailableFreePlacesNumFromCoach(coachItem.places);
      const freePlacesTxt = getI18nSeatReservation(
        'COACH_AVAILABLE_NUMBER_OF_PLACES',
        this._language.current,
        [freePlaces.seats, freePlaces.bicycles],
      );
      tableCoachDescription = tableCoachDescription.concat('. ').concat(freePlacesTxt).concat('. ');
    }

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

        const descriptionAlreadyExist = uniqueDescriptions.indexOf(icon) > -1;
        const translation = getI18nSeatReservation(
          descriptionElement.icon!,
          this._language.current,
        );
        const isValidDescription =
          this._notFixedRotatableAreaIcons.indexOf(icon) === -1 &&
          this.notAreaElements.indexOf(icon) === -1;

        if (!descriptionAlreadyExist) {
          uniqueDescriptions.push(descriptionElement.icon!);
        }
        return !!translation && !descriptionAlreadyExist && isValidDescription ? translation : null;
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
