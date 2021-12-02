import {
  Component,
  h,
  Prop
} from '@stencil/core';

import getDocumentLang from '../../global/helpers/get-document-lang';

import {
  i18nDayChange,
  i18nDepartsOn
} from '../../global/i18n';

@Component({
  shadow: false,
  styleUrls: {
    default: 'styles/lyne-timetable-row-day-change.default.scss',
    shared: 'styles/lyne-timetable-row-day-change.shared.scss'
  },
  tag: 'lyne-timetable-row-day-change'
})

export class LyneTimetableRowDayChange {

  private _currentLanguage = getDocumentLang();

  @Prop() public config!: string;

  public render(): JSX.Element {

    const config = JSON.parse(this.config);

    let dayChange = '';

    if (config.dayChange) {
      dayChange = `${i18nDayChange[this._currentLanguage]}, `;
    }

    const departsOn = i18nDepartsOn[this._currentLanguage];

    const visualText = `${config.day}, ${config.date}`;
    const a11yLabel = `${dayChange} ${departsOn} ${config.day}, ${config.date}`;

    return (
      <p
        aria-label={a11yLabel}
        class='day-change'
        role='text'
      >
        <span
          aria-hidden='true'
          class='day-change__text--visual'
          role='presentation'
        >
          {visualText}
        </span>
        <span class='day-change__text--visually-hidden'>
          {a11yLabel}
        </span>
      </p>
    );
  }
}
