import { spread } from '@open-wc/lit-helpers';
import { type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { html } from 'lit/static-html.js';

import {
  type LinkRenderVariables,
  resolveLinkRenderVariables,
  SbbLinkBaseElement,
} from '../../core/common-behaviors';
import { setAttribute, setAttributes } from '../../core/dom';
import { SbbCardActionCommonElementMixin } from '../common/card-action-common';

/**
 * It turns the `sbb-card` into a link element.
 *
 * @slot - Use the unnamed slot to add a descriptive label / title of the link (important!).
 *   This is relevant for SEO and screen readers.
 */
@customElement('sbb-card-link')
export class SbbCardLinkElement extends SbbCardActionCommonElementMixin(SbbLinkBaseElement) {
  protected override render(): TemplateResult {
    const { attributes, hostAttributes }: LinkRenderVariables = resolveLinkRenderVariables(this);

    if (this.card) {
      this.card.dataset.actionRole = hostAttributes.role;
    }

    setAttribute(this, 'slot', 'action');
    setAttributes(this, hostAttributes);

    return html`
      <a ${spread(attributes)} class="sbb-card-action">
        <span class="sbb-card-action__label">
          <slot></slot>
          ${super.renderTargetNewWindow()}
        </span>
      </a>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-card-link': SbbCardLinkElement;
  }
}
