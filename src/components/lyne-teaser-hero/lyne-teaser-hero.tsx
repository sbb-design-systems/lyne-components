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
          height: '675',
          width: '1200'
        },
        mediaQueries: [
          {
            conditionFeature: 'min-width',
            conditionFeatureValue: {
              lyneDesignToken: true,
              value: 'BreakpointLargeMin'
            },
            conditionOperator: false
          }
        ]
      },
      {
        image: {
          height: '549',
          width: '976'
        },
        mediaQueries: [
          {
            conditionFeature: 'min-width',
            conditionFeatureValue: {
              lyneDesignToken: true,
              value: 'BreakpointSmallMin'
            },
            conditionOperator: false
          }
        ]
      },
      {
        image: {
          height: '320',
          width: '320'
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
      }
    ]
  };

  public render(): JSX.Element {
    console.log(this._pictureSizesConfig);

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
