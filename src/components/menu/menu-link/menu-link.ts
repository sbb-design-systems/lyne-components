import { spread } from '@open-wc/lit-helpers';
import { nothing, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { html, unsafeStatic } from 'lit/static-html.js';

import {
  LanguageController,
  type LinkRenderVariables,
  resolveLinkOrStaticRenderVariables,
  SbbLinkBaseElement,
  targetsNewWindow,
} from '../../core/common-behaviors';
import { setAttributes } from '../../core/dom';
import { i18nTargetOpensInNewWindow } from '../../core/i18n';
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
  private _language = new LanguageController(this);

  protected override render(): TemplateResult {
    const {
      tagName: TAG_NAME,
      attributes,
      hostAttributes,
    }: LinkRenderVariables = resolveLinkOrStaticRenderVariables(this);
    setAttributes(this, hostAttributes);

    /* eslint-disable lit/binding-positions */
    return html`
      <${unsafeStatic(TAG_NAME)} class="sbb-menu-action" ${spread(attributes)}>
        <span class="sbb-menu-action__content">
          <span class="sbb-menu-action__icon">
            <slot name="icon"
              >${this.iconName ? html`<sbb-icon name=${this.iconName}></sbb-icon>` : nothing}</slot
            >
          </span>
          <span class="sbb-menu-action__label">
            <slot></slot>
          </span>
          ${
            this.amount && !this.disabled
              ? html`<span class="sbb-menu-action__amount">${this.amount}</span>`
              : nothing
          }
        </span>
        ${
          targetsNewWindow(this)
            ? html`<span class="sbb-menu-action__opens-in-new-window">
                . ${i18nTargetOpensInNewWindow[this._language.current]}
              </span>`
            : nothing
        }
      </${unsafeStatic(TAG_NAME)}>
    `;
    /* eslint-disable lit/binding-positions */
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-menu-link': SbbMenuLinkElement;
  }
}
