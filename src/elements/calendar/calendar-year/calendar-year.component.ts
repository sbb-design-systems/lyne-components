import { html, type TemplateResult } from 'lit';
import { state } from 'lit/decorators.js';

import type { SbbCalendarElement } from '../calendar/calendar.component.ts';
import { SbbCalendarCellBaseElement } from '../common/calendar-cell-base-element.ts';

/**
 * It displays a single year cell in the `sbb-calendar` years view.
 */
export class SbbCalendarYearElement<T = Date> extends SbbCalendarCellBaseElement<T> {
  public static override readonly elementName: string = 'sbb-calendar-year';

  /**
   * Value of the calendar-year element.
   */
  @state()
  public set value(value: string | null) {
    const year = Number(value);
    if (isNaN(year)) {
      return;
    }

    this._value = value;
    const isToday = this.dateAdapter.getYear(this.dateAdapter.today()) === year;
    this.toggleState('current', isToday);
    this.internals.ariaLabel = String(year);
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
          (date: Date) => Number(this.value) === this.dateAdapter.getYear(date),
        ) ?? false)
      : !!parent.selected && this.dateAdapter.getYear(parent.selected) === Number(this.value);
    this.toggleState('selected', selected);
    this.internals.ariaPressed = String(selected);
  }

  protected override setDisabledFilteredState(parent: SbbCalendarElement<T>): void {
    const isFilteredOut = !this._isActiveYear(parent);
    const isOutOfRange = !this._isYearInRange(parent.min, parent.max);
    this.disabled = isFilteredOut || isOutOfRange;
    this.internals.ariaDisabled = String(this.disabled);
    this.toggleState('crossed-out', isFilteredOut && !isOutOfRange);
  }

  // Implementation adapted from https://github.com/angular/components/blob/main/src/material/datepicker/multi-year-view.ts#L351
  private _isActiveYear(parent: SbbCalendarElement<T>): boolean {
    if (!parent.dateFilter || !this.value) {
      return true;
    }

    const firstOfYear = this.dateAdapter.createDate(Number(this.value), 1, 1)!;
    for (
      let date = firstOfYear;
      this.dateAdapter.getYear(date) == Number(this.value);
      date = this.dateAdapter.addCalendarDays(date, 1)
    ) {
      if (parent.dateFilter(date)) {
        return true;
      }
    }

    return false;
  }

  private _isYearInRange(min: T | null, max: T | null): boolean {
    if ((!min && !max) || !this.value) {
      return true;
    }
    const isBeforeMin: boolean =
      this.dateAdapter.isValid(min) && this.dateAdapter.getYear(min) > Number(this.value);
    const isAfterMax: boolean =
      this.dateAdapter.isValid(max) && this.dateAdapter.getYear(max) < Number(this.value);
    return !(isBeforeMin || isAfterMax);
  }

  protected override renderTemplate(): TemplateResult {
    return html`${this.value}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-calendar-year': SbbCalendarYearElement;
  }
}
