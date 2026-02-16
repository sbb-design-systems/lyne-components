import type { CSSResultGroup } from 'lit';
import { customElement } from 'lit/decorators.js';

import { SbbActionBaseElement } from '../../core/base-elements.ts';
import { SbbDisabledMixin } from '../../core/mixins.ts';
import { boxSizingStyles } from '../../core/styles.ts';
import { buttonCommonStyle, buttonAccentStyle, SbbButtonCommonElementMixin } from '../common.ts';

/**
 * It displays a static button enhanced with the SBB Design in the 'accent' variant.
 *
 * @slot - Use the unnamed slot to add content to the accent-button-static.
 * @slot icon - Slot used to display the icon, if one is set.
 * @cssprop [--sbb-button-loading-delay=300ms] - The delay before the loading animation starts, when setting the button into loading state.
 */
export
@customElement('sbb-accent-button-static')
class SbbAccentButtonStaticElement extends SbbButtonCommonElementMixin(
  SbbDisabledMixin(SbbActionBaseElement),
) {
  public static override styles: CSSResultGroup = [
    boxSizingStyles,
    buttonCommonStyle,
    buttonAccentStyle,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-accent-button-static': SbbAccentButtonStaticElement;
  }
}
