import { Component, ComponentInterface, h, Host, JSX, Prop } from '@stencil/core';

/**
 * @slot unnamed - Slot to render the content.
 */
@Component({
  shadow: true,
  styleUrl: 'sbb-tooltip-trigger.scss',
  tag: 'sbb-tooltip-trigger',
})
export class SbbTooltipTrigger implements ComponentInterface {
  /**
   * The icon name we want to use, choose from the small icon variants
   * from the ui-icons category from here
   * https://lyne.sbb.ch/tokens/icons/.
   */
  @Prop() public iconName = 'circle-information-small';

  /**
   * Whether the tooltip-trigger is disabled
   */
  @Prop({ reflect: true }) public disabled = false;

  public render(): JSX.Element {
    return (
      <Host role="button" aria-disabled={this.disabled}>
        <button class="sbb-tooltip-trigger" disabled={this.disabled}>
          <slot>{this.iconName && <sbb-icon name={this.iconName} />}</slot>
        </button>
      </Host>
    );
  }
}
