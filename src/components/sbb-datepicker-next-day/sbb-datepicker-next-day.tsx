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
import { i18nNextDay } from '../../global/i18n';
import {
  findNextAvailableDate,
  getDatePicker,
  InputUpdateEvent,
} from '../sbb-datepicker/sbb-datepicker.helper';

@Component({
  shadow: true,
  styleUrl: 'sbb-datepicker-next-day.scss',
  tag: 'sbb-datepicker-next-day',
})
export class SbbDatepickerNextDay implements ComponentInterface {
  /** Datepicker reference. */
  @Prop() public datePicker?: string | HTMLElement;

  @Element() private _element: HTMLSbbDatepickerNextDayElement;

  /** Whether the component is disabled due date equals to max date. */
  @State() private _disabled = false;

  /** Whether the component is disabled due date-picker's input disabled. */
  @State() private _inputDisabled = false;

  /** The maximum date as set in the date-picker's input. */
  @State() private _max: string | number;

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

  private _init(trigger?: string | HTMLElement): void {
    this._datePickerElement = getDatePicker(this._element, trigger);
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
        this._max = event.detail.max;
      },
      { signal: this._datePickerController.signal }
    );
  }

  private async _setDisabledState(datepicker: HTMLSbbDatepickerElement): Promise<void> {
    const pickerValueAsDate: Date = await datepicker.getValueAsDate();
    if (pickerValueAsDate) {
      const nextDate: Date = findNextAvailableDate(
        pickerValueAsDate,
        datepicker.dateFilter,
        this._dateAdapter,
        this._max
      );
      this._disabled = this._dateAdapter.compareDate(nextDate, pickerValueAsDate) === 0;
    }
  }

  private async _handleClick(): Promise<void> {
    if (!this._datePickerElement) {
      return;
    }
    const startingDate: Date = (await this._datePickerElement.getValueAsDate()) ?? this._now();
    const date: Date = findNextAvailableDate(
      startingDate,
      this._datePickerElement.dateFilter,
      this._dateAdapter,
      this._max
    );
    if (this._dateAdapter.compareDate(date, startingDate) !== 0) {
      await this._datePickerElement.setValueAsDate(date);
    }
  }

  private _hasDataNow(): boolean {
    const dataNow = +this._datePickerElement.dataset?.now;
    return !isNaN(dataNow);
  }

  private _now(): Date {
    if (this._hasDataNow()) {
      const today = new Date(+this._datePickerElement.dataset?.now);
      today.setHours(0, 0, 0, 0);
      return today;
    }
    return this._dateAdapter.today();
  }

  public render(): JSX.Element {
    return (
      <Host slot="suffix">
        <div class="sbb-datepicker-next-day">
          <button
            class="sbb-datepicker-next-day__button"
            aria-label={i18nNextDay[this._currentLanguage]}
            aria-disabled={this._disabled || this._inputDisabled}
            disabled={this._disabled || this._inputDisabled}
            onClick={() => this._handleClick()}
            type="button"
          >
            <sbb-icon name="chevron-small-right-small" />
          </button>
        </div>
      </Host>
    );
  }
}
