import type { CSSResultGroup } from 'lit';
import { customElement } from 'lit/decorators.js';

import { SbbNegativeMixin } from '../../core/mixins.js';
import { SbbTitleBase } from '../../title.js';

import style from './dialog-title.scss?lit&inline';

/**
 * It displays a title inside a dialog header.
 *
 * @slot - Use the unnamed slot to place the content of the dialog-title.
 */
export
@customElement('sbb-dialog-title')
class SbbDialogTitleElement extends SbbNegativeMixin(SbbTitleBase) {
  public static override styles: CSSResultGroup = [SbbTitleBase.styles, style];

  public constructor() {
    super();
    this.level = '2';
    this.visualLevel = '3';
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-dialog-title': SbbDialogTitleElement;
  }
}
