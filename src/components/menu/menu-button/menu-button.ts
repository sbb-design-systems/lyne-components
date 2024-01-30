import { nothing, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { html } from 'lit/static-html.js';

import { resolveButtonRenderVariables, SbbButtonBaseElement } from '../../core/common-behaviors';
import { setAttributes } from '../../core/dom';
import '../../icon';
import { SbbMenuActionCommonElementMixin } from '../common/menu-action-common';

/**
 * It displays a button element that can be used in the `sbb-menu` component.
 *
 * @slot - Use the unnamed slot to add content to the `sbb-menu-button`.
 * @slot icon - Use this slot to provide an icon. If `icon-name` is set, a `sbb-icon` will be used.
 */
@customElement('sbb-menu-button')
export class SbbMenuButtonElement extends SbbMenuActionCommonElementMixin(SbbButtonBaseElement) {
  protected override render(): TemplateResult {
    setAttributes(this, resolveButtonRenderVariables(this.disabled));

    return html`
      <span class="sbb-menu-action">
        <span class="sbb-menu-action__content">
          ${this.renderIconSlot()}
          <span class="sbb-menu-action__label">
            <slot></slot>
          </span>
          ${this.amount && !this.disabled
            ? html`<span class="sbb-menu-action__amount">${this.amount}</span>`
            : nothing}
        </span>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-menu-button': SbbMenuButtonElement;
  }
}
