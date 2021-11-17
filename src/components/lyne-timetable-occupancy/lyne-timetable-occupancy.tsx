import {
  Component,
  h,
  Prop
} from '@stencil/core';

import getDocumentLang from '../../global/helpers/get-document-lang';

import {
  i18nClass,
  i18nOccupancy
} from '../../global/i18n';

@Component({
  shadow: true,
  styleUrls: {
    default: 'styles/lyne-timetable-occupancy.default.scss',
    shared: 'styles/lyne-timetable-occupancy.shared.scss'
  },
  tag: 'lyne-timetable-occupancy'
})

export class LyneTimetableOccupancy {

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

    const {
      occupancyItems
    } = JSON.parse(this.config);

    return (
      <ul
        class='occupancy__list'
        role='list'
      >
        {occupancyItems.map((occupancyItem) => {

          const occupancyText = i18nOccupancy[occupancyItem.occupancy][this._currentLanguage];

          const classText = occupancyItem.class === '1'
            ? 'first'
            : 'second';

          const a11yLabel = `${occupancyItem.class}. ${i18nClass[classText][this._currentLanguage]}. ${occupancyText}`;

          return (
            <li class='occupancy__list-item'>
              <span
                class='occupancy__class'
              >
                <span
                  aria-hidden='true'
                  role='presentation'
                  class='occupancy__class--visual'
                >
                  {occupancyItem.class}.
                </span>
                <span
                  class='occupancy__class--visuallyhidden'
                >
                  {a11yLabel}
                </span>
              </span>
              <span
                class='occupancy__icon'
                innerHTML={occupancyItem.icon}
              >
              </span>
            </li>
          );
        })}
      </ul>
    );
  }
}
