import { h } from 'jsx-dom';
import readme from './readme.md';

const wrapperStyle = (context) => {
  if (context.args.negative) {
    return 'background-color: #484040;';
  }
  return 'background-color: var(--sbb-color-white-default);';
};

const focusStyle = (context) => {
  if (context.args.negative) {
    return `--sbb-focus-outline-color: var(--sbb-focus-outline-color-dark);`;
  }
};

// --- Component

const Template = ({ text, active, ...args }) => (
  <sbb-button {...args} data-active={active}>
    {text}
  </sbb-button>
);

const IconSlotTemplate = ({ text, 'icon-name': iconName, ...args }) => (
  <sbb-button {...args}>
    {text}
    <sbb-icon slot="icon" name={iconName}></sbb-icon>
  </sbb-button>
);

const FixedWidthTemplate = ({ text, ...args }) => (
  <div>
    <p>
      <sbb-button
        {...args}
        style={{
          width: '200px',
        }}
      >
        {text}
      </sbb-button>
    </p>
    <p>
      <sbb-button
        {...args}
        style={{
          maxWidth: '100%',
          width: '600px',
        }}
      >
        Wide Button
      </sbb-button>
    </p>
  </div>
);

// --- Arg types

const text = {
  control: {
    type: 'text',
  },
};

const variant = {
  control: {
    type: 'select',
  },
  options: ['primary', 'secondary', 'tertiary', 'transparent'],
};

const negative = {
  control: {
    type: 'boolean',
  },
};

const size = {
  control: {
    type: 'inline-radio',
  },
  options: ['l', 'm'],
};

const isStatic = {
  control: { type: 'boolean' },
};

