import { customElement } from 'lit/decorators.js';

import { SbbActionBaseElement } from '../../core/base-elements.ts';
import { SbbDisabledMixin } from '../../core/mixins.ts';
import { SbbBlockLinkCommonElementMixin } from '../common.ts';

/**
 * It displays a static link enhanced with the SBB Design.
 *
 * @slot - Use the unnamed slot to add content to the `sbb-block-link-static`.
 * @slot icon - Slot used to display the icon, if one is set.
 */
export
@customElement('sbb-block-link-static')
class SbbBlockLinkStaticElement extends SbbBlockLinkCommonElementMixin(
  SbbDisabledMixin(SbbActionBaseElement),
) {}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-block-link-static': SbbBlockLinkStaticElement;
  }
}
