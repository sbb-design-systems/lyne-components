import { Component, h, JSX, Prop } from '@stencil/core';

/**
 * @slot unnamed - Use this to document a slot.
 */

@Component({
  shadow: true,
  styleUrl: 'sbb-sector.scss',
  tag: 'sbb-sector',
})
export class SbbSector {
  /** Label for the sector */
  @Prop() public label!: string;

  public render(): JSX.Element {
    if (!this.label) return;

    return (
      <div class="sbb-sector">
        <h3>
          <span class="sbb-sector__label">{this.label}</span>
        </h3>
        <div class="sbb-sector__wagons">
          <slot />
        </div>
      </div>
    );
  }
}
