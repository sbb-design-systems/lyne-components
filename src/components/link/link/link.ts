import { customElement } from 'lit/decorators.js';

import { SbbLinkBaseElement } from '../../core/base-elements/index.js';
import { SbbDisabledTabIndexActionMixin } from '../../core/mixins/index.js';
import { SbbInlineLinkCommonElementMixin } from '../common/index.js';

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
