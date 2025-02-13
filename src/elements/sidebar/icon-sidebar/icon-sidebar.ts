import { type CSSResultGroup, html, LitElement, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';

import { SbbSidebarMixin, sidebarCommonStyle } from '../common.js';
import type { SbbIconSidebarContainerElement } from '../icon-sidebar-container.js';

import style from './icon-sidebar.scss?lit&inline';

/**
 * Icon sidebar, can be placed inside a `sbb-icon-sidebar-container` element.
 *
 * @slot - Use the unnamed slot to slot any content into the icon-sidebar.
 */
export
@customElement('sbb-icon-sidebar')
class SbbIconSidebarElement extends SbbSidebarMixin(LitElement) {
  public static override styles: CSSResultGroup = [sidebarCommonStyle, style];

  /** Returns the SbbIconSidebarContainerElement where this icon-sidebar is contained. */
  public override get container(): SbbIconSidebarContainerElement | null {
    return this.closest('sbb-icon-sidebar-container');
  }

  protected override render(): TemplateResult {
    return html`<div class="sbb-icon-sidebar">
      <slot></slot>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-icon-sidebar': SbbIconSidebarElement;
  }
}
