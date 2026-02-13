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
import type { SbbCalendarBaseElement } from '../calendar/calendar-base-element.ts';
import type { SbbCalendarElement } from '../calendar/calendar.component.ts';
import type { SbbCalendarEnhancedElement } from '../calendar-enhanced/calendar-enhanced.component.ts';

import style from './calendar-day.scss?lit&inline';

/**
 * It displays a single day cell in the `sbb-calendar-enhanced` component.
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
    const dateValue: T = this.dateAdapter.deserialize(value);
    if (this.dateAdapter.isValid(dateValue)) {
      super.slot = value;
      this.value = dateValue;
      const isToday = value === this.dateAdapter.toIso8601(this.dateAdapter.today());
      this.toggleState('current', isToday);
      this.internals.ariaCurrent = isToday ? 'date' : null;
      this.internals.ariaLabel = this.dateAdapter.getAccessibilityFormatDate(value);
      if (this._parent) {
        this._setDisabledFilteredState(this._parent);
        this._setSelectedState(this._parent);
      }
    }
  }
  public override get slot(): string {
    return super.slot;
  }

  /** Value of the calendar-day element. */
  public get value(): T | null {
    return this._value;
  }
  public set value(value: T | null) {
    this._value = value;
  }
  @state() private accessor _value: T | null = null;

  /**
   * The component is meant to be used within the `sbb-calendar` or slotted in the `sbb-calendar-enhanced`
   */
  private get _parent(): SbbCalendarBaseElement | null {
    const calendarEnhancedParent =
      this.closest?.<SbbCalendarEnhancedElement>('sbb-calendar-enhanced');
    if (calendarEnhancedParent) {
      return calendarEnhancedParent;
    }
    const root = this.getRootNode?.();
    if (root && root instanceof ShadowRoot && root.host.localName === 'sbb-calendar') {
      return root.host as SbbCalendarElement;
    }
    return null;
  }

  public constructor() {
    super();
    this.addController(
      new SbbPropertyWatcherController(this, () => this._parent, {
        dateFilter: (component) => this._setDisabledFilteredState(component),
        min: (component) => this._setDisabledFilteredState(component),
        max: (component) => this._setDisabledFilteredState(component),
        selected: (component) => this._setSelectedState(component),
      }),
    );
  }

  /**
   * Intentionally empty, as buttons are not targeted by form reset
   * @internal
   */
  public override formResetCallback(): void {}

  /**
   * Intentionally empty, as buttons are not targeted by form restore
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

  private _setSelectedState(component: SbbCalendarBaseElement): void {
    const selected = component.multiple
      ? (component.selected as Date[]).find(
          (selDay) => this.dateAdapter.compareDate(this.value, selDay) === 0,
        ) !== undefined
      : !!component.selected && this.dateAdapter.compareDate(this.value, component.selected) === 0;
    this.toggleState('selected', selected);
    this.internals.ariaPressed = String(selected);
  }

  private _setDisabledFilteredState(component: SbbCalendarBaseElement): void {
    const isFilteredOut = !this._isFilteredOut(component.dateFilter);
    const isOutOfRange = !this._isDayInRange(component.min, component.max);
    this.disabled = isFilteredOut || isOutOfRange;
    this.internals.ariaDisabled = String(this.disabled);
    this.toggleState('crossed-out', isFilteredOut && !isOutOfRange);
  }

  private _isFilteredOut(dateFilter: ((date: Date | null) => boolean) | null): boolean {
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
