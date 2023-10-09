/** @jsx h */
import { h, JSX } from 'jsx-dom';
import isChromatic from 'chromatic';
import readme from './readme.md?raw';
import type { Meta, StoryObj } from '@storybook/html';
import type { InputType } from '@storybook/types';

const dataNow: InputType = {
  control: {
    type: 'date',
  },
};

const Template = (args): JSX.Element => <sbb-clock {...args} />;

export const Default: StoryObj = {
  render: Template,
  argTypes: { 'data-now': dataNow },
  args: { 'data-now': undefined },
};

export const Paused: StoryObj = {
  render: Template,
  argTypes: { 'data-now': dataNow },
  args: { 'data-now': new Date('2023-01-24T10:10:30+01:00').valueOf() },
};

/**
 * Stop the clock for Chromatic visual regression tests
 * and set time to given time
 */
if (isChromatic()) {
  Default.args = {
    'data-now': new Date('2023-01-24T10:10:30+01:00').valueOf(),
  };
}

const meta: Meta = {
  decorators: [
    (Story) => (
      <div style={{ 'max-width': '600px' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/sbb-clock',
};

export default meta;
