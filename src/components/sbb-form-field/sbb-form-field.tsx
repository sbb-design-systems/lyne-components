import { Component, h, JSX, Prop, State, ComponentInterface, Element, Listen } from '@stencil/core';
import getDocumentLang from '../../global/helpers/get-document-lang';
import { i18nOptional } from '../../global/i18n';
import { InterfaceSbbFormFieldAttributes } from './sbb-form-field.custom';
import { AgnosticMutationObserver as MutationObserver } from '../../global/helpers/mutation-observer';
import {
  createNamedSlotState,
  queryAndObserveNamedSlotState,
  queryNamedSlotState,
} from '../../global/helpers/observe-named-slot-changes';
import { toggleDatasetEntry } from '../../global/helpers/dataset';

let nextId = 0;

/**
 * @slot label - Slot to render a label.
 * @slot prefix - Slot to render an icon on the left side of the input.
 * @slot unnamed - Slot to render an input/select.
 * @slot suffix - Slot to render an icon on the right side of the input.
 * @slot error - Slot to render an error.
 */
@Component({
  shadow: true,
  styleUrl: './sbb-form-field.scss',
  tag: 'sbb-form-field',
})
export class SbbFormField implements ComponentInterface {
  // List of supported element selectors in unnamed slot
  private readonly _supportedInputElements = ['INPUT', 'SELECT', 'SBB-SLIDER'];

  /**
   * Whether to reserve space for an error message.
   * `none` does not reserve any space.
   * `reserve` does reserve one row for an error message.
   */
  @Prop({ reflect: true }) public errorSpace?: InterfaceSbbFormFieldAttributes['errorSpace'] =
    'none';

  /**
   * Label text for the input which is internally rendered as `<label>`.
   */
  @Prop() public label: string;

  /**
   * Indicates whether the input is optional.
   */
  @Prop() public optional?: boolean;

  /**
   * Size variant, either l or m.
   */
  @Prop({ reflect: true }) public size?: InterfaceSbbFormFieldAttributes['size'] = 'm';

  /**
   * Whether to display the form field without a border.
   */
  @Prop({ reflect: true }) public borderless = false;

  /**
   * It is used internally to get the `error` slot.
   */
  @State() private _errorElements: Element[] = [];

  /** State of listed named slots, by indicating whether any element for a named slot is defined. */
  @State() private _namedSlots = createNamedSlotState('label');

  @Element() private _element: HTMLElement;

  /** Original aria-describedby value of the slotted input element. */
  private _originalInputAriaDescribedby?: string;

  /**
   * Get the document language; used for translations.
   */
  private _currentLanguage = getDocumentLang();

  /**
   * It is used internally to get the `input` slot.
   */
  private _input?: HTMLInputElement | HTMLSelectElement | HTMLElement;

  /**
   * Listens to the changes on `readonly` and `disabled` attributes of `<input>`.
   */
  private _formFieldAttributeObserver = new MutationObserver((mutations: MutationRecord[]) => {
    if (mutations.some((m) => m.type === 'attributes')) {
      this._readInputState();
    }
  });

  public connectedCallback(): void {
    this._namedSlots = queryAndObserveNamedSlotState(this._element, this._namedSlots);
  }

  public disconnectedCallback(): void {
    this._formFieldAttributeObserver.disconnect();
  }

  @Listen('sbbNamedSlotChange', { passive: true })
  public handleSlotNameChange(event: CustomEvent<Set<string>>): void {
    this._namedSlots = queryNamedSlotState(this._element, this._namedSlots, event.detail);
  }

  /**
   * It is used internally to set the aria-describedby attribute for the slotted input referencing available <sbb-form-error> instances.
   */
  private _onSlotErrorChange(event: Event): void {
    this._errorElements = (event.target as HTMLSlotElement).assignedElements();
    this._applyAriaDescribedby();
    toggleDatasetEntry(this._element, 'hasError', !!this._errorElements.length);
  }

  /**
   * It is used internally to assign the attributes of `<input>` to `_id` and `_input` and to observe the native readonly and disabled attributes.
   */
  private _onSlotInputChange(event: Event): void {
    this._input = (event.target as HTMLSlotElement)
      .assignedElements()
      .find((e): e is HTMLElement => this._supportedInputElements.includes(e.tagName));

    if (this._input) {
      this._originalInputAriaDescribedby = this._input.getAttribute('aria-describedby');
      this._applyAriaDescribedby();
      this._readInputState();

      this._formFieldAttributeObserver.observe(this._input, {
        attributes: true,
        attributeFilter: ['readonly', 'disabled', 'class'],
      });

      if (!this._input.id) {
        this._input.id = `sbb-form-field-input-${nextId++}`;
      }

      this._element.dataset.inputType = this._input.tagName.toLowerCase();
    }
  }

  private _readInputState(): void {
    toggleDatasetEntry(this._element, 'readonly', this._input.hasAttribute('readonly'));
    toggleDatasetEntry(this._element, 'disabled', this._input.hasAttribute('disabled'));
    toggleDatasetEntry(
      this._element,
      'invalid',
      this._input.classList.contains('sbb-invalid') ||
        (this._input.classList.contains('ng-touched') &&
          this._input.classList.contains('ng-invalid'))
    );
  }

  private _applyAriaDescribedby(): void {
    const value = this._errorElements.length
      ? this._errorElements.map((e) => e.id).join(',')
      : this._originalInputAriaDescribedby;
    this._input?.setAttribute('aria-describedby', value);
  }

  public render(): JSX.Element {
    return (
      <div class="sbb-form-field__space-wrapper">
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
        <div onClick={(): void => this._input?.focus()} class="sbb-form-field__wrapper">
          <slot name="prefix"></slot>

          <div class="sbb-form-field__input-container">
            {(this.label || this._namedSlots.label) && (
              <label class="sbb-form-field__label" htmlFor={this._input?.id}>
                <slot name="label">
                  <span>{this.label}</span>
                </slot>
                {this.optional && (
                  <span aria-hidden="true">&nbsp;{i18nOptional[this._currentLanguage]}</span>
                )}
              </label>
            )}
            <div class="sbb-form-field__input">
              <slot onSlotchange={(event): void => this._onSlotInputChange(event)}></slot>
            </div>
            {this._input?.tagName === 'SELECT' && (
              <sbb-icon
                name="chevron-small-down-small"
                class="sbb-form-field__select-input-icon"
              ></sbb-icon>
            )}
          </div>

          <slot name="suffix"></slot>
        </div>

        <div class="sbb-form-field__error">
          <slot name="error" onSlotchange={(event): void => this._onSlotErrorChange(event)}></slot>
        </div>
      </div>
    );
  }
}
