import { type CSSResultGroup, isServer, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { sbbLiveAnnouncer } from '../core/a11y.ts';
import { SbbLanguageController } from '../core/controllers.ts';
import {
  i18nTimeInputChange,
  i18nTimeInvalid,
  i18nTimeMax,
  i18nTimeMaxLength,
} from '../core/i18n.ts';
import { SbbFormAssociatedInputMixin } from '../core/mixins.ts';

import style from './time-input.scss?lit&inline';

const REGEX_ALLOWED_CHARACTERS = /[0-9.:,\-;_hH]/;
const REGEX_DISALLOWED_CHARACTERS = /[^0-9.:,\-;_hH]/g;
const REGEX_GROUPS_WITHOUT_COLON = /^([0-9]{1,2})([0-9]{2})$/;
const REGEX_GROUPS_WITH_COLON = /^([0-9]{1,2})?[.:,\-;_hH]?([0-9]{1,2})?$/;

interface Time {
  hours: number;
  minutes: number;
}

/**
 * Custom input for a time.
 */
export
@customElement('sbb-time-input')
class SbbTimeInputElement extends SbbFormAssociatedInputMixin(LitElement) {
  public static override styles: CSSResultGroup = style;

  /**
   * The value of the time input. Reflects the current text value
   * of this input.
   */
  public override set value(value: string) {
    value =
      typeof value === 'string'
        ? value.replace(REGEX_DISALLOWED_CHARACTERS, '').substring(0, 5)
        : '';
    this._tryParseValue(value);
    // As long as this element has focus we delay automatically updating
    // the value with the formatted string of the parsed date.
    if (!isServer && !this.matches(':focus') && this.valueAsDate !== null) {
      value = this._formatTime();
    }
    super.value = value;
  }
  public override get value(): string {
    return super.value ?? '';
  }

  /** Formats the current input's value as date. */
  @property({ attribute: false })
  public set valueAsDate(date: Date | null) {
    if (date instanceof Date && !isNaN(date.valueOf())) {
      this._valueAsTime = {
        hours: date.getHours(),
        minutes: date.getMinutes(),
      };
      const formattedValue = this._formatTime();
      if (this.value !== formattedValue) {
        this.value = formattedValue;
      }
    } else {
      this._valueAsTime = null;
      this.value = '';
    }
  }
  public get valueAsDate(): Date | null {
    if (this._valueAsTime && this._isTimeValid(this._valueAsTime)) {
      const date = new Date(0);
      date.setHours(this._valueAsTime.hours);
      date.setMinutes(this._valueAsTime.minutes);
      return date;
    } else {
      return null;
    }
  }
  private _valueAsTime?: Time | null;

  /**
   * Stores the last string and parsed date object value to prevent repeated
   * parsing of the string value.
   */
  private _valueCache?: [string, Time | null];

  private _language = new SbbLanguageController(this);

  public constructor() {
    super();
    this.addEventListener?.('change', () => this._updateValueDateFormat(), { capture: true });
    this.addEventListener?.('change', () =>
      sbbLiveAnnouncer.announce(i18nTimeInputChange(this.value)[this._language.current]),
    );
    this.addEventListener?.('keydown', (event) => this._preventCharInsert(event));
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this.inputMode ||= 'numeric';
    this.placeholder ||= 'HH:MM';
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
  }

  protected override updateFormValue(): void {
    this._tryParseValue();
    const formValue = this.valueAsDate !== null ? this._formatTime() : null;
    this.internals.setFormValue(formValue, this.value);
  }

  private _tryParseValue(value = this.value): void {
    if (this._valueCache?.[0] !== value) {
      this._valueAsTime = this._parseValue(value);
      this._valueCache = [value, this._valueAsTime ?? null];
    }
  }

  /** Validate input against the defined RegExps. */
  private _parseValue(value: string | undefined): Time | null {
    const trimmedValue = value?.trim();
    if (!trimmedValue) {
      return null;
    }

    // Special case: the input is 3 or 4 digits; split like: AB?:CD
    const match =
      trimmedValue.match(REGEX_GROUPS_WITHOUT_COLON) ?? trimmedValue.match(REGEX_GROUPS_WITH_COLON);
    if (match) {
      return { hours: +match[1] || 0, minutes: +match[2] || 0 };
    }

    return null;
  }

  private _updateValueDateFormat(): void {
    if (this.valueAsDate) {
      const formattedDate = this._formatTime();
      if (this.value !== formattedDate) {
        super.value = formattedDate;
      }
    }
  }

  private _formatTime(): string {
    const value = this.valueAsDate;
    if (!value) {
      return '';
    }
    const hours = String(value.getHours()).padStart(2, '0');
    const minutes = String(value.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  protected override preparePastedText(text: string): string {
    return text
      .replace(REGEX_DISALLOWED_CHARACTERS, '')
      .substring(0, 5 - (this.textContent?.length ?? 0));
  }

  protected override shouldValidate(name: PropertyKey | undefined): boolean {
    return (
      super.shouldValidate(name) ||
      ['valueAsDate', 'min', 'max', 'dateFilter'].includes(name as string)
    );
  }

  protected override validate(): void {
    super.validate();
    if (!this.value) {
      this._removeValidityErrors();
    } else if (!this._valueAsTime) {
      this.setValidityFlag('badInput', i18nTimeInvalid[this.language.current]);
    } else if (!this._isTimeValid(this._valueAsTime)) {
      this.setValidityFlag('rangeOverflow', i18nTimeMax[this.language.current]);
    } else {
      this._removeValidityErrors();
    }
  }

  private _removeValidityErrors(): void {
    (['badInput', 'rangeOverflow'] as const).forEach((f) => this.removeValidityFlag(f));
  }

  /** Checks if values of hours and minutes are possible, to avoid non-existent times. */
  private _isTimeValid(time: Time): boolean {
    return time.hours < 24 && time.minutes < 60;
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
      event.ctrlKey ||
      event.altKey ||
      event.metaKey ||
      alwaysAllowed.includes(event.key) ||
      (REGEX_ALLOWED_CHARACTERS.test(event.key) && (this.value.length < 5 || this._hasSelection()))
    ) {
      return;
    }

    event.preventDefault();
    if (this.value.length >= 5) {
      sbbLiveAnnouncer.announce(i18nTimeMaxLength[this._language.current]);
    }
  }

  private _hasSelection(): boolean {
    const range = window.getSelection()?.getRangeAt(0);
    return !!range && range.startOffset !== range.endOffset;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-time-input': SbbTimeInputElement;
  }
}
