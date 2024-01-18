import type { CSSResultGroup, PropertyValues, TemplateResult } from 'lit';
import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { LanguageController } from '../../core/common-behaviors';
import type { DateAdapter } from '../../core/datetime';
import { defaultDateAdapter } from '../../core/datetime';
import { isValidAttribute, setAttribute, setAttributes, toggleDatasetEntry } from '../../core/dom';
import {
  ConnectedAbortController,
  HandlerRepository,
  actionElementHandlerAspect,
  type InputUpdateEvent,
} from '../../core/eventing';
import { i18nPreviousDay, i18nSelectPreviousDay, i18nToday } from '../../core/i18n';
import type { ButtonProperties } from '../../core/interfaces';
import { resolveButtonRenderVariables } from '../../core/interfaces';
import {
  datepickerControlRegisteredEventFactory,
  findPreviousAvailableDate,
  getDatePicker,
} from '../datepicker';
import type { SbbDatepickerElement } from '../datepicker';
import '../../icon';

import style from './datepicker-previous-day.scss?lit&inline';

/**
 * Combined with a `sbb-datepicker`, it can be used to move the date back.
 */
@customElement('sbb-datepicker-previous-day')
export class SbbDatepickerPreviousDayElement extends LitElement implements ButtonProperties {
  public static override styles: CSSResultGroup = style;

  /** The name attribute to use for the button. */
  @property({ reflect: true }) public name: string | undefined;

  /** Negative coloring variant flag. */
  @property({ reflect: true, type: Boolean }) public negative = false;

  /** Datepicker reference. */
  @property({ attribute: 'date-picker' }) public datePicker?: string | SbbDatepickerElement;

  /** Whether the component is disabled due date equals to min date. */
  @state() private _disabled = false;

  /** Whether the component is disabled due date-picker's input disabled. */
  @state() private _inputDisabled = false;

  /** The minimum date as set in the date-picker's input. */
  @state() private _min: string | number | null = null;

  private _handlerRepository = new HandlerRepository(this, actionElementHandlerAspect);

  private _datePickerElement?: SbbDatepickerElement | null = null;

  private _dateAdapter: DateAdapter<Date> = defaultDateAdapter;

  private _datePickerController!: AbortController;

  private _abort = new ConnectedAbortController(this);
  private _language = new LanguageController(this).withHandler(() => this._setAriaLabel());

  private _handleClick(): void {
    if (!this._datePickerElement || isValidAttribute(this, 'data-disabled')) {
      return;
    }
    const startingDate: Date =
      this._datePickerElement.getValueAsDate() ?? this._datePickerElement.now();
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
    this.addEventListener('click', () => this._handleClick(), { signal: this._abort.signal });
    this._handlerRepository.connect();
    this._syncUpstreamProperties();
    if (!this.datePicker) {
      this._init();
    }
  }

  public override willUpdate(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('datePicker')) {
      this._init(this.datePicker);
    }
  }

  private _syncUpstreamProperties(): void {
    const formField = this.closest?.('sbb-form-field') ?? this.closest?.('[data-form-field]');
    if (formField) {
      this.negative = isValidAttribute(formField, 'negative');

      // We can't use getInputElement of SbbFormFieldElement as async awaiting is not supported in connectedCallback.
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

  private _init(picker?: string | SbbDatepickerElement): void {
    this._datePickerController?.abort();
    this._datePickerController = new AbortController();
    this._datePickerElement = getDatePicker(this, picker);
    this._setDisabledState(this._datePickerElement);
    if (!this._datePickerElement) {
      // If the component is attached to the DOM before the datepicker, it has to listen for the datepicker init,
      // assuming that the two components share the same parent element.
      this.parentElement?.addEventListener(
        'inputUpdated',
        (e: CustomEvent<InputUpdateEvent>) => this._init(e.target as SbbDatepickerElement),
        { once: true, signal: this._datePickerController.signal },
      );
      return;
    }
    this._setAriaLabel();

    this._datePickerElement.addEventListener(
      'change',
      (event: Event) => {
        this._setDisabledState(event.target as SbbDatepickerElement);
        this._setAriaLabel();
      },
      { signal: this._datePickerController.signal },
    );
    this._datePickerElement.addEventListener(
      'datePickerUpdated',
      (event: Event) => {
        this._setDisabledState(event.target as SbbDatepickerElement);
        this._setAriaLabel();
      },
      { signal: this._datePickerController.signal },
    );
    this._datePickerElement.addEventListener(
      'inputUpdated',
      (event: CustomEvent<InputUpdateEvent>) => {
        this._inputDisabled = !!(event.detail.disabled || event.detail.readonly);
        if (this._min !== event.detail.min) {
          this._min = event.detail.min!;
          this._setDisabledState(this._datePickerElement!);
        }
        this._setAriaLabel();
      },
      { signal: this._datePickerController.signal },
    );

    this._datePickerElement.dispatchEvent(datepickerControlRegisteredEventFactory());
  }

  private _setDisabledState(datepicker: SbbDatepickerElement | null | undefined): void {
    const pickerValueAsDate = datepicker?.getValueAsDate();

    if (!pickerValueAsDate) {
      this._disabled = true;
      return;
    }

    const previousDate: Date = findPreviousAvailableDate(
      pickerValueAsDate,
      datepicker?.dateFilter || null,
      this._dateAdapter,
      this._min,
    );
    this._disabled = this._dateAdapter.compareDate(previousDate, pickerValueAsDate) === 0;
  }

  private _setAriaLabel(): void {
    const currentDate = this._datePickerElement?.getValueAsDate?.();

    if (!currentDate || !this._dateAdapter.isValid(currentDate)) {
      this.setAttribute('aria-label', i18nPreviousDay[this._language.current]);
      return;
    }

    const currentDateString =
      this._datePickerElement?.now().toDateString() === currentDate.toDateString()
        ? i18nToday[this._language.current].toLowerCase()
        : this._dateAdapter.getAccessibilityFormatDate(currentDate);

    this.setAttribute(
      'aria-label',
      i18nSelectPreviousDay(currentDateString)[this._language.current],
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
    'sbb-datepicker-previous-day': SbbDatepickerPreviousDayElement;
  }
}
