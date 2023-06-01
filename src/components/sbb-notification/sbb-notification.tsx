import {
  Component,
  ComponentInterface,
  Element,
  Event,
  EventEmitter,
  h,
  JSX,
  Method,
  Prop,
  State,
  Watch,
} from '@stencil/core';
import { InterfaceTitleAttributes } from '../sbb-title/sbb-title.custom';
import { i18nCloseNotification } from '../../global/i18n';
import {
  documentLanguage,
  HandlerRepository,
  languageChangeHandlerAspect,
} from '../../global/helpers';
import { InterfaceNotificationAttributes } from './sbb-notification.custom';

enum NotificationIconName {
  info = 'circle-information-small',
  success = 'circle-tick-small',
  warn = 'sign-exclamation-point-small',
  error = 'sign-x-small',
}

/**
 * @slot unnamed - Use this to document a slot.
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
   * The variant of the notification.
   */
  @Prop({ reflect: true }) public variant?: InterfaceNotificationAttributes['variant'] = 'default';

  /**
   * Content of title.
   */
  @Prop() public titleContent?: string;

  /**
   * Level of title, will be rendered as heading tag (e.g. h3). Defaults to level 3.
   */
  @Prop() public titleLevel: InterfaceTitleAttributes['level'] = '3';

  /**
   * Whether the alert is readonly.
   * In readonly mode, there is no dismiss button offered to the user.
   */
  @Prop({ reflect: true }) public readonly = false;

  /**
   * Whether the animation is enabled.
   */
  @Prop({ reflect: true }) public disableAnimation = false;

  @Element() private _element!: HTMLElement;

  @State() private _iconName: NotificationIconName = NotificationIconName[this.type];

  @State() private _negative = this.variant === 'colorful' && this.type === 'warn';

  @State() private _currentLanguage = documentLanguage();

  @Method()
  public async close(): Promise<void> {
    console.log('Close!');
  }

  @Watch('variant')
  @Watch('type')
  public updateNotificationState(): void {
    this._iconName = NotificationIconName[this.type];
    this._negative = this.variant === 'colorful' && this.type === 'warn';
  }

  /**
   * Emits whenever the content section starts the opening transition.
   */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'will-open',
  })
  public willOpen: EventEmitter<void>;

  /**
   * Emits whenever the content section is opened.
   */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'did-open',
  })
  public didOpen: EventEmitter<void>;

  /**
   * Emits whenever the content section begins the closing transition.
   */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'will-close',
  })
  public willClose: EventEmitter<void>;

  /**
   * Emits whenever the content section is closed.
   */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'did-close',
  })
  public didClose: EventEmitter<void>;

  private _handlerRepository = new HandlerRepository(
    this._element,
    languageChangeHandlerAspect((l) => (this._currentLanguage = l))
  );

  public connectedCallback(): void {
    this._handlerRepository.connect();
  }

  public disconnectedCallback(): void {
    this._handlerRepository.disconnect();
  }

  public render(): JSX.Element {
    return (
      <div class="sbb-notification">
        <sbb-icon class="sbb-notification__icon" name={this._iconName} />
        <sbb-title class="sbb-notification__title" level={this.titleLevel} visualLevel="5">
          <slot name="title">{this.titleContent}</slot>
        </sbb-title>
        <slot />
        <span class="sbb-notification__close-wrapper">
          <sbb-divider orientation="vertical"></sbb-divider>
          <sbb-button
            variant="transparent"
            negative={this._negative}
            size="m"
            icon-name="cross-small"
            onClick={() => this.close()}
            aria-label={i18nCloseNotification[this._currentLanguage]}
            class="sbb-notification__close"
          />
        </span>
      </div>
    );
  }
}
