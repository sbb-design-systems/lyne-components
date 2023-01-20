import { Component, Element, h, JSX, Prop } from '@stencil/core';

/**
 * @slot unnamed - Slot used to render the actions on the left side.
 * @slot logo - Slot used to render the logo on the right side (sbb-logo as default).
 */

@Component({
  shadow: true,
  styleUrl: 'sbb-header.scss',
  tag: 'sbb-header',
})
export class SbbHeader {
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

  @Element() private _element!: HTMLElement;

  private _scrollElement: HTMLElement | Document;

  private _lastScrollTop = 0;

  /** If `hideOnScroll` is set, checks the element to hook the listener on, and possibly add it.*/
  public componentDidLoad(): void {
    if (this.hideOnScroll) {
      if (typeof this.scrollOrigin === 'string') {
        this._scrollElement = document.getElementById(this.scrollOrigin);
        if (!this._scrollElement) {
          return;
        }
      } else {
        this._scrollElement = this.scrollOrigin;
      }
      this._scrollElement.addEventListener('scroll', this._scrollListener.bind(this), {
        passive: true,
      });
    }
  }

  /** Sets the correct value for `scrollTop`, then:
   * - apply the shadow if the element/document has been scrolled down;
   * - hides the header, remove the shadow and possibly close any open menu on the header if it is not visible anymore;
   * - shows the header and re-apply the shadow if the element/document has been scrolled up.
   */
  private _scrollListener(): void {
    let scrollTop;
    if (this._scrollElement instanceof window.HTMLElement) {
      scrollTop = Math.round(this._scrollElement.scrollTop);
    } else {
      scrollTop = Math.round(document.documentElement.scrollTop);
    }
    this.shadow = scrollTop !== 0;
    const header = this._element.shadowRoot.firstElementChild;
    // check if original header position has been scrolled out
    if (scrollTop > this._element.offsetHeight) {
      if (scrollTop > this._lastScrollTop) {
        header.classList.add('sbb-header--hidden');
        header.classList.remove('sbb-header--visible');
        (this._element.querySelector('sbb-menu') as HTMLSbbMenuElement)?.close();
        this.shadow = false;
      } else {
        header.classList.add('sbb-header--visible');
        header.classList.remove('sbb-header--hidden');
        this.shadow = true;
      }
      this._lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
    } else {
      if (scrollTop > this._lastScrollTop || scrollTop == 0) {
        header.classList.remove('sbb-header--visible');
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
