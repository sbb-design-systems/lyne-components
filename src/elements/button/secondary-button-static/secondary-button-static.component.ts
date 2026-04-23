import type { CSSResultGroup } from 'lit';

import { boxSizingStyles, SbbActionBaseElement, SbbDisabledMixin } from '../../core.ts';
import {
  buttonCommonStyle,
  buttonSecondaryStyle,
  SbbButtonCommonElementMixin,
} from '../common/button-common.ts';

/**
 * It displays a static button enhanced with the SBB Design in the 'secondary' variant.
 *
 * @slot - Use the unnamed slot to add content to the secondary-button-static.
 * @slot icon - Slot used to display the icon, if one is set.
 * @cssprop [--sbb-button-loading-delay=300ms] - The delay before the loading animation starts, when setting the button into loading state.
 */
export class SbbSecondaryButtonStaticElement extends SbbButtonCommonElementMixin(
  SbbDisabledMixin(SbbActionBaseElement),
) {
  public static override readonly elementName: string = 'sbb-secondary-button-static';
  public static override styles: CSSResultGroup = [
    boxSizingStyles,
    buttonCommonStyle,
    buttonSecondaryStyle,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-secondary-button-static': SbbSecondaryButtonStaticElement;
  }
}
