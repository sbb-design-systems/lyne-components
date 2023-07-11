import { Component, Element, h, JSX, Prop, State } from '@stencil/core';
import {
  documentLanguage,
  HandlerRepository,
  languageChangeHandlerAspect,
} from '../../global/helpers';
import { i18nAttention, i18nConnectionsDepartOn, i18nDayChange } from '../../global/i18n';

@Component({
  shadow: true,
  styleUrl: 'sbb-timetable-row-day-change.scss',
  tag: 'sbb-timetable-row-day-change',
})
export class SbbTimetableRowDayChange {
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

    return (
      <div
        class={`day-change${visuallyHiddenClass}`}
        // @ts-expect-error the role makes the colspan attribute usable
        colspan={config.colSpan}
      >
        <h2 class="day-change__text">
          <span aria-hidden="true" class="day-change__text--visual" role="presentation">
            {visualText}
          </span>
          <span aria-label={a11yLabel} class="day-change__text--visually-hidden" role="text">
            {dayChange} {attention} {departsOn} {config.day}, {config.date}
          </span>
        </h2>
      </div>
    );
  }
}
