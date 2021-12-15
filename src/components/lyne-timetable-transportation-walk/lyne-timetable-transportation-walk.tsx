import {
  Component,
  h,
  Prop
} from '@stencil/core';

import icons from '../../global/icons/timetable.json';
import { InterfaceLyneTimetableTransportationWalkAttributes } from './lyne-timetable-transportation-walk.custom.d';
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

  /**
   * appearance of the Travel Hints display,
   * can either be used on level 1 or
   * level 2 of the timetable
   */
  @Prop() public appearance?: InterfaceLyneTimetableTransportationWalkAttributes['appearance'] = 'first-level';

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

    const appearanceClasses = `walk--${this.appearance} walk--${config.type}`;

    return (
      <p
        aria-label={a11yLabel}
        class={`walk ${appearanceClasses}`}
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
