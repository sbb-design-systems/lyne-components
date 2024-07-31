import type { CSSResultGroup, TemplateResult } from 'lit';
import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { SbbLinkBaseElement } from '../core/base-elements.js';
import { slotState } from '../core/decorators.js';
import { SbbNegativeMixin } from '../core/mixins/negative-mixin.js';

import style from './teaser-product.scss?lit&inline';

/**
 * Displays a text and a footnote, combined with an image, to tease a product
 *
 * @slot - Use this slot to provide the main content.
 * @slot image - Use this slot to provide a sbb-image as background.
 * @slot footnote - Use this slot to provide a footnote.
 */
@customElement('sbb-teaser-product')
@slotState()
export class SbbTeaserProductElement extends SbbNegativeMixin(SbbLinkBaseElement) {
  public static override styles: CSSResultGroup = style;

  /** Whether the content and footer are aligned 'before' or 'after' the image */
  @property({ attribute: 'image-alignment', reflect: true })
  public imageAlignment: 'after' | 'before' = 'after';

  protected override renderTemplate(): TemplateResult {
    return html`
      <slot name="image"></slot>
      <span class="sbb-teaser-product__container">
        <p class="sbb-teaser-product__content">
          <slot></slot>
        </p>
        <p class="sbb-teaser-product__footnote">
          <slot name="footnote"></slot>
        </p>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-teaser-product': SbbTeaserProductElement;
  }
}
