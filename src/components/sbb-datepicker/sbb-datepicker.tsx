import {
  Component,
  ComponentInterface,
  Element,
  Event,
  EventEmitter,
  h,
  JSX,
  Prop,
  Watch,
} from '@stencil/core';
import { inputElement } from '../../global/helpers/input-element';
import {
  AccessibilityProperties,
  getAccessibilityAttributeList,
} from '../../global/interfaces/accessibility-properties';

const REGEX_PATTERN = /[0-9.,\\/\-\s]{1,10}/;
const REGEX =
  /(^0?[1-9]?|[12]?[0-9]?|3?[01]?)[.,\\/\-\s](0?[1-9]?|1?[0-2]?)?[.,\\/\-\s](\d{1,4}$)?/;

@Component({
  shadow: true,
  styleUrl: 'sbb-datepicker.scss',
  tag: 'sbb-datepicker',
})
export class SbbDatepicker implements ComponentInterface, AccessibilityProperties {
  /** Value for the inner HTMLInputElement. */
  @Prop({ mutable: true }) public value?: string = null;

  /** Date value with the given time for the inner HTMLInputElement. */
  @Prop({ mutable: true }) public valueAsDate?: Date = null;

  /** The <form> element to associate the inner HTMLInputElement with. */
  @Prop() public form?: string;

  /** Readonly state for the inner HTMLInputElement. */
  @Prop() public readonly?: boolean = false;

  /** Disabled state for the inner HTMLInputElement. */
  @Prop({ reflect: true }) public disabled?: boolean = false;

  /** Required state for the inner HTMLInputElement. */
  @Prop() public required?: boolean = false;

  /** This will be forwarded as aria-label to the relevant nested element. */
  @Prop() public accessibilityLabel: string | undefined;

  /** If set to true, two months are displayed */
  @Prop() public wide = false;

  /** The minimum valid date. */
  @Prop() public min: Date | string | number;

  /** The maximum valid date. */
  @Prop() public max: Date | string | number;

  /** A function used to filter out dates. */
  @Prop() public dateFilter: (date: Date | null) => boolean = () => true;

  /** Host element */
  @Element() private _element!: HTMLElement;

  /**
   * @deprecated only used for React. Will probably be removed once React 19 is available.
   */
  @Event({ bubbles: true, cancelable: true }) public didChange: EventEmitter;

  @Event({ bubbles: true, cancelable: true }) public change: EventEmitter;

  @Event() public didRender: EventEmitter;

  @Watch('value')
  public watchValueChange(newValue: string, oldValue: string): void {
    if (newValue !== this._formatValue(oldValue)) {
      this._updateValue(newValue);
      this._emitChange();
    }
  }

  @Watch('valueAsDate')
  public watchValueAsDateChange(newDateValue: Date, oldDateValue: Date): void {
    if (!newDateValue || newDateValue?.getTime() === oldDateValue?.getTime()) {
      return;
    }
    if (!(newDateValue instanceof Date)) {
      newDateValue = new Date(newDateValue);
    }
    const newValue = this._formatValue(
      `${newDateValue.getDate()}.${newDateValue.getMonth() + 1}.${newDateValue.getFullYear()}`
    );

    if (newValue !== this.value) {
      this.value = newValue;
    }
  }

  public connectedCallback(): void {
    if (this.value) {
      this.valueAsDate = this._formatValueAsDate(this._formatValue(this.value));
    }
  }

  public componentDidRender(): void {
    this.didRender.emit();
  }

  /** Placeholder for the inner HTMLInputElement.*/
  private _placeholder = 'DD.MM.YYYY';

  private _formatValue(value: string): string {
    if (!value) {
      return null;
    }
    const match = value.match(REGEX);
    if (match && match[1] && match[2] && match[3]) {
      const day = match[1].padStart(2, '0');
      const month = match[2].padStart(2, '0');
      let year = +match[3];
      if (year < 100 && year >= 0) {
        year += 1900;
      }
      return `${day}.${month}.${year}`;
    }
    return value;
  }

  /**
   * Returns the right format for the `valueAsDate` property
   */
  private _formatValueAsDate(value: string): Date {
    if (!value) {
      return null;
    }
    const values = value.split('.');
    if (values && values[0] && values[1] && values[2]) {
      const day = +values[0];
      const month = +values[1] - 1;
      const year = +values[2];
      return new Date(year, month, day);
    }
    return undefined;
  }

  /** Applies the correct format to values and triggers event dispatch. */
  private _formatAndUpdateValue(event): void {
    const newValue = this._formatValue(event.target.value);
    this.value = newValue;
  }

  /**
   * Updates `value` and `valueAsDate`. The direct update on the `_inputElement` is required
   * to force the input change when the typed value is the same of the current one.
   */
  private _updateValue(value: string): void {
    this.value = this._formatValue(value);
    const newValueAsDate = this._formatValueAsDate(this.value);
    if (newValueAsDate?.getTime() !== this.valueAsDate?.getTime()) {
      this.valueAsDate = newValueAsDate;
    }
    if (inputElement(this._element)) {
      inputElement(this._element).value = this.value;
    }
  }

  /** Emits the change event. */
  private _emitChange(): void {
    this.change.emit();
    this.didChange.emit();
  }

  private _preventCharInsert(event): void {
    const match = event.target.value.match(REGEX_PATTERN);
    if (match) {
      event.target.value = match[0];
    } else {
      event.target.value = null;
    }
  }

  public render(): JSX.Element {
    const inputAttributes = {
      form: this.form || null,
      disabled: this.disabled || null,
      readonly: this.readonly || null,
      required: this.required || null,
      value: this.value ? this._formatValue(this.value) : null,
      placeholder: this._placeholder,
      ...getAccessibilityAttributeList(this),
    };

    return (
      <input
        type="text"
        maxlength="10"
        {...inputAttributes}
        onInput={(event) => this._preventCharInsert(event)}
        onChange={(event) => this._formatAndUpdateValue(event)}
      />
    );
  }
}
