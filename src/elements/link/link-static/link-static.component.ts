import { customElement } from 'lit/decorators.js';

import { SbbActionBaseElement } from '../../core/base-elements.ts';
import { SbbDisabledMixin } from '../../core/mixins.ts';
import { SbbInlineLinkCommonElementMixin } from '../common.ts';

/**
 * It displays a static link enhanced with the SBB Design.
 *
 * @slot - Use the unnamed slot to add content to the `sbb-link-static`.
 */
export
@customElement('sbb-link-static')
class SbbLinkStaticElement extends SbbInlineLinkCommonElementMixin(
  SbbDisabledMixin(SbbActionBaseElement),
) {}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-link-static': SbbLinkStaticElement;
  }
}
