import type { TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';

import { SbbButtonBaseElement } from '../../core/common-behaviors';
import { SbbNavigationActionCommonElementMixin } from '../common/navigation-action-common';

/**
 * It displays a button element that can be used in the `sbb-navigation` component.
 *
 * @slot - Use the unnamed slot to add content to the `sbb-navigation-button`.
 */
@customElement('sbb-navigation-button')
export class SbbNavigationButtonElement extends SbbNavigationActionCommonElementMixin(
  SbbButtonBaseElement,
) {
  protected renderTemplate(): TemplateResult {
    return this.renderNavigationActionCommonTemplate();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-navigation-button': SbbNavigationButtonElement;
  }
}
