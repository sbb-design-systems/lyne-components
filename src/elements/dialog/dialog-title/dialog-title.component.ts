import type { CSSResultGroup } from 'lit';
import { customElement } from 'lit/decorators.js';

import { SbbNegativeMixin } from '../../core/mixins.ts';
import { SbbTitleBase } from '../../title.ts';

import style from './dialog-title.scss?lit&inline';

/**
 * It displays a title inside a dialog header.
 *
 * @slot - Use the unnamed slot for the content of the dialog-title.
 */
export
@customElement('sbb-dialog-title')
class SbbDialogTitleElement extends SbbNegativeMixin(SbbTitleBase) {
  public static override styles: CSSResultGroup = [SbbTitleBase.styles, style];

  public constructor() {
    super();
    this.level = '2' as this['level'];
    this.visualLevel = '4' as this['visualLevel'];
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-dialog-title': SbbDialogTitleElement;
  }
}
