import type { CSSResultGroup, TemplateResult } from 'lit';
import { html, LitElement, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { LanguageController } from '../core/common-behaviors';
import { i18nAttention, i18nConnectionsDepartOn, i18nDayChange } from '../core/i18n';

import style from './timetable-row-day-change.scss?lit&inline';

/**
 * Used in `sbb-timetable-row`, it displays information about day change for screen-readers.
 */
@customElement('sbb-timetable-row-day-change')
export class SbbTimetableRowDayChangeElement extends LitElement {
  public static override styles: CSSResultGroup = style;

  /**
   * Stringified JSON which defines most of the
   * content of the component. Please check the
   * individual stories to get an idea of the
   * structure.
   */
  @property() public config!: string;

  private _language = new LanguageController(this);

  protected override render(): TemplateResult {
    const config = JSON.parse(this.config);

    let attention = '';
    let dayChange = '';
    let visuallyHiddenClass = '';

    if (config.dayChange) {
      attention = `${i18nAttention[this._language.current]}: `;
      dayChange = `${i18nDayChange[this._language.current]}, `;
    }

    if (config.hidden) {
      visuallyHiddenClass = ' day-change--visually-hidden';
    }

    const departsOn = `${i18nConnectionsDepartOn[this._language.current]} `;

    const visualText = `${config.day}, ${config.date}`;
    const a11yLabel = `${dayChange}${attention}${departsOn}${config.day}, ${config.date}`;

    return html`
      <div class=${`day-change${visuallyHiddenClass}`} colspan=${config.colSpan ?? nothing}>
        <h2 class="day-change__text">
          <span aria-hidden="true" class="day-change__text--visual" role="presentation">
            ${visualText}
          </span>
          <span aria-label=${a11yLabel} class="day-change__text--visually-hidden" role="text">
            ${dayChange} ${attention} ${departsOn} ${config.day}, ${config.date}
          </span>
        </h2>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-timetable-row-day-change': SbbTimetableRowDayChangeElement;
  }
}
