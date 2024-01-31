import { spread } from '@open-wc/lit-helpers';
import { nothing, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { html } from 'lit/static-html.js';

import { LanguageController, type LinkRenderVariables } from '../../core/common-behaviors';
import {
  resolveLinkRenderVariables,
  SbbLinkBaseElement,
  targetsNewWindow,
} from '../../core/common-behaviors';
import { setAttributes } from '../../core/dom';
import { i18nTargetOpensInNewWindow } from '../../core/i18n';
import '../../icon';
import { SbbLinkCommonElementMixin } from '../common/link-common';

/**
 * It displays a link enhanced with the SBB Design.
 *
 * @slot - Use the unnamed slot to add content to the `sbb-link`.
 * @slot icon - Slot used to display the icon, if one is set.
 */
@customElement('sbb-link')
export class SbbLinkElement extends SbbLinkCommonElementMixin(SbbLinkBaseElement) {
  protected language = new LanguageController(this);

  protected override render(): TemplateResult {
    const { attributes, hostAttributes }: LinkRenderVariables = resolveLinkRenderVariables(this);

    setAttributes(this, hostAttributes);

    return html`
      <a class="sbb-link" ${spread(attributes)}>
        ${this.variant !== 'inline' ? this.renderIconSlot() : nothing}
        <slot></slot>
        ${targetsNewWindow(this)
          ? html`<span class="sbb-link__opens-in-new-window">
              . ${i18nTargetOpensInNewWindow[this.language.current]}
            </span>`
          : nothing}
      </a>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-link': SbbLinkElement;
  }
}
