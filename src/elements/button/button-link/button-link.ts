import type { CSSResultGroup } from 'lit';
import { customElement } from 'lit/decorators.js';

import { SbbLinkBaseElement } from '../../core/base-elements.js';
import { SbbDisabledInteractiveMixin, SbbDisabledMixin } from '../../core/mixins.js';
import { buttonCommonStyle, buttonPrimaryStyle, SbbButtonCommonElementMixin } from '../common.js';

/**
 * It displays a button enhanced with the SBB Design in the 'primary' variant, which will behave as a link.
 *
 * @slot - Use the unnamed slot to add content to the button-link.
 * @slot icon - Slot used to display the icon, if one is set
 */
export
@customElement('sbb-button-link')
class SbbButtonLinkElement extends SbbButtonCommonElementMixin(
  SbbDisabledInteractiveMixin(SbbDisabledMixin(SbbLinkBaseElement)),
) {
  public static override styles: CSSResultGroup = [buttonCommonStyle, buttonPrimaryStyle];
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-button-link': SbbButtonLinkElement;
  }
}
