import icons from '../core/timetable/icons.json';
import {
  i18nAvailableAtDepartingStation,
  i18nDistanceMeter,
  i18nWalkingDistanceToDepartureStation,
} from '../core/i18n';
import { documentLanguage, HandlerRepository, languageChangeHandlerAspect } from '../core/eventing';
import { CSSResult, html, LitElement, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import style from './sbb-timetable-park-and-rail.scss?lit&inline';

@customElement('sbb-timetable-park-and-rail')
export class SbbTimetableParkAndRail extends LitElement {
  public static override styles: CSSResult = style;

  /**
   * Set the desired appearance of
   * the component.
   */
  @property()
  public appearance? = 'first-level' as const;

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

    let a11yMeters = i18nDistanceMeter.multiple.long[this._currentLanguage];

    if (config.distance === '1') {
      a11yMeters = i18nDistanceMeter.single.long[this._currentLanguage];
    }

    const a11yDistanceToDepartureText =
      i18nWalkingDistanceToDepartureStation[this._currentLanguage];
    const a11yDistance = config.distance;
    const a11yDistanceText = `(${a11yDistance} ${a11yMeters} ${a11yDistanceToDepartureText})`;

    const a11yLabel = `${
      i18nAvailableAtDepartingStation[this._currentLanguage]
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
    'sbb-timetable-park-and-rail': SbbTimetableParkAndRail;
  }
}
