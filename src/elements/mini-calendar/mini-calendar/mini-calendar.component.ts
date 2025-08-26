import type { CSSResultGroup, TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { handleDistinctChange } from '../../core/decorators.js';
import type { SbbOrientation } from '../../core/interfaces.js';
import type { SbbMiniCalendarMonthElement } from '../mini-calendar-month.js';

import style from './mini-calendar.scss?lit&inline';

/**
 * Describe the purpose of the component with a single short sentence.
 *
 * @slot - Use the unnamed slot to add `sbb-TODO` elements.
 */
export
@customElement('sbb-mini-calendar')
class SbbMiniCalendarElement extends LitElement {
  public static override styles: CSSResultGroup = style;

  /** The orientation of days in the calendar. */
  @handleDistinctChange((e: SbbMiniCalendarElement) => e._handleSlotchange())
  @property({ reflect: true })
  public accessor orientation: SbbOrientation = 'horizontal';

  private get _miniCalendarMonths(): SbbMiniCalendarMonthElement[] {
    return Array.from(this.querySelectorAll?.('sbb-mini-calendar-month') ?? []);
  }

  private _handleSlotchange(): void {
    this._miniCalendarMonths.forEach((month: SbbMiniCalendarMonthElement) =>
      month.setAttribute('data-orientation', this.orientation),
    );
  }

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-mini-calendar">
        <slot @slotchange=${this._handleSlotchange}></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-mini-calendar': SbbMiniCalendarElement;
  }
}
