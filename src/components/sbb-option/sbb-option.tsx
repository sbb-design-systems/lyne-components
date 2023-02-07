import {Component, ComponentInterface, h, Host, JSX, Prop} from '@stencil/core';

/**
 * @slot unnamed - Use this to document a slot.
 */
@Component({
  shadow: true,
  styleUrl: 'sbb-option.scss',
  tag: 'sbb-option',
})
export class SbbOption implements ComponentInterface {

  /**
   * The icon name we want to use, choose from the small icon variants
   * from the ui-icons category from here
   * https://lyne.sbb.ch/tokens/icons/.
   */
  @Prop() public iconName?: string;

  @Prop() public selected?: boolean;

  @Prop({reflect: true}) public preserveIconSpace? = true;

  public render(): JSX.Element {
    return (
      <Host class={{'preserve-icon-space': this.preserveIconSpace}}>
        <div class="sbb-option"
            role="option"
            aria-selected={this.selected}>
          <span class="sbb-option__icon">
            <slot name="icon">
              {this.iconName && <sbb-icon name={this.iconName} />}
            </slot>
          </span>
          <span>
            <slot></slot>
          </span>
        </div>
      </Host>
    );
  }
}
