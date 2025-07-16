import { isArrowKeyOrPageKeysPressed } from '@sbb-esta/lyne-elements/core/a11y.js';
import { forceType } from '@sbb-esta/lyne-elements/core/decorators.js';
import { LitElement, type PropertyValues } from 'lit';
import { property, state } from 'lit/decorators.js';

import {
  mapCoachInfosToCoachSelection,
  mapPlaceAndCoachToSeatReservationPlaceSelection,
  mapPlaceInfosToPlaceSelection,
} from '../common/mapper.js';
import type {
  CoachItem,
  CoachNumberOfFreePlaces,
  ElementDimension,
  ElementPosition,
  Place,
  PlaceSelection,
  SeatReservation,
  SeatReservationCoachSelection,
  SeatReservationPlaceSelection,
} from '../common.js';
import type { SbbSeatReservationPlaceControlElement } from '../seat-reservation-place-control/seat-reservation-place-control.component.js';

enum ScrollDirection {
  right = 'right',
  left = 'left',
}

interface CoachScrollTriggerPoint {
  start: number;
  end: number;
  width: number;
}

export type SeatReservationSelectedPlacesEventDetails = SeatReservationPlaceSelection[];

export class SeatReservationBaseElement extends LitElement {
  public static readonly events = {
    selectedplaces: 'selectedplaces',
    selectedcoach: 'selectedcoach',
  } as const;

  /** The seat reservation object which contains all coaches and places */
  @property({ attribute: 'seat-reservation', type: Object })
  public accessor seatReservation: SeatReservation = null!;

  /** The seat reservation navigation can be toggled by this property */
  @forceType()
  @property({ attribute: 'has-navigation', type: Boolean })
  public accessor hasNavigation: boolean = true;

  /** The seat reservation area is aligned vertically */
  @forceType()
  @property({ attribute: 'align-vertical', type: Boolean })
  public accessor alignVertical: boolean = false;

  /** The seat reservation area's base grid size */
  @forceType()
  @property({ attribute: 'base-grid-size', type: Number })
  public accessor baseGridSize: number = 16;

  /** The seat reservation area's width */
  @forceType()
  @property({ attribute: 'height', type: Number })
  public accessor height: number = null!;

  /** Maximal number of possible clickable seats */
  @forceType()
  @property({ attribute: 'max-reservations', type: Number })
  public accessor maxReservations: number = null!;

  /** Any click functionality is prevented */
  @forceType()
  @property({ attribute: 'prevent-place-click', type: Boolean })
  public accessor preventPlaceClick: boolean = false;

  @state() protected accessor selectedCoachIndex: number = -1;
  @state() protected accessor focusedCoachIndex: number = -1;
  //Sets the hover style when scrolling to a coach
  @state() protected accessor hoveredScrollCoachIndex: number = -1;

