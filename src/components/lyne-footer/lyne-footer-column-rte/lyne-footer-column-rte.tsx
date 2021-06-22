import {
  Component,
  h
} from '@stencil/core';

@Component({
  shadow: true,
  styleUrl: 'lyne-footer-column-rte.scss',
  tag: 'lyne-footer-column-rte'
})

export class LyneFooterColumnRte {
  public render(): JSX.Element {
    return (
      <section>
        <slot />
      </section>
    );
  }
}
