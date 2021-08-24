import {
  Component,
  h
} from '@stencil/core';

@Component({
  shadow: true,
  styleUrl: 'lyne-accordion-item.scss',
  tag: 'lyne-accordion-item'
})

export class LyneAccordionItem {

  public render(): JSX.Element {

    return (
      <div>
        accordion item
      </div>
    );
  }
}
