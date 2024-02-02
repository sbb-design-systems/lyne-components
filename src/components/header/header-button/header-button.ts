import type { TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';

import { SbbButtonBaseElement } from '../../core/common-behaviors';
import '../../icon';
import { SbbHeaderActionCommonElementMixin } from '../common/header-action-common';

/**
 * It displays a button element that can be used in the `sbb-header` component.
 *
 * @slot icon - Slot used to render the button icon.
 * @slot - Use the unnamed slot to add content to the `sbb-header-button`.
 */
@customElement('sbb-header-button')
export class SbbHeaderButtonElement extends SbbHeaderActionCommonElementMixin(
  SbbButtonBaseElement,
) {
  protected renderTemplate(): TemplateResult {
    return this.renderHeaderActionCommonTemplate();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-header-button': SbbHeaderButtonElement;
  }
}
