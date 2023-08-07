import {
  Component,
  ComponentInterface,
  Element,
  Event,
  EventEmitter,
  h,
  JSX,
  Method,
  Prop,
  State,
  Watch,
} from '@stencil/core';
import { findInput, isValidAttribute, toggleDatasetEntry } from '../../global/dom';
import {
  documentLanguage,
  forwardEventToHost,
  HandlerRepository,
  languageChangeHandlerAspect,
} from '../../global/eventing';
import { ValidationChangeEvent } from '../../global/interfaces';
import { i18nTimeInputChange } from '../../global/i18n';

const REGEX_ALLOWED_CHARACTERS = /[0-9.:,\-;_hH]/;
const REGEX_GROUPS_WITHOUT_COLON = /^([0-9]{1,2})([0-9]{2})$/;
const REGEX_GROUPS_WITH_COLON = /^([0-9]{1,2})?[.:,\-;_hH]?([0-9]{1,2})?$/;

interface Time {
  hours: number;
  minutes: number;
}

@Component({
  shadow: true,
  styleUrl: 'sbb-time-input.scss',
  tag: 'sbb-time-input',
})
export class SbbTimeInput implements ComponentInterface {
  /** Reference of the native input connected to the datepicker. */
  @Prop() public input?: string | HTMLElement;

  /**
   * @deprecated only used for React. Will probably be removed once React 19 is available.
   */
  @Event({ bubbles: true, cancelable: true }) public didChange: EventEmitter;

  /** Emits whenever the internal validation state changes. **/
  @Event() public validationChange: EventEmitter<ValidationChangeEvent>;

  @Element() private _element!: HTMLSbbTimeInputElement;
  @State() private _inputElement: HTMLInputElement | null;
  private _statusContainer: HTMLParagraphElement | null;
  private _abortController = new AbortController();
  private _currentLanguage = documentLanguage();
  private _handlerRepository = new HandlerRepository(
    this._element,
    languageChangeHandlerAspect((l) => (this._currentLanguage = l)),
  );

  @Watch('input')
  public findInput(newValue: string | HTMLElement, oldValue: string | HTMLElement): void {
    if (newValue !== oldValue) {
      this._inputElement = findInput(this._element, this.input);
    }
  }

  @Watch('_inputElement')
  public registerInputElement(newValue: HTMLInputElement, oldValue: HTMLInputElement): void {
    if (newValue === oldValue) {
      return;
    }

    this._abortController?.abort();

    if (!this._inputElement) {
      return;
    }

    this._abortController = new AbortController();

    // Configure input
    toggleDatasetEntry(this._inputElement, 'sbbTimeInput', true);
    this._inputElement.type = 'text';
    this._inputElement.inputMode = 'numeric';
    this._inputElement.maxLength = 5;
    if (!this._inputElement.placeholder) {
      this._inputElement.placeholder = 'HH:MM';
    }

    this._inputElement.addEventListener(
      'input',
      (event: InputEvent) => forwardEventToHost(event, this._element),
      { signal: this._abortController.signal },
    );
    this._inputElement.addEventListener(
      'keydown',
      (event: KeyboardEvent) => this._preventCharInsert(event),
      { signal: this._abortController.signal },
    );
    this._inputElement.addEventListener(
      'change',
      (event: Event) => this._updateValueAndEmitChange(event),
      {
        signal: this._abortController.signal,
      },
    );
  }

  public connectedCallback(): void {
    this._handlerRepository.connect();
    this._inputElement = findInput(this._element, this.input);
    if (this._inputElement) {
      this._updateValue(this._inputElement.value);
    }
  }

  public disconnectedCallback(): void {
    this._abortController?.abort();
    this._handlerRepository.disconnect();
  }

  /** Gets the input value with the correct date format. */
  @Method() public async getValueAsDate(): Promise<Date> {
    return this._formatValueAsDate(this._parseInput(this._inputElement?.value));
  }

