import { forceType } from '@sbb-esta/lyne-elements/core/decorators/force-type';
import type { CSSResultGroup, TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import style from './seat-reservation-navigation.scss?lit&inline';

/**
 * Describe the purpose of the component with a single short sentence.
 *
 * @slot - Use the unnamed slot to add elements.
 */
export
@customElement('sbb-seat-reservation-navigation')
class SbbSeatReservationNavigationElement extends LitElement {
  public static override styles: CSSResultGroup = style;

  @forceType()
  @property({ attribute: 'align-vertical', type: Boolean })
  public accessor alignVertical: boolean = false;

  protected override render(): TemplateResult {
    const classAlignVertical = this.alignVertical
      ? 'sbb-seat-reservation-navigation__wrapper sbb-seat-reservation-navigation__wrapper--vertical'
      : 'sbb-seat-reservation-navigation__wrapper';
    return html` <div class="${classAlignVertical}">
      <ul class="sbb-seat-reservation-navigation__list-coaches">
        <li class="sbb-seat-reservation-navigation__item-coache">Nav Coach 0</li>
        <li class="sbb-seat-reservation-navigation__item-coache">Nav Coach 1</li>
        <li class="sbb-seat-reservation-navigation__item-coache">Nav Coach 2</li>
        <li class="sbb-seat-reservation-navigation__item-coache">Nav Coach 3</li>
      </ul>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-seat-reservation-navigation': SbbSeatReservationNavigationElement;
  }
}
