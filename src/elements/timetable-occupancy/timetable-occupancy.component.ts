import { type CSSResultGroup, html, nothing, type TemplateResult, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';

import {
  boxSizingStyles,
  i18nClass,
  SbbElement,
  type SbbElementType,
  SbbLanguageController,
  SbbNegativeMixin,
  type SbbOccupancy,
  SbbScreenReaderOnlyElement,
} from '../core.ts';
import { SbbTimetableOccupancyIconElement } from '../timetable-occupancy-icon.pure.ts';

import style from './timetable-occupancy.scss?inline';

/**
 * Used in `sbb-timetable-row`, it displays information about wagon occupancy.
 */
export class SbbTimetableOccupancyElement extends SbbNegativeMixin(SbbElement) {
  public static override readonly elementName: string = 'sbb-timetable-occupancy';
  public static override elementDependencies: SbbElementType[] = [
    SbbTimetableOccupancyIconElement,
    SbbScreenReaderOnlyElement,
  ];
  public static override styles: CSSResultGroup = [boxSizingStyles, unsafeCSS(style)];

  /** Occupancy for first class wagons. */
  @property({ attribute: 'first-class-occupancy' })
  public accessor firstClassOccupancy: SbbOccupancy | null = null;

  /** Occupancy for second class wagons. */
  @property({ attribute: 'second-class-occupancy' })
  public accessor secondClassOccupancy: SbbOccupancy | null = null;

  private _language = new SbbLanguageController(this);

  protected override render(): TemplateResult {
    return html` ${(this.firstClassOccupancy || this.secondClassOccupancy) &&
    html`
      <ul
        class="sbb-timetable-occupancy__list"
        role=${!this.firstClassOccupancy || !this.secondClassOccupancy ? 'presentation' : nothing}
      >
        ${[this.firstClassOccupancy, this.secondClassOccupancy].map(
          (occupancy: string | null, index: number) =>
            occupancy &&
            html`
              <li class="sbb-timetable-occupancy__list-item">
                <span class="sbb-timetable-occupancy__list-item-class" aria-hidden="true">
                  ${this.firstClassOccupancy && index === 0 ? '1' : '2'}.
                </span>
                <sbb-screen-reader-only>
                  ${`${
                    i18nClass[this.firstClassOccupancy && index === 0 ? 'first' : 'second'][
                      this._language.current
                    ]
                  }.`}
                </sbb-screen-reader-only>
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
