import type { CSSResultGroup, TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

import style from './carousel.scss?lit&inline';

/**
 * It displays a carousel component.
 *
 * @slot - Use the unnamed slot to add the `sbb-carousel-list` and a `sbb-paginator` for controls.
 */
export
@customElement('sbb-carousel')
class SbbCarouselElement extends LitElement {
  public static override styles: CSSResultGroup = style;

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-carousel" aria-roledescription="carousel">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-carousel': SbbCarouselElement;
  }
}
