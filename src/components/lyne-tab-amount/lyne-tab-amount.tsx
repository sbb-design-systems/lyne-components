import {
  Component,
  h,
  Host
} from '@stencil/core';

/**
 * @slot unnamed - Slot to render an amount next to a tab label.
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
