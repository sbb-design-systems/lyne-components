import {
  Component,
  h,
  Prop
} from '@stencil/core';

import icons from '../../global/icons/timetable.json';
import getDocumentLang from '../../global/helpers/get-document-lang';

import {
  i18nDistance,
  i18nDistanceMeter,
  i18nWalkingDistanceArrival,
  i18nWalkingDistanceDeparture
} from '../../global/i18n';

@Component({
  shadow: true,
  styleUrls: {
    default: 'styles/lyne-timetable-transportation-walk.default.scss',
    shared: 'styles/lyne-timetable-transportation-walk.shared.scss'
  },
  tag: 'lyne-timetable-transportation-walk'
})

export class LyneTimetableTransportationWalk {

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

    let a11yMeters = i18nDistanceMeter.multiple.long[this._currentLanguage];

    if (config.distance === '1') {
      a11yMeters = i18nDistanceMeter.single.long[this._currentLanguage];
    }

    const a11yArrivalText = i18nWalkingDistanceArrival[this._currentLanguage];
    const a11yDepartureText = i18nWalkingDistanceDeparture[this._currentLanguage];
    const a11yDistance = config.distance;
    const a11yDistanceText = `(${i18nDistance[this._currentLanguage]} ${a11yDistance} ${a11yMeters})`;

    let a11yLabel = `${config.duration} ${a11yArrivalText} ${a11yDistanceText}`;

    if (config.type === 'departure') {
      a11yLabel = `${config.duration} ${a11yDepartureText} ${a11yDistanceText}`;
    }

    return (
      <p
        aria-label={a11yLabel}
        class={`walk walk--${config.type}`}
        role='text'
        title={a11yLabel}
      >
        <span
          class='walk__icon'
          innerHTML={icons['walk-small']}
        >
        </span>
        <span
          aria-hidden='true'
          class='walk__text--visual'
          role='presentation'
        >
          {config.duration}'
        </span>
        <span class='walk__text--visually-hidden'>
          {a11yLabel}
        </span>
      </p>
    );
  }
}
