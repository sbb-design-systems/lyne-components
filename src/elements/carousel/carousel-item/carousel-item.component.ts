import type { CSSResultGroup, TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

import { hostAttributes } from '../../core/decorators.js';
import { SbbElementInternalsMixin } from '../../core/mixins.js';

import style from './carousel-item.scss?lit&inline';

/**
 * It displays an item contained into the `sbb-carousel` component.
 *
 * @slot - Use the unnamed slot to add images for the carousel, as <img>, <sbb-image>, <picture>, ...
 */
export
@customElement('sbb-carousel-item')
@hostAttributes({
  role: 'group',
  'aria-roledescription': 'slide',
})
class SbbCarouselItemElement extends SbbElementInternalsMixin(LitElement) {
  public static override styles: CSSResultGroup = style;
  public static readonly events: Record<string, string> = {
    beforeshow: 'beforeshow',
    show: 'show',
  } as const;

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-carousel-item">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-carousel-item': SbbCarouselItemElement;
  }
}
