import { isArrowKeyOrPageKeysPressed } from '@sbb-esta/lyne-elements/core/a11y.js';
import { SbbLanguageController } from '@sbb-esta/lyne-elements/core/controllers.js';
import { forceType } from '@sbb-esta/lyne-elements/core/decorators.js';
import { EventEmitter } from '@sbb-esta/lyne-elements/core/eventing.js';
import { html, LitElement, nothing } from 'lit';
import type { CSSResultGroup, PropertyValues, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { getI18nSeatReservation } from '../common.js';
import type {
  CoachItem,
  Place,
  ElementDimension,
  ElementPosition,
  SeatReservation,
  BaseElement,
  PlaceSelection,
  SeatReservationPlaceSelection,
  PlaceState,
} from '../seat-reservation.js';

import style from './seat-reservation.scss?lit&inline';

import '../seat-reservation-area.js';
import '../seat-reservation-graphic.js';
import '../seat-reservation-place-control.js';
import '../seat-reservation-navigation/seat-reservation-navigation-coach/seat-reservation-navigation-coach.js';

/**
 * Describe the purpose of the component with a single short sentence.
 *
 * @event {CustomEvent<SeatReservationPlaceSelection>} selectedPlaces - Emits when a place was selected and returns a Place array with all selected places
 */
export
@customElement('sbb-seat-reservation')
class SbbSeatReservationElement extends LitElement {
  public static override styles: CSSResultGroup = style;
  public static readonly events = {
    selectedPlaces: 'selectedPlaces',
  } as const;

  /** seat reservation*/
  @property({ attribute: 'seat-reservation', type: Object })
  public accessor seatReservation: SeatReservation = null!;

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

  @forceType()
  @property({ attribute: 'scale', type: Number })
  public accessor scale: number = 1;

  private _language = new SbbLanguageController(this);

  /** Emits when a place was selected by user. */
  protected selectedPlaces: EventEmitter<SeatReservationPlaceSelection[]> = new EventEmitter(
    this,
    SbbSeatReservationElement.events.selectedPlaces,
  );

  @state() private accessor _selectedCoachIndex: number = -1;
  @state() private accessor _focusedCoachIndex: number = -1;

  private _maxHeight = 128;
  private _gridSize = 8;
  private _gridSizeFactor = this._maxHeight / this._gridSize;
  private _coachBorderPadding = 6;
  private _coachBorderPaddingUnit = this._coachBorderPadding / 16;
  private _selectedSeatReservationPlaces: SeatReservationPlaceSelection[] = [];
  private _triggerCoachPositionsCollection: number[][] = [];
  private _coachScrollArea: HTMLElement = null!;
  private _currSelectedPlace: Place | null = null;
  private _currSelectedPlaceElementId: string | null = null;
  private _currSelectedCoachIndex: number = -1;
  private _coachesHtmlTemplate?: TemplateResult;
  private _scrollMoveDirection: boolean = true;
  private _preventCoachScrollByPlaceClick: boolean = false;
  private _notAreaElements = [
    'DRIVER_AREA_FULL',
    'COACH_PASSAGE',
    'COMPARTMENT_PASSAGE',
    'COMPARTMENT_PASSAGE_HIGH',
    'COMPARTMENT_PASSAGE_MIDDLE',
    'COMPARTMENT_PASSAGE_LOW',
    'COACH_BORDER_OUTER',
  ];
  private _keyboardNavigationEvents = {
    ArrowLeft: 'ArrowLeft',
    ArrowRight: 'ArrowRight',
    ArrowUp: 'ArrowUp',
    ArrowDown: 'ArrowDown',
    Tab: 'Tab',
    Enter: 'Enter',
  } as const;

  protected override firstUpdated(changedProperties: PropertyValues<this>): void {
    super.firstUpdated(changedProperties);
    this._componentSetup();
  }

  protected override render(): TemplateResult | null {
    this._initVehicleSeatReservationConstruction();
    return this._coachesHtmlTemplate || null;
  }

  private _componentSetup(): void {
    this._initNavigationSelectionByScrollEvent();
  }

  private _initVehicleSeatReservationConstruction(): void {
    const coachItems = JSON.parse(JSON.stringify(this.seatReservation?.coachItems));
    const classAlignVertical = this.alignVertical ? 'sbb-seat-reservation__wrapper--vertical' : '';

    //TODO TAB empty jump fields <input id="first-tab-element" type="input" value="firstlement">
    //TODO TAB empty jump fields <input id="last-tab-element" type="input" value="lastelement">
    this._coachesHtmlTemplate = html`
      <style>
        .sbb-seat-reservation__list-coaches {
          transform: scale(${this.scale});
        }
      </style>
      <div class="sbb-seat-reservation">
        <div
          class="sbb-seat-reservation__wrapper ${classAlignVertical}"
          @keydown=${(evt: KeyboardEvent) => this._handleKeyboardEvent(evt)}
        >
          <nav>
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
                    .selected=${this._selectedCoachIndex === index}
                    .focused=${this._focusedCoachIndex === index}
                    .propertyIds="${coachItem.propertyIds}"
                    .travelClass="${coachItem.travelClass}"
                    ?driver-area="${!coachItem.places?.length}"
                    ?first="${index === 0}"
                    ?last="${index === this.seatReservation?.coachItems.length - 1}"
                  >
                  </sbb-seat-reservation-navigation-coach>
                </li>`;
              })}
            </ul>
          </nav>

          <div id="sbb-seat-reservation__parent-area" class="sbb-seat-reservation__parent">
            <ul class="sbb-seat-reservation__list-coaches" role="presentation">
              ${this._renderCoaches(coachItems)}
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
    const calculatedCoachDimension = this._getCalculatedDimension(coachItem.dimension);
    return html`
      <style>
        .coach-wrapper[data-coach-id='${coachItem.id}-${calculatedCoachDimension.w}-${calculatedCoachDimension.h}'] {
          width: ${calculatedCoachDimension.w}px;
          height: ${calculatedCoachDimension.h * this.scale}px;
        }
      </style>
      <div
        data-coach-id="${coachItem.id}-${calculatedCoachDimension.w}-${calculatedCoachDimension.h}"
        class="coach-wrapper"
      >
        ${this._getRenderedCoachBorders(coachItem, index)}
        ${this._getRenderedGraphicalElements(coachItem.graphicElements || [], coachItem.dimension)}
        ${this._getRenderedServiceElements(coachItem.serviceElements)}
        <table class="coach-wrapper__table" id="seat-reservation-coach-${index}" role="grid">
          ${this._getRenderedPlaces(coachItem, index)}
        </table>
      </div>
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
        ? driverArea?.dimension.w * this._gridSizeFactor
        : this._gridSizeFactor;

    return html`
      <style>
        .coach-border[data-coach-border-id='${coachItem.id}'] {
          position: absolute;
          left: ${borderOffsetX}px;
          top: ${this._coachBorderPadding * -1}px;
          z-index: 0;
        }
      </style>
      <div data-coach-border-id="${coachItem.id}" class="coach-border">
        <sbb-seat-reservation-graphic
          name="COACH_BORDER_MIDDLE"
          width=${borderWidth}
          height=${coachItem.dimension.h + this._coachBorderPaddingUnit * 2}
          ?stretch=${true}
          role="presentation"
        ></sbb-seat-reservation-graphic>
      </div>
    `;
  }

  private _getRenderedPlaces(coach: CoachItem, coachIndex: number): TemplateResult[] | null {
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
          <tr
            id="row-${coachIndex}-${rowPlaces[0].position.y}"
            data-row-y=${rowPlaces[0].position.y}
            data-row-index=${index}
          >
            ${this._getRenderedPlace(rowPlaces, coachIndex, index)}
          </tr>
        `;
      })
      .flatMap((rowTemplate) => rowTemplate);
  }

  private _getRenderedPlace(
    places: Place[],
    coachIndex: number,
    rowIndex: number,
  ): TemplateResult[] | null {
    //Sorts each place by its ascending x coordinate
    places.sort(
      (placeA: Place, placeB: Place) => Number(placeA.position.x) - Number(placeB.position.x),
    );

    return places?.map((place: Place, index: number) => {
      const calculatedInternalDimension = this._getCalculatedDimension(place.dimension);
      const calculatedInternalPosition = this._getCalculatedPosition(place.position);
      const textRotation = place.rotation ? place.rotation * -1 : 0;

      return html`
        <style>
          .sbb-seat-reservation__graphical-element[data-graphical-element-id='${coachIndex}-${place.number}'] {
            top: ${calculatedInternalPosition.y}px;
            left: ${calculatedInternalPosition.x}px;
            width: ${calculatedInternalDimension.w}px;
            height: ${calculatedInternalDimension.h}px;
            z-index: ${place.position.z};
          }
        </style>
        <td
          id="cell-${coachIndex}-${place.position.y}-${index}"
          class="sbb-seat-reservation__graphical-element sbb-seat-reservation__graphical-place"
          data-graphical-element-id="${coachIndex}-${place.number}"
          role="gridcell"
        >
          <sbb-seat-reservation-place-control
            @selectPlace=${(selectPlaceEvent: CustomEvent) => this._onSelectPlace(selectPlaceEvent)}
            @focusPlace=${() => this._onFocusPlace()}
            id="seat-reservation__place-button-${coachIndex}-${place.number}"
            class="seat-reservation-place-control"
            data-cell-id="${coachIndex}-${place.position.y}-${index}"
            data-row-y=${rowIndex}
            text=${place.number}
            type=${place.type}
            state=${place.state}
            width=${place.dimension.w}
            height=${place.dimension.h}
            rotation=${place.rotation ?? nothing}
            text-rotation=${textRotation}
            coach-index=${coachIndex}
            ?disable=${this.disable}
          ></sbb-seat-reservation-place-control>
        </td>
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
    const calculatedDimension = this._getCalculatedDimension(
      graphicalElement.dimension,
      coachDimension,
      true,
      stretchHeight,
    );
    const calculatedPosition = this._getCalculatedPosition(
      graphicalElement.position,
      graphicalElement.dimension,
      coachDimension,
      true,
    );

    let elementMounting = 'FREE';
    if (graphicalElement.position.y === this._coachBorderPaddingUnit * -1) {
      elementMounting = 'UPPER_BORDER';
    } else if (
      graphicalElement.position.y + graphicalElement.dimension.h ===
      coachDimension.h + this._coachBorderPaddingUnit
    ) {
      elementMounting = 'LOWER_BORDER';
    }

    return html`
      <style>
        .sbb-seat-reservation__graphical-element[data-id='graph-el-with-area-${calculatedPosition.y}-${calculatedPosition.x}-${calculatedDimension.w}-${calculatedDimension.h}'] {
          top: ${calculatedPosition.y}px;
          left: ${calculatedPosition.x}px;
          width: ${calculatedDimension.w}px;
          height: ${calculatedDimension.h}px;
          z-index: ${graphicalElement.position.z};
        }
      </style>
      <div
        data-id="graph-el-with-area-${calculatedPosition.y}-${calculatedPosition.x}-${calculatedDimension.w}-${calculatedDimension.h}"
        class="sbb-seat-reservation__graphical-element"
        title=${ariaLabelForArea}
      >
        <sbb-seat-reservation-area
          width=${graphicalElement.dimension.w}
          height=${graphicalElement.dimension.h}
          mounting=${elementMounting}
          background="dark"
          aria-hidden="true"
        >
          <sbb-seat-reservation-graphic
            name=${graphicalElement.icon ?? nothing}
            rotation=${rotation}
            width="1"
            height="1"
            role="img"
            aria-hidden="true"
          ></sbb-seat-reservation-graphic>
        </sbb-seat-reservation-area>
      </div>
    `;
  }

  private _getRenderElementWithoutArea(
    graphicalElement: BaseElement,
    rotation: number,
    coachDimension: ElementDimension,
  ): TemplateResult {
    const calculatedDimension = this._getCalculatedDimension(
      graphicalElement.dimension,
      coachDimension,
    );
    const calculatedPosition = this._getCalculatedPosition(
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
      <style>
        .sbb-seat-reservation__graphical-element[data-id='graph-el-w/o-area-${calculatedPosition.y}-${calculatedPosition.x}-${calculatedDimension.w}-${calculatedDimension.h}'] {
          top: ${calculatedPosition.y}px;
          left: ${calculatedPosition.x}px;
          width: ${calculatedDimension.w}px;
          height: ${calculatedDimension.h}px;
          z-index: ${graphicalElement.position.z};
        }
      </style>
      <div
        data-id="graph-el-w/o-area-${calculatedPosition.y}-${calculatedPosition.x}-${calculatedDimension.w}-${calculatedDimension.h}"
        class="sbb-seat-reservation__graphical-element"
        title=${ariaLabel || nothing}
      >
        <sbb-seat-reservation-graphic
          name=${icon ?? nothing}
          width=${graphicalElement.dimension.w}
          height=${graphicalElement.dimension.h}
          rotation=${rotation}
          aria-hidden="true"
          ?stretch=${true}
        ></sbb-seat-reservation-graphic>
      </div>
    `;
  }

  private _getRenderedServiceElements(serviceElements?: BaseElement[]): TemplateResult[] | null {
    if (!serviceElements) {
      return null;
    }

    return serviceElements?.map((serviceElement: BaseElement) => {
      const calculatedcCmpartmentNumberDimension = this._getCalculatedDimension(
        serviceElement.dimension,
      );
      const calculatedcCmpartmentNumberPosition = this._getCalculatedPosition(
        serviceElement.position,
      );
      return html`
        <style>
          .sbb-seat-reservation__graphical-element[data-id='graph-service-el-${calculatedcCmpartmentNumberPosition.y}-${calculatedcCmpartmentNumberPosition.x}-${calculatedcCmpartmentNumberDimension.w}-${calculatedcCmpartmentNumberDimension.h}'] {
            top: ${calculatedcCmpartmentNumberPosition.y}px;
            left: ${calculatedcCmpartmentNumberPosition.x}px;
            width: ${calculatedcCmpartmentNumberDimension.w}px;
            height: ${calculatedcCmpartmentNumberDimension.h}px;
            z-index: ${serviceElement.position.z};
          }
        </style>
        <div
          data-id="graph-service-el-${calculatedcCmpartmentNumberPosition.y}-${calculatedcCmpartmentNumberPosition.x}-${calculatedcCmpartmentNumberDimension.w}-${calculatedcCmpartmentNumberDimension.h}"
          class="sbb-seat-reservation__graphical-element"
        >
          <sbb-seat-reservation-graphic
            name=${serviceElement.icon ?? nothing}
            width=${serviceElement.dimension.w}
            height=${serviceElement.dimension.h}
            role="img"
            aria-hidden="true"
          ></sbb-seat-reservation-graphic>
        </div>
      `;
    });
  }

  /* Init scroll event handling for coach navigation */
  private _initNavigationSelectionByScrollEvent(): void {
    this._coachScrollArea = this.shadowRoot?.getElementById(
      'sbb-seat-reservation__parent-area',
    ) as HTMLElement;

    if (this._coachScrollArea) {
      let currCalcTriggerPos = 0;
      const coachScrollWidth = this._coachScrollArea.getBoundingClientRect().width;

      //Precalculate trigger scroll position array depends from coach width
      this._triggerCoachPositionsCollection = this.seatReservation.coachItems.map((coach) => {
        const fromPos = currCalcTriggerPos;
        currCalcTriggerPos += this._getCalculatedDimension(coach.dimension).w * this.scale;
        return [fromPos, currCalcTriggerPos];
      });

      //Add scroll event listener to coach navigation trigger points
      this._coachScrollArea.addEventListener('scroll', () => {
        const scrollOffsetX = this._coachScrollArea.scrollLeft + coachScrollWidth / 3;
        const selectedCoachIndex = this._triggerCoachPositionsCollection.findIndex(
          ([triggerPosFrom, triggerPosTo]: number[]) =>
            scrollOffsetX >= triggerPosFrom && scrollOffsetX <= triggerPosTo,
        );

        if (selectedCoachIndex !== this._currSelectedCoachIndex) {
          this._currSelectedCoachIndex = selectedCoachIndex;
        }
      });

      this._coachScrollArea.addEventListener('scrollend', () => {
        this._selectedCoachIndex = this._currSelectedCoachIndex;
        this._focusedCoachIndex = -1;
        this._preventCoachScrollByPlaceClick = false;
      });
    }
  }

  /**
   * Initialisation of Keyboard event handling to navigation between each places inside a selected coach by using [arrow] keys.
   * The [Enter] key allows the user to select or deselect a focused place.
   * With the [TAB] key the user navigation goes to the next coach navigation element and the currently selected place is automatically reset.
   */
  private _handleKeyboardEvent(event: KeyboardEvent): void {
    const pressedKey = event.key;
    // If any place is selected and TAB Key combination ist pressed,
    // then we handle the next or previous coach selection
    if (this._currSelectedPlace) {
      if (event.shiftKey && event.keyCode === 9) {
        this._navigateCoachNavigationByKeyboard('PREV_TAB');
        event.preventDefault();
        return;
      }

      if (pressedKey === this._keyboardNavigationEvents.Tab) {
        this._navigateCoachNavigationByKeyboard('NEXT_TAB');
        event.preventDefault();
        return;
      }
    }

    if (isArrowKeyOrPageKeysPressed(event)) {
      event.preventDefault();
      switch (pressedKey) {
        case this._keyboardNavigationEvents.Enter:
          {
            this._togglePlaceSelectionByKeyboard();
          }
          break;
        case this._keyboardNavigationEvents.ArrowLeft:
          {
            const pressedLeftKeyMapping: string = this.alignVertical
              ? this._keyboardNavigationEvents.ArrowDown
              : pressedKey;
            this._navigateToPlaceByKeyboard(pressedLeftKeyMapping);
          }
          break;
        case this._keyboardNavigationEvents.ArrowRight:
          {
            const pressedRightKeyMapping: string = this.alignVertical
              ? this._keyboardNavigationEvents.ArrowUp
              : pressedKey;
            this._navigateToPlaceByKeyboard(pressedRightKeyMapping);
          }
          break;
        case this._keyboardNavigationEvents.ArrowUp:
          {
            const pressedUpKeyMapping: string = this.alignVertical
              ? this._keyboardNavigationEvents.ArrowLeft
              : pressedKey;
            this._navigateToPlaceByKeyboard(pressedUpKeyMapping);
          }
          break;
        case this._keyboardNavigationEvents.ArrowDown:
          {
            const pressedDownKeyMapping: string = this.alignVertical
              ? this._keyboardNavigationEvents.ArrowRight
              : pressedKey;
            this._navigateToPlaceByKeyboard(pressedDownKeyMapping);
          }
          break;
        default:
          break;
      }
    }
  }

  // Handling for Tab navigation if an place is selected inside the coach.
  // This controls the focused coach from the current selected coach.
  private _navigateCoachNavigationByKeyboard(tabDirection: string): void {
    const currFocusIndex =
      this._focusedCoachIndex === -1 ? this._currSelectedCoachIndex : this._focusedCoachIndex;
    //Check next or prev TAB is pressed, then we have to find the next available coach index to focusable
    const newFocusableIndex: number =
      tabDirection === 'NEXT_TAB'
        ? this._getNextAvailableCoachIndex(currFocusIndex)
        : this._getPrevAvailableCoachIndex(currFocusIndex);

    if (newFocusableIndex !== this._currSelectedCoachIndex) {
      this._focusedCoachIndex = newFocusableIndex;
    } else {
      this._focusedCoachIndex = -1;
      this._selectedCoachIndex = newFocusableIndex;
      this._focusPlaceElement(this._currSelectedPlace);
    }

    //TODO - Control TAB navigation to the last input element
    /*if(tabDirection === 'NEXT_TAB' && currFocusIndex === newFocusedIndex){
      console.log("focus LAST element");
    
      this._currSelectedPlace = null;
      this._currSelectedPlaceElementId = null;  
      this._selectedCoachIndex = -1;
      this._focusedCoachIndex = newFocusedIndex;
      
      
      this.shadowRoot?.getElementById('last-tab-element')?.focus();
      return;
    }
    //TODO - Control TAB navigation to the first input element
    if(tabDirection === 'PREV_TAB' && currFocusIndex === newFocusedIndex){
      console.log("focus FIRST element");
    
      this._currSelectedPlace = null;
      this._currSelectedPlaceElementId = null;  
      this._selectedCoachIndex = -1;
      this._focusedCoachIndex = newFocusedIndex;
      
      this.shadowRoot?.getElementById('first-tab-element')?.focus();

      return;
    }*/
  }

  private _onFocusPlace(): void {
    //TODO - If place got focus by TAB and no coach is selected, we have to set the focus to the last input element jump out of seat reservation by TAB
    //Place got a tab focus, so we jumps out from the seatreservation and set the focus to the fake input field, so the user does not tab throught all seats until the last tabable place is reached.
    //if(this._selectedCoachIndex === -1){
    //  this._preventCoachScrollByPlaceClick = true;
    //this._currSelectedCoachIndex = 4;
    //this._focusedCoachIndex = 4;
    //console.log("SEAT RESERVATION -> focus LAST TAB Input Element",this._currSelectedCoachIndex)
    //this.shadowRoot?.getElementById('last-tab-element')?.focus();
    //}
  }

  private _togglePlaceSelectionByKeyboard(): void {
    // If the focus is on a navigation coach during an enter key event, then we scroll to the focused coach
    if (this._focusedCoachIndex !== -1) {
      this._preventCoachScrollByPlaceClick = false;
      this._unfocusPlaceElement();
      this._scrollToSelectedNavCoach(this._focusedCoachIndex);
    }
    // If no focus is set to a coach, then we try to toggle the currently selected place status -> FREE | SELECTED
    else {
      const placeElement = this._getPlaceHtmlElement();
      const hasPLaceFocus = placeElement?.getAttribute('keyfocus');

      this._preventCoachScrollByPlaceClick = false;

      if (placeElement && hasPLaceFocus === 'focus' && this._currSelectedPlace) {
        const selectedState: PlaceState =
          placeElement.getAttribute('state') === 'FREE' ? 'SELECTED' : 'FREE';
        placeElement.setAttribute('state', selectedState);

        const placeSelection = {
          id: this._currSelectedPlaceElementId,
          number: this._currSelectedPlace.number,
          coachIndex: this._currSelectedCoachIndex,
          state: selectedState,
        } as PlaceSelection;
        this._updateSelectedSeatReservationPlaces(placeSelection);
      }
    }
  }

  private _navigateToPlaceByKeyboard(pressedKey: string): void {
    this._preventCoachScrollByPlaceClick = false;
    const places = this.seatReservation.coachItems[this._currSelectedCoachIndex].places;
    if (places && places.length) {
      const findClosestPlace = this._getClosestPlaceByKeyDirection(pressedKey);

      if (findClosestPlace) {
        this._focusPlaceElement(findClosestPlace);
      }
      //No clostest place found by key navigation
      else {
        if (
          pressedKey === this._keyboardNavigationEvents.ArrowRight ||
          pressedKey === this._keyboardNavigationEvents.ArrowLeft ||
          (this.alignVertical &&
            (pressedKey === this._keyboardNavigationEvents.ArrowUp ||
              pressedKey === this._keyboardNavigationEvents.ArrowDown))
        ) {
          //Check the current pressed key to get the next available coach index
          const newSelectedCoachIndex =
            pressedKey === this._keyboardNavigationEvents.ArrowRight
              ? this._getNextAvailableCoachIndex()
              : this._getPrevAvailableCoachIndex();
          this._scrollToSelectedNavCoach(newSelectedCoachIndex);
        }
      }
    }
  }

  private _getNextAvailableCoachIndex(currentIndex?: number): number {
    const startIndex = currentIndex ?? this._currSelectedCoachIndex;
    let nextIndex = startIndex;
    for (let i = startIndex + 1; i < this.seatReservation.coachItems.length; i++) {
      const places = this.seatReservation.coachItems[i].places;
      if (places && places.length > 0) {
        nextIndex = i;
        break;
      }
    }
    return nextIndex;
  }

  private _getPrevAvailableCoachIndex(currentIndex?: number): number {
    const startIndex = currentIndex ?? this._currSelectedCoachIndex;
    let prevIndex = startIndex;
    for (let i = startIndex - 1; i >= 0; i--) {
      const places = this.seatReservation.coachItems[i].places;
      if (places && places.length > 0) {
        prevIndex = i;
        break;
      }
    }
    return prevIndex;
  }

  /**
   * Get the first place of current selected coach by table cell coordinate 0-0 id.
   * @returns Place or null
   */
  private _getFirstPlaceInSelecedCoach(): Place | null {
    let firstPlace: Place | null = null;
    const coach = this.seatReservation?.coachItems[this._currSelectedCoachIndex];
    const firstCellId = 'cell-' + this._currSelectedCoachIndex + '-0-0';
    const placeNumber =
      this.shadowRoot
        ?.getElementById(firstCellId)
        ?.querySelector('sbb-seat-reservation-place-control')
        ?.getAttribute('text') || null;

    if (coach && placeNumber) {
      firstPlace = coach.places?.find((place) => place.number === placeNumber) || null;
    }
    return firstPlace;
  }

  /**
   * To get the correct closest place of current pressed key and the current selected place,
   * we have to investigate the coordinates of each place to find the closest place of the _currSelectedPlaceElementId.
   * @param pressedKey
   * @returns Place or null
   */
  private _getClosestPlaceByKeyDirection(pressedKey?: string): Place | null {
    const coach = this.seatReservation?.coachItems[this._currSelectedCoachIndex];
    let closestPlace = null;
    if (coach.places) {
      //If no place set, then wen use initial the left-top place on the coach
      if (!this._currSelectedPlaceElementId) {
        return this._getFirstPlaceInSelecedCoach();
      } else {
        if (this._currSelectedPlace) {
          for (const place of coach.places) {
            // If key pressed, then we try to find the place of the current scrollMoveDirection
            if (!pressedKey) {
              //Find place from the left side of coach by y coordinate. Current ScrollMoveDirection is RIGHT)
              if (
                this._scrollMoveDirection &&
                place.position.y === this._currSelectedPlace?.position.y &&
                (!closestPlace || place.position.x < closestPlace.position.x)
              ) {
                closestPlace = place;
              }
              //Find place from the right side of coach by y coordinate. Current ScrollMoveDirection is LEFT
              else if (
                !this._scrollMoveDirection &&
                place.position.y === this._currSelectedPlace?.position.y &&
                (!closestPlace || place.position.x > closestPlace.position.x)
              ) {
                closestPlace = place;
              }
            } else {
              if (place.number !== this._currSelectedPlace?.number) {
                //Key [Right] navigation, we check the place coordinates of the x-axis to get the smallest larger x place coordinate of the currently selected place
                if (
                  pressedKey === this._keyboardNavigationEvents.ArrowRight &&
                  (place.position.y === this._currSelectedPlace.position.y ||
                    place.position.y === this._currSelectedPlace.position.y - 1) &&
                  place.position.x > this._currSelectedPlace.position.x &&
                  (!closestPlace || place.position.x < closestPlace.position.x)
                ) {
                  closestPlace = place;
                }
                //Key [Down] navigation, we check the place coordinates of the y-axis to get the smallest larger y place coordinate of the currently selected place
                else if (
                  pressedKey === this._keyboardNavigationEvents.ArrowDown &&
                  (place.position.x === this._currSelectedPlace.position.x ||
                    place.position.x === this._currSelectedPlace.position.x + 1) &&
                  place.position.y > this._currSelectedPlace.position.y &&
                  (!closestPlace || place.position.y < closestPlace.position.y)
                ) {
                  closestPlace = place;
                }
                //Key [Left] navigation, we check the place coordinates of the x-axis to get the greatest smaller x place coordinate of the currently selected place
                else if (
                  pressedKey === this._keyboardNavigationEvents.ArrowLeft &&
                  (place.position.y === this._currSelectedPlace.position.y ||
                    place.position.y === this._currSelectedPlace.position.y + 1) &&
                  place.position.x < this._currSelectedPlace.position.x &&
                  (!closestPlace || place.position.x > closestPlace.position.x)
                ) {
                  closestPlace = place;
                }
                //Key [Up] navigation, we check the place coordinates of the y-axis to get the greatest smaller y place coordinate of the currently selected place
                else if (
                  pressedKey === this._keyboardNavigationEvents.ArrowUp &&
                  (place.position.x === this._currSelectedPlace.position.x ||
                    place.position.x === this._currSelectedPlace.position.x - 1) &&
                  place.position.y < this._currSelectedPlace?.position.y &&
                  (!closestPlace || place.position.y > closestPlace.position.y)
                ) {
                  closestPlace = place;
                }
              }
            }
          }
        }
      }
    }
    return closestPlace;
  }

  private _onSelectNavCoach(event: CustomEvent): void {
    const selectedNavCoachIndex = event.detail as number;
    if (selectedNavCoachIndex !== null && selectedNavCoachIndex !== this._currSelectedCoachIndex) {
      this._currSelectedPlace = null;
      this._unfocusPlaceElement();
      this._scrollToSelectedNavCoach(selectedNavCoachIndex);
    }
  }

  /**
   * Manages the selected place event triggered from the place
   * Each selection emits an array of all selected places
   * @param selectPlaceEvent
   */
  private _onSelectPlace(selectPlaceEvent: CustomEvent): void {
    const currSelectedPlace = selectPlaceEvent.detail as PlaceSelection;
    if (
      this._focusedCoachIndex === -1 ||
      this._focusedCoachIndex === this._currSelectedCoachIndex
    ) {
      // _preventCoachScrollByPlaceClick tur used to prevent auto scroll We prevent
      this._preventCoachScrollByPlaceClick = true;
      if (!this.disable) {
        const place = this.seatReservation.coachItems[currSelectedPlace.coachIndex].places?.find(
          (place) => place.number == currSelectedPlace.number,
        );

        //Add place to place collection
        this._updateSelectedSeatReservationPlaces(currSelectedPlace);

        if (place) {
          this._selectedCoachIndex = currSelectedPlace.coachIndex;
          this._currSelectedCoachIndex = currSelectedPlace.coachIndex;
          this._currSelectedPlace = place;
        }
      }
    }
  }

  private _onFocusNavCoach(): void {
    if (!this._preventCoachScrollByPlaceClick) {
      this._preselectFirstPlaceInCoach();
    } else {
      this._focusPlaceElement(this._currSelectedPlace);
    }
  }

  private _scrollToSelectedNavCoach(selectedNavCoachIndex: number): void {
    if (selectedNavCoachIndex !== this._currSelectedCoachIndex) {
      const scrollToCoachPosX = this._triggerCoachPositionsCollection[selectedNavCoachIndex][0];
      this._coachScrollArea = this.shadowRoot?.getElementById(
        'sbb-seat-reservation__parent-area',
      ) as HTMLElement;
      // Set the scroll move direction
      // True => move dirction RIGHT
      // false => move dirction LEFT
      this._scrollMoveDirection = this._currSelectedCoachIndex < selectedNavCoachIndex;
      this._currSelectedCoachIndex = selectedNavCoachIndex;

      // Check the difference between scrolloffset the current selected coach offset.
      // If scrolloffset diffrence extist we can scroll to position, otherwise we select directly the new coach index
      //const scrollContainerWidth = this._coachScrollArea.getBoundingClientRect().width;

      //TODO -> Bei großen Bildschirmen ist das scrollen noch nicht korrekt. Es muss hier geprüft werden ob überhaupt gescrollt werden kann, oder ob der _selectedCoachIndex direkt gleich gesetz werden muss -> else
      //const areaScrollable = (scrollContainerWidth + this._coachScrollArea.scrollLeft, scrollToCoachPosX);
      //if(areaScrollable && scrollToCoachPosX !== this._coachScrollArea.scrollLeft){
      if (scrollToCoachPosX !== this._coachScrollArea.scrollLeft) {
        this._coachScrollArea.scrollTo({
          top: 0,
          left: scrollToCoachPosX,
          behavior: 'smooth',
        });
      } else {
        this._selectedCoachIndex = this._currSelectedCoachIndex;
        this._focusedCoachIndex = -1;
      }
    }
  }

  private _preselectFirstPlaceInCoach(): void {
    const closestPlace = this._getClosestPlaceByKeyDirection();
    if (closestPlace) {
      this._focusPlaceElement(closestPlace);
    }
  }

  private _updateSelectedSeatReservationPlaces(placeSelection: PlaceSelection): void {
    //Add selected place to selectedSeatReservationPlaces
    if (placeSelection.state === 'SELECTED') {
      const seatReservationSelection = this._getSeatReservationPlaceSelection(placeSelection);
      if (seatReservationSelection) {
        this._selectedSeatReservationPlaces.push(seatReservationSelection);
      }
    }
    //Remove selected place from selectedSeatReservationPlaces
    else {
      this._selectedSeatReservationPlaces = this._selectedSeatReservationPlaces.filter(
        (_selectedPlace) => _selectedPlace.id !== placeSelection.id,
      );
    }

    //Checks whether maxReservation is activated and the maximum number of selected places is reached
    if (this.maxReservations && this._selectedSeatReservationPlaces.length > this.maxReservations) {
      this._resetAllPlaceSelections(placeSelection);
    }

    //Emits the seat reservation place selection
    this.selectedPlaces.emit(this._selectedSeatReservationPlaces);
  }

  private _getSeatReservationPlaceSelection(
    currSelectedPlace: PlaceSelection,
  ): SeatReservationPlaceSelection | null {
    const coach = this.seatReservation.coachItems[currSelectedPlace.coachIndex];
    const place = coach.places?.find((place) => place.number === currSelectedPlace.number);

    if (!place) {
      return null;
    }

    return {
      id: currSelectedPlace.id,
      coachId: coach.id,
      coachNumber: coach.number,
      coachIndex: currSelectedPlace.coachIndex,
      placeNumber: place.number,
      placeType: place.type,
      placeTravelClass: place.travelClass || 'ANY_CLASS',
      propertyIds: place.propertyIds || [],
    };
  }

  /**
   * All selected places will be reset or the currentSelectedPlace was given, then we reset all except currentSelectedPlace
   * @param currSelectedPlace
   */
  private _resetAllPlaceSelections(currSelectedPlace?: PlaceSelection): void {
    //Find all places to be needed unselect
    for (const placeSelection of this._selectedSeatReservationPlaces) {
      if (!currSelectedPlace || currSelectedPlace.id !== placeSelection.id) {
        const placeElement = this.shadowRoot?.getElementById(placeSelection.id) as HTMLElement;
        placeElement.setAttribute('state', 'FREE');
      }
    }
    //Removes all selected places except the currently selected place
    if (currSelectedPlace) {
      this._selectedSeatReservationPlaces = this._selectedSeatReservationPlaces.filter(
        (_selectedPlace) => _selectedPlace.id === currSelectedPlace.id,
      );
    } else {
      this._selectedSeatReservationPlaces = [];
    }
  }

  private _focusPlaceElement(place: Place | null, coachIndex?: number): void {
    this._unfocusPlaceElement();
    if (place) {
      this._currSelectedPlace = place;
      if (coachIndex) {
        this._currSelectedCoachIndex = coachIndex;
      }

      this._setCurrSelectedPlaceElementId(place);

      const selectedPlaceElement = this._getPlaceHtmlElement();
      if (selectedPlaceElement) {
        selectedPlaceElement.setAttribute('keyfocus', 'focus');
      }
    }
  }

  private _unfocusPlaceElement(): void {
    const selectedPlaceElement = this._getPlaceHtmlElement();
    if (selectedPlaceElement) {
      selectedPlaceElement.setAttribute('keyfocus', 'unfocus');
      this._setCurrSelectedPlaceElementId(null);
    }
  }

  private _setCurrSelectedPlaceElementId(place: Place | null): void {
    if (place) {
      this._currSelectedPlaceElementId =
        'seat-reservation__place-button-' + this._currSelectedCoachIndex + '-' + place.number;
    } else {
      this._currSelectedPlaceElementId = null;
    }
  }

  /**
   * Returns the current selected place HTML element by given placeNumber and coachIndex.
   * If both doesnt exist, we try to return the place HTML element by the _currentSelectedPlaceElementId
   * @param placeNumber optional as string
   * @param coachIndex optional as string
   * @returns HTMLElement or null
   */
  private _getPlaceHtmlElement(placeNumber?: string, coachIndex?: number): HTMLElement | null {
    const currCoachIndex = coachIndex ? coachIndex : this._currSelectedCoachIndex;
    const coachPlaceNumberId = placeNumber
      ? 'seat-reservation__place-button-' + currCoachIndex + '-' + placeNumber
      : this._currSelectedPlaceElementId;
    return coachPlaceNumberId ? this.shadowRoot?.getElementById(coachPlaceNumberId) || null : null;
  }

  private _getCalculatedDimension(
    elementDimension: ElementDimension,
    coachDimension?: ElementDimension,
    isOriginHeight?: boolean,
    isStretchHeight?: boolean,
  ): ElementDimension {
    if (coachDimension && !isOriginHeight) {
      elementDimension.h += this._coachBorderPaddingUnit * 2;
    }

    if (isStretchHeight) {
      elementDimension.h += this._coachBorderPaddingUnit;
    }

    return {
      w: this._gridSizeFactor * elementDimension.w,
      h: this._gridSizeFactor * elementDimension.h,
    };
  }

  private _getCalculatedPosition(
    elementPosition: ElementPosition,
    elementDimension?: ElementDimension,
    coachDimension?: ElementDimension,
    isOriginHeight?: boolean,
  ): ElementPosition {
    if (coachDimension && elementDimension) {
      const endPosHeight = isOriginHeight
        ? coachDimension.h
        : coachDimension.h + this._coachBorderPaddingUnit;
      //If the original element is positioned at the top or bottom of the coach, we need to recalculate the Y coordinate with the additional border padding
      if (elementPosition.y === 0) {
        elementPosition.y -= this._coachBorderPaddingUnit;
      } else if (elementPosition.y + elementDimension.h === endPosHeight) {
        elementPosition.y += this._coachBorderPaddingUnit;
      }
    }

    return {
      x: this._gridSizeFactor * elementPosition.x,
      y: this._gridSizeFactor * elementPosition.y,
      z: elementPosition.z,
    };
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-seat-reservation': SbbSeatReservationElement;
  }
}
