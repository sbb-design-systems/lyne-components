import { Component, h, Prop } from '@stencil/core';

import getDocumentLang from '../../global/helpers/get-document-lang';
import icons from '../../global/icons/timetable.json';
import { i18nBarrierFreeTravel } from '../../global/i18n';

@Component({
  shadow: true,
  styleUrls: {
    default: 'styles/sbb-timetable-barrier-free.default.scss',
    shared: 'styles/sbb-timetable-barrier-free.shared.scss',
  },
  tag: 'sbb-timetable-barrier-free',
})
export class SbbTimetableBarrierFree {
  private _currentLanguage = getDocumentLang();

  /**
   * Stringified JSON which defines most of the
   * content of the component. Please check the
   * individual stories to get an idea of the
   * structure.
   */
  @Prop() public config!: string;

  public render(): JSX.Element {
    const config = JSON.parse(this.config);

    const a11yLabel = `${i18nBarrierFreeTravel[this._currentLanguage]} ${config.text}`;
    const appearanceClass = ' barrier-free--second-level';

    return (
      <p aria-label={a11yLabel} class={`barrier-free${appearanceClass}`} role="text">
        <span class="barrier-free__text--visually-hidden">{a11yLabel}</span>
        <span aria-hidden="true" class="barrier-free__text" role="presentation">
          <span class="barrier-free__icon" innerHTML={icons[config.icon]}></span>
          {config.text}
        </span>
      </p>
    );
  }
}
