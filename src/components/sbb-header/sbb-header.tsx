import { Component, h, Host, JSX, Prop } from '@stencil/core';

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

  public render(): JSX.Element {
    return (
      <Host class={this.shadow ? 'sbb-header--shadow--display' : 'sbb-header--shadow--hide'}>
        <div class="sbb-header">
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
      </Host>
    );
  }
}
