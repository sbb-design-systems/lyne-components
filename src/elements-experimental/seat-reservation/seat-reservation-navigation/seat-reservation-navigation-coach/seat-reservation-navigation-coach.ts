import { SbbLanguageController } from '@sbb-esta/lyne-elements/core/controllers.js';
import { forceType } from '@sbb-esta/lyne-elements/core/decorators.js';
import { EventEmitter } from '@sbb-esta/lyne-elements/core/eventing.js';
import { type CSSResultGroup, nothing, type PropertyValues, type TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { getI18nSeatReservation } from '../../common/translations.js';
import '../../seat-reservation-graphic.js';
import '../seat-reservation-navigation-services.js';
import type { PlaceTravelClass } from '../../seat-reservation.js';

import style from './seat-reservation-navigation-coach.scss?lit&inline';

/**
 * This component will display the navigation coach item for Seat reservation.
 *
 * @event {CustomEvent<T>} selectCoach - Emits when a coach within the navigation was selected and returns the clicked coach nav index
 * @event {CustomEvent<T>} focusCoach -  Emits when a nav coach has the focus
 */
export
@customElement('sbb-seat-reservation-navigation-coach')
class SbbSeatReservationNavigationCoachElement extends LitElement {
  public static override styles: CSSResultGroup = style;
  public static readonly events = {
    selectCoach: 'selectCoach',
    focusCoach: 'focusCoach',
  } as const;

  @forceType()
  @property({ attribute: 'coach-id', type: String })
  public accessor coachId: string = '';

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

  @property({ attribute: 'travel-class', type: Array })
  public accessor travelClass: PlaceTravelClass[] = ['ANY_CLASS'];

  @forceType()
  @property({ attribute: 'driver-area', type: Boolean })
  public accessor driverArea: boolean = false;

  @forceType()
  @property({ type: Boolean })
  public accessor first: boolean = false;

  @forceType()
  @property({ type: Boolean })
  public accessor last: boolean = false;

  /** Disable the coach navigation */
  @forceType()
  @property({ attribute: 'disable', type: Boolean })
  public accessor disable: boolean = false;

  @forceType()
  @property({ type: Boolean })
  public accessor vertical: boolean = false;

  private _language = new SbbLanguageController(this);

  /** Emits when a coach within the navigation was selected */
  protected selectNavCoach: EventEmitter = new EventEmitter(
    this,
    SbbSeatReservationNavigationCoachElement.events.selectCoach,
  );
  protected focusNavCoach: EventEmitter = new EventEmitter(
    this,
    SbbSeatReservationNavigationCoachElement.events.focusCoach,
  );

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('selected')) {
      const selectedNavButtonElement = this.shadowRoot?.querySelector(
        '.sbb-seat-reservation-navigation__control-button',
      ) as HTMLButtonElement;
      if (this.selected && selectedNavButtonElement) {
        selectedNavButtonElement.focus();
        this.focusNavCoach.emit();
      }
    }

    if (changedProperties.has('focused') && this.focused) {
      const focusedNavButtonElement = this.shadowRoot?.querySelector(
        '.sbb-seat-reservation-navigation__control-button',
      ) as HTMLButtonElement;
      if (focusedNavButtonElement) {
        focusedNavButtonElement.focus();
      }
    }
  }
  protected override render(): TemplateResult {
    const coachSelectedClass = this.selected
      ? 'sbb-seat-reservation-navigation__item-coach--selected'
      : '';

    const extraClasses: string[] = [
      this.last ? 'last-coach' : '',
      this.first ? 'first-coach' : '',
      this.vertical ? 'vertical-coach' : '',
    ].filter(Boolean);

    return html`
      <div
        class="sbb-seat-reservation-navigation__item-coach ${coachSelectedClass} ${extraClasses.join(
          ' ',
        )}"
      >
        ${this._getNavigationButton()}
        ${!this.driverArea && this.propertyIds?.length
          ? html`<sbb-seat-reservation-navigation-services
              .propertyIds="${this.propertyIds}"
            ></sbb-seat-reservation-navigation-services>`
          : nothing}
      </div>
    `;
  }

  private _getNavigationButton(): TemplateResult | null {
    return html`
      ${!this.driverArea
        ? html` <button
            type="button"
            ?disabled="${this.disable}"
            class="sbb-seat-reservation-navigation__control-button"
            title="${getI18nSeatReservation('NAVIGATE_TO_COACH', this._language.current, [
              this.coachId,
            ])}"
            @click=${() => this._selectNavCoach(this.index)}
          >
            ${this._getBtnInformation()}
          </button>`
        : html`<div class="sbb-seat-reservation-navigation-driver-area"></div>`}
    `;
  }

  private _getBtnInformation(): TemplateResult | null {
    return html`
      ${this.travelClass?.includes('FIRST')
        ? html`<span class="sbb-seat-reservation-navigation--first-class"></span>`
        : nothing}
      ${this.travelClass?.length > 0 || this.coachId
        ? html`<div class="sbb-seat-reservation-navigation__additional-information">
            ${this.coachId
              ? html`<div class="sbb-seat-reservation-navigation__item-coach-number">
                  ${this.coachId}
                </div>`
              : nothing}
            ${this.travelClass?.includes('FIRST')
              ? html`<div class="sbb-seat-reservation-navigation__item-coach-travelclass">1</div>`
              : this.travelClass?.includes('SECOND')
                ? html`<div class="sbb-seat-reservation-navigation__item-coach-travelclass">2</div>`
                : nothing}
          </div>`
        : nothing}
    `;
  }

  /**
   * emits the index of the coach array for the main navigation.
   * @param coachIndex
   * @private
   */
  private _selectNavCoach(coachIndex: number): void {
    this.selectNavCoach.emit(coachIndex);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-seat-reservation-navigation-coach': SbbSeatReservationNavigationCoachElement;
  }
}
