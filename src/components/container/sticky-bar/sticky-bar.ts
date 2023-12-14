import { CSSResultGroup, html, LitElement, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';

import { ConnectedAbortController } from '../../core/eventing';

import style from './sticky-bar.scss?lit&inline';

/**
 * A container that sticks to the bottom of the page if slotted into `sbb-container`.
 *
 * @slot - Use the unnamed slot to add content to the sticky bar.
 */
@customElement('sbb-sticky-bar')
export class SbbStickyBarElement extends LitElement {
  public static override styles: CSSResultGroup = style;

  private _abort = new ConnectedAbortController(this);

  public override connectedCallback(): void {
    super.connectedCallback();
    const signal = this._abort.signal;

    // Once the component is done rendering the container should find the first scrollable element
    // This is necessary in case the container itself, or any parent element has a fixed height
    super.getUpdateComplete().then(() => {
      this._handlePageScroll();
      this._firstScrollableParent.addEventListener('scroll', () => this._handlePageScroll(), {
        passive: true,
        signal,
      });
    });
  }

  private _handlePageScroll(): void {
    const stickyBar = this.shadowRoot.querySelector('.sbb-sticky-bar');
    if (!stickyBar) {
      return;
    }

    const stickyBarPosition = stickyBar.getBoundingClientRect();
    const containerPosition =
      this.closest('sbb-container').containerInnerElement.getBoundingClientRect();

    if (!stickyBarPosition || !containerPosition) {
      return;
    }

    const animationSpan = stickyBarPosition.height * 2;
    const animationStart = containerPosition.bottom - animationSpan;

    if (stickyBarPosition.bottom === containerPosition.bottom) {
      stickyBar.classList.add('sbb-sticky-bar__settled');
    } else {
      stickyBar.classList.remove('sbb-sticky-bar__settled');
    }

    if (stickyBarPosition.bottom >= animationStart) {
      const animationProgress = (stickyBarPosition.bottom - animationStart) / animationSpan;
      this.style.setProperty('--sbb-sticky-bar-scroll', `${animationProgress}`);
    } else {
      this.style.setProperty('--sbb-sticky-bar-scroll', '0');
    }
  }

  private get _firstScrollableParent(): HTMLElement | typeof document {
    return this._getScrollParent(this.closest('sbb-container'));
  }

  private _getScrollParent(node): HTMLElement | typeof document {
    if (node == null || node.tagName === 'HTML') {
      return document;
    }

    if (node.scrollHeight > node.clientHeight) {
      return node;
    } else {
      return this._getScrollParent(node.parentNode);
    }
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
