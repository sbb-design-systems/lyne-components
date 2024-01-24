import { nothing, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { html } from 'lit/static-html.js';

import {
  SbbIconNameMixin,
  resolveButtonRenderVariables,
  SbbButtonBaseElement,
} from '../../core/common-behaviors';
import { setAttributes } from '../../core/dom';
import '../../icon';
import { SbbHeaderActionCommonElementMixin } from '../common/header-action-common';

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
    setAttributes(this, resolveButtonRenderVariables());

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
