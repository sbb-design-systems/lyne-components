import { type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';

import {
  type LinkRenderVariables,
  resolveLinkRenderVariables,
  SbbLinkBaseElement,
} from '../../core/common-behaviors';
import { setAttribute } from '../../core/dom';
import { SbbCardActionCommonElementMixin } from '../common/card-action-common';

/**
 * It turns the `sbb-card` into a link element.
 *
 * @slot - Use the unnamed slot to add a descriptive label / title of the link (important!).
 *   This is relevant for SEO and screen readers.
 */
@customElement('sbb-card-link')
export class SbbCardLinkElement extends SbbCardActionCommonElementMixin(SbbLinkBaseElement) {
  protected renderTemplate(attributes: Record<string, string>): TemplateResult {
    return this.renderCardActionCommonTemplate(attributes, this.renderTargetNewWindow());
  }

  protected override render(): TemplateResult {
    const { hostAttributes }: LinkRenderVariables = resolveLinkRenderVariables(this);
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
    'sbb-card-link': SbbCardLinkElement;
  }
}
