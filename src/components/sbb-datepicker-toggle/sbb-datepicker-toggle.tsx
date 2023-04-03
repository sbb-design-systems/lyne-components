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
import { SbbCalendarCustomEvent } from '../../components';
import { documentLanguage, SbbLanguageChangeEvent } from '../../global/helpers/language';
import { NativeDateAdapter } from '../../global/helpers/native-date-adapter';
import { i18nShowCalendar } from '../../global/i18n';
import { DateAdapter } from '../../global/interfaces/date-adapter';
import { getDatePicker, InputUpdateEvent } from '../sbb-datepicker/sbb-datepicker.helper';

@Component({
  shadow: true,
  styleUrl: 'sbb-datepicker-toggle.scss',
  tag: 'sbb-datepicker-toggle',
})
export class SbbDatepickerToggle implements ComponentInterface {
  /** Datepicker reference. */
  @Prop() public datePicker?: string | HTMLElement;

  /** Whether the animation is disabled. */
  @Prop() public disableAnimation = false;

  @Element() private _element: HTMLSbbDatepickerToggleElement;

  @State() private _triggerElement: HTMLElement;

  @State() private _disabled = false;

  @State() private _min: string | number;

  @State() private _max: string | number;

  @State() private _currentLanguage = documentLanguage();

  private _datePicker: HTMLSbbDatepickerElement;

  private _calendarElement: HTMLSbbCalendarElement;

  private _openedByKeyboard = false;

  private _datePickerController: AbortController;

  private _dateAdapter: DateAdapter<Date> = new NativeDateAdapter();

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
    this._init(this.datePicker);
  }

  public componentDidLoad(): void {
    this._triggerElement = this._element.shadowRoot.querySelector('sbb-tooltip-trigger');
  }

  public disconnectedCallback(): void {
    this._datePickerController?.abort();
  }

  private async _init(datePicker?: string | HTMLElement): Promise<void> {
    this._datePickerController?.abort();
    this._datePickerController = new AbortController();
    this._datePicker = getDatePicker(this._element, datePicker);

    this._datePicker?.addEventListener(
      'inputUpdated',
      (event: CustomEvent<InputUpdateEvent>) => {
        this._datePicker = event.target as HTMLSbbDatepickerElement;
        this._disabled = event.detail.disabled || event.detail.readonly;
        this._min = event.detail.min;
        this._max = event.detail.max;
      },
      { signal: this._datePickerController.signal }
    );
    this._datePicker?.addEventListener('change', (event: Event) => this._datePickerChanged(event), {
      signal: this._datePickerController.signal,
    });
    this._datePicker?.addEventListener(
      'datePickerUpdated',
      (event: Event) =>
        this._configureCalendar(this._calendarElement, event.target as HTMLSbbDatepickerElement),
      { signal: this._datePickerController.signal }
    );
  }

  private _configureCalendar(
    calendar: HTMLSbbCalendarElement,
    datepicker: HTMLSbbDatepickerElement
  ): void {
    calendar.wide = datepicker?.wide;
    calendar.dateFilter = datepicker?.dateFilter;
  }

  private async _datePickerChanged(event: Event): Promise<void> {
    this._datePicker = event.target as HTMLSbbDatepickerElement;
    const datepickerDate = await this._datePicker.getValueAsDate();
    const calendarDate = this._dateAdapter.deserializeDate(this._calendarElement.selectedDate);
    if (datepickerDate?.getTime() !== calendarDate?.getTime()) {
      this._calendarElement.selectedDate = datepickerDate;

      if (!this._dateAdapter.hasSameMonthAndYear(datepickerDate, calendarDate)) {
        this._calendarElement.resetPosition();
      }
    }
  }

  private async _assignCalendar(calendar: HTMLSbbCalendarElement): Promise<void> {
    this._calendarElement = calendar;
    if (!this._datePicker || !this._calendarElement.resetPosition) {
      return;
    }
    this._calendarElement.selectedDate = await this._datePicker.getValueAsDate();
    this._configureCalendar(this._calendarElement, this._datePicker);
    this._calendarElement.resetPosition();
  }

  private _close(): void {
    this._element.shadowRoot.querySelector('sbb-tooltip')?.close();
  }

  private _hasDataNow(): boolean {
    if (!this._datePicker) {
      return false;
    }
    const dataNow = +this._datePicker.dataset?.now;
    return !isNaN(dataNow);
  }

  private _now(): Date {
    if (this._hasDataNow()) {
      const today = new Date(+this._datePicker.dataset?.now);
      today.setHours(0, 0, 0, 0);
      return today;
    }
    return undefined;
  }

  public render(): JSX.Element {
    return (
      <Host slot="prefix">
        <sbb-tooltip-trigger
          aria-label={i18nShowCalendar[this._currentLanguage]}
          iconName="calendar-small"
          disabled={!this._datePicker || this._disabled}
          onKeyDown={(event: KeyboardEvent) => {
            if (event.code === 'Enter' || event.code === 'Space') {
              this._openedByKeyboard = true;
            }
          }}
        />
        <sbb-tooltip
          onDid-close={() => {
            this._openedByKeyboard = false;
          }}
          onDid-open={() => {
            this._openedByKeyboard && this._calendarElement.focus();
          }}
          trigger={this._triggerElement}
          disableAnimation={this.disableAnimation}
          data-hide-close-button
        >
          <sbb-calendar
            data-now={this._now()?.valueOf()}
            ref={async (calendar: HTMLSbbCalendarElement) => this._assignCalendar(calendar)}
            min={this._min}
            max={this._max}
            wide={this._datePicker?.wide}
            dateFilter={this._datePicker?.dateFilter}
            onDate-selected={(d: SbbCalendarCustomEvent<Date>) => {
              const newDate = new Date(d.detail);
              this._calendarElement.selectedDate = newDate;
              this._datePicker.setValueAsDate(newDate);
              this._close();
            }}
          />
        </sbb-tooltip>
      </Host>
    );
  }
}
