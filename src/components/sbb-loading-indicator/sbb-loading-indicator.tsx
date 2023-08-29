import { Component, ComponentInterface, h, JSX } from '@stencil/core';

/**
 * @slot unnamed - Use this to document a slot.
 */
@Component({
  shadow: true,
  styleUrl: 'sbb-loading-indicator.scss',
  tag: 'sbb-loading-indicator',
})
export class SbbLoadingIndicator implements ComponentInterface {
  public render(): JSX.Element {
    return (
      <span class="sbb-loading-indicator">
        <span class="sbb-loading-indicator__animated-element"></span>
      </span>
    );
  }
}
