import {
  Component,
  ComponentInterface,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Listen,
  Method,
  Prop,
} from '@stencil/core';
import crossSmall from 'lyne-icons/dist/icons/cross-small.svg';
import { AnimationBuilder } from '../../global/core/components/animations/animation-interface';
import {
  dismiss,
  eventMethod,
  prepareOverlay,
  present,
} from '../../global/core/components/overlay/overlay';
import {
  InterfaceOverlay,
  InterfaceOverlayEventDetail,
} from '../../global/core/components/overlay/overlays-interface';
import { getClassList } from '../../global/helpers/get-class-list';
import { StringSanitizer } from '../../global/helpers/sanitization/string-sanitizer';
import { DEFAULT_Z_INDEX_TOAST } from '../../global/z-index-list';
import { toastEnterAnimation } from './animations/sbb-toast.enter';
import { toastLeaveAnimation } from './animations/sbb-toast.leave';
import { InterfaceToastAction, InterfaceToastConfiguration } from './sbb-toast.custom';

@Component({
  shadow: true,
  styleUrl: 'sbb-toast.scss',
  tag: 'sbb-toast',
})
export class SbbToast implements ComponentInterface, InterfaceOverlay {
  /**
   * Used to avoid dismissal if presenting is ongoing, and vice-versa.
   */
  public presented: boolean;

  /**
   * @internal
   * Internal z-index of the toast;
   * it's set by adding 1 to the default value for each instance.
   */
  @Prop() public overlayIndex: number;

  /**
   * Indicates whether the toast will play enter-leave animations.
   */
  @Prop() public disableAnimation = false;

  /**
   * Indicates whether the keyboard is automatically
   * dismissed when the overlay is presented.
   */
  @Prop() public keyboardClose = false;

  /**
   * Exposed toast configuration.
   */
  @Prop() public config: InterfaceToastConfiguration;

  /**
   * The animation used when the toast is presented.
   */
  @Prop() public enterAnimation?: AnimationBuilder;

  /**
   * The animation used when the toast is dismissed.
   */
  @Prop() public leaveAnimation?: AnimationBuilder;

  /**
   * The internal toast element.
   */
  @Element() public el!: HTMLSbbToastElement;

  /**
   * Emitted after the toast has dismissed.
   */
  @Event({
    eventName: 'sbb-toast_did-dismiss',
  })
  public didDismiss: EventEmitter<InterfaceOverlayEventDetail>;

  /**
   * Emitted after the toast has presented.
   */
  @Event({
    eventName: 'sbb-toast_did-present',
  })
  public didPresent: EventEmitter<void>;

  /**
   * Emitted before the toast has dismissed.
   */
  @Event({
    eventName: 'sbb-toast_will-dismiss',
  })
  public willDismiss: EventEmitter<InterfaceOverlayEventDetail>;

  /**
   * Emitted before the toast has presented.
   */
  @Event({
    eventName: 'sbb-toast_will-present',
  })
  public willPresent: EventEmitter<void>;

  /**
   * @internal
   * Internal timeout.
   */
  private _durationTimeout: ReturnType<typeof setTimeout>;

  /**
   * @internal
   * Internal toast configuration;
   * value is merged between the default and the public one.
   */
  private _internalConfig: InterfaceToastConfiguration;

  /**
   * Used to check if the icon slot needs to be rendered.
   */
  private _hasIconSlot: boolean;

  /**
   * Set up the configuration and prepare the overlay.
   */
  public connectedCallback(): void {
    const defaultConfig: InterfaceToastConfiguration = {
      ariaLivePoliteness: 'polite',
      horizontalPosition: 'center',
      message: null,
      timeout: 6000,
      verticalPosition: 'end',
    };

    this._internalConfig = {
      ...defaultConfig,
      ...this.config,
    };
    prepareOverlay(this.el);
  }

  /**
   * Evaluate if the icon slot is provided by consumers.
   */
  public componentWillLoad(): void {
    this._hasIconSlot = Boolean(this.el.querySelector('[slot="icon"]'));
  }

  /**
   * Present the toast overlay after it has been created.
   */
  @Method()
  public async present(): Promise<void> {
    await present(this, toastEnterAnimation);
    if (this._internalConfig.timeout > 0) {
      this._durationTimeout = setTimeout(
        () => this.dismiss(undefined, 'timeout'),
        this._internalConfig.timeout
      );
    }
  }

  /**
   * Dismiss the toast overlay after it has been presented.
   *
   * @param data Any data to emit in the dismiss events.
   * @param role The role of the element that is dismissing the toast.
   * Example:
   * `"cancel"` for close icon
   * `"timeout"` for auto-close
   */
  @Method()
  public dismiss(data?: any, role?: string): Promise<boolean> {
    if (this._durationTimeout) {
      clearTimeout(this._durationTimeout);
    }

    return dismiss(this, data, role, toastLeaveAnimation);
  }

