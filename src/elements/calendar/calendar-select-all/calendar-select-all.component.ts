import { type TemplateResult } from 'lit';

import { SbbIconNameMixin } from '../../icon.pure.ts';
import { SbbCalendarCellBaseElement } from '../common/calendar-cell-base-element.ts';

/**
 * It displays a toggle all button inside the `sbb-calendar` component.
 */
export class SbbCalendarSelectAllElement extends SbbIconNameMixin(SbbCalendarCellBaseElement) {
  public static override readonly elementName: string = 'sbb-calendar-select-all';

  /** @internal */
  public value: unknown;

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
