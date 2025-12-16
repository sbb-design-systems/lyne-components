import { html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

import type { SbbCalendarDayElement } from '../calendar-day/calendar-day.component.ts';
import { type Day, SbbCalendarBaseElement } from '../calendar.ts';

export class SbbMonthChangeEvent extends Event {
  private _range: Day[] | null;

  public get range(): Day[] | null {
    return this._range;
  }

  public constructor(range: Day[] | null) {
    super('monthchanged', { bubbles: true, composed: true });
    this._range = range;
  }
}

/**
 * Describe the purpose of the component with a single short sentence.
 *
 * @slot - Use the unnamed slot to add `sbb-TODO` elements.
 */
export
@customElement('sbb-calendar-enhanced')
class SbbCalendarEnhancedElement<T extends Date = Date> extends SbbCalendarBaseElement {
  public static override readonly events = {
    dateselected: 'dateselected',
    monthchanged: 'monthchanged',
  } as const;

  // FIXME move to a element selector
  /** A list of buttons corresponding to days, months or years depending on the view. */
  protected override get cells(): HTMLButtonElement[] {
    return Array.from(this!.querySelectorAll('.sbb-calendar__cell') ?? []) as HTMLButtonElement[];
  }

  protected override goToDifferentMonth(months: number): void {
    super.goToDifferentMonth(months);
    const currentViewDays = (this.wide ? [...this.weeks, ...this.nextMonthWeeks] : this.weeks)
      .flat()
      .sort((a, b) => a.value.localeCompare(b.value));
    this.dispatchEvent(new SbbMonthChangeEvent(currentViewDays));
  }

  // FIXME change type to SbbCalendarDay
  protected override setTabIndexAndFocusKeyboardNavigation(
    elementToFocus: HTMLButtonElement,
  ): void {
    const activeEl: HTMLButtonElement = document.activeElement as HTMLButtonElement;
    if (elementToFocus !== activeEl) {
      (elementToFocus as HTMLButtonElement).tabIndex = 0;
      elementToFocus?.focus();
      (activeEl as HTMLButtonElement).tabIndex = -1;
    }
  }

  // FIXME change type to SbbCalendarDay
  /** Get the element in the calendar to assign focus. */
  protected override getFirstFocusable(): HTMLButtonElement {
    let active;
    if (this.multiple) {
      active = (this.selected as T[])?.length
        ? [...(this.selected as T[])].sort()[0]
        : this.dateAdapter.today();
    } else {
      active = (this.selected as T) ?? this.dateAdapter.today();
    }
    let firstFocusable =
      this.querySelector('.sbb-calendar__selected') ??
      this.querySelector(`[value="${this.dateAdapter.toIso8601(active)}"]`) ??
      this.querySelector(`[data-month="${this.dateAdapter.getMonth(active)}"]`) ??
      this.querySelector(`[data-year="${this.dateAdapter.getYear(active)}"]`);
    if (!firstFocusable || (firstFocusable as HTMLButtonElement)?.disabled) {
      firstFocusable =
        this.calendarView === 'day'
          ? this.getFirstFocusableDay()
          : this!.querySelector('.sbb-calendar__cell:not([disabled])');
    }
    return (firstFocusable as HTMLButtonElement) || null;
  }

  // FIXME change type to SbbCalendarDay
  protected override getFirstFocusableDay(): HTMLButtonElement | null {
    const daysInView: HTMLButtonElement[] = Array.from(
      this.querySelectorAll('.sbb-calendar__cell:not([disabled])'),
    );
    if (!daysInView || daysInView.length === 0) {
      return null;
    } else {
      const firstElement = daysInView.map((e: HTMLButtonElement): string => e.value).sort()[0];
      return this!.querySelector(`.sbb-calendar__cell[value="${firstElement}"]`);
    }
  }

  // FIXME
  /** Creates the cells for the daily view. */
  protected override createDayCells(week: Day<T>[], today: string): TemplateResult[] {
    return week.map((day: Day<T>) => {
      let selected: boolean;
      if (this.multiple) {
        selected =
          (this.selected as T[]).find(
            (selDay: T) => this.dateAdapter.compareDate(day.dateValue, selDay) === 0,
          ) !== undefined;
      } else {
        selected =
          !!this.selected && this.dateAdapter.compareDate(day.dateValue, this.selected as T) === 0;
      }
      return html`
        <td
          class=${classMap({
            'sbb-calendar__table-data': true,
            'sbb-calendar__table-data-selected': selected,
          })}
        >
          <slot
            name=${day.value}
            @slotchange=${(e: Event) => this._handleSlotChange(e, day, today)}
          ></slot>
        </td>
      `;
    });
  }

  // FIXME
  private _handleSlotChange(e: Event, day: Day, today: string): void {
    const isOutOfRange = !this.isDayInRange(day.value);
    const isFilteredOut = !this.internalDateFilter(this.dateAdapter.deserialize(day.value)!);
    const isToday = day.value === today;
    let selected: boolean;
    if (this.multiple) {
      selected =
        (this.selected as T[]).find(
          (selDay: T) => this.dateAdapter.compareDate(day.dateValue, selDay) === 0,
        ) !== undefined;
    } else {
      selected =
        !!this.selected && this.dateAdapter.compareDate(day.dateValue, this.selected as T) === 0;
    }
    const calendarDay = (e.target as HTMLSlotElement)
      .assignedElements()
      .find((e): e is SbbCalendarDayElement => e.localName === 'sbb-calendar-day');
    if (calendarDay) {
      calendarDay.type = 'button';
      calendarDay.toggleAttribute('sbb-popover-close', true);
      calendarDay.classList.add('sbb-calendar__cell');
      calendarDay.classList.add('sbb-calendar__day');
      calendarDay.classList.toggle('sbb-calendar__cell-current', isToday);
      calendarDay.classList.toggle('sbb-calendar__selected', selected);
      calendarDay.classList.toggle('sbb-calendar__crossed-out', !isOutOfRange && isFilteredOut);
      calendarDay.tabIndex = -1;
      calendarDay.disabled = isOutOfRange || isFilteredOut;
      calendarDay.value = day.value;
      calendarDay.ariaLabel = this.dateAdapter.getAccessibilityFormatDate(day.value);
      calendarDay.ariaPressed = String(selected);
      calendarDay.ariaDisabled = String(isOutOfRange || isFilteredOut);
      calendarDay.ariaCurrent = isToday ? 'date' : null;
      calendarDay.addEventListener('click', () => this.selectDate(day.dateValue));
      calendarDay.addEventListener('keydown', (evt: KeyboardEvent) =>
        this.handleKeyboardEvent(evt, day),
      );
    }
    this.setTabIndex();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-calendar-enhanced': SbbCalendarEnhancedElement;
  }
  interface HTMLElementEventMap {
    monthchanged: SbbMonthChangeEvent;
  }
}
