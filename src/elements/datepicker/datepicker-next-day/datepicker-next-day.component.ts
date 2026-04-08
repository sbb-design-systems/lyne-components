import type { CSSResultGroup } from 'lit';

import { miniButtonStyle } from '../../button.pure.ts';
import { i18nNextDay, i18nSelectNextDay, boxSizingStyles } from '../../core.ts';
import { datepickerButtonStyle, SbbDatepickerButton } from '../common/datepicker-button.ts';

/**
 * Combined with a `sbb-datepicker`, it can be used to move the date ahead.
 */
export class SbbDatepickerNextDayElement<T = Date> extends SbbDatepickerButton<T> {
  public static override readonly elementName: string = 'sbb-datepicker-next-day';
  public static override styles: CSSResultGroup = [
    boxSizingStyles,
    miniButtonStyle,
    datepickerButtonStyle,
  ];

  protected iconName: string = 'chevron-small-right-small';
  protected i18nOffBoundaryDay: Record<string, string> = i18nNextDay;
  protected i18nSelectOffBoundaryDay = i18nSelectNextDay;

  protected getFollowingDate(date: T): T | null {
    const availableDate = this.dateAdapter.addCalendarDays(date, 1);
    if (this._isAfterMaxDate(availableDate)) {
      return null;
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
