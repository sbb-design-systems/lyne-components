import { Component, h, JSX } from '@stencil/core';
@Component({
  shadow: true,
  styleUrl: 'sbb-pearl-chain-vertical.scss',
  tag: 'sbb-pearl-chain-vertical',
})

/**
 * @slot unnamed - for <sbb-pearl-chain-vertical-item /> component
 */
export class SbbPearlChainVertical {
  public render(): JSX.Element {
    return (
      <div class="sbb-pearl-chain-vertical">
        <slot></slot>
      </div>
    );
  }
}
