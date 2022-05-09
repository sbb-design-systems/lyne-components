import {
  Component, ComponentInterface, Element, Event, EventEmitter, h, Method, Prop
} from '@stencil/core';
import {
  InterfaceOverlay, InterfaceOverlayEventDetail
} from './overlays-interface';
import {
  dismiss, prepareOverlay, present
} from './overlay';
import { createAnimation } from '../animations/animation';

@Component({
  shadow: true,
  tag: 'lyne-overlay'
})
export class LyneOverlay implements ComponentInterface, InterfaceOverlay {

  public animated = false;
  public keyboardClose: boolean;
  public presented: boolean;
  @Element() public el!: HTMLLyneOverlayElement;
  @Prop() public overlayIndex: number;
  @Event() public didDismiss: EventEmitter<InterfaceOverlayEventDetail>;
  @Event() public didPresent: EventEmitter<void>;
  @Event() public willDismiss: EventEmitter<InterfaceOverlayEventDetail>;
  @Event() public willPresent: EventEmitter<void>;

  public connectedCallback(): void {
    prepareOverlay(this.el);
  }

  @Method()
  public dismiss(data?: any, role?: string): Promise<boolean> {
    return dismiss(this, data, role, createAnimation);
  }

  @Method()
  public async present(): Promise<void> {
    await present(this, createAnimation);
  }

  public render(): JSX.Element {
    return (<div class='overlay-class'>Overlay</div>);
  }
}
