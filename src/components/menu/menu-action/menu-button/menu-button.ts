import { nothing, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { html } from 'lit/static-html.js';

import {
  SbbDisabledMixin,
  SbbIconNameMixin,
  resolveButtonRenderVariables,
  SbbButtonBaseElement,
} from '../../../core/common-behaviors';
import { setAttributes } from '../../../core/dom';
import '../../../icon';
import { SbbMenuActionCommonElementMixin } from '../menu-action-common';

/**
 * It displays a button element that can be used in the `sbb-menu` component.
 *
 * @slot - Use the unnamed slot to add content to the `sbb-menu-button`.
 * @slot icon - Use this slot to provide an icon. If `icon-name` is set, a `sbb-icon` will be used.
 */
@customElement('sbb-menu-button')
export class SbbMenuButtonElement extends SbbMenuActionCommonElementMixin(
  SbbIconNameMixin(SbbDisabledMixin(SbbButtonBaseElement)),
) {
  protected override render(): TemplateResult {
    setAttributes(this, resolveButtonRenderVariables(this.disabled));

    return html`
      <span class="sbb-menu-action">
        <span class="sbb-menu-action__content">
          <span class="sbb-menu-action__icon">
            <slot name="icon"
              >${this.iconName ? html`<sbb-icon name=${this.iconName}></sbb-icon>` : nothing}</slot
            >
          </span>
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
