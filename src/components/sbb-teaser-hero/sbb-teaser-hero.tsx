import { Component, h, Prop, JSX } from '@stencil/core';

/**
 * @slot image - to render the image
 * @slot panel - to render the panel
 */

@Component({
  shadow: true,
  styleUrl: 'sbb-teaser-hero.scss',
  tag: 'sbb-teaser-hero',
})
export class SbbTeaserHero {
  /**
   * Link for the hero teaser.
   */
  @Prop() public link!: string;

  /**
   * Panel Text for the hero teaser.
   */
  @Prop() public panelText!: string;

  /**
   * Panel link text for the hero teaser.
   */
  @Prop() public panelLinkText!: string;

  /**
   * If set, the link will be opened in a new window.
   */
  @Prop() public openInNewWindow?: boolean;

  /**
   * If `openInNewWindow` is set, you should provide according information
   * which will be read aloud for screenreader users (e.g. "Link target will
   * open in a new window").
   */
  @Prop() public newWindowInfoText?: string;

  /** Teaser title text, visually hidden,  necessary for screenreaders */
  @Prop() public accessibilityTitle!: string;

  public render(): JSX.Element {
    const linkAttributes = {};

    if (this.openInNewWindow) {
      linkAttributes['rel'] = 'external noopener nofollow';
      linkAttributes['target'] = '_blank';
    }

    return (
      <a
        class="teaser-hero"
        href={this.link}
        aria-label={this.accessibilityTitle}
        {...linkAttributes}
      >
        <span class="teaser-hero__panel">
          <span class="teaser-hero__panel-text">
            <slot name="text">{this.panelText}</slot>
          </span>
          <sbb-link
            class="teaser-hero__panel-link"
            icon-name="chevron-small-right-small"
            icon-placement="end"
            text-size="m"
            negative
          >
            <slot name="panel-link-text">{this.panelLinkText}</slot>
          </sbb-link>
        </span>
        <slot name="image" />
        {this.openInNewWindow && this.newWindowInfoText ? (
          <span class="teaser-hero__link-info-text">{this.newWindowInfoText}</span>
        ) : (
          ''
        )}
      </a>
    );
  }
}
