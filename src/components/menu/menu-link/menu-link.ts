import { customElement } from 'lit/decorators.js';

import { SbbLinkBaseElement } from '../../core/common-behaviors';
import '../../icon';
import { SbbMenuActionCommonElementMixin } from '../common/menu-action-common';

/**
 * It displays a link element that can be used in the `sbb-menu` component.
 *
 * @slot - Use the unnamed slot to add content to the `sbb-menu-link`.
 * @slot icon - Use this slot to provide an icon. If `icon-name` is set, a `sbb-icon` will be used.
 */
@customElement('sbb-menu-link')
export class SbbMenuLinkElement extends SbbMenuActionCommonElementMixin(SbbLinkBaseElement) {}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-menu-link': SbbMenuLinkElement;
  }
}
