import { Component, h, JSX, Prop } from '@stencil/core';

import getDocumentLang from '../../global/helpers/get-document-lang';
import { i18nFromPlatform } from '../../global/i18n';
import { InterfaceTimetablePlatformAttributes } from './sbb-timetable-platform.custom';

@Component({
  shadow: true,
  styleUrl: 'sbb-timetable-platform.scss',
  tag: 'sbb-timetable-platform',
})
export class SbbTimetablePlatform {
  private _currentLanguage = getDocumentLang();

  /**
   * Set the desired appearance of
   * the component.
   */
  @Prop()
  public appearance?: InterfaceTimetablePlatformAttributes['appearance'] = 'first-level';

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
      <p aria-label={a11yLabel} class={`platform${appearanceClasses}`} role="text">
        <span aria-hidden="true" class="platform__text" role="presentation">
          {text}
          {config.platform}
        </span>
        <span class="platform__text--visually-hidden">{a11yLabel}</span>
      </p>
    );
  }
}
