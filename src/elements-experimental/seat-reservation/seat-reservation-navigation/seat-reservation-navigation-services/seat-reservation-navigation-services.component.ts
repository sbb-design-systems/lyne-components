import { SbbLanguageController } from '@sbb-esta/lyne-elements/core/controllers.js';
import { forceType } from '@sbb-esta/lyne-elements/core/decorators.js';
import { type CSSResultGroup, nothing, type TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

import { getI18nSeatReservation } from '../../common.js';

import '@sbb-esta/lyne-elements/screen-reader-only.js';
import '../../seat-reservation-graphic.js';

import style from './seat-reservation-navigation-services.scss?lit&inline';

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

  protected override render(): TemplateResult {
    return html` <div
      class="${classMap({
        'sbb-seat-reservation-navigation__signs': true,
        'sbb-seat-reservation-navigation__signs--vertical': this.vertical,
      })}"
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
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-seat-reservation-navigation-services': SbbSeatReservationNavigationServicesElement;
  }
}
