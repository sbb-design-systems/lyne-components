import {
  Component, h, Prop
} from '@stencil/core';
import { guid } from '../../global/guid';
import { InterfaceImageAttributes } from '../lyne-image/lyne-image.custom.d';
// import tokens from 'lyne-design-tokens/dist/js/tokens.json';
import { InterfaceTitleAttributes } from '../lyne-title/lyne-title.custom';

@Component({
  shadow: true,
  styleUrls: {
    default: 'styles/lyne-teaser-item.default.scss',
    shared: 'styles/lyne-teaser-item.shared.scss'
  },
  tag: 'lyne-teaser-item'
})

export class LyneTeaserItem {

  private _guid: string;

  private _nonPersonalisedPictureSizesConfig = {
    breakpoints: [
      {
        image: {
          height: '72',
          width: '90'
        },
        mediaQueries: [
          {
            conditionFeature: 'min-width',
            conditionFeatureValue: {
              lyneDesignToken: true,
              value: 'breakpoint-medium-min'
            },
            conditionOperator: false
          }
        ]
      },
      {
        image: {
          height: '60',
          width: '80'
        },
        mediaQueries: [
          {
            conditionFeature: 'min-width',
            conditionFeatureValue: {
              lyneDesignToken: true,
              value: 'breakpoint-zero-min'
            },
            conditionOperator: false
          }
        ]
      }
    ]
  };

  private _personalisedPictureSizesConfig = {
    breakpoints: [
      {
        image: {
          height: '205.51',
          width: '274'
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
          height: '196.51',
          width: '262'
        },
        mediaQueries: [
          {
            conditionFeature: 'min-width',
            conditionFeatureValue: {
              lyneDesignToken: true,
              value: 'breakpoint-wide-min'
            },
            conditionOperator: false
          }
        ]
      },
      {
        image: {
          height: '150.01',
          width: '200'
        },
        mediaQueries: [
          {
            conditionFeature: 'min-width',
            conditionFeatureValue: {
              lyneDesignToken: true,
              value: 'breakpoint-large-min'
            },
            conditionOperator: false
          }
        ]
      },
      {
        image: {
          height: '123',
          width: '164'
        },
        mediaQueries: [
          {
            conditionFeature: 'min-width',
            conditionFeatureValue: {
              lyneDesignToken: true,
              value: 'breakpoint-medium-min'
            },
            conditionOperator: false
          }
        ]
      },
      {
        image: {
          height: '180.01',
          width: '240'
        },
        mediaQueries: [
          {
            conditionFeature: 'min-width',
            conditionFeatureValue: {
              lyneDesignToken: true,
              value: 'breakpoint-small-min'
            },
            conditionOperator: false
          }
        ]
      },
      {
        image: {
          height: '180.01',
          width: '240'
        },
        mediaQueries: [
          {
            conditionFeature: 'min-width',
            conditionFeatureValue: {
              lyneDesignToken: true,
              value: 'breakpoint-medium-min'
            },
            conditionOperator: false
          }
        ]
      },
      {
        image: {
          height: '116.63',
          width: '155.5'
        },
        mediaQueries: [
          {
            conditionFeature: 'min-width',
            conditionFeatureValue: {
              lyneDesignToken: true,
              value: 'breakpoint-micro-min'
            },
            conditionOperator: false
          }
        ]
      },
      {
        image: {
          height: '99',
          width: '132'
        },
        mediaQueries: [
          {
            conditionFeature: 'min-width',
            conditionFeatureValue: {
              lyneDesignToken: true,
              value: 'breakpoint-zero-min'
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
   * Headline property
   */
  @Prop() public titleText!: string;

  /**
   * Image source property for lyne-image. See lyne-image for additional info
   */
  @Prop() public imageSrc!: string;

  /**
   * Image loading property. See lyne-image for additional info
   */
  @Prop() public imageLoading?: InterfaceImageAttributes['loading'] = 'eager';

  /**
   * Link to open if the teaser is clicked/pressed.
   */
  @Prop() public link!: string;

  /**
   * The semantic level of the title,
   * e.g. 3 = h3
   */
  @Prop() public titleLevel?: InterfaceTitleAttributes['level'] = '5';

  /**
   * is teaser item personalised
   */
  @Prop() public personalised?: boolean;

  public componentWillLoad(): void {
    this._guid = guid();
  }

  public render(): JSX.Element {

    const id = `title-${this._guid}`;
    const personalisedClass = this.personalised
      ? 'personalised'
      : '';

    return (
      <div class={`teaser-item__container ${personalisedClass}`}>
        <a
          class='teaser-item-link'
          href={this.link}
        >
          <div class='teaser-item__container-image'>
            <lyne-image
              class='teaser-item__image'
              pictureSizesConfig={JSON.stringify(this.personalised
                ? this._personalisedPictureSizesConfig
                : this._nonPersonalisedPictureSizesConfig)}
              customFocalPoint={true}
              hideFromScreenreader={true}
              imageSrc={this.imageSrc}
              loading={this.imageLoading}
              lqip
              variant='teaser-item'
              performanceMark='teaser-item'
            />
          </div>
          {
            this.titleText
              ? <lyne-title
                id={id}
                level={this.titleLevel}
                text={this.titleText}
                visual-level='5'
              />
              : ''
          }
          <p class='teaser-item__paragraph'>
            {this.text}
          </p>
        </a>
      </div>
    );
  }
}
