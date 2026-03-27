import type { CSSResultGroup } from 'lit';

import { SbbButtonBaseElement } from '../../core/base-elements.ts';
import { SbbDisabledTabIndexActionMixin } from '../../core/mixins.ts';
import { boxSizingStyles } from '../../core/styles.ts';
import {
  buttonCommonStyle,
  buttonTransparentStyle,
  SbbButtonCommonElementMixin,
} from '../common/button-common.ts';

/**
 * It displays a button enhanced with the SBB Design in the 'transparent' variant.
 *
 * @slot - Use the unnamed slot to add content to the transparent-button.
 * @slot icon - Slot used to display the icon, if one is set.
 * @cssprop [--sbb-button-loading-delay=300ms] - The delay before the loading animation starts, when setting the button into loading state.
 */
export class SbbTransparentButtonElement extends SbbButtonCommonElementMixin(
  SbbDisabledTabIndexActionMixin(SbbButtonBaseElement),
) {
  public static override readonly elementName: string = 'sbb-transparent-button';
  public static override styles: CSSResultGroup = [
    boxSizingStyles,
    buttonCommonStyle,
    buttonTransparentStyle,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-transparent-button': SbbTransparentButtonElement;
  }
}
