import { Component, h, Prop } from '@stencil/core';
import errorIcon from './assets/error_icon.svg';

@Component({
  shadow: true,
  styleUrls: {
    default: 'styles/sbb-input-error.default.scss',
    shared: 'styles/sbb-input-error.shared.scss',
  },
  tag: 'sbb-input-error',
})
export class SbbInputError {
  /** The error message, we want to show. */
  @Prop() public message!: string;

  /**
   * Adding the aria-hidden attribute here might
   * seem to be very wrong. Since we are including
   * the message inside of the aria-label value
   * of the label element, we need to hide it from
   * assistive technology in this location. By doing
   * so, we can improve the user flow through the
   * form, especially on Voice Over on iOS which
   * would otherwise stop at and read all elements
   * individually.
   */

  public render(): JSX.Element {
    return (
      <span aria-hidden="true" class="input-label-error">
        <span class="input-label-error__icon" innerHTML={errorIcon}></span>
        {this.message}
      </span>
    );
  }
}
