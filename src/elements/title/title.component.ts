import { unsafeCSS, type CSSResultGroup } from 'lit';
import { property } from 'lit/decorators.js';

import { SbbNegativeMixin } from '../core.ts';

import { SbbTitleBase, type SbbTitleLevel } from './title-base.ts';
import style from './title.scss?inline';

/**
 * @slot - Use the unnamed slot for the content of the title.
 *
 * @cssprop [--sbb-title-margin-block] - Margin block of the title.
 */
export class SbbTitleElement extends SbbNegativeMixin(SbbTitleBase) {
  public static override readonly elementName: string = 'sbb-title';
  public static override styles: CSSResultGroup = [SbbTitleBase.styles, unsafeCSS(style)];

  /** Visual level for the title. Optional, if not set, the value of level will be used. */
  @property({ attribute: 'visual-level', reflect: true })
  public override accessor visualLevel: SbbTitleLevel | null = null;
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-title': SbbTitleElement;
  }
}
