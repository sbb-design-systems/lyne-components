import { Component, h, JSX, Prop } from '@stencil/core';
import { InterfaceSbbHeaderActionAttributes } from './sbb-header-action.custom';

/**
 * @slot unnamed - Use this to document a slot.
 */

@Component({
  shadow: true,
  styleUrl: 'sbb-header-action.scss',
  tag: 'sbb-header-action',
})
export class SbbHeaderAction {
  @Prop() public isAnchorOrButton: boolean;

  @Prop() public expandFrom: InterfaceSbbHeaderActionAttributes['expandFrom'] = 'medium';

  @Prop() public icon?: string;

  public render(): JSX.Element {
    const TAGNAME = this.isAnchorOrButton ? 'a' : 'button';

    return (
      <TAGNAME href="http://www.sbb.ch" onClick={() => alert('Hello World')}>
        <slot name="icon">
          <sbb-icon name={this.icon}></sbb-icon>
        </slot>
        <slot />
      </TAGNAME>
    );
  }
}
