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

import { sbbInputModalityDetector } from '../core/a11y.js';
import { SbbLanguageController } from '../core/controllers.js';
import { hostAttributes } from '../core/decorators.js';
import { EventEmitter } from '../core/eventing.js';
import { i18nItemsPerPage, i18nNextPage, i18nPage, i18nPreviousPage } from '../core/i18n.js';
import { SbbNegativeMixin } from '../core/mixins.js';
import type { SbbSelectElement } from '../select.js';

import style from './paginator.scss?lit&inline';

import '../button/mini-button.js';
import '../button/mini-button-group.js';
import '../divider.js';
import '../form-field.js';
import '../select.js';
import '../option.js';

export type SbbPaginatorPageEventDetails = {
  length: number;
  pageSize: number;
  pageIndex: number;
  previousPageIndex: number;
};

const MAX_PAGE_NUMBERS_DISPLAYED = 3;

let optionsLabelNextId = 0;

/**
 * It displays a paginator component.
 *
 * @event {CustomEvent<SbbPaginatorPageEventDetails>} page - Emits when the pageIndex changes.
 */
@customElement('sbb-paginator')
@hostAttributes({
  role: 'group',
})
export class SbbPaginatorElement extends SbbNegativeMixin(LitElement) {
  public static override styles: CSSResultGroup = style;
  public static readonly events: Record<string, string> = {
    page: 'page',
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
    const previousPageSize = this._pageSize;
    this._pageSize = Math.max(value, 0);
    this._pageIndex = Math.floor((this.pageIndex * previousPageSize) / this._pageSize) || 0;
  }
  public get pageSize(): number {
    return this._pageSize;
  }
  private _pageSize: number = 10;

  /** Current page index. */
  @property({ attribute: 'page-index', type: Number })
  public set pageIndex(value: number) {
    this._pageIndex = this._coercePageIndexInRange(value);
  }
  public get pageIndex(): number {
    return this._pageIndex;
  }
  private _pageIndex: number = 0;

  /** The available `pageSize` choices. */
  @property({ attribute: 'page-size-options', type: Array })
  public set pageSizeOptions(value: number[]) {
    this._pageSizeOptions = value;
    this._updateSelectAriaLabelledBy = true;
  }
  public get pageSizeOptions(): number[] | undefined {
    return this._pageSizeOptions;
  }
  private _pageSizeOptions?: number[];

  /**
   * Position of the prev/next buttons: if `pageSizeOptions` is set, the sbb-select for the pageSize change
   * will be positioned oppositely with the page numbers always in the center.
   */
  @property({ attribute: 'pager-position', reflect: true }) public pagerPosition: 'start' | 'end' =
    'start';

  /** Size variant, either m or s. */
  @property({ reflect: true }) public size: 'm' | 's' = 'm';

  private _page: EventEmitter<SbbPaginatorPageEventDetails> = new EventEmitter(
    this,
    SbbPaginatorElement.events.page,
    { composed: true, bubbles: true },
  );

  private _paginatorOptionsLabel = `sbb-paginator-options-label-${++optionsLabelNextId}`;
  private _language = new SbbLanguageController(this);
  private _markForFocus: number | null = null;
  private _updateSelectAriaLabelledBy: boolean = false;

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

    /**
     * TODO: Accessibility fix required to correctly read the label;
     * can be possibly removed after the merge of https://github.com/sbb-design-systems/lyne-components/issues/3062
     */
    const select = this.shadowRoot!.querySelector('sbb-select');
    if (select && this._updateSelectAriaLabelledBy) {
      select.setAttribute('aria-labelledby', this._paginatorOptionsLabel);
      this._updateSelectAriaLabelledBy = false;
    }
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
   * If the `pageSize` changes due to user interaction with the `pageSizeOptions` select,
   * emit the `page` event and then update the `pageSize` value.
   */
  private _pageSizeChanged(value: number): void {
    const previousPageSize = this._pageSize;
    const newPageSize = Math.max(value, 0);
    if (previousPageSize !== newPageSize) {
      this._page.emit({
        previousPageIndex: this._pageIndex,
        pageIndex: Math.floor((this.pageIndex * previousPageSize) / newPageSize) || 0,
        length: this.length,
        pageSize: newPageSize,
      });
    }
    this.pageSize = newPageSize;
  }

  /**
   * If the `pageIndex` changes due to user interaction,
   * emit the `page` event and then update the `pageIndex` value.
   */
  private _pageIndexChanged(value: number): void {
    const newPageIndex = this._coercePageIndexInRange(value);
    if (this._pageIndex !== newPageIndex) {
      this._page.emit({
        previousPageIndex: this._pageIndex,
        pageIndex: newPageIndex,
        length: this.length,
        pageSize: this.pageSize,
      });
    }
    this.pageIndex = newPageIndex;
  }

  /** Returns the displayed page elements. */
  private _getVisiblePages(): Element[] {
    return Array.from(this.shadowRoot!.querySelectorAll('.sbb-paginator__page--number-item'));
  }

  /** Evaluate `pageIndex` by excluding edge cases. */
  private _coercePageIndexInRange(pageIndex: number): number {
    if (isNaN(pageIndex) || pageIndex < 0 || pageIndex > this._numberOfPages() - 1) {
      return 0;
    }
    return pageIndex;
  }

