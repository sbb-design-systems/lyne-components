import icons from '../../global/timetable/icons.json';
import { InterfaceTimetableTravelHintsAttributes } from './sbb-timetable-travel-hints.custom';
import { i18nNone } from '../../global/i18n';
import {
  documentLanguage,
  HandlerRepository,
  languageChangeHandlerAspect,
} from '../../global/eventing';
import { CSSResult, html, LitElement, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { setAttribute } from '../../global/dom';
import Style from './sbb-timetable-travel-hints.scss?lit&inline';

@customElement('sbb-timetable-travel-hints')
export class SbbTimetableTravelHints extends LitElement {
  public static override styles: CSSResult = Style;

  /**
   * Set the desired appearance of
   * the component.
   */
  @property()
  public appearance?: InterfaceTimetableTravelHintsAttributes['appearance'] = 'first-level-list';

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
    const { travelHintsItems } = JSON.parse(this.config);

    const a11yLabel = i18nNone[this._currentLanguage];
    const appearanceClass = ` travel-hints--${this.appearance}`;

    const hostClass = travelHintsItems.length === 0 ? 'visually-empty' : '';

    setAttribute(this, 'class', hostClass);

    return html`
      <div class=${`travel-hints${appearanceClass}`}>
        ${travelHintsItems.length > 0
          ? html`<ul class="travel-hints__list" role="list">
              ${travelHintsItems.map(
                (travelHintItem) => html`
                  <li class="travel-hints__list-item">
                    <span
                      aria-label=${travelHintItem.text}
                      class=${`travel-hints__icon travel-hints__icon--${travelHintItem.icon}`}
                      .innerHTML=${icons[travelHintItem.icon]}
                      role="text"
                      title=${travelHintItem.text}
                    ></span>
                  </li>
                `,
              )}
            </ul>`
          : html`<span class="travel-hints__text--visually-hidden">${a11yLabel}</span>`}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-timetable-travel-hints': SbbTimetableTravelHints;
  }
}
