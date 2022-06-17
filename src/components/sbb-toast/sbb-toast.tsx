import {
  Component, ComponentInterface, Element, Event, EventEmitter, h, Host, Method, Prop
} from '@stencil/core';
import crossSmall from 'lyne-icons/dist/icons/cross-small.svg';
import { AnimationBuilder } from '../../global/core/components/animations/animation-interface';
import {
  dismiss, eventMethod, prepareOverlay, present
} from '../../global/core/components/overlay/overlay';
import {
  InterfaceOverlay, InterfaceOverlayEventDetail
} from '../../global/core/components/overlay/overlays-interface';
import {
  CssClassMap, getClassList
} from '../../global/helpers/get-class-list';
import { StringSanitizer } from '../../global/helpers/sanitization/string-sanitizer';
import { DEFAULT_Z_INDEX_TOAST } from '../../global/z-index-list';
import { toastEnterAnimation } from './animations/sbb-toast.enter';
import { toastLeaveAnimation } from './animations/sbb-toast.leave';
import {
  InterfaceToastAction, InterfaceToastConfiguration
} from './sbb-toast.custom';

@Component({
  shadow: true,
  styleUrls: {
    default: 'styles/sbb-toast.default.scss',
    shared: 'styles/sbb-toast.shared.scss'
  },
  tag: 'sbb-toast'
})

export class SbbToast implements ComponentInterface, InterfaceOverlay {

  /**
   * Used to avoid dismissal if presenting is ongoing, and viceversa.
   */
  public presented: boolean;

  /**
   * @internal
   * Internal z-index of the toast;
   * it's set by adding 1 to the default value for each instance.
   */
  @Prop() public overlayIndex: number;

  /**
   * If `true`, the toast will play enter-leave animations.
   */
  @Prop() public disableAnimation = false;

  /**
   * If `true`, the keyboard will be automatically
   * dismissed when the overlay is presented.
   */
  @Prop() public keyboardClose = false;

  /**
   * Exposed toast configuration.
   */
  @Prop() public config: InterfaceToastConfiguration;

  /**
   * Animation to use when the toast is presented.
   */
  @Prop() public enterAnimation?: AnimationBuilder;

  /**
   * Animation to use when the toast is dismissed.
   */
  @Prop() public leaveAnimation?: AnimationBuilder;

  @Element() public el!: HTMLSbbToastElement;

  /**
   * Emitted after the toast has dismissed.
   */
  @Event({
    eventName: 'sbb-toast_did-dismiss'
  }) public didDismiss: EventEmitter<InterfaceOverlayEventDetail>;

  /**
   * Emitted after the toast has presented.
   */
  @Event({
    eventName: 'sbb-toast_did-present'
  }) public didPresent: EventEmitter<void>;

  /**
   * Emitted before the toast has dismissed.
   */
  @Event({
    eventName: 'sbb-toast_will-dismiss'
  }) public willDismiss: EventEmitter<InterfaceOverlayEventDetail>;

  /**
   * Emitted before the toast has presented.
   */
  @Event({
    eventName: 'sbb-toast_will-present'
  }) public willPresent: EventEmitter<void>;

  /**
   * Internal timeout.
   */
  private _durationTimeout: ReturnType<typeof setTimeout>;

  /**
   * Internal toast configuration;
   * value is merged between the default and the public one.
   */
  private _internalConfig: InterfaceToastConfiguration;

  /**
   * Used to check if the icon slot needs to be rendered.
   */
  private _hasIconSlot: boolean;

  /**
   * Setup the configuration and prepare the overlay.
   */
  public connectedCallback(): void {
    const defaultConfig: InterfaceToastConfiguration = {
      ariaLivePoliteness: 'polite',
      horizontalPosition: 'center',
      message: null,
      timeout: 6000,
      verticalPosition: 'end'
    };

    this._internalConfig = {
      ...defaultConfig,
      ...this.config
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
      this._durationTimeout = setTimeout(() => this.dismiss(undefined, 'timeout'), this._internalConfig.timeout);
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
   * Renders the action/icon button.
   * @param onClickFn Callback on button click.
   * @param innerToastEl The HTML rendered as button content.
   * @returns The button that will be rendered as action/icon.
   */
  private _renderActionCommonButton(onClickFn: () => Promise<boolean>, innerToastEl: JSX.Element): JSX.Element {
    return (
      <button type='button' onClick={onClickFn} role={this._internalConfig.action.role} class={this._buttonClass()}>
        {innerToastEl}
      </button>
    );
  }

  /**
   * Creates the CSS classes for the action button.
   * @returns A CssClassMap with two default CSS classes and all the CSS classes
   * added by consumers in _internalConfig.action.cssClass.
   */
  private _buttonClass(): CssClassMap {
    const fn: (acc: CssClassMap, curr: string) => CssClassMap = (acc: CssClassMap, curr: string) => {
      acc[curr] = true;

      return acc;
    };

    const classArray: string[] = getClassList(this._internalConfig.action.cssClass);

    return {
      'sbb-focusable': true,
      'toast-button': true,
      ...classArray.reduce(fn, {})
    };
  }

  /**
   * Triggers the action handler and dismiss the toast.
   * @param action The action provided bu consumers in the toast config.
   */
  private _handleActionButtonClick(action: InterfaceToastAction): Promise<boolean> {
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

    switch (this._internalConfig.action.type) {
      case 'link': {
        return (
          <a class='toast-link sbb-focusable' href={this._internalConfig.action.href} target='_blank' rel='noreferrer' role={this._internalConfig.action.role} onClick={this.dismiss.bind(this, null, 'link')}>
            {this._internalConfig.action.label}
          </a>
        );

      }
      case 'action': {
        const innerElement = <span class='toast-label'>{this._internalConfig.action.label}</span>;
        const clickFn = this._handleActionButtonClick.bind(this, this._internalConfig.action);

        return this._renderActionCommonButton(clickFn, innerElement);
      }
      case 'icon': {
        const innerElement = <span class='toast-close' innerHTML={crossSmall}/>;
        const clickFn = this.dismiss.bind(this, null, 'cancel');

        return this._renderActionCommonButton(clickFn, innerElement);
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
      iconTemplate = <span class='toast-icon' innerHTML={this._internalConfig.icon}/>;
    } else if (this._hasIconSlot) {
      iconTemplate = <span class='toast-icon'><slot name='icon'/></span>;
    }

    return (
      <Host aria-live={this._internalConfig.ariaLivePoliteness} aria-atomic='true' role={role} tabindex={tabIndex} class='overlay-hidden'
        style={{
          zIndex: `${zIndex}`
        }}>
        <div class='toast-wrapper'>
          <div class={`toast toast-vertical-${this._internalConfig.verticalPosition} toast-horizontal-${this._internalConfig.horizontalPosition}`}>
            {iconTemplate}
            <span class='toast-text' innerHTML={StringSanitizer.sanitizeDOMString(this._internalConfig.message)}/>
            {
              actionContent &&
              [
                <span class='toast-spacer'></span>,
                <span class='toast-action'>
                  {actionContent}
                </span>
              ]
            }
          </div>
        </div>
      </Host>
    );
  }
}
