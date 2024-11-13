import { IntersectionController } from '@lit-labs/observers/intersection-controller.js';
import { type CSSResultGroup, html, type PropertyValues, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { SbbOpenCloseBaseElement } from '../../core/base-elements.js';
import { hostAttributes } from '../../core/decorators.js';

import style from './sticky-bar.scss?lit&inline';

/**
 * A container that sticks to the bottom of the page if slotted into `sbb-container`.
 *
 * @slot - Use the unnamed slot to add content to the sticky bar.
 * @event {CustomEvent<void>} willOpen - Emits when the opening animation starts. Can be canceled.
 * @event {CustomEvent<void>} didOpen - Emits when the opening animation ends.
 * @event {CustomEvent<void>} willClose - Emits when the closing animation starts. Can be canceled.
 * @event {CustomEvent<void>} didClose - Emits when the closing animation ends.
 * @cssprop [--sbb-sticky-bar-padding-block=var(--sbb-spacing-responsive-xs)] - Block padding of the sticky bar.
 * @cssprop [--sbb-sticky-bar-bottom-overlapping-height=0px] - Define an additional area where
 * the sticky bar overlaps the following content on the bottom.
 * This area becomes visible when the sticky bar transitions from sticky to the normal document flow.
 * @cssprop [--sbb-sticky-bar-z-index] - To specify a custom stack order,
 * the `z-index` can be overridden by defining this CSS variable.
 */
export
@customElement('sbb-sticky-bar')
@hostAttributes({
  slot: 'sticky-bar',
})
class SbbStickyBarElement extends SbbOpenCloseBaseElement {
  public static override styles: CSSResultGroup = style;

  /** Color of the container, like transparent, white etc. */
  @property({ reflect: true }) public accessor color: 'white' | 'milk' | null = null;

  private _intersector?: HTMLSpanElement;
  private _observer = new IntersectionController(this, {
    // Although `this` is observed, we have to postpone observing
    // into firstUpdated() to achieve a correct initial state.
    target: null,
    callback: (entries) => this._toggleShadowVisibility(entries[0]),
  });

  public override connectedCallback(): void {
    super.connectedCallback();
    this.state = 'opened';

    const container = this.closest('sbb-container');
    if (container) {
      this.toggleAttribute('data-expanded', container.expanded);
    }
    if (this._intersector) {
      this._observer.observe(this._intersector);
    }
  }

  protected override firstUpdated(changedProperties: PropertyValues<this>): void {
    super.firstUpdated(changedProperties);

    if (!this._intersector) {
      this._intersector = this.shadowRoot!.querySelector('.sbb-sticky-bar__intersector')!;
      this._observer.observe(this._intersector);
    }
    this._observer.observe(this);
  }

  private _toggleShadowVisibility(entry: IntersectionObserverEntry): void {
    const isSticky = !entry.isIntersecting && entry.boundingClientRect.top > 0;

    this.toggleAttribute('data-sticking', isSticky);

    // To optimize the visual perception of the sticky bar, we have certain cases (e.g. on page load)
    // where we want to have it fade in from the bottom.
    // To decide whether the fade in should happen from bottom up,
    // we check how far away the sticky bar is from the intersector. When scrolling fast, the
    // difference can vary slightly. From this perspective we add a height tolerance.
    // This value was found by trial and error.
    const intersectorRect = this._intersector?.getBoundingClientRect();
    const stickyBarRect = this.shadowRoot!.querySelector(
      '.sbb-sticky-bar__wrapper',
    )!.getBoundingClientRect();
    const HEIGHT_TOLERANCE = 30;

    this.toggleAttribute(
      'data-fade-vertically',
      isSticky &&
        this._intersector &&
        Math.abs(intersectorRect!.bottom - stickyBarRect.bottom) > HEIGHT_TOLERANCE,
    );
  }

  /**
   * Animates from content flow position to `position: sticky`.
   */
  public override open(): void {
    if (!this.willOpen.emit() || this.state !== 'closed') {
      return;
    }

    this.willOpen.emit();
    this.state = 'opening';
    if (!this.hasAttribute('data-sticking')) {
      this._openedCallback();
    }
  }

  /**
   * Animates `position: sticky` to normal content flow position.
   */
  public override close(): void {
    if (!this.willClose.emit() || this.state !== 'opened') {
      return;
    }

    this.willClose.emit();
    this.state = 'closing';

    if (!this.hasAttribute('data-sticking')) {
      this._closedCallback();
    }
  }

  private _openedCallback(): void {
    this.state = 'opened';
    this.didOpen.emit();
  }

  private _closedCallback(): void {
    this.didClose.emit();
    this.state = 'closed';
  }

  private _onAnimationEnd(event: AnimationEvent): void {
    if (this.state === 'opening' && event.animationName === 'open') {
      this._openedCallback();
    } else if (this.state === 'closing' && event.animationName === 'close') {
      this._closedCallback();
    }
  }

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-sticky-bar__wrapper" @animationend=${this._onAnimationEnd}>
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
