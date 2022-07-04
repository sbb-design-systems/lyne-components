import { Component, Element, h, Prop } from '@stencil/core';

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
   * If set, the link will be opened in a new window.
   */
  @Prop() public openInNewWindow?: boolean;

  /**
   * If `openInNewWindow` is set, you should provide according information
   * which will be read aloud for screenreader users (e.g. "Link target will
   * open in a new window").
   */
  @Prop() public newWindowInfoText?: string;

  @Element() private _element: HTMLElement;

  /** Teaser title text, visually hidden,  necessary for screenreaders */
  @Prop() public accessibilityTitle!: string;

  public componentWillLoad(): void {
    /** ensure that the sbb-panel don't contain a link */
    this._element.querySelectorAll('sbb-panel')?.forEach((element) => {
      element['hasCalltoActionLink'] = true;
    });
  }

  /**
   * ----------------------------------------------------------------
   */

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
        <sbb-title level="1" visually-hidden="true" text={this.accessibilityTitle} />
        <span class="teaser-hero__panel">
          <slot name="panel" />
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
