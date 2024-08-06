import type { CSSResultGroup } from 'lit';
import { customElement } from 'lit/decorators.js';

import { linkListBaseStyle, SbbLinkListBaseElement } from '../common.js';

import style from './link-list-anchor.scss?lit&inline';

import '../../title.js';

/**
 * It displays a list of `sbb-block-link`.
 *
 * @slot - Use the unnamed slot to add one or more `sbb-block-link`.
 * @slot title - Use this slot to provide a title.
 */
@customElement('sbb-link-list-anchor')
export class SbbLinkListAnchorElement extends SbbLinkListBaseElement {
  public static override styles: CSSResultGroup = [linkListBaseStyle, style];
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-link-list-anchor': SbbLinkListAnchorElement;
  }
}
