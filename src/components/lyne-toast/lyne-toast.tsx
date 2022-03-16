import {
  Component,
  h,
  Prop
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

  /** Possible variants of the component: can be with single text row or multiple ones */
  @Prop() public variant?: InterfaceLyneToastAttributes['variant'];

  @Prop() public size?: InterfaceLyneToastAttributes['size'] = 'large';

  @Prop() public text: string;

  @Prop() public icon?: string;

  @Prop() public undoable: InterfaceLyneToastAttributes['undoable'] = 'none';

  /** Hide the toast after defined milliseconds. */
  @Prop() public timeout = 3000;

  /** Where the toast should be displayed vertically. Defaults to 'bottom'. */
  verticalPosition?: 'top' | 'bottom' = 'bottom';
  /** Where the toast should be displayed horizontally. Defaults to 'center'. */
  horizontalPosition?: 'left' | 'center' | 'right' | 'start' | 'end' = 'center';

  public render(): JSX.Element {
    return (
      <div class={this.size}>
        <span class="icon"></span>
        <span class="text">
          {this.text}
        </span>
        <span class="action"></span>
      </div>
    );
  }
}
