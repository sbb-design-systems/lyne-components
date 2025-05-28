import { html, type LitElement, type PropertyValues, type TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';

import { SbbLanguageController } from '../../core/controllers.js';
import { isLean } from '../../core/dom.js';
import { EventEmitter } from '../../core/eventing.js';
import { i18nNextPage, i18nPreviousPage, i18nSelectedPage } from '../../core/i18n.js';
import type { SbbPaginatorPageEventDetails } from '../../core/interfaces.js';
import {
  type AbstractConstructor,
  SbbDisabledMixin,
  SbbElementInternalsMixin,
  SbbNegativeMixin,
} from '../../core/mixins.js';

import '../../button/mini-button.js';
import '../../button/mini-button-group.js';
import '../../divider.js';

export declare abstract class SbbPaginatorCommonElementMixinType extends SbbNegativeMixin(
  SbbDisabledMixin(SbbElementInternalsMixin(LitElement)),
) {
  public accessor length: number;
  public accessor pageSize: number;
  public accessor pageIndex: number;
  public accessor pagerPosition: 'start' | 'end';
  public accessor size: 'm' | 's';
  public nextPage(): void;
  public previousPage(): void;
  public firstPage(): void;
  public lastPage(): void;
  public selectPage(index: number): void;
  public hasPreviousPage(): boolean;
  public hasNextPage(): boolean;
  public numberOfPages(): number;
  protected language: SbbLanguageController;
  /**
   * @deprecated Will be removed with next major change.
   */
  protected pageIndexChanged(value: number): void;
  protected emitPageEvent(previousPageIndex: number): void;
  protected renderPrevNextButtons(): TemplateResult;
  protected abstract renderPaginator(): TemplateResult;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbPaginatorCommonElementMixin = <T extends AbstractConstructor<LitElement>>(
  superClass: T,
): AbstractConstructor<SbbPaginatorCommonElementMixinType> & T => {
  abstract class SbbPaginatorCommonElement
    extends SbbNegativeMixin(SbbDisabledMixin(SbbElementInternalsMixin(superClass)))
    implements Partial<SbbPaginatorCommonElementMixinType>
  {
    public static override role = 'group';
    public static readonly events: Record<string, string> = {
      page: 'page',
    } as const;

    /** Total number of items. */
    @property({ type: Number })
    public set length(value: number) {
      this._length = isNaN(value) || value < 0 ? 0 : value;
      // Call setter of pageIndex to ensure bounds
      // eslint-disable-next-line no-self-assign
      this.pageIndex = this.pageIndex;
    }
    public get length(): number {
      return this._length;
    }
    private _length: number = 0;

    /** Number of items per page. */
    @property({ attribute: 'page-size', type: Number })
    public set pageSize(value: number) {
      // Current page needs to be updated to reflect the new page size. Navigate to the page
      // containing the previous page's first item.
      const previousPageSize = this.pageSize;
      this._pageSize = Math.max(value, 0);
      this.pageIndex = Math.floor((this.pageIndex * previousPageSize) / this.pageSize) || 0;
    }
    public get pageSize(): number {
      return this._pageSize;
    }
    private _pageSize: number = 10;

    /** Current page index. */
    @property({ attribute: 'page-index', type: Number })
    public set pageIndex(value: number) {
      const previousPageIndex = this._pageIndex;
      this._pageIndex = this._coercePageIndexInRange(value);
      this.emitPageEvent(previousPageIndex);
    }
    public get pageIndex(): number {
      return this._pageIndex;
    }
    private _pageIndex: number = 0;

    /** Position of the prev/next buttons. */
    @property({ attribute: 'pager-position', reflect: true }) public accessor pagerPosition:
      | 'start'
      | 'end' = 'start';

    /**
     * Size variant, either m or s.
     * @default 'm' / 's' (lean)
     */
    @property({ reflect: true }) public accessor size: 'm' | 's' = isLean() ? 's' : 'm';

    private _page: EventEmitter<SbbPaginatorPageEventDetails> = new EventEmitter(
      this,
      SbbPaginatorCommonElement.events.page,
      { composed: true, bubbles: true },
    );

    protected language = new SbbLanguageController(this);
    protected abstract renderPaginator(): string;

    protected override updated(changedProperties: PropertyValues<this>): void {
      super.updated(changedProperties);

      // To reliably announce page change, we have to set the label in updated() (a tick later than the other changes).
      this.shadowRoot!.querySelector('sbb-screen-reader-only')!.textContent =
        this._currentPageLabel();
    }

    /** Evaluate `pageIndex` by excluding edge cases. */
    private _coercePageIndexInRange(pageIndex: number): number {
      return Math.max(
        Math.min(Math.max(isNaN(pageIndex) ? 0 : pageIndex, 0), this.numberOfPages() - 1),
        0,
      );
    }

    private _currentPageLabel(): string {
      return i18nSelectedPage(this.pageIndex + 1)[this.language.current];
    }

    /** Advances to the next page if it exists. */
    public nextPage(): void {
      this.pageIndex = this.pageIndex + 1;
    }

    /** Move back to the previous page if it exists. */
    public previousPage(): void {
      this.pageIndex = this.pageIndex - 1;
    }

    /** Move to the first page if not already there. */
    public firstPage(): void {
      this.pageIndex = 0;
    }

    /** Move to the last page if not already there. */
    public lastPage(): void {
      this.pageIndex = this.numberOfPages() - 1;
    }

    /** Move to a specific page index. */
    public selectPage(index: number): void {
      this.pageIndex = index;
    }

    /** Whether there is a previous page. */
    public hasPreviousPage(): boolean {
      return this.pageIndex >= 1 && this.pageSize !== 0;
    }

    /** Whether there is a next page. */
    public hasNextPage(): boolean {
      const maxPageIndex = this.numberOfPages() - 1;
      return this.pageIndex < maxPageIndex && this.pageSize !== 0;
    }

    /**
     * Calculates the current number of pages based on the `length` and the `pageSize`;
     * value must be rounded up (e.g. `length = 21` and `pageSize = 10` means 3 pages).
     */
    public numberOfPages(): number {
      return this.pageSize ? Math.ceil(this.length / this.pageSize) : 0;
    }

    /**
     * If the `pageIndex` changes due to user interaction,
     * emit the `page` event and then update the `pageIndex` value.
     * @deprecated Will be removed with next major change.
     */
    protected pageIndexChanged(value: number): void {
      this.pageIndex = value;
    }

    protected emitPageEvent(previousPageIndex: number): void {
      this._page.emit({
        previousPageIndex,
        pageIndex: this.pageIndex,
        length: this.length,
        pageSize: this.pageSize,
      });
    }

    protected renderPrevNextButtons(): TemplateResult {
      return html`
        <sbb-mini-button-group ?negative=${this.negative} size=${this.size === 's' ? 's' : 'l'}>
          <sbb-mini-button
            id="sbb-paginator-prev-page"
            aria-label=${i18nPreviousPage[this.language.current]}
            icon-name="chevron-small-left-small"
            ?disabled=${this.disabled || !this.hasPreviousPage()}
            @click=${() => this.previousPage()}
          ></sbb-mini-button>
          <sbb-divider orientation="vertical"></sbb-divider>
          <sbb-mini-button
            id="sbb-paginator-next-page"
            aria-label=${i18nNextPage[this.language.current]}
            icon-name="chevron-small-right-small"
            ?disabled=${this.disabled || !this.hasNextPage()}
            @click=${() => this.nextPage()}
          ></sbb-mini-button>
        </sbb-mini-button-group>
      `;
    }

    protected override render(): TemplateResult {
      return html`
        ${this.renderPaginator()}
        <sbb-screen-reader-only role="status"></sbb-screen-reader-only>
      `;
    }
  }
  return SbbPaginatorCommonElement as unknown as AbstractConstructor<SbbPaginatorCommonElementMixinType> &
    T;
};

declare global {
  interface HTMLElementEventMap {
    page: CustomEvent<SbbPaginatorPageEventDetails>;
  }
}
