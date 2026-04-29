import type { CSSResultGroup } from 'lit';

import { SbbDisabledInteractiveMixin, SbbDisabledMixin, SbbLinkBaseElement } from '../../core.ts';
import { buttonAccentStyle, SbbButtonCommonElementMixin } from '../common/button-common.ts';

/**
 * It displays a button enhanced with the SBB Design in the 'accent' variant, which will behave as a link.
 *
 * @slot - Use the unnamed slot to add content to the accent-button-link.
 * @slot icon - Slot used to display the icon, if one is set.
 * @cssprop [--sbb-button-loading-delay=300ms] - The delay before the loading animation starts, when setting the button into loading state.
 */
export class SbbAccentButtonLinkElement extends SbbButtonCommonElementMixin(
  SbbDisabledInteractiveMixin(SbbDisabledMixin(SbbLinkBaseElement)),
) {
  public static override readonly elementName: string = 'sbb-accent-button-link';
  public static override styles: CSSResultGroup = [super.styles ?? [], buttonAccentStyle];
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-accent-button-link': SbbAccentButtonLinkElement;
  }
}
