import type { CSSResultGroup, TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { isArrowKeyOrPageKeysPressed } from '../../core/a11y.js';
import { readConfig } from '../../core/config/config.js';
import { type DateAdapter } from '../../core/datetime/date-adapter.js';
import { defaultDateAdapter } from '../../core/datetime/native-date-adapter.js';
import { handleDistinctChange } from '../../core/decorators.js';
import type { SbbOrientation } from '../../core/interfaces.js';
import { type SbbMiniCalendarDayElement } from '../mini-calendar-day.js';
import { type SbbMiniCalendarMonthElement } from '../mini-calendar-month.js';

import style from './mini-calendar.scss?lit&inline';

/**
 * It displays a minimal calendar
 *
 * @slot - Use the unnamed slot to add `sbb-mini-calendar-month` elements.
 */
export
@customElement('sbb-mini-calendar')
class SbbMiniCalendarElement<T = Date> extends LitElement {
  public static override styles: CSSResultGroup = style;

  /** The orientation of days in the calendar. */
  @handleDistinctChange((e: SbbMiniCalendarElement<T>) => e._handleSlotchange())
  @property({ reflect: true })
  public accessor orientation: SbbOrientation = 'horizontal';

  private _keydownAbortController: AbortController | null = null;
  private _dateAdapter: DateAdapter<T> = readConfig().datetime?.dateAdapter ?? defaultDateAdapter;

  private get _miniCalendarMonths(): SbbMiniCalendarMonthElement[] {
    return Array.from(this.querySelectorAll?.('sbb-mini-calendar-month') ?? []);
  }

  private get _miniCalendarDays(): SbbMiniCalendarDayElement[] {
    return Array.from(
      this._miniCalendarMonths.flatMap((month) =>
        Array.from(month.querySelectorAll?.('sbb-mini-calendar-day') ?? []),
      ),
    );
  }

  private _setMonthsOrientation(): void {
    this._miniCalendarMonths.forEach((month: SbbMiniCalendarMonthElement) =>
      month.setAttribute('data-orientation', this.orientation),
    );
  }

  private _handleKeydownCalendarDay(event: KeyboardEvent): void {
    if (isArrowKeyOrPageKeysPressed(event)) {
      event.preventDefault();
    }

    const days: SbbMiniCalendarDayElement[] = this._miniCalendarDays;
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
        const date = this._dateAdapter.getDate(this._dateAdapter.parse(day.date)!);
        const delta = date - (date % 7 || 7);
        return this._findDaySpecialKeys(days, day, -delta, +arrowsOffset.upDown);
      }
      case 'PageDown': {
        const fullDate = this._dateAdapter.parse(day.date)!;
        const dayDate = this._dateAdapter.getDate(fullDate);
        const lastDayMonth = this._dateAdapter.getNumDaysInMonth(fullDate);
        const delta = lastDayMonth - dayDate - ((lastDayMonth - dayDate) % 7);
        return this._findDaySpecialKeys(days, day, delta, -arrowsOffset.upDown);
      }
      case 'Home': {
        const date = this._dateAdapter.getDate(this._dateAdapter.parse(day.date)!) - 1;
        return this._findDaySpecialKeys(days, day, -date, +1);
      }
      case 'End': {
        const fullDate = this._dateAdapter.parse(day.date)!;
        const dayDate = this._dateAdapter.getDate(fullDate);
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
      this._findDaySpecialKeys(days, day, delta + recursiveDelta, recursiveDelta);
    }
    return newDay!;
  }

  private _handleSlotchange(): void {
    this._setMonthsOrientation();

    this._keydownAbortController = new AbortController();
    this._miniCalendarDays.forEach((day, index) => {
      day.addEventListener('keydown', (e) => this._handleKeydownCalendarDay(e), {
        signal: this._keydownAbortController!.signal,
      });
      if (index !== 0) {
        day.tabIndex = -1;
      }
    });
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._keydownAbortController?.abort();
  }

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-mini-calendar">
        <slot @slotchange=${this._handleSlotchange}></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-mini-calendar': SbbMiniCalendarElement;
  }
}
