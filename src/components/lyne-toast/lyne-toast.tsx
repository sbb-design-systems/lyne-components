import {
  Component, ComponentInterface, Element, Event, EventEmitter, h, Host, Method, Prop
} from '@stencil/core';
import { InterfaceLyneToastAttributes } from './lyne-toast.custom';
import {
  InterfaceOverlay, InterfaceOverlayEventDetail
} from '../../global/core/components/overlay/overlays-interface';
import {
  dismiss, prepareOverlay, present
} from '../../global/core/components/overlay/overlay';
import { toastEnterAnimation } from './animations/toast.enter';
import { toastLeaveAnimation } from './animations/toast.leave';

export interface InterfaceToastAction {
  label: string;
  action: () => void;
}

export interface InterfaceToastLink {
  label: string;
  link: string;
}

export interface InterfaceToastConfiguration {
  message: string;
  timeout?: number;
  icon?: string | HTMLElement;
  iconTemplate?: string;
  action?: 'close' | InterfaceToastAction | InterfaceToastLink;
  verticalPosition?: InterfaceLyneToastAttributes['verticalPosition'];
  horizontalPosition?: InterfaceLyneToastAttributes['horizontalPosition'];
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
  public keyboardClose: boolean;
  public presented: boolean;

  @Prop() public overlayIndex: number;

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
    timeout: 3000,
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

  public render(): JSX.Element {
    let actionContent;
    let role = 'status';

    /*
     * FIXME
     */
    if (this.config.action) {
      role = 'dialog';
      if (typeof this.config.action === 'string') {
        actionContent = (<button onClick={this.dismiss.bind(this)}>x</button>);
      } else if ('action' in this.config.action) {
        actionContent = (<button onClick={this._executeAction.bind(this, this.config.action)}>Action</button>);
      } else if ('link' in this.config.action) {
        actionContent = (<button onClick={this._openLink.bind(this, this.config.action)}>Link</button>);
      } else {
        actionContent = (<span>Config error</span>);
      }
    }

    let iconTemplate = '';

    if (typeof this.config.icon === 'string') {
      iconTemplate = <span class='icon' innerHTML={this.config.icon}/>;
    } else if (this._hasIconSlot) {
      iconTemplate = <span class='icon'><slot name='icon'/></span>;
    }

    return (
      <Host aria-live='polite' aria-atomic='true' role={role}>
        <div class='toast-wrapper'>
          <div class={`toast ${this.config.verticalPosition} ${this.config.horizontalPosition}`}>
            {iconTemplate}
            <span class='text'>
              {this.config.message}
            </span>
            <span class='action'>
              {actionContent}
            </span>
          </div>
        </div>
      </Host>
    );
  }

  private _executeAction($event: InterfaceToastAction): void {
    $event.action();
  }

  private _openLink($event: InterfaceToastLink): void {
    window.open($event.link, '_blank');
  }

}
