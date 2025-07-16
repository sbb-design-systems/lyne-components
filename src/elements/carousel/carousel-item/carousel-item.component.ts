import type { CSSResultGroup, TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

import style from './carousel-item.scss?lit&inline';

/**
 * It displays an item contained into the `sbb-carousel` component.
 *
 * @slot - Use the unnamed slot to add images for the carousel, as <img>, <sbb-image>, <picture>, ...
 */
export
@customElement('sbb-carousel-item')
class SbbCarouselItemElement extends LitElement {
  public static override styles: CSSResultGroup = style;
  public static readonly events: Record<string, string> = {
    beforeshow: 'beforeshow',
    show: 'show',
  } as const;

  // FIXME: aria-label https://www.w3.org/WAI/ARIA/apg/patterns/carousel/#wai-ariaroles,states,andproperties
  protected override render(): TemplateResult {
    return html`
      <div class="sbb-carousel-item" role="group" aria-roledescription="slide">
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
