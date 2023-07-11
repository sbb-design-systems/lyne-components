import { Component, Element, h, JSX, Prop, State } from '@stencil/core';
import { InterfaceTimetableTransportationTimeAttributes } from './sbb-timetable-transportation-time.custom';

import { i18nArrival, i18nDeparture } from '../../global/i18n';
import {
  documentLanguage,
  HandlerRepository,
  languageChangeHandlerAspect,
} from '../../global/helpers';

@Component({
  shadow: true,
  styleUrl: 'sbb-timetable-transportation-time.scss',
  tag: 'sbb-timetable-transportation-time',
})
export class SbbTimetableTransportationTime {
  /**
   * Set the desired appearance of
   * the component.
   */
  @Prop()
  public appearance?: InterfaceTimetableTransportationTimeAttributes['appearance'] = 'first-level';

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

    let a11yLabel = `${i18nArrival[this._currentLanguage]} ${config.time}.`;

    if (config.type === 'departure') {
      a11yLabel = `${i18nDeparture[this._currentLanguage]} ${config.time}.`;
    }

    const appearanceClasses = ` time--${this.appearance} time--${config.type}`;

    return (
      <p aria-label={a11yLabel} class={`time${appearanceClasses}`} role="text">
        <span aria-hidden="true" class="time__text" role="presentation">
          {config.time}
        </span>
        <span class="time__text--visually-hidden">{a11yLabel}</span>
      </p>
    );
  }
}
