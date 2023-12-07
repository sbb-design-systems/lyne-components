import { CSSResultGroup, html, LitElement, nothing, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { LanguageController } from '../core/common-behaviors';
import { i18nClass } from '../core/i18n';
import { SbbOccupancy } from '../core/interfaces';
import '../timetable-occupancy-icon';

import style from './timetable-occupancy.scss?lit&inline';

/**
 * Used in `sbb-timetable-row`, it displays information about wagon occupancy.
 */
@customElement('sbb-timetable-occupancy')
export class SbbTimetableOccupancyElement extends LitElement {
  public static override styles: CSSResultGroup = style;

  /** Occupancy for first class wagons. */
  @property({ attribute: 'first-class-occupancy' }) public firstClassOccupancy: SbbOccupancy;

  /** Occupancy for second class wagons. */
  @property({ attribute: 'second-class-occupancy' }) public secondClassOccupancy: SbbOccupancy;

  /** Negative coloring variant flag. */
  @property({ reflect: true, type: Boolean }) public negative = false;

  private _language = new LanguageController(this);

  protected override render(): TemplateResult {
    return html` ${(this.firstClassOccupancy || this.secondClassOccupancy) &&
    html`
      <ul
        class="sbb-timetable-occupancy__list"
        role=${!this.firstClassOccupancy || !this.secondClassOccupancy ? 'presentation' : nothing}
      >
        ${[this.firstClassOccupancy, this.secondClassOccupancy].map(
          (occupancy: string, index: number) =>
            occupancy &&
            html`
              <li class="sbb-timetable-occupancy__list-item">
                <span class="sbb-timetable-occupancy__list-item-class" aria-hidden="true">
                  ${this.firstClassOccupancy && index === 0 ? '1' : '2'}.
                </span>
                <span class="sbb-timetable-occupancy__visually-hidden">
                  ${`${
                    i18nClass[this.firstClassOccupancy && index === 0 ? 'first' : 'second'][
                      this._language.current
                    ]
                  }.`}
                </span>
                <sbb-timetable-occupancy-icon
                  class="sbb-timetable-occupancy__list-item-icon"
                  ?negative=${this.negative}
                  .occupancy=${occupancy}
                >
                </sbb-timetable-occupancy-icon>
              </li>
            `,
        )}
      </ul>
    `}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-timetable-occupancy': SbbTimetableOccupancyElement;
  }
}
