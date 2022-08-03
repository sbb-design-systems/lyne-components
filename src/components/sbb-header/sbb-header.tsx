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
      <Host class={this.shadow ? 'sbb-header-shadow--display' : 'sbb-header-shadow--hide'}>
        <slot />
        <slot name="logo">
          <sbb-logo></sbb-logo>
        </slot>
      </Host>
    );
  }
}
