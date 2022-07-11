import { Component, h, Host } from '@stencil/core';

/**
 * @slot unnamed - Slot to render an amount next to a tab label.
 */

@Component({
  shadow: true,
  styleUrl: 'sbb-tab-amount.scss',
  tag: 'sbb-tab-amount',
})
export class SbbTabAmount {
  public render(): JSX.Element {
    return (
      <Host slot="sbb-tab-amount">
        <span class="tab-amount">
          <slot />
        </span>
      </Host>
    );
  }
}
