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
   * Set the desired appearance of
   * the module.
   */
  @Prop() public appearance?: InterfaceLyneTimetablePlatformAttributes['appearance'] = 'first-level';

  /**
   * Stringified JSON which defines most of the
   * content of the component. Please check the
   * individual stories to get an idea of the
   * structure.
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
