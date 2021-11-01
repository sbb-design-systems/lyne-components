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
    type: 'select'
  },
  options: [
    'true',
    'false'
  ],
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
  ],
  table: {
    category: 'Text Variant'
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
  ],
  table: {
    category: 'Text Variant'
  }
};

const variant = {
  control: {
    type: 'select'
  },
  options: [
    'positive',
    'negative'
  ],
  table: {
    category: 'Text Variant'
  }
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
  'icon-flip': iconFlip.options[1],
  'icon-placement': iconPlacement.options[0],
  'text': 'Travelcards & tickets',
  'text-size': textSize.options[2],
  'variant': variant.options[0]
};

/* ************************************************* */
/* The Stories                                       */
/* ************************************************* */
export const TextLink = Template.bind({});

TextLink.argTypes = defaultArgTypes;
TextLink.args = {
  ...defaultArgs,
  'text-size': textSize.options[0]
};

TextLink.documentation = {
  title: 'Text Link Size XS'
};

export const TextLinkIconLeft = Template.bind({});

TextLinkIconLeft.argTypes = defaultArgTypes;
TextLinkIconLeft.args = {
  ...defaultArgs,
  'icon': 'chevron-small-left-small',
  'icon-flip': iconFlip.options[0],
  'text-size': textSize.options[0]
};

TextLinkIconLeft.documentation = {
  title: 'Text Link Icon Left'
};

export const TextLinkIconRight = Template.bind({});

TextLinkIconRight.argTypes = defaultArgTypes;
TextLinkIconRight.args = {
  ...defaultArgs,
  'icon': 'chevron-small-right-small',
  'icon-flip': iconFlip.options[0],
  'icon-placement': iconPlacement.options[1],
  'text-size': textSize.options[0]
};

TextLinkIconLeft.documentation = {
  title: 'Text Link Icon Right'
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
