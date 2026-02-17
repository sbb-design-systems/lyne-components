import { SbbLanguageController } from '@sbb-esta/lyne-elements/core/controllers.js';
import { forceType } from '@sbb-esta/lyne-elements/core/decorators.js';
import { boxSizingStyles } from '@sbb-esta/lyne-elements/core/styles.js';
import { type CSSResultGroup, nothing, type PropertyValues, type TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

import { getI18nSeatReservation } from '../common/translations.ts';
import type { CoachNumberOfFreePlaces, PlaceTravelClass } from '../common.ts';

import style from './seat-reservation-navigation-coach.scss?lit&inline';

import '@sbb-esta/lyne-elements/screen-reader-only.js';
import '../seat-reservation-navigation-services.ts';

export type SelectCoachEventDetails = number;

/**
 * This component will display the navigation coach item for Seat reservation.
 */
export
@customElement('sbb-seat-reservation-navigation-coach')
class SbbSeatReservationNavigationCoachElement extends LitElement {
  public static override styles: CSSResultGroup = [boxSizingStyles, style];
  public static readonly events = {
    selectcoach: 'selectcoach',
    focuscoach: 'focuscoach',
  } as const;

  /** Coach ID, which is used to identify the coach in the navigation */
  @forceType()
  @property({ attribute: 'coach-id' })
  public accessor coachId: string = '';

  /** Coach service property ids, which are used to display the services in the navigation */
  @property({ attribute: 'property-ids', type: Array })
  public accessor propertyIds: string[] = [];

  /** Select coach property */
  @forceType()
  @property({ type: Boolean })
  public accessor selected: boolean = false;

  /** Focus coach property */
  @forceType()
  @property({ type: Boolean })
  public accessor focused: boolean = false;

  /** Hover coach property */
  @forceType()
  @property({ type: Boolean })
  public accessor hovered: boolean = false;

  /** Native focus for this navigation coach is also set when the focused property is changed */
  @forceType()
  @property({ type: Boolean })
  public accessor nativeFocusActive: boolean = true;

  @forceType()
  @property({ type: Number })
  public accessor index: number = 0;

  /** Representation of places available for selecting, counting seat places and bicycle places separately */
  @property({ attribute: 'free-places-by-type', type: Object })
  public accessor freePlacesByType: CoachNumberOfFreePlaces = { seats: 0, bicycles: 0 };

  /** Travel class of the coach */
  @property({ attribute: 'travel-class', type: Array })
  public accessor travelClass: PlaceTravelClass[] = ['ANY_CLASS'];

  /** If the coach is a driver/restricted area */
  @forceType()
  @property({ attribute: 'driver-area', type: Boolean })
  public accessor driverArea: boolean = false;

  /** If the coach is the first in the navigation */
  @forceType()
  @property({ type: Boolean })
  public accessor first: boolean = false;

  /** If the coach is the last in the navigation */
  @forceType()
  @property({ type: Boolean })
  public accessor last: boolean = false;

  /** Disable the coach navigation */
  @forceType()
  @property({ attribute: 'disable', type: Boolean })
  public accessor disable: boolean = false;

  /** If the coach navigation should be displayed vertically */
  @forceType()
  @property({ type: Boolean, reflect: true, useDefault: true })
  public accessor vertical: boolean = false;

  private _language = new SbbLanguageController(this);

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('selected')) {
      const selectedNavButtonElement = this.shadowRoot?.querySelector(
        '.sbb-sr-navigation__ctrl-button',
      ) as HTMLButtonElement;
      if (this.selected && selectedNavButtonElement) {
        if (this.nativeFocusActive) {
          selectedNavButtonElement.focus();
        }
        /** Emits when a nav coach has the focus */
        this.dispatchEvent(new Event('focuscoach', { bubbles: true, composed: true }));
      }
    }

    if (changedProperties.has('focused') && this.focused) {
      const focusedNavButtonElement = this.shadowRoot?.querySelector(
        '.sbb-sr-navigation__ctrl-button',
      ) as HTMLButtonElement;

      if (focusedNavButtonElement && this.nativeFocusActive) {
        focusedNavButtonElement.focus();
      }
    }
  }

  /**
   * Render a list of service icons provided by a caller
   *
   * @protected
   */
  protected override render(): TemplateResult {
    return html`
      <div
        class="${classMap({
          'sbb-sr-navigation__item-coach': true,
          'last-coach': this.last,
          'first-coach': this.first,
          'sbb-sr-navigation__item-coach--selected': this.selected,
          'sbb-sr-navigation__item-coach--focused': this.focused,
          'sbb-sr-navigation__item-coach--hovered': this.hovered,
        })}"
      >
        ${this._getNavigationButton()}
        ${this.propertyIds?.length
          ? html`<sbb-seat-reservation-navigation-services
              ?vertical="${this.vertical}"
              .propertyIds="${this.propertyIds}"
            ></sbb-seat-reservation-navigation-services>`
          : nothing}
      </div>
    `;
  }

  private _getNavigationButton(): TemplateResult | null {
    const currServiceClassNumber = this._getCoachServiceClassNumber();
    const titleDescriptionNavCoachButton =
      this._getTitleDescriptionNavCoachButton(currServiceClassNumber);
    const ariaDescriptionCoachServices = this._getAriaDescriptionCoachServices();

    return html` <button
        @click=${() => this._selectNavCoach(this.index)}
        class="${classMap({
          'sbb-sr-navigation__ctrl-button': true,
          'sbb-sr-navigation-driver-area': this.driverArea,
        })}"
        ?disabled="${this.disable}"
        title="${titleDescriptionNavCoachButton}"
        type="button"
        aria-describedby="nav-coach-service-descriptions-${this.index}"
      >
        ${this._getBtnInformation(currServiceClassNumber)}
      </button>
      <sbb-screen-reader-only id="nav-coach-service-descriptions-${this.index}"
        >${ariaDescriptionCoachServices}</sbb-screen-reader-only
      >`;
  }

  private _getBtnInformation(serviceClassNumber: number | null): TemplateResult | null {
    if (this.driverArea) {
      return null;
    }

    return html`
      ${serviceClassNumber === 1
        ? html`<span class="sbb-sr-navigation--first-class"></span>`
        : nothing}
      ${this.travelClass?.length > 0 || this.coachId
        ? html`<div class="sbb-sr-navigation__additional-information">
            ${this.coachId
              ? html`<div class="sbb-sr-navigation__item-coach-number" aria-hidden="true">
                  ${this.coachId}
                </div>`
              : nothing}
            <div
              ${serviceClassNumber ?? nothing}
              class="sbb-sr-navigation__item-coach-travelclass"
              aria-hidden="true"
            >
              ${serviceClassNumber}
            </div>
          </div>`
        : nothing}
    `;
  }

  private _getTitleDescriptionNavCoachButton(serviceClassNumber: number | null): string {
    if (this.driverArea) {
      return getI18nSeatReservation('NAVIGATE_COACH_BLOCKED', this._language.current);
    }

    let label = getI18nSeatReservation('NAVIGATE_TO_COACH', this._language.current, [this.coachId]);

    //If service class exist, then expand label with service class translation
    if (serviceClassNumber) {
      const serviceClassTranslationKey =
        serviceClassNumber === 1 ? 'SERVICE_CLASS_FIRST' : 'SERVICE_CLASS_SECOND';
      const serviceClassTranslation = getI18nSeatReservation(
        serviceClassTranslationKey,
        this._language.current,
      );
      const serviceClassLabel = getI18nSeatReservation(
        'NAVIGATE_TO_COACH_SERVICE_CLASS_SUB',
        this._language.current,
        [serviceClassTranslation],
      );
      label = label.concat(serviceClassLabel);
    }

    // Expands the number of available seats and bicycle spaces as info
    const freePlacesTxt = getI18nSeatReservation(
      'COACH_AVAILABLE_NUMBER_OF_PLACES',
      this._language.current,
      [this.freePlacesByType.seats, this.freePlacesByType.bicycles],
    );
    label = label.concat('. ').concat(freePlacesTxt);
    return label;
  }

  private _getAriaDescriptionCoachServices(): string | null {
    let ariaDescription = null;
    if (this.propertyIds.length) {
      ariaDescription =
        getI18nSeatReservation('COACH_AVAILABLE_SERVICES', this._language.current) + ': ';
      ariaDescription += this.propertyIds
        .map((propertyId) => getI18nSeatReservation(propertyId, this._language.current))
        .join();
    }
    return ariaDescription;
  }

  /**
   * emits the index of the coach array for the main navigation.
   * @param coachIndex
   * @private
   */
  private _selectNavCoach(coachIndex: number): void {
    /**
     * @type {CustomEvent<SelectCoachEventDetails>}
     * Emits when a coach within the navigation was selected and returns the clicked coach nav index.
     */
    this.dispatchEvent(
      new CustomEvent<SelectCoachEventDetails>('selectcoach', {
        bubbles: true,
        composed: true,
        detail: coachIndex,
      }),
    );
  }

  private _getCoachServiceClassNumber(): number | null {
    if (this.travelClass?.includes('FIRST')) {
      return 1;
    } else if (this.travelClass?.includes('SECOND')) {
      return 2;
    } else {
      return null;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-seat-reservation-navigation-coach': SbbSeatReservationNavigationCoachElement;
  }
}
