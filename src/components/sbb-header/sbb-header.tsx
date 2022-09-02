import { Component, JSX, h, Listen, Prop, State } from '@stencil/core';

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
  /**
   * Used to display a box-shadow below the component on y-axis scroll whether set to true.
   */
  @Prop() public shadow: boolean;

  /** @internal */
  @State() private _isScrolled: boolean;

  /**
   * Listen to window scroll to possibly show the box shadow (in combination with `shadow` property)
   */
  @Listen('scroll', { target: 'window' })
  public handleScroll(): void {
    this._isScrolled = window.scrollY !== 0;
  }

  public render(): JSX.Element {
    return (
      <header class={{ 'sbb-header': true, 'sbb-header--shadow': this.shadow && this._isScrolled }}>
        <div class="sbb-header__wrapper">
          <div class="sbb-header__left">
            <slot />
          </div>
          <div class="sbb-header__right">
            <slot name="logo">
              <sbb-logo protectiveRoom="none" />
            </slot>
          </div>
        </div>
      </header>
    );
  }
}
