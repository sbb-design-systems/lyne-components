import { Component, ComponentInterface, h, Host, JSX } from '@stencil/core';

/**
 * @slot unnamed - Slot to render the content in the sbb-expansion-panel.
 */
@Component({
  shadow: true,
  styleUrl: 'sbb-expansion-panel-content.scss',
  tag: 'sbb-expansion-panel-content',
})
export class SbbExpansionPanelContent implements ComponentInterface {
  public render(): JSX.Element {
    return (
      <Host slot="content" role="region">
        <div class="sbb-expansion-panel-content">
          <slot></slot>
        </div>
      </Host>
    );
  }
}
