import { SbbLanguageController } from '@sbb-esta/lyne-elements/core/controllers.js';
import '@sbb-esta/lyne-elements/screen-reader-only.js';
import { forceType } from '@sbb-esta/lyne-elements/core/decorators/force-type';
import { type CSSResultGroup, nothing, type TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

import '../../seat-reservation-graphic.js';
import { getI18nSeatReservation } from '../../common.js';

import style from './seat-reservation-navigation-services.scss?lit&inline';

const MAX_SERVICE_PROPERTIES = 3;

/**
 * Component displays the available service icons of one coach.
 *
 */
export
@customElement('sbb-seat-reservation-navigation-services')
class SbbSeatReservationNavigationServicesElement extends LitElement {
  public static override styles: CSSResultGroup = style;

  @property({ attribute: 'property-ids', type: Array })
  public accessor propertyIds: string[] = [];

  @forceType()
  @property({ type: Boolean })
  public accessor vertical: boolean = false;

  private _language = new SbbLanguageController(this);

  /**
   * render a maximum of 3 of the service sign icons (slice(0,3)) regardless of the input from Backend,
   * otherwise the layout could be destroyed
   *
   * @protected
   */
  protected override render(): TemplateResult {
    const propertyIds = this.propertyIds?.slice(0, MAX_SERVICE_PROPERTIES);
    let servicePropertyLabels: string;

    //Generate the tranlsated service label from the available properties
    if (propertyIds.length > 0) {
      const translatedServiceLabels = propertyIds
        .map((prop) => getI18nSeatReservation(prop, this._language.current))
        .filter((propTranslation) => !!propTranslation)
        .join(', ');

      if (translatedServiceLabels) {
        servicePropertyLabels = getI18nSeatReservation(
          'NAVIGATION_COACH_SERVICE_AVAILABLE',
          this._language.current,
        ).concat(translatedServiceLabels);
      }
    }

    return html`<div
      class="${classMap({
        'sbb-seat-reservation-navigation__signs': true,
        'sbb-seat-reservation-navigation__signs--vertical': this.vertical,
      })}"
    >
      ${propertyIds?.map((signIcon: string) => {
        return html`
          <sbb-screen-reader-only ${servicePropertyLabels ? servicePropertyLabels : nothing}
            >${servicePropertyLabels}</sbb-screen-reader-only
          >
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
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-seat-reservation-navigation-services': SbbSeatReservationNavigationServicesElement;
  }
}
