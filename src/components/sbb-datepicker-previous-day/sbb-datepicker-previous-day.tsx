import {
  Component,
  ComponentInterface,
  Element,
  h,
  Host,
  JSX,
  Listen,
  Prop,
  State,
  Watch,
} from '@stencil/core';
import { documentLanguage, SbbLanguageChangeEvent } from '../../global/helpers/language';
import { NativeDateAdapter } from '../../global/helpers/native-date-adapter';
import { i18nPreviousDay } from '../../global/i18n';
import {
  findPreviousAvailableDate,
  getDatePicker,
  InputUpdateEvent,
} from '../sbb-datepicker/sbb-datepicker.helper';

@Component({
  shadow: true,
  styleUrl: 'sbb-datepicker-previous-day.scss',
  tag: 'sbb-datepicker-previous-day',
})
export class SbbDatepickerPreviousDay implements ComponentInterface {
  /** Datepicker reference */
  @Prop() public datePicker?: string | HTMLElement;

  @Element() private _element: HTMLSbbDatepickerPreviousDayElement;

  /** Whether the component is disabled due date equals to min date. */
  @State() private _disabled = false;

  /** Whether the component is disabled due date-picker's input disabled. */
  @State() private _inputDisabled = false;

  /** The minimum date as set in the date-picker's input. */
  @State() private _min: string | number;

  @State() private _currentLanguage = documentLanguage();

  private _datePickerElement: HTMLSbbDatepickerElement;

  private _dateAdapter: NativeDateAdapter = new NativeDateAdapter();

  private _datePickerController: AbortController;

  @Watch('datePicker')
  public findDatePicker(newValue: string | HTMLElement, oldValue: string | HTMLElement): void {
    if (newValue !== oldValue) {
      this._init(this.datePicker);
    }
  }

  @Listen('sbbLanguageChange', { target: 'document' })
  public handleLanguageChange(event: SbbLanguageChangeEvent): void {
    this._currentLanguage = event.detail;
  }

  public connectedCallback(): void {
    this._datePickerController = new AbortController();
    this._init(this.datePicker);
  }

  public disconnectedCallback(): void {
    this._datePickerController?.abort();
  }

  private _init(picker?: string | HTMLElement): void {
    this._datePickerElement = getDatePicker(this._element, picker);
    if (!this._datePickerElement) {
      return;
    }
    this._setDisabledState(this._datePickerElement);

    this._datePickerElement.addEventListener(
      'change',
      (event: Event) => this._setDisabledState(event.target as HTMLSbbDatepickerElement),
      { signal: this._datePickerController.signal }
    );
    this._datePickerElement.addEventListener(
      'datePickerUpdated',
      (event: Event) => this._setDisabledState(event.target as HTMLSbbDatepickerElement),
      { signal: this._datePickerController.signal }
    );
    this._datePickerElement.addEventListener(
      'inputUpdated',
      (event: CustomEvent<InputUpdateEvent>) => {
        this._inputDisabled = event.detail.disabled || event.detail.readonly;
        this._min = event.detail.min;
      },
      { signal: this._datePickerController.signal }
    );
  }

  private async _setDisabledState(datepicker: HTMLSbbDatepickerElement): Promise<void> {
    const pickerValueAsDate: Date = await datepicker.getValueAsDate();
    if (pickerValueAsDate) {
      const previousDate: Date = findPreviousAvailableDate(
        pickerValueAsDate,
        datepicker.dateFilter,
        this._dateAdapter,
        this._min
      );
      this._disabled = this._dateAdapter.compareDate(previousDate, pickerValueAsDate) === 0;
    }
  }

  private async _handleClick(event: Event): Promise<void> {
    event.stopImmediatePropagation();
    if (!this._datePickerElement) {
      return;
    }
    const startingDate: Date =
      (await this._datePickerElement.getValueAsDate()) ?? this._dateAdapter.today();
    const date: Date = findPreviousAvailableDate(
      startingDate,
      this._datePickerElement.dateFilter,
      this._dateAdapter,
      this._min
    );
    if (this._dateAdapter.compareDate(date, startingDate) !== 0) {
      await this._datePickerElement.setValueAsDate(date);
    }
  }

  public render(): JSX.Element {
    return (
      <Host slot="prefix">
        <div id="sbb-datepicker-previous-day">
          <button
            aria-label={i18nPreviousDay[this._currentLanguage]}
            aria-disabled={this._disabled || this._inputDisabled}
            disabled={this._disabled || this._inputDisabled}
            onClick={(event) => this._handleClick(event)}
          >
            <sbb-icon name="chevron-small-left-small" />
          </button>
        </div>
      </Host>
    );
  }
}
