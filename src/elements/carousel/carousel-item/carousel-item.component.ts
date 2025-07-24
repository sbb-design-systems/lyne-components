import type { CSSResultGroup, TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { forceType } from '../../core/decorators.js';

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

  /** This will be forwarded as aria-label to the inner slideshow element. */
  @forceType()
  @property({ attribute: 'accessibility-label' })
  public accessor accessibilityLabel: string = '';

  protected override render(): TemplateResult {
    return html`
      <div
        class="sbb-carousel-item"
        role="group"
        aria-roledescription="slide"
        aria-label=${this.accessibilityLabel}
      >
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
