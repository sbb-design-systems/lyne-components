import { IntersectionController } from '@lit-labs/observers/intersection-controller.js';
import type { CSSResultGroup, TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

import { isArrowKeyPressed } from '../../core/a11y.js';
import { SbbLanguageController } from '../../core/controllers.js';
import { i18nCarouselItemAriaLabel } from '../../core/i18n.js';
import { SbbElementInternalsMixin } from '../../core/mixins.js';
import type {
  SbbCarouselItemElement,
  SbbCarouselItemEventDetail,
} from '../carousel-item/carousel-item.component.js';

import style from './carousel-list.scss?lit&inline';

/**
 * It displays a list of `sbb-carousel-item` components.
 *
 * @slot - Use the unnamed slot to add `sbb-carousel-item` elements.
 */
export
@customElement('sbb-carousel-list')
class SbbCarouselListElement extends SbbElementInternalsMixin(LitElement) {
  public static override styles: CSSResultGroup = style;

  private _currentIndex = 0;
  private _language = new SbbLanguageController(this);

  private _beforeShowObserver = new IntersectionController(this, {
    callback: (entry) => {
      const item = entry.filter((e) => e.isIntersecting && e.target !== this);
      item.forEach((e) => {
        const target = e.target as SbbCarouselItemElement;
        target.dispatchEvent(
          new CustomEvent<SbbCarouselItemEventDetail>('beforeshow', {
            detail: { index: this._carouselItems().findIndex((e) => e === target) },
            bubbles: true,
            composed: true,
          }),
        );
      });
    },
    config: { threshold: 0.01, root: this, rootMargin: '100% 0% 100% 0%' },
  });

  private _showObserver = new IntersectionController(this, {
    callback: (entryArr) => {
      for (const entry of entryArr) {
        if (entry.target === this) {
          continue;
        }
        const target = entry.target as SbbCarouselItemElement;
        if (entry.isIntersecting) {
          target.ariaHidden = null;
          this._currentIndex = this._carouselItems().findIndex((el) => el === target);
          target.dispatchEvent(
            new CustomEvent<SbbCarouselItemEventDetail>('show', {
              detail: { index: this._currentIndex },
              bubbles: true,
              composed: true,
            }),
          );
        } else {
          target.ariaHidden = 'true';
        }
      }
    },
    config: { threshold: 0.99, root: this, rootMargin: '100% 0% 100% 0%' },
  });

  // Observer to read the dimensions of the first item when it becomes visible.
  private _firstVisibleIntersectionController = new IntersectionController(this, {
    callback: (entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0) {
          this._readDimensions();
          this._firstVisibleIntersectionController.unobserve(this);
        }
      });
    },
    config: {
      root: document.documentElement,
    },
  });

  public constructor() {
    super();

    this.addEventListener?.('keydown', (e) => this._onKeyDown(e));
  }

  /** Gets the slotted items. */
  private _carouselItems(): SbbCarouselItemElement[] {
    return Array.from(this.querySelectorAll?.('sbb-carousel-item') ?? []);
  }

  private _handleSlotchange(): void {
    const children = this._carouselItems();

    // Set the aria-label if not provided
    const childrenLength = children.length;
    children.forEach((item, index) => {
      item.ariaLabel ||= i18nCarouselItemAriaLabel(index + 1, childrenLength)[
        this._language.current
      ];
      item.ariaHidden = index === this._currentIndex ? null : 'true';
    });

    // In case of updating the carousel items, we need to disconnect and reconnect the observers.
    this._beforeShowObserver.hostDisconnected();
    this._showObserver.hostDisconnected();
    this._beforeShowObserver.hostConnected();
    this._showObserver.hostConnected();

    this._readDimensions();
  }

  /**
   * Reads the dimensions of the first carousel item and sets the CSS properties accordingly.
   * Should set the dimensions only once, when the first item becomes visible and if the value is non-zero.
   * @private
   */
  private _readDimensions(): void {
    const carouselItems = this._carouselItems();
    if (carouselItems.length === 0) {
      return;
    }

    const firstItem = carouselItems[0];

    if (firstItem.clientHeight > 0) {
      this.style.setProperty('--sbb-carousel-list-height', `${firstItem.clientHeight}px`);
    }

    if (firstItem.clientWidth > 0) {
      this.style.setProperty('--sbb-carousel-list-width', `${firstItem.clientWidth}px`);

      // We should only observe the items if they have a non-zero width. Otherwise, an unwanted scrolling can happen.
      carouselItems.forEach((item) => {
        this._beforeShowObserver.observe(item);
        this._showObserver.observe(item);
      });
    }
  }

  private _onKeyDown(evt: KeyboardEvent): void {
    if (!isArrowKeyPressed(evt)) {
      return;
    }
    evt.preventDefault();

    let newIndex = this._currentIndex;
    const isPrev = evt.key === 'ArrowUp' || evt.key === 'ArrowLeft';
    const isNext = evt.key === 'ArrowDown' || evt.key === 'ArrowRight';

    if (isPrev) {
      newIndex = Math.max(0, this._currentIndex - 1);
    } else if (isNext) {
      newIndex = Math.min(this._carouselItems().length - 1, this._currentIndex + 1);
    }

    if (newIndex !== this._currentIndex) {
      this._currentIndex = newIndex;
      this.scrollTo({
        left: this._carouselItems()[this._currentIndex].offsetLeft - this.offsetLeft,
      });
    }
  }

  public override connectedCallback(): void {
    super.connectedCallback();

    this.internals.ariaLive = 'polite';
    this.internals.ariaAtomic = 'true';
  }

  protected override render(): TemplateResult {
    return html`<slot @slotchange=${this._handleSlotchange}></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-carousel-list': SbbCarouselListElement;
  }
}
