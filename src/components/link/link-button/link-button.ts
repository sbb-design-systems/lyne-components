import { nothing, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { html } from 'lit/static-html.js';

import {
  SbbButtonBaseElement,
  SbbIconNameMixin,
  SbbNegativeMixin,
} from '../../core/common-behaviors/button-link';
import { setAttributes } from '../../core/dom';
import { newResolveButtonOrStaticRenderVariables } from '../../core/interfaces';
import '../../icon';
import { SbbLinkCommonElementMixin } from '../link-common';

/**
 * TODO: Document me
 */
@customElement('sbb-link-button')
export class SbbLinkButtonElement extends SbbLinkCommonElementMixin(
  SbbNegativeMixin(SbbIconNameMixin(SbbButtonBaseElement)),
) {
  protected override render(): TemplateResult {
    // ## Migr: Host attributes ##
    setAttributes(this, newResolveButtonOrStaticRenderVariables(this.isStatic, this.disabled));
    // ####

    /* eslint-disable lit/binding-positions */
    return html`
      <span class="sbb-link">
        ${this.variant !== 'inline'
          ? html`<span class="sbb-link__icon">
              <slot name="icon">
                ${this.iconName ? html` <sbb-icon name="${this.iconName}"></sbb-icon>` : nothing}
              </slot>
            </span>`
          : nothing}
        <slot></slot>
      </span>
    `;
    /* eslint-disable lit/binding-positions */
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-link-button': SbbLinkButtonElement;
  }
}
