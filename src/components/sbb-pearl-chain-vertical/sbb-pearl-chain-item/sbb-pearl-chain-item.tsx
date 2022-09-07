import { Component, h, Host, Prop } from "@stencil/core";
import { PearlChainItemAttributes } from "./sbb-pearl-chain-item.custom.s";

@Component({
  shadow: true,
  styles: 'sbb-pearl-chain-item.scss',
  tag: 'sbb-pearl-chain-item',
})

export class SbbPearlChainItem {
  @Prop() public pearChainItemAttributes: PearlChainItemAttributes;

  public render(): JSX.Element {
    return (
      <Host style={{ display: "table-row" }} class="pearl-chain-item__row">
        <div style={{ display: "table-cell" }} class="pearl-chain-item__row-left">
          <div class="pearl-chain-item__left-slot"><slot name="left" /></div>
        </div>
        <div style={{ display: "table-cell" }} class="pearl-chain-item__row-middle">
          <div class='pearl-chain-item__line'></div>
          <div class='pearl-chain-item__dot'></div>
        </div>
        <div style={{ display: "table-cell" }} class="pearl-chain-item__row-right">
          <div class="pearl-chain-item__right-slot"><slot name="right" /></div>
        </div>
      </Host>
    );
  }
}