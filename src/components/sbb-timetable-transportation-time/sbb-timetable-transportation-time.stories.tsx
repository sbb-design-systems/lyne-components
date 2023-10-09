/** @jsx h */
import { h, JSX } from 'jsx-dom';
import readme from './readme.md?raw';
import sampleData from './sbb-timetable-transportation-time.sample-data';
import type { Meta, StoryObj, ArgTypes, Args } from '@storybook/html';
import type { InputType } from '@storybook/types';

const Template = (args): JSX.Element => (
  <sbb-timetable-transportation-time
    appearance={args.appearance}
    config={JSON.stringify(args.config)}
  ></sbb-timetable-transportation-time>
);

const appearance: InputType = {
  control: {
    type: 'select',
  },
  options: ['first-level', 'second-level'],
};

const config: Args = {
  table: {
    disable: false,
  },
};

const defaultArgTypes: ArgTypes = {
  appearance,
  config,
};

const defaultArgs: Args = {
  appearance: appearance.options[0],
};

/* ************************************************* */
/* The Stories                                       */
/* ************************************************* */
export const SbbTimetableDepartureTimeFirstLevel: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    config: sampleData[0],
  },
};

export const SbbTimetableArrivalTimeFirstLevel: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    config: sampleData[1],
  },
};

export const SbbTimetableDepartureTimeSecondLevel: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    appearance: appearance.options[1],
    config: sampleData[2],
  },
};

export const SbbTimetableArrivalTimeSecondLevel: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    appearance: appearance.options[1],
    config: sampleData[3],
  },
};

const meta: Meta = {
  decorators: [(Story) => <Story />],
  parameters: {
    docs: {
      extractComponentDescription: () => readme,
    },
    chromatic: { disableSnapshot: true },
  },
  title: 'internals/sbb-timetable-transportation-time',
};

export default meta;
