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
import { InterfaceSbbAlertAttributes } from './sbb-alert.custom';
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
    default: 'styles/sbb-alert.default.scss',
    shared: 'styles/sbb-alert.shared.scss'
  },
  tag: 'sbb-alert'
})
export class SbbAlert {
  @Prop({
    attribute: 'id'
  })
  public internalId: InterfaceSbbAlertAttributes['id'] = `sbb-alert-${guid()}`;

  /**
   * Whether the alert is readonly.
   * In readonly mode, there is no dismiss button offered to the user.
   */
  @Prop() public readonly: InterfaceSbbAlertAttributes['readonly'] = true;

  /** You can choose between `m` or `l` size. */
  @Prop() public size: InterfaceSbbAlertAttributes['size'] = 'm';

  /** Whether the fade in animation should be disabled. */
  @Prop()
  public disableAnimation: InterfaceSbbAlertAttributes['disableAnimation'] = false;

  /**
   * Aria-live politeness defines how to announce the alert to the user.
   * Choose between `off`, `polite` and `assertive`.
   */
  @Prop()
  public ariaLivePoliteness: InterfaceSbbAlertAttributes['ariaLivePoliteness'] =
      'polite';

  /**
   * Emits when the fade in animation starts.
   */
  @Event({
    eventName: 'sbb-alert_will-present'
  })
  public willPresent: EventEmitter<void>;

  /**
   * Emits when the fade in animation ends and the button is displayed.
   */
  @Event({
    eventName: 'sbb-alert_did-present'
  })
  public didPresent: EventEmitter<void>;

  /**
   * Emits when the alert was hidden.
   */
  @Event({
    eventName: 'sbb-alert_did-dismiss'
  })
  public didDismiss: EventEmitter<void>;

  /** Whether the alert is presented or not. */
  public presented = false;

  @Element() private _element: HTMLElement;
  private _transitionWrapperElement!: HTMLElement;
  private _alertElement!: HTMLElement;
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
    this._transitionWrapperElement.addEventListener(
      'transitionend',
      this._onHeightTransitionEnd.bind(this),
      {
        once: true
      }
    );
  }

  private _onHeightTransitionEnd(): void {
    this._transitionWrapperElement.style.removeProperty('height');
    this._alertElement.style.removeProperty('opacity');

    if (this.disableAnimation) {
      this._onOpacityTransitionEnd();

      return;
    }

    this._alertElement.addEventListener(
      'transitionend',
      this._onOpacityTransitionEnd.bind(this),
      {
        once: true
      }
    );
  }

  private _onOpacityTransitionEnd(): void {
    this.didPresent.emit();
  }

  /** Dismiss the alert. */
  // eslint-disable-next-line require-await
  @Method() public async dismiss(): Promise<void> {
    if (!this.presented) {
      return;
    }

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
      ? ' sbb-alert--readonly'
      : '';

    const a11yCloseAlert = i18nCloseAlert[this._currentLanguage];

    return (
      <Host
        role='alert'
        aria-live={this.ariaLivePoliteness}
        id={this.internalId}
      >
        <div
          class='sbb-alert_transition-wrapper'
          ref={(el): void => {
            this._transitionWrapperElement = el;
          }}
        >
          <div
            class={`sbb-alert sbb-alert--size-${this.size}${readonly}`}
            ref={(el): void => {
              const isFirstInitialization = !this._alertElement;

              this._alertElement = el;
              if (isFirstInitialization) {
                this._initFadeInTransitionStyles();
              }

            }}
          >
            <span class='sbb-alert_icon' aria-hidden='true'>
              <slot name='icon'>
                <span innerHTML={infoIcon} />
              </slot>
            </span>
            <span class='sbb-alert_content'>
              <slot />
            </span>
            {!readonly && (
              <span class='sbb-alert_close-button-wrapper'>
                <sbb-button
                  variant='transparent-negative'
                  icon={true}
                  size='m'
                  onClick={this.dismiss.bind(this)}
                  iconDescription={a11yCloseAlert}
                  aria-controls={this.internalId}
                  class='sbb-alert_close-button-wrapper_button'
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
