import { html, unsafeCSS, type CSSResultGroup, type TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';

import { SbbElement } from '../../core/base-elements.ts';
import { boxSizingStyles } from '../../core/styles.ts';

import style from './card-badge.scss?inline';

/**
 * It displays content within a badge.
 *
 * @slot - Use the unnamed slot to add content to the badge.
 *   Content parts should be wrapped in `<span>` tags to achieve correct spacings.
 */
export class SbbCardBadgeElement extends SbbElement {
  public static override readonly elementName: string = 'sbb-card-badge';
  public static override readonly role = 'text';
  public static override styles: CSSResultGroup = [boxSizingStyles, unsafeCSS(style)];

  /** Color of the card badge. */
  @property({ reflect: true }) public accessor color: 'charcoal' | 'white' = 'charcoal';

  public override connectedCallback(): void {
    super.connectedCallback();
    this.slot ||= 'badge';
  }

  protected override render(): TemplateResult {
    return html`
      <span class="sbb-card-badge-background" aria-hidden="true"></span>
      <span class="sbb-card-badge-content">
        <slot></slot>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-card-badge': SbbCardBadgeElement;
  }
}
