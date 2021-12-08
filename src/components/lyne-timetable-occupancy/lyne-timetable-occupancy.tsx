import {
  Component,
  h,
  Prop
} from '@stencil/core';

import icons from '../../global/icons/timetable.json';
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

          const a11yLabel = `${i18nClass[classText][this._currentLanguage]}. ${occupancyText}`;

          return (
            <li class='occupancy__list-item'>
              <span
                class='occupancy__class'
              >
                <span
                  aria-hidden='true'
                  class='occupancy__class--visual'
                >
                  {occupancyItem.class}.
                </span>
                <span
                  class='occupancy__class--visually-hidden'
                >
                  {a11yLabel}
                </span>
              </span>
              <span
                aria-hidden='true'
                class='occupancy__icon'
                innerHTML={icons[occupancyItem.icon]}
                role='presentation'
              >
              </span>
            </li>
          );
        })}
      </ul>
    );
  }
}
