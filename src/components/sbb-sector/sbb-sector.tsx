import { Component, h, JSX, Prop } from '@stencil/core';

/**
 * @slot unnamed - Slot for the sbb-wagons. One to maximum 3 wagons are allowed.
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
    return (
      <div class="sbb-sector">
        <h3 class="sbb-sector__label">
          <span class="sbb-sector__sticky-wrapper">{this.label}</span>
        </h3>
        <div class="sbb-sector__wagons">
          <slot />
        </div>
      </div>
    );
  }
}
