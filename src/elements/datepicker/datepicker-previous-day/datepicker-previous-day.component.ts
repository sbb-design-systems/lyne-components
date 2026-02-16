import type { CSSResultGroup } from 'lit';
import { customElement } from 'lit/decorators.js';

import { miniButtonStyle } from '../../button/common.ts';
import { i18nPreviousDay, i18nSelectPreviousDay } from '../../core/i18n.ts';
import { boxSizingStyles } from '../../core/styles.ts';
import { datepickerButtonStyle, SbbDatepickerButton } from '../common.ts';

/**
 * Combined with a `sbb-datepicker`, it can be used to move the date back.
 */
export
@customElement('sbb-datepicker-previous-day')
class SbbDatepickerPreviousDayElement<T = Date> extends SbbDatepickerButton<T> {
  public static override styles: CSSResultGroup = [
    boxSizingStyles,
    miniButtonStyle,
    datepickerButtonStyle,
  ];

  protected iconName: string = 'chevron-small-left-small';
  protected i18nOffBoundaryDay: Record<string, string> = i18nPreviousDay;
  protected i18nSelectOffBoundaryDay = i18nSelectPreviousDay;

  protected findAvailableDate(date: T): T | null {
    let availableDate = this.dateAdapter.addCalendarDays(date, -1);
    if (this._isBeforeMinDate(availableDate)) {
      return null;
    }

    const dateFilter = this.input!.dateFilter;
    if (dateFilter) {
      while (!dateFilter(availableDate)) {
        availableDate = this.dateAdapter.addCalendarDays(availableDate, -1);
        if (this._isBeforeMinDate(availableDate)) {
          return null;
        }
      }
    }

    return availableDate;
  }

  private _isBeforeMinDate(date: T): boolean {
    return !!this.input!.min && this.dateAdapter.compareDate(date, this.input!.min) < 0;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-datepicker-previous-day': SbbDatepickerPreviousDayElement;
  }
}
