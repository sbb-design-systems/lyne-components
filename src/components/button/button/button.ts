import type { TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';

import { SbbButtonBaseElement, SbbDisabledTabIndexActionMixin } from '../../core/common-behaviors';
import { SbbButtonCommonElementMixin } from '../common/button-common';

/**
 * It displays a button enhanced with the SBB Design.
 *
 * @slot - Use the unnamed slot to add content to the button.
 * @slot icon - Slot used to display the icon, if one is set
 */
@customElement('sbb-button')
export class SbbButtonElement extends SbbButtonCommonElementMixin(
  SbbDisabledTabIndexActionMixin(SbbButtonBaseElement),
) {
  protected renderTemplate(): TemplateResult {
    return this.renderButtonCommonTemplate();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-button': SbbButtonElement;
  }
}
