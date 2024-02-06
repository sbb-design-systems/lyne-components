import { customElement } from 'lit/decorators.js';

import { SbbDisabledTabIndexActionMixin, SbbLinkBaseElement } from '../../core/common-behaviors';
import '../../icon';
import { SbbLinkCommonElementMixin } from '../common/link-common';

/**
 * It displays a link enhanced with the SBB Design.
 *
 * @slot - Use the unnamed slot to add content to the `sbb-link`.
 * @slot icon - Slot used to display the icon, if one is set.
 */
@customElement('sbb-link')
export class SbbLinkElement extends SbbLinkCommonElementMixin(
  SbbDisabledTabIndexActionMixin(SbbLinkBaseElement),
) {}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-link': SbbLinkElement;
  }
}
