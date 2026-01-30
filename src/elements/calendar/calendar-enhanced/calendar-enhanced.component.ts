import { html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';

import type { SbbCalendarDayElement } from '../calendar-day/calendar-day.component.ts';
import { type Day, SbbCalendarBaseElement } from '../calendar.ts';

export class SbbMonthChangeEvent extends Event {
  private readonly _range: readonly Day[];

  public get range(): readonly Day[] {
    return this._range;
  }

  public constructor(range: readonly Day[]) {
    super('monthchange', { bubbles: true, composed: true });
    this._range = Object.freeze(range || []);
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
    monthchange: 'monthchange',
  } as const;

  protected get cells(): (HTMLButtonElement | SbbCalendarDayElement)[] {
    return (
      (this.calendarView === 'day'
        ? Array.from(this!.querySelectorAll<SbbCalendarDayElement>('sbb-calendar-day'))
        : Array.from(
            this.shadowRoot!.querySelectorAll<HTMLButtonElement>('.sbb-calendar__cell'),
          )) ?? []
    );
  }

  public constructor() {
    super();
    this.addEventListener('click', (e) => {
      if ((e.target as HTMLElement).localName === 'sbb-calendar-day') {
        this.selectDate((e.target as SbbCalendarDayElement).value!);
      }
    });
    this.addEventListener('keydown', (e) => {
      if ((e.target as HTMLElement).localName === 'sbb-calendar-day') {
        this.handleKeyboardEvent(e, this.mapDateToDay((e.target as SbbCalendarDayElement).value!));
      }
    });
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this.shadowRoot?.addEventListener('slotchange', this._onSlotChange, { capture: true });
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.shadowRoot?.removeEventListener('slotchange', this._onSlotChange, { capture: true });
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
      this.querySelectorAll('sbb-calendar-day:not([disabled])'),
    );
    if (!daysInView || daysInView.length === 0) {
      return null;
    } else {
      return daysInView[0];
    }
  }

  protected setTabIndex(): void {
    Array.from(this.querySelectorAll('[tabindex="0"]') ?? []).forEach(
      (day) => ((day as SbbCalendarDayElement | HTMLButtonElement).tabIndex = -1),
    );
    const firstFocusable = this.getFirstFocusable();
    if (firstFocusable) {
      firstFocusable.tabIndex = 0;
    }
  }

  protected override resetCalendarView(initTransition: boolean): void {
    super.resetCalendarView(initTransition);
    this._emitMonthChange();
  }

  protected override goToDifferentMonth(months: number): void {
    super.goToDifferentMonth(months);
    this._emitMonthChange();
  }

  protected override onMonthSelection(month: number, year: number): void {
    super.onMonthSelection(month, year);
    this._emitMonthChange();
  }

  protected override createDayCells(week: Day[], _: string): TemplateResult[] {
    return week.map((day: Day) => {
      return html`
        <td class="sbb-calendar__table-data">
          <slot name=${day.value}></slot>
        </td>
      `;
    });
  }

  private _onSlotChange = (): void => {
    this.setTabIndex();
  };

  private _emitMonthChange(): void {
    // FIXME: the name of this variable appears as event name in the readme
    //  due to a bug in the custom-element-manifest library.
    //  https://github.com/open-wc/custom-elements-manifest/issues/149
    const monthchange = (this.wide ? [...this.weeks, ...this.nextMonthWeeks] : this.weeks)
      .flat()
      .sort((a, b) => a.value.localeCompare(b.value));
    /**
     * @type {SbbMonthChangeEvent}
     * Emits when the month changes.
     * The `range` property contains the days array of the chosen month.
     */
    this.dispatchEvent(new SbbMonthChangeEvent(monthchange));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-calendar-enhanced': SbbCalendarEnhancedElement;
  }
  interface HTMLElementEventMap {
    monthchange: SbbMonthChangeEvent;
  }
}
