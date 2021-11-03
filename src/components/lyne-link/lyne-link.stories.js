import {
  ColorCharcoalDefault,
  ColorWhiteDefault
} from 'lyne-design-tokens/dist/js/tokens.es6';
import getMarkupForSvg from '../../global/helpers/get-markup-for-svg';
import { h } from 'jsx-dom';
import readme from './readme.md';

const wrapperStyle = (context) => {

  if (context.args.variant === 'positive') {
    return `background-color: ${ColorWhiteDefault};`;
  }

  return `background-color: ${ColorCharcoalDefault};`;

};

const Template = (args) => (
  <lyne-link {...args}>
    <span slot='icon'>{getMarkupForSvg(args.icon)}</span>
  </lyne-link>
);

const download = {
  control: {
    type: 'boolean'
  }
};

const iconFlip = {
  control: {
    type: 'boolean'
  },
  table: {
    category: 'Writing Mode Adjustments'
  }
};

const hrefValue = {
  control: {
    type: 'text'
  }
};

const icon = {
  control: {
    type: 'text'
  }
};

const iconPlacement = {
  control: {
    type: 'inline-radio'
  },
  options: [
    'left',
    'right'
  ]
};

const text = {
  control: {
    type: 'text'
  }
};

const textSize = {
  control: {
    type: 'select'
  },
  options: [
    'xs',
    's',
    'm'
  ]
};

const variant = {
  control: {
    type: 'select'
  },
  options: [
    'positive',
    'negative'
  ]
};

const defaultArgTypes = {
  download,
  'href-value': hrefValue,
  icon,
  'icon-flip': iconFlip,
  'icon-placement': iconPlacement,
  text,
  'text-size': textSize,
  variant
};

const defaultArgs = {
  'download': false,
  'href-value': 'https://github.com/lyne-design-system/lyne-components',
  'icon': '',
  'icon-flip': false,
  'icon-placement': iconPlacement.options[0],
  'text': 'Travelcards & tickets',
  'text-size': textSize.options[1],
  'variant': variant.options[0]
};

/* ************************************************* */
/* The Stories                                       */
/* ************************************************* */
export const TextVariantXS = Template.bind({});

TextVariantXS.argTypes = defaultArgTypes;
TextVariantXS.args = {
  ...defaultArgs,
  'text-size': textSize.options[0]
};

TextVariantXS.documentation = {
  title: 'Text Variant XS'
};

export const TextVariantS = Template.bind({});

TextVariantS.argTypes = defaultArgTypes;
TextVariantS.args = {
  ...defaultArgs,
  'text-size': textSize.options[1]
};

TextVariantS.documentation = {
  title: 'Text Variant S'
};

export const TextVariantSNegative = Template.bind({});

TextVariantSNegative.argTypes = defaultArgTypes;
TextVariantSNegative.args = {
  ...defaultArgs,
  'text-size': textSize.options[1],
  'variant': variant.options[1]
};

TextVariantSNegative.documentation = {
  title: 'Text Variant S'
};

export const TextVariantIconLeft = Template.bind({});

TextVariantIconLeft.argTypes = defaultArgTypes;
TextVariantIconLeft.args = {
  ...defaultArgs,
  'icon': 'chevron-small-left-small',
  'icon-flip': true,
  'text-size': textSize.options[0]
};

TextVariantIconLeft.documentation = {
  title: 'Text Variant Icon Left'
};

export const TextVariantIconRight = Template.bind({});

TextVariantIconRight.argTypes = defaultArgTypes;
TextVariantIconRight.args = {
  ...defaultArgs,
  'icon': 'chevron-small-right-small',
  'icon-flip': true,
  'icon-placement': iconPlacement.options[1],
  'text-size': textSize.options[0]
};

TextVariantIconLeft.documentation = {
  title: 'Text Variant Icon Right'
};

export const TextVariantIconRightNegative = Template.bind({});

TextVariantIconRightNegative.argTypes = defaultArgTypes;
TextVariantIconRightNegative.args = {
  ...defaultArgs,
  'icon': 'chevron-small-right-small',
  'icon-flip': true,
  'icon-placement': iconPlacement.options[1],
  'text-size': textSize.options[0],
  'variant': variant.options[1]
};


TextVariantIconRightNegative.documentation = {
  title: 'Text Variant Icon Right Negative'
};

export default {
  decorators: [
    (Story, context) => (
      <div lang='de' style={`${wrapperStyle(context)}padding: 2rem`}>
        <Story/>
      </div>
    )
  ],
  parameters: {
    backgrounds: {
      disable: true
    },
    docs: {
      extractComponentDescription: () => readme
    }
  },
  title: 'lyne-link'
};
