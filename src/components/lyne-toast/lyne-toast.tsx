import {
  Component,
  h,
  Prop,
  State
} from '@stencil/core';
import { InterfaceLyneToastAttributes } from './lyne-toast.custom.d';

/**
 * @slot unnamed - Use this to document a slot.
 */

@Component({
  shadow: true,
  styleUrls: {
    default: 'styles/lyne-toast.default.scss',
    shared: 'styles/lyne-toast.shared.scss'
  },
  tag: 'lyne-toast'
})

export class LyneToast {

  @Prop() public size?: InterfaceLyneToastAttributes['size'] = 'large';

  /** Message to display. */
  @Prop() public message!: string;

  /** Id of <template> to use for the icon. */
  @Prop() public iconTemplate?: string;

  /** Either SVG string or reference to a SVG element. */
  @Prop() public icon?: string | HTMLElement;

  /** TODO: set open state from outside the component */
  @Prop({
    reflect: true
  }) public open?: boolean = true;

  @State() private _openClass: string;

  /** Action configuration. */
  @Prop() public action?: 'close' | { label: string; action: () => void } | { label: string; link: string };

  /** Hide the toast after defined milliseconds. */
  @Prop() public timeout = 3000;

  /** Where the toast should be displayed vertically. Defaults to 'bottom'. */
  @Prop() public verticalPosition?: InterfaceLyneToastAttributes['verticalPosition'] = 'bottom';

  /** Where the toast should be displayed horizontally. Defaults to 'center'. */
  @Prop() public horizontalPosition?: InterfaceLyneToastAttributes['horizontalPosition'] = 'center';

  private _closeToast(): void {
    this.open = false;
  }

  public render(): JSX.Element {
    this._openClass = this.open
    ? 'toast-item--visible'
    : 'toast-item--hidden';

    return (
      <div class="toast-wrapper">
        <div class={`toast ${this.verticalPosition} ${this.horizontalPosition} ${this._openClass}`}>
          <span class='icon'>
            <slot name='icon'></slot>
          </span>
          <span class='text'>
            {this.message}
          </span>
          <span class='action' onClick={(): void => this._closeToast()}>Undo</span>
        </div>
      </div>
    );
  }
}
