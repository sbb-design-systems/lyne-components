import { spread } from '@open-wc/lit-helpers';
import { type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { html } from 'lit/static-html.js';

import { type LinkRenderVariables, resolveLinkRenderVariables } from '../../core/common-behaviors';
import { SbbLinkBaseElement } from '../../core/common-behaviors';
import { setAttributes } from '../../core/dom';
import { SbbButtonCommonElementMixin } from '../common/button-common';

/**
 * It displays a button enhanced with the SBB Design, which will behave as a link.
 *
 * @slot - Use the unnamed slot to add content to the button-link.
 * @slot icon - Slot used to display the icon, if one is set
 */
@customElement('sbb-button-link')
export class SbbButtonLinkElement extends SbbButtonCommonElementMixin(SbbLinkBaseElement) {
  protected override render(): TemplateResult {
    const { attributes, hostAttributes }: LinkRenderVariables = resolveLinkRenderVariables(this);
    setAttributes(this, hostAttributes);

    return html`
      <a class="sbb-button" ${spread(attributes)}>
        ${this.renderIconSlot()}
        <span class="sbb-button__label">
          <slot></slot>
          ${super.renderTargetNewWindow()}
        </span>
      </a>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-button-link': SbbButtonLinkElement;
  }
}
