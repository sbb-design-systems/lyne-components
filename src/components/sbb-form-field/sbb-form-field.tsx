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
   *
   * It is used internally to get the native `disabled` attribute from `<input>`.
   */
  @State() private _disabled: boolean;

  /**
   *
   * It is used internally to get the `prefix` slot.
   */
  @State() private _prefixElement: Element[] = [];

  /**
   *
   * It is used internally to get the native `readonly` attribute from `<input>`.
   */
  @State() private _readonly: boolean;

  /**
   *
   * It is used internally to get the `suffix` slot.
   */
  @State() private _suffixElement: Element[] = [];

  /**
   * The internal `<sbb-form-field>` element.
   */
  @Element() private _element: HTMLElement;

  /**
   *
   * It is used internally to set the `aria-describedby` attribute into the `input` whether the `<sbb-form-error>` is present.
   */
  private _idError: string;

  /**
   *
   * It is used internally to get the `input` slot.
   */
  private _input: HTMLInputElement | HTMLSelectElement | HTMLElement;

  /**
   *
   * Listen the changes on `readonly` and `disabled` attributes of `<input>`.
   */
  private _formFieldAttributeObserver = new MutationObserver(() => this._onAttributesChange);

  public disconnectedCallback(): void {
    this._formFieldAttributeObserver.disconnect();
  }

  /**
   * @private
   * It is used internally to set the aria-describedby attribute into the input whether the <sbb-form-error> is present.
   */
  private _onSlotErrorChange(event: Event): void {
    this._idError = (event.target as HTMLSlotElement).assignedElements()[0]?.id;
    if (this._idError) {
      this._element.querySelector('[slot="input"]').setAttribute('aria-describedby', this._idError);
    }
  }

  /**
   * @private
   * It is used internally to assign the attributes of `<input>` to `_id` and `_input` and to observe the native readonly and disabled attributes.
   */
  private _onSlotInputChange(event: Event): void {
    this._input = (event.target as HTMLSlotElement).assignedElements()[0] as HTMLElement;

    this._readonly = this._input.hasAttribute('readonly');
    this._disabled = this._input.hasAttribute('disabled');

    this._formFieldAttributeObserver.observe(this._input, {
      attributes: true,
      attributeFilter: ['readonly', 'disabled'],
    });

    if (!this._input.id) {
      this._input.id = `sbb-form-field-input-${nextId++}`;
    }

    this._input.classList.add(`form-field--size-${this.size}`);
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

    const cssClass = `input-wrapper form-field--error-space-${this.errorSpace} form-field--size-${
      this.size
    } ${this._prefixElement.length > 0 ? 'form--prefix' : ''} 
    ${this._suffixElement.length ? 'form--suffix' : ''} ${this._readonly ? 'form--readonly' : ''} ${
      this._disabled ? 'form--disabled' : ''
    }`;

    return (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
      <div onClick={this._setFocus.bind(this)} class={cssClass}>
        <label class="input-label" htmlFor={this._input?.id}>
          <slot name="label">
            <span>{this.label}</span>
          </slot>
          &nbsp;{optional}
        </label>
        <div>
          <slot
            name="prefix"
            onSlotchange={(event) =>
              (this._prefixElement = (event.target as HTMLSlotElement).assignedElements())
            }
          ></slot>
        </div>
        <div>
          <slot name="input" onSlotchange={(event) => this._onSlotInputChange(event)}></slot>
        </div>
        <div>
          <slot
            name="suffix"
            onSlotchange={(event) =>
              (this._suffixElement = (event.target as HTMLSlotElement).assignedElements())
            }
          ></slot>
        </div>
        <div>
          <slot name="error" onSlotchange={(event) => this._onSlotErrorChange(event)}></slot>
        </div>
      </div>
    );
  }
}
