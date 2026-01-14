import type { CSSResultGroup, TemplateResult } from 'lit';
import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { SbbButtonBaseElement } from '../../core/base-elements.ts';
import { readConfig } from '../../core/config/config.ts';
import { SbbPropertyWatcherController } from '../../core/controllers.ts';
import type { DateAdapter } from '../../core/datetime/date-adapter.ts';
import { defaultDateAdapter } from '../../core/datetime/native-date-adapter.ts';
import { hostAttributes } from '../../core/decorators/host-attributes.ts';
import { SbbDisabledMixin } from '../../core/mixins.ts';
import { boxSizingStyles } from '../../core/styles.ts';
import type { SbbCalendarEnhancedElement } from '../calendar-enhanced/calendar-enhanced.component.ts';

import style from './calendar-day.scss?lit&inline';

/**
 * It displays a single day cell in the `sbb-calendar-enhanced` component.
 *
 * @slot - Use the unnamed slot to add some custom content to the day.
 */
export
@customElement('sbb-calendar-day')
@hostAttributes({
  class: 'sbb-calendar__cell',
})
class SbbCalendarDayElement extends SbbDisabledMixin(SbbButtonBaseElement) {
  public static override styles: CSSResultGroup = [boxSizingStyles, style];
  protected dateAdapter: DateAdapter = readConfig().datetime?.dateAdapter ?? defaultDateAdapter;

  @property()
  public override set slot(value: string) {
    const isToday = value === this.dateAdapter.toIso8601(this.dateAdapter.today());
    this.toggleState('current', isToday);
    this.internals.ariaCurrent = isToday ? 'date' : null;
    this.internals.ariaLabel = this.dateAdapter.getAccessibilityFormatDate(value);
  }
  public override get slot(): string {
    return super.slot;
  }

  public constructor() {
    super();
    this.addController(
      new SbbPropertyWatcherController(this, () => this.closest('sbb-calendar-enhanced'), {
        dateFilter: (component) => this._setInternalState(component),
        min: (component) => this._setInternalState(component),
        max: (component) => this._setInternalState(component),
        selected: (component) => {
          let selected;
          if (component.multiple) {
            selected =
              (component.selected as Date[]).find(
                (selDay) =>
                  this.dateAdapter.compareDate(this.dateAdapter.parse(this.slot), selDay) === 0,
              ) !== undefined;
          } else {
            selected =
              !!component.selected &&
              this.dateAdapter.compareDate(
                this.dateAdapter.parse(this.slot),
                component.selected,
              ) === 0;
          }
          this.toggleState('selected', selected);
          this.internals.ariaPressed = String(selected);
        },
      }),
    );
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this.tabIndex = -1;
    this.toggleAttribute('sbb-popover-close', true);
  }

  private _setInternalState(component: SbbCalendarEnhancedElement): void {
    const isFilteredOut = !this._isFilteredOut(component.dateFilter);
    const isOutOfRange = !this._isDayInRange(component.min, component.max, this.slot);
    this.disabled = isFilteredOut || isOutOfRange;
    this.internals.ariaDisabled = String(isFilteredOut || isOutOfRange);
    this.toggleState('crossed-out', isFilteredOut && !isOutOfRange);
  }

  private _isFilteredOut(dateFilter: ((date: Date | null) => boolean) | null): boolean {
    return dateFilter?.(this.dateAdapter.deserialize(this.slot)!) ?? true;
  }

  private _isDayInRange(min: Date | null, max: Date | null, date: string): boolean {
    if (!min && !max) {
      return true;
    }
    const isBeforeMin: boolean =
      this.dateAdapter.isValid(min) &&
      this.dateAdapter.compareDate(min!, this.dateAdapter.deserialize(date)!) > 0;
    const isAfterMax: boolean =
      this.dateAdapter.isValid(max) &&
      this.dateAdapter.compareDate(max!, this.dateAdapter.deserialize(date)!) < 0;
    return !(isBeforeMin || isAfterMax);
  }

  protected override renderTemplate(): TemplateResult {
    return html` <span class="sbb-calendar-day__value" aria-hidden="true">
        ${Number(this.slot.split('-')[2])}
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
