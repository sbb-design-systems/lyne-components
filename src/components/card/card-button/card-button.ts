import type { TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';

import { resolveButtonRenderVariables, SbbButtonBaseElement } from '../../core/common-behaviors';
import { setAttribute } from '../../core/dom';
import { SbbCardActionCommonElementMixin } from '../common/card-action-common';

/**
 * It turns the `sbb-card` into a button element.
 *
 * @slot - Use the unnamed slot to add a descriptive label / title of the button (important!).
 *   This is relevant for SEO and screen readers.
 */
@customElement('sbb-card-button')
export class SbbCardButtonElement extends SbbCardActionCommonElementMixin(SbbButtonBaseElement) {
  protected renderTemplate(): TemplateResult {
    return this.renderCardActionCommonTemplate();
  }

  protected override render(): TemplateResult {
    const hostAttributes = resolveButtonRenderVariables();
    if (this.card) {
      this.card.dataset.actionRole = hostAttributes.role;
    }
    setAttribute(this, 'slot', 'action');
    return super.render();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-card-button': SbbCardButtonElement;
  }
}
