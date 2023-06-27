/** @jsx h */
import { h, JSX } from 'jsx-dom';
import readme from './readme.md';
import { withActions } from '@storybook/addon-actions/decorator';
import type { Meta, StoryObj, ArgTypes, Args, Decorator } from '@storybook/html';
import type { InputType } from '@storybook/types';

/* ************************************************* */
/* Storybook controls                                */
/* ************************************************* */

const longLabel =
  'For this example we need a very long label, like lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nec dolor eget leo porttitor ultrices. Mauris sed erat nec justo posuere elementum. In pharetra ante vel fringilla tincidunt. Fusce congue accumsan arcu dictum porttitor. Pellentesque urna justo, lacinia at velit eu, sagittis tempus nibh. Quisque vitae massa et turpis fermentum tristique.';

const checked: InputType = {
  control: {
    type: 'boolean',
  },
};

const disabled: InputType = {
  control: {
    type: 'boolean',
  },
};

const label: InputType = {
  control: {
    type: 'text',
  },
};

const iconName: InputType = {
  control: {
    type: 'text',
  },
};

const size: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['s', 'm'],
};

const labelPosition: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['before', 'after'],
};

const ariaLabel: InputType = {
  control: {
    type: 'text',
  },
};

const defaultArgTypes: ArgTypes = {
  checked,
  disabled,
  size,
  'label-position': labelPosition,
  label,
  'icon-name': iconName,
  'aria-label': ariaLabel,
};

const defaultArgs: Args = {
  checked: false,
  disabled: false,
  size: size.options[0],
  'label-position': labelPosition.options[1],
  label: 'Label',
  'icon-name': undefined,
  'aria-label': undefined,
};

/* ************************************************* */
/* Storybook templates                               */
/* ************************************************* */

const ToggleCheckDefaultTemplate = ({ label, ...args }): JSX.Element => (
  <sbb-toggle-check {...args}>{label}</sbb-toggle-check>
);

const ToggleCheckWithoutLabelTemplate = (args): JSX.Element => (
  <sbb-toggle-check {...args}></sbb-toggle-check>
);

const ToggleCheckCustomIconTemplate = ({ label, ...args }): JSX.Element => (
  <sbb-toggle-check {...args}>
    <sbb-icon slot="icon" name="eye-small"></sbb-icon>
    {label}
  </sbb-toggle-check>
);

const ToggleCheckBlockVariantTemplate = (args): JSX.Element => (
  <div>
    <sbb-toggle-check {...args} style={{ display: 'block' }}>
      <sbb-title level="5" style={{ margin: '0' }}>
        Accessible Connection.
      </sbb-title>
      <span class="sbb-text-s" style={{ color: 'var(--sbb-color-iron-default)' }}>
        Show connections for accessible journeys.
      </span>
    </sbb-toggle-check>
    <p class="sbb-text-xs">
      In this example <code>&lt;sbb-toggle-check&gt;</code> is converted to a block element by
      setting <code>display: block</code>.
    </p>
  </div>
);

export const SbbToggleCheckDefault: StoryObj = {
  render: ToggleCheckDefaultTemplate,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
  },
};

export const SbbToggleCheckDefaultSizeM: StoryObj = {
  render: ToggleCheckDefaultTemplate,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    size: size.options[1],
  },
};

export const SbbToggleCheckDefaultChecked: StoryObj = {
  render: ToggleCheckDefaultTemplate,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    checked: true,
  },
};

export const SbbToggleCheckDefaultLongLabel: StoryObj = {
  render: ToggleCheckDefaultTemplate,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    label: longLabel,
  },
};

export const SbbToggleCheckDefaultLongLabelSizeM: StoryObj = {
  render: ToggleCheckDefaultTemplate,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    label: longLabel,
    size: size.options[1],
  },
};

export const SbbToggleCheckLabelBefore: StoryObj = {
  render: ToggleCheckDefaultTemplate,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    'label-position': 'before',
  },
};

export const SbbToggleCheckWithoutLabel: StoryObj = {
  render: ToggleCheckWithoutLabelTemplate,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
  },
};

export const SbbToggleCheckDisabled: StoryObj = {
  render: ToggleCheckDefaultTemplate,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    disabled: true,
  },
};

export const SbbToggleCheckDisabledChecked: StoryObj = {
  render: ToggleCheckDefaultTemplate,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    disabled: true,
    checked: true,
  },
};

export const SbbToggleCheckCustomIcon: StoryObj = {
  render: ToggleCheckDefaultTemplate,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    checked: true,
    'icon-name': 'face-smiling-small',
  },
};

export const SbbToggleCheckCustomIconSlotted: StoryObj = {
  render: ToggleCheckCustomIconTemplate,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    checked: true,
    iconName: undefined,
  },
};

export const SbbToggleCheckBlockVariant: StoryObj = {
  render: ToggleCheckBlockVariantTemplate,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    'label-position': 'before',
    label: undefined,
  },
};

const meta: Meta = {
  title: 'components/form elements/sbb-toggle/sbb-toggle-check',
  decorators: [withActions as Decorator],
  parameters: {
    backgrounds: {
      disable: true,
    },
    actions: {
      handles: ['change', 'input'],
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
};

export default meta;
