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
} from '../../global/eventing';
import { sbbInputModalityDetector } from '../../global/a11y';
import { isValidAttribute, setAttributes } from '../../global/dom';
import { CSSResult, html, LitElement, TemplateResult, PropertyValues, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { SbbDatepicker } from '../sbb-datepicker/index';
import { SbbCalendar } from '../sbb-calendar/index';
import { setAttribute } from '../../global/dom';
import { ref } from 'lit/directives/ref.js';
import Style from './sbb-datepicker-toggle.scss?lit&inline';
import { SbbTooltipTrigger } from '../sbb-tooltip-trigger';
import '../sbb-tooltip-trigger';
import '../sbb-tooltip';
import '../sbb-calendar';

@customElement('sbb-datepicker-toggle')
export class SbbDatepickerToggle extends LitElement {
  public static override styles: CSSResult = Style;

  /** Datepicker reference. */
  @property({ attribute: 'date-picker' }) public datePicker?: string | HTMLElement;

  /** Whether the animation is disabled. */
  @property({ attribute: 'disable-animation', type: Boolean }) public disableAnimation = false;

  /** Negative coloring variant flag. */
  @property({ reflect: true, type: Boolean }) public negative = false;

  @state() private _disabled = false;

  @state() private _min: string | number;

  @state() private _max: string | number;

  @state() private _currentLanguage = documentLanguage();

  private _datePickerElement: SbbDatepicker;

  private _calendarElement: SbbCalendar;

  private _triggerElement: SbbTooltipTrigger =
    this.ownerDocument.createElement('sbb-tooltip-trigger');

  private _datePickerController: AbortController;

  private _handlerRepository = new HandlerRepository(
    this,
    languageChangeHandlerAspect((l) => (this._currentLanguage = l)),
  );

  private _findDatePicker(newValue: string | HTMLElement, oldValue: string | HTMLElement): void {
    if (newValue !== oldValue) {
      this._init(this.datePicker);
    }
  }

  /**
   * Opens the calendar.
   */
  public open(): void {
    if (!this._triggerElement) {
      this._triggerElement = this.shadowRoot.querySelector('sbb-tooltip-trigger');
    }
    this._triggerElement.click();
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this._handlerRepository.connect();
    this._init(this.datePicker);

    const formField = this.closest('sbb-form-field') ?? this.closest('[data-form-field]');
    if (formField) {
      this.negative = isValidAttribute(formField, 'negative');
    }
  }

  public override willUpdate(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('datePicker')) {
      this._findDatePicker(this.datePicker, changedProperties.get('datePicker'));
    }
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._datePickerController?.abort();
    this._handlerRepository.disconnect();
  }

  private async _init(datePicker?: string | HTMLElement): Promise<void> {
    this._datePickerController?.abort();
    this._datePickerController = new AbortController();
    this._datePickerElement = getDatePicker(this, datePicker);
    if (!this._datePickerElement) {
      return;
    }

    this._datePickerElement?.addEventListener(
      'input-updated',
      (event: CustomEvent<InputUpdateEvent>) => {
        this._datePickerElement = event.target as SbbDatepicker;
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
      'date-picker-updated',
      (event: Event) =>
        this._configureCalendar(this._calendarElement, event.target as SbbDatepicker),
      { signal: this._datePickerController.signal },
    );
    this._datePickerElement.dispatchEvent(datepickerControlRegisteredEvent);
  }

  private _configureCalendar(calendar: SbbCalendar, datepicker: SbbDatepicker): void {
    calendar.wide = datepicker?.wide;
    calendar.dateFilter = datepicker?.dateFilter;
  }

  private _datePickerChanged(event: Event): void {
    this._datePickerElement = event.target as SbbDatepicker;
    this._calendarElement.selectedDate = this._datePickerElement.getValueAsDate();
  }

  private _assignCalendar(calendar: SbbCalendar): void {
    if (this._calendarElement && this._calendarElement === calendar) {
      return;
    }
    this._calendarElement = calendar;
    if (
      !this._datePickerElement ||
      !this._datePickerElement.getValueAsDate ||
      !this._calendarElement?.resetPosition
    ) {
      return;
    }
    this._calendarElement.selectedDate = this._datePickerElement.getValueAsDate();
    this._configureCalendar(this._calendarElement, this._datePickerElement);
    this._calendarElement.resetPosition();
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

  protected override render(): TemplateResult {
    setAttribute(this, 'slot', 'prefix');
    setAttributes(this._triggerElement as HTMLElement, {
      'aria-label': i18nShowCalendar[this._currentLanguage],
      'icon-name': 'calendar-small',
      disabled: !this._datePickerElement || this._disabled,
      negative: this.negative,
      'data-icon-small': true,
    });
    return html`
      ${this._triggerElement}
      <sbb-tooltip
        @will-open=${() => this._calendarElement.resetPosition()}
        @did-open=${() => {
          sbbInputModalityDetector.mostRecentModality === 'keyboard' &&
            this._calendarElement.focus();
        }}
        .trigger=${this._triggerElement}
        ?disableAnimation=${this.disableAnimation}
        hide-close-button
      >
        <sbb-calendar
          data-now=${this._now()?.valueOf() || nothing}
          ${ref((calendar: SbbCalendar) => this._assignCalendar(calendar))}
          .min=${this._min}
          .max=${this._max}
          ?wide=${this._datePickerElement?.wide}
          .dateFilter=${this._datePickerElement?.dateFilter}
          @date-selected=${async (d: CustomEvent<Date>) => {
            const newDate = new Date(d.detail);
            this._calendarElement.selectedDate = newDate;
            this._datePickerElement.setValueAsDate(newDate);
          }}
        ></sbb-calendar>
      </sbb-tooltip>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-datepicker-toggle': SbbDatepickerToggle;
  }
}
