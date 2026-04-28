import { SbbSecondaryButtonElement } from '@sbb-esta/lyne-elements/button.pure.js';
import type { SbbElementType } from '@sbb-esta/lyne-elements/core.js';
import {
  boxSizingStyles,
  SbbLanguageController,
  SbbScreenReaderOnlyElement,
} from '@sbb-esta/lyne-elements/core.js';
import { SbbPopoverElement } from '@sbb-esta/lyne-elements/popover.pure.js';
import type { CSSResultGroup, PropertyValues, TemplateResult } from 'lit';
import { html, isServer, nothing, unsafeCSS } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { repeat } from 'lit/directives/repeat.js';
import { styleMap } from 'lit/directives/style-map.js';

import { getI18nSeatReservation } from '../common/translations.ts';
import type {
  BaseElement,
  CoachItem,
  CoachItemDetails,
  Place,
  PlaceSelection,
  SeatReservation,
} from '../common/types.ts';
import { SbbSeatReservationAreaElement } from '../seat-reservation-area/seat-reservation-area.component.ts';
import { SbbSeatReservationGraphicElement } from '../seat-reservation-graphic/seat-reservation-graphic.component.ts';
import { SbbSeatReservationNavigationCoachElement } from '../seat-reservation-navigation-coach/seat-reservation-navigation-coach.component.ts';
import { SbbSeatReservationPlaceControlElement } from '../seat-reservation-place-control/seat-reservation-place-control.component.ts';
import { SbbSeatReservationScopedElement } from '../seat-reservation-scoped/seat-reservation-scoped.component.ts';

import { SeatReservationBaseElement } from './seat-reservation-base-element.ts';
import style from './seat-reservation.scss?inline';

/**
 * Main component for the seat reservation.
 *
 */
export class SbbSeatReservationElement extends SeatReservationBaseElement {
  public static override readonly elementName: string = 'sbb-seat-reservation';
  public static override elementDependencies: SbbElementType[] = [
    SbbSecondaryButtonElement,
    SbbScreenReaderOnlyElement,
    SbbPopoverElement,
    SbbSeatReservationAreaElement,
    SbbSeatReservationGraphicElement,
    SbbSeatReservationPlaceControlElement,
    SbbSeatReservationNavigationCoachElement,
    SbbSeatReservationScopedElement,
  ];
  public static override styles: CSSResultGroup = [boxSizingStyles, unsafeCSS(style)];

  private _language = new SbbLanguageController(this);
  private _coachesHtmlTemplate?: TemplateResult;

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
    if (!this.hasMultipleDecks) {
      return null;
    }

