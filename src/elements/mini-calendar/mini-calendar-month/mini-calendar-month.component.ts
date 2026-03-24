import {
  type CSSResultGroup,
  html,
  type PropertyValues,
  type TemplateResult,
  unsafeCSS,
} from 'lit';
import { property } from 'lit/decorators.js';

import { SbbElement } from '../../core/base-elements.ts';
import { readConfig } from '../../core/config/config.ts';
import { SbbPropertyWatcherController } from '../../core/controllers.ts';
import { type DateAdapter } from '../../core/datetime/date-adapter.ts';
import { defaultDateAdapter } from '../../core/datetime/native-date-adapter.ts';
import { forceType } from '../../core/decorators.ts';
import type { SbbOrientation } from '../../core/interfaces.ts';
import { boxSizingStyles } from '../../core/styles.ts';

import style from './mini-calendar-month.scss?inline';

/**
 * It displays a month in the `sbb-mini-calendar`.
 *
 * @slot - Use the unnamed slot to add `sbb-mini-calendar-day` elements.
 */
export class SbbMiniCalendarMonthElement<T = Date> extends SbbElement {
  public static override readonly elementName: string = 'sbb-mini-calendar-month';
  public static override styles: CSSResultGroup = [boxSizingStyles, unsafeCSS(style)];

  /** Date as ISO string (YYYY-MM) */
  @forceType()
  @property()
  public accessor date: string = '';

  private _dateAdapter: DateAdapter<T> = readConfig().datetime?.dateAdapter ?? defaultDateAdapter;
  private _monthNames = this._dateAdapter.getMonthNames('short');
  private _monthLabel: string | null = null;
  private _yearLabel: string | null = null;
  private _previousOrientation: SbbOrientation | null = null;

  public constructor() {
    super();
    this.addController(
      new SbbPropertyWatcherController(this, () => this.closest('sbb-mini-calendar'), {
        orientation: (parent) => {
          if (this._previousOrientation) {
            this.internals.states.delete(`orientation-${this._previousOrientation}`);
          }
          this._previousOrientation = parent.orientation;
          if (this._previousOrientation) {
            this.internals.states.add(`orientation-${this._previousOrientation}`);
          }
        },
      }),
    );
  }

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);
    if (changedProperties.has('date') && this.date) {
      if (!this.date.match(/^\d{4}-(0[1-9]|1[0-2])$/)) {
        return;
      }
      const splitDate = this.date.split('-');
      const date = this._dateAdapter.createDate(+splitDate[0], +splitDate[1], 1);
      const offset = this._dateAdapter.getFirstWeekOffset(date);
      this.style?.setProperty('--sbb-mini-calendar-month-offset', `${offset + 1}`);

      this._monthLabel = `${this._monthNames[+splitDate[1] - 1]}.`;
      this._yearLabel = String(this._dateAdapter.getYear(date));
    }
  }

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-mini-calendar-month-label-year">${this._yearLabel}</div>
      <div class="sbb-mini-calendar-month-wrapper">
        <slot></slot>
      </div>
      <div class="sbb-mini-calendar-month-label-month">${this._monthLabel}</div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-mini-calendar-month': SbbMiniCalendarMonthElement;
  }
}
