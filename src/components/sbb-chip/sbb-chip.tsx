import { Component, ComponentInterface, h, JSX, Prop } from '@stencil/core';
import { InterfaceSbbChipAttributes } from './sbb-chip.custom.d';

/**
 * @slot unnamed - Content / Label of the chip
 */
@Component({
  shadow: true,
  styleUrl: 'sbb-chip.scss',
  tag: 'sbb-chip',
})
export class SbbChip implements ComponentInterface {
  /** Size of the chip. */
  @Prop({ reflect: true })
  public size: InterfaceSbbChipAttributes['size'] = 'xxs';

  /** Color of the chip. */
  @Prop({ reflect: true })
  public color: InterfaceSbbChipAttributes['color'] = 'milk';

  public render(): JSX.Element {
    return (
      <span class="sbb-chip">
        <span class="sbb-chip__text-wrapper">
          <slot></slot>
        </span>
      </span>
    );
  }
}
