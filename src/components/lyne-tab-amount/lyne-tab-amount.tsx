import {
  Component,
  h,
  Host,
  Prop
} from '@stencil/core';

import { InterfaceLyneTabAmountAttributes } from './lyne-tab-amount.custom.d';

/**
 * @slot unnamed - Use this to document a slot.
 */

@Component({
  shadow: true,
  styleUrls: {
    default: 'styles/lyne-tab-amount.default.scss',
    shared: 'styles/lyne-tab-amount.shared.scss'
  },
  tag: 'lyne-tab-amount'
})

export class LyneTabAmount {

  /** Documentation for someProp */
  @Prop() public someProp?: InterfaceLyneTabAmountAttributes['someInterface'];

  public render(): JSX.Element {
    return (
      <Host slot='lyne-tab-amount'>
        <span part='label-amount' class='tab-amount'><slot/></span>
      </Host>
    );
  }
}
