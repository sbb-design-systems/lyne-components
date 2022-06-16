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
    default: 'styles/sbb-tab-amount.default.scss',
    shared: 'styles/sbb-tab-amount.shared.scss'
  },
  tag: 'sbb-tab-amount'
})

export class SbbTabAmount {
  public render(): JSX.Element {
    return (
      <Host slot='sbb-tab-amount'>
        <span class='tab-amount'><slot/></span>
      </Host>
    );
  }
}
