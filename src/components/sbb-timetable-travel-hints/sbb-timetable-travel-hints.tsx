import { Component, Element, h, JSX, Host, Prop, State } from '@stencil/core';
import icons from '../../global/timetable/icons.json';
import { InterfaceTimetableTravelHintsAttributes } from './sbb-timetable-travel-hints.custom';
import { i18nNone } from '../../global/i18n';
import {
  documentLanguage,
  HandlerRepository,
  languageChangeHandlerAspect,
} from '../../global/eventing';

@Component({
  shadow: true,
  styleUrl: 'sbb-timetable-travel-hints.scss',
  tag: 'sbb-timetable-travel-hints',
})
export class SbbTimetableTravelHints {
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

  @State() private _currentLanguage = documentLanguage();

  @Element() private _element!: HTMLElement;

  private _handlerRepository = new HandlerRepository(
    this._element,
    languageChangeHandlerAspect((l) => (this._currentLanguage = l)),
  );

  public connectedCallback(): void {
    this._handlerRepository.connect();
  }

  public disconnectedCallback(): void {
    this._handlerRepository.disconnect();
  }

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
