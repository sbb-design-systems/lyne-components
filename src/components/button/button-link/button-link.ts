import { spread } from '@open-wc/lit-helpers';
import { nothing, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { html, unsafeStatic } from 'lit/static-html.js';

import {
  SbbLinkBaseElement,
  SbbNegativeMixin,
  SbbIconNameMixin,
} from '../../core/common-behaviors/button-link';
import { setAttributes } from '../../core/dom';
import { i18nTargetOpensInNewWindow } from '../../core/i18n';
import { newResolveLinkOrStaticRenderVariables, targetsNewWindow } from '../../core/interfaces';
import { SbbButtonCommonElementMixin } from '../button-common';

/**
 * TODO: Document me
 */
@customElement('sbb-button-link')
export class SbbButtonLinkElement extends SbbButtonCommonElementMixin(
  SbbNegativeMixin(SbbIconNameMixin(SbbLinkBaseElement)),
) {
  protected override render(): TemplateResult {
    const {
      tagName: TAG_NAME,
      attributes,
      hostAttributes,
    } = newResolveLinkOrStaticRenderVariables(this);

    // ## Migr: Host attributes ##
    setAttributes(this, hostAttributes);
    // ####

    /* eslint-disable lit/binding-positions */
    return html`
      <${unsafeStatic(TAG_NAME)} class="sbb-button" ${spread(attributes)}>
        <span class="sbb-button__icon">
          <slot name="icon">
            ${this.iconName ? html`<sbb-icon name="${this.iconName}"></sbb-icon>` : nothing}
          </slot>
        </span>
        <span class="sbb-button__label">
          <slot></slot>
          ${
            targetsNewWindow(this)
              ? html` <span class="sbb-button__opens-in-new-window">
                  . ${i18nTargetOpensInNewWindow[this.language.current]}
                </span>`
              : nothing
          }
        </span>
      </${unsafeStatic(TAG_NAME)}>
    `;
    /* eslint-disable lit/binding-positions */
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-button-link': SbbButtonLinkElement;
  }
}
