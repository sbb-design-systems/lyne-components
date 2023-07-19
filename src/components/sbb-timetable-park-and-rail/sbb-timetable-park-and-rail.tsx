import { Component, Element, h, JSX, Prop, State } from '@stencil/core';

import icons from '../../global/timetable/icons.json';
import { InterfaceTimetableParkAndRailAttributes } from './sbb-timetable-park-and-rail.custom';
import {
  i18nAvailableAtDepartingStation,
  i18nDistanceMeter,
  i18nWalkingDistanceToDepartureStation,
} from '../../global/i18n';
import {
  documentLanguage,
  HandlerRepository,
  languageChangeHandlerAspect,
} from '../../global/eventing';

@Component({
  shadow: true,
  styleUrl: 'sbb-timetable-park-and-rail.scss',
  tag: 'sbb-timetable-park-and-rail',
})
export class SbbTimetableParkAndRail {
  /**
   * Set the desired appearance of
   * the component.
   */
  @Prop()
  public appearance?: InterfaceTimetableParkAndRailAttributes['appearance'] = 'first-level';

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

    return (
      <div class={`park-and-rail${appearanceClass}`}>
        <span
          aria-label={a11yLabel}
          class="park-and-rail__icon"
          innerHTML={icons['park-and-rail-small']}
          role="text"
          title={a11yLabel}
        ></span>
      </div>
    );
  }
}
