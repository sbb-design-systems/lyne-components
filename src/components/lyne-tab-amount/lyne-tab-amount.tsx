import {
  Component,
  h,
  Host
} from '@stencil/core';

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
  public render(): JSX.Element {
    return (
      <Host slot='lyne-tab-amount'>
        <span class='tab-amount'><slot/></span>
      </Host>
    );
  }
}
