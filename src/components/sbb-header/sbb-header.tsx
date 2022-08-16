import { Component, h, Listen, Prop, State } from '@stencil/core';

/**
 * @slot unnamed - Use this to document a slot.
 */

@Component({
  shadow: true,
  styleUrl: 'sbb-header.scss',
  tag: 'sbb-header',
})
export class SbbHeader {
  @Prop() public shadow: boolean;

  /** @internal */
  @State() private _isScrolled: boolean;

  @Listen('scroll', { target: 'window' })
  public handleScroll(): void {
    this._isScrolled = window.scrollY !== 0;
  }

  public render(): JSX.Element {
    return (
      <div class={{ 'sbb-header': true, 'sbb-header--shadow': this.shadow && this._isScrolled }}>
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
      </div>
    );
  }
}
