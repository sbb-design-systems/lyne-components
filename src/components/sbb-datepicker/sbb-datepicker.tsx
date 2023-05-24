import {
  Component,
  ComponentInterface,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  JSX,
  Listen,
  Method,
  Prop,
  State,
  Watch,
} from '@stencil/core';
import { HandlerRepository } from '../../global/helpers';
import {
  documentLanguage,
  languageChangeHandlerAspect,
} from '../../global/helpers/eventing/language-change-handler';
import { AgnosticMutationObserver as MutationObserver } from '../../global/helpers/mutation-observer';
import { NativeDateAdapter } from '../../global/helpers/native-date-adapter';
import { i18nDatePickerPlaceholder } from '../../global/i18n';
import { DateAdapter } from '../../global/interfaces/date-adapter';
import { getInput, InputUpdateEvent, isDateAvailable } from './sbb-datepicker.helper';

const ALLOWED_CHARACTERS = /([0-9]{1,2})[.,\\/\-\s]?([0-9]{1,2})?[.,\\/\-\s]?([0-9]{1,4})?/;
const FORMAT_DATE =
  /(^0?[1-9]?|[12]?[0-9]?|3?[01]?)[.,\\/\-\s](0?[1-9]?|1?[0-2]?)?[.,\\/\-\s](\d{1,4}$)?/;

@Component({
  shadow: true,
  styleUrl: 'sbb-datepicker.scss',
  tag: 'sbb-datepicker',
})
export class SbbDatepicker implements ComponentInterface {
  /** If set to true, two months are displayed */
  @Prop() public wide = false;

  /**
   * Cutoff year offset to interpret two digit values.
   * e.g. in 2025 with offset equal to 15, 00-40 = 2000-2040, 41-99 = 1941 - 1999.
   */
  @Prop() public cutoffYearOffset = 15;

  /** A function used to filter out dates. */
  @Prop() public dateFilter: (date: Date | null) => boolean = () => true;

  /** Reference of the native input connected to the datepicker. */
  @Prop() public input?: string | HTMLElement;

  /** Host element */
  @Element() private _element!: HTMLSbbDatepickerElement;

  /**
   * @deprecated only used for React. Will probably be removed once React 19 is available.
   */
  @Event({ bubbles: true, cancelable: true }) public didChange: EventEmitter;

  @Event({ bubbles: true, cancelable: false, composed: false }) public change: EventEmitter;

  /** Notifies that the attributes of the input connected to the datepicker has changes. */
  @Event({ bubbles: true, cancelable: true }) public inputUpdated: EventEmitter<InputUpdateEvent>;

  /** Notifies that the attributes of the datepicker has changes. */
  @Event({ bubbles: true, cancelable: true }) public datePickerUpdated: EventEmitter;

  @State() private _inputElement: HTMLInputElement;

  @State() private _currentLanguage = documentLanguage();

  @Watch('input')
  public findInput(newValue: string | HTMLElement, oldValue: string | HTMLElement): void {
    if (newValue !== oldValue) {
      this._inputElement = getInput(this._element, this.input);
    }
  }

  @Watch('wide')
  @Watch('dateFilter')
  public datepickerPropChanged(newValue: any, oldValue: any): void {
    if (newValue !== oldValue) {
      this.datePickerUpdated.emit();
    }
  }

  @Watch('_inputElement')
  public registerInputElement(newValue: HTMLInputElement, oldValue: HTMLInputElement): void {
    if (newValue !== oldValue) {
      this._datePickerController?.abort();
      this._datePickerController = new AbortController();

      if (!this._inputElement) {
        return;
      }

      this._inputObserver?.disconnect();
      this._inputObserver.observe(this._inputElement, {
        attributeFilter: ['disabled', 'readonly', 'min', 'max', 'value'],
      });

      this._inputElement.type = 'text';
      this._inputElement.ariaAtomic = 'true';
      this._inputElement.ariaLive = 'polite';

      if (!this._inputElement.placeholder) {
        this._inputElement.placeholder = i18nDatePickerPlaceholder[this._currentLanguage];
      }

      this._inputElement.addEventListener(
        'input',
        (event: Event) => {
          if (!(event instanceof CustomEvent)) {
            this._preventCharInsert(event);
          }
        },
        { signal: this._datePickerController.signal }
      );
      this._inputElement.addEventListener(
        'change',
        (event: Event) => {
          if (!(event instanceof CustomEvent)) {
            this._valueChanged(event);
          }
        },
        {
          signal: this._datePickerController.signal,
        }
      );
      /** Remove aria-live=polite during text edit to avoid screen reader repeating everything twice. */
      this._inputElement.addEventListener(
        'focus',
        (event: Event) => (event.target as HTMLInputElement).removeAttribute('aria-live'),
        {
          signal: this._datePickerController.signal,
        }
      );
      /** Set aria-live=polite after text edit ends to make sure state changes are correctly announced. */
      this._inputElement.addEventListener(
        'blur',
        (event: Event) => ((event.target as HTMLInputElement).ariaLive = 'polite'),
        {
          signal: this._datePickerController.signal,
        }
      );
    }
  }

