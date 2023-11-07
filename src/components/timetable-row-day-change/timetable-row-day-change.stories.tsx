/** @jsx h */
import { h, JSX } from 'jsx-dom';
import readme from './readme.md?raw';
import sampleData from './timetable-row-day-change.sample-data';
import type { Meta, StoryObj, Args } from '@storybook/web-components';
import './timetable-row-day-change';

const Template = (args): JSX.Element => (
  <sbb-timetable-row-day-change config={JSON.stringify(args.config)}></sbb-timetable-row-day-change>
);

const config: Args = {
  table: {
    disable: false,
  },
};

const defaultArgTypes = {
  config,
};

/* ************************************************* */
/* The Stories                                       */
/* ************************************************* */
export const currentDayHidden: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    config: sampleData[0],
  },
};

export const currentDayVisible: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    config: sampleData[1],
  },
};

export const dayChange: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    config: sampleData[2],
  },
};

const meta: Meta = {
  decorators: [(Story) => <Story></Story>],
  parameters: {
    docs: {
      extractComponentDescription: () => readme,
    },
    chromatic: { disableSnapshot: true },
  },
  title: 'internals/sbb-timetable-row-day-change',
};

export default meta;
