import { TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { html } from 'lit/static-html.js';

import { SbbButtonBaseElement } from '../../../core/common-behaviors/button-link';
import { setAttributes } from '../../../core/dom';
import { newResolveButtonOrStaticRenderVariables } from '../../../core/interfaces';
import { SbbNavigationActionCommonElementMixin } from '../navigation-action-common';

/**
 * It displays a button element that can be used in the `sbb-navigation` component.
 *
 * @slot - Use the unnamed slot to add content to the `sbb-navigation-button`.
 */
@customElement('sbb-navigation-button')
export class SbbNavigationButtonElement extends SbbNavigationActionCommonElementMixin(
  SbbButtonBaseElement,
) {
  protected override render(): TemplateResult {
    setAttributes(this, newResolveButtonOrStaticRenderVariables(false, false)); // fixme no static no disabled

    return html`
      <span class="sbb-navigation-action">
        <slot></slot>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-navigation-button': SbbNavigationButtonElement;
  }
}
