import { customElement } from 'lit/decorators.js';

import { SbbCalendarBaseElement } from './calendar-base-element.ts';

/**
 * It displays a calendar which allows choosing a date.
 */
export
@customElement('sbb-calendar')
class SbbCalendarElement extends SbbCalendarBaseElement {
  protected get cells(): HTMLButtonElement[] {
    return Array.from(
      this.shadowRoot!.querySelectorAll('.sbb-calendar__cell') ?? [],
    ) as HTMLButtonElement[];
  }

  protected getFirstFocusable(): HTMLButtonElement | null {
    const selectedOrCurrent =
      this.shadowRoot!.querySelector<HTMLButtonElement>('.sbb-calendar__selected') ??
      this.shadowRoot!.querySelector<HTMLButtonElement>('.sbb-calendar__cell-current');

    return selectedOrCurrent && !selectedOrCurrent.disabled
      ? selectedOrCurrent
      : this.calendarView === 'day'
        ? this.getFirstFocusableDay()
        : this.shadowRoot!.querySelector('.sbb-calendar__cell:not([disabled])');
  }

  /**
   * In `day` view in `vertical` orientation,
   * if the first of the month is not a Monday, it is not the first rendered element in the table,
   * so `this.shadowRoot!.querySelector('.sbb-calendar__cell:not([disabled])')` will return a wrong value.
   *
   * To solve this, the element with the lowest `value` is taken (ISO String are ordered).
   */
  protected getFirstFocusableDay(): HTMLButtonElement | null {
    const daysInView: HTMLButtonElement[] = Array.from(
      this.shadowRoot!.querySelectorAll('.sbb-calendar__cell:not([disabled])'),
    );
    if (!daysInView || daysInView.length === 0) {
      return null;
    } else {
      const firstElement = daysInView.map((e: HTMLButtonElement): string => e.value).sort()[0];
      return this.shadowRoot!.querySelector(`.sbb-calendar__cell[value="${firstElement}"]`);
    }
  }

  protected setTabIndexAndFocusKeyboardNavigation(elementToFocus: HTMLButtonElement): void {
    const activeEl: HTMLButtonElement = this.shadowRoot!.activeElement as HTMLButtonElement;
    if (elementToFocus !== activeEl) {
      (elementToFocus as HTMLButtonElement).tabIndex = 0;
      elementToFocus?.focus();
      (activeEl as HTMLButtonElement).tabIndex = -1;
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
