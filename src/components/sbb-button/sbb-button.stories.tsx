/** @jsx h */
import { h, JSX } from 'jsx-dom';
import readme from './readme.md';
import { withActions } from '@storybook/addon-actions/decorator';
import type { Meta, StoryObj, ArgTypes, Args, Decorator } from '@storybook/html';
import type { InputType, StoryContext } from '@storybook/types';

const wrapperStyle = (context: StoryContext): Record<string, string> => ({
  'background-color': context.args.negative ? '#484040' : 'var(--sbb-color-white-default)',
});

const focusStyle = (context: StoryContext): Record<string, string> =>
  context.args.negative
    ? { '--sbb-focus-outline-color': 'var(--sbb-focus-outline-color-dark)' }
    : {};

// --- Component

const RequestSubmitTemplate = ({ text }): JSX.Element => (
  <form id="my-fake-form" action="/submit" method="POST" target="_blank">
    <label
      htmlFor="input"
      style={{
        display: 'flex',
        'flex-direction': 'column',
        'align-items': 'flex-start',
        'padding-block-end': '2rem',
      }}
    >
      Input required; submit with empty value is impossible due to `requestSubmit` API validation.
      <input required id="input" />
    </label>
    <sbb-button type="submit" form="my-fake-form" name="input" value="input">
      {text}
    </sbb-button>
  </form>
);

const Template = ({ text, active, ...args }): JSX.Element => (
  <sbb-button {...args} data-active={active}>
    {text}
  </sbb-button>
);

const IconSlotTemplate = ({ text, 'icon-name': iconName, ...args }): JSX.Element => (
  <sbb-button {...args}>
    {text}
    <sbb-icon slot="icon" name={iconName}></sbb-icon>
  </sbb-button>
);

const LoadingIndicatorTemplate = ({ text, ...args }): JSX.Element => (
  <sbb-button {...args}>
    <sbb-loading-indicator slot="icon"></sbb-loading-indicator>
    {text}
  </sbb-button>
);

const FixedWidthTemplate = ({ text, ...args }): JSX.Element => (
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

const text: InputType = {
  control: {
    type: 'text',
  },
};

const variant: InputType = {
  control: {
    type: 'select',
  },
  options: ['primary', 'secondary', 'tertiary', 'transparent'],
};

const negative: InputType = {
  control: {
    type: 'boolean',
  },
};

const size: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['l', 'm'],
};

const isStatic: InputType = {
  control: { type: 'boolean' },
};

const iconName: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Icon',
  },
};

const href: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Link',
  },
};

const target: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Link',
  },
};

const rel: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Link',
  },
};

const download: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Link',
  },
};

const type: InputType = {
  control: {
    type: 'select',
  },
  options: ['button', 'reset', 'submit'],
  table: {
    category: 'Button',
  },
};

const disabledArgType: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Button',
  },
};

const name: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Button',
  },
};

const value: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Button',
  },
};

const form: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Button',
  },
};

const ariaLabel: InputType = {
  control: {
    type: 'text',
  },
};

const defaultArgTypes: ArgTypes = {
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

const defaultArgs: Args = {
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

export const Primary: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    variant: variant.options[0],
  },
};

export const Secondary: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    variant: variant.options[1],
  },
};

export const Tertiary: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    variant: variant.options[2],
  },
};

export const Transparent: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    variant: variant.options[3],
  },
};

export const PrimaryNegative: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    variant: variant.options[0],
    negative: true,
  },
};

export const SecondaryNegative: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    variant: variant.options[1],
    negative: true,
  },
};

export const TertiaryNegative: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    variant: variant.options[2],
    negative: true,
  },
};

export const TransparentNegative: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    variant: variant.options[3],
    negative: true,
  },
};

export const IconOnly: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    'icon-name': 'arrow-right-small',
    text: undefined,
  },
};

export const PrimaryDisabled: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    variant: variant.options[0],
    disabled: true,
  },
};

export const SecondaryDisabled: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    variant: variant.options[1],
    disabled: true,
  },
};

export const TertiaryDisabled: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    variant: variant.options[2],
    disabled: true,
  },
};

export const TransparentDisabled: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    variant: variant.options[3],
    disabled: true,
  },
};

export const PrimaryNegativeDisabled: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    variant: variant.options[0],
    negative: true,
    disabled: true,
  },
};

export const SecondaryNegativeDisabled: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    variant: variant.options[1],
    negative: true,
    disabled: true,
  },
};

export const TertiaryNegativeDisabled: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    variant: variant.options[2],
    negative: true,
    disabled: true,
  },
};

export const TransparentNegativeDisabled: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    variant: variant.options[3],
    negative: true,
    disabled: true,
  },
};

export const IconOnlyDisabled: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    'icon-name': 'arrow-right-small',
    text: undefined,
    disabled: true,
  },
};

export const NoIcon: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, 'icon-name': undefined },
};

export const SizeM: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    size: size.options[1],
  },
};

export const FixedWidth: StoryObj = {
  render: FixedWidthTemplate,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    text: 'Button with long text',
    'icon-name': 'arrow-right-small',
  },
};

export const WithSlottedIcon: StoryObj = {
  render: IconSlotTemplate,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    'icon-name': 'chevron-small-right-small',
  },
};

export const LinkOpensInNewWindow: StoryObj = {
  render: IconSlotTemplate,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    href: 'https://www.sbb.ch',
    'icon-name': 'chevron-small-right-small',
    target: '_blank',
    'aria-label': undefined,
  },
};

export const PrimaryActive: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    variant: variant.options[0],
    active: true,
  },
};

export const SecondaryActive: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    variant: variant.options[1],
    active: true,
  },
};

export const TertiaryActive: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    variant: variant.options[2],
    active: true,
  },
};

export const TransparentActive: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    variant: variant.options[3],
    active: true,
  },
};

export const PrimaryNegativeActive: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    variant: variant.options[0],
    negative: true,
    active: true,
  },
};

export const SecondaryNegativeActive: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    variant: variant.options[1],
    negative: true,
    active: true,
  },
};

export const TertiaryNegativeActive: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    variant: variant.options[2],
    negative: true,
    active: true,
  },
};

export const TransparentNegativeActive: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    variant: variant.options[3],
    negative: true,
    active: true,
  },
};

export const RequestSubmit: StoryObj = {
  render: RequestSubmitTemplate,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    variant: variant.options[0],
    text: 'Submit form',
  },
};

export const LoadingIndicator: StoryObj = {
  render: LoadingIndicatorTemplate,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    variant: variant.options[1],
  },
};

const meta: Meta = {
  excludeStories: /.*Active$/,
  decorators: [
    (Story, context) => (
      <div style={{ ...wrapperStyle(context), ...focusStyle(context), padding: '2rem' }}>
        <Story />
      </div>
    ),
    withActions as Decorator,
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

export default meta;
