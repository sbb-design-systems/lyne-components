import type { CSSResultGroup, TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

import style from './carousel-list.scss?lit&inline';

/**
 * It displays a list of `sbb-carousel-item` components.
 *
 * @slot - Use the unnamed slot to add `sbb-carousel-item` elements.
 */
export
@customElement('sbb-carousel-list')
class SbbCarouselListElement extends LitElement {
  public static override styles: CSSResultGroup = style;

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-carousel-list" aria-atomic="false" aria-live="polite">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-carousel-list': SbbCarouselListElement;
  }
}
