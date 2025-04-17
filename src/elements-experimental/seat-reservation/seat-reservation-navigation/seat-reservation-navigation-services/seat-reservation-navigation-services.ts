import { type CSSResultGroup, nothing, type TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import '../../seat-reservation-graphic.js';

import style from './seat-reservation-navigation-services.scss?lit&inline';
import '@sbb-esta/lyne-elements/screen-reader-only.js';

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

  /**
   * render a maximum of 3 of the service sign icons (slice(0,3)) regardless of the input from Backend,
   * otherwise the layout could be destroyed
   *
   * @protected
   */
  protected override render(): TemplateResult {
    return html`<div class="sbb-seat-reservation-navigation__signs">
      ${this.propertyIds?.slice(0, 3)?.map((signIcon: string) => {
        return html`
          <sbb-seat-reservation-graphic
            name=${signIcon ?? nothing}
            aria-hidden="true"
            width="20"
            height="20"
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