  /**
   * Calculate the pages set based on the following rules:
   *  - the first page must always be visible;
   *  - the last page must always be visible;
   *  - if there are more than `MAX_PAGE_NUMBERS_DISPLAYED` other pages, ellipsis button must be used.
   */
  private _getVisiblePagesIndex(): (number | 'ellipsis')[] {
    const totalPages: number = this._numberOfPages();
    const currentPageIndex: number = this.pageIndex;

    if (totalPages <= MAX_PAGE_NUMBERS_DISPLAYED + 2) {
      return this._range(totalPages);
    } else if (currentPageIndex < MAX_PAGE_NUMBERS_DISPLAYED) {
      return [...this._range(MAX_PAGE_NUMBERS_DISPLAYED + 1), 'ellipsis', totalPages - 1];
    } else if (currentPageIndex >= totalPages - MAX_PAGE_NUMBERS_DISPLAYED) {
      return [
        0,
        'ellipsis',
        ...this._range(MAX_PAGE_NUMBERS_DISPLAYED + 1, totalPages - 1 - MAX_PAGE_NUMBERS_DISPLAYED),
      ];
    } else {
      return [
        0,
        'ellipsis',
        currentPageIndex - 1,
        currentPageIndex,
        currentPageIndex + 1,
        'ellipsis',
        totalPages - 1,
      ];
    }
  }

  /** Creates an array of consecutive numbers given the length and the starting value. */
  private _range(length: number, offset: number = 0): number[] {
    return Array.from({ length }, (_, k) => k + offset);
  }

  private _handleKeyUp(event: KeyboardEvent): void {
    if (event.key !== ' ') {
      return;
    }

    event.preventDefault();
    const current = this._getVisiblePages().find((e: Element) => e === event.target);
    if (current) {
      (event.target as HTMLElement).parentElement!.removeAttribute('data-active');
      const newPageIndex = +current.getAttribute('data-index')!;
      this._pageIndexChanged(newPageIndex);
      this._markForFocus = newPageIndex;
    }
  }

  private _handleKeydown(event: KeyboardEvent): void {
    if (event.key !== ' ') {
      return;
    }

    event.preventDefault();
    this._getVisiblePages()
      .find((e: Element) => e === event.target)
      ?.parentElement!.toggleAttribute('data-active', true);
  }

  private _renderPrevNextButtons(): TemplateResult {
    return html`
      <sbb-mini-button-group ?negative=${this.negative} size=${this.size === 's' ? 's' : 'l'}>
        <sbb-mini-button
          id="sbb-paginator-prev-page"
          aria-label=${i18nPreviousPage[this._language.current]}
          icon-name="chevron-small-left-small"
          ?disabled=${this.pageIndex === 0}
          @click=${() => this._pageIndexChanged(this._pageIndex - 1)}
        ></sbb-mini-button>
        <sbb-divider orientation="vertical"></sbb-divider>
        <sbb-mini-button
          id="sbb-paginator-next-page"
          aria-label=${i18nNextPage[this._language.current]}
          icon-name="chevron-small-right-small"
          ?disabled=${this.pageIndex === this._numberOfPages() - 1}
          @click=${() => this._pageIndexChanged(this._pageIndex + 1)}
        ></sbb-mini-button>
      </sbb-mini-button-group>
    `;
  }

  private _renderItemPerPageTemplate(): TemplateResult | typeof nothing {
    return this.pageSizeOptions && this.pageSizeOptions.length > 0
      ? html`
          <div class="sbb-paginator__page-size-options">
            <label id=${this._paginatorOptionsLabel}>
              ${i18nItemsPerPage[this._language.current]}
            </label>
            <sbb-form-field
              borderless
              width="collapse"
              ?negative=${this.negative}
              size=${this.size}
            >
              <sbb-select
                value=${this.pageSizeOptions?.find((e) => e === this.pageSize) ??
                this.pageSizeOptions![0]}
                @change=${(e: CustomEvent) =>
                  this._pageSizeChanged(+((e.target as SbbSelectElement).value as string))}
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
      <ul class="sbb-paginator__pages" @keyup=${this._handleKeyUp} @keydown=${this._handleKeydown}>
        ${repeat(
          this._getVisiblePagesIndex(),
          (item: number | 'ellipsis'): TemplateResult =>
            item === 'ellipsis'
              ? html`
                  <li class="sbb-paginator__page--ellipsis">
                    <span class="sbb-paginator__page--ellipsis-item">…</span>
                  </li>
                `
              : html`
                  <li
                    class="sbb-paginator__page--number"
                    ?data-selected=${this.pageIndex === item || nothing}
                  >
                    <span
                      role="button"
                      class="sbb-paginator__page--number-item"
                      data-index=${item}
                      aria-label="${i18nPage[this._language.current]} ${item + 1}"
                      aria-current=${this.pageIndex === item ? 'true' : nothing}
                      tabindex=${this.pageIndex === item ? '-1' : '0'}
                      @click=${() => this._pageIndexChanged(item)}
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
        ${
          this.pagerPosition === 'start'
            ? html`<span class="sbb-paginator__wrapping-group">
                  ${this._renderPrevNextButtons()} ${this._renderPageNumbers()}
                </span>
                ${this._renderItemPerPageTemplate()}`
            : html`${this._renderItemPerPageTemplate()}
                <span class="sbb-paginator__wrapping-group">
                  ${this._renderPageNumbers()} ${this._renderPrevNextButtons()}
                </span>`
        }</span>
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