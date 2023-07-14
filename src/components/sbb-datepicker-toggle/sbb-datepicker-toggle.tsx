import {
  Component,
  ComponentInterface,
  Element,
  h,
  Host,
  JSX,
  Method,
  Prop,
  State,
  Watch,
} from '@stencil/core';
import { SbbCalendarCustomEvent } from '../../components';
import { i18nShowCalendar } from '../../global/i18n';
import {
  datepickerControlRegisteredEvent,
  getDatePicker,
  InputUpdateEvent,
} from '../sbb-datepicker/sbb-datepicker.helper';
import {
  documentLanguage,
  HandlerRepository,
  languageChangeHandlerAspect,
  sbbInputModalityDetector,
} from '../../global/eventing';

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

  @Element() private _element!: HTMLSbbDatepickerToggleElement;

  @State() private _triggerElement: HTMLElement;

  @State() private _disabled = false;

  @State() private _min: string | number;

  @State() private _max: string | number;

  @State() private _currentLanguage = documentLanguage();

  private _datePickerElement: HTMLSbbDatepickerElement;

  private _calendarElement: HTMLSbbCalendarElement;

  private _datePickerController: AbortController;

  private _handlerRepository = new HandlerRepository(
    this._element,
    languageChangeHandlerAspect((l) => (this._currentLanguage = l)),
  );

  @Watch('datePicker')
  public async findDatePicker(
    newValue: string | HTMLElement,
    oldValue: string | HTMLElement,
  ): Promise<void> {
    if (newValue !== oldValue) {
      await this._init(this.datePicker);
    }
  }

  /**
   * Opens the calendar.
   */
  @Method()
  public async open(): Promise<void> {
    if (!this._triggerElement) {
      this._triggerElement = this._element.shadowRoot.querySelector('sbb-tooltip-trigger');
    }
    this._triggerElement.click();
  }

  public async connectedCallback(): Promise<void> {
    this._handlerRepository.connect();
    await this._init(this.datePicker);
  }

  public disconnectedCallback(): void {
    this._datePickerController?.abort();
    this._handlerRepository.disconnect();
  }

  private async _init(datePicker?: string | HTMLElement): Promise<void> {
    this._datePickerController?.abort();
    this._datePickerController = new AbortController();
    this._datePickerElement = getDatePicker(this._element, datePicker);
    if (!this._datePickerElement) {
      return;
    }

    this._datePickerElement?.addEventListener(
      'inputUpdated',
      (event: CustomEvent<InputUpdateEvent>) => {
        this._datePickerElement = event.target as HTMLSbbDatepickerElement;
        this._disabled = event.detail.disabled || event.detail.readonly;
        this._min = event.detail.min;
        this._max = event.detail.max;
      },
      { signal: this._datePickerController.signal },
    );
    this._datePickerElement?.addEventListener(
      'change',
      (event: Event) => this._datePickerChanged(event),
      {
        signal: this._datePickerController.signal,
      },
    );
    this._datePickerElement?.addEventListener(
      'datePickerUpdated',
      (event: Event) =>
        this._configureCalendar(this._calendarElement, event.target as HTMLSbbDatepickerElement),
      { signal: this._datePickerController.signal },
    );
    this._datePickerElement.dispatchEvent(datepickerControlRegisteredEvent);
  }

  private _configureCalendar(
    calendar: HTMLSbbCalendarElement,
    datepicker: HTMLSbbDatepickerElement,
  ): void {
    calendar.wide = datepicker?.wide;
    calendar.dateFilter = datepicker?.dateFilter;
  }

  private async _datePickerChanged(event: Event): Promise<void> {
    this._datePickerElement = event.target as HTMLSbbDatepickerElement;
    this._calendarElement.selectedDate = await this._datePickerElement.getValueAsDate();
  }

  private async _assignCalendar(calendar: HTMLSbbCalendarElement): Promise<void> {
    this._calendarElement = calendar;
    if (!this._datePickerElement || !this._calendarElement.resetPosition) {
      return;
    }
    this._calendarElement.selectedDate = await this._datePickerElement.getValueAsDate();
    this._configureCalendar(this._calendarElement, this._datePickerElement);
    await this._calendarElement.resetPosition();
  }

  private _hasDataNow(): boolean {
    if (!this._datePickerElement) {
      return false;
    }
    const dataNow = +this._datePickerElement.dataset?.now;
    return !isNaN(dataNow);
  }

  private _now(): Date {
    if (this._hasDataNow()) {
      const today = new Date(+this._datePickerElement.dataset?.now);
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
          disabled={!this._datePickerElement || this._disabled}
          ref={(trigger) => {
            this._triggerElement = trigger;
          }}
          data-icon-small
        />
        <sbb-tooltip
          onWill-open={() => this._calendarElement.resetPosition()}
          onDid-open={() => {
            sbbInputModalityDetector.mostRecentModality === 'keyboard' &&
              this._calendarElement.focus();
          }}
          trigger={this._triggerElement}
          disableAnimation={this.disableAnimation}
          hide-close-button={true}
        >
          <sbb-calendar
            data-now={this._now()?.valueOf()}
            ref={async (calendar: HTMLSbbCalendarElement) => this._assignCalendar(calendar)}
            min={this._min}
            max={this._max}
            wide={this._datePickerElement?.wide}
            dateFilter={this._datePickerElement?.dateFilter}
            onDate-selected={async (d: SbbCalendarCustomEvent<Date>) => {
              const newDate = new Date(d.detail);
              this._calendarElement.selectedDate = newDate;
              await this._datePickerElement.setValueAsDate(newDate);
            }}
          />
        </sbb-tooltip>
      </Host>
    );
  }
}
