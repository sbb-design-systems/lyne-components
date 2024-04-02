import type { CSSResultGroup } from 'lit';
import { customElement } from 'lit/decorators.js';

import { SbbActionBaseElement } from '../../core/base-elements';
import { SbbDisabledMixin } from '../../core/mixins';
import { buttonCommonStyle, buttonPrimaryStyle, SbbButtonCommonElementMixin } from '../common';

/**
 * It displays a static button enhanced with the SBB Design in the 'primary' variant.
 *
 * @slot - Use the unnamed slot to add content to the button-static.
 * @slot icon - Slot used to display the icon, if one is set
 */
@customElement('sbb-button-static')
export class SbbButtonStaticElement extends SbbButtonCommonElementMixin(
  SbbDisabledMixin(SbbActionBaseElement),
) {
  public static override styles: CSSResultGroup = [buttonCommonStyle, buttonPrimaryStyle];
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-button-static': SbbButtonStaticElement;
  }
}
