import {
  Component,
  ComponentInterface,
  Element,
  h,
  JSX,
  Listen,
  Prop,
  State,
  Watch,
} from '@stencil/core';
import chevronIcon from 'lyne-icons/dist/icons/chevron-small-right-small.svg';
import events from './sbb-timetable-button.events';
import { documentLanguage, SbbLanguageChangeEvent } from '../../global/helpers/language';
import getDocumentWritingMode from '../../global/helpers/get-document-writing-mode';
import { InterfaceTimetableButtonAttributes } from './sbb-timetable-button.custom';
import { i18nEarlierConnections, i18nLaterConnections, i18nShowOnMap } from '../../global/i18n';

@Component({
  shadow: true,
  styleUrl: 'sbb-timetable-button.scss',
  tag: 'sbb-timetable-button',
})
export class SbbTimetableButton implements ComponentInterface {
  @State() private _currentLanguage = documentLanguage();

  private _button!: HTMLElement;
  private _ctaText!: string;

  /** The reference to the button */
  @Element() private _element: HTMLElement;

  /**
   * Set the desired appearance of
   * the component.
   */
  @Prop() public appearance?: InterfaceTimetableButtonAttributes['appearance'] =
    'earlier-connections';

  /**
   * If you use the button to trigger another widget which itself is covering
   * the page, you must provide an according attribute for aria-haspopup.
   */
  @Prop() public ariaHaspopup?: InterfaceTimetableButtonAttributes['popup'];

  /**
   * If appearance is set to 'cus-him' or
   * 'walk', we need to provide a config
   * to popultate the nested web component.
   */
  @Prop() public config?: string;

  /** Set to true to get a disabled button */
  @Prop() public disabled? = false;

  /** Id which is sent in the click event payload */
  @Prop() public eventId?: string;

  /**
   * Set to true to initially show the
   * state, which would get set by pressing
   * the button.
   */
  @Prop({
    reflect: true,
  })
  public expanded?: boolean;

  /** The name attribute to use for the button */
  @Prop() public name?: string;

  @Listen('sbbLanguageChange', { target: 'document' })
  public handleLanguageChange(event: SbbLanguageChangeEvent): void {
    this._currentLanguage = event.detail;
  }

  @Watch('expanded')
  public watchStateHandler(newValue: boolean): void {
    this.expanded = newValue;
    this._toggleAriaAttributes(false);
  }

  private _toggleAriaAttributes(initiatedByPress): void {
    if (this.appearance === 'cus-him' || this.appearance === 'walk') {
      if (initiatedByPress) {
        this.expanded = !this.expanded;
      }

      const expand = String(this.expanded);

      this._button.setAttribute('aria-expanded', expand);
      this._button.setAttribute('aria-haspopup', 'true');
    }
  }

  private _clickHandler = (): void => {
    this._toggleAriaAttributes(true);

    let eventDetail;

    if (this.eventId) {
      eventDetail = this.eventId;
    }

    const event = new CustomEvent(events.click, {
      bubbles: true,
      composed: true,
      detail: eventDetail,
    });

    this._element.dispatchEvent(event);
  };

  private _prepareButtonTextAndAttributes = (): void => {
    switch (this.appearance) {
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

  private _renderAppearance(): JSX.Element {
    const config = JSON.stringify(this.config);

    if (this.appearance === 'earlier-connections' || this.appearance === 'later-connections') {
      return <div class="button__inner_wrapper">{this._ctaText}</div>;
    }

    if (this.appearance === 'cus-him') {
      return (
        <div class="button__inner_wrapper">
          <sbb-timetable-cus-him
            appearance="second-level-button"
            config={config}
          ></sbb-timetable-cus-him>
          <span class="button__chevron" innerHTML={chevronIcon} />
        </div>
      );
    }

    return (
      <div class="button__inner_wrapper">
        <sbb-timetable-transportation-walk
          appearance="second-level"
          config={config}
        ></sbb-timetable-transportation-walk>
        <span class="button__cta">{this._ctaText}</span>
        <span class="button__chevron" innerHTML={chevronIcon} />
      </div>
    );
  }

  public render(): JSX.Element {
    const appearanceClass = ` button--${this.appearance}`;
    const currentWritingMode = getDocumentWritingMode();

    this._prepareButtonTextAndAttributes();

    return (
      <button
        aria-haspopup={this.ariaHaspopup}
        class={`button button${appearanceClass}`}
        disabled={this.disabled}
        dir={currentWritingMode}
        onClick={this._clickHandler}
        ref={(el): void => {
          this._button = el;
        }}
        type="button"
      >
        {this._renderAppearance()}
      </button>
    );
  }

  public componentDidRender(): void {
    this._toggleAriaAttributes(false);
  }
}
