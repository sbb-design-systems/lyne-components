import { type CSSResultGroup, html, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { SbbButtonBaseElement } from '../../core/base-elements.js';
import { forceType, omitEmptyConverter } from '../../core/decorators.js';
import { SbbDisabledMixin } from '../../core/mixins.js';

import style from './mini-calendar-day.scss?lit&inline';

/**
 * It displays a day in the mini calendar.
 */
export
@customElement('sbb-mini-calendar-day')
class SbbMiniCalendarDayElement extends SbbDisabledMixin(SbbButtonBaseElement) {
  public static override styles: CSSResultGroup = style;

  /** Date as ISO string. */
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

  // FIXME empty template ?
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
