import { Component, h, Host, JSX, Prop } from '@stencil/core';
import { InterfaceSbbActionGroupAttributes } from './sbb-action-group.custom';

/**
 * @slot unnamed - Slot to render the content inside the container.
 */

@Component({
  shadow: true,
  styleUrl: 'sbb-action-group.scss',
  tag: 'sbb-action-group',
})
export class SbbActionGroup {
  /**
   * Set the alignment of the components inside the `<sbb-action-group>`.
   */
  @Prop() public align: InterfaceSbbActionGroupAttributes['align'] = 'start';

  /**
   * Overrides the behaviour of `orientation` prop
   */
  @Prop() public horizontalFrom?: InterfaceSbbActionGroupAttributes['horizontalFrom'] = 'medium';

  /**
   * Indicates the orientation of the components inside the `<sbb-action-group>`.
   */
  @Prop() public orientation: InterfaceSbbActionGroupAttributes['orientation'] = 'horizontal';

  public render(): JSX.Element {
    return (
      <Host
        class={{
          [`action-group--align-${this.align}`]: true,
        }}
      >
        <slot />
      </Host>
    );
  }
}
