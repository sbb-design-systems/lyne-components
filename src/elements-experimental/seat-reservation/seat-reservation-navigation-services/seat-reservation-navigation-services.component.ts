import { SbbLanguageController } from '@sbb-esta/lyne-elements/core/controllers.js';
import { forceType } from '@sbb-esta/lyne-elements/core/decorators.js';
import { type CSSResultGroup, nothing, type TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

import { getI18nSeatReservation } from '../common.js';

import '@sbb-esta/lyne-elements/screen-reader-only.js';
import '../seat-reservation-graphic.js';

import style from './seat-reservation-navigation-services.scss?lit&inline';

/**
 * Component displays the available service icons of one coach.
 *
 */
export
@customElement('sbb-seat-reservation-navigation-services')
class SbbSeatReservationNavigationServicesElement extends LitElement {
  public static override styles: CSSResultGroup = style;

  /** Coach service property ids, which are used to display the services in the navigation */
  @property({ attribute: 'property-ids', type: Array })
  public accessor propertyIds: string[] = [];

  /** If true, the service icons are displayed vertically */
  @forceType()
  @property({ type: Boolean })
  public accessor vertical: boolean = false;

  private _language = new SbbLanguageController(this);

  protected override render(): TemplateResult {
    const serviceLabelDescription = this.propertyIds.length
      ? this._getServiceLabelDescription()
      : null;
    return html` <div
      class="${classMap({
        'sbb-sr-navigation__signs': true,
        'sbb-sr-navigation__signs--vertical': this.vertical,
      })}"
    >
      <sbb-screen-reader-only ${serviceLabelDescription ? serviceLabelDescription : nothing}
        >${serviceLabelDescription}</sbb-screen-reader-only
      >
      ${this.propertyIds?.map((signIcon: string) => {
        return html`
          <sbb-seat-reservation-graphic
            name=${signIcon ?? nothing}
            width="20"
            height="20"
            title=${getI18nSeatReservation(signIcon, this._language.current)}
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
