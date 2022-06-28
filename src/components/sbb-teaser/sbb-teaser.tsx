import { Component, h, Prop, Watch } from '@stencil/core';

import { InterfaceTeaserAttributes } from './sbb-teaser.custom';

/**
 * @slot image - Slot used to render the image
 * @slot headline - Slot used to render the headline
 * @slot description - Slot used to render the description
 */

@Component({
  shadow: true,
  styleUrls: {
    default: 'styles/sbb-teaser.default.scss',
    shared: 'styles/sbb-teaser.shared.scss',
  },
  tag: 'sbb-teaser',
})

/**
 * Generalized Teaser - for displaying an image, headline and paragraph
 */
export class SbbTeaser {
  /** Teaser appearance */
  @Prop() public appearance?: InterfaceTeaserAttributes['appearance'] = 'primary';

  /**
   * The text which gets exposed to screen reader users. The text should
   * reflect all the information
   *
   * Example text: Connection from X to Y, via Z, on date X.
   * Ticket price starts at X.
   */
  @Prop() public accessibilityLabel!: string;

  /**
   * Check if accessibilityLabel is provided since it is a required prop,
   * otherwise throw an error.
   */
  /* eslint-disable */
  @Watch('accessibilityLabel')
  validateAccessibilityLabel(newValue: string) {
    const isBlank = typeof newValue !== 'string' || newValue === '';
    if (isBlank) {
      throw new Error('accessibilityLabel: required');
    }
  }
  /* eslint-enable */

  /**
   * component attributes
   * ----------------------------------------------------------------
   */

  /** The href value you want to link to */
  @Prop() public hrefValue!: string;

  /** The image src */
  @Prop() public imgSrc: string;

  /** The image alt */
  @Prop() public imgAlt: string;

  /** The headline attribute */
  @Prop() public headline: '';

  /** The description attribute*/
  @Prop() public description: '';

  /**
   * Teaser variant -
   * when this is true the text-content will be under the image
   * otherwise it will be displayed next to the image
   */
  @Prop() public isStacked: boolean;

  /**
   * We would use this Prop if the margin and the aspect-ratio
   * of the sbb-image is customizable
   */
  @Prop() public pictureSizesConfig?: string;

  public componentWillLoad(): void {
    // Validate props
    this.validateAccessibilityLabel(this.accessibilityLabel);
  }

  public render(): JSX.Element {
    /**
     * Add generic additional attributes
     * ----------------------------------------------------------------
     */
    const additionalTeaserAttributes = {
      alt: this.imgAlt,
      description: this.description,
      headline: this.headline,
      src: this.imgSrc,
    };

    const ariaLabel = this.accessibilityLabel;

    return (
      <a
        aria-label={ariaLabel}
        class={`teaser teaser--${this.appearance} ${
          this.isStacked === true ? 'teaser--is-stacked' : ''
        }`}
        href={this.hrefValue}
        {...additionalTeaserAttributes}
      >
        <div class="teaser__content">
          <div class="teaser__inner">
            <div class="teaser__wrapper">
              <slot name="image" />
            </div>
            <div class="teaser__text">
              <div class="teaser__lead">
                <slot name="headline" />
              </div>
              <div class="teaser__description">
                <slot name="description" />
              </div>
            </div>
          </div>
        </div>
      </a>
    );
  }
}
