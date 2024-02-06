import { customElement } from 'lit/decorators.js';

import { SbbLinkBaseElement } from '../../core/common-behaviors';
import { SbbCardActionCommonElementMixin } from '../common/card-action-common';

/**
 * It turns the `sbb-card` into a link element.
 *
 * @slot - Use the unnamed slot to add a descriptive label / title of the link (important!).
 *   This is relevant for SEO and screen readers.
 */
@customElement('sbb-card-link')
export class SbbCardLinkElement extends SbbCardActionCommonElementMixin(SbbLinkBaseElement) {}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-card-link': SbbCardLinkElement;
  }
}
