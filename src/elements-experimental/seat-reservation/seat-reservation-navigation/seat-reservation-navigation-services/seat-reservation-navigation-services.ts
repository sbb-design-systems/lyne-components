import { type CSSResultGroup, nothing, type TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import '../../seat-reservation-graphic/seat-reservation-graphic.js';

import style from './seat-reservation-navigation-services.scss?lit&inline';
import '@sbb-esta/lyne-elements/screen-reader-only/screen-reader-only.js';

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

  protected override render(): TemplateResult {
    return html`<div class="sbb-seat-reservation-navigation__signs">
      ${this.propertyIds?.map((signIcon: string) => {
        return html`
          <sbb-seat-reservation-graphic
            name=${signIcon ?? nothing}
            width="1"
            height="1"
            aria-hidden="true"
          ></sbb-seat-reservation-graphic>
          <sbb-screen-reader-only>${'TODO : info from BE? ' + signIcon}</sbb-screen-reader-only>
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
