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
import { findNextAvailableDate, getDatePicker } from '../sbb-datepicker/sbb-datepicker.helper';

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

  @Watch('datePicker')
  public findDatePicker(newValue: string | HTMLElement, oldValue: string | HTMLElement): void {
    if (newValue !== oldValue) {
      this._init(this.datePicker);
    }
  }

  public connectedCallback(): void {
    this._init(this.datePicker);
  }

  private _init(trigger?: string | HTMLElement): void {
    this._datePicker = getDatePicker(this._element, trigger);
    this._datePicker.addEventListener('change', (event) => {
      const newValue = (event.target as HTMLSbbDatepickerElement)?.valueAsDate;
      const date = findNextAvailableDate(newValue, -1, this._datePicker);
      this._disabled = this._dateAdapter.compareDate(date, newValue) === 0;
    });
  }

  private _handleClick(): void {
    if (!this._datePicker) {
      return;
    }
    const startingDate = this._datePicker.valueAsDate ?? this._dateAdapter.today();
    const date = findNextAvailableDate(startingDate, -1, this._datePicker);
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
