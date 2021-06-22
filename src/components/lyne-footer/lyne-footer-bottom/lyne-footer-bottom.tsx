import {
  Component,
  h
} from '@stencil/core';

@Component({
  shadow: true,
  styleUrl: 'lyne-footer-bottom.scss',
  tag: 'lyne-footer-bottom'
})

export class LyneFooterBottom {
  public render(): JSX.Element {
    return (
      <div class='lyne-footer-bottom'>
        <slot />
      </div>
    );
  }
}
