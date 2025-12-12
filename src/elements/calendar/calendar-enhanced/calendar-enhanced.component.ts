import { html, nothing, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

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

  protected override goToDifferentMonth(months: number): void {
    super.goToDifferentMonth(months);
    const currentViewDays = (this.wide ? [...this.weeks, ...this.nextMonthWeeks] : this.weeks)
      .flat()
      .sort((a, b) => a.value.localeCompare(b.value));
    this.dispatchEvent(new SbbMonthChangeEvent(currentViewDays));
  }

  // FIXME
  /** Creates the cells for the daily view. */
  protected override createDayCells(week: Day<T>[], today: string): TemplateResult[] {
    return week.map((day: Day<T>) => {
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
      return html`
        <td
          class=${classMap({
            'sbb-calendar__table-data': true,
            'sbb-calendar__table-data-selected': selected,
          })}
        >
          <button
            class=${classMap({
              'sbb-calendar__cell': true,
              'sbb-calendar__day': true,
              'sbb-calendar__cell-current': isToday,
              'sbb-calendar__selected': selected,
              'sbb-calendar__crossed-out': !isOutOfRange && isFilteredOut,
            })}
            @click=${() => this.selectDate(day.dateValue)}
            ?disabled=${isOutOfRange || isFilteredOut}
            value=${day.value}
            type="button"
            aria-label=${this.dateAdapter.getAccessibilityFormatDate(day.value)}
            aria-pressed=${selected}
            aria-disabled=${isOutOfRange || isFilteredOut}
            aria-current=${isToday ? 'date' : nothing}
            tabindex="-1"
            @keydown=${(evt: KeyboardEvent) => this.handleKeyboardEvent(evt, day)}
            sbb-popover-close
          >
            <slot name=${day.value}></slot>
          </button>
        </td>
      `;
    });
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
