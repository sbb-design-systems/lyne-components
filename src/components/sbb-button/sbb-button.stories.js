import images from '../../global/images';
import { SbbColorCharcoalDefault, SbbColorWhiteDefault } from '@sbb-esta/lyne-design-tokens';
import events from './sbb-button.events.ts';
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
  return `background-color: ${SbbColorWhiteDefault};`;
};

const focusStyle = (context) => {
  if (context.args.negative) {
    return `--sbb-focus-outline-color: var(--sbb-focus-outline-color-dark);`;
  }
};

// --- Component

const Template = ({ text, ...args }) => <sbb-button {...args}>{text}</sbb-button>;

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

const download = {
  control: {
    type: 'boolean',
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

const idValue = {
  control: {
    type: 'text',
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

const name = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Button',
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

const form = {
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

const defaultArgTypes = {
  text,
  variant,
  negative,
  size,
  static: isStatic,
  'icon-name': iconName,
  href,
  download,
  target,
  rel,
  'id-value': idValue,
  'accessibility-label': accessibilityLabel,
  'accessibility-describedby': accessibilityDescribedby,
  'accessibility-labelledby': accessibilityLabelledby,
  name,
  type,
  form,
  disabled,
  value,
};

const defaultArgs = {
  text: 'Button',
  variant: variant.options[0],
  negative: false,
  size: size.options[0],
  static: false,
  'icon-name': 'arrow-right-small',
  href: undefined,
  download: false,
  target: undefined,
  rel: undefined,
  'id-value': undefined,
  'accessibility-label': undefined,
  'accessibility-describedby': undefined,
  'accessibility-labelledby': undefined,
  name: 'Button Name',
  type: type.options[0],
  form: undefined,
  disabled: false,
  value: undefined,
};

export const primary = Template.bind({});
primary.argTypes = defaultArgTypes;
primary.args = {
  ...defaultArgs,
  variant: variant.options[0],
};
primary.documentation = {
  title: 'Primary',
};

export const secondary = Template.bind({});
secondary.argTypes = defaultArgTypes;
secondary.args = {
  ...defaultArgs,
  variant: variant.options[1],
};
secondary.documentation = {
  title: 'Secondary',
};

export const translucent = Template.bind({});
translucent.argTypes = defaultArgTypes;
translucent.args = {
  ...defaultArgs,
  variant: variant.options[2],
};
translucent.documentation = {
  title: 'Translucent',
};

export const transparent = Template.bind({});
transparent.argTypes = defaultArgTypes;
transparent.args = {
  ...defaultArgs,
  variant: variant.options[3],
};
transparent.documentation = {
  title: 'Transparent',
};

export const primaryNegative = Template.bind({});
primaryNegative.argTypes = defaultArgTypes;
primaryNegative.args = {
  ...defaultArgs,
  variant: variant.options[0],
  negative: true,
};
primaryNegative.documentation = {
  container: {
    styles: {
      'background-color': SbbColorCharcoalDefault,
    },
  },
  title: 'Primary Negative',
};

export const secondaryNegative = Template.bind({});
secondaryNegative.argTypes = defaultArgTypes;
secondaryNegative.args = {
  ...defaultArgs,
  variant: variant.options[1],
  negative: true,
};
secondaryNegative.documentation = {
  container: {
    styles: {
      'background-color': SbbColorCharcoalDefault,
    },
  },
  title: 'Secondary Negative',
};

export const translucentNegative = Template.bind({});
translucentNegative.argTypes = defaultArgTypes;
translucentNegative.args = {
  ...defaultArgs,
  variant: variant.options[2],
  negative: true,
};
translucentNegative.documentation = {
  container: {
    styles: {
      'background-color': SbbColorCharcoalDefault,
    },
  },
  title: 'Translucent Negative',
};

export const transparentNegative = Template.bind({});
transparentNegative.argTypes = defaultArgTypes;
transparentNegative.args = {
  ...defaultArgs,
  variant: variant.options[3],
  negative: true,
};
transparentNegative.documentation = {
  container: {
    styles: {
      'background-color': SbbColorCharcoalDefault,
    },
  },
  title: 'Transparent Negative',
};

export const noIcon = Template.bind({});
noIcon.argTypes = defaultArgTypes;
noIcon.args = { ...defaultArgs, 'icon-name': undefined };
noIcon.documentation = {
  title: 'No Icon',
};

export const iconOnly = Template.bind({});
iconOnly.argTypes = defaultArgTypes;
iconOnly.args = {
  ...defaultArgs,
  'icon-name': 'arrow-right-small',
  text: undefined,
};
iconOnly.documentation = {
  title: 'Icon only',
};

export const sizeM = Template.bind({});
sizeM.argTypes = defaultArgTypes;
sizeM.args = {
  ...defaultArgs,
  size: size.options[1],
};
sizeM.documentation = {
  title: 'M size',
};

export const disabledButton = Template.bind({});
disabledButton.argTypes = defaultArgTypes;
disabledButton.args = {
  ...defaultArgs,
  disabled: true,
};
disabledButton.documentation = {
  title: 'Disabled',
};

export const fixedWidth = FixedWidthTemplate.bind({});
fixedWidth.argTypes = defaultArgTypes;
fixedWidth.args = {
  ...defaultArgs,
  text: 'Button with long text',
  'icon-name': 'arrow-right-small',
};
fixedWidth.documentation = {
  title: 'Fixed width with overflow',
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
      handles: [events.click],
    },
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/sbb-button (Unfinished)',
};
