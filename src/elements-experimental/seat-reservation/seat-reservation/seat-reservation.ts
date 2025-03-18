import { SbbLanguageController } from '@sbb-esta/lyne-elements/core/controllers.js';
import { forceType } from '@sbb-esta/lyne-elements/core/decorators.js';
import { EventEmitter } from '@sbb-esta/lyne-elements/core/eventing.js';
import { html, LitElement, nothing } from 'lit';
import type { CSSResultGroup, PropertyValues, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { styleMap } from 'lit-html/directives/style-map.js';

import { getI18nSeatReservation } from '../common/i18n/i18n.js';
import type {
  CoachItem,
  Place,
  ElementDimension,
  ElementPosition,
  SeatReservation,
  BaseElement,
  PlaceSelection,
  SeatReservationPlaceSelection,
} from '../seat-reservation.js';

import style from './seat-reservation.scss?lit&inline';

import '../seat-reservation-area.js';
import '../seat-reservation-graphic.js';
import '../seat-reservation-navigation.js';
import '../seat-reservation-place-control.js';

/**
 * Describe the purpose of the component with a single short sentence.
 *
 * @event {CustomEvent<Place[]>} selectedPlaces - Emits when select a place and returns a Place array with all selected places
 */
export
@customElement('sbb-seat-reservation')
class SbbSeatReservationElement extends LitElement {
  public static override styles: CSSResultGroup = style;
  public static readonly events = {
    selectedPlaces: 'selectedPlaces',
  } as const;

  /** seat reservation*/
  @forceType()
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

  /** Emits when an place was selected by user. */
  protected selectedPlaces: EventEmitter = new EventEmitter(
    this,
    SbbSeatReservationElement.events.selectedPlaces,
  );

  @state() private accessor _selectedCoachIndex: number = 0;

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
  private _currSelectedCoachIndex: number = 0;
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
    this._initSeatReservationSeatKeyNavigationEvent();
  }

  private _initVehicleSeatReservationConstruction(): void {
    const coachItems = JSON.parse(JSON.stringify(this.seatReservation?.coachItems));
    const classAlignVertical = this.alignVertical ? 'sbb-seat-reservation__wrapper--vertical' : '';

    this._coachesHtmlTemplate = html`
      <div class="sbb-seat-reservation">
        <div class="sbb-seat-reservation__wrapper ${classAlignVertical}">
          <sbb-seat-reservation-navigation
            .seatReservation=${this.seatReservation}
            .selectedCoachIndex=${this._selectedCoachIndex}
            @selectCoach=${(event: CustomEvent) => this._onSelectNavCoach(event)}
          ></sbb-seat-reservation-navigation>
          <div id="sbb-seat-reservation__parent-area" class="sbb-seat-reservation__parent">
            <ul
              style="transform:scale(${this.scale})"
              class="sbb-seat-reservation__list-coaches"
              aria-label="${getI18nSeatReservation('LIST_ALL_COACHES', this._language.current)}"
            >
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
      <div
        style="width:${calculatedCoachDimension.w}px; height:${calculatedCoachDimension.h *
        this.scale}px;"
      >
        ${this._getRenderedCoachBorders(coachItem, index)}
        ${this._getRenderedGraphicalElements(coachItem.graphicElements || [], coachItem.dimension)}
        ${this._getRenderedServiceElements(coachItem.serviceElements)}
        ${this._getRenderedPlaces(coachItem, index)}
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

    return html`<div
      class="coach-border"
      style="position:absolute; left:${borderOffsetX}px; top: ${this._coachBorderPadding *
      -1}px; z-index:0;"
    >
      <sbb-seat-reservation-graphic
        name="COACH_BORDER_MIDDLE"
        width=${borderWidth}
        height=${coachItem.dimension.h + this._coachBorderPaddingUnit * 2}
        ?stretch=${true}
        aria-hidden="true"
      ></sbb-seat-reservation-graphic>
    </div> `;
  }

  private _getRenderedPlaces(coach: CoachItem, coachIndex: number): TemplateResult[] | null {
    if (!coach.places) {
      return null;
    }

    return coach.places?.map((place: Place) => {
      const calculatedInternalDimension = this._getCalculatedDimension(place.dimension);
      const calculatedInternalPosition = this._getCalculatedPosition(place.position);
      const textRotation = place.rotation ? place.rotation * -1 : 0;
      const elementStyle = {
        top: calculatedInternalPosition.y + 'px',
        left: calculatedInternalPosition.x + 'px',
        width: calculatedInternalDimension.w + 'px',
        height: calculatedInternalDimension.h + 'px',
        zIndex: place.position.z,
      };

      return html`
        <div class="sbb-seat-reservation__graphical-element" style=${styleMap(elementStyle)}>
          <sbb-seat-reservation-place-control
            @selectPlace=${(selectPlaceEvent: CustomEvent) => this._onSelectPlace(selectPlaceEvent)}
            id="seat-reservation__place-button-${coachIndex}-${place.number}"
            text=${place.number}
            type=${place.type}
            state=${place.state}
            width=${place.dimension.w}
            height=${place.dimension.h}
            rotation=${place.rotation ?? nothing}
            text-rotation=${textRotation}
            coach-index=${coachIndex}
            ?disable=${this.disable}
            tabindex="-1"
            ?keyfocus=${false}
          ></sbb-seat-reservation-place-control>
        </div>
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
    const ariaLabel = getI18nSeatReservation(graphicalElement.icon || '', this._language.current);
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
      <div
        class="sbb-seat-reservation__graphical-element"
        style="top:${calculatedPosition.y}px; left:${calculatedPosition.x}px; width:${calculatedDimension.w}px; height:${calculatedDimension.h}px; z-index:${graphicalElement
          .position.z};"
      >
        <sbb-seat-reservation-area
          width=${graphicalElement.dimension.w}
          height=${graphicalElement.dimension.h}
          mounting=${elementMounting}
          background="dark"
          role=${ariaLabel ? 'figure' : nothing}
          aria-label=${ariaLabel || nothing}
          title=${ariaLabel || nothing}
          tabindex="0"
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

    let icon = graphicalElement.icon;
    let ariaLabel = null;
    if (icon && icon.indexOf('DRIVER_AREA') > -1) {
      icon = icon.concat('_', this.seatReservation.vehicleType);
    }

    if (icon && icon.indexOf('COACH_PASSAGE') > -1) {
      ariaLabel = getI18nSeatReservation('COACH_PASSAGE', this._language.current);
    }

    return html`
      <div
        class="sbb-seat-reservation__graphical-element"
        style="top:${calculatedPosition.y}px; left:${calculatedPosition.x}px; width:${calculatedDimension.w}px; height:${calculatedDimension.h}px; z-index:${graphicalElement
          .position.z};"
        title=${ariaLabel || nothing}
        aria-label=${ariaLabel || nothing}
        role=${ariaLabel ? 'figure' : nothing}
        tabindex=${ariaLabel ? 0 : nothing}
      >
        <sbb-seat-reservation-graphic
          name=${icon ?? nothing}
          width=${graphicalElement.dimension.w}
          height=${graphicalElement.dimension.h}
          rotation=${rotation}
          role="img"
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
        <div
          class="sbb-seat-reservation__graphical-element"
          style="position:absolute; top:${calculatedcCmpartmentNumberPosition.y}px; left:${calculatedcCmpartmentNumberPosition.x}px; width:${calculatedcCmpartmentNumberDimension.w}px; height:${calculatedcCmpartmentNumberDimension.h}px; z-index:${serviceElement
            .position.z};"
          role="note"
          aria-label="${getI18nSeatReservation(
            'SERVICE_' + serviceElement.icon || '',
            this._language.current,
          ) || nothing}"
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

  private _initNavigationSelectionByScrollEvent(): void {
    this._coachScrollArea = this.shadowRoot?.getElementById(
      'sbb-seat-reservation__parent-area',
    ) as HTMLElement;

    if (this._coachScrollArea) {
      let currCalcTriggerPos = 0;
      const coachScrollWidth = this._coachScrollArea.getBoundingClientRect().width;

      //Generate calculated trigger point array depends from coach width
      this._triggerCoachPositionsCollection = this.seatReservation.coachItems.map((coach) => {
        const fromPos = currCalcTriggerPos;
        currCalcTriggerPos += this._getCalculatedDimension(coach.dimension).w * this.scale;
        return [fromPos, currCalcTriggerPos];
      });

      //Add scroll event listener to trigger coach navigation
      this._coachScrollArea.addEventListener('scroll', () => {
        const scrollOffsetX = this._coachScrollArea.scrollLeft + coachScrollWidth / 2;
        const selectedCoachIndex = this._triggerCoachPositionsCollection.findIndex(
          (triggerPoint: number[]) =>
            scrollOffsetX >= triggerPoint[0] && scrollOffsetX <= triggerPoint[1],
        );

        if (selectedCoachIndex !== this._selectedCoachIndex) {
          this._selectedCoachIndex = selectedCoachIndex;
          this._currSelectedPlaceElementId = null;
          this._currSelectedPlace = null;
        }
      });
    }
  }

  /**
   * Initialisation of Keyboard event handling to navigation between each places inside a selected coach by using [arrow] keys.
   * The [Enter] key allows the user to select or deselect a focused place.
   * With the [TAB] key the user navigation goes to the next coach navigation element and the currently selected place is automatically reset.
   */
  private _initSeatReservationSeatKeyNavigationEvent(): void {
    this.addEventListener('keydown', (e) => {
      const pressedKey = e.code;
      switch (pressedKey) {
        case this._keyboardNavigationEvents.Tab:
          this._resetKeyNavigateSeat();
          break;
        case this._keyboardNavigationEvents.Enter:
          this._keyHandlingTogglePlaceSelectionState();
          break;
        case this._keyboardNavigationEvents.ArrowLeft:
          this._navigateToPlaceByKey(pressedKey);
          break;
        case this._keyboardNavigationEvents.ArrowRight:
          this._navigateToPlaceByKey(pressedKey);
          break;
        case this._keyboardNavigationEvents.ArrowUp:
          this._navigateToPlaceByKey(pressedKey);
          break;
        case this._keyboardNavigationEvents.ArrowDown:
          this._navigateToPlaceByKey(pressedKey);
          break;
        default:
          break;
      }
    });
  }

  private _resetKeyNavigateSeat(): void {
    this._setFocusPlaceElement(false);
    this._currSelectedPlaceElementId = null;
    this._currSelectedPlace = null;
  }

  private _keyHandlingTogglePlaceSelectionState(): void {
    if (this._currSelectedPlaceElementId) {
      const place = this.shadowRoot?.getElementById(
        this._currSelectedPlaceElementId,
      ) as HTMLElement;
      const coach = this.seatReservation?.coachItems[this._currSelectedCoachIndex];
      const currState = place.getAttribute('state') === 'FREE' ? 'SELECTED' : 'FREE';

      place.setAttribute('state', currState);

      if (coach.places && this._currSelectedPlace) {
        const placeSelection = {
          id: this._currSelectedPlaceElementId,
          number: this._currSelectedPlace.number,
          coachIndex: this._currSelectedCoachIndex,
          state: currState,
        } as PlaceSelection;
        this._addSelectedPlace(placeSelection);
      }
    }
  }

  private _navigateToPlaceByKey(pressedKey: string): void {
    if (this.seatReservation?.coachItems[this._currSelectedCoachIndex].places?.length) {
      const findClosestPlace = this._getClosestPlaceByKeyDirection(pressedKey);

      if (findClosestPlace) {
        this._setFocusPlaceElement(false);
        this._currSelectedPlaceElementId =
          'seat-reservation__place-button-' +
          this._currSelectedCoachIndex +
          '-' +
          findClosestPlace.number;
        this._currSelectedPlace = findClosestPlace;
        this._setFocusPlaceElement(true);
      }
    }
  }

  private _setFocusPlaceElement(hasFocus: boolean): void {
    if (this._currSelectedPlaceElementId) {
      const focusType = hasFocus ? 'focus' : 'unfocus';
      const selectedPlace = this.shadowRoot?.getElementById(
        this._currSelectedPlaceElementId,
      ) as HTMLElement;
      selectedPlace.setAttribute('keyfocus', focusType);
    }
  }

  /**
   * To geht the correct closest place of current pressed key and the current selected place,
   * we have to investigate the coordinates of each place to find the closest place of the _currSelectedPlaceElementId.
   * @param pressedKey
   * @returns Place or null
   */
  private _getClosestPlaceByKeyDirection(pressedKey: string): Place | null {
    const coach = this.seatReservation?.coachItems[this._currSelectedCoachIndex];
    let closestPlace = null;

    if (coach.places) {
      for (const place of coach.places) {
        // If no place currently selected, then we find the first place in the coach
        if (!this._currSelectedPlaceElementId) {
          if (!closestPlace) {
            closestPlace = place;
          }
          //Check the first place in the top-left corner of the coach
          if (
            closestPlace.number !== place.number &&
            closestPlace.position.x > place.position.x &&
            closestPlace.position.y > place.position.y
          ) {
            closestPlace = place;
          }
        } else {
          if (place.number !== this._currSelectedPlace?.number) {
            //Key [Right] navigation, we check the place coordinates of the x-axis to get the smallest larger x place coordinate of the currently selected place
            if (
              pressedKey === this._keyboardNavigationEvents.ArrowRight &&
              place.position.y === this._currSelectedPlace?.position.y &&
              place.position.x > this._currSelectedPlace?.position.x &&
              (!closestPlace || place.position.x < closestPlace.position.x)
            ) {
              closestPlace = place;
            }
            //Key [Down] navigation, we check the place coordinates of the y-axis to get the smallest larger y place coordinate of the currently selected place
            else if (
              pressedKey === this._keyboardNavigationEvents.ArrowDown &&
              place.position.x === this._currSelectedPlace?.position.x &&
              place.position.y > this._currSelectedPlace?.position.y &&
              (!closestPlace || place.position.y < closestPlace.position.y)
            ) {
              closestPlace = place;
            }
            //Key [Left] navigation, we check the place coordinates of the x-axis to get the greatest smaller x place coordinate of the currently selected place
            else if (
              pressedKey === this._keyboardNavigationEvents.ArrowLeft &&
              place.position.y === this._currSelectedPlace?.position.y &&
              place.position.x < this._currSelectedPlace?.position.x &&
              (!closestPlace || place.position.x > closestPlace.position.x)
            ) {
              closestPlace = place;
            }
            //Key [Up] navigation, we check the place coordinates of the y-axis to get the greatest smaller y place coordinate of the currently selected place
            else if (
              pressedKey === this._keyboardNavigationEvents.ArrowUp &&
              place.position.x === this._currSelectedPlace?.position.x &&
              place.position.y < this._currSelectedPlace?.position.y &&
              (!closestPlace || place.position.y > closestPlace.position.y)
            ) {
              closestPlace = place;
            }
          }
        }
      }
    }
    return closestPlace;
  }

  private _onSelectNavCoach(event: CustomEvent): void {
    const selectedNavCoachIndex = event.detail as number;
    const scrollToCoachPosX = this._triggerCoachPositionsCollection[selectedNavCoachIndex][0];

    if (selectedNavCoachIndex !== null && selectedNavCoachIndex !== this._currSelectedCoachIndex) {
      this._setFocusPlaceElement(false);
      this._currSelectedCoachIndex = selectedNavCoachIndex;
      this._currSelectedPlaceElementId = null;
      this._currSelectedPlace = null;
    }

    this._coachScrollArea.scrollTo({
      top: 0,
      left: scrollToCoachPosX,
      behavior: 'smooth',
    });
  }

  /**
   * Manages the selected place event triggered from the place
   * Each selection emits an array of all selected places
   * @param selectPlaceEvent
   */
  private _onSelectPlace(selectPlaceEvent: CustomEvent): void {
    if (!this.disable) {
      const currSelectedPlace = selectPlaceEvent.detail as PlaceSelection;
      this._addSelectedPlace(currSelectedPlace);
    }
  }

  private _addSelectedPlace(placeSelection: PlaceSelection): void {
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
    this._selectedSeatReservationPlaces = currSelectedPlace
      ? this._selectedSeatReservationPlaces.filter(
          (_selectedPlace) => _selectedPlace.id === currSelectedPlace.id,
        )
      : [];
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
