import { CSSResultGroup, html, LitElement, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { documentLanguage, HandlerRepository, languageChangeHandlerAspect } from '../core/eventing';
import { i18nClass } from '../core/i18n';
import { Occupancy } from '../core/timetable';
import '../timetable-occupancy-icon';

import style from './timetable-occupancy.scss?lit&inline';

/**
 * Used in `sbb-timetable-row`, it displays information about wagon occupancy.
 */
@customElement('sbb-timetable-occupancy')
export class SbbTimetableOccupancy extends LitElement {
  public static override styles: CSSResultGroup = style;

  /** Occupancy for first and second classes wagons. */
  @property({ attribute: false }) public occupancy!: Occupancy;

  /** Negative coloring variant flag. */
  @property({ type: Boolean }) public negative = false;

  @state() private _currentLanguage = documentLanguage();

  private _handlerRepository = new HandlerRepository(
    this,
    languageChangeHandlerAspect((l) => (this._currentLanguage = l)),
  );

  public override connectedCallback(): void {
    super.connectedCallback();
    this._handlerRepository.connect();
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._handlerRepository.disconnect();
  }

  protected override render(): TemplateResult {
    const firstClassOccupancy: string = this.occupancy?.firstClass ?? null;
    const secondClassOccupancy: string = this.occupancy?.secondClass ?? null;

    return html` ${(firstClassOccupancy || secondClassOccupancy) &&
    html`
      <ul class="sbb-timetable-occupancy__list" role="list">
        ${[firstClassOccupancy, secondClassOccupancy].map(
          (occupancy: string, index: number) =>
            occupancy &&
            html`
              <li class="sbb-timetable-occupancy__list-item">
                <span class="sbb-timetable-occupancy__list-item-class" aria-hidden="true">
                  ${index + 1}.
                </span>
                <span class="sbb-timetable-occupancy__visually-hidden">
                  ${`${i18nClass[index === 0 ? 'first' : 'second'][this._currentLanguage]}. `}
                </span>
                <sbb-timetable-occupancy-icon
                  class="sbb-timetable-occupancy__list-item-icon"
                  ?negative=${this.negative}
                  occupancy="${occupancy}"
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
    'sbb-timetable-occupancy': SbbTimetableOccupancy;
  }
}
