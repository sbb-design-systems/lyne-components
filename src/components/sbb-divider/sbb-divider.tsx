import { Component, h, Prop } from '@stencil/core';
import { InterfaceSbbDividerAttributes } from './sbb-divider.custom.d';

/**
 * @slot unnamed - Use this to document a slot.
 */

@Component({
  shadow: true,
  styleUrl: 'sbb-divider.scss',
  tag: 'sbb-divider',
})
export class SbbDivider {
  /** Footer appearance */
  @Prop() public appearance?: InterfaceSbbDividerAttributes['appearance'] = 'primary';

  /** Documentation for someProp */
  @Prop() public orientation?: InterfaceSbbDividerAttributes['orientation'] = 'horizontal';

  public render(): JSX.Element {
    const orientationPositionClass = 'sbb-divider--' + this.orientation;
    const appearanceClass = 'sbb-divider--' + this.appearance;

    return (
      <div
        class={`
          sbb-divider
          ${orientationPositionClass}
          ${appearanceClass}`}
        role="separator"
        aria-orientation={this.orientation}>
      </div>
    );
  }
}
