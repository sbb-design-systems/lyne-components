import { i18nDurationHour, i18nDurationMinute } from '../core/i18n';
import { documentLanguage, HandlerRepository, languageChangeHandlerAspect } from '../core/eventing';
import { CSSResult, html, LitElement, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import style from './timetable-duration.scss?lit&inline';

/**
 * Used in `sbb-timetable-row`, it displays information about the trip duration.
 */
@customElement('sbb-timetable-duration')
export class SbbTimetableDuration extends LitElement {
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

    const hoursLabelShort = i18nDurationHour.multiple.short[this._currentLanguage];
    const minutesLabelShort = i18nDurationMinute.multiple.short[this._currentLanguage];

    let visualText = '';
    let a11yLabel = '';

    let hoursLabelLong = i18nDurationHour.multiple.long[this._currentLanguage];
    let minutesLabelLong = i18nDurationMinute.multiple.long[this._currentLanguage];

    if (config.hours === 1) {
      hoursLabelLong = i18nDurationHour.single.long[this._currentLanguage];
    }

    if (config.minutes === 1) {
      minutesLabelLong = i18nDurationMinute.single.long[this._currentLanguage];
    }

    if (config.hours !== 0) {
      visualText += `${config.hours} ${hoursLabelShort}`;
      a11yLabel += `${config.hours} ${hoursLabelLong}`;
    }

    visualText += ` ${config.minutes} ${minutesLabelShort}`;
    a11yLabel += ` ${config.minutes} ${minutesLabelLong}.`;

    return html`
      <p aria-label=${a11yLabel} class="duration" role="text">
        <span aria-hidden="true" class="duration__text--visual" role="presentation">
          ${visualText}
        </span>
        <span class="duration__text--visually-hidden">${a11yLabel}</span>
      </p>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-timetable-duration': SbbTimetableDuration;
  }
}
