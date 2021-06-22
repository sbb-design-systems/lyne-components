import {
  Component,
  h
} from '@stencil/core';
import swisspassIcon from './lyne-footer-links-bottom-swisspass';

@Component({
  shadow: true,
  styleUrl: 'lyne-footer-links-bottom.scss',
  tag: 'lyne-footer-links-bottom'
})

export class LyneFooterLinksBottom {

  public render(): any {
    return (
      <lyne-list>
        <lyne-list-link-item link='#' linktext='Impressum'></lyne-list-link-item>
        <lyne-list-link-item link='#' linktext='Rechtlicher Hinweis'></lyne-list-link-item>
        <lyne-list-link-item link='#' linktext='Datenschutz'></lyne-list-link-item>
        <div class='icon' innerHTML={swisspassIcon}></div>
      </lyne-list>
    );
  }
}
