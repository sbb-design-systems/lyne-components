import { Component, Element, h, Prop, State } from '@stencil/core';
import { InterfaceSbbFormFieldAttributes } from './sbb-form-field.custom';
import { AgnosticMutationObserver as MutationObserver } from '../../global/helpers/mutation-observer';

let nextId = 0;

/**
 * @slot label - Slot to render a label.
 * @slot prefix - Slot to render an icon on the left side of the input.
 * @slot input - Slot to render an input.
 * @slot suffix - Slot to render an icon on ther right side of the input.
 * @slot error - Slot to render an error.
 */
@Component({
  shadow: true,
  styleUrl: './sbb-form-field.scss',
  tag: 'sbb-form-field',
})
export class SbbFormField {
  /**
   * Add a specific space if the `<sbb-error>` is present.
   */
  @Prop() public errorSpace?: InterfaceSbbFormFieldAttributes['errorSpace'] = 'default';

  /**
   * Add a `<label>` for the input.
   */
  @Prop() public label: string;

  /**
   * Indicates whether the input is optional.
   */
  @Prop() public optional?: boolean;

  /**
   * Size variant, either l or m.
   */
  @Prop() public size?: InterfaceSbbFormFieldAttributes['size'] = 'l';

  /**
   * @internal
   * It is used internally to get the native `readonly` attribute from `<input>`.
   */
  @State() private _readonly: boolean;

  /**
   * @internal
   * It is used internally to get the native `disabled` attribute from `<input>`.
   */
  @State() private _disabled: boolean;

  /**
   * The internal `<sbb-form-field>` element.
   */
  @Element() private _element: HTMLElement;

  /**
   * @internal
   * It is used internally to set the `for` attribute of the `<label>`.
   */
  private _id: string;

  /**
   * @internal
   * It is used internally to set the `aria-describedby` attribute into the `input` whether the `<sbb-form-error>` is present.
   */
  private _idError: string;

  /**
   * @internal
   * It is used internally to get the `input` slot.
   */
  private _input: HTMLInputElement;

  /**
   * @internal
   * Listen the changes on `readonly` and `disabled` attributes of `<input>`.
   */
  private _formFieldAttributeObserver = new MutationObserver(this._onAttributesChange.bind(this));

  public componentWillLoad(): void {
    this._idError = this._element?.querySelector('[slot="error"]')?.getAttribute('id');
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

  /**
   * @private
   * It is used internally to assign the attributes of `<input>` to `_id` and `_input`.
   */
  private _onSlotInputChange(): void {
    if (!this._element?.querySelector('[slot="input"]')?.getAttribute('id')) {
      this._element
        .querySelector('[slot="input"]')
        .setAttribute('id', `sbb-form-field-input-${nextId++}`);
    }

    const inputCssClass = this._element?.querySelector('[slot="input"]')?.getAttribute('class');

    this._element
      .querySelector('[slot="input"]')
      .setAttribute('class', `${inputCssClass} form-field--size-${this.size}`);

    this._id = this._element.querySelector('[slot="input"]').getAttribute('id');

    this._input = this._element.querySelector('[slot="input"]') as HTMLInputElement;
  }

  /**
   * @private
   * It is used internally to set the focus in the `<input>`.
   */
  private _setFocus(): void {
    this._input.focus();
  }

  /**
   * @param mutationsList The list of the attributes
   * @private
   * It is used internally to bind on the `MutationObserver`.
   */
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
    const cssClassErrorSpace = `form-field--error-space-${this.errorSpace}`;
    const cssSizeClass = `form-field--size-${this.size}`;
    const cssClassSlotPrefix = this._element.querySelector('[slot="prefix"]') ? 'form--prefix' : '';
    const cssClassSlotSuffix = this._element.querySelector('[slot="suffix"]') ? 'form--suffix' : '';
    const cssClassReadonly = this._readonly ? 'form--readonly' : '';
    const cssClassDisabled = this._disabled ? 'form--disabled' : '';
    const cssClass = `input-wrapper ${cssClassErrorSpace} ${cssSizeClass} ${cssClassSlotPrefix} ${cssClassSlotSuffix} ${cssClassReadonly} ${cssClassDisabled}`;
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
