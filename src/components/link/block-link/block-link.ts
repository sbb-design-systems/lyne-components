import { customElement } from 'lit/decorators.js';

import { SbbLinkBaseElement } from '../../core/base-elements/index.js';
import { SbbDisabledMixin } from '../../core/mixins/index.js';
import { SbbBlockLinkCommonElementMixin } from '../common/index.js';

/**
 * It displays a link enhanced with the SBB Design.
 *
 * @slot - Use the unnamed slot to add content to the `sbb-block-link`.
 * @slot icon - Slot used to display the icon, if one is set.
 */
@customElement('sbb-block-link')
export class SbbBlockLinkElement extends SbbBlockLinkCommonElementMixin(
  SbbDisabledMixin(SbbLinkBaseElement),
) {}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-block-link': SbbBlockLinkElement;
  }
}
