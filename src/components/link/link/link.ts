import { spread } from '@open-wc/lit-helpers';
import { nothing, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { html } from 'lit/static-html.js';

import { type LinkRenderVariables } from '../../core/common-behaviors';
import { resolveLinkRenderVariables, SbbLinkBaseElement } from '../../core/common-behaviors';
import { setAttributes } from '../../core/dom';
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
  protected override render(): TemplateResult {
    const { attributes, hostAttributes }: LinkRenderVariables = resolveLinkRenderVariables(this);
    setAttributes(this, hostAttributes);

    return html`
      <a class="sbb-link" ${spread(attributes)}>
        ${this.variant !== 'inline' ? this.renderIconSlot() : nothing}
        <slot></slot>
        ${super.renderTargetNewWindow()}
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
