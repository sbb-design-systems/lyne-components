import {
  type CSSResultGroup,
  html,
  LitElement,
  nothing,
  type PropertyValues,
  type TemplateResult,
} from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';

import { getNextElementIndex, isArrowKeyPressed, sbbInputModalityDetector } from '../core/a11y.js';
import { SbbConnectedAbortController, SbbLanguageController } from '../core/controllers.js';
import { EventEmitter } from '../core/eventing.js';
import { i18nPreviousPage, i18nNextPage, i18nPage } from '../core/i18n.js';
import { SbbNegativeMixin } from '../core/mixins.js';
import type { SbbSelectElement } from '../select.js';

import style from './paginator.scss?lit&inline';

import '../button/mini-button.js';
import '../button/mini-button-group.js';
import '../divider.js';
import '../form-field.js';
import '../select.js';
import '../option.js';

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
    this._pageSize = Math.max(value, 0);
    this.pageIndex = Math.floor((this.pageIndex * this.pageSize) / this._pageSize) || 0;
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
    if (previousPageIndex !== this._pageIndex) {
      this._pageChanged.emit({ previousPageIndex, currentPageIndex: value });
    }
  }
  public get pageIndex(): number {
    return this._pageIndex;
  }
  private _pageIndex: number = 0;

  /** The available `pageSize` choices. */
  @property({ attribute: 'page-size-options', type: Array }) public pageSizeOptions?: number[];

  /** Position of the prev/next buttons. */
  @property({ attribute: 'pager-position' }) public pagerPosition: 'start' | 'end' = 'start';

  private _pageChanged: EventEmitter<SbbPaginatorPageChanged> = new EventEmitter(
    this,
    SbbPaginatorElement.events.pageChanged,
    { composed: true, bubbles: true },
  );

  private _abort = new SbbConnectedAbortController(this);
  private _language = new SbbLanguageController(this);
  private _markForFocus: number | null = null;

  protected override firstUpdated(changedProperties: PropertyValues<this>): void {
    super.firstUpdated(changedProperties);
    const signal = this._abort.signal;
    this.shadowRoot!.querySelector('.sbb-paginator__pages')!.addEventListener(
      'keydown',
      (e) => this._handleKeydown(e as KeyboardEvent),
      { signal },
    );
  }

  protected override updated(changedProperties: PropertyValues<this>): void {
    super.updated(changedProperties);

    /** Arrow navigation can force a rerender when ellipsis elements need to be displayed; the focus must stay on the correct element. */
    if (this._markForFocus && sbbInputModalityDetector.mostRecentModality === 'keyboard') {
      const focusElement = this._getVisiblePages().find(
        (e) => this.pageIndex === +e.getAttribute('data-index')!,
      );
      if (focusElement) {
        (focusElement as HTMLElement).focus();
      }
      // Reset mark for focus
      this._markForFocus = null;
    }
  }

  /** Returns the displayed page elements. */
  private _getVisiblePages(): Element[] {
    return Array.from(this.shadowRoot!.querySelectorAll('.sbb-paginator__page--number-item'));
  }

  /** Change page by setting the `pageIndex`. */
  private _changePage(value: number): void {
    this.pageIndex = value;
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
   * value must be rounded up (e.g. `length = 21` and `pageSize = 10` means 3 pages).
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
  private _getVisiblePagesIndex(): (number | null)[] {
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

  /** Creates an array of consecutive numbers given the length and the starting value. */
  private _range(length: number, offset: number = 0): number[] {
    return Array.from({ length }, (_, k) => k + offset);
  }

  /** Move to a specific page or calculate the next element from event. */
  private _moveToPage(event: KeyboardEvent, index?: number): void {
    event.preventDefault();
    const pages = this._getVisiblePages();
    const nextIndex =
      index ??
      getNextElementIndex(
        event,
        pages.findIndex((e: Element) => e === event.target),
        pages.length,
      );
    (pages[nextIndex] as HTMLElement).focus();
  }

  private _handleKeydown(event: KeyboardEvent): void {
    if (isArrowKeyPressed(event)) {
      this._moveToPage(event);
    }

    switch (event.key) {
      case 'Home':
      case 'PageUp':
        this._moveToPage(event, 0);
        break;

      case 'End':
      case 'PageDown':
        this._moveToPage(event, this._getVisiblePages().length - 1);
        break;

      case ' ': {
        event.preventDefault();
        const current = this._getVisiblePages().find((e: Element) => e === event.target);
        if (current) {
          this.pageIndex = +current.getAttribute('data-index')!;
          this._markForFocus = this.pageIndex;
        }
        break;
      }
    }
  }

  private _renderPrevNextButtons(): TemplateResult {
    return html`
      <div class="sbb-paginator__buttons">
        <sbb-mini-button-group ?negative=${this.negative} size="l">
          <sbb-mini-button
            id="sbb-paginator-prev-page"
            aria-label=${i18nPreviousPage[this._language.current]}
            icon-name="chevron-small-left-small"
            ?disabled=${this.pageIndex === 0}
            @click=${() => this._changePage(this.pageIndex - 1)}
          ></sbb-mini-button>
          <sbb-divider orientation="vertical"></sbb-divider>
          <sbb-mini-button
            id="sbb-paginator-next-page"
            aria-label=${i18nNextPage[this._language.current]}
            icon-name="chevron-small-right-small"
            ?disabled=${this.pageIndex === this._numberOfPages() - 1}
            @click=${() => this._changePage(this.pageIndex + 1)}
          ></sbb-mini-button>
        </sbb-mini-button-group>
      </div>
    `;
  }

  private _renderItemPerPageTemplate(): TemplateResult | typeof nothing {
    return this.pageSizeOptions && this.pageSizeOptions.length > 0
      ? html`
          <div class="sbb-paginator__page-size-options">
            Items per page
            <sbb-form-field borderless width="collapse" ?negative=${this.negative}>
              <sbb-select
                value=${this.pageSizeOptions?.find((e) => e === this.pageSize) ??
                this.pageSizeOptions![0]}
                @change=${(e: CustomEvent) =>
                  (this.pageSize = +((e.target as SbbSelectElement).value as string))}
              >
                ${repeat(
                  this.pageSizeOptions!,
                  (element) => html`<sbb-option value=${element}>${element}</sbb-option>`,
                )}
              </sbb-select>
            </sbb-form-field>
          </div>
        `
      : nothing;
  }

  private _renderPageNumbers(): TemplateResult {
    return html`
      <ul class="sbb-paginator__pages">
        ${repeat(
          this._getVisiblePagesIndex(),
          (item): TemplateResult =>
            item === null
              ? html`
                  <li class="sbb-paginator__page--ellipsis">
                    <span class="sbb-paginator__page--ellipsis-item">…</span>
                  </li>
                `
              : html`
                  <li
                    class="sbb-paginator__page--number"
                    data-selected=${this.pageIndex === item || nothing}
                  >
                    <span
                      role="button"
                      class="sbb-paginator__page--number-item"
                      data-index=${item}
                      aria-label="${i18nPage[this._language.current]} ${item + 1}"
                      aria-current=${this.pageIndex === item ? 'true' : nothing}
                      aria-selected=${this.pageIndex === item ? 'true' : nothing}
                      tabindex=${this.pageIndex === item ? '0' : '-1'}
                      @click=${() => this._changePage(item)}
                    >
                      ${item + 1}
                    </span>
                  </li>
                `,
        )}
      </ul>
    `;
  }

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-paginator">
        ${this.pagerPosition === 'start'
          ? this._renderPrevNextButtons()
          : this._renderItemPerPageTemplate()}
        ${this._renderPageNumbers()}
        ${this.pagerPosition === 'start'
          ? this._renderItemPerPageTemplate()
          : this._renderPrevNextButtons()}
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
