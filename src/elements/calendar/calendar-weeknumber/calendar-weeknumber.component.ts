import { html, type TemplateResult } from 'lit';
import { state } from 'lit/decorators.js';

import { i18nCalendarWeekNumber, SbbLanguageController } from '../../core.ts';
import { SbbCalendarCellBaseElement } from '../common/calendar-cell-base-element.ts';

/**
 * It displays a single week number cell in the `sbb-calendar` component.
 */
export class SbbCalendarWeeknumberElement extends SbbCalendarCellBaseElement {
  public static override readonly elementName: string = 'sbb-calendar-weeknumber';

  private _language = new SbbLanguageController(this);

  /** Value of the week number element. */
  @state()
  public set value(value: string | null) {
    if (!value) {
      return;
    }
    this._value = String(value);
    this.internals.ariaLabel = `${i18nCalendarWeekNumber[this._language.current]} ${value}`;
  }
  public get value(): string | null {
    return this._value;
  }
  private _value: string | null = null;

  protected override setSelectedState(): void {
    // empty
  }
  protected override setDisabledFilteredState(): void {
    // empty
  }

  protected override renderTemplate(): TemplateResult {
    return html`${this.value}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-calendar-weeknumber': SbbCalendarWeeknumberElement;
  }
}
