import {
  Component,
  h,
  Prop
} from '@stencil/core';

@Component({
  shadow: true,
  styleUrls: {
    default: 'styles/lyne-input-error.default.scss',
    shared: 'styles/lyne-input-error.shared.scss'
  },
  tag: 'lyne-input-error'
})

export class LyneInputError {

  /** The error message, we want to show. */
  @Prop() public message?: string;

  /**
   * Each error message needs a unique id
   * which will be passed on from another
   * module (e.g. lyne-text-input).
   */
  @Prop() public messageId?: string;

  public render(): JSX.Element {
    return (
      <span
        class='input-label--error'
        id={`${this.messageId}`}
      >
        {this.message}
      </span>
    );
  }
}
