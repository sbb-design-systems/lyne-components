import {
  Component,
  Element,
  h,
  Prop
} from '@stencil/core';
import { InterfaceSbbFormFieldAttributes } from './sbb-form-field.custom';

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

  private _idError: string;

  private _input: HTMLInputElement;

  @Prop() public errorSpace?: InterfaceSbbFormFieldAttributes['errorSpace'] = 'default';

  @Prop() public label: string;

  @Prop() public optional?: boolean;

  @Element() private _element: HTMLElement;

  public componentWillLoad(): void {
    this._idError = this._element.querySelector('[slot="error"]')
      .getAttribute('id');

    this._element.querySelector('[slot="input"]')
      .setAttribute('aria-describedby', this._idError);
  }

  private _onSlotInputChange(): void {
    this._element.querySelector('[slot="input"]')
      .setAttribute('id', 'input');

    this._id = this._element.querySelector('[slot="input"]')
      .getAttribute('id');

    this._input = this._element.querySelector('[slot="input"]') as HTMLInputElement;
  }

  private _setFocus(): void {
    this._input.focus();
  }

  public render(): JSX.Element {
    const optional = this.optional
      ? ' (optional)'
      : '';

    return (
      // eslint-disable-next-line max-len
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
      <div onClick={this._setFocus.bind(this)} class='input-wrapper'>
        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions,
          jsx-a11y/click-events-have-key-events */}
        <label
          class='input-label'
          onClick={() => this._setFocus()}
          htmlFor={this._id}>
          <slot name='label'>
            <span>{ this.label }</span>
          </slot> {optional}
        </label>
        <div>
          <slot name='prefix'></slot>
        </div>
        <div>
          <slot name='input' onSlotchange={this._onSlotInputChange.bind(this)}></slot>
        </div>
        <div>
          <slot name='suffix'></slot>
        </div>
        <div>
          <slot name='error'></slot>
        </div>
      </div>
    );
  }
}
