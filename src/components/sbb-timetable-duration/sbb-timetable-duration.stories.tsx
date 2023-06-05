/** @jsx h */
import { h, JSX } from 'jsx-dom';
import readme from './readme.md';
import sampleData from './sbb-timetable-duration.sample-data';
import type { Meta, StoryObj, ArgTypes, Args, Decorator } from '@storybook/html';
import type { InputType } from '@storybook/types';

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






const meta: Meta =  {
  decorators: [(Story) => <Story />],
  parameters: {
    docs: {
      extractComponentDescription: () => readme,
    },
    chromatic: { disableSnapshot: true },
  },
  title: 'internals/sbb-timetable-duration',
};

export default meta;
