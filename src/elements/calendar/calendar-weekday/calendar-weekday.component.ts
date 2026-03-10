import type { CSSResultGroup, TemplateResult } from 'lit';
import { html } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import { boxSizingStyles } from '../../core/styles.ts';
import type { Weekday } from '../calendar/calendar.component.ts';
import { SbbCalendarCellBaseElement, calendarCellBaseStyle } from '../common.ts';

/**
 * It displays a single week day cell in the `sbb-calendar` component.
 */
export
@customElement('sbb-calendar-weekday')
class SbbCalendarWeekdayElement extends SbbCalendarCellBaseElement {
  public static override readonly elementName: string = 'sbb-calendar-weekday';
  public static override styles: CSSResultGroup = [boxSizingStyles, calendarCellBaseStyle];

  /** Value of the week day element. */
  @state()
  public set value(value: Weekday | null) {
    if (!value) {
      return;
    }
    this._value = value;
    this.internals.ariaLabel = value.long;
  }
  public get value(): Weekday | null {
    return this._value;
  }
  private _value: Weekday | null = null;

  protected override setSelectedState(): void {
    // empty
  }
  protected override setDisabledFilteredState(): void {
    // empty
  }

  protected override renderTemplate(): TemplateResult {
    return html`${this.value?.narrow}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-calendar-weekday': SbbCalendarWeekdayElement;
  }
}
