import {
  Component,
  h,
  Prop
} from '@stencil/core';

@Component({
  shadow: true,
  styleUrl: 'lyne-footer-columns.scss',
  tag: 'lyne-footer-columns'
})

export class LyneFooterColumns {

  @Prop() public footertitle: string;

  public render(): any {
    return [
      <ul class='footer-columns-list'>
        <slot />
      </ul>
    ];
  }
}
