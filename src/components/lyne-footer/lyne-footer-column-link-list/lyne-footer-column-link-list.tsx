import {
  Component,
  h
} from '@stencil/core';

@Component({
  styleUrl: 'lyne-footer-column-link-list.scss',
  tag: 'lyne-footer-column-link-list'
})

export class LyneFooterColumnLinkList {
  public render(): JSX.Element {
    return (
      <ul>
        <slot />
      </ul>
    );
  }
}
