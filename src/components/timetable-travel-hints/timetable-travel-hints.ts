import { CSSResult, html, LitElement, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { setAttribute } from '../core/dom';
import { documentLanguage, HandlerRepository, languageChangeHandlerAspect } from '../core/eventing';
import { i18nNone } from '../core/i18n';
import icons from '../core/timetable/icons.json';

import style from './timetable-travel-hints.scss?lit&inline';

/**
 * Used in `sbb-timetable-row`, it displays hints icon.
 */
@customElement('sbb-timetable-travel-hints')
export class SbbTimetableTravelHints extends LitElement {
  public static override styles: CSSResult = style;

  /** Set the desired appearance of the component. */
  @property()
  public appearance?: 'first-level-list' | 'second-level-list' = 'first-level-list'; // FIXME refactor with SbbTimetableAppearance ?

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
