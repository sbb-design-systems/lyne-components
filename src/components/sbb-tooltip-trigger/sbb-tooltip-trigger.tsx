import { Component, ComponentInterface, h, Host, JSX, Prop } from '@stencil/core';

/**
 * @slot unnamed - Use this to document a slot.
 */
@Component({
  shadow: true,
  styleUrl: 'sbb-tooltip-trigger.scss',
  tag: 'sbb-tooltip-trigger',
})
export class SbbTooltipTrigger implements ComponentInterface {
  @Prop() public iconName = 'circle-information-small';

  @Prop({ reflect: true }) public id: string;

  public render(): JSX.Element {
    return (
      <Host>
        <slot>
          <sbb-icon name={this.iconName} />
        </slot>
      </Host>
    );
  }
}
