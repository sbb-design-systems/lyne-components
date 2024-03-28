import { customElement } from 'lit/decorators.js';

import { SbbLinkBaseElement } from '../../core/base-classes';
import { SbbHeaderActionCommonElementMixin } from '../common';

/**
 * It displays a link element that can be used in the `sbb-header` component.
 *
 * @slot icon - Slot used to render the link icon.
 * @slot - Use the unnamed slot to add content to the `sbb-header-link`.
 */
@customElement('sbb-header-link')
export class SbbHeaderLinkElement extends SbbHeaderActionCommonElementMixin(SbbLinkBaseElement) {}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-header-link': SbbHeaderLinkElement;
  }
}
