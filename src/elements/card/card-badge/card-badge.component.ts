import type { CSSResultGroup, TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { SbbElementInternalsMixin } from '../../core/mixins.ts';
import { boxSizingStyles } from '../../core/styles.ts';

import style from './card-badge.scss?lit&inline';

/**
 * It displays content within a badge.
 *
 * @slot - Use the unnamed slot to add content to the badge.
 *   Content parts should be wrapped in `<span>` tags to achieve correct spacings.
 */
export
@customElement('sbb-card-badge')
class SbbCardBadgeElement extends SbbElementInternalsMixin(LitElement) {
  public static override readonly role = 'text';
  public static override styles: CSSResultGroup = [boxSizingStyles, style];

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
