import {h} from 'jsx-dom';
import readme from './readme.md';
import images from "../../global/images";

const ItemTemplate = (args) => (
  <lyne-teaser-item class='lyne-teaser-item' {...args}>
  </lyne-teaser-item>
);

const Template = (args) => (
  <lyne-teaser-list class='lyne-teaser-list ' {...args}>
    {args.items.map((item) => (
      <ItemTemplate {...item} />
    ))}
  </lyne-teaser-list>
);

export const personalisedTeaserList = Template.bind({});
export const nonPersonalisedTeaserList = Template.bind({});

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

// const nonPersonalisedPictureSizesConfig = {
//   breakpoints: [
//     {
//       image: {
//         height: '72',
//         width: '90'
//       },
//       mediaQueries: [
//         {
//           conditionFeature: 'min-width',
//           conditionFeatureValue: {
//             lyneDesignToken: true,
//             value: 'breakpoint-medium-min'
//           },
//           conditionOperator: false
//         }
//       ]
//     },
//     {
//       image: {
//         height: '60',
//         width: '80'
//       },
//       mediaQueries: [
//         {
//           conditionFeature: 'min-width',
//           conditionFeatureValue: {
//             lyneDesignToken: true,
//             value: 'breakpoint-zero-min'
//           },
//           conditionOperator: false
//         }
//       ]
//     }
//   ]
// };

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

const items = [
  {
    'image-loading': imageLoading.options[0],
    'image-src': images[0],
    'link': 'https://www.sbb.ch',
    'personalised': false,
    'text': 'Spannende Bücher kaufen',
    'title-text': 'Lesen im Zug',
  },
  {
    'image-loading': imageLoading.options[0],
    'image-src': images[1],
    'link': 'https://www.sbb.ch',
    'personalised': false,
    'text': 'Entspannt reisen',
    'title-text': 'Reisetipps'
  },
  {
    'image-loading': imageLoading.options[0],
    'image-src': images[2],
    'link': 'https://www.sbb.ch',
    'personalised': false,
    'text': 'Rücksichtsvoll unterwegs',
    'title-text': 'SBB Green Class'
  },
  {
    'image-loading': imageLoading.options[0],
    'image-src': images[3],
    'link': 'https://www.sbb.ch',
    'personalised': false,
    'text': 'Alles für den täglichen Bedarf',
    'title-text': 'Coop Pronto'
  }
];

// const itemsPersonalised = [
//   {
//     'image-loading': imageLoading.options[0],
//     'image-src': images[0],
//     'link': 'https://www.sbb.ch',
//     'personalised': true,
//     'text': 'Spannende Bücher kaufen',
//     'title-text': 'Lesen im Zug',
//   },
//   {
//     'image-loading': imageLoading.options[0],
//     'image-src': images[1],
//     'link': 'https://www.sbb.ch',
//     'personalised': true,
//     'text': 'Entspannt reisen',
//     'title-text': 'Reisetipps'
//   },
//   {
//     'image-loading': imageLoading.options[0],
//     'image-src': images[2],
//     'link': 'https://www.sbb.ch',
//     'personalised': true,
//     'text': 'Rücksichtsvoll unterwegs',
//     'title-text': 'SBB Green Class'
//   },
//   {
//     'image-loading': imageLoading.options[0],
//     'image-src': images[3],
//     'link': 'https://www.sbb.ch',
//     'personalised': true,
//     'text': 'Alles für den täglichen Bedarf',
//     'title-text': 'Coop Pronto'
//   }
// ];

const table = {
  disable: true
};

nonPersonalisedTeaserList.argTypes = {
  items: {
    table
  }
};

nonPersonalisedTeaserList.args = {
  items,
  personalised: false
};

for (const item of items) {
  // item.class = 'personalised';
  item.pictureSizesConfig = personalisedPictureSizesConfig;
  item.personalised = true;
}
personalisedTeaserList.argTypes = {
  items: {
    table
  }
};

personalisedTeaserList.args = {
  class: 'lyne-teaser-list',
  items,
  personalised: true
};

export default {
  decorators: [
    (Story) => (
      <div class='lyne-teaser-list-decorator'>
        <Story/>
      </div>
    )
  ],
  parameters: {
    docs: {
      extractComponentDescription: () => readme
    }
  },
  title: 'lyne-teaser-list'
};
