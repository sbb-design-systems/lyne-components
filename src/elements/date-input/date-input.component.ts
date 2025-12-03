import { type CSSResultGroup, isServer, LitElement, type PropertyDeclaration } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { readConfig } from '../core/config.ts';
import { type DateAdapter, defaultDateAdapter } from '../core/datetime.ts';
import { plainDate, plainDateConverter } from '../core/decorators.ts';
import {
  i18nDateInvalid,
  i18nDateMax,
  i18nDateMin,
  i18nDatePickerPlaceholder,
} from '../core/i18n.ts';
import { SbbFormAssociatedInputMixin } from '../core/mixins.ts';
import type { SbbDatepickerElement } from '../datepicker.ts';

import style from './date-input.scss?lit&inline';

// As documented in form-associated-mixin.ts, we extend the prototype of
// ValidityState with custom error states for the date input.
Object.assign(ValidityState.prototype, {
  get sbbDateFilter(): boolean {
    return false;
  },
});

/**
 * Interface for elements that can be associated with a date input.
 * Implementing classes must also have a static property `sbbDateInputAssociated` set to `true`.
 */
export interface SbbDateInputAssociated<T> {
  input: SbbDateInputElement<T> | null;
}

/**
 * Custom input for a date.
 */
export
@customElement('sbb-date-input')
class SbbDateInputElement<T = Date> extends SbbFormAssociatedInputMixin(LitElement) {
  public static override styles: CSSResultGroup = style;

  /**
   * The value of the date input. Reflects the current text value
   * of this input.
   * The attribute `value` Accepts ISO8601 formatted values, which will be
   * formatted according to the current locale.
   */
  public override set value(value: string) {
    this._tryParseValue(value);
    // As long as this element has focus we delay automatically updating
    // the value with the formatted string of the parsed date.
    if (!isServer && !this.matches(':focus') && this.valueAsDate !== null) {
      value = this._formatDate();
    }
    super.value = value;
  }
  public override get value(): string {
    return super.value ?? '';
  }

