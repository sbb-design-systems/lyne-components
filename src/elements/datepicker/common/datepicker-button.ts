import { html, type PropertyDeclaration, type TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';

import { SbbButtonBaseElement } from '../../core/base-elements.ts';
import { readConfig } from '../../core/config.ts';
import { SbbLanguageController } from '../../core/controllers.ts';
import { type DateAdapter, defaultDateAdapter } from '../../core/datetime.ts';
import { idReference } from '../../core/decorators.ts';
import { i18nToday } from '../../core/i18n.ts';
import { SbbNegativeMixin } from '../../core/mixins.ts';
import { SbbDateInputElement, type SbbDateInputAssociated } from '../../date-input.ts';

import '../../icon.ts';

export abstract class SbbDatepickerButtonBase<T = Date>
  extends SbbNegativeMixin(SbbButtonBaseElement)
  implements SbbDateInputAssociated<T>
{
  public static readonly sbbDateInputAssociated = true;

  /**
   * The associated date input element.
   *
   * For attribute usage, provide an id reference.
   */
  @idReference()
  @property()
  public accessor input: SbbDateInputElement<T> | null = null;

  /** Whether this button is disabled. */
  public get disabled(): boolean {
    return !!this._inputDisabled;
  }

  /** Whether the component is disabled due date-picker's input disabled. */
  private _inputDisabled = true;

  private _inputAbortController?: AbortController;

  protected dateAdapter: DateAdapter<T> = readConfig().datetime?.dateAdapter ?? defaultDateAdapter;
  protected language = new SbbLanguageController(this);
  protected abstract iconName: string;

  public override connectedCallback(): void {
    super.connectedCallback();
    this.toggleAttribute('disabled', this.disabled);
    const formField = this.closest?.('sbb-form-field');
    if (formField) {
      customElements.upgrade?.(formField);
      this.negative = formField.negative;
      SbbDateInputElement.resolveAssociation(this);
      this.slot ||= this._findSlotPosition();
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
      this._inputDisabled = true;
      if (this.input) {
        this._inputAbortController = new AbortController();
        this.slot = this._findSlotPosition();
        // The sbb-date-input instance must be upgraded in order
        // for properties to be accessible.
        customElements.upgrade?.(this.input);
        this._sync();
        this.input.addEventListener('ɵchange', () => this._sync());
      }
      if (this.hasUpdated) {
        this.toggleAttribute('disabled', this.disabled);
      }
    } else if (!name && this.hasUpdated && this.input) {
      // If language changes, we need to update related aria properties.
      this._sync();
    }
  }

  private _findSlotPosition(): string {
    return !this.input ||
      this.compareDocumentPosition(this.input) & Node.DOCUMENT_POSITION_FOLLOWING
      ? 'prefix'
      : 'suffix';
  }

  private _sync(): void {
    this.syncDateInputState();
    this.toggleAttribute('disabled', this.disabled);
    if (this.disabled) {
      this.removeAttribute('tabindex');
    } else {
      this.setAttribute('tabindex', '0');
    }
  }

  protected syncDateInputState(): void {
    this._inputDisabled = this.input!.disabled || this.input!.readOnly;
  }

  protected override renderTemplate(): TemplateResult {
    return html`<sbb-icon name=${this.iconName}></sbb-icon>`;
  }
}

export abstract class SbbDatepickerButton<T = Date> extends SbbDatepickerButtonBase<T> {
  /** Whether the component is disabled due date equals to boundary date. */
  private _disabled = true;

  protected abstract i18nOffBoundaryDay: Record<string, string>;
  protected abstract i18nSelectOffBoundaryDay: (_currentDate: string) => Record<string, string>;

  public override get disabled(): boolean {
    return this._disabled || super.disabled;
  }

  public constructor() {
    super();
    this.addEventListener?.('click', () => this._handleClick());
  }

  protected abstract getFollowingDate(_date: T): T | null;

  private _handleClick(): void {
    if (!this.input || this.disabled) {
      return;
    }
    const startingDate: T = this.input.valueAsDate ?? this.dateAdapter.today();
    const date = this.getFollowingDate(startingDate);
    if (this.dateAdapter.isValid(date) && this.dateAdapter.compareDate(date, startingDate) !== 0) {
      this.input.valueAsDate = date;
      this.input.dispatchEvent(new InputEvent('input', { bubbles: true, composed: true }));
      this.input.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
      // Emit blur event when value is changed programmatically to notify
      // frameworks that rely on that event to update form status.
      this.input.dispatchEvent(new Event('blur', { composed: true }));
    }
  }

  protected override syncDateInputState(): void {
    super.syncDateInputState();
    if (!this.dateAdapter.isValid(this.input!.valueAsDate)) {
      this._disabled = true;
      this.internals.ariaLabel = this.i18nOffBoundaryDay[this.language.current];
      return;
    }

    const date = this.getFollowingDate(this.input!.valueAsDate);
    this._disabled =
      !this.dateAdapter.isValid(date) ||
      this.dateAdapter.compareDate(date, this.input!.valueAsDate) === 0;
    const currentDateString =
      this.dateAdapter.compareDate(this.dateAdapter.today(), this.input!.valueAsDate) === 0
        ? i18nToday[this.language.current].toLowerCase()
        : this.dateAdapter.getAccessibilityFormatDate(this.input!.valueAsDate);
    this.internals.ariaLabel =
      this.i18nSelectOffBoundaryDay(currentDateString)[this.language.current];
  }
}
