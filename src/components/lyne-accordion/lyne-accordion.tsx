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
   * Set this if you want to render the light variant of the accordion.
   * This is only allowed on non-white backgrounds.
   */
  @Prop() public light?: boolean;

  public render(): JSX.Element {

    const lightClass = this.light
      ? ' accordion--light'
      : '';

    return (
      <div class={`accordion${lightClass}`}>
        <slot />
      </div>
    );
  }
}
