import type { CSSResultGroup, TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { forceType, hostAttributes } from '../../core/decorators.js';
import type { SbbPaginatorPageEventDetails } from '../../core/interfaces.js';
import { SbbElementInternalsMixin } from '../../core/mixins.js';
import type { SbbCompactPaginatorElement } from '../../paginator/compact-paginator/compact-paginator.component.js';
import type {
  SbbCarouselItemElement,
  SbbCarouselItemEventDetail,
} from '../carousel-item/carousel-item.component.js';
import type { SbbCarouselListElement } from '../carousel-list/carousel-list.component.js';

import style from './carousel.scss?lit&inline';

/**
 * It displays a carousel component.
 *
 * @slot - Use the unnamed slot to add the `sbb-carousel-list` and a `sbb-paginator` for controls.
 */
export
@customElement('sbb-carousel')
@hostAttributes({
  role: 'region',
  'aria-label': 'carousel',
})
class SbbCarouselElement extends SbbElementInternalsMixin(LitElement) {
  public static override styles: CSSResultGroup = style;

  /**
   * Used to display a box-shadow around the component.
   */
  @forceType()
  @property({ reflect: true, type: Boolean })
  public accessor shadow: boolean = false;

  private _paginator: SbbCompactPaginatorElement | null = null;
  private _abortController: AbortController | null = null;

  public constructor() {
    super();

    // If the list is scrolled using mouse/keyboard, it keeps the paginator updated.
    this.addEventListener?.('show', (e: CustomEvent<SbbCarouselItemEventDetail>) => {
      if (this._paginator) {
        if (e.detail.index !== this._paginator.pageIndex) {
          this._paginator.pageIndex = e.detail.index;
        }
      }
    });
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._abortController?.abort();
  }

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
    if (paginator !== this._paginator) {
      this._abortController = new AbortController();
      paginator.addEventListener('page', (e) => this._scrollAtPageChange(e), {
        signal: this._abortController.signal,
      });
      this._paginator = paginator as SbbCompactPaginatorElement;
    }
  }

  private _scrollAtPageChange(e: CustomEvent<SbbPaginatorPageEventDetails>): void {
    const list = this.querySelector<SbbCarouselListElement>('sbb-carousel-list');
    if (list) {
      const items = list.querySelectorAll<SbbCarouselItemElement>('sbb-carousel-item');
      items[e.detail.pageIndex]?.scrollIntoView();
    }
  }

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-carousel">
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
