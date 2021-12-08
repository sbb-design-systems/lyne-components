import {
  Component,
  Element,
  h,
  Prop
} from '@stencil/core';
import chevronIcon from 'lyne-icons/dist/icons/chevron-small-down-small.svg';
import events from './lyne-timetable-button.events';
import getDocumentLang from '../../global/helpers/get-document-lang';
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
  shadow: false,
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
  private _currentLanguage = getDocumentLang();
  private _ctaText!: string;

  /** Id which is sent in the click event payload */
  @Prop() public eventId?: string;

  /** The name attribute to use for the button */
  @Prop() public name?: string;

  /**
   * Variant of the Timetable Button,
   * can either be used on level 1 or
   * level 2 of the timetable
   */
  @Prop() public variant?: InterfaceLyneTimetableButtonAttributes['variant'] = 'earlier-connections';

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

  private _prepareButtonText = (): void => {

    switch (this.variant) {
      case 'earlier-connections':
        this._ctaText = `${i18nEarlierConnections[this._currentLanguage]}`;
        break;
      case 'later-connections':
        this._ctaText = `${i18nLaterConnections[this._currentLanguage]}`;
        break;
      case 'cus-him':
        this._ctaText = 'CUS/HIM';
        break;
      case 'walk':
        this._ctaText = `${i18nShowOnMap[this._currentLanguage]}`;
        break;
      default:
        this._ctaText = `${i18nEarlierConnections[this._currentLanguage]}`;
        break;
    }

  };

  public render(): JSX.Element {

    const variantClass = ` button--${this.variant}`;

    this._prepareButtonText();

    return (
      <button
        class={`button${variantClass}`}
        onClick={this._buttonClick}
        /* ref={(el): void => {
          this._button = el;
        }} */
        type='button'
      >
        {this._ctaText}
        <span
          class='button__chevron'
          innerHTML={chevronIcon}
        />
      </button>
    );
  }
}

