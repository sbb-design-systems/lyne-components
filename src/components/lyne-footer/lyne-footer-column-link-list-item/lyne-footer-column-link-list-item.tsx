import {
  Component,
  h,
  Prop
} from '@stencil/core';

@Component({
  shadow: true,
  styleUrl: 'lyne-footer-column-link-list-item.scss',
  tag: 'lyne-footer-column-link-list-item'
})

export class LyneFooterColumnLinkListItem {

  @Prop() public label: string;
  @Prop() public href: string;
  @Prop() public external: string;

  public render(): JSX.Element {
    if (this.external) {
      return (
        <li>
          <a href={this.href} target='_blank' rel='external noopener nofollow'>
            {this.label}
            <span class='visuallyhidden'>Linkziel öffnet sich in einem neuen Fenster</span>
          </a>
        </li>
      );

    }

    return (
      <li>
        <a href={this.href}>
          {this.label}
        </a>
      </li>
    );
  }
}
