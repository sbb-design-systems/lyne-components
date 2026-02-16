import type { CSSResultGroup } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { SbbTitleBase, type SbbTitleLevel } from '../../title.ts';

import style from './sidebar-title.scss?lit&inline';

/**
 * It displays the title of the sidebar. It has to be placed inside an `sbb-sidebar` element.
 *
 * @slot - Use the unnamed slot for the content of the sidebar-title.
 */
export
@customElement('sbb-sidebar-title')
class SbbSidebarTitleElement extends SbbTitleBase {
  public static override styles: CSSResultGroup = [SbbTitleBase.styles, style];

  /** Title level */
  @property({ reflect: true }) public override accessor level: SbbTitleLevel = '2';

  public constructor() {
    super();
    this.visualLevel ??= '5' as this['visualLevel'];
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this.slot ||= 'title-section';
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-sidebar-title': SbbSidebarTitleElement;
  }
}
