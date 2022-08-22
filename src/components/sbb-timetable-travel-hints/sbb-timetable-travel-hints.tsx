import { Component, h, JSX, Host, Prop } from '@stencil/core';

import getDocumentLang from '../../global/helpers/get-document-lang';
import icons from '../../global/icons/timetable.json';
import { InterfaceTimetableTravelHintsAttributes } from './sbb-timetable-travel-hints.custom';
import { i18nNone } from '../../global/i18n';

@Component({
  shadow: true,
  styleUrl: 'sbb-timetable-travel-hints.scss',
  tag: 'sbb-timetable-travel-hints',
})
export class SbbTimetableTravelHints {
  private _currentLanguage = getDocumentLang();

  /**
   * Set the desired appearance of
   * the component.
   */
  @Prop()
  public appearance?: InterfaceTimetableTravelHintsAttributes['appearance'] = 'first-level-list';

  /**
   * Stringified JSON which defines most of the
   * content of the component. Please check the
   * individual stories to get an idea of the
   * structure.
   */
  @Prop() public config!: string;

  public render(): JSX.Element {
    const { travelHintsItems } = JSON.parse(this.config);

    const a11yLabel = i18nNone[this._currentLanguage];
    const appearanceClass = ` travel-hints--${this.appearance}`;

    const hostClass = travelHintsItems.length === 0 ? 'visually-empty' : '';

    return (
      <Host class={hostClass}>
        <div class={`travel-hints${appearanceClass}`}>
          {travelHintsItems.length > 0 ? (
            <ul class="travel-hints__list" role="list">
              {travelHintsItems.map((travelHintItem) => (
                <li class="travel-hints__list-item">
                  <span
                    aria-label={travelHintItem.text}
                    class={`travel-hints__icon travel-hints__icon--${travelHintItem.icon}`}
                    innerHTML={icons[travelHintItem.icon]}
                    role="text"
                    title={travelHintItem.text}
                  ></span>
                </li>
              ))}
            </ul>
          ) : (
            <span class="travel-hints__text--visually-hidden">{a11yLabel}</span>
          )}
        </div>
      </Host>
    );
  }
}
