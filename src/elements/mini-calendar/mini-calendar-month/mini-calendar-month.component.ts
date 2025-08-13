import { type CSSResultGroup, type PropertyValues, type TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { readConfig } from '../../core/config/config.js';
import { type DateAdapter } from '../../core/datetime/date-adapter.js';
import { defaultDateAdapter } from '../../core/datetime/native-date-adapter.js';
import { forceType } from '../../core/decorators.js';
import { type SbbMiniCalendarElement } from '../mini-calendar/mini-calendar.component.js';

import style from './mini-calendar-month.scss?lit&inline';

/**
 * Describe the purpose of the component with a single short sentence.
 *
 * @slot - Use the unnamed slot to add `sbb-TODO` elements.
 */
export
@customElement('sbb-mini-calendar-month')
class SbbMiniCalendarMonthElement<T = Date> extends LitElement {
  public static override styles: CSSResultGroup = style;

  /** Date as ISO string. */
  @forceType()
  @property()
  public accessor date: string = '';

  private get _calendarParent(): SbbMiniCalendarElement | null {
    return this.closest?.<SbbMiniCalendarElement>('sbb-mini-calendar') || null;
  }

  private _dateAdapter: DateAdapter<T> = readConfig().datetime?.dateAdapter ?? defaultDateAdapter;
  private _monthNames = this._dateAdapter.getMonthNames('short');
  private _monthLabel: string | null = null;
  private _yearLabel: string | null = null;

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);
    if (changedProperties.has('date') && this.date) {
      // FIXME improve and restrict the 'date' type, because now is error prone
      const date = this._dateAdapter.deserialize(this.date.concat('-01'))!;
      const month = this._dateAdapter.getMonth(date);

      const offset = this._dateAdapter.getFirstWeekOffset(date);
      this.style.setProperty('--sbb-mini-calendar-month-offset', `${offset + 1}`);

      const monthList = Array.from(
        this._calendarParent?.querySelectorAll('sbb-mini-calendar-month') || [],
      );
      if (month === 1 || monthList.findIndex((e) => e === this) === 0) {
        this._yearLabel = String(this._dateAdapter.getYear(date));
      }
      this._monthLabel = `${this._monthNames[month - 1]}.`;
    }
  }

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-mini-calendar-month">
        <div class="sbb-mini-calendar-month-label">${this._yearLabel}</div>
        <div class="sbb-mini-calendar-month-wrapper">
          <slot></slot>
        </div>
        <div class="sbb-mini-calendar-month-label">${this._monthLabel}</div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-mini-calendar-month': SbbMiniCalendarMonthElement;
  }
}
