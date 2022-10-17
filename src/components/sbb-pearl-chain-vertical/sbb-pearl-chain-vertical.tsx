import { Component, h, Host } from '@stencil/core';
@Component({
  shadow: true,
  styleUrl: 'sbb-pearl-chain-vertical.scss',
  tag: 'sbb-pearl-chain-vertical',
})
export class SbbPearlChainVertical {
  public render(): JSX.Element {
    return (
      <Host>
        <div class="sbb-pearl-chain-vertical">
          <slot></slot>
        </div>
      </Host>
    );
  }
}
