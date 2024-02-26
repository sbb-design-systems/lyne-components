import { html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';

import {
  SbbButtonBaseElement,
  SbbDisabledTabIndexActionMixin,
  SbbIconNameMixin,
} from '../../core/common-behaviors';
import { SbbMiniButtonCommonElementMixin } from '../common/button-common';

/**
 * It displays an icon-only button enhanced with the SBB Design;
 * it's meant to be used mainly within the sbb-form-field in prefix/suffix slot.
 *
 * @slot icon - Slot used to display the icon, if one is set
 */
@customElement('sbb-mini-button')
export class SbbMiniButtonElement extends SbbMiniButtonCommonElementMixin(
  SbbIconNameMixin(SbbDisabledTabIndexActionMixin(SbbButtonBaseElement)),
) {
  protected override renderIcon(): TemplateResult {
    return html`${super.renderIconSlot()}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-mini-button': SbbMiniButtonElement;
  }
}
