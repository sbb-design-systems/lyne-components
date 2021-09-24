import {
  Component,
  h,
  Prop
} from '@stencil/core';

import tokens from 'lyne-design-tokens/dist/js/tokens.json';

@Component({
  shadow: true,
  styleUrl: 'lyne-teaser-hero.scss',
  tag: 'lyne-teaser-hero'
})

export class LyneTeaserHero {
  private _pictureSizesConfig = {
    breakpoints: [
      {
        image: {
          height: tokens['breakpoint-ultra-max'],
          width: tokens['breakpoint-ultra-max']
        },
        mediaQueries: [
          {
            conditionFeature: 'min-width',
            conditionFeatureValue: {
              lyneDesignToken: true,
              value: 'breakpoint-ultra-min'
            },
            conditionOperator: false
          }
        ]
      },
      {
        image: {
          height: tokens['breakpoint-wide-max'],
          width: tokens['breakpoint-wide-max']
        },
        mediaQueries: [
          {
            conditionFeature: 'max-width',
            conditionFeatureValue: {
              lyneDesignToken: true,
              value: 'breakpoint-wide-max'
            },
            conditionOperator: false
          }
        ]
      },
      {
        image: {
          height: tokens['breakpoint-large-max'],
          width: tokens['breakpoint-large-max']
        },
        mediaQueries: [
          {
            conditionFeature: 'max-width',
            conditionFeatureValue: {
              lyneDesignToken: true,
              value: 'breakpoint-large-max'
            },
            conditionOperator: false
          }
        ]
      },
      {
        image: {
          height: tokens['breakpoint-medium-max'],
          width: tokens['breakpoint-medium-max']
        },
        mediaQueries: [
          {
            conditionFeature: 'max-width',
            conditionFeatureValue: {
              lyneDesignToken: true,
              value: 'breakpoint-medium-max'
            },
            conditionOperator: false
          }
        ]
      },
      {
        image: {
          height: tokens['breakpoint-small-max'],
          width: tokens['breakpoint-small-max']
        },
        mediaQueries: [
          {
            conditionFeature: 'max-width',
            conditionFeatureValue: {
              lyneDesignToken: true,
              value: 'breakpoint-small-max'
            },
            conditionOperator: false
          }
        ]
      },
      {
        image: {
          height: tokens['breakpoint-micro-max'],
          width: tokens['breakpoint-micro-max']
        },
        mediaQueries: [
          {
            conditionFeature: 'max-width',
            conditionFeatureValue: {
              lyneDesignToken: true,
              value: 'breakpoint-micro-max'
            },
            conditionOperator: false
          }
        ]
      },
      {
        image: {
          height: tokens['breakpoint-zero-max'],
          width: tokens['breakpoint-zero-max']
        },
        mediaQueries: [
          {
            conditionFeature: 'max-width',
            conditionFeatureValue: {
              lyneDesignToken: true,
              value: 'breakpoint-zero-max'
            },
            conditionOperator: false
          }
        ]
      }
    ]
  };

  /**
   * Text property for lyne-panel. See lyne-panel for additional info
   */
  @Prop() public text!: string;

  /**
   * Button text property for lyne-panel. See lyne-panel for additional info
   */
  @Prop() public buttonText!: string;

  /**
   * Image source property for lyne-image.  See lyne-image for additional info
   */
  @Prop() public imageSrc!: string;

  public render(): JSX.Element {
    return (
      <div class='taser-hero'>
        <lyne-image
          class='teaser-hero__image'
          pictureSizesConfig={JSON.stringify(this._pictureSizesConfig)}
          customFocalPoint={true}
          hideFromScreenreader={true}
          imageSrc={this.imageSrc}
          loading='eager'
          lqip
          performanceMark=''
          variant='teaser-hero'
        ></lyne-image>

        <lyne-panel
          class='teaser-hero__panel'
          buttonText={this.buttonText}
          text={this.text}
        ></lyne-panel>
      </div>
    );
  }
}
