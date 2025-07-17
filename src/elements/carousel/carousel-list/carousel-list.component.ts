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

  private _handleSlotchange(): void {
    const firstItem = Array.from(this.children).find(
      (el) => el.localName === 'sbb-carousel-item',
    ) as SbbCarouselItemElement;
    if (firstItem) {
      const innerEl: HTMLDivElement = firstItem.shadowRoot!.querySelector('.sbb-carousel-item')!;
      this.style.height = `${innerEl.clientHeight}px`;
      this.style.width = `${innerEl.clientWidth}px`;
    }
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
