import { Component, h, Host, JSX, Prop } from '@stencil/core';

/**
 * @slot label - Use this to provide a label element.
 * @slot unnamed - Use this to provide content for  sbb-navigation-section
 */

@Component({
  shadow: true,
  styleUrl: 'sbb-navigation-section.scss',
  tag: 'sbb-navigation-section',
})
export class SbbNavigationSection {
  @Prop()
  public label?: string;

  public render(): JSX.Element {
    return (
      <Host>
        <slot name="label" />
        <slot />
      </Host>
    );
  }
}
