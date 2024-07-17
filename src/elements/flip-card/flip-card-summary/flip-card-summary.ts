import type { CSSResultGroup, TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { hostAttributes } from '../../core/decorators.js';

import style from './flip-card-summary.scss?lit&inline';

/**
 * Combined with a `sbb-flip-card`, it displays its content when the card is not flipped.
 *
 * @slot - Use the unnamed slot to provide a title for the `sbb-flip-card-summary`.
 * @slot image - Use this slot to provide an image for the `sbb-flip-card-summary`.
 */
@customElement('sbb-flip-card-summary')
@hostAttributes({
  slot: 'summary',
})
export class SbbFlipCardSummaryElement extends LitElement {
  public static override styles: CSSResultGroup = style;

  /** The position where to render the image. */
  @property({ attribute: 'image-alignment', reflect: true }) public imageAlignment:
    | 'after'
    | 'below' = 'after';

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-flip-card-summary--wrapper">
        <slot></slot>
        <div class="sbb-flip-card-summary--image-wrapper">
          <slot name="image"></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-flip-card-summary': SbbFlipCardSummaryElement;
  }
}
