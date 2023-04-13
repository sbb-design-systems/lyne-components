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
import { SbbCalendarCustomEvent } from '../../components';
import { HandlerRepository } from '../../global/helpers';
import {
  documentLanguage,
  languageChangeHandlerAspect,
} from '../../global/helpers/eventing/language-change-handler';
import { i18nShowCalendar } from '../../global/i18n';
import {
  datepickerControlRegisteredEvent,
  getDatePicker,
  InputUpdateEvent,
} from '../sbb-datepicker/sbb-datepicker.helper';

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

  private _openedByKeyboard = false;

  private _datePickerController: AbortController;

  private _handlerRepository = new HandlerRepository(
    this._element,
    languageChangeHandlerAspect((l) => (this._currentLanguage = l))
  );

  @Watch('datePicker')
  public findDatePicker(newValue: string | HTMLElement, oldValue: string | HTMLElement): void {
    if (newValue !== oldValue) {
      this._init(this.datePicker);
    }
  }

  public connectedCallback(): void {
    this._handlerRepository.connect();
    this._init(this.datePicker);
  }

  public componentDidLoad(): void {
    this._triggerElement = this._element.shadowRoot.querySelector('sbb-tooltip-trigger');
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
      { signal: this._datePickerController.signal }
    );
    this._datePickerElement?.addEventListener(
      'change',
      (event: Event) => this._datePickerChanged(event),
      {
        signal: this._datePickerController.signal,
      }
    );
    this._datePickerElement?.addEventListener(
      'datePickerUpdated',
      (event: Event) =>
        this._configureCalendar(this._calendarElement, event.target as HTMLSbbDatepickerElement),
      { signal: this._datePickerController.signal }
    );
    this._datePickerElement.dispatchEvent(datepickerControlRegisteredEvent);
  }

  private _configureCalendar(
    calendar: HTMLSbbCalendarElement,
    datepicker: HTMLSbbDatepickerElement
  ): void {
    calendar.wide = datepicker?.wide;
    calendar.dateFilter = datepicker?.dateFilter;
  }

  private async _datePickerChanged(event: Event): Promise<void> {
    this._datePickerElement = event.target as HTMLSbbDatepickerElement;
    const datepickerDate = await this._datePickerElement.getValueAsDate();
    this._calendarElement.selectedDate = datepickerDate;
  }

  private async _assignCalendar(calendar: HTMLSbbCalendarElement): Promise<void> {
    this._calendarElement = calendar;
    if (!this._datePickerElement || !this._calendarElement.resetPosition) {
      return;
    }
    this._calendarElement.selectedDate = await this._datePickerElement.getValueAsDate();
    this._configureCalendar(this._calendarElement, this._datePickerElement);
    this._calendarElement.resetPosition();
  }

  private _close(): void {
    this._element.shadowRoot.querySelector('sbb-tooltip')?.close();
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
          onKeyDown={(event: KeyboardEvent) => {
            if (event.code === 'Enter' || event.code === 'Space') {
              this._openedByKeyboard = true;
            }
          }}
          data-icon-small
        />
        <sbb-tooltip
          onWill-open={() => this._calendarElement.resetPosition()}
          onDid-close={() => {
            this._openedByKeyboard = false;
          }}
          onDid-open={() => {
            this._openedByKeyboard && this._calendarElement.focus();
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
            onDate-selected={(d: SbbCalendarCustomEvent<Date>) => {
              const newDate = new Date(d.detail);
              this._calendarElement.selectedDate = newDate;
              this._datePickerElement.setValueAsDate(newDate);
              this._close();
            }}
          />
        </sbb-tooltip>
      </Host>
    );
  }
}
