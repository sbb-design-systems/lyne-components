import {
  Component,
  Element,
  h,
  Prop
} from '@stencil/core';
import chevronIcon from 'lyne-icons/dist/icons/chevron-small-right-small.svg';
import events from './lyne-timetable-button.events';
import getDocumentLang from '../../global/helpers/get-document-lang';
import getDocumentWritingMode from '../../global/helpers/get-document-writing-mode';
import { InterfaceLyneTimetableButtonAttributes } from './lyne-timetable-button.custom.d';
import {
  i18nEarlierConnections,
  i18nLaterConnections,
  i18nShowOnMap
} from '../../global/i18n';

/**
 * @slot cus-him - Use this to document a slot.
 */

@Component({
  shadow: true,
  styleUrls: {
    default: 'styles/lyne-timetable-button.default.scss',
    shared: 'styles/lyne-timetable-button.shared.scss'
  },
  tag: 'lyne-timetable-button'
})

export class LyneTimetableButton {

  /* private _a11yLabel!: string;
  private _additionalButtonClasses = [];
  private _additionalButtonAttributes = {};
  private _additionalText?: string; */
  // private _button!: HTMLElement;
  private _additionalButtonAttributes = {};
  private _currentLanguage = getDocumentLang();
  private _ctaText!: string;

  /**
   * appearance of the Timetable Button,
   * can either be used on level 1 or
   * level 2 of the timetable
   */
  @Prop() public appearance?: InterfaceLyneTimetableButtonAttributes['appearance'] = 'earlier-connections';

  @Prop() public config?: string;

  /** Id which is sent in the click event payload */
  @Prop() public eventId?: string;

  /** The name attribute to use for the button */
  @Prop() public name?: string;

  @Element() private _element: HTMLElement;

  private _buttonClick = (): void => {
    let eventDetail;

    if (this.eventId) {
      eventDetail = this.eventId;
    }

    const event = new CustomEvent(events.click, {
      bubbles: true,
      composed: true,
      detail: eventDetail
    });

    this._element.dispatchEvent(event);
  };

  private _prepareButtonTextAndAttributes = (): void => {

    switch (this.appearance) {
      case 'earlier-connections':
        this._ctaText = `${i18nEarlierConnections[this._currentLanguage]}`;
        this._additionalButtonAttributes = {
          'aria-pressed': 'false'
        }
        break;
      case 'later-connections':
        this._ctaText = `${i18nLaterConnections[this._currentLanguage]}`;
        this._additionalButtonAttributes = {
          'aria-pressed': 'false'
        }
        break;
      case 'cus-him':
        this._ctaText = 'CUS/HIM';
        this._additionalButtonAttributes = {
          'aria-expanded': 'false',
          'aria-haspopup': 'true',
          'aria-pressed': 'false'
        }
        break;
      case 'walk':
        this._ctaText = `${i18nShowOnMap[this._currentLanguage]}`;
        this._additionalButtonAttributes = {
          'aria-expanded': 'false',
          'aria-haspopup': 'true',
          'aria-pressed': 'false'
        }
        break;
      default:
        this._ctaText = `${i18nEarlierConnections[this._currentLanguage]}`;
        this._additionalButtonAttributes = {
          'aria-pressed': 'false'
        }
        break;
    }

  };

  private _renderAppearance(): any {
    if (this.appearance === 'earlier-connections' ||
      this.appearance === 'later-connections'
    ) {
      return (
        this._ctaText
      )
    }

    if (this.appearance === 'cus-him') {
      return (
        <div class='button__inner_wrapper'>
          <lyne-timetable-cus-him
            appearance='second-level-button'
            config={JSON.stringify(this.config)}
          >
          </lyne-timetable-cus-him>
          <span
            class='button__chevron'
            innerHTML={chevronIcon}
          />
        </div>
      )
    }

    if (this.appearance === 'walk') {
      return (
        <div class='button__inner_wrapper'>
          <lyne-timetable-transportation-walk
            appearance='second-level'
            config={JSON.stringify(this.config)}
          >
          </lyne-timetable-transportation-walk>
          <span
            class='button__chevron'
            innerHTML={chevronIcon}
          />
        </div>
      )
    }

  };

  public render(): JSX.Element {

    const appearanceClass = ` button--${this.appearance}`;
    const currentWritingMode = getDocumentWritingMode();

    this._prepareButtonTextAndAttributes();

    return (
      <button
        class={`button${appearanceClass}`}
        dir={currentWritingMode}
        onClick={this._buttonClick}
        /* ref={(el): void => {
          this._button = el;
        }} */
        type='button'
        {...this._additionalButtonAttributes}
      >
        {
          this._renderAppearance()
        }
      </button>

    );
  }
}

