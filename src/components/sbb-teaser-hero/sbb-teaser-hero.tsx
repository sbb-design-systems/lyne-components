import {
  Component,
  h,
  Prop,
  Watch
} from '@stencil/core';
// import tokens from 'sbb-design-tokens/dist/js/tokens.json';

/**
 * @slot hiddenTitle - to place the accessibility title
 * @slot image - to render the image
 * @slot panel- to render the panel
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

  /** Teaser title text, visually hidden,  necessary for screenreaders */
  @Prop() public accessibilityTitle!: string;

  /**
   * Check if accessibilityTitle is provided since it is a required prop,
   * otherwise throw an error.
   */
  /* eslint-disable */
  @Watch('accessibilityTitle')
  validateAccessibilityTitle(newValue: string) {
    const isBlank = typeof newValue !== 'string' || newValue === '';
    if (isBlank) { throw new Error('accessibilityTitle: required') }
  }

  public componentWillLoad(): void {
    // Validate prop
    this.validateAccessibilityTitle(this.accessibilityTitle);
  }

  /**
   * ----------------------------------------------------------------
   */

  public render(): JSX.Element {

    const linkAttributes = {};
    const ariaLabel = this.accessibilityTitle

    if (this.openInNewWindow) {
      linkAttributes['rel'] = 'external noopener nofollow';
      linkAttributes['target'] = '_blank';
    }

    return (
      <a
        class='teaser-hero'
        href={this.link}
        aria-label={ariaLabel}
        {...linkAttributes}
      >
        <sbb-title level='1' visually-hidden='true' text={ariaLabel} />
        <div class='teaser-hero__panel'>
          <slot name='panel'/>
        </div>
        <slot name='image'/>

        {this.openInNewWindow && this.newWindowInfoText
          ? <span class='teaser-hero__link-info-text'>{this.newWindowInfoText}</span>
          : ''
        }
      </a>
    );
  }
}