import { Component, h, JSX, Prop } from '@stencil/core';
import { InterfaceSbbTrainAttributes } from './sbb-train.custom.d';

/**
 * @slot unnamed - Use this to document a slot.
 */

@Component({
  shadow: true,
  styleUrl: 'sbb-train.scss',
  tag: 'sbb-train',
})
export class SbbTrain {
  /** Documentation for someProp */
  @Prop()
  public someProp?: InterfaceSbbTrainAttributes['someInterface'];


  public render(): JSX.Element {
    return (
      <div class="some-class">
        {this.someProp}
      </div>
    );
  }
}
