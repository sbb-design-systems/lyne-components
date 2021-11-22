import {
  Component,
  h,
  Prop
} from '@stencil/core';

import getDocumentLang from '../../global/helpers/get-document-lang';

import {
  i18nArrival,
  i18nDeparture
} from '../../global/i18n';

@Component({
  shadow: true,
  styleUrls: {
    default: 'styles/lyne-timetable-transportation-time.default.scss',
    shared: 'styles/lyne-timetable-transportation-time.shared.scss'
  },
  tag: 'lyne-timetable-transportation-time'
})

export class LyneTimetableTransportationTime {

  private _currentLanguage = getDocumentLang();

  /**
   * Stringified JSON to define the different outputs of the
   * transportations number cell.
   * Format:
   * {
   *  "direction": "Richtung Bern Wankdorf, Bahnhof",
   *  "meansOfTransport": {
   *    "picto": "<svg width=\"24\" height=\"24\"...></svg>",
   *    "text": "Bus"
   *  },
   *  "product":{
   *    "icon": "",
   *    "text":"B 20"
   *  }
   * }
   */
  @Prop() public config!: string;

  public render(): JSX.Element {
    const config = JSON.parse(this.config);

    let a11yLabel = `${i18nArrival[this._currentLanguage]} ${config.time}.`;

    if (config.type === 'departure') {
      a11yLabel = `${i18nDeparture[this._currentLanguage]} ${config.time}.`;
    }

    return (
      <p
        aria-label={a11yLabel}
        class={`time time--${config.type}`}
        role='text'
      >
        <span
          aria-hidden='true'
          class='time__text'
          role='presentation'
        >
          {config.time}
        </span>
        <span class='time__text--visually-hidden'>
          {a11yLabel}
        </span>
      </p>
    );
  }
}
