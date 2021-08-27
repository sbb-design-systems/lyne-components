import {
  Component,
  h,
  Prop
} from '@stencil/core';

/**
 * @slot unnamed - Place lyne-accordion-item elements in the slot
 */

@Component({
  shadow: true,
  styleUrl: 'lyne-accordion.scss',
  tag: 'lyne-accordion'
})

export class LyneAccordion {

  /**
   * Set this if you want to use the accordion on a non-white background.
   */
  @Prop() public nonWhiteBackground?: boolean;

  public render(): JSX.Element {

    const nonWhite = this.nonWhiteBackground
      ? ' accordion--non-white'
      : '';

    return (
      <div class={`accordion${nonWhite}`}>
        <slot />
      </div>
    );
  }
}
