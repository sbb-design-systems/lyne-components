import {
  Component,
  ComponentInterface,
  Element,
  h,
  Host,
  JSX,
  Prop,
  State,
  Watch,
} from '@stencil/core';
import { NativeDateAdapter } from '../../global/helpers/native-date-adapter';
import { findPreviousAvailableDate, getDatePicker } from '../sbb-datepicker/sbb-datepicker.helper';

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
    this._datePicker?.addEventListener(
      'didRender',
      (event: Event) => this._setDisabledState(event.target as HTMLSbbDatepickerElement),
      { signal: this._datePickerController.signal }
    );
  }

  private _setDisabledState(datepicker: HTMLSbbDatepickerElement): void {
    const pickerValue = datepicker.valueAsDate;
    const previousDate = findPreviousAvailableDate(
      pickerValue,
      this._datePicker,
      this._dateAdapter
    );
    this._disabled =
      this._dateAdapter.compareDate(previousDate, pickerValue) === 0 ||
      this._datePicker?.disabled ||
      this._datePicker?.readonly;
  }

  private _handleClick(): void {
    if (!this._datePicker) {
      return;
    }
    const startingDate = this._datePicker.valueAsDate ?? this._dateAdapter.today();
    const date = findPreviousAvailableDate(startingDate, this._datePicker, this._dateAdapter);
    if (this._dateAdapter.compareDate(date, startingDate) !== 0) {
      this._datePicker.valueAsDate = date;
    }
  }

  public render(): JSX.Element {
    return (
      <Host slot="prefix">
        <button
          disabled={this._datePicker?.disabled || this._datePicker?.readonly || this._disabled}
          onClick={() => this._handleClick()}
        >
          <sbb-icon name="chevron-small-left-small" />
        </button>
      </Host>
    );
  }
}
