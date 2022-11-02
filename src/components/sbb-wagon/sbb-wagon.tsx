import { Component, h, JSX, Prop } from '@stencil/core';
import { InterfaceSbbWagonAttributes } from './sbb-wagon.custom.d';

/**
 * @slot unnamed - Use this to document a slot.
 */

@Component({
  shadow: true,
  styleUrl: 'sbb-wagon.scss',
  tag: 'sbb-wagon',
})
export class SbbWagon {
  /** Documentation for someProp */
  @Prop()
  public someProp?: InterfaceSbbWagonAttributes['someInterface'];


  public render(): JSX.Element {
    return (
      <div>
        {this.someProp}
      </div>
    );
  }
}
