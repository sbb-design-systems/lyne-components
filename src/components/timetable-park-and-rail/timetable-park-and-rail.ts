import type { CSSResultGroup, TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { LanguageController } from '../core/common-behaviors';
import {
  i18nAvailableAtDepartingStation,
  i18nDistanceMeter,
  i18nWalkingDistanceToDepartureStation,
} from '../core/i18n';
import icons from '../core/timetable/icons.json';

import style from './timetable-park-and-rail.scss?lit&inline';

/**
 * Used in `sbb-timetable-row`, it displays information about parking.
 */
@customElement('sbb-timetable-park-and-rail')
export class SbbTimetableParkAndRailElement extends LitElement {
  public static override styles: CSSResultGroup = style;

  /** Set the desired appearance of the component. */
  @property()
  public appearance? = 'first-level' as const;

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

    let a11yMeters = i18nDistanceMeter.multiple.long[this._language.current];

    if (config.distance === '1') {
      a11yMeters = i18nDistanceMeter.single.long[this._language.current];
    }

    const a11yDistanceToDepartureText =
      i18nWalkingDistanceToDepartureStation[this._language.current];
    const a11yDistance = config.distance;
    const a11yDistanceText = `(${a11yDistance} ${a11yMeters} ${a11yDistanceToDepartureText})`;

    const a11yLabel = `${
      i18nAvailableAtDepartingStation[this._language.current]
    } ${a11yDistanceText}`;

    const appearanceClass = ` park-and-rail--${this.appearance}`;

    return html`
      <div class=${`park-and-rail${appearanceClass}`}>
        <span
          aria-label=${a11yLabel}
          class="park-and-rail__icon"
          .innerHTML=${icons['park-and-rail-small']}
          role="text"
          title=${a11yLabel}
        ></span>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-timetable-park-and-rail': SbbTimetableParkAndRailElement;
  }
}
