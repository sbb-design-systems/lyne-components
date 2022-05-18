import {
  Component,
  h,
  Host,
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
   * Stringified JSON which defines most of the
   * content of the component. Please check the
   * individual stories to get an idea of the
   * structure.
   */
  @Prop() public config!: string;

  /**
   * Set the desired appearance of
   * the component.
   */
  @Prop() public appearance?: InterfaceLyneTimetableCusHimAttributes['appearance'] = 'first-level-list';

  private _renderAppearance(cusHimItems): JSX.Element {

    /**
     * Let's check if we should render a list or
     * an individual message on the second level of
     * the timetable. Since the former is more likely,
     * we try to handle this case first. If this is the
     * case, we return the markup early and do not reach
     * the second return after the if statement.
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
        >
          {cusHimItems.map((cusHimItem) => (
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
          ))}
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

    const hostClass = cusHimItems.length === 0
      ? 'visually-empty'
      : '';

    return (
      <Host class={hostClass}>
        <div class={`cus-him${appearanceClass}`}>
          {
            cusHimItems && cusHimItems.length > 0
              ? this._renderAppearance(cusHimItems)
              : <span class='cus-him__text--visually-hidden'>{a11yLabel}</span>
          }
        </div>
      </Host>
    );
  }
}
