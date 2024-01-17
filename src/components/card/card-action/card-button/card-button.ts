import { TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { html } from 'lit/static-html.js';

import { SbbButtonBaseElement } from '../../../core/common-behaviors/button-link';
import { setAttribute, setAttributes } from '../../../core/dom';
import { newResolveButtonOrStaticRenderVariables } from '../../../core/interfaces';
import { SbbCardActionCommonElementMixin } from '../card-action-common';

/**
 * It turns the `sbb-card` into a button element.
 *
 * @slot - Use the unnamed slot to add a descriptive label / title of the button (important!).
 *   This is relevant for SEO and screen readers.
 */
@customElement('sbb-card-button')
export class SbbCardButtonElement extends SbbCardActionCommonElementMixin(SbbButtonBaseElement) {
  protected override render(): TemplateResult {
    const hostAttributes = newResolveButtonOrStaticRenderVariables(false, false); // fixme

    if (this.card) {
      this.card.dataset.actionRole = hostAttributes.role;
    }

    setAttribute(this, 'slot', 'action');
    // ## Migr: Host attributes ##
    setAttributes(this, hostAttributes);
    // ####

    return html`
      <span class="sbb-card-action">
        <span class="sbb-card-action__label">
          <slot></slot>
        </span>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-card-button': SbbCardButtonElement;
  }
}
