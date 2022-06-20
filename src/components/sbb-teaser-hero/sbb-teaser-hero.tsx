import {
  Component,
  h,
  Prop
} from '@stencil/core';
import { InterfaceImageAttributes } from '../sbb-image/sbb-image.custom';
import tokens from '@sbb-esta/lyne-design-tokens/dist/js/sbb-tokens.json';

@Component({
  shadow: true,
  styleUrls: {
    default: 'styles/sbb-teaser-hero.default.scss',
    shared: 'styles/sbb-teaser-hero.shared.scss'
  },
  tag: 'sbb-teaser-hero'
})

export class SbbTeaserHero {

  private _pictureSizesConfig = {
    breakpoints: [
      {
        image: {
          height: tokens['sbb-breakpoint-ultra-max'],
          width: tokens['sbb-breakpoint-ultra-max']
        },
        mediaQueries: [
          {
            conditionFeature: 'min-width',
            conditionFeatureValue: {
              lyneDesignToken: true,
              value: 'sbb-breakpoint-ultra-min'
            },
            conditionOperator: false
          }
        ]
      },
      {
        image: {
          height: tokens['sbb-breakpoint-wide-max'],
          width: tokens['sbb-breakpoint-wide-max']
        },
        mediaQueries: [
          {
            conditionFeature: 'max-width',
            conditionFeatureValue: {
              lyneDesignToken: true,
              value: 'sbb-breakpoint-wide-max'
            },
            conditionOperator: false
          }
        ]
      },
      {
        image: {
          height: tokens['sbb-breakpoint-micro-max'],
          width: tokens['sbb-breakpoint-micro-max']
        },
        mediaQueries: [
          {
            conditionFeature: 'max-width',
            conditionFeatureValue: {
              lyneDesignToken: true,
              value: 'sbb-breakpoint-micro-max'
            },
            conditionOperator: false
          }
        ]
      }
    ]
  };

  /**
   * Text property for sbb-panel. See sbb-panel for additional info
   */
  @Prop() public text!: string;

  /**
   * Button text property for sbb-panel. See sbb-panel for additional info
   */
  @Prop() public buttonText!: string;

  /**
   * Image source property for sbb-image. See sbb-image for additional info
   */
  @Prop() public imageSrc!: string;

  /**
   * Image loading property. See sbb-image for additional info
   */
  @Prop() public imageLoading?: InterfaceImageAttributes['loading'] = 'eager';

  /**
   * Link to open if the teaser is clicked/pressed.
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

  public render(): JSX.Element {
    const linkAttributes = {};

    if (this.openInNewWindow) {
      linkAttributes['rel'] = 'external noopener nofollow';
      linkAttributes['target'] = '_blank';
    }

    return (
      <a
        class='teaser-hero'
        href={this.link}
        {...linkAttributes}
      >
        <sbb-image
          class='teaser-hero__image'
          pictureSizesConfig={JSON.stringify(this._pictureSizesConfig)}
          customFocalPoint={true}
          hideFromScreenreader={true}
          imageSrc={this.imageSrc}
          loading={this.imageLoading}
          lqip
          performanceMark='teaser-hero'
          variant='teaser-hero'
        ></sbb-image>

        <sbb-panel
          class='teaser-hero__panel'
          buttonText={this.buttonText}
          text={this.text}
        ></sbb-panel>

        {this.openInNewWindow && this.newWindowInfoText
          ? <span class='teaser-hero__link-info-text'>{this.newWindowInfoText}</span>
          : ''
        }
      </a>
    );
  }
}
