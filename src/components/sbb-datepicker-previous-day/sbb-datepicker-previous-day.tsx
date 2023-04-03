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
import { actionElementHandlerAspect, HandlerRepository } from '../../global/helpers';
import { documentLanguage, SbbLanguageChangeEvent } from '../../global/helpers/language';
import { NativeDateAdapter } from '../../global/helpers/native-date-adapter';
import { i18nPreviousDay } from '../../global/i18n';
import { DateAdapter } from '../../global/interfaces/date-adapter';
import {
  ButtonProperties,
  resolveButtonRenderVariables,
} from '../../global/interfaces/link-button-properties';
import {
  findPreviousAvailableDate,
  getDatePicker,
  InputUpdateEvent,
} from '../sbb-datepicker/sbb-datepicker.helper';

@Component({
  shadow: true,
  styleUrl: 'sbb-datepicker-previous-day.scss',
  tag: 'sbb-datepicker-previous-day',
})
export class SbbDatepickerPreviousDay implements ComponentInterface, ButtonProperties {
  /** Whether the button is disabled */
  @Prop({ reflect: true, mutable: true }) public disabled = false;

  /** The name attribute to use for the button. */
  @Prop({ reflect: true }) public name: string | undefined;

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
    actionElementHandlerAspect
  );

  private _datePickerElement: HTMLSbbDatepickerElement;

  private _dateAdapter: DateAdapter<Date> = new NativeDateAdapter();

  private _datePickerController: AbortController;

  @Watch('datePicker')
  public findDatePicker(newValue: string | HTMLElement, oldValue: string | HTMLElement): void {
    if (newValue !== oldValue) {
      this._init(this.datePicker);
    }
  }

  @Listen('click')
  public async handleClick(): Promise<void> {
    if (!this._datePickerElement) {
      return;
    }
    const startingDate: Date = (await this._datePickerElement.getValueAsDate()) ?? this._now();
    const date: Date = findPreviousAvailableDate(
      startingDate,
      this._datePickerElement.dateFilter,
      this._dateAdapter,
      this._min
    );
    if (this._dateAdapter.compareDate(date, startingDate) !== 0) {
      await this._datePickerElement.setValueAsDate(date);
    }
  }

  @Listen('sbbLanguageChange', { target: 'document' })
  public handleLanguageChange(event: SbbLanguageChangeEvent): void {
    this._currentLanguage = event.detail;
  }

  public connectedCallback(): void {
    this._handlerRepository.connect();
    this._init(this.datePicker);
  }

  public disconnectedCallback(): void {
    this._handlerRepository.disconnect();
    this._datePickerController?.abort();
  }

  private _init(picker?: string | HTMLElement): void {
    this._datePickerController?.abort();
    this._datePickerController = new AbortController();
    this._datePickerElement = getDatePicker(this._element, picker);
    if (!this._datePickerElement) {
      return;
    }
    this._setDisabledState(this._datePickerElement);

    this._datePickerElement.addEventListener(
      'change',
      (event: Event) => this._setDisabledState(event.target as HTMLSbbDatepickerElement),
      { signal: this._datePickerController.signal }
    );
    this._datePickerElement.addEventListener(
      'datePickerUpdated',
      (event: Event) => this._setDisabledState(event.target as HTMLSbbDatepickerElement),
      { signal: this._datePickerController.signal }
    );
    this._datePickerElement.addEventListener(
      'inputUpdated',
      (event: CustomEvent<InputUpdateEvent>) => {
        this._inputDisabled = event.detail.disabled || event.detail.readonly;
        if (this._min !== event.detail.min) {
          this._min = event.detail.min;
          this._setDisabledState(this._datePickerElement);
        }
      },
      { signal: this._datePickerController.signal }
    );
  }

  private async _setDisabledState(datepicker: HTMLSbbDatepickerElement): Promise<void> {
    const pickerValueAsDate: Date = await datepicker.getValueAsDate();
    if (pickerValueAsDate) {
      const previousDate: Date = findPreviousAvailableDate(
        pickerValueAsDate,
        datepicker.dateFilter,
        this._dateAdapter,
        this._min
      );
      this._disabled = this._dateAdapter.compareDate(previousDate, pickerValueAsDate) === 0;
    }
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
    this.disabled = this._disabled || this._inputDisabled;
    const { hostAttributes } = resolveButtonRenderVariables(this);

    return (
      <Host {...hostAttributes} slot="prefix" aria-label={i18nPreviousDay[this._currentLanguage]}>
        <span class="sbb-datepicker-previous-day">
          <sbb-icon name="chevron-small-left-small" />
        </span>
      </Host>
    );
  }
}
