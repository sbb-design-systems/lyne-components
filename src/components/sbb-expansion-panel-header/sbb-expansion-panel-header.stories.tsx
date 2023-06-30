/** @jsx h */
import { h, JSX } from 'jsx-dom';
import readme from './readme.md';
import { withActions } from '@storybook/addon-actions/decorator';
import type { Meta, StoryObj, ArgTypes, Args, Decorator } from '@storybook/html';
import { InputType } from '@storybook/types';

const text: InputType = {
  control: {
    type: 'text',
  },
};

const iconName: InputType = {
  control: {
    type: 'text',
  },
};

const expanded: InputType = {
  control: {
    type: 'boolean',
  },
};

const defaultArgTypes: ArgTypes = {
  text,
  'icon-name': iconName,
  expanded,
};

const defaultArgs: Args = {
  text: 'Button',
  'icon-name': undefined,
  expanded: false,
};

const Template = ({ text, ...args }): JSX.Element => (
  <sbb-expansion-panel-header {...args}>{text}</sbb-expansion-panel-header>
);

export const Default: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const WithIcon: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, 'icon-name': 'swisspass-medium' },
};

export const Expanded: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, expanded: true },
};

const meta: Meta = {
  decorators: [
    (Story) => (
      <div style={{ padding: '2rem' }}>
        <Story />
      </div>
    ),
    withActions as Decorator,
  ],
  parameters: {
    actions: {
      handles: [],
    },
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/sbb-expansion-panel-header',
};

export default meta;
