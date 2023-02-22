import {
  Component,
  ComponentInterface,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  JSX,
  Method,
  Prop,
  State,
  Watch,
} from '@stencil/core';
import { NativeDateAdapter } from '../../global/helpers/native-date-adapter';
import { getInput, InputUpdateEvent, isDateAvailable } from './sbb-datepicker.helper';

const REGEX_PATTERN = /[0-9.,\\/\-\s]{1,10}/;
const REGEX =
  /(^0?[1-9]?|[12]?[0-9]?|3?[01]?)[.,\\/\-\s](0?[1-9]?|1?[0-2]?)?[.,\\/\-\s](\d{1,4}$)?/;

@Component({
  shadow: true,
  styleUrl: 'sbb-datepicker.scss',
  tag: 'sbb-datepicker',
})
export class SbbDatepicker implements ComponentInterface {
  /** If set to true, two months are displayed */
  @Prop() public wide = false;

  /** The minimum valid date. */
  @Prop() public min: Date | string | number;

  /** The maximum valid date. */
  @Prop() public max: Date | string | number;

  /** A function used to filter out dates. */
  @Prop() public dateFilter: (date: Date | null) => boolean = () => true;

  @Prop() public input?: string | HTMLElement;

  /** Host element */
  @Element() private _element!: HTMLSbbDatepickerElement;

  /**
   * @deprecated only used for React. Will probably be removed once React 19 is available.
   */
  @Event({ bubbles: true, cancelable: true }) public didChange: EventEmitter;

  @Event({ bubbles: true, cancelable: true }) public change: EventEmitter;

  @Event({ bubbles: true, cancelable: true }) public inputUpdated: EventEmitter<InputUpdateEvent>;

  @Event({ bubbles: true, cancelable: true }) public datePickerUpdated: EventEmitter;

  @State() private _input: HTMLInputElement;

  @Watch('input')
  public findInput(newValue: string | HTMLElement, oldValue: string | HTMLElement): void {
    if (newValue !== oldValue) {
      this._input = getInput(this._element, this.input);
    }
  }

  @Watch('min')
  @Watch('max')
  @Watch('wide')
  @Watch('dateFilter')
  public somePropChanged(newValue: any, oldValue: any): void {
    if (newValue !== oldValue) {
      this.datePickerUpdated.emit();
    }
  }

  @Watch('_input')
  public registerInputElement(newValue: HTMLInputElement, oldValue: HTMLInputElement): void {
    if (newValue !== oldValue) {
      this._inputObserver?.disconnect();
      this._datePickerController?.abort();
      this._input.type = 'text';
      this._input.placeholder = this._placeholder;

      this._datePickerController = new AbortController();

      this._input.addEventListener('input', (event) => this._preventCharInsert(event), {
        signal: this._datePickerController.signal,
      });
      this._input.addEventListener('change', (event) => this._valueChanged(event), {
        signal: this._datePickerController.signal,
      });

      this._inputObserver.observe(this._input, { attributeFilter: ['disabled', 'readonly'] });
    }
  }

  @Method() public async getValueAsDate(): Promise<Date> {
    return this._dateAdapter.formatValueAsDate(this._input?.value);
  }

  @Method() public async setValueAsDate(date: Date): Promise<void> {
    const newValue = this._formatValue(
      `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
    );

    this._formatAndUpdateValue(newValue);
  }

  public connectedCallback(): void {
    this._input = getInput(this._element, this.input);
  }

  public componentDidLoad(): void {
    this.inputUpdated.emit({ disabled: this._input?.disabled, readonly: this._input?.readOnly });
  }

  public disconnectedCallback(): void {
    this._inputObserver.disconnect();
    this._datePickerController.abort();
  }

  /** Placeholder for the inner HTMLInputElement.*/
  private _placeholder = 'DD.MM.YYYY';

  private _isDateValid = true;

  private _datePickerController: AbortController;
  private _inputObserver = new MutationObserver(this._onInputPropertiesChange.bind(this));
  private _dateAdapter = new NativeDateAdapter();

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

  private _valueChanged(event): void {
    this._formatAndUpdateValue(event.target.value);
  }

  /** Applies the correct format to values and triggers event dispatch. */
  private async _formatAndUpdateValue(value: string): Promise<void> {
    const newValue = this._formatValue(value);
    if (this._input) {
      this._input.classList.remove('sbb-invalid');
      this._input.value = newValue;
      const newValueAsDate = await this.getValueAsDate();
      this._isDateValid = isDateAvailable(newValueAsDate, this._element);
      !this._isDateValid && this._input.classList.add('sbb-invalid');
      this._emitChange();
    }
  }

  /** Emits the change event. */
  private _emitChange(): void {
    this.change.emit();
    this.didChange.emit();
  }

  private _onInputPropertiesChange(): void {
    this.inputUpdated.emit({ disabled: this._input.disabled, readonly: this._input.readOnly });
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
    return <Host></Host>;
  }
}
