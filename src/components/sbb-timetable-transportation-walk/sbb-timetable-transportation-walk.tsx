import {
  Component,
  h,
  Prop
} from '@stencil/core';

import icons from '../../global/icons/timetable.json';
import { InterfaceTimetableTransportationWalkAttributes } from './sbb-timetable-transportation-walk.custom';
import getDocumentLang from '../../global/helpers/get-document-lang';

import {
  i18nDistance,
  i18nDistanceMeter,
  i18nWalk,
  i18nWalkingDistanceArrival,
  i18nWalkingDistanceDeparture
} from '../../global/i18n';

@Component({
  shadow: true,
  styleUrls: {
    default: 'styles/sbb-timetable-transportation-walk.default.scss',
    shared: 'styles/sbb-timetable-transportation-walk.shared.scss'
  },
  tag: 'sbb-timetable-transportation-walk'
})

export class SbbTimetableTransportationWalk {

  private _currentLanguage = getDocumentLang();

  /**
   * Set the desired appearance of
   * the component.
   */
  @Prop() public appearance?: InterfaceTimetableTransportationWalkAttributes['appearance'] = 'first-level';

  /**
   * Stringified JSON which defines most of the
   * content of the component. Please check the
   * individual stories to get an idea of the
   * structure.
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

    const secondLevel = this.appearance === 'second-level';

    const appearanceClasses = ` walk--${this.appearance} walk--${config.type}`;

    return (
      <p
        aria-label={a11yLabel}
        class={`walk${appearanceClasses}`}
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
          class='walk__duration--visual'
          role='presentation'
        >
          {config.duration}'
        </span>
        {
          secondLevel
            ? <span
              aria-hidden='true'
              class='walk__text--visual'
              role='presentation'
            >
              {i18nWalk[this._currentLanguage]}
            </span>
            : ''
        }
        <span class='walk__text--visually-hidden'>
          {a11yLabel}
        </span>
      </p>
    );
  }
}
