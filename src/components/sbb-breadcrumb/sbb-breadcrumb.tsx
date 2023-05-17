import { Component, ComponentInterface, h, JSX, Prop } from '@stencil/core';
import { LinkTargetType } from '../../global/interfaces/link-button-properties';

/**
 * @slot unnamed - Use this for the breadcrumb's text.
 */
@Component({
  shadow: true,
  styleUrl: 'sbb-breadcrumb.scss',
  tag: 'sbb-breadcrumb',
})
export class SbbBreadcrumb implements ComponentInterface {
  /** The href value you want to link to. */
  @Prop() public href: string | undefined;

  /** Where to display the linked URL. */
  @Prop() public target?: LinkTargetType | string | undefined;

  /** The relationship of the linked URL as space-separated link types. */
  @Prop() public rel?: string | undefined;

  /** Whether the browser will show the download dialog on click. */
  @Prop() public download?: boolean;

  public render(): JSX.Element {
    return (
      <a
        class="sbb-breadcrumb__link"
        href={this.href}
        target={this.target}
        rel={this.rel}
        download={this.download}
      >
        <slot />
      </a>
    );
  }
}
