import {
  Component,
  h,
  Prop
} from '@stencil/core';

import getDocumentLang from '../../global/helpers/get-document-lang';
import icons from '../../global/icons/timetable.json';
import { InterfaceLyneTimetableCusHimAttributes } from './lyne-timetable-cus-him.custom.d';
import { i18nNone } from '../../global/i18n';

@Component({
  shadow: true,
  styleUrls: {
    default: 'styles/lyne-timetable-cus-him.default.scss',
    shared: 'styles/lyne-timetable-cus-him.shared.scss'
  },
  tag: 'lyne-timetable-cus-him'
})

export class LyneTimetableCusHim {

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
   * appearance of the Cus Him display,
   * can either be an icon only list
   * appearance or a single icon with text
   */
  @Prop() public appearance?: InterfaceLyneTimetableCusHimAttributes['appearance'] = 'first-level-list';

  private _renderAppearance(cusHimItems): JSX.Element {

    /**
     * Let's check if we should render a list or
     * an individual message on level 2. Since
     * the former is more likely, we try to handle
     * this first. If we render early, we return
     * the markup early and do not reach the second
     * return after the if statement.
     */
    if (this.appearance.indexOf('list') !== -1) {

      if (cusHimItems.length === 1) {

        // eslint-disable-next-line prefer-destructuring
        const cusHimItem = cusHimItems[0];

        return (
          <span
            aria-label={cusHimItem.text}
            class='cus-him__icon'
            innerHTML={icons[cusHimItem.icon]}
            role='text'
            title={cusHimItem.text}
          ></span>
        );
      }

      return (
        <ul
          class='cus-him__list'
          role='list'
        > {
            cusHimItems.map((cusHimItem) => (
              <li class='cus-him__list-item'>
                <span
                  aria-label={cusHimItem.text}
                  class='cus-him__icon'
                  innerHTML={icons[cusHimItem.icon]}
                  role='text'
                  title={cusHimItem.text}
                >
                </span>
              </li>
            ))
          }
        </ul>
      );

    }

    // eslint-disable-next-line prefer-destructuring
    const cusHimItem = cusHimItems[0];
    const appearanceClass = this.appearance;

    return (
      <p
        aria-label={cusHimItem.text}
        class={`cus-him--${appearanceClass}`}
      >
        <span
          class='cus-him__icon'
          innerHTML={icons[cusHimItem.icon]}
          role='text'
          title={cusHimItem.text}
        >
        </span>
        <span
          class={`cus-him--${appearanceClass}__text`}
        >
          {cusHimItem.text}
        </span>
      </p>
    );

  }

  public render(): JSX.Element {

    const {
      cusHimItems
    } = JSON.parse(this.config);

    const a11yLabel = i18nNone[this._currentLanguage];
    const appearanceClass = ` cus-him--${this.appearance}`;

    return (
      <div class={`cus-him${appearanceClass}`}>
        {
          cusHimItems.length > 0
            ? this._renderAppearance(cusHimItems)
            : <span class='cus-him__text--visually-hidden'>{a11yLabel}</span>
        }
      </div>
    );
  }
}
