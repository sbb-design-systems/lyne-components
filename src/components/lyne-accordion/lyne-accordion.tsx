import {
  Component,
  h
} from '@stencil/core';

@Component({
  shadow: true,
  styleUrl: 'lyne-accordion.scss',
  tag: 'lyne-accordion'
})

export class LyneAccordion {

  public render(): JSX.Element {

    return (
      <div>
        accordion
      </div>
    );
  }
}
