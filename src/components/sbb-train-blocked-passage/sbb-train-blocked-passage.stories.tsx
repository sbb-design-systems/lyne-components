/** @jsx h */
import { h, JSX } from 'jsx-dom';
import readme from './readme.md';
import type { Meta, StoryObj, ArgTypes, Args, Decorator } from '@storybook/html';
import type { InputType } from '@storybook/types';

const Template = (args) => <sbb-train-blocked-passage {...args}></sbb-train-blocked-passage>;

export const blockedPassage: StoryObj = {
  render: Template,
};

const meta: Meta =  {
  decorators: [
    (Story) => (
      <div style={{padding: '2rem'}}>
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
  title: 'components/timetable/sbb-train-blocked-passage',
};

export default meta;
