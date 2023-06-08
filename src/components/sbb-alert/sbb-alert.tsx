import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  JSX,
  Method,
  Prop,
  ComponentInterface,
  Fragment,
  State,
} from '@stencil/core';
import { InterfaceAlertAttributes } from './sbb-alert.custom';
import { i18nCloseAlert, i18nFindOutMore } from '../../global/i18n';
import { LinkProperties, LinkTargetType } from '../../global/interfaces/link-button-properties';
import { InterfaceTitleAttributes } from '../sbb-title/sbb-title.custom';
import {
  documentLanguage,
  HandlerRepository,
  languageChangeHandlerAspect,
} from '../../global/helpers';

/**
 * @slot icon - Should be a sbb-icon which is displayed next to the title. Styling is optimized for icons of type HIM-CUS.
 * @slot title - Title content.
 * @slot unnamed - Content of the alert.
 */
@Component({
  shadow: true,
  styleUrl: 'sbb-alert.scss',
  tag: 'sbb-alert',
})
export class SbbAlert implements ComponentInterface, LinkProperties {
  /**
   * Whether the alert is readonly.
   * In readonly mode, there is no dismiss button offered to the user.
   */
  @Prop({ reflect: true }) public readonly = false;

  /** You can choose between `m` or `l` size. */
  @Prop({ reflect: true }) public size: InterfaceAlertAttributes['size'] = 'm';

  /** Whether the fade in animation should be disabled. */
  @Prop() public disableAnimation = false;

  /**
   * Name of the icon which will be forward to the nested `sbb-icon`.
   * Choose the icons from https://icons.app.sbb.ch.
   * Styling is optimized for icons of type HIM-CUS.
   */
  @Prop() public iconName?: string;

  /** Content of title. */
  @Prop() public titleContent?: string;

  /** Level of title, will be rendered as heading tag (e.g. h3). Defaults to level 3. */
  @Prop() public titleLevel: InterfaceTitleAttributes['level'] = '3';

  /** Content of the link. */
  @Prop() public linkContent?: string;

  /** The href value you want to link to. */
  @Prop() public href: string | undefined;

  /** Where to display the linked URL. */
  @Prop() public target: LinkTargetType | string | undefined;

  /** The relationship of the linked URL as space-separated link types. */
  @Prop() public rel: string | undefined;

  /** This will be forwarded as aria-label to the relevant nested element. */
  @Prop() public accessibilityLabel: string | undefined;

  /** Emits when the fade in animation starts. */
  @Event({
    eventName: 'will-present',
  })
  public willPresent: EventEmitter<void>;

  /** Emits when the fade in animation ends and the button is displayed. */
  @Event({
    eventName: 'did-present',
  })
  public didPresent: EventEmitter<void>;

  /** Emits when dismissal of an alert was requested. */
  @Event({
    eventName: 'dismissal-requested',
  })
  public dismissalRequested: EventEmitter<void>;

  @Element() private _element!: HTMLElement;

  @State() private _currentLanguage = documentLanguage();
  private _handlerRepository = new HandlerRepository(
    this._element,
    languageChangeHandlerAspect((l) => (this._currentLanguage = l))
  );

  private _transitionWrapperElement!: HTMLElement;
  private _alertElement!: HTMLElement;

  private _firstRenderingDone = false;

  public connectedCallback(): void {
    this._handlerRepository.connect();
    // Skip very first render where the animation elements are not yet ready.
    // Presentation is postponed to componentDidRender().
    if (this._transitionWrapperElement) {
      this._initFadeInTransitionStyles();
      this._present();
    }
  }

  public disconnectedCallback(): void {
    this._handlerRepository.disconnect();
  }

  public componentDidRender(): void {
    // During the very first rendering, the animation elements are only present in componentDidRender.
    // So we need to fire the fade in animation later than at connectedCallback().
    if (!this._firstRenderingDone) {
      this._present();
    }
    this._firstRenderingDone = true;
  }

  /** Requests dismissal of the alert. */
  @Method() public async requestDismissal(): Promise<void> {
    this.dismissalRequested.emit();
  }

  /** Present the alert. */
  private _present(): Promise<void> {
    this.willPresent.emit();

    if (this.disableAnimation) {
      this._onHeightTransitionEnd();
      return;
    }

    this._transitionWrapperElement.addEventListener(
      'transitionend',
      () => this._onHeightTransitionEnd(),
      {
        once: true,
      }
    );
    this._transitionWrapperElement.style.height = `${this._alertElement.offsetHeight}px`;
  }

  private _initFadeInTransitionStyles(): void {
    if (this.disableAnimation) {
      return;
    }
    this._transitionWrapperElement.style.height = '0';
    this._alertElement.style.opacity = '0';
  }

  private _onHeightTransitionEnd(): void {
    this._transitionWrapperElement.style.removeProperty('height');
    this._alertElement.style.removeProperty('opacity');

    if (this.disableAnimation) {
      this._onOpacityTransitionEnd();
      return;
    }

    this._alertElement.addEventListener('transitionend', () => this._onOpacityTransitionEnd(), {
      once: true,
    });
  }

  private _onOpacityTransitionEnd(): void {
    this.didPresent.emit();
  }

  private _linkProperties(): Record<string, string> {
    return {
      ['aria-label']: this.accessibilityLabel,
      href: this.href,
      rel: this.rel,
      target: this.target,
    };
  }

  public render(): JSX.Element {
    return (
      <div
        class="sbb-alert__transition-wrapper"
        ref={(el): void => {
          this._transitionWrapperElement = el;
        }}
      >
        <div
          class="sbb-alert"
          ref={(el): void => {
            const isFirstInitialization = !this._alertElement;

            this._alertElement = el;
            if (isFirstInitialization) {
              this._initFadeInTransitionStyles();
            }
          }}
        >
          <span class="sbb-alert__icon">
            <slot name="icon">{<sbb-icon name={this.iconName || 'info'} />}</slot>
          </span>
          <span class="sbb-alert__content">
            <sbb-title
              class="sbb-alert__title"
              level={this.titleLevel}
              visual-level={this.size === 'l' ? '3' : '5'}
              negative
            >
              <slot name="title">{this.titleContent}</slot>
            </sbb-title>
            <p class="sbb-alert__content-slot">
              <slot />
            </p>
            {this.href && (
              <Fragment>
                <span aria-hidden="true">&nbsp;</span>
                <sbb-link {...this._linkProperties()} variant="inline" negative>
                  {this.linkContent ? this.linkContent : i18nFindOutMore[this._currentLanguage]}
                </sbb-link>
              </Fragment>
            )}
          </span>
          {!this.readonly && (
            <span class="sbb-alert__close-button-wrapper">
              <sbb-button
                variant="transparent"
                negative
                size="m"
                icon-name="cross-small"
                onClick={() => this.requestDismissal()}
                aria-label={i18nCloseAlert[this._currentLanguage]}
                class="sbb-alert__close-button"
              />
            </span>
          )}
        </div>
      </div>
    );
  }
}
