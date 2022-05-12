import {
  Component, ComponentInterface, Element, Event, EventEmitter, h, Host, Method, Prop
} from '@stencil/core';
import { InterfaceLyneToastAttributes } from './lyne-toast.custom';
import {
  InterfaceOverlay, InterfaceOverlayEventDetail
} from '../../global/core/components/overlay/overlays-interface';
import {
  dismiss, eventMethod, prepareOverlay, present
} from '../../global/core/components/overlay/overlay';
import { toastEnterAnimation } from './animations/toast.enter';
import { toastLeaveAnimation } from './animations/toast.leave';
import {
  CssClassMap, getClassList
} from '../../global/helpers/get-class-list';

/*
 * FIXME to remove
 */
import getMarkupForSvg from '../../global/helpers/get-markup-for-svg';

type InterfaceToastType = 'link' | 'action' | 'icon';

interface InterfaceToastCommonAction {
  type: InterfaceToastType;
  role: 'cancel' | string;
  cssClass?: string | string[];
}

interface InterfaceToastLink extends InterfaceToastCommonAction {
  type: 'link';
  label: string;
  href: string;
}

interface InterfaceToastAction extends InterfaceToastCommonAction {
  type: 'action';
  label: string;
  handler: () => void;
}

interface InterfaceToastIcon extends InterfaceToastCommonAction {
  type: 'icon';
}

export interface InterfaceToastConfiguration {
  message: string;
  timeout?: number;
  icon?: string | HTMLElement;
  iconTemplate?: string;
  action?: InterfaceToastLink | InterfaceToastAction | InterfaceToastIcon;
  verticalPosition?: InterfaceLyneToastAttributes['verticalPosition'];
  horizontalPosition?: InterfaceLyneToastAttributes['horizontalPosition'];
  politeness?: 'off' | 'assertive' | 'polite';
}

@Component({
  shadow: true,
  styleUrls: {
    default: 'styles/lyne-toast.default.scss',
    shared: 'styles/lyne-toast.shared.scss'
  },
  tag: 'lyne-toast'
})

export class LyneToast implements ComponentInterface, InterfaceOverlay {

  public animated = false;
  public presented: boolean;

  @Prop() public overlayIndex: number;

  @Prop() public keyboardClose = false;

  @Prop() public config: InterfaceToastConfiguration;

  @Element() public el!: HTMLLyneToastElement;

  @Event({
    eventName: 'lyne-toast_did-dismiss'
  }) public didDismiss: EventEmitter<InterfaceOverlayEventDetail>;

  @Event({
    eventName: 'lyne-toast_did-present'
  }) public didPresent: EventEmitter<void>;

  @Event({
    eventName: 'lyne-toast_will-dismiss'
  }) public willDismiss: EventEmitter<InterfaceOverlayEventDetail>;

  @Event({
    eventName: 'lyne-toast_will-present'
  }) public willPresent: EventEmitter<void>;

  private _durationTimeout: NodeJS.Timeout;

  private _defaultConfig: InterfaceToastConfiguration = {
    horizontalPosition: 'center',
    message: null,
    politeness: 'polite',
    timeout: 6000,
    verticalPosition: 'bottom'
  };

  private _hasIconSlot: boolean;

  public connectedCallback(): void {
    this.config = {
      ...this._defaultConfig,
      ...this.config
    };
    prepareOverlay(this.el);
  }

  public componentWillLoad(): void {
    this._hasIconSlot = Boolean(this.el.querySelector('[slot="icon"]'));
  }

  @Method()
  public async present(): Promise<void> {
    await present(this, toastEnterAnimation, this.config.verticalPosition);
    if (this.config.timeout > 0) {
      this._durationTimeout = setTimeout(() => this.dismiss(undefined, 'timeout'), this.config.timeout);
    }
  }

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
    return eventMethod(this.el, 'lyne-toast_did-dismiss');
  }

  /**
   * Returns a promise that resolves when the toast will dismiss.
   */
  @Method()
  public onWillDismiss<T = any>(): Promise<InterfaceOverlayEventDetail<T>> {
    return eventMethod(this.el, 'lyne-toast_will-dismiss');
  }

  private _renderActionCommonButton(onClickFn: () => Promise<boolean>, innerToastEl: JSX.Element): JSX.Element {
    return (
      <button type='button' tabIndex={0} onClick={onClickFn} part='button' role={this.config.action.role} class={this._buttonClass()}>
        {innerToastEl}
      </button>
    );
  }

  private _buttonClass(): CssClassMap {
    const fn: (acc: CssClassMap, curr: string) => CssClassMap = (acc: CssClassMap, curr: string) => {
      acc[curr] = true;

      return acc;
    };

    const classArray: string[] = getClassList(this.config.action.cssClass);

    return {
      'lyne-focusable': true,
      'toast-button': true,
      ...classArray.reduce(fn, {})
    };
  }

  private _handleButtonClick(action: InterfaceToastAction): Promise<boolean> {
    try {
      action.handler();
    } catch (e) {
      console.error(e);
    }

    return this.dismiss(undefined, action.role);
  }

  private _renderAction(): JSX.Element {

    switch (this.config.action.type) {
      case 'link': {
        return (
          <a class='lyne-focusable' href={this.config.action.href} target='_blank' tabIndex={0} role={this.config.action.role}>
            {this.config.action.label}
          </a>
        );

      }
      case 'action': {
        const innerElement = <span>{this.config.action.label}</span>;
        const clickFn = this._handleButtonClick.bind(this, this.config.action);

        return this._renderActionCommonButton(clickFn, innerElement);
      }
      case 'icon': {
        const innerElement = <span innerHTML={getMarkupForSvg('cross-small').outerHTML}/>;
        const clickFn = this.dismiss.bind(this, null, 'cancel');

        return this._renderActionCommonButton(clickFn, innerElement);
      }
      default:
        throw new Error('Invalid action!');
    }
  }

  public render(): JSX.Element {
    let actionContent: JSX.Element;
    let role = 'status';

    if (this.config.action) {
      role = 'dialog';
      actionContent = this._renderAction();
    }

    let iconTemplate = '';

    if (typeof this.config.icon === 'string') {
      iconTemplate = <span class='toast-icon' innerHTML={this.config.icon}/>;
    } else if (this._hasIconSlot) {
      iconTemplate = <span class='toast-icon'><slot name='icon'/></span>;
    }

    return (
      <Host aria-live={this.config.politeness} aria-atomic='true' role={role} tabindex='-1' class='overlay-hidden'>
        <div class='toast-wrapper'>
          <div class={`toast toast-${this.config.verticalPosition} toast-${this.config.horizontalPosition}`}>
            {iconTemplate}
            <span class='toast-text'>
              {this.config.message}
            </span>
            {
              actionContent &&
              <span class='toast-action'>
                {actionContent}
              </span>
            }
          </div>
        </div>
      </Host>
    );
  }
}
