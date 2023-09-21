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
import { i18nPreviousDay, i18nSelectPreviousDay, i18nToday } from '../../global/i18n';
import { ButtonProperties, resolveButtonRenderVariables } from '../../global/interfaces';
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
} from '../../global/eventing';
import { isValidAttribute, toggleDatasetEntry } from '../../global/dom';

@Component({
  shadow: true,
  styleUrl: 'sbb-datepicker-previous-day.scss',
  tag: 'sbb-datepicker-previous-day',
})
export class SbbDatepickerPreviousDay implements ComponentInterface, ButtonProperties {
  /** The name attribute to use for the button. */
  @Prop({ reflect: true }) public name: string | undefined;

  /** Negative coloring variant flag. */
  @Prop({ reflect: true, mutable: true }) public negative = false;

  /** Datepicker reference. */
  @Prop() public datePicker?: string | HTMLElement;

  @Element() private _element!: HTMLSbbDatepickerPreviousDayElement;

  /** Whether the component is disabled due date equals to min date. */
  @State() private _disabled = false;

  /** Whether the component is disabled due date-picker's input disabled. */
  @State() private _inputDisabled = false;

  /** The minimum date as set in the date-picker's input. */
  @State() private _min: string | number;

  @State() private _currentLanguage = documentLanguage();

  private _handlerRepository = new HandlerRepository(
    this._element as HTMLElement,
    actionElementHandlerAspect,
    languageChangeHandlerAspect((l) => {
      this._currentLanguage = l;
      this._setAriaLabel();
    }),
  );

  private _datePickerElement: HTMLSbbDatepickerElement;

  private _dateAdapter: DateAdapter<Date> = new NativeDateAdapter();

  private _datePickerController: AbortController;

  @Watch('datePicker')
  public async findDatePicker(
    newValue: string | HTMLElement,
    oldValue: string | HTMLElement,
  ): Promise<void> {
    if (newValue !== oldValue) {
      await this._init(this.datePicker);
    }
  }

  @Listen('click')
  public async handleClick(): Promise<void> {
    if (!this._datePickerElement || isValidAttribute(this._element, 'data-disabled')) {
      return;
    }
    const startingDate: Date = (await this._datePickerElement.getValueAsDate()) ?? this._now();
    const date: Date = findPreviousAvailableDate(
      startingDate,
      this._datePickerElement.dateFilter,
      this._dateAdapter,
      this._min,
    );
    if (this._dateAdapter.compareDate(date, startingDate) !== 0) {
      await this._datePickerElement.setValueAsDate(date);
    }
  }

  public async connectedCallback(): Promise<void> {
    this._handlerRepository.connect();
    this._syncUpstreamProperties();
    await this._init(this.datePicker);
  }

  private _syncUpstreamProperties(): void {
    const formField =
      this._element.closest('sbb-form-field') ?? this._element.closest('[data-form-field]');
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

  public disconnectedCallback(): void {
    this._handlerRepository.disconnect();
    this._datePickerController?.abort();
  }

  private async _init(picker?: string | HTMLElement): Promise<void> {
    this._datePickerController?.abort();
    this._datePickerController = new AbortController();
    this._datePickerElement = getDatePicker(this._element, picker);
    if (!this._datePickerElement) {
      return;
    }
    await this._setDisabledState(this._datePickerElement);
    await this._setAriaLabel();

    this._datePickerElement.addEventListener(
      'change',
      (event: Event) => {
        this._setDisabledState(event.target as HTMLSbbDatepickerElement);
        this._setAriaLabel();
      },
      { signal: this._datePickerController.signal },
    );
    this._datePickerElement.addEventListener(
      'datePickerUpdated',
      (event: Event) => {
        this._setDisabledState(event.target as HTMLSbbDatepickerElement);
        this._setAriaLabel();
      },
      { signal: this._datePickerController.signal },
    );
    this._datePickerElement.addEventListener(
      'inputUpdated',
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

  private async _setDisabledState(datepicker: HTMLSbbDatepickerElement): Promise<void> {
    const pickerValueAsDate: Date = await datepicker.getValueAsDate();

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

  private async _setAriaLabel(): Promise<void> {
    const currentDate = await this._datePickerElement.getValueAsDate();

    if (!currentDate) {
      this._element.setAttribute('aria-label', i18nPreviousDay[this._currentLanguage]);
      return;
    }

    const currentDateString =
      this._dateAdapter.today().toDateString() === currentDate.toDateString()
        ? i18nToday[this._currentLanguage].toLowerCase()
        : this._dateAdapter.getAccessibilityFormatDate(currentDate);

    this._element.setAttribute(
      'aria-label',
      i18nSelectPreviousDay(currentDateString)[this._currentLanguage],
    );
  }

  public render(): JSX.Element {
    toggleDatasetEntry(this._element, 'disabled', this._disabled || this._inputDisabled);
    const { hostAttributes } = resolveButtonRenderVariables({
      ...this,
      disabled: isValidAttribute(this._element, 'data-disabled'),
    });

    return (
      <Host {...hostAttributes} slot="prefix">
        <span class="sbb-datepicker-previous-day">
          <sbb-icon name="chevron-small-left-small" />
        </span>
      </Host>
    );
  }
}
