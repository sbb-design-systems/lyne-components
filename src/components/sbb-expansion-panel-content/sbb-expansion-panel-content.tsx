import { Component, ComponentInterface, h, Host, JSX, Prop } from '@stencil/core';

/**
 * @slot unnamed - Slot to render the content in the sbb-expansion-panel.
 */
@Component({
  shadow: true,
  styleUrl: 'sbb-expansion-panel-content.scss',
  tag: 'sbb-expansion-panel-content',
})
export class SbbExpansionPanelContent implements ComponentInterface {
  /** Sets the `aria-hidden` attribute on panel when it's collapsed. */
  @Prop() public expanded: boolean;

  public render(): JSX.Element {
    return (
      <Host slot="content" role="region" aria-hidden={String(!this.expanded)}>
        <div class="sbb-expansion-panel-content">
          <slot></slot>
        </div>
      </Host>
    );
  }
}
