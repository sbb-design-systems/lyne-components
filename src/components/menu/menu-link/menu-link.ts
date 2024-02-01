import { spread } from '@open-wc/lit-helpers';
import { nothing, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { html } from 'lit/static-html.js';

import {
  type LinkRenderVariables,
  resolveLinkRenderVariables,
  SbbLinkBaseElement,
} from '../../core/common-behaviors';
import { setAttributes } from '../../core/dom';
import '../../icon';
import { SbbMenuActionCommonElementMixin } from '../common/menu-action-common';

/**
 * It displays a link element that can be used in the `sbb-menu` component.
 *
 * @slot - Use the unnamed slot to add content to the `sbb-menu-link`.
 * @slot icon - Use this slot to provide an icon. If `icon-name` is set, a `sbb-icon` will be used.
 */
@customElement('sbb-menu-link')
export class SbbMenuLinkElement extends SbbMenuActionCommonElementMixin(SbbLinkBaseElement) {
  protected override render(): TemplateResult {
    const { attributes, hostAttributes }: LinkRenderVariables = resolveLinkRenderVariables(this);
    setAttributes(this, hostAttributes);

    return html`
      <a class="sbb-menu-action" ${spread(attributes)}>
        <span class="sbb-menu-action__content">
          ${this.renderIconSlot()}
          <span class="sbb-menu-action__label">
            <slot></slot>
          </span>
          ${this.amount && !this.disabled
            ? html`<span class="sbb-menu-action__amount">${this.amount}</span>`
            : nothing}
        </span>
        ${super.renderTargetNewWindow()}
      </a>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-menu-link': SbbMenuLinkElement;
  }
}
