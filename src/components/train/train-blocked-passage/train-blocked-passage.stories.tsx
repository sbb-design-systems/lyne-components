/** @jsx h */
import type { Meta, StoryObj } from '@storybook/web-components';
import { h, type JSX } from 'jsx-dom';

import readme from './readme.md?raw';
import './train-blocked-passage';

const Template = (args): JSX.Element => (
  <sbb-train-blocked-passage {...args}></sbb-train-blocked-passage>
);

export const blockedPassage: StoryObj = {
  render: Template,
};

const meta: Meta = {
  decorators: [
    (Story) => (
      <div style={{ padding: '2rem' }}>
        <Story></Story>
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
  title: 'timetable/sbb-train-blocked-passage',
};

export default meta;
