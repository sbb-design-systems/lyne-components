import {
  Component,
  h
} from '@stencil/core';

const lyneDesignTokens = require('lyne-design-tokens/dist/js/tokens.commonjs.js');

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
          height: lyneDesignTokens.BreakpointUltraMax,
          width: lyneDesignTokens.BreakpointUltraMax
        },
        mediaQueries: [
          {
            conditionFeature: 'min-width',
            conditionFeatureValue: {
              lyneDesignToken: true,
              value: 'BreakpointUltraMin'
            },
            conditionOperator: false
          }
        ]
      },
      {
        image: {
          height: lyneDesignTokens.BreakpointWideMax,
          width: lyneDesignTokens.BreakpointWideMax
        },
        mediaQueries: [
          {
            conditionFeature: 'max-width',
            conditionFeatureValue: {
              lyneDesignToken: true,
              value: 'BreakpointWideMax'
            },
            conditionOperator: false
          }
        ]
      },
      {
        image: {
          height: lyneDesignTokens.BreakpointLargeMax,
          width: lyneDesignTokens.BreakpointLargeMax
        },
        mediaQueries: [
          {
            conditionFeature: 'max-width',
            conditionFeatureValue: {
              lyneDesignToken: true,
              value: 'BreakpointLargeMax'
            },
            conditionOperator: false
          }
        ]
      },
      {
        image: {
          height: lyneDesignTokens.BreakpointMediumMax,
          width: lyneDesignTokens.BreakpointMediumMax
        },
        mediaQueries: [
          {
            conditionFeature: 'max-width',
            conditionFeatureValue: {
              lyneDesignToken: true,
              value: 'BreakpointMediumMax'
            },
            conditionOperator: false
          }
        ]
      },
      {
        image: {
          height: lyneDesignTokens.BreakpointSmallMax,
          width: lyneDesignTokens.BreakpointSmallMax
        },
        mediaQueries: [
          {
            conditionFeature: 'max-width',
            conditionFeatureValue: {
              lyneDesignToken: true,
              value: 'BreakpointSmallMax'
            },
            conditionOperator: false
          }
        ]
      },
      {
        image: {
          height: lyneDesignTokens.BreakpointMicroMax,
          width: lyneDesignTokens.BreakpointMicroMax
        },
        mediaQueries: [
          {
            conditionFeature: 'max-width',
            conditionFeatureValue: {
              lyneDesignToken: true,
              value: 'BreakpointMicroMax'
            },
            conditionOperator: false
          }
        ]
      },
      {
        image: {
          height: lyneDesignTokens.BreakpointZeroMax,
          width: lyneDesignTokens.BreakpointZeroMax
        },
        mediaQueries: [
          {
            conditionFeature: 'max-width',
            conditionFeatureValue: {
              lyneDesignToken: true,
              value: 'BreakpointZeroMax'
            },
            conditionOperator: false
          }
        ]
      }
    ]
  };

  public render(): JSX.Element {
    return (
      <div class='taser-hero'>
        <lyne-image
          class='teaser-hero__image'
          imageSrcExamples='https://cdn.img.sbb.ch/content/dam/internet/lyne/Billetkontrolle.jpg'
          pictureSizesConfig={JSON.stringify(this._pictureSizesConfig)}
          customFocalPoint={true}
          hideFromScreenreader={true}
          imageSrc=''
          loading='eager'
          lqip
          performanceMark=''
          variant='teaser-hero'
        ></lyne-image>

        <lyne-panel
          class='teaser-hero__panel'
          buttonText='Sample button text'
          text='Sample panel text'
        ></lyne-panel>
      </div>
    );
  }
}
