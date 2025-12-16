import type { CSSResultGroup, TemplateResult } from 'lit';
import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { SbbButtonBaseElement } from '../../core/base-elements.ts';
import { readConfig } from '../../core/config.ts';
import { type DateAdapter, defaultDateAdapter } from '../../core/datetime.ts';
import { SbbDisabledMixin } from '../../core/mixins.ts';
import { boxSizingStyles } from '../../core/styles.ts';

import style from './calendar-day.scss?lit&inline';

import '../../screen-reader-only.ts';

/**
 * Describe the purpose of the component with a single short sentence.
 *
 * @slot - Use the unnamed slot to add `sbb-TODO` elements.
 */
export
@customElement('sbb-calendar-day')
class SbbCalendarDayElement extends SbbDisabledMixin(SbbButtonBaseElement) {
  public static override styles: CSSResultGroup = [boxSizingStyles, style];
  private _dateAdapter: DateAdapter = readConfig().datetime?.dateAdapter ?? defaultDateAdapter;

  @property()
  public override set slot(value: string) {
    super.slot = value;
  }
  public override get slot(): string {
    return super.slot;
  }

  protected override renderTemplate(): TemplateResult {
    return html` <span aria-hidden="true"> ${Number(this.slot.split('-')[2])} </span>
      <sbb-screen-reader-only
        >${this._dateAdapter.getAccessibilityFormatDate(this.slot)}</sbb-screen-reader-only
      >
      <span>
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
