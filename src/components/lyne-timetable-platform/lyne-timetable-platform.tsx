import {
  Component,
  h,
  Prop
} from '@stencil/core';

import getDocumentLang from '../../global/helpers/get-document-lang';
import { i18nFromPlatform } from '../../global/i18n';
import { InterfaceLyneTimetablePlatformAttributes } from './lyne-timetable-platform.custom.d';

@Component({
  shadow: true,
  styleUrls: {
    default: 'styles/lyne-timetable-platform.default.scss',
    shared: 'styles/lyne-timetable-platform.shared.scss'
  },
  tag: 'lyne-timetable-platform'
})

export class LyneTimetablePlatform {

  private _currentLanguage = getDocumentLang();

  /**
   * appearance of the Travel Hints display,
   * can either be used on level 1 or
   * level 2 of the timetable
   */
  @Prop() public appearance?: InterfaceLyneTimetablePlatformAttributes['appearance'] = 'first-level';

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

    const text = `${i18nFromPlatform.short[this._currentLanguage]} `;
    const a11yLabel = `${i18nFromPlatform.long[this._currentLanguage]} ${config.platform}.`;

    const appearanceClasses = ` platform--${this.appearance}`;

    return (
      <p
        aria-label={a11yLabel}
        class={`platform${appearanceClasses}`}
        role='text'
      >
        <span
          aria-hidden='true'
          class='platform__text'
          role='presentation'
        >
          {text}
          {config.platform}
        </span>
        <span class='platform__text--visually-hidden'>
          {a11yLabel}
        </span>
      </p>
    );
  }
}
