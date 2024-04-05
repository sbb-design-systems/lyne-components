import { customElement } from 'lit/decorators.js';

import { SbbButtonBaseElement } from '../../core/base-elements/index.js';
import { SbbDisabledTabIndexActionMixin } from '../../core/mixins/index.js';
import { SbbInlineLinkCommonElementMixin } from '../common/index.js';

/**
 * It displays a link enhanced with the SBB Design, which will behave as a button.
 *
 * @slot - Use the unnamed slot to add content to the `sbb-link-button`.
 */
@customElement('sbb-link-button')
export class SbbLinkButtonElement extends SbbInlineLinkCommonElementMixin(
  SbbDisabledTabIndexActionMixin(SbbButtonBaseElement),
) {}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-link-button': SbbLinkButtonElement;
  }
}
