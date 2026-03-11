import type { CSSResultGroup } from 'lit';

import { SbbNegativeMixin } from '../../core/mixins.ts';
import { SbbTitleBase } from '../../title.ts';

import style from './dialog-title.scss?lit&inline';

/**
 * It displays a title inside a dialog header.
 *
 * @slot - Use the unnamed slot for the content of the dialog-title.
 */
export class SbbDialogTitleElement extends SbbNegativeMixin(SbbTitleBase) {
  public static override readonly elementName: string = 'sbb-dialog-title';
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
