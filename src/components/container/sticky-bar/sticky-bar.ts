import { type CSSResultGroup, html, LitElement, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { setAttribute, toggleDatasetEntry } from '../../core/dom';
import { AgnosticIntersectionObserver } from '../../core/observers';

import '../container';

import style from './sticky-bar.scss?lit&inline';

/**
 * A container that sticks to the bottom of the page if slotted into `sbb-container`.
 *
 * @slot - Use the unnamed slot to add content to the sticky bar.
 */
@customElement('sbb-sticky-bar')
export class SbbStickyBarElement extends LitElement {
  public static override styles: CSSResultGroup = style;

  /** Color of the container, like transparent, white etc. */
  @property({ reflect: true }) public color?: 'white' | 'milk';

  /** Whether the animation is enabled. */
  @property({ attribute: 'disable-animation', reflect: true, type: Boolean })
  public disableAnimation = false;

  private _observer = new AgnosticIntersectionObserver(
    (entries) => this._toggleShadowVisibility(entries[0]),
    { threshold: [1] },
  );

  public override connectedCallback(): void {
    super.connectedCallback();

    setAttribute(this, 'slot', 'sticky-bar');

    const container = this.closest('sbb-container');
    if (container) {
      toggleDatasetEntry(this, 'expanded', container.expanded);
      toggleDatasetEntry(this, 'transparent', container.color === 'transparent');
    }
    this._observer.observe(this);
  }

  private _toggleShadowVisibility(entry: IntersectionObserverEntry): void {
    toggleDatasetEntry(this, 'sticking', !entry.isIntersecting && entry.boundingClientRect.top > 0);
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
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-sticky-bar': SbbStickyBarElement;
  }
}
