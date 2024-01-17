import { nothing, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { html } from 'lit/static-html.js';

import { SbbButtonBaseElement, SbbIconNameMixin } from '../../../core/common-behaviors/button-link';
import { setAttributes } from '../../../core/dom';
import { newResolveButtonOrStaticRenderVariables } from '../../../core/interfaces';
import '../../../icon';
import { SbbHeaderActionCommonElementMixin } from '../header-action-common';

/**
 * It displays a button element that can be used in the `sbb-header` component.
 *
 * @slot icon - Slot used to render the button icon.
 * @slot - Use the unnamed slot to add content to the `sbb-header-button`.
 */
@customElement('sbb-header-button')
export class SbbHeaderButtonElement extends SbbHeaderActionCommonElementMixin(
  SbbIconNameMixin(SbbButtonBaseElement),
) {
  protected override render(): TemplateResult {
    setAttributes(this, newResolveButtonOrStaticRenderVariables(false, false));

    return html`
      <span class="sbb-header-action">
        <span class="sbb-header-action__wrapper">
          <span class="sbb-header-action__icon">
            <slot name="icon">
              ${this.iconName ? html`<sbb-icon name="${this.iconName}"></sbb-icon>` : nothing}
            </slot>
          </span>
          <span class="sbb-header-action__text">
            <slot></slot>
          </span>
        </span>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-header-button': SbbHeaderButtonElement;
  }
}
