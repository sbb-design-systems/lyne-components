import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Method,
  Prop
} from '@stencil/core';
import { InterfaceLyneAlertAttributes } from './lyne-alert.custom.d';
import { guid } from '../../global/guid';

import infoIcon from 'lyne-icons/dist/icons/info.svg';
import circleCrossSmallIcon from 'lyne-icons/dist/icons/circle-cross-small.svg';
import { i18nCloseAlert } from '../../global/i18n';
import getDocumentLang from '../../global/helpers/get-document-lang';

/**
 * @slot icon - Pass a svg to display an icon left to the title.
 * @slot content - Pass html-content to show as the content of the alert.
 */

@Component({
  shadow: true,
  styleUrls: {
    default: 'styles/lyne-alert.default.scss',
    shared: 'styles/lyne-alert.shared.scss'
  },
  tag: 'lyne-alert'
})
export class LyneAlert {

  // TODO: handle id logic without using id name;
  @Prop({
    attribute: 'id'
  }) public internalId: InterfaceLyneAlertAttributes['id'] = `lyne-alert-${guid()}`;

  /**
   * Whether the alert is readonly.
   * In readonly mode, there is no dismiss button offered to the user.
   */
  @Prop() public readonly: InterfaceLyneAlertAttributes['readonly'] = true;

  /** You can choose between `m` or `l` size. */
  @Prop() public size: InterfaceLyneAlertAttributes['size'] = 'm';

  /** Whether the fade in animation should be disabled. */
  @Prop()
  public disableAnimation: InterfaceLyneAlertAttributes['disableAnimation'] = false;

  /**
   * Aria-live politeness defines how to announce the alert to the user.
   * Choose between `off`, `polite` and `assertive`.
   */
  @Prop()
  public ariaLivePoliteness: InterfaceLyneAlertAttributes['ariaLivePoliteness'] = 'polite';

  /**
   * Emits when the fade in animation starts.
   */
  @Event({
    eventName: 'lyne-alert_will-present'
  })
  public willPresent: EventEmitter<void>;

  /**
   * Emits when the fade in animation ends and the button is displayed.
   */
  @Event({
    eventName: 'lyne-alert_did-present'
  })
  public didPresent: EventEmitter<void>;

  /**
   * Emits when the alert was hidden.
   */
  @Event({
    eventName: 'lyne-alert_did-dismiss'
  })
  public didDismiss: EventEmitter<void>;

  /** Whether the alert is presented or not. */
  public presented = false;

  @Element() private _element: HTMLElement;
  private _transitionWrapperElement!: HTMLElement;
  private _alertElement!: HTMLElement;
  private _transitionWrapperListenerReference?: () => void;
  private _alertElementListenerReference?: () => void;
  private _firstRenderingDone = false;
  private _currentLanguage = getDocumentLang();

  public componentDidRender(): void {
    if (!this._firstRenderingDone) {
      this.present();
    }
    this._firstRenderingDone = true;
  }

  /** Present the alert. */
  // eslint-disable-next-line require-await
  @Method() public async present(): Promise<void> {
    if (this.presented) {
      return;
    }
    this.willPresent.emit();
    this.presented = true;

    this._initFadeInTransitionStyles();

    if (this.disableAnimation) {
      this._onHeightTransitionEnd();

      return;
    }

    this._transitionWrapperElement.style.height = `${this._alertElement.offsetHeight}px`;
    this._transitionWrapperListenerReference =
      this._onHeightTransitionEnd.bind(this);
    this._transitionWrapperElement.addEventListener(
      'transitionend',
      this._transitionWrapperListenerReference
    );
  }

  private _onHeightTransitionEnd(): void {
    this._transitionWrapperElement.style.removeProperty('height');
    this._alertElement.style.removeProperty('opacity');
    this._unsubscribeFromWrapperTransition();

    if (this.disableAnimation) {
      this._onOpacityTransitionEnd();

      return;
    }
    this._alertElementListenerReference =
      this._onOpacityTransitionEnd.bind(this);

    this._alertElement.addEventListener(
      'transitionend',
      this._alertElementListenerReference
    );
  }

  private _onOpacityTransitionEnd(): void {
    this.didPresent.emit();
    this._unsubscribeFromAlertTransition();
  }

  private _unsubscribeFromWrapperTransition(): void {
    this._transitionWrapperElement.removeEventListener(
      'transitionend',
      this._transitionWrapperListenerReference
    );
    this._transitionWrapperListenerReference = undefined;
  }

  private _unsubscribeFromAlertTransition(): void {
    this._alertElement.removeEventListener(
      'transitionend',
      this._alertElementListenerReference
    );
    this._alertElementListenerReference = undefined;
  }

  /** Dismiss the alert. */
  // eslint-disable-next-line require-await
  @Method() public async dismiss(): Promise<void> {
    if (!this.presented) {
      return;
    }
    this._unsubscribeFromWrapperTransition();
    this._unsubscribeFromAlertTransition();

    this.presented = false;

    this._element.style.display = 'none';
    this.didDismiss.emit();
  }

  private _initFadeInTransitionStyles(): void {
    this._element.style.removeProperty('display');

    if (this.disableAnimation) {
      return;
    }
    this._transitionWrapperElement.style.height = '0';
    this._alertElement.style.opacity = '0';
  }

  public render(): JSX.Element {
    const readonly = this.readonly
      ? ' lyne-alert--readonly'
      : '';

    const a11yCloseAlert = i18nCloseAlert[this._currentLanguage];

    return (
      <Host
        role='alert'
        aria-live={this.ariaLivePoliteness}
        id={this.internalId}
      >
        <div
          class='lyne-alert_transition-wrapper'
          ref={(el): void => {
            this._transitionWrapperElement = el;
          }}
        >
          <div
            class={`lyne-alert lyne-alert--size-${this.size}${readonly}`}
            ref={(el): void => {
              this._alertElement = el;
              this._initFadeInTransitionStyles();
            }}
          >
            <span class='lyne-alert_icon' aria-hidden='true'>
              <slot name='icon'>
                <span innerHTML={infoIcon} />
              </slot>
            </span>
            <span class='lyne-alert_content'>
              <slot />
            </span>
            {!readonly && (
              <span class='lyne-alert_close-button-wrapper'>
                <lyne-button
                  variant='transparent-negative'
                  icon={true}
                  size='m'
                  onClick={this.dismiss.bind(this)}
                  iconDescription={a11yCloseAlert}
                  aria-controls={this.internalId}
                  class='lyne-alert_close-button-wrapper_button'
                  innerHTML={circleCrossSmallIcon}
                />
              </span>
            )}
          </div>
        </div>
      </Host>
    );
  }
}
