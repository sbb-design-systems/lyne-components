import { LitElement, nothing, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { html } from 'lit/static-html.js';

import { hostPropertiesStatic } from '../../core/common-behaviors';
import { setAttributes } from '../../core/dom';
import '../../icon';
import { SbbLinkCommonElementMixin } from '../common/link-common';

/**
 * It displays a static link enhanced with the SBB Design.
 *
 * @slot - Use the unnamed slot to add content to the `sbb-link-static`.
 * @slot icon - Slot used to display the icon, if one is set.
 */
@customElement('sbb-link-static')
export class SbbLinkStaticElement extends SbbLinkCommonElementMixin(LitElement) {
  protected override render(): TemplateResult {
    setAttributes(this, hostPropertiesStatic(this.disabled));

    return html`
      <span class="sbb-link">
        ${this.variant !== 'inline' ? this.renderIconSlot() : nothing}
        <slot></slot>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-link-static': SbbLinkStaticElement;
  }
}
