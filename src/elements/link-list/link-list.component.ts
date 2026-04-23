import { type CSSResultGroup, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';

import type { SbbHorizontalFrom, SbbOrientation } from '../core.ts';
import { boxSizingStyles } from '../core.ts';

import { linkListBaseStyle, SbbLinkListBaseElement } from './common/link-list-base.ts';
import style from './link-list.scss?inline';

/**
 * It displays a list of `sbb-block-link`.
 *
 * @slot - Use the unnamed slot to add one or more `sbb-block-link`.
 * @slot title - Use this slot to provide a title.
 */
export class SbbLinkListElement extends SbbLinkListBaseElement {
  public static override readonly elementName: string = 'sbb-link-list';
  public static override styles: CSSResultGroup = [
    boxSizingStyles,
    linkListBaseStyle,
    unsafeCSS(style),
  ];

  /** Selected breakpoint from which the list is rendered horizontally. */
  @property({ attribute: 'horizontal-from', reflect: true })
  public accessor horizontalFrom: SbbHorizontalFrom | null = null;

  /** The orientation in which the list will be shown vertical or horizontal. */
  @property({ reflect: true }) public accessor orientation: SbbOrientation = 'vertical';
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-link-list': SbbLinkListElement;
  }
}
