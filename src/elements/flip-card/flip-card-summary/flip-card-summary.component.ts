import type { CSSResultGroup, TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { boxSizingStyles } from '../../core/styles.ts';

import style from './flip-card-summary.scss?lit&inline';

export type SbbFlipCardImageAlignment = 'after' | 'below';

/**
 * Combined with a `sbb-flip-card`, it displays its content when the card is not flipped.
 *
 * @slot - Use the unnamed slot to provide a title for the `sbb-flip-card-summary`.
 * @slot image - Use this slot to provide an image for the `sbb-flip-card-summary`.
 */
export
@customElement('sbb-flip-card-summary')
class SbbFlipCardSummaryElement extends LitElement {
  public static override styles: CSSResultGroup = [boxSizingStyles, style];

  /** The position where to render the image. */
  @property({ attribute: 'image-alignment', reflect: true })
  public accessor imageAlignment: SbbFlipCardImageAlignment = 'after';

  public override connectedCallback(): void {
    super.connectedCallback();
    this.slot ||= 'summary';
  }

  protected override render(): TemplateResult {
    return html`
      <slot></slot>
      <div class="sbb-flip-card-summary--image-wrapper">
        <slot name="image"></slot>
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
