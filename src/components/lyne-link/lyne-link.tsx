import {
  Component,
  h,
  Prop
} from '@stencil/core';
import { InterfaceLinkAttributes } from './lyne-link.d';

@Component({
  shadow: true,
  styleUrl: 'lyne-link.scss',
  tag: 'lyne-link'
})

export class LyneLink {

  /** Text to show for the link */
  @Prop() public text!: string;

  /** Link to use as href */
  @Prop() public link!: string;

  /** If true, target=_blank will be set on the link */
  @Prop() public openInNewWindow = false;

  public render(): JSX.Element {
    const attributes: InterfaceLinkAttributes = {};

    if (this.openInNewWindow) {
      attributes.target = '_blank';
    }

    return <a
      class='link'
      href={this.link}
      {...attributes}
    >{this.text}</a>;
  }
}
