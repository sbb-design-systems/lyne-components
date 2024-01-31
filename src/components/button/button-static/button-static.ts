import { LitElement, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { html } from 'lit/static-html.js';

import { hostPropertiesStatic } from '../../core/common-behaviors';
import { setAttributes } from '../../core/dom';
import { SbbButtonCommonElementMixin } from '../common/button-common';
import '../../icon';

/**
 * It displays a static button enhanced with the SBB Design.
 *
 * @slot - Use the unnamed slot to add content to the button.
 * @slot icon - Slot used to display the icon, if one is set
 */
@customElement('sbb-button-static')
export class SbbButtonStaticElement extends SbbButtonCommonElementMixin(LitElement) {
  protected override render(): TemplateResult {
    setAttributes(this, hostPropertiesStatic(this.disabled));

    return html`
      <span class="sbb-button">
        ${this.renderIconSlot()}
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
    'sbb-button-static': SbbButtonStaticElement;
  }
}
