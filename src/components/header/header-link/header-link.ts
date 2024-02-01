import { spread } from '@open-wc/lit-helpers';
import { type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { html } from 'lit/static-html.js';

import {
  type LinkRenderVariables,
  resolveLinkRenderVariables,
  SbbLinkBaseElement,
} from '../../core/common-behaviors';
import { setAttributes } from '../../core/dom';
import '../../icon';
import { SbbHeaderActionCommonElementMixin } from '../common/header-action-common';

/**
 * It displays a link element that can be used in the `sbb-header` component.
 *
 * @slot icon - Slot used to render the link icon.
 * @slot - Use the unnamed slot to add content to the `sbb-header-link`.
 */
@customElement('sbb-header-link')
export class SbbHeaderLinkElement extends SbbHeaderActionCommonElementMixin(SbbLinkBaseElement) {
  protected override render(): TemplateResult {
    const { attributes, hostAttributes }: LinkRenderVariables = resolveLinkRenderVariables(this);
    setAttributes(this, hostAttributes);

    return html`
      <a class="sbb-header-action" ${spread(attributes)}>
        <span class="sbb-header-action__wrapper">
          ${this.renderIconSlot()}
          <span class="sbb-header-action__text">
            <slot></slot>
            ${super.renderTargetNewWindow()}
          </span>
        </span>
      </a>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-header-link': SbbHeaderLinkElement;
  }
}
