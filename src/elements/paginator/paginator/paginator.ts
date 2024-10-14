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

import { sbbInputModalityDetector } from '../../core/a11y.js';
import { i18nItemsPerPage, i18nPage, i18nSelectedPage } from '../../core/i18n.js';
import type { SbbSelectElement } from '../../select.js';
import { SbbPaginatorCommonElementMixin } from '../common.js';

import style from './paginator.scss?lit&inline';

import '../../form-field.js';
import '../../select.js';
import '../../option.js';
import '../../screen-reader-only.js';

const MAX_PAGE_NUMBERS_DISPLAYED = 3;

let nextId = 0;

/**
 * It displays a paginator component.
 *
 * @event {CustomEvent<SbbPaginatorPageEventDetails>} page - Emits when the pageIndex changes.
 */
@customElement('sbb-paginator')
export class SbbPaginatorElement extends SbbPaginatorCommonElementMixin(LitElement) {
  public static override styles: CSSResultGroup = style;
  public static readonly events: Record<string, string> = {
    page: 'page',
  } as const;

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
   * Position of the prev/next buttons: if `pageSizeOptions` is set,
   * the sbb-select for the pageSize change will be positioned oppositely, with the page numbers always in the center.
   */
  @property({ attribute: 'pager-position', reflect: true }) public override pagerPosition:
    | 'start'
    | 'end' = 'start';

  private _paginatorOptionsLabel = `sbb-paginator-options-label-${++nextId}`;
  private _markForFocus: number | null = null;
  private _updateSelectAriaLabelledBy: boolean = false;

  protected override updated(changedProperties: PropertyValues<this>): void {
    super.updated(changedProperties);

    /** Tab navigation can force a rerender when ellipsis elements need to be displayed; the focus must stay on the correct element. */
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
   * If the `pageSize` changes due to user interaction with the `pageSizeOptions` select,
   * emit the `page` event and then update the `pageSize` value.
   */
  private _pageSizeChanged(value: number): void {
    const previousPageSize = this.pageSize;
    const previousPageIndex = this.pageIndex;
    this.pageSize = value;

    if (previousPageSize !== this.pageSize) {
      this.emitPageEvent(previousPageIndex);
    }
  }

  /** Returns the displayed page elements. */
  private _getVisiblePages(): Element[] {
    return Array.from(this.shadowRoot!.querySelectorAll('.sbb-paginator__page--number-item'));
  }

  /**
   * Calculate the pages set based on the following rules:
   *  - the first page must always be visible;
   *  - the last page must always be visible;
   *  - if there are more than `MAX_PAGE_NUMBERS_DISPLAYED` other pages, ellipsis button must be used.
   */
  private _getVisiblePagesIndex(): (number | 'ellipsis')[] {
    const totalPages: number = this.numberOfPages();
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
    if (event.key !== ' ' && event.key !== 'Enter') {
      return;
    }

    const current = this._getVisiblePages().find((e: Element) => e === event.target);
    if (current) {
      this._markForFocus = this.pageIndex;
    }
  }

  protected currentPageLabel(): string {
    return i18nSelectedPage(this.pageIndex + 1)[this.language.current];
  }

  private _renderItemPerPageTemplate(): TemplateResult | typeof nothing {
    return this.pageSizeOptions && this.pageSizeOptions.length > 0
      ? html`
          <div class="sbb-paginator__page-size-options">
            <label id=${this._paginatorOptionsLabel}>
              ${i18nItemsPerPage[this.language.current]}
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
      <ul class="sbb-paginator__pages">
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
                  <li class="sbb-paginator__page--number">
                    <button
                      ?data-selected=${this.pageIndex === item}
                      class="sbb-paginator__page--number-item"
                      data-index=${item}
                      aria-label="${i18nPage[this.language.current]} ${item + 1}"
                      aria-current=${this.pageIndex === item ? 'true' : nothing}
                      @click=${() => this.pageIndexChanged(item)}
                      @keyup=${this._handleKeyUp}
                    >
                      <span class="sbb-paginator__page--number-item-label">${item + 1}</span>
                    </button>
                  </li>
                `,
        )}
      </ul>
    `;
  }

  protected override renderPaginator(): TemplateResult {
    return html`
      <div class="sbb-paginator">
        ${
          this.pagerPosition === 'start'
            ? html`<span class="sbb-paginator__wrapping-group">
                  ${this.renderPrevNextButtons()} ${this._renderPageNumbers()}
                </span>
                ${this._renderItemPerPageTemplate()}`
            : html`${this._renderItemPerPageTemplate()}
                <span class="sbb-paginator__wrapping-group">
                  ${this._renderPageNumbers()} ${this.renderPrevNextButtons()}
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
