/** @jsx h */
import type { Meta, StoryObj, Args } from '@storybook/web-components';
import { h, type JSX } from 'jsx-dom';

import readme from './readme.md?raw';
import sampleData from './timetable-duration.sample-data';
import './timetable-duration';

const Template = (args): JSX.Element => (
  <sbb-timetable-duration config={JSON.stringify(args.config)}></sbb-timetable-duration>
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
export const MinutesOnly: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    config: sampleData[0],
  },
};

export const OneHourOneMinute: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    config: sampleData[1],
  },
};

export const HoursAndMinutes: StoryObj = {
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
  title: 'internals/sbb-timetable-duration',
};

export default meta;
