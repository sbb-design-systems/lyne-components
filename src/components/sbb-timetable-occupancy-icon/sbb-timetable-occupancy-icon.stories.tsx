/** @jsx h */
import { h, JSX } from 'jsx-dom';
import readme from './readme.md?raw';
import { withActions } from '@storybook/addon-actions/decorator';
import type { Meta, StoryObj, ArgTypes, Args, Decorator } from '@storybook/web-components';
import type { InputType, StoryContext } from '@storybook/types';
import './sbb-timetable-occupancy-icon';

const wrapperStyle = (context: StoryContext): Record<string, string> => ({
  'background-color': context.args.negative
    ? 'var(--sbb-color-black-default)'
    : 'var(--sbb-color-white-default)',
});

const negative: InputType = {
  control: {
    type: 'boolean',
  },
};

const occupancy: InputType = {
  control: {
    type: 'select',
  },
  options: ['HIGH', 'MEDIUM', 'LOW', 'UNKNOWN'],
};

const defaultArgTypes: ArgTypes = {
  negative,
  occupancy,
};

const defaultArgs: Args = {
  negative: false,
  occupancy: occupancy.options[0],
};

const Template = ({ ...args }): JSX.Element => (
  <sbb-timetable-occupancy-icon {...args}></sbb-timetable-occupancy-icon>
);

export const HighOccupancy: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const MediumOccupancy: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, occupancy: occupancy.options[1] },
};

export const LowOccupancy: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, occupancy: occupancy.options[2] },
};

export const UnknownOccupancy: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, occupancy: occupancy.options[3] },
};

export const HighOccupancyNegative: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, negative: true },
};

export const MediumOccupancyNegative: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, negative: true, occupancy: occupancy.options[1] },
};

export const LowOccupancyNegative: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, negative: true, occupancy: occupancy.options[2] },
};

export const UnknownOccupancyNegative: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, negative: true, occupancy: occupancy.options[3] },
};

const meta: Meta = {
  decorators: [
    (Story, context) => (
      <div style={{ ...wrapperStyle(context), padding: '2rem' }}>
        <Story />
      </div>
    ),
    withActions as Decorator,
  ],
  parameters: {
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/sbb-timetable-occupancy-icon',
};

export default meta;
