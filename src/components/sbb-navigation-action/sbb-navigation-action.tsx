import { Component, h, Host, JSX, Prop } from '@stencil/core';

/**
 * @slot unnamed - Use this to document a slot.
 */

@Component({
  shadow: true,
  styleUrl: 'sbb-navigation-action.scss',
  tag: 'sbb-navigation-action',
})
export class SbbNavigationAction {
  @Prop()
  public size?: 'l' | 'm' | 's' = 'l';

  @Prop()
  public label?: string;

  public render(): JSX.Element {
    return <Host></Host>;
  }
}
