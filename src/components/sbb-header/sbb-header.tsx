import { Component, h, JSX, Prop } from '@stencil/core';

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

  /** Whether the header should hide and show on scroll. */
  @Prop({ reflect: true }) public hideonscroll = false;

  private _headerContainer: HTMLElement;

  public componentDidLoad(): void {

    var lastScrollTop = 0;

    document.addEventListener('scroll', () =>{
      this._headerContainer = document.getElementsByTagName('sbb-header')[0];
      if (this.hideonscroll === true && document.documentElement.scrollTop > this._headerContainer.offsetHeight) {
        var st = window.pageYOffset || document.documentElement.scrollTop;
        if (st > lastScrollTop){
          console.log('downscroll');
          this._headerContainer.classList.add('hidden-header');
          this._headerContainer.classList.remove('visible-header');
        } else {
          console.log('upscroll');
          this._headerContainer.classList.add('visible-header');
          this._headerContainer.classList.remove('hidden-header');
        }
        lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
      }

    });

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
