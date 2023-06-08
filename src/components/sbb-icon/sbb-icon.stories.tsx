/** @jsx h */
import { h, JSX } from 'jsx-dom';
import readme from './readme.md';
import type { Meta, StoryObj, ArgTypes } from '@storybook/html';
import type { InputType } from '@storybook/types';

const Template = (args): JSX.Element => <sbb-icon {...args}></sbb-icon>;

const iconName: InputType = {
  control: {
    type: 'select',
  },
  options: [
    'app-icon-medium',
    'train-medium',
    'swisspass-medium',
    'pie-medium',
    'chevron-small-left-small',
  ],
};

const defaultArgTypes: ArgTypes = {
  name: iconName,
};

export const Default: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    name: iconName.options[0],
  },
};

const meta: Meta = {
  decorators: [
    (Story) => (
      <div style={{ padding: '2rem' }}>
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
  title: 'components/sbb-icon',
};

export default meta;
