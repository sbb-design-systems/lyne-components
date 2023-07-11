import { Component, Element, h, JSX, Prop, State } from '@stencil/core';

import icons from '../../global/icons/timetable.json';
import { i18nBarrierFreeTravel } from '../../global/i18n';
import {
  documentLanguage,
  HandlerRepository,
  languageChangeHandlerAspect,
} from '../../global/helpers';

@Component({
  shadow: true,
  styleUrl: 'sbb-timetable-barrier-free.scss',
  tag: 'sbb-timetable-barrier-free',
})
export class SbbTimetableBarrierFree {
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

    const a11yLabel = `${i18nBarrierFreeTravel[this._currentLanguage]} ${config.text}`;
    const appearanceClass = ' barrier-free--second-level';

    return (
      <p aria-label={a11yLabel} class={`barrier-free${appearanceClass}`} role="text">
        <span class="barrier-free__text--visually-hidden">{a11yLabel}</span>
        <span aria-hidden="true" class="barrier-free__text" role="presentation">
          <span class="barrier-free__icon" innerHTML={icons[config.icon]}></span>
          {config.text}
        </span>
      </p>
    );
  }
}
