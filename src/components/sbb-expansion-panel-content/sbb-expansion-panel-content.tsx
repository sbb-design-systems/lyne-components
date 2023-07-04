import { Component, ComponentInterface, h, Host, JSX, Prop } from '@stencil/core';

/**
 * @slot unnamed - Slot to render the content in the collapsible panel.
 */
@Component({
  shadow: true,
  styleUrl: 'sbb-expansion-panel-content.scss',
  tag: 'sbb-expansion-panel-content',
})
export class SbbExpansionPanelContent implements ComponentInterface {
  /**
   * @internal
   * Used to display the right amount of space when used together
   * with a sbb-expansion-panel-header with `icon-name` set.
   */
  @Prop({ reflect: true }) public iconSpace: boolean;

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
