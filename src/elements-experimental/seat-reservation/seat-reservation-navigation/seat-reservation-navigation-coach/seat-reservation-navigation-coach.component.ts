import { SbbLanguageController } from '@sbb-esta/lyne-elements/core/controllers.js';
import { forceType } from '@sbb-esta/lyne-elements/core/decorators.js';
import { EventEmitter } from '@sbb-esta/lyne-elements/core/eventing.js';
import { type CSSResultGroup, nothing, type PropertyValues, type TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

import { getI18nSeatReservation } from '../../common/translations.js';
import type { PlaceTravelClass } from '../../common.js';

import style from './seat-reservation-navigation-coach.scss?lit&inline';

import '@sbb-esta/lyne-elements/screen-reader-only.js';
import '../seat-reservation-navigation-services.js';

const MAX_SERVICE_PROPERTIES = 3;

export type SelectCoachEventDetails = number;

/**
 * This component will display the navigation coach item for Seat reservation.
 *
 * @event {CustomEvent<SelectCoachEventDetails>} selectCoach - Emits when a coach within the navigation was selected and returns the clicked coach nav index
 * @event {CustomEvent<void>} focusCoach - Emits when a nav coach has the focus
 */
export
@customElement('sbb-seat-reservation-navigation-coach')
class SbbSeatReservationNavigationCoachElement extends LitElement {
  public static override styles: CSSResultGroup = style;
  public static readonly events = {
    selectCoach: 'selectCoach',
    focusCoach: 'focusCoach',
  } as const;

  /** Coach ID, which is used to identify the coach in the navigation */
  @forceType()
  @property({ attribute: 'coach-id' })
  public accessor coachId: string = '';

  /** Coach service property ids, which are used to display the services in the navigation */
  @property({ attribute: 'property-ids', type: Array })
  public accessor propertyIds: string[] = [];

  /* pre-selected Coach index property */
  @forceType()
  @property({ type: Boolean })
  public accessor selected: boolean = false;

  /* focus Coach index property */
  @forceType()
  @property({ type: Boolean })
  public accessor focused: boolean = false;

  @forceType()
  @property({ type: Number })
  public accessor index: number = 0;

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
  @property({ type: Boolean })
  public accessor vertical: boolean = false;

  private _language = new SbbLanguageController(this);

  /** Emits when a coach within the navigation was selected */
  protected selectNavCoach: EventEmitter<SelectCoachEventDetails> = new EventEmitter(
    this,
    SbbSeatReservationNavigationCoachElement.events.selectCoach,
  );
  protected focusNavCoach: EventEmitter<void> = new EventEmitter(
    this,
    SbbSeatReservationNavigationCoachElement.events.focusCoach,
  );

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('selected')) {
      const selectedNavButtonElement = this.shadowRoot?.querySelector(
        '.sbb-sr-navigation__ctrl-button',
      ) as HTMLButtonElement;
      if (this.selected && selectedNavButtonElement) {
        selectedNavButtonElement.focus();
        this.focusNavCoach.emit();
      }
    }

    if (changedProperties.has('focused') && this.focused) {
      const focusedNavButtonElement = this.shadowRoot?.querySelector(
        '.sbb-sr-navigation__ctrl-button',
      ) as HTMLButtonElement;
      if (focusedNavButtonElement) {
        focusedNavButtonElement.focus();
      }
    }
  }

  /**
   * Render a maximum of 3 of the service sign icons (slice(0,3)) regardless of the input from Backend,
   * otherwise the layout could be destroyed. Furthermore, we have to filter out the value ANY_SEAT,
   * since this is also passed as a property and does not need to be used here
   *
   * @protected
   */
  protected override render(): TemplateResult {
    this.propertyIds = this.propertyIds
      .filter((propertyId) => propertyId !== 'ANY_SEAT')
      .slice(0, MAX_SERVICE_PROPERTIES);
    return html`
      <div
        class="${classMap({
          'sbb-sr-navigation__item-coach': true,
          'last-coach': this.last,
          'first-coach': this.first,
          'vertical-coach': this.vertical,
          'sbb-sr-navigation__item-coach--selected': this.selected,
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
        type="button"
        ?disabled="${this.disable}"
        class="${classMap({
          'sbb-sr-navigation__ctrl-button': true,
          'sbb-sr-navigation-driver-area': this.driverArea,
        })}"
        title="${titleDescriptionNavCoachButton}"
        aria-describedby="nav-coach-service-descriptions-${this.index}"
        @click=${() => this._selectNavCoach(this.index)}
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
      return getI18nSeatReservation('NAVIGATE_COACH_BLOCKED', this._language.current, [
        this.coachId,
      ]);
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

    return label;
  }

  private _getAriaDescriptionCoachServices(): string | null {
    let ariaDescrition = null;
    if (this.propertyIds.length) {
      ariaDescrition =
        getI18nSeatReservation('COACH_AVAILABLE_SERVICES', this._language.current) + ': ';
      ariaDescrition += this.propertyIds
        .map((propertyId) => getI18nSeatReservation(propertyId, this._language.current))
        .join();
    }
    return ariaDescrition;
  }

  /**
   * emits the index of the coach array for the main navigation.
   * @param coachIndex
   * @private
   */
  private _selectNavCoach(coachIndex: number): void {
    if (!this.driverArea) {
      this.selectNavCoach.emit(coachIndex);
    }
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
