import type { CSSResultGroup, PropertyValues, TemplateResult } from 'lit';
import { html, isServer, LitElement, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { ref } from 'lit/directives/ref.js';

import type { CalendarView, SbbCalendarElement } from '../../calendar.js';
import { sbbInputModalityDetector } from '../../core/a11y.js';
import { SbbLanguageController } from '../../core/controllers.js';
import { hostAttributes } from '../../core/decorators.js';
import { i18nShowCalendar } from '../../core/i18n.js';
import { SbbHydrationMixin, SbbNegativeMixin } from '../../core/mixins.js';
import type { SbbPopoverElement, SbbPopoverTriggerElement } from '../../popover.js';
import type { SbbDatepickerElement, SbbInputUpdateEvent } from '../datepicker.js';
import { datepickerControlRegisteredEventFactory, getDatePicker } from '../datepicker.js';

import style from './datepicker-toggle.scss?lit&inline';

import '../../calendar.js';
import '../../popover.js';

/**
 * Combined with a `sbb-datepicker`, it can be used to select a date from a `sbb-calendar`.
 */
@customElement('sbb-datepicker-toggle')
@hostAttributes({
  slot: 'prefix',
})
export class SbbDatepickerToggleElement<T = Date> extends SbbNegativeMixin(
  SbbHydrationMixin(LitElement),
) {
  public static override styles: CSSResultGroup = style;

  /** Datepicker reference. */
  @property({ attribute: 'date-picker' }) public datePicker?: string | SbbDatepickerElement;

  /** The initial view of calendar which should be displayed on opening. */
  @property() public view: CalendarView = 'day';

  @state() private _disabled = false;

  @state() private _min: string | number | null | undefined = null;

  @state() private _max: string | number | null | undefined = null;

  @state() private _renderCalendar = false;

  private _datePickerElement: SbbDatepickerElement<T> | null | undefined;

  private _calendarElement!: SbbCalendarElement<T>;

  private _triggerElement!: SbbPopoverTriggerElement;

  private _popoverElement!: SbbPopoverElement;

  private _datePickerController!: AbortController;

  private _language = new SbbLanguageController(this);

  public constructor() {
    super();
    if (!isServer) {
      this.hydrationComplete.then(() => (this._renderCalendar = true));
    }
  }

  /**
   * Opens the calendar.
   */
  public open(): void {
    if (!this._triggerElement) {
      this._triggerElement = this.shadowRoot!.querySelector('sbb-popover-trigger')!;
    }
    this._triggerElement.click();
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    if (!this.datePicker) {
      this._init();
    }

    const formField = this.closest?.('sbb-form-field') ?? this.closest?.('[data-form-field]');
    if (formField) {
      this.negative = formField.hasAttribute('negative');
    }
  }

  public override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('datePicker')) {
      this._init(this.datePicker);
    }
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._datePickerController?.abort();
  }

  private _init(datePicker?: string | SbbDatepickerElement): void {
    this._datePickerController?.abort();
    this._datePickerController = new AbortController();
    this._datePickerElement = getDatePicker<T>(this, datePicker);
    if (!this._datePickerElement) {
      // If the component is attached to the DOM before the datepicker, it has to listen for the datepicker init,
      // assuming that the two components share the same parent element.
      this.parentElement?.addEventListener(
        'inputUpdated',
        (e: Event) => this._init(e.target as SbbDatepickerElement),
        { once: true, signal: this._datePickerController.signal },
      );
      return;
    }

    this._datePickerElement?.addEventListener(
      'inputUpdated',
      (event: CustomEvent<SbbInputUpdateEvent>) => {
        this._datePickerElement = event.target as SbbDatepickerElement<T>;
        this._disabled = !!(event.detail.disabled || event.detail.readonly);
        this._min = event.detail.min;
        this._max = event.detail.max;
      },
      { signal: this._datePickerController.signal },
    );
    this._datePickerElement?.addEventListener(
      'change',
      (event: Event) => this._datePickerChanged(event),
      {
        signal: this._datePickerController.signal,
      },
    );
    this._datePickerElement?.addEventListener(
      'datePickerUpdated',
      (event: Event) =>
        this._configureCalendar(this._calendarElement, event.target as SbbDatepickerElement<T>),
      { signal: this._datePickerController.signal },
    );
    this._datePickerElement.dispatchEvent(datepickerControlRegisteredEventFactory());
  }

  private _configureCalendar(
    calendar: SbbCalendarElement<T>,
    datepicker: SbbDatepickerElement<T>,
  ): void {
    if (!calendar || !datepicker) {
      return;
    }
    calendar.wide = datepicker.wide;
    calendar.now = this._nowOrUndefined();
    calendar.dateFilter = datepicker.dateFilter;
  }

  private _datePickerChanged(event: Event): void {
    this._datePickerElement = event.target as SbbDatepickerElement<T>;
    if (this._calendarElement && this._datePickerElement.valueAsDate) {
      this._calendarElement.selected = this._datePickerElement.valueAsDate;
    }
  }

  private _assignCalendar(calendar: SbbCalendarElement<T>): void {
    if (this._calendarElement && this._calendarElement === calendar) {
      return;
    }
    this._calendarElement = calendar;
    if (
      !('valueAsDate' in (this._datePickerElement ?? {})) ||
      !this._calendarElement?.resetPosition
    ) {
      return;
    }
    this._calendarElement.selected = this._datePickerElement!.valueAsDate ?? undefined;
    this._configureCalendar(this._calendarElement, this._datePickerElement!);
    this._calendarElement.resetPosition();
  }

  protected override updated(changedProperties: PropertyValues<this>): void {
    super.updated(changedProperties);

    this._popoverElement.trigger = this._triggerElement;
  }

  private _nowOrUndefined(): T | undefined {
    return this._datePickerElement?.hasCustomNow() ? this._datePickerElement.now : undefined;
  }

  protected override render(): TemplateResult {
    return html`
      <sbb-popover-trigger
        icon-name="calendar-small"
        aria-label=${i18nShowCalendar[this._language.current]}
        ?disabled=${!isServer && (!this._datePickerElement || this._disabled)}
        ?negative=${this.negative}
        data-icon-small
        ${ref((el?: Element) => (this._triggerElement = el as SbbPopoverTriggerElement))}
      ></sbb-popover-trigger>
      <sbb-popover
        @willOpen=${() => this._calendarElement.resetPosition()}
        @didOpen=${() => {
          if (sbbInputModalityDetector.mostRecentModality === 'keyboard') {
            this._calendarElement.focus();
          }
        }}
        .trigger=${this._triggerElement}
        hide-close-button
        ${ref((el?: Element) => (this._popoverElement = el as SbbPopoverElement))}
      >
        ${this._renderCalendar
          ? html`<sbb-calendar
              .view=${this.view}
              .min=${this._min}
              .max=${this._max}
              .now=${this._nowOrUndefined()}
              ?wide=${this._datePickerElement?.wide}
              .dateFilter=${this._datePickerElement?.dateFilter}
              @dateSelected=${(d: CustomEvent<T>) => {
                this._calendarElement.selected = d.detail;
                if (this._datePickerElement) {
                  this._datePickerElement.valueAsDate = d.detail;
                }
              }}
              ${ref((calendar?: Element) =>
                this._assignCalendar(calendar as SbbCalendarElement<T>),
              )}
            ></sbb-calendar>`
          : nothing}
      </sbb-popover>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-datepicker-toggle': SbbDatepickerToggleElement;
  }
}
