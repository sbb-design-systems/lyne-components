import type { CSSResultGroup, TemplateResult } from 'lit';
import { html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { SbbButtonLikeBaseElement } from '../../core/base-elements.ts';
import { readConfig } from '../../core/config/config.ts';
import { SbbPropertyWatcherController } from '../../core/controllers.ts';
import type { DateAdapter } from '../../core/datetime/date-adapter.ts';
import { defaultDateAdapter } from '../../core/datetime/native-date-adapter.ts';
import {
  type FormRestoreReason,
  type FormRestoreState,
  SbbDisabledMixin,
} from '../../core/mixins.ts';
import { boxSizingStyles } from '../../core/styles.ts';
import type { SbbCalendarElement } from '../calendar/calendar.component.ts';

import style from './calendar-day.scss?lit&inline';

/**
 * It displays a single day cell in the `sbb-calendar` component.
 *
 * @slot - Use the unnamed slot to add some custom content to the day.
 */
export
@customElement('sbb-calendar-day')
class SbbCalendarDayElement<T extends Date = Date> extends SbbDisabledMixin(
  SbbButtonLikeBaseElement,
) {
  public static override styles: CSSResultGroup = [boxSizingStyles, style];
  protected dateAdapter: DateAdapter = readConfig().datetime?.dateAdapter ?? defaultDateAdapter;

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
      const parent = this._getParent();
      if (parent) {
        this._setDisabledFilteredState(parent);
        this._setSelectedState(parent);
      }
    }
  }
  public get value(): T | null {
    return this._value;
  }
  private _value: T | null = null;

  public constructor() {
    super();
    this.addController(
      new SbbPropertyWatcherController(this, () => this._getParent(), {
        dateFilter: (component) => this._setDisabledFilteredState(component),
        min: (component) => this._setDisabledFilteredState(component),
        max: (component) => this._setDisabledFilteredState(component),
        selected: (component) => this._setSelectedState(component),
      }),
    );
  }

  /**
   * Intentionally empty, as buttons are not targeted by form reset.
   * @internal
   */
  public override formResetCallback(): void {}

  /**
   * Intentionally empty, as buttons are not targeted by form restore.
   * @internal
   */
  public override formStateRestoreCallback(
    _state: FormRestoreState | null,
    _reason: FormRestoreReason,
  ): void {}

  public override connectedCallback(): void {
    super.connectedCallback();
    this.tabIndex = -1;
  }

  /**
   * The component is used as the default day cell within the `sbb-calendar`,
   * or,if extra content is needed, it can be slotted.
   */
  private _getParent(): SbbCalendarElement | null {
    const calendarParent = this.closest?.<SbbCalendarElement>('sbb-calendar');
    if (calendarParent) {
      return calendarParent;
    }
    const root = this.getRootNode?.();
    if (root && root instanceof ShadowRoot && root.host.localName === 'sbb-calendar') {
      return root.host as SbbCalendarElement;
    }
    return null;
  }

  private _setSelectedState(component: SbbCalendarElement): void {
    const selected = component.multiple
      ? (component.selected as Date[]).some((selDay) =>
          this.dateAdapter.sameDate(this.value, selDay),
        )
      : !!component.selected && this.dateAdapter.compareDate(this.value, component.selected) === 0;
    this.toggleState('selected', selected);
    this.internals.ariaPressed = String(selected);
  }

  private _setDisabledFilteredState(component: SbbCalendarElement): void {
    const isFilteredOut = !this._isActiveDate(component.dateFilter);
    const isOutOfRange = !this._isDayInRange(component.min, component.max);
    this.disabled = isFilteredOut || isOutOfRange;
    this.internals.ariaDisabled = String(this.disabled);
    this.toggleState('crossed-out', isFilteredOut && !isOutOfRange);
  }

  private _isActiveDate(dateFilter: ((date: Date | null) => boolean) | null): boolean {
    return dateFilter?.(this.value) ?? true;
  }

  private _isDayInRange(min: Date | null, max: Date | null): boolean {
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