  /** Gets the input value with the correct date format. */
  @Method() public async getValueAsDate(): Promise<Date> {
    return this._dateAdapter.formatValueAsDate(this._formatValue(this._inputElement?.value));
  }

  /** Set the input value to the correctly formatted value. */
  @Method() public async setValueAsDate(date: Date): Promise<void> {
    await this._formatAndUpdateValue(this._createAndComposeDate(date));
  }

  @Listen('datepicker-control-registered')
  private _onInputPropertiesChange(mutationsList: MutationRecord[]): void {
    this.inputUpdated.emit({
      disabled: this._inputElement?.disabled,
      readonly: this._inputElement?.readOnly,
      min: this._inputElement?.min,
      max: this._inputElement?.max,
    });

    if (Array.from(mutationsList).some((e) => e.attributeName === 'value')) {
      this._inputElement.value = this._getValidValue(this._inputElement?.getAttribute('value'));
    }
  }

  private _datePickerController: AbortController;

  private _inputObserver = new MutationObserver(this._onInputPropertiesChange.bind(this));

  private _dateAdapter: DateAdapter<Date> = new NativeDateAdapter();

  private _handlerRepository = new HandlerRepository(
    this._element as HTMLElement,
    languageChangeHandlerAspect((l) => {
      this._currentLanguage = l;
      if (this._inputElement) {
        this._inputElement.placeholder = i18nDatePickerPlaceholder[this._currentLanguage];
      }
    })
  );

  public connectedCallback(): void {
    this._handlerRepository.connect();
    this._inputElement = getInput(this._element, this.input);
    if (this._inputElement) {
      this._inputElement.value = this._getValidValue(this._inputElement?.value);
    }
  }

  public disconnectedCallback(): void {
    this._inputObserver?.disconnect();
    this._datePickerController?.abort();
    this._handlerRepository.disconnect();
  }

  private _formatValue(value: string): string {
    const match: RegExpMatchArray = value?.match(FORMAT_DATE);
    if (!match || match.length <= 2) {
      return value;
    }

    return this._composeValueString(match[1], match[2], +match[3]);
  }

  private _createAndComposeDate(value: string | number | Date): string {
    const date = new Date(value);
    return this._composeValueString(
      `${this._dateAdapter.getDate(date)}`,
      `${this._dateAdapter.getMonth(date) + 1}`,
      this._dateAdapter.getYear(date)
    );
  }

  private _composeValueString(_day: string, _month: string, year: number): string {
    const day: string = _day.padStart(2, '0');
    const month: string = _month.padStart(2, '0');
    if (!!year && year < 100 && year >= 0) {
      const shift = new Date().getFullYear() - 2000 + this.cutoffYearOffset;
      year = year <= shift ? 2000 + year : 1900 + year;
    }
    return `${day}.${month}.${year || ''}`;
  }

  private _valueChanged(event): void {
    this._formatAndUpdateValue(event.target.value);
  }

  /** Applies the correct format to values and triggers event dispatch. */
  private async _formatAndUpdateValue(value: string): Promise<void> {
    if (this._inputElement) {
      this._inputElement.classList.remove('sbb-invalid');
      this._inputElement.value = this._formatValue(value);
      const newValueAsDate: Date = await this.getValueAsDate();
      if (
        !isDateAvailable(
          newValueAsDate,
          this._element.dateFilter,
          this._inputElement?.min,
          this._inputElement?.max
        )
      ) {
        this._inputElement.classList.add('sbb-invalid');
      }
      this._emitChange();
    }
  }

  /** Emits the change event. */
  private _emitChange(): void {
    this.change.emit();
    this.didChange.emit();

    if (this._inputElement) {
      this._inputElement.dispatchEvent(new InputEvent('input', { bubbles: true, composed: true }));
      this._inputElement.dispatchEvent(new CustomEvent('change', { bubbles: true }));
    }
  }

  private _preventCharInsert(event): void {
    const match = event.target.value.match(ALLOWED_CHARACTERS);
    event.target.value = match?.[0] ?? null;
  }

  private _getValidValue(value: string): string {
    if (!value) {
      return '';
    }

    const match: RegExpMatchArray = value.match(FORMAT_DATE);

    if (match?.index === 0) {
      return this._formatValue(value);
    }

    if (Number.isInteger(+value)) {
      return this._createAndComposeDate(+value);
    } else if (this._dateAdapter.isValid(new Date(value))) {
      return this._createAndComposeDate(value);
    }

    return value;
  }

  public render(): JSX.Element {
    return <Host></Host>;
  }
}
