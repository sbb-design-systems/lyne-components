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
import { AgnosticMutationObserver as MutationObserver } from '../../global/helpers/mutation-observer';

const REGEX_PATTERN = /([0-9]{1,2})[.,\\/\-\s]?([0-9]{1,2})?[.,\\/\-\s]?([0-9]{1,4})?/;
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

  /** A function used to filter out dates. */
  @Prop() public dateFilter: (date: Date | null) => boolean = () => true;

  /** Reference of the native input connected to the datepicker. */
  @Prop() public input?: string | HTMLElement;

  /** Host element */
  @Element() private _element!: HTMLSbbDatepickerElement;

  /**
   * @deprecated only used for React. Will probably be removed once React 19 is available.
   */
  @Event({ bubbles: true, cancelable: true }) public didChange: EventEmitter;

  @Event({ bubbles: true, cancelable: true }) public change: EventEmitter;

  /** Notifies that the attributes of the input connected to the datepicker has changes. */
  @Event({ bubbles: true, cancelable: true }) public inputUpdated: EventEmitter<InputUpdateEvent>;

  /** Notifies that the attributes of the datepicker has changes. */
  @Event({ bubbles: true, cancelable: true }) public datePickerUpdated: EventEmitter;

  @State() private _inputElement: HTMLInputElement;

  @Watch('input')
  public findInput(newValue: string | HTMLElement, oldValue: string | HTMLElement): void {
    if (newValue !== oldValue) {
      this._inputElement = getInput(this._element, this.input);
    }
  }

  @Watch('wide')
  @Watch('dateFilter')
  public datepickerPropChanged(newValue: any, oldValue: any): void {
    if (newValue !== oldValue) {
      this.datePickerUpdated.emit();
    }
  }

  @Watch('_inputElement')
  public registerInputElement(newValue: HTMLInputElement, oldValue: HTMLInputElement): void {
    if (newValue !== oldValue) {
      this._datePickerController?.abort();
      this._datePickerController = new AbortController();

      if (!this._inputElement) {
        return;
      }

      this._inputObserver?.disconnect();
      this._inputObserver.observe(this._inputElement, {
        attributeFilter: ['disabled', 'readonly', 'min', 'max'],
      });

      this._inputElement.type = 'text';
      this._inputElement.placeholder = this._placeholder;

      this._inputElement.addEventListener(
        'input',
        (event: Event) => this._preventCharInsert(event),
        { signal: this._datePickerController.signal }
      );
      this._inputElement.addEventListener('change', (event: Event) => this._valueChanged(event), {
        signal: this._datePickerController.signal,
      });
    }
  }

  @Method() public async getValueAsDate(): Promise<Date> {
    return this._dateAdapter.formatValueAsDate(this._formatValue(this._inputElement?.value));
  }

  @Method() public async setValueAsDate(date: Date): Promise<void> {
    const newValue: string = this._formatValue(
      `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
    );
    await this._formatAndUpdateValue(newValue);
  }

  /** Placeholder for the inner HTMLInputElement.*/
  private _placeholder = 'DD.MM.YYYY';

  private _datePickerController: AbortController;

  private _inputObserver = new MutationObserver(this._onInputPropertiesChange.bind(this));

  private _dateAdapter = new NativeDateAdapter();

  public connectedCallback(): void {
    this._inputElement = getInput(this._element, this.input);
  }

  public componentDidLoad(): void {
    this.inputUpdated.emit({
      disabled: this._inputElement?.disabled,
      readonly: this._inputElement?.readOnly,
      min: this._inputElement?.min,
      max: this._inputElement?.max,
    });
  }

  public disconnectedCallback(): void {
    this._inputObserver?.disconnect();
    this._datePickerController?.abort();
  }

  private _formatValue(value: string): string {
    const match: RegExpMatchArray = value?.match(REGEX);
    if (!match || match.length <= 2) {
      return value;
    }

    const day: string = match[1].padStart(2, '0');
    const month: string = match[2].padStart(2, '0');
    let year: number = +match[3];
    if (year < 100 && year >= 0) {
      year += 1900;
    }
    return `${day}.${month}.${year}`;
  }

  private _valueChanged(event): void {
    this._formatAndUpdateValue(event.target.value);
  }

  /** Applies the correct format to values and triggers event dispatch. */
  private async _formatAndUpdateValue(value: string): Promise<void> {
    if (this._inputElement) {
      this._inputElement.classList.remove('sbb-invalid');
      this._inputElement.value = this._formatValue(value);
      const newValueAsDate: Date = await this.getValueAsDate();
      if (
        !isDateAvailable(
          newValueAsDate,
          this._element,
          this._inputElement?.min,
          this._inputElement?.max
        )
      ) {
        this._inputElement.classList.add('sbb-invalid');
      }
      this._emitChange();
    }
  }

  /** Emits the change event. */
  private _emitChange(): void {
    this.change.emit();
    this.didChange.emit();
  }

  private _onInputPropertiesChange(): void {
    this.inputUpdated.emit({
      disabled: this._inputElement?.disabled,
      readonly: this._inputElement?.readOnly,
      min: this._inputElement?.min,
      max: this._inputElement?.max,
    });
  }

  private _preventCharInsert(event): void {
    const match = event.target.value.match(REGEX_PATTERN);
    event.target.value = match?.[0] ?? null;
  }

  public render(): JSX.Element {
    return <Host></Host>;
  }
}
