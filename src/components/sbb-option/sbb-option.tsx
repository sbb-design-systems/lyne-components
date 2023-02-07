import { Component, ComponentInterface, Element, h, Host, JSX, Prop } from '@stencil/core';

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

  /**
   * Wheter the icon space is preserved when no icon is set
   */
  @Prop({ reflect: true }) public preserveIconSpace = true;

  @Element() private _element: HTMLElement;

  private _hasIconSlot: boolean;

  public componentWillLoad(): void {
    this._hasIconSlot = !!this._element.querySelector('[slot="icon"]');
  }

  public render(): JSX.Element {
    return (
      <Host>
        <div class="sbb-option" role="option" aria-selected={this.selected}>
          <span
            class={{
              'sbb-option__icon': true,
              'sbb-option__icon--hidden':
                !this.preserveIconSpace && !this._hasIconSlot && !this.iconName,
            }}
          >
            <slot name="icon">
              {this.iconName && <sbb-icon slot="icon" name={this.iconName} />}
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
