import type { PropertyValues } from '@lit/reactive-element';
import { IntersectionController } from '@lit-labs/observers/intersection-controller.js';
import type { CSSResultGroup, TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

import { isArrowKeyPressed } from '../../core/a11y.js';
import { SbbLanguageController } from '../../core/controllers.js';
import { hostAttributes } from '../../core/decorators.js';
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
@hostAttributes({
  'aria-live': 'polite',
  'aria-atomic': 'true',
})
class SbbCarouselListElement extends SbbElementInternalsMixin(LitElement) {
  public static override styles: CSSResultGroup = style;

  private _currentIndex = 0;

  /** Gets the slotted items. */
  private get _carouselItems(): SbbCarouselItemElement[] {
    return Array.from(this.querySelectorAll?.('sbb-carousel-item') ?? []);
  }

  private _language = new SbbLanguageController(this);

  private _beforeShowObserver = new IntersectionController(this, {
    callback: (entry) => {
      const item = entry.filter((e) => e.isIntersecting && e.target !== this);
      item.forEach((e) => {
        const target = e.target as SbbCarouselItemElement;
        target.dispatchEvent(
          new CustomEvent<SbbCarouselItemEventDetail>('beforeshow', {
            detail: { index: this._carouselItems.findIndex((e) => e === target) },
            bubbles: true,
            composed: true,
          }),
        );
      });
    },
    config: { threshold: 0.01 },
  });

  private _showObserver = new IntersectionController(this, {
    callback: (entryArr) => {
      const entries = entryArr.filter((e) => e.target !== this);
      entries
        .filter((e) => !e.isIntersecting)
        .forEach((e) => ((e.target as SbbCarouselItemElement).ariaHidden = 'true'));
      entries
        .filter((e) => e.isIntersecting)
        .forEach((e) => {
          const target = e.target as SbbCarouselItemElement;
          target.ariaHidden = 'false';
          this._currentIndex = this._carouselItems.findIndex((e) => e === target);
          target.dispatchEvent(
            new CustomEvent<SbbCarouselItemEventDetail>('show', {
              detail: { index: this._currentIndex },
              bubbles: true,
              composed: true,
            }),
          );
        });
    },
    config: { threshold: 0.99 },
  });

  private _handleSlotchange(): void {
    const children = Array.from(this.children) as SbbCarouselItemElement[];

    // Set the aria-label if not provided
    const childrenLength = children.length;
    children.forEach(
      (item, index) =>
        (item.ariaLabel ||= i18nCarouselItemAriaLabel(index + 1, childrenLength)[
          this._language.current
        ]),
    );

    // Set the component dimensions
    const firstItem = children.find(
      (el) => el.localName === 'sbb-carousel-item',
    ) as SbbCarouselItemElement;
    if (firstItem) {
      firstItem.updateComplete.then(() => {
        const innerEl = firstItem.shadowRoot?.querySelector('.sbb-carousel-item');
        if (innerEl) {
          this.style.setProperty('--sbb-carousel-list-height', `${innerEl.clientHeight}px`);
          this.style.setProperty('--sbb-carousel-list-width', `${innerEl.clientWidth}px`);
        }
      });
    }
  }

  private _onKeyDown(evt: KeyboardEvent): void {
    if (!isArrowKeyPressed(evt)) {
      return;
    }
    evt.preventDefault();

    switch (evt.key) {
      case 'ArrowLeft':
      case 'ArrowUp': {
        this._currentIndex = Math.max(--this._currentIndex, 0);
        break;
      }
      case 'ArrowDown':
      case 'ArrowRight': {
        this._currentIndex = Math.min(++this._currentIndex, this._carouselItems.length - 1);
        break;
      }
      // this should never happen since all the case allowed by `isArrowKeyOrPageKeysPressed` should be covered
      default: {
        this._currentIndex = 0;
      }
    }
    this._carouselItems[this._currentIndex].scrollIntoView();
  }

  public override firstUpdated(_changedProperties: PropertyValues): void {
    super.firstUpdated(_changedProperties);

    this.querySelectorAll('sbb-carousel-item').forEach((item) => {
      this._beforeShowObserver.observe(item);
      this._showObserver.observe(item);
    });
  }

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-carousel-list" @keydown=${this._onKeyDown}>
        <slot @slotchange=${this._handleSlotchange}></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-carousel-list': SbbCarouselListElement;
  }
}
