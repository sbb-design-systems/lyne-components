import type { CSSResultGroup, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import type { SbbHorizontalFrom, SbbOrientation } from '../../core/interfaces.js';
import { type WithListChildren } from '../../core/mixins.js';
import type { SbbLinkSize } from '../../link.js';
import { linkListBaseStyle, SbbLinkListBaseElement } from '../common.js';

import style from './link-list.scss?lit&inline';

import '../../title.js';

/**
 * It displays a list of `sbb-block-link`.
 *
 * @slot - Use the unnamed slot to add one or more `sbb-block-link`.
 * @slot title - Use this slot to provide a title.
 */
@customElement('sbb-link-list')
export class SbbLinkListElement extends SbbLinkListBaseElement {
  public static override styles: CSSResultGroup = [linkListBaseStyle, style];

  /**
   * Text size of the nested sbb-block-link instances. This will overwrite the size attribute of
   * nested sbb-block-link instances.
   */
  @property({ reflect: true }) public size: SbbLinkSize = 's';

  /** Selected breakpoint from which the list is rendered horizontally. */
  @property({ attribute: 'horizontal-from', reflect: true })
  public horizontalFrom?: SbbHorizontalFrom;

  /** The orientation in which the list will be shown vertical or horizontal. */
  @property({ reflect: true }) public orientation: SbbOrientation = 'vertical';

  protected override willUpdate(changedProperties: PropertyValues<WithListChildren<this>>): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('size')) {
      for (const link of this.listChildren) {
        link.size = this.size;
      }
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-link-list': SbbLinkListElement;
  }
}
