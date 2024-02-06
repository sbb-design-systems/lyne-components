import { customElement } from 'lit/decorators.js';

import { SbbDisabledMixin } from '../../core/common-behaviors';
import { SbbActionBaseElement } from '../../core/common-behaviors/action-base-element';
import { SbbButtonCommonElementMixin } from '../common/button-common';
import '../../icon';

/**
 * It displays a static button enhanced with the SBB Design.
 *
 * @slot - Use the unnamed slot to add content to the button.
 * @slot icon - Slot used to display the icon, if one is set
 */
@customElement('sbb-button-static')
export class SbbButtonStaticElement extends SbbButtonCommonElementMixin(
  SbbDisabledMixin(SbbActionBaseElement),
) {}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-button-static': SbbButtonStaticElement;
  }
}
