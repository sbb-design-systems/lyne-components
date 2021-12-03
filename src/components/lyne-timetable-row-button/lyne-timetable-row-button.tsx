import {
  Component,
  Element,
  h,
  Prop,
  Watch
} from '@stencil/core';
import events from './lyne-timetable-row-button.events';
import getDocumentLang from '../../global/helpers/get-document-lang';
import { InterfaceLyneTimetableRowButtonAttributes } from './lyne-timetable-row-button.custom.d';

import {
  i18nShowConnectionDetailsAndBuyOptions
} from '../../global/i18n';



@Component({
  shadow: true,
  styleUrls: {
    default: 'styles/lyne-timetable-row-button.default.scss',
    shared: 'styles/lyne-timetable-row-button.shared.scss'
  },
  tag: 'lyne-timetable-row-button'
})

export class LyneTimetableRowButton {

  private _button!: HTMLElement;
  private _currentLanguage = getDocumentLang();

  @Element() private _element: HTMLElement;

  /** Documentation for someProp */
  @Prop() public someProp?: InterfaceLyneTimetableRowButtonAttributes['someInterface'];

  /** Set to true to open the accordion item. Set to false to close it. */
  @Prop({
    reflect: true
  }) public expanded?: boolean;

  /** Id which is sent in the event of clicking the button */
  @Prop() public eventId?: string;

  @Watch('expanded')
  public watchStateHandler(newValue: boolean): void {
    console.log(newValue);
  }

  private _toggleAriaAttributes(): void {
    console.log(this._button);
  }

  private _clickHandler = (): void => {

    this._toggleAriaAttributes();

    const event = new CustomEvent(events.click, {
      bubbles: true,
      composed: true,
      detail: 'some event detail'
    });

    this._element.dispatchEvent(event);
  };

  public render(): JSX.Element {
    return (
      <button
        aria-expanded='false'
        aria-haspopup='true'
        aria-label={`${i18nShowConnectionDetailsAndBuyOptions[this._currentLanguage]}`}
        aria-pressed='false'
        onClick={this._clickHandler}
        ref={(el): void => {
          this._button = el;
        }}
        type='button'
      >
      </button>
    );
  }
}
