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
import { SbbNavigationActionCommonElementMixin } from '../common/navigation-action-common';

/**
 * It displays a link element that can be used in the `sbb-navigation` component.
 *
 * @slot - Use the unnamed slot to add content to the `sbb-navigation-link`.
 */
@customElement('sbb-navigation-link')
export class SbbNavigationLinkElement extends SbbNavigationActionCommonElementMixin(
  SbbLinkBaseElement,
) {
  protected override render(): TemplateResult {
    const { attributes, hostAttributes }: LinkRenderVariables = resolveLinkRenderVariables(this);
    setAttributes(this, hostAttributes);

    return html`
      <a class="sbb-navigation-action" ${spread(attributes)}>
        <slot></slot>
        ${super.renderTargetNewWindow()}
      </a>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-navigation-link': SbbNavigationLinkElement;
  }
}
