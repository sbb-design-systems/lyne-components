import { customElement } from 'lit/decorators.js';

import type { SbbCalendarDayElement } from '../calendar-day/calendar-day.component.ts';

import { SbbCalendarBaseElement } from './calendar-base-element.ts';

/**
 * It displays a calendar which allows choosing a date.
 */
export
@customElement('sbb-calendar')
class SbbCalendarElement extends SbbCalendarBaseElement {
  protected get cells(): (HTMLButtonElement | SbbCalendarDayElement)[] {
    return (
      Array.from(
        this.shadowRoot!.querySelectorAll<HTMLButtonElement | SbbCalendarDayElement>(
          '.sbb-calendar__cell',
        ),
      ) ?? []
    );
  }

  protected getFirstFocusable(): SbbCalendarDayElement | HTMLButtonElement | null {
    if (this.calendarView === 'day') {
      const selectedOrCurrent =
        this.shadowRoot!.querySelector<SbbCalendarDayElement>(':state(selected)') ??
        this.shadowRoot!.querySelector<SbbCalendarDayElement>(':state(current)');
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

  /**
   * In `day` view in `vertical` orientation,
   * if the first of the month is not a Monday, it is not the first rendered element in the table,
   * so `this.shadowRoot!.querySelector('.sbb-calendar__cell:not([disabled])')` will return a wrong value.
   *
   * To solve this, the element with the lowest `value` is taken (ISO String are ordered).
   */
  protected getFirstFocusableDay(): SbbCalendarDayElement | null {
    const daysInView: SbbCalendarDayElement[] = Array.from(
      this.shadowRoot!.querySelectorAll('.sbb-calendar__cell:not([disabled])'),
    );
    if (!daysInView || daysInView.length === 0) {
      return null;
    } else {
      const firstElement = daysInView
        .map((e: SbbCalendarDayElement): string => this.dateAdapter.toIso8601(e.value!))
        .sort()[0];
      return this.shadowRoot!.querySelector(`.sbb-calendar__cell[slot="${firstElement}"]`);
    }
  }

  protected setTabIndexAndFocusKeyboardNavigation(
    elementToFocus: SbbCalendarDayElement | HTMLButtonElement,
  ): void {
    const activeEl = this.shadowRoot!.activeElement as HTMLButtonElement | SbbCalendarDayElement;
    if (elementToFocus !== activeEl) {
      elementToFocus.tabIndex = 0;
      elementToFocus?.focus();
      activeEl.tabIndex = -1;
    }
  }

  protected setTabIndex(): void {
    Array.from(
      this.shadowRoot!.querySelectorAll('.sbb-calendar__cell[tabindex="0"]') ?? [],
    ).forEach((day) => ((day as HTMLElement).tabIndex = -1));
    const firstFocusable = this.getFirstFocusable();
    if (firstFocusable) {
      firstFocusable.tabIndex = 0;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-calendar': SbbCalendarElement;
  }
}