    return this.seatReservations.map((seatReservation) => {
      const deckDescription = getI18nSeatReservation(
        seatReservation.deckCoachLevel,
        this._language.current,
      );
      return html`<b aria-hidden="true">${deckDescription}</b>`;
    });
  }

  private _renderNavigationControlButton(btnDirection: string): TemplateResult | null {
    if (!this.hasNavigation || !this.seatReservations) {
      return null;
    }
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
    if (!this.travelDirection || this.travelDirection === 'NONE') {
      return null;
    }

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
    if (isServer || !this.hasNavigation || !this.seatReservations) {
      return null;
    }
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

    if (!coaches || isServer) {
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
      ${this._getRenderedCoachBorders(coachItem, coachDeckIndex, coachIndex)}
      ${this._getRenderedCoachElements(coachDeckIndex, coachIndex)}
      ${this._getRenderedAreaElements(coachDeckIndex, coachIndex)}
      ${this._getRenderedServiceElements(coachDeckIndex, coachIndex)}

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
    deckCoachIndex: number,
    coachIndex: number,
  ): TemplateResult | null {
    if (!coachItem.graphicElements) {
      return null;
    }

    const currCoachStructure =
      this.seatReservationStructure.decks[deckCoachIndex].deckCoaches[coachIndex];
    const coachBorderElement = currCoachStructure.borderMiddleElement;
    const hasOverhangingElements = currCoachStructure.hasOverhangingElements;

    return html`
      <sbb-seat-reservation-graphic
        class="${classMap({
          'sbb-sr-coach-has-overhanging-elements': hasOverhangingElements || false,
        })}"
        style=${styleMap({
          '--sbb-seat-reservation-graphic-width': coachBorderElement.dimension.w,
          '--sbb-seat-reservation-graphic-height': coachBorderElement.dimension.h,
          '--sbb-seat-reservation-graphic-top': coachBorderElement.position.y,
          '--sbb-seat-reservation-graphic-left': coachBorderElement.position.x,
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
              travel-direction=${this.travelDirection}
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

  private _getRenderedCoachElements(
    coachDeckIndex: number,
    coachIndex: number,
  ): TemplateResult[] | null {
    const currCoachStructure =
      this.seatReservationStructure.decks[coachDeckIndex].deckCoaches[coachIndex];

    return currCoachStructure.otherElements.map((graphicElement) => {
      return html` <sbb-seat-reservation-graphic
        style=${styleMap({
          '--sbb-seat-reservation-graphic-width': graphicElement.dimension.w,
          '--sbb-seat-reservation-graphic-height': graphicElement.dimension.h,
          '--sbb-seat-reservation-graphic-top': graphicElement.position.y,
          '--sbb-seat-reservation-graphic-left': graphicElement.position.x,
          '--sbb-seat-reservation-graphic-position': 'absolute',
          '--sbb-seat-reservation-graphic-rotation': graphicElement.rotation,
        })}
        name=${graphicElement.icon ?? nothing}
        aria-hidden="true"
        ?stretch=${true}
      ></sbb-seat-reservation-graphic>`;
    });
  }

  private _getRenderedAreaElements(
    coachDeckIndex: number,
    coachIndex: number,
  ): TemplateResult[] | null {
    const currCoachStructure =
      this.seatReservationStructure.decks[coachDeckIndex].deckCoaches[coachIndex];

    return currCoachStructure.areaElements.map((graphicElement) => {
      const triggerId = `popover-trigger-${coachDeckIndex}-${coachIndex}-${graphicElement.position.x}-${graphicElement.position.y}`;
      const isNotTableGraphic = graphicElement.icon?.indexOf('TABLE') === -1;
      const areaProperty = graphicElement.icon && isNotTableGraphic ? graphicElement.icon : null;
      const ariaLabelForArea = graphicElement.icon
        ? getI18nSeatReservation(graphicElement.icon, this._language.current)
        : nothing;

      return html`
        <sbb-seat-reservation-area
          id="${triggerId}"
          class="${classMap({
            'sbb-seat-reservation-area--cursor-pointer': areaProperty !== null,
          })}"
          style=${styleMap({
            '--sbb-seat-reservation-area-width': graphicElement.dimension.w,
            '--sbb-seat-reservation-area-height': graphicElement.dimension.h,
            '--sbb-seat-reservation-area-top': graphicElement.position.y,
            '--sbb-seat-reservation-area-left': graphicElement.position.x,
            '--sbb-seat-reservation-area-z-index': graphicElement.position.z,
          })}
          mounting=${graphicElement.mounting ?? nothing}
          background="dark"
          aria-hidden="true"
        >
          ${areaProperty
            ? html`
                <sbb-seat-reservation-graphic
                  style=${styleMap({
                    '--sbb-seat-reservation-graphic-max-width': this.globalAreaIconDim.w,
                    '--sbb-seat-reservation-graphic-max-height': this.globalAreaIconDim.h,
                    '--sbb-seat-reservation-graphic-width': graphicElement.dimension.w,
                    '--sbb-seat-reservation-graphic-height': graphicElement.dimension.h,
                    '--sbb-seat-reservation-graphic-rotation': graphicElement.rotation,
                    '--sbb-seat-reservation-graphic-padding-percent':
                      areaProperty !== 'ENTRY_EXIT' ? this.globalAreaIconPadding : 1,
                  })}
                  name=${areaProperty}
                  role="img"
                  aria-hidden="true"
                  class="sbb-sr-graphic__dimension--square-dim"
                ></sbb-seat-reservation-graphic>
              `
            : nothing}
        </sbb-seat-reservation-area>
        ${areaProperty ? this._popover(triggerId, ariaLabelForArea) : nothing}
      `;
    });
  }

  private _getRenderedServiceElements(
    coachDeckIndex: number,
    coachIndex: number,
  ): TemplateResult[] | null {
    const currCoachStructure =
      this.seatReservationStructure.decks[coachDeckIndex].deckCoaches[coachIndex];

    return currCoachStructure.serviceElements.map((serviceElement: BaseElement) => {
      //generate unique index number for the trigger element
      const triggerId = `popover-trigger-${coachDeckIndex}-${coachIndex}-${serviceElement.position.x}-${serviceElement.position.y}`;
      const titleDescription = serviceElement.icon
        ? getI18nSeatReservation(serviceElement.icon, this._language.current)
        : null;

      return html`
        <sbb-seat-reservation-graphic
          id="${triggerId}"
          style=${styleMap({
            '--sbb-seat-reservation-graphic-width': serviceElement.dimension.w,
            '--sbb-seat-reservation-graphic-height': serviceElement.dimension.h,
            '--sbb-seat-reservation-graphic-top': serviceElement.position.y,
            '--sbb-seat-reservation-graphic-left': serviceElement.position.x,
            '--sbb-seat-reservation-graphic-position': 'absolute',
            '--sbb-seat-reservation-graphic-rotation': serviceElement.rotation,
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
        if (!icon) {
          return null;
        }

        const descriptionAlreadyExist = uniqueDescriptions.indexOf(icon) > -1;
        const translation = getI18nSeatReservation(
          descriptionElement.icon!,
          this._language.current,
        );
        const isValidDescription =
          this.notFixedRotatableAreaIcons.indexOf(icon) === -1 &&
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
