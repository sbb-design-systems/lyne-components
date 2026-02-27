import { SbbButtonLikeBaseElement } from '../../core/base-elements/button-base-element.ts';
import { readConfig } from '../../core/config/config.ts';
import { SbbPropertyWatcherController } from '../../core/controllers/property-watcher-controller.ts';
import type { DateAdapter } from '../../core/datetime/date-adapter.ts';
import { defaultDateAdapter } from '../../core/datetime/native-date-adapter.ts';
import { SbbDisabledMixin } from '../../core/mixins/disabled-mixin.ts';
import type {
  FormRestoreReason,
  FormRestoreState,
} from '../../core/mixins/form-associated-mixin.ts';
import type { SbbCalendarElement } from '../calendar/calendar.component.ts';

export abstract class CalendarCellBaseElement<T = Date> extends SbbDisabledMixin(
  SbbButtonLikeBaseElement,
) {
  protected dateAdapter: DateAdapter = readConfig().datetime?.dateAdapter ?? defaultDateAdapter;

  public constructor() {
    super();
    this.addController(
      new SbbPropertyWatcherController(this, () => this.getParent(), {
        dateFilter: (component) => this.setDisabledFilteredState(component),
        min: (component) => this.setDisabledFilteredState(component),
        max: (component) => this.setDisabledFilteredState(component),
        selected: (component) => this.setSelectedState(component),
      }),
    );
  }

  protected abstract setDisabledFilteredState(parent: SbbCalendarElement<T>): void;
  protected abstract setSelectedState(parent: SbbCalendarElement<T>): void;

  protected getParent(): SbbCalendarElement<T> | null {
    return (this.getRootNode?.() as ShadowRoot)?.host?.closest<SbbCalendarElement<T>>(
      'sbb-calendar',
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
}
