import { CSSResultGroup, html, LitElement, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';

import style from './sticky-bar.scss?lit&inline';

/**
 * A container that sticks to the bottom of the page if slotted into `sbb-container`.
 *
 * @slot - Use the unnamed slot to add content to the sticky bar.
 */
@customElement('sbb-sticky-bar')
export class SbbStickyBar extends LitElement {
  public static override styles: CSSResultGroup = style;

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-sticky-bar">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-sticky-bar': SbbStickyBar;
  }
}