  /**
   * Returns a promise that resolves when the toast did dismiss.
   */
  @Method()
  public onDidDismiss<T = any>(): Promise<InterfaceOverlayEventDetail<T>> {
    return eventMethod(this.el, 'sbb-toast_did-dismiss');
  }

  /**
   * Returns a promise that resolves when the toast will dismiss.
   */
  @Method()
  public onWillDismiss<T = any>(): Promise<InterfaceOverlayEventDetail<T>> {
    return eventMethod(this.el, 'sbb-toast_will-dismiss');
  }

  /**
   * Listen to the close icon click event to dismiss the toast.
   * FIXME: can't use constant from sbb-button.events.ts due bug https://github.com/ionic-team/stencil/issues/2924
   */
  @Listen('sbb-button_click')
  public dismissFromCloseIcon(): void {
    this.dismiss(null, 'cancel');
  }

  /**
   * Creates the CSS classes for the action button.
   * @returns A string which contains two default CSS classes and all the CSS classes
   * added by consumers in _internalConfig.action.cssClass.
   */
  private _buttonClass(): string {
    const classArray: string[] = getClassList(this._internalConfig.action.cssClass);

    return `sbb-focusable toast-button ${classArray.join('')}`;
  }

  /**
   * Triggers the action handler and dismiss the toast.
   * @param action The action provided bu consumers in the toast config.
   */
  private _callActionHandlerAndDismiss(action: InterfaceToastAction): Promise<boolean> {
    try {
      action.handler();
    } catch (e) {
      console.error(e);
    }

    return this.dismiss(undefined, action.role);
  }

  /**
   * Renders the action button (link/action/close icon).
   */
  private _renderAction(): JSX.Element {
    console.log('render');
    switch (this._internalConfig.action.type) {
      case 'link': {
        return (
          <span class="toast-action">
            <sbb-link
              class="toast-link sbb-focusable"
              variant="inline-negative"
              hrefValue={this._internalConfig.action.href}
              text={this._internalConfig.action.label}
              role={this._internalConfig.action.role}
              onClick={this.dismiss.bind(this, null, 'link')}
            />
          </span>
        );
      }
      case 'action': {
        return (
          <span class="toast-action">
            <button
              type="button"
              role={this._internalConfig.action.role}
              class={this._buttonClass()}
              onClick={this._callActionHandlerAndDismiss.bind(this, this._internalConfig.action)}
            >
              <span class="toast-label">{this._internalConfig.action.label}</span>
            </button>
          </span>
        );
      }
      case 'icon': {
        return (
          <span class="toast-action toast-action-icon">
            <sbb-button
              variant="transparent-negative"
              icon={true}
              iconDescription="Icon. Close the toast."
              size="m"
              role={this._internalConfig.action.role}
              class={this._buttonClass()}
            >
              <span class="toast-close" innerHTML={crossSmall} />
            </sbb-button>
          </span>
        );
      }
      default:
        throw new Error('Invalid action!');
    }
  }

  public render(): JSX.Element {
    const zIndex = this.overlayIndex + DEFAULT_Z_INDEX_TOAST;
    let actionContent: JSX.Element;
    let role = 'status';
    let tabIndex = '-1';

    if (this._internalConfig.action) {
      role = 'dialog';
      tabIndex = null;
      actionContent = this._renderAction();
    }

    let iconTemplate = '';

    if (typeof this._internalConfig.icon === 'string') {
      iconTemplate = <span class="toast-icon" innerHTML={this._internalConfig.icon} />;
    } else if (this._hasIconSlot) {
      iconTemplate = (
        <span class="toast-icon">
          <slot name="icon" />
        </span>
      );
    }

    let toastClass = `toast toast-vertical-${this._internalConfig.verticalPosition} toast-horizontal-${this._internalConfig.horizontalPosition}`;
    toastClass += this._internalConfig.action.type === 'icon' ? ' toast-icon-wrapper' : ''; // FIXME icon class name

    return (
      <Host
        aria-live={this._internalConfig.ariaLivePoliteness}
        aria-atomic="true"
        role={role}
        tabindex={tabIndex}
        class="overlay-hidden"
        style={{
          zIndex: `${zIndex}`,
        }}
      >
        <div class="toast-wrapper">
          <div class={toastClass}>
            {iconTemplate}
            <span
              class="toast-text"
              innerHTML={StringSanitizer.sanitizeDOMString(this._internalConfig.message)}
            />
            {actionContent && [
              <span class="toast-spacer" />,
              actionContent,
            ]}
          </div>
        </div>
      </Host>
    );
  }
}
