import {
  Component,
  ComponentInterface,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  JSX,
  Method,
  Prop,
  State,
  Watch,
} from '@stencil/core';
import { findInput, toggleDatasetEntry } from '../../global/dom';
import { forwardEventToHost } from '../../global/eventing';
import { AgnosticMutationObserver } from '../../global/observers';

const REGEX_PATTERN = /[0-9]{3,4}/;
const REGEX_GROUPS_WITH_COLON = /([0-9]{1,2})?[.:,\-;_hH]?([0-9]{1,2})?/;
const REGEX_GROUPS_WO_COLON = /([0-9]{1,2})([0-9]{2})/;

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

  @Element() private _element!: HTMLSbbTimeInputElement;
  @State() private _inputElement: HTMLInputElement | null;

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
    this._inputObserver?.disconnect();

    if (!this._inputElement) {
      return;
    }

    this._abortController = new AbortController();

    // Configure input
    this._inputElement.type = 'text';
    this._inputElement.inputMode = 'numeric';
    if (!this._inputElement.placeholder) {
      this._inputElement.placeholder = 'HH:MM';
    }

    // Listen to value attribute changes of input
    this._inputObserver.observe(this._inputElement, {
      attributeFilter: ['value'],
    });
    this._inputElement.addEventListener(
      'input',
      (event: InputEvent) => {
        if (!(event instanceof CustomEvent)) {
          this._enforcePattern(event);
        }
        forwardEventToHost(event, this._element);
      },
      { signal: this._abortController.signal },
    );
    this._inputElement.addEventListener(
      'keydown',
      (event: KeyboardEvent) => {
        if (!(event instanceof CustomEvent)) {
          this._preventCharInsert(event);
        }
      },
      { signal: this._abortController.signal },
    );
    this._inputElement.addEventListener(
      'change',
      async (event: Event) => {
        if (!(event instanceof CustomEvent)) {
          await this._updateValueAndEmitChange(event);
        }
      },
      {
        signal: this._abortController.signal,
      },
    );
  }

  private _abortController = new AbortController();
  private _inputObserver = new AgnosticMutationObserver(
    this._onInputValueAttributeChange.bind(this),
  );

  public connectedCallback(): void {
    this._inputElement = findInput(this._element, this.input);
    if (this._inputElement) {
      this._updateValue(this._inputElement.value);
    }
  }

  public disconnectedCallback(): void {
    this._inputObserver?.disconnect();
    this._abortController?.abort();
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
    const isInvalid = time && this._isTimeInvalid(time);
    this._inputElement.value = isInvalid ? value : this._formatValue(time);
    toggleDatasetEntry(this._inputElement, 'sbbInvalid', isInvalid);
  }

  /** Emits the change event. */
  private _emitChange(event: Event): void {
    forwardEventToHost(event, this._element);
    this.didChange.emit();
  }

  /** Returns the right format for the `value` property . */
  private _formatValue(time?: Time): string {
    if (!time) {
      return null;
    }

    const hours = String(time.hours).padStart(2, '0');
    const minutes = String(time.minutes).padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  /**
   * Returns the right format for the `valueAsDate` property:
   * sets the start date at 01.01.1970, then adds the typed hours/minutes.
   */
  private _formatValueAsDate(time?: Time): Date {
    if (!time || this._isTimeInvalid(time)) {
      return null;
    }

    return new Date(new Date(0).setHours(time.hours, time.minutes, 0, 0));
  }

  /** Checks if values of hours and minutes are possible, to avoid non-existent times. */
  private _isTimeInvalid(time: Time): boolean {
    return time.hours >= 24 || time.minutes >= 60;
  }

  /** Validate input against the defined RegExps. */
  private _parseInput(value: string): Time {
    if (REGEX_PATTERN.test(value)) {
      // special case: the input is 3 or 4 digits; split like so: AB?:CD
      const regGroups = value.match(REGEX_GROUPS_WO_COLON);
      return { hours: +regGroups[1] || 0, minutes: +regGroups[2] || 0 };
    } else if (value) {
      const regGroups = value.match(REGEX_GROUPS_WITH_COLON);
      return { hours: +regGroups[1] || 0, minutes: +regGroups[2] || 0 };
    } else {
      return null;
    }
  }

  /**
   *  Validate the typed input; if an invalid char is inserted (letters, special chars..), it's removed.
   *  Using `REGEX_GROUPS_WITH_COLON` permits only to insert 4 numbers, possibly with a valid separator.
   */
  private _enforcePattern(event: InputEvent): void {
    const match = (event.target as HTMLInputElement).value.match(REGEX_GROUPS_WITH_COLON);
    (event.target as HTMLInputElement).value = match ? match[0] : null;
  }

  /**
   *  Only allow typing numbers and separator keys.
   */
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
      !/[0-9.:,\-;_hH]/.test(event.key)
    ) {
      event.preventDefault();
    }
  }

  private _onInputValueAttributeChange(mutationsList?: MutationRecord[]): void {
    if (
      this._inputElement &&
      mutationsList &&
      Array.from(mutationsList).some((e) => e.attributeName === 'value')
    ) {
      this._updateValue(this._inputElement.getAttribute('value'));
    }
  }

  public render(): JSX.Element {
    return <Host></Host>;
  }
}
