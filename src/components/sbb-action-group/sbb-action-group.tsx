import { Component, h, JSX, Prop } from '@stencil/core';
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
   * Set the slotted `<sbb-action-group>` children's alignment.
   */
  @Prop() public alignGroup: InterfaceSbbActionGroupAttributes['alignGroup'] = 'start';

  /**
   * Overrides the behaviour of `orientation` property.
   */
  @Prop() public horizontalFrom?: InterfaceSbbActionGroupAttributes['horizontalFrom'] = 'medium';

  /**
   * Indicates the orientation of the components inside the `<sbb-action-group>`.
   */
  @Prop({ reflect: true }) public orientation: InterfaceSbbActionGroupAttributes['orientation'] =
    'horizontal';

  public render(): JSX.Element {
    return (
      <div class={`action-group action-group--align-${this.alignGroup}`}>
        <slot />
      </div>
    );
  }
}
