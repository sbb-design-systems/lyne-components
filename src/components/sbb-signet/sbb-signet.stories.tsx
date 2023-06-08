/** @jsx h */
import { h, JSX } from 'jsx-dom';
import readme from './readme.md';
import type { Meta, StoryObj, ArgTypes, Args } from '@storybook/html';
import type { InputType } from '@storybook/types';

const Template = (args): JSX.Element => <sbb-signet {...args} />;

const protectiveRoom: InputType = {
  control: {
    type: 'select',
  },
  options: ['none', 'minimal', 'ideal'],
};

const accessibilityLabel: InputType = {
  control: {
    type: 'text',
  },
};

const defaultArgTypes: ArgTypes = {
  'protective-room': protectiveRoom,
  'accessibility-label': accessibilityLabel,
};

const defaultArgs: Args = {
  'protective-room': protectiveRoom.options[0],
  'accessibility-label': undefined,
};

export const NoProtectiveRoom: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, 'protective-room': protectiveRoom.options[0] },
};

export const MinimalProtectiveRoom: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, 'protective-room': protectiveRoom.options[1] },
};

export const IdealProtectiveRoom: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, 'protective-room': protectiveRoom.options[2] },
};

const meta: Meta = {
  decorators: [
    (Story) => (
      <div style={{ 'max-width': '300px' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      extractComponentDescription: () => readme,
    },
    chromatic: {
      viewports: [320],
    },
  },
  title: 'components/sbb-signet',
};

export default meta;
