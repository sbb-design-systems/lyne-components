import {
  Component,
  h,
  Prop
} from '@stencil/core';

import getDocumentLang from '../../global/helpers/get-document-lang';
import icons from '../../global/icons/timetable.json';
import { InterfaceLyneTimetableParkAndRailAttributes } from './lyne-timetable-park-and-rail.custom.d';
import {
  i18nAvailableAtDepartingStation,
  i18nDistanceMeter,
  i18nWalkingDistanceToDepartureStation
} from '../../global/i18n';

@Component({
  shadow: true,
  styleUrls: {
    default: 'styles/lyne-timetable-park-and-rail.default.scss',
    shared: 'styles/lyne-timetable-park-and-rail.shared.scss'
  },
  tag: 'lyne-timetable-park-and-rail'
})

export class LyneTimetableParkAndRail {

  private _currentLanguage = getDocumentLang();

  /**
   * Set the desired appearance of
   * the module.
   */
  @Prop() public appearance?: InterfaceLyneTimetableParkAndRailAttributes['appearance'] = 'first-level';

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

    const a11yDistanceToDepartureText = i18nWalkingDistanceToDepartureStation[this._currentLanguage];
    const a11yDistance = config.distance;
    const a11yDistanceText = `(${a11yDistance} ${a11yMeters} ${a11yDistanceToDepartureText})`;

    const a11yLabel = `${i18nAvailableAtDepartingStation[this._currentLanguage]} ${a11yDistanceText}`;

    const appearanceClass = ` park-and-rail--${this.appearance}`;

    return (
      <div class={`park-and-rail${appearanceClass}`}>
        <span
          aria-label={a11yLabel}
          class='park-and-rail__icon'
          innerHTML={icons['park-and-rail-small']}
          role='text'
          title={a11yLabel}
        >
        </span>
      </div>
    );
  }
}
