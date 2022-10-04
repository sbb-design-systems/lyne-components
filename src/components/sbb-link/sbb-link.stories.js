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

const paragraphStyle = (context) => {
  let color;

  if (context.args.negative) {
    color = `color: ${SbbColorAluminiumDefault};`;
  } else {
    color = `color: ${SbbColorIronDefault};`;
  }

  return `${color} font-family: ${SbbTypoTypeFaceSbbRoman}; font-weight: normal; line-height: ${SbbTypoLineHeightBodyText}; letter-spacing: ${SbbTypoLetterSpacingBodyText}; font-size: ${SbbTypoScaleDefault}px`;
};

const Template = ({ text, ...args }) => <sbb-link {...args}>{text}</sbb-link>;

const IconSlotTemplate = ({ text, 'icon-name': iconName, ...args }) => (
  <sbb-link {...args}>
    {text}
    <sbb-icon slot="icon" name={iconName}></sbb-icon>
  </sbb-link>
);

const InlineTemplate = ({ text, ...args }, context) => (
  <p style={paragraphStyle(context)}>
    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
    ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
    dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor
    sit amet. <sbb-link {...args}>{text}</sbb-link>
  </p>
);

const text = {
  control: {
    type: 'text',
  },
};

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

const textSize = {
  control: {
    type: 'select',
  },
  options: ['xs', 's', 'm'],
};

const isStatic = {
  control: { type: 'boolean' },
};

const idValue = {
  control: {
    type: 'text',
  },
};

const iconName = {
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

const href = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Link',
  },
};

const target = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Link',
  },
};

const rel = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Link',
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

const type = {
  control: {
    type: 'select',
  },
  options: ['button', 'reset', 'submit'],
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

const name = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Button',
  },
};

const value = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Button',
  },
};

const form = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Button',
  },
};

const accessibilityControls = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Button',
  },
};

const accessibilityHaspopup = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Button',
  },
};

const accessibilityLabel = {
  control: {
    type: 'text',
  },
};

const accessibilityDescribedby = {
  control: {
    type: 'text',
  },
};

const accessibilityLabelledby = {
  control: {
    type: 'text',
  },
};

const defaultArgTypes = {
  text,
  variant,
  negative,
  'text-size': textSize,
  static: isStatic,
  'id-value': idValue,
  'icon-name': iconName,
  'icon-placement': iconPlacement,
  href,
  target,
  rel,
  download,
  type,
  disabled,
  name,
  value,
  form,
  'accessibility-controls': accessibilityControls,
  'accessibility-haspopup': accessibilityHaspopup,
  'accessibility-label': accessibilityLabel,
  'accessibility-describedby': accessibilityDescribedby,
  'accessibility-labelledby': accessibilityLabelledby,
};

const defaultArgs = {
  text: 'Travelcards & tickets',
  variant: variant.options[0],
  negative: false,
  'text-size': textSize.options[1],
  static: false,
  'id-value': undefined,
  'icon-name': undefined,
  'icon-placement': iconPlacement.options[0],
  href: 'https://github.com/lyne-design-system/lyne-components',
  target: undefined,
  rel: undefined,
  download: false,
  type: type.options[0],
  disabled: false,
  name: 'Button name',
  value: undefined,
  form: undefined,
  'accessibility-controls': undefined,
  'accessibility-haspopup': undefined,
  'accessibility-label': 'Travelcards & tickets',
  'accessibility-describedby': undefined,
  'accessibility-labelledby': undefined,
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
};
BlockIconStart.documentation = {
  title: 'Block Icon Start',
};

export const BlockNegativeIconStart = Template.bind({});
BlockNegativeIconStart.argTypes = defaultArgTypes;
BlockNegativeIconStart.args = {
  ...defaultArgs,
  'icon-name': 'chevron-small-left-small',
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
  'icon-placement': iconPlacement.options[1],
};
BlockIconEnd.documentation = {
  title: 'Block End Start',
};

export const BlockNegativeIconEnd = Template.bind({});
BlockNegativeIconEnd.argTypes = defaultArgTypes;
BlockNegativeIconEnd.args = {
  ...defaultArgs,
  'icon-name': 'chevron-small-right-small',
  'icon-placement': iconPlacement.options[1],
  negative: true,
};
BlockNegativeIconEnd.documentation = {
  title: 'Block Negative Icon End',
};

export const BlockButton = Template.bind({});
BlockButton.argTypes = defaultArgTypes;
BlockButton.args = {
  ...defaultArgs,
  href: undefined,
  'icon-name': 'chevron-small-right-small',
  'icon-placement': iconPlacement.options[1],
};
BlockButton.documentation = {
  title: 'Block Button',
};

export const BlockButtonNegative = Template.bind({});
BlockButtonNegative.argTypes = defaultArgTypes;
BlockButtonNegative.args = {
  ...defaultArgs,
  negative: true,
  href: undefined,
  'icon-name': 'chevron-small-right-small',
  'icon-placement': iconPlacement.options[1],
};
BlockButtonNegative.documentation = {
  title: 'Block Button Negative',
};

export const BlockWithSlottedIcon = IconSlotTemplate.bind({});
BlockWithSlottedIcon.argTypes = defaultArgTypes;
BlockWithSlottedIcon.args = {
  ...defaultArgs,
  'icon-name': 'chevron-small-right-small',
  'icon-placement': iconPlacement.options[1],
};
BlockWithSlottedIcon.documentation = {
  title: 'Block with slotted icon',
};

export const BlockLinkOpensInNewWindow = IconSlotTemplate.bind({});
BlockLinkOpensInNewWindow.argTypes = defaultArgTypes;
BlockLinkOpensInNewWindow.args = {
  ...defaultArgs,
  'icon-name': 'chevron-small-right-small',
  'icon-placement': iconPlacement.options[1],
  target: '_blank',
  'accessibility-label': undefined,
};
BlockLinkOpensInNewWindow.documentation = {
  title: 'Block link opened in new window',
};

export const Inline = InlineTemplate.bind({});
Inline.argTypes = defaultArgTypes;
Inline.args = {
  ...defaultArgs,
  text: 'Show more',
  variant: variant.options[1],
};
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
InlineNegative.documentation = {
  title: 'Inline Negative',
};

export const InlineButton = InlineTemplate.bind({});
InlineButton.argTypes = defaultArgTypes;
InlineButton.args = {
  ...defaultArgs,
  text: 'Show more',
  variant: 'inline',
  href: undefined,
};
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
