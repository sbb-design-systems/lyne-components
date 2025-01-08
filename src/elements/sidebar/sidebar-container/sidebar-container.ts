import type { CSSResultGroup, TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

import style from './sidebar-container.scss?lit&inline';

/**
 * This is the parent component to one or two `<sbb-sidebar>`s that validates the state internally
 * and coordinates the backdrop and content styling.
 *
 * @slot - Use the unnamed slot to add `sbb-sidebar` and `sbb-sidebar-content` elements.
 */
export
@customElement('sbb-sidebar-container')
class SbbSidebarContainerElement extends LitElement {
  public static override styles: CSSResultGroup = style;

  protected override render(): TemplateResult {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-sidebar-container': SbbSidebarContainerElement;
  }
}
