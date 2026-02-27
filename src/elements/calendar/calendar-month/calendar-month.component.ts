import type { CSSResultGroup, TemplateResult } from 'lit';
import { html } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import { boxSizingStyles } from '../../core/styles.ts';
import type { SbbCalendarElement } from '../calendar.ts';
import { SbbCalendarCellBaseElement, calendarCellBaseStyle } from '../common.ts';

/**
 * It displays a single month cell in the `sbb-calendar` months view.
 */
export
@customElement('sbb-calendar-month')
class SbbCalendarMonthElement<T = Date> extends SbbCalendarCellBaseElement<T> {
  public static override styles: CSSResultGroup = [boxSizingStyles, calendarCellBaseStyle];

  private _monthShortNames: string[] = this.dateAdapter.getMonthNames('short');
  private _monthLongNames: string[] = this.dateAdapter.getMonthNames('long');
  private _monthValue: number | null = null;
  private _yearValue: number | null = null;

  /** Value of the calendar-month element. */
  @state()
  public set value(value: string | null) {
    if (value && value.match(/^\d{4}-(0[1-9]|1[0-2])$/)) {
      this._value = value;
      const splitDate = value.split('-');
      this._yearValue = Number(splitDate[0]);
      this._monthValue = Number(splitDate[1]);
      const isToday =
        this._yearValue === this.dateAdapter.getYear(this.dateAdapter.today()) &&
        this.dateAdapter.getMonth(this.dateAdapter.today()) === this._monthValue;
      this.toggleState('current', isToday);
      this.internals.ariaLabel = `${this._monthLongNames[this._monthValue - 1]} ${this._yearValue}`;
      const parent = this.getParent();
      if (parent) {
        this.setDisabledFilteredState(parent);
        this.setSelectedState(parent);
      }
    }
  }
  public get value(): string | null {
    return this._value;
  }
  private _value: string | null = null;

  public override connectedCallback(): void {
    super.connectedCallback();
    this.tabIndex = -1;
  }

  protected override setSelectedState(parent: SbbCalendarElement<T>): void {
    const selected = parent.multiple
      ? ((parent.selected as Date[])?.some(
          (date: Date) =>
            this._yearValue === this.dateAdapter.getYear(date) &&
            this._monthValue === this.dateAdapter.getMonth(date),
        ) ?? false)
      : !!parent.selected &&
        this.dateAdapter.getYear(parent.selected) === this._yearValue &&
        this.dateAdapter.getMonth(parent.selected) === this._monthValue;
    this.toggleState('selected', selected);
    this.internals.ariaPressed = String(selected);
  }

  protected override setDisabledFilteredState(parent: SbbCalendarElement<T>): void {
    const isFilteredOut = !this._isActiveMonth(parent);
    const isOutOfRange = !this._isMonthInRange(parent.min, parent.max);
    this.disabled = isFilteredOut || isOutOfRange;
    this.internals.ariaDisabled = String(this.disabled);
    this.toggleState('crossed-out', isFilteredOut && !isOutOfRange);
  }

  // Implementation adapted from https://github.com/angular/components/blob/main/src/material/datepicker/year-view.ts#L366
  private _isActiveMonth(parent: SbbCalendarElement<T>): boolean {
    if (!parent.dateFilter || !this._yearValue || !this._monthValue) {
      return true;
    }

    const firstOfMonth = this.dateAdapter.createDate(this._yearValue, this._monthValue, 1)!;
    for (
      let date: T = firstOfMonth;
      this.dateAdapter.getMonth(date) == this._monthValue;
      date = this.dateAdapter.addCalendarDays(date, 1)
    ) {
      if (parent.dateFilter(date)) {
        return true;
      }
    }

    return false;
  }

  private _isMonthInRange(min: T | null, max: T | null): boolean {
    if ((!min && !max) || !this._yearValue || !this._monthValue) {
      return true;
    }

    const isBeforeMin: boolean =
      this.dateAdapter.isValid(min) &&
      (this._yearValue < this.dateAdapter.getYear(min!) ||
        (this._yearValue === this.dateAdapter.getYear(min!) &&
          this._monthValue < this.dateAdapter.getMonth(min!)));

    const isAfterMax: boolean =
      this.dateAdapter.isValid(max) &&
      (this._yearValue > this.dateAdapter.getYear(max!) ||
        (this._yearValue === this.dateAdapter.getYear(max!) &&
          this._monthValue > this.dateAdapter.getMonth(max!)));

    return !(isBeforeMin || isAfterMax);
  }

  protected override renderTemplate(): TemplateResult {
    return html`${this._monthShortNames[this._monthValue! - 1]}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-calendar-month': SbbCalendarMonthElement;
  }
}
