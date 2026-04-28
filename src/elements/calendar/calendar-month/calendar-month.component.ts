import { html, type TemplateResult } from 'lit';
import { state } from 'lit/decorators.js';

import type { SbbCalendarElement } from '../calendar/calendar.component.ts';
import { SbbCalendarCellBaseElement } from '../common/calendar-cell-base-element.ts';

/**
 * It displays a single month cell in the `sbb-calendar` months view.
 */
export class SbbCalendarMonthElement<T = Date> extends SbbCalendarCellBaseElement<T> {
  public static override readonly elementName: string = 'sbb-calendar-month';

  private static readonly _monthFormatRegex = /^\d{4}-(0[1-9]|1[0-2])$/;
  private _monthShortNames: string[] = this.dateAdapter.getMonthNames('short');
  private _monthLongNames: string[] = this.dateAdapter.getMonthNames('long');
  private _monthValue: number | null = null;
  private _yearValue: number | null = null;

  /**
   * Value of the calendar-month element in ISO format (YYYY-MM).
   */
  @state()
  public set value(value: string | null) {
    if (!value || !SbbCalendarMonthElement._monthFormatRegex.test(value)) {
      return;
    }

    this._value = value;
    const splitDate = value.split('-');
    this._yearValue = Number(splitDate[0]);
    this._monthValue = Number(splitDate[1]);
    const isToday =
      this._yearValue === this.dateAdapter.getYear(this.dateAdapter.today()) &&
      this._monthValue === this.dateAdapter.getMonth(this.dateAdapter.today());
    this.toggleState('current', isToday);
    this.internals.ariaLabel = `${this._monthLongNames[this._monthValue - 1]} ${this._yearValue}`;
    const parent = this.getParent();
    if (parent) {
      this.setDisabledFilteredState(parent);
      this.setSelectedState(parent);
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
