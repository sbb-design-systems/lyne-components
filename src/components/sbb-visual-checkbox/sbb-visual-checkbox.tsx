import { Component, ComponentInterface, Element, h, JSX, Prop } from '@stencil/core';
import { isValidAttribute } from '../../global/dom';

@Component({
  shadow: true,
  styleUrl: 'sbb-visual-checkbox.scss',
  tag: 'sbb-visual-checkbox',
})
export class SbbVisualCheckbox implements ComponentInterface {
  /** Checked state. */
  @Prop({ reflect: true }) public checked: boolean;

  /** Disabled state. */
  @Prop({ reflect: true }) public disabled: boolean;

  /** Indeterminate state. */
  @Prop({ reflect: true }) public indeterminate = false;

  /** Negative coloring variant flag. */
  @Prop({ reflect: true, mutable: true }) public negative = false;

  @Element() private _element!: HTMLElement;

  public connectedCallback(): void {
    const parent = this._element.closest('sbb-option') as HTMLElement;
    if (parent) {
      this.negative = isValidAttribute(parent, 'negative');
    }
  }

  public render(): JSX.Element {
    return (
      <span class="sbb-visual-checkbox">
        <span class="sbb-visual-checkbox__icon">
          {(this.checked || this.indeterminate) && (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d={this.indeterminate ? 'M9 12H15' : 'M8 12.3304L10.4615 15L16 9'}
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          )}
        </span>
      </span>
    );
  }
}
