import { spread } from '@open-wc/lit-helpers';
import { nothing, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { html, unsafeStatic } from 'lit/static-html.js';

import { LanguageController } from '../../../core/common-behaviors';
import { SbbIconNameMixin, SbbLinkBaseElement } from '../../../core/common-behaviors/button-link';
import { setAttributes } from '../../../core/dom';
import { i18nTargetOpensInNewWindow } from '../../../core/i18n';
import { newResolveLinkOrStaticRenderVariables, targetsNewWindow } from '../../../core/interfaces';
import '../../../icon';
import { SbbHeaderActionCommonElementMixin } from '../header-action-common';

/**
 * It displays a link element that can be used in the `sbb-header` component.
 *
 * @slot icon - Slot used to render the link icon.
 * @slot - Use the unnamed slot to add content to the `sbb-header-link`.
 */
@customElement('sbb-header-link')
export class SbbHeaderLinkElement extends SbbHeaderActionCommonElementMixin(
  SbbIconNameMixin(SbbLinkBaseElement),
) {
  private _language = new LanguageController(this);

  protected override render(): TemplateResult {
    const {
      tagName: TAG_NAME,
      attributes,
      hostAttributes,
    } = newResolveLinkOrStaticRenderVariables(this);
    setAttributes(this, hostAttributes);

    /* eslint-disable lit/binding-positions */
    return html`
      <${unsafeStatic(TAG_NAME)} class="sbb-header-action" ${spread(attributes)}>
        <span class="sbb-header-action__wrapper">
          <span class="sbb-header-action__icon">
            <slot name="icon">
              ${this.iconName ? html`<sbb-icon name="${this.iconName}"></sbb-icon>` : nothing}
            </slot>
          </span>
          <span class="sbb-header-action__text">
            <slot></slot>
            ${
              targetsNewWindow(this)
                ? html`
                    <span class="sbb-header-action__opens-in-new-window">
                      . ${i18nTargetOpensInNewWindow[this._language.current]}
                    </span>
                  `
                : nothing
            }
          </span>
        </span>
      </${unsafeStatic(TAG_NAME)}>
    `;
    /* eslint-disable lit/binding-positions */
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-header-link': SbbHeaderLinkElement;
  }
}
