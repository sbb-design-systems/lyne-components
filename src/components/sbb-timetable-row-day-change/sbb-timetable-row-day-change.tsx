import { i18nAttention, i18nConnectionsDepartOn, i18nDayChange } from '../core/i18n';
import { documentLanguage, HandlerRepository, languageChangeHandlerAspect } from '../core/eventing';
import { CSSResult, html, LitElement, nothing, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import style from './sbb-timetable-row-day-change.scss?lit&inline';

@customElement('sbb-timetable-row-day-change')
export class SbbTimetableRowDayChange extends LitElement {
  public static override styles: CSSResult = style;

  /**
   * Stringified JSON which defines most of the
   * content of the component. Please check the
   * individual stories to get an idea of the
   * structure.
   */
  @property() public config!: string;

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
    const config = JSON.parse(this.config);

    let attention = '';
    let dayChange = '';
    let visuallyHiddenClass = '';

    if (config.dayChange) {
      attention = `${i18nAttention[this._currentLanguage]}: `;
      dayChange = `${i18nDayChange[this._currentLanguage]}, `;
    }

    if (config.hidden) {
      visuallyHiddenClass = ' day-change--visually-hidden';
    }

    const departsOn = `${i18nConnectionsDepartOn[this._currentLanguage]} `;

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
    'sbb-timetable-row-day-change': SbbTimetableRowDayChange;
  }
}
