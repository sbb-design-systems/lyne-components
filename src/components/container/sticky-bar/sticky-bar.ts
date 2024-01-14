import { CSSResultGroup, html, LitElement, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';

import { setAttribute, toggleDatasetEntry } from '../../core/dom';
import { AgnosticIntersectionObserver } from '../../core/observers';

import style from './sticky-bar.scss?lit&inline';
/**
 * A container that sticks to the bottom of the page if slotted into `sbb-container`.
 *
 * @slot - Use the unnamed slot to add content to the sticky bar.
 */
@customElement('sbb-sticky-bar')
export class SbbStickyBarElement extends LitElement {
  public static override styles: CSSResultGroup = style;

  private _intersector: HTMLSpanElement;
  private _observer = new AgnosticIntersectionObserver((entries) =>
    this._toggleShadowVisibility(entries[0]),
  );

  protected override firstUpdated(): void {
    if (!this._intersector) {
      this._intersector = this.shadowRoot.querySelector?.('.sbb-sticky-bar__intersector');
    }
    this._observer.observe(this._intersector);
  }

  private _toggleShadowVisibility(entry: IntersectionObserverEntry): void {
    toggleDatasetEntry(this, 'sticking', !entry.isIntersecting && entry.boundingClientRect.top > 0);
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._observer.disconnect();
  }

  protected override render(): TemplateResult {
    setAttribute(this, 'slot', 'sticky-bar');
    return html`
      <div class="sbb-sticky-bar__wrapper">
        <div class="sbb-sticky-bar">
          <slot></slot>
        </div>
      </div>
      <div class="sbb-sticky-bar__intersector"></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-sticky-bar': SbbStickyBarElement;
  }
}
