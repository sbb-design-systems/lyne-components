import type { CSSResultGroup, PropertyValues, TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { readConfig } from '../../core/config.js';
import { SbbConnectedAbortController, SbbLanguageController } from '../../core/controllers.js';
import { type DateAdapter, defaultDateAdapter } from '../../core/datetime.js';
import { findInput, findReferencedElement } from '../../core/dom.js';
import { EventEmitter } from '../../core/eventing.js';
import { i18nDateChangedTo, i18nDatePickerPlaceholder } from '../../core/i18n.js';
import type { SbbDateLike, SbbValidationChangeEvent } from '../../core/interfaces.js';
import { AgnosticMutationObserver } from '../../core/observers.js';
import type { SbbDatepickerButton } from '../common.js';
import type { SbbDatepickerToggleElement } from '../datepicker-toggle.js';

import style from './datepicker.scss?lit&inline';

export interface SbbInputUpdateEvent {
  disabled?: boolean;
  readonly?: boolean;
  min?: string | number;
  max?: string | number;
}

// TODO(breaking-change): Inline deprecated functions in SbbDatepickerElement as public methods
// where possible and use these methods where the functions are currently used.

/**
 * Given a SbbDatepickerPreviousDayElement, a SbbDatepickerNextDayElement or a SbbDatepickerToggleElement component,
 * it returns the related SbbDatepickerElement reference, if exists.
 * @param element The element potentially connected to the SbbDatepickerElement.
 * @param trigger The id or the reference of the SbbDatePicker.
 */
export function getDatePicker<T = Date>(
  element: SbbDatepickerButton<T> | SbbDatepickerToggleElement<T>,
  trigger?: string | HTMLElement,
): SbbDatepickerElement<T> | null | undefined {
  if (!trigger) {
    return element
      .closest?.('sbb-form-field')
      ?.querySelector<SbbDatepickerElement<T>>('sbb-datepicker');
  }

  return findReferencedElement<SbbDatepickerElement<T>>(trigger);
}

/**
 * Returns the first available date before or after a given one, considering the SbbDatepickerElement `dateFilter` property.
 * @param date The starting date for calculations.
 * @param delta The number of days to add/subtract from the starting one.
 * @param dateFilter The dateFilter function from the SbbDatepickerElement.
 * @param dateAdapter The adapter class.
 *
 * @deprecated Not intended as public API.
 */
export function getAvailableDate<T = Date>(
  date: T,
  delta: number,
  dateFilter: ((date: T) => boolean) | null,
  dateAdapter: DateAdapter<T>,
): T {
  let availableDate = dateAdapter.addCalendarDays(date, delta);

  if (dateFilter) {
    while (!dateFilter(availableDate)) {
      availableDate = dateAdapter.addCalendarDays(availableDate, delta);
    }
  }

  return availableDate;
}

/**
 * Calculates the first available date before the given one,
 * considering the SbbDatepickerElement `dateFilter` property and `min` parameter (e.g. from the self-named input's attribute).
 * @param date The starting date for calculations.
 * @param dateFilter The dateFilter function from the SbbDatepickerElement.
 * @param dateAdapter The adapter class.
 * @param min The minimum value to consider in calculations.
 *
 * @deprecated Not intended as public API.
 */
export function findPreviousAvailableDate<T = Date>(
  date: T,
  dateFilter: ((date: T) => boolean) | null,
  dateAdapter: DateAdapter<T>,
  min: string | number | null,
): T {
  const previousDate = getAvailableDate(date, -1, dateFilter, dateAdapter);
  const dateMin = dateAdapter.deserialize(min);

  if (
    !dateMin ||
    (dateAdapter.isValid(dateMin) && dateAdapter.compareDate(previousDate, dateMin) >= 0)
  ) {
    return previousDate;
  }
  return date;
}

/**
 * Calculates the first available date after the given one,
 * considering the SbbDatepickerElement `dateFilter` property and `max` parameter (e.g. from the self-named input's attribute).
 * @param date The starting date for calculations.
 * @param dateFilter The dateFilter function from the SbbDatepickerElement.
 * @param dateAdapter The adapter class.
 * @param max The maximum value to consider in calculations.
 *
 * @deprecated Not intended as public API.
 */
export function findNextAvailableDate<T = Date>(
  date: T,
  dateFilter: ((date: T) => boolean) | null,
  dateAdapter: DateAdapter<T>,
  max: string | number | null,
): T {
  const nextDate = getAvailableDate(date, 1, dateFilter, dateAdapter);
  const dateMax = dateAdapter.deserialize(max);

  if (
    !dateMax ||
    (dateAdapter.isValid(dateMax) && dateAdapter.compareDate(nextDate, dateMax) <= 0)
  ) {
    return nextDate;
  }
  return date;
}

/**
 * Checks if the provided date is a valid one, considering the SbbDatepickerElement `dateFilter` property
 * and `min` and `max` parameters (e.g. from the self-named input's attributes).
 * @param date The starting date for calculations.
 * @param dateFilter The dateFilter function from the SbbDatepickerElement.
 * @param min The minimum value to consider in calculations.
 * @param max The maximum value to consider in calculations.
 *
 * @deprecated Not intended as public API.
 */
export function isDateAvailable<T = Date>(
  date: T,
  dateFilter: ((date: T) => boolean) | null,
  min: string | number | null | undefined,
  max: string | number | null | undefined,
): boolean {
  // TODO: Get date adapter from config
  const dateAdapter: DateAdapter<T> = readConfig().datetime?.dateAdapter ?? defaultDateAdapter;
  const dateMin = dateAdapter.deserialize(min);
  const dateMax = dateAdapter.deserialize(max);

  if (
    (dateAdapter.isValid(dateMin) && dateAdapter.compareDate(date, dateMin!) < 0) ||
    (dateAdapter.isValid(dateMax) && dateAdapter.compareDate(date, dateMax!) > 0)
  ) {
    return false;
  }

  return dateFilter ? dateFilter(date) : true;
}

export const datepickerControlRegisteredEventFactory = (): CustomEvent =>
  new CustomEvent('datepickerControlRegistered', {
    bubbles: false,
    composed: true,
  });

/**
 * Combined with a native input, it displays the input's value as a formatted date.
 *
 * @event {CustomEvent<void>} didChange - Deprecated. used for React. Will probably be removed once React 19 is available.
 * @event {CustomEvent<void>} change - Notifies that the connected input has changes.
 * @event {CustomEvent<SbbInputUpdateEvent>} inputUpdated - Notifies that the attributes of the input connected to the datepicker have changes.
 * @event {CustomEvent<void>} datePickerUpdated - Notifies that the attributes of the datepicker have changes.
 * @event {CustomEvent<SbbValidationChangeEvent>} validationChange - Emits whenever the internal validation state changes.
 */
@customElement('sbb-datepicker')
export class SbbDatepickerElement<T = Date> extends LitElement {
  public static override styles: CSSResultGroup = style;
  public static readonly events = {
    didChange: 'didChange',
    change: 'change',
    inputUpdated: 'inputUpdated',
    datePickerUpdated: 'datePickerUpdated',
    validationChange: 'validationChange',
  } as const;

  /** If set to true, two months are displayed. */
  @property({ type: Boolean }) public wide = false;

  /** A function used to filter out dates. */
  @property({ attribute: 'date-filter' }) public dateFilter: (date: T | null) => boolean = () =>
    true;

  /** A function used to parse string value into dates. */
  @property({ attribute: 'date-parser' }) public dateParser?: (value: string) => T | undefined;

  /** A function used to format dates into the preferred string format. */
  @property() public format?: (date: T) => string;

  /** Reference of the native input connected to the datepicker. */
  @property() public input?: string | HTMLElement;

  // TODO: Change undefined to null as a breaking change.
  /** A configured date which acts as the current date instead of the real current date. Recommended for testing purposes. */
  @property()
  public set now(value: SbbDateLike<T> | undefined) {
    this._now = this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(value));
  }
  public get now(): T {
    return this._now ?? this._dateAdapter.today();
  }
  private _now?: T | null;

  /** The currently selected date as a Date or custom date provider instance. */
  @property()
  public set valueAsDate(value: SbbDateLike<T> | null) {
    this._valueAsDate = this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(value));
    if (this._tryApplyFormatToInput()) {
      /* Emit blur event when value is changed programmatically to notify
      frameworks that rely on that event to update form status. */
      this._inputElement!.dispatchEvent(new Event('blur', { composed: true }));
    }
  }
  public get valueAsDate(): T | null {
    return this._valueAsDate ?? null;
  }
  private _valueAsDate?: T | null;

  /**
   * @deprecated only used for React. Will probably be removed once React 19 is available.
   */
  private _didChange: EventEmitter = new EventEmitter(this, SbbDatepickerElement.events.didChange, {
    bubbles: true,
    cancelable: true,
  });

  /** Notifies that the connected input has changes. */
  private _change: EventEmitter = new EventEmitter(this, SbbDatepickerElement.events.change, {
    bubbles: true,
  });

  /** Notifies that the attributes of the input connected to the datepicker have changes. */
  private _inputUpdated: EventEmitter<SbbInputUpdateEvent> = new EventEmitter(
    this,
    SbbDatepickerElement.events.inputUpdated,
    { bubbles: true, cancelable: true },
  );

  /** Notifies that the attributes of the datepicker have changes. */
  private _datePickerUpdated: EventEmitter = new EventEmitter(
    this,
    SbbDatepickerElement.events.datePickerUpdated,
    {
      bubbles: true,
      cancelable: true,
    },
  );

  /** Emits whenever the internal validation state changes. */
  private _validationChange: EventEmitter<SbbValidationChangeEvent> = new EventEmitter(
    this,
    SbbDatepickerElement.events.validationChange,
  );

  @state()
  private _inputElement: HTMLInputElement | null = null;
  private _inputElementPlaceholderMutable = false;

  private _datePickerController!: AbortController;

  private _inputObserver = new AgnosticMutationObserver((mutationsList) => {
    this._emitInputUpdated();
    if (this._inputElement && mutationsList?.some((e) => e.attributeName === 'value')) {
      const value = this._inputElement.getAttribute('value');
      this.valueAsDate = this._dateAdapter.parse(value, this.now) ?? value;
    }
  });

  private _dateAdapter: DateAdapter<T> = readConfig().datetime?.dateAdapter ?? defaultDateAdapter;

  private _abort = new SbbConnectedAbortController(this);
  private _language = new SbbLanguageController(this).withHandler(() => {
    if (this._inputElement) {
      if (this._inputElementPlaceholderMutable) {
        this._inputElement.placeholder = i18nDatePickerPlaceholder[this._language.current];
      }
      if (this.valueAsDate) {
        this._inputElement.value = this._format(this.valueAsDate);
      }
    }
  });

  public override connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('datepickerControlRegistered', () => this._emitInputUpdated(), {
      signal: this._abort.signal,
    });
    this._attachInput();
    if (this._inputElement) {
      this._emitInputUpdated();
    }
  }

  public override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('input') && this.input! !== changedProperties.get('input')!) {
      this._attachInput();
    }
    if (
      changedProperties.has('wide') ||
      changedProperties.has('dateFilter') ||
      changedProperties.has('now')
    ) {
      this._datePickerUpdated.emit();
    }
    if (changedProperties.has('valueAsDate')) {
      this._setAriaLiveMessage();
    }
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._inputObserver?.disconnect();
    this._datePickerController?.abort();
  }

  protected override firstUpdated(changedProperties: PropertyValues<this>): void {
    super.firstUpdated(changedProperties);
    this._setAriaLiveMessage();
  }

  /**
   * Gets the input value with the correct date format.
   * @deprecated Use property valueAsDate instead.
   */
  public getValueAsDate(): T | undefined {
    return this.valueAsDate ?? undefined;
  }

  /**
   * Set the input value to the correctly formatted value.
   * @deprecated Use property valueAsDate instead.
   */
  public setValueAsDate(date: SbbDateLike<T>): void {
    this.valueAsDate = date;
  }

  /**
   * @internal
   * Whether a custom now is configured.
   */
  public hasCustomNow(): boolean {
    return !!this._now;
  }

  private _attachInput(): void {
    const input = findInput(this, this.input);
    if (this._inputElement === input) {
      return;
    } else if (this._inputElement) {
      this._datePickerController?.abort();
      this._inputObserver?.disconnect();
    }

    this._inputElement = input;
    if (input) {
      this._datePickerController = new AbortController();
      this._inputObserver.observe(input, {
        attributeFilter: ['disabled', 'readonly', 'min', 'max', 'value'],
      });

      this._inputElementPlaceholderMutable = !input.placeholder;
      input.type = 'text';
      if (this._inputElementPlaceholderMutable) {
        input.placeholder = i18nDatePickerPlaceholder[this._language.current];
      }

      const options: AddEventListenerOptions = { signal: this._datePickerController.signal };
      input.addEventListener('input', () => this._parseInput(), options);
      input.addEventListener('change', () => this._handleInputChange(), options);
      this._parseInput(true);
      this._tryApplyFormatToInput();
      this._validateDate();
    }
  }

  private _emitInputUpdated(): void {
    const { disabled, readOnly: readonly, min, max } = this._inputElement ?? {};
    this._inputUpdated.emit({ disabled, readonly, min, max });
  }

  private _handleInputChange(): void {
    if (this._tryApplyFormatToInput()) {
      return;
    }
    this._validateDate();
    this._setAriaLiveMessage();
    this._change.emit();
    this._didChange.emit();
  }

  private _tryApplyFormatToInput(): boolean {
    if (!this._inputElement) {
      return false;
    }

    const formattedDate = this.valueAsDate ? this._format(this.valueAsDate!) : '';
    if (formattedDate && this._inputElement.value !== formattedDate) {
      this._inputElement.value = formattedDate;
      this._inputElement.dispatchEvent(new InputEvent('input', { bubbles: true, composed: true }));
      this._inputElement.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
      return true;
    }

    return false;
  }

  private _validateDate(): void {
    if (!this._inputElement) {
      return;
    }

    const isEmptyOrValid =
      !this._inputElement.value ||
      (!!this.valueAsDate &&
        isDateAvailable(
          this.valueAsDate,
          this.dateFilter,
          this._inputElement?.min,
          this._inputElement?.max,
        ));
    const wasValid = !this._inputElement.hasAttribute('data-sbb-invalid');
    this._inputElement.toggleAttribute('data-sbb-invalid', !isEmptyOrValid);
    if (wasValid !== isEmptyOrValid) {
      this._validationChange.emit({ valid: isEmptyOrValid });
    }
  }

  private _parseInput(deserializeAsFallback = false): void {
    const value = this._inputElement?.value ?? '';
    this._valueAsDate = this._dateAdapter.getValidDateOrNull(
      this.dateParser
        ? this.dateParser(value)
        : this._dateAdapter.parse(value, this.now) ??
            (deserializeAsFallback ? this._dateAdapter.deserialize(value) : null),
    );
  }

  private _format(date: T): string {
    return this.format ? this.format(date) : this._dateAdapter.format(date);
  }

  private _setAriaLiveMessage(): void {
    const containerElement: HTMLParagraphElement | null | undefined =
      this.shadowRoot?.querySelector?.<HTMLParagraphElement>('#status-container');

    if (!containerElement) {
      return;
    } else if (!this.valueAsDate) {
      containerElement.innerText = '';
    } else {
      const date = this._dateAdapter.format(this.valueAsDate, { weekdayStyle: 'long' });
      containerElement.innerText = `${i18nDateChangedTo[this._language.current]} ${date}`;
    }
  }

  protected override render(): TemplateResult {
    return html`<p id="status-container" role="status"></p>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-datepicker': SbbDatepickerElement;
  }

  interface GlobalEventHandlersEventMap {
    inputUpdated: CustomEvent<SbbInputUpdateEvent>;
  }
}
