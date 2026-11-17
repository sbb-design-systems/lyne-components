import { type TemplateResult } from 'lit';

import { i18nCalendarSelectAll, SbbLanguageController } from '../../core.ts';
import { SbbIconNameMixin } from '../../icon/icon-name-mixin.ts';
import { SbbCalendarCellBaseElement } from '../common/calendar-cell-base-element.ts';

/**
 * It displays a toggle all button inside the `sbb-calendar` component.
 */
export class SbbCalendarSelectAllElement extends SbbIconNameMixin(SbbCalendarCellBaseElement) {
  public static override readonly elementName: string = 'sbb-calendar-select-all';

  private _language = new SbbLanguageController(this).withHandler(() => this._setAriaLabel());

  /** @internal */
  public value: unknown;

  public constructor() {
    super();
    this._setAriaLabel();
  }

  private _setAriaLabel(): void {
    this.internals.ariaLabel = i18nCalendarSelectAll[this._language.current];
  }

  protected override setSelectedState(): void {
    // empty
  }
  protected override setDisabledFilteredState(): void {
    // empty
  }

  protected override renderTemplate(): TemplateResult {
    return this.renderIconSlot();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-calendar-select-all': SbbCalendarSelectAllElement;
  }
}
