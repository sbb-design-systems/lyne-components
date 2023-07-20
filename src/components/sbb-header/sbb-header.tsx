import { Component, ComponentInterface, Element, h, JSX, Prop, State, Watch } from '@stencil/core';
import { findReferencedElement, toggleDatasetEntry } from '../../global/dom';

const IS_MENU_OPENED_QUERY = "[aria-controls][aria-expanded='true']";

/**
 * @slot unnamed - Slot used to render the actions on the left side.
 * @slot logo - Slot used to render the logo on the right side (sbb-logo as default).
 */

@Component({
  shadow: true,
  styleUrl: 'sbb-header.scss',
  tag: 'sbb-header',
})
export class SbbHeader implements ComponentInterface {
  /**
   * Whether to allow the header content to stretch to full width.
   * By default, the content has the appropriate page size.
   */
  @Prop({ reflect: true }) public expanded = false;

  /** The element's id or the element on which the scroll listener is attached. */
  @Prop() public scrollOrigin: string | HTMLElement | Document = document;

  /** Whether the header should hide and show on scroll. */
  @Prop({ reflect: true }) public hideOnScroll = false;

  @State() private _headerOnTop = true;

  @Element() private _element!: HTMLElement;

  private _scrollElement: HTMLElement | Document;

  private _scrollEventsController: AbortController;

  private _scrollFunction: () => void;

  private _lastScroll = 0;

  @Watch('scrollOrigin')
  public watchScrollOrigin(
    newValue: string | HTMLElement | Document,
    oldValue: string | HTMLElement | Document,
  ): void {
    if (newValue !== oldValue) {
      this._scrollEventsController?.abort();
      this._setListenerOnScrollElement(newValue);
      const currentScroll = this._getCurrentScroll();
      // `currentScroll` can be negative, e.g. on mobile; this is not allowed.
      this._lastScroll = currentScroll <= 0 ? 0 : currentScroll;
    }
  }

  /** If `hideOnScroll` is set, checks the element to hook the listener on, and possibly add it.*/
  public connectedCallback(): void {
    this._setListenerOnScrollElement(this.scrollOrigin);
  }

  /** Removes the scroll listener, if previously attached. */
  public disconnectedCallback(): void {
    this._scrollEventsController?.abort();
  }

  /** Sets the value of `_scrollElement` and `_scrollFunction` and possibly adds the function on the correct element. */
  private _setListenerOnScrollElement(scrollOrigin: string | HTMLElement | Document): void {
    this._scrollEventsController = new AbortController();
    this._scrollElement = this._getScrollElement(scrollOrigin);
    this._scrollFunction = this._getScrollFunction.bind(this);
    this._scrollElement?.addEventListener('scroll', this._scrollFunction, {
      passive: true,
      signal: this._scrollEventsController.signal,
    });
  }

  /** Returns the element to attach the listener to. */
  private _getScrollElement(scrollOrigin: string | HTMLElement | Document): HTMLElement | Document {
    return findReferencedElement(scrollOrigin as string | HTMLElement) || document;
  }

  /** Returns the correct function to attach on scroll. */
  private _getScrollFunction(): void {
    return this.hideOnScroll ? this._scrollListener() : this._scrollShadowListener();
  }

  /** Return the correct scroll element. */
  private _getScrollDocumentElement(): HTMLElement {
    if (this._scrollElement instanceof Document) {
      return this._scrollElement.documentElement || this._scrollElement.body;
    }
    return this._scrollElement;
  }

  /** Calculates the correct scrollTop value based on the value of `_scrollElement`. */
  private _getCurrentScroll(): number {
    return this._getScrollDocumentElement().scrollTop;
  }

  /**
   * Sets the correct value for `scrollTop`, then:
   * - apply the shadow if the element/document has been scrolled down;
   * - hides the header, remove the shadow and possibly close any open menu on the header if it is not visible anymore;
   * - shows the header and re-apply the shadow if the element/document has been scrolled up.
   */
  private _scrollListener(): void {
    const currentScroll = this._getCurrentScroll();

    // Whether the scroll view is bouncing past the edge of content and back again.
    if (this._getScrollDocumentElement().scrollHeight - window.innerHeight - currentScroll <= 0) {
      return;
    }

    toggleDatasetEntry(this._element, 'shadow', currentScroll !== 0);

    // Close open overlays when scrolling down if the header is scrolled out of sight.
    if (
      currentScroll > this._element.offsetHeight &&
      currentScroll > 0 &&
      this._lastScroll < currentScroll
    ) {
      this._closeOpenOverlays();
    }
    // Check if header is scrolled out of sight, scroll position > header height * 2.
    if (currentScroll > this._element.offsetHeight * 2) {
      this._headerOnTop = false;
      if (currentScroll > 0 && this._lastScroll < currentScroll) {
        // Scrolling down
        toggleDatasetEntry(this._element, 'shadow', false);
        toggleDatasetEntry(this._element, 'visible', false);
      } else {
        // Scrolling up
        toggleDatasetEntry(this._element, 'fixed', true);
        toggleDatasetEntry(this._element, 'shadow', true);
        toggleDatasetEntry(this._element, 'animated', true);
        toggleDatasetEntry(this._element, 'visible', true);
      }
    } else {
      // Check if header in its original position, scroll position < header height.
      // Reset header behaviour when scroll hits top of the page, on scroll position = 0.
      if (currentScroll === 0) {
        this._headerOnTop = true;
      }
      if (this._headerOnTop) {
        toggleDatasetEntry(this._element, 'shadow', false);
        toggleDatasetEntry(this._element, 'animated', false);
        toggleDatasetEntry(this._element, 'fixed', false);
        toggleDatasetEntry(this._element, 'visible', false);
      }
    }
    // `currentScroll` can be negative, e.g. on mobile; this is not allowed.
    this._lastScroll = currentScroll <= 0 ? 0 : currentScroll;
  }

  /** Apply the shadow if the element/document has been scrolled down. */
  private _scrollShadowListener(): void {
    toggleDatasetEntry(this._element, 'shadow', this._getCurrentScroll() !== 0);
  }

  private _closeOpenOverlays(): void {
    const overlayTriggers: HTMLElement[] = Array.from(
      this._element.querySelectorAll(IS_MENU_OPENED_QUERY) as NodeListOf<HTMLElement>,
    );
    for (const overlayTrigger of overlayTriggers) {
      const overlayId: string = overlayTrigger.getAttribute('aria-controls');
      const overlay = document.getElementById(overlayId) as HTMLElement & { close: () => void };
      if (typeof overlay?.close === 'function') {
        overlay.close();
      }
    }
  }

  public render(): JSX.Element {
    return (
      <header class="sbb-header">
        <div class="sbb-header__wrapper">
          <slot />
          <div class="sbb-header__logo">
            <slot name="logo">
              <sbb-logo protective-room="none" />
            </slot>
          </div>
        </div>
      </header>
    );
  }
}
