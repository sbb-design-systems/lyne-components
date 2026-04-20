import {
  type CSSResultGroup,
  html,
  isServer,
  nothing,
  type PropertyDeclaration,
  type PropertyValues,
  type TemplateResult,
  unsafeCSS,
} from 'lit';
import { property } from 'lit/decorators.js';

import { type CalendarView, SbbCalendarElement } from '../../calendar.pure.ts';
import {
  type DateAdapter,
  defaultDateAdapter,
  forceType,
  i18nDateChangedTo,
  idReference,
  readConfig,
  type SbbElementType,
  SbbLanguageController,
  SbbUpdateSchedulerMixin,
} from '../../core.ts';
import { type SbbDateInputAssociated, SbbDateInputElement } from '../../date-input.pure.ts';
import { SbbPopoverBaseElement } from '../../popover.pure.ts';
import type { SbbDatepickerToggleElement } from '../datepicker-toggle/datepicker-toggle.component.ts';

import style from './datepicker.scss?inline';

let nextId = 0;

/**
 * A datepicker component that allows users to select a date from a calendar view.
 *
 * @event {CustomEvent<T>} dateselected - Event emitted on date selection.
 * @event {Event} change - The change event is fired on the datepicker's input when the user modifies the element's value. Unlike the input event, the change event is not necessarily fired for each alteration to an element's value.
 * @event {InputEvent} input - The input event fires  on the datepicker's input when the value has been changed as a direct result of a user action.
 */
export class SbbDatepickerElement<T = Date>
  extends SbbUpdateSchedulerMixin(SbbPopoverBaseElement)
  implements SbbDateInputAssociated<T>
{
  public static override readonly elementName: string = 'sbb-datepicker';
  public static override elementDependencies: SbbElementType[] = [SbbCalendarElement];
  public static override styles: CSSResultGroup = [SbbPopoverBaseElement.styles, unsafeCSS(style)];
  public static readonly sbbDateInputAssociated = true;

  /** If set to true, two months are displayed. */
  @forceType()
  @property({ type: Boolean })
  public accessor wide: boolean = false;

  /**
   * Reference to the sbb-date-input instance or the native input connected to the datepicker.
   *
   * For attribute usage, provide an id reference.
   */
  @idReference()
  @property()
  public accessor input: SbbDateInputElement<T> | null = null;

  /** The initial view of calendar which should be displayed on opening. */
  @property() public accessor view: CalendarView = 'day';

  private _inputAbortController?: AbortController;
  private _dateAdapter: DateAdapter<T> = readConfig().datetime?.dateAdapter ?? defaultDateAdapter;
  private _language = new SbbLanguageController(this);
  private _ready = false;

  public constructor() {
    super();
    this.startUpdate();
    this.addEventListener(SbbPopoverBaseElement.events.beforeopen, () => {
      this.shadowRoot?.querySelector('sbb-calendar')?.resetPosition?.();
    });
    if (!isServer && this.hydrationRequired) {
      this.hydrationComplete.then(() => this.requestUpdate());
    }
  }

  public override connectedCallback(): void {
    this.id ||= `sbb-datepicker-${++nextId}`;
    super.connectedCallback();

    const formField = this.closest?.('sbb-form-field');
    if (formField) {
      SbbDateInputElement.resolveAssociation(this);
      const toggle =
        formField.querySelector<SbbDatepickerToggleElement<T>>('sbb-datepicker-toggle');
      if (toggle && !toggle.hasAttribute('datepicker')) {
        toggle.datepicker ??= this;
      }
    }
  }

  public override requestUpdate(
    name?: PropertyKey,
    oldValue?: unknown,
    options?: PropertyDeclaration,
  ): void {
    super.requestUpdate(name, oldValue, options);
    if (name === 'input' && this.input !== oldValue) {
      this._inputAbortController?.abort();
      if (this.input) {
        const { signal } = (this._inputAbortController = new AbortController());
        this.input?.addEventListener(
          'ɵchange',
          () => {
            super.requestUpdate();
            this._updateStatus();
          },
          { signal },
        );
      }
    }
  }

  protected override firstUpdated(changedProperties: PropertyValues<this>): void {
    super.firstUpdated(changedProperties);
    setTimeout(() => {
      // We want to delay the rendering of the calendar to avoid a slow initial render.
      // The slow render can be a problem if a large amount of datepickers are rendered at once.
      this._ready = true;
      this.requestUpdate();
      this.completeUpdate();
    });
  }

  private _updateStatus(): void {
    const status = this.shadowRoot?.getElementById('status-container');
    if (!status) {
      return;
    }

    const text = this._dateAdapter.isValid(this.input?.valueAsDate)
      ? `${i18nDateChangedTo[this._language.current]} ${this._dateAdapter.format(
          this.input!.valueAsDate,
          {
            weekdayStyle: 'long',
          },
        )}`
      : '';
    if (status.textContent !== text) {
      status.textContent = text;
    }
  }

  protected override renderContent(): TemplateResult {
    return html`
      <p id="status-container" role="status"></p>
      <sbb-calendar
        .view=${this.view}
        .min=${this.input?.min ?? null}
        .max=${this.input?.max ?? null}
        .dateFilter=${this.input?.dateFilter ?? null}
        .selected=${this.input?.valueAsDate ?? null}
        ?wide=${this.wide}
        @dateselected=${(d: CustomEvent<T>) => {
          if (this.input) {
            this.input.valueAsDate = d.detail;
            this.input.dispatchEvent(new InputEvent('input', { bubbles: true, composed: true }));
            this.input.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
            // Emit blur event when value is changed programmatically to notify
            // frameworks that rely on that event to update form status.
            this.input.dispatchEvent(new Event('blur', { composed: true }));
            this.close();
          }
        }}
      ></sbb-calendar>
    `;
  }

  protected override render(): TemplateResult {
    return isServer || this.hydrationRequired || !this._ready ? html`${nothing}` : super.render();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-datepicker': SbbDatepickerElement;
  }
}
