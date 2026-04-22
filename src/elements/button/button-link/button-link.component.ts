import type { CSSResultGroup } from 'lit';

import {
  boxSizingStyles,
  SbbDisabledInteractiveMixin,
  SbbDisabledMixin,
  SbbLinkBaseElement,
} from '../../core.ts';
import {
  buttonCommonStyle,
  buttonPrimaryStyle,
  SbbButtonCommonElementMixin,
} from '../common/button-common.ts';

/**
 * It displays a button enhanced with the SBB Design in the 'primary' variant, which will behave as a link.
 *
 * @slot - Use the unnamed slot to add content to the button-link.
 * @slot icon - Slot used to display the icon, if one is set.
 * @cssprop [--sbb-button-loading-delay=300ms] - The delay before the loading animation starts, when setting the button into loading state.
 */
export class SbbButtonLinkElement extends SbbButtonCommonElementMixin(
  SbbDisabledInteractiveMixin(SbbDisabledMixin(SbbLinkBaseElement)),
) {
  public static override readonly elementName: string = 'sbb-button-link';
  public static override styles: CSSResultGroup = [
    boxSizingStyles,
    buttonCommonStyle,
    buttonPrimaryStyle,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-button-link': SbbButtonLinkElement;
  }
}
