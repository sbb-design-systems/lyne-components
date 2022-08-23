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
import { h } from 'jsx-dom';
import readme from './readme.md';
import events from './sbb-link.events';

const wrapperStyle = (context) => {
  if (!context.args.negative) {
    return `background-color: ${SbbColorWhiteDefault};`;
  }

  return `background-color: ${SbbColorCharcoalDefault};`;
};

const Template = (args) => <sbb-link {...args}>{args.text}</sbb-link>;

const paragraphStyle = (context) => {
  let color;

  if (context.args.negative) {
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
    sit amet. <sbb-link {...args}>{args.text}</sbb-link>
  </p>
);

const variant = {
  control: {
    type: 'select',
  },
  options: ['block', 'inline'],
};

const negative = {
  control: {
    type: 'boolean',
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

const accessibilityLabel = {
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

const icon = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Icon',
  },
};

const isIconAtEnd = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Icon',
  },
};

const download = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Link',
  },
};

const href = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Link',
  },
};

const type = {
  control: {
    type: 'select',
  },
  options: ['button', 'reset', 'submit'],
  table: {
    category: 'Button',
  },
};

const name = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Button',
  },
};

const eventId = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Button',
  },
};

const disabled = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Button',
  },
};

const defaultArgTypes = {
  download,
  negative,
  href: href,
  'icon-name': icon,
  'is-icon-at-end': isIconAtEnd,
  'id-value': idValue,
  'accessibility-label': accessibilityLabel,
  text,
  'text-size': textSize,
  variant,
};

const defaultArgs = {
  download: false,
  negative: false,
  href: 'https://github.com/lyne-design-system/lyne-components',
  'icon-name': '',
  'is-icon-at-end': false,
  'id-value': '',
  'accessibility-label': 'Travelcards & tickets',
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
  negative: true,
};

BlockNegativeS.documentation = {
  title: 'Block Negative Size S',
};

export const BlockIconStart = Template.bind({});

BlockIconStart.argTypes = defaultArgTypes;
BlockIconStart.args = {
  ...defaultArgs,
  'icon-name': 'chevron-small-left-small',
  'text-size': textSize.options[0],
};

BlockIconStart.documentation = {
  title: 'Block Icon Start',
};

export const BlockNegativeIconStart = Template.bind({});

BlockNegativeIconStart.argTypes = defaultArgTypes;
BlockNegativeIconStart.args = {
  ...defaultArgs,
  'icon-name': 'chevron-small-left-small',
  'text-size': textSize.options[0],
  negative: true,
};

BlockNegativeIconStart.documentation = {
  title: 'Block Negative Icon Start',
};

export const BlockIconEnd = Template.bind({});

BlockIconEnd.argTypes = defaultArgTypes;
BlockIconEnd.args = {
  ...defaultArgs,
  'icon-name': 'chevron-small-right-small',
  'is-icon-at-end': true,
  'text-size': textSize.options[0],
};

BlockIconEnd.documentation = {
  title: 'Block End Start',
};

export const BlockNegativeIconEnd = Template.bind({});

BlockNegativeIconEnd.argTypes = defaultArgTypes;
BlockNegativeIconEnd.args = {
  ...defaultArgs,
  'icon-name': 'chevron-small-right-small',
  'is-icon-at-end': true,
  'text-size': textSize.options[0],
  negative: true,
};

BlockNegativeIconEnd.documentation = {
  title: 'Block Negative Icon End',
};

export const Inline = InlineTemplate.bind({});

Inline.argTypes = defaultArgTypes;
Inline.args = {
  ...defaultArgs,
  text: 'Show more',
  variant: variant.options[1],
};
delete Inline.argTypes['icon-name'];
delete Inline.args['icon-name'];
delete Inline.argTypes['is-icon-at-end'];
delete Inline.args['is-icon-at-end'];

Inline.documentation = {
  title: 'Inline',
};

export const InlineNegative = InlineTemplate.bind({});

InlineNegative.argTypes = defaultArgTypes;
InlineNegative.args = {
  ...defaultArgs,
  text: 'Show more',
  variant: variant.options[1],
  negative: true,
};
delete InlineNegative.argTypes['icon-name'];
delete InlineNegative.args['icon-name'];
delete InlineNegative.argTypes['is-icon-at-end'];
delete InlineNegative.args['is-icon-at-end'];

InlineNegative.documentation = {
  title: 'Inline Negative',
};

const defaultArgTypesButton = {
  'accessibility-label': accessibilityLabel,
  disabled,
  'event-id': eventId,
  negative,
  name,
  'id-value': idValue,
  text,
  type,
  variant,
};

const defaultArgsButton = {
  'accessibility-label': 'Travelcards & tickets',
  disabled: false,
  'event-id': 'Event ID for button click',
  negative: false,
  name: 'Button name',
  'id-value': '',
  text: 'Travelcards & tickets',
  type: type.options[0],
  variant: variant.options[1],
};

const InlineTemplateButton = (args, context) => (
  <p style={paragraphStyle(context)}>
    Lorem ipsum dolor sit amet. <sbb-link {...args}>{args.text}</sbb-link>
  </p>
);

export const InlineButton = InlineTemplateButton.bind({});

InlineButton.argTypes = defaultArgTypesButton;

InlineButton.args = defaultArgsButton;

InlineNegative.documentation = {
  title: 'Inline Button',
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
    actions: {
      handles: [events.click],
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/sbb-link',
};
