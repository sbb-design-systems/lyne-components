import {
  Component,
  h,
  Prop
} from '@stencil/core';
import icon from './lyne-footer-column-title-icon';

@Component({
  shadow: true,
  styleUrl: 'lyne-footer-column-title.scss',
  tag: 'lyne-footer-column-title'
})

export class LyneFooterColumnTitle {

  @Prop() public columntitle: string;

  public render(): JSX.Element {
    return (
      <h2>
        {this.columntitle}
        <span class='icon'>
          <span class='icon-close' innerHTML={icon}></span>
          <span class='icon-open' innerHTML={icon}></span>
        </span>
      </h2>
    );
  }
}
