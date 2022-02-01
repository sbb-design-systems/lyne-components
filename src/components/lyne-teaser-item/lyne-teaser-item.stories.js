import { h } from 'jsx-dom';
import images from '../../global/images';
import readme from './readme.md';

// --- Controls
const imageLoading = {
  control: {
    type: 'inline-radio'
  },
  options: [
    'eager',
    'lazy'
  ],
  table: {
    category: 'Performance'
  }
};

// --- Component

const Template = (args) => (
  <lyne-teaser-item class='lyne-teaser-item' {...args} />
);

const defaultTeaserArgTypes = {
  'image-loading': imageLoading
};

const defaultTeaserArgs = {
  'image-loading': imageLoading.options[0],
  'image-src': images[0],
  'link': 'https://www.sbb.ch',
  'text': 'Spannende Bücher kaufen',
  'title-text': 'Lesen im Zug'
};

const nonPersonalisedPictureSizesConfig = {
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

const personalisedPictureSizesConfig = {
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

/* ************************************************* */
/* The Stories                                       */
/* ************************************************* */

export const TeaserPersonalisedTrue = Template.bind({});
export const TeaserPersonalisedFalse = Template.bind({});

TeaserPersonalisedFalse.argTypes = defaultTeaserArgTypes;
TeaserPersonalisedFalse.args = {
  ...defaultTeaserArgs,
  personalised: false,
  pictureSizesConfig: nonPersonalisedPictureSizesConfig
};

/*
 * TeaserPersonalisedFalse.decorators = [
 *   (Story) => (
 *     <div style={'max-width: 380px;border:1px solid green;'}>
 *       <Story/>
 *     </div>
 *   )
 * ];
 */

TeaserPersonalisedTrue.argTypes = defaultTeaserArgTypes;
TeaserPersonalisedTrue.args = {
  ...defaultTeaserArgs,
  personalised: true,
  pictureSizesConfig: personalisedPictureSizesConfig
};

/*
 * TeaserPersonalisedTrue.decorators = [
 *   (Story) => (
 *     <div style={'max-width: 380px;border:1px solid black;'}>
 *       <Story/>
 *     </div>
 *   )
 * ];
 */

/* ************************************************* */
/* export default                                    */
/* ************************************************* */

export default {
  parameters: {
    docs: {
      extractComponentDescription: () => readme
    }
  },
  title: 'lyne-teaser-item'
};
