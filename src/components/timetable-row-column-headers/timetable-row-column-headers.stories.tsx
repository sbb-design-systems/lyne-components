/** @jsx h */
import type { Meta, StoryObj, Args } from '@storybook/web-components';
import { h, type JSX } from 'jsx-dom';

import readme from './readme.md?raw';
import sampleData from './timetable-row-column-headers.sample-data';
import './timetable-row-column-headers';

const Template = (args): JSX.Element => (
  <sbb-timetable-row-column-headers
    config={JSON.stringify(args.config)}
  ></sbb-timetable-row-column-headers>
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
export const SbbTimetableRowColumnHeaders: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    config: sampleData,
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
  title: 'internals/sbb-timetable-row-column-headers',
};

export default meta;
