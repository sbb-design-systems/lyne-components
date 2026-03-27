import { SbbElement } from '@sbb-esta/lyne-elements/core/base-elements.js';
import { SbbLanguageController } from '@sbb-esta/lyne-elements/core/controllers.js';
import { forceType } from '@sbb-esta/lyne-elements/core/decorators.js';
import { boxSizingStyles } from '@sbb-esta/lyne-elements/core/styles.js';
import { type CSSResultGroup, nothing, type TemplateResult, unsafeCSS } from 'lit';
import { html, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';

import { getI18nSeatReservation } from '../common/translations.ts';
import { SbbSeatReservationGraphicElement } from '../seat-reservation-graphic/seat-reservation-graphic.component.ts';

import style from './seat-reservation-navigation-services.scss?inline';

import '@sbb-esta/lyne-elements/screen-reader-only.js';

SbbSeatReservationGraphicElement.define();

/**
 * Component displays the available service icons of one coach.
 *
 */
export class SbbSeatReservationNavigationServicesElement extends SbbElement {
  public static override readonly elementName: string = 'sbb-seat-reservation-navigation-services';
  public static override styles: CSSResultGroup = [boxSizingStyles, unsafeCSS(style)];

  /** Coach service property ids, which are used to display the services in the navigation */
  @property({ attribute: 'property-ids', type: Array })
  public accessor propertyIds: string[] = [];

  /** If true, the service icons are displayed vertically */
  @forceType()
  @property({ type: Boolean, reflect: true, useDefault: true })
  public accessor vertical: boolean = false;

  /** Disable the mouse over title information */
  @forceType()
  @property({ type: Boolean })
  public accessor showTitleInfo: boolean = false;

  private _language = new SbbLanguageController(this);

  protected override render(): TemplateResult {
    const serviceLabelDescription = this.propertyIds?.length
      ? this._getServiceLabelDescription()
      : null;
    return html` <div class="sbb-sr-navigation__signs">
      <sbb-screen-reader-only ${serviceLabelDescription ? serviceLabelDescription : nothing}
        >${serviceLabelDescription}</sbb-screen-reader-only
      >
      ${this.propertyIds?.map((signIcon: string) => {
        return html`
          <sbb-seat-reservation-graphic
            class="auto-width"
            name=${signIcon ?? nothing}
            title=${this.showTitleInfo
              ? getI18nSeatReservation(signIcon, this._language.current)
              : nothing}
            aria-hidden="true"
          ></sbb-seat-reservation-graphic>
        `;
      })}
    </div>`;
  }

  //Generate the translated service label from the available properties
  private _getServiceLabelDescription(): string | null {
    let label = null;
    const translatedServiceLabels = this.propertyIds
      .map((prop) => getI18nSeatReservation(prop, this._language.current))
      .filter((propTranslation) => !!propTranslation)
      .join(', ');

    if (translatedServiceLabels) {
      label = getI18nSeatReservation('COACH_AVAILABLE_SERVICES', this._language.current)
        .concat(':')
        .concat(translatedServiceLabels);
    }
    return label;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-seat-reservation-navigation-services': SbbSeatReservationNavigationServicesElement;
  }
}
