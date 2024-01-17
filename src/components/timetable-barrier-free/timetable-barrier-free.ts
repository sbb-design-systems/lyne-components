import type { CSSResultGroup, TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { LanguageController } from '../core/common-behaviors';
import { i18nBarrierFreeTravel } from '../core/i18n';
import icons from '../core/timetable/icons.json';

import style from './timetable-barrier-free.scss?lit&inline';

/**
 * Used in `sbb-timetable-row`, it displays information about barriers for screen-readers.
 */
@customElement('sbb-timetable-barrier-free')
export class SbbTimetableBarrierFreeElement extends LitElement {
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

    const a11yLabel = `${i18nBarrierFreeTravel[this._language.current]} ${config.text}`;
    const appearanceClass = ' barrier-free--second-level';

    return html`
      <p aria-label=${a11yLabel} class=${`barrier-free${appearanceClass}`} role="text">
        <span class="barrier-free__text--visually-hidden">${a11yLabel}</span>
        <span aria-hidden="true" class="barrier-free__text" role="presentation">
          <span class="barrier-free__icon" .innerHTML=${icons[config.icon]}></span>
          ${config.text}
        </span>
      </p>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-timetable-barrier-free': SbbTimetableBarrierFreeElement;
  }
}
