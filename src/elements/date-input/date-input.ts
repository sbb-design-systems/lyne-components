import { LitElement, type CSSResultGroup } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { readConfig } from '../core/config.js';
import { type DateAdapter, defaultDateAdapter } from '../core/datetime.js';
import { dateConverter } from '../core/decorators.js';
import {
  SbbFormAssociatedInputMixin,
  type FormRestoreReason,
  type FormRestoreState,
} from '../core/mixins.js';

import style from './date-input.scss?lit&inline';

/**
 * Custom input for a date.
 */
export
@customElement('sbb-date-input')
class SbbDateInputElement<T = Date> extends SbbFormAssociatedInputMixin(LitElement) {
  public static override styles: CSSResultGroup = style;

  private _dateAdapter: DateAdapter<T> = readConfig().datetime?.dateAdapter ?? defaultDateAdapter;

  /**
   * The value of the date input. Reflects the current text value
   * of this input.
   * @attr Accepts ISO8601 formatted values, which will be
   * formatted according to the current locale.
   */
  public override set value(value: string) {
    this._tryParseValue(value);
    super.value = this.valueAsDate !== null ? this._formatDate() : value;
  }
  public override get value(): string {
    return super.value ?? '';
  }

  @property({ attribute: false })
  public set valueAsDate(value: T | null) {
    if (!this._dateAdapter.isDateInstance(value) || !this._dateAdapter.isValid(value)) {
      this._valueAsDate = null;
      this._valueCache = ['', null];
      this.value = '';
    } else if (
      !this._dateAdapter.isDateInstance(this._valueCache[1]) ||
      !this._dateAdapter.compareDate(this._valueCache[1]!, value!)
    ) {
      // Align with the native date input, as it copies the value of
      // the given date and does not retain the original instance.
      this._valueAsDate = this._dateAdapter.clone(value!);
      const stringValue = this._formatDate();
      this._valueCache = [stringValue, this._valueAsDate];
      this.value = stringValue;
    }
  }
  public get valueAsDate(): T | null {
    return this._valueAsDate ?? null;
  }
  private _valueAsDate?: T | null;

  @property({ converter: dateConverter, reflect: true, type: Object })
  public accessor min: T | null = null;

  @property({ converter: dateConverter, reflect: true, type: Object })
  public accessor max: T | null = null;

  @property({ attribute: 'weekday-style' })
  public accessor weekdayStyle: 'long' | 'short' | 'narrow' | 'none' = 'short';

  private _valueCache: [string, T | null] = ['', null];

  public constructor() {
    super();
    this.addEventListener?.(
      'change',
      () => {
        if (this.valueAsDate) {
          const formattedDate = this._formatDate();
          if (this.value !== formattedDate) {
            this.value = formattedDate;
          }
        }
      },
      { capture: true },
    );
  }

  /**
   *  Called when the browser is trying to restore element’s state to state in which case
   *  reason is “restore”, or when the browser is trying to fulfill autofill on behalf of
   *  user in which case reason is “autocomplete”.
   *  In the case of “restore”, state is a string, File, or FormData object
   *  previously set as the second argument to setFormValue.
   *
   * @internal
   */
  public override formStateRestoreCallback(
    state: FormRestoreState | null,
    _reason: FormRestoreReason,
  ): void {
    if (state && typeof state === 'string') {
      this.value = state;
    }
  }

  protected override updateFormValue(): void {
    this._tryParseValue();
    const formValue =
      this.valueAsDate !== null ? this._dateAdapter.toIso8601(this.valueAsDate) : null;
    this.internals.setFormValue(formValue, this.value);
  }

  private _tryParseValue(value = this.value): void {
    if (this._valueCache[0] !== value) {
      this._valueAsDate = this._dateAdapter.parse(value);
      this._valueCache = [value, this._valueAsDate];
    }
  }

  private _formatDate(): string {
    return this._dateAdapter.format(this.valueAsDate, { weekdayStyle: this.weekdayStyle });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-date-input': SbbDateInputElement;
  }
}
