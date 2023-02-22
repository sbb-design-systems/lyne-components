import { Component, ComponentInterface, Element, h, Host, Prop, State, Watch } from '@stencil/core';
import { NativeDateAdapter } from '../../global/helpers/native-date-adapter';
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

  @State() private _disabled = false;
  @State() private _inputDisabled = false;

  private _datePicker: HTMLSbbDatepickerElement;

  private _dateAdapter: NativeDateAdapter = new NativeDateAdapter();

  private _datePickerController: AbortController;

  @Watch('datePicker')
  public findDatePicker(newValue: string | HTMLElement, oldValue: string | HTMLElement): void {
    if (newValue !== oldValue) {
      this._init(this.datePicker);
    }
  }

  public connectedCallback(): void {
    this._datePickerController = new AbortController();
    this._init(this.datePicker);
  }

  public disconnectedCallback(): void {
    this._datePickerController.abort();
  }

  private _init(picker?: string | HTMLElement): void {
    this._datePicker = getDatePicker(this._element, picker);
    if (!this._datePicker) {
      return;
    }
    this._setDisabledState(this._datePicker);

    this._datePicker?.addEventListener(
      'change',
      (event: CustomEvent<InputUpdateEvent>) =>
        this._setDisabledState(event.target as HTMLSbbDatepickerElement),
      { signal: this._datePickerController.signal }
    );
    this._datePicker?.addEventListener(
      'datePickerUpdated',
      (event: CustomEvent<InputUpdateEvent>) =>
        this._setDisabledState(event.target as HTMLSbbDatepickerElement),
      { signal: this._datePickerController.signal }
    );
    this._datePicker?.addEventListener(
      'inputUpdated',
      (event: CustomEvent<InputUpdateEvent>) =>
        (this._inputDisabled = event.detail.disabled || event.detail.readonly),
      { signal: this._datePickerController.signal }
    );
  }

  private async _setDisabledState(datepicker: HTMLSbbDatepickerElement): Promise<void> {
    const pickerValue = await datepicker.getValueAsDate();
    if (pickerValue) {
      const previousDate = findPreviousAvailableDate(pickerValue, datepicker, this._dateAdapter);
      this._disabled = this._dateAdapter.compareDate(previousDate, pickerValue) === 0;
    }
  }

  private async _handleClick(): Promise<void> {
    if (!this._datePicker) {
      return;
    }
    const startingDate = (await this._datePicker.getValueAsDate()) ?? this._dateAdapter.today();
    const date = findPreviousAvailableDate(startingDate, this._datePicker, this._dateAdapter);
    if (this._dateAdapter.compareDate(date, startingDate) !== 0) {
      this._datePicker.setValueAsDate(date);
    }
  }

  public render(): JSX.Element {
    return (
      <Host slot="prefix">
        <button
          disabled={this._disabled || this._inputDisabled}
          onClick={() => this._handleClick()}
        >
          <sbb-icon name="chevron-small-left-small" />
        </button>
      </Host>
    );
  }
}
