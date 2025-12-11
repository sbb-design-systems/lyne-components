import { customElement } from 'lit/decorators.js';

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
class SbbCalendarEnhancedElement extends SbbCalendarBaseElement {
  public static override readonly events = {
    dateselected: 'dateselected',
    monthchanged: 'monthchanged',
  } as const;

  protected override goToDifferentMonth(months: number): void {
    const selected =
      this.selected === null
        ? this.selected
        : (Array.isArray(this.selected) ? this.selected : [this.selected]).map((d) =>
            this.mapDateToDay(d),
          );
    this.dispatchEvent(new SbbMonthChangeEvent(selected));
    super.goToDifferentMonth(months);
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
