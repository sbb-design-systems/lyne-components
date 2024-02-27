import { customElement } from 'lit/decorators.js';

import { SbbDisabledTabIndexActionMixin, SbbLinkBaseElement } from '../../core/common-behaviors';
import { SbbInlineLinkCommonElementMixin } from '../common';

/**
 * It displays a link enhanced with the SBB Design.
 *
 * @slot - Use the unnamed slot to add content to the `sbb-link`.
 */
@customElement('sbb-link')
export class SbbLinkElement extends SbbInlineLinkCommonElementMixin(
  SbbDisabledTabIndexActionMixin(SbbLinkBaseElement),
) {}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-link': SbbLinkElement;
  }
}
