import type { CSSResultGroup, TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

import style from './tab.scss?lit&inline';

/**
 * Combined with a `sbb-tab-group`, it displays a tab's content.
 *
 * @slot - Use the unnamed slot to provide content.
 */
@customElement('sbb-tab')
export class SbbTabElement extends LitElement {
  public static override styles: CSSResultGroup = style;

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-tab">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-tab': SbbTabElement;
  }
}
