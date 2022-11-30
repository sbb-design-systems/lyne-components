import { Component, h, Host, JSX, Prop } from '@stencil/core';

/**
 * @slot label - Use this to provide a label element.
 * @slot unnamed - Use this to provide content for sbb-navigation-list
 */

@Component({
  shadow: true,
  styleUrl: 'sbb-navigation-list.scss',
  tag: 'sbb-navigation-list',
})
export class SbbNavigationList {
  @Prop()
  public label?: string;

  public render(): JSX.Element {
    return (
      <Host class="sbb-navigation-list">
        <slot name="label" />
        <slot />
      </Host>
    );
  }
}
