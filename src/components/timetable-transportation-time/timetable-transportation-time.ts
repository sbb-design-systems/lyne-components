import type { CSSResultGroup, TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { LanguageController } from '../core/common-behaviors';
import { i18nArrival, i18nDeparture } from '../core/i18n';
import type { SbbTimetableAppearance } from '../core/interfaces';

import style from './timetable-transportation-time.scss?lit&inline';

/**
 * Used in `sbb-timetable-row`, it displays departure/arrival time.
 */
@customElement('sbb-timetable-transportation-time')
export class SbbTimetableTransportationTimeElement extends LitElement {
  public static override styles: CSSResultGroup = style;

  /**
   * Set the desired appearance of
   * the component.
   */
  @property()
  public appearance?: SbbTimetableAppearance = 'first-level';

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

    let a11yLabel = `${i18nArrival[this._language.current]} ${config.time}.`;

    if (config.type === 'departure') {
      a11yLabel = `${i18nDeparture[this._language.current]} ${config.time}.`;
    }

    const appearanceClasses = ` time--${this.appearance} time--${config.type}`;

    return html`
      <p aria-label=${a11yLabel} class=${`time${appearanceClasses}`} role="text">
        <span aria-hidden="true" class="time__text" role="presentation"> ${config.time} </span>
        <span class="time__text--visually-hidden">${a11yLabel}</span>
      </p>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-timetable-transportation-time': SbbTimetableTransportationTimeElement;
  }
}
