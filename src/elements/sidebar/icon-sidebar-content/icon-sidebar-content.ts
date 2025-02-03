import type { CSSResultGroup } from 'lit';
import { customElement } from 'lit/decorators.js';

import { SbbSidebarContentBaseElement } from '../common.js';

import style from './icon-sidebar-content.scss?lit&inline';

/**
 * Container for the icon-sidebar content.
 *
 * @slot - Use the unnamed slot to add any content elements.
 */
export
@customElement('sbb-icon-sidebar-content')
class SbbIconSidebarContentElement extends SbbSidebarContentBaseElement {
  public static override styles: CSSResultGroup = [SbbSidebarContentBaseElement.styles, style];
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-icon-sidebar-content': SbbIconSidebarContentElement;
  }
}
