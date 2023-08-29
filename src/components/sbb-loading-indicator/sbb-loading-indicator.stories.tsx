/** @jsx h */
import { h, JSX } from 'jsx-dom';
import readme from './readme.md';
import { withActions } from '@storybook/addon-actions/decorator';
import type { Meta, StoryObj, ArgTypes, Decorator } from '@storybook/html';
import type { InputType } from '@storybook/types';

const Template = (args): JSX.Element => <sbb-loading-indicator {...args}></sbb-loading-indicator>;

const variant: InputType = {
  control: {
    type: 'select',
  },
  options: ['window', 'circle'],
};

const size: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['l', 'm'],
};

const defaultArgTypes: ArgTypes = {
  variant,
  size,
};

export const WindowAnimationLarge: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    variant: 'window',
    size: 'l',
  },
};

export const WindowAnimationMedium: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    variant: 'window',
    size: 'm',
  },
};

export const CircleAnimation: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    variant: 'circle',
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
