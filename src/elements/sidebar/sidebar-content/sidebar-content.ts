import type { CSSResultGroup } from 'lit';
import { customElement } from 'lit/decorators.js';

import { SbbSidebarContentBaseElement } from '../common.js';

import style from './sidebar-content.scss?lit&inline';

/**
 * Container for the sidebar content.
 *
 * @slot - Use the unnamed slot to add any content elements.
 */
export
@customElement('sbb-sidebar-content')
class SbbSidebarContentElement extends SbbSidebarContentBaseElement {
  public static override styles: CSSResultGroup = [SbbSidebarContentBaseElement.styles, style];
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-sidebar-content': SbbSidebarContentElement;
  }
}
