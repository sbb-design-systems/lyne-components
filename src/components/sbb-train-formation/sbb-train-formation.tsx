import { Component, h, JSX, Prop } from '@stencil/core';
import { InterfaceSbbTrainFormationAttributes } from './sbb-train-formation.custom.d';

/**
 * @slot unnamed - Use this to document a slot.
 */

@Component({
  shadow: true,
  styleUrl: 'sbb-train-formation.scss',
  tag: 'sbb-train-formation',
})
export class SbbTrainFormation {
  /** Documentation for someProp */
  @Prop()
  public someProp?: InterfaceSbbTrainFormationAttributes['someInterface'];


  public render(): JSX.Element {
    return (
        <slot />
    );
  }
}
