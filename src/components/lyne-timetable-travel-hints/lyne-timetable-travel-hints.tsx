import {
  Component,
  h,
  Prop
} from '@stencil/core';

import getDocumentLang from '../../global/helpers/get-document-lang';
import icons from '../../global/icons/timetable.json';
import { InterfaceLyneTimetableTravelHintsAttributes } from './lyne-timetable-travel-hints.custom.d';
import { i18nNone } from '../../global/i18n';

@Component({
  shadow: true,
  styleUrls: {
    default: 'styles/lyne-timetable-travel-hints.default.scss',
    shared: 'styles/lyne-timetable-travel-hints.shared.scss'
  },
  tag: 'lyne-timetable-travel-hints'
})

export class LyneTimetableTravelHints {

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

  /**
   * Variant of the Travel Hints display,
   * can either be used on level 1 or
   * level 2 of the timetable
   */
  @Prop() public variant?: InterfaceLyneTimetableTravelHintsAttributes['variant'] = 'first-level-list';

  public render(): JSX.Element {

    const {
      travelHintsItems
    } = JSON.parse(this.config);

    const a11yLabel = i18nNone[this._currentLanguage];
    const variantClass = ` travel-hints--${this.variant}`;

    return (
      <div class={`travel-hints${variantClass}`}>
        {
          travelHintsItems.length > 0
            ? <ul
              class='travel-hints__list'
              role='list'
            >
              {travelHintsItems.map((travelHintItem) => (
                <li class='travel-hints__list-item'>
                  <span
                    aria-label={travelHintItem.text}
                    class={`travel-hints__icon travel-hints__icon--${travelHintItem.icon}`}
                    innerHTML={icons[travelHintItem.icon]}
                    role='text'
                    title={travelHintItem.text}
                  >
                  </span>
                </li>
              ))}
            </ul>
            : <span class='travel-hints__text--visually-hidden'>{a11yLabel}</span>
        }
      </div>
    );
  }
}
