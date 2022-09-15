import { Component, h, Host, Prop } from '@stencil/core';
import { PearlChainItemAttributes } from './sbb-pearl-chain-item.custom.d';

@Component({
  shadow: true,
  styleUrl: 'sbb-pearl-chain-item.scss',
  tag: 'sbb-pearl-chain-item',
})
export class SbbPearlChainItem {
  @Prop() public pearlChainItemAttributes: PearlChainItemAttributes;

  public render(): JSX.Element {
    const { dotColor, dotType, lineType, lineColor, hideLine, minHeight } =
      this.pearlChainItemAttributes || {};

    return (
      <Host class="sbb-pearl-chain-item">
        <div class="sbb-pearl-chain-item" style={{ display: 'table-row' }}>
          <div
            class="sbb-pearl-chain-item__row-left"
            style={{ display: 'table-cell', height: minHeight }}
          >
            <div class="sbb-pearl-chain-item__left-slot">
              <slot name="left"></slot>
            </div>
          </div>
          <div class="sbb-pearl-chain-item__row-middle" style={{ display: 'table-cell' }}>
            {!hideLine && (
              <div class={`sbb-pearl-chain-item__line-${lineType} sbb-color__${lineColor}`}></div>
            )}
            <div class={`sbb-pearl-chain-item__dot-${dotType} sbb-color__${dotColor}`}></div>
          </div>
          <div class="sbb-pearl-chain-item__row-right" style={{ display: 'table-cell' }}>
            <slot name="right"></slot>
          </div>
        </div>
      </Host>
    );
  }
}
