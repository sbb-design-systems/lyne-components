import { nothing, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { html } from 'lit/static-html.js';

import {
  resolveButtonOrStaticRenderVariables,
  SbbButtonBaseElement,
} from '../../core/common-behaviors';
import { setAttributes } from '../../core/dom';
import '../../icon';
import { SbbLinkCommonElementMixin } from '../common/link-common';

/**
 * It displays a link enhanced with the SBB Design, which will behave as a button.
 *
 * @slot - Use the unnamed slot to add content to the `sbb-link-button`.
 * @slot icon - Slot used to display the icon, if one is set.
 */
@customElement('sbb-link-button')
export class SbbLinkButtonElement extends SbbLinkCommonElementMixin(SbbButtonBaseElement) {
  protected override render(): TemplateResult {
    // ## Migr: Host attributes ##
    setAttributes(this, resolveButtonOrStaticRenderVariables(this.isStatic, this.disabled));
    // ####

    /* eslint-disable lit/binding-positions */
    return html`
      <span class="sbb-link">
        ${this.variant !== 'inline' ? this.renderIconSlot() : nothing}
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
