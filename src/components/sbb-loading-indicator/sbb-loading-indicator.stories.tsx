/** @jsx h */
import { h, JSX } from 'jsx-dom';
import readme from './readme.md';
import { withActions } from '@storybook/addon-actions/decorator';
import type { Meta, StoryObj, ArgTypes, Decorator } from '@storybook/html';
import type { InputType } from '@storybook/types';

const Template = (args): JSX.Element => <sbb-loading-indicator {...args}></sbb-loading-indicator>;

const type: InputType = {
  control: {
    type: 'select',
  },
  options: ['window', 'circle'],
};

const size: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['large', 'small'],
};

const defaultArgTypes: ArgTypes = {
  type,
  size,
};

export const WindowAnimationLarge: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    type: 'window',
    size: 'large',
  },
};

export const WindowAnimationSmall: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    type: 'window',
    size: 'small',
  },
};

export const CircleAnimation: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    type: 'circle',
  },
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
      handles: ['click'],
    },
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/sbb-loading-indicator',
};

export default meta;
