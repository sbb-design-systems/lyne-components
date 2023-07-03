/** @jsx h */
import { h, JSX } from 'jsx-dom';
import readme from './readme.md';
import type { Meta, StoryObj, ArgTypes, Args } from '@storybook/html';
import type { InputType } from '@storybook/types';

const value: InputType = {
  control: {
    type: 'text',
  },
};

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

const size: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['m', 's'],
};

const ariaLabel: InputType = {
  control: {
    type: 'text',
  },
};

const defaultArgTypes: ArgTypes = {
  value,
  checked,
  disabled,
  size,
  'aria-label': ariaLabel,
};

const defaultArgs: Args = {
  value: 'First value',
  checked: false,
  disabled: false,
  size: size.options[0],
  'aria-label': undefined,
};

const DefaultTemplate = (args): JSX.Element => <sbb-radio-button {...args}>Value</sbb-radio-button>;

const MultilineLabelTemplate = (args): JSX.Element => (
  <sbb-radio-button {...args}>
    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
    the industry's standard dummy text ever since the 1500s.
  </sbb-radio-button>
);

export const Default: StoryObj = {
  render: DefaultTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const SizeS: StoryObj = {
  render: DefaultTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, size: size.options[1] },
};

export const Checked: StoryObj = {
  render: DefaultTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, checked: true },
};

export const Disabled: StoryObj = {
  render: DefaultTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, disabled: true },
};

export const CheckedDisabled: StoryObj = {
  render: DefaultTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, checked: true, disabled: true },
};

export const MultilineLabel: StoryObj = {
  render: MultilineLabelTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, checked: true },
};

const meta: Meta = {
  decorators: [
    (Story) => (
      <div style={{ padding: '2rem', 'max-width': '1050px' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/sbb-radio-button/sbb-radio-button',
};

export default meta;
