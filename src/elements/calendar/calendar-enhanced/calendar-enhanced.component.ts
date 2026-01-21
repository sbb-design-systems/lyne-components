import { html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';

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
 * It displays a calendar when used in combination with `sbb-calendar-day`.
 * Slotted days must match the rendered day view.
 */
export
@customElement('sbb-calendar-enhanced')
class SbbCalendarEnhancedElement extends SbbCalendarBaseElement {
  public static override readonly events = {
    dateselected: 'dateselected',
    monthchanged: 'monthchanged',
  } as const;

  protected get cells(): (HTMLButtonElement | SbbCalendarDayElement)[] {
    return (
      (this.calendarView === 'day'
        ? Array.from(this!.querySelectorAll<SbbCalendarDayElement>('.sbb-calendar__cell'))
        : Array.from(
            this.shadowRoot!.querySelectorAll<HTMLButtonElement>('.sbb-calendar__cell'),
          )) ?? []
    );
  }

  protected setTabIndexAndFocusKeyboardNavigation(elementToFocus: SbbCalendarDayElement): void {
    const activeEl =
      this.calendarView === 'day'
        ? (document.activeElement as SbbCalendarDayElement)
        : (this.shadowRoot!.activeElement as HTMLButtonElement);
    if (elementToFocus !== activeEl) {
      elementToFocus.tabIndex = 0;
      elementToFocus?.focus();
      activeEl.tabIndex = -1;
    }
  }

  protected getFirstFocusable(): HTMLButtonElement | SbbCalendarDayElement | null {
    if (this.calendarView === 'day') {
      const selectedOrCurrent =
        this.querySelector<SbbCalendarDayElement>(':state(selected)') ??
        this.querySelector<SbbCalendarDayElement>(':state(current)');
      return selectedOrCurrent && !selectedOrCurrent.disabled
        ? selectedOrCurrent
        : this.getFirstFocusableDay();
    } else {
      const selectedOrCurrent = this.shadowRoot?.querySelector<HTMLButtonElement>(
        '.sbb-calendar__cell-current',
      );
      return selectedOrCurrent && !selectedOrCurrent.disabled
        ? selectedOrCurrent
        : this.shadowRoot!.querySelector<HTMLButtonElement>('.sbb-calendar__cell:not([disabled])');
    }
  }

  protected getFirstFocusableDay(): SbbCalendarDayElement | null {
    const daysInView: SbbCalendarDayElement[] = Array.from(
      this.querySelectorAll('.sbb-calendar__cell:not([disabled])'),
    );
    if (!daysInView || daysInView.length === 0) {
      return null;
    } else {
      return daysInView[0];
    }
  }

  protected setTabIndex(): void {
    Array.from(this.querySelectorAll('.sbb-calendar__cell[tabindex="0"]') ?? []).forEach(
      (day) => ((day as SbbCalendarDayElement).tabIndex = -1),
    );
    const firstFocusable = this.getFirstFocusable();
    if (firstFocusable) {
      firstFocusable.tabIndex = 0;
    }
  }

  protected override resetCalendarView(initTransition: boolean): void {
    super.resetCalendarView(initTransition);
    this._emitMonthChanged();
  }

  protected override goToDifferentMonth(months: number): void {
    super.goToDifferentMonth(months);
    this._emitMonthChanged();
  }

  protected override onMonthSelection(month: number, year: number): void {
    super.onMonthSelection(month, year);
    this._emitMonthChanged();
  }

  protected override createDayCells(week: Day[], _: string): TemplateResult[] {
    return week.map((day: Day) => {
      return html`
        <td class="sbb-calendar__table-data">
          <slot
            name=${day.value}
            @slotchange=${(e: Event) => this._handleSlotChange(e, day)}
          ></slot>
        </td>
      `;
    });
  }

  private _handleSlotChange(e: Event, day: Day): void {
    const calendarDay = (e.target as HTMLSlotElement)
      .assignedElements()
      .find((e): e is SbbCalendarDayElement => e.localName === 'sbb-calendar-day');
    if (calendarDay) {
      calendarDay.value = day.value;
      calendarDay.addEventListener('click', () => this.selectDate(day.dateValue));
      calendarDay.addEventListener('keydown', (evt: KeyboardEvent) =>
        this.handleKeyboardEvent(evt, day),
      );
    }
    this.setTabIndex();
  }

  private _emitMonthChanged(): void {
    // TODO: the name of this variable appears as event name in the readme. Maybe a CEM bug?
    const monthchanged = (this.wide ? [...this.weeks, ...this.nextMonthWeeks] : this.weeks)
      .flat()
      .sort((a, b) => a.value.localeCompare(b.value));
    /**
     * @type {SbbMonthChangeEvent}
     * Emits when the month changes.
     * The `range` property contains the days array of the chosen month.
     */
    this.dispatchEvent(new SbbMonthChangeEvent(monthchanged));
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
