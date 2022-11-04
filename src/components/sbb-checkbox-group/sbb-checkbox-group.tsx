import { Component, h, JSX, Prop } from '@stencil/core';

/**
 * @slot unnamed - Use this to document a slot.
 */

@Component({
  shadow: true,
  styleUrl: 'sbb-checkbox-group.scss',
  tag: 'sbb-checkbox-group',
})
export class SbbCheckboxGroup {

  /** Documentation for someProp */
  @Prop() public disabled: boolean;

  @Prop() public required: boolean;

  public render(): JSX.Element {
    return (
      <div>
        <slot />
      </div>
    );
  }
}
