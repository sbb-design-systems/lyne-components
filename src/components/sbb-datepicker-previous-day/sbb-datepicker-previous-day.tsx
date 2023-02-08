import { Component, ComponentInterface, Element, h, Host, JSX, Prop, Watch } from '@stencil/core';
import { hostContext } from '../../global/helpers/host-context';
import { NativeDateAdapter } from '../../global/helpers/native-date-adapter';

@Component({
  shadow: true,
  styleUrl: 'sbb-datepicker-previous-day.scss',
  tag: 'sbb-datepicker-previous-day',
})
export class SbbDatepickerPreviousDay implements ComponentInterface {
  /** Datepicker reference */
  @Prop()
  public datePicker?: string | HTMLElement;

  @Watch('datePicker')
  public findDatePicker(newValue: string | HTMLElement, oldValue: string | HTMLElement): void {
    if (newValue !== oldValue) {
      this._init(this.datePicker);
    }
  }

  public connectedCallback(): void {
    this._init(this.datePicker);
  }

  @Element() private _element: HTMLElement;
  private _datePicker: HTMLSbbDatepickerElement;
  private _dateAdapter: NativeDateAdapter = new NativeDateAdapter();

  private _init(trigger?: string | HTMLElement): void {
    if (!trigger) {
      const parent = hostContext('sbb-form-field', this._element);
      this._datePicker = parent.querySelector('sbb-datepicker') as HTMLSbbDatepickerElement;
      return;
    }

    // Check whether it's a string or an HTMLElement
    if (typeof trigger === 'string') {
      this._datePicker = document.getElementById(trigger) as HTMLSbbDatepickerElement;
    } else if (trigger instanceof window.Element) {
      this._datePicker = trigger as HTMLSbbDatepickerElement;
    }
  }

  private _handleClick(): void {
    const date = this._datePicker.valueAsDate ?? this._dateAdapter.today();
    this._datePicker.valueAsDate = this._dateAdapter.addCalendarDays(date, -1);
  }

  public render(): JSX.Element {
    return (
      <Host slot="prefix">
        <button onClick={() => this._handleClick()}>
          <sbb-icon name="chevron-small-left-small" />
        </button>
      </Host>
    );
  }
}
