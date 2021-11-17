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
    const a11yLabel = `${i18nFromPlatform.long[this._currentLanguage]} ${this.platform}.`;

    return (
      <p
        aria-label={a11yLabel}
        class='platform'
        role='text'
      >
        <span class='platform__text'>
          {text}
        </span>
        {this.platform}
      </p>
    );
  }
}
