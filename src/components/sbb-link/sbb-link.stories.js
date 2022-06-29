import {
  SbbColorAluminiumDefault,
  SbbColorCharcoalDefault,
  SbbColorIronDefault,
  SbbColorWhiteDefault,
  SbbTypoLetterSpacingBodyText,
  SbbTypoLineHeightBodyText,
  SbbTypoScaleDefault,
  SbbTypoTypeFaceSbbRoman,
} from '@sbb-esta/lyne-design-tokens';
import getMarkupForSvg from '../../global/helpers/get-markup-for-svg';
import { h } from 'jsx-dom';
import readme from './readme.md';

const wrapperStyle = (context) => {
  if (!context.args.variant.includes('-negative')) {
    return `background-color: ${SbbColorWhiteDefault};`;
  }

  return `background-color: ${SbbColorCharcoalDefault};`;
};

const Template = (args) => (
  <sbb-link {...args}>
    {args.icon && <span slot="icon">{getMarkupForSvg(args.icon)}</span>}
  </sbb-link>
);

const paragraphStyle = (context) => {
  let color;

  if (context.args.variant.includes('-negative')) {
    color = `color: ${SbbColorAluminiumDefault};`;
  } else {
    color = `color: ${SbbColorIronDefault};`;
  }

  return `${color} font-family: ${SbbTypoTypeFaceSbbRoman}; font-weight: normal; line-height: ${SbbTypoLineHeightBodyText}; letter-spacing: ${SbbTypoLetterSpacingBodyText}; font-size: ${SbbTypoScaleDefault}px`;
};

const InlineTemplate = (args, context) => (
  <p style={paragraphStyle(context)}>
    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
    ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
    dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor
    sit amet. <sbb-link {...args}></sbb-link>
  </p>
);

const download = {
  control: {
    type: 'boolean',
  },
};

const iconFlip = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Icon',
  },
};

const hrefValue = {
  control: {
    type: 'text',
  },
};

const icon = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Icon',
  },
};

const iconPlacement = {
  control: {
    type: 'inline-radio',
  },
  options: ['start', 'end'],
  table: {
    category: 'Icon',
  },
};

const idValue = {
  control: {
    type: 'text',
  },
};

const text = {
  control: {
    type: 'text',
  },
};

const textSize = {
  control: {
    type: 'select',
  },
  options: ['xs', 's', 'm'],
};

const variant = {
  control: {
    type: 'select',
  },
  options: ['block', 'block-negative', 'inline', 'inline-negative'],
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
  variant,
};

const defaultArgs = {
  download: false,
  'href-value': 'https://github.com/lyne-design-system/lyne-components',
  icon: '',
  'icon-flip': false,
  'icon-placement': iconPlacement.options[0],
  'id-value': '',
  text: 'Travelcards & tickets',
  'text-size': textSize.options[1],
  variant: variant.options[0],
};

/* ************************************************* */
/* The Stories                                       */
/* ************************************************* */
export const BlockXS = Template.bind({});

BlockXS.argTypes = defaultArgTypes;
BlockXS.args = {
  ...defaultArgs,
  'text-size': textSize.options[0],
};

BlockXS.documentation = {
  title: 'Block Size XS',
};

export const BlockS = Template.bind({});

BlockS.argTypes = defaultArgTypes;
BlockS.args = {
  ...defaultArgs,
  'text-size': textSize.options[1],
};

BlockS.documentation = {
  title: 'Block Size S',
};

export const BlockM = Template.bind({});

BlockM.argTypes = defaultArgTypes;
BlockM.args = {
  ...defaultArgs,
  'text-size': textSize.options[2],
};

BlockM.documentation = {
  title: 'Block Size M',
};

export const BlockNegativeS = Template.bind({});

BlockNegativeS.argTypes = defaultArgTypes;
BlockNegativeS.args = {
  ...defaultArgs,
  'text-size': textSize.options[1],
  variant: variant.options[1],
};

BlockNegativeS.documentation = {
  title: 'Block Negative Size S',
};

export const BlockIconStart = Template.bind({});

BlockIconStart.argTypes = defaultArgTypes;
BlockIconStart.args = {
  ...defaultArgs,
  icon: 'chevron-small-left-small',
  'icon-flip': true,
  'text-size': textSize.options[0],
};

BlockIconStart.documentation = {
  title: 'Block Icon Start',
};

export const BlockNegativeIconStart = Template.bind({});

BlockNegativeIconStart.argTypes = defaultArgTypes;
BlockNegativeIconStart.args = {
  ...defaultArgs,
  icon: 'chevron-small-left-small',
  'icon-flip': true,
  'text-size': textSize.options[0],
  variant: variant.options[1],
};

BlockNegativeIconStart.documentation = {
  title: 'Block Negative Icon Start',
};

export const BlockIconEnd = Template.bind({});

BlockIconEnd.argTypes = defaultArgTypes;
BlockIconEnd.args = {
  ...defaultArgs,
  icon: 'chevron-small-right-small',
  'icon-flip': true,
  'icon-placement': iconPlacement.options[1],
  'text-size': textSize.options[0],
};

BlockIconEnd.documentation = {
  title: 'Block End Start',
};

export const BlockNegativeIconEnd = Template.bind({});

BlockNegativeIconEnd.argTypes = defaultArgTypes;
BlockNegativeIconEnd.args = {
  ...defaultArgs,
  icon: 'chevron-small-right-small',
  'icon-flip': true,
  'icon-placement': iconPlacement.options[1],
  'text-size': textSize.options[0],
  variant: variant.options[1],
};

BlockNegativeIconEnd.documentation = {
  title: 'Block Negative Icon End',
};

export const Inline = InlineTemplate.bind({});

Inline.argTypes = defaultArgTypes;
Inline.args = {
  ...defaultArgs,
  text: 'Show more',
  variant: variant.options[2],
};

Inline.documentation = {
  title: 'Inline',
};

export const InlineNegative = InlineTemplate.bind({});

InlineNegative.argTypes = defaultArgTypes;
InlineNegative.args = {
  ...defaultArgs,
  text: 'Show more',
  variant: variant.options[3],
};

InlineNegative.documentation = {
  title: 'Inline Negative',
};

export default {
  decorators: [
    (Story, context) => (
      <div style={`${wrapperStyle(context)}padding: 2rem`}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/sbb-link',
};
