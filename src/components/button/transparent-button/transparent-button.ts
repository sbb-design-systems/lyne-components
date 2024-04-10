import type { CSSResultGroup } from 'lit';
import { customElement } from 'lit/decorators.js';

import { SbbButtonBaseElement } from '../../core/base-elements/index.js';
import { SbbDisabledTabIndexActionMixin } from '../../core/mixins/index.js';
import {
  buttonCommonStyle,
  buttonTransparentStyle,
  SbbButtonCommonElementMixin,
} from '../common/index.js';

/**
 * It displays a button enhanced with the SBB Design in the 'transparent' variant.
 *
 * @slot - Use the unnamed slot to add content to the transparent-button.
 * @slot icon - Slot used to display the icon, if one is set
 */
@customElement('sbb-transparent-button')
export class SbbTransparentButtonElement extends SbbButtonCommonElementMixin(
  SbbDisabledTabIndexActionMixin(SbbButtonBaseElement),
) {
  public static override styles: CSSResultGroup = [buttonCommonStyle, buttonTransparentStyle];
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-transparent-button': SbbTransparentButtonElement;
  }
}
