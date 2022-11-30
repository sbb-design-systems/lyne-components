import { Component, h, Host, JSX, Prop } from '@stencil/core';

/**
 * @slot unnamed - Use this slot to project anything into the sbb-navigation-marker.
 */

@Component({
  shadow: true,
  styleUrl: 'sbb-navigation-marker.scss',
  tag: 'sbb-navigation-marker',
})
export class SbbNavigationMarker {
  /** Marker size variant */
  @Prop()
  public size?: 'l' | 's' = 'l';

  public render(): JSX.Element {
    return (
      <Host>
        <slot />
      </Host>
    );
  }
}
