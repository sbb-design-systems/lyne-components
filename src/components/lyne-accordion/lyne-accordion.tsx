import {
  Component,
  h
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

  public render(): JSX.Element {

    return (
      <div>
        <slot />
      </div>
    );
  }
}
