import type { PropertyValues } from '@lit/reactive-element';
import type { CSSResultGroup, TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { SbbLanguageController } from '../../core/controllers/language-controller.ts';
import { forceType } from '../../core/decorators.ts';
import {
  i18nCarouselArrowsNavigationHint,
  i18nNextSlide,
  i18nPreviousSlide,
  i18nSlide,
} from '../../core/i18n/i18n.ts';
import { SbbElementInternalsMixin } from '../../core/mixins.ts';
import { boxSizingStyles } from '../../core/styles.ts';
import type { SbbCompactPaginatorElement } from '../../paginator/compact-paginator/compact-paginator.component.ts';
import type {
  SbbCarouselItemElement,
  SbbCarouselItemEventDetail,
} from '../carousel-item/carousel-item.component.ts';
import type { SbbCarouselListElement } from '../carousel-list/carousel-list.component.ts';

import '../../screen-reader-only.ts';

import style from './carousel.scss?lit&inline';

/**
 * It displays a carousel component.
 *
 * @slot - Use the unnamed slot to add the `sbb-carousel-list` for content and a `sbb-paginator` for controls.
 */
export
@customElement('sbb-carousel')
class SbbCarouselElement extends SbbElementInternalsMixin(LitElement) {
  public static override styles: CSSResultGroup = [boxSizingStyles, style];

  /**
   * Used to display a box-shadow around the component.
   */
  @forceType()
  @property({ reflect: true, type: Boolean })
  public accessor shadow: boolean = false;

  private _paginator: SbbCompactPaginatorElement | null = null;
  private _abortController: AbortController | null = null;
  private _language = new SbbLanguageController(this);
  private _requestedPageIndexByPaginator = -1;

  public constructor() {
    super();

    // If the list is scrolled using mouse/keyboard, it keeps the paginator updated.
    this.addEventListener?.('show', (e: CustomEvent<SbbCarouselItemEventDetail>) => {
      // We have to give priority to the paginator for the case,
      // if during an animation the next page is called from the paginator, the paginator is reset.
      if (
        this._requestedPageIndexByPaginator !== -1 &&
        this._requestedPageIndexByPaginator !== e.detail.index
      ) {
        return;
      }
      if (this._paginator) {
        if (e.detail.index !== this._paginator.pageIndex) {
          this._paginator.pageIndex = e.detail.index;
        }
      }
      this._requestedPageIndexByPaginator = -1;
    });
  }

  public override connectedCallback(): void {
    super.connectedCallback();

    this.internals.role = 'region';
    this.internals.ariaLabel = 'carousel';

    this._setupPaginator();
  }

  public override firstUpdated(_changedProperties: PropertyValues): void {
    super.firstUpdated(_changedProperties);

    this.internals.ariaDescribedByElements = [
      this.shadowRoot!.querySelector('#sbb-carousel-arrows-navigation-hint')!,
    ];
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
    paginator.accessibilityNextPageLabel ||= i18nNextSlide[this._language.current];
    paginator.accessibilityPreviousPageLabel ||= i18nPreviousSlide[this._language.current];
    paginator.accessibilityPageLabel ||= i18nSlide[this._language.current];

    if (paginator !== this._paginator) {
      this._paginator = paginator;
      this._setupPaginator();
    }
  }

  private _setupPaginator(): void {
    this._abortController?.abort();

    if (!this._paginator) {
      return;
    }
    this._abortController = new AbortController();

    // By listening to the click event on the paginator, we can ensure that the change was user triggered.
    // If we instead use the page event, we would also catch programmatic changes to the paginator
    // which can cause a loop and wrong timing as we also listen to the show event.
    this._paginator.addEventListener('click', () => this._scrollAtPaginatorChange(), {
      signal: this._abortController.signal,
    });
  }

  private _scrollAtPaginatorChange(): void {
    if (!this._paginator) {
      return;
    }
    this._requestedPageIndexByPaginator = this._paginator.pageIndex;

    const list = this.querySelector<SbbCarouselListElement>('sbb-carousel-list');

    if (list) {
      const items = list.querySelectorAll<SbbCarouselItemElement>('sbb-carousel-item');

      // As the offsetLeft is always rendered from the viewport boundaries, we need to subtract the offsetLeft
      // from the carousel to get the offset inside the scroll area.
      const offsetLeft = items[this._paginator.pageIndex].offsetLeft - this.offsetLeft;

      // Prevents redundant scrolling when the paginator updates after a scroll event
      // by checking the distance between the current and target scroll positions.
      // (show event is triggered slightly before fully scrolled).
      if (list.clientWidth <= 100 || Math.abs(list.scrollLeft - offsetLeft) > 50) {
        list.scrollTo({ left: offsetLeft });
      }
    }
  }

  protected override render(): TemplateResult {
    return html`
      <sbb-screen-reader-only id="sbb-carousel-arrows-navigation-hint"
        >${i18nCarouselArrowsNavigationHint[this._language.current]}</sbb-screen-reader-only
      >
      <slot @slotchange=${this._handleSlotchange}></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-carousel': SbbCarouselElement;
  }
}
