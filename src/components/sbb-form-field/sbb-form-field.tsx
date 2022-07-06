import { Component, Element, h, Prop, State } from '@stencil/core';
import { InterfaceSbbFormFieldAttributes } from './sbb-form-field.custom';
import { AgnosticMutationObserver as MutationObserver } from '../../global/helpers/mutation-observer';

let nextId = 0;

/**
 * @slot label - Use this to document a slot.
 * @slot prefix - Use this to document a slot.
 * @slot input - Use this to document a slot.
 * @slot suffix - Use this to document a slot.
 * @slot error - Use this to document a slot.
 */
@Component({
  shadow: true,
  styleUrls: {
    default: 'styles/sbb-form-field.default.scss',
    shared: 'styles/sbb-form-field.shared.scss',
  },
  tag: 'sbb-form-field',
})
export class SbbFormField {
  private _id: string;

  private _idError: string;

  private _input: HTMLInputElement;

  private _formFieldAttributeObserver = new MutationObserver(this._onAttributesChange.bind(this));

  @Prop() public errorSpace?: InterfaceSbbFormFieldAttributes['errorSpace'] = 'default';

  @Prop() public label: string;

  @Prop() public optional?: boolean;

  @State() private _readonly: boolean;

  @State() private _disabled: boolean;

  @Element() private _element: HTMLElement;

  public componentWillLoad(): void {
    this._idError = this._element.querySelector('[slot="error"]')?.getAttribute('id');
    if (this._idError) {
      this._element.querySelector('[slot="input"]').setAttribute('aria-describedby', this._idError);
    }

    const input = this._element.querySelector('[slot="input"]');
    this._readonly = input.hasAttribute('readonly');
    this._disabled = input.hasAttribute('disabled');

    this._formFieldAttributeObserver.observe(input, {
      attributes: true,
      attributeFilter: ['readonly', 'disabled'],
    });
  }

  public disconnectedCallback(): void {
    this._formFieldAttributeObserver.disconnect();
  }

  private _onSlotInputChange(): void {
    if (!this._element.querySelector('[slot="input"]').getAttribute('id')) {
      this._element
        .querySelector('[slot="input"]')
        .setAttribute('id', `sbb-form-field-input-${nextId++}`);
    }

    this._id = this._element.querySelector('[slot="input"]').getAttribute('id');

    this._input = this._element.querySelector('[slot="input"]') as HTMLInputElement;
  }

  private _setFocus(): void {
    this._input.focus();
  }

  private _onAttributesChange(mutationsList: MutationRecord[]): void {
    for (const mutationRecord of mutationsList) {
      if (mutationRecord.type !== 'attributes') {
        return;
      }
      const inputEl = mutationRecord.target as HTMLInputElement;
      this._disabled = inputEl.hasAttribute('disabled');
      this._readonly = inputEl.hasAttribute('readonly');
    }
  }

  public render(): JSX.Element {
    const optional = this.optional ? '(optional)' : '';
    const cssClassErrorSpace = this.errorSpace;
    const cssClassSlotPrefix = this._element.querySelector('[slot="prefix"]') ? 'form--prefix' : '';
    const cssClassSlotSuffix = this._element.querySelector('[slot="suffix"]') ? 'form--suffix' : '';
    const cssClassReadonly = this._readonly ? 'form--readonly' : '';
    const cssClassDisabled = this._disabled ? 'form--disabled' : '';
    const cssClass = `input-wrapper ${cssClassErrorSpace} ${cssClassSlotPrefix} ${cssClassSlotSuffix} ${cssClassReadonly} ${cssClassDisabled}`;
    return (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
      <div onClick={this._setFocus.bind(this)} class={cssClass}>
        <label class="input-label" htmlFor={this._id}>
          <slot name="label">
            <span>{this.label}</span>
          </slot>
          &nbsp;{optional}
        </label>
        <div>
          <slot name="prefix"></slot>
        </div>
        <div>
          <slot name="input" onSlotchange={this._onSlotInputChange.bind(this)}></slot>
        </div>
        <div>
          <slot name="suffix"></slot>
        </div>
        <div>
          <slot name="error"></slot>
        </div>
      </div>
    );
  }
}
