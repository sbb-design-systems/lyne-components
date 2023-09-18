import { CSSResult, html, LitElement, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { findReferencedElement, toggleDatasetEntry } from '../../core/dom';

import style from './header.scss?lit&inline';
import '../../logo';

const IS_MENU_OPENED_QUERY = "[aria-controls][aria-expanded='true']";

/**
 * It displays a header section for the page.
 *
 * @slot - Use the unnamed slot to add actions or content to the header.
 * @slot logo - Slot used to render the logo on the right side (sbb-logo as default).
 */
@customElement('sbb-header')
export class SbbHeader extends LitElement {
  public static override styles: CSSResult = style;

  /**
   * Whether to allow the header content to stretch to full width.
   * By default, the content has the appropriate page size.
   */
  @property({ reflect: true, type: Boolean }) public expanded = false;

  /** The element's id or the element on which the scroll listener is attached. */
  @property({ attribute: 'scroll-origin' })
  public set scrollOrigin(value: string | HTMLElement | Document) {
    const oldValue = this._scrollOrigin;
    this._scrollOrigin = value;
    this._updateScrollOrigin(this._scrollOrigin, oldValue);
  }
  public get scrollOrigin(): string | HTMLElement | Document {
    return this._scrollOrigin;
  }
  private _scrollOrigin: string | HTMLElement | Document = document;

  /** Whether the header should hide and show on scroll. */
  @property({ attribute: 'hide-on-scroll', reflect: true, type: Boolean }) public hideOnScroll =
    false;

  @state() private _headerOnTop = true;

  private _scrollElement: HTMLElement | Document;
  private _scrollEventsController: AbortController;
  private _scrollFunction: () => void;
  private _lastScroll = 0;

  private _updateScrollOrigin(
    newValue: string | HTMLElement | Document,
    oldValue: string | HTMLElement | Document,
  ): void {
    if (newValue !== oldValue) {
      this._scrollEventsController?.abort();
      this._setListenerOnScrollElement(newValue);
      const currentScroll = this._getCurrentScrollProperty('scrollTop');
      // `currentScroll` can be negative, e.g. on mobile; this is not allowed.
      this._lastScroll = currentScroll <= 0 ? 0 : currentScroll;
    }
  }

  /** If `hideOnScroll` is set, checks the element to hook the listener on, and possibly add it.*/
  public override connectedCallback(): void {
    super.connectedCallback();
    this._setListenerOnScrollElement(this.scrollOrigin);
  }

  /** Removes the scroll listener, if previously attached. */
  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._scrollEventsController?.abort();
  }

  /** Sets the value of `_scrollElement` and `_scrollFunction` and possibly adds the function on the correct element. */
  private _setListenerOnScrollElement(scrollOrigin: string | HTMLElement | Document): void {
    this._scrollEventsController = new AbortController();
    this._scrollElement = findReferencedElement(scrollOrigin as string | HTMLElement) || document;
    this._scrollFunction = this._getScrollFunction.bind(this);
    this._scrollElement?.addEventListener('scroll', this._scrollFunction, {
      passive: true,
      signal: this._scrollEventsController.signal,
    });
  }
  /** Returns the correct function to attach on scroll. */
  private _getScrollFunction(): void {
    return this.hideOnScroll ? this._scrollListener() : this._scrollShadowListener();
  }

  /** Returns the requested property of the scrollContext. */
  private _getCurrentScrollProperty(property: 'scrollTop' | 'scrollHeight'): number {
    if (this._scrollElement instanceof Document) {
      return this._scrollElement.documentElement[property] || this._scrollElement.body[property];
    }
    return this._scrollElement[property];
  }

  /**
   * Sets the correct value for `scrollTop`, then:
   * - apply the shadow if the element/document has been scrolled down;
   * - hides the header, remove the shadow and possibly close any open menu on the header if it is not visible anymore;
   * - shows the header and re-apply the shadow if the element/document has been scrolled up.
   */
  private _scrollListener(): void {
    const currentScroll = this._getCurrentScrollProperty('scrollTop');

    // Whether the scroll view is bouncing past the edge of content and back again.
    if (this._getCurrentScrollProperty('scrollHeight') - window.innerHeight - currentScroll <= 0) {
      return;
    }

    toggleDatasetEntry(this, 'shadow', currentScroll !== 0);

    // Close open overlays when scrolling down if the header is scrolled out of sight.
    if (
      currentScroll > this.offsetHeight &&
      currentScroll > 0 &&
      this._lastScroll < currentScroll
    ) {
      this._closeOpenOverlays();
    }
    // Check if header is scrolled out of sight, scroll position > header height * 2.
    if (currentScroll > this.offsetHeight * 2) {
      this._headerOnTop = false;
      if (currentScroll > 0 && this._lastScroll < currentScroll) {
        // Scrolling down
        toggleDatasetEntry(this, 'shadow', false);
        toggleDatasetEntry(this, 'visible', false);
      } else {
        // Scrolling up
        toggleDatasetEntry(this, 'fixed', true);
        toggleDatasetEntry(this, 'shadow', true);
        toggleDatasetEntry(this, 'animated', true);
        toggleDatasetEntry(this, 'visible', true);
      }
    } else {
      // Check if header in its original position, scroll position < header height.
      // Reset header behaviour when scroll hits top of the page, on scroll position = 0.
      if (currentScroll === 0) {
        this._headerOnTop = true;
      }
      if (this._headerOnTop) {
        toggleDatasetEntry(this, 'shadow', false);
        toggleDatasetEntry(this, 'animated', false);
        toggleDatasetEntry(this, 'fixed', false);
        toggleDatasetEntry(this, 'visible', false);
      }
    }
    // `currentScroll` can be negative, e.g. on mobile; this is not allowed.
    this._lastScroll = currentScroll <= 0 ? 0 : currentScroll;
  }

  /** Apply the shadow if the element/document has been scrolled down. */
  private _scrollShadowListener(): void {
    toggleDatasetEntry(this, 'shadow', this._getCurrentScrollProperty('scrollTop') !== 0);
  }

  private _closeOpenOverlays(): void {
    const overlayTriggers: HTMLElement[] = Array.from(
      this.querySelectorAll(IS_MENU_OPENED_QUERY) as NodeListOf<HTMLElement>,
    );
    for (const overlayTrigger of overlayTriggers) {
      const overlayId: string = overlayTrigger.getAttribute('aria-controls');
      const overlay = document.getElementById(overlayId) as HTMLElement & { close: () => void };
      if (typeof overlay?.close === 'function') {
        overlay.close();
      }
    }
  }

  protected override render(): TemplateResult {
    return html`
      <header class="sbb-header">
        <div class="sbb-header__wrapper">
          <slot></slot>
          <div class="sbb-header__logo">
            <slot name="logo">
              <sbb-logo protective-room="none"></sbb-logo>
            </slot>
          </div>
        </div>
      </header>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-header': SbbHeader;
  }
}
