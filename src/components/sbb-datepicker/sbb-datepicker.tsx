import { CSSResult, LitElement, PropertyValues, TemplateResult, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { readConfig } from '../../global/config';
import { DateAdapter } from '../../global/datetime';
import { findInput, isValidAttribute, toggleDatasetEntry } from '../../global/dom';
import { ref } from 'lit/directives/ref.js';
import {
  ConnectedAbortController,
  EventEmitter,
  HandlerRepository,
  documentLanguage,
  languageChangeHandlerAspect,
} from '../../global/eventing';
import { i18nDateChangedTo, i18nDatePickerPlaceholder } from '../../global/i18n';
import { ValidationChangeEvent } from '../../global/interfaces';
import { SbbDateLike } from '../../global/types';
import { AgnosticMutationObserver } from '../../global/observers';
import { InputUpdateEvent, isDateAvailable } from './sbb-datepicker.helper';
import Style from './sbb-datepicker.scss?lit&inline';

const FORMAT_DATE =
  /(^0?[1-9]?|[12]?[0-9]?|3?[01]?)[.,\\/\-\s](0?[1-9]?|1?[0-2]?)?[.,\\/\-\s](\d{1,4}$)?/;

export const events = {
  didChange: 'did-change',
  change: 'change',
  inputUpdated: 'input-updated',
  datePickerUpdated: 'date-picker-updated',
  validationChange: 'validation-change',
};

@customElement('sbb-datepicker')
export class SbbDatepicker extends LitElement {
  public static override styles: CSSResult = Style;

  /** If set to true, two months are displayed */
  @property({ type: Boolean }) public wide = false;

  /** A function used to filter out dates. */
  @property({ attribute: 'date-filter' }) public dateFilter: (date: Date | null) => boolean = () =>
    true;

  /** A function used to parse string value into dates. */
  @property({ attribute: 'date-parser' }) public dateParser?: (value: string) => Date | undefined;

  /** A function used to format dates into the preferred string format. */
  @property() public format?: (date: Date) => string;

  /** Reference of the native input connected to the datepicker. */
  @property() public input?: string | HTMLElement;

  /**
   * @deprecated only used for React. Will probably be removed once React 19 is available.
   */
  private _didChange: EventEmitter = new EventEmitter(this, events.didChange, {
    bubbles: true,
    cancelable: true,
  });

  private _change: EventEmitter = new EventEmitter(this, events.change, { bubbles: true });

  /** Notifies that the attributes of the input connected to the datepicker have changes. */
  private _inputUpdated: EventEmitter<InputUpdateEvent> = new EventEmitter(
    this,
    events.inputUpdated,
    { bubbles: true, cancelable: true },
  );

  /** Notifies that the attributes of the datepicker have changes. */
  private _datePickerUpdated: EventEmitter = new EventEmitter(this, events.datePickerUpdated, {
    bubbles: true,
    cancelable: true,
  });

  /** Emits whenever the internal validation state changes. */
  private _validationChange: EventEmitter<ValidationChangeEvent> = new EventEmitter(
    this,
    events.validationChange,
  );

  private get _inputElement(): HTMLInputElement | null {
    return this._inputElementInternaValue;
  }

  private set _inputElement(value) {
    const oldValue = this._inputElementInternaValue;
    this._inputElementInternaValue = value;
    this._registerInputElement(this._inputElementInternaValue, oldValue);
    this.requestUpdate('active', oldValue);
  }

  private _inputElementInternaValue: HTMLInputElement | null;

  @state() private _currentLanguage = documentLanguage();

  private _findInput(newValue: string | HTMLElement, oldValue: string | HTMLElement): void {
    if (newValue !== oldValue) {
      this._inputElement = findInput(this, this.input);
    }
  }

  private _datepickerPropChanged(newValue: any, oldValue: any): void {
    if (newValue !== oldValue) {
      this._datePickerUpdated.emit();
    }
  }

  private _registerInputElement(newValue: HTMLInputElement, oldValue: HTMLInputElement): void {
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
  public getValueAsDate(): Date {
    return this._parse(this._inputElement?.value);
  }

  /** Set the input value to the correctly formatted value. */
  public setValueAsDate(date: SbbDateLike): void {
    const parsedDate = date instanceof Date ? date : new Date(date);
    this._formatAndUpdateValue(this._inputElement.value, parsedDate);
    /* Emit blur event when value is changed programmatically to notify
    frameworks that rely on that event to update form status. */
    this._inputElement.dispatchEvent(new Event('blur', { composed: true }));
  }

  private _onInputPropertiesChange(mutationsList?: MutationRecord[]): void {
    this._inputUpdated.emit({
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
    this as HTMLElement,
    languageChangeHandlerAspect(async (l) => {
      this._currentLanguage = l;
      if (this._inputElement) {
        this._inputElement.placeholder = i18nDatePickerPlaceholder[this._currentLanguage];
        const valueAsDate = await this.getValueAsDate();
        this._inputElement.value = this._format(valueAsDate);
      }
    }),
  );

  public override connectedCallback(): void {
    super.connectedCallback();
    const signal = this._abort.signal;
    this.addEventListener('datepicker-control-registered', () => this._onInputPropertiesChange(), {
      signal,
    });
    this._handlerRepository.connect();
    this._inputElement = findInput(this, this.input);
    if (this._inputElement) {
      this._inputElement.value = this._getValidValue(this._inputElement.value);
      this._inputUpdated.emit({
        disabled: this._inputElement?.disabled,
        readonly: this._inputElement?.readOnly,
        min: this._inputElement?.min,
        max: this._inputElement?.max,
      });
    }
  }

  public override willUpdate(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('input')) {
      this._findInput(this.input, changedProperties.get('input'));
    }
    if (changedProperties.has('wide') || changedProperties.has('dateFilter')) {
      this._datepickerPropChanged(this.wide, changedProperties.get('wide'));
    }
  }
  private _abort = new ConnectedAbortController(this);

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._inputObserver?.disconnect();
    this._datePickerController?.abort();
    this._handlerRepository.disconnect();
  }

  private _parseAndFormatValue(value: string): string {
    const d = this._parse(value);
    return !this._dateAdapter.isValid(d) ? value : this._format(d);
  }

  private _createAndComposeDate(value: SbbDateLike): string {
    const date = new Date(value);
    return this._format(date);
  }

  private _valueChanged(event): void {
    this._formatAndUpdateValue(event.target.value, this._parse(event.target.value));
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
            this.dateFilter,
            this._inputElement?.min,
            this._inputElement?.max,
          ));
      const wasValid = !isValidAttribute(this._inputElement, 'data-sbb-invalid');
      toggleDatasetEntry(this._inputElement, 'sbbInvalid', !isEmptyOrValid);
      if (wasValid !== isEmptyOrValid) {
        this._validationChange.emit({ valid: isEmptyOrValid });
      }
      this._emitChange(valueAsDate);
    }
  }

  /** Emits the change event. */
  private _emitChange(date: Date): void {
    this._setAriaLiveMessage(date);

    this._change.emit();
    this._didChange.emit();

    if (this._inputElement) {
      this._inputElement.dispatchEvent(new InputEvent('input', { bubbles: true, composed: true }));
      this._inputElement.dispatchEvent(
        new CustomEvent('change', { bubbles: true, composed: true }),
      );
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
    const ariaLiveFormatterDay = new Intl.DateTimeFormat(`${this._currentLanguage}-CH`, {
      weekday: 'long',
    });
    const ariaLiveFormatterDate = new Intl.DateTimeFormat(`${this._currentLanguage}-CH`, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });

    this._statusContainer.innerText = date
      ? `${i18nDateChangedTo[this._currentLanguage]} ${ariaLiveFormatterDay.format(
          date,
        )}, ${ariaLiveFormatterDate.format(date)}`
      : '';
  }

  protected override render(): TemplateResult {
    return html`<p
      role="status"
      ${ref((ref: HTMLParagraphElement): void => {
        this._statusContainer = ref;
      })}
    ></p>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-datepicker': SbbDatepicker;
  }
}
