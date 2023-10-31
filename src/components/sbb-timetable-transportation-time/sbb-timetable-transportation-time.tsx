import { i18nArrival, i18nDeparture } from '../../global/i18n';
import {
  documentLanguage,
  HandlerRepository,
  languageChangeHandlerAspect,
} from '../../global/eventing';
import { CSSResult, html, LitElement, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import style from './sbb-timetable-transportation-time.scss?lit&inline';
import { SbbTimetableAppearance } from '../../global/types';

@customElement('sbb-timetable-transportation-time')
export class SbbTimetableTransportationTime extends LitElement {
  public static override styles: CSSResult = style;

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

    let a11yLabel = `${i18nArrival[this._currentLanguage]} ${config.time}.`;

    if (config.type === 'departure') {
      a11yLabel = `${i18nDeparture[this._currentLanguage]} ${config.time}.`;
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
    'sbb-timetable-transportation-time': SbbTimetableTransportationTime;
  }
}
