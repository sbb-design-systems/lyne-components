import type { CSSResultGroup, TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

import type { SbbSidebarElement } from '../sidebar.js';

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

  private _onBackdropClicked(): void {
    Array.from(
      this.querySelectorAll<SbbSidebarElement>(':scope > sbb-sidebar[mode="over"]'),
    ).forEach((sidebar) => sidebar.close());
  }

  protected override render(): TemplateResult {
    return html`<div
        class="sbb-sidebar-container-backdrop"
        @click=${() => this._onBackdropClicked()}
      ></div>
      <slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-sidebar-container': SbbSidebarContainerElement;
  }
}
