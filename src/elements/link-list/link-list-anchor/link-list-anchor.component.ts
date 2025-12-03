import type { CSSResultGroup } from 'lit';
import { customElement } from 'lit/decorators.js';

import { boxSizingStyles } from '../../core/styles.ts';
import { linkListBaseStyle, SbbLinkListBaseElement } from '../common.ts';

import style from './link-list-anchor.scss?lit&inline';

/**
 * It displays a list of `sbb-block-link`.
 *
 * @slot - Use the unnamed slot to add one or more `sbb-block-link`.
 * @slot title - Use this slot to provide a title.
 */
export
@customElement('sbb-link-list-anchor')
class SbbLinkListAnchorElement extends SbbLinkListBaseElement {
  public static override styles: CSSResultGroup = [boxSizingStyles, linkListBaseStyle, style];
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-link-list-anchor': SbbLinkListAnchorElement;
  }
}
