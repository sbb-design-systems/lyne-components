import { type CSSResultGroup, nothing, type TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';

import { EventEmitter } from '../core/eventing.js';
import { SbbNegativeMixin } from '../core/mixins.js';

import style from './paginator.scss?lit&inline';

export type SbbPaginatorPageChanged = {
  currentPageIndex: number;
  previousPageIndex: number;
};

const MAX_PAGE_NUMBERS_DISPLAYED = 3;

/**
 * It displays a paginator component.
 *
 * @event {CustomEvent<SbbPaginatorPageChanged>} pageChanged - Emits when the pageIndex changes.
 */
@customElement('sbb-paginator')
export class SbbPaginatorElement extends SbbNegativeMixin(LitElement) {
  public static override styles: CSSResultGroup = style;
  public static readonly events: Record<string, string> = {
    pageChanged: 'pageChanged',
  } as const;

  /** Total number of items. */
  @property({ type: Number })
  public set length(value: number) {
    this._length = isNaN(value) ? 0 : Math.max(value, 0);
  }
  public get length(): number {
    return this._length;
  }
  private _length: number = 0;

  /** Number of items per page. */
  @property({ attribute: 'page-size', type: Number })
  public set pageSize(value: number) {
    this._changePageSize(value);
  }
  public get pageSize(): number {
    return this._pageSize;
  }
  private _pageSize: number = 10;

  /** Current page index. */
  @property({ attribute: 'page-index', type: Number })
  public set pageIndex(value: number) {
    const previousPageIndex = this._pageIndex;
    this._pageIndex = this._calculatePageIndex(value);
    this._pageChanged.emit({ previousPageIndex, currentPageIndex: value });
  }
  public get pageIndex(): number {
    return this._pageIndex;
  }
  private _pageIndex: number = 0;

  /** The available `pageSize` choices. */
  @property({ attribute: 'page-size-options', type: Array }) public pageSizeOptions?: number[];

  /** Position of the prev/next buttons. */
  @property({ attribute: 'pager-position' }) public pagerPosition: 'start' | 'end' = 'start';

  /** Size of the component (`s` or `m`). */
  @property({ reflect: true }) public size: 's' | 'm' = 'm';

  private _pageChanged: EventEmitter<SbbPaginatorPageChanged> = new EventEmitter(
    this,
    SbbPaginatorElement.events.pageChanged,
    { composed: true, bubbles: true },
  );

  /** Changes the page size maintaining the current page view. */
  private _changePageSize(pageSize: number): void {
    this._pageSize = Math.max(pageSize, 0);
    this.pageIndex = Math.floor((this.pageIndex * this.pageSize) / this._pageSize) || 0;
  }

  /** Evaluate `pageIndex` by excluding edge cases. */
  private _calculatePageIndex(pageIndex: number): number {
    if (isNaN(pageIndex) || pageIndex < 0 || pageIndex > this._numberOfPages()) {
      return 0;
    }
    return pageIndex;
  }

  /**
   * Calculates the current number of pages based on the `length` and the `pageSize`;
   * value must be rounded up (e.g. length=21 - pageSize=10 => 3 pages).
   */
  private _numberOfPages(): number {
    if (!this.pageSize) {
      return 0;
    }
    return Math.ceil(this.length / this.pageSize);
  }

  /**
   * Calculate the pages set based on the following rules:
   *  - the first page must always be visible;
   *  - the last page must always be visible;
   *  - if there are more than `MAX_PAGE_NUMBERS_DISPLAYED` other pages, ellipsis button must be used.
   */
  private _getVisiblePages(): (number | null)[] {
    const totalPages: number = this._numberOfPages();
    const currentPageIndex: number = this.pageIndex;

    if (totalPages <= MAX_PAGE_NUMBERS_DISPLAYED + 2) {
      return this._range(totalPages);
    } else if (currentPageIndex < MAX_PAGE_NUMBERS_DISPLAYED) {
      return [...this._range(MAX_PAGE_NUMBERS_DISPLAYED + 1), null, totalPages - 1];
    } else if (currentPageIndex >= totalPages - MAX_PAGE_NUMBERS_DISPLAYED) {
      return [
        0,
        null,
        ...this._range(MAX_PAGE_NUMBERS_DISPLAYED + 1, totalPages - 1 - MAX_PAGE_NUMBERS_DISPLAYED),
      ];
    } else {
      return [
        0,
        null,
        currentPageIndex - 1,
        currentPageIndex,
        currentPageIndex + 1,
        null,
        totalPages - 1,
      ];
    }
  }

  private _range(length: number, offset: number = 0): number[] {
    return Array.from({ length }, (_, k) => k + offset);
  }

  private _changePage(value: number): void {
    this.pageIndex = value;
  }

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-paginator">
        <!-- Add logic for buttons & pageOptions -->
        <ul class="sbb-paginator__pages">
          ${repeat(
            this._getVisiblePages(),
            (item) => html`
            ${
              item === null
                ? html`
                    <li class="sbb-paginator__page">
                      <span class="sbb-paginator__page--ellipsis">...</span>
                    </li>
                  `
                : html`
                    <li
                      class="sbb-paginator__page"
                      data-active=${this.pageIndex === item || nothing}
                    >
                      <span
                        role="button"
                        class="sbb-paginator__page--number"
                        aria-current=${this.pageIndex === item ? 'true' : nothing}
                        aria-selected=${this.pageIndex === item ? 'true' : nothing}
                        tabindex=${this.pageIndex === item ? '-1' : '0'}
                        @click=${() => this._changePage(item)}
                      >
                        ${item + 1}
                      </span>
                    </li>
                  `
            }
            </li>
          `,
          )}
        </ul>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-paginator': SbbPaginatorElement;
  }
}
