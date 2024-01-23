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
} from '../../../core/common-behaviors';
import { setAttributes } from '../../../core/dom';
import { i18nTargetOpensInNewWindow } from '../../../core/i18n';
import { SbbNavigationActionCommonElementMixin } from '../navigation-action-common';

/**
 * It displays a link element that can be used in the `sbb-navigation` component.
 *
 * @slot - Use the unnamed slot to add content to the `sbb-navigation-link`.
 */
@customElement('sbb-navigation-link')
export class SbbNavigationLinkElement extends SbbNavigationActionCommonElementMixin(
  SbbLinkBaseElement,
) {
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
      <${unsafeStatic(TAG_NAME)} class="sbb-navigation-action" ${spread(attributes)}>
        <slot></slot>
        ${
          targetsNewWindow(this)
            ? html`<span class="sbb-navigation-action__opens-in-new-window">
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
    'sbb-navigation-link': SbbNavigationLinkElement;
  }
}
