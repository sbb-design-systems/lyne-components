import { type CSSResultGroup, html, type PropertyValues, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { SbbButtonBaseElement } from '../../core/base-elements.ts';
import { readConfig } from '../../core/config/config.ts';
import { type DateAdapter } from '../../core/datetime/date-adapter.ts';
import { defaultDateAdapter } from '../../core/datetime/native-date-adapter.ts';
import { forceType, omitEmptyConverter } from '../../core/decorators.ts';

import style from './mini-calendar-day.scss?lit&inline';

/**
 * It displays a day in the `sbb-mini-calendar-month`.
 */
export
@customElement('sbb-mini-calendar-day')
class SbbMiniCalendarDayElement<T = Date> extends SbbButtonBaseElement {
  public static override styles: CSSResultGroup = style;

  private _dateAdapter: DateAdapter<T> = readConfig().datetime?.dateAdapter ?? defaultDateAdapter;

  /** Date as ISO string (YYYY-MM-DD) */
  @forceType()
  @property()
  public accessor date: string = '';

  /** The type of the marker. */
  @forceType()
  @property({ reflect: true, converter: omitEmptyConverter })
  public accessor marker: 'target' | 'circle' | 'slash' | 'cross' | string = '';

  /** The color of the marker. */
  @forceType()
  @property({ reflect: true, converter: omitEmptyConverter })
  public accessor color: 'charcoal' | 'cloud' | 'orange' | 'red' | 'sky' | string = '';

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('date') && this.date) {
      this.internals.ariaLabel = this._dateAdapter.getAccessibilityFormatDate(this.date);
    }
  }

  protected override renderTemplate(): TemplateResult {
    return html``;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-mini-calendar-day': SbbMiniCalendarDayElement;
  }
}
