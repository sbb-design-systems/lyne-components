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
   * appearance of the Park & Ride display,
   * (currently only 'first-level').
   */
  @Prop() public appearance?: InterfaceLyneTimetableParkAndRailAttributes['appearance'] = 'first-level';

  /**
   * Stringified JSON to define the different outputs of the
   * occupancy predicition cell.
   * Format:
   * occupancyItems: [
   * {
   *    class: '1',
   *    icon: "<svg width="19" height="16"...></svg>",,
   *    occupancy: 'low'
   * },
   * {
   *    class: '2',
   *    icon: "<svg width="19" height="16"...></svg>",,
   *    occupancy: 'medium'
   *  }
   * ]
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
