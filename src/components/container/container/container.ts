import { CSSResultGroup, html, LitElement, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { ConnectedAbortController } from '../../core/eventing';

import style from './container.scss?lit&inline';

/**
 * It displays its content with the default page spacing.
 *
 * @slot - Use the unnamed slot to add anything to the container.
 */
@customElement('sbb-container')
export class SbbContainerElement extends LitElement {
  public static override styles: CSSResultGroup = style;

  /** Whether the container is expanded. */
  @property({ type: Boolean, reflect: true }) public expanded = false;

  /** Variant of the container, like transparent, white etc. */
  @property({ reflect: true }) public variant: 'transparent' | 'white' | 'milk' | 'midnight' =
    'transparent';

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

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
  }

  private _handlePageScroll(): void {
    const stickyBar = this._stickyBarInnerElement;
    if (!stickyBar) {
      return;
    }

    const stickyBarPosition = stickyBar.getBoundingClientRect();
    const containerPosition = this.shadowRoot
      .querySelector('.sbb-container')
      .getBoundingClientRect();

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

  private get _stickyBarInnerElement(): HTMLDivElement {
    return this.querySelector('sbb-sticky-bar')?.shadowRoot.querySelector('.sbb-sticky-bar');
  }

  private get _firstScrollableParent(): HTMLElement | typeof document {
    return this._getScrollParent(this);
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
      <div class="sbb-container">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-container': SbbContainerElement;
  }
}
