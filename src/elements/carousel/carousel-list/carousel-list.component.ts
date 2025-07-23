import type { PropertyValues } from '@lit/reactive-element';
import { IntersectionController } from '@lit-labs/observers/intersection-controller.js';
import type { CSSResultGroup, TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

import type { SbbCarouselItemElement } from '../carousel-item/carousel-item.component.js';

import style from './carousel-list.scss?lit&inline';

/**
 * It displays a list of `sbb-carousel-item` components.
 *
 * @slot - Use the unnamed slot to add `sbb-carousel-item` elements.
 */
export
@customElement('sbb-carousel-list')
class SbbCarouselListElement extends LitElement {
  public static override styles: CSSResultGroup = style;
  private _beforeShowObserver = new IntersectionController(this, {
    callback: (entry) => {
      const item = entry.filter((e) => e.isIntersecting && e.target !== this);
      item.forEach((e) =>
        e.target.dispatchEvent(new Event('beforeshow', { bubbles: true, composed: true })),
      );
    },
    config: { threshold: 0.01 },
  });
  private _showObserver = new IntersectionController(this, {
    callback: (entry) => {
      const item = entry.filter((e) => e.isIntersecting && e.target !== this);
      item.forEach((e) =>
        e.target.dispatchEvent(new Event('show', { bubbles: true, composed: true })),
      );
    },
    config: { threshold: 1 },
  });

  private _handleSlotchange(): void {
    const firstItem = Array.from(this.children).find(
      (el) => el.localName === 'sbb-carousel-item',
    ) as SbbCarouselItemElement;
    if (firstItem) {
      const innerEl: HTMLDivElement = firstItem.shadowRoot!.querySelector('.sbb-carousel-item')!;
      this.style.setProperty('--sbb-carousel-list-height', `${innerEl.clientHeight}px`);
      this.style.setProperty('--sbb-carousel-list-width', `${innerEl.clientWidth}px`);
    }
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
      <div class="sbb-carousel-list" aria-atomic="false" aria-live="polite">
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