const iconName = {
  control: {
    type: 'text',
  },
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

const disabledArgType = {
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

const ariaLabel = {
  control: {
    type: 'text',
  },
};

const defaultArgTypes = {
  text,
  variant,
  negative,
  size,
  static: isStatic,
  'icon-name': iconName,
  href,
  target,
  rel,
  download,
  type,
  disabled: disabledArgType,
  name,
  value,
  form,
  'aria-label': ariaLabel,
};

const defaultArgs = {
  text: 'Button',
  variant: variant.options[0],
  negative: false,
  size: size.options[0],
  static: false,
  'icon-name': 'arrow-right-small',
  href: undefined,
  target: undefined,
  rel: undefined,
  download: false,
  type: type.options[0],
  disabled: false,
  name: 'Button Name',
  value: undefined,
  form: undefined,
  'aria-label': undefined,
};

export const Primary = Template.bind({});
Primary.argTypes = defaultArgTypes;
Primary.args = {
  ...defaultArgs,
  variant: variant.options[0],
};

export const Secondary = Template.bind({});
Secondary.argTypes = defaultArgTypes;
Secondary.args = {
  ...defaultArgs,
  variant: variant.options[1],
};

export const Tertiary = Template.bind({});
Tertiary.argTypes = defaultArgTypes;
Tertiary.args = {
  ...defaultArgs,
  variant: variant.options[2],
};

export const Transparent = Template.bind({});
Transparent.argTypes = defaultArgTypes;
Transparent.args = {
  ...defaultArgs,
  variant: variant.options[3],
};

export const PrimaryNegative = Template.bind({});
PrimaryNegative.argTypes = defaultArgTypes;
PrimaryNegative.args = {
  ...defaultArgs,
  variant: variant.options[0],
  negative: true,
};

export const SecondaryNegative = Template.bind({});
SecondaryNegative.argTypes = defaultArgTypes;
SecondaryNegative.args = {
  ...defaultArgs,
  variant: variant.options[1],
  negative: true,
};

export const TertiaryNegative = Template.bind({});
TertiaryNegative.argTypes = defaultArgTypes;
TertiaryNegative.args = {
  ...defaultArgs,
  variant: variant.options[2],
  negative: true,
};

export const TransparentNegative = Template.bind({});
TransparentNegative.argTypes = defaultArgTypes;
TransparentNegative.args = {
  ...defaultArgs,
  variant: variant.options[3],
  negative: true,
};

export const IconOnly = Template.bind({});
IconOnly.argTypes = defaultArgTypes;
IconOnly.args = {
  ...defaultArgs,
  'icon-name': 'arrow-right-small',
  text: undefined,
};

export const PrimaryDisabled = Template.bind({});
PrimaryDisabled.argTypes = defaultArgTypes;
PrimaryDisabled.args = {
  ...defaultArgs,
  variant: variant.options[0],
  disabled: true,
};

export const SecondaryDisabled = Template.bind({});
SecondaryDisabled.argTypes = defaultArgTypes;
SecondaryDisabled.args = {
  ...defaultArgs,
  variant: variant.options[1],
  disabled: true,
};

export const TertiaryDisabled = Template.bind({});
TertiaryDisabled.argTypes = defaultArgTypes;
TertiaryDisabled.args = {
  ...defaultArgs,
  variant: variant.options[2],
  disabled: true,
};

export const TransparentDisabled = Template.bind({});
TransparentDisabled.argTypes = defaultArgTypes;
TransparentDisabled.args = {
  ...defaultArgs,
  variant: variant.options[3],
  disabled: true,
};

export const PrimaryNegativeDisabled = Template.bind({});
PrimaryNegativeDisabled.argTypes = defaultArgTypes;
PrimaryNegativeDisabled.args = {
  ...defaultArgs,
  variant: variant.options[0],
  negative: true,
  disabled: true,
};

export const SecondaryNegativeDisabled = Template.bind({});
SecondaryNegativeDisabled.argTypes = defaultArgTypes;
SecondaryNegativeDisabled.args = {
  ...defaultArgs,
  variant: variant.options[1],
  negative: true,
  disabled: true,
};

export const TertiaryNegativeDisabled = Template.bind({});
TertiaryNegativeDisabled.argTypes = defaultArgTypes;
TertiaryNegativeDisabled.args = {
  ...defaultArgs,
  variant: variant.options[2],
  negative: true,
  disabled: true,
};

export const TransparentNegativeDisabled = Template.bind({});
TransparentNegativeDisabled.argTypes = defaultArgTypes;
TransparentNegativeDisabled.args = {
  ...defaultArgs,
  variant: variant.options[3],
  negative: true,
  disabled: true,
};

export const IconOnlyDisabled = Template.bind({});
IconOnlyDisabled.argTypes = defaultArgTypes;
IconOnlyDisabled.args = {
  ...defaultArgs,
  'icon-name': 'arrow-right-small',
  text: undefined,
  disabled: true,
};

export const NoIcon = Template.bind({});
NoIcon.argTypes = defaultArgTypes;
NoIcon.args = { ...defaultArgs, 'icon-name': undefined };

export const SizeM = Template.bind({});
SizeM.argTypes = defaultArgTypes;
SizeM.args = {
  ...defaultArgs,
  size: size.options[1],
};

export const FixedWidth = FixedWidthTemplate.bind({});
FixedWidth.argTypes = defaultArgTypes;
FixedWidth.args = {
  ...defaultArgs,
  text: 'Button with long text',
  'icon-name': 'arrow-right-small',
};

export const WithSlottedIcon = IconSlotTemplate.bind({});
WithSlottedIcon.argTypes = defaultArgTypes;
WithSlottedIcon.args = {
  ...defaultArgs,
  'icon-name': 'chevron-small-right-small',
};

export const LinkOpensInNewWindow = IconSlotTemplate.bind({});
LinkOpensInNewWindow.argTypes = defaultArgTypes;
LinkOpensInNewWindow.args = {
  ...defaultArgs,
  href: 'https://www.sbb.ch',
  'icon-name': 'chevron-small-right-small',
  target: '_blank',
  'aria-label': undefined,
};

export const PrimaryActive = Template.bind({});
PrimaryActive.argTypes = defaultArgTypes;
PrimaryActive.args = {
  ...defaultArgs,
  variant: variant.options[0],
  active: true,
};

export const SecondaryActive = Template.bind({});
SecondaryActive.argTypes = defaultArgTypes;
SecondaryActive.args = {
  ...defaultArgs,
  variant: variant.options[1],
  active: true,
};

export const TertiaryActive = Template.bind({});
TertiaryActive.argTypes = defaultArgTypes;
TertiaryActive.args = {
  ...defaultArgs,
  variant: variant.options[2],
  active: true,
};

export const TransparentActive = Template.bind({});
TransparentActive.argTypes = defaultArgTypes;
TransparentActive.args = {
  ...defaultArgs,
  variant: variant.options[3],
  active: true,
};

export const PrimaryNegativeActive = Template.bind({});
PrimaryNegativeActive.argTypes = defaultArgTypes;
PrimaryNegativeActive.args = {
  ...defaultArgs,
  variant: variant.options[0],
  negative: true,
  active: true,
};

export const SecondaryNegativeActive = Template.bind({});
SecondaryNegativeActive.argTypes = defaultArgTypes;
SecondaryNegativeActive.args = {
  ...defaultArgs,
  variant: variant.options[1],
  negative: true,
  active: true,
};

export const TertiaryNegativeActive = Template.bind({});
TertiaryNegativeActive.argTypes = defaultArgTypes;
TertiaryNegativeActive.args = {
  ...defaultArgs,
  variant: variant.options[2],
  negative: true,
  active: true,
};

export const TransparentNegativeActive = Template.bind({});
TransparentNegativeActive.argTypes = defaultArgTypes;
TransparentNegativeActive.args = {
  ...defaultArgs,
  variant: variant.options[3],
  negative: true,
  active: true,
};

export default {
  excludeStories: /.*Active$/,
  decorators: [
    (Story, context) => (
      <div style={`${wrapperStyle(context)}padding: 2rem;${focusStyle(context)}`}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    actions: {
      handles: ['click'],
    },
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/sbb-button',
};
