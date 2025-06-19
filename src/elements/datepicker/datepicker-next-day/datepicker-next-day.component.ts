import type { CSSResultGroup } from 'lit';
import { customElement } from 'lit/decorators.js';

import { i18nNextDay, i18nSelectNextDay } from '../../core/i18n.js';
import { SbbDatepickerButton } from '../common.js';

import style from './datepicker-next-day.scss?lit&inline';

/**
 * Combined with a `sbb-datepicker`, it can be used to move the date ahead.
 * @overrideType value - string
 */
export
@customElement('sbb-datepicker-next-day')
class SbbDatepickerNextDayElement<T = Date> extends SbbDatepickerButton<T> {
  public static override styles: CSSResultGroup = style;

  protected iconName: string = 'chevron-small-right-small';
  protected i18nOffBoundaryDay: Record<string, string> = i18nNextDay;
  protected i18nSelectOffBoundaryDay = i18nSelectNextDay;

  protected findAvailableDate(date: T): T | null {
    let availableDate = this.dateAdapter.addCalendarDays(date, 1);
    if (this._isAfterMaxDate(availableDate)) {
      return null;
    }

    const dateFilter = this.input!.dateFilter;
    if (dateFilter) {
      while (!dateFilter(availableDate)) {
        availableDate = this.dateAdapter.addCalendarDays(availableDate, 1);
        if (this._isAfterMaxDate(availableDate)) {
          return null;
        }
      }
    }

    return availableDate;
  }

  private _isAfterMaxDate(date: T): boolean {
    return !!this.input!.max && this.dateAdapter.compareDate(date, this.input!.max) > 0;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-datepicker-next-day': SbbDatepickerNextDayElement;
  }
}
