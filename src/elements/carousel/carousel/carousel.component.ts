import type { CSSResultGroup, TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { forceType } from '../../core/decorators.js';
import type { SbbPaginatorPageEventDetails } from '../../core/interfaces.js';
import type { SbbCompactPaginatorElement } from '../../paginator/compact-paginator/compact-paginator.component.js';
import type { SbbCarouselItemElement } from '../carousel-item/carousel-item.component.js';
import type { SbbCarouselListElement } from '../carousel-list/carousel-list.component.js';

import style from './carousel.scss?lit&inline';

/**
 * It displays a carousel component.
 *
 * @slot - Use the unnamed slot to add the `sbb-carousel-list` and a `sbb-paginator` for controls.
 */
export
@customElement('sbb-carousel')
class SbbCarouselElement extends LitElement {
  public static override styles: CSSResultGroup = style;
  private _currentItemIndex: number = 0;

  @forceType()
  @property({ reflect: true, type: Boolean })
  public accessor shadow: boolean = false;

  private _handleSlotchange(): void {
    const paginator: SbbCompactPaginatorElement = Array.from(this.children).find(
      (el) => el.localName === 'sbb-compact-paginator',
    ) as SbbCompactPaginatorElement;
    const list: SbbCarouselListElement = Array.from(this.children).find(
      (el) => el.localName === 'sbb-carousel-list',
    ) as SbbCarouselListElement;
    if (!paginator || !list) {
      return;
    }
    const items = list.querySelectorAll<SbbCarouselItemElement>('sbb-carousel-item');
    if (items && items.length > 0) {
      paginator.length = items.length;
      paginator.pageSize = 1;
    }

    paginator.addEventListener('page', (e) => this._scrollAtPageChange(e));
  }

  private _scrollAtPageChange(e: CustomEvent<SbbPaginatorPageEventDetails>): void {
    if (e.detail.previousPageIndex < e.detail.pageIndex) {
      this._currentItemIndex++;
    } else {
      this._currentItemIndex--;
    }

    const list = this.querySelector<SbbCarouselListElement>('sbb-carousel-list');
    if (list) {
      const items = list.querySelectorAll<SbbCarouselItemElement>('sbb-carousel-item');
      items[this._currentItemIndex].scrollIntoView();
    }
  }

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-carousel" aria-roledescription="carousel">
        <slot @slotchange=${this._handleSlotchange}></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-carousel': SbbCarouselElement;
  }
}
