import { type CSSResultGroup, html, type TemplateResult, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';

import { boxSizingStyles, SbbElement } from '../core.ts';

import style from './chip-label.scss?inline';

/**
 * It displays brief and compact information.
 *
 * @slot - Use the unnamed slot to add content to the `sbb-chip-label`.
 */
export class SbbChipLabelElement extends SbbElement {
  public static override readonly elementName: string = 'sbb-chip-label';
  public static override styles: CSSResultGroup = [boxSizingStyles, unsafeCSS(style)];

  /** Size of the chip. */
  @property({ reflect: true })
  public accessor size: 'xxs' | 'xs' | 's' = 'xxs';

  /** Color of the chip. */
  @property({ reflect: true })
  public accessor color: 'milk' | 'charcoal' | 'white' | 'granite' = 'milk';

  protected override render(): TemplateResult {
    return html`
      <span class="sbb-chip-label">
        <span class="sbb-chip__text-wrapper">
          <slot></slot>
        </span>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-chip-label': SbbChipLabelElement;
  }
}
