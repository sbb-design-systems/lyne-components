import type { CSSResultGroup, TemplateResult } from 'lit';
import { html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { boxSizingStyles } from '../../core/styles.ts';
import type { SbbCalendarElement } from '../calendar/calendar.component.ts';
import { CalendarCellBaseElement, calendarCellBaseStyle } from '../common.ts';

import style from './calendar-day.scss?lit&inline';

/**
 * It displays a single day cell in the `sbb-calendar` component.
 *
 * @slot - Use the unnamed slot to add some custom content to the day.
 */
export
@customElement('sbb-calendar-day')
class SbbCalendarDayElement<T = Date> extends CalendarCellBaseElement<T> {
  public static override styles: CSSResultGroup = [boxSizingStyles, calendarCellBaseStyle, style];

  @property()
  public override set slot(value: string) {
    super.slot = value;
    this.value = this.dateAdapter.deserialize(value);
  }
  public override get slot(): string {
    return super.slot;
  }

  /** Value of the calendar-day element. */
  @state()
  public set value(value: T | null) {
    const date = this.dateAdapter.getValidDateOrNull(this.dateAdapter.deserialize(value));
    if (date) {
      this._value = date;
      const isToday = this.dateAdapter.sameDate(date, this.dateAdapter.today());
      this.toggleState('current', isToday);
      this.internals.ariaCurrent = isToday ? 'date' : null;
      this.internals.ariaLabel = this.dateAdapter.getAccessibilityFormatDate(date);
      const parent = this.getParent();
      if (parent) {
        this.setDisabledFilteredState(parent);
        this.setSelectedState(parent);
      }
    }
  }
  public get value(): T | null {
    return this._value;
  }
  private _value: T | null = null;

  public override connectedCallback(): void {
    super.connectedCallback();
    this.tabIndex = -1;
  }

  /**
   * The component is used as the default day cell within the `sbb-calendar`,
   * or, if extra content is needed, it can be slotted.
   */
  protected override getParent(): SbbCalendarElement<T> | null {
    return (
      this.closest?.<SbbCalendarElement<T>>('sbb-calendar') ??
      (this.getRootNode?.() as ShadowRoot)?.host?.closest<SbbCalendarElement<T>>('sbb-calendar')
    );
  }

  protected setSelectedState(parent: SbbCalendarElement<T>): void {
    const selected = parent.multiple
      ? (parent.selected as Date[]).some((selDay) => this.dateAdapter.sameDate(this.value, selDay))
      : !!parent.selected && this.dateAdapter.compareDate(this.value, parent.selected) === 0;
    this.toggleState('selected', selected);
    this.internals.ariaPressed = String(selected);
  }

  protected setDisabledFilteredState(parent: SbbCalendarElement<T>): void {
    const isFilteredOut = !this._isActiveDate(parent.dateFilter);
    const isOutOfRange = !this._isDayInRange(parent.min, parent.max);
    this.disabled = isFilteredOut || isOutOfRange;
    this.internals.ariaDisabled = String(this.disabled);
    this.toggleState('crossed-out', isFilteredOut && !isOutOfRange);
  }

  private _isActiveDate(dateFilter: ((date: T | null) => boolean) | null): boolean {
    return dateFilter?.(this.value) ?? true;
  }

  private _isDayInRange(min: T | null, max: T | null): boolean {
    if (!min && !max) {
      return true;
    }
    return this.dateAdapter.sameDate(this.value, this.dateAdapter.clampDate(this.value, min, max));
  }

  protected override renderTemplate(): TemplateResult {
    return html` <span class="sbb-calendar-day__value" aria-hidden="true">
        ${this.dateAdapter.getDate(this.value)}
      </span>
      <span class="sbb-calendar-day__extra">
        <slot></slot>
      </span>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-calendar-day': SbbCalendarDayElement;
  }
}
