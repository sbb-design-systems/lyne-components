import { Component, ComponentInterface, Element, h, JSX, Prop, State, Watch } from '@stencil/core';
import { toggleDatasetEntry } from '../../global/helpers/dataset';

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
  /** Used to display a box-shadow below the component on y-axis scroll whether set to true. */
  @Prop({ reflect: true }) public shadow = false;

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

  private _scrollFunction: () => void;

  private _lastScroll = 0;

  @Watch('scrollOrigin')
  public watchScrollOrigin(
    newValue: string | HTMLElement | Document,
    oldValue: string | HTMLElement | Document
  ): void {
    this._getScrollElement(oldValue)?.removeEventListener('scroll', this._scrollFunction);
    this._setListenerOnScrollElement(newValue);
    const currentScroll = this._getCurrentScroll();
    this._lastScroll = currentScroll <= 0 ? 0 : currentScroll; // For Mobile or negative scrolling
  }

  /** If `hideOnScroll` is set, checks the element to hook the listener on, and possibly add it.*/
  public connectedCallback(): void {
    this._setListenerOnScrollElement(this.scrollOrigin);
  }

  /** Removes the scroll listener, if previously attached. */
  public disconnectedCallback(): void {
    this._scrollElement?.removeEventListener('scroll', this._scrollFunction);
  }

  /** Sets the value of `_scrollElement` and `_scrollFunction` and possibly adds the function on the correct element. */
  private _setListenerOnScrollElement(scrollOrigin: string | HTMLElement | Document): void {
    this._scrollElement = this._getScrollElement(scrollOrigin);
    this._scrollFunction = this._getScrollFunction.bind(this);
    this._scrollElement?.addEventListener('scroll', this._scrollFunction, { passive: true });
  }

  /** Returns the element to attach the listener to. */
  private _getScrollElement(scrollOrigin: string | HTMLElement | Document): HTMLElement | Document {
    if (typeof scrollOrigin === 'string') {
      return document.getElementById(scrollOrigin);
    }
    return scrollOrigin || document;
  }

  /** Returns the correct function to attach on scroll. */
  private _getScrollFunction(): void {
    return this.hideOnScroll ? this._scrollListener() : this._scrollShadowListener();
  }

  /** Sets the correct value for `scrollTop`, then:
   * - apply the shadow if the element/document has been scrolled down;
   * - hides the header, remove the shadow and possibly close any open menu on the header if it is not visible anymore;
   * - shows the header and re-apply the shadow if the element/document has been scrolled up.
   */
  private _scrollListener(): void {
    const currentScroll = this._getCurrentScroll();
    this.shadow = currentScroll !== 0;
    if (currentScroll > this._element.offsetHeight) {
      // header is scrolled out
      this._headerOnTop = false;
      if (currentScroll > 0 && this._lastScroll < currentScroll) {
        // scrolling down
        this.shadow = false;
        (this._element.querySelector('sbb-menu') as HTMLSbbMenuElement)?.close();
        toggleDatasetEntry(this._element, 'fixedHeader', true);
        toggleDatasetEntry(this._element, 'visibleHeader', false);
      } else {
        // scrolling up
        this.shadow = true;
        toggleDatasetEntry(this._element, 'animated', true);
        toggleDatasetEntry(this._element, 'visibleHeader', true);
      }
    } else {
      // header in its original position
      if (currentScroll === 0) {
        // reset on scrollposition = 0
        this._headerOnTop = true;
      }
      if (this._headerOnTop) {
        this.shadow = false;
        toggleDatasetEntry(this._element, 'animated', false);
        toggleDatasetEntry(this._element, 'fixedHeader', false);
        toggleDatasetEntry(this._element, 'visibleHeader', false);
      }
    }
    this._lastScroll = currentScroll <= 0 ? 0 : currentScroll; // For Mobile or negative scrolling
  }

  /** Sets the correct value for `scrollTop`, then apply the shadow if the element/document has been scrolled down; */
  private _scrollShadowListener(): void {
    this.shadow = this._getCurrentScroll() !== 0;
  }

  /** Calculates the correct scrollTop based on the value of `_scrollElement`. */
  private _getCurrentScroll(): number {
    if (this._scrollElement instanceof Document) {
      return this._scrollElement.documentElement.scrollTop || this._scrollElement.body.scrollTop;
    }
    return this._scrollElement.scrollTop;
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