  // Describes the distance between the border of the coach and the places in pixels
  protected coachBorderPadding = 6;
  // Describes the gap between the coaches in pixels
  protected gapBetweenCoaches = 4;
  // The calculated coachBorderOffset is used to calculate the width and height of coach border graphic,
  // but also to position other graphics that are aligned directly to the coach border.
  protected coachBorderOffset = this.coachBorderPadding / this.baseGridSize;
  // Describes the fix width of coach navigation button
  protected coachNavButtonDim: number = 0;
  protected currScrollDirection: ScrollDirection = ScrollDirection.right;
  protected maxCalcCoachsWidth: number = 0;
  protected scrollCoachsAreaWidth: number = 0;
  protected scrollNavigationAreaDim: number = 0;
  protected triggerCoachPositionsCollection: CoachScrollTriggerPoint[] = [];
  protected firstTabElement: HTMLElement = null!;
  protected lastTabElement: HTMLElement = null!;
  protected navigationScrollArea: HTMLElement = null!;
  protected coachScrollArea: HTMLElement = null!;
  protected currSelectedPlace: Place | null = null;
  protected currSelectedPlaceElementId: string | null = null;
  protected currSelectedCoachIndex: number = -1;
  protected preventCoachScrollByPlaceClick: boolean = false;
  protected selectedSeatReservationPlaces: SeatReservationPlaceSelection[] = [];
  protected seatReservationWithoutNavigationHasFocus = false;
  protected isCoachGridFocusable = false;
  protected isAutoScrolling = false;
  protected isKeyboardNavigation = false;
  protected keyboardNavigationEvents = {
    ArrowLeft: 'ArrowLeft',
    ArrowRight: 'ArrowRight',
    ArrowUp: 'ArrowUp',
    ArrowDown: 'ArrowDown',
    Tab: 'Tab',
    Enter: 'Enter',
  } as const;

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('seatReservation')) {
      this._initSeatReservationPlaceSelection();
    }

    if (changedProperties.has('baseGridSize')) {
      this.coachBorderOffset = this.coachBorderPadding / this.baseGridSize;
      this.style?.setProperty('--sbb-seat-reservation-grid-size', `${this.baseGridSize}px`);

      this.initNavigationSelectionByScrollEvent();
    }

    // If the height is used, the baseGridSize must be recalculated
    if (changedProperties.has('height') && !!this.height) {
      if (this.seatReservation.coachItems.length) {
        this.baseGridSize = this.height / this.seatReservation.coachItems[0].dimension.h;
        this.coachBorderOffset = this.coachBorderPadding / this.baseGridSize;
        this.style?.setProperty('--sbb-seat-reservation-grid-size', `${this.baseGridSize}px`);

        this.initNavigationSelectionByScrollEvent();
      }
    }

    if (changedProperties.has('alignVertical') && this.alignVertical) {
      this.initNavigationSelectionByScrollEvent();
    }
  }

  protected navigateByDirectionBtn(btnDirection: string): void {
    this.unfocusPlaceElement();
    let navigateToCoachIndex = this.currSelectedCoachIndex;
    if (btnDirection == 'DIRECTION_LEFT' && navigateToCoachIndex > 0) {
      navigateToCoachIndex =
        this.currSelectedCoachIndex != -1 ? this.currSelectedCoachIndex - 1 : 0;
    } else if (
      btnDirection == 'DIRECTION_RIGHT' &&
      navigateToCoachIndex < this.seatReservation.coachItems.length - 1
    ) {
      navigateToCoachIndex =
        this.currSelectedCoachIndex != -1 ? this.currSelectedCoachIndex + 1 : 0;
    }

    this.scrollToSelectedNavCoach(navigateToCoachIndex);
  }

  /* Init scroll event handling for coach navigation */
  protected initNavigationSelectionByScrollEvent(): void {
    if (this.seatReservation.coachItems.length > 0) {
      const borderHeight =
        (this.seatReservation.coachItems[0].dimension.h + this.coachBorderOffset * 2) *
        this.baseGridSize;
      this.style?.setProperty('--sbb-seat-reservation-coach-height', `${borderHeight + 0}`);
    }

    this.firstTabElement = this.shadowRoot?.querySelector('#first-tab-element') as HTMLElement;
    this.lastTabElement = this.shadowRoot?.querySelector('#last-tab-element') as HTMLElement;
    this.coachScrollArea = this.shadowRoot?.querySelector('#sbb-sr__parent-area') as HTMLElement;
    this.navigationScrollArea = this.shadowRoot?.querySelector('#sbb-sr-navigation') as HTMLElement;

    if (this.navigationScrollArea) {
      this.scrollNavigationAreaDim = this.alignVertical
        ? this.navigationScrollArea.getBoundingClientRect().height
        : this.navigationScrollArea.getBoundingClientRect().width;

      // Init the coachNavButtonDim dimension, which is needed to calculate the correct scroll navigation later
      const navCoacheList = this.navigationScrollArea.querySelector('ul > li') as HTMLUListElement;
      const firstLiEleDimension = navCoacheList?.getBoundingClientRect();
      this.coachNavButtonDim = this.alignVertical
        ? firstLiEleDimension?.height
        : firstLiEleDimension?.width;
    }

    if (this.coachScrollArea) {
      let currCalcTriggerPos = 0;
      this.scrollCoachsAreaWidth = this.alignVertical
        ? this.coachScrollArea.getBoundingClientRect().height
        : this.coachScrollArea.getBoundingClientRect().width;

      // Precalculate trigger scroll position array depends from coach width
      this.triggerCoachPositionsCollection = this.seatReservation.coachItems.map((coach) => {
        const startPosX = currCalcTriggerPos;
        const coachWidth = this.getCalculatedDimension(coach.dimension).w;

        // Calculation of the end scroll trigger position of a coach, including the gap between the coaches
        currCalcTriggerPos += coachWidth + this.gapBetweenCoaches;

        return {
          start: startPosX,
          end: currCalcTriggerPos,
          width: coachWidth,
        } as CoachScrollTriggerPoint;
      });

      // Set maximum calculated coach width
      this.maxCalcCoachsWidth = currCalcTriggerPos;

      // At the end of a scroll Events to a coach, the reached wagon is marked as selected
      this.coachScrollArea.addEventListener('scrollend', () => {
        const findScrollCoachIndex = this.isAutoScrolling
          ? this.currSelectedCoachIndex
          : this._getCoachIndexByScrollTriggerPosition();

        // In case the user uses the scrollbar without interacting with the seat reservation,
        // the currently selected index is -1 and we have to set this value with findScrollCoachIndex.
        if (this.currSelectedCoachIndex === -1) {
          this.currSelectedCoachIndex = findScrollCoachIndex;
        }

        if (this._isScrollableToSelectedCoach()) {
          this.currSelectedCoachIndex = findScrollCoachIndex;
        } else {
          this.currSelectedCoachIndex =
            findScrollCoachIndex < this.currSelectedCoachIndex
              ? this.currSelectedCoachIndex
              : findScrollCoachIndex;
        }

        if (!this.isAutoScrolling) {
          //When user is scrolling via scrollbar, it automatically scrolls to the focused coach in the main navigation
          this._scrollToSelectedNavigationButton(findScrollCoachIndex);
        }

        this.preventCoachScrollByPlaceClick = false;
        this.updateCurrentSelectedCoach();

        if (!this.hasNavigation) {
          this.preselectPlaceInCoach();
          this.isAutoScrolling = false;
        }
      });
    }
  }

  /**
   * If no navigation exists (property setting -> hasNavigation) and a table coach gets the focus,
   * the first place in the coach must be automatically preselected to control the place navigation via keyboard
   *
   * @param focusCoachIndex
   */
  protected onFocusTableCoachAndPreselectPlace(focusCoachIndex: number): void {
    if (!this.seatReservationWithoutNavigationHasFocus && !this.hasNavigation) {
      this.seatReservationWithoutNavigationHasFocus = true;
      this.currSelectedCoachIndex =
        focusCoachIndex === 0
          ? this.getNextAvailableCoachIndex(-1)
          : this.getPrevAvailableCoachIndex(focusCoachIndex);
      this.preselectPlaceInCoach();
    }
  }

  /**
   * Initialisation of Keyboard event handling to navigation between each places inside a selected coach by using [arrow] keys.
   * With the [TAB] key the user navigation goes to the next coach navigation element and the currently selected place is automatically reset.
   */
  protected handleKeyboardEvent(event: KeyboardEvent): void {
    const pressedKey = event.key;

    // If any place is selected and TAB Key combination ist pressed,
    // then we handle the next or previous coach selection
    if (this.currSelectedPlace) {
      if (event.shiftKey && event.keyCode === 9) {
        this._navigateCoachNavigationByKeyboard('PREV_TAB');
        event.preventDefault();
        return;
      }

      if (pressedKey === this.keyboardNavigationEvents.Tab) {
        this._navigateCoachNavigationByKeyboard('NEXT_TAB');
        event.preventDefault();
        return;
      }
    }

    // Check if a coach is selected and the arrow key is pressed
    if (this.currSelectedCoachIndex !== -1 && isArrowKeyOrPageKeysPressed(event)) {
      event.preventDefault();

      switch (pressedKey) {
        case this.keyboardNavigationEvents.ArrowLeft:
          {
            const pressedLeftKeyMapping: string = this.alignVertical
              ? this.keyboardNavigationEvents.ArrowDown
              : pressedKey;
            this._navigateToPlaceByKeyboard(pressedLeftKeyMapping);
          }
          break;
        case this.keyboardNavigationEvents.ArrowRight:
          {
            const pressedRightKeyMapping: string = this.alignVertical
              ? this.keyboardNavigationEvents.ArrowUp
              : pressedKey;
            this._navigateToPlaceByKeyboard(pressedRightKeyMapping);
          }
          break;
        case this.keyboardNavigationEvents.ArrowUp:
          {
            const pressedUpKeyMapping: string = this.alignVertical
              ? this.keyboardNavigationEvents.ArrowLeft
              : pressedKey;
            this._navigateToPlaceByKeyboard(pressedUpKeyMapping);
          }
          break;
        case this.keyboardNavigationEvents.ArrowDown:
          {
            const pressedDownKeyMapping: string = this.alignVertical
              ? this.keyboardNavigationEvents.ArrowRight
              : pressedKey;
            this._navigateToPlaceByKeyboard(pressedDownKeyMapping);
          }
          break;
        default:
          break;
      }
    }
  }

  /**
   * Selects a place inside the coach if navigated via keyboard,
   * otherwise the coach grid is selected (necessary for ScreenReader)
   */
  protected preselectPlaceInCoach(): void {
    const closestPlace = this._getClosestPlaceByKeyDirection();
    //If closestPlace exist, we have to unfocus previouse focused place
    if (closestPlace) {
      this.unfocusPlaceElement();
    }

    // Only when keyboard navigation is used and coaches are scrolled by auto scrolling,
    // then we can set the focus on the first place in the coach.
    if (this.isKeyboardNavigation && this.isAutoScrolling) {
      if (closestPlace) {
        this.focusPlaceElement(closestPlace);
      }
    }
    // In cases where the preselection function is triggered by normal clicking or via screenreader via tab,
    // we only focus the table without directly focusing the place.
    else {
      // We need to set the currSelectedPlace here for further correct functioning navigation via tab.
      this.currSelectedPlace = closestPlace;
      this._setFocusToSelectedCoachGrid();
    }
  }

  protected scrollToSelectedNavCoach(selectedNavCoachIndex: number): void {
    if (selectedNavCoachIndex !== this.currSelectedCoachIndex) {
      this.isAutoScrolling = true;
      this.isCoachGridFocusable = true;
      this.currSelectedCoachIndex = selectedNavCoachIndex;
      this._setScrollDirectionByCoachIndex();

      const scrollToCoachPosX = this._getCoachScrollPositionX();
      const isSelectedCoachIndexScrollable =
        this.selectedCoachIndex !== -1 || this.currSelectedCoachIndex > 0;

      // Checks whether the current scroll position allows scrolling to the next wagon or not
      if (isSelectedCoachIndexScrollable && this._isScrollableToSelectedCoach()) {
        this.coachScrollArea.scrollTo({
          top: this.alignVertical ? scrollToCoachPosX : 0,
          left: this.alignVertical ? 0 : scrollToCoachPosX,
          behavior: 'smooth',
        });
      } else {
        this.updateCurrentSelectedCoach();
      }

      // Automatic scrolling to the selected coach in the main navigation
      this._scrollToSelectedNavigationButton(selectedNavCoachIndex);
    }
  }

  protected focusPlaceElement(place: Place | null, coachIndex?: number): void {
    this.unfocusPlaceElement();
    if (place) {
      this.currSelectedPlace = place;
      if (coachIndex) {
        this.currSelectedCoachIndex = coachIndex;
      }

      this._setCurrSelectedPlaceElementId(place);

      const selectedPlaceElement = this._getPlaceHtmlElement();
      if (selectedPlaceElement) {
        selectedPlaceElement.setAttribute('keyfocus', 'focus');
      }
    }
  }

  protected unfocusPlaceElement(): void {
    const selectedPlaceElement = this._getPlaceHtmlElement();
    if (selectedPlaceElement) {
      selectedPlaceElement.setAttribute('keyfocus', 'unfocus');
      this._setCurrSelectedPlaceElementId(null);
      this.currSelectedPlace = null;
    }
  }

  protected getCalculatedDimension(
    elementDimension: ElementDimension,
    coachDimension?: ElementDimension,
    isOriginHeight?: boolean,
    isStretchHeight?: boolean,
  ): ElementDimension {
    if (coachDimension && !isOriginHeight) {
      // Since the height of the coach has been visually expanded to maintain a distance between the border of the coach and the places,
      // some graphics must also be adapted to the height, which end with the borders of the choach
      elementDimension.h += this.coachBorderOffset * 2;
    }

    if (isStretchHeight) {
      // In the case of graphics are assigned directly at the border of the coach,
      // these graphics must be expanded in height by a coachBorderOffset in order to reach their original visual position
      elementDimension.h += this.coachBorderOffset;
    }

    return {
      w: this.baseGridSize * elementDimension.w,
      h: this.baseGridSize * elementDimension.h,
    };
  }

  protected getCalculatedPosition(
    elementPosition: ElementPosition,
    elementDimension?: ElementDimension,
    coachDimension?: ElementDimension,
    isOriginHeight?: boolean,
  ): ElementPosition {
    if (coachDimension && elementDimension) {
      const endPosHeight = isOriginHeight
        ? coachDimension.h
        : coachDimension.h + this.coachBorderOffset;
      // If the original element is positioned at the top or bottom of the coach, we need to recalculate the Y coordinate with the additional border padding
      if (elementPosition.y === 0) {
        elementPosition.y -= this.coachBorderOffset;
      } else if (elementPosition.y + elementDimension.h === endPosHeight) {
        elementPosition.y += this.coachBorderOffset;
      }
    }

    return {
      x: this.baseGridSize * elementPosition.x,
      y: this.baseGridSize * elementPosition.y,
      z: elementPosition.z,
    };
  }

  /**
   * Counts all available seats together depending on the seat type
   *
   * @param coachIndex
   * @returns An Object with count of free seats and free bicycle places
   */
  protected getAvailableFreePlacesNumFromCoach(coachIndex: number): CoachNumberOfFreePlaces {
    const accumulator: CoachNumberOfFreePlaces = { seats: 0, bicycles: 0 };
    const freePlaces = this.seatReservation.coachItems[coachIndex].places?.reduce(
      (accumulator, currPlace: Place) => {
        if (currPlace.state !== 'FREE') {
          return accumulator;
        }
        // Count up depending on seat type
        if (currPlace.type === 'SEAT') {
          accumulator.seats++;
        } else {
          accumulator.bicycles++;
        }
        return accumulator;
      },
      accumulator,
    );
    return freePlaces ? freePlaces : accumulator;
  }

  /**
   * Performs an automatic main navigation scroll to the specified selectedNavCoachIndex.
   * Calculates the central scroll offset of the nav coach to be selected.
   * @param selectedNavCoachIndex
   */
  private _scrollToSelectedNavigationButton(selectedNavCoachIndex: number): void {
    //Time delay to not interfere with other executing calling scrollTo functions (coaches scrolling)
    setTimeout(() => {
      // Sets the hover index style for the target scroll coach
      this.hoveredScrollCoachIndex = selectedNavCoachIndex;

      if (this.hasNavigation && this.navigationScrollArea) {
        const navigationAreaCenteredPosX = this.scrollNavigationAreaDim / 2;
        const scrollButtonOffsetX = selectedNavCoachIndex * this.coachNavButtonDim;
        const scrollOffsetX =
          scrollButtonOffsetX - navigationAreaCenteredPosX + this.coachNavButtonDim;

        this.navigationScrollArea.scrollTo({
          top: this.alignVertical ? scrollOffsetX : 0,
          left: this.alignVertical ? 0 : scrollOffsetX,
          behavior: 'smooth',
        });
      }
    }, 10);
  }

  /**
   * Sets the new ScrollDirection by the new given target coach index.
   */
  private _setScrollDirectionByCoachIndex(): void {
    this.currScrollDirection =
      this.currSelectedCoachIndex > this.selectedCoachIndex
        ? ScrollDirection.right
        : ScrollDirection.left;
  }

  /**
   * Returns the scroll start or end position X from the selected coach.
   * In case the user is curretnly navigate throught places by keyboard and goes to previous coach,
   * then we return the end position of the coach to get clostest next scroll position of the next focus place.
   * @returns number
   */
  private _getCoachScrollPositionX(): number {
    const coachTriggerPoint = this.triggerCoachPositionsCollection[this.currSelectedCoachIndex];
    const isFocusPlaceFromPreviousCoachPosition =
      this.isKeyboardNavigation &&
      this.currScrollDirection === ScrollDirection.left &&
      coachTriggerPoint.width > this.scrollCoachsAreaWidth;
    return isFocusPlaceFromPreviousCoachPosition
      ? coachTriggerPoint.end - this.scrollCoachsAreaWidth
      : coachTriggerPoint.start;
  }

  /**
   * Sets the focus on the HTML table (grid) caption element so that the heading is read out when using a ScreenReader.
   */
  private _setFocusToSelectedCoachGrid(): void {
    // When the user performs an action that affects the coach navigation, then the navigated table is focusable.
    if (this.isCoachGridFocusable) {
      this.isCoachGridFocusable = false;
      const coachTableCaptionElement = this.shadowRoot?.querySelector(
        '#sbb-sr-coach-caption-' + this.currSelectedCoachIndex,
      ) as HTMLTableCaptionElement;
      if (coachTableCaptionElement) {
        coachTableCaptionElement.focus();
      }
    }
  }

  /**
   * Returns whether the current scrolled position can be used to scroll to the selected wagon
   * @returns boolean
   */
  private _isScrollableToSelectedCoach(): boolean {
    const currScrollPosX = this.alignVertical
      ? this.coachScrollArea.scrollTop
      : this.coachScrollArea.scrollLeft;
    const coachScrollWindowWidth = this.alignVertical
      ? this.coachScrollArea.getBoundingClientRect().height
      : this.coachScrollArea.getBoundingClientRect().width;
    const maxScrollWidthArea = this.maxCalcCoachsWidth - coachScrollWindowWidth;
    const currCoachTrigger = this.triggerCoachPositionsCollection[this.currSelectedCoachIndex];
    const isScrollPosSameToCurrCoachPos =
      currScrollPosX === this.triggerCoachPositionsCollection[this.currSelectedCoachIndex].start;

    return (
      (currScrollPosX < maxScrollWidthArea || currScrollPosX > currCoachTrigger.start) &&
      !isScrollPosSameToCurrCoachPos
    );
  }

  /**
   * Returns the coach index which is currently visible in the scroll area
   * @returns number
   */
  private _getCoachIndexByScrollTriggerPosition(): number {
    const scrollPos = this.alignVertical
      ? this.coachScrollArea.scrollTop
      : this.coachScrollArea.scrollLeft;
    const scrollOffsetX = scrollPos + this.scrollCoachsAreaWidth / 2;
    return this.triggerCoachPositionsCollection.findIndex(
      (coachTrigger) => scrollOffsetX >= coachTrigger.start && scrollOffsetX <= coachTrigger.end,
    );
  }

  /**
   * Get the first place of current selected coach by table cell coordinate 0-0 id.
   * @returns Place or null
   */
  private _getFirstPlaceInSelecedCoach(): Place | null {
    let firstPlace: Place | null = null;
    const coach = this.seatReservation?.coachItems[this.currSelectedCoachIndex];
    const firstCellId = 'cell-' + this.currSelectedCoachIndex + '-0-0';
    const placeNumber =
      this.shadowRoot
        ?.querySelector<HTMLTableCellElement>('#' + firstCellId)
        ?.querySelector<SbbSeatReservationPlaceControlElement>('sbb-seat-reservation-place-control')
        ?.getAttribute('text') || null;

    if (coach && placeNumber) {
      firstPlace = coach.places?.find((place) => place.number === placeNumber) || null;
    }
    return firstPlace;
  }

  /**
   * To get the correct closest place of current pressed key and the current selected place,
   * we have to investigate the coordinates of each place to find the closest place of the currSelectedPlaceElementId.
   * @param pressedKey
   * @returns Place or null
   */
  private _getClosestPlaceByKeyDirection(pressedKey?: string): Place | null {
    const coach = this.seatReservation?.coachItems[this.currSelectedCoachIndex];
    let closestPlace = null;
    if (coach.places) {
      // If no place set, then we use initial the left-top place on the coach
      if (!this.currSelectedPlaceElementId) {
        return this._getFirstPlaceInSelecedCoach();
      } else {
        if (this.currSelectedPlace) {
          for (const place of coach.places) {
            // If key pressed, then we try to find the place of the current currScrollDirection
            if (!pressedKey) {
              //Find place from the left side of coach by y coordinate. Current currScrollDirection is RIGHT)
              if (
                this.currScrollDirection === ScrollDirection.right &&
                place.position.y === this.currSelectedPlace?.position.y &&
                (!closestPlace || place.position.x < closestPlace.position.x)
              ) {
                closestPlace = place;
              }
              //Find place from the right side of coach by y coordinate. Current currScrollDirection is LEFT
              else if (
                this.currScrollDirection === ScrollDirection.left &&
                place.position.y === this.currSelectedPlace?.position.y &&
                (!closestPlace || place.position.x > closestPlace.position.x)
              ) {
                closestPlace = place;
              }
            } else {
              if (place.number !== this.currSelectedPlace?.number) {
                //Key [Right] navigation, we check the place coordinates of the x-axis to get the smallest larger x place coordinate of the currently selected place
                if (
                  pressedKey === this.keyboardNavigationEvents.ArrowRight &&
                  (place.position.y === this.currSelectedPlace.position.y ||
                    place.position.y === this.currSelectedPlace.position.y - 1) &&
                  place.position.x > this.currSelectedPlace.position.x &&
                  (!closestPlace || place.position.x < closestPlace.position.x)
                ) {
                  closestPlace = place;
                }
                //Key [Down] navigation, we check the place coordinates of the y-axis to get the smallest larger y place coordinate of the currently selected place
                else if (
                  pressedKey === this.keyboardNavigationEvents.ArrowDown &&
                  (place.position.x === this.currSelectedPlace.position.x ||
                    place.position.x === this.currSelectedPlace.position.x + 1) &&
                  place.position.y > this.currSelectedPlace.position.y &&
                  (!closestPlace || place.position.y < closestPlace.position.y)
                ) {
                  closestPlace = place;
                }
                //Key [Left] navigation, we check the place coordinates of the x-axis to get the greatest smaller x place coordinate of the currently selected place
                else if (
                  pressedKey === this.keyboardNavigationEvents.ArrowLeft &&
                  (place.position.y === this.currSelectedPlace.position.y ||
                    place.position.y === this.currSelectedPlace.position.y + 1) &&
                  place.position.x < this.currSelectedPlace.position.x &&
                  (!closestPlace || place.position.x > closestPlace.position.x)
                ) {
                  closestPlace = place;
                }
                //Key [Up] navigation, we check the place coordinates of the y-axis to get the greatest smaller y place coordinate of the currently selected place
                else if (
                  pressedKey === this.keyboardNavigationEvents.ArrowUp &&
                  (place.position.x === this.currSelectedPlace.position.x ||
                    place.position.x === this.currSelectedPlace.position.x - 1) &&
                  place.position.y < this.currSelectedPlace?.position.y &&
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

  // Handling for Tab navigation if an place is selected inside the coach.
  // This controls the focused coach from the current selected coach.
  private _navigateCoachNavigationByKeyboard(tabDirection: string): void {
    const currFocusIndex =
      this.focusedCoachIndex === -1
        ? this.currSelectedCoachIndex === -1
          ? 0
          : this.currSelectedCoachIndex
        : this.focusedCoachIndex;
    // Check next or prev tab is pressed, then we need to find the next available coach index that should receive the focus
    const newFocusableIndex: number =
      tabDirection === 'NEXT_TAB'
        ? this.getNextAvailableCoachIndex(currFocusIndex)
        : this.getPrevAvailableCoachIndex(currFocusIndex);

    // If the currFocusIndex equals the newFocusableIndex then we have reached the first or last tabable navigation coach Element and we have to the set the focus manual to the firstTabElement or lastTabElement.
    if (currFocusIndex === newFocusableIndex) {
      this.unfocusPlaceElement();
      this.seatReservationWithoutNavigationHasFocus = false;

      if (tabDirection === 'NEXT_TAB') this.lastTabElement.focus();
      else this.firstTabElement.focus();

      return;
    }

    if (this.hasNavigation) {
      const selectedPlaceElement = this._getPlaceHtmlElement();
      const placeInCoachHasFocus = selectedPlaceElement
        ? selectedPlaceElement.getAttribute('keyfocus') === 'focus'
        : false;

      // If we tab back (PREV_TAB) and the focus is currently on place,
      // we remove the selected state from the currently selected navigation coach and only set the focus status to it
      if (tabDirection === 'PREV_TAB' && this.selectedCoachIndex === currFocusIndex) {
        if (placeInCoachHasFocus) {
          this.focusedCoachIndex = currFocusIndex;
          this.unfocusPlaceElement();

          return;
        } else {
          this.focusedCoachIndex = newFocusableIndex;
        }
      }
      // Only sets the focus on the new navigation coach
      else if (newFocusableIndex !== this.currSelectedCoachIndex) {
        this.focusedCoachIndex = newFocusableIndex;
      } else {
        this.focusedCoachIndex = -1;
        this.selectedCoachIndex = newFocusableIndex;
        // If any place was focused in coach, so we set focused again
        if (placeInCoachHasFocus) {
          this.focusPlaceElement(this.currSelectedPlace);
        }
        // If no place was selected, then we select the coach grid
        else {
          this.isCoachGridFocusable = true;
          this._setFocusToSelectedCoachGrid();
        }
      }

      // By Tab Navigation, perform automatic scrolling to the focused wagon
      this._scrollToSelectedNavigationButton(newFocusableIndex);
    }
    // If no navigation exist, we scroll directly to the next tabable coach
    else {
      this.scrollToSelectedNavCoach(newFocusableIndex);
    }
  }

  private _navigateToPlaceByKeyboard(pressedKey: string): void {
    this.preventCoachScrollByPlaceClick = false;
    this.isKeyboardNavigation = true;

    if (this.focusedCoachIndex !== -1) {
      this.focusedCoachIndex = -1;
    }

    if (!this.preventPlaceClick) {
      const findClosestPlace = this._getClosestPlaceByKeyDirection(pressedKey);
      if (findClosestPlace) {
        this.focusPlaceElement(findClosestPlace);
      }
      // No closest place found by key navigation
      else {
        if (
          pressedKey === this.keyboardNavigationEvents.ArrowRight ||
          pressedKey === this.keyboardNavigationEvents.ArrowLeft ||
          (this.alignVertical &&
            (pressedKey === this.keyboardNavigationEvents.ArrowUp ||
              pressedKey === this.keyboardNavigationEvents.ArrowDown))
        ) {
          // Check the current pressed key to get the next available coach index
          const newSelectedCoachIndex =
            pressedKey === this.keyboardNavigationEvents.ArrowRight
              ? this.getNextAvailableCoachIndex()
              : this.getPrevAvailableCoachIndex();

          this.scrollToSelectedNavCoach(newSelectedCoachIndex);
        }
      }
    }
  }

  protected getNextAvailableCoachIndex(currentIndex?: number): number {
    const startIndex = currentIndex ?? this.currSelectedCoachIndex;
    return startIndex < this.seatReservation.coachItems.length - 1 ? startIndex + 1 : startIndex;
  }

  protected getPrevAvailableCoachIndex(currentIndex?: number): number {
    const startIndex = currentIndex ?? this.currSelectedCoachIndex;
    return startIndex > 0 ? startIndex - 1 : startIndex;
  }

  protected updateSelectedSeatReservationPlaces(placeSelection: PlaceSelection): void {
    // Add selected place to selectedSeatReservationPlaces
    if (placeSelection.state === 'SELECTED') {
      const seatReservationSelection = this._getSeatReservationPlaceSelection(placeSelection);
      if (seatReservationSelection) {
        this.selectedSeatReservationPlaces.push(seatReservationSelection);
      }
    }
    // Remove selected place from selectedSeatReservationPlaces
    else {
      this.selectedSeatReservationPlaces = this.selectedSeatReservationPlaces.filter(
        (_selectedPlace) => _selectedPlace.id !== placeSelection.id,
      );
    }

    // Checks whether maxReservation is activated and the maximum number of selected places is reached
    if (this.maxReservations && this.selectedSeatReservationPlaces.length > this.maxReservations) {
      this._resetAllPlaceSelections(placeSelection);
    }

    /**
     * @@type {CustomEvent<SeatReservationSelectedPlacesEventDetails>}
     * Emits when a place was selected and returns a Place array with all selected places.
     */
    this.dispatchEvent(
      new CustomEvent<SeatReservationSelectedPlacesEventDetails>('selectedplaces', {
        bubbles: true,
        composed: true,
        detail: this.selectedSeatReservationPlaces,
      }),
    );
  }

  protected updateCurrentSelectedPlaceInCoach(placeSelection: PlaceSelection): void {
    const coachIndex = placeSelection.coachIndex;
    const place = this.seatReservation.coachItems[coachIndex].places?.find(
      (place) => place.number == placeSelection.number,
    );

    if (!place) return;
    this.currSelectedCoachIndex = coachIndex;
    this.currSelectedPlace = place;
    if (this.currSelectedCoachIndex !== this.selectedCoachIndex) {
      this.updateCurrentSelectedCoach();
    }

    this._setCurrSelectedPlaceElementId(place);
  }

  protected updateCurrentSelectedCoach(): void {
    this.selectedCoachIndex = this.currSelectedCoachIndex;
    this.focusedCoachIndex = -1;
    const coachSelection = this._getSeatReservationCoachSelection(this.selectedCoachIndex);
    if (coachSelection) {
      /**
       * @type {CustomEvent<SeatReservationCoachSelection>}
       * Emits when a coach was selected and returns a CoachSelection
       */
      this.dispatchEvent(
        new CustomEvent<SeatReservationCoachSelection>('selectedcoach', {
          bubbles: true,
          composed: true,
          detail: coachSelection,
        }),
      );
    }
  }

  /**
   * Initialization of SeatReservationPlaceSelection Array based on the transferred places
   * that have the state SELECTED within the seatReservation object
   */
  private _initSeatReservationPlaceSelection(): void {
    this.seatReservation.coachItems.map((coach: CoachItem, coachIndex: number) => {
      coach.places
        ?.filter((place) => place.state === 'SELECTED')
        ?.forEach((place) => {
          const preselectedPlaceSelection: PlaceSelection = mapPlaceInfosToPlaceSelection(
            place,
            coachIndex,
          );
          const seatReservationPlaceSelection: SeatReservationPlaceSelection | null =
            this._getSeatReservationPlaceSelection(preselectedPlaceSelection);
          if (seatReservationPlaceSelection)
            this.selectedSeatReservationPlaces.push(seatReservationPlaceSelection);
        });
    });
  }

  /**
   * All selected places will be reset or the currentSelectedPlace was given, then we reset all except currentSelectedPlace
   * @param currSelectedPlace
   */
  private _resetAllPlaceSelections(currSelectedPlace?: PlaceSelection): void {
    //Find all places to be needed unselect
    for (const placeSelection of this.selectedSeatReservationPlaces) {
      if (!currSelectedPlace || currSelectedPlace.id !== placeSelection.id) {
        const placeElement = this.shadowRoot?.getElementById(placeSelection.id) as HTMLElement;
        placeElement.setAttribute('state', 'FREE');
      }
    }
    //Removes all selected places except the currently selected place
    if (currSelectedPlace) {
      this.selectedSeatReservationPlaces = this.selectedSeatReservationPlaces.filter(
        (_selectedPlace) => _selectedPlace.id === currSelectedPlace.id,
      );
    } else {
      this.selectedSeatReservationPlaces = [];
    }
  }

  private _getSeatReservationPlaceSelection(
    currSelectedPlace: PlaceSelection,
  ): SeatReservationPlaceSelection | null {
    const coach = this.seatReservation.coachItems[currSelectedPlace.coachIndex];
    const place = coach.places?.find((place) => place.number === currSelectedPlace.number);

    return place
      ? mapPlaceAndCoachToSeatReservationPlaceSelection(place, coach, currSelectedPlace.coachIndex)
      : null;
  }

  private _getSeatReservationCoachSelection(
    coachIndex: number,
  ): SeatReservationCoachSelection | null {
    if (!this.seatReservation.coachItems[coachIndex]) return null;

    const coach = this.seatReservation.coachItems[coachIndex];
    const coachNumberOfFreePlaces = this.getAvailableFreePlacesNumFromCoach(coachIndex);
    return mapCoachInfosToCoachSelection(coachIndex, coach, coachNumberOfFreePlaces);
  }

  private _setCurrSelectedPlaceElementId(place: Place | null): void {
    if (place) {
      this.currSelectedPlaceElementId =
        'seat-reservation__place-button-' + this.currSelectedCoachIndex + '-' + place.number;
    } else {
      this.currSelectedPlaceElementId = null;
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
    const currCoachIndex = coachIndex ? coachIndex : this.currSelectedCoachIndex;
    const coachPlaceNumberId = placeNumber
      ? 'seat-reservation__place-button-' + currCoachIndex + '-' + placeNumber
      : this.currSelectedPlaceElementId;
    return coachPlaceNumberId ? this.shadowRoot?.getElementById(coachPlaceNumberId) || null : null;
  }
}
