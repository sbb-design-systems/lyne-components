import { Component, ComponentInterface, Element, h, Host, JSX, Prop, Watch } from '@stencil/core';
import { NativeDateAdapter } from '../../global/helpers/native-date-adapter';
import { getDatePicker } from '../sbb-datepicker/sbb-datepicker.helper';

@Component({
  shadow: true,
  styleUrl: 'sbb-datepicker-next-day.scss',
  tag: 'sbb-datepicker-next-day',
})
export class SbbDatepickerNextDay implements ComponentInterface {
  /** Datepicker reference */
  @Prop() public datePicker?: string | HTMLElement;

  @Element() private _element: HTMLSbbDatepickerNextDayElement;

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
  }

  private _handleClick(): void {
    if (this._datePicker) {
      const date = this._datePicker.valueAsDate ?? this._dateAdapter.today();
      this._datePicker.valueAsDate = this._dateAdapter.addCalendarDays(date, 1);
    }
  }

  public render(): JSX.Element {
    return (
      <Host slot="suffix">
        <button
          disabled={this._datePicker?.disabled || this._datePicker?.readonly}
          onClick={() => this._handleClick()}
        >
          <sbb-icon name="chevron-small-right-small" />
        </button>
      </Host>
    );
  }
}
