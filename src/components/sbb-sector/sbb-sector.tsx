import { Component, h, JSX, Prop } from '@stencil/core';
import { InterfaceSbbSectorAttributes } from './sbb-sector.custom.d';

/**
 * @slot unnamed - Use this to document a slot.
 */

@Component({
  shadow: true,
  styleUrl: 'sbb-sector.scss',
  tag: 'sbb-sector',
})
export class SbbSector {
  /** Documentation for someProp */
  @Prop()
  public someProp?: InterfaceSbbSectorAttributes['someInterface'];


  public render(): JSX.Element {
    return (
      <div class="some-class">
        {this.someProp}
      </div>
    );
  }
}