  /** Formats the current input's value as date. */
  @property({ attribute: false })
  public set valueAsDate(value: T | null) {
    value = this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(value));
    if (!value) {
      this._valueAsDate = null;
      this._valueCache = ['', null];
      this.value = '';
    } else if (
      !this._dateAdapter.isDateInstance(this._valueAsDate) ||
      this._dateAdapter.compareDate(this._valueAsDate!, value!) !== 0
    ) {
      // Align with the native date input, as it copies the value of
      // the given date without the time and does not retain the
      // original instance.
      this._valueAsDate = this._dateAdapter.createDate(
        this._dateAdapter.getYear(value),
        this._dateAdapter.getMonth(value),
        this._dateAdapter.getDate(value),
      );
      const stringValue = this._formatDate();
      this._valueCache = [stringValue, this._valueAsDate];
      this.value = stringValue;
    }
  }
  public get valueAsDate(): T | null {
    // We should never return the internal date object directly, as it
    // could be manipulated outside of this class.
    return this._valueAsDate ? this._dateAdapter.clone(this._valueAsDate) : null;
  }
  private _valueAsDate?: T | null;

  /**
   * The minimum valid date. Accepts a date object or null.
   * Accepts an ISO8601 formatted string (e.g. 2024-12-24) as attribute.
   */
  @plainDate()
  @property({ converter: plainDateConverter, reflect: true })
  public accessor min: T | null = null;

  /**
   * The maximum valid date. Accepts a date object or null.
   * Accepts an ISO8601 formatted string (e.g. 2024-12-24) as attribute.
   */
  @plainDate()
  @property({ converter: plainDateConverter, reflect: true })
  public accessor max: T | null = null;

  /**
   * A function used to filter out dates.
   * It is strongly recommended to use min and max dates alongside
   * this filter.
   */
  @property({ attribute: false })
  public set dateFilter(value: (date: T | null) => boolean) {
    this._dateFilter = value;
  }
  public get dateFilter(): (date: T | null) => boolean {
    return this._dateFilter;
  }

  /**
   * How to format the displayed date.
   * `short`: Two letter abbreviation of the week day (e.g. Fr).
   * `none`: The weekday is not displayed.
   */
  @property({ attribute: 'weekday-style' })
  public accessor weekdayStyle: 'short' | 'none' = 'short';

  /**
   * Stores the last string and parsed date object value to prevent repeated
   * parsing of the string value.
   */
  private _valueCache?: [string, T | null];
  private _dateAdapter: DateAdapter<T> = readConfig().datetime?.dateAdapter ?? defaultDateAdapter;
  private _placeholderMutable = false;

  /**
   * Gets the associated datepicker, if any.
   * The sbb-date-input and the sbb-datepicker are assumed to be in the same parent container.
   */
  public get datepicker(): SbbDatepickerElement<T> | null {
    return this.parentElement!.querySelector<SbbDatepickerElement<T>>('sbb-datepicker');
  }

  public constructor() {
    super();
    this.addEventListener?.('change', () => this._updateValueDateFormat(), { capture: true });
  }

  /**
   * Attempts to resolve the associated date input with the given element.
   */
  public static resolveAssociation<T>(host: HTMLElement & SbbDateInputAssociated<T>): void {
    if (host.hasAttribute('input') || host.input) {
      return;
    }

    const input = host
      .closest('sbb-form-field')
      ?.querySelector<SbbDateInputElement<T>>('sbb-date-input');
    if (input) {
      host.input = input;
    }
  }

  private _dateFilter: (date: T | null) => boolean = () => true;

  public override connectedCallback(): void {
    super.connectedCallback();
    if (!this.placeholder) {
      this._placeholderMutable = true;
      this.placeholder = i18nDatePickerPlaceholder[this.language.current];
    }
    for (const child of Array.from(this.closest('sbb-form-field')?.children ?? [])) {
      // Elements must be upgraded in order for the constructor to be accessible.
      customElements.upgrade?.(child);
      if (
        (child.constructor as { sbbDateInputAssociated?: boolean }).sbbDateInputAssociated &&
        !child.hasAttribute('input') &&
        !(child as Partial<SbbDateInputAssociated<T>>).input
      ) {
        (child as Partial<SbbDateInputAssociated<T>>).input = this;
      }
    }
  }

  public override requestUpdate(
    name?: PropertyKey,
    oldValue?: unknown,
    options?: PropertyDeclaration,
  ): void {
    super.requestUpdate(name, oldValue, options);
    if (this.hasUpdated && !name) {
      this._updateValueDateFormat();
      if (this._placeholderMutable) {
        this.placeholder = i18nDatePickerPlaceholder[this.language.current];
      }
    } else if (name === 'weekdayStyle') {
      this._updateValueDateFormat();
    }
    if (this.isConnected) {
      // Used to notify associated components to update state
      /** @internal */
      this.dispatchEvent(new Event('ɵchange'));
    }
  }

  protected override updateFormValue(): void {
    this._tryParseValue();
    const formValue =
      this.valueAsDate !== null ? this._dateAdapter.toIso8601(this.valueAsDate) : null;
    this.internals.setFormValue(formValue, this.value);
  }

  private _tryParseValue(value = this.value): void {
    if (this._valueCache?.[0] !== value) {
      this._valueAsDate = this._dateAdapter.parse(value);
      this._valueCache = [value, this._valueAsDate];
    }
  }

  private _updateValueDateFormat(): void {
    if (this.valueAsDate) {
      const formattedDate = this._formatDate();
      if (this.value !== formattedDate) {
        super.value = formattedDate;
      }
    }
  }

  private _formatDate(): string {
    return this._dateAdapter.format(this.valueAsDate, { weekdayStyle: this.weekdayStyle });
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
    } else if (!this._dateAdapter.isValid(this.valueAsDate)) {
      this.setValidityFlag('badInput', i18nDateInvalid[this.language.current]);
    } else if (
      this._dateAdapter.isValid(this.min) &&
      this._dateAdapter.compareDate(this.min, this.valueAsDate) > 0
    ) {
      this.setValidityFlag(
        'rangeUnderflow',
        i18nDateMin(this._dateAdapter.format(this.min, { weekdayStyle: 'none' }))[
          this.language.current
        ],
      );
    } else if (
      this._dateAdapter.isValid(this.max) &&
      this._dateAdapter.compareDate(this.valueAsDate, this.max) > 0
    ) {
      this.setValidityFlag(
        'rangeOverflow',
        i18nDateMax(this._dateAdapter.format(this.max, { weekdayStyle: 'none' }))[
          this.language.current
        ],
      );
    } else if (this.dateFilter && !this.dateFilter(this.valueAsDate)) {
      this.setValidityFlag('sbbDateFilter', i18nDateInvalid[this.language.current]);
    } else {
      this._removeValidityErrors();
    }
  }

  private _removeValidityErrors(): void {
    (['badInput', 'rangeUnderflow', 'rangeOverflow', 'sbbDateFilter'] as const).forEach((f) =>
      this.removeValidityFlag(f),
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-date-input': SbbDateInputElement;
  }

  interface CustomValidityState {
    sbbDateFilter: boolean;
  }
}
