import { Component, Host, h, Prop, State } from '@stencil/core';
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

  /** Whether to display the form field without a border. */
  @Prop() public borderless = false;

  /**
   *
   * It is used internally to get the native `disabled` attribute from `<input>`.
   */
  @State() private _disabled: boolean;

  /**
   *
   * It is used internally to get the native `readonly` attribute from `<input>`.
   */
  @State() private _readonly: boolean;

  /**
   * It is used internally to get the `suffix` slot.
   */
  @State() private _errorElements: Element[] = [];

  /** Whether the input inside the form field is invalid. */
  @State() private _invalid = false;

  private _originalInputAriaDescribedby?: string;

  /**
   * It is used internally to get the `input` slot.
   */
  private _input: HTMLInputElement | HTMLSelectElement | HTMLElement;

  /**
   * Listen the changes on `readonly` and `disabled` attributes of `<input>`.
   */
  private _formFieldAttributeObserver = new MutationObserver((mutations: MutationRecord[]) =>
    this._onAttributesChange(mutations)
  );

  public disconnectedCallback(): void {
    this._formFieldAttributeObserver.disconnect();
  }

  /**
   * It is used internally to set the aria-describedby attribute for the slotted input referencing available <sbb-form-erro> instances.
   */
  private _onSlotErrorChange(event: Event): void {
    this._errorElements = (event.target as HTMLSlotElement).assignedElements();
    const value = this._errorElements.length
      ? this._errorElements.map((e) => e.id).join(',')
      : this._originalInputAriaDescribedby;
    this._input.setAttribute('aria-describedby', value);
  }

  /**
   * It is used internally to assign the attributes of `<input>` to `_id` and `_input` and to observe the native readonly and disabled attributes.
   */
  private _onSlotInputChange(event: Event): void {
    this._input = (event.target as HTMLSlotElement).assignedElements()[0] as HTMLElement;
    this._originalInputAriaDescribedby = this._input.getAttribute('aria-describedby');

    this._readonly = this._input.hasAttribute('readonly');
    this._disabled = this._input.hasAttribute('disabled');

    this._formFieldAttributeObserver.observe(this._input, {
      attributes: true,
      attributeFilter: ['readonly', 'disabled', 'class'],
    });

    if (!this._input.id) {
      this._input.id = `sbb-form-field-input-${nextId++}`;
    }
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
      const list = inputEl.classList;
      this._invalid =
        list.contains('sbb-invalid') ||
        (list.contains('ng-touched') && list.contains('ng-invalid'));
    }
  }

  public render(): JSX.Element {
    return (
      <Host
        class={{
          [`form-field--error-space-${this.errorSpace}`]: true,
          [`form-field--size-${this.size}`]: true,
          'form-field--borderless': this.borderless,
          'form-field--readonly': this._readonly,
          'form-field--disabled': this._disabled,
          'sbb-invalid': this._invalid,
        }}
      >
        <div class="form-field__space-wrapper">
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
          <div onClick={(): void => this._setFocus()} class="form-field__wrapper">
            <slot name="prefix"></slot>

            <div class="form-field__input-container">
              <label class="form-field__label" htmlFor={this._input?.id}>
                <slot name="label">
                  <span>{this.label}</span>
                </slot>
                {this.optional && <span>&nbsp;(optional)</span>}
              </label>
              <div class="form-field__input">
                <slot onSlotchange={(event): void => this._onSlotInputChange(event)}></slot>
              </div>
            </div>

            <slot name="suffix"></slot>
          </div>

          <div
            class={{
              'form-field__error': true,
              'form-field__error--empty': !this._errorElements.length,
            }}
          >
            <slot
              name="error"
              onSlotchange={(event): void => this._onSlotErrorChange(event)}
            ></slot>
          </div>
        </div>
      </Host>
    );
  }
}