  /** Set the input value to the correctly formatted value. */
  @Method() public async setValueAsDate(date: Date | number | string): Promise<void> {
    if (!date || !this._inputElement) {
      return;
    }
    const dateObj = date instanceof Date ? date : new Date(date);

    this._inputElement.value = this._formatValue({
      hours: dateObj.getHours(),
      minutes: dateObj.getMinutes(),
    });

    // Emit blur event when value is changed programmatically to notify
    // frameworks that rely on that event to update form status.
    this._inputElement.dispatchEvent(new FocusEvent('blur', { composed: true }));
  }

  /** Applies the correct format to values and triggers event dispatch. */
  private _updateValueAndEmitChange(event: Event): void {
    this._updateValue((event.target as HTMLInputElement).value);
    this._emitChange(event);
    this._updateAccessibilityMessage();
  }

  /**
   * Updates `value` and `valueAsDate`. The direct update on the `_inputElement` is required
   * to force the input change when the typed value is the same of the current one.
   */
  private _updateValue(value: string): void {
    if (!this._inputElement) {
      return;
    }

    const time = this._parseInput(value);
    const isTimeValid = time && this._isTimeValid(time);
    const isEmptyOrValid = !value || value.trim() === '' || isTimeValid;
    if (isEmptyOrValid && time) {
      this._inputElement.value = this._formatValue(time);
    }

    const wasValid = !isValidAttribute(this._inputElement, 'data-sbb-invalid');
    toggleDatasetEntry(this._inputElement, 'sbbInvalid', !isEmptyOrValid);
    if (wasValid !== isEmptyOrValid) {
      this.validationChange.emit({ valid: isEmptyOrValid });
    }
  }

  /** Emits the change event. */
  private _emitChange(event: Event): void {
    forwardEventToHost(event, this._element);
    this.didChange.emit();
  }

  /** Returns the right format for the `value` property . */
  private _formatValue(time?: Time): string {
    const hours = String(time.hours).padStart(2, '0');
    const minutes = String(time.minutes).padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  /**
   * Returns the right format for the `valueAsDate` property:
   * sets the start date at 01.01.1970, then adds the typed hours/minutes.
   */
  private _formatValueAsDate(time?: Time): Date {
    if (!time || !this._isTimeValid(time)) {
      return null;
    }

    return new Date(new Date(0).setHours(time.hours, time.minutes, 0, 0));
  }

  /** Checks if values of hours and minutes are possible, to avoid non-existent times. */
  private _isTimeValid(time: Time): boolean {
    return time.hours < 24 && time.minutes < 60;
  }

  /** Validate input against the defined RegExps. */
  private _parseInput(value: string): Time {
    const trimmedValue = value.trim();
    if (!trimmedValue) {
      return null;
    }

    // Special case: the input is 3 or 4 digits; split like: AB?:CD
    const match = trimmedValue.match(REGEX_GROUPS_WITHOUT_COLON);
    if (match) {
      return { hours: +match[1] || 0, minutes: +match[2] || 0 };
    }

    const matchColon = trimmedValue.match(REGEX_GROUPS_WITH_COLON);
    if (matchColon) {
      return { hours: +matchColon[1] || 0, minutes: +matchColon[2] || 0 };
    }

    return null;
  }

  /**  Only allow typing numbers and separator keys. */
  private _preventCharInsert(event: KeyboardEvent): void {
    const alwaysAllowed = [
      'Backspace',
      'Tab',
      'Enter',
      'ArrowUp',
      'ArrowDown',
      'ArrowLeft',
      'ArrowRight',
      'Home',
      'End',
      'PageUp',
      'PageDown',
      'Delete',
    ];

    if (
      !event.ctrlKey &&
      !event.altKey &&
      !event.metaKey &&
      !alwaysAllowed.includes(event.key) &&
      !REGEX_ALLOWED_CHARACTERS.test(event.key)
    ) {
      event.preventDefault();
    }
  }

  // We use a programmatic approach to avoid initial setting the message
  // and to not immediately change output if language should change (no reason to read out message).
  private _updateAccessibilityMessage(): void {
    this._statusContainer.innerText = `${i18nTimeInputChange[this._currentLanguage]} ${
      this._inputElement.value
    }.`;
  }

  public render(): JSX.Element {
    return <p role="status" ref={(ref) => (this._statusContainer = ref)}></p>;
  }
}
