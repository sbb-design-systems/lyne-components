import { LitElement, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';

import { SbbDisabledMixin } from '../../core/common-behaviors';
import { getDocumentWritingMode } from '../../core/dom';
import { SbbButtonCommonElementMixin } from '../common/button-common';
import '../../icon';

/**
 * It displays a static button enhanced with the SBB Design.
 *
 * @slot - Use the unnamed slot to add content to the button.
 * @slot icon - Slot used to display the icon, if one is set
 */
@customElement('sbb-button-static')
export class SbbButtonStaticElement extends SbbButtonCommonElementMixin(
  SbbDisabledMixin(LitElement),
) {
  protected override render(): TemplateResult {
    this.setAttribute('dir', getDocumentWritingMode());
    // FIXME tabindex not wanted so the disabled mixin is used
    if (this.disabled) {
      this.setAttribute('aria-disabled', 'true');
    }
    return this.renderButtonCommonTemplate();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-button-static': SbbButtonStaticElement;
  }
}
