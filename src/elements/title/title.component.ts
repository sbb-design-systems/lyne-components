import type { CSSResultGroup } from 'lit';
import { customElement } from 'lit/decorators.js';

import { SbbNegativeMixin } from '../core/mixins.js';

import { SbbTitleBase, type SbbTitleLevel } from './title-base.js';
import style from './title.scss?lit&inline';

/**
 * @slot - Use the unnamed slot for the content of the title.
 *
 * @cssprop [--sbb-title-margin-block-start=var(--sbb-spacing-responsive-m)] - Margin block start of the title.
 * @cssprop [--sbb-title-margin-block-end=var(--sbb-spacing-responsive-s)] - Margin block end of the title.
 */
export
@customElement('sbb-title')
class SbbTitleElement extends SbbNegativeMixin(SbbTitleBase) {
  public static override styles: CSSResultGroup = [SbbTitleBase.styles, style];

  /** Visual level for the title. Optional, if not set, the value of level will be used. */
  public override accessor visualLevel: SbbTitleLevel | null = null;
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-title': SbbTitleElement;
  }
}
