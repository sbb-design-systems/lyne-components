import { Component, ComponentInterface, h, JSX, Prop } from '@stencil/core';
import { InterfaceSbbGroupAttributes } from './sbb-group.custom.d';

/**
 * @slot unnamed - Content of the group
 */
@Component({
  shadow: true,
  styleUrl: 'sbb-group.scss',
  tag: 'sbb-group',
})
export class SbbGroup implements ComponentInterface {
  /** Background color of the group. */
  @Prop({ reflect: true })
  public color: InterfaceSbbGroupAttributes['color'] = 'white';

  /** Padding variant of the group. */
  @Prop({ reflect: true })
  public padding: InterfaceSbbGroupAttributes['padding'] = 'XXS-XXS';

  public render(): JSX.Element {
    return (
      <div class="sbb-group">
        <slot />
      </div>
    );
  }
}
