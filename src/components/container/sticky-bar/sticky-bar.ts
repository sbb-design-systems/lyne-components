import { CSSResultGroup, html, LitElement, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ref } from 'lit/directives/ref.js';

import { toggleDatasetEntry } from '../../core/dom';
import { AgnosticIntersectionObserver } from '../../core/observers';

import style from './sticky-bar.scss?lit&inline';

import '../container';
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
    this._toggleShadowVisibility(entries),
  );

  public override connectedCallback(): void {
    super.connectedCallback();
    this._updateIntersectionObserver();
  }

  private _toggleShadowVisibility(entries: IntersectionObserverEntry[]): void {
    const stickyBar = this.shadowRoot.querySelector('.sbb-sticky-bar') as HTMLElement;
    entries.forEach((entry) => {
      toggleDatasetEntry(
        stickyBar,
        'settled',
        entry.isIntersecting || entry.boundingClientRect.top < 0,
      );
    });
  }

  private _updateIntersectionObserver(): void {
    this._observer.disconnect();
    if (this._intersector) {
      this._observer.observe(this._intersector);
    }
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._observer.disconnect();
  }

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-sticky-bar">
        <slot></slot>
      </div>
      <span
        ${ref((el: HTMLElement): void => {
          if (this._intersector === el) {
            return;
          }
          this._intersector = el;
          this._updateIntersectionObserver();
        })}
      ></span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-sticky-bar': SbbStickyBarElement;
  }
}
