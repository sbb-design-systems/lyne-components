import {
  Component,
  ComponentInterface,
  Element,
  Event,
  EventEmitter,
  h,
  JSX,
  Listen,
  Method,
  Prop,
  State,
  Watch,
} from '@stencil/core';
import { InputUpdateEvent, isDateAvailable } from './sbb-datepicker.helper';
import { i18nDatePickerPlaceholder, i18nDateChangedTo, i18nNoDate } from '../../global/i18n';
import { DateAdapter } from '../../global/datetime';
import { findInput, isValidAttribute, toggleDatasetEntry } from '../../global/dom';
import {
  documentLanguage,
  HandlerRepository,
  languageChangeHandlerAspect,
} from '../../global/eventing';
import { AgnosticMutationObserver } from '../../global/observers';
import { readConfig } from '../../global/config';
import { ValidationChangeEvent } from '../../global/interfaces';

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

  /** A function used to filter out dates. */
  @Prop() public dateFilter: (date: Date | null) => boolean = () => true;

  /** A function used to parse string value into dates. */
  @Prop() public dateParser?: (value: string) => Date | undefined;

  /** A function used to format dates into the preferred string format. */
  @Prop() public format?: (date: Date) => string;

  /** Reference of the native input connected to the datepicker. */
  @Prop() public input?: string | HTMLElement;

  /** Host element */
  @Element() private _element!: HTMLSbbDatepickerElement;

  /**
   * @deprecated only used for React. Will probably be removed once React 19 is available.
   */
  @Event({ bubbles: true, cancelable: true }) public didChange: EventEmitter;

  @Event({ bubbles: true }) public change: EventEmitter;

  /** Notifies that the attributes of the input connected to the datepicker has changes. */
  @Event({ bubbles: true, cancelable: true }) public inputUpdated: EventEmitter<InputUpdateEvent>;

  /** Notifies that the attributes of the datepicker has changes. */
  @Event({ bubbles: true, cancelable: true }) public datePickerUpdated: EventEmitter;

  /** Emits whenever the internal validation state changes. */
  @Event() public validationChange: EventEmitter<ValidationChangeEvent>;

  @State() private _inputElement: HTMLInputElement | null;

  @State() private _currentLanguage = documentLanguage();

  @Watch('input')
  public findInput(newValue: string | HTMLElement, oldValue: string | HTMLElement): void {
    if (newValue !== oldValue) {
      this._inputElement = findInput(this._element, this.input);
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

      if (!this._inputElement.placeholder) {
        this._inputElement.placeholder = i18nDatePickerPlaceholder[this._currentLanguage];
      }

      this._inputElement.addEventListener(
        'change',
        async (event: Event) => {
          if (!(event instanceof CustomEvent)) {
            await this._valueChanged(event);
          }
        },
        {
          signal: this._datePickerController.signal,
        },
      );
    }
  }

  /** Gets the input value with the correct date format. */
  @Method() public async getValueAsDate(): Promise<Date> {
    return this._parse(this._inputElement?.value);
  }

  /** Set the input value to the correctly formatted value. */
  @Method() public async setValueAsDate(date: Date | number | string): Promise<void> {
    const parsedDate = date instanceof Date ? date : new Date(date);
    await this._formatAndUpdateValue(this._inputElement.value, parsedDate);
    /* Emit blur event when value is changed programmatically to notify 
    frameworks that rely on that event to update form status. */
    this._inputElement.dispatchEvent(new FocusEvent('blur', { composed: true }));
  }

  @Listen('datepicker-control-registered')
  private _onInputPropertiesChange(mutationsList?: MutationRecord[]): void {
    this.inputUpdated.emit({
      disabled: this._inputElement?.disabled,
      readonly: this._inputElement?.readOnly,
      min: this._inputElement?.min,
      max: this._inputElement?.max,
    });

    if (mutationsList && Array.from(mutationsList).some((e) => e.attributeName === 'value')) {
      this._inputElement.value = this._getValidValue(this._inputElement?.getAttribute('value'));
    }
  }

  private _datePickerController: AbortController;

  private _inputObserver = new AgnosticMutationObserver(this._onInputPropertiesChange.bind(this));

  private _dateAdapter: DateAdapter<Date> = readConfig().datetime.dateAdapter;

  private _statusContainer: HTMLParagraphElement | null;

  private _handlerRepository = new HandlerRepository(
    this._element as HTMLElement,
    languageChangeHandlerAspect(async (l) => {
      this._currentLanguage = l;
      if (this._inputElement) {
        this._inputElement.placeholder = i18nDatePickerPlaceholder[this._currentLanguage];
        const valueAsDate = await this.getValueAsDate();
        this._inputElement.value = this._format(valueAsDate);
      }
    }),
  );

  public connectedCallback(): void {
    this._handlerRepository.connect();
    this._inputElement = findInput(this._element, this.input);
    if (this._inputElement) {
      this._inputElement.value = this._getValidValue(this._inputElement.value);
    }
  }

  public disconnectedCallback(): void {
    this._inputObserver?.disconnect();
    this._datePickerController?.abort();
    this._handlerRepository.disconnect();
  }

  private _parseAndFormatValue(value: string): string {
    const d = this._parse(value);
    return !this._dateAdapter.isValid(d) ? value : this._format(d);
  }

  private _createAndComposeDate(value: string | number | Date): string {
    const date = new Date(value);
    return this._format(date);
  }

  private async _valueChanged(event): Promise<void> {
    await this._formatAndUpdateValue(event.target.value, this._parse(event.target.value));
  }

  /** Applies the correct format to values and triggers event dispatch. */
  private _formatAndUpdateValue(value: string, valueAsDate: Date): void {
    if (this._inputElement) {
      this._inputElement.value = !this._dateAdapter.isValid(valueAsDate)
        ? value
        : this._format(valueAsDate);

      const isEmptyOrValid =
        !value ||
        (!!valueAsDate &&
          isDateAvailable(
            valueAsDate,
            this._element.dateFilter,
            this._inputElement?.min,
            this._inputElement?.max,
          ));
      const wasValid = !isValidAttribute(this._inputElement, 'data-sbb-invalid');
      toggleDatasetEntry(this._inputElement, 'sbbInvalid', !isEmptyOrValid);
      if (wasValid !== isEmptyOrValid) {
        this.validationChange.emit({ valid: isEmptyOrValid });
      }
      this._emitChange(valueAsDate);
    }
  }

  /** Emits the change event. */
  private _emitChange(date: Date): void {
    this._setAriaLiveMessage(date);

    this.change.emit();
    this.didChange.emit();

    if (this._inputElement) {
      this._inputElement.dispatchEvent(new InputEvent('input', { bubbles: true, composed: true }));
      this._inputElement.dispatchEvent(new CustomEvent('change', { bubbles: true }));
    }
  }

  private _getValidValue(value: string): string {
    if (!value) {
      return '';
    }

    const match: RegExpMatchArray = value.match(FORMAT_DATE);

    if (match?.index === 0) {
      return this._parseAndFormatValue(value);
    } else if (Number.isInteger(+value)) {
      return this._createAndComposeDate(+value);
    } else if (this._dateAdapter.isValid(new Date(value))) {
      return this._createAndComposeDate(value);
    }

    return value;
  }

  private _parse(value: string): Date | undefined {
    return this.dateParser ? this.dateParser(value) : this._dateAdapter.parseDate(value);
  }

  private _format(date: Date): string {
    return this.format ? this.format(date) : this._dateAdapter.format(date);
  }

  private _setAriaLiveMessage(date: Date): void {
    const ariaLiveFormatter = new Intl.DateTimeFormat(`${this._currentLanguage}-CH`, {
      weekday: 'long',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });

    this._statusContainer.innerHTML = date
      ? `${i18nDateChangedTo[this._currentLanguage]} ${ariaLiveFormatter.format(date)}`
      : i18nNoDate[this._currentLanguage];
  }

  public render(): JSX.Element {
    return (
      <p role="status" ref={(ref) => (this._statusContainer = ref)}></p>
    );
  }
}
