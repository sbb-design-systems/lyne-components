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

import { sbbInputModalityDetector } from '../../core/a11y.ts';
import { forceType } from '../../core/decorators.ts';
import { i18nItemsPerPage, i18nPage } from '../../core/i18n.ts';
import { boxSizingStyles } from '../../core/styles.ts';
import type { SbbSelectElement } from '../../select.ts';
import { SbbPaginatorCommonElementMixin } from '../common.ts';

import style from './paginator.scss?lit&inline';

import '../../form-field.ts';
import '../../select.ts';
import '../../option.ts';
import '../../screen-reader-only.ts';

const MAX_PAGE_NUMBERS_DISPLAYED = 3;

/**
 * It displays a paginator component.
 */
export
@customElement('sbb-paginator')
class SbbPaginatorElement extends SbbPaginatorCommonElementMixin(LitElement) {
  public static override styles: CSSResultGroup = [boxSizingStyles, style];
  public static readonly events: Record<string, string> = {
    page: 'page',
  } as const;

  /** The available `pageSize` choices. */
  @property({ attribute: 'page-size-options', type: Array })
  public accessor pageSizeOptions: number[] = [];

  /**
   * Position of the prev/next buttons: if `pageSizeOptions` is set,
   * the sbb-select for the pageSize change will be positioned oppositely, with the page numbers always in the center.
   */
  @property({ attribute: 'pager-position', reflect: true }) public override accessor pagerPosition:
    | 'start'
    | 'end' = 'start';

  /**
   * Accessibility label for the items per page. Defaults to `Items per page.`.
   * Can be set for cases like a carousel, where `slide` or `image` fits better.
   */
  @forceType()
  @property({ attribute: 'accessibility-items-per-page-label' })
  public accessor accessibilityItemsPerPageLabel: string = '';

  private _markForFocus = false;

  protected override updated(changedProperties: PropertyValues<this>): void {
    super.updated(changedProperties);

    /** Tab navigation can force a rerender when ellipsis elements need to be displayed; the focus must stay on the correct element. */
    if (this._markForFocus) {
      const focusElement = this._getVisiblePages().find(
        (e) => this.pageIndex === +e.getAttribute('data-index')!,
      );
      if (focusElement) {
        (focusElement as HTMLElement).focus();
      }
      this._markForFocus = false;
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

  private _onPageNumberClick(index: number): void {
    this.selectPage(index);

    // When the page is changed, the new current page might change its position.
    // After the render, we need to ensure that the focus stays on the selected page.
    this._markForFocus = sbbInputModalityDetector.mostRecentModality === 'keyboard';
  }

  private _renderItemPerPageTemplate(): TemplateResult | typeof nothing {
    return this.pageSizeOptions && this.pageSizeOptions.length > 0
      ? html`
          <div class="sbb-paginator__page-size-options">
            <label for="select"
              >${this.accessibilityItemsPerPageLabel
                ? this.accessibilityItemsPerPageLabel
                : i18nItemsPerPage[this.language.current]}</label
            >
            <sbb-form-field
              borderless
              width="collapse"
              ?negative=${this.negative}
              size=${this.size}
            >
              <sbb-select
                id="select"
                ?disabled=${this.disabled}
                value=${this.pageSizeOptions?.find((e) => e === this.pageSize) ??
                this.pageSizeOptions![0]}
                @change=${(e: Event) =>
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
                      ?disabled=${this.disabled}
                      class="sbb-paginator__page--number-item"
                      data-index=${item}
                      aria-label="${this.accessibilityPageLabel
                        ? this.accessibilityPageLabel
                        : i18nPage[this.language.current]} ${item + 1}"
                      aria-current=${this.pageIndex === item ? 'true' : nothing}
                      @click=${() => this._onPageNumberClick(item)}
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
