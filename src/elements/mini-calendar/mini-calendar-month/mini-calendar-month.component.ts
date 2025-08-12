import type { CSSResultGroup, PropertyValues, TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { readConfig } from '../../core/config/config.js';
import type { DateAdapter } from '../../core/datetime/date-adapter.js';
import { defaultDateAdapter } from '../../core/datetime/native-date-adapter.js';
import { forceType } from '../../core/decorators.js';

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

  private _dateAdapter: DateAdapter<T> = readConfig().datetime?.dateAdapter ?? defaultDateAdapter;
  private _monthNames = this._dateAdapter.getMonthNames('short');
  private _monthName: string | null = null;

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);
    if (changedProperties.has('date') && this.date) {
      // FIXME improve and restrict the 'date' type, because now is error prone
      const date = this._dateAdapter.deserialize(this.date.concat('-01'))!;
      this._monthName = `${this._monthNames[this._dateAdapter.getMonth(date) - 1]}.`;

      const offset = this._dateAdapter.getFirstWeekOffset(date);
      this.style.setProperty('--sbb-mini-calendar-month-offset', `${offset + 1}`);
    }
  }

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-mini-calendar-month">
        <div class="sbb-mini-calendar-month-wrapper">
          <slot></slot>
        </div>
        <div class="sbb-mini-calendar-month-label">${this._monthName}</div>
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
