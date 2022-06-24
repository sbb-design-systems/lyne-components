import { Component, h, Prop } from '@stencil/core';

import getDocumentLang from '../../global/helpers/get-document-lang';
import { InterfaceTimetableTransportationTimeAttributes } from './sbb-timetable-transportation-time.custom';

import { i18nArrival, i18nDeparture } from '../../global/i18n';

@Component({
  shadow: true,
  styleUrls: {
    default: 'styles/sbb-timetable-transportation-time.default.scss',
    shared: 'styles/sbb-timetable-transportation-time.shared.scss',
  },
  tag: 'sbb-timetable-transportation-time',
})
export class SbbTimetableTransportationTime {
  private _currentLanguage = getDocumentLang();

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
