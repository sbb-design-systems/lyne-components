import { Component, ComponentInterface, h, JSX, Prop } from '@stencil/core';

/**
 * @slot unnamed - Use this to document a slot.
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

  public render(): JSX.Element {
    return (
      <button class="sbb-tooltip-trigger" tabindex="0">
        <slot>
          <sbb-icon name={this.iconName} />
        </slot>
      </button>
    );
  }
}
