import {
  Component,
  Element,
  h, Host,
  Prop, State
} from '@stencil/core';

/**
 * @slot unnamed - Use this to document a slot.
 */

@Component({
  shadow: true,
  styleUrls: {
    default: 'styles/sbb-form-field.default.scss',
    shared: 'styles/sbb-form-field.shared.scss'
  },
  tag: 'sbb-form-field'
})

export class SbbFormField {

  private _id: string;

  private _input: HTMLInputElement;

  @State() private _isClearable: boolean;

  @Prop() public clearable?: boolean;

  @Prop() public label: string;

  @Prop() public optional?: boolean;

  @Element() private _element: HTMLElement;

  public componentWillLoad(): void {
    this._element.querySelector('[slot="input"]')
      .setAttribute('id', 'input');

    this._id = this._element.querySelector('[slot="input"]')
      .getAttribute('id');

    this._input = this._element.querySelector('[slot="input"]') as HTMLInputElement;

    this._input.addEventListener('blur', this._setClearableInput.bind(this));
  }

  public disconnectedCallback(): void {
    this._input.removeEventListener('blur', this._setClearableInput.bind(this));
  }

  private _setClearableInput(): void {
    if (this.clearable && this._input.value) {
      this._isClearable = true;
    }
  }

  private _setFocus(): void {
    this._input.focus();
  }

  private _handleClearInput(): void {
    this._input.value = '';
    this._isClearable = false;
  }

  public render(): JSX.Element {
    const optional = this.optional
      ? '(optional)'
      : '';

    const clearable = this._isClearable
      ? <button onClick={() => this._handleClearInput()}>Clear</button>
      : null;

    return (
      <Host>
        <div>
          {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions,
          jsx-a11y/click-events-have-key-events */}
          <label
            onClick={() => this._setFocus()}
            htmlFor={this._id}>
            <slot name='label'>
              <span>{ this.label }</span>
            </slot> {optional}
          </label>
        </div>
        <div>
          <slot name='prefix'></slot>
        </div>
        <div>
          <slot name='input'></slot>
          {clearable}
        </div>
        <div>
          <slot name='suffix'></slot>
        </div>
        <div>
          <slot name='error'></slot>
        </div>
      </Host>
    );
  }
}
