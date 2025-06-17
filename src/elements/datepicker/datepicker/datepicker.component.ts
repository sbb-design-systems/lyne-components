import {
  type CSSResultGroup,
  html,
  isServer,
  nothing,
  type PropertyDeclaration,
  type TemplateResult,
} from 'lit';
import { customElement, property } from 'lit/decorators.js';

import type { CalendarView } from '../../calendar.js';
import { readConfig } from '../../core/config.js';
import { SbbLanguageController } from '../../core/controllers.js';
import { type DateAdapter, defaultDateAdapter } from '../../core/datetime.js';
import { forceType, idReference } from '../../core/decorators.js';
import { i18nDateChangedTo } from '../../core/i18n.js';
import { SbbDateInputElement, type SbbDateInputAssociated } from '../../date-input.js';
import { SbbPopoverBaseElement } from '../../popover.js';
import type { SbbDatepickerToggleElement } from '../datepicker-toggle.js';

import style from './datepicker.scss?lit&inline';

import '../../calendar.js';

let nextId = 0;

/**
 * A datepicker component that allows users to select a date from a calendar view.
 *
 * @event {CustomEvent<void>} willOpen - Emits whenever the `sbb-datepicker` starts the opening transition. Can be canceled.
 * @event {CustomEvent<void>} didOpen - Emits whenever the `sbb-datepicker` is opened.
 * @event {CustomEvent<{ closeTarget: HTMLElement }>} willClose - Emits whenever the `sbb-datepicker` begins the closing
 * transition. Can be canceled.
 * @event {CustomEvent<{ closeTarget: HTMLElement }>} didClose - Emits whenever the `sbb-datepicker` is closed.
 * @event {CustomEvent<T>} dateSelected - Event emitted on date selection.
 */
export
@customElement('sbb-datepicker')
class SbbDatepickerElement<T = Date>
  extends SbbPopoverBaseElement
  implements SbbDateInputAssociated<T>
{
  public static override styles: CSSResultGroup = [SbbPopoverBaseElement.styles, style];
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

  public constructor() {
    super();
    this.addEventListener(SbbPopoverBaseElement.events.willOpen, () => {
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
        @dateSelected=${(d: CustomEvent<T>) => {
          if (this.input) {
            this.input.valueAsDate = d.detail;
            this.input.dispatchEvent(new InputEvent('input', { bubbles: true, composed: true }));
            this.input.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
            // Emit blur event when value is changed programmatically to notify
            // frameworks that rely on that event to update form status.
            this.input.dispatchEvent(new Event('blur', { composed: true }));
          }
        }}
      ></sbb-calendar>
    `;
  }

  protected override render(): TemplateResult {
    return isServer || this.hydrationRequired ? html`${nothing}` : super.render();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-datepicker': SbbDatepickerElement;
  }
}
