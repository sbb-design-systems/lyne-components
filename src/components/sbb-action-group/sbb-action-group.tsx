import { Component, h, Host, JSX, Prop } from '@stencil/core';
import { InterfaceSbbActionGroupAttributes } from './sbb-action-group.custom';

/**
 * @slot unnamed - Use this to document a slot.
 */

@Component({
  shadow: true,
  styleUrl: 'sbb-action-group.scss',
  tag: 'sbb-action-group',
})
export class SbbActionGroup {

  @Prop() public orientation: InterfaceSbbActionGroupAttributes['orientation'] = 'horizontal';
  
  @Prop() public horizontalFrom?: InterfaceSbbActionGroupAttributes['horizontalFrom'] = 'medium';
  
  @Prop() public align: InterfaceSbbActionGroupAttributes['align'] = 'start';
  
  public render(): JSX.Element {
    return (
      <Host slot='action-group'>
        <slot />
      </Host>
    );
  }
}
