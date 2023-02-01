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
  public componentDidLoad(): void {
    this._setListenerOnScrollElement(this.scrollOrigin);
  }

  private _setListenerOnScrollElement(scrollOrigin): void {
    this._scrollElement = this._getScrollElement(scrollOrigin);
    this._scrollFunction = this._getScrollFunction.bind(this);
    this._scrollElement?.addEventListener('scroll', this._scrollFunction, { passive: true });
  }

  private _getScrollElement(scrollOrigin: string | HTMLElement | Document): HTMLElement | Document {
    if (typeof scrollOrigin === 'string') {
      return document.getElementById(scrollOrigin);
    }
    return scrollOrigin || document;
  }

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
        toggleDatasetEntry(this._element, 'animated', true);
      }
    } else {
      if (currentScroll === 0) {
        this._headerOnTop = true;
      }
      if (this._headerOnTop) {
        this.shadow = false;
        this._element.style.setProperty('--sbb-header-position', '-' + currentScroll + 'px');
        toggleDatasetEntry(this._element, 'animated', false);
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
