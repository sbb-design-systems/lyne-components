import type { CSSResultGroup } from 'lit';

import { boxSizingStyles } from '../core/styles.ts';
import { linkListBaseStyle, SbbLinkListBaseElement } from '../link-list.pure.ts';

import style from './link-list-anchor.scss?lit&inline';

/**
 * It displays a list of `sbb-block-link`.
 *
 * @slot - Use the unnamed slot to add one or more `sbb-block-link`.
 * @slot title - Use this slot to provide a title.
 */
export class SbbLinkListAnchorElement extends SbbLinkListBaseElement {
  public static override readonly elementName: string = 'sbb-link-list-anchor';
  public static override styles: CSSResultGroup = [boxSizingStyles, linkListBaseStyle, style];
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-link-list-anchor': SbbLinkListAnchorElement;
  }
}
