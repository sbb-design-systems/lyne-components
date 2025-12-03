import { MutationController } from '@lit-labs/observers/mutation-controller.js';
import type { CSSResultGroup, TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { isArrowKeyOrPageKeysPressed } from '../../core/a11y.ts';
import { readConfig } from '../../core/config/config.ts';
import type { DateAdapter } from '../../core/datetime/date-adapter.ts';
import { defaultDateAdapter } from '../../core/datetime/native-date-adapter.ts';
import type { SbbOrientation } from '../../core/interfaces.ts';
import { ɵstateController } from '../../core/mixins.ts';
import type { SbbMiniCalendarDayElement } from '../mini-calendar-day.ts';
import type { SbbMiniCalendarMonthElement } from '../mini-calendar-month.ts';

import style from './mini-calendar.scss?lit&inline';

/**
 * It displays a minimal calendar, together with the `sbb-mini-calendar-month` and `sbb-mini-calendar-day`.
 *
 * @slot - Use the unnamed slot to add `sbb-mini-calendar-month` elements.
 */
export
@customElement('sbb-mini-calendar')
class SbbMiniCalendarElement<T = Date> extends LitElement {
  public static override styles: CSSResultGroup = style;

  /** The orientation of days in the calendar. */
  @property({ reflect: true })
  public accessor orientation: SbbOrientation = 'horizontal';

  private _keydownAbortController: AbortController | null = null;
  private _dateAdapter: DateAdapter<T> = readConfig().datetime?.dateAdapter ?? defaultDateAdapter;

  public constructor() {
    super();

    this.addController(
      new MutationController(this, {
        config: { childList: true, subtree: true },
        callback: () => this._setMonthsShowYear(),
      }),
    );
  }

  private _getMiniCalendarMonths(): SbbMiniCalendarMonthElement[] {
    return Array.from(this.querySelectorAll?.('sbb-mini-calendar-month') ?? []);
  }

  private _getMiniCalendarDays(): SbbMiniCalendarDayElement[] {
    return Array.from(
      this._getMiniCalendarMonths().flatMap((month) =>
        Array.from(month.querySelectorAll?.('sbb-mini-calendar-day') ?? []),
      ),
    );
  }

  private _setMonthsShowYear(): void {
    this._getMiniCalendarMonths().forEach(
      (monthElement: SbbMiniCalendarMonthElement, index: number) => {
        const splitDate = monthElement.date.split('-');
        if (splitDate.length > 0) {
          if (index === 0 || +splitDate[1] === 1) {
            ɵstateController(monthElement).add('show-year');
          } else {
            ɵstateController(monthElement).delete('show-year');
          }
        }
      },
    );
  }

  private _handleKeydownCalendarDay(event: KeyboardEvent): void {
    if (isArrowKeyOrPageKeysPressed(event)) {
      event.preventDefault();
    }

    const days: SbbMiniCalendarDayElement[] = this._getMiniCalendarDays();
    const day = days.find((e) => e === event.target)!;
    const nextEl: SbbMiniCalendarDayElement = this._navigateByKeyboardDayView(days, day, event);
    const activeEl: SbbMiniCalendarDayElement = document.activeElement as SbbMiniCalendarDayElement;
    if (nextEl !== activeEl) {
      nextEl.tabIndex = 0;
      nextEl?.focus();
      activeEl.tabIndex = -1;
    }
  }

  private _navigateByKeyboardDayView(
    days: SbbMiniCalendarDayElement[],
    day: SbbMiniCalendarDayElement,
    event: KeyboardEvent,
  ): SbbMiniCalendarDayElement {
    const arrowsOffset =
      this.orientation === 'horizontal' ? { leftRight: 1, upDown: 7 } : { leftRight: 7, upDown: 1 };
    const fullDate = this._dateAdapter.parse(day.date)!;
    const dayDate = this._dateAdapter.getDate(fullDate);
    const offsetForVertical = this._dateAdapter.getFirstWeekOffset(fullDate);

    switch (event.key) {
      case 'ArrowUp':
        return this._findDayArrowKeys(days, day, -arrowsOffset.upDown);
      case 'ArrowDown':
        return this._findDayArrowKeys(days, day, arrowsOffset.upDown);
      case 'ArrowLeft':
        return this._findDayArrowKeys(days, day, -arrowsOffset.leftRight);
      case 'ArrowRight':
        return this._findDayArrowKeys(days, day, arrowsOffset.leftRight);
      case 'PageUp': {
        if (this.orientation === 'horizontal') {
          const delta = dayDate - (dayDate % 7 || 7);
          return this._findDaySpecialKeys(days, day, -delta, arrowsOffset.upDown);
        } else {
          const weekNumber: number = Math.ceil((dayDate + offsetForVertical) / 7);
          const firstOfWeek: number = (weekNumber - 1) * 7 - offsetForVertical + 1;
          const delta: number = firstOfWeek - dayDate;
          return this._findDaySpecialKeys(days, day, delta, arrowsOffset.upDown);
        }
      }
      case 'PageDown': {
        if (this.orientation === 'horizontal') {
          const lastDayMonth = this._dateAdapter.getNumDaysInMonth(fullDate);
          const delta = lastDayMonth - dayDate - ((lastDayMonth - dayDate) % 7);
          return this._findDaySpecialKeys(days, day, delta, -arrowsOffset.upDown);
        } else {
          const weekNumber: number = Math.ceil((dayDate + offsetForVertical) / 7);
          const lastOfWeek: number = weekNumber * 7 - offsetForVertical;
          const delta: number = lastOfWeek - dayDate;
          return this._findDaySpecialKeys(days, day, delta, -arrowsOffset.upDown);
        }
      }
      case 'Home': {
        const date = dayDate - 1;
        return this._findDaySpecialKeys(days, day, -date, +1);
      }
      case 'End': {
        const lastDayMonth = this._dateAdapter.getNumDaysInMonth(fullDate);
        return this._findDaySpecialKeys(days, day, lastDayMonth - dayDate, -1);
      }
      default:
        return day;
    }
  }

  private _findDayArrowKeys(
    days: SbbMiniCalendarDayElement[],
    day: SbbMiniCalendarDayElement,
    delta: number,
  ): SbbMiniCalendarDayElement {
    const newDate = this._dateAdapter.addCalendarDays(
      this._dateAdapter.deserialize(day.date)!,
      delta,
    );
    const newDateString = this._dateAdapter.toIso8601(newDate);
    const newDay = days.find((d) => d.date === newDateString);
    if (!newDay) {
      return day;
    }
    return newDay;
  }

  private _findDaySpecialKeys(
    days: SbbMiniCalendarDayElement[],
    day: SbbMiniCalendarDayElement,
    delta: number,
    recursiveDelta: number,
  ): SbbMiniCalendarDayElement {
    const newDate = this._dateAdapter.addCalendarDays(
      this._dateAdapter.deserialize(day.date)!,
      delta,
    );
    const newDateString = this._dateAdapter.toIso8601(newDate);
    const newDay = days.find((d) => d.date === newDateString);
    if (!newDay) {
      return this._findDaySpecialKeys(days, day, delta + recursiveDelta, recursiveDelta);
    }
    return newDay!;
  }

  private _handleSlotchange(): void {
    this._setupKeydownListener();
  }

  private _setupKeydownListener(): void {
    this._keydownAbortController?.abort();
    this._keydownAbortController = new AbortController();
    this._getMiniCalendarDays().forEach((day, index) => {
      day.addEventListener('keydown', (e) => this._handleKeydownCalendarDay(e), {
        signal: this._keydownAbortController!.signal,
      });
      if (index !== 0) {
        day.tabIndex = -1;
      }
    });
  }

  /** @internal */
  public override focus(): void {
    this._getMiniCalendarDays()
      ?.find((e) => e.tabIndex === 0)
      ?.focus();
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this._setupKeydownListener();
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._keydownAbortController?.abort();
  }

  protected override render(): TemplateResult {
    return html`<slot @slotchange=${this._handleSlotchange}></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-mini-calendar': SbbMiniCalendarElement;
  }
}
