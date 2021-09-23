import * as LyneDesignTokens from '../../../node_modules/lyne-design-tokens/dist/js/tokens.es6.js';
import {
  Component,
  h
} from '@stencil/core';

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
          height: LyneDesignTokens.BreakpointUltraMax,
          width: LyneDesignTokens.BreakpointUltraMax
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
          height: LyneDesignTokens.BreakpointWideMax,
          width: LyneDesignTokens.BreakpointWideMax
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
          height: LyneDesignTokens.BreakpointLargeMax,
          width: LyneDesignTokens.BreakpointLargeMax
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
          height: LyneDesignTokens.BreakpointMediumMax,
          width: LyneDesignTokens.BreakpointMediumMax
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
          height: LyneDesignTokens.BreakpointSmallMax,
          width: LyneDesignTokens.BreakpointSmallMax
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
          height: LyneDesignTokens.BreakpointMicroMax,
          width: LyneDesignTokens.BreakpointMicroMax
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
          height: LyneDesignTokens.BreakpointZeroMax,
          width: LyneDesignTokens.BreakpointZeroMax
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
