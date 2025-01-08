import type { CSSResultGroup, TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

import style from './sidebar-content.scss?lit&inline';

/**
 * Container for the sidebar content.
 *
 * @slot - Use the unnamed slot to add any content elements.
 */
export
@customElement('sbb-sidebar-content')
class SbbSidebarContentElement extends LitElement {
  public static override styles: CSSResultGroup = style;

  protected override render(): TemplateResult {
    return html`<div class="sbb-sidebar-content"><slot></slot></div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-sidebar-content': SbbSidebarContentElement;
  }
}
