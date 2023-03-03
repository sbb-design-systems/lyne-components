import images from '../../global/images';
import { h } from 'jsx-dom';
import readme from './readme.md';

const wrapperStyle = (context) => {
  if (context.args.negative) {
    if (context.args.variant === 'translucent') {
      return `background: url('${images[5]}');background-size: cover;`;
    }
    return 'background-color: #484040;';
  }

  if (context.args.variant === 'translucent') {
    return `background: url('${images[1]}');background-size: cover;`;
  }
  return 'background-color: var(--sbb-color-white-default);';
};

const focusStyle = (context) => {
  if (context.args.negative) {
    return `--sbb-focus-outline-color: var(--sbb-focus-outline-color-dark);`;
  }
};

// --- Component

const Template = ({ text, ...args }) => <sbb-button {...args}>{text}</sbb-button>;

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
  options: ['primary', 'secondary', 'translucent', 'transparent'],
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
};

export const primary = Template.bind({});
primary.argTypes = defaultArgTypes;
primary.args = {
  ...defaultArgs,
  variant: variant.options[0],
};

export const secondary = Template.bind({});
secondary.argTypes = defaultArgTypes;
secondary.args = {
  ...defaultArgs,
  variant: variant.options[1],
};

export const translucent = Template.bind({});
translucent.argTypes = defaultArgTypes;
translucent.args = {
  ...defaultArgs,
  variant: variant.options[2],
};

export const transparent = Template.bind({});
transparent.argTypes = defaultArgTypes;
transparent.args = {
  ...defaultArgs,
  variant: variant.options[3],
};

export const primaryNegative = Template.bind({});
primaryNegative.argTypes = defaultArgTypes;
primaryNegative.args = {
  ...defaultArgs,
  variant: variant.options[0],
  negative: true,
};

export const secondaryNegative = Template.bind({});
secondaryNegative.argTypes = defaultArgTypes;
secondaryNegative.args = {
  ...defaultArgs,
  variant: variant.options[1],
  negative: true,
};

export const translucentNegative = Template.bind({});
translucentNegative.argTypes = defaultArgTypes;
translucentNegative.args = {
  ...defaultArgs,
  variant: variant.options[2],
  negative: true,
};

export const transparentNegative = Template.bind({});
transparentNegative.argTypes = defaultArgTypes;
transparentNegative.args = {
  ...defaultArgs,
  variant: variant.options[3],
  negative: true,
};

export const iconOnly = Template.bind({});
iconOnly.argTypes = defaultArgTypes;
iconOnly.args = {
  ...defaultArgs,
  'icon-name': 'arrow-right-small',
  text: undefined,
};

export const primaryDisabled = Template.bind({});
primaryDisabled.argTypes = defaultArgTypes;
primaryDisabled.args = {
  ...defaultArgs,
  variant: variant.options[0],
  disabled: true,
};

export const secondaryDisabled = Template.bind({});
secondaryDisabled.argTypes = defaultArgTypes;
secondaryDisabled.args = {
  ...defaultArgs,
  variant: variant.options[1],
  disabled: true,
};

export const translucentDisabled = Template.bind({});
translucentDisabled.argTypes = defaultArgTypes;
translucentDisabled.args = {
  ...defaultArgs,
  variant: variant.options[2],
  disabled: true,
};

export const transparentDisabled = Template.bind({});
transparentDisabled.argTypes = defaultArgTypes;
transparentDisabled.args = {
  ...defaultArgs,
  variant: variant.options[3],
  disabled: true,
};

export const primaryNegativeDisabled = Template.bind({});
primaryNegativeDisabled.argTypes = defaultArgTypes;
primaryNegativeDisabled.args = {
  ...defaultArgs,
  variant: variant.options[0],
  negative: true,
  disabled: true,
};

export const secondaryNegativeDisabled = Template.bind({});
secondaryNegativeDisabled.argTypes = defaultArgTypes;
secondaryNegativeDisabled.args = {
  ...defaultArgs,
  variant: variant.options[1],
  negative: true,
  disabled: true,
};

export const translucentNegativeDisabled = Template.bind({});
translucentNegativeDisabled.argTypes = defaultArgTypes;
translucentNegativeDisabled.args = {
  ...defaultArgs,
  variant: variant.options[2],
  negative: true,
  disabled: true,
};

export const transparentNegativeDisabled = Template.bind({});
transparentNegativeDisabled.argTypes = defaultArgTypes;
transparentNegativeDisabled.args = {
  ...defaultArgs,
  variant: variant.options[3],
  negative: true,
  disabled: true,
};

export const iconOnlyDisabled = Template.bind({});
iconOnlyDisabled.argTypes = defaultArgTypes;
iconOnlyDisabled.args = {
  ...defaultArgs,
  'icon-name': 'arrow-right-small',
  text: undefined,
  disabled: true,
};

export const noIcon = Template.bind({});
noIcon.argTypes = defaultArgTypes;
noIcon.args = { ...defaultArgs, 'icon-name': undefined };

export const sizeM = Template.bind({});
sizeM.argTypes = defaultArgTypes;
sizeM.args = {
  ...defaultArgs,
  size: size.options[1],
};

export const fixedWidth = FixedWidthTemplate.bind({});
fixedWidth.argTypes = defaultArgTypes;
fixedWidth.args = {
  ...defaultArgs,
  text: 'Button with long text',
  'icon-name': 'arrow-right-small',
};

export const withSlottedIcon = IconSlotTemplate.bind({});
withSlottedIcon.argTypes = defaultArgTypes;
withSlottedIcon.args = {
  ...defaultArgs,
  'icon-name': 'chevron-small-right-small',
};

export const linkOpensInNewWindow = IconSlotTemplate.bind({});
linkOpensInNewWindow.argTypes = defaultArgTypes;
linkOpensInNewWindow.args = {
  ...defaultArgs,
  href: 'https://www.sbb.ch',
  'icon-name': 'chevron-small-right-small',
  target: '_blank',
  'accessibility-label': undefined,
};

export default {
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
