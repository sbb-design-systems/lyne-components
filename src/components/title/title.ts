import type { CSSResultGroup } from 'lit';
import { customElement } from 'lit/decorators.js';

import { SbbTitleBase } from './title-base.js';
import style from './title.scss?lit&inline';

/**
 * @cssprop [--sbb-title-margin-block-start=var(--sbb-spacing-responsive-m)] - Margin block start of the title.
 * @cssprop [--sbb-title-margin-block-end=var(--sbb-spacing-responsive-s)] - Margin block end of the title.
 */
@customElement('sbb-title')
export class SbbTitleElement extends SbbTitleBase {
  public static override styles: CSSResultGroup = [SbbTitleBase.styles, style];
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-title': SbbTitleElement;
  }
}
