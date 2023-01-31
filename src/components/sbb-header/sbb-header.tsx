import { Component, ComponentInterface, Element, h, JSX, Prop, State } from '@stencil/core';

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

  private _lastScroll = 0;

  /** If `hideOnScroll` is set, checks the element to hook the listener on, and possibly add it.*/
  public componentDidLoad(): void {
    if (typeof this.scrollOrigin === 'string') {
      this._scrollElement = document.getElementById(this.scrollOrigin);
      if (!this._scrollElement) {
        return;
      }
    } else {
      this._scrollElement = this.scrollOrigin;
    }

    const scrollFn: () => void = this.hideOnScroll
      ? this._scrollListener.bind(this)
      : this._scrollShadowListener.bind(this);
    this._scrollElement.addEventListener('scroll', () => scrollFn(), { passive: true });
  }

  /** Sets the correct value for `scrollTop`, then:
   * - apply the shadow if the element/document has been scrolled down;
   * - hides the header, remove the shadow and possibly close any open menu on the header if it is not visible anymore;
   * - shows the header and re-apply the shadow if the element/document has been scrolled up.
   */
  private _scrollListener(): void {
    const currentScroll = this._getCurrentScroll();
    this.shadow = currentScroll !== 0;
    const header = this._element.shadowRoot.firstElementChild as HTMLSbbHeaderElement;
    // check if original header position has been scrolled out
    if (currentScroll > this._element.offsetHeight) {
      this._headerOnTop = false;
      if (currentScroll > 0 && this._lastScroll <= currentScroll) {
        this.shadow = false;
        this._element.style.setProperty(
          '--sbb-header-position',
          '-' + this._element.offsetHeight + 'px'
        );
        (this._element.querySelector('sbb-menu') as HTMLSbbMenuElement)?.close();
      } else {
        this.shadow = true;
        this._element.style.setProperty('--sbb-header-position', '0');
        header.classList.add('sbb-header--animated');
      }
    } else {
      if (currentScroll == 0) {
        this._headerOnTop = true;
      }
      if (this._headerOnTop) {
        this.shadow = false;
        this._element.style.setProperty('--sbb-header-position', '-' + currentScroll + 'px');
        header.classList.remove('sbb-header--animated');
      }
    }
    this._lastScroll = currentScroll <= 0 ? 0 : currentScroll; // For Mobile or negative scrolling
  }

  /** Sets the correct value for `scrollTop`, then apply the shadow if the element/document has been scrolled down; */
  private _scrollShadowListener(): void {
    this.shadow = this._getCurrentScroll() !== 0;
  }

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
