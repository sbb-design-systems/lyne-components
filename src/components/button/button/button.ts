import { nothing, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { html } from 'lit/static-html.js';

import { SbbButtonBaseElement } from '../../core/common-behaviors/button-base-element';
import { setAttributes } from '../../core/dom';
import { newResolveButtonOrStaticRenderVariables } from '../../core/interfaces';
import { SbbButtonCommonElementMixin } from '../button-common';

/**
 * TODO: Document me
 */
@customElement('sbb-button')
export class SbbButtonElement extends SbbButtonCommonElementMixin(SbbButtonBaseElement) {
  protected override render(): TemplateResult {
    setAttributes(this, newResolveButtonOrStaticRenderVariables(this.isStatic, this.disabled));

    return html`
      <span class="sbb-button">
        <span class="sbb-button__icon">
          <slot name="icon">
            ${this.iconName ? html`<sbb-icon name="${this.iconName}"></sbb-icon>` : nothing}
          </slot>
        </span>

        <span class="sbb-button__label">
          <slot></slot>
        </span>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-button': SbbButtonElement;
  }
}
