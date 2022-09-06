import { Component, h, Prop, JSX } from '@stencil/core';
import {
  getLinkAttributeList,
  getLinkButtonBaseAttributeList,
  LinkProperties,
  LinkTargetType,
} from '../../global/interfaces/link-button-properties';
import { i18nTargetOpensInNewWindow } from '../../global/i18n';
import getDocumentLang from '../../global/helpers/get-document-lang';

/**
 * @slot unnamed - text content of panel
 * @slot link-content - link content of the panel
 * @slot image - the background image, can be a `sbb-image`
 */

@Component({
  shadow: true,
  styleUrl: 'sbb-teaser-hero.scss',
  tag: 'sbb-teaser-hero',
})
export class SbbTeaserHero implements LinkProperties {
  /** This will be forwarded as aria-label to anchor tag. */
  @Prop() public accessibilityLabel: string | undefined;

  /** This will be forwarded as aria-describedby to the anchor tag. */
  @Prop() public accessibilityDescribedby: string | undefined;

  /** This will be forwarded as aria-labelledby to the anchor tag. */
  @Prop() public accessibilityLabelledby: string | undefined;

  /** The href value you want to link to. */
  @Prop() public href: string | undefined;

  /** The relationship of the linked URL as space-separated link types. */
  @Prop() public rel?: string | undefined;

  /** Where to display the linked URL. */
  @Prop() public target?: LinkTargetType | string | undefined;

  /** Pass in an id, if you need to identify the inner link element. */
  @Prop() public idValue?: string;

  /** Panel link text. */
  @Prop() public linkContent?: string;

  /** Image src will be passed to `sbb-image`. */
  @Prop() public imageSrc?: string;

  /** Image alt text will be passed to `sbb-image`. */
  @Prop() public imageAlt?: string;

  public render(): JSX.Element {
    let TAG_NAME: string;
    let linkAttributeList: Record<string, string>;
    let shouldDisplayNewWindowText = false;

    if (this.href) {
      TAG_NAME = 'a';
      linkAttributeList = getLinkAttributeList(this);
      shouldDisplayNewWindowText = !this.accessibilityLabel && this.target === '_blank';
    } else {
      TAG_NAME = 'span';
      linkAttributeList = getLinkButtonBaseAttributeList(this);
    }

    return (
      <TAG_NAME class="sbb-teaser-hero" id={this.idValue} {...linkAttributeList}>
        <span class="sbb-teaser-hero__panel">
          <span class="sbb-teaser-hero__panel-text">
            <slot />
          </span>
          <sbb-link
            class="sbb-teaser-hero__panel-link"
            icon-name="chevron-small-right-small"
            icon-placement="end"
            text-size="m"
            disabled={!this.href}
            negative
          >
            <slot name="link-content">{this.linkContent}</slot>
          </sbb-link>
        </span>
        <slot name="image">
          <sbb-image image-src={this.imageSrc} alt={this.imageAlt}></sbb-image>
        </slot>
        {shouldDisplayNewWindowText && (
          <span class="sbb-teaser-hero__opens-in-new-window">
            . {i18nTargetOpensInNewWindow[getDocumentLang()]}
          </span>
        )}
      </TAG_NAME>
    );
  }
}
