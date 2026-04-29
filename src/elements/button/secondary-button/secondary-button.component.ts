import type { CSSResultGroup } from 'lit';

import { SbbButtonBaseElement, SbbDisabledTabIndexActionMixin } from '../../core.ts';
import { buttonSecondaryStyle, SbbButtonCommonElementMixin } from '../common/button-common.ts';

/**
 * It displays a button enhanced with the SBB Design in the 'secondary' variant.
 *
 * @slot - Use the unnamed slot to add content to the secondary-button.
 * @slot icon - Slot used to display the icon, if one is set.
 * @cssprop [--sbb-button-loading-delay=300ms] - The delay before the loading animation starts, when setting the button into loading state.
 */
export class SbbSecondaryButtonElement extends SbbButtonCommonElementMixin(
  SbbDisabledTabIndexActionMixin(SbbButtonBaseElement),
) {
  public static override readonly elementName: string = 'sbb-secondary-button';
  public static override styles: CSSResultGroup = [super.styles ?? [], buttonSecondaryStyle];
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-secondary-button': SbbSecondaryButtonElement;
  }
}
