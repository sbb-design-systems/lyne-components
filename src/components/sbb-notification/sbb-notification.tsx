import {
  Component,
  ComponentInterface,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  JSX,
  Method,
  Prop,
  State,
} from '@stencil/core';
import { InterfaceTitleAttributes } from '../sbb-title/sbb-title.custom';
import { i18nCloseNotification } from '../../global/i18n';
import {
  createNamedSlotState,
  documentLanguage,
  HandlerRepository,
  languageChangeHandlerAspect,
  namedSlotChangeHandlerAspect,
} from '../../global/helpers';
import { InterfaceNotificationAttributes } from './sbb-notification.custom';
import { AgnosticResizeObserver as ResizeObserver } from '../../global/helpers/resize-observer';

const notificationTypes = new Map([
  ['info', 'circle-information-small'],
  ['success', 'circle-tick-small'],
  ['warn', 'circle-exclamation-point-small'],
  ['error', 'circle-cross-small'],
]);

/**
 * @slot title - Use this to provide a notification title (optional).
 * @slot unnamed - Use this to provide the notification message.
 */
@Component({
  shadow: true,
  styleUrl: 'sbb-notification.scss',
  tag: 'sbb-notification',
})
export class SbbNotification implements ComponentInterface {
  /**
   * The type of the notification.
   */
  @Prop({ reflect: true }) public type?: InterfaceNotificationAttributes['type'] = 'info';

  /**
   * Content of title.
   */
  @Prop() public titleContent?: string;

  /**
   * Level of title, will be rendered as heading tag (e.g. h3). Defaults to level 3.
   */
  @Prop() public titleLevel: InterfaceTitleAttributes['level'] = '3';

  /**
   * Whether the notification is readonly.
   * In readonly mode, there is no dismiss button offered to the user.
   */
  @Prop({ reflect: true }) public readonly = false;

  /**
   * Whether the animation is enabled.
   */
  @Prop({ reflect: true }) public disableAnimation = false;

  /**
   * State of listed named slots, by indicating whether any element for a named slot is defined.
   */
  @State() private _namedSlots = createNamedSlotState('title');

  /**
   * The state of the notification.
   */
  @State() private _state: 'closed' | 'opening' | 'opened' | 'closing' = 'opened';

  @State() private _currentLanguage = documentLanguage();

  @State() private _resizeDisableAnimation = false;

  @Element() private _element!: HTMLElement;

  private _notificationElement: HTMLElement;
  private _resizeObserverTimeout: ReturnType<typeof setTimeout> | null = null;
  private _notificationResizeObserver = new ResizeObserver(() => this._onNotificationResize());

  /**
   * Emits whenever the notification starts the opening transition.
   */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'will-open',
  })
  public willOpen: EventEmitter<void>;

  /**
   * Emits whenever the notification is opened.
   */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'did-open',
  })
  public didOpen: EventEmitter<void>;

  /**
   * Emits whenever the notification begins the closing transition.
   */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'will-close',
  })
  public willClose: EventEmitter<void>;

  /**
   * Emits whenever the notification is closed.
   */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'did-close',
  })
  public didClose: EventEmitter<void>;

  @Method()
  public async close(): Promise<void> {
    if (this._state === 'opened') {
      this._state = 'closing';
      this.willClose.emit();
      this.disableAnimation && this._handleClosing();
    }
  }

  private _handlerRepository = new HandlerRepository(
    this._element,
    languageChangeHandlerAspect((l) => (this._currentLanguage = l)),
    namedSlotChangeHandlerAspect((m) => (this._namedSlots = m(this._namedSlots)))
  );

  public connectedCallback(): void {
    this._handlerRepository.connect();
    this._element.querySelectorAll('sbb-link')?.forEach((link) => (link.variant = 'inline'));
  }

  public componentDidLoad(): void {
    this.willOpen.emit();
    this._setNotificationHeight();
  }

  public disconnectedCallback(): void {
    this._handlerRepository.disconnect();
    this._notificationResizeObserver.disconnect();
  }

  private _setNotificationHeight(): void {
    const notificationHeight =
      this._notificationElement.scrollHeight && !this.disableAnimation
        ? `${this._notificationElement.scrollHeight}px`
        : 'auto';
    this._element.style.setProperty('--sbb-notification-height', notificationHeight);
  }

  private _onNotificationResize(): void {
    if (this._state !== 'opened') {
      return;
    }

    clearTimeout(this._resizeObserverTimeout);

    this._resizeDisableAnimation = true;
    this._setNotificationHeight();

    // Disable the animation when resizing the notification to avoid strange height transition effects.
    this._resizeObserverTimeout = setTimeout(() => (this._resizeDisableAnimation = false), 150);
  }

  private _onNotificationTransitionEnd(event: TransitionEvent): void {
    if (this._state === 'closing' && event.propertyName === 'max-height') {
      this._handleClosing();
    }
  }

  private _onNotificationAnimationEnd(event: AnimationEvent): void {
    if (this._state === 'opened' && event.animationName === 'open') {
      this._handleOpening();
    }
  }

  private _handleOpening(): void {
    this._state = 'opened';
    this.didOpen.emit();
    this._notificationResizeObserver.observe(this._notificationElement);
  }

  private _handleClosing(): void {
    this._state = 'closed';
    this.didClose.emit();
    this._notificationResizeObserver.unobserve(this._notificationElement);
    this._element.remove();
  }

  public render(): JSX.Element {
    const hasTitle = !!this.titleContent || this._namedSlots['title'];

    return (
      <Host
        data-state={this._state}
        data-resize-disable-animation={this._resizeDisableAnimation}
        data-has-title={hasTitle}
      >
        <div
          class="sbb-notification__wrapper"
          ref={(el) => (this._notificationElement = el)}
          onTransitionEnd={(event) => this._onNotificationTransitionEnd(event)}
          onAnimationEnd={(event) => this._onNotificationAnimationEnd(event)}
        >
          <div class="sbb-notification">
            <sbb-icon class="sbb-notification__icon" name={notificationTypes.get(this.type)} />

            <span class="sbb-notification__content">
              {hasTitle && (
                <sbb-title class="sbb-notification__title" level={this.titleLevel} visualLevel="5">
                  <slot name="title">{this.titleContent}</slot>
                </sbb-title>
              )}
              <slot />
            </span>

            {!this.readonly && (
              <span class="sbb-notification__close-wrapper">
                <sbb-divider class="sbb-notification__divider" orientation="vertical" />
                <sbb-button
                  variant="secondary"
                  size="m"
                  icon-name="cross-small"
                  onClick={() => this.close()}
                  aria-label={i18nCloseNotification[this._currentLanguage]}
                  class="sbb-notification__close"
                />
              </span>
            )}
          </div>
        </div>
      </Host>
    );
  }
}
