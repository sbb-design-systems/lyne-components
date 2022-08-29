import { Component, Element, Event, EventEmitter, h, JSX, Host, Method, Prop } from '@stencil/core';
import { InterfaceAlertAttributes } from './sbb-alert.custom';

import infoIcon from 'lyne-icons/dist/icons/info.svg';
import circleCrossSmallIcon from 'lyne-icons/dist/icons/circle-cross-small.svg';
import { i18nCloseAlert } from '../../global/i18n';
import getDocumentLang from '../../global/helpers/get-document-lang';

let nextId = 0;

/**
 * @slot icon - Pass a svg to display an icon left to the title.
 * @slot content - Pass html-content to show as the content of the alert.
 */
@Component({
  shadow: true,
  styleUrl: 'sbb-alert.scss',
  tag: 'sbb-alert',
})
export class SbbAlert {
  @Prop({
    attribute: 'id',
    reflect: true,
  })
  public internalId = `sbb-alert-${++nextId}`;

  /**
   * Whether the alert is readonly.
   * In readonly mode, there is no dismiss button offered to the user.
   */
  @Prop({ reflect: true }) public readonly = false;

  /** You can choose between `m` or `l` size. */
  @Prop() public size: InterfaceAlertAttributes['size'] = 'm';

  /** Whether the fade in animation should be disabled. */
  @Prop() public disableAnimation = false;

  /**
   * Aria-live politeness defines how to announce the alert to the user.
   * Choose between `off`, `polite` and `assertive`.
   * As the role `alert` is applied too, default is `assertive`.
   */
  @Prop()
  public ariaLivePoliteness: InterfaceAlertAttributes['ariaLivePoliteness'] = 'assertive';

  /** Emits when the fade in animation starts. */
  @Event({
    eventName: 'sbb-alert_will-present',
  })
  public willPresent: EventEmitter<void>;

  /** Emits when the fade in animation ends and the button is displayed. */
  @Event({
    eventName: 'sbb-alert_did-present',
  })
  public didPresent: EventEmitter<void>;

  /** Emits when the alert was hidden. */
  @Event({
    eventName: 'sbb-alert_did-dismiss',
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
        once: true,
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

    this._alertElement.addEventListener('transitionend', this._onOpacityTransitionEnd.bind(this), {
      once: true,
    });
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
    const a11yCloseAlert = i18nCloseAlert[this._currentLanguage];

    return (
      <Host role="alert" aria-live={this.ariaLivePoliteness}>
        <div
          class="sbb-alert__transition-wrapper"
          ref={(el): void => {
            this._transitionWrapperElement = el;
          }}
        >
          <div
            class={{
              'sbb-alert': true,
              [`sbb-alert--size-${this.size}`]: true,
            }}
            ref={(el): void => {
              const isFirstInitialization = !this._alertElement;

              this._alertElement = el;
              if (isFirstInitialization) {
                this._initFadeInTransitionStyles();
              }
            }}
          >
            <span class="sbb-alert__icon" aria-hidden="true">
              <slot name="icon">
                <span innerHTML={infoIcon} />
              </slot>
            </span>
            <span class="sbb-alert__content">
              <slot />
            </span>
            {!this.readonly && (
              <span class="sbb-alert__close-button-wrapper">
                <sbb-button
                  variant="transparent-negative"
                  icon={true}
                  size="m"
                  onClick={this.dismiss.bind(this)}
                  iconDescription={a11yCloseAlert}
                  aria-controls={this.internalId}
                  class="sbb-alert__close-button"
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
