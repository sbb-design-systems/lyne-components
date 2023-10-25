import { i18nPreviousDay, i18nSelectPreviousDay, i18nToday } from '../../global/i18n';
import { resolveButtonRenderVariables } from '../../global/interfaces';
import {
  datepickerControlRegisteredEvent,
  findPreviousAvailableDate,
  getDatePicker,
  InputUpdateEvent,
} from '../sbb-datepicker/sbb-datepicker.helper';
import { DateAdapter, NativeDateAdapter } from '../../global/datetime';
import {
  documentLanguage,
  HandlerRepository,
  actionElementHandlerAspect,
  languageChangeHandlerAspect,
  ConnectedAbortController,
} from '../../global/eventing';
import { isValidAttribute, toggleDatasetEntry } from '../../global/dom';
import { CSSResult, html, LitElement, TemplateResult, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { SbbDatepicker } from '../sbb-datepicker/index';
import { setAttribute, setAttributes } from '../../global/dom';
import Style from './sbb-datepicker-previous-day.scss?lit&inline';

import '../sbb-icon';

@customElement('sbb-datepicker-previous-day')
export class SbbDatepickerPreviousDay extends LitElement {
  public static override styles: CSSResult = Style;

  /** The name attribute to use for the button. */
  @property({ reflect: true }) public name: string | undefined;

  /** Negative coloring variant flag. */
  @property({ reflect: true, type: Boolean }) public negative = false;

  /** Datepicker reference. */
  @property({ attribute: 'date-picker' }) public datePicker?: string | HTMLElement;

  /** Whether the component is disabled due date equals to min date. */
  @state() private _disabled = false;

  /** Whether the component is disabled due date-picker's input disabled. */
  @state() private _inputDisabled = false;

  /** The minimum date as set in the date-picker's input. */
  @state() private _min: string | number;

  @state() private _currentLanguage = documentLanguage();

  private _handlerRepository = new HandlerRepository(
    this as HTMLElement,
    actionElementHandlerAspect,
    languageChangeHandlerAspect((l) => {
      this._currentLanguage = l;
      this._setAriaLabel();
    }),
  );

  private _datePickerElement: SbbDatepicker;

  private _dateAdapter: DateAdapter<Date> = new NativeDateAdapter();

  private _datePickerController: AbortController;

  private _abort = new ConnectedAbortController(this);

  private _handleClick(): void {
    if (!this._datePickerElement || isValidAttribute(this, 'data-disabled')) {
      return;
    }
    const startingDate: Date = this._datePickerElement.getValueAsDate() ?? this._now();
    const date: Date = findPreviousAvailableDate(
      startingDate,
      this._datePickerElement.dateFilter,
      this._dateAdapter,
      this._min,
    );
    if (this._dateAdapter.compareDate(date, startingDate) !== 0) {
      this._datePickerElement.setValueAsDate(date);
    }
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    const signal = this._abort.signal;
    this.addEventListener('click', () => this._handleClick(), { signal });
    this._handlerRepository.connect();
    this._syncUpstreamProperties();
    this._init(this.datePicker);
  }

  public override willUpdate(changedProperties: PropertyValues<this>): void {
    if (
      changedProperties.has('datePicker') &&
      this.datePicker !== changedProperties.get('datePicker')
    ) {
      this._init(this.datePicker);
    }
  }

  private _syncUpstreamProperties(): void {
    const formField = this.closest('sbb-form-field') ?? this.closest('[data-form-field]');
    if (formField) {
      this.negative = isValidAttribute(formField, 'negative');

      // We can't use getInputElement of SbbFormField as async awaiting is not supported in connectedCallback.
      // We here only have to look for input.
      const inputElement = formField.querySelector('input');

      if (inputElement) {
        this._inputDisabled =
          isValidAttribute(inputElement, 'disabled') || isValidAttribute(inputElement, 'readonly');
      }
    }
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._handlerRepository.disconnect();
    this._datePickerController?.abort();
  }

  private _init(picker?: string | HTMLElement): void {
    this._datePickerController?.abort();
    this._datePickerController = new AbortController();
    this._datePickerElement = getDatePicker(this, picker);
    if (!this._datePickerElement) {
      return;
    }
    this._setDisabledState(this._datePickerElement);
    this._setAriaLabel();

    this._datePickerElement.addEventListener(
      'change',
      (event: Event) => {
        this._setDisabledState(event.target as SbbDatepicker);
        this._setAriaLabel();
      },
      { signal: this._datePickerController.signal },
    );
    this._datePickerElement.addEventListener(
      'date-picker-updated',
      (event: Event) => {
        this._setDisabledState(event.target as SbbDatepicker);
        this._setAriaLabel();
      },
      { signal: this._datePickerController.signal },
    );
    this._datePickerElement.addEventListener(
      'input-updated',
      (event: CustomEvent<InputUpdateEvent>) => {
        this._inputDisabled = event.detail.disabled || event.detail.readonly;
        if (this._min !== event.detail.min) {
          this._min = event.detail.min;
          this._setDisabledState(this._datePickerElement);
        }
        this._setAriaLabel();
      },
      { signal: this._datePickerController.signal },
    );

    this._datePickerElement.dispatchEvent(datepickerControlRegisteredEvent);
  }

  private _setDisabledState(datepicker: SbbDatepicker): void {
    const pickerValueAsDate: Date = datepicker.getValueAsDate();

    if (!pickerValueAsDate) {
      this._disabled = true;
      return;
    }

    const previousDate: Date = findPreviousAvailableDate(
      pickerValueAsDate,
      datepicker.dateFilter,
      this._dateAdapter,
      this._min,
    );
    this._disabled = this._dateAdapter.compareDate(previousDate, pickerValueAsDate) === 0;
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
    return this._dateAdapter.today();
  }

  private _setAriaLabel(): void {
    const currentDate = this._datePickerElement.getValueAsDate();

    if (!currentDate) {
      this.setAttribute('aria-label', i18nPreviousDay[this._currentLanguage]);
      return;
    }

    const currentDateString =
      this._dateAdapter.today().toDateString() === currentDate.toDateString()
        ? i18nToday[this._currentLanguage].toLowerCase()
        : this._dateAdapter.getAccessibilityFormatDate(currentDate);

    this.setAttribute(
      'aria-label',
      i18nSelectPreviousDay(currentDateString)[this._currentLanguage],
    );
  }

  protected override render(): TemplateResult {
    toggleDatasetEntry(this, 'disabled', this._disabled || this._inputDisabled);
    const { hostAttributes } = resolveButtonRenderVariables({
      ...this,
      disabled: isValidAttribute(this, 'data-disabled'),
    });
    setAttributes(this, hostAttributes);
    setAttribute(this, 'slot', 'prefix');

    return html`
      <span class="sbb-datepicker-previous-day">
        <sbb-icon name="chevron-small-left-small"></sbb-icon>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-datepicker-previous-day': SbbDatepickerPreviousDay;
  }
}
