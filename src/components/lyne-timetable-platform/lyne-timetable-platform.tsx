import {
  Component,
  h,
  Prop
} from '@stencil/core';

import getDocumentLang from '../../global/helpers/get-document-lang';
import { i18nFromPlatform } from '../../global/i18n';

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
   * Pass in a string like 12A/B, the prefix
   * and visually hidden text will get added
   * automatically.
   */
  @Prop() public platform!: string;

  public render(): JSX.Element {

    const text = `${i18nFromPlatform.short[this._currentLanguage]} `;
    const a11yLabel = `${i18nFromPlatform.long[this._currentLanguage]}`;

    return (
      <span class='platform'>
        <span class='platform__visuallyhidden'>
          {a11yLabel}
        </span>
        <span
          aria-hidden='true'
          class='platform__text'
          role='presentation'
        >
          {text}
        </span>
        {this.platform}
      </span>
    );
  }
}
