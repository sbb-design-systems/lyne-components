import {
  ColorCharcoalDefault,
  ColorWhiteDefault
} from '@sbb-esta/lyne-design-tokens/dist/js/tokens.mjs';
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
  <sbb-link {...args}>
    {args.icon &&
      <span slot='icon'>{getMarkupForSvg(args.icon)}</span>
    }
  </sbb-link>
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
    category: 'Icon'
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
  },
  table: {
    category: 'Icon'
  }
};

const iconPlacement = {
  control: {
    type: 'inline-radio'
  },
  options: [
    'start',
    'end'
  ],
  table: {
    category: 'Icon'
  }
};

const idValue = {
  control: {
    type: 'text'
  }
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
  'id-value': idValue,
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
  'id-value': '',
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
  title: 'Text Link Size XS'
};

export const TextVariantS = Template.bind({});

TextVariantS.argTypes = defaultArgTypes;
TextVariantS.args = {
  ...defaultArgs,
  'text-size': textSize.options[1]
};

TextVariantS.documentation = {
  title: 'Text Links Size S'
};

export const TextVariantSNegative = Template.bind({});

TextVariantSNegative.argTypes = defaultArgTypes;
TextVariantSNegative.args = {
  ...defaultArgs,
  'text-size': textSize.options[1],
  'variant': variant.options[1]
};

TextVariantSNegative.documentation = {
  title: 'Text Link Size S Negative'
};

export const TextLinkIconStart = Template.bind({});

TextLinkIconStart.argTypes = defaultArgTypes;
TextLinkIconStart.args = {
  ...defaultArgs,
  'icon': 'chevron-small-left-small',
  'icon-flip': true,
  'text-size': textSize.options[0]
};

TextLinkIconStart.documentation = {
  title: 'Text Link Icon Start'
};

export const TextLinkIconStartNegative = Template.bind({});

TextLinkIconStartNegative.argTypes = defaultArgTypes;
TextLinkIconStartNegative.args = {
  ...defaultArgs,
  'icon': 'chevron-small-left-small',
  'icon-flip': true,
  'text-size': textSize.options[0],
  'variant': variant.options[1]
};

TextLinkIconStartNegative.documentation = {
  title: 'Text Link Icon Start Negative'
};

export const TextLinkIconEnd = Template.bind({});

TextLinkIconEnd.argTypes = defaultArgTypes;
TextLinkIconEnd.args = {
  ...defaultArgs,
  'icon': 'chevron-small-right-small',
  'icon-flip': true,
  'icon-placement': iconPlacement.options[1],
  'text-size': textSize.options[0]
};

TextLinkIconEnd.documentation = {
  title: 'Text Link End Start'
};

export const TextLinkIconEndNegative = Template.bind({});

TextLinkIconEndNegative.argTypes = defaultArgTypes;
TextLinkIconEndNegative.args = {
  ...defaultArgs,
  'icon': 'chevron-small-right-small',
  'icon-flip': true,
  'icon-placement': iconPlacement.options[1],
  'text-size': textSize.options[0],
  'variant': variant.options[1]
};

TextLinkIconEndNegative.documentation = {
  title: 'Text Link Icon End Negative'
};

export const TextVariantM = Template.bind({});

TextVariantM.argTypes = defaultArgTypes;
TextVariantM.args = {
  ...defaultArgs,
  'text-size': textSize.options[2]
};

TextVariantM.documentation = {
  title: 'Text Link Size M'
};

export default {
  decorators: [
    (Story, context) => (
      <div style={`${wrapperStyle(context)}padding: 2rem`}>
        <Story/>
      </div>
    )
  ],
  parameters: {
    docs: {
      extractComponentDescription: () => readme
    }
  },
  title: 'components/sbb-link'
};
