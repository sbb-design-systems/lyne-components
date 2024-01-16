import { spread } from '@open-wc/lit-helpers';
import { nothing, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { html, unsafeStatic } from 'lit/static-html.js';

import {
  SbbIconNameMixin,
  SbbLinkBaseElement,
  SbbNegativeMixin,
} from '../../core/common-behaviors/button-link';
import { setAttributes } from '../../core/dom';
import { i18nTargetOpensInNewWindow } from '../../core/i18n';
import {
  LinkButtonRenderVariables,
  targetsNewWindow,
  newResolveLinkOrStaticRenderVariables,
} from '../../core/interfaces';
import '../../icon';
import { SbbLinkCommonElementMixin } from '../link-common';

/**
 * TODO: Document me
 */
@customElement('sbb-link')
export class SbbLinkElement extends SbbLinkCommonElementMixin(
  SbbNegativeMixin(SbbIconNameMixin(SbbLinkBaseElement)),
) {
  protected override render(): TemplateResult {
    const {
      tagName: TAG_NAME,
      attributes,
      hostAttributes,
    }: LinkButtonRenderVariables = newResolveLinkOrStaticRenderVariables(this);

    // ## Migr: Host attributes ##
    setAttributes(this, hostAttributes);
    // ####

    /* eslint-disable lit/binding-positions */
    return html`
      <${unsafeStatic(TAG_NAME)} class='sbb-link' ${spread(attributes)}>
        ${
          this.variant !== 'inline'
            ? html`<span class="sbb-link__icon">
                <slot name="icon">
                  ${this.iconName ? html` <sbb-icon name="${this.iconName}"></sbb-icon>` : nothing}
                </slot>
              </span>`
            : nothing
        }
        <slot></slot>
        ${
          targetsNewWindow(this)
            ? html`<span class="sbb-link__opens-in-new-window">
                . ${i18nTargetOpensInNewWindow[this.language.current]}
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
    'sbb-link': SbbLinkElement;
  }
}
